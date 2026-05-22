---
title: "Journey Map · 旅程地圖"
slug: "journey-map"
stage: "discovery"
roles: ["ux"]
order: 4
hook: "看到使用者在哪一步真正卡住"
when_to_use: "conversion funnel 多步驟、跨通路體驗、需要找優化點時"
ai_leverage: "用 Claude 把客服紀錄 + 訪談 → journey 草圖與 pain point 標註"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 寫得很整齊，不代表使用者真的能順暢走完。
Journey map 把使用者從「察覺需求」到「完成任務」整個過程攤平，標出每一步的動作、情緒、卡點與機會。
不畫 journey，團隊只能優化單點，永遠看不到「客戶從進來到流失」整條路。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（提供 KPI 與商業目標）、客服（補實際投訴點）、行銷（補前段觸點）
- **下游收件：** PM 寫 PRD scope、UX 畫 user flow、PO 排優先序

## 何時用、何時不用

- ✅ **必要時機：** 跨通路體驗、conversion funnel ≥ 5 步、客訴集中在「流程不順」
- ❌ **不需要時：** 單一 screen 的 widget、API-only 產品
- ⚠️ **常見誤用：** 畫成 happy path 美化圖，忽略 error/rework path；NN/g 強調 journey 必須包含 emotion 與 pain

## AI 怎麼加速

把客服紀錄、訪談、NPS 評論丟給 AI 產 journey 草圖，人工驗證情緒低點與機會點。

```prompt-quick
你是有 5+ 年 product design 經驗的資深 UX consultant（熟悉 NN/g journey mapping、service blueprint、WCAG 2.2）。任務：把客服工單 + 訪談 + NPS 評論轉成 Journey Map · 旅程地圖（YAML 格式）。

<input>
[客服工單摘要]
[使用者訪談摘要]
[NPS 評論 / 留存問卷]
</input>

輸出 schema：persona_ref / stages[] (action/thought/emotion/touchpoint/pain) / pain_point_severity / moment_of_truth / opportunity_areas / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 product design 經驗的資深 UX consultant，熟悉 NN/g journey mapping、service blueprint、JTBD、WCAG 2.2、emotion curve 量化。
你的輸出會交給 PM（寫 PRD scope）、UX（畫 user flow）、PO（排優先序），他們會用來找出「使用者真正卡住的步驟」並決定優化順位。
所以 journey 必須含 emotion、pain 嚴重度、evidence quote，不能是 happy path 美化圖。
</role>

<context>
conversion funnel ≥ 5 步、跨通路體驗、需要找優化點時用本 deliverable。
本卡核心問題：把使用者從察覺需求到完成任務整個過程攤平，看到使用者在哪一步真正卡住。
</context>

<task>
根據以下 input 產出「Journey Map · 旅程地圖」draft，至少 5 個 stage（awareness → advocacy）。
</task>

<input>
[客服工單摘要（含投訴頻次）]
[使用者訪談摘要 8-12 份]
[NPS 評論 / 留存問卷 / app store 評論]
</input>

<rules>
1. 每個 stage 的 action / pain 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（先修 stage X 的 pain，則 stage Y 的 N% 流失短期不會改善）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造情緒或行為；列「需要什麼補上」。
4. Emotion 必須量化（-2 ~ +2 或 0-100），不能只寫「不爽」；happy path 與 error path 必須分開列。
5. Out of scope：明列 3 條本文件不處理（例如：UI mockup、API 設計、行銷漏斗成本）。
6. 每個 pain 的 severity 標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. a11y / 多通路訊號必須涵蓋（mobile / desktop / 客服電話 / email），未涵蓋者須說明為何。
</rules>

<output_schema>
persona_ref: <P1 from persona card>

stages:
  - id: S1
    name: <e.g., Awareness>
    action:
      required: true
      type: string
      source: <input ref>
    thought:
      type: string
      example: "這真的能幫我嗎？"
      source: <input ref>
    emotion_score:
      type: int
      range: [-2, 2]
      source: <input ref>
      confidence: H | M | L
    touchpoint:
      type: enum[web, mobile_app, email, customer_support, in_person]
    pain_points:
      type: list[{pain: string, severity: enum[blocker, major, minor], frequency: int, supporting_quote: string}]
      source: <input ref>
    opportunity_areas:
      type: list[string]
      actionable: true

pain_point_severity_ranking:
  - { pain_id: P1, stage: S2, severity: blocker, affected_pct: 35, confidence: H }

moment_of_truth:
  stage: <which stage decides retention vs churn>
  rationale: <why this is the make-or-break>
  source: <input ref>

happy_path: [S1, S2, S3, S4, S5]
error_paths:
  - trigger: <what causes it>
    detour: [S2, S2a_error, S2b_recovery, S3]

decision_log:
  - decision: <stage 切法選擇>
    options_considered: [by_funnel_step, by_emotion_curve, by_touchpoint_channel]
    chosen: by_funnel_step
    rejected_reason:
      by_emotion_curve: <為何不選>
      by_touchpoint_channel: <為何不選>
    confidence: H | M | L

out_of_scope:
  - 不畫 UI mockup（屬 UX wireframe / design system）
  - 不寫 API 與後端流程（屬 service blueprint backstage）
  - 不算行銷漏斗 CAC / ROAS（屬 marketing funnel）
</output_schema>

<thinking>
產出前先 step-by-step：
1. 從 input 抓 5-7 個 stage 候選，依頻次決定要留哪 5 個
2. 列每個 stage 的 emotion 與 pain，標 H/M/L
3. 列至少 2 條 stage 切法（by funnel vs by emotion curve）與負面後果
4. 列你做了但 input 沒明說的假設（例如：使用者跨裝置切換假設）
5. 確認 a11y / 多通路涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 stage 的 emotion / severity confidence < H？需要什麼補資料？
2. 哪些 thought / emotion 是我推測而非引自 quote？標出來。
3. 如果只能再追加一份 input（session replay / heatmap / 客服電話錄音），哪一份對輸出品質提升最大？
</verify>
```

回審重點：是否有真實 evidence、是否涵蓋情緒低點、機會點是否 actionable、error path 是否誠實列出。
