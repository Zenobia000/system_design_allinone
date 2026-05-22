---
title: "User Story · 使用者故事"
slug: "user-story"
stage: "define"
roles: ["po", "ba"]
order: 11
hook: "把 PRD 切成可估、可做、可驗收的最小單位"
when_to_use: "Sprint planning 前、backlog refinement 時"
ai_leverage: "用 Claude 把 PRD section → user story 群組 + INVEST 自檢"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 寫得再好，工程師也不能直接拿去寫 code——粒度太大、無法估時、無法驗收。
User Story 把 PRD 切成「一個 sprint 內可做完」的最小單位，並把「誰、為何、做什麼」寫清楚。
沒有 user story，sprint planning 變成猜謎遊戲；估時不準、驗收不清、demo 沒看點。

## 誰負責、和誰對接

- **主責：** PO（最終排序與接受度）
- **協作：** BA（補規則細節）、Dev（驗證估時）、QA（驗收條件）
- **下游收件：** Dev 寫 code、QA 寫 test case、PO 在 sprint review 驗收

## 何時用、何時不用

- ✅ **必要時機：** Sprint-based delivery、backlog ≥ 20 item、跨職能團隊
- ❌ **不需要時：** Bug fix（用 bug ticket 即可）、純技術重構（用 tech task）
- ⚠️ **常見誤用：** 寫成 "As a user, I want a button" 這種沒動機的 story；必須含 **persona + action + benefit**，並符合 INVEST（Independent, Negotiable, Valuable, Estimable, Small, Testable）

## AI 怎麼加速

把 PRD section 餵給 AI，產 user story 群 + INVEST 自檢。

```
Prompt: 你是 Scrum Product Owner。根據以下 PRD section，
產出 user story 群，每個 story 格式：
"As a [persona], I want to [action], so that [benefit]."
要求：
1) 每個 story 附 acceptance criteria（Given/When/Then 格式）
2) 用 INVEST 原則自檢，標出不符之處
3) 標示 story 間依賴與優先序建議
4) 估算 story point（Fibonacci: 1/2/3/5/8/13）

[PRD section...]
```

回審重點：story 是否真為「一個 sprint 可完成」、acceptance 是否可被 QA 直接拿去寫測試。
