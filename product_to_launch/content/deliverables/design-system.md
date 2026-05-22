---
title: "Design System · 設計系統"
slug: "design-system"
stage: "design"
roles: ["ui"]
order: 20
hook: "讓全產品視覺一致、開發不重造輪子"
when_to_use: "產品 ≥ 5 個主要 screen、跨平台、多設計師協作時"
ai_leverage: "用 Claude 從現有 mockup → token 萃取 + component spec"
art: "/generated/stage-design.png"
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

從現有 mockup 萃取 token 與元件清單。

```
Prompt: 你是 design system 顧問。根據以下 mockup 截圖 + spec：
1) 萃取 design token：color / typography / spacing / radius / shadow / motion
2) 列出核心元件清單（button / input / card / modal / nav...）
   每個元件含 state（default / hover / active / disabled / error / loading）
3) 標出視覺不一致的 ≥ 3 處（同元件有不同樣式）
4) 建議 token 命名規則（semantic vs literal）

[輸入...]
```

回審重點：token 是否語意化（不只是 hex）、是否覆蓋暗色模式與 a11y。

---

> Source: deep-research-report.md §產品與需求相關角色
