# 13 Rollback Plan · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報（`demo/種子簡報.md`）+ 完整 PRD（`PRD.md`）+ 12-release-plan 排定的批次，
> 把上一份「關鍵提問.md」的六題實際答一遍。
> SmartTrip MVP 是 PWA + localStorage，沒有傳統 server 部署，但**仍有 3 個會痛的不可逆變更**：
> (1) FX rate API provider 切換、(2) PWA service worker 版本切換、(3) localStorage schema migration。
> 本場示範把這 3 個場景**完整跑到底**，每個含 5 個欄位（trigger / steps / data compat / user impact / 通訊）。

---

## Q1 示範：「什麼信號觸發 rollback？」

對應 PRD §7「成功指標」與 §6「P0-5 FX 換匯燈號」、「P0-8 即時匯率」、「P0-4 建議換匯現金額」三項 release，
明確列出 trigger 信號矩陣：

| 信號類型 | 指標 | 閾值 | 時間窗 | 動作 |
|---|---|---|---|---|
| 自動 | FX rate API 5xx error rate | > 10% | 連續 3 分鐘 | page on-call，人工 5 分鐘內決策 |
| 自動 | `generate` event p95 延遲 | > 180s | 連續 5 分鐘 | auto rollback to last stable build |
| 自動 | PWA service worker activation 失敗率 | > 5% | 過去 30 分鐘 | 暫停灰度，保留舊版 SW |
| 半自動 | 燈號計算偏離 MA30 異常（譬如 STRONG_BUY 但實際 ↑3%） | 任 1 件 | 立即 | page on-call + Dev 共同判斷 |
| 人工 | 客服收到「建議現金額異常」回報 | ≥ 3 件 | 30 分鐘 | 強制 rollback |
| 人工 | 使用者反映「PWA 卡住舊版本」 | ≥ 5 件 | 1 小時 | 啟動 SW force update 流程 |

**為什麼這 6 條信號夠**：對應 PRD §7 領先指標（啟用率、完成時間）+ 落後指標（換匯準確度 < 15%）+ PRD §6 P0-5/8 兩條關鍵功能 + 客服回報的 social signal。漏一條，下游 14-runbook 的 incident detection 就有 blind spot。

---

## Q2 示範：「rollback 步驟可逆嗎？資料 schema 怎麼處理？」（**本場關鍵**）

逐一檢視 3 個將上線的不可逆變更：

### 變更 A：FX rate API provider 從 Wise 切到台銀公開 API

- **code 可逆性**：✅ 100% 可逆，feature flag `fx_provider=wise|bot_tw` 一鍵切換。
- **資料相容性**：⚠️ 中度風險。Wise 回傳 `rate_per_unit`（per 1 JPY），台銀回傳 `rate_per_100`（per 100 JPY）。
  Adapter layer 必須統一為 `rate_per_1` 內部表示，並在 localStorage 寫入時帶 `provider` + `unit` 兩欄位。
- **rollback 策略**：dual-write 2 週——同時呼叫兩家 API，client 顯示 Wise 結果，台銀結果寫 shadow log。
  確認算式一致後再切主。rollback = flag 切回 wise，舊資料因為帶 `provider` tag 仍可正確解讀。

### 變更 B：PWA service worker 從 v3 升到 v4（新增 FX cache layer）

- **code 可逆性**：⚠️ SW 升級是「使用者下次開 PWA 才 activation」，rollback 必須走 **SW skipWaiting + clients.claim** 強制觸發，且要灰度 5% → 25% → 100%。
- **資料相容性**：✅ SW v4 的 cache key 帶版號（`fx-cache-v4`），rollback 到 v3 會自動忽略 v4 cache，重新抓 API。
- **rollback 策略**：發布 v4.0.1（內容 = v3）作為「rollback build」，使用者下次開啟 PWA 自動接收新 SW 並降版。
  灰度名單透過 query string `?sw_channel=stable|canary` 控制。

