---
title: "Canary Strategy · 灰度策略"
slug: "canary-strategy"
stage: "ship"
roles: ["devops"]
order: 41
hook: "讓上線變成可觀測的實驗，而不是一次性押注"
when_to_use: "blast radius 大、SLO 緊、或新邏輯需真實流量驗證時"
ai_leverage: "用 Claude 從 SLO 推導 canary 階段門檻"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Deployment, Netflix canary"
---

## 解決什麼問題

Big bang release 在意外面前無能為力。Canary 把流量切片，先放 1%、5%、25%，每階段以 SLI 為門檻自動晉級或退回。

## 誰負責、和誰對接

- **主責：** DevOps
- **協作：** SRE 設 SLI、Dev 設 feature flag、PO 確認業務指標
- **下游收件：** Release Plan、Rollback Plan

## 何時用、何時不用

- ✅ **必要時機：** 核心路徑變更、性能敏感、規模 ≥ 數萬 DAU
- ❌ **不需要時：** 內部工具、低流量服務
- ⚠️ **常見誤用：** 只看 HTTP 5xx 不看業務指標；canary 與 baseline 環境不對等

## AI 怎麼加速

把 SLO + 業務 KPI + 流量規模整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 blast radius 容忍度與晉級節奏**。本卡輸出**真實 Canary Strategy markdown 文件**（含階段表格、SLI 門檻表、abort 條件清單），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本** 給小規模 / 內部工具 / 單一 cohort 用，**完整範本** 給高流量 / 多 cohort / 嚴格 SLO 場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "canary-strategy"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["slo", "release-plan"]
  optional: ["business-kpi"]
---

# Canary Strategy: <release-name>

**Status:** Draft v0.X · **Owner:** <DevOps name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 7, 10），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：slo §XXX / kpi §YYY）`；每量化欄位加 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；每階段 success criteria 必須同時含 1 個 SLI + 1 個業務 KPI。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，on-call SRE 30 秒讀完。寫「灰度幾階段、總時長、最大 blast radius」 -->

<3-5 行說明>

> **TL;DR:** <一句話：階段切分 + 總 bake time + abort 觸發>

---

## 2. Stages

<!-- ai-rule: 3-4 階段為宜（例：1% → 5% → 25% → 100%）。每階段必含 traffic % / duration / population -->

| Stage | Traffic % | Duration | Population | Promote gate | Confidence |
|---|---|---|---|---|---|
| 1 | 1% | 30 min | internal-only | auto (SLI pass) | **[H]** |
| 2 | 5% | 2 hr | <geo / cohort> | auto | **[H]** |
| 3 | 100% | — | all | manual | **[M]** |

---

## 3. Success Criteria per Stage

<!-- ai-rule: 每階段同時含 SLI 門檻 + 業務 KPI 門檻，避免只看 5xx 不看 conversion -->

### Stage 1

- **SLI:** error_rate < 1% · p95 latency < 200ms · saturation < 70% **[H]**
- **Business KPI:** conversion_delta ≥ -2% vs baseline **[M]**
- **Source:** slo §XXX + kpi §YYY

### Stage 2 / 3

<同格式>

---

## 5. Abort Signals

<!-- ai-rule: 區分 hard_abort（立即退回）與 soft_abort（暫停觀察）；hard 必須含 SLI 急速劣化條件 -->

- **Hard abort（立即退回）：**
  - error_rate > 5% for 1 min
  - p95 latency > baseline × 2 for 2 min
- **Soft abort（暫停觀察）：**
  - conversion 下滑 > 5% for 10 min

---

## 7. Blast Radius per Stage

<!-- ai-rule: 每階段估算 affected_users 數量；高風險 cohort 單獨列 -->

| Stage | Affected users | Affected features | Confidence |
|---|---|---|---|
| 1 | ~<N> internal | <feature list> | **[H]** |
| 2 | ~<N> external | ... | **[M]** |

---

## 10. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 階段切分節奏 | 1/5/25/100 vs 5/50/100 | 1/5/25/100 | 5/50 跳太快、blast radius 超出 error budget | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 7, 10）
> - [ ] 每階段 success criteria 同時含 SLI + 業務 KPI
> - [ ] Abort signals 區分 hard / soft
> - [ ] Blast radius 每階段都有 affected_users 估算
> - [ ] Decision Log ≥ 1 條，含 rejected reason
> - [ ] 無 YAML / JSON schema 輸出
```

```template-full
---
doc_type: "canary-strategy"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["slo", "release-plan", "business-kpi"]
  optional: ["feature-flag-inventory", "observability-spec"]
---

# Canary Strategy: <release-name>

**Status:** Draft v0.X · **Owner:** <DevOps name> · **Last updated:** YYYY-MM-DD · **Reviewers:** SRE / Dev / PO / on-call

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。每結論行內 `（依據：slo §XXX / kpi §YYY / release-plan §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；每階段 success_criteria 同時含 SLI + 業務 KPI；每階段附 sample_size 估算（達到 statistical significance 所需）；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: DevOps · required: always -->

<!-- ai-fill: 3-5 行，on-call SRE 30 秒讀完。寫「灰度幾階段、總時長、最大 blast radius、abort 觸發」 -->

<3-5 行說明>

> **TL;DR:** <一句話總結>

---

## 2. Stages
<!-- owner: DevOps + SRE · required: always -->

<!-- ai-rule: 3-5 階段。每階段含 traffic% / duration / population / sample_size_required。sample_size 必須附計算依據 -->

