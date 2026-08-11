# Error Handling · 錯誤處理設計 · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + `PRD.md` v0.1 + `demo/03-design/07-api-spec`／`demo/06-operate/14-runbook` 推導，未經課堂實跑與人工審定。
> 與 `demo/03-design/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`api-spec`、`sequence-diagram`、`component-design`　**下游**：實作、`integration-test`、`observability-spec`、`runbook`

---

## 1. Executive Summary

SmartTrip 的錯誤處理有一個與多數系統不同的前提：

> **這是一個沒有後端使用者資料庫的 PWA。錯誤大多不是「請求失敗」，而是「外部資料不可信」或「瀏覽器不讓我存」。**

因此本文件的三條主軸：

1. **可預期的失敗不用例外表達**。FX 不可用、容量滿是**狀態**不是異常（`component-design` C1）。`throw` 只留給程式錯誤。
2. **降級一律誠實**。任何以舊資料或替代來源服務使用者的情況，UI 必須看得出來（`north-star` C3）。
3. **觀測不得成為故障源**。analytics 失敗永遠靜默（`srs` D3）。

---

## 2. Error Catalog（錯誤碼目錄）

錯誤碼格式：`ST-<域>-<序號>`。域：`FX`／`STO`（storage）／`INP`（input）／`PLN`（planning）／`SYS`。

| 碼 | 意義 | 使用者看到 | 系統動作 | 記錄層級 | 對應 |
|---|---|---|---|---|---|
| **ST-FX-001** | 單一 provider 逾時／5xx | （無感） | 切下一個 provider | `info` | `runbook` 01 Mitigation A |
| **ST-FX-002** | 全 provider 失敗，有快取 | 「這是 42 分鐘前的匯率」 | `source: cache`，燈號照常判定 | `warn` | `runbook` 01 Mitigation B |
| **ST-FX-003** | 全 provider 失敗，無快取 | 燈號區塊整塊消失 | `source: unavailable`，不產生 Signal | `warn` | `frd` BR-02 降級 |
| **ST-FX-004** | MA30 資料不足 30 個交易日 | 燈號區塊整塊消失 | `status: insufficient` | `warn` | `frd` BR-02 D1 |
| **ST-FX-005** | **回應格式無法轉譯／單位異常** | 燈號區塊消失 | 該 provider 標記失敗並切換 | **`error`** | `runbook` 04（SEV-1 燈號誤判） |
| **ST-STO-001** | localStorage 容量滿 | 「空間不足，是否清理 60 天前的行程？」 | 提供清理選項，不自動刪 | `warn` | `runbook` 02 |
| **ST-STO-002** | localStorage 不可用（無痕／停用） | 「請退出無痕模式以儲存行程」 | 停用儲存功能，生成仍可用 | `warn` | `c4-diagram` Tier 1 風險 |
| **ST-STO-003** | **讀回資料 schema 不符** | （視為無此行程） | 隔離該筆、不刪除、回報事件 | **`error`** | `c4-diagram` 信任邊界 |
| **ST-INP-001** | 必填欄位缺漏 | 欄位旁明確提示 | 阻擋送出 | `debug` | PRD P0-1 |
| **ST-INP-002** | 預算範圍過窄（三級距同值） | 「此預算範圍過窄，請放寬」 | 不顯示三張相同卡 | `info` | `frd` BR-03 |
| **ST-PLN-001** | 行程無任何現金項目 | 「這趟不需要準備現金」 | **不顯示 0** | `info` | `frd` BR-01 邊界 |
| **ST-SYS-001** | 未預期例外（程式錯誤） | 「發生問題，請重新整理」 | 上報 Sentry，保留已存資料 | **`error`** | — |

### 分級原則

| 層級 | 意義 | 是否進 alert |
|---|---|---|
| `debug` / `info` | 預期內的流程分支 | 否 |
| `warn` | 降級發生，使用者仍被服務 | 進儀表板，不 page |
| `error` | **資料可能錯誤或不可信** | 進 alert（見 `observability-spec`） |

> **ST-FX-005 與 ST-STO-003 是唯二的 `error` 級資料問題**，因為它們代表「我們可能給了使用者錯的數字」——這比服務不可用更嚴重（`runbook` 04 為 SEV-1 的同一理由）。

---

## 3. Retry & Idempotency（核心）

### 重試矩陣

| 操作 | 重試？ | 策略 | 上限 | 理由 |
|---|---|---|---|---|
| FX 單一 provider | **否** | 直接切下一家 | — | 有三家可切，重試同一家只是浪費 MoT-1 的時間預算 |
| FX provider 切換 | 是（本質上） | 依序 fallback | 3 家 | `component-design` C5 |
| CircuitBreaker 半開探測 | 是 | 30 秒後放行一次 | 每 30s 一次 | `c4-diagram` Layer 3 |
| `fetchMA30` | **否** | 失敗即 `insufficient` | — | 燈號可缺，不值得重試成本 |
| `analytics.track` | **否** | 靜默丟棄 | — | `srs` D3 |
| `storage.save` | **否** | 回傳結果讓 UI 決定 | — | 重試不會讓容量變大 |
| 使用者按「重新生成」 | 手動 | — | — | 冪等，安全 |

**共同原則**：**沒有指數退避，因為沒有任何重試迴圈**。這是刻意的——在 8 秒 FX 總預算（`sequence-diagram` §6）下，退避重試會直接吃掉降級的時間。

### 冪等性

| 操作 | 冪等鍵 | 冪等？ | 防重複的位置 |
|---|---|---|---|
| `plan()` / `suggestCash()` | 輸入本身（純函數） | ✔ | 不需要 |
| `fetchRate()` | `pair` + TTL | ✔ | FxCache |
| `save(trip)` | `trip.id` | ✔ | Storage Adapter 覆寫 |
| `track(event)` | **無** | ✘ | **UI：送出中禁用按鈕** |
| `addExpense()` | `expense.id`（前端產生 UUID） | ✔ | 產生 id 後才寫入 |

> **`track` 的非冪等是唯一沒有技術防線的項目**（`sequence-diagram` §6 已標）。連點兩次生成 → KR1 虛高。
> **防線只有 UI 一層**，因此必須寫進 `acceptance-criteria` 當成可驗收條件，否則沒有人會測它。

### 錯誤的表達方式

```ts
// 可預期失敗：結果型別，不 throw
type Result<T, E extends ErrorCode> =
  | { ok: true; value: T }
  | { ok: false; code: E; detail?: string };

