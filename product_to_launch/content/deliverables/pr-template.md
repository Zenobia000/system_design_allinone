---
title: "PR Template"
slug: "pr-template"
stage: "build"
roles: ["dev"]
order: 32
hook: "讓作者在按下 Create PR 之前先回答 reviewer 會問的問題"
when_to_use: "團隊 PR 數量上升、review 來回成本高時"
ai_leverage: "用 Claude 從 diff 自動產出 PR 描述初稿"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Implementation, GitLab Handbook"
---

## 解決什麼問題

Review 卡住通常不是程式碼難，是脈絡缺。PR Template 強制作者寫清楚「為什麼改、改了什麼、怎麼驗證、有什麼風險」。

## 誰負責、和誰對接

- **主責：** Dev Lead 維護模板、Dev 填寫
- **協作：** QA（驗證欄位）、DevOps（rollout 欄位）
- **下游收件：** Reviewer、release notes、incident retro

## 何時用、何時不用

- ✅ **必要時機：** 任何進主幹的 PR
- ❌ **不需要時：** trivial typo 修正可允許簡化版
- ⚠️ **常見誤用：** 模板太長無人填；只剩標題格式檢查

## AI 怎麼加速

把 diff + commit message + 關聯 issue 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解產出 PR description 初稿，**人工只審 risk blast radius 與 rollback 真實可執行性**。本卡輸出**真實 PR description markdown 文件**（含 changes 表、reviewer checkbox、rollback plan），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給小型 PR / 內部工具 / trivial fix 用，**完整範本** 給跨團隊 / 敏感模組 / 含 schema migration 場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "pr-template"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["git-diff", "commit-messages"]
  optional: ["linked-issue"]
---

# PR: <one-liner-title>

**Status:** Draft · **Author:** <name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 9, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：diff path:line / commit §X / issue §Y）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**「沒有效能影響」若無 benchmark 必須標 [L]**；security / observability / breaking-change 三項必須涵蓋。

---

## 1. Summary

<!-- ai-fill: 一句話 + type tag。type: feat / fix / refactor / perf / docs / chore / breaking -->

**One-liner:** <50 字內描述>
**Type:** `feat` / `fix` / `refactor` / `perf` / `docs` / `chore` / `breaking`

---

## 2. Why

<!-- ai-rule: 必含 problem + link_to_issue。缺 issue link 標 _TODO_ -->

- **Problem:** <要解決什麼>
- **Link to issue:** <URL or _TODO: 缺 issue_>
- **Source:** commit §XX / issue §YY

---

## 3. Changes

<!-- ai-rule: 每個 high-risk 檔案必列；low-risk 可彙總 -->

| File | Summary | Risk |
|---|---|---|
| `<path>` | <做了什麼> | low / mid / high |

---

## 5. Test Plan & Risk

<!-- ai-rule: test_plan 必含 evidence 或 _TODO_；risk 必含 blast radius + detection signals -->

### Test plan

- **Unit:** <test names>
- **Integration:** <scenarios>
- **Manual:** <steps>
- **Evidence:** <screenshot / log / _TODO: 缺證據_>

### Risk

- **Blast radius:** <哪些 user / endpoint / dataset>
- **Detection signals:** <metric / log query>
- **Known unknowns:** <unknown 1>, <unknown 2>
- **Confidence:** **[H/M/L]**

---

## 9. Reviewer Checklist

<!-- ai-rule: 6-7 項 checkbox，作者預先勾選自評，reviewer 二次驗證 -->

- [ ] **Correctness** — 邏輯與 spec 一致
- [ ] **Error handling** — 例外捕捉、訊息有上下文
- [ ] **Tests added** — 新邏輯有測試
- [ ] **Observability** — log / metric / trace
- [ ] **Security** — auth / input validation / secret
- [ ] **Backward compatibility** — 無 breaking
- [ ] **Rollback strategy** — revert / feature flag / data migration down

---

## 12. Confidence & TODO

- **整份 PR 最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions:** <推測但 input 未明說>
- **Highest-value next input:** <e.g. perf benchmark>

### TODO（缺資料）

- _TODO: 需要 perf benchmark 校準 risk_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 9, 12，刻意不連號）
> - [ ] One-liner ≤ 50 字 + type tag
> - [ ] Why 含 problem + link_to_issue（缺則 _TODO_）
> - [ ] Risk 含 blast radius + detection signals + confidence badge
> - [ ] Reviewer Checklist 6-7 項齊
> - [ ] 「沒有效能影響」若無 benchmark 標 [L]
> - [ ] 無 YAML / JSON schema 輸出（PR description 是給人讀的 markdown）
```

```template-full
---
doc_type: "pr-template"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["git-diff", "commit-messages", "linked-issue"]
  optional: ["perf-benchmark", "design-doc"]
---

# PR: <one-liner-title>

