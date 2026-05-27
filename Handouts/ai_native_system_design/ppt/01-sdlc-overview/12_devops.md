---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.01 · DevOps / SRE'
footer: 'AI 時代系統設計速成 '
---

## ROLE 9 · DevOps / SRE

<span class="kicker">物業 + 24h 保全 + 消防</span>

# 上線後活下去—把「半夜被叫起來」變罕見

<br>

**經典產出**：IaC、CI/CD、監控、告警、runbook、SLO 文件、事故報告。

**判斷力核心**：
- SLO 設多少（99.9% vs 99.99% 成本差 10 倍）？
- 該不該為這個 alert 半夜叫人？
- incident 後改流程 vs 改架構？

<br>

<span class="muted">📗 想看完整角色 → software_develop_journey/ppt/10-devops-sre/</span>

> Source: _source/braindump.md · §AI 取代不了的核心判斷


---


## DevOps · AI 協作模式

<div class="prompt">

**典型 prompt**：

```
SLO：99.95% availability, P99 latency < 300ms
Stack：K8s on AWS, PostgreSQL, Redis, Kafka
請生成：
1. Prometheus alert rules（5 個 critical, 10 個 warning）
2. 對應 runbook（每個 alert 一段：原因 / 確認 / 緩解 / 升級）
3. Terraform module 骨架（VPC + EKS + RDS）
```

</div>

<br>

**AI 強**：Terraform、CI yaml、Prometheus rule、runbook 模板、Grafana JSON。
**AI 弱**：incident 決策樹、SLO 跟業務談判、成本最適化。
**陷阱**：AI 生的告警「太敏感」—噪音多會讓人忽視真正的問題。

> Source: _source/braindump.md · §AI 工作流的 7 個常見地雷
