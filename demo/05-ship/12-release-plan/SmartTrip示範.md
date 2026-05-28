# 12 Release Plan · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報（`demo/種子簡報.md`）+ 完整 PRD（`PRD.md`）的素材，
> 把上一份「關鍵提問.md」的六題實際答一遍，並產出 SmartTrip MVP 4 週驗證窗的 rollout 計畫。
> 上游依據：02-value-hypothesis（H1/H2/H3）、09-NFR（SLO / 性能預算）、11-unit-test（core coverage 結果）。

---

## Q1 示範：「3 階段 + 對應假設」

**4 週驗證窗的 rollout 階段切割**：

| 階段 | 日期窗 | 使用者比例 | 對應假設 | 階段目的 |
|---|---|---|---|---|
| **S1 內部 + 早鳥** | W1 D1（週二）– W1 D3（週四） | **5%** | 系統穩定性（含 09-NFR SLO） | 證明「系統能跑、不會崩」——不驗證商業假設 |
| **S2 流量擴大** | W1 D4（週五前停權重）→ W2 D1 D2 D3 D4 D7 | **25%** | H1「啟用率 ≥ 40%」、H2「存檔率 ≥ 25%」 | 驗證短期領先指標達種子簡報「成功指標」門檻 |
| **S3 全量** | W3 D1（週二）– W4 D7 | **100%** | H3「30 天回訪 ≥ 20%」、H4「換匯準確度 ≥ 60%」 | 驗證落後指標 + 差異化認知 |

**為什麼是 3 階段不是 5 階段**：
- 階段太少（≤ 2）= 5% 直接跳 100% 風險高
- 階段太多（≥ 5）= 4 週驗證窗每階段 < 1 週，數據量不足以判斷
- 3 階段剛好對應「**系統 → 短期商業 → 長期商業**」三個驗證層次

**為什麼 S1 是 5% 不是 1% 或 10%**：
- 1%：流量太小（SmartTrip 預估日 UV 2000，1% = 20 人/日），FX API 錯誤率這類比例指標噪音太大
- 10%：出事影響太多人，且 H1 流量假設驗證會被污染（5% 還能說「樣本太小不下結論」）
- 5%：對 SmartTrip 流量 ~100 人/日，足以判斷系統穩定但不足以驗證商業假設——剛好

---

## Q2 示範：「每階段 Go criteria（具體數字 + 上游依據）」

### S1 → S2 的 Go 條件（系統穩定性）

| Go 條件 | 門檻 | 量測窗 | 上游依據 |
|---|---|---|---|
| 過去 24h P0 / P1 incident 數 | = 0 | rolling 24h | 09-NFR §可用性 SLO |
| FX API 呼叫錯誤率 | < 1% | rolling 1h | 09-NFR §外部依賴可用性 + PRD P0-8 |
| `generate` flow 完成率 | ≥ 95% | rolling 6h | 09-NFR §核心流程成功率 SLO |
| 燈號顯示成功率（含 fallback HOLD） | ≥ 99% | rolling 6h | PRD P0-5 + AC-05 fallback 條款 |
| `lib/recommend`、`lib/fx-signal`、`lib/expense-variance` 單測覆蓋率 | ≥ 90% 各檔 | 主分支最新 | 11-unit-test 結論 |
| 主分支過去 7 天 flaky test alert 數 | = 0 | rolling 7d | 11-unit-test 「flaky 不容忍」原則 |
| Bundle gzip size | ≤ 200KB | 主分支最新 | 09-NFR §性能 + 10-code-review MUST-08 |
| 客服 FAQ + 訓練 | 已完成簽核 | one-time | 本場通訊計畫前置條件 |

**Dev 表態**：「以上 8 條任一未達 → 不准進 S2。不是 7/8 過就放行——8/8 才放行。」

### S2 → S3 的 Go 條件（H1 / H2 短期商業驗證）

| Go 條件 | 門檻 | 量測窗 | 上游依據 |
|---|---|---|---|
| 啟用率（進站完成一次 generate） | ≥ **40%** | S2 階段全程（~10 天） | 種子簡報「啟用率 ≥ 40%」+ PRD §7 + H1 |
| 存檔率（生成後按儲存） | ≥ **25%** | S2 階段全程 | 種子簡報「存檔率 ≥ 25%」+ PRD §7 + H2 |
| 完成時間中位數（進站 → 看到結果） | < **3 分鐘** | S2 階段全程 | 種子簡報「期望成果」+ PRD §7 |
| 外部連結點擊率 | ≥ 30% | S2 階段全程 | PRD §7 領先指標 |
| 持續維持 S1 全部系統穩定條件 | 全部達標 | rolling | 不能因為流量增加就讓系統 SLO 退步 |