**Status:** Draft · **Author:** <name> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev / Security / SRE / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 GitHub / GitLab Handbook / Google Engineering Practices。每結論行內 `（依據：diff path:line / commit §X / issue §Y / benchmark §Z）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**「沒有效能影響」若無 benchmark 必須標 [L]**；security / observability / breaking-change 三項必須涵蓋；risk 必含 blast radius + detection + rollback；禁 YAML/JSON schema 輸出。

---

## 1. Summary
<!-- owner: PR Author · required: always -->

<!-- ai-fill: 一句話 ≤ 50 字 + type tag -->

**One-liner:** <50 字內描述>
**Type:** `feat` / `fix` / `refactor` / `perf` / `docs` / `chore` / `breaking`

---

## 2. Why
<!-- owner: PR Author · required: always -->

<!-- ai-rule: 必含 problem + link_to_issue + business impact -->

- **Problem:** <要解決什麼>
- **Link to issue:** <URL or _TODO: 缺 issue_>
- **Business impact:** <為何現在做、不做的後果>
- **Source:** commit §XX / issue §YY

---

## 3. Changes
<!-- owner: PR Author · required: always -->

<!-- ai-rule: high-risk 檔案逐個列；low-risk 可彙總。每條附 risk_level + source -->

| File | Summary | Risk | Source |
|---|---|---|---|
| `<path>` | <做了什麼> | low / mid / high | diff §XX |

---

## 4. Test Plan
<!-- owner: PR Author + QA · required: always -->

<!-- ai-rule: unit / integration / manual 三類至少各 1，evidence 必填或 _TODO_ -->

| Layer | Tests | Evidence |
|---|---|---|
| **Unit** | <test names> | CI pass log |
| **Integration** | <scenarios> | run output |
| **Manual** | <steps> | screenshot / video |
| **Perf** | benchmark | <link or _TODO_> |

---

## 5. Risk
<!-- owner: PR Author + SRE · required: always -->

<!-- ai-rule: 必含 blast radius + detection + known unknowns + confidence -->

- **Blast radius:** <哪些 user / endpoint / dataset / region>
- **Detection signals:** <metric / log query / trace pattern>
- **Known unknowns（至少 3 條）:**
  - <unknown 1>
  - <unknown 2>
  - <unknown 3>
- **Confidence:** **[H/M/L]**

---

## 6. Rollback
<!-- owner: PR Author + SRE · required: full-only -->

<!-- ai-rule: strategy + steps + data_safety 三件齊；data_safety 若 lose data 必標明 -->

- **Strategy:** `revert` / `feature_flag_off` / `data_migration_down`
- **Steps:**
  1. <step 1>
  2. <step 2>
- **Data safety:** <是否會 lose data；不可逆操作標明>
- **Estimated rollback time:** <e.g. < 5min>

---

## 7. Breaking Change
<!-- owner: PR Author · required: full-only -->

<!-- ai-rule: is_breaking + affected_consumers + migration_guide 三件齊 -->

- **Is breaking:** true / false
- **Affected consumers:** <service / client list>
- **Migration guide:** <link or _TODO_>
- **Deprecation timeline:** <e.g. 2 sprints>

---

## 8. Security Review Trigger
<!-- owner: PR Author + Security · required: full-only -->

<!-- ai-rule: 若 triggered = true，reason 必填且 cc Security -->

- **Triggered:** true / false
- **Reason:** auth change / crypto / PII / new dependency / network exposure
- **Action:** <e.g. cc @security-team>

---

## 9. Reviewer Checklist
<!-- owner: All Reviewers · required: always -->

<!-- ai-rule: 7-8 項 checkbox。Author 預先勾選自評，reviewer 二次驗證 -->

- [ ] **Correctness** — 邏輯與 spec 一致
- [ ] **Error handling** — 例外捕捉、訊息有上下文、無吞錯
- [ ] **Tests added** — 新邏輯有 unit、改動有 integration
- [ ] **Observability** — log / metric / trace 三類齊、含 trace id
- [ ] **Security** — auth / input validation / secret / 新依賴 CVE
- [ ] **Backward compatibility** — API 無 breaking、DB 可 rollback
- [ ] **Rollback strategy** — strategy 真實可執行
- [ ] **Screenshots for UI** — 前端變更必附 before/after

---

## 10. Decision Log
<!-- owner: PR Author · required: full-only -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Migration 策略 | in-place / dual-write / blue-green | in-place | dual-write (複雜度高)、blue-green (停機需求不符) | **[H]** |

---

## 11. Out of Scope
<!-- owner: PR Author · required: full-only -->

本 PR **不處理**：

- ❌ **不處理 <相關但留後做的 item 1>** — 屬 <哪個 issue / 下個 sprint>
- ❌ **不處理 <item 2>**
- ❌ **不處理 <item 3>**

---

## 12. Confidence & TODO
<!-- owner: PR Author · required: always -->

- **整份 PR 最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <e.g. perf benchmark / production load profile>

### TODO（缺資料）

- _TODO: 需要 perf benchmark 校準 risk confidence_
- _TODO: 補 migration guide link_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] One-liner ≤ 50 字 + type tag
> - [ ] Why 含 problem + issue + business impact
> - [ ] Risk 含 blast radius + detection + ≥ 3 個 known unknowns + confidence
> - [ ] Rollback strategy + steps + data_safety 三件齊
> - [ ] Breaking change 三件齊（即使 is_breaking=false 也要寫）
> - [ ] Security review trigger 明確（即使 false 也要寫）
> - [ ] Reviewer Checklist 7-8 項齊
> - [ ] 「沒有效能影響」若無 benchmark 標 [L]
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（PR description 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 PR description markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 git diff 全文 / commit message 序列 / 關聯 issue / perf benchmark）
⏫
```

> [!TIP]
> **常見錯誤：** 模板太長無人填（精簡為 light 版）、「沒有效能影響」沒 benchmark 卻標 [H]（虛報 confidence）、Risk blast radius 寫得太籠統（reviewer 無法驗）、rollback strategy 寫了但實際不可執行（無 feature flag 卻寫 flag_off）、breaking change 漏判（影響下游卻沒 cc）、Decision Log 只列 chosen（變黑箱）、缺 screenshots 卻是前端變更。AI 若漏這些，自檢清單會抓到並回頭補。
