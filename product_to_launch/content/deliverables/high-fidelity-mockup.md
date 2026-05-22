---
title: "高保真稿"
slug: "high-fidelity-mockup"
stage: "design"
roles: ["ui"]
order: 21
hook: "讓工程師能像素級實作、不靠猜"
when_to_use: "Wireframe + flow 已凍結、進入 dev handoff 前"
ai_leverage: "用 Claude 從 wireframe + design system → component-by-component spec"
art: "/generated/stage-design.png"
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

從 wireframe + design system 反推所有 state 與標註。

```
Prompt: 你是 UI designer。根據以下 wireframe + design system token：
1) 對每個 screen 列出所有 state：
   default / loading / empty / error / disabled / success / partial
2) 對每個元件標註：spacing / typography token / interaction
3) 對每個 CTA 標註：disabled 條件 + error 訊息文案
4) 標出 ≥ 3 個 wireframe 缺漏的 edge state

[輸入...]
```

回審重點：state 是否完整、a11y（對比、focus ring）是否到位、是否與 design system 一致。

---

> Source: deep-research-report.md §產品與需求相關角色
