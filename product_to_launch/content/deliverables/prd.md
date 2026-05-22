---
title: "PRD · 產品需求文件"
slug: "prd"
stage: "define"
roles: ["pm"]
order: 8
hook: "把模糊需求變可執行規格"
when_to_use: "團隊 ≥ 3 人、跨職能新功能、需求穩定度 < 60% 時必要"
ai_leverage: "用 Claude 把訪談 + JTBD + journey → PRD draft，人工審 trade-off"
art: "/generated/key-deliverable-prd.png"
source: "deep-research-report.md §產品與需求相關角色 / §可複製範本"
---

## 解決什麼問題

沒有 PRD，工程師會用自己的 假設寫程式、設計師用自己的 假設畫稿、QA 用自己的 假設寫 case。
三邊各跑各的，第二週才發現對不上，全部重做。
PRD 不是文件儀式，是**讓 PM、UX、Architect、Dev、QA 在開工前對齊「為何做、做什麼、不做什麼」的決策中樞**。

## 誰負責、和誰對接

- **主責：** PM（最終簽核 scope 與 KPI）
- **協作：** UX（驗證需求）、Architect（評估技術可行性）、BA（補規則細節）
- **下游收件：** PO 寫 backlog、Dev Lead 切任務、QA 寫 test plan、UX 畫 flow

## 何時用、何時不用

- ✅ **必要時機：** 跨團隊新功能、影響 ≥ 2 個系統元件、需求穩定度 < 60%
- ❌ **不需要時：** Bug fix、單一團隊內 < 3 人協作、技術探索 spike
- ⚠️ **常見誤用：** 把 PRD 當設計稿寫（要寫 what & why，不寫 how）；把 PRD 當合約鎖死（應是 baseline + change policy）

## AI 怎麼加速

把 discovery 階段所有素材丟給 AI 產 PRD draft，人工只審 trade-off。

```
Prompt: 你是資深 PM，根據以下訪談逐字稿、JTBD、journey map，
生 PRD draft，欄位包含：
1) Problem statement（含商業影響與成本）
2) Goal + 3 個可量化 success metric + counter-metric
3) Users & scenarios（含 edge case）
4) In/out scope（明寫不做什麼）
5) Functional requirements with acceptance criteria
6) NFR（latency / a11y / security / audit）
7) Risks + 3 個未決問題（unknown），不要編造
8) Decision log

[輸入...]
```

回審重點：human 判斷 trade-off、stakeholder 優先級、合規邊界、out-of-scope 是否誠實。
