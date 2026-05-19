---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.3 · Monolith vs Microservices'
footer: 'AI 時代系統設計速成 '
---

## D.3 · 微服務 vs 模組化單體

<span class="kicker">DECISION · 何時切？</span>

# 不要為了「業界都這樣」就切

<!-- _class: compact -->

| 維度 | 模組化單體 | 微服務 |
|---|---|---|
| 適合團隊 | < 20 人 | > 50 人 |
| 部署複雜度 | 1 個 | N 個 |
| 跨團隊獨立發版 | 否 | 是 |
| 跨模組 refactor | 容易 | 痛苦 |
| 維運成本 | 低 | 高（K8s, mesh） |
| 故障定位 | 集中 log | 需 distributed tracing |
| 一致性 | DB 事務 | Saga / 補償 |

<br>

**5 個「該切」訊號**：
1. 團隊 > 30 人，互相阻擋 deploy
2. 某模組規模需求遠大於其他（如 ML inference）
3. 不同模組需不同 stack（如 Python ML + Go API）
4. 不同模組需不同 SLO
5. 法規隔離（PCI 服務獨立）

<br>

<span class="muted">**金句**：先模組化（單體內邊界清楚），規模到了再切服務。順序錯 = 痛。</span>

> Source: software_architect/ppt/_source/08_Advanced_Patterns.md · §Microservices
