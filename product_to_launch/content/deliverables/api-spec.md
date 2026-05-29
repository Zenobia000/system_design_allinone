---
title: "API Spec · OpenAPI 契約"
slug: "api-spec"
stage: "design"
roles: ["architect", "dev"]
order: 25
hook: "Freeze 契約，讓 FE/BE/QA 可平行開發"
when_to_use: "跨團隊整合、FE/BE 並行開發、對外開放 API 時"
ai_leverage: "用 Claude 從 SRS / user story → OpenAPI 3.1 spec draft"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §可複製範本 / §Freeze 與 readiness"
---

## 解決什麼問題

FE 跟 BE 並行開發，整合那一刻才發現欄位名不同、型別不同、error code 不一致。一週都在補洞。
API Spec（OpenAPI 3.1）的核心價值是**讓契約先穩定**，雙方可以從 mock server 開始平行寫 code、寫 test。
沒 freeze 契約就動工，等同沒對齊就一起跑步。

## 誰負責、和誰對接

- **主責：** Architect / Dev Lead（決定契約）
- **協作：** FE（消費者驗證）、BE（生產者驗證）、QA（測試對齊）
- **下游收件：** FE/BE 平行寫 code、QA 寫 contract test、SDK 自動生成

## 何時用、何時不用

- ✅ **必要時機：** FE/BE 跨團隊、microservice 整合、對外 public API
- ❌ **不需要時：** 內部 monolith 函式呼叫、單一團隊全棧
- ⚠️ **常見誤用：** 漏掉 error code / idempotency / rate limit / auth；OpenAPI 3.1 必填 **endpoint + schema + auth + error + idempotency**，並有 change policy（breaking change 需 review）

## AI 怎麼加速

把 SRS + user story + 既有 API 風格指南 / error taxonomy 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 error 分類與 breaking change policy**。本卡輸出**真實 API spec markdown 文件**（OpenAPI 3.1 風格，含 endpoint 表格、schema 清單、error taxonomy、governance），**不出 YAML schema**（OpenAPI YAML 由 spec generator 另出）。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給單一團隊全棧 / 內部整合用，**完整範本** 給跨團隊 / 對外公開 API / 合規場景用。範本對標 OpenAPI 3.1 結構但以 markdown 表達讓人讀；機械可消費的 OpenAPI YAML 由 spec generator 從本文件衍生。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "api-spec"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["srs", "user-story"]
  optional: ["api-style-guide", "error-taxonomy"]
---

# API Spec: <api-name> v0.X

**Status:** Draft · **Owner:** <Architect/BE Lead> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：srs §XXX）`；每欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造欄位或 error code；endpoint 涵蓋 happy path 即可，但 error response 至少含 400/401/500 三類。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行說明 API 用途、主要 consumer、freeze 狀態 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 API 服務什麼業務動作>

---

## 2. Endpoints（核心 CRUD）

<!-- ai-rule: 輕量版列 3-5 個核心 endpoint。Idempotency 在 POST/PATCH 必標 -->

| Method | Path | Operation | Auth | Idempotency | Confidence |
|---|---|---|---|---|---|
| POST | `/v1/<resource>` | createX | `<resource>:write` | required | **[H]** |
| GET | `/v1/<resource>/{id}` | getX | `<resource>:read` | n/a | **[H]** |
| PATCH | `/v1/<resource>/{id}` | updateX | `<resource>:write` | optional | **[M]** |

---

## 3. Request / Response Schemas

<!-- ai-rule: 每個 endpoint 至少列出 required fields + 型別 + 主要 validation -->

### `POST /v1/<resource>` · Request

| Field | Type | Required | Validation |
|---|---|---|---|
| `customer_id` | string (uuid) | ✅ | pattern `^[0-9a-f-]{36}$` |
| `items` | array | ✅ | minItems 1, maxItems 100 |

### `POST /v1/<resource>` · Responses

| Status | Schema | Notes |
|---|---|---|
| `201` | `XCreated` | success |
| `400` | `ValidationError` | error codes: `INVALID_CUSTOMER`, `ITEMS_EMPTY` |
| `401` | `AuthError` | missing / invalid token |
| `409` | `IdempotencyConflict` | duplicate Idempotency-Key |
| `500` | `InternalError` | unhandled |

---

## 5. Error Taxonomy（核心）

<!-- ai-rule: 至少列出本 spec 涉及的 5-8 個 error code -->

| Code | HTTP | Retryable | User message key |
|---|---|---|---|
| `INVALID_CUSTOMER` | 400 | ❌ | `error.customer.invalid` |
| `ITEMS_EMPTY` | 400 | ❌ | `error.items.empty` |
| `AUTH_TOKEN_EXPIRED` | 401 | ❌ | `error.auth.expired` |

---

## 10. Decision Log

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 分頁策略 | cursor / offset | cursor | offset (大資料集 deep page 效能差) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1：例：假設 JWT bearer auth>
- **Highest-value next input:** <下一份最該補的資料>

### TODO（缺資料）

- _TODO: 需要 BE 確認 ratelimit 預設值_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 10, 12，刻意不連號）
> - [ ] 每個 POST/PATCH endpoint 標 idempotency
> - [ ] Error response 至少含 400/401/500 三類
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 直接傾倒（用表格表達 spec 結構）
```

