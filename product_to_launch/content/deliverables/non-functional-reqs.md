---
title: "非功能需求 · NFR"
slug: "non-functional-reqs"
stage: "design"
roles: ["architect", "sa"]
order: 30
hook: "把『要很快、要很穩』改寫成可驗收的數字"
when_to_use: "功能規格已寫，但延遲、容量、可用性、安全還只是形容詞"
ai_leverage: "用 Claude 把 PRD 形容詞轉成 SLI/SLO/threshold 候選"
art: "/generated/stage-design.webp"
source: "software_architect/ppt/05-ilities, ISO/IEC/IEEE 29148"
---

## 解決什麼問題

功能對了不代表上線後能活。NFR 把效能、可靠性、安全、可維運、合規寫成可量測條件，是 ADR 與 Capacity Plan 的輸入。

## 誰負責、和誰對接

- **主責：** Architect + SA
- **協作：** PM 對齊 business impact、SRE 對齊可達成性
- **下游收件：** Dev、QA、DevOps

## 何時用、何時不用

- ✅ **必要時機：** 新服務上線、SLA 對外承諾、跨系統依賴
- ❌ **不需要時：** 一次性工具、無使用者依賴
- ⚠️ **常見誤用：** 抄業界數字無證據；NFR 沒有對應測試與監控

## AI 怎麼加速

把 PRD 形容詞丟給 AI 轉成 SLI/SLO/threshold 候選，人類砍不可達或無意義的。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 software architect（熟悉 SLO / WCAG 2.2 / SOC 2 / GDPR / ISO 27001 / observability）。任務：把 PRD 形容詞轉成 NFR 矩陣（YAML 格式）。

<input>
[PRD（含模糊承諾如「要很快」「要很穩」）]
[Business impact / SLA 對外承諾]
[既有 NFR / 平台基線]
</input>

輸出 schema：latency_targets（p50/p95/p99） / availability_slo / scalability（rps/concurrent users） / security_classification / compliance_obligations（GDPR/SOC2/PCI/HIPAA/ISO 27001） / a11y（WCAG 2.2 AA） / observability_requirements / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不抄業界數字。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 10+ 年分散式系統經驗的資深 software architect / SRE，熟悉 SLO / SLI / error budget、WCAG 2.2、SOC 2、GDPR、HIPAA、PCI DSS、ISO 27001、observability、ISO/IEC/IEEE 29148。
你的輸出會交給 Dev（實作目標）、QA（寫驗收測試）、SRE（設 alert 與 SLO dashboard）、Compliance（合規稽核）。
他們需要每條 NFR 都可量測、可測試、可監控；模糊形容詞會被退件。
</role>

<context>
功能規格已寫，但延遲、容量、可用性、安全還只是形容詞時用本 NFR。
本卡核心問題：把「要很快、要很穩」改寫成可驗收的數字，是 ADR 與 Capacity Plan 的輸入。
</context>

<input>
[PRD（含模糊承諾、business impact、user journey）]
[Business impact / SLA 對外承諾 / penalty clause]
[既有 NFR / 平台基線 / 競品 baseline]
</input>

<rules>
1. 每條 NFR 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：p95 < 100ms 則犧牲 cost — 需 over-provision 或 CDN edge）。
3. 缺資料的欄位標 TODO(缺什麼)，不要抄業界數字（例：別寫「99.99% 因為大家都這樣寫」）。
4. 合規 / a11y / security 必須涵蓋：GDPR / SOC 2 / PCI / HIPAA / ISO 27001 / WCAG 2.2 AA（任一不適用要說明原因）。
5. Out of scope 至少 3 條（例：第三方依賴 SLA、災難復原 RPO/RTO、客戶端 a11y 不在本卡）。
6. 每條 NFR 標 confidence: [H/M/L]，L 必須附說明。
7. 每條 NFR 必含可量測 SLI + 目標 SLO + 量測方法 + 測試方式（缺一不可）。
</rules>

<output_schema>
latency_targets:
  api_p50: <ms + 為何此值>
  api_p95: <ms + 為何此值>
  api_p99: <ms + 為何此值>
  page_load_p75: <ms (Core Web Vitals LCP)>
  measurement: <e.g. real user monitoring + synthetic>
  source: <input ref>
  confidence: H | M | L

availability_slo:
  target: <e.g. 99.9% rolling 28-day>
  error_budget: <derived>
  scope: <which endpoints / journeys>
  measurement: <SLI definition>
  source: <input ref>

scalability:
  baseline_rps: <number>
  peak_rps: <number + 來源>
  concurrent_users: <number>
  scale_strategy: <horizontal | vertical | both>
  trade_off: <負面後果>

security_classification:
  data_classes: [PII, PCI, internal, public]
  threat_baseline: <ref threat-model>
  encryption: <at-rest + in-transit>
  confidence: H | M | L

compliance_obligations:
  gdpr: <條款 + 對應控制 | N/A + 原因>
  soc2: <trust criteria + 對應控制 | N/A + 原因>
  pci: <requirement + 對應控制 | N/A + 原因>
  hipaa: <safeguard + 對應控制 | N/A + 原因>
  iso_27001: <annex A control + 對應控制 | N/A + 原因>

a11y:
  level: WCAG 2.2 AA
  scope: <web / mobile / both>
  testing: <e.g. axe-core CI + manual screen reader pass>

observability_requirements:
  metrics: [<SLI 1>, <SLI 2>]
  logs: <retention + classification>
  traces: <sampling rate + retention>
  alerting: <SLO-based burn rate>

decision_log:
  - decision: <e.g. 為何選 99.9% 而非 99.99%>
    options_considered: [A, B, C]
    chosen: A
    rejected_reason:
      B: <why not, 含 cost / complexity>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - 第三方依賴 SLA（由 vendor management 處理）
  - 災難復原 RPO/RTO 由 DR plan 卡處理
  - 客戶端 a11y（瀏覽器/作業系統層）不在本卡
</output_schema>

<thinking>
產出前先：
1. 從 PRD 抓 3-5 句模糊承諾，逐一改寫為可量測 SLI 候選並標 H/M/L confidence
2. 列至少 2 條 viable SLO 路徑（aggressive vs conservative），各自負面後果（cost / dev effort）
3. 列你做了但 input 沒明說的假設（例：假設目標市場無 HIPAA、假設僅 web）
4. 確認 latency / availability / scalability / security / compliance / a11y / observability 七象限都涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪條 NFR confidence < H？列出來與所需補充資料。
2. 哪些 threshold 是抄業界而非來自 input？標出來。
3. 如果只能再追加一份 input（例：實際 traffic profile），是哪一份？為什麼？
</verify>
```

回審重點：human 判斷 trade-off 與閾值、threshold 不能抄業界、NFR 必須對應監控與測試。
