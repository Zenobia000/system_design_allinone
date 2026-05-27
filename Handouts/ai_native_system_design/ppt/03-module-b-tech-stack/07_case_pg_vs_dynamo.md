---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.7 · Case · PostgreSQL vs DynamoDB'
footer: 'AI 時代系統設計速成 '
---

## B.7 · 案例：PostgreSQL vs DynamoDB

<span class="kicker">REAL DECISION · 用 B.1-B.6 套</span>

# 情境：multi-tenant SaaS，預期 100K tenants

<!-- _class: compact -->

| 維度 | PostgreSQL | DynamoDB |
|---|---|---|
| 規模上限 | 單機到 10M rows OK，要 sharding | 自動 scale，無上限 |
| 查詢彈性 | 任意 SQL、JOIN | 必須照 key/index 設計 |
| 一致性 | 強 | 預設 eventual，可開 strong |
| 成本（小規模） | $200/月 RDS | $50/月（按用量） |
| 成本（大規模） | $10K/月 + Sharding 人力 | $5K/月（純按用量） |
| 學習曲線 | 0（團隊熟） | 3 個月（設計顛覆） |
| TCO 3 年 | $80K | $250K + 3 月學習 |
| 反悔成本 | 換 NoSQL 高 | 換 SQL 高（雙向都痛） |

<br>

**結論**：100K tenants 預期 → PostgreSQL + sharding by tenant_id 較划算（在 team 熟悉前提下）。
若團隊已熟 DynamoDB 且 query 模式單純 → DynamoDB 更省維運。

<br>

<span class="muted">**金句**：選型沒有「正確答案」，只有「對你正確」。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md
