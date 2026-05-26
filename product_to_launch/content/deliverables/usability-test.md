---
title: "可用性測試"
slug: "usability-test"
stage: "design"
roles: ["ux"]
order: 22
hook: "上線前抓出「使用者真的會卡」的點"
when_to_use: "新功能首版、改版重大互動、高風險 flow 簽核前"
ai_leverage: "用 Claude 把測試錄影逐字稿 → finding 報告 + 優先級"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PM、UX、Dev 自己測得很順，是因為他們知道流程。真實使用者第一次看，常常卡在「找不到按鈕」「不懂這欄要填什麼」。
可用性測試是**上線前最便宜的 bug 攔截網**：5 個使用者通常能抓出 80% 的可用性問題。
不做 usability test，bug 會延到上線後抓，成本高 10 倍。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（驗證商業優先序）、UI（補設計修正）、PO（決定是否延期上線）
- **下游收件：** UI 修 mockup、PM 調整 scope、Dev 補 edge case

## 何時用、何時不用

- ✅ **必要時機：** 新功能首版、改版核心 flow、高風險互動（金流/註冊）
- ❌ **不需要時：** Bug fix、micro-interaction 調整、內部工具僅自己用
- ⚠️ **常見誤用：** 找錯使用者（同事、家人）、引導性提問（「這裡是不是很簡單？」）；NN/g 建議 **5 個目標使用者 / round** 是最低成本最高效率

## AI 怎麼加速

把 5 份測試逐字稿 + 任務清單整份丟給 agent，讓 agent 讀範本內 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審嚴重度判斷與修正方向取捨**。本卡輸出**真實 usability test report markdown**（含 findings 表 + severity rating + WCAG criterion 引用 + inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份 report 契約的兩種版本：**輕量範本** 給 5 受測者 / 單一 flow / RITE 快速迭代用，**完整範本** 給多 round、跨 segment、a11y audit 整合、PO 簽核情境用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "usability-test"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["test-transcripts", "task-list"]
  optional: ["prototype", "production-snapshot"]
---

# Usability Test Report: <product-name>

**Status:** Draft v0.X · **Owner:** <UX name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 5, 6, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。Severity 只用 critical / major / minor 三級；命中率 ≥ 3/5 才能標 H + critical；n=1 必標 L + minor；每 finding 行內 `（依據：逐字稿 P3 03:20 / quote: "..."）`；缺資料寫 `_TODO_` 不編造 quote；a11y 相關 finding 必須標 wcag_criterion（如 2.4.7 Focus Visible）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：受測 N 人、發現 N 個 finding（critical / major / minor 分布）、最大系統性問題 -->

<3-5 行說明>

> **TL;DR:** <一句話：是否建議上線 / 需延後 / 需另一輪測試>

---

## 2. Tasks & Completion Rate

<!-- ai-rule: 每任務含 scenario + success criteria + completion rate (X/5) -->

| ID | Scenario | Time max | Clicks max | Errors max | Completion | Source |
|---|---|---|---|---|---|---|
| T1 | <情境> | 60s | 4 | 1 | 3/5 | 逐字稿 §all |
| T2 | <情境> | 90s | 6 | 1 | 5/5 | 逐字稿 §all |

---

## 5. Findings

<!-- ai-rule: 每 finding 含 severity + hit_rate + quote + source + wcag_criterion (若 a11y); n=1 必標 minor + L -->

### F1: <一句話描述>

- **Severity:** **critical**
- **Hit rate:** 4/5
- **Description:** <現象描述>
- **Quote:** 「<受測者原話>」 — P02 §03:20
- **WCAG criterion:** 2.4.7 Focus Visible（若 a11y 相關）
- **Confidence:** **[H]** — **Source:** 逐字稿 P02, P03, P04, P05

### F2 · F3 · ...

---

## 6. Recommendations

<!-- ai-rule: 每條對應 1 個 finding；含 fix + effort (S/M/L) + expected impact + trade-off -->

| Finding | Fix | Effort | Expected impact | Trade-off |
|---|---|---|---|---|
| F1 | 加 inline error 顯示 | S (1d) | 完成率 3/5 → 5/5 | 視覺密度增加 |
| F2 | 重排 nav 順序 | M (1w) | 找到時間 ↓ 40% | 既有用戶需重新學習 |

