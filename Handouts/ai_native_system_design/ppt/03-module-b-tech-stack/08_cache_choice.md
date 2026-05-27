---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.8 · Cache Selection'
footer: 'AI 時代系統設計速成 '
---

## B.8 · 快取選型：Redis vs Memcached vs CDN

<span class="kicker">CACHE · 三個維度判斷</span>

<!-- _class: compact -->

| 工具 | 結構 | 持久化 | 殺手場景 |
|---|---|---|---|
| **Memcached** | 純 KV | 無 | 簡單 hot data cache |
| **Redis** | KV + List + Set + Stream | 可 RDB/AOF | session, leaderboard, rate-limit |
| **CDN** | HTTP 物件 | 邊緣節點 | 靜態 / 圖片 / 影片 |
| **應用內 cache** | 程序記憶體 | 無 | 高頻、單機可接受 stale |

<br>

**選擇路徑**：

```
是靜態檔？ → CDN
是 session / counter / queue？ → Redis
是純 KV cache？ → Memcached 或 Redis（差不多）
是熱資料 + 命中率 99%+ → 加應用內 cache (L1)
                       + Redis (L2) 兩層
```

<br>

<span class="muted">**陷阱**：第一天上 Redis cluster。多數 < 1M QPS 系統，單節點 Redis 就夠。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §Cache
