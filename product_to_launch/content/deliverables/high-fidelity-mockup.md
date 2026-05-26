---
title: "高保真稿"
slug: "high-fidelity-mockup"
stage: "design"
roles: ["ui"]
order: 21
hook: "讓工程師能像素級實作、不靠猜"
when_to_use: "Wireframe + flow 已凍結、進入 dev handoff 前"
ai_leverage: "用 Claude 從 wireframe + design system → component-by-component spec"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

工程師拿到模糊的 mockup，每個間距、每個 hover、每個 error state 都得回頭問設計師。一週 standup 半在補圖。
高保真稿是**像素級的最終視覺 + 完整 state + 標註齊全的交付物**，讓 FE/Mobile 能獨立實作。
不把 state 補齊（loading/empty/error/disabled），上線後永遠在補 bug。

## 誰負責、和誰對接

- **主責：** UI
- **協作：** UX（驗證互動）、FE/Mobile（驗證可實作）、QA（驗收基準）
- **下游收件：** FE/Mobile 實作、QA 設計 visual test、UX 跑最後 usability check

## 何時用、何時不用

- ✅ **必要時機：** wireframe + flow 已凍、進 dev handoff、跨平台一致性需求
- ❌ **不需要時：** wireframe 直接複用既有元件、純後台工具
- ⚠️ **常見誤用：** 只畫 happy path 的精美畫面，loading/empty/error 全靠工程腦補；高保真稿必須**所有 state 都齊**

## AI 怎麼加速

從 wireframe + design system 反推所有 state 與 a11y 標註，人工只審視覺品味與品牌一致性。

```prompt-quick
你是有 5+ 年 UI design 經驗的資深 UI designer（熟悉 design tokens、component spec、WCAG 2.2）。任務：把 wireframe + design system 轉成 高保真稿（YAML 格式）。

## 輸入素材

[Wireframe（screen + flow 已凍）]
[Design system（token + component library）]
[互動規範 / micro-copy 文案]

輸出 schema：screens / components_used / interaction_states / micro_copy / a11y_annotations / responsive_behavior / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 5+ 年 UI design 經驗的資深 UI designer，熟悉 design tokens、component spec、Figma auto-layout、WCAG 2.2 AA。
你的輸出會交給 FE / Mobile 工程師（像素級實作）、QA（寫 visual regression test）、UX（最後 usability check）。
他們會用來「不靠猜」直接 build production code，所以每個 state / token / a11y 標註都必須機械可消費。

## 情境脈絡

Wireframe + flow 已凍結、進入 dev handoff 前才用本卡。
本卡核心問題：讓工程師能像素級實作、不靠猜——所有 state（default/loading/empty/error/disabled/success/partial）齊全、token 對齊、a11y 達 WCAG 2.2 AA。

## 輸入素材

[Wireframe（screen + flow 已凍）]
[Design system（color/typography/spacing/radius/shadow token + component library）]
[互動規範 / micro-copy 文案 / 品牌語氣]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：若 CTA 用 primary token，會犧牲 secondary 動作的 visual hierarchy）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造 token 值或文案；列「需要什麼補上」。
4. a11y（WCAG 2.2 AA）：對比 ≥ 4.5:1（文字）/ 3:1（UI 元件）、focus ring 可見、touch target ≥ 44×44、ARIA 標註齊全——任一未達需說明為何不適用。
5. Out of scope 至少 3 條，明寫不做什麼（例：不做 motion spec、不做 i18n 字串、不做後台管理介面）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 不重新發明 token；只使用 design system 既有 token，缺的標 TODO 請 design system 補。

## 輸出格式（YAML）

screens:
  - name: <screen 名稱>
    breakpoint: enum[mobile_360 | tablet_768 | desktop_1280]
    states: [default, loading, empty, error, disabled, success, partial]  # 至少 5 種
    source: <input ref>
    confidence: H | M | L

components_used:
  - ref: <design system component id>
    variant: <variant 名稱>
    props_override: <若有客製>
    source: <input ref>

interaction_states:
  - element: <CTA / input / link>
    hover: <token + 行為>
    focus: <focus ring spec + WCAG 2.4.7>
    active: <token>
    disabled: <條件 + 視覺 + a11y aria-disabled>

micro_copy:
  - context: <button / error / empty>
    text: <文案>
    source: <input ref or TODO(需文案 owner)>

a11y_annotations:
  contrast_ratios: <每個文字/UI 元件實測值>
  focus_order: <tab 順序>
  aria_labels: <screen reader 文字>
  touch_target_min: <px>
  wcag_level: AA
  source: <input ref>

responsive_behavior:
  mobile_360: <layout 描述>
  tablet_768: <layout 描述>
  desktop_1280: <layout 描述>

decision_log:
  - decision: <例：error state 用 inline 還是 toast>
    options_considered: [inline, toast, modal]
    chosen: inline
    rejected_reason:
      toast: <為何不>
      modal: <為何不>
    confidence: H | M | L

out_of_scope:
  - <例：不做 motion / 動畫 timing spec>
  - <例：不做 i18n 字串長度測試>
  - <例：不做後台管理介面>

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（wireframe 主要 flow / design system 已有的 token / 品牌語氣關鍵字）
2. 列至少 2 條 viable 視覺路徑（例：CTA 用 filled vs outlined）與各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設深色模式不在 v1）
4. 確認 a11y 4 項（對比 / focus / touch target / ARIA）都涵蓋

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來（特別是 token 客製、文案、a11y 等價判斷）。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：human 判斷視覺品味、品牌一致性、state 是否真完整、a11y 是否到位、與 design system 是否一致。
