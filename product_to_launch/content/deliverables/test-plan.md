---
title: "Test Plan · 測試計畫"
slug: "test-plan"
stage: "build"
roles: ["qa"]
order: 36
hook: "用一張表決定『要測什麼、不測什麼、誰簽』"
when_to_use: "release 含跨模組變更、合規驗收或對外承諾時"
ai_leverage: "用 Claude 把 acceptance criteria 對應到測試層級"
art: "/generated/stage-build.png"
source: "deep-research-report.md §Verification, ISO/IEC/IEEE 29119"
---

## 解決什麼問題

QA 在 release 前最大的成本不是執行測試，是搞清楚「這次到底要不要測它」。Test Plan 是與 PM/Dev 對焦範疇、層級、退場條件的合約。

## 誰負責、和誰對接

- **主責：** QA Lead
- **協作：** PM/PO 確認 acceptance、Dev 提供變更面、SRE 提供風險面
- **下游收件：** Test cases、Release Gate、Go/No-Go

## 何時用、何時不用

- ✅ **必要時機：** Release 含 schema migration、外部介面變更、合規審查
- ❌ **不需要時：** flag 控制的小改動、純文案
- ⚠️ **常見誤用：** 抄上一版只改日期；exit criteria 寫「全部通過」

## AI 怎麼加速

讓 Claude 把 PRD acceptance 對應到 unit/integration/E2E/perf/security 五層，並標出缺測試的需求項。

```
你是 QA Lead。讀 PRD acceptance criteria，
輸出測試計畫：每條需求對應測試層級、所需資料、環境、exit criteria。
標出無法測試或缺資料的需求。
PRD：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: deep-research-report.md §Verification, ISO/IEC/IEEE 29119
