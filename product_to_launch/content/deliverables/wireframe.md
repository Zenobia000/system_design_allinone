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

把 user flow + IA 丟給 AI 生 wireframe 描述（可餵給 Figma plugin）。

```
Prompt: 你是 UX designer。根據以下 user flow + IA：
1) 為每個 screen 描述 wireframe（用 ASCII / 結構化文字）
   含：header / nav / 主要區塊 / CTA / footer
2) 標出每個元件的資訊優先序（primary / secondary / tertiary）
3) 列出每個 screen 的 empty / loading / error state
4) 標出跨 screen 的互動切換點

[輸入...]
```

回審重點：layout 是否反映資訊優先序、edge state 是否完整。

---

> Source: deep-research-report.md §產品與需求相關角色