// 不可預期：才 throw，由 error boundary 接住 → ST-SYS-001
```

| 規則 | 內容 |
|---|---|
| **C1** | adapter 的公開方法**不得 throw**，一律回 `Result` 或帶狀態的結果物件 |
| **C2** | domain 純函數**不得回 `Result`**，輸入不合法屬呼叫端的錯（型別已擋住多數情況） |
| **C3** | 錯誤碼**不得直接顯示給使用者**，UI 依碼查文案表 |
| **C4** | 錯誤文案**不得責備使用者**，也不得暴露技術細節 |
| **C5** | 每個 `error` 級錯誤**必須帶足以定位的上下文**（provider 名、pair、schema 欄位），但**不得含個資** |

---

## 9. Risks

| # | 風險 | 影響 | 緩解 |
|---|---|---|---|
| **R1** | **靜默 fallback**：實作者為了「不要嚇到使用者」把 `source: cache` 回報成 `live` | 直接摧毀 G4 內容信任，且 `north-star` C3 查不到 | `unit-test` 強制案例；`integration-test` 驗 UI 標籤；code review 必查 |
| **R2** | **ST-FX-005 被降級成 warn** | 單位錯誤（per-1 vs per-100）會產生看似正常的錯誤燈號 → `runbook` 04 SEV-1 | 轉譯層加**合理性檢查**（匯率偏離歷史值 > 20% 即視為格式異常） |
| **R3** | **ST-STO-003 直接刪除壞資料** | 使用者行程無聲消失 | 明令隔離不刪除；保留原始字串供事後分析 |
| **R4** | **`Result` 型別被 `!` 或 `as` 繞過** | 錯誤路徑未處理，變成 ST-SYS-001 | `coding-standard` 禁用非空斷言於 adapter 回傳值 |
| **R5** | **錯誤文案未經法務檢視** | 燈號相關文案可能構成投資建議 | 燈號域的所有文案納入法務徵詢（`stakeholder-map` 待決） |

---

## 12. Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| 可預期失敗用結果型別 | `[M]` | 推導自 `component-design` C1 |
| 錯誤碼清單覆蓋主要路徑 | `[M]` | 對照 `runbook` 01/02/04 與 `frd` BR-01～03 |
| 不做重試退避 | `[M]` | 推導自 8 秒 FX 預算，該預算本身是 `[L]` |
| 錯誤碼命名格式 | `[L]` | **推導**，canon 無記載；`api-spec` 是否已定義錯誤碼未核對 |

**TODO / 未解**

- [ ] **未與 `api-spec` 的錯誤碼對齊**。該卡已定義 endpoint／錯誤碼／版本策略，本文件的 `ST-*` 可能與其重複或衝突。**這是上線前必須解掉的第一項**。
- [ ] **R2 的合理性檢查門檻（20%）沒有依據**。匯率單日波動 20% 在正常市況不可能，但重大事件時可能誤殺。需要真實歷史資料校準。
- [ ] **無使用者可見的錯誤文案總表**：目前散在各錯誤碼列，且未經法務與 UX 檢視（`design-system` 無錯誤態文案規範）。
- [ ] **ST-SYS-001 的 Sentry 上報尚未確認是否符合隱私承諾**：免登入定位下，錯誤上報是否算追蹤，與 `srs` UC-07 的同意流程是同一個未決問題。
