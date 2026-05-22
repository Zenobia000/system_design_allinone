---
title: "Acceptance Criteria · 驗收條件"
slug: "acceptance-criteria"
stage: "define"
roles: ["po", "qa"]
order: 12
hook: "讓「做完了」這句話有客觀證據"
when_to_use: "每個 user story 進 sprint 前必備"
ai_leverage: "用 Claude 從 user story → Given/When/Then 驗收 + edge case"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色 / §SOP與檢核表"
---

## 解決什麼問題

PO 說「做完了嗎？」工程師說「應該吧」、QA 說「我再測一下」、PM 說「跟我想的不一樣」。
這種對話每次發生，sprint 就燒掉半天。
Acceptance Criteria 是**story 進 sprint 前就寫好的客觀驗收條件**，誰看都一樣，不靠主觀感受。

## 誰負責、和誰對接

- **主責：** PO（最終接受度）/ QA（驗收執行）
- **協作：** BA（補規則）、Dev（驗證可實作）、UX（驗證互動完整）
- **下游收件：** Dev 自測、QA 寫 test case、Sprint review 驗收

## 何時用、何時不用

- ✅ **必要時機：** 每個 user story、每個 epic gate review
- ❌ **不需要時：** 純技術 spike、文件整理任務、緊急 hotfix（事後補）
- ⚠️ **常見誤用：** 寫成「使用者應該覺得很順」這種主觀句；必須是 **Given/When/Then 可機械驗證**，含 happy path + 至少 2 個 edge case

## AI 怎麼加速

從 user story + PRD 反推 acceptance + edge case。

```
Prompt: 你是 QA lead。根據以下 user story，產出 acceptance criteria：
1) Happy path：≥ 2 條 Given/When/Then
2) Edge cases：≥ 3 條（空值、超大值、權限不足、網路斷線等）
3) Error path：使用者輸入錯時的期望行為
4) Non-functional：response time / a11y / audit log 要求
5) 標出哪些條件需要 mock 第三方服務

[user story...]
```

回審重點：edge case 是否真實存在、acceptance 是否可被自動化測試。
