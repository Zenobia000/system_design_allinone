---
title: "PR Template"
slug: "pr-template"
stage: "build"
roles: ["dev"]
order: 32
hook: "讓作者在按下 Create PR 之前先回答 reviewer 會問的問題"
when_to_use: "團隊 PR 數量上升、review 來回成本高時"
ai_leverage: "用 Claude 從 diff 自動產出 PR 描述初稿"
art: "/generated/stage-build.png"
source: "deep-research-report.md §Implementation, GitLab Handbook"
---

## 解決什麼問題

Review 卡住通常不是程式碼難，是脈絡缺。PR Template 強制作者寫清楚「為什麼改、改了什麼、怎麼驗證、有什麼風險」。

## 誰負責、和誰對接

- **主責：** Dev Lead 維護模板、Dev 填寫
- **協作：** QA（驗證欄位）、DevOps（rollout 欄位）
- **下游收件：** Reviewer、release notes、incident retro

## 何時用、何時不用

- ✅ **必要時機：** 任何進主幹的 PR
- ❌ **不需要時：** trivial typo 修正可允許簡化版
- ⚠️ **常見誤用：** 模板太長無人填；只剩標題格式檢查

## AI 怎麼加速

讓 Claude 讀 diff + commit message 產出 PR description 初稿，作者只需補風險與驗證證據。

```
你是嚴格的 reviewer。讀下列 diff，輸出 PR description：
動機、變更摘要、邊界情況、驗證方式、回滾方式、潛在風險。
Diff：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
