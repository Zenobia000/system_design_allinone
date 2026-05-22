---
title: "Wireframe · 線框稿"
slug: "wireframe"
stage: "design"
roles: ["ux"]
order: 18
hook: "在花錢做精緻 UI 前先驗證 layout 與流程"
when_to_use: "新功能首版、複雜表單、跨平台一致性對齊時"
ai_leverage: "用 Claude 從 user flow + IA → 低保真 wireframe 草圖描述"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

跳過 wireframe 直接畫高保真 UI 是常見浪費：UI 改三輪、layout 還是錯。
Wireframe 用最低成本驗證「**element 排列、資訊優先序、互動順序**」，這層對了，後續 UI 才有意義。
不畫 wireframe，stakeholder 容易爭論顏色與圖示，沒人討論底層 layout 邏輯。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（驗證需求對齊）、UI（接續做高保真）、FE/Mobile（評估實作可行性）
- **下游收件：** UI 畫 mockup、UX 做 usability test、Dev 估時

## 何時用、何時不用

- ✅ **必要時機：** 新功能首版、複雜表單/多步驟流程、跨平台對齊
- ❌ **不需要時：** 既有元件複用、micro-interaction 微調
- ⚠️ **常見誤用：** 把 wireframe 做太精緻（會讓 stakeholder 開始爭顏色）；應**刻意保持灰階、無細節**，聚焦 layout 與流程

## AI 怎麼加速

把 user flow + IA 丟給 AI 生低保真 wireframe 描述（可餵給 Figma plugin），人工只審 layout 邏輯與優先序判斷。

```prompt-quick
你是有 5+ 年 product design 經驗的資深 UX designer（熟悉 user research、IA、interaction patterns、WCAG 2.2）。任務：把 user flow + IA 轉成 Wireframe 描述（YAML 格式）。

<input>
[User flow]
[IA（資訊架構樹）]
[目標平台與斷點（web / mobile）]
</input>

輸出 schema：screens / user_flow_link / content_priorities / gestures_or_input / breakpoints / fidelity_level / assumptions / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 product design 經驗的資深 UX designer，熟悉 user-centered design、IA、F/Z reading pattern、interaction heuristics（Nielsen 10）、WCAG 2.2 AA。
你的輸出會交給 UI（接續做高保真 mockup）、PM（驗證需求對齊）、FE/Mobile（評估實作可行性）、UX（跑 usability test）。
他們會用來「在花錢做精緻 UI 前驗證 layout 與流程」，所以 wireframe 必須刻意保持灰階、聚焦結構，不被視覺細節分心。
</role>

<context>
新功能首版、複雜表單、跨平台一致性對齊時用本卡。
本卡核心問題：用最低成本驗證 element 排列、資訊優先序、互動順序——這層對了，後續 UI 才有意義。
</context>

<input>
[User flow（含起點、終點、分支）]
[IA（資訊架構樹 + 命名）]
[目標平台與斷點（web 1280 / mobile 360 等）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：tab nav vs hamburger——前者佔垂直空間但發現性高，後者省空間但隱藏功能）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造（不要自行決定品牌色或文案）；列「需要什麼補上」。
4. a11y（WCAG 2.2）：reading order 合邏輯、touch target ≥ 44×44、不只用顏色傳達優先序（用尺寸/位置）——任一未達需說明為何不適用。
5. Out of scope 至少 3 條，明寫不做什麼（例：不做視覺風格、不做 micro-copy 文案、不做動畫 spec）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 刻意保持 low/mid fidelity——只用框、文字、灰階；不畫圖示、不選顏色，避免 stakeholder 爭顏色。
</rules>

<output_schema>
screens:
  - name: <screen 名稱>
    purpose: <一句話說此 screen 解決什麼>
    key_elements: [header, primary_action, content_blocks, secondary_action, footer]
    reading_pattern: F | Z | center | list
    states_covered: [default, empty, loading, error]
    source: <input ref>
    confidence: H | M | L

user_flow_link:
  entry_points: [<from where>]
  exit_points: [<to where>]
  branches: <條件分支描述>

content_priorities:
  - element: <例：CTA「開始試用」>
    priority: primary | secondary | tertiary
    rationale: <為何此優先序，引用 user goal>
    source: <input ref>

gestures_or_input:
  primary: <tap / click / swipe / keyboard>
  secondary: <long press / scroll / hover>
  keyboard_support: <tab order required>

breakpoints:
  - name: mobile_360
    layout: <stack / 1-col 描述>
  - name: desktop_1280
    layout: <multi-col 描述>

fidelity_level: low | mid  # 不到 high
fidelity_rationale: <為何此 fidelity——避免過早討論視覺>

assumptions:
  - <例：假設使用者已登入>
  - <例：假設 i18n 字串長度差異 ≤ 30%>

decision_log:
  - decision: <例：主導航用 top tab 還是 side nav>
    options_considered: [top_tab, side_nav, hamburger]
    chosen: top_tab
    rejected_reason:
      side_nav: <為何不>
      hamburger: <為何不>
    confidence: H | M | L

out_of_scope:
  - <例：不做視覺風格 / 品牌色>
  - <例：不做 micro-copy 最終文案>
  - <例：不做動畫 / motion spec>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（user flow 高頻路徑 / IA 頂層分類 / 目標斷點）
2. 列至少 2 條 viable layout 路徑（例：tab vs accordion）與各自負面後果
3. 列你做了但 input 沒明說的假設（例：使用者裝置、登入狀態）
4. 確認 a11y 3 項（reading order / touch target / 不只用色）涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來（特別是優先序判斷）。
3. 如果只能再追加一份 input，是哪一份？為什麼？
</verify>
```

回審重點：human 判斷 layout 是否反映資訊優先序、edge state 是否完整、是否誠實保持低保真避免過早視覺討論。
