---
title: "JTBD · 任務驅動"
slug: "jtbd"
stage: "discovery"
roles: ["pm", "ux"]
order: 2
hook: "把功能慾望翻成使用者真正想完成的任務"
when_to_use: "團隊在爭論「要做哪個功能」而非「使用者要解什麼問題」時"
ai_leverage: "用 Claude 把 persona + scenario 反推 JTBD statement"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PM 容易陷入「競品有這個功能我們也要做」的反應式思考。
JTBD 強迫團隊回到「使用者僱用這個產品是為了完成什麼任務」，避免功能堆疊但 KPI 不動。
沒有 JTBD，PRD 寫出來通常是 feature list，不是 problem statement。

## 誰負責、和誰對接

- **主責：** PM（最終陳述）
- **協作：** UX（提供研究素材）、PO（驗證與 backlog 對齊）
- **下游收件：** PM 寫 PRD、UX 設計 flow、QA 寫 acceptance

## 何時用、何時不用

- ✅ **必要時機：** 新功能 ideation、團隊在爭論「做不做」、進入新市場
- ❌ **不需要時：** 小修小補、技術債清理、合規限期任務
- ⚠️ **常見誤用：** 寫成「使用者想要更快」這種無 context 廢話；JTBD 必須含情境、動機、預期結果

## AI 怎麼加速

把 persona + 訪談 + 該領域的 frequency 證據（B2B SaaS = 客服工單頻次；消費端 = 問卷/日記研究；電商 = 購物車流失原因）整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 trade-off**。本卡輸出**真實 JTBD markdown 文件**（含表格、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 solo / 早期 ideation / MVP 驗證用，**完整範本**給跨職能團隊 / 大型訪談集 / 進入新市場場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "jtbd"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona", "user-research"]
  optional: ["competitive-scan"]
---

# Jobs To Be Done: <product-name>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段，全部必填。每結論行內加 `（依據：interview §XXX）` 或 `（quote: "..."）` 可追溯；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；JTBD statement **不能寫解法**（不出現「按鈕、頁面、API」這類 how）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行說明：identified N 個 JTBDs、top 痛點主題、最強 evidence 來源 -->

<3-5 行說明>

> **TL;DR:** <一句話：使用者最常僱用這個產品來完成什麼任務>

---

## 2. JTBD Statements

<!-- ai-rule: 3-5 個 JTBD 為宜。每條格式：When <situation>, I want to <motivation>, so I can <expected outcome>。statement 中不能出現「按鈕/頁面/API」這類解法字眼 -->

| ID | Statement | Functional job | Confidence | Source |
|---|---|---|---|---|
| JTBD-001 | When <情境>, I want to <動機>, so I can <預期結果> | <核心功能任務> | **[H]** | interview-04 §3 |
| JTBD-002 | ... | ... | **[M]** | ... |

---

## 5. Current Solution & Success Criteria

<!-- ai-rule: 每個 P0 JTBD 都要列「現在怎麼解 + 為何不夠好 + 成功門檻」三件 -->

### JTBD-001

- **Current solution:** <使用者現在怎麼解這個問題>
- **Gap:** <為何不夠好>
- **Success criteria:** <做到什麼程度算解了>
- **Source:** interview §XX + ticket-keyword §YY

---

## 10. Decision Log

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why |
|---|---|---|---|---|
| YYYY-MM-DD | 5 個 JTBD 用哪個維度排序 | by_frequency / by_pain_severity / by_strategic_fit | by_pain_severity | by_frequency (高頻不等於高痛)、by_strategic_fit (尚無策略明示) |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的訪談 / 觀察 / 競品流失訪談>

### TODO（缺資料）

- _TODO: 需要 X 份 switch interview 校準 emotional_job_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 5, 10, 12，刻意沿用完整版編號）
> - [ ] 每個 JTBD 帶 `[H/M/L]` confidence badge + `（依據：...）` 行內引用
> - [ ] 沒有任何 JTBD statement 出現解法字眼（按鈕 / 頁面 / API / 流程）
> - [ ] Current solution 段每個 JTBD 含 gap + success criteria 三件
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（JTBD 是給人讀的 markdown）
```

```template-full
---
doc_type: "jtbd"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona", "user-research"]
  optional: ["competitive-scan", "switch-interview"]
---

# Jobs To Be Done: <product-name>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD · **Reviewers:** UX / PO / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。最少 5 個 JTBD statement，必須區分 functional / emotional / social 三層（只有 functional 不算完整）。每結論行內 `（依據：interview §XXX / quote: "..."）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；JTBD statement 不能寫解法；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PM · required: always -->

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：identified N JTBDs、top 痛點主題、最強 evidence 來源 -->

<3-5 行說明>

> **TL;DR:** <一句話：使用者最常僱用這個產品來完成什麼任務>

---

## 2. JTBD Statements
<!-- owner: PM · required: always -->

<!-- ai-rule: 5-8 個 JTBD。每條格式：When <situation>, I want to <motivation>, so I can <expected outcome>。Statement 中不能出現解法字眼 -->