**PO 表態**：「啟用率沒達 40% → 不進 S3，回頭重檢『首頁是不是不夠清楚使用者要做什麼』、『生成按鈕是不是不夠明顯』。**這是 H1 假設不成立的早期警訊**，不是『再給多點時間』。」

### S3 → 驗證窗結束的 Go 條件（H3 / H4 落後指標）

| Go 條件 | 門檻 | 量測窗 | 上游依據 |
|---|---|---|---|
| 30 天回訪率 | ≥ **20%** | S3 階段 + 後續 30 天（即驗證窗結束時 cohort 滿 30 天） | 種子簡報「30 天回訪 ≥ 20%」+ PRD §7 + H3 |
| 換匯準確度（有開支紀錄行程中誤差 < 15% 比例） | ≥ **60%** | S3 階段全程 | 種子簡報「換匯準確度 ≥ 60%」+ PRD §7 + H4 |
| 差異化認知（訪談無提示說出「換匯/現金」差異） | ≥ **60%** | S3 階段末追蹤訪談 5–10 份 | PRD §7 + G3 |
| 整體滿意度 | ≥ **4 / 5** | S3 階段內 in-app 簡短問卷 | PRD §7 + G4 |

**判定規則**（種子簡報 + PRD §7 明示）：「任一驗證窗（4 週）達**啟用率 + 30 天回訪雙門檻** → 假設成立，進 V1。否則重檢定位。」

---

## Q3 示範：「Abort 信號 + Rollback SLA + 拍板者」

### Abort 信號分級

| 等級 | 觸發條件 | SLA | 處置 |
|---|---|---|---|
| **P0（自動觸發 Rollback）** | (a) FX API 錯誤率 > **5%** 持續 5 分鐘 (b) `generate` flow 完成率 < **70%** 持續 10 分鐘 (c) JS error rate > **2%** 持續 5 分鐘 | PagerDuty 自動 page → DevOps 5 分鐘 ack → **30 分鐘內** rollback 完成 | 整個 MVP flag 全關回上版本 |
| **P1（人工拍板）** | (a) `generate` 完成率 < **80%** 持續 30 分鐘 (b) 客服 Slack 收到 **5 件以上**相同性質投訴 (c) 法務 / 公關緊急通報 | PO 30 分鐘內回應 → PO + DevOps lead 共決 → **1 小時內** 決定 abort 或修補 | 對應 feature flag 獨立關閉 |
| **P2（觀察 + 監控加強）** | (a) 任一單一 Go criteria 滑落 10% 以上但未跨 P1 門檻 (b) 客服收到 1–4 件投訴 | DevOps 8h 內 ack | 不 abort，但記入 incident log，下次階段 review 加重審查 |

### 拍板者

| 拍板場景 | 主拍板者 | 代理（主未回應） | 不可代理 |
|---|---|---|---|
| P0 自動 rollback | DevOps on-call | — | （已自動，不需人工） |
| P1 abort 決議 | **PO** | DevOps lead（PO 30 分鐘無回應） | PM 不可代理（PM 不背產品 KPI） |
| 階段間 Go 決議 | PO | （無代理，必須 PO 本人簽） | — |
| 驗證窗結束 Go to V1 | **PO + 老闆** | （無代理） | — |

**Rollback SLA**：從 abort 拍板到 100% 流量切回上版本 < **30 分鐘**。SmartTrip 用 Vercel + LaunchDarkly，flag 切換實際 < 1 分鐘，30 分鐘預算包含驗證 + 對外通訊。

---

## Q4 示範：「Feature Flag 拆分（3 個獨立 flag）」

| Flag 名稱 | 控制範圍 | 對應 PRD | 預設值（fallback） | 可獨立 abort？ |
|---|---|---|---|---|
| `ff_realtime_fx` | P0-8 即時匯率資料源 | PRD §6 P0-8 | 關 = 用模擬資料 + UI 標示「模擬」 | ✅ 是 |
| `ff_fx_signal` | P0-5 燈號顯示 | PRD §6 P0-5 | 關 = 不顯示燈號（只顯示匯率數值） | ✅ 是 |
| `ff_analytics` | P0-9 使用分析事件 | PRD §6 P0-9 | 關 = 不送 event，本機計算 | ✅ 是 |

