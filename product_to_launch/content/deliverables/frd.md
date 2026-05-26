---
title: "FRD · 功能需求文件"
slug: "frd"
stage: "define"
roles: ["ba", "pm"]
order: 14
hook: "把 PRD 的 what 拆解成每個功能的精細規格"
when_to_use: "PRD 範圍大、含 ≥ 5 個獨立功能、需向工程精準交付時"
ai_leverage: "用 Claude 把 PRD section → FRD 功能表 + 規則樹"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 適合對齊「為什麼做」，但對工程實作而言過於高階。
FRD 把 PRD 中的每個功能拆成**獨立的規格條目**：input、output、處理規則、錯誤情境、相依資料。
不寫 FRD，工程師會在 sprint 中不斷回頭問「這個欄位驗證規則是？」「這狀態下要顯示什麼？」，一週 standup 都耗在補需求。

## 誰負責、和誰對接

- **主責：** BA（細節規格）/ PM（範圍確認）
- **協作：** SA（系統行為層）、UX（互動規則）、QA（驗收條件）
- **下游收件：** Dev 實作、QA 寫 test、UI 補空狀態與錯誤訊息文案

## 何時用、何時不用

- ✅ **必要時機：** PRD 含 ≥ 5 個獨立功能、跨團隊交付、外包開發
- ❌ **不需要時：** 小團隊 PRD + user story 已足、純探索 spike
- ⚠️ **常見誤用：** FRD 與 PRD 重複（要切清楚 what vs how-detail）；FRD 與 user story 重複（FRD 偏完整功能，user story 偏可 sprint 切片）

## AI 怎麼加速

把 PRD section + business rule catalog + 既有 data model 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 trade-off**。本卡輸出**真實 FRD markdown 文件**（含功能模組表、規則決策表、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給中型團隊 / 單一 epic 拆解用，**完整範本**給跨團隊外包 / 合規/稽核產業 / 大型企業系統用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "frd"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "business-rules"]
  optional: ["data-model"]
---

# Functional Requirements: <product-or-epic-name>

**Status:** Draft v0.X · **Owner:** <BA name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 4, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每個欄位必含 type / required / validation；每條規則必含 rule ID + 觸發條件 + 動作；每結論行內 `（依據：PRD §X / BR-NNN）`；缺資料寫 `_TODO: 需要 XXX_` 不編造。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：本 FRD 拆出 N 個功能模組、M 條 business rule、最高風險的 exception 情境 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 FRD 把 PRD 哪一段拆成多少個可實作模組>

---

## 2. Functional Modules

<!-- ai-rule: 輕量版只列 P0 模組，2-4 個為宜。每個模組必含 input / output / 規則 / 相依 四件 -->

### FN-1: <module-name> · **P0** · **[H]**

- **Description:** <一句話>
- **Input fields:**

| Field | Type | Required | Validation | Default | Source |
|---|---|---|---|---|---|
| <field-a> | string | yes | regex `^...$` (BR-001) | `_` | PRD §FR-1 |
| <field-b> | int | yes | range 1-100 | `1` | PRD §FR-1 |

- **Output:**
  - **Success:** `{ id: uuid, status: "ok" }`
  - **Error:** `{ code: "VAL-001", message: i18n key, retryable: false }`
- **Processing rules:** BR-001, BR-002
- **Dependencies:** upstream `<auth-service>` · downstream `<event-bus>` · data `<orders 表>`
- **Source:** PRD §FR-1

### FN-2: <module-name> · **P0** · **[M]**

...

---

## 4. Business Rules（必要規則）

<!-- ai-rule: 每條規則必含 rule ID + when/then 條件 + exception。互斥規則須在 statement 明示 -->

| ID | Statement | Decision table / branches | Exceptions | Priority | Source |
|---|---|---|---|---|---|
| BR-001 | When <input> then <action> else <reject> | <參考表格或 N/A> | <例：admin 可繞過> | **must** | PRD §business rule |
| BR-002 | ... | ... | ... | **should** | ... |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why |
|---|---|---|---|---|
| YYYY-MM-DD | <例：欄位 X 為何設為 required> | required / optional / 條件式 | required | optional (下游無法處理 null)、條件式 (規則過複雜) |

---

## 12. Confidence & Sources & TODO

- **最低 confidence 項：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1，例：上游 API 穩定性>
- **Highest-value next input:** <合規條款全文 / 上游 API spec / 既有欄位字典 三選一>

### TODO（缺資料）

