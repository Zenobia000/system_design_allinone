---
title: "價值假設卡"
slug: "value-hypothesis"
stage: "discovery"
roles: ["po", "pm"]
order: 6
hook: "把「我覺得有用」翻成可驗證的假設"
when_to_use: "新功能進 backlog 前、需要決定是否投入 sprint 資源時"
ai_leverage: "用 Claude 把模糊想法 → 可驗證假設 + 驗證實驗"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

backlog 上很多 item 是「老闆說要做」「對手有」「客戶提過一次」。
不寫價值假設，就會把高成本工程資源花在沒人在乎的功能。
價值假設卡逼團隊寫清楚：**對誰、解什麼、為何相信會 work、如何驗證**。

## 誰負責、和誰對接

- **主責：** PO（最終排進 backlog）
- **協作：** PM（提供 discovery 資料）、UX（補 user evidence）
- **下游收件：** PM 寫 PRD、Dev Lead 評估成本、QA 設計驗證指標

## 何時用、何時不用

- ✅ **必要時機：** 新功能 ideation、估時 > 1 個 sprint、不確定使用者買不買單
- ❌ **不需要時：** Bug fix、合規限期任務、純技術重構
- ⚠️ **常見誤用：** 把假設寫成「使用者一定會喜歡」這種不可證偽的句子；假設必須有可量測的 leading indicator

## AI 怎麼加速

把模糊 idea + discovery 資料（persona / JTBD / journey pain / metric baseline）整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 trade-off**。本卡輸出**真實價值假設卡 markdown 文件**（含表格、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 solo / MVP / spike 驗證單一 idea 用，**完整範本**給跨職能團隊 / 多 idea 並行 / 進 backlog 前正式 gating。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "value-hypothesis"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona", "jtbd"]
  optional: ["journey-map", "north-star"]
---

# Value Hypothesis: <feature-or-idea-name>

**Status:** Draft v0.X · **Owner:** <PO name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 4, 5, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：persona §XXX / JTBD-NNN / metric §YYY）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；hypothesis **必須可證偽**、kill criteria **必須可被觸發**（不能寫「不管結果都繼續」）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：要驗證什麼 idea、給哪個 segment、預期 leading indicator -->

<3-5 行說明>

> **TL;DR:** <一句話：我們相信 X 對 Y 有價值，因為 Z，用 M 指標驗證>

---

## 2. Customer Segment & Problem

<!-- ai-rule: segment 必須對應 persona id；problem 用「<segment> struggles to <job> because <pain>」格式 -->

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Customer segment** | <persona id + 描述> | **[H]** | persona §P1 |
| **Problem statement** | <segment> struggles to <job> because <pain> | **[H]** | JTBD-001 + interview §3 |
| **Proposed value** | 我們相信 <行為改變> 對 <使用者> 有價值，因為 <理由> | **[M]** | persona §pain + journey §S3 |

---

## 4. Riskiest Assumption

<!-- ai-rule: 只列 1 條最 riskiest（錯了整個 idea 死），category 必須是 desirability / viability / feasibility 之一 -->

> **A1 (riskiest):** <一句話描述>
>
> - **Category:** desirability / viability / feasibility
> - **Why risky:** <若錯了 idea 就死的具體原因>
> - **Confidence:** **[L]** — _尚未有 user evidence_

---

## 5. Test Method & Success Threshold

<!-- ai-rule: test_method 必須 < 1 週且優先選 no-code / mock；threshold 必須含 baseline + target 兩值 -->

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Method** | <fake_door / concierge / wizard_of_oz / prototype_test / smoke_test / painted_door> | **[H]** | _自選_ |
| **Cost** | ≤ X days · no-code: yes/no · participants: N | — | — |
| **Metric** | <e.g., click-through rate on fake door> | **[H]** | metric §baseline |
| **Baseline** | <current value> | **[M]** | analytics §XX |
| **Target** | <value that confirms hypothesis> | **[M]** | _推導自 persona §pain_ |

### Kill criteria（必須可被觸發）

- ❌ 若 < X% 受測者觸發 leading indicator，**放棄此題目**
- ❌ 若 cost-to-acquire > 3× LTV proxy，**放棄**

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | test_method 選擇 | fake_door / concierge / prototype | fake_door | concierge (成本 > 1 週)、prototype (太重) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的訪談 / analytics baseline / 競品 benchmark>

