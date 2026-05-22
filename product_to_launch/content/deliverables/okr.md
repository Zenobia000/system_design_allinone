---
title: "OKR · 目標與關鍵結果"
slug: "okr"
stage: "define"
roles: ["pm", "po"]
order: 9
hook: "把產品方向翻成可衡量的季度承諾"
when_to_use: "季度規劃、跨團隊對齊、需要在多個 backlog item 間排優先序時"
ai_leverage: "用 Claude 從北極星指標反推可量化 Key Result"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

backlog 上一百個 item，每個 sprint 還是只能做五個。沒有 OKR，排序變成「誰嗓門大誰先做」。
OKR 的價值不是 KPI 別名，而是**強迫團隊在季度內只承諾少數幾個結果**，其他都得讓位。
寫不出 OKR，通常代表產品策略本身就模糊。

## 誰負責、和誰對接

- **主責：** PM（提案 Objective）/ PO（落地到 backlog）
- **協作：** Stakeholders（對齊商業目標）、Dev Lead（驗證 capacity）
- **下游收件：** PO 排 backlog、Dev Lead 排 sprint、Stakeholders 追進度

## 何時用、何時不用

- ✅ **必要時機：** 季度規劃、跨 squad 協作、團隊 ≥ 10 人
- ❌ **不需要時：** 小團隊單一明確目標、緊急 incident response 階段
- ⚠️ **常見誤用：** Objective 寫成 task list（「完成 feature A」）、Key Result 不可量測（「提升使用者滿意度」）；KR 必須有數字與量測方式

## AI 怎麼加速

從北極星指標 + 商業目標反推候選 KR。

```
Prompt: 你是 OKR 教練。根據以下北極星指標 + 本季商業目標：
1) 寫 1-3 個 Objective（質性、有方向感）
2) 每個 Objective 配 2-4 個 Key Result，
   格式："將 X 從 A 提升到 B（by 季末）"
3) 標出哪些 KR 互為 trade-off
4) 估計每個 KR 達成的信心分數（0-10）

[輸入...]
```

回審重點：KR 是否真能反映 Objective、是否太保守（信心 > 8）或太激進（信心 < 3）。
