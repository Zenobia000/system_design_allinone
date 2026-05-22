---
title: "競品掃描"
slug: "competitive-scan"
stage: "discovery"
roles: ["pm", "ba"]
order: 5
hook: "找出對手做了什麼、沒做什麼、為什麼"
when_to_use: "進入新市場、評估差異化定位、stakeholder 質疑「為何要做」時"
ai_leverage: "用 Claude 同時分析多家對手 landing page + pricing + review"
art: "/generated/stage-discovery.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

不看對手，容易做出「對手早做過、且已驗證失敗」的功能；或反過來，盲抄對手 feature list 而忽略自家定位。
競品掃描的價值不是抄，而是**找定位空隙與技術可行邊界**。

## 誰負責、和誰對接

- **主責：** PM（最終決策定位）
- **協作：** BA（補 stakeholder 與法遵限制）、行銷（補 GTM 訊息）
- **下游收件：** PM 寫 PRD positioning、Architect 評估技術可行性

## 何時用、何時不用

- ✅ **必要時機：** 進新市場、做差異化定位、向 stakeholder 解釋「為何不抄某對手」
- ❌ **不需要時：** 內部工具、合規限期任務、純技術升級
- ⚠️ **常見誤用：** 只比 feature checkmark，不看 pricing、定位、客群、tech debt；feature 多 ≠ 贏

## AI 怎麼加速

把對手官網、定價頁、評論餵給 AI 做結構化整理。

```
Prompt: 你是產品策略顧問。分析以下 5 家對手資料：
1) 核心定位（一句話）
2) 主要客群與 use case
3) 定價結構與 monetization 邏輯
4) 三大優勢與三大弱點（附 review 證據）
5) 技術棧推測（如有公開資料）
最後產出一張比較表 + 我方可切入的 3 個定位空隙。

[對手資料...]
```

回審重點：是否真有差異化空間、是否高估自家能力。
