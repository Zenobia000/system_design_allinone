---
title: "OKR · 目標與關鍵結果"
slug: "okr"
stage: "define"
roles: ["pm", "po"]
order: 9
hook: "把產品方向翻成可衡量的季度承諾"
when_to_use: "季度規劃、跨團隊對齊、需要在多個 backlog item 間排優先序時"
ai_leverage: "用 Claude 從北極星指標反推可量化 Key Result"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

backlog 上一百個 item，每個 sprint 還是只能做五個。沒有 OKR，排序變成「誰嗓門大誰先做」。
OKR 的價值不是 KPI 別名，而是**強迫團隊在季度內只承諾少數幾個結果**，其他都得讓位。
寫不出 OKR，通常代表產品策略本身就模糊。

## 誰負責、和誰對接

- **主責：** PM（提案 Objective）/ PO（落地到 backlog）
- **協作：** Stakeholders（對齊商業目標）、Dev Lead（驗證 capacity）
- **下游收件：** PO 排 backlog、Dev Lead 排 sprint、Stakeholders 追進度

## 何時用、何時不用

- ✅ **必要時機：** 季度規劃、跨 squad 協作、團隊 ≥ 10 人
- ❌ **不需要時：** 小團隊單一明確目標、緊急 incident response 階段
- ⚠️ **常見誤用：** Objective 寫成 task list（「完成 feature A」）、Key Result 不可量測（「提升使用者滿意度」）；KR 必須有數字與量測方式

## AI 怎麼加速

把北極星指標 + 本季商業目標 + 歷史達成率丟給 AI 反推候選 Objective/KR，人工只審 ambition 與 trade-off。

```prompt-quick
你是有 5+ 年 SaaS B2B 經驗的資深 PM（熟悉 OKR / JTBD / PRD / ADR）。任務：把北極星指標 + 本季商業目標 + 歷史達成率轉成 OKR draft（YAML 格式）。

<input>
[北極星指標 + 當前值]
[本季商業目標]
[上季 OKR 達成率]
</input>

輸出 schema：objective_statement / key_results[] / counter_metric / alignment_to_north_star / leading_vs_lagging / quarterly_cadence / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；KR 必須含 baseline → target 數字與量測方式；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 SaaS B2B 經驗的資深 PM，熟悉 OKR、JTBD、PRD、ADR、leading/lagging metric 設計。
你的輸出會交給 PO（拆 backlog 並排優先序）、Dev Lead（驗證 capacity 與排 sprint）、Stakeholders（追季度進度與資源承諾）。
他們需要在 30 分鐘內判斷「這個季度該砍掉什麼來達成 KR」，所以你的 OKR 必須少而精、可量測、有 ambition。
</role>

<context>
季度規劃、跨團隊對齊、需要在多個 backlog item 間排優先序時用本 OKR。
本卡核心問題：把產品方向翻成季度內只承諾少數幾個可衡量結果，其他都得讓位。
</context>

<task>
根據以下 input 產出「OKR · 目標與關鍵結果」draft。
</task>

<input>
[北極星指標 + 當前值 + 同業 benchmark]
[本季商業目標（董事會 / CEO 層級）]
[上季 OKR 達成率 + 歷史 baseline]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Objective 必須質性、有方向感，禁止寫成 task list（如「完成 feature A」）。
3. 每個 KR 必須含 baseline → target 數字 + 量測方式 + 量測來源系統，缺任一標 TODO(缺什麼)。
4. Ambition 校準：理想信心 0.5–0.7（過高代表保守、過低代表不切實際），標 confidence: [H/M/L]。
5. 必須含至少 1 個 counter_metric（防 goal-hacking，例如「提升轉換率」配對「不可惡化退費率」）。
6. 必須區分 leading vs lagging KR，至少 1 個 leading KR 以便季中可調整。
7. Out of scope 至少 3 條，明寫本季 OKR 不處理什麼（例：技術債、純內部工具、>1 季才能驗證的指標）。
</rules>

<output_schema>
objective_statement:
  required: true
  type: string
  source: <input ref>
  confidence: H | M | L
  example: |
    讓中型 SaaS 客戶在 onboarding 第一週就感受到核心價值

key_results:
  - id: KR-1
    statement: <將 X 從 A 提升到 B by 季末>
    baseline: <number + 量測系統>
    target: <number>
    measurement: <how + 量測頻率>
    type: enum[leading, lagging]
    source: <input ref>
    confidence: H | M | L
    ambition_score: <0.0–1.0，理想 0.5–0.7>

counter_metric:
  metric: <防 goal-hacking 的對沖指標>
  threshold: <不可惡化的上限>
  source: <input ref>

alignment_to_north_star:
  north_star: <指標名稱 + 當前值>
  contribution: <本 OKR 預期對 north star 的貢獻 + 量化估算>
  confidence: H | M | L

leading_vs_lagging:
  leading_kr_ids: [<KR-id>]
  lagging_kr_ids: [<KR-id>]
  rationale: <為何這樣分>

quarterly_cadence:
  weekly_checkin: <要看哪些 leading 指標>
  midquarter_pivot_trigger: <什麼條件下要調整 KR>
  endquarter_review: <達成判定標準>

decision_log:
  - decision: <例：為何選 KR-1 而非候選 KR-X>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <為何不選>
      C: <為何不選>
    confidence: H | M | L

out_of_scope:
  - <本季 OKR 不處理 thing 1>
  - <本季 OKR 不處理 thing 2>
  - <本季 OKR 不處理 thing 3>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（北極星 gap、上季漏接點、商業承諾節點），標 H/M/L confidence
2. 列至少 2 條 viable OKR 路徑（防守型 vs 進攻型），各自負面後果（例：選防守會錯過市場窗口；選進攻會壓爆 capacity）
3. 列你做了但 input 沒明說的假設（例：團隊 capacity、市場節奏、依賴可用性）
4. 確認每個 KR 都能在季末用客觀數字判定達成
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 KR 的 ambition_score < 0.5 或 > 0.7？為什麼？需要什麼補資料才能校準？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份（capacity 數字 / 同業 benchmark / 客戶訪談）？為什麼？
</verify>
```

回審重點：human 判斷 ambition 是否誠實（信心 > 8 太保守、< 3 太激進）、counter_metric 是否真能防 goal-hacking、out-of-scope 有沒有偷渡技術債。
