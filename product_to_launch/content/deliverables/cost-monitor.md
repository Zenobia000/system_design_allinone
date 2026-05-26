---
title: "Cost Monitor · 成本監控"
slug: "cost-monitor"
stage: "operate"
roles: ["devops"]
order: 52
hook: "讓雲端帳單變成可歸因、可預警的指標"
when_to_use: "雲端帳單 ≥ 月度預算門檻、或多團隊共用基礎設施"
ai_leverage: "用 Claude 從帳單明細抽異常 spike 與歸因建議"
art: "/generated/stage-operate.webp"
source: "AWS Builders' Library, FinOps Foundation"
---

## 解決什麼問題

雲端成本失控大多不是被攻擊，是某個資源被遺忘。Cost Monitor 把帳單拆到服務 / 環境 / 團隊，並設燃燒率告警與預期 baseline。

## 誰負責、和誰對接

- **主責：** DevOps / FinOps
- **協作：** 各服務 owner、Finance、Architect（架構級成本決策）
- **下游收件：** Capacity Planning、Deprecation Plan、ADR

## 何時用、何時不用

- ✅ **必要時機：** 多服務共用 account、跨團隊預算、預期月度成長
- ❌ **不需要時：** 單人專案、定額預付
- ⚠️ **常見誤用：** 只看總額不分群；無 tag 規範；告警閾值絕對值而非比率

## AI 怎麼加速

把近 30 天帳單 + tag 規範 + 使用量 metric 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 rightsizing 風險與 SLO 影響**。本卡輸出**真實 Cost Monitor markdown 報告**（含成本歸因表、anomaly 規則、savings 候選帶 effort/risk、inline `[H/M/L]` badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給單帳號 / 小團隊 / MVP 預算控管，**完整範本**給跨團隊共用 account / SOC 2 帳務 audit / 多 region production 場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "cost-monitor"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["billing-export", "service-inventory"]
  optional: ["tag-policy"]
---

# Cost Monitor: <account / project>

**Status:** Draft v0.X · **Owner:** <DevOps name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 4, 5, 7, 9），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：billing §XXX）`；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；anomaly 必須用比率（％ MoM 或 σ）而非絕對值；每個 savings 必含 effort + risk + SLO impact 三件。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：總月度成本、MoM delta、top 1-2 driver、最大 savings 候選 -->

<3-5 行說明>

> **TL;DR:** <一句話：本月 $X、MoM +Y%、最大 driver 是 Z>

---

## 2. Cost per Service（top 5-10）

<!-- ai-rule: 排序 by monthly_cost desc；tag_owner = untagged 須在第 4 段列入 untagged bucket -->

| Service | Monthly $ | MoM Δ% | Tag owner | Confidence |
|---|---|---|---|---|
| <checkout-api> | $X | +12% | team-payments | **[H]** |
| <log-pipeline> | $Y | +45% | untagged | **[M]** |
| ... | ... | ... | ... | ... |

---

## 4. Anomaly & Attribution

<!-- ai-rule: anomaly 用比率，不准用絕對值；untagged_bucket 必填即使是 $0 -->

### Anomaly detection

| Field | Value |
|---|---|
| **Baseline** | trailing 30d median + seasonality adj |
| **Threshold** | > 2σ OR > 25% MoM |
| **Ignored events** | <release X, marketing Y> |

### Attribution tags

| Field | Value | Confidence |
|---|---|---|
| **Required tags** | team / feature / env / cost_center | — |
| **Current coverage** | <e.g. 78%> | **[H]** |
| **Untagged bucket** | $<N> · `_TODO: 歸因_` | **[M]** |

---

## 5. Savings Candidates

<!-- ai-rule: 每條必含 effort + risk + risk_reason + slo_impact 四件；risk=high 須在 risk_reason 寫明何時觸發 -->

| Candidate | Saving $/mo | Effort | Risk | Risk reason | SLO impact | Confidence |
|---|---|---|---|---|---|---|
| <rightsize ec2-prod-checkout> | $X | M | medium | 黑五流量回升會 throttle | burn_risk | **[M]** |
| <log retention 90d → 30d> | $Y | S | low | debug 視窗縮短 | neutral | **[H]** |

---

## 7. Budget Alerts

<!-- ai-rule: 至少 2 條 alert（forecast 超預算 + untagged bucket 超門檻） -->

| Alert | Threshold | Channel | Audience |
|---|---|---|---|
| Forecast > budget × 1.1 | 10% over | slack + email | DevOps + Finance |
| Untagged bucket > 10% of total | 10% | slack | DevOps |

---

## 9. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | RI 1y vs 3y vs SP | on-demand / RI-1y / RI-3y / SP | SP | RI-3y (commit 太久)、on-demand (省太少) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 4, 5, 7, 9）
> - [ ] Cost per service 表帶 `[H/M/L]` badge + MoM Δ
> - [ ] Anomaly 用比率（％ / σ）不准用絕對值
> - [ ] Untagged bucket 必填（即使 $0）
> - [ ] 每個 savings 含 effort + risk + risk_reason + slo_impact
> - [ ] Budget alerts ≥ 2 條
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（cost report 是給人讀的 markdown）
```