### 變更 C：localStorage schema v1 → v2（新增 `cash_buffer_pct` 欄位，PRD P0-4 強化）

- **code 可逆性**：❌ **不可 rollback**（這是 Q6 的補償方案情境，見下）。
- **資料相容性**：v2 寫入後 v1 code 讀不到 `cash_buffer_pct`，會 fallback 用 default `0.1`（PRD P0-4 算式）。
  使用者降版後燈號顯示正確，但若有自訂 buffer 會被重置為 10%。
- **rollback 策略**：**不走 rollback，走 forward fix**。詳見 Q6。

| 變更 | 可逆 | 資料策略 | feature flag | 灰度週期 |
|---|---|---|---|---|
| A. FX provider | ✅ | dual-write 2 週 | `fx_provider` | 1% → 10% → 50% → 100% |
| B. SW v3→v4 | ⚠️ | cache key 版號隔離 | `?sw_channel` | 5% → 25% → 100% |
| C. Schema v1→v2 | ❌ | 不可逆 + 補償 modal | `enable_v2_schema` | 整批 100% 但前置 down-migration 必須 ready |

---

## Q3 示範：「rollback 完成後使用者體驗會降到哪？」

| 場景 | rollback 後使用者看到什麼 | PO 是否簽核可接受 |
|---|---|---|
| A. FX provider rollback Wise → 台銀切回 Wise | 燈號計算延遲從 8s（台銀爬蟲）回到 3s（Wise API），**比降版前更快**。燈號數字會在 1 個 cycle（15 分鐘）內重算。 | ✅ 可接受。reverse-degradation，使用者實際體驗變好。 |
| B. SW v4 → v3 | 使用者下次開 PWA 看到一次自動 reload（約 2 秒白屏）。已存行程仍可讀。FX cache 失效要重抓一次。 | ✅ 可接受。in-app banner：「應用程式已更新，請稍候片刻」 |
| C. Schema v2 → v1（不可 rollback 情境下強制做）| 自訂 `cash_buffer_pct` 被重置為 10%。已存行程的建議換匯額會在下次開啟時**重新計算**，可能與使用者印象中的數字不同（±5%）。 | ⚠️ 條件接受。必須加 modal「您的緩衝設定已重置，是否查看詳情」+ 教學文章連結 |

**PO 的底線**：B 與 C 都要附對外文案，沒文案不准 rollback。A 不需要對外通訊（透明）。

---

## Q4 示範：「rollback 的通訊鏈條」

對 SmartTrip MVP（團隊 4 人：1 PO、2 Dev、1 DevOps、1 兼職客服）：

| 時間點 | 動作 | 負責人 | 樣板位置 |
|---|---|---|---|
| T+0（trigger 觸發）| Slack `#smarttrip-incident` 自動 alert + page on-call | PagerDuty | — |
| T+5 min | on-call DevOps page PO + 兼職客服 | DevOps | Slack DM 模板 `templates/page-po.md` |
| T+10 min | 決策 rollback 與否（5 分鐘判斷窗）| DevOps + PO 共識 | 決策矩陣 `templates/rollback-decision-tree.md` |
| T+15 min | 執行 rollback（A 場景）/ 發佈 v4.0.1（B 場景）/ 啟動補償 modal（C 場景）| DevOps | runbook 14 step-by-step |
| T+20 min | PO 發 status page（smarttrip-fx.statuspage.io）| PO | `templates/status-page-{a,b,c}.md` 三套 |
| T+30 min | 客服 FAQ 上架 + 推給 LINE 官方帳號訂閱者 | 客服 | `templates/customer-faq-{a,b,c}.md` |
| T+60 min | 若未解決，升級 CTO（兼任 PO，本例同一人）| DevOps | — |
| T+2 hr | 若仍未解決，in-app banner 推給所有使用者 | Dev | `templates/in-app-banner.md` |
| T+24 hr | 觸發 15-postmortem 排程（強制 72 小時內開）| DevOps | — |

