---
title: "On-Call Rotation · 值班輪值"
slug: "on-call-rotation"
stage: "operate"
roles: ["devops"]
order: 50
hook: "讓『誰接電話』有制度，不靠英雄主義"
when_to_use: "服務有外部使用者、需要 24x7 或業務時段覆蓋時"
ai_leverage: "用 Claude 統計告警分佈，反推合理輪值密度"
art: "/generated/stage-operate.webp"
source: "Google SRE, PagerDuty incident response guide"
---

## 解決什麼問題

On-call 撐住的是可用性，但也撐垮人。輪值制度的目標是：覆蓋風險、平均負擔、明確升級路徑、可被工程師接受地長期執行。

## 誰負責、和誰對接

- **主責：** DevOps Manager / SRE Lead
- **協作：** HR/合規（加班規範）、Dev Lead（人員池）
- **下游收件：** Runbook、Incident Report、補休制度

## 何時用、何時不用

- ✅ **必要時機：** 對外服務、SLA ≥ 99.9%
- ❌ **不需要時：** 內部工具、無 paging 告警
- ⚠️ **常見誤用：** Primary 同時是 Secondary；無升級階梯；無補休

## AI 怎麼加速

把近 90 天告警歷史 + 團隊資料 + SLO 餵給 Claude 推輪值結構與密度，Manager 與 HR 共審 fairness 與合規。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 SRE Manager（熟悉 SLO、PagerDuty incident response、Google SRE、勞動法工時規範）。任務：把告警歷史 + 團隊資料 + SLO 轉成 on-call rotation 計畫（YAML 格式）。

## 輸入素材

[近 90 天告警歷史（含時段、SEV、ack 時間）]
[團隊成員池（人數、技能、時區）]
[SLO 與業務時段定義]

輸出 schema：rotation_schedule / primary_secondary / handoff_protocol / paging_routing / alert_density_per_shift / fairness_metrics / fatigue_indicators / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；輪值間隔必須符合勞動法。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 7+ 年 SRE 經驗的資深 SRE Manager，熟悉 SLO/SLI、PagerDuty incident response guide、Google SRE oncall 文化、勞動法工時規範、SOC 2 變更管理（值班責任歸屬）。
你的輸出會交給 SRE Lead（執行排班）、HR（驗合規）、Dev Lead（確認人員池）、Finance（核算加班費）、團隊成員（接受度）。
他們需要可執行、可被工程師接受、合勞動法的輪值制度，所以 fatigue 與 fairness 必須有量化指標。

## 情境脈絡

對外服務、SLA ≥ 99.9% 時用本卡。
本卡核心問題：讓「誰接電話」有制度，覆蓋風險、平均負擔、明確升級路徑、可被工程師長期接受。

## 輸入素材

[近 90 天告警歷史（含時段、SEV、ack 時間、解決時間）]
[團隊成員池（人數、技能、時區、目前負擔）]
[SLO 與業務時段定義]
[勞動法 / 公司 HR 規範（最長連續工時、最短休息間隔）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選 follow-the-sun 跨時區覆蓋好，但 handoff 風險上升 X%）。
3. 缺資料寫 TODO(缺什麼)，不要編造；無告警歷史寫 TODO(需要 90d alert log)，不要憑感覺排班。
4. SLO compliance：MTTA / MTTR 目標必須對齊 SLO；NFR 含勞動法工時上限、最短休息間隔、補休追蹤（SOC 2 audit）。
5. Out of scope：明列 3 條（例如：個別 runbook 內容、告警閾值合理性、加班費計算）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. Primary 不可同時是 Secondary；每月 on-call 工時 ≤ 法規上限；每週至少 1 天 paging-free。

## 輸出格式（YAML）

rotation_schedule:
  structure: enum[weekly, daily, follow-the-sun, business-hours-only]
  rationale: <why this structure for this team>
  shift_length_hours: <e.g. 168 weekly>
  source: <input ref>
  confidence: H | M | L

primary_secondary:
  primary:
    role: <name or "rotation pool A">
    ack_sla_minutes: <e.g. 5>
  secondary:
    role: <separate person from primary>
    ack_sla_minutes: <e.g. 15>
  tertiary_escalation:
    role: <manager>
    trigger: <primary + secondary 無回應 > X min>

handoff_protocol:
  cadence: <e.g. weekly Monday 10:00>
  artifacts: [open_incidents, recent_changes, known_issues]
  format: <e.g. 15-min sync + written handoff doc>

paging_routing:
  - severity: SEV1
    page: [primary, secondary, manager simultaneously after 10 min]
  - severity: SEV2
    page: [primary, then secondary after 15 min]
  - severity: SEV3
    page: [business hours only, slack notify off-hours]

alert_density_per_shift:
  current_p50: <number per week>
  current_p95: <number per week>
  target_p95: <e.g. ≤ 2 paging events per shift>
  source: <input ref>
  confidence: H | M | L

fairness_metrics:
  alerts_per_engineer_30d: [<name>: <count>]
  off_hours_share_percent: [<name>: <%>]
  rebalance_trigger: <e.g. > 1.5σ from team mean>

fatigue_indicators:
  - signal: <e.g. consecutive paging weeks>
    threshold: <e.g. 3 weeks>
    action: <auto-swap with backup>
  - signal: <off-hours alerts in last 7d>
    threshold: <e.g. > 5>
    action: <提前換班 + 補休>
  compensation_policy:
    comp_time_per_off_hours_page: <e.g. 1.5h>
    paid_overtime_threshold: <e.g. > 法規上限>

decision_log:
  - decision: <e.g. weekly vs daily rotation>
    options_considered: [weekly, daily, follow-the-sun]
    chosen: weekly
    rejected_reason:
      daily: <handoff 太頻繁, MTTA 變慢>
      follow-the-sun: <人池不足跨 3 時區>
    confidence: H | M | L

out_of_scope:
  - 個別 runbook 內容（屬 runbook card）
  - 告警閾值合理性（屬 observability spec）
  - 加班費精算（屬 HR / Finance）

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最高 alert density 時段、最不平均負擔者、最高 SEV 集中時段）各標 H/M/L confidence
2. 列至少 2 條輪值結構路徑（weekly vs follow-the-sun）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如成員意願、未來人員流動）
4. 確認勞動法、公平性、SLO 對齊三象限都涵蓋

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如過去 3 個月 alert noise 報表、團隊意願調查），是哪一份？為什麼？
```

回審重點：human 判斷團隊是否接受、是否合勞動法、補休是否真的會被執行、fairness 是否需要 rebalance。
