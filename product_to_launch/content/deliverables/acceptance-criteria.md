---
title: "Acceptance Criteria · 驗收條件"
slug: "acceptance-criteria"
stage: "define"
roles: ["po", "qa"]
order: 12
hook: "讓「做完了」這句話有客觀證據"
when_to_use: "每個 user story 進 sprint 前必備"
ai_leverage: "用 Claude 從 user story → Given/When/Then 驗收 + edge case"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色 / §SOP與檢核表"
---

## 解決什麼問題

PO 說「做完了嗎？」工程師說「應該吧」、QA 說「我再測一下」、PM 說「跟我想的不一樣」。
這種對話每次發生，sprint 就燒掉半天。
Acceptance Criteria 是**story 進 sprint 前就寫好的客觀驗收條件**，誰看都一樣，不靠主觀感受。

## 誰負責、和誰對接

- **主責：** PO（最終接受度）/ QA（驗收執行）
- **協作：** BA（補規則）、Dev（驗證可實作）、UX（驗證互動完整）
- **下游收件：** Dev 自測、QA 寫 test case、Sprint review 驗收

## 何時用、何時不用

- ✅ **必要時機：** 每個 user story、每個 epic gate review
- ❌ **不需要時：** 純技術 spike、文件整理任務、緊急 hotfix（事後補）
- ⚠️ **常見誤用：** 寫成「使用者應該覺得很順」這種主觀句；必須是 **Given/When/Then 可機械驗證**，含 happy path + 至少 2 個 edge case

## AI 怎麼加速

把 user story + PRD section + NFR 規格整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 trade-off**。本卡輸出**真實 acceptance criteria markdown 文件**（含表格、Given/When/Then 區塊、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 solo / single story / MVP sprint 用，**完整範本**給跨職能團隊 / 合規場景 / 含 NFR & security 的 production story 用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "acceptance-criteria"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["user-story", "prd"]
  optional: ["test-data-fixtures"]
---

# Acceptance Criteria: <story-or-feature-name>

**Status:** Draft v0.X · **Owner:** <PO / QA name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 4, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每條 AC 必須 Given/When/Then 三段，**禁主觀字眼**（順、好用、合理）；每條附 `（依據：story §X / PRD §Y）` 行內引用 + `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，列出 happy path 數 / edge case 數 / 涵蓋的 NFR 象限 / 最弱 confidence 項 -->

<3-5 行說明>

> **TL;DR:** <一句話：這個 story 做到什麼程度算 done>

---

## 2. Acceptance Criteria

<!-- ai-rule: 輕量版 ≥ 2 條 happy + ≥ 1 條 edge + ≥ 1 條 error。每條 Given/When/Then，無主觀字眼，可被自動化測試碼直接消費 -->

### AC-1 · Happy path · **[H]**

- **Given:** <初始狀態 + 資料 + 環境>
- **When:** <使用者動作 + 輸入>
- **Then:** <可驗證的結果 + 資料變化 + 副作用>
- **Source:** story §X.action

### AC-2 · Edge case (<empty / oversize / concurrency / perm-denied / 任選一類>) · **[H]**

- **Given:** ...
- **When:** ...
- **Then:** ...
- **Source:** PRD §NFR

### AC-3 · Error path · **[M]**

- **Given:** ...
- **When:** ...
- **Then:** <顯示 error code XXX + log level + retry policy>
- **Source:** ...

---

## 4. NFR Constraints（最小集）

<!-- ai-rule: 輕量版至少 1 個 performance + 1 個 security/audit，無關象限可省略 -->

| Dimension | Threshold | How to verify | Confidence |
|---|---|---|---|
| **Latency** | p95 < Xms at <量測點> | k6 load test | **[H]** |
| **<critical 2nd>** | <target> | <how> | **[M]** |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why |
|---|---|---|---|---|
| YYYY-MM-DD | <例：edge case A 拆兩條還是合併> | split / merge | split | merge (失敗訊息不同，QA 難寫 assertion) |

---

## 12. Confidence & Sources & TODO

- **最低 confidence 項：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1，例：既有 mock 可用、第三方 sandbox 穩定>
- **Highest-value next input:** <NFR 數字 / 合規條款全文 / 既有 mock 清單 三選一>

### TODO（缺資料）

- _TODO: 需要 XXX 校準 p95 threshold_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 4, 10, 12，刻意不連號）
> - [ ] ≥ 2 條 happy + ≥ 1 條 edge + ≥ 1 條 error path
> - [ ] 每條 AC 含 Given/When/Then 三段且無主觀字眼（順、好用、合理）
> - [ ] 每條 AC 帶 `[H/M/L]` badge + `（依據：...）` 行內引用
> - [ ] NFR 段至少 1 個 latency + 1 個 security/audit 象限
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（AC 是給人 + 機器讀的 markdown）
```

