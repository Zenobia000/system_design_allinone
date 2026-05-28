# 09 Non-Functional Requirements · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報（`demo/種子簡報.md`）+ 完整 PRD（`PRD.md` §7 / §8 / §9）的素材，
> 把上一份「關鍵提問.md」的六題實際答一遍。
> 本卡上游為 02-value-hypothesis（已驗證假設與成功指標）與種子簡報「期望成果」「主要約束」段。

---

## Q1 + Q2 + Q3 + Q4 整合示範：六大類 NFR 完整清單

每條 NFR 都包含 **SLO（目標數字 + 推導）/ SLI（量測指標）/ Threshold（alert 閾值）/ 降級行為**。

---

### 類別 1 — 性能（Performance）

#### NFR-PERF-01 · 行程頁 LCP

| 項目 | 內容 |
|---|---|
| **SLO** | `page_load_lcp_p75 < 2.5s`（28 天 rolling window，Google Core Web Vitals 標準） |
| **推導** | 種子簡報期望成果「3 分鐘內拿到結果」→ 拆解：表單填寫 90s、讀三方案 60s、保存 30s → 前端可用 LCP 預算 ≤ 2.5s × 多次頁面切換 |
| **SLI** | LCP（Largest Contentful Paint）p75，目標頁面 = `/`、`/start`、`/result`、`/my-trips` |
| **量測** | Vercel Speed Insights（RUM 自動收集 web vitals）+ Lighthouse CI（每 PR 跑 mobile profile + slow-4G throttling） |
| **Threshold** | LCP p75 > 3.0s in last 24h → Slack `#perf`（不 page，純警示） |
| **降級行為** | 性能退化無法即時降級；release gate 階段就攔（PR Lighthouse CI 失敗 = 不准合 main） |
| **source** | 種子簡報期望成果, PRD §7「完成時間中位數 < 3 分鐘」 |
| **confidence** | [H] |

#### NFR-PERF-02 · 行程生成端對端延遲

| 項目 | 內容 |
|---|---|
| **SLO** | 從按「生成行程」到顯示三方案 p95 < 180s（種子簡報「3 分鐘」硬上限）；目標中位數 < 1.5s |
| **推導** | 種子簡報「3 分鐘內」是業務硬約束；中位數 1.5s 是「lib/budget in-memory 計算 + FX cache 命中」的內部目標 |
| **SLI** | 前端自埋 `performance.mark('generate_start')` → `performance.mark('generate_complete')` 差值 |
| **量測** | Playwright e2e（mobile profile）+ 自埋 RUM 事件 `generate_latency_ms` |
| **Threshold** | p95 > 180s in last 24h → Slack `#alerts`（page on-call，這是 G1 業務目標破口） |
| **降級行為** | FX cache miss + provider 慢時，最多等 5s 然後 fallback simulated；不允許讓使用者等 > 5s |
| **source** | 種子簡報「3 分鐘」, PRD G1, P0-1, P0-2 |
| **confidence** | [H] |

---

### 類別 2 — 可用性（Availability）

#### NFR-AVAIL-01 · Web App 整體可用性

| 項目 | 內容 |
|---|---|
| **SLO** | 99% rolling 28-day（≈ 7.2 hours downtime/month 容許值） |
| **推導** | MVP 4 週驗證窗無 SLA 承諾；Vercel CDN vendor SLA 99.99%，但自身 edge function 加進來保守設 99%。**不抄 99.9% 是因為 driving incident response 的 ops effort 應投資功能驗證**（種子簡報 §主要約束 4 週驗證窗） |
| **SLI** | UptimeRobot 外部 probe，每 5 分鐘 ping `/`、`/start`、`/api/v1/healthz` |
| **Threshold** | 連續 3 次 probe 失敗（15 分鐘 downtime） → Slack `#alerts` + 寄 PM 信箱 |
| **降級行為** | Vercel 端故障無法自行降級；切備援 region（手動）或對外公告維護中 |
| **Error Budget** | 1% = ~7.2h/month；若單一 incident 燒光 50%，停發新功能直到燒回來 |
| **source** | PRD §7 推導, 種子簡報 §主要約束 |
| **confidence** | [M]（無 MTTR 歷史） |

#### NFR-AVAIL-02 · FX Endpoint 成功率（含 fallback）

