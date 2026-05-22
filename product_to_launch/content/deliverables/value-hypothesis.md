---
title: "價值假設卡"
slug: "value-hypothesis"
stage: "discovery"
roles: ["po", "pm"]
order: 6
hook: "把「我覺得有用」翻成可驗證的假設"
when_to_use: "新功能進 backlog 前、需要決定是否投入 sprint 資源時"
ai_leverage: "用 Claude 把模糊想法 → 可驗證假設 + 驗證實驗"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

backlog 上很多 item 是「老闆說要做」「對手有」「客戶提過一次」。
不寫價值假設，就會把高成本工程資源花在沒人在乎的功能。
價值假設卡逼團隊寫清楚：**對誰、解什麼、為何相信會 work、如何驗證**。

## 誰負責、和誰對接

- **主責：** PO（最終排進 backlog）
- **協作：** PM（提供 discovery 資料）、UX（補 user evidence）
- **下游收件：** PM 寫 PRD、Dev Lead 評估成本、QA 設計驗證指標

## 何時用、何時不用

- ✅ **必要時機：** 新功能 ideation、估時 > 1 個 sprint、不確定使用者買不買單
- ❌ **不需要時：** Bug fix、合規限期任務、純技術重構
- ⚠️ **常見誤用：** 把假設寫成「使用者一定會喜歡」這種不可證偽的句子；假設必須有可量測的 leading indicator

## AI 怎麼加速

把模糊 idea + discovery 資料丟給 AI 寫成假設卡 + 對應實驗，人工只驗 kill criteria 誠實度。

```prompt-quick
你是有 5+ 年 agile 經驗的資深 PO（熟悉 lean product、INVEST、JTBD、A/B testing、leading indicator 設計）。任務：把 idea + discovery 資料轉成 價值假設卡（YAML 格式）。

<input>
[模糊 idea / 老闆說要做的功能]
[discovery 資料：persona / JTBD / journey pain]
[現有 metric baseline]
</input>

輸出 schema：customer_segment / problem_statement / proposed_value / riskiest_assumption / test_method / success_threshold / kill_criteria / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 agile 經驗的資深 PO，熟悉 lean product、INVEST 原則、JTBD、backlog 拆解、A/B testing、leading indicator 設計、kill criteria 文化。
你的輸出會交給 PM（寫 PRD）、Dev Lead（評估成本）、QA（設計驗證指標），他們會用來決定要不要把這 idea 排進 sprint。
所以假設必須可證偽、實驗成本必須 < 1 週、kill criteria 必須誠實到敢真的執行。
</role>

<context>
新功能進 backlog 前、估時 > 1 個 sprint、不確定使用者買不買單時用本 deliverable。
本卡核心問題：把「我覺得有用」翻成可驗證的假設，避免把高成本工程資源花在沒人在乎的功能。
</context>

<task>
根據以下 input 產出「價值假設卡」draft。
</task>

<input>
[模糊 idea / 老闆說要做的功能描述]
[discovery 資料：persona / JTBD / journey pain]
[現有 metric baseline（conversion / retention / activation）]
</input>

<rules>
1. 每個假設必須註明 source：[input 第 X 段]；無依據者標 [來源未明示，需確認] 並降 confidence。
2. Trade-off 必須列負面後果（驗證 hypothesis A，則犧牲 hypothesis B 的 sprint 時間 / 學習機會）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造 baseline；列「需要什麼補上」。
4. 實驗成本控制：test_method 必須 < 1 週且優先選 no-code / mock；超過須在 decision_log 說明為何。
5. Out of scope：明列 3 條本文件不處理（例如：實作細節、UI 設計、定價策略）。
6. 每個 assumption 標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. Kill criteria 必須可被觸發（不能寫「不管結果都繼續」）；違反此規則須在 decision_log 註明。
</rules>

<output_schema>
customer_segment:
  required: true
  type: string
  ref: <persona id>
  source: <input ref>
  confidence: H | M | L

problem_statement:
  type: string
  format: "<segment> struggles to <job> because <pain>"
  source: <input ref>

proposed_value:
  hypothesis: "我們相信 <行為改變> 對 <使用者> 有價值，因為 <理由>。我們會用 <指標> 驗證。"
  behavior_change: <observable behavior>
  leading_indicator: <metric measurable within 2 weeks>
  source: <input ref>

riskiest_assumption:
  required: true
  type: string
  example: "使用者真的願意每天打開 dashboard，而非只在月底"
  category: enum[desirability, viability, feasibility]
  confidence: H | M | L
  why_risky: <why this kills the idea if wrong>

test_method:
  type: enum[fake_door, concierge, wizard_of_oz, prototype_test, smoke_test, painted_door]
  cost_estimate: <≤ 1 week>
  no_code: bool
  participants: int
  rationale: <why this method validates the riskiest assumption>

success_threshold:
  metric: <e.g., click-through rate>
  baseline: <current value>
  target: <value that confirms hypothesis>
  source: <input ref>
  confidence: H | M | L

kill_criteria:
  required: true
  type: list[string]
  example:
    - "若 < 5% 受測者點擊 fake door，放棄此題目"
    - "若 cost-to-acquire > 3x LTV，放棄"
  triggerable: true  # must be executable, not aspirational

decision_log:
  - decision: <test_method 選擇>
    options_considered: [fake_door, concierge, prototype]
    chosen: fake_door
    rejected_reason:
      concierge: <為何不選，例如成本過高>
      prototype: <為何不選，例如太重>
    confidence: H | M | L

out_of_scope:
  - 不設計實作細節（屬 PRD / ADR）
  - 不畫 UI mockup（屬 UX design）
  - 不定價或商業模式（屬 monetization brief）
</output_schema>

<thinking>
產出前先 step-by-step：
1. 從 input 抓 3-5 個 assumption，分 desirability / viability / feasibility，標 H/M/L
2. 找最 riskiest 的那條（錯了就整個 idea 死）
3. 列至少 2 條 test_method 路徑與各自負面後果（cost vs signal strength）
4. 列你做了但 input 沒明說的假設（baseline / 母體大小）
5. 確認 kill criteria 真的可被觸發
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 assumption 的 confidence < H？需要什麼補資料？
2. 哪些 baseline / target 來自我的腦補而非 input？標出來。
3. 如果只能再追加一份 input（用戶訪談 / analytics baseline / 競品 benchmark），哪一份對輸出品質提升最大？
</verify>
```

回審重點：指標是否真的可量測、kill criteria 是否誠實（不要寫成「不管結果如何都繼續做」）、riskiest assumption 是否真的會殺死整個 idea。
