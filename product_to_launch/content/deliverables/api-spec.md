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

FE 跟 BE 並行開發，整合那一刻才發現欄位名不同、型別不同、error code 不一致——一週都在補洞。
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

把 SRS + user story 丟給 AI 產 OpenAPI 3.1 草稿，人工審 error 分類與 breaking change policy。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 software architect（熟悉 OpenAPI 3.1 / REST / idempotency / rate limit / SOC 2 audit）。任務：把 SRS + user story 轉成 OpenAPI 契約（YAML 格式）。

## 輸入素材

[SRS / 功能規格]
[User story / 使用情境]
[既有 API 風格指南 / error taxonomy]

輸出 schema：endpoints[]（path/method/operationId）/ request_schemas（含 validation：pattern/min/max） / response_schemas（per status 含 4xx/5xx） / auth_scopes / idempotency_keys / rate_limits / x_governance（owner/consumers/freeze/change_policy） / error_taxonomy / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造欄位。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 10+ 年分散式系統經驗的資深 software architect / BE lead，熟悉 OpenAPI 3.1、REST、idempotency、rate limit、JWT/OAuth2、SOC 2 audit、breaking change policy。
你的輸出會交給 FE（消費契約、寫 mock）、BE（生產契約、寫 handler）、QA（contract test）、SDK generator（自動生成 client）。
他們需要 spec 在 freeze 那一刻就機械可消費 — 欄位型別 / error code / idempotency / governance 缺一不可。

## 情境脈絡

FE/BE 跨團隊、microservice 整合、對外 public API 時用本 API spec。
本卡核心問題：在開工前 freeze 契約，讓 FE/BE/QA 從 mock server 開始平行寫 code 與 test。

## 輸入素材

[SRS / 功能規格（含 endpoint 對應的業務動作）]
[User story / 使用情境（含主要 / 例外流程）]
[既有 API 風格指南 / error taxonomy / auth 模型]

## 規則

1. 每個 endpoint / schema 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：選 sync 回應則犧牲峰值容量；選 async webhook 則增加 FE 整合複雜度）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造欄位或 error code。
4. 必填涵蓋：endpoint + schema + auth + error（含 4xx/5xx）+ idempotency + rate limit + governance；任一象限沒列要說明為何不適用。
5. Out of scope 至少 3 條（例：內部 RPC、admin console、batch ETL 不在本契約）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. Breaking change policy 必須寫死（版本策略 / deprecation 通知期 / consumer 通知機制）。

## 輸出格式（YAML）

endpoints:
  - path: /v1/orders
    method: POST
    operationId: createOrder
    summary: <一句話>
    auth_scope: [orders:write]
    idempotency_key: required | optional | n/a
    rate_limit: <e.g. 100 req/min per token>
    source: <input ref>
    confidence: H | M | L

request_schemas:
  CreateOrderRequest:
    type: object
    required: [customer_id, items]
    properties:
      customer_id: { type: string, format: uuid, pattern: '^[0-9a-f-]{36}$' }
      items: { type: array, minItems: 1, maxItems: 100 }

response_schemas:
  '201':
    schema: OrderCreated
  '400':
    schema: ValidationError
    error_codes: [INVALID_CUSTOMER, ITEMS_EMPTY]
  '401':
    schema: AuthError
  '409':
    schema: IdempotencyConflict
  '429':
    schema: RateLimited
  '500':
    schema: InternalError

auth_scopes:
  - name: orders:write
    description: <用途>
    granted_to: [<client type>]

idempotency_keys:
  - endpoint: POST /v1/orders
    header: Idempotency-Key
    ttl: 24h
    behavior: <重複請求回原結果 vs 409>

rate_limits:
  default: 100 req/min per token
  burst: 200
  exceed_behavior: 429 + Retry-After

x_governance:
  owner: <team>
  consumers: [<FE app>, <partner SDK>]
  freeze_date: <YYYY-MM-DD>
  change_policy:
    breaking: <需 2 週 deprecation + new version>
    non_breaking: <可直接上>
    review_required_by: [Architect, FE Lead]

error_taxonomy:
  - code: INVALID_CUSTOMER
    http_status: 400
    retryable: false
    user_message_key: error.customer.invalid

decision_log:
  - decision: <e.g. cursor 分頁 vs offset 分頁>
    options_considered: [A, B, C]
    chosen: A
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - 內部 RPC / gRPC 不走本 OpenAPI 契約
  - Admin console API 另開 spec
  - Batch ETL / file-based 整合不在本卡

## 思考步驟

產出前先：
1. 從 SRS 抓 3-5 個核心業務動作（CRUD + 領域事件），標 H/M/L confidence
2. 列至少 2 條 viable API style 路徑（REST resource vs RPC action），各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設 JWT、假設 cursor 分頁）
4. 確認 endpoint / schema / auth / error / idempotency / rate limit / governance 七象限都涵蓋

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個 endpoint / error code confidence < H？列出來與所需補充資料。
2. 哪些 schema 假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：error code 涵蓋 4xx/5xx 完整、idempotency 在 POST/PATCH 標清楚、breaking change policy 與 consumer 對齊。