| 項目 | 內容 |
|---|---|
| **SLO** | `fx_endpoint_success_rate ≥ 99% per 28-day`，**含 fallback to simulated 也算 success** |
| **推導** | FX provider 掛時 fallback simulated 是 PRD P0-8 驗收要求的「good failure mode」，不應計入失敗（user-centric SLI vs implementation-centric SLI） |
| **SLI** | Vercel function 5xx rate（排除 502 fallback 場景）+ `data_source = simulated` 比例（觀察用，不計入 success rate） |
| **量測** | Vercel function timing log + 自定 metric `fx_provider_upstream_success`（純觀察） |
| **Threshold** | success rate < 99% in last 1h → Slack `#alerts`；simulated 比例 > 10% in last 1h → Slack `#perf`（早期警告，不 page） |
| **降級行為** | FX provider 全掛 → `FxRate.source = simulated` 用上次成功值 + UI 強制顯示「目前匯率資料暫時不可用」+ 維持原免責聲明（觸發 14-runbook「FX provider 不可用」） |
| **source** | PRD P0-8 驗收, 07-API-spec §FxRateResponse |
| **confidence** | [H] |

---

### 類別 3 — 安全（Security）

#### NFR-SEC-01 · XSS 防護（Expense.note 自由文字）

| 項目 | 內容 |
|---|---|
| **SLO** | 0 件 stored XSS vulnerability per release（OWASP ZAP / Snyk 掃描為基準） |
| **推導** | 種子簡報「無帳號」降低 auth attack surface，但 Expense.note + Trip.mood 是自由文字輸入欄，**未 sanitize 即為 XSS attack vector** |
| **SLI** | OWASP ZAP automated scan finding count（per release） + CSP header 違規回報數（透過 `report-uri`） |
| **量測** | Snyk 在 CI 每 PR 跑一次；release 前手動 ZAP active scan |
| **Threshold** | 任一 High / Critical finding → release block（必須修完才能發） |
| **降級行為** | 已發現的漏洞：1) 立即上 hotfix 2) 通知所有歷史 Expense.note 走 sanitizer 重新 render（不改 storage） |
| **source** | PRD P0-7（自由文字輸入欄）, 08-data-model.Expense.note constraints 註明「必須前端 sanitize」 |
| **confidence** | [H] |

#### NFR-SEC-02 · FX Provider API Key 保護

| 項目 | 內容 |
|---|---|
| **SLO** | 0 件 API key 出現在 client bundle / git history / log（per release） |
| **推導** | FX provider API key 若暴露 client → 任何人可直接拿去用 → 自家 quota 被燒光 → cost 失控 |
| **SLI** | git pre-commit hook（gitleaks）+ Vercel deploy log 掃描（無 secret 出現在 build artifact） |
| **量測** | CI 每次 build 跑 gitleaks scan；Vercel env var 用 `secret` type 不下放 client bundle |
| **Threshold** | gitleaks 任一 finding → CI block（不准 push） |
| **降級行為** | 若 key 已外洩：1) 立即 rotate 2) 暫停 FX endpoint 切 simulated 3) 通知 vendor |
| **source** | PRD §9 Open Question 第 1 條（資料源選型）延伸 |
| **confidence** | [H] |

---

### 類別 4 — 成本（Cost）

#### NFR-COST-01 · MVP 月費上限

| 項目 | 內容 |
|---|---|
| **SLO** | Monthly cost < **NT$2,000**（≈ US$60）for MVP 4 週驗證窗 |
| **推導** | 種子簡報未明寫財務上限，但「個人 / 小型 MVP + 4 週驗證窗」推論 NT$2,000 為合理上限；分項：Vercel free tier (NT$0)、FX provider free tier ~NT$0–300、Plausible self-hosted on Vercel (NT$0) 或 cloud (NT$270/month) |
| **SLI** | Vercel billing dashboard + FX provider monthly request count + Plausible events count |
| **Threshold** | 月底預估 > 80% ceiling → email 警示；達 100% → 暫停 service 並評估 vendor 切換 |
| **降級行為** | FX provider 超 free tier → 切換到備援 vendor（譬如從 fixer.io 切到 exchangerate-api）；Plausible cloud 超量 → 切自架版本 |
| **driver metrics** | (a) FX provider monthly request count（free tier 上限通常 1,000/day 或 100/month） (b) Vercel bandwidth（free tier 100GB） (c) Plausible events count |
| **scale_with** | DAU 線性（無 viral 機制） |
| **source** | 種子簡報 §主要約束「4 週驗證窗」, PRD §10 推論 |
| **confidence** | [M]（NT$2,000 是個人專案推論，無歷史基準） |

