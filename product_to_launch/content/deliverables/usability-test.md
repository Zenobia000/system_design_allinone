---
title: "可用性測試"
slug: "usability-test"
stage: "design"
roles: ["ux"]
order: 22
hook: "上線前抓出「使用者真的會卡」的點"
when_to_use: "新功能首版、改版重大互動、高風險 flow 簽核前"
ai_leverage: "用 Claude 把測試錄影逐字稿 → finding 報告 + 優先級"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PM、UX、Dev 自己測得很順，是因為他們知道流程。真實使用者第一次看，常常卡在「找不到按鈕」「不懂這欄要填什麼」。
可用性測試是**上線前最便宜的 bug 攔截網**：5 個使用者通常能抓出 80% 的可用性問題。
不做 usability test，bug 會延到上線後抓，成本高 10 倍。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（驗證商業優先序）、UI（補設計修正）、PO（決定是否延期上線）
- **下游收件：** UI 修 mockup、PM 調整 scope、Dev 補 edge case

## 何時用、何時不用

- ✅ **必要時機：** 新功能首版、改版核心 flow、高風險互動（金流/註冊）
- ❌ **不需要時：** Bug fix、micro-interaction 調整、內部工具僅自己用
- ⚠️ **常見誤用：** 找錯使用者（同事、家人）、引導性提問（「這裡是不是很簡單？」）；NN/g 建議 **5 個目標使用者 / round** 是最低成本最高效率

## AI 怎麼加速

把測試錄影逐字稿丟給 AI 萃取 finding。

```
Prompt: 你是 UX researcher。根據以下 5 份使用者測試逐字稿：
1) 萃取 finding，每個附 quote + 任務完成狀態
2) 按嚴重度分級：critical（無法完成任務）/ major（卡住但繞過）/ minor（不影響任務）
3) 跨 5 位使用者統計每個 finding 的命中率
4) 對每個 critical/major finding 提出 2 個修正方向

[逐字稿...]
```

回審重點：finding 嚴重度是否誇大、是否區分「個別使用者問題」與「系統性問題」。
