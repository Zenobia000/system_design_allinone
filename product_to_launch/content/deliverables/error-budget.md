---
title: "Error Budget · 誤差預算"
slug: "error-budget"
stage: "operate"
roles: ["devops"]
order: 45
hook: "把『要不要繼續發新功能』變成可計算的決策"
when_to_use: "SLO 已定義、且團隊需要在新功能 vs 穩定性間做取捨時"
ai_leverage: "用 Claude 從 SLI 時序資料算出剩餘 budget 與燃燒率"
art: "/generated/stage-operate.webp"
source: "Google SRE Workbook, deep-research-report.md §SRE"
---

## 解決什麼問題

Error Budget 是 SLO 的反面：允許的不可用度。它把「Dev 想 ship、SRE 想 freeze」的政治問題變成簡單規則：budget 沒用完就 ship，用完就 freeze 高風險變更。

## 誰負責、和誰對接

- **主責：** DevOps / SRE
- **協作：** PO 接受 freeze 規則、Dev Lead 排重點修復
- **下游收件：** Release Plan、Capacity Planning、Incident Report

## 何時用、何時不用

- ✅ **必要時機：** 有 SLO 且穩定性與交付速度產生衝突
- ❌ **不需要時：** 沒 SLO；budget 從未影響決策
- ⚠️ **常見誤用：** budget 燒完仍照常 ship；budget 政策無人簽核

## AI 怎麼加速

把 SLI 時序 + SLO 定義 + release log 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 freeze 政策與例外條款**。本卡輸出**真實 Error Budget markdown 報告**（含 burn-rate 警報表、剩餘 budget 公式、freeze policy、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給單 SLO / 小團隊 / 早期 production，**完整範本**給多 SLO / 跨團隊 release gate / 合規 audit 場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "error-budget"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["slo", "sli-timeseries"]
  optional: ["release-log"]
---

# Error Budget: <slo-id>

**Status:** Draft v0.X · **Owner:** <SRE name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 4, 6, 8），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：SLI §XXX / release §YYY）`；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；budget 必須附公式 `(1 - target) × window` 且以時間單位呈現（不准只給 %）；burn rate 必須給 fast (1h) + slow (6h) 兩組警報。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：本 SLO 目前 burn rate、剩餘 budget、是否觸發 freeze、top burn event -->

<3-5 行說明>

> **TL;DR:** <一句話：剩 X min / Y% budget，目前燃燒速率 Z×，建議 freeze / continue>

---

## 2. SLO & Budget Formula

<!-- ai-rule: 必含 target / window / total budget 三件；公式行內顯示 -->

| Field | Value |
|---|---|
| **SLO ID** | <SLO-001> |
| **SLI** | <e.g. checkout p95 latency < 1.5s> |
| **Target** | <e.g. 99.9%> |
| **Window** | <e.g. 28d rolling> |
| **Total budget** | `(1 - 0.999) × 28d = 40.3 min` |

---

## 3. Current Burn Rate

<!-- ai-rule: 必填 1h + 6h 兩組；公式 = consumed / expected -->

| Window | Burn rate | Interpretation | Confidence |
|---|---|---|---|
| **1h fast** | 14.4× | 用 1h 燒掉應燒 14.4h 的 budget | **[H]** |
| **6h slow** | 2× | 用 6h 燒掉應燒 12h 的 budget | **[H]** |
| **Formula** | `consumed_in_window / expected_consumption_in_window` | — | — |

---

## 4. Remaining Budget

<!-- ai-rule: 必同時給 % 與時間單位；公式行內顯示 -->

| Field | Value | Confidence |
|---|---|---|
| **Remaining %** | 35% | **[H]** |
| **Time equivalent** | 14.1 min of 40.3 min / 28d | **[H]** |
| **Formula** | `(1 - target) × window − consumed` | — |
| **Projected exhaustion** | YYYY-MM-DD or `_TODO_` | **[M]** |

---

## 6. Burn-Rate Alerts & Freeze Policy

<!-- ai-rule: fast + slow 兩組警報必填；freeze + relax 條件對稱（防止單向卡死） -->

### Burn-rate alerts

| Alert | Threshold | Window | Page |
|---|---|---|---|
| **Fast** | ≥ 14.4× | 1h | SEV2 |
| **Slow** | ≥ 6× | 6h | SEV3 |

### Freeze policy

| Condition | Action |
|---|---|
| Remaining < 10% **OR** fast burn sustained 30 min | Freeze high-risk changes |
| Remaining > 70% **AND** no SEV-1 in 14d | Relax (back to normal release cadence) |
| Emergency security fix | Allow with VP approval |

---

## 8. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Freeze threshold | 5% / 10% / 20% | 10% | 5% (too late, no buffer)、20% (blocks too many releases) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 4, 6, 8）
> - [ ] Budget 同時給 % 與時間單位（不准只給 %）
> - [ ] 公式 `(1 - target) × window` 行內顯示
> - [ ] Burn rate 必填 fast (1h) + slow (6h) 兩組
> - [ ] Freeze + Relax 條件對稱（防單向卡死）
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出
```

