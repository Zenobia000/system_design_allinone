---
title: "建造"
title_en: "Build"
slug: "build"
num: "04"
hook: "把藍圖變成跑得起來的代碼"
exit_criteria: "CI 綠燈、DoD 滿足、可部署、test ready"
typical_stuck: "code 完成但不可部署、缺 feature flag、telemetry 沒埋、'我 local 沒 bug'"
art: "/generated/stage-build.webp"
source: "software_develop_journey/process_map/index.html §build"
---

## 這個階段要回答什麼

**「能不能合、能不能測、能不能部署？」** Build 不只是寫 code，是讓每個 PR 都帶著 test、telemetry、feature flag 一起合進來。

**核心心態**：「完成」不是「我 local 跑得起來」，是「可以安全地推到 production」。

## 必要產出

- **Code + Tests**（Dev） — unit / integration / E2E hooks
- **Migrations**（DBA/Dev） — 跟 application code 一起 version control
- **Telemetry**（Dev） — log / metric / trace 埋點
- **Test Cases & Automation**（QA） — 含 negative path
- **Pipeline Gates**（DevOps） — lint → test → build → deploy

## 典型卡關

- **「我 local 沒 bug」**：環境差異，staging 要像 production
- **缺 feature flag**：上線了沒法回滾、沒法灰度
- **Telemetry 後補**：上線後不知道哪裡慢、哪裡錯
- **API contract 漂移**：FE 與 BE 各自實作、合不上

## AI 加速哪些事

**Boilerplate、unit test、refactor、code review 第一輪。** AI 寫得快，但驗證它寫的對不對還是要人。

加速範例：`基於這個 service 補 unit test，目標 line coverage 80%、含 negative case`。