**演練要驗證**：模板真的存在嗎？PagerDuty 真的能 page 嗎？statuspage.io 帳號權限對嗎？兼職客服在週末能不能 reach 到？

---

## Q5 示範：「rollback path 上次演練是什麼時候？」

| 場景 | 上次演練 | 執行人 | 耗時 | 發現問題 | 下次演練 |
|---|---|---|---|---|---|
| A. FX provider rollback | 2026-04-12 game day | DevOps Alice | 8 分鐘（目標 < 10）| Wise API key 在 vault 過期 → 已修；台銀爬蟲在週末會被擋 robots.txt → 加 UA 偽裝 | 2026-07 quarter game day |
| B. SW v3→v4→v3 演練 | 2026-04-19 staging | Dev Bob | 22 分鐘（目標 < 15）| **超時**。灰度名單沒寫好導致全量推送，緊急發 v4.0.1 才止血 → 加 query string 機制 | 2026-05-31（release 前 1 週，必跑）|
| C. Schema down-migration | **未演練**（C 是不可 rollback，演練的是補償 modal 流程）| Dev Carol | — | modal 文案 PO 還沒簽 → block release 直到 2026-05-30 簽完 + Dev 演練補償流程 | 2026-05-30 必跑 |

**Decision log**：
- B 場景因首次演練**超出 SLO（22 > 15 分鐘）**，已要求 release 前 1 週再跑一次。第二次未通過 → 直接打回 12-release-plan 重切批次。
- C 場景的補償 modal 演練改為 PO + Dev 雙人 walkthrough（PO 模擬使用者點選），非純技術演練。

---

## Q6 示範：「不可 rollback 變更的補償方案」（**示範變更 C**）

**變更 C：localStorage schema v1 → v2，新增 `cash_buffer_pct` 欄位**

| 欄位 | 內容 |
|---|---|
| trigger signal | release 後 24 小時內，若 `enable_v2_schema=true` 的使用者中：(a) PWA 啟動 crash 率 > 1%（過去 1 小時）or (b) 客服收到「建議現金額暴漲／暴跌」≥ 3 件 |
| rollback steps | **不走 rollback**。執行 forward fix：(1) feature flag `enable_v2_schema=false` 立刻關閉新使用者寫入 v2；(2) 推送 hotfix code v4.0.2，內含 down-migration script，啟動 PWA 時偵測 schema 版本，v2 → v1 自動轉換；(3) down-migration 失敗則顯示 modal「您的本地資料需要重置，是否匯出 PDF 後重置？」+ 點擊「匯出 PDF」按鈕（PRD P1「行程／換匯結果分享或匯出」已上線可重用） |
| data compatibility | down-migration 邏輯：`cash_buffer_pct` 欄位被丟棄前，先回寫到 localStorage 的 `_legacy_v2_backup` 鍵保留 30 天，方便日後手動救援 |
| user impact | 最壞情境：使用者看到 modal、點「匯出 PDF」、重置本地資料、PWA 自動 reload。預估 30 秒內可重新使用。已存行程不會消失（PDF 已匯出）。 |
| 通訊 | status page + in-app modal + 客服 FAQ v3（「為什麼我的緩衝設定不見了？」）+ 對應 PO 賠償方案：發 5 張 LINE Pay 50 元抵用券給受影響使用者（成本上限 NT$60,000，PO 已預算簽核） |

**Decision log**：本變更原本要在 sprint 5 上線，因為補償方案 PO 還沒簽 → 推遲到 sprint 6 + game day 演練後再上。
**理由**：「沒補償方案上線 = 把不可逆變更的風險轉嫁給使用者」，違反 Q6 原則。

---

## 現場對話（45 分鐘會議第 28 分鐘）

> 場景：DevOps 拋出 Q5，發現 SW 演練超時，PO 開始抗拒延期。

**DevOps**：「B 場景 SW v3→v4 演練 4/19 在 staging 跑了 22 分鐘，目標是 < 15 分鐘。超時。」

**PO**：「超時 7 分鐘有那麼嚴重嗎？我們不是說 release 5/15？」

