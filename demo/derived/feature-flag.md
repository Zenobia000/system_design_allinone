# Feature Flag · 功能旗標 · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + `PRD.md` v0.1 + `demo/06-operate/14-runbook`／`demo/05-ship/13-rollback-plan` 推導，未經課堂實跑與人工審定。
> 與 `demo/04-build/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`runbook`（Mitigation 需要的開關）、`component-design` C5／C6　**下游**：`canary-strategy`、`rollback-plan`、`release-plan`

---

## 1. Executive Summary

SmartTrip 的 flag **不是為了做 A/B 測試，是為了讓事故能在 5 分鐘內收斂而不發版**。

`runbook` 的每一條 Mitigation 幾乎都以「執行 `launchdarkly toggle ...`」開頭——那些 flag 就是本文件要正式登記的東西。目前的問題是：**它們散落在 runbook 裡，沒有一張清單、沒有 owner、沒有下架日期**。

三條原則：

1. **每個 flag 都必須對應一條 runbook 的緩解動作或一次灰度發布**。沒有對應的 flag 不准建。
2. **flag 是負債**。每一個都有下架日期，過期未清是技術債（見 §4）。
3. **flag 服務掛掉時必須有安全預設值**（`srs` EI-5）。

---

## 2. Flag Identity

| Key | 型別 | 預設值（flag 服務不可用時） | 用途 | 對應 |
|---|---|---|---|---|
| `fx_provider_order` | string[] | `["wise","taibank","frankfurter"]` | 調整 FX 供應商 fallback 順序 | `runbook` 01 A；`component-design` C5 |
| `fx_show_cached` | bool | `true` | 全供應商失效時是否顯示快取匯率 | `runbook` 01 B |
| `fx_signal_show` | bool | `true` | **整塊隱藏燈號** | `runbook` 01 B／04；`persona` Anti-Persona 解耦 |
| `fx_cache_ttl_ms` | number | `86400000`（24h） | 快取 TTL，延遲事故時可調高 | `runbook` 05 A；`component-design` C6 |
| `fx_fetch_timeout_ms` | number | `3000` | 單一 provider 逾時 | `runbook` 05 A；`sequence-diagram` §6 |
| `ls_cleanup_aggressive` | bool | `false` | 啟動時自動清理 30 天前未存檔結果 | `runbook` 02 Mitigation 1 |
| `analytics_enabled` | bool | `true` | 全關分析事件 | 隱私事故或法務要求時 |
| `p0_8_live_rate` | bool | `false` | **P0-8 即時匯率的灰度開關** | `canary-strategy` |
| `p0_9_analytics` | bool | `false` | **P0-9 分析的灰度開關** | `canary-strategy` |

### 兩類 flag，生命週期完全不同

| 類別 | 例 | 生命週期 | 下架 |
|---|---|---|---|
| **A · 發布旗標**（release toggle） | `p0_8_live_rate`、`p0_9_analytics` | 短命，**灰度完成即刻移除** | 100% 後 **2 週內**必須清 |
| **B · 維運開關**（ops toggle） | `fx_signal_show`、`fx_provider_order`、TTL/timeout | **長期存在**，是 runbook 的一部分 | 不下架，但每季複檢 |

> 混淆這兩類是最常見的錯誤。發布旗標留著不清 → 程式碼裡兩條路徑永久並存；維運開關被當成暫時的清掉 → 下次事故時 runbook 的第一步就執行不了。

---

## 4. Owners & Lifecycle

| Key | Owner | 誰能改 prod | 建立日 | 下架條件 |
|---|---|---|---|---|
| `fx_provider_order` | DevOps | DevOps | — | 常駐 |
| `fx_show_cached` | DevOps | DevOps | — | 常駐 |
| `fx_signal_show` | **PO**（含法規責任） | DevOps 執行，**PO 知會** | — | 常駐 |
| `fx_cache_ttl_ms` | DevOps | DevOps | — | 常駐 |
| `fx_fetch_timeout_ms` | DevOps | DevOps | — | 常駐 |
| `ls_cleanup_aggressive` | Dev | DevOps | — | 常駐 |
| `analytics_enabled` | PO | DevOps | — | 常駐 |
| `p0_8_live_rate` | Dev | DevOps | 灰度開始 | **100% 後 2 週** |
| `p0_9_analytics` | Dev | DevOps | 灰度開始 | **100% 後 2 週** |

### 生命週期規則

| # | 規則 |
|---|---|
| **L1** | 建立 flag 的 PR 必須同時填 owner 與下架條件，否則不 approve（`pr-template`） |
| **L2** | 發布旗標超過下架期限 → 進 `retro` 的固定議題，不是靜靜放著 |
| **L3** | 每季複檢維運開關：仍對應某條 runbook 步驟嗎？不再對應就刪 |
| **L4** | **`fx_signal_show` 的變更需通知 PO**——隱藏燈號會改變產品對外承諾，不只是技術動作 |
| **L5** | flag 數量上限 **12 個**。超過就代表在用 flag 逃避決策 |

---

## 5. Telemetry & Kill Switch

### 遙測

| 要能回答的問題 | 需要的資料 |
|---|---|
| 現在每個 flag 是什麼值？ | flag 服務儀表板 + **每次 `generate` 事件夾帶關鍵 flag 快照** |
| 燈號被隱藏期間影響多少人？ | `generate` 事件的 `signal_shown` 欄位 |
| 快取曝光率多少？ | `generate` 事件的 `source` 欄位（`north-star` C3） |
| 誰在什麼時候改了 flag？ | flag 服務的變更稽核紀錄；事故時需貼進 `incident-report` 時間軸 |

> **關鍵設計**：flag 狀態要**跟著事件走**，不能只留在 flag 服務裡。否則事後分析時無法把「指標下降」與「某個 flag 被切換」對上。

### Kill switch

| 情境 | 動作 | 預期生效 | 副作用 |
|---|---|---|---|
| 燈號可能算錯（`runbook` 04） | `fx_signal_show = false` | **< 5 分鐘** | 使用者看不到燈號；**建議換匯額不受影響** |
| 隱私／法務要求停止分析 | `analytics_enabled = false` | < 5 分鐘 | KR1／KR2 資料中斷，驗證窗受影響 |
| 即時匯率灰度出問題 | `p0_8_live_rate = false` | < 5 分鐘 | 退回模擬資料——**但此時必須確保 `SourceBadge` 顯示「模擬」**，否則直接觸發 `threat-model` T2 |
| localStorage 事故擴大 | `ls_cleanup_aggressive = true` | 隨使用者下次開啟 | 非即時；使用者端才生效 |

> **最後一列是 flag 的固有限制**：PWA 的 flag 只在客戶端下次載入時生效。**沒有任何 flag 能立刻改變已經在使用者手機上跑的那一份 bundle**。這一點必須寫進 `runbook` 的預期復原時間，不能假設 5 分鐘全站生效。

---

## 9. Risks（top 3）

| # | 風險 | 影響 | 緩解 |
|---|---|---|---|
| **R1** | **`p0_8_live_rate` 關閉後退回模擬資料，但來源標籤沒跟著改** | 直接觸發 T2：以模擬冒充即時，摧毀 G4 | 關閉路徑必須有 `integration-test` 案例；標籤由 `source` 驅動不可覆寫 |
| **R2** | **flag 只在客戶端生效**，事故收斂時間被高估 | runbook 承諾 5 分鐘，實際可能數小時（取決於使用者何時重開） | runbook 的復原時間需分「新 session」與「既有 session」兩欄 |
| **R3** | **發布旗標不清理** | 程式碼永久維持兩條路徑，測試矩陣翻倍 | L2 進 retro 固定議題；上限 12 個 |

---

## 12. Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| flag 清單 | `[H]` | 直接取自 `runbook` 的 Mitigation 指令 |
| 兩類 flag 的生命週期區分 | `[M]` | 推導；canon 未區分 |
| 預設值 | `[M]` | 推導自各卡的降級設計 |
| 上限 12 個 | `[L]` | **推估**，無依據 |

**TODO / 未解**

- [ ] **R2 是本文件最重要的發現**：`runbook` 多處寫「< 5 分鐘生效」，但 PWA 的 flag 對既有 session 不會立即生效。**runbook 的復原時間需要重寫**，這是 canon 層級的修正建議。
- [ ] **flag 服務未選定**。`runbook` 寫的是 `launchdarkly` 指令，但 LaunchDarkly 對一個「月成本上限 $5」（`adr`）的專案可能過貴。**成本與 ADR-001 的門檻衝突未評估**。
- [ ] **flag 稽核紀錄的保存期未定**，事故回溯需要多久的歷史未知。
- [ ] **`fx_provider_order` 若含未選定的供應商**（`tech-spike` 未跑），預設值目前是佔位。
