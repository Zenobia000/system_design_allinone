---
title: "Coding Standard · 編碼規範"
slug: "coding-standard"
stage: "build"
roles: ["dev"]
order: 31
hook: "把 review 時的口水戰提前壓縮成 linter 設定"
when_to_use: "團隊 ≥ 3 人或新語言/新框架導入時"
ai_leverage: "用 Claude 對範例 PR 抽出實際違規模式，補進規範"
art: "/generated/stage-build.webp"
source: "software_architect/ppt/05-ilities §Maintainability"
---

## 解決什麼問題

人類記不住 50 條規則。Coding Standard 的價值在於決定「哪些靠工具自動擋、哪些靠 review、哪些只是建議」，不是一份漂亮 PDF。

## 誰負責、和誰對接

- **主責：** Dev Lead 或 staff engineer
- **協作：** 全體 Dev 投票、Architect 確認可演進
- **下游收件：** CI lint job、PR Template、Code Review Checklist

## 何時用、何時不用

- ✅ **必要時機：** 新專案、新語言、團隊擴編、跨服務統一基線
- ❌ **不需要時：** 個人專案、一次性 PoC
- ⚠️ **常見誤用：** 200 條規則無工具支撐；只規定縮排卻不規定錯誤處理

## AI 怎麼加速

把 PR comment 樣本 + 既有 lint 設定 + 語言基線整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己抽 pattern，**人工只審 trade-off 與 enforcement 落點**。本卡輸出**真實 Coding Standard markdown 文件**（含 rule 表、good/bad 對照、enforcement 分層），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給新專案 / 早期團隊 / 單語言場景用，**完整範本** 給跨服務統一基線 / 合規 / 多框架場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

````template-light
---
doc_type: "coding-standard"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["pr-comment-samples", "linter-config"]
  optional: ["existing-style-guide"]
---

# Coding Standard: <language-and-framework>

**Status:** Draft v0.X · **Owner:** <Dev Lead name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每條規則行內加 `（依據：PR comment §X / lint rule id）`；每條規則帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；輕量版規則上限 **15 條**（超過代表沒取捨）；無法被 linter 偵測且嚴重度 < high 的不入規範。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，新人 30 秒讀完。內容：本 standard 涵蓋什麼語言+框架、共 N 條規則、最常違反的 top 3 -->

<3-5 行說明>

> **TL;DR:** <一句話：這份 standard 解決什麼具體的 review 口水戰>

---

## 2. Language Scope

<!-- ai-rule: 必含語言版本 + 主要框架。版本太舊（>2 年）要在 confidence 標 L 並列升級風險 -->

| Item | Value | Confidence |
|---|---|---|
| Language | <e.g. TypeScript 5.4> | **[H]** |
| Frameworks | <e.g. React 18, Next.js 14> | **[H]** |
| Linter | <e.g. ESLint 9 + typescript-eslint> | **[H]** |
| Formatter | <e.g. Prettier 3> | **[H]** |

---

## 3. Rules（top 10-15）

<!-- ai-rule: 每條規則必含 good/bad 對照 + linter rule id（或 TODO 找對應）+ enforcement 層級。Severity 三級：error / warning / info -->

### CS-001 · Severity **error** · Enforcement **lint** · **[H]**

- **Rule:** <一句話描述>
- **Rationale:** <為何重要 + 從哪個 PR comment 歸納>
- **Linter rule id:** `@typescript-eslint/no-explicit-any`
- **Source:** PR comment §XX (出現 8 次)

**Good:**
```ts
function fetch<T>(url: string): Promise<T> { ... }
```

**Bad:**
```ts
function fetch(url: any): any { ... }
```

### CS-002 · Severity **warning** · Enforcement **pre-commit** · **[M]**

...

---

## 5. Enforcement Matrix

<!-- ai-rule: 每條規則都要有 enforcement 落點 — lint / pre-commit / review / doc-only 之一，無落點視為純廢話 -->

