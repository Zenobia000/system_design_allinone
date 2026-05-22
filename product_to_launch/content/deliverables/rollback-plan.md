---
title: "Rollback Plan · 回滾計畫"
slug: "rollback-plan"
stage: "ship"
roles: ["devops"]
order: 40
hook: "在 incident 發生前先決定『按哪顆按鈕』"
when_to_use: "任何含 schema、契約、或不可逆操作的 release"
ai_leverage: "用 Claude 對 migration 推導反向腳本與安全窗口"
art: "/generated/stage-ship.png"
source: "deep-research-report.md §Deployment, Google SRE"
---

## 解決什麼問題

Incident 發生時最貴的不是修復，是猶豫。Rollback Plan 預先寫好「什麼指標觸發、誰按、按完會發生什麼、多久確認」。

## 誰負責、和誰對接

- **主責：** DevOps + on-call SRE
- **協作：** Dev Lead（資料兼容性）、DBA（schema 反向）、PO（業務影響告知）
- **下游收件：** Go/No-Go、Incident Report

## 何時用、何時不用

- ✅ **必要時機：** schema migration、外部 API 變更、緩存格式變更
- ❌ **不需要時：** 純 UI 文案、可由 flag 直接關閉
- ⚠️ **常見誤用：** 寫「revert commit」就交差；忽略資料已寫入新格式

## AI 怎麼加速

讓 Claude 對 migration 與 deploy 步驟推導反向順序，並標出不可逆點。

```
你是 release engineer。讀下列 deploy steps 與 migration，
輸出 rollback plan：觸發指標、反向步驟、不可逆點、資料兼容處理、預估耗時、決策人。
Plan：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
