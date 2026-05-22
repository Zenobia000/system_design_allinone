---
title: "JTBD · 任務驅動"
slug: "jtbd"
stage: "discovery"
roles: ["pm", "ux"]
order: 2
hook: "把功能慾望翻成使用者真正想完成的任務"
when_to_use: "團隊在爭論「要做哪個功能」而非「使用者要解什麼問題」時"
ai_leverage: "用 Claude 把 persona + scenario 反推 JTBD statement"
art: "/generated/stage-discovery.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PM 容易陷入「競品有這個功能我們也要做」的反應式思考。
JTBD 強迫團隊回到「使用者僱用這個產品是為了完成什麼任務」，避免功能堆疊但 KPI 不動。
沒有 JTBD，PRD 寫出來通常是 feature list，不是 problem statement。

## 誰負責、和誰對接

- **主責：** PM（最終陳述）
- **協作：** UX（提供研究素材）、PO（驗證與 backlog 對齊）
- **下游收件：** PM 寫 PRD、UX 設計 flow、QA 寫 acceptance

## 何時用、何時不用

- ✅ **必要時機：** 新功能 ideation、團隊在爭論「做不做」、進入新市場
- ❌ **不需要時：** 小修小補、技術債清理、合規限期任務
- ⚠️ **常見誤用：** 寫成「使用者想要更快」這種無 context 廢話；JTBD 必須含情境、動機、預期結果

## AI 怎麼加速

把使用者訪談與 persona 餵給 AI，產 JTBD draft，人工挑選與精煉。

```
Prompt: 你是熟悉 JTBD 框架的 PM。根據以下 persona 與訪談摘要，
寫出 5 個 JTBD statement，格式：
"When [situation], I want to [motivation], so I can [expected outcome]."
要求：
1) 聚焦動機與情境，不寫解決方案
2) 每個 JTBD 附支持的 quote 出處
3) 標出哪些 JTBD 彼此互斥

[資料...]
```

回審重點：JTBD 是否寫成解法（錯）、是否真有 evidence 支撐。

---

> Source: deep-research-report.md §產品與需求相關角色
