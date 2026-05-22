---
title: "上線"
title_en: "Ship"
slug: "ship"
num: "05"
hook: "讓代碼安全地走向使用者"
exit_criteria: "evidence-based go/no-go、可觀測、可回滾、runbook ready"
typical_stuck: "test 環境不像 production、exit criteria 不清、canary 沒監控"
art: "/generated/stage-ship.png"
source: "software_develop_journey/process_map/index.html §ship"
---

## 這個階段要回答什麼

**「敢不敢上？炸了怎麼救？」** Ship 不是「按下 deploy 按鈕」，是用證據決策、不用氣氛決策。

**核心 gate**：Release Readiness Review——build、defect、perf、security、rollback 五件事齊全才上。

## 必要產出

- **Test Completion Report**（QA） — exit criteria 達成證據
- **Release Readiness Doc**（Dev Lead/QA/DevOps） — go/no-go 證據
- **Runbook**（DevOps/SRE） — deploy / rollback / alert / escalation
- **Rollout Plan**（DevOps） — canary / staged rollout 策略
- **Dashboards & Alerts**（SRE） — 上線後第一個 24 小時看什麼

## 典型卡關

- **Test 環境不像 production**：data shape、流量、latency 都不一樣，UAT 通過上線就炸
- **Exit criteria 不清**：「測完了」算什麼？要有書面定義
- **Canary 沒監控**：灰度上去但沒在看 dashboard、出事不知道
- **Fallback 弄反**：本來只是局部故障，fallback 邏輯把全站打爆

## AI 加速哪些事

**Runbook draft、release note、checklist 生成。** AI 能整理 checklist，但 go/no-go 還是要人扛責任。

加速範例：`基於這份 incident 歷史，生 deploy runbook 與 5 個最常踩的回滾步驟`。
