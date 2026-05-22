---
title: "Feature Flag · 功能旗標"
slug: "feature-flag"
stage: "build"
roles: ["dev", "po"]
order: 37
hook: "把『部署』與『發布』拆開"
when_to_use: "需要灰度、AB、kill switch、或 trunk-based 高頻部署時"
ai_leverage: "用 Claude 掃 code 找出該被 flag 包起來的高風險變更"
art: "/generated/stage-build.png"
source: "deep-research-report.md §Implementation, §Deployment, Netflix canary"
---

## 解決什麼問題

把上線風險從「不能合進主幹」變成「合進去但默認關閉」。Flag 是 trunk-based、canary、AB、kill switch 的共同基石。

## 誰負責、和誰對接

- **主責：** Dev 寫 flag、PO 決定開關時機
- **協作：** SRE 監控 flag 對 SLO 影響、QA 驗 on/off 雙路徑
- **下游收件：** Release Plan、Canary Strategy、Rollback Plan

## 何時用、何時不用

- ✅ **必要時機：** 高風險變更、AB 實驗、依賴未就緒、需逐步放量
- ❌ **不需要時：** 純 bug fix、安全 patch、UI 文字
- ⚠️ **常見誤用：** flag 不設過期；flag 之間互相耦合；on/off 路徑不測

## AI 怎麼加速

讓 Claude 對 diff 標出「應該被 flag 包起來」的變更類型，並產生 cleanup 任務。

```
你是 release engineer。讀下列 diff，
標出建議加 flag 的變更（理由：可逆性、blast radius、依賴未就緒）。
為每個 flag 產出：名稱、預設值、退役條件、owner。
Diff：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: deep-research-report.md §Implementation, §Deployment, Netflix canary
