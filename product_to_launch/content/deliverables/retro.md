---
title: "Retrospective · 回顧會議"
slug: "retro"
stage: "operate"
roles: ["pm", "po"]
order: 54
hook: "讓團隊每個 sprint 留下一個小改善"
when_to_use: "Sprint 結束、release 結束、或重大事件後"
ai_leverage: "用 Claude 把零散反饋分群並排序可執行性"
art: "/generated/stage-operate.png"
source: "Scrum Guide, deep-research-report.md §Process"
---

## 解決什麼問題

Retro 不是抱怨大會，也不是讚美大會。它的價值是每次留下「一個能做、會做、會驗證的改善」，並把它放進下個 sprint backlog。

## 誰負責、和誰對接

- **主責：** PM / PO / Scrum Master
- **協作：** 全體團隊成員
- **下游收件：** backlog 改善 item、Coding Standard 更新、Runbook 更新

## 何時用、何時不用

- ✅ **必要時機：** Sprint 結束、release 完成、SEV-1 事故後
- ❌ **不需要時：** 團隊已疲乏且上次改善仍未執行
- ⚠️ **常見誤用：** 行動項無 owner；同樣問題每次都被提；只談感覺不談資料

## AI 怎麼加速

把匿名反饋 + sprint 指標 + 前次 retro action 餵給 Claude 分群並排可執行性，PM / Scrum Master 主持只裁決 owner。

```prompt-quick
你是有 5+ 年 agile 經驗的資深 PO / Scrum Master（熟悉 Scrum Guide、retro 形式 start/stop/continue / 4Ls / mad-sad-glad、INVEST 原則）。任務：把匿名反饋 + sprint 指標 + 上次 action 轉成 retro 結論（YAML 格式）。

<input>
[匿名反饋（含投票數）]
[本 sprint 指標（velocity、incident、deploy freq）]
[上一次 retro 的 action items 與完成狀態]
</input>

輸出 schema：format / themes / action_items / trend_vs_previous / anti_patterns / team_health_signals / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；action items 最多 3 條。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 agile 經驗的資深 PO / Scrum Master，熟悉 Scrum Guide、retro 形式（start/stop/continue / mad-sad-glad / 4Ls / sailboat）、INVEST 原則、team health Spotify model、blameless 文化。
你的輸出會交給 PM / Scrum Master（主持會議用）、PO（拆 action 進 backlog）、Engineering Manager（看 team health 信號）、團隊成員（接受結論）。
他們需要可執行、不指責個人、可追蹤到下個 sprint 的結論，所以 action items 最多 3 條，每條必須有 owner / due / 驗證指標。
</role>

<context>
Sprint 結束、release 結束、或重大事件後用本卡。
本卡核心問題：讓每個 sprint 留下「一個能做、會做、會驗證的改善」，避免變成抱怨大會或讚美大會。
</context>

<input>
[匿名反饋（含投票數、原文）]
[本 sprint 指標（velocity、incident count、deploy freq、cycle time、PR review time）]
[上一次 retro 的 action items 與完成狀態]
[團隊規模 / 組成 / 變動]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選改 process A 會犧牲 ship velocity X%）。
3. 缺資料寫 TODO(缺什麼)，不要編造；無上次 action 完成資料寫 TODO(需要前次紀錄)，不要硬比較趨勢。
4. SLO compliance / NFR：action items 必須符合 INVEST；blameless（不指個人、改流程/工具）；上限 3 條 action（避免動能稀釋）；每條 ≤ 2 個 sprint 完成。
5. Out of scope：明列 3 條（例如：個別績效檢討、組織架構調整、跨團隊大議題）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 不寫人名；具體議題寫「某角色」或「某流程」，個人意見匯總為主題。
</rules>

<output_schema>
format:
  required: true
  type: enum[start_stop_continue, mad_sad_glad, 4Ls, sailboat]
  rationale: <why this format for this sprint>

themes:
  - theme: <e.g. PR review 太慢>
    frequency: <反饋出現次數>
    severity: enum[low, medium, high]
    supporting_feedback_refs: [<reference to input>]
    metric_correlation: <e.g. PR review time p95 36h>
    source: <input ref>
    confidence: H | M | L

action_items:
  - id: A1
    statement: <e.g. PR review SLA ≤ 24h>
    owner: <role/team, not person name>
    due: <next sprint end>
    scope: <within this team>
    success_metric: <e.g. PR review time p95 < 24h>
    invest_check:
      independent: <Y/N>
      negotiable: <Y/N>
      valuable: <Y/N>
      estimable: <Y/N>
      small: <Y/N>
      testable: <Y/N>
    source: <input ref>
    confidence: H | M | L
  # 最多 3 條

trend_vs_previous:
  previous_actions_completed: <count / total>
  previous_actions_carried_over: [<id>]
  recurring_themes: [<theme that appeared ≥ 2 retros>]

anti_patterns:
  - pattern: <e.g. 同樣議題第 3 次出現未解>
    proposed_escalation: <e.g. 升級到 EM 介入>
  - pattern: <e.g. action 無 owner>
    proposed_fix: <強制 owner 簽到>

team_health_signals:
  velocity_trend: enum[up, flat, down]
  incident_trend: enum[up, flat, down]
  morale_signal: <from 反饋字眼 — e.g. burnout indicators>
  attrition_risk: enum[low, medium, high]
  source: <input ref>

decision_log:
  - decision: <e.g. 本次 action 選 process 改善 vs tooling 改善>
    options_considered: [process, tooling, training]
    chosen: process
    rejected_reason:
      tooling: <需採購 / lead time 太長>
      training: <已排在下個季度>
    confidence: H | M | L

out_of_scope:
  - 個別績效檢討（屬 manager 1:1）
  - 組織架構調整（屬 EM / leadership）
  - 跨團隊大議題（升級到 program retro）
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最高頻 theme、最高投票 theme、上次未完成 action、惡化指標）各標 H/M/L confidence
2. 列至少 2 條 action 路徑（process vs tooling）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如反饋背後的個人脈絡、團隊新成員適應）
4. 確認 action ≤ 3 條、blameless、INVEST 通過
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如歷史 4 個 sprint action 完成率、1:1 摘要），是哪一份？為什麼？
</verify>
```

回審重點：human 判斷 action 是否真的會做、owner 是否被接受、是否需要升級到 program retro、team health 是否需要 EM 介入。