**DevOps**：「超時的根因是灰度名單沒寫好，演練時直接全量推送，我們是手動發 v4.0.1 才止血。**事故當下不會有人手動發 hotfix，因為 hotfix 還沒寫。**」

**Dev Bob**：「對。我已經加了 `?sw_channel=stable|canary` 機制，但這版本還沒進 staging。」

**PO**：「那加完就好啦，5/15 還是來得及。」

**DevOps**：「加完要再演練一次。**沒演練的 rollback path 等於沒有 rollback path**。我要排 5/31 再跑一次 game day。」

**PO**：「5/31？那 release 不就要延到 6 月？」

**DevOps**：「對。**現在延 2 週，比上線爆炸後緊急 rollback 6 小時 + postmortem 3 天划算**。算總成本。」

**PO**：「⋯⋯但 5/15 是對外承諾的 deadline。」

**Dev Bob**：「我們上線的 P0-8 是即時匯率，這個跟 SW 升級沒綁。可以拆批次——5/15 先上 P0-8（變更 A，演練過了），SW 升級拆到 6/1。」

**DevOps**：「同意。**這就是 release 拆批次的價值**——把可逆 + 已演練的先上，不可逆 + 待演練的後上。
PO 你接受嗎？拆完 5/15 還是能對外宣布即時匯率上線。」

**PO**：「⋯⋯接受。但 decision log 寫『SW 升級因演練未達 SLO 延期 2 週，DevOps 與 PO 共識』。」

**DevOps**：「寫。這就是 decision log 的用途——三個月後若有人問『為什麼 SW 拖那麼久』，我們有依據。」

**Dev Bob**：「那我這週把 `?sw_channel` 機制寫完，5/24 自己先跑一次 dry run，5/31 跟 DevOps 一起正式演練。」

**DevOps**：「成交。Carol 那邊 schema v2 補償 modal 演練排 5/30，跟 SW game day 不衝突。會議結束。」

---

## 下游影響：本場會議產出如何流向 14-runbook 與 15-postmortem

| 本場產出 | 流向 |
|---|---|
| Q1 trigger 信號矩陣（6 條）| **14-runbook §incident detection**：每條信號 → 一個 incident type → 一份 detection→diagnosis→mitigation 流程 |
| Q2 rollback 矩陣（A/B/C 變更）| **14-runbook §mitigation step**：每個 incident 的「應急動作」直接引用對應 rollback path |
| Q3 PO 簽核的「可接受降級」清單 | **14-runbook §user-impact section**：on-call 工程師判斷「是否該按 rollback」的依據 |
| Q4 通訊鏈條（含模板位置）| **14-runbook §escalation matrix**：page 順序、talking points、status page 模板 |
| Q5 演練紀錄（含發現問題）| **15-postmortem** game day 後復盤的素材；下次 release 前 retrospective 引用 |
| Q6 不可 rollback 變更清單 + 補償方案 | **14-runbook §forward-fix playbook**：當 rollback 不可用時的對應流程；**15-postmortem** action item 的源頭 |

**Decision log（給下次 release 用）**：
- 凡屬「不可 rollback + 沒補償」的變更，一律打回 12-release-plan 重切批次，不接受「上線後再寫」。
- 凡屬「可 rollback 但未演練」的變更，**release 前 1 週內必須演練完成**，未完成則打回拆批次。
- game day 至少每 quarter 1 次，所有 rollback path 至少**每 6 個月演練 1 次**。

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（6 題的答案 + 12-release-plan 變更清單 + PRD P0-5/P0-8）
丟給 `card-fill` skill：

```
/card-fill register 13-rollback-plan <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/rollback-plan.md` 的「輕量範本」或「完整範本」結構，
產出符合契約的 markdown deliverable，包含 rollback 矩陣 + 演練紀錄 + 通訊模板索引。

**本場會議的學習目標到 Q6 答完就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**逼出每一條變更的 rollback path，並把不夠成熟的打回去**」，不是「**寫對 markdown**」。
