---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · MVP Architecture'
footer: 'AI 時代系統設計速成 '
---

## C1.3 · MVP 架構（1K QPS · 平日）

<span class="kicker">STAGE 1 · 還沒秒殺</span>

```
        Cloudflare CDN
              ↓
        [Cloudflare WAF + Rate Limit]
              ↓
        Load Balancer
              ↓
        App × 2 (stateless, Node/Go)
         ↙         ↘
   PostgreSQL    Redis (cache, session)
   (single)     
```

**特點**：
- 預設冗餘 2 App，1 DB（小型品牌平日量）
- Cache 命中率 ~80%（商品詳情）
- 平日下單 P99 < 200ms

<br>

<span class="muted">**口訣**：先用最簡架構撐平日，秒殺時切換到 stage 3。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md


---


## C1.3 · MVP 庫存扣減邏輯

```sql
BEGIN;
SELECT qty FROM inventory WHERE product_id = ? FOR UPDATE;
-- 檢查 qty > 0
UPDATE inventory SET qty = qty - 1 WHERE product_id = ?;
INSERT INTO orders (user_id, product_id, ...) VALUES (...);
COMMIT;
```

**特點**：
- 行級鎖保證不超賣
- 平日 < 100 訂單/秒，DB 撐得住
- 一旦 > 1K QPS，鎖等待變嚴重 → 進 stage 2

<br>

<span class="muted">**進化訊號**：DB lock wait 超過 50ms → 不夠了。</span>

> Source: _source/braindump.md · §C.7 案例
