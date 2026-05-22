---
title: "Incident Report · 事故報告"
slug: "incident-report"
stage: "operate"
roles: ["devops"]
order: 47
hook: "事故當下的事實流水帳，不是檢討會"
when_to_use: "達 SEV-1/2 等級或對外可見的服務劣化"
ai_leverage: "用 Claude 從 chatops log 抽 timeline 與 action 摘要"
art: "/generated/stage-operate.png"
source: "deep-research-report.md §Operation, Google SRE"
---

## 解決什麼問題

事故當下需要的是「現在誰在做什麼、影響範圍、預估恢復時間」的事實紀錄，不是分析。Incident Report 是 Postmortem 的輸入，不是替代品。

## 誰負責、和誰對接

- **主責：** Incident Commander
- **協作：** Scribe 紀錄、Comms 對外通報、on-call 執行
- **下游收件：** Postmortem、Customer Comms、合規

## 何時用、何時不用

- ✅ **必要時機：** SEV-1/2、SLO 燃燒 ≥ 閾值、外部使用者可感劣化
- ❌ **不需要時：** 預期維運、SEV-3 以下
- ⚠️ **常見誤用：** 把分析寫進來；缺時間戳；遺漏外部通報紀錄

## AI 怎麼加速

讓 Claude 從 chatops + alert log 抽出時間軸、action、impact，產出初稿。

```
你是 incident scribe。讀下列 chat log 與 alert log，
按時間軸輸出：detect、ack、mitigate、resolve；
列出 impact、affected scope、外部通報、未解問題。
Logs：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: deep-research-report.md §Operation, Google SRE
