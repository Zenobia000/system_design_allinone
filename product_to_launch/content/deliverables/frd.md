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

把 PRD section + business rule catalog + 既有 data model 丟給 AI 產 FRD 功能表 + 規則樹，人工只審規則完整性與錯誤情境涵蓋。

```prompt-quick
你是有 5+ 年企業系統經驗的資深 BA（熟悉 BPMN、規則引擎、合規需求拆解）。任務：把 PRD section + business rules + data model 轉成 FRD（YAML 格式）。

<input>
[PRD section]
[Business rule catalog]
[既有 data model / 欄位字典]
</input>

輸出 schema：functional_modules[] / business_rules（含決策樹/規則表）/ data_flows / integration_points / exception_handling / change_policy / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；欄位必標 型別 / required / 驗證規則；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年企業系統經驗的資深 BA，熟悉 BPMN、DMN 規則引擎、合規需求拆解（GDPR / SOC 2 / PCI / 金管會）、data dictionary。
你的輸出會交給 Dev（實作每個功能模組）、QA（依規則表寫 test）、SA（評估技術影響）、UX（補空狀態與錯誤訊息文案）。
他們需要在 sprint 中不必回頭問「這欄位驗證規則是？」「這狀態下要顯示什麼？」，所以 FRD 必須條目化、可機械消費。
</role>

<context>
PRD 含 ≥ 5 個獨立功能、跨團隊交付、外包開發、合規/稽核產業時用本 FRD。
本卡核心問題：把 PRD 的 what 拆解成每個功能的精細規格（input / output / 規則 / 錯誤 / 相依），讓工程不必猜。
</context>

<task>
根據以下 input 產出「FRD · 功能需求文件」draft，含功能模組表 + 規則樹 + change policy。
</task>

<input>
[PRD section（含 functional reqs / NFR）]
[Business rule catalog（含 rule ID / text / source / priority / exception）]
[既有 data model / 欄位字典 / 上下游 API spec]
</input>

<rules>
1. 每條規格註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. 每個欄位必含 type / required / 驗證規則 / 預設值 / 範例；缺任一視為 fail。
3. Business rule 必須有 rule ID（可追溯 catalog）+ 觸發條件 + 動作 + exception 處理。
4. Exception handling 必須涵蓋：input 違規 / 上游無回應 / 並發衝突 / 權限不足 至少 3 類。
5. 合規欄位（個資 / 金流 / 醫療）必須標 data classification + 保留期 + 刪除政策。
6. Change policy：哪些變更需 PM 簽核、哪些 BA 可自決，避免變更失控。
7. Out of scope 至少 3 條（例：UI mockup 走 UX 卡、API spec 走 SA 卡、效能調校走 architect 卡）。
</rules>

<output_schema>
functional_modules:
  - id: FN-001
    name: <module name>
    description: <一句話>
    input_fields:
      - name: <field>
        type: enum[string, int, decimal, date, enum, ref]
        required: bool
        validation: <regex / range / 業務規則 ID>
        default: <value or null>
        source: <input ref>
    output_fields:
      success: [<field + type>]
      error: [<error_code + message + retryable>]
    processing_rules: [<rule ID refs>]
    dependencies:
      upstream: [<system + API>]
      downstream: [<system + event>]
      data: [<table / topic>]
    acceptance_criteria: [<AC-id>]
    source: <input ref>
    confidence: H | M | L

business_rules:
  - id: BR-001
    statement: <when X then Y else Z>
    decision_table: <可選的 row/column 表>
    exceptions: [<exception case>]
    priority: enum[must, should, may]
    compliance_basis: <法規 / 合約條款>
    source: <input ref>

data_flows:
  - flow_id: DF-001
    source_system: <system>
    target_system: <system>
    trigger: <event>
    payload_schema_ref: <link>
    sla: <latency / freshness>

integration_points:
  - api_id: API-001
    method: enum[GET, POST, PUT, DELETE, EVENT]
    auth: enum[oauth2, api_key, mtls, none]
    rate_limit: <rps>
    failure_mode: <degraded / fail-fast / fallback>

exception_handling:
  - scenario: enum[input_invalid, upstream_timeout, concurrency_conflict, perm_denied]
    user_message: <i18n key>
    log_level: enum[warn, error]
    alert: bool
    source: <input ref>

change_policy:
  ba_self_approve: [<變更類型，如：error message 文案>]
  needs_pm_signoff: [<變更類型，如：必填欄位增減>]
  needs_architect_review: [<變更類型，如：跨系統 API 改動>]

decision_log:
  - decision: <例：為何欄位 X 設為 required>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <為何不選>
      C: <為何不選>
    confidence: H | M | L

out_of_scope:
  - <本 FRD 不含 thing 1，例：UI mockup>
  - <本 FRD 不含 thing 2，例：API 詳細 schema 走 SA 卡>
  - <本 FRD 不含 thing 3，例：效能調校細節>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（PRD 中模糊的功能描述、business rule 中互斥的規則、data model 中可能引發 race condition 的欄位），標 H/M/L confidence
2. 列至少 2 條 viable 拆解策略（按 user-facing 功能切 vs 按系統模組切），各自負面後果（按功能切會跨系統難對齊；按系統切會 user demo 缺脈絡）
3. 列你做了但 input 沒明說的假設（既有欄位精度、上游 API 穩定性、合規分類）
4. 確認每個功能都有完整 input/output/規則/錯誤/相依五元組
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位驗證規則或 exception 處理缺資料？列出 TODO 與所需補上。
2. 哪些假設來自我而非 input（特別是合規分類 / 上游穩定性）？標出來。
3. 如果只能再追加一份 input（合規條款全文 / 上游 API spec / 既有欄位字典），哪一份對 FRD 品質提升最大？
</verify>
```

回審重點：欄位驗證規則是否完整、錯誤情境是否涵蓋、與 PRD 一致性、合規分類是否誠實標出。
