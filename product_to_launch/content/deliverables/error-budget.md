---
title: "Error Budget · 誤差預算"
slug: "error-budget"
stage: "operate"
roles: ["devops"]
order: 45
hook: "把『要不要繼續發新功能』變成可計算的決策"
when_to_use: "SLO 已定義、且團隊需要在新功能 vs 穩定性間做取捨時"
ai_leverage: "用 Claude 從 SLI 時序資料算出剩餘 budget 與燃燒率"
art: "/generated/stage-operate.png"
source: "Google SRE Workbook, deep-research-report.md §SRE"
---

## 解決什麼問題

Error Budget 是 SLO 的反面：允許的不可用度。它把「Dev 想 ship、SRE 想 freeze」的政治問題變成簡單規則：budget 沒用完就 ship，用完就 freeze 高風險變更。

## 誰負責、和誰對接

- **主責：** DevOps / SRE
- **協作：** PO 接受 freeze 規則、Dev Lead 排重點修復
- **下游收件：** Release Plan、Capacity Planning、Incident Report

## 何時用、何時不用

- ✅ **必要時機：** 有 SLO 且穩定性與交付速度產生衝突
- ❌ **不需要時：** 沒 SLO；budget 從未影響決策
- ⚠️ **常見誤用：** budget 燒完仍照常 ship；budget 政策無人簽核

## AI 怎麼加速

讓 Claude 從 SLI 時序計算月度剩餘 budget、燃燒率、預估耗盡時間。

```
你是 SRE。讀下列 SLI 時序資料與 SLO，
計算：累積 error budget 消耗、目前燃燒率、預估耗盡日、近 7 日 top 燃燒事件。
Data：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: Google SRE Workbook, deep-research-report.md §SRE
