---
title: "Persona · 使用者輪廓"
slug: "persona"
stage: "discovery"
roles: ["ux", "pm"]
order: 3
hook: "讓團隊在爭論時有共同的「他」"
when_to_use: "團隊規模 ≥ 5 人、需要跨職能共識「我們在為誰做」時"
ai_leverage: "用 Claude 把訪談資料聚類成 3-5 個 persona 草稿"
art: "/generated/stage-discovery.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

沒有 persona，每個人腦中的「使用者」都不一樣。PM 想的是高階主管、設計想的是年輕族群、工程想的是自己。
PRD 上爭論不休，本質是因為大家在為不同的人設計。
Persona 不是行銷文案，是團隊內部對齊「他是誰、他在乎什麼」的最小協議。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（驗證商業價值優先序）、BA（補 stakeholder 視角）
- **下游收件：** UX 畫 journey、PM 寫 PRD、行銷做 GTM 訊息

## 何時用、何時不用

- ✅ **必要時機：** 跨團隊新產品、目標使用者多元、需要 GTM 對齊
- ❌ **不需要時：** 內部工具且使用者就是團隊自己、單一明確 B2B 客戶
- ⚠️ **常見誤用：** persona 寫成人口統計學履歷（年齡、收入）卻沒有「動機、痛點、決策邏輯」

## AI 怎麼加速

把訪談、客服紀錄、客戶資料丟給 AI 做初步聚類。

```
Prompt: 你是 UX researcher。根據以下 20 份訪談摘要，
聚類成 3-5 個 persona，每個 persona 包含：
1) 一句話 elevator pitch
2) 主要動機與 jobs-to-be-done
3) 三個關鍵 pain point（附 quote）
4) 決策邏輯與資訊來源
不要編造未在資料中出現的特質。

[資料...]
```

回審重點：persona 是否能被團隊輕易區辨、是否有 actionable 設計含意。
