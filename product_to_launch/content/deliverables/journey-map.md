---
title: "Journey Map · 旅程地圖"
slug: "journey-map"
stage: "discovery"
roles: ["ux"]
order: 4
hook: "看到使用者在哪一步真正卡住"
when_to_use: "conversion funnel 多步驟、跨通路體驗、需要找優化點時"
ai_leverage: "用 Claude 把客服紀錄 + 訪談 → journey 草圖與 pain point 標註"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 寫得很整齊，不代表使用者真的能順暢走完。
Journey map 把使用者從「察覺需求」到「完成任務」整個過程攤平，標出每一步的動作、情緒、卡點與機會。
不畫 journey，團隊只能優化單點，永遠看不到「客戶從進來到流失」整條路。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（提供 KPI 與商業目標）、客服（補實際投訴點）、行銷（補前段觸點）
- **下游收件：** PM 寫 PRD scope、UX 畫 user flow、PO 排優先序

## 何時用、何時不用

- ✅ **必要時機：** 跨通路體驗、conversion funnel ≥ 5 步、客訴集中在「流程不順」
- ❌ **不需要時：** 單一 screen 的 widget、API-only 產品
- ⚠️ **常見誤用：** 畫成 happy path 美化圖，忽略 error/rework path；NN/g 強調 journey 必須包含 emotion 與 pain

## AI 怎麼加速

把客服工單摘要 + 使用者訪談 + NPS 評論 / 留存問卷整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 trade-off**。本卡輸出**真實 Journey Map markdown 文件**（含表格、emotion 量化、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給單一 persona / 主要 happy path 場景用，**完整範本**給跨通路 / 多 persona / 含 error path 的場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "journey-map"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona"]
  optional: ["user-research", "jtbd"]
---

# Journey Map: <product-name> · <persona-id>

**Status:** Draft v0.X · **Owner:** <UX name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 3, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：interview §XXX / quote: "..." / ticket §YY）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**emotion 必須量化**（-2 ~ +2），不能只寫「不爽」；只畫 happy path（error path 屬完整版）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：persona ref、N 個 stage、moment of truth 是哪一段、最痛的 pain 在哪 -->

<3-5 行說明>

> **TL;DR:** <一句話：使用者從 X 到 Y 的旅程，最卡的是 stage S2>

**Persona:** P1（依據：persona.md §P1）

---

## 2. Happy Path Stages

<!-- ai-rule: 5 個 stage 為宜（awareness → advocacy）。每個 stage 含 action + thought + emotion_score（-2~+2）+ touchpoint + 至少 1 個 pain（附 quote）+ 至少 1 個 opportunity -->

### S1 · Awareness

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Action** | <使用者做什麼> | **[H]** | interview §3 |
| **Thought** | "<內心 OS>" | **[M]** | quote: "<原句>" — P02 |
| **Emotion score** | **0** (-2 ~ +2) | **[M]** | — |
| **Touchpoint** | web / mobile / email / 客服 / in-person | — | — |
| **Pain** | <一句話> · severity: minor / major / **blocker** | **[H]** | "<quote>" — P05 §12 |
| **Opportunity** | <actionable 改善方向> | **[M]** | — |

### S2 · Consideration

（同上格式）

### S3 · Purchase / Activation

### S4 · Use / Habit

### S5 · Advocacy / Churn

---

## 3. Moment of Truth & Emotion Curve

<!-- ai-rule: moment of truth 是「決定 retention vs churn 的關鍵 stage」；emotion curve 用 ASCII / 表格畫出 5 個 stage 的分數變化 -->

- **Moment of truth:** S2 — <rationale: 為何此 stage 決定生死>（依據：interview saturation §XX）**[H]**

### Emotion curve

| Stage | S1 | S2 | S3 | S4 | S5 |
|---|---|---|---|---|---|
| **Score** | 0 | **-2** | +1 | +1 | +2 |
| **低點 / 高點** | 平 | 🔻 低 | ↑ | ↑ | 🔺 高 |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | stage 切法 | by_funnel_step / by_emotion_curve / by_touchpoint | by_funnel_step | by_emotion_curve (跨 stage 不可比)、by_touchpoint (跨通路混淆) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的 session replay / heatmap / 客服電話錄音>

### TODO（缺資料）

