---
title: "非功能需求 · NFR"
slug: "non-functional-reqs"
stage: "design"
roles: ["architect", "sa"]
order: 30
hook: "把『要很快、要很穩』改寫成可驗收的數字"
when_to_use: "功能規格已寫，但延遲、容量、可用性、安全還只是形容詞"
ai_leverage: "用 Claude 把 PRD 形容詞轉成 SLI/SLO/threshold 候選"
art: "/generated/stage-design.png"
source: "software_architect/ppt/05-ilities, ISO/IEC/IEEE 29148"
---

## 解決什麼問題

功能對了不代表上線後能活。NFR 把效能、可靠性、安全、可維運、合規寫成可量測條件，是 ADR 與 Capacity Plan 的輸入。

## 誰負責、和誰對接

- **主責：** Architect + SA
- **協作：** PM 對齊 business impact、SRE 對齊可達成性
- **下游收件：** Dev、QA、DevOps

## 何時用、何時不用

- ✅ **必要時機：** 新服務上線、SLA 對外承諾、跨系統依賴
- ❌ **不需要時：** 一次性工具、無使用者依賴
- ⚠️ **常見誤用：** 抄業界數字無證據；NFR 沒有對應測試與監控

## AI 怎麼加速

讓 Claude 把 PRD 裡每句模糊承諾轉成 ility 矩陣，人類再砍不可達或無意義的。

```
你是 system architect。讀以下 PRD，輸出 NFR 矩陣：
維度（perf/availability/security/scalability/operability）、
量測 SLI、目標閾值、量測方法、測試方式。
PRD：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: software_architect/ppt/05-ilities, ISO/IEC/IEEE 29148