#### NFR-COST-02 · CDN 流量上限

| 項目 | 內容 |
|---|---|
| **SLO** | Vercel bandwidth < 100GB/month（free tier 上限） |
| **推導** | MVP 估 100 DAU × 平均 3 個頁面 × 平均 500KB（含圖片）= ~45GB/month，距 100GB 還有 2.2x 餘裕 |
| **SLI** | Vercel bandwidth dashboard |
| **Threshold** | 月底預估 > 80GB → 警示 + 啟動 image optimization（譬如 next/image 改用更積極壓縮） |
| **降級行為** | 接近 100GB → 暫時撤掉非必要圖片 / 改 CDN（如 Cloudflare 免費） |
| **source** | PRD §7 推論啟用率 40% |
| **confidence** | [M]（100 DAU 是估值，PRD §9 Open Question 第 5 條） |

---

### 類別 5 — 合規（Compliance）

#### NFR-COMP-01 · GDPR / 個資法 right-to-erasure

| 項目 | 內容 |
|---|---|
| **SLO** | 「清空所有資料」操作 100% 清除使用者 localStorage 中所有 `smarttrip:*` key |
| **推導** | GDPR Article 17（right to erasure）+ 台灣個資法第 11 條（資料正確性與刪除權）；雖無傳統 PII，但 destination + date + mood + note 屬「可識別自然人之行為資料」適用範圍 |
| **SLI** | E2E test：「建立 3 個 Trip + 5 筆 Expense → 按清空 → 預期 `Object.keys(localStorage).filter(k => k.startsWith('smarttrip:')).length === 0`」 |
| **量測** | Playwright e2e 每 PR 跑一次 |
| **Threshold** | 任一次 e2e 失敗 → release block |
| **降級行為** | 若使用者主動要求刪除但按鈕失效 → 提供 fallback：教使用者 DevTools → Application → Clear storage（這段寫進 14-runbook） |
| **source** | 08-data-model.data_classification.erasure, PRD §9 Open Question 第 6 條 |
| **confidence** | [M]（法務未確認台灣個資法 / GDPR 雙重適用情境） |

#### NFR-COMP-02 · PWA 離線權限與資料用途說明

| 項目 | 內容 |
|---|---|
| **SLO** | 首次使用必須顯示 onboarding 頁說明：「本 App 將你的行程資料存在這台裝置上，不會上傳任何伺服器」+ 提供「了解，開始使用」按鈕後才進主畫面 |
| **推導** | PWA 使用 localStorage 屬於「存取裝置資料」，個資法要求事前告知用途；雖非強制法律條文，但屬 best-practice 合規 |
| **SLI** | E2E test：first-visit user 必須看到 onboarding 頁；session 內 dismiss 後不再顯示 |
| **量測** | Playwright e2e（first visit + return visit 兩種 scenario） |
| **Threshold** | e2e 失敗 → release block |
| **降級行為** | onboarding 頁有 bug → fallback 到 footer 永久顯示「資料儲存說明」連結 |
| **source** | 種子簡報「免登入即開即用」推論, PRD §3 Non-Goals |
| **confidence** | [M] |

---

### 類別 6 — 法規（Regulatory）

#### NFR-REG-01 · FX 燈號免責聲明強制顯示

| 項目 | 內容 |
|---|---|
| **SLO** | 任何顯示 `exchange_signal`（STRONG_BUY / BUY / HOLD）的 UI component 必須同步顯示「非投資理財建議」免責聲明，**漏顯比例 = 0%** |
| **推導** | 種子簡報 §主要約束明寫「FX 換匯燈號需要『非投資理財建議』免責聲明」；無條件硬要求 |
| **SLI** | E2E test：所有顯示燈號的頁面（`/result`、`/my-trips/[id]`）必須含 disclaimer 文字；`Recommendation.disclaimer_shown` 欄位（08-data-model）非 true 時 component throw error |
| **量測** | Playwright e2e + component unit test：`render(<FxSignal />) without disclaimer prop` 預期 throws |
| **Threshold** | 任一次 e2e / unit test 失敗 → release block，**且需通知法務** |
| **降級行為** | 已上線發現漏顯 → 立即 hotfix + 對外公告 + 通知法務 + 寫 postmortem |
| **source** | 種子簡報 §主要約束, PRD §9 Open Question 第 6 條, 08-data-model.Recommendation.disclaimer_shown |
| **confidence** | [H] |

