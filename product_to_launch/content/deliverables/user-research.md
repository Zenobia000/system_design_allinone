---
title: "使用者研究"
slug: "user-research"
stage: "discovery"
roles: ["ux", "pm"]
order: 1
hook: "用真實證據打掉腦補假設"
when_to_use: "新題目啟動、conversion 異常、KPI 停滯時必要"
ai_leverage: "用 Claude 把訪談錄音逐字稿 → 萃取 pain point 與 quote 庫"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

跳過使用者研究就動工，等於用 PM 的個人偏好賭整個 sprint 的成本。
沒有研究證據，後面的 PRD、flow、metric 全是猜的；上線後 KPI 不動，沒人知道是題目錯、設計錯、還是執行錯。

## 誰負責、和誰對接

- **主責：** UX（規劃方法、執行訪談、做 synthesis）
- **協作：** PM（提供商業問題與 hypothesis）、BA（補 stakeholder 視角）
- **下游收件：** PM（寫 PRD）、UX（畫 journey/flow）、PO（refine backlog）

## 何時用、何時不用

- ✅ **必要時機：** 新題目啟動、conversion funnel 出現異常、KPI 連續兩季停滯
- ❌ **不需要時：** Bug fix、純技術 spike、已有近三個月內可信研究資料
- ⚠️ **常見誤用：** 只訪問內部同事當「使用者」、用問卷問偏好不問行為

## AI 怎麼加速

把訪談逐字稿 8-12 份 + 既定 hypothesis 清單 + research question 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只做主題判讀與決策**。本卡輸出**真實使用者研究 synthesis markdown 文件**（含表格、quote 引用、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 5-8 份訪談 / 早期 discovery 場景用，**完整範本**給 8-12+ 份訪談 / 含 hypothesis validation / 需要 IRB consent 紀錄的場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "user-research"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["research-question", "interview-transcripts"]
  optional: ["hypothesis-list"]
---

# User Research Synthesis: <topic>

**Status:** Draft v0.X · **Owner:** <UX researcher name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 4, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每 finding 必須附 **≥ 2 個 supporting quote**（參與者代號 + transcript ref）；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造受訪者數量或 theme；**不寫解法**（解決方案屬 PRD / ideation 卡）；至少列 1 條「與既定 hypothesis 衝突」訊號（找不到也要說明為何）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：N 份訪談、top 3 finding、最 surprising 是什麼、最強 hypothesis refutation -->

<3-5 行說明>

> **TL;DR:** <一句話：最關鍵的 finding 是 X，挑戰了 hypothesis Y>

**Research question:** <一句話 research question>
**Sample size:** N participants · **Consent:** obtained

---

## 2. Methodology & Participant Profile

<!-- ai-rule: methodology 必須含 rationale（為何選這個方法）+ bias risks 至少 2 條；participant profile 必須含 consent + PII handling -->

| Field | Value | Source |
|---|---|---|
| **Method** | depth_interview / contextual_inquiry / diary_study / usability_test | _自選_ |
| **Rationale** | <為何選這個方法> | — |
| **Sample size** | N | — |
| **Segments** | P1 (x), P2 (y) | persona §XX |
| **Recruitment** | <how participants were sourced> | — |
| **Bias risks** | sampling bias / leading questions / ... | — |
| **Consent** | obtained / pending | — |
| **PII handling** | 已去識別化（代號 P01-PNN） | — |

---

## 3. Key Findings

<!-- ai-rule: 3-5 個 finding。每個必須附 ≥ 2 個 supporting quote（參與者代號 + transcript ref）；confidence < H 必須說明為何 -->

### F1 · <finding 一句話>

- **Confidence:** **[H]**
- **Supporting quotes:**
  - "<原句>" — P03 §15
  - "<原句>" — P07 §22
- **Contradicts hypothesis:** H2（如有）

### F2 · <finding>

（同上格式）

### F3 · <finding>

（同上格式）

---

## 4. Hypothesis Validation & Surprising Insights

<!-- ai-rule: 對每個既定 hypothesis 標 supported / refuted / inconclusive + evidence；surprising insight 至少 1 個 -->

### Hypothesis status

