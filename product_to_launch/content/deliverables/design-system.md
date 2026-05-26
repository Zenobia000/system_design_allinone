---
title: "Design System · 設計系統"
slug: "design-system"
stage: "design"
roles: ["ui"]
order: 20
hook: "讓全產品視覺一致、開發不重造輪子"
when_to_use: "產品 ≥ 5 個主要 screen、跨平台、多設計師協作時"
ai_leverage: "用 Claude 從現有 mockup → token 萃取 + component spec"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

沒有 design system，每個設計師畫自己的 button、自己的間距、自己的顏色。
工程師也得每次重寫元件、QA 每次重測樣式。
Design System 把**color、typography、spacing、component state** 集中為 token + 元件庫，是規模化設計與開發的前提。

## 誰負責、和誰對接

- **主責：** UI（設計規範）
- **協作：** FE（實作元件庫）、UX（互動規範）、Brand（品牌一致性）
- **下游收件：** UI 套用、FE 寫元件、QA 設計 visual regression test

## 何時用、何時不用

- ✅ **必要時機：** 產品 ≥ 5 個主要 screen、跨平台（web + mobile）、設計師 ≥ 2 人
- ❌ **不需要時：** 單頁產品、純後台工具用第三方 UI lib
- ⚠️ **常見誤用：** 一開始就追求完美完整（會變半年專案）；應**先抽 token + 5-10 個核心元件**，邊用邊長大

## AI 怎麼加速

從現有 mockup 萃取 token、元件清單與一致性 audit，人工只審命名語意與貢獻政策。

```prompt-quick
你是有 5+ 年 UI design 經驗的資深 UI designer（熟悉 design tokens、component spec、WCAG 2.2）。任務：把 mockup 截圖 + spec 轉成 Design System（YAML 格式）。

## 輸入素材

[Mockup 截圖（涵蓋 ≥ 5 個主要 screen）]
[Brand spec（色票、字體、語氣）]
[既有 FE 元件庫（若有）]

輸出 schema：tokens / components / patterns / a11y_baseline / naming_convention / contribution_policy / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 5+ 年 UI design 經驗的資深 UI designer，熟悉 design tokens（W3C DTCG 規範）、component anatomy、Figma library、Storybook、WCAG 2.2 AA。
你的輸出會交給 UI（套用至 mockup）、FE 工程師（用 React/Vue 寫元件庫）、QA（設計 visual regression test）、Brand（驗證品牌一致性）。
他們會用來「規模化設計與開發」，所以 token 必須語意化、元件必須 state 完整、a11y 必須 baseline 達標。

## 情境脈絡

產品 ≥ 5 個主要 screen、跨平台（web + mobile）、設計師 ≥ 2 人時用本卡。
本卡核心問題：把分散的視覺決策收斂為 token + 元件庫，讓全產品視覺一致、開發不重造輪子；但避免一次做太完整（半年專案陷阱），應先抽 token + 5-10 個核心元件邊用邊長大。

## 輸入素材

[Mockup 截圖（涵蓋 ≥ 5 個主要 screen）]
[Brand spec（色票、字體、語氣、logo 使用規範）]
[既有 FE 元件庫 / Tailwind config（若有）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：semantic token 命名（bg-surface-primary）vs literal（gray-100）——前者抽象高但學習成本高，後者直覺但難 theming）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造 hex 值或元件 props；列「需要什麼補上」。
4. a11y baseline（WCAG 2.2 AA）：色彩對比 ≥ 4.5:1 / 3:1、focus state 可見、不只用色彩傳達狀態、支援暗色模式——任一未達需說明為何不適用。
5. Out of scope 至少 3 條，明寫不做什麼（例：不做 motion library、不做 icon set、不做後台 admin 元件）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 元件以 anatomy / variants / states / props 4 維度描述，不只貼截圖。

## 輸出格式（YAML）

tokens:
  color:
    primitive: <例：blue-500 = #2563EB>  # 原始色票
    semantic: <例：bg-action-primary = blue-500>  # 語意層
    source: <input ref>
    confidence: H | M | L
  spacing: <8-point grid 或自訂尺度>
  typography: <font family / scale / line-height / weight>
  radius: <sm / md / lg 對應 px>
  shadow: <elevation 1-5 對應 box-shadow>
  motion: <duration + easing token（若有）>

components:
  - name: <例：Button>
    anatomy: [container, label, icon_left, icon_right]
    variants: [primary, secondary, ghost, destructive]
    states: [default, hover, focus, active, disabled, loading]  # 至少 5 種
    props: [size, variant, disabled, loading, icon]
    a11y: <ARIA role + keyboard support>
    source: <input ref>
    confidence: H | M | L

patterns:
  - name: <例：Form / Table / Modal>
    composition: <用哪些 components 組成>
    usage_rule: <何時用、何時不用>

a11y_baseline:
  wcag_level: AA
  contrast_min: 4.5  # 文字
  focus_visible: required
  dark_mode: supported | not_in_v1
  source: <input ref>

naming_convention:
  rule: <semantic | literal | hybrid>
  prefix: <例：ds- / tw-（決定 BEM/utility 風格）>
  rationale: <為何選此風格>

contribution_policy:
  who_can_add: <UI lead 簽核 / 任何設計師>
  versioning: <semver | calver>
  deprecation: <如何標記與移除>

decision_log:
  - decision: <例：token 命名用 semantic 還是 literal>
    options_considered: [semantic, literal, hybrid]
    chosen: hybrid
    rejected_reason:
      semantic: <為何不>
      literal: <為何不>
    confidence: H | M | L

out_of_scope:
  - <例：不做 motion library / 動畫 spec>
  - <例：不做 icon set（外掛使用）>
  - <例：不做後台 admin 專用元件>

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（mockup 高頻使用的元件 / 重複出現的 hex / brand 強制色）
2. 列至少 2 條 viable token 命名路徑（semantic vs literal）與各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設不支援暗色模式 v1）
4. 確認 a11y baseline 4 項都涵蓋

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來（特別是 token 抽象層級、命名規則）。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：human 判斷 token 是否語意化、命名是否一致、是否覆蓋暗色模式與 a11y、貢獻政策是否符合團隊規模。
