---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · 10K QPS Evolution'
footer: 'AI 時代系統設計速成 '
---

## C1.4 · Stage 2 · 10K QPS · 小型促銷

```
        CDN + WAF
            ↓
       LB (multi-AZ)
            ↓
       App × 6 (auto-scale 4-12)
       ↙           ↘
  Read Replica × 2   PG Primary
       ↑              ↓
       └── Redis ─────┘
       (商品詳情 cache + session)
```

**變化點**：
- 加 Read Replica：商品列表 / 訂單查詢走 replica
- Redis 升 cluster：3 主 3 從
- App 從 2 → 6，加 auto-scaling 觸發 CPU > 60%
- 商品熱資料命中率 → 95%

<br>

<span class="muted">**還沒做**：庫存還在 DB 鎖—10K QPS 內可撐。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md


---


## C1.4 · 引入 Redis 庫存熱層

**做法**：把庫存搬到 Redis，用 Lua 原子腳本扣減

```lua
-- 原子扣減
local stock = redis.call('GET', KEYS[1])
if tonumber(stock) <= 0 then
  return -1  -- 售完
end
redis.call('DECR', KEYS[1])
return 1     -- 成功
```

**好處**：
- Redis 單線程 = 天然原子，不需鎖
- 100K QPS Redis 撐得住
- 售完瞬間 reject，不打 DB

**配套**：
- Redis 庫存 → 透過 Kafka 異步同步回 DB
- DB 保持權威紀錄（對帳用）

<br>

<span class="muted">**核心轉變**：庫存決策層 vs 持久化層分離。</span>

> Source: software_architect/ppt/_source/08_Advanced_Patterns.md
