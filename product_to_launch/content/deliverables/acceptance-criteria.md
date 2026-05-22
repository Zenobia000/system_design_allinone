---
title: "Acceptance Criteria · 驗收條件"
slug: "acceptance-criteria"
stage: "define"
roles: ["po", "qa"]
order: 12
hook: "讓「做完了」這句話有客觀證據"
when_to_use: "每個 user story 進 sprint 前必備"
ai_leverage: "用 Claude 從 user story → Given/When/Then 驗收 + edge case"
art: "/generated/stage-define.png"
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

把 user story + PRD section + NFR 規格丟給 AI 反推 Given/When/Then + edge case + security 限制，人工只審 edge case 是否真實、是否漏掉 audit 要求。

```prompt-quick
你是有 7+ 年自動化測試經驗的資深 QA lead（熟悉 test pyramid、contract testing、chaos engineering）。任務：把 user story + PRD section + NFR 轉成 acceptance criteria（YAML 格式）。

<input>
[User story]
[PRD section（含 NFR）]
[既有 test data / mock 清單]
</input>

輸出 schema：criteria[] (Given/When/Then) / happy_path / edge_cases（≥3）/ error_handling / performance_thresholds / security_constraints / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；edge case 必須真實可觸發；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年自動化測試經驗的資深 QA lead，熟悉 test pyramid、contract testing、chaos engineering、WCAG 2.2 a11y、OWASP top 10。
你的輸出會交給 Dev（自測 + TDD）、QA（寫 e2e / contract test）、PO（sprint review 驗收）、Audit（合規留痕）。
他們需要直接把你的 Given/When/Then 轉成自動化測試碼，所以條件必須機械可驗證、無主觀字眼。
</role>

<context>
每個 user story 進 sprint 前必備；每個 epic gate review 前必檢。
本卡核心問題：讓「做完了」這句話有客觀證據，誰看都一樣，不靠主觀感受。
</context>

<task>
根據以下 input 產出「Acceptance Criteria · 驗收條件」draft，含 happy path + edge case + NFR + security 限制。
</task>

<input>
[User story（含 persona / action / benefit）]
[PRD section（含 functional reqs / NFR / 合規要求）]
[既有 test data / mock / 第三方 sandbox 清單]
</input>

<rules>
1. 每條 criterion 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. 必須 Given/When/Then 三段，無主觀字眼（禁止「順、好用、合理」）；若用主觀字眼負面後果是 QA 無法寫測試、永遠扯皮。
3. Edge cases 至少 3 條，必須涵蓋：空值 / 超大值 / 並發 / 權限不足 / 網路斷線 / 第三方逾時 至少 3 類。
4. Error handling 必須明定：error code / 使用者訊息 / log 級別 / retry policy。
5. NFR 必須涵蓋 performance threshold（p95 latency / throughput）+ a11y（WCAG 2.2 level）+ security（input 驗證 / authZ / data classification）+ audit（log retention）。
6. 標 confidence: [H/M/L]；L 必須附「需要什麼資料補上」。
7. Out of scope 至少 3 條（例：跨 story 整合測試走 e2e suite、效能壓測走 perf budget、安全滲透測試走 security review）。
</rules>

<output_schema>
criteria:
  - id: AC-001
    type: enum[happy_path, edge_case, error_path, nfr_perf, nfr_a11y, nfr_security, nfr_audit]
    given: <初始狀態 + 資料 + 環境>
    when: <觸發動作 + 輸入>
    then: <可驗證的結果 + 資料變化 + 副作用>
    mockable: bool
    third_party_dependencies: [<API / sandbox name>]
    source: <input ref>
    confidence: H | M | L

happy_path:
  count: <≥ 2>
  ac_ids: [<AC-id>]

edge_cases:
  count: <≥ 3>
  categories_covered: [empty, oversize, concurrency, perm_denied, network_failure, third_party_timeout]
  ac_ids: [<AC-id>]

error_handling:
  - trigger: <例：使用者輸入無效 email>
    error_code: <例：VAL-001>
    user_message: <i18n key + 範例文案>
    log_level: enum[debug, info, warn, error]
    retry_policy: enum[none, immediate, exponential_backoff]
    source: <input ref>

performance_thresholds:
  p50_latency: <ms + 量測點>
  p95_latency: <ms + 量測點>
  throughput: <rps>
  source: <PRD NFR ref>

security_constraints:
  input_validation: [<規則>]
  authz_rules: [<who can do what>]
  data_classification: enum[public, internal, confidential, restricted]
  audit_log_fields: [<必記錄欄位>]
  audit_retention: <時間 + 合規依據>

decision_log:
  - decision: <例：為何 edge case A 拆成兩條而非合併>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <為何不選>
      C: <為何不選>
    confidence: H | M | L

out_of_scope:
  - <本卡不含 thing 1，例：跨 story 整合測試>
  - <本卡不含 thing 2，例：效能壓測完整 plan>
  - <本卡不含 thing 3，例：安全滲透測試>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（user story 的 benefit 對應的可量測訊號 / NFR 數字 / 合規條款），標 H/M/L confidence
2. 列至少 2 條 viable AC 切法（按 user flow 切 vs 按 system response 切），各自負面後果（按 flow 切會漏掉 NFR；按 system 切會 demo 不順）
3. 列你做了但 input 沒明說的假設（既有 mock 可用、第三方 sandbox 穩定、log infra 已備）
4. 確認每條 AC 都能被自動化測試碼直接消費
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪條 AC 含主觀字眼或無法機械驗證？列出來與改寫建議。
2. 哪些假設來自我而非 input（特別是 mock / 第三方 sandbox）？標出來。
3. 如果只能再追加一份 input（NFR 數字 / 合規條款全文 / 既有 mock 清單），哪一份對 AC 品質提升最大？
</verify>
```

回審重點：edge case 是否真實存在（不是湊數）、acceptance 是否可被自動化測試、NFR 與 security 是否完整、audit log 欄位是否符合合規要求。
