---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · 1M Connections'
footer: 'AI 時代系統設計速成 '
---

## C2.5 · Stage 3 · 1M 連線 / 多 region

```
                Cloudflare Edge
                       ↓
            Global LB (geo-routing)
                ↙       ↓        ↘
        US East     EU West   Asia East
            ↓            ↓            ↓
        WebSocket Gateways × 100 each
            ↓            ↓            ↓
        Regional Redis Stream + Kafka
            └────── Global Kafka ──────┘
                       ↓
              Order/Gift Service
                       ↓
                Cassandra (multi-DC)
```

**關鍵設計**：
- 多 region 部署：用戶就近連
- Region 間 Kafka 同步：跨 region 房間支援
- Gateway 100 台 × 10K conn = 1M
- 自動擴：基於連線數、CPU

**新挑戰**：
- 跨 region 房間：主播 US，觀眾 Asia → 延遲容忍
- Region 故障：自動 failover 連線
- 訊息順序：用 producer offset / logical clock

<br>

<span class="muted">**金句**：1M 連線不是 1 個系統的事—是 region 與 region 的網狀網。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md


---


## C2.5 · 禮物精確投遞（強一致 + 高並發）

**為何特別**：禮物 = 錢。不能掉、不能重複扣。

**設計**：

```
1. Client 發禮物 → POST /gift (idempotency-key)
2. Gift Service：原子扣餘額 + 寫 gift event
   (PostgreSQL transaction)
3. 寫成功 → push 到 Kafka (gift-events)
4. Notification consumer 推送特效到房間
5. 對帳 job 比對 DB 餘額與 event sum
```

**保證**：
- 扣款冪等（idempotency-key）
- 推送 at-least-once（重複特效視覺上無傷）
- 帳本對帳每小時

<br>

<span class="muted">**金句**：涉及錢 → 強一致 + 對帳，不省。</span>

> Source: software_architect/ppt/_source/06_Components_Patterns.md
