---
title: "Capacity Planning · 容量規劃"
slug: "capacity-planning"
stage: "operate"
roles: ["devops", "architect", "dba"]
order: 51
hook: "在洪峰來臨前先把『撐不撐得住』算清楚"
when_to_use: "預期流量成長、季節性活動、或硬體/雲端預算規劃時"
ai_leverage: "用 Claude 從歷史 metric 推導成長曲線與 headroom"
art: "/generated/stage-operate.webp"
source: "Google SRE Workbook, AWS Builders' Library"
---

## 解決什麼問題

擴容靠經驗很貴。Capacity Planning 用歷史 SLI、業務預估、單位成本，把「需要幾台、何時加、加哪一層」變成可審查決策。

## 誰負責、和誰對接

- **主責：** DevOps / SRE + Architect
- **協作：** PO 提供業務預估、Finance 對齊預算
- **下游收件：** Cost Monitor、ADR（擴容策略）、Release Plan

## 何時用、何時不用

- ✅ **必要時機：** 流量成長 ≥ 20%、季節活動、新區域擴展
- ❌ **不需要時：** 流量穩定、autoscaling 已足夠
- ⚠️ **常見誤用：** 只看 CPU；忽略 DB/queue/external quota；無 headroom 假設

## AI 怎麼加速

把歷史 metric + 業務預估 + 架構圖整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 scaling trigger 與 cost envelope**。本卡輸出**真實 Capacity Planning markdown 文件**（含 headroom 表、瓶頸候選、cost envelope、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給單服務 / 短期預估 / 小型雲端帳單場景，**完整範本**給跨服務 / 多 region / 季節性洪峰 / 合規預算審核場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "capacity-planning"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["slo", "historical-metrics"]
  optional: ["business-forecast"]
---

# Capacity Planning: <service-name>

**Status:** Draft v0.X · **Owner:** <SRE name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 4, 5, 7, 9），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：metric §XXX / forecast §YYY）`；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；headroom 必須 ≥ 30%（洪峰緩衝）；至少涵蓋 CPU / RAM / DB / queue 四維度。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：forecast horizon、最快撐不住的資源、預估擴容月份、cost delta -->

<3-5 行說明>

> **TL;DR:** <一句話：N 月內，X 資源會先撐不住，建議 Y 動作>

---

## 2. Forecast Horizon & Growth Model

<!-- ai-rule: horizon 對應預算週期（3m / 6m / 12m）；growth model 必須附公式與信賴區間 -->

| Field | Value | Confidence |
|---|---|---|
| **Forecast horizon** | <3m / 6m / 12m> | **[H]** |
| **Growth model** | linear / exponential / seasonal / step | **[M]** |
| **MoM growth rate** | <e.g. +12%> | **[M]** |
| **Peak multiplier** | <e.g. 黑五 ×3.5> | **[L]** |
| **Confidence interval** | <e.g. ±15%> | **[M]** |

---

## 4. Headroom per Resource

<!-- ai-rule: 輕量版至少 4 維度（CPU / RAM / DB / queue）；headroom_target ≥ 30%；status breach 必須對應一條 bottleneck -->

| Resource | Current p95 | Forecast p95 | Headroom target | Status | Confidence |
|---|---|---|---|---|---|
| <checkout-api CPU> | 62% | 88% | ≥ 30% | warn | **[H]** |
| <checkout-api RAM> | ... | ... | ≥ 30% | safe | **[H]** |
| <payment-db conn> | ... | ... | ≥ 30% | breach | **[M]** |
| <order-queue depth> | ... | ... | ≥ 30% | safe | **[M]** |

---

## 5. Scaling Triggers

<!-- ai-rule: 每個 breach / warn 資源都要列 trigger；含 auto + manual + lead_time -->

| Resource | Auto scale-up | Auto scale-down | Manual review | Lead time |
|---|---|---|---|---|
| <checkout-api> | p95 CPU > 70% for 5m | p95 CPU < 30% for 30m | forecast headroom < 30% | 4 weeks |

---

## 7. Cost Envelope

<!-- ai-rule: 必填 current / forecast / delta / error band；無預算文件寫 _TODO_ -->

| Field | Value | Confidence |
|---|---|---|
| **Current monthly** | $X | **[H]** |
| **Forecast at horizon** | $Y | **[M]** |
| **Delta** | +Z% | **[M]** |
| **RI / SP saving** | $W | **[L]** |
| **Forecast error band** | ±15% | **[M]** |

---

## 9. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <vertical vs horizontal scale> | vertical / horizontal / sharding | horizontal | vertical (碰到 instance ceiling)、sharding (lead time 不足) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 4, 5, 7, 9）
> - [ ] Headroom 表至少 4 維度（CPU / RAM / DB / queue）
> - [ ] 每個 headroom 行含 `[H/M/L]` badge + status
> - [ ] 每個 breach / warn 資源有對應 scaling trigger
> - [ ] Cost envelope 含 error band
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（capacity plan 是給人讀的 markdown）
```

