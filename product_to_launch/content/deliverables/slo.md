---
title: "SLO · 服務等級目標"
slug: "slo"
stage: "operate"
roles: ["devops"]
order: 44
hook: "把『可用性』從感覺變成可量化的合約"
when_to_use: "服務有 ≥ 1 個外部 user 依賴、且需要對齊維運優先級時"
ai_leverage: "用 Claude 把使用者抱怨 → SLI candidates，再人工選 SLO 閾值"
art: "/generated/key-deliverable-slo.webp"
source: "software_architect/ppt/02-requirements-sla, Google SRE"
---

## 解決什麼問題

「我們系統很穩」是無法 reviewable 的形容詞。SLO 把可用性與延遲定義為可量測 SLI + 閾值 + 觀察窗，是 error budget、告警、容量規劃的共同源頭。

## 誰負責、和誰對接

- **主責：** DevOps / SRE
- **協作：** PO 對齊使用者體驗、Architect 對齊系統能力
- **下游收件：** Error Budget、告警、Capacity Planning

## 何時用、何時不用

- ✅ **必要時機：** 使用者直接依賴、SLA 對外承諾、跨服務相互調用
- ❌ **不需要時：** 內部一次性工具、無使用者直接依賴
- ⚠️ **常見誤用：** 把 100% 當目標；SLI 量錯點（server side 而非 user side）

## AI 怎麼加速

把客服票 + journey map + 現有 metric 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 SLI 量測點與 SLO 閾值**。本卡輸出**真實 SLO markdown 文件**（含表格、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 solo / 內部服務剛開放 / 單一 SLI 起步用，**完整範本**給對外 SLA 承諾 / 多 SLI / 跨依賴鏈場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "slo"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["user-complaints", "journey-map"]
  optional: ["existing-metrics", "dependency-slos"]
---

# SLO: <service-name>

**Status:** Draft v0.X · **Owner:** <SRE name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 6, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：tickets §XXX / journey §YYY）`；每量化欄位加 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**SLI 必須量在 user side**（不能只量 server side）；**SLO target 必須 < 100%**（100% 不是 SLO 是承諾失敗）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，PO + SRE 30 秒讀完。只寫「保護哪個使用者體驗、SLO 數字、為何選這個數字」 -->

<3-5 行說明>

> **TL;DR:** <一句話：本服務的核心 SLI 與 SLO 目標>

---

## 2. SLI Definition

<!-- ai-rule: 輕量版至少 1 條 SLI（latency 或 availability 擇一必填）。where_measured 必須 user-side / edge / synthetic 三選一 -->

| SLI ID | Name | What measured | Where measured | Aggregation | Confidence |
|---|---|---|---|---|---|
| SLI-001 | <e.g. checkout-success-rate> | <user-observable event> | user-side / edge / synthetic | <e.g. successful / total over 5m> | **[H]** |

---

## 3. SLO Target

<!-- ai-rule: target 必須 < 100%；window 至少 28d rolling；rationale 必須對應抱怨頻率或競品基準 -->

| SLI ref | Target | Window | Rationale | Confidence |
|---|---|---|---|---|
| SLI-001 | 99.9% | 28d rolling | <為何這個數字：對應抱怨頻率 / 競品 / 商業影響> | **[H]** |

> **Error budget:** 0.1% = 40.3 min / 28d

---

## 6. Dependency SLOs

<!-- ai-rule: 列出至少 1 條上游依賴的 SLO（math: 我們的 SLO 不能高於依賴 SLO） -->

| Dependency | Their SLO | Our max SLO | Note |
|---|---|---|---|
| <upstream service> | <number or TODO> | <cannot exceed their SLO> | <說明> |

---

## 10. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | SLO target 99.9% vs 99.95% | 99.0% / 99.9% / 99.95% | 99.9% | 99.0% (超過抱怨門檻)、99.95% (X 倍成本只減 Y% 抱怨) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的資料：過去 90 天 user-side latency 分佈 / 競品 benchmark>

### TODO（缺資料）

- _TODO: 需要 90d user-side latency 分佈校準 SLI-001 閾值_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 6, 10, 12，刻意不連號）
> - [ ] 每個 SLI / SLO 帶 inline `[H/M/L]` badge
> - [ ] SLI where_measured 必為 user-side / edge / synthetic（不接受純 server-side）
> - [ ] SLO target < 100%
> - [ ] Window 至少 28d rolling
> - [ ] Dependency SLO 段已列「我們的 SLO 不能高於依賴」的數學檢查
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（SLO 是給人讀的 markdown）
```