#### NFR-REG-02 · 不提供具體個別投資建議

| 項目 | 內容 |
|---|---|
| **SLO** | UI 文案中不出現「建議您今日換 XXX 元」「明日匯率將下跌」等具體預測語句；只允許「目前匯率較 MA30 低/高 X%」「歷史經驗顯示此時換匯較划算」等趨勢描述 |
| **推導** | 提供具體預測或操作建議在台灣可能觸及《證券投資信託及顧問法》或《金融消費者保護法》紅線；MVP 階段保守設計避免法律風險 |
| **SLI** | 文案 lint 規則：禁用詞清單 `[預測, 必漲, 必跌, 建議買入, 建議賣出]` 在 CI 階段掃描 |
| **量測** | CI 每 PR 跑一次 grep；release 前手動法務 review |
| **Threshold** | 禁用詞 finding count > 0 → CI block |
| **降級行為** | 已上線發現違規文案 → 立即 hotfix |
| **source** | 種子簡報 §主要約束「非投資理財建議免責聲明」延伸, PRD §9 Open Question 第 6 條 |
| **confidence** | [M]（法務未明確劃線） |

---

## Q5 直接相關：成本決策補充

**Monthly cost ceiling = NT$2,000 的拆解**：

| 分項 | free tier 範圍 | MVP 預估月費 |
|---|---|---|
| Vercel hosting + bandwidth | 100GB | NT$0（估 45GB） |
| FX provider（譬如 fixer.io） | 100 req/month 或 1,000 req/day | NT$0–300（依命中率，cache 5min 後實際命中率 < 1%） |
| Plausible analytics | 10,000 events/month free | NT$0（self-hosted）或 NT$270（cloud） |
| Sentry error tracking | 5,000 errors/month free | NT$0 |
| **總計** | — | **NT$0 ~ NT$570**（預期），ceiling 設 NT$2,000 含 spike 容忍 |

---

## Q6 直接相關：合規清單（含 N/A 原因）

| 規範 | 適用？ | 原因 / 控制 |
|---|---|---|
| **GDPR Art.17 right-to-erasure** | ✅ 適用 | 對應「清空所有資料」按鈕（NFR-COMP-01） |
| **GDPR Art.5 data minimisation** | ✅ 適用 | 無帳號設計即為資料最小化（PRD Non-Goals） |
| **台灣個資法** | ✅ 適用 | 與 GDPR 對應控制等價，但需法務確認（PRD §9 Open Question 第 6 條） |
| **金融商品免責** | ✅ 適用 | NFR-REG-01 強制免責聲明 |
| **PWA 離線權限說明** | ✅ 適用 | NFR-COMP-02 onboarding 頁 |
| **PCI DSS** | ❌ N/A | 不處理任何信用卡資料（PRD Non-Goals「不做訂房/訂票」延伸） |
| **SOC 2** | ❌ N/A | 無付費客戶、無對外 SLA、未進入 SOC 2 audit 範圍 |
| **HIPAA** | ❌ N/A | 非醫療資料 |
| **ISO 27001** | ❌ N/A | 個人 / 小型 MVP，無正式 ISMS 範圍 |

---

## Decision Log（至少 3 條）