```template-full
---
doc_type: "error-budget"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["slo", "sli-timeseries", "release-log", "incident-reports"]
  optional: ["dependency-slo"]
---

# Error Budget: <slo-id>

**Status:** Draft v0.X · **Owner:** <SRE name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PO / Dev Lead / Release Manager / Engineering Manager

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。對標 Google SRE Workbook ch.4-6 burn-rate alerting + blameless 文化。每結論行內 `（依據：SLI §XXX / release §YYY / incident §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；SLI 數據不足 28 天寫 `_TODO_` 不外推；budget 必須附公式 `(1 - target) × window` 且以時間單位呈現；burn rate 必須給 fast (1h) + slow (6h) 兩組警報；禁 YAML / JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: SRE · required: always -->

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：本 SLO 目前 burn rate、剩餘 budget、是否觸發 freeze、top burn event、預估耗盡日期 -->

<3-5 行說明>

> **TL;DR:** <一句話：剩 X min / Y% budget，目前燃燒速率 Z×，建議 freeze / continue>

---

## 2. SLO & Budget Formula
<!-- owner: SRE · required: always -->

<!-- ai-rule: 必含 target / window / total budget 三件；公式行內顯示 -->

| Field | Value | Source |
|---|---|---|
| **SLO ID** | <SLO-001> | — |
| **SLI** | <e.g. checkout p95 latency < 1.5s> | SLO card |
| **Target** | <e.g. 99.9%> | SLO card |
| **Window** | <e.g. 28d rolling> | SLO card |
| **Total budget** | `(1 - 0.999) × 28d = 40.3 min` | derived |

---

## 3. Current Burn Rate
<!-- owner: SRE · required: always -->

<!-- ai-rule: 1h + 6h 兩組；公式 = consumed / expected；含 source -->

| Window | Burn rate | Interpretation | Source | Confidence |
|---|---|---|---|---|
| **1h fast** | 14.4× | 用 1h 燒掉應燒 14.4h 的 budget | SLI §3 | **[H]** |
| **6h slow** | 2× | 用 6h 燒掉應燒 12h 的 budget | SLI §3 | **[H]** |
| **Formula** | `consumed_in_window / expected_consumption_in_window` | — | — | — |

---

## 4. Remaining Budget
<!-- owner: SRE · required: always -->

<!-- ai-rule: 必同時給 % 與時間單位；公式行內顯示；projected_exhaustion 無法估算寫 _TODO_ -->

| Field | Value | Confidence |
|---|---|---|
| **Remaining %** | 35% | **[H]** |
| **Time equivalent** | 14.1 min of 40.3 min / 28d | **[H]** |
| **Formula** | `(1 - target) × window − consumed` | — |
| **Projected exhaustion** | YYYY-MM-DD | **[M]** |

---

## 5. Root-Cause Attribution（last 7-28d）
<!-- owner: SRE · required: full-only -->

<!-- ai-rule: 列 top 3 burn events；每條附 contribution % + source；無 incident report 寫 _TODO_ -->

| Period | Top burn event | Contribution % | Source | Confidence |
|---|---|---|---|---|
| Last 7d | <incident INC-2025-042 / release rel-321> | 60% | incident-report §1 | **[H]** |
| Last 28d | <chronic DB lock contention> | 25% | metric §5 | **[M]** |
| Last 28d | <unknown> | 15% | `_TODO: 補 attribution_` | **[L]** |

---

## 6. Burn-Rate Alerts & Freeze Policy
<!-- owner: SRE + Release Manager · required: always -->

