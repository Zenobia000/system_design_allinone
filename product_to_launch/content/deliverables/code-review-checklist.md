---
title: "Code Review Checklist"
slug: "code-review-checklist"
stage: "build"
roles: ["dev"]
order: 33
hook: "把 review 從個人品味變成可重現流程"
when_to_use: "review 品質依賴特定資深人員、或新人 onboarding 多時"
ai_leverage: "用 Claude 跑 first-pass，人類專注 trade-off 與邊界情況"
art: "/generated/stage-build.png"
source: "software_architect/ppt/05-ilities §Maintainability"
---

## 解決什麼問題

每個 reviewer 看不同的東西，品質起伏大。Checklist 把「最低必看項目」標準化：正確性、安全、可觀測性、可回滾，剩下交給人類判斷。

## 誰負責、和誰對接

- **主責：** Dev Lead 維護
- **協作：** Security、SRE、QA 各補一個維度
- **下游收件：** 全體 Reviewer

## 何時用、何時不用

- ✅ **必要時機：** 中大型團隊、跨團隊 PR、敏感模組
- ❌ **不需要時：** 兩人團隊、強信任實驗專案
- ⚠️ **常見誤用：** 變成形式填表；把 lint 能做的事放進來

## AI 怎麼加速

讓 Claude 對 diff 跑 checklist first-pass，列出疑似違規 + 行號，reviewer 只審 AI 標記點。

```
你是 senior reviewer。對下列 diff 跑 checklist：
正確性、錯誤處理、安全、log/metric、相容性、測試。
標記疑似違規與行號，附證據。
Diff：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
