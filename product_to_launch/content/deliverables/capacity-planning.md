---
title: "Capacity Planning · 容量規劃"
slug: "capacity-planning"
stage: "operate"
roles: ["devops", "architect"]
order: 51
hook: "在洪峰來臨前先把『撐不撐得住』算清楚"
when_to_use: "預期流量成長、季節性活動、或硬體/雲端預算規劃時"
ai_leverage: "用 Claude 從歷史 metric 推導成長曲線與 headroom"
art: "/generated/stage-operate.png"
source: "Google SRE Workbook, AWS Builders' Library"
---

## 解決什麼問題

擴容靠經驗很貴。Capacity Planning 用歷史 SLI、業務預估、單位成本，把「需要幾台、何時加、加哪一層」變成可審查決策。

## 誰負責、和誰對接

- **主責：** DevOps / SRE + Architect
- **協作：** PO 提供業務預估、Finance 對齊預算
- **下游收件：** Cost Monitor、ADR（擴容策略）、Release Plan

## 何時用、何時不用

- ✅ **必要時機：** 流量成長 ≥ 20%、季節活動、新區域擴展
- ❌ **不需要時：** 流量穩定、autoscaling 已足夠
- ⚠️ **常見誤用：** 只看 CPU；忽略 DB/queue/external quota；無 headroom 假設

## AI 怎麼加速

讓 Claude 對歷史 metric 跑成長外推 + 瓶頸辨識，列出最早撐不住的元件。

```
你是 capacity planner。讀下列 metric 歷史與業務預估，
輸出：成長曲線、各層 headroom、瓶頸元件、擴容方案、預估成本、決策時點。
Data：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
