---
title: "C4 圖 · 四層架構視圖"
slug: "c4-diagram"
stage: "design"
roles: ["architect", "sa"]
order: 24
hook: "用四層抽象讓每種角色看到「他需要看的那層」"
when_to_use: "跨系統整合、新人 onboarding、stakeholder 溝通架構時"
ai_leverage: "用 Claude 從現有 codebase + ADR → C4 diagram 描述（PlantUML/Mermaid）"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色 / §開發生命週期"
---

## 解決什麼問題

Architect 在白板上畫一張圖，工程師看不懂、PM 看不懂、SRE 看不懂——因為每個人想看的抽象層不同。
C4 模型（Context / Container / Component / Code）的價值是**分層**：高層給 stakeholder、中層給工程師、低層給 code reviewer。
沒有 C4，每次溝通都得重畫一張新圖。

## 誰負責、和誰對接

- **主責：** Architect
- **協作：** SA（補系統行為）、Dev Lead（補實作脈絡）、SRE（補營運視角）
- **下游收件：** 工程團隊（理解邊界）、新人（onboarding）、stakeholder（理解整體）

## 何時用、何時不用

- ✅ **必要時機：** 跨系統整合、團隊 ≥ 10 人、有外部 stakeholder 需要溝通架構
- ❌ **不需要時：** 單一 monolith 小團隊、PoC、純前端 SPA
- ⚠️ **常見誤用：** 一張圖塞所有東西（變成義大利麵）；每層 C4 應**對應一種讀者**，不要混層

## AI 怎麼加速

從 codebase + ADR 反推 C4 描述。

```
Prompt: 你是熟悉 C4 model 的 architect。根據以下系統資料：
1) Level 1 (Context)：列出 system + external actors + 外部系統
2) Level 2 (Container)：列出 web / mobile / api / db / queue / cache，含技術選型
3) Level 3 (Component)：對核心 container 拆 component
4) 用 Mermaid 語法輸出每層
5) 標出 ≥ 3 個架構風險點（單點故障、cyclic dependency）

[系統資料...]
```

回審重點：各層是否分得乾淨（不混雜 component 進 context）、技術選型是否與 ADR 一致。
