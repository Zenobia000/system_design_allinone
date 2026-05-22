---
title: "資訊架構 IA"
slug: "information-architecture"
stage: "design"
roles: ["ux", "sa"]
order: 17
hook: "讓使用者找得到、看得懂、不迷路"
when_to_use: "新產品建構、改版重組、內容/功能 ≥ 30 項時"
ai_leverage: "用 Claude 把功能清單 → 候選 IA 分類 + card sorting 提案"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

功能堆到一定數量後，導航變成迷宮：每個 PM 把自己的功能塞最上層、每個使用者問「OO 在哪？」沒有 IA，UI 美也救不回。
IA 在畫 wireframe 之前先決定**「資訊怎麼分類、命名、層級、跨層關聯」**，是後續所有設計的骨架。
沒做 IA，wireframe 重畫三輪都不會收斂。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** SA（系統能力與資料邊界）、PM（商業優先序）、內容團隊（命名一致性）
- **下游收件：** UX 畫 wireframe、UI 做導航元件、SEO 規劃 URL 結構

## 何時用、何時不用

- ✅ **必要時機：** 新產品建構、改版、功能/內容 ≥ 30 項、跨平台一致性
- ❌ **不需要時：** 單一 flow 工具、小 widget 改版
- ⚠️ **常見誤用：** 把 IA 寫成「sitemap」就算了；IA 應包含**分類邏輯（why）+ 命名規則 + 跨層關聯**，並用 card sorting 驗證

## AI 怎麼加速

把功能清單 + 使用者語彙丟給 AI 產候選分類。

```
Prompt: 你是 IA 顧問。根據以下功能清單 + 訪談使用者語彙：
1) 提出 2-3 種候選分類方式（task-based / audience-based / topic-based）
2) 每種方式列出層級結構（≤ 3 層深）
3) 對每個 label 評估歧義度（使用者是否能猜對內容）
4) 建議用於 card sorting 驗證的關鍵題目

[輸入...]
```

回審重點：分類是否反映使用者心智模型（非內部組織架構）、命名是否一致。