| Hypothesis | Status | Evidence | Confidence |
|---|---|---|---|
| H1: <原假設> | **refuted** | F1, F3 | **[H]** |
| H2: <原假設> | supported | F2 | **[M]** |
| H3: <原假設> | inconclusive | _樣本不足_ | **[L]** |

### Surprising insights

- 💡 <insight 一句話> — **Why surprising:** <為何意外> — **Evidence:** F2 + quote P05 §8

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | theme clustering 切法 | by_jtbd / by_pain_severity / by_persona | by_jtbd | by_pain_severity (難量化)、by_persona (跨群混淆) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（我推測但訪談未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的訪談類型 / 行為 analytics / 競品流失訪談>

### TODO（缺資料）

- _TODO: 需要 3 份 P2 訪談校準 F3 saturation_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 4, 10, 12，刻意沿用完整版編號）
> - [ ] 每個 finding 至少 2 個 supporting quote（參與者代號 + transcript ref）
> - [ ] Consent + PII handling 已標明
> - [ ] 至少 1 條 surprising insight 或 hypothesis refutation
> - [ ] 沒有任何 finding 寫成解法（解決方案屬 PRD / ideation 卡）
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（synthesis 是給人讀的 markdown）
```

```template-full
---
doc_type: "user-research"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["research-question", "interview-transcripts", "hypothesis-list"]
  optional: ["persona", "analytics-baseline"]
---

# User Research Synthesis: <topic>

