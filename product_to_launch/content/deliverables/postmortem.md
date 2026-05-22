---
title: "Postmortem · 事後回顧"
slug: "postmortem"
stage: "operate"
roles: ["devops"]
order: 48
hook: "把『誰的錯』改寫成『系統的哪個缺口』"
when_to_use: "任何 SEV-1/2 事故、或重複出現的 SEV-3"
ai_leverage: "用 Claude 從 incident report 推系統性根因與改善候選"
art: "/generated/stage-operate.png"
source: "deep-research-report.md §Operation, Google SRE blameless postmortem"
---

## 解決什麼問題

Postmortem 的目的是讓系統變強，不是讓人變慘。Blameless 不是不負責，是讓改善焦點放在可重複的流程、工具、訓練缺口上。

## 誰負責、和誰對接

- **主責：** Incident Commander 主持，服務 owner 撰寫
- **協作：** 所有事故參與者、Architect 評估設計缺口
- **下游收件：** backlog 改善項、Runbook 更新、訓練計畫

## 何時用、何時不用

- ✅ **必要時機：** SEV-1/2、重複 SEV-3、近錯（near miss）有教學價值
- ❌ **不需要時：** 已知預期事件、無改善空間
- ⚠️ **常見誤用：** 寫成檢討個人；行動項無 owner、無 due date

## AI 怎麼加速

讓 Claude 從 incident report 拉出 5 Whys 候選與系統性改善建議，由人類取捨。

```
你是 SRE。讀下列 incident report，
產出：時間軸摘要、5 Whys 候選、contributing factors、
改善候選（流程/工具/訓練/設計）、每項建議 owner 與優先級。
Report：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: deep-research-report.md §Operation, Google SRE blameless postmortem
