---
title: "Runbook · 維運手冊"
slug: "runbook"
stage: "operate"
roles: ["devops"]
order: 46
hook: "凌晨三點被 page 的人能照做不用思考"
when_to_use: "任何已知告警、已知異常、或新服務上線前"
ai_leverage: "用 Claude 從 postmortem 與告警規則生成 runbook 草稿"
art: "/generated/key-deliverable-runbook.png"
source: "deep-research-report.md §Operation, Google SRE"
---

## 解決什麼問題

凌晨三點不是寫程式的好時機。Runbook 的目標是讓被 page 的人不需要理解設計也能正確處理告警，並把處理步驟轉成可自動化候選。

## 誰負責、和誰對接

- **主責：** DevOps / SRE，由服務 owner 維護
- **協作：** Dev Lead 提供失敗模式、Architect 補風險路徑
- **下游收件：** On-Call Rotation、Postmortem 改善項

## 何時用、何時不用

- ✅ **必要時機：** 每條 paging alert、每個新服務上線
- ❌ **不需要時：** 一次性事件、純資訊性告警
- ⚠️ **常見誤用：** 步驟寫「請聯絡 X」；過期未更新；無回滾路徑

## AI 怎麼加速

把告警規則 + 過往 postmortem + dashboard 截圖丟給 Claude 產 runbook 草稿，服務 owner 審回滾步驟與升級條件。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 SRE（熟悉 SLO、incident response、runbook 自動化）。任務：把告警規則 + 過往事件 + dashboard 轉成 runbook draft（YAML 格式）。

<input>
[告警規則（含 expression、threshold）]
[過往 postmortem 與 chat log 摘錄]
[相關 dashboard 連結與面板說明]
</input>

輸出 schema：alert_name / symptom / diagnosis_steps / remediation_steps / escalation_criteria / related_dashboards / last_tested / on_call_specific_notes / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；每個 remediation step 必須有 rollback。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年 SRE 經驗的資深 on-call SRE，熟悉 SLO/SLI、incident response、Google SRE runbook 規範、chaos engineering、game day。
你的輸出會交給 凌晨三點被 page 的工程師（照做不思考）、新入職的 on-call（學習用）、自動化團隊（轉成 self-healing 候選）。
他們可能是非本服務 owner，所以每一步必須具體可貼上執行、每個 remediation 必須有 rollback。
</role>

<context>
任何 paging alert、新服務上線前都要有 runbook。
本卡核心問題：讓被 page 的人不需要理解設計也能正確處理告警，並把處理步驟轉成可自動化候選。
</context>

<input>
[告警規則（含 expression、threshold、severity）]
[過往 postmortem 與 chat log 摘錄]
[相關 dashboard 連結與面板說明]
[服務架構摘要（依賴、SLO）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選 quick restart 會丟 in-flight request X%）。
3. 缺資料寫 TODO(缺什麼)，不要編造；診斷指令缺則寫 TODO，不要瞎猜命令語法。
4. SLO compliance：每個 remediation 標對 SLO 的影響（保護 / 燃燒 / 中性）；NFR 含執行時長、權限要求。
5. Out of scope：明列 3 條（例如：根因分析、長期設計改動、跨服務協調）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 每個 remediation step 必須附 rollback 指令；不能只有「執行 X」沒有「如果 X 失敗執行 Y」。
</rules>

<output_schema>
alert_name:
  required: true
  type: string
  source: <input ref>

symptom:
  user_visible: <string>
  internal_signal: <metric/log pattern>
  source: <input ref>
  confidence: H | M | L

diagnosis_steps:
  - step: <description>
    command: <exact command or query>
    expected_output: <what good looks like>
    if_anomalous: <next step pointer>
    source: <input ref>

remediation_steps:
  - step_id: R1
    action: <description>
    command: <exact command>
    rollback: <exact rollback command — required>
    slo_impact: enum[protect, burn, neutral]
    time_estimate: <e.g. 2-5 min>
    permissions: <required role/IAM>
    source: <input ref>
    confidence: H | M | L

escalation_criteria:
  - condition: <e.g. R1+R2 仍紅燈 > 10 min>
    escalate_to: <role / paging group>
    expected_ack: <time>

related_dashboards:
  - name: <dashboard name>
    url: <link or TODO>
    key_panels: [<panel 1>, <panel 2>]

last_tested:
  date: <ISO or TODO(需要排 game day)>
  result: <pass | fail | not_tested>

on_call_specific_notes:
  - <note>

decision_log:
  - decision: <e.g. mitigation 選 restart vs failover>
    options_considered: [restart, failover, scale_out]
    chosen: failover
    rejected_reason:
      restart: <why not>
      scale_out: <why not>
    confidence: H | M | L

out_of_scope:
  - 根因分析（屬 postmortem）
  - 長期設計改動（屬 ADR）
  - 跨服務協調（屬 incident commander）
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最常見 symptom、最快 mitigation、最常見誤判）各標 H/M/L confidence
2. 列至少 2 條 mitigation 路徑（保守 vs 激進）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如權限假設、依賴假設）
4. 確認每個 remediation 都有 rollback
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如最近 3 次同告警 chat log），是哪一份？為什麼？
</verify>
```

回審重點：human 判斷 rollback 是否真的能回、權限是否到位、升級條件是否合理、last_tested 是否需要排 game day。