```template-full
---
doc_type: "acceptance-criteria"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["user-story", "prd", "nfr"]
  optional: ["compliance-clauses", "test-data-fixtures", "third-party-sandbox-list"]
---

# Acceptance Criteria: <story-or-feature-name>

**Status:** Draft v0.X · **Owner:** <QA lead name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PO / Dev / QA / Audit

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。AC 必須機械可驗證、可被自動化測試碼直接消費——禁主觀字眼（順、好用、合理）。每條附 `（依據：story §X / PRD §Y / 合規條款 §Z）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；NFR 四象限齊全（performance / a11y / security / audit）；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: QA · required: always -->

<!-- ai-fill: 3-5 行：covered AC 數 / happy : edge : error 比例 / NFR 象限齊全度 / 第三方依賴清單 -->

<3-5 行說明>

> **TL;DR:** <一句話：這個 story 做到什麼程度算 done，誰判定>

---

## 2. Happy Path Criteria
<!-- owner: QA + PO · required: always -->

<!-- ai-rule: ≥ 2 條 happy path。每條 Given/When/Then，無主觀字眼，含 mockable + 第三方依賴標記 -->

### AC-1 · **P0** · **[H]**

- **Given:** <初始狀態 + 資料 + 環境>
- **When:** <使用者動作 + 輸入>
- **Then:** <可驗證的結果 + 資料變化 + 副作用>
- **Mockable:** yes / no
- **Third-party deps:** <API / sandbox 名稱，或「無」>
- **Source:** story §X.benefit + PRD §FR-1

### AC-2 · **P0** · **[H]**

...

---

## 3. Edge Case Criteria
<!-- owner: QA · required: always -->

<!-- ai-rule: ≥ 3 條 edge case，必須涵蓋以下 6 類至少 3 類：empty / oversize / concurrency / perm-denied / network-failure / third-party-timeout -->

### AC-E1 · Category: <empty / oversize / ...> · **[H]**

- **Given:** ...
- **When:** ...
- **Then:** ...
- **Source:** ...

### AC-E2 · Category: <…> · **[M]**

...

### AC-E3 · Category: <…> · **[M]**

...

| Category covered | AC IDs |
|---|---|
| empty | AC-E1 |
| oversize | AC-E2 |
| concurrency | AC-E3 |
| perm-denied | _TODO_ |

---

## 4. Error Handling
<!-- owner: QA + Dev · required: always -->

<!-- ai-rule: 每個 error path 必含 error_code / user_message (i18n key) / log_level / retry_policy 四件 -->

| Trigger | Error code | User message (i18n) | Log level | Retry policy | Source |
|---|---|---|---|---|---|
| <例：input 無效 email> | VAL-001 | `err.email.invalid` | warn | none | PRD §FR-2 |
| <例：上游 timeout> | UP-002 | `err.upstream.unavailable` | error | exponential_backoff (3x) | PRD §integration |

---

## 5. Performance NFR
<!-- owner: QA + Architect · required: always -->

<!-- ai-rule: latency 必填，throughput 可選；每項註明量測點 + 量測工具 -->

| Metric | Threshold | Measurement point | Tool | Confidence |
|---|---|---|---|---|
| **p50 latency** | < Xms | <例：API gateway → response> | k6 | **[H]** |
| **p95 latency** | < Yms | 同上 | k6 | **[H]** |
| **Throughput** | ≥ Z rps | <負載點> | k6 | **[M]** |

