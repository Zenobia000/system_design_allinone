---
title: "價值假設卡"
slug: "value-hypothesis"
stage: "discovery"
roles: ["po", "pm"]
order: 6
hook: "把「我覺得有用」翻成可驗證的假設"
when_to_use: "新功能進 backlog 前、需要決定是否投入 sprint 資源時"
ai_leverage: "用 Claude 把模糊想法 → 可驗證假設 + 驗證實驗"
art: "/generated/stage-discovery.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

backlog 上很多 item 是「老闆說要做」「對手有」「客戶提過一次」。
不寫價值假設，就會把高成本工程資源花在沒人在乎的功能。
價值假設卡逼團隊寫清楚：**對誰、解什麼、為何相信會 work、如何驗證**。

## 誰負責、和誰對接

- **主責：** PO（最終排進 backlog）
- **協作：** PM（提供 discovery 資料）、UX（補 user evidence）
- **下游收件：** PM 寫 PRD、Dev Lead 評估成本、QA 設計驗證指標

## 何時用、何時不用

- ✅ **必要時機：** 新功能 ideation、估時 > 1 個 sprint、不確定使用者買不買單
- ❌ **不需要時：** Bug fix、合規限期任務、純技術重構
- ⚠️ **常見誤用：** 把假設寫成「使用者一定會喜歡」這種不可證偽的句子；假設必須有可量測的 leading indicator

## AI 怎麼加速

把模糊 idea + discovery 資料丟給 AI 寫成假設卡 + 對應實驗。

```
Prompt: 你是 lean product 顧問。將以下 idea 寫成價值假設卡：
1) 假設陳述："我們相信 [行為改變] 對 [使用者] 有價值，
   因為 [理由]。我們會用 [指標] 驗證。"
2) 信心評分（low/med/high）+ 評分理由
3) 最小可驗證實驗（cost < 1 週、不寫程式版本）
4) Kill criteria（什麼結果出現就放棄）

Idea：[輸入...]
```

回審重點：指標是否真的可量測、kill criteria 是否誠實（不要寫成「不管結果如何都繼續做」）。