```template-full
---
doc_type: "cost-monitor"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["billing-export", "service-inventory", "tag-policy", "usage-metrics"]
  optional: ["slo", "capacity-planning"]
---

# Cost Monitor: <account / project>

**Status:** Draft v0.X · **Owner:** <DevOps / FinOps> · **Last updated:** YYYY-MM-DD · **Reviewers:** Finance / Service owners / Architect

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。對標 AWS Builders' Library + FinOps Foundation framework。每結論行內 `（依據：billing §XXX / metric §YYY）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；anomaly 必須用比率（％ MoM 或 σ）；savings 必含 effort + risk + SLO impact；無歷史 baseline 寫 `_TODO_`；禁 YAML / JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: FinOps · required: always -->

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：總月度成本、MoM delta、top 2-3 driver、untagged bucket %、最大 savings 候選 + risk -->

<3-5 行說明>

> **TL;DR:** <一句話總結：本月 $X、MoM +Y%、最大可省 $Z>

---

## 2. Cost per Service
<!-- owner: FinOps · required: always -->

<!-- ai-rule: 列出 ≥ 80% 總成本的服務；排序 by monthly_cost desc；tag_owner=untagged 須在第 5 段 attribution 列入 -->

| Service | Monthly $ | MoM Δ% | Tag owner | Source | Confidence |
|---|---|---|---|---|---|
| <checkout-api> | $X | +12% | team-payments | billing §3 | **[H]** |
| ... | ... | ... | ... | ... | ... |

---

## 3. Anomaly Detection Method
<!-- owner: FinOps · required: always -->

<!-- ai-rule: anomaly 必須用比率；ignore_known_events 必填即使空陣列 -->

| Field | Value | Rationale |
|---|---|---|
| **Baseline** | trailing 30d median + seasonality adj | <為何選此 baseline> |
| **Threshold** | > 2σ OR > 25% MoM | <避免 false alarm> |
| **Ignored events** | <release X, marketing Y> | <已知 spike 來源> |

---

## 4. Top Drivers
<!-- owner: FinOps + Architect · required: always -->

<!-- ai-rule: ≥ 3 條 driver；每條附 growth_driver 來源（流量 / log volume / 新 region / 新 feature） -->

| Service | Contribution % of total | Growth driver | Source | Confidence |
|---|---|---|---|---|
| <log-pipeline> | 35% | log volume +60% post新 feature | billing §4 + metric §2 | **[H]** |
| <s3-archive> | 20% | 新 region 啟用 | billing §5 | **[H]** |

---

## 5. Attribution Tags & Untagged Bucket
<!-- owner: FinOps + Platform · required: always -->

<!-- ai-rule: untagged_bucket 必填；coverage < 80% 須列為 R1 risk -->

| Field | Value | Confidence |
|---|---|---|
| **Required tags** | team / feature / env / cost_center | — |
| **Current coverage** | <e.g. 78%> | **[H]** |
| **Untagged bucket $** | $<N> | **[M]** |
| **Untagged investigation** | _TODO: 反查 ARN → owner_ | — |

