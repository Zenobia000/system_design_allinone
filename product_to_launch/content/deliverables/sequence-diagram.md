---
title: "Sequence Diagram · 時序圖"
slug: "sequence-diagram"
stage: "design"
roles: ["sa", "architect"]
order: 27
hook: "把跨服務互動的順序、失敗、回滾畫清楚"
when_to_use: "跨 ≥ 3 服務互動、有異步事件、有重試/補償邏輯時"
ai_leverage: "用 Claude 從 API spec + use case → Mermaid sequence diagram"
art: "/generated/stage-design.png"
source: "deep-research-report.md §開發生命週期 / §三個實務場景"
---

## 解決什麼問題

跨服務 flow 用文字描述「A 呼叫 B 然後 B 呼叫 C」很容易遺漏 timeout、retry、失敗回滾的細節。
Sequence Diagram 強迫把**時間順序、訊息類型、失敗路徑、補償交易**畫出來，是發現 race condition 與 idempotency 漏洞的最便宜工具。
不畫，整合測試才發現第三方失敗時 order 變孤兒、付款重複扣款。

## 誰負責、和誰對接

- **主責：** SA / Architect
- **協作：** BE（驗證實作可行）、SRE（補 failure mode）、QA（設計整合測試）
- **下游收件：** BE 實作、QA 寫 integration test、SRE 設計 alert

## 何時用、何時不用

- ✅ **必要時機：** 跨 ≥ 3 服務、有異步事件、有交易補償、外部 API 整合
- ❌ **不需要時：** 單服務內部呼叫、純 CRUD
- ⚠️ **常見誤用：** 只畫 happy path，沒畫 timeout / retry / rollback；AWS Builders' Library 強調**重試不是免費的**，必須畫 backoff + jitter + idempotency

## AI 怎麼加速

從 API spec + use case 產 Mermaid sequence。

```
Prompt: 你是熟悉分散式系統的 SA。根據以下 use case + API spec：
1) 畫 Mermaid sequenceDiagram（含所有參與者）
2) 標註每個訊息的：sync/async / timeout / retry policy
3) 畫 happy path + 至少 2 個 failure path（包含補償交易）
4) 標出 idempotency key 用在哪些 endpoint
5) 列出 ≥ 3 個 race condition 風險點

[輸入...]
```

回審重點：failure path 是否真實（不是只畫 happy）、補償交易是否考慮、idempotency 是否標清楚。