**Flag 之間獨立性驗證**：
- `ff_fx_signal` 關 + `ff_realtime_fx` 開 = 顯示真實匯率但不給燈號 → ✅ 合法狀態
- `ff_realtime_fx` 關 + `ff_fx_signal` 開 = 用模擬匯率算燈號 + UI 標示「模擬」→ ✅ 合法狀態（過渡期用）
- `ff_analytics` 關 + 其他開 = 功能照常但無 metrics → ⚠️ 不能長期，因為驗證假設靠 metrics

**Flag 顆粒度地圖**：

```
MVP feature set
├── 行程生成（P0-1, P0-2, P0-3, P0-4）→ 無 flag（核心一定要在）
├── FX 即時匯率（P0-8）→ ff_realtime_fx
├── FX 燈號（P0-5）→ ff_fx_signal  ← 依賴 ff_realtime_fx 但可獨立關
├── 儲存行程（P0-6）→ 無 flag
├── 開支紀錄（P0-7）→ 無 flag
└── 使用分析（P0-9）→ ff_analytics
```

**為什麼 P0-1 ~ P0-4 + P0-6 + P0-7 沒 flag**：這幾個是「沒了 MVP 就不叫 MVP」的核心，
出事只有「abort 整個 release」一個選項——這個情境用「整體版本回滾」處理，不用 flag。

---

## Q5 示範：「通訊計畫（Happy Path + Abort Path）」

### Happy Path 通訊（每階段 Go 觸發）

| 時間點 | 通知者 | 接收者 | 管道 | 內容 |
|---|---|---|---|---|
| Go 前 1 工作日 09:00 | PO | 全 ENG + 客服 lead + 行銷 lead + 法務 lead | mail + Slack `#ship-smarttrip` | 「明日 09:00 進入 SX 階段，flag `ff_xxx` 將切至 N%。FAQ 連結：⋯」 |
| Go 當日 09:00 | PO | 全 ENG + 客服 + 行銷 + 法務 | Slack `#ship-smarttrip` 公告 + mail thread reply | 「**已切 SX**，flag 狀態：⋯，儀表板：⋯，戰情室：⋯。下次階段審查：W2 D7 14:00」 |
| Go 當日 + 2h | DevOps on-call | PO + PM | Slack thread | 「過去 2h 監控正常，繼續觀察」 |
| Go 當日 + 24h | PO | 全 stakeholder | mail（每日簡報） | 「過去 24h 數據：啟用率 X% / FX 錯誤率 Y%，未觸 abort，繼續」 |
| 階段結束日 14:00 | PO | 全 stakeholder | 30 分鐘 review meeting + meeting note | 「SX 結果 vs Go criteria 比對，決議是否進 S(X+1)」 |

### Abort Path 通訊（P0 / P1 觸發後）

| 時間點 | 通知者 | 接收者 | 管道 | 內容 |
|---|---|---|---|---|
| T+0（觸發瞬間） | 監控系統 | DevOps on-call | PagerDuty | 自動 page，附 alert 連結與 runbook |
| T+5 min | DevOps on-call | PO + 全 ENG | Slack `#incident-smarttrip` 開戰情室 thread | 「P0/P1 alert 觸發，alert：⋯，初判：⋯，正在執行 rollback」 |
| T+10 min | PO | 客服 lead | Slack DM + 電話 | 「正在 rollback，預計 T+30 min 完成。請客服暫時用『系統維護中』回覆」 |
| T+15 min | PM | 客服 lead | Slack thread | 客服 FAQ 模板已就緒（事先寫好的 abort FAQ）|
| T+30 min（rollback 完成） | DevOps on-call | PO + 全 ENG + 客服 + 行銷 | Slack `#ship-smarttrip` + mail | 「rollback 完成，flag 已切回上版本。Postmortem 排 24h 內」 |
| T+1h（未恢復時） | PO | CTO + 公關 | 電話 + Slack DM | 「rollback 後仍有異常，啟動公關預案」 |
| T+24h | PO + DevOps lead | 全 stakeholder | Postmortem 文件 + 1h review meeting | 對齊 15-postmortem 卡的流程 |

**Dev 表態**：「**通訊計畫的核心是『誰負責通知誰』寫死，不是『大家互相通知』**。出事時人會慌，沒寫死的責任會 fall through the cracks。」

---

