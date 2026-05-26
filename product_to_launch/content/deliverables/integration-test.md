---
title: "Integration Test"
slug: "integration-test"
stage: "build"
roles: ["qa", "dev"]
order: 35
hook: "確認『各自能跑』之後『接起來還能跑』"
when_to_use: "跨模組、跨服務、跨外部系統的契約需要被驗證時"
ai_leverage: "用 Claude 從 API contract 生成 happy + unhappy 路徑"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Verification"
---

## 解決什麼問題

單元測試綠燈不代表系統會動。Integration Test 驗證契約、序列化、認證、timeout、retry、idempotency 在真實邊界上是否一致。

## 誰負責、和誰對接

- **主責：** QA + Dev 共寫
- **協作：** DevOps 提供類生產環境、DBA 提供測試資料
- **下游收件：** CI pipeline、UAT、Release Gate

## 何時用、何時不用

- ✅ **必要時機：** 新 API、第三方整合、queue/event flow、schema migration
- ❌ **不需要時：** 純函式庫、無外部依賴
- ⚠️ **常見誤用：** mock 掉所有外部依賴後等於 unit test；測資不還原

## AI 怎麼加速

把 OpenAPI/AsyncAPI + consumer 列表 + SLO 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己生 happy + unhappy + contract violation 測試初稿，**人工只審 test double 邊界與 detection signal**。本卡輸出**真實 Integration Test plan markdown 文件**（含 contract 表、unhappy path 矩陣、observability assertion），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給單一 API / consumer 少 / MVP 場景用，**完整範本** 給跨服務 / 多 consumer / production 合規場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "integration-test"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["openapi-spec", "consumer-list"]
  optional: ["slo-definition"]
---

# Integration Test Plan: <api-or-service-name>

**Status:** Draft v0.X · **Owner:** <QA Lead> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 4, 5, 9, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每 test case 行內加 `（依據：spec endpoint / consumer §X / SLO §Y）`；每 case 帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**每個 unhappy path 必須有對應 detection（log / metric / trace）**，沒 detection 等於沒測；輕量版至少覆蓋 happy + 4xx + 5xx 三類。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，QA/Dev 30 秒讀完。內容：N 個 contract、happy/unhappy case 數、最高風險整合點 -->

<3-5 行說明>

> **TL;DR:** <一句話：這份 plan 驗證哪個契約邊界>

---

## 2. Contracts

<!-- ai-rule: 每條必含 consumer / provider / spec ref / version -->

| ID | Consumer | Provider | Spec ref | Version | Confidence |
|---|---|---|---|---|---|
| CT-001 | <service A> | <service B> | `/api/v2/orders POST` | v1.3 | **[H]** |

---

## 4. Happy Paths

<!-- ai-rule: 每個 endpoint 至少 1 條 happy path，含 input / expected status / p99 budget -->

| ID | Endpoint | Input | Expected status | p99 budget | Confidence |
|---|---|---|---|---|---|
| HP-001 | `POST /orders` | `{...}` | 201 | < 500ms | **[H]** |

---

## 5. Unhappy Paths

<!-- ai-rule: 必含 4xx / 5xx / timeout 三類至少各 1 條，每條附 detection signal -->

### 4xx

| ID | Scenario | Expected status | Detection |
|---|---|---|---|
| UH-4xx-01 | missing required field | 400 | client → user message |

### 5xx

| ID | Scenario | Injection | Expected client behavior |
|---|---|---|---|
| UH-5xx-01 | provider DB down | chaos / stub | circuit breaker open + fallback |

### Timeout

| ID | Threshold | Expected behavior |
|---|---|---|
| UH-TO-01 | <from SLO p99 + 20%> | retry 2 次 → fail with 504 |

---

## 9. Risks（top 3）

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <風險描述> — **Mitigation:** <如何降低> — **Owner:** <誰負責>
>
> **R2:** ...
>
> **R3:** ...

---

## 12. Confidence & Sources & TODO

- **整份 plan 最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的 incident postmortem / consumer 真實流量畫像>

### TODO（缺資料）

- _TODO: 需要 SLO p99 數值校準 timeout threshold_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 4, 5, 9, 12，刻意不連號）
> - [ ] 每個 test case 帶 inline `[H/M/L]` badge + source
> - [ ] Unhappy paths 覆蓋 4xx + 5xx + timeout 三類
> - [ ] 每個 unhappy path 有 detection signal
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（plan 是給人讀的 markdown）
```

```template-full
---
doc_type: "integration-test"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["openapi-spec", "consumer-list", "slo-definition"]
  optional: ["incident-history", "traffic-profile"]
---

# Integration Test Plan: <api-or-service-name>

