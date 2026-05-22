---
title: "Cost Monitor · 成本監控"
slug: "cost-monitor"
stage: "operate"
roles: ["devops"]
order: 52
hook: "讓雲端帳單變成可歸因、可預警的指標"
when_to_use: "雲端帳單 ≥ 月度預算門檻、或多團隊共用基礎設施"
ai_leverage: "用 Claude 從帳單明細抽異常 spike 與歸因建議"
art: "/generated/stage-operate.png"
source: "AWS Builders' Library, FinOps Foundation"
---

## 解決什麼問題

雲端成本失控大多不是被攻擊，是某個資源被遺忘。Cost Monitor 把帳單拆到服務 / 環境 / 團隊，並設燃燒率告警與預期 baseline。

## 誰負責、和誰對接

- **主責：** DevOps / FinOps
- **協作：** 各服務 owner、Finance、Architect（架構級成本決策）
- **下游收件：** Capacity Planning、Deprecation Plan、ADR

## 何時用、何時不用

- ✅ **必要時機：** 多服務共用 account、跨團隊預算、預期月度成長
- ❌ **不需要時：** 單人專案、定額預付
- ⚠️ **常見誤用：** 只看總額不分群；無 tag 規範；告警閾值絕對值而非比率

## AI 怎麼加速

讓 Claude 對近 30 天帳單明細抽 anomaly 與歸因候選，標記建議下一步。

```
你是 FinOps 分析師。讀下列帳單明細與 tag，
輸出：top 成長服務、anomaly spike、歸因團隊、優化候選（rightsizing/RI/廢棄資源）、預估節省。
Bill：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: AWS Builders' Library, FinOps Foundation
