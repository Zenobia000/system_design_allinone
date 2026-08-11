# Integration Test · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + `PRD.md` v0.1 + `demo/04-build/11-unit-test` 推導，未經課堂實跑與人工審定。
> 與 `demo/04-build/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`component-design`（介面契約）、`sequence-diagram`、`unit-test`　**下游**：`test-plan`、`ci-cd-pipeline`

---

## 1. Executive Summary

單元測試已經證明每個模組**自己**是對的。整合測試只回答一個問題：

> **接起來之後，「誠實」有沒有一路傳到畫面上？**

SmartTrip 的整合風險集中在一條鏈：`FX Provider → FxFacade → Shell → SourceBadge`。
`threat-model` T2（靜默 fallback）是最高優先威脅，而它**在單元測試裡永遠測不出來**——每個模組都可以各自正確，但組裝時 Shell 忘了把 `source` 傳給 UI，整條信任鏈就斷了。

因此本層測試的重心不是覆蓋率，是**跨邊界的契約與降級路徑**。

---

## 2. Contracts

被測的契約邊界，以及各自用什麼替身：

| # | 邊界 | 測試中的處置 | 為什麼 |
|---|---|---|---|
| **CT-1** | `domain` ⇄ `adapters`（`FxPort`） | 用**假 provider**（可控回應／延遲／錯誤），不打真網路 | 真網路不可控，且會消耗額度 |
| **CT-2** | `adapters/fx` ⇄ FX 供應商 | 用**固定樣本回應（fixture）**，每家一份 | `component-design` R3：三家格式差異大 |
| **CT-3** | `adapters/storage` ⇄ localStorage | 用真實 localStorage（jsdom）+ 可觸發 quota 的替身 | quota 行為是 `runbook` 02 的核心 |
| **CT-4** | `adapters/analytics` ⇄ 分析端點 | 攔截並記錄，不真送 | 驗證欄位白名單與非阻塞 |
| **CT-5** | Shell ⇄ UI（`SourceBadge`／`SignalBlock`） | 渲染整棵樹，斷言畫面文字 | **T2 的唯一防線在這一層** |
| **CT-6** | Feature flag ⇄ ProviderRouter | 注入假 flag | `runbook` 01 要求不發版切換 |

> **不使用真實外部 API**。理由：`tech-spike` 尚未選定供應商；且外部服務不可用時 CI 會紅，會訓練團隊忽略紅燈。

---

## 4. Happy Paths

| # | 案例 | 步驟 | 斷言 |
|---|---|---|---|
| **H1** | 完整生成流程 | 填入東京 5 天 → 送出 → 假 provider 回正常匯率 | 三級距遞增；建議換匯額 = cash 小計 ×1.1 進位；燈號顯示；`SourceBadge` 顯示「即時」 |
| **H2** | 行程與匯率並行 | 假 provider 延遲 2s，planning 立即回 | 建議換匯額**先於**燈號出現（`sequence-diagram` T1） |
| **H3** | 儲存與重讀 | 生成 → 儲存 → 重新載入頁面 | 我的行程可見；金額與儲存前一致 |
| **H4** | 開支對照 | 已存行程 → 新增現金開支 → 檢視 | 即時更新總額；`deviationRate` 只計現金（`frd` BR-04） |
| **H5** | 事件送出時機 | 完成生成 | `generate` 事件在**渲染完成後**才送（`frd` BR-05 D5）；欄位符合白名單 |

---

## 5. Unhappy Paths

**這一節才是本文件的價值所在。**

| # | 案例 | 注入的故障 | 斷言 | 對應 |
|---|---|---|---|---|
| **U1** | 主 provider 失效 | wise 回 503，taibank 正常 | 使用者無感；`source = live`；provider 欄位為 taibank | `runbook` 01 A |
| **U2** | **全 provider 失效，有快取** | 三家全 503，快取有 42 分鐘前資料 | 燈號仍顯示；**`SourceBadge` 顯示「快取 · 42 分鐘前」**；`generate` 事件 `source=cache` | **T2 / `north-star` C3** |
| **U3** | **全 provider 失效，無快取** | 三家全 503，快取空 | **燈號區塊不存在**；**建議換匯額照常顯示**；版面無空洞 | `srs` UC-06、`wireframe` D3 |
| **U4** | MA30 不足 | 歷史只回 12 筆 | 燈號區塊不存在；**不得補值或顯示 HOLD** | `frd` BR-02 D1 |
| **U5** | **單位異常** | provider 回 per-100 的值（數值大 100 倍） | 合理性檢查攔截；切換來源；記 `error` 級 ST-FX-005 | **`threat-model` T1（SEV-1）** |
| **U6** | 斷路器開路 | 連續 3 次失敗後第 4 次呼叫 | 不再打該 provider；30 秒後半開探測 | `component-design` |
| **U7** | localStorage 容量滿 | 寫入拋 QuotaExceededError | 顯示清理提示；**不 crash**；已生成結果仍在畫面上 | `runbook` 02 |
| **U8** | **讀回資料 schema 不符** | 手動寫入壞資料後重載 | 該筆視為不存在且**未被刪除**；其他行程正常 | `error-handling` ST-STO-003 |
| **U9** | **analytics 端點掛掉** | 事件端點回 500／逾時 | **主流程完全不受影響**，生成與儲存正常完成 | `srs` D3、`module-design` R3 |
| **U10** | cash 總和為 0 | 全程刷卡的行程 | 顯示「這趟不需要準備現金」，**不顯示 0** | `frd` BR-01 邊界 |
| **U11** | 三級距同值 | 預算範圍極窄 | 顯示「此預算範圍過窄」，不出現三張相同卡 | `frd` BR-03 |
| **U12** | flag 服務不可用 | flag SDK 逾時 | 使用內建預設順序，流程正常 | `srs` EI-5、`component-design` R5 |

### 必須存在的斷言（不可省略）

| 斷言 | 出現在 | 為什麼不可省 |
|---|---|---|
| **畫面上的來源標籤與 `FxResult.source` 一致** | U1、U2、U3 | T2 的唯一自動化防線 |
| **降級時建議換匯額仍在** | U3、U4 | P0-4／P0-5 解耦的驗證；產品核心價值 |
| **analytics 失敗不影響主流程** | U9 | 觀測不得成為故障源 |

---

## 9. Risks（top 3）

| # | 風險 | 影響 | 緩解 |
|---|---|---|---|
| **R1** | **fixture 與真實回應不同步**。供應商改格式，測試仍全綠 | U5 想擋的 SEV-1 反而漏掉 | 每週跑一次「真實 API 對照 fixture」的排程測試（不進 PR gate，失敗只告警） |
| **R2** | **UI 斷言用文字比對，文案一改就全紅** | 團隊為了讓 CI 綠而放寬斷言，防線瓦解 | 對 `SourceBadge` 用 `data-testid` + `data-source` 屬性斷言，不比對文案 |
| **R3** | **整合測試變慢後被跳過** | 降級路徑長期無人驗證 | 控制在 CI 90 秒內；超時就拆，不刪 |

---

## 12. Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| 整合層重心在降級路徑 | `[H]` | `threat-model` T2 + `runbook` 01/02/04 |
| 契約邊界與替身策略 | `[M]` | 推導自 `component-design` 注入設計 |
| 案例清單完整性 | `[M]` | 對照 `frd` BR-01～03、`error-handling` 錯誤碼表 |
| CI 90 秒門檻 | `[L]` | **推估**，未量測 |

**TODO / 未解**

- [ ] **未與 `unit-test` 卡對齊分層**。該卡已定義必測函數與 mock 邊界，本文件的 CT-1 可能與其重疊。**需明確：同一個降級行為只在一層測，不要兩層都測**。
- [ ] **U5 的合理性檢查門檻（20%）未定案**（`threat-model` D5 同一 TODO），測試無法寫死斷言值。
- [ ] **R1 的排程測試需要真實 API 金鑰**，而供應商未選定（`tech-spike` 未跑），此緩解目前無法落地。
- [ ] **未涵蓋多幣別行程**：`sequence-diagram` §12 已指出多幣別時序未畫，整合測試同樣缺這一組案例。
- [ ] **測試框架未選定**，canon 無記載；jsdom 與 service worker 的相容性可能影響 CT-3。