```template-full
---
doc_type: "api-spec"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["srs", "user-story", "api-style-guide"]
  optional: ["error-taxonomy", "existing-auth-model", "competitive-api-scan"]
---

# API Spec: <api-name> v0.X

**Status:** Draft · **Owner:** <Architect/BE Lead> · **Last updated:** YYYY-MM-DD · **Reviewers:** FE Lead / QA / Security

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 OpenAPI 3.1 結構。每結論行內 `（依據：srs §XXX / user-story §YYY）`；每欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造欄位或 error code；必填涵蓋：endpoint + schema + auth + error（含 4xx/5xx）+ idempotency + rate limit + governance；Breaking change policy 寫死（版本策略 / deprecation 通知期 / consumer 通知機制）；禁傾倒原始 YAML schema（用 markdown 表格 + 程式碼片段表達）。

---

## 1. Executive Summary
<!-- owner: Architect/BE Lead · required: always -->

<!-- ai-fill: 3-5 行說明 API 用途、主要 consumer、freeze 狀態與 SLA -->

<3-5 行說明>

> **TL;DR:** <一句話：本 API 服務什麼業務動作>

---

## 2. Endpoints
<!-- owner: BE Lead · required: always -->

<!-- ai-rule: 列出所有 endpoint。Idempotency / rate-limit 每行必標。auth_scope 必填 -->

| Method | Path | Operation | Auth scope | Idempotency | Rate limit | Confidence |
|---|---|---|---|---|---|---|
| POST | `/v1/<resource>` | createX | `<resource>:write` | required | 100/min | **[H]** |
| GET | `/v1/<resource>` | listX | `<resource>:read` | n/a | 1000/min | **[H]** |
| GET | `/v1/<resource>/{id}` | getX | `<resource>:read` | n/a | 1000/min | **[H]** |
| PATCH | `/v1/<resource>/{id}` | updateX | `<resource>:write` | optional | 100/min | **[M]** |
| DELETE | `/v1/<resource>/{id}` | deleteX | `<resource>:write` | optional | 50/min | **[M]** |

---

## 3. Request Schemas
<!-- owner: BE Lead · required: always -->

<!-- ai-rule: 每個 endpoint 至少列 required + optional fields + 型別 + validation pattern/min/max -->

### `POST /v1/<resource>` · `CreateXRequest`

| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| `customer_id` | string (uuid) | ✅ | pattern `^[0-9a-f-]{36}$` | 對應 Customer.id |
| `items` | array | ✅ | minItems 1, maxItems 100 | 元素見 `LineItem` |
| `idempotency_key` | header | ✅ | uuid v4 | header name: `Idempotency-Key` |

### `PATCH /v1/<resource>/{id}` · `UpdateXRequest`

...

---

## 4. Response Schemas
<!-- owner: BE Lead · required: always -->

<!-- ai-rule: 每個 endpoint 列出 success + ≥ 3 個 error status（含 4xx + 5xx），含 error_codes -->

### `POST /v1/<resource>` · Responses

| Status | Schema | Error codes | Notes |
|---|---|---|---|
| `201` | `XCreated` | — | success |
| `400` | `ValidationError` | `INVALID_CUSTOMER`, `ITEMS_EMPTY` | client validation |
| `401` | `AuthError` | `AUTH_TOKEN_EXPIRED`, `AUTH_TOKEN_INVALID` | auth failure |
| `403` | `ForbiddenError` | `SCOPE_MISSING` | scope insufficient |
| `409` | `IdempotencyConflict` | `IDEMPOTENCY_KEY_REUSED` | duplicate key |
| `429` | `RateLimited` | — | with `Retry-After` header |
| `500` | `InternalError` | — | logged with trace-id |

---

## 5. Error Taxonomy
<!-- owner: Architect · required: always -->

<!-- ai-rule: 全 spec 的 error code 統一表，含 retryable + user_message_key + class -->

| Code | HTTP | Class | Retryable | User message key |
|---|---|---|---|---|
| `INVALID_CUSTOMER` | 400 | validation | ❌ | `error.customer.invalid` |
| `ITEMS_EMPTY` | 400 | validation | ❌ | `error.items.empty` |
| `AUTH_TOKEN_EXPIRED` | 401 | auth | ❌ (refresh first) | `error.auth.expired` |
| `SCOPE_MISSING` | 403 | auth | ❌ | `error.auth.scope` |
| `IDEMPOTENCY_KEY_REUSED` | 409 | client | ❌ | `error.idempotency.conflict` |
| `RATE_LIMITED` | 429 | client | ✅ (with backoff) | `error.ratelimit` |

---

## 6. Auth & Scopes
<!-- owner: Architect + Security · required: always -->

<!-- ai-rule: 標清楚 auth 模型（JWT/OAuth2/API key）+ 每個 scope 的用途與授予對象 -->

**Auth model:** JWT Bearer (OAuth2 client_credentials flow)

| Scope | Description | Granted to |
|---|---|---|
| `<resource>:read` | 讀取 resource | FE app, partner SDK |
| `<resource>:write` | 建立/修改 resource | FE app |

---

## 7. Idempotency & Rate Limit
<!-- owner: BE Lead · required: always -->

### Idempotency

| Endpoint | Header | TTL | On duplicate |
|---|---|---|---|
| `POST /v1/<resource>` | `Idempotency-Key` (uuid v4) | 24h | 回原 response（不回 409） |
| `PATCH /v1/<resource>/{id}` | `Idempotency-Key` (uuid v4) | 24h | 回原 response |

### Rate Limit

- **Default:** 100 req/min per token
- **Burst:** 200
- **Exceed behavior:** `429` with `Retry-After: <seconds>` header

---

## 8. Governance & Change Policy
<!-- owner: Architect · required: always -->

<!-- ai-rule: Breaking change policy 必須寫死（版本策略 + deprecation 通知期 + consumer 通知機制） -->

| Field | Value |
|---|---|
| **Owner team** | <team-name> |
| **Consumers** | <FE app>, <partner SDK>, <internal service X> |
| **Freeze date** | YYYY-MM-DD |
| **Versioning** | URL path version (`/v1`, `/v2`) |
| **Breaking change** | ≥ 2 週 deprecation 通知 + new major version + 6 個月平行運行 |
| **Non-breaking change** | 直接上，CHANGELOG 紀錄 |
| **Review required by** | Architect, FE Lead, Security |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <失效模式：例：FE 不帶 Idempotency-Key 導致重複建單> — **Mitigation:** SDK 預設帶、BE 對 POST 強制 required — **Owner:** <FE Lead>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：分頁 cursor 是否需 server-side opaque token？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: Architect · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 分頁策略 | cursor / offset / page-token | cursor | offset (deep page 慢)、page-token (over-engineering) | **[H]** |
| YYYY-MM-DD | 錯誤格式 | RFC7807 / 自訂 envelope | RFC7807 | 自訂 (consumer 已熟悉 RFC7807) | **[H]** |

---

## 11. Out of Scope
<!-- owner: Architect · required: full-only -->

本 API spec **不處理**：

- ❌ **內部 RPC / gRPC** 不走本 OpenAPI 契約 — 另開內部 RPC spec
- ❌ **Admin console API** 另開 admin spec
- ❌ **Batch ETL / file-based 整合** 走另張資料整合 spec
- ❌ **Webhook 出站** 走另張 webhook 卡（含 retry policy）

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1：例：假設 cursor 分頁（input 沒明說）>
  - <假設 2：例：假設 JWT bearer（input 沒明說 auth model）>
- **Highest-value next input:** <下一份最該補的：FE 整合需求、Security threat model、競品 API 風格>

### TODO（缺資料）

- _TODO: 需要 FE 確認 cursor 格式（opaque vs base64-encoded JSON）_
- _TODO: 需要 Security 確認 token TTL 與 refresh 流程_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 endpoint 標 auth_scope + idempotency + rate_limit
> - [ ] Error response 至少含 400/401/403/429/500 五類
> - [ ] Error Taxonomy 表統一，所有 endpoint 引用同一份
> - [ ] Idempotency 在 POST/PATCH 必標（TTL + on-duplicate 行為）
> - [ ] Governance 段 breaking change policy 寫死（版本策略 + 通知期）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無原始 YAML / JSON schema 傾倒（用 markdown 表格 + 程式碼片段表達）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 API spec markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 srs.md / user-story.md / 既有 API 風格指南 / error taxonomy 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 只列 happy path 沒列 4xx/5xx（FE 整合會炸）、Idempotency 在 POST/PATCH 沒標（重複建單）、Breaking change policy 沒寫（consumer 通知不到位）、Error code 散落各 endpoint 沒統一 taxonomy、傾倒原始 OpenAPI YAML（人讀不來）。AI 若漏這些，自檢清單會抓到並回頭補。
