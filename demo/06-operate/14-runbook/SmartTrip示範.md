# 14 Runbook · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報（`demo/種子簡報.md`）+ 完整 PRD（`PRD.md`）+ 13-rollback-plan 的 trigger 矩陣，
> 把上一份「關鍵提問.md」的六題對 **5 大常見 incident** 都實際答一遍。
> 每份 runbook 完整含 Detection → Diagnosis → Mitigation → Escalation → Communication 五段。
> SmartTrip MVP 規模小但 PWA + 第三方 FX API + localStorage 的組合**剛好涵蓋現代產品的典型故障面**。

---

## Q1 + Q2 + Q3 + Q4 + Q5 合答：5 大 incident runbook 完整版

下面 5 份 runbook 每份**完整跑 Q1–Q5 五題**，Q6 演練週期統一寫在最後。

---

### Runbook 01 · FX rate API 不可用（service worker 拿到 5xx）

| 欄位 | 內容 |
|---|---|
| **Detection** | Alert `fx_api_5xx_rate_high`（Grafana rule #42），閾值 `error_rate > 10% over 3min`，**SEV-2**。Primary on-call（PagerDuty rotation `devops-primary`）15 分鐘 SLA 內 ACK。**MVP 階段 P0-9 未上線時**：客服收到「燈號顯示不出來」≥ 3 件 / 30 分鐘為手動 trigger。 |
| **Diagnosis** | (1) 開 `https://grafana.smarttrip.io/d/fx-overview`，看 `FX provider response time` panel。(2) 若 `wise` 紅、`bot_tw` 綠 → 走 Mitigation A；若兩家都紅 → 走 Mitigation B；若都綠但 latency > 5s → 走 Mitigation C。(3) 同步開 `https://status.wise.com` 確認 vendor 端是否公告事故。 |
| **Mitigation A**（單 provider 失效，**可逆**）| Step 1：執行 `launchdarkly toggle fx_provider --value=bot_tw --env=prod`（30 秒生效）。Step 2：驗證 `provider_active_pct` 中 `bot_tw` → 100%。Step 3：開 5 分鐘觀察窗，若燈號正常即解除。預期復原時間：**< 5 分鐘**。 |
| **Mitigation B**（全 provider 失效，**可逆**）| Step 1：執行 `launchdarkly toggle fx_show_cached --value=true`，PWA 改顯示「最後一次成功抓取」的 cached rate + 標註時戳「（資料更新於 X 分鐘前）」。Step 2：執行 `launchdarkly toggle fx_signal_show --value=false`，**強制隱藏 STRONG_BUY/BUY/HOLD 燈號**（避免誤導）。Step 3：打開 status page 公告。預期復原時間：依 vendor SLA，通常 < 1 小時。 |
| **Mitigation C**（FX 慢但活著，**可逆**）| Step 1：開 `https://grafana.smarttrip.io/d/sw-cache`，看 `fx_cache_hit_rate`。若 < 60% → 執行 `launchdarkly toggle fx_cache_ttl --value=1800`（30 分鐘）強化 cache。Step 2：5 分鐘後重看 latency。若仍 > 5s → 升級走 Mitigation B。 |
| **Escalation** | mitigation 後 15 分鐘事故仍持續 → page secondary on-call（PagerDuty rotation `devops-secondary`）。30 分鐘仍持續 → page PO（電話：vault `oncall-phonelist`）+ 啟動 status page。SEV-1 升級條件：使用者影響 > 1000 人 OR 持續 > 2 小時 → 強制 page CTO。 |
| **Communication** | T+5min：DevOps 發 Slack `#smarttrip-incident` + DM PO（模板 `templates/page-po-sev2.md`）。T+20min：PO 發 status page（模板 `templates/status-page-fx-down.md`）。T+30min：客服 FAQ v3.1 上架（模板 `templates/customer-faq-fx-down.md`）。T+2hr：若未解，Dev 推 in-app banner（模板 `templates/in-app-banner-fx-degraded.md`）。 |

---

### Runbook 02 · localStorage quota 滿（PWA 寫入失敗）