---

## 6. Savings Candidates
<!-- owner: FinOps + Service owners · required: always -->

<!-- ai-rule: 每條必含 effort + risk + risk_reason + slo_impact 四件；risk=high 須額外列入 Risks 段 -->

| Candidate | Saving $/mo | Effort | Risk | Risk reason | SLO impact | Source | Confidence |
|---|---|---|---|---|---|---|---|
| <rightsize ec2-prod-checkout> | $X | M | medium | 黑五流量回升會 throttle | burn_risk | metric §3 | **[M]** |
| <RI 1y commit on RDS prod> | $Y | S | low | commit 1y 鎖定容量 | protect | billing §6 | **[H]** |
| <log retention 90d → 30d> | $Z | S | low | debug 視窗縮短 | neutral | policy §2 | **[H]** |

---

## 7. Budget Alerts
<!-- owner: FinOps · required: always -->

<!-- ai-rule: 至少 3 條 alert（forecast 超預算 + untagged bucket + service-level anomaly） -->

| Alert | Threshold | Channel | Audience |
|---|---|---|---|
| Forecast > budget × 1.1 | 10% over | slack + email | DevOps + Finance |
| Untagged bucket > 10% of total | 10% | slack | DevOps |
| Per-service MoM > 25% | service-level | pagerduty (SEV3) | Service owner |

---

## 8. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner；任何 savings risk=high 必須在這裡列 -->

> **R1:** <untagged bucket > 20% → 無法歸因，無法追責> — **Mitigation:** 強制 tag policy (CI gate) — **Owner:** Platform Lead
>
> **R2:** <rightsize 後黑五流量回升 throttle> — **Mitigation:** Auto-scaling guard + rollback runbook — **Owner:** SRE

### Open Questions

- [ ] **Q1:** <新 region 上線後成本是否會繼續成長？需 PO 預估>
- [ ] **Q2:** <SP commit 期 1y vs 3y 該如何選？>

---

## 9. Decision Log
<!-- owner: FinOps + Architect · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | RI vs SP vs on-demand | on-demand / RI-1y / RI-3y / SP | SP | RI-3y (commit 太久)、on-demand (省太少) | **[H]** |

---

## 10. Out of Scope & Confidence & TODO
<!-- owner: All · required: always -->

本 Cost Monitor 報告 **不處理**：

- ❌ **不處理合約談判** — 屬 Finance / Procurement
- ❌ **不處理外部 SaaS 訂閱（非雲端帳單）** — 屬部門預算
- ❌ **不處理跨 cloud 比價策略** — 屬 platform strategy

### Confidence & Sources

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1：未來流量 / 新 feature 上線時程>
- **Highest-value next input:** <下一份最該補的輸入：instance utilization heatmap / 跨 region 流量明細 / commit 期 ROI 試算>

### TODO（缺資料）

- _TODO: 需要 6-12 個月帳單摘要校準 seasonality baseline_
- _TODO: 反查 untagged ARN 對應 owner_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] Cost per service 表覆蓋 ≥ 80% 總成本
> - [ ] Anomaly 用比率（％ / σ）不准用絕對值
> - [ ] Untagged bucket 必填（即使 $0）
> - [ ] 每個 savings 含 effort + risk + risk_reason + slo_impact
> - [ ] Budget alerts ≥ 3 條
> - [ ] risk=high 的 savings 同時列入 Risks 段
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（cost report 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Cost Monitor markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 近 30 天帳單明細 / tag 規範 + 覆蓋率 / 各服務 usage metric / 歷史 6-12 個月帳單摘要 全文）
⏫
```

> [!TIP]
> **常見錯誤：** anomaly 用絕對值說「太貴」（無法跨期比較）、savings 不附 SLO impact（rightsize 後出事 SRE 背鍋）、untagged bucket 寫「未知」（要列追查方法）、commit 期決策不附 ROI 試算（Finance 無從審）。AI 若漏這些，自檢清單會抓到並回頭補。
