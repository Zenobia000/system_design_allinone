---
title: "Coding Standard · 編碼規範"
slug: "coding-standard"
stage: "build"
roles: ["dev"]
order: 31
hook: "把 review 時的口水戰提前壓縮成 linter 設定"
when_to_use: "團隊 ≥ 3 人或新語言/新框架導入時"
ai_leverage: "用 Claude 對範例 PR 抽出實際違規模式，補進規範"
art: "/generated/stage-build.png"
source: "software_architect/ppt/05-ilities §Maintainability"
---

## 解決什麼問題

人類記不住 50 條規則。Coding Standard 的價值在於決定「哪些靠工具自動擋、哪些靠 review、哪些只是建議」，不是一份漂亮 PDF。

## 誰負責、和誰對接

- **主責：** Dev Lead 或 staff engineer
- **協作：** 全體 Dev 投票、Architect 確認可演進
- **下游收件：** CI lint job、PR Template、Code Review Checklist

## 何時用、何時不用

- ✅ **必要時機：** 新專案、新語言、團隊擴編、跨服務統一基線
- ❌ **不需要時：** 個人專案、一次性 PoC
- ⚠️ **常見誤用：** 200 條規則無工具支撐；只規定縮排卻不規定錯誤處理

## AI 怎麼加速

讓 Claude 從近 50 個 PR review 評論抽 pattern，再對應到 lint rule 或 review checklist。

```
你是 staff engineer。讀下列 PR comment 樣本，
分群常見問題並輸出：規則描述、可否被 linter 偵測、嚴重度、範例。
Comments：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