| 欄位 | 內容 |
|---|---|
| **Detection** | Alert `localStorage_write_fail_rate`（Sentry rule #18），閾值 `error_rate > 1% over 10min`，**SEV-3**。Primary on-call 30 分鐘 SLA。**手動 trigger**：客服收到「行程儲存不成功」≥ 5 件 / 1 小時。**已知影響**：PRD P0-6「儲存行程」與 P0-7「開支紀錄」會卡住。 |
| **Diagnosis** | (1) 開 Sentry `https://sentry.io/organizations/smarttrip/issues/?query=quotaExceeded`，看堆疊。(2) 確認是 `QuotaExceededError` 還是別的 storage error。(3) 看 affected user agent——是 iOS Safari（quota 較小，5MB）為主還是 Android Chrome（10MB）為主。 |
| **Mitigation 1**（**可逆**，前端策略）| Step 1：執行 `launchdarkly toggle ls_cleanup_aggressive --value=true`，PWA 啟動時自動清掉 30 天前的「未存檔」生成結果（不影響已存行程）。Step 2：驗證 24 小時內 quotaExceeded 事件數應 ↓ 50%。預期復原時間：**< 1 小時**（隨使用者下次開啟 PWA 自動清理）。 |
| **Mitigation 2**（**可逆**，使用者主動）| Step 1：若 Mitigation 1 不足，發布 hotfix 在偵測到 quota 將滿時跳 modal「您的本地資料即將滿，是否匯出 PDF 並清理？」（重用 PRD P1「行程／換匯結果分享或匯出」）。Step 2：使用者點「匯出 PDF」→ 自動清理超過 60 天的歷史行程。**注意**：不可逆動作（清掉資料），modal 必須使用者主動確認。 |
| **Mitigation 3**（最後手段，**不可逆 ⚠️ DANGER**）| 若有單一使用者報案 quota 完全爆炸無法使用，**且**該使用者已同意匯出 PDF：客服指導使用者執行 `localStorage.clear()`（瀏覽器 DevTools console）。**必須 2 人 review 才能告知使用者執行**（DevOps + PO 雙簽）。 |
| **Escalation** | 若 24 小時內 affected user > 50 人 → 升級為 SEV-2，page PO 評估是否要做 server-side migration（屬 V1 範圍，需評估提早）。若 affected user > 200 人 → SEV-1，啟動 status page。 |
| **Communication** | T+30min：DevOps Slack `#smarttrip-incident` 通報。T+1hr：客服 FAQ v3.2「為什麼我的行程儲存不成功？」上架（含教學圖：如何匯出 PDF 釋放空間）。T+24hr：若仍持續，PO 發 LINE 官方帳號通知所有訂閱者。**不發 status page**（SEV-3 影響範圍小）。 |

---

### Runbook 03 · PWA service worker 更新失敗（卡舊版）

| 欄位 | 內容 |
|---|---|
| **Detection** | Alert `sw_activation_fail_rate`（Sentry rule #25），閾值 `error_rate > 5% over 30min`，**SEV-2**。Primary on-call 15 分鐘 SLA。**已知影響**：使用者卡在舊版 PWA，看不到新功能 / 新 bug fix。**最痛的場景**：新版有 critical bug fix 但使用者拿不到。 |
| **Diagnosis** | (1) 開 `https://grafana.smarttrip.io/d/sw-overview`，看 `sw_version_distribution` panel——看新版（譬如 v4）滲透率。(2) 看 `sw_activation_error` panel，分類 error type：(a) `network failure during install`、(b) `clients.claim timeout`、(c) `cache.put quota`。(3) 同步看 `https://web.dev/pwa-checklist` 對應的 SW lifecycle。 |
| **Mitigation A**（**可逆**，灰度暫停）| 對應 error type (a)：Step 1：執行 `launchdarkly toggle sw_rollout_pct --value=0`，暫停新版灰度。Step 2：已收到新版的使用者保留新版（無回退）；尚未收到的使用者繼續用舊版。Step 3：開 24 小時觀察窗，Dev 在 staging 重現 install failure。 |
| **Mitigation B**（**可逆**，強制 force update）| 對應使用者「卡舊版回報」≥ 5 件：Step 1：發布 v4.0.1（內容 = v4 + `self.skipWaiting()` + `clients.claim()` 加強）。Step 2：執行 `launchdarkly toggle sw_force_update --value=true`，讓 v4.0.1 強制接管。Step 3：使用者下次開 PWA 自動 reload（約 2 秒白屏，已加 in-app banner 提示）。 |
| **Mitigation C**（最後手段，**不可逆 ⚠️ DANGER**）| 若 v4.0.1 仍無法 force update 且事故 SEV 升級為 1：發 v4.0.2「rollback build」內容等於 v3，讓使用者降級。**必須 2 人 review**（DevOps + Dev）+ 對應 13-rollback-plan 變更 B 的演練紀錄查驗。**注意**：這是 13-rollback 的 SW rollback path，演練紀錄見 13-rollback-plan SmartTrip 示範 Q5 表格。 |
| **Escalation** | 卡舊版 affected user > 100 人 → SEV-1，page PO + CTO。客服回報「使用者無法升級」≥ 10 件 / 1 小時 → 直接升 SEV-1。 |
| **Communication** | T+5min：DevOps `#smarttrip-incident` 通報。T+15min：對已收到新版但 install 失敗的使用者，Dev 推 in-app banner「應用程式更新中遇到問題，正在重新嘗試」（模板 `templates/in-app-banner-sw-retry.md`）。T+30min：PO status page 公告（模板 `templates/status-page-sw-issue.md`）。 |