## Q6 示範：「Rollout 視窗禁區」

| 禁區類型 | 具體時段 | 原因 |
|---|---|---|
| 週末緩衝 | 週五 14:00 ~ 週一 10:00 | 週末無人 standby，bug 修不到 |
| 假日前後 | 國定假日前 1 工作日 ~ 假期結束後 1 工作日 | 同上 + 流量模式異常無法判讀 |
| 月底結算 | 每月最後 2 個工作日 | DevOps / 財務系統高峰，搶不到資源 fight fire |
| 重大行銷檔期前 | 行銷活動開跑前 3 天 | 上線 + 行銷流量混雜，無法驗證 H1 |
| 法務 / 法規空窗 | 免責聲明文案未經法務最終 sign-off | PRD §9 + 種子簡報「主要約束 §FX 燈號免責」要求 |

**允許 Go 視窗**：**週二 ~ 週四 10:00 ~ 16:00**（留 2–3 小時觀察 + 工程師完整工作日 standby）

### SmartTrip 排程套用視窗禁區

```
W1 (5/26 W2) D1 週二 10:00 → S1 Go（5%）       ✅ 週二早上 OK
W1 (5/29 W5) → 觀察期，不切階段                  ✅ 避開週五
W2 (6/2 W2) D1 → 評估 S1 → S2 Go criteria      ✅ 週二
W2 (6/2 W2) D1 10:00 → S2 Go（25%）            ✅ 週二早上 OK
W3 (6/9 W2) D1 → 評估 S2 → S3 Go criteria      ✅ 週二
W3 (6/9 W2) D1 10:00 → S3 Go（100%）           ✅ 週二早上 OK
W4 (6/16 W2) D1 → 驗證窗結束 review            ✅ 週二
```

**注意**：日期是示範。實際依當週是否有國定假日調整。

---

## 完整階段排程表（一頁看完）

| 階段 | 日期 | 使用者 | Feature Flag | Go criteria（簡） | Abort（簡） | 通訊 |
|---|---|---|---|---|---|---|
| **S1** | W1 D1 週二 10:00 ~ W1 D3 週四 18:00 | 5%（內部 + 早鳥） | 全 flag 開（5% 族群） | P0 incident=0 / FX error<1% / generate ≥ 95% / 燈號 ≥ 99% / core coverage ≥ 90% 各檔 / bundle ≤ 200KB / 客服 FAQ 完成 | FX error > 5%@5min OR generate < 70%@10min → 自動 rollback | Go 前日 + 當日 + 每日 24h 簡報 |
| **S2** | W2 D1 週二 10:00 ~ W2 D7 週日 23:59 | 25%（隨機 + 老客戶） | 全 flag 開（25% 族群） | 啟用率 ≥ 40% / 存檔率 ≥ 25% / 完成時間 < 3min / 外連點擊 ≥ 30% + S1 條件持續 | 啟用率 < 30% > 3 天 → 人工 abort review；其他 P0 同 S1 | S2 期間每日 + S2 結束 review |
| **S3** | W3 D1 週二 10:00 ~ W4 D7 週日 23:59 + 後續 30 天回訪 cohort 觀察 | 100% | 全 flag 開 | 30 天回訪 ≥ 20% / 換匯準確度 ≥ 60% / 差異化認知 ≥ 60% / 滿意度 ≥ 4/5 + 前兩階段持續 | P0 同上；驗證窗結束雙門檻未達 → 不進 V1 重檢定位 | S3 期間每週 + 驗證窗結束 Go-to-V1 meeting |

---

## 現場對話（~14 輪）

> 場景：60 分鐘會議第 40 分鐘，討論到 S2 → S3 的 Go criteria 啟用率門檻。

**PO**：「S2 → S3 的 Go criteria，啟用率門檻 40%——這是種子簡報寫死的數字，PRD §7 也鎖了。」

**PM**：「但 40% 是『假設值，需 P0-9 上線後校準』，PRD §7 自己寫的。我們現在 P0-9 才剛上，沒有歷史基準。萬一 S2 跑出來 35%，我們真的要 abort 嗎？」

**PO**：「不是 abort，是『不進 S3』。S2 階段已經放出去了，使用者繼續用——只是不放大到 100%。」

**DevOps**：「那 S2 要繼續延長還是直接收掉？」

**PO**：「**延長**。延到 W2 D7 還是 35%，就要回頭看『首頁 CTA 是不是不夠清楚』、『同行人數 / 心情選單是不是不夠快速』。這個 review 開完才決定要不要進 S3 或退回。」