```template-full
---
doc_type: "slo"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["user-complaints", "journey-map", "existing-metrics"]
  optional: ["dependency-slos", "competitive-benchmark"]
---

# SLO: <service-name>

**Status:** Draft v0.X · **Owner:** <SRE name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PO / Architect / Finance

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 Google SRE Workbook。每結論行內 `（依據：tickets §XXX / journey §YYY / metric §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**SLI 必須量在 user side**（不是 server side）；**SLO target 必須 < 100%**（100% 不是 SLO）；**window 至少 28d rolling**；NFR 覆蓋 latency / availability / correctness / freshness 四象限；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: SRE · required: always -->

<!-- ai-fill: 3-5 行，PO + SRE + Finance 30 秒讀完 -->

<3-5 行說明：保護哪個使用者體驗、SLO 數字、為何選這個數字、對 budget 與成本的含意>

> **TL;DR:** <一句話：本服務的核心 SLI 與 SLO 目標>

---

## 2. SLI Definition
<!-- owner: SRE + PO · required: always -->

<!-- ai-rule: 至少 2 條 SLI，覆蓋 latency + availability 雙象限；where_measured 必須 user-side / edge / synthetic 三選一，純 server-side 不接受 -->

| SLI ID | Name | What measured | Where measured | Aggregation | Confidence |
|---|---|---|---|---|---|
| SLI-001 | <e.g. checkout-success-rate> | <user-observable event> | user-side | <successful / total over 5m> | **[H]** |
| SLI-002 | <e.g. checkout-p95-latency> | <user-observable latency> | edge | <p95 over 5m> | **[H]** |

---

## 3. SLO Target
<!-- owner: SRE + PO · required: always -->

<!-- ai-rule: 每個 SLI 對應 1 個 SLO target；target < 100%；window ≥ 28d rolling；rationale 必須對應抱怨頻率 / 競品 / 商業影響三選一 -->

| SLI ref | Target | Window | Rationale | Confidence |
|---|---|---|---|---|
| SLI-001 | 99.9% | 28d rolling | <對應抱怨頻率 / 競品 / 商業影響> | **[H]** |
| SLI-002 | p95 < 2s | 28d rolling | <為何這個數字> | **[M]** |

---

## 4. Error Budget
<!-- owner: SRE · required: always -->

<!-- ai-rule: 列出每個 SLO 對應的 budget 與 burn policy 連結 -->

| SLI ref | Budget per window | Burn policy |
|---|---|---|
| SLI-001 | 0.1% = 40.3 min / 28d | 燃燒 ≥ 50% 凍結 release（屬 error-budget 卡） |
| SLI-002 | <budget> | <policy ref> |

---

## 5. User Journey Impact
<!-- owner: PO · required: always -->

<!-- ai-rule: 列出每個 SLI 對應的 critical journey 與商業影響（conversion / revenue） -->

| Journey | SLI ref | Business impact | Source | Confidence |
|---|---|---|---|---|
| <e.g. checkout> | SLI-001 | <conversion drop X% / revenue loss $Y> | journey §3 + ticket §12 | **[H]** |

---

## 6. Dependency SLOs
<!-- owner: SRE + Architect · required: always -->

<!-- ai-rule: 列出至少 2 條上下游 SLO，數學檢查：本服務 SLO 不能高於依賴 SLO -->

