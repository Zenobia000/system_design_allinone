---
title: "SLO · 服務等級目標"
slug: "slo"
stage: "operate"
roles: ["devops"]
order: 44
hook: "把『可用性』從感覺變成可量化的合約"
when_to_use: "服務有 ≥ 1 個外部 user 依賴、且需要對齊維運優先級時"
ai_leverage: "用 Claude 把使用者抱怨 → SLI candidates，再人工選 SLO 閾值"
art: "/generated/key-deliverable-slo.png"
source: "software_architect/ppt/02-requirements-sla, Google SRE"
---

## 解決什麼問題

「我們系統很穩」是無法 reviewable 的形容詞。SLO 把可用性與延遲定義為可量測 SLI + 閾值 + 觀察窗，是 error budget、告警、容量規劃的共同源頭。

## 誰負責、和誰對接

- **主責：** DevOps / SRE
- **協作：** PO 對齊使用者體驗、Architect 對齊系統能力
- **下游收件：** Error Budget、告警、Capacity Planning

## 何時用、何時不用

- ✅ **必要時機：** 使用者直接依賴、SLA 對外承諾、跨服務相互調用
- ❌ **不需要時：** 內部一次性工具、無使用者直接依賴
- ⚠️ **常見誤用：** 把 100% 當目標；SLI 量錯點（server side 而非 user side）

## AI 怎麼加速

讓 Claude 把客服票與使用者抱怨分群，產出 SLI 候選，再由人決定閾值。

```
你是 SRE。讀下列使用者抱怨樣本，
分群並產出 SLI 候選：量測點、量測方式、建議窗口、影響 user journey。
不要建議閾值，由人工決定。
Complaints：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
