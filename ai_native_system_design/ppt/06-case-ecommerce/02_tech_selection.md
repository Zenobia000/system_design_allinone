---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · Tech Selection'
footer: 'AI 時代系統設計速成 '
---

## C1.2 · 技術選型決策矩陣

<span class="kicker">SELECTION · 套用 Module B 框架</span>

<!-- _class: compact -->

| 元件 | 選 | 不選 | 理由 |
|---|---|---|---|
| 主 DB | PostgreSQL | Mongo, DynamoDB | 需強事務扣庫存 |
| 庫存熱層 | Redis（含 Lua 原子扣減） | 直接打 DB | 抗 100K QPS |
| 排隊削峰 | Kafka | 直接同步 | 把瞬間 100K 削到平緩 |
| Cache | Redis + CDN | Memcached | 商品詳情頁、靜態 |
| API gateway | Cloudflare + Rate Limit | 自建 | DDoS、IP 限流 |
| 即時通知 | WebSocket | polling | 排隊狀態推送 |
| 監控 | Prometheus + Grafana | CloudWatch | 自訂秒殺 metrics |

<br>

<span class="muted">**核心決策**：把「庫存扣減」搬到 Redis（原子），DB 只記訂單。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md
