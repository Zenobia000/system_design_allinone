# 15 Postmortem · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報（`demo/種子簡報.md`）+ 完整 PRD（`PRD.md`）+ 13-rollback-plan 變更 A（FX provider 切換）+ 14-runbook 04（燈號異常）的素材，
> 把上一份「關鍵提問.md」的六題實際答一遍。
> **虛構 incident**：「FX rate provider 切換時，從 Wise 切到台銀 API，匯率單位（per 100 JPY vs per 1 JPY）解析錯誤，
> 導致 6 小時內 1,200 個行程的建議現金額算成原本的 1/100，使用者去日本帶不夠錢被 4 人在客服反應。」
> 完整跑一份 postmortem 結構。

---

## INCIDENT-2026-05-10-001 · FX Unit Mismatch Postmortem

| 欄位 | 內容 |
|---|---|
| 事故編號 | INCIDENT-2026-05-10-001 |
| 嚴重程度 | SEV-1（觸及 PRD G4 內容信任）|
| 發生時間 | 2026-05-10 14:00 ~ 2026-05-10 20:42（持續 6 小時 42 分鐘）|
| Postmortem 日期 | 2026-05-12（事故止血後 48 小時內）|
| 與會者 | DevOps Alice（主持）、PM Daniel、Dev Bob（事故當事人）、QA Carol |
| 文件版本 | v1.0 published 2026-05-13 |

---

## 1. Summary

2026-05-10 14:00–20:42（6h42m），FX rate adapter 將台銀 API 的 `rate_per_100_JPY` 誤當作 `rate_per_1_JPY` 處理，
導致 1,200 個使用者生成的行程「建議換匯現金額」被算成正確值的 **1/100**。
4 名使用者在客服回報「依建議換匯後到日本現金不夠」。
事故由 mitigation step：啟動 feature flag `fx_signal_show=false` 隱藏燈號 + flag `fx_provider=wise` 切回 Wise + 推送 hotfix。
影響使用者中 800 人尚未實際出國，已透過 in-app banner 通知重新生成；400 人已出國，PO 已發 LINE Pay 100 元抵用券。

---

## 2. Timeline（≥ 6 個時間點）

| 時間 | 事件 | 來源 |
|---|---|---|
| **2026-05-09 18:00** | 13-rollback 變更 A 上線：FX provider feature flag `fx_provider` 上線，灰度 1% → 10% → 50% → 100%（按計畫推進）| Release ticket #421 |
| **2026-05-10 12:30** | 灰度進入 100%，所有使用者開始使用台銀 API 路徑 | LaunchDarkly audit log |
| **2026-05-10 14:00** | **第一個使用者影響**：使用者 user_id=8273 生成日本行程，建議現金額顯示「¥150」（正確應為 ¥15,000）。使用者沒察覺，存檔。| Access log 反推 |
| **2026-05-10 14:00 – 20:00** | **detection gap 6 小時**：期間 1,200 個行程被影響，無自動 alert 觸發（燈號 sanity check 尚未上線）| Sentry / Grafana 無事件 |
| **2026-05-10 20:00** | 客服收到第 1 件回報「我已經到日本但現金不夠」（user_id=4521）| Zendesk ticket #1932 |
| **2026-05-10 20:05** | 客服 Slack `#smarttrip-incident` 通報，DevOps Alice ACK（5 分鐘內，符合 SLA）| Slack log |
| **2026-05-10 20:10** | Alice 開 Runbook 04，第一步 Diagnosis 看 `fx-signal-audit` dashboard，發現 JPY 數字異常 | Grafana access log |
| **2026-05-10 20:25** | Alice 嘗試執行 `launchdarkly toggle fx_signal_show --value=false`，**權限不足**，page Dev Bob 拿到 admin 權限 | LaunchDarkly error log |
| **2026-05-10 20:40** | Bob 上線給 Alice 權限，Alice 執行 toggle，燈號隱藏。同時執行 `fx_provider --value=wise` rollback。| LaunchDarkly audit log |
| **2026-05-10 20:42** | **Mitigation 完成**：新生成的行程改用 Wise API，數字正確。 | Verify on staging + prod |
| **2026-05-10 22:00** | 客服 FAQ 與 in-app banner 上架，PO Daniel 發 status page | Status page |
| **2026-05-11 02:00** | Bob 推送 hotfix（FX adapter unit 轉換邏輯），staging 驗證通過 | PR #889 |
| **2026-05-11 10:00** | hotfix 灰度 100%，重新開啟 `fx_provider=bot_tw` 但有正確 unit 轉換 | LaunchDarkly audit log |
| **2026-05-11 14:00** | PO 發送 LINE Pay 100 元抵用券給 400 名已出國使用者 | LINE Pay batch log |
| **2026-05-12 10:00** | Postmortem 會議召開 | This document |

