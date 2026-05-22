---
title: "Canary Strategy · 灰度策略"
slug: "canary-strategy"
stage: "ship"
roles: ["devops"]
order: 41
hook: "讓上線變成可觀測的實驗，而不是一次性押注"
when_to_use: "blast radius 大、SLO 緊、或新邏輯需真實流量驗證時"
ai_leverage: "用 Claude 從 SLO 推導 canary 階段門檻"
art: "/generated/stage-ship.png"
source: "deep-research-report.md §Deployment, Netflix canary"
---

## 解決什麼問題

Big bang release 在意外面前無能為力。Canary 把流量切片，先放 1%、5%、25%，每階段以 SLI 為門檻自動晉級或退回。

## 誰負責、和誰對接

- **主責：** DevOps
- **協作：** SRE 設 SLI、Dev 設 feature flag、PO 確認業務指標
- **下游收件：** Release Plan、Rollback Plan

## 何時用、何時不用

- ✅ **必要時機：** 核心路徑變更、性能敏感、規模 ≥ 數萬 DAU
- ❌ **不需要時：** 內部工具、低流量服務
- ⚠️ **常見誤用：** 只看 HTTP 5xx 不看業務指標；canary 與 baseline 環境不對等

## AI 怎麼加速

讓 Claude 從 SLO 與業務指標推導每階段門檻、樣本量、停留時間。

```
你是 release SRE。給定 SLO 與業務指標，
產出 canary 階段表：流量比例、停留時間、晉級條件、退回條件、所需樣本量。
SLO + KPI：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: deep-research-report.md §Deployment, Netflix canary