| Layer | Tool | Fail policy | Notes |
|---|---|---|---|
| **CI lint** | <ESLint job name> | fail on error | block merge |
| **Pre-commit** | husky / lefthook | fail on error | local-only |
| **Review** | code-review-checklist | reviewer 判斷 | nit 可拒絕 |
| **Doc-only** | this file | reviewer 引用 | 無自動擋 |

---

## 10. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Formatter 選擇 | Prettier / Biome | Prettier | Biome 工具鏈太新、IDE 整合不足 | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份 standard 最低 confidence 規則：** <列出所有 [L] 與 [M] 規則>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的 PR comment 主題 / production incident 史>

### TODO（缺資料）

- _TODO: 需要 CS-007 對應 linter rule id_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 10, 12，刻意不連號）
> - [ ] 規則數量 ≤ 15（超過代表沒取捨）
> - [ ] 每條規則帶 inline `[H/M/L]` badge + good/bad 對照 + linter rule id
> - [ ] 每條規則有 enforcement 層級（不是純文件建議）
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（standard 是給人讀的 markdown）
````

````template-full
---
doc_type: "coding-standard"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["pr-comment-samples", "linter-config", "language-version"]
  optional: ["existing-style-guide", "incident-postmortem"]
---

# Coding Standard: <language-and-framework>

**Status:** Draft v0.X · **Owner:** <Dev Lead name> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev / Security / Architect

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 Google / Airbnb / Microsoft Style Guide。每條規則行內 `（依據：PR comment §X / lint rule id / incident §Y）`；每規則 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；規則上限 **30 條**（超過代表沒取捨）；無法被 linter 偵測且嚴重度 < high 的不入規範；每條規則必須涵蓋 maintainability / security / observability 至少一象限；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: Dev Lead · required: always -->

<!-- ai-fill: 3-5 行，新人 30 秒讀完。內容：涵蓋的語言+框架、規則數、最高頻違規 top 3、enforcement 層級分佈 -->

<3-5 行說明>

> **TL;DR:** <一句話：解決什麼具體 review 口水戰>

---

## 2. Language Scope
<!-- owner: Dev Lead · required: always -->

| Item | Value | Confidence |
|---|---|---|
| Language | <e.g. TypeScript 5.4> | **[H]** |
| Frameworks | <e.g. React 18, Next.js 14> | **[H]** |
| Linter | <e.g. ESLint 9 + typescript-eslint> | **[H]** |
| Formatter | <e.g. Prettier 3> | **[H]** |
| Test framework | <e.g. Vitest> | **[H]** |

---

## 3. Rules（max 30）
<!-- owner: Dev Lead + Security · required: always -->

<!-- ai-rule: 每條必含 good/bad 對照 + linter rule id + enforcement + dimension (maintainability/security/observability)。Severity: error / warning / info -->

### CS-001 · Severity **error** · Enforcement **lint** · Dimension **security** · **[H]**

- **Rule:** <一句話描述>
- **Rationale:** <為何重要 + 從哪個 PR comment / incident 歸納>
- **Linter rule id:** `@typescript-eslint/no-explicit-any`
- **Source:** PR comment §XX (8 次) + incident §YY

**Good:**
```ts
function fetch<T>(url: string): Promise<T> { ... }
```

**Bad:**
```ts
function fetch(url: any): any { ... }
```

### CS-002 · Severity **warning** · Enforcement **pre-commit** · Dimension **maintainability** · **[M]**

...

---

## 4. Linter Config Reference
<!-- owner: Dev Lead · required: full-only -->

<!-- ai-rule: 必列實際檔名 + CI job + fail_on policy。檔名缺失要 TODO -->

| Item | Value |
|---|---|
| Config file | `.eslintrc.json` / `pyproject.toml` / `.golangci.yml` |
| CI job | <job name> |
| Fail on | error |
| Pre-commit hook | husky / lefthook |

---

## 5. Enforcement Matrix
<!-- owner: Dev Lead + DevOps · required: always -->

<!-- ai-rule: 4 層 enforcement 全列。每條規則都要 mapping 到一層 -->