---

## 3. Impact（量化）

| 維度 | 數字 |
|---|---|
| **影響使用者數** | 1,200 個生成的行程（去重後 980 個唯一使用者）|
| **影響細分** | 800 人尚未實際出國（可重新生成）；400 人已出國（其中 4 人現金不夠回報客服）|
| **SLO 消耗** | PRD §7「換匯準確度誤差 < 15% 比例 ≥ 60%」：受影響期間此比例掉到 **8%**（誤差 99%），整體月度 SLO 從 65% 掉到 **48%**（breached）|
| **PRD §2 G4「內容信任」影響** | 4 件直接客服回報「不再信任 SmartTrip 的建議」，另有 12 件「建議怪怪的」（驗證 G4 滿意度 ≥ 4/5 受威脅）|
| **客服 ticket 數** | 16 件（事故當週 vs 平均週 3 件）|
| **直接金錢補償** | NT$40,000（400 人 × 100 元 LINE Pay 抵用券）|
| **間接成本** | 90 分鐘 postmortem × 4 人 + Bob 加班 hotfix 6 小時 + Alice on-call 加班 3 小時 ≈ NT$30,000 工時 |
| **PRD §10 timeline 影響** | MVP 4 週驗證窗第 2 週數據被汙染，需延 1 週驗證窗（觸及 PRD §2 G2「核心假設驗證」）|

---

## 4. Detection

**怎麼被發現的**：客服收到使用者回報（**人工**）。
**為什麼這時間才發現**：
- 燈號異常的自動 alert（Runbook 04 Detection 段第一條）**尚未上線**——對應 PRD P0-9「基本使用分析」待補的根本性 gap。
- DevOps 每日 dogfood 流程（Runbook 04 Detection 段第三條）**尚未實施**——當時 Runbook 04 還在草稿階段。
- 唯一 catch 信號的是客服回報，**人工延遲 6 小時**。

**detection gap 分析**：
- 第一個使用者影響：14:00
- 第一個 alert（其實是客服回報）：20:00
- **detection gap = 6 小時**
- 業界 SEV-1 detection gap 目標 < 15 分鐘 → **gap 超標 24 倍**

**為什麼 detection 設計缺失**：
燈號正確性不是「server 掛了」這種 binary 信號，是「算式對不對」這種 semantic 信號。
團隊在 09-NFR 階段定義的 SLO 全是 latency / availability，**沒有定義 correctness SLO**——這是制度層面的 detection blind spot。

---

## 5. Root Cause

使用 5-whys 推到底（避免 root cause fallacy）：

| Why-N | 問題 | 答案 |
|---|---|---|
| Why-1 | 為什麼建議現金額算成 1/100？ | FX adapter 把台銀的 `rate_per_100_JPY` 當作 `rate_per_1_JPY` 使用。 |
| Why-2 | 為什麼 adapter code 沒處理 unit 轉換？ | PR #815 review 兩位 reviewer（Carol + Alice）都未察覺 unit 差異，code merge 通過。 |
| Why-3 | 為什麼 review 抓不到？ | 10-CR checklist 沒有「外部 vendor 整合 unit 一致性」這條檢查項；reviewer 沒有對照 vendor 原始 doc。 |
| Why-4 | 為什麼 checklist 沒這條？ | SmartTrip 過去只接過 Wise 一家，這是首次 multi-vendor 整合；checklist 沒有針對 multi-vendor 場景更新。 |
| Why-5 | 為什麼首次 multi-vendor 整合沒有特殊驗證流程？ | 13-rollback Game Day（2026-04-12）演練只驗證「provider 切換成功 + latency 達標」，**未驗證「兩家 provider 回傳值是否語意一致」**。 |