---

### Runbook 04 · 燈號判定異常（STRONG_BUY 但實際 ↑3%）

| 欄位 | 內容 |
|---|---|
| **Detection** | **這是最難自動偵測的 incident**。MVP 階段主要靠：(a) 半自動 alert `fx_signal_vs_actual_deviation`（Grafana rule #51，閾值「燈號顯示 STRONG_BUY 但今日匯率高於 MA30 > 1% 連續 1 小時」），(b) 客服收到「燈號跟我看的不一樣」≥ 3 件 / 30 分鐘，(c) **DevOps 每日 dogfood 檢查**（手動）。**SEV-1**（直接影響 PRD G4「內容信任」與 G1「換匯誤差 < 15%」）。Primary on-call 5 分鐘 SLA。 |
| **Diagnosis** | (1) 開 `https://grafana.smarttrip.io/d/fx-signal-audit`，看 `signal_vs_rate_correlation` panel——找出哪個 currency 的燈號對應實際匯率不一致。(2) 對該 currency，到 `https://grafana.smarttrip.io/d/fx-provider-raw`查 raw response，**重點檢查 unit**（per 1 vs per 100，這是 13-rollback Q2 變更 A 的已知陷阱）+ **MA30 計算窗口是否正確**（30 個交易日 vs 30 個自然日）。(3) 對照 PRD P0-5 規格「今日 vs MA30: STRONG_BUY/BUY/HOLD」，確認算式。 |
| **Mitigation 1**（**可逆**，暫時隱藏燈號）| Step 1：執行 `launchdarkly toggle fx_signal_show --value=false`，立即隱藏所有 currency 的燈號顯示。Step 2：PWA 顯示降級為「僅顯示當日匯率，暫不提供買入建議」+ 免責聲明強化。Step 3：對使用者影響可接受（PRD P0-5 是「應該有」非「不能沒有」）。預期復原時間：**5 分鐘內**生效。 |
| **Mitigation 2**（**可逆**，校正算式）| Step 1：Dev 在 staging 重現問題（用 prod 同 raw data）。Step 2：確認算式錯誤後，推 hotfix（譬如 unit 統一、MA30 窗口統一）。Step 3：staging 驗證 24 小時無異常。Step 4：灰度 5% → 25% → 100% 重新開啟 `fx_signal_show`。**預期復原時間**：8 小時（含 hotfix + 灰度）。 |
| **Mitigation 3**（**不可逆 ⚠️ DANGER**）| 若已影響的使用者數 > 100 人（依 P0-9 分析事件 `tier_select` 在受影響期間的數量）：發補償方案。**必須 PO 簽核**：每位受影響使用者發 LINE Pay 100 元抵用券，PO 預算上限 NT$100,000。 |
| **Escalation** | 偵測到燈號異常 → 立刻 page primary + secondary 雙人。10 分鐘無 ACK → page PO。事故持續 > 30 分鐘 → 強制 page CTO + 啟動 SEV-1 status page。**特別注意**：這個 incident 即使「影響面看起來小」也是 SEV-1，因為直接違反 PRD §2「G4 內容信任」與「FX 燈號被認為可信」的核心承諾。 |
| **Communication** | T+5min：DevOps `#smarttrip-incident` + 立即 DM PO 電話。T+10min：Dev 推 in-app banner「我們發現匯率燈號可能不準，已暫時隱藏，請依當日匯率自行判斷」（模板 `templates/in-app-banner-signal-paused.md`）。T+20min：PO status page 公告 + 強化免責聲明。T+30min：客服 FAQ v3.3 + 預備補償方案 talking points。 |

---

### Runbook 05 · 行程生成超過 SLO（p95 > 180s）

