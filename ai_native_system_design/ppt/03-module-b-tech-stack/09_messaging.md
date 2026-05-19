---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.9 · Messaging Selection'
footer: 'AI 時代系統設計速成 '
---

## B.9 · 訊息系統選型

<span class="kicker">MESSAGING · 4 種主流</span>

<!-- _class: compact -->

| 工具 | 模型 | 殺手場景 | 反例 |
|---|---|---|---|
| **Kafka** | 持久化 log + consumer group | event sourcing, 大量 fanout, 重放 | 簡單 task queue |
| **RabbitMQ** | broker + queue | 任務分派, RPC, 路由複雜 | 100K+ msg/s |
| **SQS** | managed queue | AWS 內輕量 | 順序保證 / 重放 |
| **Redis Stream** | log-like in Redis | 中等吞吐 + 已用 Redis | 永久保留 |

<br>

**判斷流程**：

```
需要 replay (重新處理過去訊息)? → Kafka
需要複雜路由 (fanout/topic)? → RabbitMQ 或 Kafka
只是任務佇列 + AWS? → SQS
已有 Redis + 量不大? → Redis Stream
都不確定? → 一開始用資料庫 polling 也行
```

<br>

<span class="muted">**金句**：每個訊息系統都有「不適合的工作」，沒有萬用解。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §Messaging
