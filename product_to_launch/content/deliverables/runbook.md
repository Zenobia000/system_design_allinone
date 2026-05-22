---
title: "Runbook · 維運手冊"
slug: "runbook"
stage: "operate"
roles: ["devops"]
order: 46
hook: "凌晨三點被 page 的人能照做不用思考"
when_to_use: "任何已知告警、已知異常、或新服務上線前"
ai_leverage: "用 Claude 從 postmortem 與告警規則生成 runbook 草稿"
art: "/generated/key-deliverable-runbook.png"
source: "deep-research-report.md §Operation, Google SRE"
---

## 解決什麼問題

凌晨三點不是寫程式的好時機。Runbook 的目標是讓被 page 的人不需要理解設計也能正確處理告警，並把處理步驟轉成可自動化候選。

## 誰負責、和誰對接

- **主責：** DevOps / SRE，由服務 owner 維護
- **協作：** Dev Lead 提供失敗模式、Architect 補風險路徑
- **下游收件：** On-Call Rotation、Postmortem 改善項

## 何時用、何時不用

- ✅ **必要時機：** 每條 paging alert、每個新服務上線
- ❌ **不需要時：** 一次性事件、純資訊性告警
- ⚠️ **常見誤用：** 步驟寫「請聯絡 X」；過期未更新；無回滾路徑

## AI 怎麼加速

讓 Claude 讀告警規則 + 過往 postmortem 抽出常見處理步驟，產出 runbook 草稿。

```
你是 on-call SRE。讀下列告警規則與過往事件，
產出 runbook：症狀、可能原因、診斷指令、緩解步驟、升級條件、相關 dashboard。
Alert + history：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
