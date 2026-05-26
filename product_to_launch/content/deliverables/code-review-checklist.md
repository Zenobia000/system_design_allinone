---
title: "Code Review Checklist"
slug: "code-review-checklist"
stage: "build"
roles: ["dev"]
order: 33
hook: "把 review 從個人品味變成可重現流程"
when_to_use: "review 品質依賴特定資深人員、或新人 onboarding 多時"
ai_leverage: "用 Claude 跑 first-pass，人類專注 trade-off 與邊界情況"
art: "/generated/stage-build.webp"
source: "software_architect/ppt/05-ilities §Maintainability"
---

## 解決什麼問題

每個 reviewer 看不同的東西，品質起伏大。Checklist 把「最低必看項目」標準化：正確性、安全、可觀測性、可回滾，剩下交給人類判斷。

## 誰負責、和誰對接

- **主責：** Dev Lead 維護
- **協作：** Security、SRE、QA 各補一個維度
- **下游收件：** 全體 Reviewer

## 何時用、何時不用

- ✅ **必要時機：** 中大型團隊、跨團隊 PR、敏感模組
- ❌ **不需要時：** 兩人團隊、強信任實驗專案
- ⚠️ **常見誤用：** 變成形式填表；把 lint 能做的事放進來

## AI 怎麼加速

把 diff + coding standard + 既有 checklist 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己跑 first-pass，**人工只審 must_block 升級與 false positive**。本卡輸出**真實 Code Review Checklist markdown 文件**（含 finding 表、嚴重度分級、checkbox 七象限），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給 solo / 小團隊 / 內部工具 PR 用，**完整範本** 給跨團隊 / 敏感模組 / 合規場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "code-review-checklist"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["git-diff", "coding-standard"]
  optional: ["existing-checklist"]
---

# Code Review Checklist: <PR-or-module-name>

**Status:** Draft v0.X · **Owner:** <Dev Lead name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 5, 9, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每個 finding 行內加 `（依據：diff path:line / standard §X）`；每 finding 帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；輕量版只列 must_block 與 should_fix，nit 可省略。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，reviewer 30 秒看完。內容：總 finding 數、must_block 數、最危險的 1-2 條 -->

<3-5 行說明>

> **TL;DR:** <一句話：這個 PR 該不該擋下、為什麼>

---

## 2. Dimension Coverage

<!-- ai-rule: 7 象限全列，沒 finding 也要寫「已檢視，無 finding」。輕量版可合併 a11y 為 N/A 並寫原因 -->

| Dimension | Status | Finding count | Confidence |
|---|---|---|---|
| Correctness | covered | 2 | **[H]** |
| Readability | covered | 1 | **[H]** |
| Perf | covered | 0 (已檢視) | **[M]** |
| Security | covered | 1 | **[H]** |
| Test | covered | 1 | **[H]** |
| Observability | covered | 0 (已檢視) | **[M]** |
| A11y | N/A (backend-only PR) | 0 | **[H]** |

---

## 5. Findings

<!-- ai-rule: 輕量版只列 must_block + should_fix，nit 省略。每條附 file:line + suggested_fix + source -->

### F-001 · Severity **must_block** · **[H]**

- **File:line:** `<path>:<line>`
- **Dimension:** security
- **Evidence:** `<code snippet 或 standard §X>`
- **Suggested fix:** <一句話>
- **Source:** diff §XX + standard §YY

### F-002 · Severity **should_fix** · **[M]**

- ...

---

## 9. Risks（top 3）

<!-- ai-rule: 只列 top 3，每條含「失效模式 + Mitigation + Owner」三件 -->

> **R1:** <風險描述> — **Mitigation:** <如何降低> — **Owner:** <誰負責>
>
> **R2:** ...
>
> **R3:** ...

---

## 12. Confidence & Sources & TODO

- **整份 checklist 最低 confidence 項：** <列出所有 [L] 與 [M] finding>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <e.g. SLO 監控設定 / production incident 史>

### TODO（缺資料）

