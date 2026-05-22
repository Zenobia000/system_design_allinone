---
title: "運維"
title_en: "Operate"
slug: "operate"
num: "06"
hook: "讓系統在凌晨三點還活著"
exit_criteria: "SLO 達成、error budget 不超支、incident 有 postmortem 與 action item"
typical_stuck: "alert 設滿沒人看、postmortem 變甩鍋大會、issue 不回寫 backlog"
art: "/generated/stage-operate.png"
source: "software_develop_journey/process_map/index.html §operate"
---

## 這個階段要回答什麼

**「上線之後呢？」** 多數團隊以為 ship 就結束——但軟體真正的成本，70% 在 operate。

**核心循環**：observe → learn → re-prioritize。production signal 必須能回寫 backlog，否則下個 release 還是踩同一個坑。

## 必要產出

- **SLO / SLI / Error Budget**（SRE） — 服務目標與餘額
- **Alerts & Dashboards**（SRE/DevOps） — 看得到、看得懂
- **Postmortem**（SRE/Dev Lead） — timeline、root cause、action
- **Capacity Plan**（SRE） — 未來 1-2 季的成長預估
- **On-call Rotation**（DevOps/SRE） — 誰扛、何時扛、怎麼交接

## 典型卡關

- **Alert 設滿沒人看**：alert fatigue，重要的 alert 被淹沒
- **Postmortem 變甩鍋大會**：要 blameless、focus on system
- **Issue 不回寫 backlog**：同個 bug 修 3 次因為沒進 backlog
- **Error budget 不用**：永遠在燒、沒人覺得要還

## AI 加速哪些事

**Log 摘要、incident timeline 整理、postmortem draft、alert rule 建議。** Incident 當下 AI 能輔助看 dashboard，但決定先救誰、先告知誰要人扛。

加速範例：`從這份 incident timeline 生 postmortem draft、按 5-why 列 root cause 與 action item`。
