---
title: "北極星指標"
slug: "north-star"
stage: "discovery"
roles: ["pm", "po"]
order: 7
hook: "全團隊只盯一個數字，避免局部最佳化"
when_to_use: "團隊 ≥ 10 人、跨 squad 協作、KPI 多到互相打架時"
ai_leverage: "用 Claude 從商業模式反推候選北極星 + counter-metric"
art: "/generated/stage-discovery.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

每個 squad 都在追自己的 KPI，結果整體產品 metric 不動甚至倒退。
北極星指標的價值不是「最重要的數字」，而是「**最能代表使用者持續獲得價值的數字**」。
沒有北極星，團隊容易追 vanity metric（DAU、註冊數），上線後沒人發現 retention 在崩。

## 誰負責、和誰對接

- **主責：** PM（提案）/ PO（落地到 backlog）
- **協作：** 數據團隊（補可量測性）、商業團隊（補 monetization 對齊）
- **下游收件：** 全團隊（每次 release 都對齊北極星）

## 何時用、何時不用

- ✅ **必要時機：** 團隊 ≥ 10 人、跨 squad、長期產品（非一次性專案）
- ❌ **不需要時：** 小團隊單一目標清楚、合規限期任務
- ⚠️ **常見誤用：** 把 revenue 當北極星（會誘導短期榨取使用者）；北極星應是**使用者價值的代理指標**，搭配 counter-metric 防偏

## AI 怎麼加速

把商業模式 + persona + 主要 use case 丟給 AI，產候選指標。

```
Prompt: 你是熟悉 Amplitude/Mixpanel 框架的數據顧問。
根據以下產品資料：
1) 提出 3 個候選北極星指標（公式 + 量測方式）
2) 每個附 2 個 counter-metric（防偏）
3) 評估每個指標的可操弄風險（被局部最佳化的可能）
4) 推薦最終人選與理由

[產品資料...]
```

回審重點：指標是否真能反映 long-term value、是否容易被作弊。