| Stage | Traffic % | Duration | Population | Sample size (N) | Confidence |
|---|---|---|---|---|---|
| 1 | 1% | 30 min | internal-only | ~500 (依據：power=0.8, MDE=2%) | **[H]** |
| 2 | 5% | 2 hr | EU / mobile | ~5,000 | **[H]** |
| 3 | 25% | 6 hr | excluded: enterprise tier | ~25,000 | **[M]** |
| 4 | 100% | — | all | — | **[M]** |

---

## 3. Success Criteria per Stage
<!-- owner: SRE + PO · required: always -->

<!-- ai-rule: 每階段同時含 SLI 門檻 + 業務 KPI 門檻，避免只看 5xx 不看 conversion -->

### Stage 1

| Dimension | Threshold | Source | Confidence |
|---|---|---|---|
| error_rate | < 1% | slo §A | **[H]** |
| p95 latency | < 200ms | slo §B | **[H]** |
| saturation | < 70% | slo §C | **[H]** |
| conversion_delta | ≥ -2% vs baseline | kpi §D | **[M]** |

### Stage 2 / 3 / 4

<同格式逐階段填>

---

## 4. Bake Time & Promote Policy
<!-- owner: DevOps · required: always -->

<!-- ai-rule: 標明哪些階段 auto-promote、哪些 manual gate；附 rationale -->

- **Per-stage bake time:** Stage 1 = 30 min · Stage 2 = 2 hr · Stage 3 = 6 hr
- **Auto-promote stages:** [1, 2] — 依據：SLI 訊號充分、blast radius 可控
- **Manual gate stages:** [3, 4] — 依據：影響 enterprise / 大盤
- **Rationale:** <為何此節奏，含 statistical power 取捨>

---

## 5. Abort Signals
<!-- owner: SRE · required: always -->

<!-- ai-rule: 區分 hard_abort（立即退回 + 通知）與 soft_abort（暫停 + 人為決策）；hard 必須含 SLI 急速劣化條件 -->

### Hard abort（立即退回）

- [ ] error_rate > 5% for 1 min
- [ ] p95 latency > baseline × 2 for 2 min
- [ ] data_integrity check fail (任一筆)

### Soft abort（暫停觀察 + 召集決策）

- [ ] conversion 下滑 > 5% for 10 min
- [ ] AOV 下滑 > 3% for 15 min
- [ ] support ticket spike > 2x baseline

**Source:** slo §XXX + kpi §YYY

---

## 6. Blast Radius per Stage
<!-- owner: PO + SRE · required: always -->

<!-- ai-rule: 每階段估算 affected_users 數量 + 受影響 feature；高風險 cohort（enterprise / paying）單獨標 -->

| Stage | Affected users | Affected features | High-risk cohort? | Confidence |
|---|---|---|---|---|
| 1 | ~50 internal | feat-A, feat-B | no | **[H]** |
| 2 | ~5,000 EU mobile | feat-A, feat-B | no | **[H]** |
| 3 | ~25,000 (excl. enterprise) | all | partial | **[M]** |
| 4 | full | all | yes (enterprise) | **[M]** |

---

## 7. Observability Must-Have
<!-- owner: SRE + Dev · required: always -->

<!-- ai-rule: 列出 metrics / logs / traces / dashboards 四類必備項。缺一即不能開灰度 -->

| Type | Item | Owner | Status |
|---|---|---|---|
| Metric | error_rate per stage | SRE | ready |
| Metric | conversion_delta per cohort | PO | _TODO: dashboard 缺_ |
| Log | request_id + stage_label | Dev | ready |
| Trace | rollout-version span tag | Dev | ready |
| Dashboard | canary-overview URL | SRE | _TODO_ |

---

## 8. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：baseline 流量不足以達 statistical significance> — **Mitigation:** 延長 Stage 2 duration — **Owner:** SRE
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：enterprise tier 是否參與灰度？>
- [ ] **Q2:** ...

---

## 9. Out of Scope
<!-- owner: DevOps · required: full-only -->

本 Canary Strategy **不處理**：

- ❌ **A/B test 假說設計與統計分析** — 屬 experiment / ab-test 卡
- ❌ **長期 holdout 實驗（> 7 天）** — 屬 product analytics
- ❌ **UI 視覺 canary（multivariate）** — 屬 UX experiment

---

## 10. Decision Log
<!-- owner: DevOps · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 階段切分節奏 | 1/5/25/100 vs 5/50/100 vs blue/green | 1/5/25/100 | 5/50 (blast radius 超 error budget)、blue/green (無法逐步驗 KPI) | **[H]** |
| YYYY-MM-DD | promote 機制 | full-auto vs full-manual vs hybrid | hybrid | full-auto (高 cohort 風險過大)、full-manual (拖慢 lead time) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] 每階段 success_criteria 同時含 SLI + 業務 KPI（不只看 5xx）
> - [ ] 每階段附 sample_size_required + 計算依據
> - [ ] Abort signals 區分 hard / soft，hard 含 SLI 急速劣化條件
> - [ ] Blast radius 每階段標 affected_users + high-risk cohort
> - [ ] Observability 4 類齊全（metric / log / trace / dashboard）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Canary Strategy markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 slo.md / release-plan.md / business-kpi.md 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 每階段只看 5xx 不看 conversion（業務指標 silent fail）、sample_size 沒估算就開灰度（statistical power 不足）、hard / soft abort 不分（猶豫成本爆表）、enterprise / paying cohort 被混進早期 stage、observability 缺 stage_label tag 導致無法切片。AI 若漏這些，自檢清單會抓到並回頭補。
