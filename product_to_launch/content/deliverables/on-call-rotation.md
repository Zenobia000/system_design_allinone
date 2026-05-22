---
title: "On-Call Rotation · 值班輪值"
slug: "on-call-rotation"
stage: "operate"
roles: ["devops"]
order: 50
hook: "讓『誰接電話』有制度，不靠英雄主義"
when_to_use: "服務有外部使用者、需要 24x7 或業務時段覆蓋時"
ai_leverage: "用 Claude 統計告警分佈，反推合理輪值密度"
art: "/generated/stage-operate.png"
source: "Google SRE, PagerDuty incident response guide"
---

## 解決什麼問題

On-call 撐住的是可用性，但也撐垮人。輪值制度的目標是：覆蓋風險、平均負擔、明確升級路徑、可被工程師接受地長期執行。

## 誰負責、和誰對接

- **主責：** DevOps Manager / SRE Lead
- **協作：** HR/合規（加班規範）、Dev Lead（人員池）
- **下游收件：** Runbook、Incident Report、補休制度

## 何時用、何時不用

- ✅ **必要時機：** 對外服務、SLA ≥ 99.9%
- ❌ **不需要時：** 內部工具、無 paging 告警
- ⚠️ **常見誤用：** Primary 同時是 Secondary；無升級階梯；無補休

## AI 怎麼加速

讓 Claude 統計近 90 天告警時段分佈，推算可承受輪值間隔與 secondary 啟動頻率。

```
你是 SRE Manager。讀下列告警歷史，
產出輪值建議：班表結構、primary/secondary 工時上限、
升級條件、無聲告警處理、補休規則、KPI（MTTA、MTTR）。
Data：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
