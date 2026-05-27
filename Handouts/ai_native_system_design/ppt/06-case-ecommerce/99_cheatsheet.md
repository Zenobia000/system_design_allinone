---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · One-Page Cheat Sheet'
footer: 'AI 時代系統設計速成 '
---

<!-- _class: end -->

## Case 1 · 一頁速查（印出貼牆）

<!-- _class: compact -->

```
場景：秒殺 1000 件商品，100K req/s 峰值

核心 5 步：
1. 預約頁過濾（CDN + WAF）— 擋無效流量
2. Redis Lua 原子扣減 — 99% req 在這層 reject
3. Kafka 削峰 — 1000 成功 req 平穩消化
4. App pre-scale — 開賣前 5 分鐘擴容
5. 對帳 job — 5min 一次比對 Redis 與 DB

關鍵 trade-off：
- 強一致 → 最終一致（買到對帳成本）
- 即時訂單號 → 排隊 token（買到削峰）

工具棧：
Cloudflare + ALB + Go App + Redis Cluster + Kafka + PostgreSQL

紅線：
- Redis P99 > 50ms → 死
- Kafka error > 0.1% → 掉訂單
- 沒對帳 → 不能上
```

> Source: 整合 Module B + C