- _TODO: 需要 X 份訪談校準 S2 emotion score_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 3, 10, 12，刻意沿用完整版編號）
> - [ ] 至少 5 個 stage（awareness → advocacy）
> - [ ] 每個 stage 含 action + thought + emotion_score（-2~+2）+ touchpoint + pain + opportunity
> - [ ] Emotion 量化（不能只寫「不爽」）
> - [ ] 每個 pain 有 supporting quote
> - [ ] Moment of truth 段已標出哪個 stage 決定 retention vs churn
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（Journey Map 是給人讀的 markdown）
```

```template-full
---
doc_type: "journey-map"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona", "user-research"]
  optional: ["jtbd", "competitive-scan"]
---

# Journey Map: <product-name> · <persona-id>

**Status:** Draft v0.X · **Owner:** <UX name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PM / 客服 / 行銷

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。至少 5 個 stage（awareness → advocacy），happy path 與 error path **必須分開列**。每結論行內 `（依據：interview §XXX / quote: "..." / ticket §YY / NPS §ZZ）`；每量化欄位 `[H/M/L]` badge；**emotion 必須量化**（-2 ~ +2），不能只寫「不爽」；a11y / 多通路訊號必須涵蓋（mobile / desktop / 客服電話 / email），未涵蓋者須說明為何；缺資料 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: UX · required: always -->

<!-- ai-fill: 3-5 行：persona ref、N 個 stage、moment of truth 是哪一段、最痛的 pain 在哪、最大流失點 -->

<3-5 行說明>

> **TL;DR:** <一句話：使用者從 X 到 Y 的旅程，最卡在 stage S2，N% 在此流失>

**Persona refs:** P1 (primary), P2 (secondary)

---

## 2. Happy Path Stages
<!-- owner: UX · required: always -->

<!-- ai-rule: 5-7 個 stage。每個 stage 含 action + thought + emotion_score + touchpoint + pains（含 frequency + severity + quote）+ opportunities -->

### S1 · Awareness

#### Action / Thought / Emotion

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Action** | <使用者做什麼> | **[H]** | interview §3 |
| **Thought** | "<內心 OS>" | **[M]** | quote: "<原句>" — P02 |
| **Emotion score** | **0** (-2 ~ +2) | **[M]** | — |
| **Touchpoint** | web / mobile / email / 客服 / in-person | — | — |

#### Pains

| # | Pain | Severity | Frequency | Supporting quote |
|---|---|---|---|---|
| 1 | <一句話> | minor / major / **blocker** | <X% of users> | "<quote>" — P05 §12 |

#### Opportunities

- <actionable 改善方向 1>
- <actionable 改善方向 2>

### S2 · Consideration

（同上格式）

### S3 · Purchase / Activation

### S4 · Use / Habit

### S5 · Advocacy / Churn

---

## 3. Emotion Curve & Moment of Truth
<!-- owner: UX · required: always -->

<!-- ai-rule: emotion curve 用表格呈現 5+ 個 stage 的分數；moment of truth 必須有 rationale + supporting evidence -->

### Emotion curve

| Stage | S1 | S2 | S3 | S4 | S5 |
|---|---|---|---|---|---|
| **Score** | 0 | **-2** | +1 | +1 | +2 |
| **低點 / 高點** | 平 | 🔻 低 | ↑ | ↑ | 🔺 高 |

### Moment of truth

- **Stage:** S2 — Consideration
- **Rationale:** <為何此 stage 決定 retention vs churn>
- **Supporting evidence:** <NPS §XX / ticket §YY>
- **Confidence:** **[H]**

---

## 4. Error Paths & Recovery
<!-- owner: UX + 客服 · required: full-only -->

<!-- ai-rule: 至少列 2 條 error path（trigger + detour stages + recovery）；不能只畫 happy path 美化圖 -->

### Error path 1

- **Trigger:** <what causes it>
- **Detour:** S2 → S2a_error → S2b_recovery → S3
- **Frequency:** <X% of S2 users>
- **Supporting evidence:** ticket §XX

### Error path 2

（同上格式）

---

## 5. Pain Point Severity Ranking
<!-- owner: PM + UX · required: full-only -->

<!-- ai-rule: 列出 top 5 pain，含 stage / severity / affected % / confidence。affected % 是後續排優先序的關鍵 input -->

