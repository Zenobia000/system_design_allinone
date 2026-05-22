---
title: "UAT · 使用者驗收測試"
slug: "uat"
stage: "ship"
roles: ["qa", "po"]
order: 42
hook: "用使用者語言確認『這真的是我們要的』"
when_to_use: "需求由外部使用者或業務單位定義，且接受度有爭議時"
ai_leverage: "用 Claude 把 PRD 翻成使用者腳本與情境步驟"
art: "/generated/stage-ship.png"
source: "deep-research-report.md §Verification"
---

## 解決什麼問題

QA 驗的是「功能對不對」，UAT 驗的是「業務拿到能不能用」。兩者證據不可互相替代，否則上線後才發現流程斷裂。

## 誰負責、和誰對接

- **主責：** QA + PO 協調，業務單位執行
- **協作：** UX 提供 journey、Dev 修缺陷
- **下游收件：** Go/No-Go、release notes 中的已知限制

## 何時用、何時不用

- ✅ **必要時機：** 對外產品、合約交付、跨部門流程
- ❌ **不需要時：** 內部技術重構、不影響使用者行為的優化
- ⚠️ **常見誤用：** UAT 變成第二輪 QA；情境腳本沒對齊真實業務

## AI 怎麼加速

讓 Claude 把 PRD 與 user journey 轉成 UAT 腳本（角色、前置條件、步驟、預期），業務單位只需照做。

```
你是 UAT 協調員。讀 PRD 與 user journey，
為每個關鍵流程產出 UAT 腳本：角色、前置條件、步驟、預期結果、簽核欄位。
Input：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