```yaml
- decision: web_app_availability 選 99% 而非 99.9%
  options_considered: [99.9, 99.5, 99, no_slo]
  chosen: 99
  rejected_reason:
    99.9: |
      Vendor SLA 已 99.99%（Vercel），自身 SLO 設 99.9% 等於把 90% error budget 留給自己 bug；
      MVP 4 週驗證窗，dev effort 應放在功能驗證而非 ops。
    99.5: |
      比 99 多一個層級的 ops effort，但本案無付費客戶，penalty 為 0，過嚴沒商業意義。
    no_slo: |
      雖然無 SLA 壓力，但沒 SLO = 沒 error budget = 沒法判斷何時該停下優化效能；
      最低紀律是設一個 SLO。
  confidence: H

- decision: fx_endpoint_success_rate 把「fallback to simulated」也算 success
  options_considered: [count_502_as_failure, count_as_success_if_fallback_works]
  chosen: count_as_success_if_fallback_works
  rejected_reason:
    count_502_as_failure: |
      若 FX provider 掛 1 小時，會 burn 100% error budget；
      但 graceful degradation 是 PRD P0-8 驗收標準，反而是「good failure mode」。
      應該量「使用者拿到 actionable response 的比例」而非「上游成功比例」。
  confidence: H

- decision: cost ceiling 設 NT$2,000 而非「無上限走著看」
  options_considered: [no_ceiling, ceiling_NT$2000, ceiling_NT$10000]
  chosen: ceiling_NT$2000
  rejected_reason:
    no_ceiling: |
      個人專案 + 4 週驗證窗，無 ceiling 等於開卡片給 vendor 自動扣款。
      free tier 爆掉會自動升 paid，悄悄燒錢。
    ceiling_NT$10000: |
      MVP 階段無付費收入，超 NT$2,000 已大於個人預算容忍度。
      ceiling 應該逼出「成本意識」，不是「夠用就好」。
  confidence: M  # 個人專案推論，無歷史基準
```

---

## Self Review（補洞計畫）

```yaml
lowest_confidence:
  - field: NFR-COST-01 monthly cost ceiling = NT$2,000
    reason: 個人專案推論，無歷史基準
    need: P0-9 分析上線後第一週的真實 traffic 數據，校準 FX provider 命中率

  - field: NFR-PERF-02 fx provider 上游延遲假設（影響 generate latency p95）
    reason: P0-8 vendor 未拍板
    need: 至少一週 staging 環境跑真實 FX vendor 的 p95 數據

  - field: NFR-AVAIL-01 web app 99% SLO
    reason: 無 MTTR 歷史，估值
    need: 上線後第一個月實測，視 incident 頻率調整

  - field: NFR-COMP-01 GDPR / 個資法雙重適用情境
    reason: 法務未確認台灣個資法是否如 GDPR 強制 right-to-erasure
    need: 法務確認（PRD §9 Open Question 第 6 條）

  - field: NFR-REG-02 禁用詞清單完整性
    reason: 法務未明確劃線哪些是違規文案
    need: 法務 review 一次，產出正式禁用詞表

fabricated_assumptions:
  - "假設 100 DAU baseline（PRD §9 Open Question 第 5 條明寫無基準）"
  - "假設 FX provider free tier 1,000 req/day（vendor 未選定）"
  - "假設 mobile 4G 為 LCP baseline 測試環境"
  - "假設 Plausible 已選定為 analytics vendor（ADR-004 草擬中）"

highest_value_next_input: |
  P0-8 vendor 拍板 + P0-9 分析上線後第一週數據 —
  可同時校準 NFR-PERF-02 latency、NFR-AVAIL-02 success rate、NFR-COST-01 ceiling 三條 NFR。
```

---

## 現場對話（~35 行示範）

> 場景：60 分鐘會議第 40 分鐘，DevOps 拋出 Q3（availability 閾值），Architect 開始抗拒。

**DevOps**：「Web app availability SLO 我提案 99%，不是業界常見的 99.9%。」

**Architect**：「99% 太低吧？這樣每月可以掛 7 小時，使用者一定不爽。」

**DevOps**：「使用者一年來 1–4 次，每次出國前花 3 分鐘。月掛 7 小時的機率，使用者剛好在那段時間進站的機率 = 7/720 = 1%。對使用者體驗實質影響很小。」

**Architect**：「那為什麼不寫 99.9%？多一個 9 看起來比較專業。」

**DevOps**：「99.9% 等於每月只能掛 43 分鐘。Vercel 自己 SLA 99.99%，我們設 99.9% 意思是『我們自己 bug 只能燒掉 90% error budget』。MVP 4 週驗證窗，我們應該把 ops effort 投到驗證假設，不是研究怎麼把 LCP 從 2.3s 優化到 2.1s。」