**Root Cause（制度層次）**：
**13-rollback Game Day 演練 SOP 缺少「跨 provider 資料語意一致性驗證」項目；10-CR checklist 缺少「multi-vendor 整合 unit / scale / encoding 一致性」檢查項。** 兩個制度缺口同時存在，導致這個 bug 一路滑過 review → 演練 → release → 6 小時無人察覺。

**避免 root cause fallacy 的說明**：
「Bob 寫錯 unit 轉換」**不是** root cause，是徵狀。
任何工程師在 multi-vendor 首次整合且沒有對應 checklist 與演練項目的情況下，都有極高機率犯同類錯誤。
制度設計的責任是「**讓寫錯的東西被攔下來**」，不是依賴「個人小心」。

---

## 6. Contributing Factors（≥ 3 條）

| # | 類別 | Factor | 為什麼貢獻了事故嚴重程度 |
|---|---|---|---|
| 1 | **監控** | 燈號正確性無自動 sanity check，09-NFR 未定義 correctness SLO | detection gap 從理論上的 5 分鐘變實際 6 小時，影響擴大 70 倍 |
| 2 | **演練** | 13-rollback Game Day 未驗證「跨 provider 語意一致性」 | 事故在 release 前就有機會被攔下，但演練 SOP 沒覆蓋這個面向 |
| 3 | **Review** | 10-CR checklist 缺少 multi-vendor 整合檢查項 | PR #815 兩個 reviewer 都漏看，制度沒給他們對的 prompt |
| 4 | **權限** | on-call 默認沒有 prod LaunchDarkly admin 權限 | Mitigation 完成時間延誤 15 分鐘（從 20:25 到 20:40），多影響 ~50 個生成 |
| 5 | **時間點** | 事故發生在週五傍晚，週末客服人力低 | 第一個客服回報延遲（若平日可能 1 小時內就發現，週末拖到 6 小時）|
| 6 | **文化** | 「過去 Wise 都沒問題」的心理捷徑讓團隊低估 multi-vendor 切換風險 | Game Day 演練被簡化、PR review 不夠謹慎 |

---

## 7. What Went Well（真的做對的事，要保留並推廣）

| # | 做對的事 | 為什麼這是 well 不是客套 | 推廣方向 |
|---|---|---|---|
| 1 | feature flag `fx_signal_show` 與 `fx_provider` 設計到位 | Mitigation 5 分鐘內完成止血，否則事故會持續到隔天早上（再 +12 小時）影響 ~2,400 個行程 | 09-NFR §operability：所有「資料正確性相關功能」必須有 kill switch flag |
| 2 | 客服 FAQ 模板架構在事故前 1 週剛建立（雖然 fx-unit-mismatch 模板沒準備）| 30 分鐘內就上架了 v3.3 客製化 FAQ，否則客服會 ad-hoc 回覆造成二次資訊混亂 | 14-runbook 通訊段強制要求所有 SEV-1/2 runbook 都附 talking points 模板 |
| 3 | on-call ACK 在 SLA 內（5 分鐘）| PagerDuty 設定 + on-call rotation 表生效，無單點失敗 | 維持現有 PagerDuty 配置 |
| 4 | DevOps Alice 在 page Bob 之前已先自行 diagnosis（看完 Runbook 04 Step 1-2 才求援）| 減少 Bob 的上下文切換時間 | 寫進 on-call onboarding：被 page 後第一個 5 分鐘自己跑 Diagnosis，再決定要不要 page 別人 |
| 5 | PO 在事故 24 小時內就簽核補償方案 | 避免「賠償拖很久」二次客訴 | 14-runbook 04 已有預備的補償方案 talking points，PO 簽核流程順暢 |

