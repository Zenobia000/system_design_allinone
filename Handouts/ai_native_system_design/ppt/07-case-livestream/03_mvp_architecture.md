---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · MVP Architecture'
footer: 'AI 時代系統設計速成 '
---

## C2.3 · MVP（1K 觀眾，1 主播）

```
Client (Browser/App)
   ↓ WebSocket
WebSocket Server (single Go)
   ↓ Redis Pub/Sub (in-memory)
   ↓
Other clients in same room
```

**簡化**：
- 單機 Go 服務 + Redis pub/sub
- 主播發訊息 → Redis publish → 所有觀眾 receive
- 連線狀態存記憶體（map[roomId][]conn）
- 持久化用 Postgres（聊天歷史）

**撐多少**：
- 單 Go 服務 ~100K WebSocket 連線（看 RAM）
- Redis pub/sub 撐 ~100K msg/s

<br>

<span class="muted">**進化訊號**：連線數 > 50K 單機 → 開始分片連線層。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md


---


## C2.3 · MVP 訊息流程

```
1. Producer (主播 client)
   → POST /messages { room_id, content }
2. API server 驗證、過濾敏感詞
3. INSERT into messages (history)
4. Redis PUBLISH room:{id} { msg payload }
5. WebSocket servers SUBSCRIBE room:{id}
6. 收到 → 找該 room 的本機連線
7. 透過 WebSocket 推給每個連線
```

**特點**：
- 單一資料來源（DB 是 source of truth）
- Redis 只做即時 fanout（不持久化）
- 連線層無狀態（除了 in-memory routing table）

<br>

<span class="muted">**關鍵**：DB 寫 + Redis publish 必須原子（Outbox pattern）。</span>

> Source: software_architect/ppt/_source/08_Advanced_Patterns.md