```template-full
---
doc_type: "capacity-planning"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["slo", "historical-metrics", "business-forecast", "architecture-diagram"]
  optional: ["error-budget", "cost-monitor"]
---

# Capacity Planning: <service-name>

**Status:** Draft v0.X · **Owner:** <SRE / Architect> · **Last updated:** YYYY-MM-DD · **Reviewers:** PO / Finance / Architect

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。對標 Google SRE Workbook ch.18 + AWS Builders' Library。每結論行內 `（依據：metric §XXX / forecast §YYY / arch §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；headroom 必須 ≥ 30%；六維度全填（CPU / RAM / IO / DB / queue / external quota）；歷史 < 6 個月須寫 `_TODO: 需要更長 baseline_` 不強行外推；禁 YAML / JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: SRE/Architect · required: always -->

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：forecast horizon、最快撐不住的資源、預估擴容月份、cost delta、最大不確定性 -->

<3-5 行說明>

> **TL;DR:** <一句話：N 月內，X 資源會先撐不住，建議 Y 動作>

---

## 2. Forecast Horizon & Growth Model
<!-- owner: SRE + PO · required: always -->

<!-- ai-rule: horizon 對應預算週期；growth model 附公式與信賴區間；無歷史 baseline 寫 _TODO_ -->

| Field | Value | Rationale | Confidence |
|---|---|---|---|
| **Forecast horizon** | <3m / 6m / 12m> | <對齊預算週期 / OKR> | **[H]** |
| **Growth model** | linear / exponential / seasonal / step | <為何選此模型> | **[M]** |
| **MoM growth rate** | <e.g. +12%> | <PO 預估 + 歷史回歸> | **[M]** |
| **Peak multiplier** | <e.g. 黑五 ×3.5> | <去年實測> | **[L]** |
| **Confidence interval** | <e.g. ±15%> | <歷史外推誤差> | **[M]** |

---

## 3. Service-Level Targets in Scope
<!-- owner: SRE · required: full-only · skippable: 若 SLO 卡尚未產出可寫 _TODO_ -->

<!-- ai-rule: 每個 scaling trigger 必須對齊 ≥ 1 條 SLO；列出本卡保護的 SLI -->

| SLO ID | SLI | Target | Window | Current burn rate |
|---|---|---|---|---|
| SLO-001 | checkout p95 latency | < 1.5s | 28d | 1.2× |
| SLO-002 | payment success rate | ≥ 99.5% | 28d | 0.8× |

---

## 4. Headroom per Resource（六維度全填）
<!-- owner: SRE · required: always -->

<!-- ai-rule: CPU / RAM / IO / DB / queue / external quota 六維度全填；headroom_target ≥ 30%；status breach 必須對應一條 bottleneck candidate -->

| Resource | Dimension | Current p95 | Forecast p95 @ horizon | Headroom target | Status | Confidence |
|---|---|---|---|---|---|---|
| <checkout-api> | CPU | 62% | 88% | ≥ 30% | warn | **[H]** |
| <checkout-api> | RAM | ... | ... | ≥ 30% | safe | **[H]** |
| <checkout-api> | IO | ... | ... | ≥ 30% | safe | **[M]** |
| <payment-db> | DB connections | 70% | 105% | ≥ 30% | breach | **[M]** |
| <order-queue> | Queue depth | ... | ... | ≥ 30% | safe | **[M]** |
| <stripe-api> | External quota | ... | ... | ≥ 30% | warn | **[L]** |

---

## 5. Scaling Triggers
<!-- owner: SRE · required: always -->

