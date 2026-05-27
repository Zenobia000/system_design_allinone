---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · 100K QPS Seckill'
footer: 'AI 時代系統設計速成 '
---

## C1.5 · Stage 3 · 100K QPS 秒殺

```
        Cloudflare CDN + WAF (rate limit per IP)
                    ↓
              [預約頁]（先排隊，配資格令牌）
                    ↓
            ALB → App × 50 (pre-scaled)
              ↘            ↙
         Redis Cluster (庫存原子扣減)
              ↓ (扣減成功才往下)
         Kafka (排隊削峰，buffer 100K)
              ↓ (consumer 平緩消耗)
         Order Service → PostgreSQL
                              ↓
                       對帳 job (5min)
```

**關鍵設計**：
- **預約頁**：開賣前 1 小時放，發 token，過濾無效流量
- **Redis 扣減**：售完 → 99% req 在這層被 reject
- **Kafka 削峰**：成功的 1000 req 進 queue，DB 平穩處理
- **App pre-scale**：開賣前 5 分鐘預擴到 50 台

> Source: software_architect/ppt/_source/07_System_Architecture.md


---


## C1.5 · 秒殺峰值秒級時序

```
T-60min: 開放預約頁，發 token，cache 商品頁到 CDN
T-5min:  App pre-scale 5 → 50；Redis 預熱庫存
T+0s:    瞬間 100K req，Redis 在 50ms 內判定售完
T+1s:    1000 成功 req 進 Kafka
T+2s:    99% 用戶看到「售完」（不打 DB）
T+10s:   Kafka consumer 平穩寫入 1000 訂單
T+5min:  對帳 job 比對 Redis 與 DB
T+1hr:   scale 縮回 5 台
```

**監控重點**：
- Redis QPS、命中率、Lua 執行時間 P99
- Kafka lag、producer 失敗率
- App auto-scale 反應時間
- DB lock wait（應該很低，因 Redis 擋了）

<br>

<span class="muted">**金句**：秒殺架構的本質是「把不必要的流量在最早層擋掉」。</span>

> Source: _source/braindump.md · §三大案例選擇邏輯
