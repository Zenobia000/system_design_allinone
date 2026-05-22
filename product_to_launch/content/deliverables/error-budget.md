---
title: "Error Budget · 誤差預算"
slug: "error-budget"
stage: "operate"
roles: ["devops"]
order: 45
hook: "把『要不要繼續發新功能』變成可計算的決策"
when_to_use: "SLO 已定義、且團隊需要在新功能 vs 穩定性間做取捨時"
ai_leverage: "用 Claude 從 SLI 時序資料算出剩餘 budget 與燃燒率"
art: "/generated/stage-operate.png"
source: "Google SRE Workbook, deep-research-report.md §SRE"
---

## 解決什麼問題

Error Budget 是 SLO 的反面：允許的不可用度。它把「Dev 想 ship、SRE 想 freeze」的政治問題變成簡單規則：budget 沒用完就 ship，用完就 freeze 高風險變更。

## 誰負責、和誰對接

- **主責：** DevOps / SRE
- **協作：** PO 接受 freeze 規則、Dev Lead 排重點修復
- **下游收件：** Release Plan、Capacity Planning、Incident Report

## 何時用、何時不用

- ✅ **必要時機：** 有 SLO 且穩定性與交付速度產生衝突
- ❌ **不需要時：** 沒 SLO；budget 從未影響決策
- ⚠️ **常見誤用：** budget 燒完仍照常 ship；budget 政策無人簽核

## AI 怎麼加速

把 SLI 時序 + SLO 定義 + release log 餵給 Claude 算 budget 燃燒，PO 與 SRE 一起決 freeze / relax 政策。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 SRE（熟悉 SLO/SLI/error budget、Google SRE Workbook、burn-rate alerting）。任務：把 SLI 時序 + SLO + release log 轉成 error budget 報告（YAML 格式）。

<input>
[SLI 時序資料（過去 ≥ 28 天）]
[SLO 定義（target、window）]
[Release log / 變更紀錄]
</input>

輸出 schema：current_burn_rate / remaining_budget / burn_rate_alerts / policy / root_cause_attribution / exhaustion_plan / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；budget 計算必須附公式與假設。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年 SRE 經驗的資深 SRE，熟悉 SLO/SLI/error budget、Google SRE Workbook 第 4-6 章 burn-rate alerting、blameless 文化。
你的輸出會交給 PO（接受 freeze 規則）、Dev Lead（排重點修復）、Release Manager（gate release）、Engineering Manager（裁定政策例外）。
他們需要可計算、可審查、可決策的 budget 報告，所以每個數字必須附公式與時間窗口。
</role>

<context>
有 SLO 且穩定性與交付速度產生衝突時用本卡。
本卡核心問題：把「Dev 想 ship、SRE 想 freeze」變成簡單規則—budget 沒用完就 ship，用完就 freeze 高風險變更。
</context>

<input>
[SLI 時序資料（過去 ≥ 28 天，含時間戳）]
[SLO 定義（target、window）]
[Release log / 變更紀錄]
[近期 incident report（影響 budget 的事件）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：freeze release 會延遲 X 個 feature、relax 政策會增加 Y% 抱怨風險）。
3. 缺資料寫 TODO(缺什麼)，不要編造；SLI 數據不足 28 天寫 TODO，不要外推。
4. SLO compliance：每個 budget 數字必須附公式 `budget = (1 - target) × window`；burn rate 必須給 fast (1h) + slow (6h) 兩種警報；NFR 含通報延遲、政策觸發延遲。
5. Out of scope：明列 3 條（例如：SLO 數值本身的合理性、incident root cause、freeze 期間替代工作安排）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. Budget 必須以時間單位呈現（例如 40.3 min / 28d），不能只給百分比。
</rules>

<output_schema>
current_burn_rate:
  rate_1h: <e.g. 14.4× = 用 1 小時燒掉應該燒 14.4 小時的 budget>
  rate_6h: <e.g. 2× = 用 6 小時燒掉應該燒 12 小時的 budget>
  formula: <budget_consumed_in_window / expected_consumption_in_window>
  source: <input ref>
  confidence: H | M | L

remaining_budget:
  percent: <e.g. 35% remaining>
  time_equivalent: <e.g. 14.1 min of 40.3 min/28d>
  formula: <(1 - target) × window − consumed>
  source: <input ref>

burn_rate_alerts:
  fast:
    threshold: <e.g. 14.4× over 1h>
    page: <SEV level>
  slow:
    threshold: <e.g. 6× over 6h>
    page: <SEV level>

policy:
  freeze_condition: <e.g. remaining < 10% OR fast burn rate sustained 30 min>
  relax_condition: <e.g. remaining > 70% AND no SEV-1 in 14d>
  exceptions:
    - exception: <emergency security fix>
      approver: <role>

root_cause_attribution:
  - period: <e.g. last 7d>
    top_burn_event: <incident ref or change ref>
    contribution_percent: <e.g. 60% of budget consumed>
    source: <input ref>
    confidence: H | M | L

exhaustion_plan:
  projected_exhaustion_date: <ISO or TODO>
  if_exhausted:
    - action: freeze high-risk changes
    - action: prioritise reliability backlog
    - action: trigger postmortem of top burn event

decision_log:
  - decision: <e.g. freeze threshold 10% vs 20%>
    options_considered: [5%, 10%, 20%]
    chosen: 10%
    rejected_reason:
      "5%": <too late, no buffer>
      "20%": <too aggressive, blocks too many releases>
    confidence: H | M | L

out_of_scope:
  - SLO 數值本身的合理性（屬 SLO card）
  - incident root cause（屬 postmortem）
  - freeze 期間替代工作安排（屬 PM）
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最大 burn 事件、近期 burn rate 趨勢、與 release 的關聯）各標 H/M/L confidence
2. 列至少 2 條政策路徑（嚴格 freeze vs 彈性 freeze）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如未來 traffic 模式、未來 release cadence）
4. 確認所有 budget 數字都有公式可追溯
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如完整 release diff、依賴 SLO burn），是哪一份？為什麼？
</verify>
```

回審重點：human 判斷 freeze 政策是否能執行、PO 是否簽核、例外條款是否封閉、預估耗盡是否需提早介入。
