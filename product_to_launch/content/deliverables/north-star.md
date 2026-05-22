---
title: "北極星指標"
slug: "north-star"
stage: "discovery"
roles: ["pm", "po"]
order: 7
hook: "全團隊只盯一個數字，避免局部最佳化"
when_to_use: "團隊 ≥ 10 人、跨 squad 協作、KPI 多到互相打架時"
ai_leverage: "用 Claude 從商業模式反推候選北極星 + counter-metric"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

每個 squad 都在追自己的 KPI，結果整體產品 metric 不動甚至倒退。
北極星指標的價值不是「最重要的數字」，而是「**最能代表使用者持續獲得價值的數字**」。
沒有北極星，團隊容易追 vanity metric（DAU、註冊數），上線後沒人發現 retention 在崩。

## 誰負責、和誰對接

- **主責：** PM（提案）/ PO（落地到 backlog）
- **協作：** 數據團隊（補可量測性）、商業團隊（補 monetization 對齊）
- **下游收件：** 全團隊（每次 release 都對齊北極星）

## 何時用、何時不用

- ✅ **必要時機：** 團隊 ≥ 10 人、跨 squad、長期產品（非一次性專案）
- ❌ **不需要時：** 小團隊單一目標清楚、合規限期任務
- ⚠️ **常見誤用：** 把 revenue 當北極星（會誘導短期榨取使用者）；北極星應是**使用者價值的代理指標**，搭配 counter-metric 防偏

## AI 怎麼加速

把商業模式 + persona + 主要 use case 丟給 AI，產候選指標 + counter-metric，人工驗 Goodhart 風險。

```prompt-quick
你是有 5+ 年 SaaS B2B 經驗的資深 PM（熟悉 OKR / JTBD / PRD / Amplitude 北極星框架 / Goodhart's law）。任務：把商業模式 + persona + 主要 use case 轉成 北極星指標（YAML 格式）。

<input>
[商業模式 canvas / monetization 邏輯]
[persona 卡與主要 JTBD]
[現有 metric dashboard 與 baseline]
</input>

輸出 schema：north_star_metric / leading_indicators[] / counter_metric / input_metrics / business_model_link / anti_goodhart_safeguards / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造 baseline。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 SaaS B2B 經驗的資深 PM，熟悉 OKR、JTBD、PRD、ADR、Amplitude / Mixpanel 北極星框架、Sean Ellis growth model、Goodhart's law、counter-metric 設計、leading vs lagging indicator。
你的輸出會交給全團隊（每次 release 都對齊）、數據團隊（補可量測性）、商業團隊（補 monetization 對齊），他們會用來決定整個產品的優化方向。
所以北極星必須代表使用者持續獲得價值，不是 vanity metric 或短期 revenue 榨取。
</role>

<context>
團隊 ≥ 10 人、跨 squad 協作、KPI 多到互相打架時用本 deliverable。
本卡核心問題：全團隊只盯一個數字，避免局部最佳化與追 vanity metric（DAU、註冊數）造成 retention 崩潰沒人發現。
</context>

<task>
根據以下 input 產出「北極星指標」draft，含 3 個候選 + 推薦人選 + counter-metric。
</task>

<input>
[商業模式 canvas / monetization 邏輯]
[persona 卡與主要 JTBD]
[現有 metric dashboard 與 baseline（DAU / MAU / retention / revenue）]
</input>

<rules>
1. 每個指標註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認] 並降 confidence。
2. Trade-off 必須列負面後果（選指標 A，則指標 B 代表的客群短期會被忽略 N%）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造 baseline 或可量測性；列「需要什麼補上」。
4. 北極星必須是使用者價值代理指標，不能是 revenue 單獨指標；若提案是 revenue 須在 decision_log 解釋並補 counter-metric。
5. Out of scope：明列 3 條本文件不處理（例如：團隊 KPI 分解、salary / bonus 公式、廣告 CAC 細節）。
6. 每個候選指標標 confidence: [H/M/L]，L 必須附說明為何不確定（可量測性 / 資料品質）。
7. 每個指標必須評估 Goodhart 風險（被作弊 / 被局部最佳化的可能），並附 anti-goodhart safeguard。
</rules>

<output_schema>
north_star_metric:
  required: true
  name: <string>
  formula: <e.g., "weekly_active_teams × successful_action_per_team">
  measurement_method: <event tracking / DB query>
  why_proxy_for_value: <為何代表 long-term user value>
  source: <input ref>
  confidence: H | M | L

leading_indicators:
  required: true
  type: list[{name: string, formula: string, lag_to_nsm: string, source: ref}]
  min_count: 3
  example:
    - name: "activation rate (D7)"
      formula: "users who complete key action within 7 days / new signups"
      lag_to_nsm: "2-4 weeks"

counter_metric:
  required: true
  type: list[{name: string, prevents: string, threshold: string}]
  min_count: 2
  example:
    - name: "support tickets per active user"
      prevents: "為了衝活躍而推爛功能"
      threshold: "< 0.05/user/week"

input_metrics:
  type: list[{name: string, owned_by_squad: string, influence_on_nsm: enum[direct, indirect]}]

business_model_link:
  revenue_correlation: <NSM 上升如何帶動 ARR>
  monetization_path: <free → paid 路徑>
  source: <input ref>

candidate_alternatives:
  - id: NSM-A
    name: <metric>
    pros: [<>]
    cons: [<>]
    goodhart_risk: enum[high, mid, low]
    rejection_reason: <if not chosen>

anti_goodhart_safeguards:
  required: true
  type: list[string]
  example:
    - "NSM 與 retention 同步追蹤，retention 下降 > 5% 即觸發 review"
    - "Counter-metric 設 hard threshold，破線即暫停相關優化"

decision_log:
  - decision: <選哪個 NSM>
    options_considered: [NSM_A, NSM_B, NSM_C]
    chosen: NSM_A
    rejected_reason:
      NSM_B: <為何不選，例如 Goodhart 風險高>
      NSM_C: <為何不選，例如 lag 太長>
    confidence: H | M | L

out_of_scope:
  - 不做團隊 KPI 分解（屬 OKR cascade）
  - 不做 salary / bonus 公式對齊（屬 HR comp design）
  - 不算廣告 CAC / ROAS（屬 marketing analytics）
</output_schema>

<thinking>
產出前先 step-by-step：
1. 從 input 抓 3-5 個 value-proxy 訊號，標 H/M/L
2. 對每個候選 NSM 評估 Goodhart 風險（短期可衝但傷 retention 的可能）
3. 列至少 2 條 NSM 路徑與各自負面後果（例如：weekly active teams vs successful action count）
4. 列你做了但 input 沒明說的假設（baseline 可得性 / event tracking 已實作）
5. 確認 counter-metric 真能阻止作弊
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個指標的 confidence < H？需要什麼補資料（event tracking / 客戶 retention cohort）？
2. 哪些 baseline / lag 估計來自我的腦補而非 input？標出來。
3. 如果只能再追加一份 input（retention cohort / payment funnel / churn 訪談），哪一份對輸出品質提升最大？
</verify>
```

回審重點：指標是否真能反映 long-term value、是否容易被作弊、counter-metric 是否真有 hard threshold 而非裝飾。