**Status:** Draft v0.X · **Owner:** <UX researcher name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PM / UX / PO

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。每 finding 必須附 **≥ 2 個 supporting quote**（參與者代號 + transcript ref）；每結論行內 `（依據：transcript §XXX / quote: "..." — P0N）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**不寫解法**；至少列 3 條「與既定 hypothesis 衝突」訊號（找不到也要說明為何 — 可能是 sampling bias）；研究倫理（consent + PII 去識別化）必填；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: UX · required: always -->

<!-- ai-fill: 3-5 行：N 份訪談、top 3 finding、最 surprising 是什麼、最強 hypothesis refutation、下一步建議 -->

<3-5 行說明>

> **TL;DR:** <一句話：最關鍵的 finding 是 X，挑戰了 hypothesis Y，建議下一步 Z>

**Research question:** <一句話>

---

## 2. Methodology
<!-- owner: UX · required: always -->

<!-- ai-rule: methodology 必須含 rationale + bias risks 至少 2 條 + recruitment 來源 -->

| Field | Value | Source |
|---|---|---|
| **Method** | depth_interview / contextual_inquiry / diary_study / usability_test / survey | — |
| **Rationale** | <為何選這個方法（vs alternatives）> | — |
| **Recruitment** | <how participants were sourced，含 channel + criteria> | — |
| **Bias risks** | sampling bias / leading questions / social desirability | — |
| **Interview protocol** | <附 link 或 §ref> | — |

---

## 3. Participant Profile & Consent
<!-- owner: UX · required: always -->

<!-- ai-rule: 必須含 segment breakdown + consent status + PII handling；違反研究倫理須說明 -->

| Field | Value |
|---|---|
| **Total** | N participants |
| **P1 segment** | x participants |
| **P2 segment** | y participants |
| **Consent** | obtained for all / N pending |
| **PII handling** | 已去識別化（代號 P01-PNN），transcript 已遮蔽姓名 / 公司名 |
| **Recording** | with explicit consent · retained for X months |

---

## 4. Key Findings
<!-- owner: UX · required: always -->

<!-- ai-rule: 5-8 個 finding。每個必須附 ≥ 2 個 supporting quote（參與者代號 + transcript ref）；contradicts_hypothesis 必填（無 = 寫 N/A）；confidence < H 必須說明為何 -->

### F1 · <finding 一句話>

- **Confidence:** **[H]**
- **Supporting quotes:**
  - "<原句>" — P03 §15
  - "<原句>" — P07 §22
  - "<原句>" — P11 §8
- **Contradicts hypothesis:** H2
- **Related theme:** T1

### F2 · <finding>

（同上格式）

### F3 ~ F8 · ...

---

## 5. Themes & Saturation
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 用 affinity / grounded theory 聚類；每個 theme 標 saturation（saturated / partial / weak）+ quote_count -->

| Theme | Quote count | Saturation | Related findings | Confidence |
|---|---|---|---|---|
| T1: <theme name> | 18 | **saturated** | F1, F3, F5 | **[H]** |
| T2: <theme name> | 9 | partial | F2, F6 | **[M]** |
| T3: <theme name> | 4 | weak | F4 | **[L]** |

---

## 6. Hypothesis Validation
<!-- owner: UX + PM · required: always -->

<!-- ai-rule: 對每個既定 hypothesis 標 supported / refuted / inconclusive + evidence finding ref + confidence -->

| Hypothesis | Status | Evidence | Confidence |
|---|---|---|---|
| H1: <原假設> | **refuted** | F1, F3 | **[H]** |
| H2: <原假設> | supported | F2, F5 | **[M]** |
| H3: <原假設> | inconclusive | _樣本不足，僅 P03 提及_ | **[L]** |

---

## 7. Surprising Insights
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 至少 3 個 surprising insight（不符合既定 hypothesis 但有 quote 支撐的訊號）；每個含 why_surprising + evidence -->

- 💡 **I1:** <insight 一句話>
  - **Why surprising:** <與既定 hypothesis 衝突點>
  - **Evidence:** F2 + quote P05 §8
- 💡 **I2:** ...
- 💡 **I3:** ...

---

## 8. Conflicting Signals & Bias Check
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 必須列 ≥ 3 條「與既定 hypothesis 或主流結論衝突」訊號；找不到也要說明為何（sampling bias / 樣本偏 power user / 訪談誘導） -->

| # | Conflicting signal | Source | Possible bias |
|---|---|---|---|
| C1 | <衝突點 1> | F4 quote P09 §12 | sampling bias — 全是付費客戶 |
| C2 | <衝突點 2> | F6 quote P02 §3 | — |
| C3 | <衝突點 3> | _找不到，因為訪談未問此面向_ | recruitment bias |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <e.g., P3 segment 樣本僅 3 份，T3 saturation 不足> — **Mitigation:** 補 5 份 P3 訪談 — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <尚未解的問題>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: UX · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | theme clustering 切法 | by_jtbd / by_pain_severity / by_persona | by_jtbd | by_pain_severity (難量化)、by_persona (跨群混淆) | **[H]** |
| YYYY-MM-DD | recruitment channel | community / customer list / agency | customer list | community (sample bias)、agency (cost 高) | **[M]** |

---

## 11. Out of Scope
<!-- owner: UX · required: full-only -->

本使用者研究 synthesis **不處理**：

- ❌ **不設計解決方案** — 屬 ideation / PRD 卡
- ❌ **不排商業優先序** — 屬 PO backlog
- ❌ **不評估技術實作成本** — 屬 Architect / Dev Lead

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（我推測但訪談未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的訪談 / 行為 analytics / 競品流失訪談>

### TODO（缺資料）

- _TODO: 需要 5+ 份 P3 訪談校準 T3 saturation_
- _TODO: 補 H3 evidence（目前 inconclusive）_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 finding 至少 2 個 supporting quote（參與者代號 + transcript ref）
> - [ ] Consent + PII handling 已標明（違反研究倫理須說明）
> - [ ] Themes 段每個含 saturation + quote_count
> - [ ] Hypothesis validation 段對每個既定 hypothesis 標 supported / refuted / inconclusive
> - [ ] Surprising insights ≥ 3 個（每個含 why_surprising + evidence）
> - [ ] Conflicting signals ≥ 3 條（找不到也要寫明為何 + 可能的 bias）
> - [ ] 沒有任何 finding 寫成解法（解決方案屬 PRD / ideation 卡）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（synthesis 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出使用者研究 synthesis markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼訪談逐字稿 8-12 份 / 既定 hypothesis 清單 / 研究目的與 research question 全文）
⏫
```

> [!TIP]
> **常見錯誤：** Finding 寫成解法（「使用者需要一個 X 功能」= 錯，應該寫 pain）、quote 被斷章取義（必須含 §ref 可回溯）、找不到 conflicting signals 就裝沒有（必須列出可能的 sampling bias）、忘了 consent / PII 處理（= 違反研究倫理）。AI 若漏這些，自檢清單會抓到並回頭補。
