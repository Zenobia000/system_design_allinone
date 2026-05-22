---
title: "Go/No-Go Checklist"
slug: "go-no-go-checklist"
stage: "ship"
roles: ["po", "devops"]
order: 43
hook: "把上線決策從『感覺差不多』變成證據簽核"
when_to_use: "release 影響營收、合規、跨團隊或對外承諾時"
ai_leverage: "用 Claude 從 Release Plan 抽出尚未完成的證據項"
art: "/generated/stage-ship.png"
source: "deep-research-report.md §Verification, §Deployment"
---

## 解決什麼問題

Release 失敗大多不是技術問題，是「以為某項已完成但其實沒人簽」。Go/No-Go 強迫每個關鍵維度有明確 yes/no 與證據連結。

## 誰負責、和誰對接

- **主責：** PO 主持會議，DevOps 提供技術證據
- **協作：** QA、SRE、Security、Customer Success
- **下游收件：** 上線授權、Rollback 觸發條件

## 何時用、何時不用

- ✅ **必要時機：** 任何 P0/P1 release
- ❌ **不需要時：** flag 控制小改、純文案
- ⚠️ **常見誤用：** 變成 30 人會議；勾選但無證據連結

## AI 怎麼加速

讓 Claude 從 Release Plan、Test Plan、Runbook 自動勾選已備證據項，並列出未完成項給負責人。

```
你是 release coordinator。讀 Release Plan、Test Plan、Runbook，
產出 Go/No-Go 勾選表：項目、證據連結、狀態、負責人。
標出尚未完成項與阻塞原因。
Inputs：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