---

## 10. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | F1 上線前修還是延後 | fix_before / delay / ship_with_warning | fix_before | delay (OKR Q3 衝擊)、warning (使用者已會卡) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions：**
  - <例：假設 5 名受測者代表目標 segment>
- **Highest-value next input:** <例：第 6 名受測者 / 量化埋點驗證 hit rate>

### TODO（缺資料）

- _TODO: 補 F2 的 WCAG criterion 對照_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 5, 6, 10, 12）
> - [ ] 每 finding 有 severity + hit rate + quote + source
> - [ ] n=1 finding **沒有**標成 critical（必為 minor + L）
> - [ ] a11y 相關 finding 都有 WCAG criterion
> - [ ] Recommendations 對應每個 critical finding
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（report 是給人讀的 markdown）
```

```template-full
---
doc_type: "usability-test"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["test-transcripts", "task-list", "participant-profile"]
  optional: ["prototype", "production-snapshot", "a11y-audit"]
---

# Usability Test Report: <product-name>

**Status:** Draft v0.X · **Owner:** <UX name> · **Last updated:** YYYY-MM-DD · **Reviewers:** UI / PM / PO / Dev

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 Nielsen heuristics / WCAG 2.2 a11y audit。Severity 只用 critical / major / minor 三級；**命中率 ≥ 3/5 才能標 H + critical**；n=1 必標 L + minor；嚴格區分「個別使用者問題（noise, n=1）」與「系統性問題（signal, n ≥ 3/5）」；每 finding 行內 `（依據：逐字稿 P3 03:20 / quote: "..."）`；缺資料 `_TODO_` 不編造 quote；a11y barrier 必須額外標 wcag_criterion；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: UX · required: always -->

<!-- ai-fill: 3-5 行：受測 N 人、發現 N 個 finding（critical / major / minor 分布）、最大系統性問題、建議行動 -->

<3-5 行說明>

> **TL;DR:** <一句話：是否建議上線 / 需延後 / 需另一輪測試>

---

## 2. Research Question & Tasks
<!-- owner: UX · required: always -->

### Research question

- **Primary:** <一句話研究問題>
- **Secondary:** <次要問題>

### Tasks

<!-- ai-rule: 每任務含 scenario + success criteria + completion rate -->

| ID | Scenario | Time max | Clicks max | Errors max | Completion | Avg time | Source |
|---|---|---|---|---|---|---|---|
| T1 | <情境> | 60s | 4 | 1 | 3/5 | 78s | 逐字稿 §all |
| T2 | <情境> | 90s | 6 | 1 | 5/5 | 65s | 逐字稿 §all |

---

## 3. Participant Profile
<!-- owner: UX · required: full-only -->

- **n:** 5（NN/g 建議）
- **Segment:** <目標使用者描述>
- **Recruit criteria:** <篩選條件>
- **Excluded:** <排除誰、為何>

### Demographics summary

| ID | Age range | Experience level | Device | Notes |
|---|---|---|---|---|
| P01 | 25-34 | 進階 | iPhone 14 | <備註> |
| P02 | 35-44 | 初階 | Android | <備註> |

---

## 4. Method
<!-- owner: UX · required: full-only -->

- **Type:** moderated / unmoderated / think-aloud / RITE — **Chosen:** moderated think-aloud
- **Duration per session:** 45 分鐘
- **Device tested:** mobile iOS / Android / desktop
- **Tooling:** Figma prototype / Maze / Lookback
- **Date range:** YYYY-MM-DD ~ YYYY-MM-DD

---

## 5. Findings
<!-- owner: UX · required: always -->

<!-- ai-rule: 每 finding 含 severity + hit_rate + quote + source + wcag_criterion (若 a11y); n=1 必標 minor + L; 命中率 ≥ 3/5 才能標 critical -->

### F1: <一句話描述>

- **Severity:** **critical**
- **Hit rate:** 4/5（系統性問題）
- **Description:** <現象描述>
- **Quotes:**
  - 「<受測者原話 1>」 — P02 §03:20
  - 「<受測者原話 2>」 — P04 §05:10
