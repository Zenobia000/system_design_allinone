---
title: "Cost Monitor · 成本監控"
slug: "cost-monitor"
stage: "operate"
roles: ["devops"]
order: 52
hook: "讓雲端帳單變成可歸因、可預警的指標"
when_to_use: "雲端帳單 ≥ 月度預算門檻、或多團隊共用基礎設施"
ai_leverage: "用 Claude 從帳單明細抽異常 spike 與歸因建議"
art: "/generated/stage-operate.webp"
source: "AWS Builders' Library, FinOps Foundation"
---

## 解決什麼問題

雲端成本失控大多不是被攻擊，是某個資源被遺忘。Cost Monitor 把帳單拆到服務 / 環境 / 團隊，並設燃燒率告警與預期 baseline。

## 誰負責、和誰對接

- **主責：** DevOps / FinOps
- **協作：** 各服務 owner、Finance、Architect（架構級成本決策）
- **下游收件：** Capacity Planning、Deprecation Plan、ADR

## 何時用、何時不用

- ✅ **必要時機：** 多服務共用 account、跨團隊預算、預期月度成長
- ❌ **不需要時：** 單人專案、定額預付
- ⚠️ **常見誤用：** 只看總額不分群；無 tag 規範；告警閾值絕對值而非比率

## AI 怎麼加速

把近 30 天帳單 + tag 規範 + 使用量 metric 丟給 Claude 抽 anomaly 與歸因，DevOps 與 owner 審 rightsizing 風險。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 SRE / FinOps 分析師（熟悉 AWS Builders' Library、FinOps Foundation、SOC 2 帳務 audit）。任務：把帳單明細 + tag + 使用量 metric 轉成 cost monitor 報告（YAML 格式）。

## 輸入素材

[近 30 天帳單明細（含 service / region / tag）]
[Tag 規範與覆蓋率報表]
[各服務使用量 metric（CPU / RAM / IO / 流量）]

輸出 schema：cost_per_service / anomaly_detection_method / top_drivers / attribution_tags / savings_candidates / budget_alerts / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；savings 必須附 effort 與 risk。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 7+ 年 SRE 經驗的資深 SRE / FinOps 分析師，熟悉 AWS Builders' Library、FinOps Foundation framework、Reserved Instance / Savings Plan 計算、rightsizing、SOC 2 帳務 audit trail。
你的輸出會交給 服務 owner（決定要不要動）、Architect（架構級成本決策）、Finance（核對預算）、各團隊負責人（被歸因者要回應）。
他們需要可歸因、可決策、有風險評估的 savings 候選，所以每個建議都要附 effort 與 risk。

## 情境脈絡

雲端帳單 ≥ 月度預算門檻、或多團隊共用基礎設施時用本卡。
本卡核心問題：把帳單拆到服務 / 環境 / 團隊，設燃燒率告警與預期 baseline，把「失控成本」變成「可歸因可決策」。

## 輸入素材

[近 30 天帳單明細（含 service / region / tag）]
[Tag 規範與覆蓋率報表]
[各服務使用量 metric（CPU / RAM / IO / 流量）]
[歷史 6-12 個月帳單摘要（季節性 baseline）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認] 或 untagged_bucket。
2. Trade-off 必須列負面後果（例如：rightsizing X 服務省 $Y/月，但若流量回升會觸發 throttling）。
3. 缺資料寫 TODO(缺什麼)，不要編造；anomaly 判定需附歷史 baseline，無歷史寫 TODO。
4. SLO compliance：每個 savings 必須評估對 SLO 的影響（保護 / 中性 / 燃燒風險）；NFR 含 SOC 2 帳務 audit（變更要可追溯）、tag governance、預算 forecast 誤差 ≤ 10%。
5. Out of scope：明列 3 條（例如：合約談判、外部 SaaS 訂閱、跨 cloud 比價）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. Anomaly 用比率而非絕對值（例如 「比 baseline 高 X%」），不能只說「貴」。

## 輸出格式（YAML）

cost_per_service:
  - service: <name>
    monthly_cost_usd: <number>
    mom_delta_percent: <number>
    tag_owner: <team or untagged>
    source: <input ref>
    confidence: H | M | L

anomaly_detection_method:
  baseline: <e.g. trailing 30d median + seasonality adj>
  threshold: <e.g. > 2σ OR > 25% MoM>
  ignore_known_events: [<release X>, <marketing campaign Y>]

top_drivers:
  - service: <name>
    contribution_percent: <e.g. 35% of total>
    growth_driver: <e.g. 流量成長 / log volume / 新 region>
    source: <input ref>

attribution_tags:
  required_tags: [team, feature, env, cost_center]
  current_coverage: <e.g. 78% of cost tagged>
  untagged_bucket_usd: <number + TODO(歸因什麼)>

savings_candidates:
  - candidate: <e.g. rightsize ec2-prod-checkout>
    estimated_saving_usd_month: <number>
    effort: enum[S, M, L]
    risk: enum[low, medium, high]
    risk_reason: <e.g. 若黑五流量回升會 throttle>
    slo_impact: enum[protect, neutral, burn_risk]
    source: <input ref>
    confidence: H | M | L

budget_alerts:
  - alert: <e.g. monthly forecast > budget × 1.1>
    channel: <e.g. slack + email>
    audience: <role>
  - alert: <e.g. untagged_bucket > 10% of total>
    channel: <slack>

decision_log:
  - decision: <e.g. RI 1y vs 3y>
    options_considered: [on-demand, RI-1y, RI-3y, savings-plan]
    chosen: savings-plan
    rejected_reason:
      "RI-3y": <committed 太久, 不確定性高>
      "on-demand": <省太少>
    confidence: H | M | L

out_of_scope:
  - 合約談判（屬 Finance / Procurement）
  - 外部 SaaS 訂閱（屬部門預算）
  - 跨 cloud 比價（屬 platform strategy）

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最大成本 driver、最大 MoM 跳升、最大 untagged bucket）各標 H/M/L confidence
2. 列至少 2 條 savings 路徑（aggressive rightsizing vs RI/SP commit）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如未來流量、新 feature 上線）
4. 確認所有 anomaly 都有 baseline 對照

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如 instance utilization heatmap、跨 region 流量明細），是哪一份？為什麼？
```

回審重點：human 判斷 rightsizing 是否會壓到 SLO、tag governance 是否需要強制、RI/SP 承諾期是否合理、未歸因 bucket 是否需要追責。
