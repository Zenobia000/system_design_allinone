---
title: "Retrospective · 回顧會議"
slug: "retro"
stage: "operate"
roles: ["pm", "po"]
order: 54
hook: "讓團隊每個 sprint 留下一個小改善"
when_to_use: "Sprint 結束、release 結束、或重大事件後"
ai_leverage: "用 Claude 把零散反饋分群並排序可執行性"
art: "/generated/stage-operate.png"
source: "Scrum Guide, deep-research-report.md §Process"
---

## 解決什麼問題

Retro 不是抱怨大會，也不是讚美大會。它的價值是每次留下「一個能做、會做、會驗證的改善」，並把它放進下個 sprint backlog。

## 誰負責、和誰對接

- **主責：** PM / PO / Scrum Master
- **協作：** 全體團隊成員
- **下游收件：** backlog 改善 item、Coding Standard 更新、Runbook 更新

## 何時用、何時不用

- ✅ **必要時機：** Sprint 結束、release 完成、SEV-1 事故後
- ❌ **不需要時：** 團隊已疲乏且上次改善仍未執行
- ⚠️ **常見誤用：** 行動項無 owner；同樣問題每次都被提；只談感覺不談資料

## AI 怎麼加速

讓 Claude 把匿名反饋分群、找出重複模式、按可執行性排序，主持人只負責決策。

```
你是 retro facilitator。讀下列匿名反饋與本 sprint 指標，
輸出：主題分群、根因候選、可執行改善（owner、due、驗證指標）、
本次不處理但需記錄的議題。
Feedback：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
