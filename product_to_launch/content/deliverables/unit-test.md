---
title: "Unit Test · 單元測試"
slug: "unit-test"
stage: "build"
roles: ["dev", "qa"]
order: 34
hook: "讓重構不再靠賭"
when_to_use: "邏輯有分支、邊界條件、或會被其他模組依賴時"
ai_leverage: "用 Claude 從函數簽名生成 edge case 矩陣"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Implementation, §Verification"
---

## 解決什麼問題

Unit Test 真正的價值不是「測對了」，是「敢改」。沒測試的程式碼就是凍住的。覆蓋率是副產品，可重構性才是目標。

## 誰負責、和誰對接

- **主責：** Dev 寫測試與被測對象
- **協作：** QA 對齊 acceptance、SD 對齊錯誤模型
- **下游收件：** CI、Integration Test、Refactor 安全網

## 何時用、何時不用

- ✅ **必要時機：** 業務規則、狀態機、資料轉換、價格/權限計算
- ❌ **不需要時：** 純 wiring code、setter/getter、UI snapshot
- ⚠️ **常見誤用：** 為覆蓋率測 mock、把 unit 寫成 integration

## AI 怎麼加速

讓 Claude 從函數簽名 + spec 生成 edge case 矩陣，Dev 審閱後再實作測試。

```prompt-quick
你是有 7+ 年自動化測試經驗的資深 QA lead（熟悉 test pyramid、contract testing、chaos engineering、property-based / mutation testing）。任務：把函數簽名 + spec + 既有測試覆蓋報告轉成 Unit Test plan（YAML 格式）。

<input>
[函數 / 類別簽名（含型別）]
[功能規格 / acceptance criteria]
[既有測試 + coverage 報告（如有）]
</input>

輸出 schema：targets[] (function/class) / test_cases[] (input/expected/edge) / mocking_strategy / coverage_target / performance_assertions / mutation_test_score

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年自動化測試經驗的資深 QA lead，熟悉 test pyramid、contract testing、chaos engineering、property-based testing、mutation testing (Stryker / PIT)。
你的輸出會交給 Dev（實作測試）、CI（執行）、reviewer（判斷覆蓋是否足夠）、未來 refactor 的人（當作安全網）。
他們需要知道「哪些 case 一定要測、哪些是 over-engineering」，所以你的 plan 必須機械可消費、邊界清楚、能對應到 spec。
</role>

<context>
邏輯有分支、邊界條件、或會被其他模組依賴時用本 Unit Test。
本卡核心問題：讓重構不再靠賭 — 覆蓋率是副產品，可重構性才是目標。
</context>

<input>
[函數 / 類別簽名（含型別、回傳值、可能丟出的 exception）]
[功能規格 / acceptance criteria / 業務規則]
[既有測試 + coverage 報告（如有）]
</input>

<rules>
1. 每個 test case 註明 source：[spec 第 X 段] 或 [signature 推導] 或 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：mock 太多會降測試價值，但不 mock 又會把 unit 變 integration、CI 變慢 5x）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造（例：spec 沒寫錯誤訊息文案就標 TODO，不要編一個）。
4. 必須涵蓋：happy path / boundary / error path / null & empty / concurrency（若 stateful）/ idempotency（若有副作用）。
5. Out of scope 至少 3 條，明寫不測什麼（例：不測 wiring code、不測 third-party library 內部、不做 UI snapshot test）。
6. 每個 test case 標 confidence: [H/M/L]，L 必須附說明（例：邊界值不確定就標 L 並列「需要 spec 確認」）。
7. mocking_strategy 必須說明「mock 什麼、不 mock 什麼、為何」 — 預設不 mock 同 module 內 pure function。
</rules>

<output_schema>
targets:
  - kind: function | class | module
    name: <fully qualified name>
    signature: <type signature>
    public_api: true | false
    source: <input ref>

test_cases:
  - id: TC-001
    target: <ref to targets[].name>
    category: happy | boundary | error | null_empty | concurrency | idempotency
    input: <inline value 或 generator spec>
    expected_output: <value / exception type / side effect>
    edge_rationale: <為何是 edge>
    source: <input ref>
    confidence: H | M | L

mocking_strategy:
  mock: [<external IO / time / random / network>]
  do_not_mock: [<same-module pure function>, <value object>]
  rationale: <為何此邊界>
  source: <input ref>

coverage_target:
  line: <e.g. 80%>
  branch: <e.g. 75%>
  mutation_kill: <e.g. 60% — 比 line 更有意義>
  rationale: <為何此值，不是隨便填 80>

performance_assertions:
  has_perf_test: true | false
  p99_latency_budget: <e.g. 10ms or N/A>
  rationale: <為何需要 / 不需要>

mutation_test_score:
  tool: Stryker | PIT | mutmut | N/A
  target_score: <0-100>
  known_survivors: [<TODO(尚未跑過)>]

decision_log:
  - decision: <如：用 property-based testing 取代窮舉 boundary>
    options_considered: [enumerated, property_based, fuzzing]
    chosen: property_based
    rejected_reason:
      enumerated: <why not>
      fuzzing: <why not>
    confidence: H | M | L

out_of_scope:
  - 不測純 wiring code / setter / getter
  - 不測 third-party library 內部行為（只測整合邊界）
  - 不做 UI snapshot test（屬 component test 層級）
</output_schema>

<thinking>
產出前先：
1. 從 signature + spec 抓 3-5 個分支點（if / switch / 例外 / 邊界條件），分別標 H/M/L confidence
2. 列至少 2 條 viable mocking 策略（嚴格隔離 vs 輕度 mock），各自負面後果
3. 列你做了但 input 沒明說的假設（例如假設輸入永遠非 null）
4. 確認 6 類 case（happy/boundary/error/null/concurrency/idempotency）都被檢視
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 test case confidence < H？是因為 spec 模糊還是 signature 不明？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是更完整的 spec 還是 production error log？為什麼？
</verify>
```

回審重點：human 判斷 mock 邊界是否合理、coverage 目標是否真的對應業務風險、edge case 是否漏掉 production 已知的失敗模式。
