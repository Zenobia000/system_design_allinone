---
title: "Release Plan · 上線計畫"
slug: "release-plan"
stage: "ship"
roles: ["po", "devops"]
order: 39
hook: "把上線從『按 deploy』變成有對齊、有證據、有退路"
when_to_use: "release 涉及 schema、外部承諾、跨團隊或灰度時"
ai_leverage: "用 Claude 從 PR 清單生成 release notes + 風險清單"
art: "/generated/stage-ship.png"
source: "deep-research-report.md §Delivery Planning, §Deployment"
---

## 解決什麼問題

Release Plan 是一份「誰在哪時做什麼、出事誰接、何時宣布完成」的協作文件。沒有它，每次上線靠 Slack 即興指揮。

## 誰負責、和誰對接

- **主責：** PO + DevOps
- **協作：** Dev Lead、QA、SRE on-call、Customer Success
- **下游收件：** Go/No-Go、Rollback Plan、Canary Strategy

## 何時用、何時不用

- ✅ **必要時機：** schema migration、breaking change、市場活動綁定
- ❌ **不需要時：** flag 控制的小改、純文案
- ⚠️ **常見誤用：** 只寫時程不寫退路；通知名單缺 on-call

## AI 怎麼加速

讓 Claude 從 PR 標題與 commit message 抽出 release notes、依賴順序、可能影響面。

```
你是 release manager。讀下列 PR 與 commit 清單，
輸出 release plan：變更摘要、依賴順序、影響面、驗證步驟、回滾觸發條件、通知清單。
PR list：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