- **Screenshot ref:** <逐字稿時間戳或檔名>
- **WCAG criterion:** 2.4.7 Focus Visible（若 a11y 相關）
- **Heuristic:** Nielsen #5 Error prevention
- **Confidence:** **[H]** — **Source:** 逐字稿 P02, P03, P04, P05

### F2 · F3 · F4 · ...

---

## 6. Recommendations
<!-- owner: UX + UI · required: always -->

<!-- ai-rule: 每條對應 1 個 finding；含 fix + effort (S/M/L) + expected impact + trade-off -->

| Finding | Fix | Effort | Expected impact | Trade-off |
|---|---|---|---|---|
| F1 | 加 inline error 顯示 | S (1d) | 完成率 3/5 → 5/5 | 視覺密度增加 |
| F2 | 重排 nav 順序 | M (1w) | 找到時間 ↓ 40% | 既有用戶需重新學習 |
| F3 | 重做 onboarding | L (2w+) | 新手完成率 ↑ 60% | 延上線 2 週、影響 OKR Q3 |

---

## 7. A11y Findings Summary
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 將所有涉及 a11y 的 finding 集中對照 WCAG 2.2 criterion -->

| Finding | WCAG criterion | Level | Severity |
|---|---|---|---|
| F1 | 2.4.7 Focus Visible | AA | critical |
| F4 | 1.4.3 Contrast Minimum | AA | major |

---

## 8. Noise vs Signal
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 嚴格區分「n=1 個別使用者問題」與「n ≥ 3/5 系統性問題」 -->

### Signal (system-level, n ≥ 3/5)

- **F1, F2:** 多人命中 → 上線前必修

### Noise (individual, n=1)

- **F5:** P03 個案，可能與其 domain 經驗有關 — 標 minor + L，先觀察

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：F3 修正需重做 onboarding，延上線 2 週影響 OKR Q3> — **Mitigation:** 拆 phased rollout — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：F5 是否單一案例還是新手通病？需第 6 名受測者驗證>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: UX + PM · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | F1 上線前修還是延後 | fix_before / delay_launch / ship_with_warning | fix_before | delay (OKR Q3 衝擊)、warning (使用者已會卡) | **[H]** |

---

## 11. Out of Scope
<!-- owner: UX · required: full-only -->

本 usability test report **不處理**：

- ❌ **不做 A/B test 量化驗證** — 樣本太小（n=5）
- ❌ **不做品牌偏好 / desirability 研究** — 屬獨立 brand research
- ❌ **不做技術可行性評估** — 屬 Dev / Architect
- ❌ **不做業務 KPI 預測** — 屬 PM 數據分析

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions：**
  - <例：假設 5 名受測者代表目標 segment>
  - <例：假設嚴重度判斷主觀部分對齊 Nielsen heuristics>
- **Highest-value next input:** <第 6 名受測者 / 量化埋點驗證 hit rate / a11y full audit>

### TODO（缺資料）

- _TODO: 補 F2 的 WCAG criterion 對照_
- _TODO: 第 6 名受測者驗證 F5 是否為系統性問題_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每 finding 有 severity + hit rate + quote (≥ 1) + source
> - [ ] **n=1 finding 沒被標成 critical**（必為 minor + L）
> - [ ] 命中率 ≥ 3/5 才標 H + critical
> - [ ] a11y barrier 都對應 WCAG criterion + 集中到第 7 段
> - [ ] Noise vs Signal 段有明確區分
> - [ ] Recommendations 對應每個 critical / major finding
> - [ ] Decision Log 每條 ≥ 2 個 rejected + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（report 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 usability test report markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 5 份逐字稿 / 任務清單 + 成功定義 / 參與者 profile / 受測 prototype 或上線版本資訊 全文）
⏫
```

> [!TIP]
> **常見錯誤：** n=1 的個案被標成 critical（誇大）、忘了區分 noise vs signal（把個別使用者當系統性問題）、a11y finding 沒對應 WCAG criterion（修了也不知道過 audit 沒）、編造未發生的 quote、Decision Log 沒寫 delay / ship_with_warning 為何被拒（= 黑箱）、用同事或家人當受測者（不算目標 segment）。AI 若漏這些，自檢清單會抓到並回頭補。