<!-- ai-rule: fast + slow 兩組警報必填；freeze + relax 條件對稱；例外條款必須有 approver -->

### Burn-rate alerts

| Alert | Threshold | Window | Page severity | Runbook |
|---|---|---|---|---|
| **Fast** | ≥ 14.4× | 1h | SEV2 | <runbook-link> |
| **Slow** | ≥ 6× | 6h | SEV3 | <runbook-link> |

### Freeze policy

| Condition | Action | Approver |
|---|---|---|
| Remaining < 10% **OR** fast burn sustained 30 min | Freeze high-risk changes | SRE on-call |
| Remaining > 70% **AND** no SEV-1 in 14d | Relax (normal cadence) | Release Manager |
| Emergency security fix | Allow with override | VP Engineering |
| Customer-facing rollback | Always allowed | SRE on-call |

---

## 7. Exhaustion Plan
<!-- owner: SRE + PO · required: full-only -->

<!-- ai-rule: 三條 action 必填；projected_exhaustion_date 無法估算寫 _TODO_ -->

| Field | Value |
|---|---|
| **Projected exhaustion date** | YYYY-MM-DD or `_TODO_` |
| **Action 1** | Freeze high-risk changes |
| **Action 2** | Prioritise reliability backlog (re-rank top 3 items) |
| **Action 3** | Trigger postmortem of top burn event |
| **Action 4** | Notify PO + Dev Lead + Release Manager |

---

## 8. Decision Log
<!-- owner: SRE + PO · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Freeze threshold | 5% / 10% / 20% | 10% | 5% (too late, no buffer)、20% (blocks too many releases) | **[H]** |
| YYYY-MM-DD | Fast burn alert window | 30m / 1h / 2h | 1h | 30m (太多 false page)、2h (反應太慢) | **[H]** |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner -->

> **R1:** <freeze 期間累積 feature backlog 反彈 ship> — **Mitigation:** Freeze 政策含 reliability backlog 排序 — **Owner:** PO
>
> **R2:** <例外條款濫用導致政策失效> — **Mitigation:** 例外需 VP approval + 月度 audit — **Owner:** Engineering Manager

### Open Questions

- [ ] **Q1:** <依賴 SLO 的 burn 是否要納入本 budget？>
- [ ] **Q2:** <multi-window multi-burn-rate alert 是否需要再加 24h 慢警報？>

---

## 10. Out of Scope & Confidence & TODO
<!-- owner: All · required: always -->

本 Error Budget 報告 **不處理**：

- ❌ **不處理 SLO 數值本身的合理性** — 屬 SLO 卡
- ❌ **不處理 incident root cause** — 屬 postmortem 卡
- ❌ **不處理 freeze 期間替代工作安排** — 屬 PM / PO

### Confidence & Sources

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1：未來 traffic 模式不變>
  - <假設 2：release cadence 不變>
- **Highest-value next input:** <下一份最該補的輸入：完整 release diff / dependency SLO burn / 訪談 PO 接受 freeze 規則>

### TODO（缺資料）

- _TODO: 需要 ≥ 28 天 SLI 時序校準 burn rate_
- _TODO: 補 last 28d 15% unknown burn 的 root cause attribution_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] Budget 同時給 % 與時間單位（不准只給 %）
> - [ ] 公式 `(1 - target) × window` 行內顯示
> - [ ] Burn rate 必填 fast (1h) + slow (6h) 兩組 + 對應 runbook
> - [ ] Root-cause attribution top 3 events，contribution 加總接近 100%
> - [ ] Freeze + Relax 條件對稱；例外條款有 approver
> - [ ] Exhaustion plan ≥ 3 條 action
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Error Budget markdown 報告。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 SLO 定義 / SLI 時序資料（≥ 28 天）/ Release log / 近期 incident report 全文）
⏫
```

> [!TIP]
> **常見錯誤：** budget 只給 % 不給時間單位（無法直觀理解嚴重性）、burn rate 沒有 fast + slow 兩組（單一警報要嘛太敏感要嘛太慢）、freeze 沒對應 relax 條件（變成永久 freeze）、例外條款無 approver（被濫用）、policy 未經 PO 簽核（freeze 真的觸發時 ship 派會反彈）。AI 若漏這些，自檢清單會抓到並回頭補。