| Dependency | Direction | Their SLO | Our max SLO | Note |
|---|---|---|---|---|
| <upstream service> | inbound | <number or TODO> | <math: ≤ their SLO> | <說明> |
| <downstream service> | outbound | <number> | N/A | <說明> |

---

## 7. NFR（4 象限）
<!-- owner: SRE · required: always -->

<!-- ai-rule: latency / availability / correctness / freshness 四象限全填；不適用須在 Rationale 寫明 -->

| Dimension | Target | Rationale | Confidence |
|---|---|---|---|
| **Latency** | <p95 < Xs / p99 < Ys> | <對應使用者期待> | **[H]** |
| **Availability** | <e.g. 99.9% / 28d> | <對應抱怨閾值> | **[H]** |
| **Correctness** | <e.g. data-loss = 0> | <對應業務影響> | **[M]** |
| **Freshness** | <e.g. data lag < 5m> | <無 streaming use case 故 N/A> | **[L]** |

---

## 8. Review Cadence
<!-- owner: SRE · required: full-only -->

<!-- ai-rule: 至少含 quarterly + triggered review；triggered 必須對應 SEV-1 / major launch -->

| Cadence | Trigger | Owner | Action |
|---|---|---|---|
| Quarterly | 每季首週 | SRE Lead | 重審 target、調整 budget |
| Triggered | 每次 SEV-1 / 重大上線 | IC + SRE | 評估是否需調整 SLO |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner -->

> **R1:** <例：SLO 訂太鬆，使用者抱怨持續> — **Mitigation:** <對齊 ticket 頻率重訂> — **Owner:** <PO>
>
> **R2:** <例：依賴 SLO 未公告，本服務 SLO 無上限保證> — **Mitigation:** <提 ADR 要求依賴方公告> — **Owner:** <Architect>

### Open Questions

- [ ] **Q1:** <e.g. 是否需要對個別客戶承諾更嚴 SLO？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: SRE · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | SLO target 99.9 vs 99.95 | 99.0% / 99.9% / 99.95% | 99.9% | 99.0% (超過抱怨閾值)、99.95% (X 倍成本只減 Y% 抱怨) | **[H]** |

---

## 11. Out of Scope
<!-- owner: SRE · required: full-only -->

本 SLO 文件 **不處理**：

- ❌ **內部工具 SLO** — 屬 internal-SLO 範疇
- ❌ **實作如何達標** — 屬 architecture / capacity-planning 卡
- ❌ **SLA 對外法律條款** — 屬法務

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的：90d user-side latency 分佈 / 競品 SLO benchmark>

### TODO（缺資料）

- _TODO: 需要 90d user-side latency 分佈校準 SLI-002 p95 閾值_
- _TODO: 需要上游服務 SLO 公告才能完成 Dependency 段數學檢查_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 SLI / SLO 帶 inline `[H/M/L]` badge
> - [ ] SLI where_measured 必為 user-side / edge / synthetic（不接受純 server-side）
> - [ ] 每個 SLO target < 100%
> - [ ] Window 至少 28d rolling
> - [ ] Error Budget 段對應每個 SLO
> - [ ] Dependency SLO 段含「我們的 SLO ≤ 依賴 SLO」數學檢查
> - [ ] NFR 4 象限全填（latency / availability / correctness / freshness）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（SLO 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 SLO markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼客服票樣本 / journey map / 現有 metric dashboard 摘要 / 依賴服務 SLO 全文）
⏫
```

> [!TIP]
> **常見錯誤：** SLI 量在 server side 而非 user side（量錯點）、SLO 設成 100%（= 承諾失敗）、忽略依賴 SLO 上限導致本服務 SLO 超出可行範圍、window < 28d（樣本不足）、Decision Log 只列 chosen 不列 rejected。AI 若漏這些，自檢清單會抓到並回頭補。
