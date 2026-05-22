---
title: "優先級矩陣"
slug: "priority-matrix"
stage: "define"
roles: ["pm", "po"]
order: 16
hook: "把「都很重要」打回現實"
when_to_use: "Backlog ≥ 30 item、sprint planning 爭執不下時"
ai_leverage: "用 Claude 評估 RICE/Value-Effort + 提供 ranked backlog"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

stakeholder 每個人都說「我這個最重要」。沒有共同框架，PO 排序變成政治。
優先級矩陣（RICE、Value-Effort、MoSCoW）的價值不是「精準」，而是**讓所有人在同一張表上比較**。
數字會逼出真實 trade-off：價值多大、要花多少、有多確定、影響多廣。

## 誰負責、和誰對接

- **主責：** PO（最終排序）/ PM（提供商業價值權重）
- **協作：** Dev Lead（估 effort 與信心）、UX（驗證 user impact）
- **下游收件：** PO 排 backlog、sprint planning 決定 scope

## 何時用、何時不用

- ✅ **必要時機：** Backlog ≥ 30 item、跨 squad 競爭資源、stakeholder 意見分歧
- ❌ **不需要時：** Backlog < 10 item、緊急 incident、合規硬性截止
- ⚠️ **常見誤用：** 把分數當絕對真理（RICE 是相對排序工具，不是預測 ROI）；忽略「不做的成本」（opportunity cost）

## AI 怎麼加速

把 backlog 餵給 AI 做 RICE 評分草稿。

```
Prompt: 你是熟悉 RICE 框架的 PO。對以下 backlog item 評分：
1) Reach（每季影響使用者數）
2) Impact（0.25/0.5/1/2/3，每位使用者影響力）
3) Confidence（%，信心程度）
4) Effort（person-month）
5) RICE score = R × I × C / E
產出：
- 完整評分表
- 前 10 名 ranked list
- 標出信心 < 50% 的 item（建議先做 spike）

[backlog...]
```

回審重點：分數是否誠實（Confidence 容易高估）、是否反映真實 opportunity cost。
