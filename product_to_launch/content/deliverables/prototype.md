---
title: "Prototype · 互動原型"
slug: "prototype"
stage: "design"
roles: ["ux", "ui"]
order: 19
hook: "在寫程式前用最低成本驗證互動"
when_to_use: "高風險互動、新手勢/動畫、stakeholder 簽核前"
ai_leverage: "用 Claude 從 wireframe → 互動腳本 + 可用性測試題目"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 上看起來合理的流程，使用者實際操作可能完全迷失。
Prototype 用 Figma/Framer 串起 wireframe，讓**真實使用者能點、能滑、能感受**，找出靜態圖看不見的問題。
不做 prototype 就直接 build，等於把 usability test 延到上線後。

## 誰負責、和誰對接

- **主責：** UX（行為設計）/ UI（視覺呈現）
- **協作：** PM（驗證需求）、Dev（評估技術限制）
- **下游收件：** UX 跑 usability test、UI 做 high-fidelity、Dev 估開發成本

## 何時用、何時不用

- ✅ **必要時機：** 高風險互動（金流、註冊、首次體驗）、新手勢/動畫、stakeholder 對 flow 有歧見
- ❌ **不需要時：** 既有元件複用、純內容頁、簡單表單
- ⚠️ **常見誤用：** 做得過度精細變成「demo 用」而非「測試用」；prototype 應**夠真實到能測試，但不浪費資源做最終視覺**

## AI 怎麼加速

從 wireframe + user flow 產互動腳本與測試題目。

```
Prompt: 你是 UX researcher。根據以下 prototype flow：
1) 為每個關鍵互動寫使用者測試任務（task-based）
   格式："請完成 [目標]，不要告訴使用者怎麼做"
2) 為每個任務設定成功定義（time / clicks / errors）
3) 列出 ≥ 5 個觀察 checkpoint（哪裡可能卡住）
4) 準備 follow-up 開放題（為什麼這樣選）

[prototype flow...]
```

回審重點：任務是否真實反映使用者目標、不引導答案。
