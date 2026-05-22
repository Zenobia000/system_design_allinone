---
title: "可用性測試"
slug: "usability-test"
stage: "design"
roles: ["ux"]
order: 22
hook: "上線前抓出「使用者真的會卡」的點"
when_to_use: "新功能首版、改版重大互動、高風險 flow 簽核前"
ai_leverage: "用 Claude 把測試錄影逐字稿 → finding 報告 + 優先級"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PM、UX、Dev 自己測得很順，是因為他們知道流程。真實使用者第一次看，常常卡在「找不到按鈕」「不懂這欄要填什麼」。
可用性測試是**上線前最便宜的 bug 攔截網**：5 個使用者通常能抓出 80% 的可用性問題。
不做 usability test，bug 會延到上線後抓，成本高 10 倍。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（驗證商業優先序）、UI（補設計修正）、PO（決定是否延期上線）
- **下游收件：** UI 修 mockup、PM 調整 scope、Dev 補 edge case

## 何時用、何時不用

- ✅ **必要時機：** 新功能首版、改版核心 flow、高風險互動（金流/註冊）
- ❌ **不需要時：** Bug fix、micro-interaction 調整、內部工具僅自己用
- ⚠️ **常見誤用：** 找錯使用者（同事、家人）、引導性提問（「這裡是不是很簡單？」）；NN/g 建議 **5 個目標使用者 / round** 是最低成本最高效率

## AI 怎麼加速

把測試錄影逐字稿丟給 AI 萃取 finding，人工只審嚴重度判斷與修正方向取捨。

```prompt-quick
你是有 5+ 年 product design 經驗的資深 UX researcher（熟悉 user research、Nielsen heuristics、WCAG 2.2、severity rating）。任務：把測試逐字稿轉成 可用性測試報告（YAML 格式）。

<input>
[5 份使用者測試逐字稿（含任務、行為、quote）]
[受測任務清單與成功定義]
[參與者 profile（n、segment）]
</input>

輸出 schema：research_question / tasks / participant_profile / method / findings / recommendations / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 product design 經驗的資深 UX researcher，熟悉 moderated/unmoderated test、think-aloud protocol、Nielsen heuristics、severity rating（critical/major/minor）、WCAG 2.2 a11y audit。
你的輸出會交給 UI（修 mockup）、PM（調整 scope / 決定是否延上線）、PO（決定是否簽核）、Dev（補 edge case 實作）。
他們會用來「上線前抓使用者真的會卡的點」，所以 finding 必須有 quote 佐證、嚴重度有依據、修正方向附 effort 估算。
</role>

<context>
新功能首版、改版核心 flow、高風險互動（金流/註冊）簽核前用本卡。NN/g 建議 5 個目標使用者 / round 是最低成本最高效率。
本卡核心問題：哪些是個別使用者問題（noise）vs 系統性問題（signal）？哪些 critical 必須上線前修、哪些 minor 可以延後？
</context>

<input>
[5 份使用者測試逐字稿（含任務、行為、quote、time on task）]
[受測任務清單與成功定義（time / clicks / errors 上限）]
[參與者 profile（n、segment、招募條件）]
[受測 prototype / 上線版本資訊]
</input>

<rules>
1. 每個 finding 註明 source：[逐字稿 P3 03:20 / 受測者編號]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：修 critical A 需重做 nav，會延上線 2 週、影響 OKR Q3）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造 quote 或 metric；列「需要什麼補上」。
4. a11y（WCAG 2.2）：每個 finding 若涉及 a11y barrier（鍵盤、對比、focus、screen reader），必須額外標 wcag_criterion——任一未涵蓋需說明為何不適用。
5. Out of scope 至少 3 條，明寫不做什麼（例：不做 A/B test 量化驗證、不做品牌偏好研究、不做技術可行性評估）。
6. 每個關鍵宣稱標 confidence: [H/M/L]——命中率 ≥ 3/5 才標 H，個別使用者標 L。
7. 區分「個別使用者問題」（n=1）與「系統性問題」（n ≥ 3/5），避免誇大。
</rules>

<output_schema>
research_question:
  primary: <一句話研究問題>
  secondary: [<次要問題>]
  source: <input ref>
  confidence: H | M | L

tasks:
  - id: T1
    scenario: <情境描述（不告訴使用者怎麼做）>
    success_criteria:
      time_max: <秒>
      clicks_max: <次>
      errors_max: <次>
    completion_rate: <X/5>
    source: <input ref>

participant_profile:
  n: 5
  segment: <目標使用者描述>
  recruit_criteria: <篩選條件>
  excluded: <排除誰、為何>

method:
  type: enum[moderated, unmoderated, think_aloud, RITE]
  duration_per_session: <分鐘>
  device: <桌機 / 手機 / iOS / Android>

findings:
  - id: F1
    severity: enum[critical, major, minor]
    description: <現象>
    hit_rate: <X/5 受測者命中>
    quote: <受測者原話>
    screenshot_ref: <逐字稿時間戳或檔名>
    wcag_criterion: <若 a11y 相關，例 2.4.7 Focus Visible>
    source: <input ref>
    confidence: H | M | L

recommendations:
  - finding_id: F1
    fix: <修正方向>
    effort: enum[S, M, L]  # 1d / 1w / 2w+
    expected_impact: <為何此修能改善>
    trade_off: <負面後果>

decision_log:
  - decision: <例：critical F1 上線前修還是延後>
    options_considered: [fix_before_launch, delay_launch, ship_with_warning]
    chosen: fix_before_launch
    rejected_reason:
      delay_launch: <為何不>
      ship_with_warning: <為何不>
    confidence: H | M | L

out_of_scope:
  - <例：不做 A/B test 量化驗證（樣本太小）>
  - <例：不做品牌偏好 / desirability 研究>
  - <例：不做技術可行性評估（轉給 Dev）>
</output_schema>

<thinking>
產出前先：
1. 從逐字稿抓 3-5 個關鍵 signal（重複出現的卡點 / 共同 quote / 任務失敗模式）
2. 列至少 2 條 viable 嚴重度判斷路徑（嚴格 vs 寬鬆）與各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設受測者代表目標 segment）
4. 確認 a11y barrier 是否額外標 WCAG criterion
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 finding confidence < H？是否只是 n=1 卻被標成 critical？
2. 哪些假設來自我而非 input？標出來（特別是嚴重度判斷的主觀部分）。
3. 如果只能再追加一份 input，是哪一份（例：第 6 位受測者 vs 量化埋點）？為什麼？
</verify>
```

回審重點：human 判斷 finding 嚴重度是否誇大、是否區分「個別使用者問題」與「系統性問題」、修正方向 effort 是否合理。
