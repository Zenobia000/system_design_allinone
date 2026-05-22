---
title: "Capacity Planning · 容量規劃"
slug: "capacity-planning"
stage: "operate"
roles: ["devops", "architect"]
order: 51
hook: "在洪峰來臨前先把『撐不撐得住』算清楚"
when_to_use: "預期流量成長、季節性活動、或硬體/雲端預算規劃時"
ai_leverage: "用 Claude 從歷史 metric 推導成長曲線與 headroom"
art: "/generated/stage-operate.png"
source: "Google SRE Workbook, AWS Builders' Library"
---

## 解決什麼問題

擴容靠經驗很貴。Capacity Planning 用歷史 SLI、業務預估、單位成本，把「需要幾台、何時加、加哪一層」變成可審查決策。

## 誰負責、和誰對接

- **主責：** DevOps / SRE + Architect
- **協作：** PO 提供業務預估、Finance 對齊預算
- **下游收件：** Cost Monitor、ADR（擴容策略）、Release Plan

## 何時用、何時不用

- ✅ **必要時機：** 流量成長 ≥ 20%、季節活動、新區域擴展
- ❌ **不需要時：** 流量穩定、autoscaling 已足夠
- ⚠️ **常見誤用：** 只看 CPU；忽略 DB/queue/external quota；無 headroom 假設

## AI 怎麼加速

把歷史 metric + 業務預估 + 架構圖餵給 Claude 抽成長曲線與瓶頸候選，Architect 與 SRE 審 trigger 與 cost envelope。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 architect（熟悉 SLO、Google SRE Workbook、AWS Builders' Library、容量數學）。任務：把歷史 metric + 業務預估 + 架構圖轉成 capacity planning（YAML 格式）。

<input>
[歷史 metric（CPU / RAM / IO / DB / queue 過去 ≥ 6 個月）]
[業務預估（流量成長 / 季節活動 / 新區域）]
[架構圖（含上下游依賴與外部 quota）]
</input>

輸出 schema：forecast_horizon / growth_model / headroom_per_resource / scaling_triggers / bottleneck_candidates / cost_envelope / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；headroom 必須 ≥ 30% 給洪峰緩衝。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 10+ 年分散式系統經驗的資深 architect / capacity planner，熟悉 SLO/SLI、Google SRE Workbook 第 18 章 capacity planning、AWS Builders' Library、Little's Law、queueing theory、Reserved Instance / Savings Plan 數學。
你的輸出會交給 SRE（執行擴容）、PO（驗業務預估）、Finance（核 cost envelope）、Architect（修架構瓶頸）。
他們需要可審查的成長外推、瓶頸辨識、決策時點，所以每個 headroom 數字必須附公式與假設。
</role>

<context>
預期流量成長、季節性活動、或硬體 / 雲端預算規劃時用本卡。
本卡核心問題：用歷史 SLI + 業務預估 + 單位成本，把「需要幾台、何時加、加哪一層」變成可審查決策。
</context>

<input>
[歷史 metric（CPU / RAM / IO / DB / queue 過去 ≥ 6 個月）]
[業務預估（流量成長 / 季節活動 / 新區域）]
[架構圖（含上下游依賴與外部 quota）]
[現有 SLO 與目前 burn rate]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選 over-provision 30% headroom 多花 $X/月，但若洪峰超預期會犧牲 Y SLO）。
3. 缺資料寫 TODO(缺什麼)，不要編造；歷史 < 6 個月寫 TODO(需要更長 baseline)，不要強行外推。
4. SLO compliance：每個 scaling trigger 必須對齊 SLO；NFR 含 headroom ≥ 30%、外部 quota（rate limit / connection limit）、cost forecast 誤差 ≤ 15%、跨 region failover 容量。
5. Out of scope：明列 3 條（例如：架構重寫、容量壓測腳本、合約供應商談判）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 不能只看 CPU；必須涵蓋 CPU / RAM / IO / DB connections / queue depth / external quota 六個維度。
</rules>

<output_schema>
forecast_horizon:
  required: true
  type: enum[3m, 6m, 12m]
  rationale: <e.g. 配合預算週期>

growth_model:
  type: enum[linear, exponential, seasonal, step]
  parameters:
    growth_rate_mom: <number>
    seasonality_peak_multiplier: <e.g. 黑五 ×3.5>
  confidence_interval: <e.g. ±15%>
  source: <input ref>
  confidence: H | M | L

headroom_per_resource:
  - resource: <e.g. checkout-api CPU>
    current_p95_utilization: <e.g. 62%>
    forecast_p95_utilization_at_horizon: <e.g. 88%>
    headroom_target: <e.g. ≥ 30%>
    status: enum[safe, warn, breach]
    source: <input ref>
    confidence: H | M | L
  # 六個維度都要：CPU / RAM / IO / DB conn / queue / external quota

scaling_triggers:
  - resource: <e.g. checkout-api>
    auto_scale_up_at: <e.g. p95 CPU > 70% for 5m>
    auto_scale_down_at: <e.g. p95 CPU < 30% for 30m>
    manual_decision_at: <e.g. forecast headroom < 30%>
    lead_time: <e.g. 4 weeks for hardware order>

bottleneck_candidates:
  - component: <e.g. payment-db connection pool>
    breach_eta: <ISO date or TODO>
    fix_options: [vertical_scale, sharding, connection_pooling]
    cost_to_fix: <number + effort>
    source: <input ref>
    confidence: H | M | L

cost_envelope:
  current_monthly_usd: <number>
  forecast_monthly_at_horizon_usd: <number>
  delta_percent: <number>
  saving_via_RI_SP: <number>
  forecast_error_band: <±15%>

decision_log:
  - decision: <e.g. vertical vs horizontal scale>
    options_considered: [vertical, horizontal, sharding]
    chosen: horizontal
    rejected_reason:
      vertical: <碰到 instance type ceiling>
      sharding: <需要 6m 開發, lead time 不足>
    confidence: H | M | L

out_of_scope:
  - 架構重寫（屬 ADR / Architecture Review）
  - 容量壓測腳本（屬 QA / chaos engineering）
  - 合約供應商談判（屬 Procurement）
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最快撐不住的資源、最高季節性、最不確定的依賴 quota）各標 H/M/L confidence
2. 列至少 2 條 scaling 路徑（autoscaling vs pre-provision）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如業務預估誤差、外部 quota 上限）
4. 確認六個維度 (CPU/RAM/IO/DB/queue/external) 都涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如壓測結果、依賴 quota 文件），是哪一份？為什麼？
</verify>
```

回審重點：human 判斷業務預估是否可信、瓶頸 fix lead time 是否來得及、cost envelope 是否能被 Finance 簽核、外部 quota 是否需要提早申請。