---

## 8. What Went Poorly（具體做錯的事，制度層次，不指人）

| # | 做錯的事 | 制度層次的問題（不指人） |
|---|---|---|
| 1 | detection gap 6 小時 | 09-NFR 未定義 correctness SLO；P0-9 監控未上線；Runbook 04 自動化 detection 尚未實作 |
| 2 | mitigation 延誤 15 分鐘 | 權限制度（on-call 沒 prod LaunchDarkly admin）｜對應 14-runbook 的 Q2 動作執行可行性 gap |
| 3 | PR #815 review 未察覺 unit 差異 | 10-CR checklist 缺 multi-vendor 整合條目；reviewer 沒有可參照的 prompt |
| 4 | Game Day 演練未驗證跨 provider 語意 | 13-rollback 演練 SOP 模板缺漏；過去成功經驗造成 SOP 簡化 |
| 5 | 補償方案文案臨時寫 | 14-runbook 04 雖有 talking points 草稿，但補償細節（金額、券種、發放對象 criteria）事故當下才決定 |
| 6 | in-app banner 文案不夠清楚（部分使用者反映「看不懂要重新生成」）| 14-runbook 04 通訊段的 in-app banner 模板 v1 太技術導向，未經 UX review |

---

## 9. Action Items（≥ 5 條，分 prevent / detect / mitigate 三類）

### Prevent（讓它不再發生）

| # | Action | Owner | Due Date | Acceptance Criteria | 流向 |
|---|---|---|---|---|---|
| P1 | 在 10-CR checklist 新增「外部 vendor 整合 unit / scale / encoding 一致性檢查」條目，並 retroactive review 過去 3 個 vendor 整合 PR | QA Carol | 2026-06-10 | checklist v2.1 已 merge；過去 3 個 PR retroactive review 報告已上 wiki | **塞回 10-CR** §multi-vendor-integration |
| P2 | 13-rollback Game Day SOP 模板新增「跨 provider 語意一致性驗證」必填項目，下次 game day 演練必走 | DevOps Alice | 2026-06-30 | SOP 模板 v2 已 merge；2026-07 quarter game day 已使用新模板 | **塞回 13-rollback** §演練 SOP |

### Detect（更快發現）

| # | Action | Owner | Due Date | Acceptance Criteria | 流向 |
|---|---|---|---|---|---|
| D1 | 建立 daily FX sanity check cron job（對比 raw vendor response 與內部表示，異常即 page）| Dev Bob | 2026-06-15 | staging 上能在 < 5 分鐘觸發 unit 不一致 case；prod 已上線並通過 1 週無 false positive | **塞回 14-runbook 04** §Detection 第一條從半手動升級為自動 alert |
| D2 | 在 09-NFR 新增「correctness SLO」類別：定義「燈號顯示 vs 實際匯率方向一致性 ≥ 99%」等可量測指標 | DevOps Alice + PM Daniel | 2026-06-20 | 09-NFR v2.0 已 merge；對應 alert rule 已寫進 Grafana | **塞回 09-NFR** §correctness-slo（新增段落）|
| D3 | 04-AC 新增「外部 vendor 整合驗收場景」：Given Wise→台銀切換 When 生成行程 Then 建議現金額誤差 < 5% 對照 baseline | QA Carol + PM Daniel | 2026-06-25 | 04-AC v3.0 已 merge；對應 E2E test 已寫並通過 | **塞回 04-AC** §integration-acceptance |

### Mitigate（更快復原）