---

## 6. A11y NFR
<!-- owner: UX + QA · required: full-only · skippable: 無 UI 元件時寫「不適用：純後端 API」 -->

| Check | Standard | Tool | Confidence |
|---|---|---|---|
| WCAG 2.2 AA | <對應條款> | axe-core / Lighthouse | **[H]** |
| Keyboard nav | tab order 完整 | manual | **[H]** |
| Screen reader | NVDA + VoiceOver pass | manual | **[M]** |

---

## 7. Security NFR
<!-- owner: Security + QA · required: always -->

<!-- ai-rule: 必含 input 驗證 / authZ rules / data classification 三件，缺任一視為 fail -->

| Concern | Rule | How to verify | Confidence |
|---|---|---|---|
| Input validation | <例：email 正規 + length ≤ 254> | unit test | **[H]** |
| AuthZ | <who can do what，例：only owner & admin> | integration test | **[H]** |
| Data classification | <public / internal / confidential / restricted> | code review + lint | **[H]** |
| OWASP top 10 | <相關項目，例：A03 injection> | sast scan | **[M]** |

---

## 8. Audit & Compliance
<!-- owner: QA + Audit · required: always -->

<!-- ai-rule: 合規欄位必標依據（GDPR Art X / SOC 2 CC Y / 金管會函釋 Z）+ 保留期 -->

| Audit field | What to log | Retention | Compliance basis |
|---|---|---|---|
| <例：user_id + action + ts> | <log 內容> | 1 year | GDPR Art 30 |
| ... | ... | 7 years | SOC 2 CC7.2 |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：第三方 sandbox 不穩定可能 false-fail edge AC-E3> — **Mitigation:** mock + 真機切換 flag — **Owner:** QA lead
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：error 路徑的 user message i18n 待 UX 文案>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: QA · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <例：edge case 拆兩條或合併> | split / merge / 只測 happy | split | merge (assertion 寫不出來)、only-happy (漏 SOC 2 控制) | **[H]** |

---

## 11. Out of Scope
<!-- owner: QA + PO · required: full-only -->

本 acceptance criteria **不處理**：

- ❌ **跨 story 整合測試** — 屬 e2e suite plan
- ❌ **效能壓測完整 plan** — 屬 perf budget 卡
- ❌ **安全滲透測試** — 屬 security review
- ❌ **UAT 使用者驗收劇本** — 屬 UAT plan 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1，例：既有 mock 可用>
  - <假設 2，例：第三方 sandbox SLA 99.9%>
- **Highest-value next input:** <NFR 數字 / 合規條款全文 / 既有 mock 清單>

### TODO（缺資料）

- _TODO: 需要 NFR p95 baseline 校準 perf threshold_
- _TODO: 需要 i18n 文案 key 對齊 UX_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] ≥ 2 條 happy + ≥ 3 條 edge + ≥ 2 條 error path
> - [ ] 每條 AC 含 Given/When/Then 三段、無主觀字眼、可機械驗證
> - [ ] 每條 AC 帶 `[H/M/L]` badge + `（依據：...）` 行內引用
> - [ ] Edge case 涵蓋 6 類至少 3 類（empty / oversize / concurrency / perm-denied / network-failure / third-party-timeout）
> - [ ] Error handling 每條含 error_code / user_message / log_level / retry_policy 四件
> - [ ] NFR 四象限齊全（performance / a11y / security / audit），不適用要寫明
> - [ ] 合規欄位標依據 + 保留期
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（AC 是給人 + 機器讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 acceptance criteria markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 user-story.md / prd.md（含 NFR 段）/ 合規條款摘要 / 既有 mock 清單 全文）
⏫
```

> [!TIP]
> **常見錯誤：** AC 用主觀字眼（「順、好用、合理」= 直接 reject）、edge case 湊數但不真實可觸發、error path 漏 error_code 或 retry policy、a11y / audit 象限被砍掉沒寫 Rationale、合規 retention 沒標法規依據。AI 若漏這些，自檢清單會抓到並回頭補。