- _TODO: 需要 XXX 補 BR-002 的 exception 處理_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 4, 10, 12，刻意不連號）
> - [ ] 每個 FN 含 input / output / 規則 / 相依 四件
> - [ ] 每個欄位含 type / required / validation 三件
> - [ ] 每條 BR 含 rule ID + when/then + exception
> - [ ] 每結論帶 `[H/M/L]` badge + `（依據：...）` 行內引用
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（FRD 是給人讀的 markdown）
```

```template-full
---
doc_type: "frd"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "business-rules", "data-model"]
  optional: ["upstream-api-spec", "compliance-clauses", "field-dictionary"]
---

# Functional Requirements: <product-or-epic-name>

**Status:** Draft v0.X · **Owner:** <BA name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PM / SA / UX / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。每個欄位必含 type / required / 驗證規則 / 預設值 / 範例（缺任一視為 fail）；每條 BR 必須可追溯至 catalog ID + 觸發條件 + 動作 + exception 處理；exception handling 至少涵蓋 input_invalid / upstream_timeout / concurrency_conflict / perm_denied 4 類至少 3 類；合規欄位必標 data classification + 保留期 + 刪除政策。每結論 `（依據：PRD §X / BR-NNN / 合規條款 §Z）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: BA · required: always -->

<!-- ai-fill: 3-5 行：拆出 N 個功能模組、M 條 BR、合規分類分佈、最高 trade-off 的決策 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 FRD 對 PRD 的哪段做了多少模組化拆解，並交付給 Dev / QA 的契約>

---

## 2. Functional Modules
<!-- owner: BA + Dev · required: always -->

<!-- ai-rule: 每模組必含 input fields 表 / output 結構 / processing rules / dependencies 四件，缺一即 fail -->

### FN-1: <module-name> · **P0** · **[H]**

- **Description:** <一句話>
- **Input fields:**

| Field | Type | Required | Validation | Default | Example | Source |
|---|---|---|---|---|---|---|
| <field-a> | string | yes | regex `^...$` (BR-001) | `_` | `"abc"` | PRD §FR-1 |
| <field-b> | int | yes | range 1-100 | `1` | `42` | PRD §FR-1 |
| <field-c> | enum[a, b, c] | no | enum check | `a` | `"b"` | PRD §FR-1 |

- **Output fields:**
  - **Success:** `{ id: uuid, status: "ok", payload: {...} }`
  - **Error:** `[{ code: "VAL-001", message: i18n key, retryable: false }, ...]`
- **Processing rules:** BR-001, BR-002, BR-003
- **Dependencies:**
  - Upstream: `<auth-service>` API · `<vendor-X>` REST
  - Downstream: `<event-bus>` event `order.created` · `<notification-svc>`
  - Data: `<orders 表>` · `<users 表>`
- **Acceptance criteria refs:** AC-001, AC-002
- **Source:** PRD §FR-1

### FN-2: ...

### FN-3: ...

---

## 3. Business Rules
<!-- owner: BA · required: always -->

<!-- ai-rule: 每條 BR 必含 catalog ID 反向追溯 + statement + decision table (若 ≥ 3 條件) + exception + compliance basis -->

| ID | Statement | Priority | Compliance basis | Source |
|---|---|---|---|---|
| BR-001 | When `<input>` matches `^...$` then accept, else reject with VAL-001 | **must** | GDPR Art 5(1)(d) accuracy | PRD §rules |
| BR-002 | When user.role = "admin" then bypass BR-001 | **must** | <無，business decision> | PRD §rules |
| BR-003 | When concurrent edit detected then reject latest write | **should** | <無> | PRD §rules |

### BR-001 Decision Table（互斥條件多時用）

| Condition: input format | Condition: user.role | Action |
|---|---|---|
| valid | any | accept |
| invalid | non-admin | reject with VAL-001 |
| invalid | admin | accept + warn |

---

## 4. Data Flows
<!-- owner: BA + SA · required: full-only · skippable: 純單體 / 無事件驅動時可省略，但需在此段寫明 -->

| Flow ID | Source system | Target system | Trigger | Payload schema | SLA (latency / freshness) | Confidence |
|---|---|---|---|---|---|---|
| DF-001 | <web app> | <event-bus> | order.submit | <schema link / 欄位列表> | < 200ms p95 | **[H]** |
| DF-002 | <event-bus> | <warehouse> | nightly batch | <schema link> | freshness < 24h | **[M]** |

---

## 5. Integration Points（External APIs）
<!-- owner: BA + SA · required: full-only -->

<!-- ai-rule: 每個 integration 必含 method / auth / rate limit / failure mode 四件 -->

| API ID | Counterparty | Method | Auth | Rate limit | Failure mode | Source |
|---|---|---|---|---|---|---|
| API-001 | <stripe> | POST `/charges` | oauth2 + idempotency-key | 100 rps | fallback to queue + retry | PRD §integration |
| API-002 | <internal-auth> | GET `/users/:id` | mtls | 500 rps | fail-fast (auth 必要) | PRD §integration |

---

## 6. Exception Handling
<!-- owner: BA + Dev + UX · required: always -->

<!-- ai-rule: 必涵蓋 input_invalid / upstream_timeout / concurrency_conflict / perm_denied 4 類至少 3 類 -->

| Scenario | Trigger | User message (i18n) | Log level | Alert | Source |
|---|---|---|---|---|---|
| input_invalid | <例：email 格式錯> | `err.email.invalid` | warn | no | BR-001 |
| upstream_timeout | <auth-svc > 3s> | `err.upstream.unavailable` | error | yes (p1) | API-002 |
| concurrency_conflict | <ETag mismatch> | `err.conflict.retry` | warn | no | BR-003 |
| perm_denied | <user.role 不足> | `err.forbidden` | warn | no (rate-limited) | BR-002 |

---

## 7. Data Classification & Retention
<!-- owner: BA + Compliance · required: full-only · skippable: 純內部工具且無 PII 時可省 -->

<!-- ai-rule: 合規欄位必標 classification + retention + deletion policy + 法規依據 -->

| Entity / Field | Classification | Retention | Deletion policy | Compliance basis |
|---|---|---|---|---|
| `users.email` | confidential (PII) | 5 years post-churn | anonymize | GDPR Art 17 |
| `orders.amount` | internal | 7 years | archive | 稅務法 §21 |
| `audit.log` | internal | 1 year hot + 6 years cold | archive | SOC 2 CC7.2 |

---

## 8. Change Policy
<!-- owner: BA + PM · required: full-only -->

<!-- ai-rule: 明定變更分流（誰可自決、誰需簽核），避免 BA 越權或 PM 過勞 -->

| Change type | Self-approve by BA | Needs PM sign-off | Needs Architect review |
|---|---|---|---|
| Error message i18n 文案 | yes | — | — |
| 必填欄位增減 | — | yes | — |
| 跨系統 API contract 改動 | — | yes | yes |
| BR priority 升降（must ↔ should） | — | yes | — |
| Data classification 升級 | — | yes | — |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：BR-002 與 GDPR 衝突風險> — **Mitigation:** 法遵簽核 + audit log — **Owner:** BA + 法遵
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：FN-2 是否走同步 API 或事件驅動？SA 待裁示>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: BA · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <例：欄位 X 為何 required> | required / optional / 條件式 | required | optional (下游無法處理 null)、條件式 (規則過複雜) | **[H]** |

---

## 11. Out of Scope
<!-- owner: BA + PM · required: full-only -->

本 FRD **不處理**：

- ❌ **UI mockup / 互動設計** — 屬 UX 卡
- ❌ **API 詳細 schema / OpenAPI 規格** — 屬 api-spec 卡
- ❌ **效能調校細節** — 屬 architect / NFR 卡
- ❌ **Sprint 拆解** — 屬 PO / user story 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1，例：上游 API SLA 99.9%>
  - <假設 2，例：欄位精度 decimal(18,4)>
- **Highest-value next input:** <合規條款全文 / 上游 API spec / 既有欄位字典>

### TODO（缺資料）

- _TODO: 需要法遵確認 BR-002 admin 繞過合規依據_
- _TODO: 需要上游 API 真實 rate limit 數字校準 API-001_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 FN 模組含 input / output / 規則 / 相依 / acceptance 五件
> - [ ] 每個欄位含 type / required / validation / default / example 五件
> - [ ] 每條 BR 含 ID + statement + exception + compliance basis
> - [ ] Exception handling 至少涵蓋 4 類中的 3 類
> - [ ] 含 PII / 金流 / 醫療欄位都標 classification + retention + deletion policy + 法規依據
> - [ ] Change Policy 段已明確分流（自決 / PM / Architect）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（FRD 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 FRD markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 prd.md / business rule catalog / data model / 既有欄位字典 全文）
⏫
```

> [!TIP]
> **常見錯誤：** FRD 寫成 PRD 的複製貼上（要有系統行為層）、欄位漏 validation 或 default、BR 沒 catalog ID 無法追溯、合規欄位沒標保留期 / 刪除政策、change policy 沒寫導致變更失控。AI 若漏這些，自檢清單會抓到並回頭補。
