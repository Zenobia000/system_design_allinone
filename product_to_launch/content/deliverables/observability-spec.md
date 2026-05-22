---
title: "Observability Spec · 可觀測規格"
slug: "observability-spec"
stage: "operate"
roles: ["devops", "architect"]
order: 49
hook: "上線前先決定『出事時要看什麼』"
when_to_use: "新服務、新模組、或現有服務告警靠人腦補時"
ai_leverage: "用 Claude 從 SLO 與系統圖反推所需 metric/log/trace"
art: "/generated/stage-operate.webp"
source: "software_architect/ppt/05-ilities §Observability, Google SRE"
---

## 解決什麼問題

出事時最痛苦的是沒資料。Observability Spec 在設計階段就決定要產生哪些 metric、log、trace、event，及它們如何回答「使用者受到什麼影響」。

## 誰負責、和誰對接

- **主責：** Architect + DevOps
- **協作：** Dev 實作埋點、SRE 設儀表板
- **下游收件：** SLO、Runbook、Incident Report

## 何時用、何時不用

- ✅ **必要時機：** 新服務、新關鍵路徑、SLO 無法量測時
- ❌ **不需要時：** 短命腳本、無使用者依賴
- ⚠️ **常見誤用：** 只埋 server-side metric；log 沒結構化；trace 缺 user id

## AI 怎麼加速

把 SLO + journey + service map 餵給 Claude 反推埋點清單與 cardinality budget，Architect 與 SRE 審 sampling 與 PII。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 architect（熟悉 SLO/SLI、OpenTelemetry、cardinality budget、GDPR PII redaction）。任務：把 SLO + user journey + service map 轉成 observability spec（YAML 格式）。

<input>
[SLO 定義（含 SLI 量測點）]
[User journey map（含 critical path）]
[Service map / 依賴圖]
</input>

輸出 schema：signals_required / cardinality_budget / retention_per_tier / alert_rules / dashboards / sampling_strategy / pii_redaction_rules / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；每個 metric 必須註明 label cardinality 上限。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 10+ 年分散式系統經驗的資深 architect，熟悉 SLO/SLI、OpenTelemetry / Prometheus / Jaeger、cardinality budget、log structuring、tracing span model、GDPR / HIPAA PII redaction、log retention compliance (SOC 2)。
你的輸出會交給 Dev（實作埋點）、SRE（設儀表板與告警）、Security（驗證 PII 處理）、Finance（估觀測成本）。
他們需要可實作、可成本估算、可合規稽核的規格，所以 cardinality 與 retention 必須有上限。
</role>

<context>
新服務、新關鍵路徑、或現有服務告警靠人腦補時用本卡。
本卡核心問題：在設計階段就決定要產生哪些 metric / log / trace / event，及它們如何回答「使用者受到什麼影響」。
</context>

<input>
[SLO 定義（含 SLI 量測點）]
[User journey map（含 critical path）]
[Service map / 依賴圖]
[資料分類表（PII / sensitive 欄位）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：高 cardinality label 會讓 metric 儲存成本上升 X 倍但 debug 效率提升 Y）。
3. 缺資料寫 TODO(缺什麼)，不要編造；無 PII 分類資料時寫 TODO，不要假設可採集。
4. SLO compliance：每個 SLI 必須有對應 metric；NFR 含 GDPR (right to erasure)、HIPAA、PCI、SOC 2 log retention（不少於 12 個月 audit log）、cardinality 上限。
5. Out of scope：明列 3 條（例如：個別 dashboard 視覺設計、告警通知 routing 政策、log query 語法教學）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 每個 metric 必須標 label 與 cardinality 估算（≤ 10k unique series per metric 預設上限）。
</rules>

<output_schema>
signals_required:
  - service: <name>
    metrics:
      - name: <e.g. http_request_duration_seconds>
        type: enum[counter, gauge, histogram, summary]
        labels: [<label1>, <label2>]
        cardinality_estimate: <e.g. 500>
        unit: <e.g. seconds>
        sli_ref: <SLI-001 if any>
        source: <input ref>
        confidence: H | M | L
    logs:
      - event: <e.g. checkout_failed>
        fields: [user_id_hash, order_id, error_code, latency_ms]
        pii_handling: <hash | redact | drop>
        retention_tier: <hot | warm | cold>
    traces:
      - span: <e.g. db.query.checkout>
        attributes: [db.statement_truncated, db.rows_examined]
        parent_span: <upstream span>

cardinality_budget:
  per_metric_max: 10000
  per_service_max: 100000
  enforcement: <reject_on_ingest | sample | alert>

retention_per_tier:
  hot: <e.g. 14d>
  warm: <e.g. 90d>
  cold: <e.g. 13 months (SOC 2 audit)>

alert_rules:
  - name: <e.g. slo_burn_fast>
    expression: <PromQL or equivalent>
    threshold: <number>
    duration: <e.g. 5m>
    slo_link: <SLI-001>
    severity: enum[SEV1, SEV2, SEV3]
    runbook_ref: <link>

dashboards:
  - name: <e.g. checkout-overview>
    panels: [<panel>, ...]
    audience: enum[oncall, exec, owner]

sampling_strategy:
  traces: <e.g. head-based 1%, tail-based 100% for error>
  logs: <full retention for ERROR, sample 10% for INFO>
  rationale: <why this trade-off>

pii_redaction_rules:
  - field: <e.g. email>
    rule: <hash with HMAC-SHA256>
    compliance_basis: <GDPR Art. 32>
  - field: <e.g. credit_card>
    rule: <drop entirely>
    compliance_basis: <PCI DSS>

decision_log:
  - decision: <e.g. trace sampling 1% vs 10%>
    options_considered: [1%, 10%, 100%]
    chosen: 1%-head + 100%-tail-on-error
    rejected_reason:
      "10%": <太貴, X% cost increase>
      "100%": <違反 cardinality budget>
    confidence: H | M | L

out_of_scope:
  - 個別 dashboard 視覺設計（屬 SRE 自由決定）
  - 告警通知 routing 政策（屬 on-call rotation）
  - log query 語法教學（屬 enablement）
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最痛 SLI 缺埋點、最高 cardinality 風險、最敏感 PII 欄位）各標 H/M/L confidence
2. 列至少 2 條 sampling 路徑（aggressive 省成本 vs conservative 保留 debug 力）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如資料分類、log volume 預估）
4. 確認 GDPR / HIPAA / PCI / SOC 2 四象限合規涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如歷史 cardinality 報表、PII 資料分類表），是哪一份？為什麼？
</verify>
```

回審重點：human 判斷 cardinality 是否會炸成本、PII 處理是否通過合規、sampling 是否會犧牲 debug 力、retention 是否符合合規。
