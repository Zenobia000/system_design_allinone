---
title: "DevOps · SRE"
title_en: "DevOps · SRE"
slug: "devops"
num: "10"
hook: "讓系統在凌晨三點還活著"
hires_for: "把可重複部署、可觀測、可回滾從口號變成 pipeline"
fired_when: "把 alert 設滿、但沒人看、半夜爆炸還是靠運氣"
ai_leverage: "用 Claude 從 incident timeline 生 postmortem draft、補 runbook"
art: "/generated/role-hero-devops.webp"
source: "deep-research-report.md §DevOps/SRE"
---

## 這個角色做什麼

**DevOps 不是裝完伺服器就走的水電工，是 24 小時待命的物業管理。** CI/CD、IaC、監控、on-call、災難演練——這條鏈決定「上線後系統會不會死」。

**DevOps vs SRE**：DevOps 是文化+工具鏈；SRE 則是以 SLO / Error Budget 管理可靠性的角色（源自大型網路公司的可靠性工程實踐）。小公司一人扛全部。

## 主要產出

- **Pipeline** — lint → test → build → deploy 全自動
- **IaC** — Terraform / Helm / Ansible 版控
- **SLO / Alerts / Runbook** — 可觀測、可回滾、可值班
- **Postmortem** — incident 後的學習與防再發

## 跟誰對接

- **上游接：** Code、infra requirements、security gates、ADR
- **下游交：** Pipeline 給 Dev；dashboard 給 PM；runbook 給 on-call
- **常衝突：** 跟 Dev（「我 local 跑得起來」）、跟 PM（穩定性 vs 上市速度）

## AI 時代怎麼還能活著

**半夜 3 點 alert 響，AI 不會痛。** Incident 當下要決定先救誰、先告知誰、什麼時候開公告，這需要人的判斷與承擔。

加速範例：`基於這份 incident timeline，生 postmortem draft、列出 5 個 action item`。

## 何時該招這個角色

**進入 production、或一天部署超過 1 次** 時，沒專職 DevOps 等於每次上線都在賭。