- _TODO: 需要 perf benchmark 確認 F-003 是否升級_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 5, 9, 12，刻意不連號）
> - [ ] 每個 finding 帶 inline `[H/M/L]` badge + `file:line` + suggested_fix
> - [ ] Dimension Coverage 7 象限全列，N/A 須寫原因
> - [ ] Findings 至少分 must_block / should_fix 兩級
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（checklist 是給人讀的 markdown）
```

````template-full
---
doc_type: "code-review-checklist"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["git-diff", "coding-standard", "existing-checklist"]
  optional: ["slo-definition", "incident-history"]
---

# Code Review Checklist: <PR-or-module-name>

**Status:** Draft v0.X · **Owner:** <Dev Lead name> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev / Security / SRE / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 GitHub / GitLab / Google Engineering Practices。每 finding 行內 `（依據：diff path:line / standard §X / incident §Y）`；每 finding `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；7 象限（correctness / readability / perf / security / test / observability / a11y）必須全列；must_block 與 nit 必須清楚分級；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: Dev Lead · required: always -->

<!-- ai-fill: 3-5 行，reviewer 30 秒看完。內容：總 finding 數、must_block 數、最危險的 1-2 條、建議 approve/request_changes/block -->

<3-5 行說明>

> **TL;DR:** <一句話：該不該擋、為什麼>

---

## 2. Dimension Coverage
<!-- owner: Dev Lead · required: always -->

<!-- ai-rule: 7 象限全列。任一沒 finding 也要標「已檢視，無 finding」並寫信心 -->

| Dimension | Status | Finding count | Confidence | Notes |
|---|---|---|---|---|
| Correctness | covered | 2 | **[H]** | <備註> |
| Readability | covered | 1 | **[H]** | |
| Perf | covered | 0 (已檢視) | **[M]** | _TODO: 缺 benchmark_ |
| Security | covered | 1 | **[H]** | cc Security |
| Test | covered | 1 | **[H]** | |
| Observability | covered | 0 (已檢視) | **[M]** | |
| A11y | N/A (backend-only) | 0 | **[H]** | rationale |

---

## 3. Severity Levels
<!-- owner: Dev Lead · required: full-only -->

<!-- ai-rule: 3 級分清楚 — must_block / should_fix / nit。每級附定義與例子 -->

| Level | Definition | Examples |
|---|---|---|
| **must_block** | 不修不能 merge | security hole / data loss / breaking API |
| **should_fix** | 強烈建議，PR 內修 | unhandled error / 缺 test / log 缺 trace id |
| **nit** | 建議，作者可拒絕 | 命名 / 微小重構 / 註解 wording |

---

## 4. Must Block vs Nit Policy
<!-- owner: Dev Lead · required: full-only -->

<!-- ai-rule: 必寫升級條件與 nit 上限，避免 review 變吵架 -->

- **Block criteria:** <什麼條件下 should_fix 升級為 must_block，例：影響 ≥ 10% 用戶 + 無 fallback>
- **Nit cap:** <每 PR nit 上限，例：≤ 5 條>
- **Escalation:** <作者拒絕 nit 是否需 Dev Lead 仲裁>

---

## 5. Findings
<!-- owner: All Reviewers · required: always -->

<!-- ai-rule: 每 finding 必含 file:line + dimension + severity + evidence + suggested_fix + source + confidence。 must_block 必須 [H] -->

### F-001 · Severity **must_block** · **[H]**

- **File:line:** `<path>:<line>`
- **Dimension:** security
- **Evidence:** `<code snippet 或 standard §X>`
- **Suggested fix:** <一句話>
- **Source:** diff §XX + standard §YY
- **Notes:** <例：cc Security>

### F-002 · Severity **should_fix** · **[M]**

...

### F-003 · Severity **nit** · **[L]**

...

---

## 6. Reviewer Checklist
<!-- owner: Reviewer · required: always -->

<!-- ai-rule: 7 象限 checkbox 模式 — reviewer 逐項勾選。每項可加 inline 註記 -->