| 欄位 | 內容 |
|---|---|
| **Detection** | Alert `generate_p95_high`（Grafana rule #08），閾值 `p95 > 180s over 5min`，**SEV-2**。Primary on-call 15 分鐘 SLA。**核心 SLO**：對應 PRD §7「完成時間中位數 < 3 分鐘」與「啟用率 ≥ 40%」。Generate 慢 → 使用者放棄 → 啟用率掉。 |
| **Diagnosis** | (1) 開 `https://grafana.smarttrip.io/d/generate-pipeline`，看 `generate_step_breakdown` panel，找哪一個 step 拖累 p95：(a) FX rate fetch、(b) tier 計算、(c) cash buffer 計算、(d) localStorage 寫入。(2) 對最慢的 step 開對應的 sub-dashboard 深入看。(3) 同步看是否有近期 release（git log）可能引入。 |
| **Mitigation A**（**可逆**，FX fetch 慢）| 對應 step (a)：Step 1：執行 `launchdarkly toggle fx_cache_ttl --value=900`（15 分鐘）強化 cache。Step 2：執行 `launchdarkly toggle fx_fetch_timeout --value=3000`（3 秒 timeout 而非 10 秒），timeout 後使用 cached rate。Step 3：5 分鐘後驗證 p95。 |
| **Mitigation B**（**可逆**，tier 計算慢）| 對應 step (b)：Step 1：執行 `launchdarkly toggle tier_compute_parallel --value=true`，三個 tier 改並行計算（原本序列）。Step 2：驗證 p95 應 ↓ 30%。 |
| **Mitigation C**（**可逆**，localStorage 寫入慢）| 對應 step (d)：可能是 quota 即將滿引起（與 Runbook 02 相關）。Step 1：執行 Runbook 02 的 Mitigation 1（自動清理）。Step 2：執行 `launchdarkly toggle ls_write_async --value=true`，改用 async 寫入不阻塞 UI。 |
| **Mitigation D**（**可逆**，最後手段：降級）| 若 A/B/C 都無效：Step 1：執行 `launchdarkly toggle generate_lite_mode --value=true`，PWA 跳過 FX 燈號顯示（保留 P0-4 建議換匯額），只跑核心 tier 計算。Step 2：對外通訊「為提升回應速度，匯率燈號暫時隱藏」。 |
| **Escalation** | p95 持續 > 180s 且超過 30 分鐘 → page PO。p95 > 300s（嚴重）或啟用率掉 > 20% → SEV-1，page CTO。 |
| **Communication** | T+15min：DevOps `#smarttrip-incident` 通報。T+30min：若未解，Dev 推 in-app banner「目前生成行程較慢，請耐心等候」（模板 `templates/in-app-banner-slow.md`）。T+1hr：PO 評估是否發 status page（依使用者實際影響）。 |

---

## Q6 示範：演練週期與 on-call rotation

| Runbook | 演練週期 | 上次演練 | 新人 onboarding 必跑？ |
|---|---|---|---|
| 01 FX API down | 每 quarter | 2026-04-12（同 13-rollback Game Day）| ✅ 必跑（SEV-2 標準範例） |
| 02 localStorage quota | 每 6 個月 | 2025-12-15 | 選讀 |
| 03 SW 更新失敗 | 每 quarter | 待跑 2026-05-31（同 13-rollback B 場景）| ✅ 必跑 |
| 04 燈號異常 | 每 quarter | **首次演練排 2026-06-15** | ✅ 必跑（SEV-1 核心案例） |
| 05 Generate 慢 | 每 6 個月 | 2026-03-20（負載測試 + chaos engineering）| 選讀 |

**On-call rotation 表（MVP 階段團隊小）**：

| 時段 | Primary | Secondary | Tertiary（升級用）|
|---|---|---|---|
| 平日 09–18 | DevOps Alice | Dev Bob | PO（兼 CTO）|
| 平日 18–09 | Dev Bob（輪值週 1）/ Dev Carol（輪值週 2）| DevOps Alice | PO |
| 週末 | Dev Bob & Carol 輪 | DevOps Alice | PO |

**新進工程師 onboarding day 7 任務**：
- 跟著資深工程師跑過 1 份 SEV-1 runbook（建議 04 燈號異常，因為它把 5 段都用到了）
- 跑完寫一份「發現的不一致 / 失效連結 / 過期指令」報告交給 DevOps
- DevOps 24 小時內更新 runbook（PR + review）

---

## 現場對話（60 分鐘會議第 42 分鐘）