| ID | Statement | Confidence | Source |
|---|---|---|---|
| JTBD-001 | When <情境>, I want to <動機>, so I can <預期結果> | **[H]** | interview-04 §3 + ticket-keyword §02 |
| JTBD-002 | ... | **[M]** | ... |

---

## 3. Functional / Emotional / Social Jobs（三層拆解）
<!-- owner: PM + UX · required: always -->

<!-- ai-rule: 每個 JTBD 都要拆出三層；emotional / social 缺失要在 source 寫明「訪談未涵蓋」而非空白 -->

### JTBD-001

| Layer | Description | Confidence | Source |
|---|---|---|---|
| Functional | <做了什麼具體任務> | **[H]** | interview §3 |
| Emotional | <感受層面，例：「感覺掌控全局」> | **[M]** | interview §5 quote |
| Social | <他人觀感層面，例：「主管面前顯得專業」> | **[L]** | _TODO: 訪談未涵蓋_ |

---

## 4. Job Triggers
<!-- owner: PM · required: full-only -->

<!-- ai-rule: 列出觸發此 JTBD 的具體情境（時間/事件/角色），最少 2 個 -->

### JTBD-001 triggers

- <例：「收到老闆 ad-hoc 報告請求」>
- <例：「週一例會前 30 分鐘」>

---

## 5. Current Solution & Gap & Success Criteria
<!-- owner: PM · required: always -->

<!-- ai-rule: 每個 P0 JTBD 都要列「現在怎麼解 + 為何不夠好 + 做到什麼算解了」三件 -->

### JTBD-001

- **Current solution:** <使用者現在怎麼解>
- **Gap:** <為何不夠好>
- **Success criteria:**
  - <例：「≤ 3 分鐘完成」>
  - <例：「不需切換 3 個工具」>
- **Source:** interview §XX

---

## 6. Struggling Moments
<!-- owner: PM + UX · required: full-only -->

<!-- ai-rule: 引用訪談原句作為 evidence；moment 描述要具體到時間/動作，不抽象 -->

| JTBD | Moment | Supporting quote |
|---|---|---|
| JTBD-001 | <具體掙扎場景> | "<訪談原句>" — P02 §15 |

---

## 7. Opportunity Size
<!-- owner: PM · required: full-only -->

| JTBD | Frequency per user per week | Affected personas | Confidence |
|---|---|---|---|
| JTBD-001 | <例：3-5 次> | P1, P2 | **[M]** |

---

## 8. Mutually Exclusive Jobs
<!-- owner: PM · required: full-only · skippable: 若無明顯互斥則寫「無明顯互斥」 -->

<!-- ai-rule: 列出 trade-off — 解 A 會犧牲 B 的情境，這是後續 PRD 排優先級的關鍵輸入 -->

| Pair | Trade-off | Affected persona group |
|---|---|---|
| JTBD-001 ↔ JTBD-003 | 解 -001（快） vs -003（準）會二擇一 | <P 群描述> |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <風險：例：JTBD-002 evidence 過弱，可能是 PM 推測而非真實需求> — **Mitigation:** 補 5+ 份 switch interview — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：JTBD-004 的 social_job 是真的還是 fabricated？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: PM · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 5 個 JTBD 用哪個維度排序 | by_frequency / by_pain_severity / by_strategic_fit | by_pain_severity | by_frequency (高頻不等於高痛)、by_strategic_fit (尚無策略明示) | **[H]** |

---

## 11. Out of Scope
<!-- owner: PM · required: full-only -->

本 JTBD 文件 **不處理**：

- ❌ **不排功能優先序** — 屬 PO backlog / priority-matrix 卡
- ❌ **不寫實作方式** — 屬 PRD / ADR 卡
- ❌ **不定義 KPI 公式** — 屬 north-star / okr 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的訪談類型：switch interview / 競品流失訪談 / 觀察日誌>

### TODO（缺資料）

- _TODO: 需要 8+ 份 switch interview 校準 emotional_job 三層拆解_
- _TODO: 補 P3 persona 的 opportunity_size frequency_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 至少 5 個 JTBD statement，每個帶 `[H/M/L]` badge + 行內 `（依據：...）`
> - [ ] 每個 JTBD 都區分 functional / emotional / social 三層（缺失須在 source 寫明訪談未涵蓋）
> - [ ] Struggling moments 段每條附訪談原句作為 evidence
> - [ ] Mutually Exclusive Jobs 段已列 trade-off 或寫「無明顯互斥」
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 沒有任何 JTBD statement 出現解法字眼（按鈕 / 頁面 / API / 流程）
> - [ ] 無 YAML / JSON schema 輸出（JTBD 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 JTBD markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 persona.md / 訪談逐字稿摘要 / 該領域的 frequency 證據全文 — B2B SaaS：客服工單；消費端：問卷或日記研究；電商：購物車流失原因）
⏫
```

> [!TIP]
> **常見錯誤：** JTBD statement 寫成解法（「使用者想要一個按鈕」= 錯）、只列 functional 沒拆 emotional / social、把高頻誤判成高痛、忘了標誰是 source（變黑箱）、Mutually Exclusive Jobs 段假裝沒 trade-off。AI 若漏這些，自檢清單會抓到並回頭補。