- [ ] **Correctness** — 邏輯與 spec 一致、邊界值處理、無 race condition
- [ ] **Error handling** — 例外有捕捉、錯誤訊息有上下文、無吞錯
- [ ] **Tests added** — 新邏輯有 unit、改動有 integration、無 fake green
- [ ] **Observability** — log/metric/trace 三類齊、含 trace id、無 PII leak
- [ ] **Security** — auth 路徑 / input validation / secret / 新依賴 CVE
- [ ] **Performance** — 無 N+1、無 unbounded loop、無 sync IO 在 hot path
- [ ] **Backward compatibility** — API 無 breaking、DB schema 可 rollback
- [ ] **A11y** （前端 only）— 鍵盤可達、aria 標籤、對比度

---

## 7. SLO for Review Turnaround
<!-- owner: Dev Lead · required: full-only -->

<!-- ai-rule: 兩段時限必填，逾時須升級 -->

| Stage | Target | Confidence |
|---|---|---|
| **First response** | <e.g. 4 working hours> | **[H]** |
| **Full review** | <e.g. 1 working day> | **[H]** |
| **Re-review after changes** | <e.g. 4 working hours> | **[M]** |

---

## 8. Escalation Path
<!-- owner: Dev Lead · required: full-only -->

- **On disagreement:** <作者與 reviewer 不同意時，例：Dev Lead 仲裁>
- **On security finding:** <立即 cc Security team + block merge>
- **On SLO breach:** <逾時升級給 Dev Lead，再逾時升 EM>

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <例：F-001 若 hot fix 不及，500 error rate 將破 SLO> — **Mitigation:** <feature flag rollback> — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：F-003 perf finding 缺 benchmark，是否升級為 should_fix？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: Dev Lead · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | a11y 對 backend PR 處理 | always_block / conditional / drop | conditional | always_block (backend-only PR 浪費時間)、drop (有 mixed PR 漏網) | **[H]** |

---

## 11. Out of Scope
<!-- owner: Dev Lead · required: full-only -->

本 checklist **不處理**：

- ❌ **不重複 linter 已涵蓋項目** — 屬 coding-standard 卡 + CI lint job
- ❌ **不處理 commit message 規範** — 屬 git workflow / conventional commits
- ❌ **不處理 architecture / design review** — 屬 ADR 卡
- ❌ **不處理 release / rollout 策略** — 屬 release-plan 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份 checklist 最低 confidence 項：** <列出所有 [L] 與 [M] finding>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <e.g. production incident 史 / SLO 監控設定 / perf benchmark>

### TODO（缺資料）

- _TODO: 需要 perf benchmark 才能判斷 F-003 是否升級_
- _TODO: 確認 SLO 監控是否覆蓋 F-005 的 detection signal_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 finding 帶 inline `[H/M/L]` badge + `file:line` + suggested_fix
> - [ ] Dimension Coverage 7 象限全列（correctness / readability / perf / security / test / observability / a11y）
> - [ ] Severity Levels 三級定義齊（must_block / should_fix / nit）
> - [ ] must_block 每條 confidence 必為 **[H]**（否則降級或補證據）
> - [ ] Reviewer Checklist 7-8 條 checkbox 全列
> - [ ] SLO for Review Turnaround first_response + full_review 兩段必填
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（checklist 是給人讀的 markdown）
````

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Code Review Checklist markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 git diff 全文 / coding-standard.md / 既有 checklist 版本 / SLO / incident 史）
⏫
```

> [!TIP]
> **常見錯誤：** 把 linter 已抓的事再抄一遍（noise，作者會關掉 review）、must_block 沒寫 confidence 也沒附 file:line（變黑箱、reviewer 無法驗）、a11y 直接砍掉沒寫 rationale（漏前端風險）、把 nit 寫成 must_block（review 變吵架）、缺 escalation path 導致作者與 reviewer 卡死。AI 若漏這些，自檢清單會抓到並回頭補。
