---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · Tech Selection'
footer: 'AI 時代系統設計速成 '
---

## C2.2 · 技術選型決策矩陣

<!-- _class: compact -->

| 元件 | 選 | 不選 | 理由 |
|---|---|---|---|
| 推送協定 | WebSocket | SSE, polling | 雙向、低 overhead |
| Gateway | 自建 Go + WebSocket | Pusher SaaS | 1M 連線成本 |
| Pub/Sub | Redis Stream + Kafka | RabbitMQ | Redis 即時 + Kafka 持久 |
| 房間路由 | Consistent Hash | DB lookup | 連線層快速 dispatch |
| 持久化 | Cassandra | PostgreSQL | 高寫吞吐、時序 |
| Cache | Redis | Memcached | room metadata, online list |
| CDN（影片） | Cloudflare Stream | self-host | 影片不是本案核心 |
| 監控 | Prometheus + 自訂 metric | CloudWatch | 連線、lag、fanout 指標 |

<br>

<span class="muted">**核心決策**：把連線層與業務層分離—連線層只管推送。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md
