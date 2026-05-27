---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · 100K Connections'
footer: 'AI 時代系統設計速成 '
---

## C2.4 · Stage 2 · 100K 連線 / 100 房間

```
Client
   ↓ LB (sticky session, by room_id hash)
   ↓
WebSocket Gateway × 10 (Go, 10K conn each)
   ↑ Redis Stream subscribe（按 room shard）
   ↑
Producer Service ← Kafka （訊息持久化）
   ↑
Mobile / Web API
```

**新增**：
- LB 用 Consistent Hash by room_id：同房間落同 gateway
- Redis Stream 分 shard（按 room_id mod N）
- Kafka 持久化 → consumer 寫 Cassandra
- Cassandra 存歷史訊息（按 room_id partition）

<br>

<span class="muted">**改善**：連線分散到 10 台 gateway，每台只負責部分房間。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md


---


## C2.4 · Fanout 策略

**問題**：100K 觀眾同房，1 條訊息要推 100K 次—如何高效？

**解法 1 · 房間訂閱**：
- 每個 gateway 訂閱本機有連線的 room
- 收到訊息 → loop 房內 conn → send
- 同房間連線本地處理，不跨機

**解法 2 · 訊息合併**：
- 高峰時把多條訊息合併成 batch 推送（100ms 一次）
- 減少 syscall 次數

**解法 3 · 訊息丟棄（聊天）**：
- 同房同秒 > 100 訊息 → 隨機保留
- 用戶看不見「漏掉某條」，但 fanout 量降 10×

<br>

<span class="muted">**金句**：fanout 不是「全送」，是「夠快地送大多數」。</span>

> Source: _source/braindump.md · §三大案例選擇邏輯