| # | Pain | Stage | Severity | Affected % | Confidence |
|---|---|---|---|---|---|
| 1 | <pain 描述> | S2 | **blocker** | 35% | **[H]** |
| 2 | <pain 描述> | S3 | major | 20% | **[M]** |
| 3 | <pain 描述> | S4 | major | 15% | **[M]** |

---

## 6. A11y & 多通路涵蓋
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 必須涵蓋 mobile / desktop / 客服電話 / email 至少 3 個通路；a11y 情境（視障 / 弱網 / 高齡）至少 1 個 stage 標出 -->

| Touchpoint | 涵蓋 stage | A11y 情境 | Confidence |
|---|---|---|---|
| Mobile | S1-S5 | <e.g., 高齡用戶字級需求> | **[M]** |
| Desktop | S2-S4 | — | **[H]** |
| 客服電話 | S2, S4 | <e.g., 語音菜單對視障友好> | **[L]** |
| Email | S1, S5 | — | **[H]** |

---

## 7. Cross-Persona Comparison
<!-- owner: UX · required: full-only · skippable: 單一 persona 時可省略 -->

<!-- ai-rule: 對比 P1 vs P2 在同一 stage 的 emotion / pain 差異，揭露 trade-off -->

| Stage | P1 emotion | P2 emotion | 主要差異 |
|---|---|---|---|
| S2 | -2 | -1 | P1 對複雜度敏感，P2 對價格敏感 |
| S4 | +1 | 0 | P2 黏著度較低 |

---

## 8. Opportunity Prioritization
<!-- owner: PM + UX · required: full-only -->

<!-- ai-rule: 每個 opportunity 必須有 impact / effort 估計；列出至少 3 個並排出優先序 -->

| # | Opportunity | Stage | Impact | Effort | Priority |
|---|---|---|---|---|---|
| 1 | <改善方向> | S2 | high | medium | **P0** |
| 2 | <改善方向> | S3 | medium | low | P1 |
| 3 | <改善方向> | S5 | medium | high | P2 |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <e.g., S4 emotion score 來自 PM 推測非 quote> — **Mitigation:** 補 5 份 retention 訪談 — **Owner:** <name>
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
| YYYY-MM-DD | stage 切法 | by_funnel_step / by_emotion_curve / by_touchpoint | by_funnel_step | by_emotion_curve (跨 stage 不可比)、by_touchpoint (跨通路混淆) | **[H]** |

---

## 11. Out of Scope
<!-- owner: UX · required: full-only -->

本 Journey Map 文件 **不處理**：

- ❌ **不畫 UI mockup** — 屬 UX wireframe / design-system 卡
- ❌ **不寫 API 與後端流程** — 屬 service blueprint backstage / data-model 卡
- ❌ **不算行銷漏斗 CAC / ROAS** — 屬 marketing funnel

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的 session replay / heatmap / 客服電話錄音>

### TODO（缺資料）

- _TODO: 需要 5+ 份 S2 訪談校準 emotion score 與 blocker pain_
- _TODO: 補 P2 cross-persona 對比 evidence_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 至少 5 個 stage（awareness → advocacy）
> - [ ] 每個 stage 含 action + thought + emotion_score + touchpoint + pains（含 frequency + severity + quote）+ opportunities
> - [ ] Emotion 量化（不能只寫「不爽」）
> - [ ] Error path 段至少 2 條（happy path 不能單獨存在）
> - [ ] Pain severity ranking 段含 affected % 欄位
> - [ ] A11y & 多通路段涵蓋 ≥ 3 個通路 + ≥ 1 個 a11y 情境
> - [ ] Moment of truth 段已標出哪個 stage 決定 retention vs churn
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（Journey Map 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Journey Map markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 persona.md / 客服工單摘要 / 使用者訪談摘要 / NPS 評論 / 留存問卷全文）
⏫
```

> [!TIP]
> **常見錯誤：** 只畫 happy path 美化圖（error path 必填）、emotion 寫成「不爽」沒量化（必須 -2~+2）、pain 沒 supporting quote（= 主觀腦補）、忘了標 moment of truth（= 看不出哪段決定生死）、跨通路只列 mobile / desktop 漏掉客服與 email。AI 若漏這些，自檢清單會抓到並回頭補。