**Status:** Draft v0.X · **Owner:** <QA Lead> · **Last updated:** YYYY-MM-DD · **Reviewers:** QA / Dev / SRE / Release Gate

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 Pact / Postman / OpenAPI / AsyncAPI 實踐。每 test case 行內 `（依據：spec endpoint / consumer §X / SLO §Y / incident §Z）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**必須涵蓋 happy / 4xx / 5xx / timeout / retry-idempotency / contract violation / observability assertion 七類**；**每個 unhappy path 必須有 detection**；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: QA Lead · required: always -->

<!-- ai-fill: 3-5 行：N 個 contract、N 個 test case、覆蓋哪七類、最高風險整合點、預期 CI runtime -->

<3-5 行說明>

> **TL;DR:** <一句話>

---

## 2. Contracts
<!-- owner: QA + Dev · required: always -->

<!-- ai-rule: 每條必含 consumer / provider / spec ref / version / source -->

| ID | Consumer | Provider | Spec ref | Version | Source | Confidence |
|---|---|---|---|---|---|---|
| CT-001 | <service A> | <service B> | `/api/v2/orders POST` | v1.3 | openapi.yaml §L120 | **[H]** |

---

## 3. Test Doubles Strategy
<!-- owner: QA + Dev · required: always -->

<!-- ai-rule: use_real / use_stub / use_mock 三類分清楚 + rationale。預設不 mock 同 module 內 pure function -->

| Service | Strategy | Rationale |
|---|---|---|
| <service A> | use_real (in test env) | 內部服務，可控 |
| <service B> | use_stub (wiremock) | 第三方 API，避免依賴 |
| <service C> | use_mock | 不穩定且付費 |

---

## 4. Happy Paths
<!-- owner: QA · required: always -->

<!-- ai-rule: 每個 endpoint 至少 1 條，含 input generator + expected status + p99 budget -->

| ID | Endpoint | Input | Expected status | Body schema | p99 budget | Confidence |
|---|---|---|---|---|---|---|
| HP-001 | `POST /orders` | <inline 或 generator> | 201 | OrderCreated v2 | < 500ms | **[H]** |

---

## 5. Unhappy Paths
<!-- owner: QA · required: always -->

<!-- ai-rule: 必涵蓋 4xx / 5xx / timeout / retry-idempotency 四類，每條附 detection -->

### 5.1 4xx

| ID | Scenario | Expected status | Expected error code | Detection |
|---|---|---|---|---|
| UH-4xx-01 | missing required field | 400 | VALIDATION_ERROR | user message |
| UH-4xx-02 | unauthorized | 401 | AUTH_REQUIRED | redirect login |

### 5.2 5xx

| ID | Scenario | Injection | Expected client behavior |
|---|---|---|---|
| UH-5xx-01 | provider DB down | chaos | circuit breaker open + fallback |
| UH-5xx-02 | gateway timeout | toxiproxy | retry 2 次 → fail |

### 5.3 Timeout

| ID | Threshold (from SLO) | Expected behavior | Detection |
|---|---|---|---|
| UH-TO-01 | p99 SLO + 20% | retry 2 次 then fail | trace span error |

### 5.4 Retry / Idempotency

| ID | Scenario | Expected | Detection |
|---|---|---|---|
| UH-IDM-01 | 同 request id 重送 3 次 | 只成功一次 / 結果一致 | log: dedupe hit |

---

## 6. Contract Violation Tests
<!-- owner: QA · required: full-only -->

<!-- ai-rule: schema breaking / required field missing / enum invalid 三類 -->

| ID | Violation | Expected behavior |
|---|---|---|
| CV-001 | response 多回未宣告欄位 | client ignore (向後相容) |
| CV-002 | request 缺 required | provider 400 + clear error |
| CV-003 | enum 新增值 | client default to unknown |

---

## 7. Data Seed Plan
<!-- owner: QA + DBA · required: full-only -->

<!-- ai-rule: source / lifecycle / cleanup / PII handling 四件齊 -->

| Field | Value |
|---|---|
| **Source** | synthetic / masked_prod / fixture |
| **Lifecycle** | before-each / before-all / shared |
| **Cleanup** | truncate / transaction rollback |
| **PII handling** | <如何 mask / 是否 anonymize> |

---

## 8. Observability Assertions
<!-- owner: QA + SRE · required: full-only -->

<!-- ai-rule: log / metric / trace 三類至少各 1 -->

| Signal | Name | Assertion | Expected level |
|---|---|---|---|
| log | order.created | regex pattern | INFO |
| metric | order_create_count | counter increment by 1 | — |
| trace | POST /orders span | status = ok, no error tag | — |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <例：所有外部依賴用 mock 會退化成 unit> — **Mitigation:** <hybrid: real + selective stub> — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：idempotency key 是否已存在於 spec？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: QA Lead · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Contract test 框架 | Pact / schema-only / full-e2e | Pact | schema-only (抓不到 semantic mismatch)、full-e2e (太慢且 flaky) | **[H]** |

---

## 11. Out of Scope
<!-- owner: QA Lead · required: full-only -->

本 plan **不處理**：

- ❌ **不測 third-party 服務內部行為** — 只測整合邊界
- ❌ **不測 UI binding** — 屬 e2e / component test 卡
- ❌ **不重做 unit test 已涵蓋的純邏輯** — 避免重複
- ❌ **不做 perf load test** — 屬 nfr / perf-test 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份 plan 最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <e.g. consumer 真實流量畫像 / incident postmortem / production error log>

### TODO（缺資料）

- _TODO: 需要 SLO p99 數值校準所有 timeout threshold_
- _TODO: 補 CV-003 在 spec 中的 enum 演進政策_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 test case 帶 inline `[H/M/L]` badge + source
> - [ ] Unhappy paths 七類齊：4xx + 5xx + timeout + retry-idempotency + contract violation
> - [ ] 每個 unhappy path 有 detection signal（log / metric / trace 之一）
> - [ ] Test Doubles Strategy 區分 use_real / use_stub / use_mock 並寫 rationale
> - [ ] Observability Assertions 含 log + metric + trace 各 1
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（plan 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Integration Test plan markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 OpenAPI / AsyncAPI spec 全文 / consumer 列表 / SLO 定義 / incident 史）
⏫
```

> [!TIP]
> **常見錯誤：** mock 掉所有外部依賴後等於 unit test（失去整合驗證價值）、unhappy path 沒 detection 等於沒測（不會 alarm）、timeout threshold 用猜的不對齊 SLO、idempotency 場景缺失（重送會重複扣款）、測資不還原導致 flaky、observability assertion 缺 trace（無法定位跨服務 bug）、only happy path 上線爆炸。AI 若漏這些，自檢清單會抓到並回頭補。