**PM**：「那這條 abort criteria 怎麼寫？『啟用率 < 30% 持續 3 天 → 人工 abort review』？」

**PO**：「對。30% 是 absolute floor——比這個低就是『產品根本沒人要』，不是『差一點』。30%–40% 之間是『再給時間』，> 40% 是『達標可推進』。」

**DevOps**：「abort review 是把 25% 收回去到 5% 嗎？還是收回到 0%？」

**PO**：「**保持 25%**。已經放出去的不收回，避免使用者體驗倒退。但凍結，不放大。等 review 結論再決定下一步。」

**PM**：「使用者那邊呢？S2 階段已經 25% 用戶在用，他們不會看到任何變化吧？」

**PO**：「對。flag 只影響『新進入的使用者是否進到 25% bucket』，已經 in 的使用者繼續用。這就是為什麼 LaunchDarkly 的 sticky bucketing 重要。」

**DevOps**：「OK 我會把 alert 設成『啟用率 7-day rolling avg < 30% → Slack 提醒 PO』，這個不上 PagerDuty。」

**PO**：「對，這是 P2 觀察 alert，不是 P0/P1。**P0/P1 是技術 alert，這條是商業 alert**——商業 alert 走 Slack 不走 PagerDuty。」

**PM**：「最後一個問題：30 天回訪要等到 W4+30 才知道，可是我們 W4 就要決議 Go-to-V1。」

**PO**：「對。**Go-to-V1 review 在 W4 結束，但 H3 回訪驗證要等 W8（W4 + 30 天）才有完整數據**。所以 W4 的決議是『S3 期間的 7-day 回訪 ≥ 15% 暫定 Go → 啟動 V1 規劃但不開發』；W8 看 30 天回訪 ≥ 20% 才正式 Green light V1 開發。」

**PM**：「OK，那 V1 啟動分兩段：W4 規劃、W8 開發。寫進 decision log。」

**PO**：「對。**這就是為什麼種子簡報寫『4 週驗證窗』不夠精準——應該是『4 週 + 30 天 cohort 觀察』**。把這條當 finding 寫進 postmortem，未來專案 brief 模板要改。」

---

## 下游影響：本計畫如何流向 13-rollback-plan

### → 13-rollback-plan

本場定義的 abort criteria（P0 / P1 / P2）直接成為 13-rollback-plan 卡的**入口決策樹**：

```
P0 觸發 → 自動 rollback decision tree（無人工介入）
  ├── flag-level rollback（單一 flag 關閉）
  └── version-level rollback（整版本回滾，含資料 schema 處理）

P1 觸發 → 人工 abort review decision tree
  ├── PO 30 分鐘內回應 → 拍板
  └── PO 無回應 → DevOps lead 代理

P2 觸發 → 不 rollback，加強監控 + 下階段 review 重審
```

13-rollback-plan 會詳細寫每條 abort path 後的具體技術步驟（譬如「`ff_realtime_fx` 關閉前先確認 fallback 模擬資料有 cached、UI 標示『模擬』component 已正常顯示」）。本場不寫，只定 abort criteria。

### → 14-monitoring-runbook

本場定義的 abort 門檻（FX error > 5%、generate < 70%、JS error > 2%）直接變成 14-monitoring-runbook 的 **alert 規則**：

```yaml
# 14-monitoring-runbook 的 alert 設定（從本場直接引用）
- alert: FX_API_ERROR_RATE_CRITICAL
  expr: rate(fx_api_errors_total[5m]) / rate(fx_api_requests_total[5m]) > 0.05
  for: 5m
  severity: P0
  runbook: <link to 13-rollback-plan §FX flag rollback>
```

### → 15-postmortem

驗證窗結束後，無論 H1/H2/H3/H4 結果如何，都要開 postmortem——本場 SmartTrip 示範中的「W4 結束 review + W8 cohort review」就是 postmortem 的入口。

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（6 題的答案 + 3 階段排程 + abort criteria + 通訊計畫）
丟給 `card-fill` skill：

```
/card-fill register 12-release-plan <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/release-plan.md` 的範本結構，
產出符合契約的 markdown deliverable。

**本場會議的學習目標到 Q6 答完、3 階段 + abort criteria + 通訊計畫敲定就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**逼出 Go / abort 的具體數字、回滾邊界、通訊責任**」，不是「**寫對 markdown**」。
