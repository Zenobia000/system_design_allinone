---
title: "Integration Test"
slug: "integration-test"
stage: "build"
roles: ["qa", "dev"]
order: 35
hook: "確認『各自能跑』之後『接起來還能跑』"
when_to_use: "跨模組、跨服務、跨外部系統的契約需要被驗證時"
ai_leverage: "用 Claude 從 API contract 生成 happy + unhappy 路徑"
art: "/generated/stage-build.png"
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

讓 Claude 從 OpenAPI/AsyncAPI 生成 happy / unhappy / contract violation 三組測試初稿。

```prompt-quick
你是有 7+ 年自動化測試經驗的資深 QA lead（熟悉 test pyramid、contract testing、chaos engineering、Pact / OpenAPI / AsyncAPI / Postman）。任務：把 OpenAPI/AsyncAPI + consumer 列表 + SLO 轉成 Integration Test plan（YAML 格式）。

<input>
[OpenAPI / AsyncAPI spec]
[consumer 列表（誰呼叫 / 呼叫頻率）]
[SLO（latency / error rate / availability）]
</input>

輸出 schema：contracts[] (consumer/provider) / happy_paths / unhappy_paths (timeout/4xx/5xx/retry) / test_doubles_strategy / data_seed_plan / observability_assertions

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年自動化測試經驗的資深 QA lead，熟悉 test pyramid、contract testing (Pact)、chaos engineering、OpenAPI / AsyncAPI、idempotency / retry / circuit breaker pattern。
你的輸出會交給 QA（執行）、Dev（修 bug）、SRE（驗 SLO assertion）、Release Gate（決定能否上）。
他們需要每個 test case 能對應到 contract 條款與 SLO，所以你的 plan 必須機械可消費、含 happy / unhappy 雙路徑、有 observability assertion。
</role>

<context>
跨模組、跨服務、跨外部系統的契約需要被驗證時用本 Integration Test。
本卡核心問題：確認「各自能跑」之後「接起來還能跑」 — 驗證契約、序列化、認證、timeout、retry、idempotency 在真實邊界上是否一致。
</context>

<input>
[OpenAPI / AsyncAPI / gRPC proto spec]
[consumer 列表（誰呼叫此 endpoint / 呼叫頻率 / 預期回應時間）]
[SLO（latency P99 / error rate / availability）+ 既有 incident 史]
</input>

<rules>
1. 每個 test case 註明 source：[spec endpoint 路徑] + [consumer ref] + [SLO ref]，缺一者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：全部用真實外部依賴會慢且 flaky；全部 mock 會退化成 unit test）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造（例：spec 沒寫 4xx error code 就標 TODO，不要編一個）。
4. 必須涵蓋：happy / 4xx / 5xx / timeout / retry-idempotency / contract violation / observability assertion。
5. Out of scope 至少 3 條，明寫不測什麼（例：不測 third-party 內部行為、不測 UI binding、不重做 unit 覆蓋的純邏輯）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明（例：timeout 閾值來自 guess 就標 L）。
7. 每個 unhappy path 必須有對應 detection（哪個 metric / log / trace 會 alarm）— 沒有 detection 等於沒測。
</rules>

<output_schema>
contracts:
  - id: CT-001
    consumer: <service name>
    provider: <service name>
    spec_ref: <openapi path or asyncapi channel>
    version: <semver>
    source: <input ref>
    confidence: H | M | L

happy_paths:
  - id: HP-001
    endpoint: <method + path>
    input: <inline payload 或 generator>
    expected_status: <2xx>
    expected_body_schema: <ref>
    p99_budget_ms: <from SLO>
    source: <input ref>

unhappy_paths:
  4xx:
    - id: UH-4xx-01
      scenario: <e.g. missing required field>
      expected_status: 400
      expected_error_code: <from spec or TODO>
      detection: <client 應如何處理 — retry? user message?>
  5xx:
    - id: UH-5xx-01
      scenario: <e.g. provider DB down>
      injection_method: <chaos / test double>
      expected_client_behavior: <fallback / circuit breaker open>
  timeout:
    - id: UH-TO-01
      threshold_ms: <from SLO>
      expected_behavior: <retry n times then fail>
  retry_idempotency:
    - id: UH-IDM-01
      scenario: <同一 request id 重送 3 次>
      expected: <只成功一次 / 結果一致>

test_doubles_strategy:
  use_real: [<service A — 為何>]
  use_stub: [<service B — 為何>]
  use_mock: [<service C — 為何>]
  rationale: <how to choose>
  source: <input ref>

data_seed_plan:
  source: synthetic | masked_prod | fixture
  seed_lifecycle: <before-each / before-all / shared>
  cleanup: <truncate / transaction rollback>
  pii_handling: <如何處理>

observability_assertions:
  - signal: log
    pattern: <regex 或關鍵字>
    expected_level: ERROR | WARN | INFO
  - signal: metric
    name: <metric name>
    assertion: <e.g. error_rate < 0.5%>
  - signal: trace
    span_name: <span>
    expected_status: ok | error
  source: <input ref>

decision_log:
  - decision: <如：使用 Pact 而非 schema-only contract test>
    options_considered: [Pact, schema_only, full_e2e]
    chosen: Pact
    rejected_reason:
      schema_only: <why not — 抓不到 semantic mismatch>
      full_e2e: <why not — 太慢且 flaky>
    confidence: H | M | L

out_of_scope:
  - third-party 服務內部行為（只測整合邊界）
  - UI binding 行為（屬 e2e 或 component test）
  - 重做 unit test 已涵蓋的純邏輯
</output_schema>

<thinking>
產出前先：
1. 從 spec + consumer + SLO 抓 3-5 個高風險整合點（auth 邊界 / 跨 region 呼叫 / queue 重送 / schema evolution），分別標 H/M/L confidence
2. 列至少 2 條 viable test double 策略（pact-only vs hybrid real+stub），各自負面後果
3. 列你做了但 input 沒明說的假設（例如假設 idempotency key 已存在）
4. 確認 happy / 4xx / 5xx / timeout / retry / contract / observability 七類都被覆蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 test case confidence < H？特別是 timeout / retry 閾值有沒有 SLO 支撐？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是 incident postmortem 還是 consumer 真實流量畫像？為什麼？
</verify>
```

回審重點：human 判斷 test double 邊界是否合理、unhappy path 的 detection 是否真的能 alarm、idempotency 假設是否與 production 一致。