| # | Action | Owner | Due Date | Acceptance Criteria | 流向 |
|---|---|---|---|---|---|
| M1 | 所有 on-call rotation 成員默認 provisioning prod LaunchDarkly admin 權限（scoped 至事故 flag 群組）| DevOps Alice | 2026-05-31 | IaC（Terraform）PR 已 merge；新 on-call onboarding 流程自動 provisioning；過去 1 個月所有 oncall 已驗證可登入 | **塞回 14-runbook** §oncall-onboarding |
| M2 | 14-runbook 04 燈號異常新增「DevOps 每日早 09:00 強制 dogfood」步驟 + calendar 排程 | DevOps Alice | 2026-05-30 | Runbook 04 v1.1 已 merge；Google Calendar 排程已建立並指派 on-call | **塞回 14-runbook 04** §Detection 第三條 |
| M3 | 14-runbook 04 通訊段所有 in-app banner 模板必須經 UX review，refactor 既有 6 個 SEV-1/2 模板 | PM Daniel（找外部 UX）| 2026-07-15 | 6 個模板已通過 UX review；用 5 名 dogfood 使用者測試「能否在 30 秒內理解該怎麼做」≥ 80% | **塞回 14-runbook** §communication-templates |

**Total: 8 條 action items**（Prevent 2 + Detect 3 + Mitigate 3，超過最低 5 條要求）

---

## 10. Action Items 追蹤計畫

- **追蹤人**：DevOps Alice
- **追蹤頻率**：每週 PM standup 報進度（顯示完成率）
- **30 天 review**：2026-06-12 召開 30 天追蹤會議
- **完成率門檻**：< 80% 強制升級給 leadership（PO + CTO）
- **下次 postmortem 預讀**：若同類事故再發生（即使是不同 vendor），自動升級為 leadership-level postmortem
- **action item 狀態存放**：Linear project `INCIDENT-2026-05-10-001-actions`，所有 PR 自動關聯

---

## 現場對話（90 分鐘會議第 55 分鐘）

> 場景：DevOps 拋出 Q3（Root Cause），Dev Bob 開始自責，DevOps 立刻拉回 blameless。

**DevOps Alice**：「Q3 root cause。Bob，你的看法？」

**Dev Bob**：「就是我寫錯了 unit 轉換。對不起，我以後會更仔細⋯⋯」

**DevOps Alice**：「停。**這不是 root cause，這是 contributing factor 中的『個人徵狀』**。Bob 你今天不在場、是 Carol 寫 adapter，她也一樣會犯，因為 checklist 沒這條。」

**PM Daniel**：「對啊，我看 PR #815 那個 diff，沒對照 vendor doc 真的看不出來 unit 差。」

**QA Carol**：「我是 reviewer 之一，我也沒抓到。」

**DevOps Alice**：「所以 root cause 不是 Bob，是**制度**。我們現在用 5-whys 推到底——為什麼系統允許這個錯誤滑過？」

**Dev Bob**：「⋯⋯Why-1 是 adapter 沒處理 unit。Why-2 是 PR review 沒抓到。Why-3 是 checklist 沒這條。Why-4 是過去只有 Wise 一家，沒有 multi-vendor 經驗。Why-5⋯⋯」

**QA Carol**：「Why-5 是 13-rollback game day 演練只測『切換成功』，沒測『切換後語意一致』。」

**DevOps Alice**：「對。所以 root cause 是『13-rollback game day SOP 缺乏跨 provider 一致性驗證 + 10-CR checklist 缺 multi-vendor 整合條目』。**兩個制度缺口同時存在**。」

**Dev Bob**：「⋯⋯這樣寫我比較不會自責。」

**DevOps Alice**：「**這就是 blameless 的目的**——不是讓你不負責，是讓你能誠實參與 postmortem。如果你怕被罵，下次出事你會藏資訊，那大家都死。」

**PM Daniel**：「同意。Bob，你不用道歉。你的 action item 是 D1（daily sanity check），這是制度補強，不是處罰。」

**Dev Bob**：「⋯⋯OK。我接 D1，2026-06-15 之前做完。」

**DevOps Alice**：「成交。Carol 接 P1（10-CR checklist 更新）。我接 P2（game day SOP）+ M1（權限）+ M2（dogfood 排程）。Daniel 接 M3（UX review）+ D3（AC）。Q5 三類別 8 條全部有 owner、有 due date、有 acceptance。」

**PM Daniel**：「會議結束前最後 5 分鐘——Bob，這場會議你覺得 blameless 嗎？哪一句話讓你不舒服？」

