---
title: "SRS · 系統需求規格"
slug: "srs"
stage: "define"
roles: ["ba", "sa"]
order: 13
hook: "把業務需求翻成系統可實作的規格"
when_to_use: "跨系統整合、合規/稽核產業、需 RFP 對外發包時"
ai_leverage: "用 Claude 把 PRD + business rules → use case + 規則表"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 講「為什麼做、要做什麼」；但工程師動手前還欠一層：**系統具體該有哪些行為、哪些規則、哪些介面**。
沒有 SRS，BA 的口頭規則隨時間散失、SA 的系統假設藏在腦中、QA 拿不到完整 test 來源。
SRS 把這些寫成**可追溯、可驗收、可對外發包的規格**。

## 誰負責、和誰對接

- **主責：** BA（業務規則）/ SA（系統行為）
- **協作：** PM（驗證對齊 PRD）、Architect（評估技術影響）、QA（驗收條件）
- **下游收件：** Architect 做 ADR、Dev 寫 code、QA 寫 test plan、稽核留檔

## 何時用、何時不用

- ✅ **必要時機：** 金融/醫療/政府合規產業、跨系統整合 ≥ 3 個、需對外 RFP
- ❌ **不需要時：** 小團隊 lean startup、純前端 UI 改版、內部工具 < 5 人用
- ⚠️ **常見誤用：** 把 SRS 寫成 PRD 的複製貼上（缺系統行為層）；ISO/IEC/IEEE 29148 強調 SRS 必須包含 **functional + non-functional + interface + data + constraints**

## AI 怎麼加速

把 PRD + business rule catalog + 上下游系統清單丟給 AI 產 SRS draft（use case + 規則表 + NFR），人工只審追溯性與合規完整。

```prompt-quick
你是有 7+ 年系統分析經驗的資深 SA（熟悉 BPMN、UML、規格拆解、ISO/IEC/IEEE 29148）。任務：把 PRD + business rules + 上下游系統清單轉成 SRS draft（YAML 格式）。

<input>
[PRD]
[Business rule catalog]
[上下游系統清單 / API spec]
</input>

輸出 schema：use_cases[]（actor/precondition/main flow/alt flow/postcondition）/ system_constraints / external_interfaces / data_requirements / traceability_to_prd / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；每條規格必含 PRD 反向追溯 ID；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年系統分析經驗的資深 SA，熟悉 BPMN、UML、規格拆解、ISO/IEC/IEEE 29148、合規產業（金融 / 醫療 / 政府）需求拆解、RFP 撰寫。
你的輸出會交給 Architect（做 ADR 與 C4 design）、Dev（實作系統行為）、QA（寫 test plan）、Audit / 稽核（合規留檔）、外包廠商（依 RFP 報價）。
他們需要從 SRS 直接做 ADR 與 RFP，所以每條規格必須可追溯、可驗收、無含糊字眼。
</role>

<context>
金融/醫療/政府合規產業、跨系統整合 ≥ 3 個、需對外 RFP 時用本 SRS。
本卡核心問題：把業務需求翻成系統可實作、可追溯、可對外發包的規格，符合 ISO 29148 的 functional + non-functional + interface + data + constraints 五大要件。
</context>

<task>
根據以下 input 產出「SRS · 系統需求規格」draft，含 use case + 規則表 + 介面 + NFR + 可追溯性。
</task>

<input>
[PRD（含 functional reqs / NFR / 合規依據）]
[Business rule catalog（含 rule ID / source / priority / exception）]
[上下游系統清單 / 既有 API spec / data exchange contract]
</input>

<rules>
1. 每條 SRS 規格註明 source：[input 第 X 段] + PRD 反向追溯 ID；無法歸因者標 [來源未明示，需確認]。
2. Use case 必含 actor / precondition / main flow / alt flow / exception / postcondition；缺任一視為 fail（負面後果：QA 無法寫完整 test、稽核無法判定完整性）。
3. NFR 必須涵蓋 latency / availability / security / audit / a11y 五象限，任一象限沒提到要說明為何不適用。
4. External interface 必含 protocol / auth / rate limit / failure mode / SLA。
5. 合規欄位必標依據（GDPR Art X / SOC 2 CC Y / 金管會函釋 Z）+ 保留期 + 刪除政策。
6. 標 confidence: [H/M/L]；L 必須附「為何不確定、需要什麼補上」。
7. Out of scope 至少 3 條（例：UI/UX 細節走 UX 卡、技術選型走 ADR、效能調校走 architect 卡）。
</rules>

<output_schema>
use_cases:
  - id: UC-001
    name: <use case name>
    actor: <primary / secondary>
    precondition: <state + data>
    main_flow:
      - step: <numbered step>
        actor_action: <what>
        system_response: <what>
    alt_flow:
      - condition: <when>
        steps: [<step>]
    exception_flow:
      - trigger: <when>
        handling: <how>
    postcondition: <state + data + side effect>
    traceability:
      prd_ref: <PRD section / FR-id>
      business_rule_refs: [<BR-id>]
    source: <input ref>
    confidence: H | M | L

system_constraints:
  technology_constraints: [<例：必須相容 IE11、必須跑在 on-prem K8s>]
  regulatory_constraints: [<法規條款>]
  business_constraints: [<預算 / 時程 / 既有合約>]
  source: <input ref>

external_interfaces:
  - api_id: EXT-001
    counterparty: <system / vendor>
    protocol: enum[REST, gRPC, SOAP, file, MQ, webhook]
    auth: enum[oauth2, mtls, api_key, hmac]
    rate_limit: <rps>
    sla: <availability % + latency>
    failure_mode: <degraded / fail-fast / fallback>
    data_classification: enum[public, internal, confidential, restricted]
    source: <input ref>

data_requirements:
  entities:
    - name: <entity>
      attributes: [<name + type + required + classification>]
      retention: <period + 合規依據>
      deletion_policy: <hard delete / anonymize / archive>
  data_quality_slo: <completeness / freshness / accuracy>

traceability_to_prd:
  matrix:
    - prd_id: <PRD ref>
      srs_ids: [<UC-id / NFR-id>]
      coverage: enum[full, partial, gap]
    - prd_id: <PRD ref>
      srs_ids: [<…>]
  gaps: [<PRD 有但 SRS 未覆蓋的項目>]

decision_log:
  - decision: <例：為何 UC-A 用同步而非事件驅動>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <為何不選>
      C: <為何不選>
    confidence: H | M | L

out_of_scope:
  - <本 SRS 不含 thing 1，例：UI mockup>
  - <本 SRS 不含 thing 2，例：技術選型走 ADR>
  - <本 SRS 不含 thing 3，例：效能調校細節>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（PRD 模糊處、跨系統介面風險、合規條款明確要求），標 H/M/L confidence
2. 列至少 2 條 viable 規格切法（按 use case 切 vs 按系統元件切），各自負面後果（按 use case 切會跨系統職責不清；按元件切會 actor 視角缺）
3. 列你做了但 input 沒明說的假設（上游 API 穩定性、合規最新版本、既有資料品質）
4. 確認 NFR 五象限與 traceability matrix 全覆蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪條規格無法追溯到 PRD？列出 gap 與所需釐清。
2. 哪些假設來自我而非 input（特別是合規版本 / 上游穩定性）？標出來。
3. 如果只能再追加一份 input（合規條款全文 / 上游 SLA / 既有資料 profiling），哪一份對 SRS 品質提升最大？
</verify>
```

回審重點：規則是否有 ID 可追溯、exception 是否完整、是否與 PRD 衝突、NFR 五象限是否齊全、合規依據是否誠實標出版本。