**SA**（插話）：「但我們有沒有付費客戶？沒有 SLA 承諾嘛。」

**DevOps**：「對。沒 SLA、沒 penalty、99.9% 等於 over-engineering。寫進 decision_log。」

**Architect**：「OK，那 alert routing？個人專案哪有 24x7 on-call。」

**DevOps**：「best-effort。連續 3 次 probe 失敗 → Slack #alerts + 寄 PM 信箱（也就是我自己），24h 內回應。」

**SA**：「24h 內回應算 acceptable response time？」

**DevOps**：「對 MVP 4 週驗證窗，是。若驗證通過進 V1，重評估改 1h 內回應。寫進 decision_log。」

**Architect**：「FX provider 掛了呢？也是 24h 嗎？」

**DevOps**：「不是。`fx_endpoint_success_rate < 99% in last 1h` → Slack #alerts → 我立刻看。因為 FX 是核心護城河，掛了使用者體感最強。降級行為 = 自動切 simulated，但仍要人為確認免責聲明還在顯示。」

**SA**：「免責聲明還在顯示這個怎麼驗？」

**DevOps**：「14-runbook『FX provider 不可用』流程第 4 步：on-call 必須開 prod URL，截圖確認 disclaimer 文字仍出現。寫進 runbook 入口。」

**Architect**：「⋯⋯好。我同意 99%。」

**DevOps**：「寫進 decision_log：『Architect 提議 99.9% 被否決，理由是 MVP 階段 ops effort 投資錯位』。」

---

## 下游影響（明示具體流向）

| 本卡產出 | 流向哪張下游卡的哪一段 |
|---|---|
| `NFR-PERF-01 LCP < 2.5s` + `NFR-PERF-02 generate p95 < 180s` | **10-code-review-checklist** §「Performance」維度：每個新 endpoint 必須標註 latency budget；每個 import 新依賴必須評估 bundle size impact |
| `NFR-SEC-01 XSS 防護` | **10-code-review-checklist** §「Security」維度：自由文字欄位必須走 sanitizer；新 CSP 規則變動必須過 security review |
| `NFR-REG-01 disclaimer 強制顯示` | **10-code-review-checklist** §「Compliance」維度：任何 import `<FxSignal />` component 的 PR 必須 require `disclaimer_shown` prop |
| `NFR-COST-01 monthly ceiling NT$2,000` | **12-release-plan** §「release gate」第 3 條：新 vendor / 升級 tier 的 PR 必須附 cost impact 估算；超 80% ceiling 的 release 必須走 cost review 流程 |
| `NFR-AVAIL-02 FX endpoint SLO + fallback` | **12-release-plan** §「rollback criteria」：success rate 掉破 95% in 1h 自動回滾上一版（透過 Vercel instant rollback） |
| `NFR-AVAIL-02 降級行為「FX provider 不可用」` | **14-runbook** §「FX provider 不可用」完整流程：1) 確認 `data_source = simulated` 比例 2) 切換 vendor（若已備援） 3) 對外公告「目前匯率為快取值」 4) 截圖確認 disclaimer 仍顯示 5) 通知法務 |
| `NFR-COMP-01 right-to-erasure` 降級 | **14-runbook** §「使用者要求刪除資料但按鈕失效」流程：1) 引導使用者開 DevTools → Application → Clear storage 2) 寄信確認 3) 開 bug ticket |
| `NFR-COST-01 driver metrics` | **14-runbook** §「monthly cost 超 ceiling」流程：1) 確認哪項 driver 超量 2) 切換備援 vendor 3) 通知 stakeholder |
| `NFR-REG-01 disclaimer 漏顯 hotfix` | **14-runbook** §「法務通報」流程：發現漏顯 → 1) 立即 hotfix 2) 對外公告 3) 通知法務 4) 寫 postmortem |

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（6 題的答案 + 種子簡報 + PRD §7-§9）
丟給 `card-fill` skill：

```
/card-fill register 09-non-functional-reqs <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 deliverables 模板輸出含完整六大類 NFR + decision_log + self_review 的 markdown。

**本場會議的學習目標到 Q6 答完就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**把每個 NFR 的數字逼出 SLO + SLI + threshold + 降級行為四件套**」，不是「**寫對 markdown**」。