**Dev Bob**：「⋯⋯沒有不舒服。一開始我自己想道歉，但你們拉回來了。我覺得這場開得 OK。」

**DevOps Alice**：「好。寫進會議紀錄『當事人 blameless check：通過』。30 天後 2026-06-12 我們追蹤 action items。散會。」

---

## 下游影響：本場 postmortem 的 action items 如何塞回上游卡

| Action | 流向卡片 | 流向卡片的哪一段 | 形成閉環 |
|---|---|---|---|
| P1（10-CR multi-vendor checklist）| **10-CR** | §multi-vendor-integration（新增）| 下次同類 PR review 會被攔下 |
| P2（13-rollback game day SOP 加跨 provider 驗證）| **13-rollback-plan** | §演練 SOP 模板 | 下次 game day 演練會發現此類問題 |
| D1（daily FX sanity check）| **14-runbook 04** | §Detection 第一條（從半手動升自動）| Runbook 04 detection 時間從 6 小時 → < 5 分鐘 |
| D2（correctness SLO）| **09-NFR** | §correctness-slo（新增段落）| 之後所有 release 都受 correctness SLO 約束 |
| D3（外部 vendor 整合 AC）| **04-AC** | §integration-acceptance（新增段落）| 之後 vendor 切換必須通過 AC 才能 release |
| M1（on-call 權限 IaC）| **14-runbook** | §oncall-onboarding | 新 on-call 自動拿到正確權限，mitigation 不再卡 |
| M2（dogfood 排程）| **14-runbook 04** | §Detection 第三條 | 每日 09:00 強制 dogfood 補上自動化盲區 |
| M3（in-app banner UX review）| **14-runbook** | §communication-templates | 所有對外通訊模板品質提升 |

**閉環驗證**：30 天後（2026-06-12）的追蹤會議要驗證：
- ✅ 所有 8 條 action item 已 merge 進對應上游卡
- ✅ 所有對應卡片的 deliverable 文件已 update
- ✅ 對應的 PR / commit hash 已記錄
- ✅ 若有 action item 未完成，當場排升級或 deprioritize 決策

**Decision log（給下次同類事故用）**：
- 若 2026-06 之後仍發生 multi-vendor 整合類事故，**自動升級為 leadership-level postmortem**，因為這代表 action items P1/P2/D1/D2/D3 中至少有一條沒做到位。
- 若 30 天後完成率 < 80%，升級給 leadership（PO + CTO）討論「為什麼 action items 接不下」，可能要 deprioritize 別的 backlog 出來做。
- 補償方案的成本上限（NT$100,000）已被 PO 視為「未來同類事故的預設預算」，寫進 14-runbook 04 的 talking points 預備清單。

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（6 題的答案 + 14-runbook 04 執行紀錄 + 事故時間軸的 Slack / Grafana 截圖）
丟給 `card-fill` skill：

```
/card-fill register 15-postmortem <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/postmortem.md` 的「完整範本」結構，
產出符合契約的 markdown deliverable，含 Summary / Timeline / Impact / Detection / Root Cause / Contributing Factors / Well / Poorly / Action Items 九段。

**本場會議的學習目標到 Q6 答完就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**把事故的教訓制度化成可追蹤的 action items，塞回上游卡**」，不是「**寫對 markdown**」。

---

## 補充：blameless 文化的具體實踐 checklist

postmortem 主持人（DevOps）每次會議結束前自我檢核：

- ☐ 全程沒有出現「該員」「他」「她」這類指人代詞，用「角色 / 制度」代替
- ☐ 沒有任何 action item 寫「教育訓練」「以後注意」「下次小心」
- ☐ Root cause 寫到「制度 / 工具 / 流程」層次，不停在「個人徵狀」
- ☐ 每個 action item 有 owner + due date + acceptance（不接受「DevOps 處理」「之後排」）
- ☐ 結束前 5 分鐘問當事人「blameless check」並寫進會議紀錄
- ☐ 30 天追蹤日期已排進 calendar

少一條，這場 postmortem 沒開完。