<!-- ai-rule: 每個 breach / warn 資源都要列 trigger；含 auto + manual + lead_time；trigger 必對齊 SLO -->

| Resource | Auto scale-up | Auto scale-down | Manual review | Lead time | SLO ref |
|---|---|---|---|---|---|
| <checkout-api> | p95 CPU > 70% for 5m | p95 CPU < 30% for 30m | forecast headroom < 30% | 4 weeks (HW order) | SLO-001 |
| <payment-db> | manual only | manual only | breach ETA < 30d | 6 weeks (sharding) | SLO-002 |

---

## 6. Bottleneck Candidates
<!-- owner: Architect · required: always -->

<!-- ai-rule: status breach 的 resource 必須在這裡列；每條含 breach_eta + fix_options + cost_to_fix -->

| Component | Breach ETA | Fix options | Cost to fix | Confidence |
|---|---|---|---|---|
| <payment-db conn pool> | YYYY-MM-DD | vertical_scale / sharding / pgbouncer | $X + 6w eng effort | **[M]** |
| <stripe-api rate limit> | YYYY-MM-DD | request quota increase / fallback queue | $0 + 2w | **[L]** |

---

## 7. Cost Envelope
<!-- owner: Finance + SRE · required: always -->

<!-- ai-rule: forecast error band ≤ ±15%；無歷史帳單寫 _TODO_；標明 RI / SP saving 假設 commit 期 -->

| Field | Value | Confidence |
|---|---|---|
| **Current monthly** | $X | **[H]** |
| **Forecast at horizon** | $Y | **[M]** |
| **Delta** | +Z% | **[M]** |
| **RI / SP saving** | $W (1y commit) | **[L]** |
| **Forecast error band** | ±15% | **[M]** |

---

## 8. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner -->

> **R1:** <如業務預估偏差 ±X% 時的 headroom 變動> — **Mitigation:** <降級 / 預留 buffer> — **Owner:** <name>
>
> **R2:** <如外部 quota 申請被拒> — **Mitigation:** <fallback / 分流> — **Owner:** <name>

### Open Questions

- [ ] **Q1:** <黑五流量乘數是否仍 ×3.5？需 marketing 確認>
- [ ] **Q2:** <DB sharding 是否在 lead time 內可完成？>

---

## 9. Decision Log
<!-- owner: Architect + Finance · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | vertical vs horizontal scale | vertical / horizontal / sharding | horizontal | vertical (碰到 instance ceiling)、sharding (lead time 不足) | **[H]** |
| YYYY-MM-DD | RI 1y vs 3y | on-demand / RI-1y / RI-3y / SP | SP | RI-3y (committed 太久)、on-demand (cost↑40%) | **[M]** |

---

## 10. Out of Scope & Confidence & TODO
<!-- owner: All · required: always -->

本 Capacity Planning **不處理**：

- ❌ **不處理架構重寫** — 屬 ADR / Architecture Review 卡
- ❌ **不處理容量壓測腳本** — 屬 QA / chaos engineering 卡
- ❌ **不處理合約供應商談判** — 屬 Procurement

### Confidence & Sources

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的輸入：壓測結果 / 外部 quota 文件 / 詳細歷史帳單>

### TODO（缺資料）

- _TODO: 需要 6+ 個月完整 metric baseline 校準 growth model_
- _TODO: 補 external quota 上限文件_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] Headroom 表六維度全填（CPU / RAM / IO / DB / queue / external quota）
> - [ ] 每個 headroom 行帶 `[H/M/L]` badge + status
> - [ ] 每個 breach / warn 資源在 Bottleneck Candidates 段有對應條目
> - [ ] 每個 scaling trigger 對齊 ≥ 1 條 SLO
> - [ ] Cost envelope 含 forecast error band
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（capacity plan 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Capacity Planning markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 SLO 定義 / 歷史 metric 摘要（≥ 6 個月 CPU/RAM/IO/DB/queue）/ 業務預估 / 架構圖 + 外部 quota 清單 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 只看 CPU 不看 DB connection / queue / external quota（最常炸的就是被忽略的維度）、headroom 算到 90% 還說「safe」（沒留洪峰緩衝）、cost envelope 沒附 error band（被 Finance 退回）、無歷史 baseline 強行外推（應寫 `_TODO_`）。AI 若漏這些，自檢清單會抓到並回頭補。
