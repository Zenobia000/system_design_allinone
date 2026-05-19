---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · One-Page Cheat Sheet'
footer: 'AI 時代系統設計速成 '
---

<!-- _class: end -->

## Case 2 · 一頁速查

<!-- _class: compact -->

```
場景：直播 IM，1M 連線、5M msg/s fanout

核心 5 步：
1. 連線層分片（by room hash）— 同房同機
2. Redis Stream 即時 fanout — 房內快速推
3. Kafka 持久化 — 跨 region 同步、補訊
4. 禮物獨立服務 — 強一致 + 對帳
5. 高峰丟訊 + 特效降級 — 保體驗

關鍵 trade-off：
- 100% 到達 → 接受少量丟（聊天）
- 全球無感 → 跨 region 200ms

工具棧：
Cloudflare + Go WebSocket Gateway + Redis Stream + Kafka + Cassandra

紅線：
- 連線數 > 80% capacity → 擴
- Lag > 500ms → 死
- 禮物精準度 < 100% → 永遠不能
```

> Source: 整合 Module B + C + D