### TODO（缺資料）

- _TODO: 需要 XXX 校準 baseline_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 4, 5, 10, 12，刻意沿用完整版編號）
> - [ ] Riskiest assumption 只有 1 條，且 category 為 desirability / viability / feasibility
> - [ ] Test method cost ≤ 1 週（超過必須在 Decision Log 解釋）
> - [ ] Kill criteria 至少 1 條，且為「可被觸發」的硬門檻（非「再評估」這種模糊話）
> - [ ] Success threshold 含 baseline + target 兩值（單有 target 不算）
> - [ ] 每個量化欄位帶 `[H/M/L]` badge + 行內 `（依據：...）`
> - [ ] 無 YAML / JSON schema 輸出（價值假設卡是給人讀的 markdown）
```

```template-full
---
doc_type: "value-hypothesis"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona", "jtbd", "user-research"]
  optional: ["journey-map", "north-star", "competitive-scan"]
---

# Value Hypothesis: <feature-or-idea-name>

**Status:** Draft v0.X · **Owner:** <PO name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PM / Dev Lead / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。本卡是 backlog gating 文件，hypothesis **必須可證偽**、實驗成本必須 < 1 週、kill criteria 必須誠實到敢真的執行。每結論行內 `（依據：persona §XXX / JTBD-NNN / metric §YYY / interview §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PO · required: always -->

<!-- ai-fill: 3-5 行：要驗證什麼 idea、給哪個 segment、預期 leading indicator、實驗成本 -->

<3-5 行說明>

> **TL;DR:** <一句話：我們相信 X 對 Y 有價值，因為 Z，用 M 指標於 N 天內驗證>

---

## 2. Customer Segment & Problem Statement
<!-- owner: PO + PM · required: always -->

<!-- ai-rule: segment 必須對應 persona id；problem 用「<segment> struggles to <job> because <pain>」格式；無依據者標「來源未明示」並降 confidence -->

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Customer segment** | <persona id + 描述> | **[H]** | persona §P1 |
| **Problem statement** | <segment> struggles to <job> because <pain> | **[H]** | JTBD-001 + interview §3 |
| **Affected user %** | <估計影響範圍> | **[M]** | analytics §XX |

---

## 3. Proposed Value & Behavior Change
<!-- owner: PO + UX · required: always -->

<!-- ai-rule: hypothesis 必須用「我們相信 X 對 Y 有價值，因為 Z，用 M 驗證」格式；behavior_change 必須是可觀察行為，不是「感覺更好」 -->

- **Hypothesis:** 我們相信 <行為改變> 對 <使用者> 有價值，因為 <理由>。我們會用 <指標> 驗證。
- **Observable behavior change:** <e.g., 使用者每週主動打開 dashboard ≥ 3 次>
- **Leading indicator (measurable ≤ 2 weeks):** <e.g., D7 activation rate>
- **Source:** persona §pain + journey §S3
- **Confidence:** **[M]**

---

## 4. Riskiest Assumption
<!-- owner: PO · required: always -->

<!-- ai-rule: 只列 1 條最 riskiest（錯了整個 idea 死）；category 必須是 desirability / viability / feasibility 之一；附 2-3 條次要 assumption 但標明非 riskiest -->

### A1 (riskiest)

- **Statement:** <一句話描述>
- **Category:** desirability / viability / feasibility
- **Why risky:** <若錯了 idea 就死的具體原因>
- **Confidence:** **[L]** — _尚未有 user evidence_

### Other assumptions

| ID | Assumption | Category | Confidence |
|---|---|---|---|
| A2 | <次要假設 1> | feasibility | **[M]** |
| A3 | <次要假設 2> | viability | **[M]** |

---

## 5. Test Method & Experiment Design
<!-- owner: PO + QA · required: always -->

<!-- ai-rule: test_method 必須 < 1 週且優先選 no-code / mock；超過須在 Decision Log 解釋；rationale 必須說明「為何此方法能驗證 riskiest assumption」 -->

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Method** | <fake_door / concierge / wizard_of_oz / prototype_test / smoke_test / painted_door> | **[H]** | _自選_ |
| **Cost estimate** | ≤ X days | — | — |
| **No-code?** | yes / no | — | — |
| **Participants** | N | **[M]** | _目標樣本_ |
| **Rationale** | <為何此方法能驗證 A1 riskiest assumption> | **[H]** | — |

---

## 6. Success Threshold & Kill Criteria
<!-- owner: PO · required: always -->

<!-- ai-rule: threshold 必須含 baseline + target 兩值；kill criteria 必須可被觸發（不能寫「再評估」「持續觀察」這類模糊話），至少 2 條 -->

### Success threshold

| Metric | Baseline | Target | Confidence | Source |
|---|---|---|---|---|
| <e.g., CTR on fake door> | <current> | <target> | **[H]** | analytics §XX |
| <secondary metric> | <current> | <target> | **[M]** | — |

### Kill criteria（必須可被觸發）

- ❌ 若 < X% 受測者觸發 leading indicator，**放棄此題目**
- ❌ 若 cost-to-acquire > 3× LTV proxy，**放棄**
- ❌ 若 supporting metric 反指（e.g., support tickets ↑），**回到 problem statement 重審**

---

## 7. Counter-Indicators & Negative Signals
<!-- owner: PO + PM · required: full-only -->

<!-- ai-rule: 列實驗期間可能出現的「看起來成功但其實失敗」訊號，至少 2 條（防止 confirmation bias 收尾） -->

- ⚠️ <e.g., CTR 達標但 D14 retention 低於 baseline → 表示功能吸引但不黏>
- ⚠️ <e.g., 受測者打開 fake door 但 verbal feedback 模糊 → 表示 problem 共鳴弱>

---

## 8. Cost vs Signal Trade-off
<!-- owner: PO + Dev Lead · required: full-only -->

<!-- ai-rule: 至少列 2 條 test_method 替代路徑與 trade-off，說明為何選定的方法 cost-effective -->

| Method option | Cost | Signal strength | Trade-off |
|---|---|---|---|
| <chosen method> | <X days> | <high/mid/low> | <why this balance> |
| <alternative 1> | <Y days> | <high/mid/low> | <why rejected> |
| <alternative 2> | <Z days> | <high/mid/low> | <why rejected> |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <e.g., 樣本量不足以信賴結果> — **Mitigation:** <如何降低，例如延長 1 週 / 換 channel 招募> — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <尚未解的問題，需誰回答>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: PO · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason，否則不算 audit-ready -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | test_method 選擇 | fake_door / concierge / prototype | fake_door | concierge (成本 > 1 週)、prototype (太重) | **[H]** |
| YYYY-MM-DD | <次決策> | ... | ... | ... | **[M]** |

---

## 11. Out of Scope
<!-- owner: PO · required: full-only -->

本價值假設卡 **不處理**：

- ❌ **不設計實作細節** — 屬 PRD / ADR 卡
- ❌ **不畫 UI mockup** — 屬 UX design / high-fidelity-mockup 卡
- ❌ **不定價或商業模式** — 屬 monetization brief

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的訪談 / analytics baseline / 競品 benchmark>

### TODO（缺資料）

- _TODO: 需要 X 份用戶訪談校準 problem statement_
- _TODO: 需要 analytics baseline 校準 success threshold_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Riskiest assumption 只有 1 條，且 category 為 desirability / viability / feasibility
> - [ ] Test method cost ≤ 1 週（超過必須在 Decision Log 解釋）
> - [ ] Kill criteria 至少 2 條，且為「可被觸發」的硬門檻（非「再評估」「持續觀察」）
> - [ ] Success threshold 含 baseline + target 兩值
> - [ ] Counter-indicators 段至少 2 條（防 confirmation bias）
> - [ ] Cost vs Signal trade-off 至少 2 條替代路徑
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（價值假設卡是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出價值假設卡 markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 persona.md / jtbd.md / 模糊 idea 描述 / 現有 metric baseline / journey-map.md 全文）
⏫
```

> [!TIP]
> **常見錯誤：** Hypothesis 寫成不可證偽的句子（「使用者一定會喜歡」）、kill criteria 寫成「不管結果都繼續」（= 沒 kill 線）、riskiest assumption 寫 3-5 條（重點失焦，必須收斂到 1 條）、test method 估時 > 1 週卻沒在 Decision Log 解釋為何。AI 若漏這些，自檢清單會抓到並回頭補。
