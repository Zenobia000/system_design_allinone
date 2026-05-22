---
title: "使用者研究"
slug: "user-research"
stage: "discovery"
roles: ["ux", "pm"]
order: 1
hook: "用真實證據打掉腦補假設"
when_to_use: "新題目啟動、conversion 異常、KPI 停滯時必要"
ai_leverage: "用 Claude 把訪談錄音逐字稿 → 萃取 pain point 與 quote 庫"
art: "/generated/stage-discovery.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

跳過使用者研究就動工，等於用 PM 的個人偏好賭整個 sprint 的成本。
沒有研究證據，後面的 PRD、flow、metric 全是猜的；上線後 KPI 不動，沒人知道是題目錯、設計錯、還是執行錯。

## 誰負責、和誰對接

- **主責：** UX（規劃方法、執行訪談、做 synthesis）
- **協作：** PM（提供商業問題與 hypothesis）、BA（補 stakeholder 視角）
- **下游收件：** PM（寫 PRD）、UX（畫 journey/flow）、PO（refine backlog）

## 何時用、何時不用

- ✅ **必要時機：** 新題目啟動、conversion funnel 出現異常、KPI 連續兩季停滯
- ❌ **不需要時：** Bug fix、純技術 spike、已有近三個月內可信研究資料
- ⚠️ **常見誤用：** 只訪問內部同事當「使用者」、用問卷問偏好不問行為

## AI 怎麼加速

把訪談錄音轉逐字稿後，讓 AI 做第一輪 synthesis；人工只做主題判讀與決策。

```
Prompt: 你是資深 UX researcher。以下是 8 份訪談逐字稿。
1) 萃取每位受訪者的 top 3 pain points（用原句 quote）
2) 跨受訪者歸納 5 個高頻 theme，附支持的 quote 數
3) 標出 ≥ 3 個與既定假設衝突的訊號
不要編造未出現的內容。

[逐字稿...]
```

回審重點：人工判斷 quote 是否被斷章取義、theme 是否真有 actionable 意涵。

---

> Source: deep-research-report.md §產品與需求相關角色