| Layer | Tool | Fail policy | Rules mapped |
|---|---|---|---|
| **CI lint** | <ESLint job> | fail on error → block merge | CS-001, CS-003, ... |
| **Pre-commit** | husky | fail on error → block local commit | CS-002, CS-005, ... |
| **Review** | code-review-checklist | reviewer 判斷 | CS-010, CS-015, ... |
| **Doc-only** | this file | reviewer 引用 | CS-020 |

---

## 6. Exceptions Policy
<!-- owner: Dev Lead · required: full-only -->

<!-- ai-rule: 必含 how_to_request + expiry + audit_log。沒 expiry 的 exception 會變永久債 -->

- **How to request:** <e.g. inline `eslint-disable-next-line` + PR comment 註明原因 + Dev Lead approve>
- **Expiry:** <e.g. 每季 review 一次，逾期自動清掉>
- **Audit log:** <where to track — 例：CODEOWNERS 文件 / 內部 wiki>
- **Allowed reasons:** <e.g. third-party lib 限制 / 性能熱點 / 過渡期>

---

## 7. Versioning
<!-- owner: Dev Lead · required: full-only -->

| Item | Value |
|---|---|
| Current version | v<semver> |
| Change policy | <如何提案 — 例：PR + 2 個 Dev Lead approve + RFC> |
| Deprecation window | <e.g. 2 sprints> |
| Migration path | <如何遷移舊代碼> |

---

## 8. Onboarding Path
<!-- owner: Dev Lead · required: full-only -->

<!-- ai-rule: 新人讀完此 standard 應能在多少時間內提交合規 PR — 必須給數字 -->

| Phase | Target | Resource |
|---|---|---|
| Day 1 | 讀完本 standard + 跑通 lint | this doc + lint setup guide |
| Week 1 | 第一個合規 PR | mentorship + code-review-checklist |
| Month 1 | 能 review 同儕 PR | review pair + Dev Lead shadow |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <例：嚴格禁用 any 會延長新人 ramp-up 30%> — **Mitigation:** <配 pair programming + 漸進啟用> — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：CS-007 對應的 linter rule 尚未找到，是否改為 review-layer？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: Dev Lead · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Formatter 選擇 | Prettier / Biome / dprint | Prettier | Biome (工具鏈太新)、dprint (社群小、IDE 整合不足) | **[H]** |

---

## 11. Out of Scope
<!-- owner: Dev Lead · required: full-only -->

本 standard **不處理**：

- ❌ **不處理跨語言通則** — 每語言獨立 standard（multi-repo 場景）
- ❌ **不處理 IDE / editor 個人設定** — 屬個人偏好
- ❌ **不處理 git workflow / commit message** — 屬另一份文件
- ❌ **不處理 architecture / design pattern** — 屬 ADR 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份 standard 最低 confidence 規則：** <列出所有 [L] 與 [M] 規則>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <e.g. production incident postmortem / 更多 PR comment 樣本 / 競品 standard>

### TODO（缺資料）

- _TODO: 需要 CS-007 對應 linter rule id_
- _TODO: 補 React server component 相關規則_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 規則數量 ≤ 30（超過代表沒取捨）
> - [ ] 每條規則帶 inline `[H/M/L]` badge + good/bad 對照 + linter rule id + enforcement + dimension
> - [ ] Enforcement Matrix 4 層全列，每條規則都有對應落點
> - [ ] Exceptions Policy 含 how_to_request + expiry + audit_log 三件
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（standard 是給人讀的 markdown）
````

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Coding Standard markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 PR comment 樣本 ≥ 30 條 / .eslintrc / pyproject.toml / 語言版本 / 既有 style guide）
⏫
```

> [!TIP]
> **常見錯誤：** 200 條規則無工具支撐（變死規條）、只規定縮排卻不規定錯誤處理（漏 security/observability 象限）、規則無 enforcement 落點（變純文件建議無人遵守）、規則沒對應 linter rule id 也無 TODO（無法自動化）、Decision Log 只列 chosen 不列 rejected（無法追溯為何不選別的）、exception 沒 expiry（變永久債）。AI 若漏這些，自檢清單會抓到並回頭補。