> 場景：DevOps 拋出 Runbook 04 的 Detection（燈號異常），Dev 反映很難自動偵測。

**DevOps**：「Runbook 04 燈號異常的 Detection 怎麼寫？我們現在沒有 ground truth 可以比對。」

**Dev Bob**：「對啊，這個本質上是『我們的算式錯了但我們不知道』，自動偵測不到。」

**QA Carol**：「我之前做 E2E 測試有想過——每天用 prod 的 raw data 跑一次 sanity check：燈號 STRONG_BUY 必須對應今日匯率 < MA30 至少 -1%。如果反過來就 alert。」

**DevOps**：「好，這就是 alert `fx_signal_vs_actual_deviation`。Bob 你願意把它做進 Grafana rule 嗎？」

**Dev Bob**：「可以，但本質上這是『規格比對』而不是『指標異常』。要不要直接寫成一個 daily cron job？」

**DevOps**：「都行，但要寫進 runbook——SEV-1，5 分鐘 SLA。**燈號錯比 FX API 掛還嚴重**，因為使用者不會察覺，會帶錯錢出國。」

**PO**（旁聽）：「對。這是我最怕的場景。要不要乾脆加一條：每天早上 09:00 DevOps 手動 dogfood 一次？」

**DevOps**：「加。寫進 Runbook 04 Detection 段第三條。**手動 + 自動雙保險**。」

**QA Carol**：「那 mitigation 怎麼寫？因為這個事故沒辦法簡單 rollback——算式錯了就是錯了。」

**DevOps**：「Mitigation 1 是『暫時隱藏燈號』，可逆。Mitigation 2 是『校正算式 + 灰度重啟』，這要 8 小時。Mitigation 3 是『補償使用者』，需要 PO 簽核。三層遞進。」

**PO**：「補償方案我簽。NT$100,000 上限，每人 100 元抵用券。寫進 talking points。」

**DevOps**：「成交。Bob，這份 runbook 你帶回去寫 staging 重現步驟，下週 game day（5/31）我們一起演練 Runbook 04 完整流程。」

---

## 下游影響：本場會議產出如何流向 15-postmortem

| 本場產出 | 流向 |
|---|---|
| 5 份 runbook 的 Detection 段（alert + SLA）| **15-postmortem §detection gap analysis**：postmortem 第一題「第一個 alert 時間 vs 第一個影響時間」直接引用 SLA 數字檢視 detection gap |
| 5 份 runbook 的 Mitigation step（含可逆性標示）| **15-postmortem §mitigation timeline**：事故當下執行了哪些 step、每步耗時 vs 預期，落差成為 action item |
| Q4 escalation 矩陣 | **15-postmortem §response time analysis**：誰被 page、什麼時候、回應 SLA 是否達標 |
| Q5 通訊模板與時機 | **15-postmortem §customer-impact**：對外通訊是否及時、模板是否需要更新 |
| Q6 演練紀錄與發現的不一致 | **15-postmortem §what went well/poorly**：若事故發生在演練後 1 個月內，演練品質直接被檢視 |
| Known limitations（runbook 沒涵蓋的 incident type）| **15-postmortem action item 直接源頭**——「將此情境加入 runbook」是最常見的 action item，必須塞回 14-runbook 形成閉環 |

**Decision log（給下次 release 用）**：
- Runbook 04（燈號異常）目前是 SEV-1 但 Detection 仰賴半手動 + dogfood，這是已知 limitation，
  排進 P0-9（基本使用分析）上線後**第一個被自動化偵測的目標**——對應 SmartTrip 「先驗證、後深化」的 MVP 哲學。
- 所有 runbook 的 Mitigation step 優先使用 feature flag（LaunchDarkly），避免事故當下 deploy 引入二次事故，
  這條原則寫進 09-NFR §operability 與 13-rollback-plan §rollback-strategy。

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（5 份 runbook 的六題答案 + 09-NFR SLO 表 + 13-rollback trigger 矩陣）
丟給 `card-fill` skill：

```
/card-fill register 14-runbook <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/runbook.md` 的「輕量範本」或「完整範本」結構，
產出符合契約的 markdown deliverable，每份 runbook 結構統一含 Detection/Diagnosis/Mitigation/Escalation/Communication 五段。

**本場會議的學習目標到 Q6 答完就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**把每個 incident 的應對流程，從 tribal knowledge 變成傻瓜也能跟的 step-by-step**」，不是「**寫對 markdown**」。
