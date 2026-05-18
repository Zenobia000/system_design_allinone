---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Review · 速查表'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">REVIEW · 91</div>

# Review Cheatsheet
## *面試 / 工作時，1 分鐘可以查到的決策表*

<!--
開場 30 秒：
- 7 章 + Capstone 訊息量大，這份是「白板上能畫出來的最小集」
- 用法：面試前 1 小時複習這 1 份就夠
-->

---

## INDEX · 速查表目錄

<div class="stack">
  <div class="layer client"><strong>① 4 維決策框架</strong>　 Consistency / Availability / Latency / Cost</div>
  <div class="layer app"><strong>② Latency Numbers</strong>　 11 行必背數字</div>
  <div class="layer data"><strong>③ 選型決策樹</strong>　 DB / Cache / Queue / 推送</div>
  <div class="layer infra"><strong>④ 常見模式對應</strong>　 場景 → Pattern 對照表</div>
  <div class="layer infra"><strong>⑤ 反模式清單</strong>　 「不要」做的事</div>
  <div class="layer infra"><strong>⑥ Capacity 速算</strong>　 規模假設 → 容量估算公式</div>
</div>

> Source: 提煉自 Ch.1–7 全部章節

---

## ① 4 DIMENSIONS · 決策框架

# 任何決策都回到 4 維評分

<div class="matrix-2x2">
  <div class="featured">
    <strong>Consistency</strong>
    所有節點同時看到一致資料？<br>
    Strong / Eventual / Causal
  </div>
  <div>
    <strong>Availability</strong>
    任何時候都能讀寫？<br>
    99.9% / 99.99% / 99.999%
  </div>
  <div>
    <strong>Latency</strong>
    P50 / P99 / P999 預算？<br>
    50ms / 500ms / 1s
  </div>
  <div>
    <strong>Cost</strong>
    硬體 + 維運 + 工程時間？<br>
    Build vs Buy
  </div>
</div>

<div class="highlight">

**面試決勝句**：「在 X 約束下我選 Y，犧牲了 Z」——這就是 senior 級別答案。

</div>

> Source: Ch.2 + 03_mental_model

---

## ② LATENCY NUMBERS · 必背 11 行

| 操作 | 時間 | 倍率 |
|------|------|------|
| L1 cache reference | 0.5 ns | 1× |
| Branch mispredict | 5 ns | 10× |
| L2 cache reference | 7 ns | 14× |
| Mutex lock/unlock | 25 ns | 50× |
| Main memory reference | 100 ns | 200× |
| Compress 1 KB（snappy） | 3 μs | 6,000× |
| Send 1 KB over 1 Gbps | 10 μs | 20,000× |
| SSD random read | 150 μs | 300,000× |
| Round trip in same DC | 0.5 ms | 1,000,000× |
| Read 1 MB sequentially from SSD | 1 ms | 2,000,000× |
| Round trip CA → Netherlands | 150 ms | 300,000,000× |

> Source: Ch.2 / 基本觀念/12 Numbers to Know

---

## ② NUMBERS · 速算口訣

<div class="stack">
  <div class="layer client"><strong>RAM 比 SSD 快 1000 倍</strong>　 100 ns vs 100 μs</div>
  <div class="layer app"><strong>SSD 比 cross-DC 快 3 倍</strong>　 100 μs vs 500 μs</div>
  <div class="layer data"><strong>Same DC RTT ≈ 1ms</strong>　 vs 跨洲 RTT ≈ 150ms（150 倍）</div>
  <div class="layer infra"><strong>P99 100ms 預算</strong>　 = 200 次本機 RAM = 100 次 SSD = 10 次 cross-AZ</div>
</div>

<br>

<div class="highlight">

**單行口訣**：**RAM ≪ SSD ≪ 同 DC ≪ 跨 DC ≪ 跨洲**——每階差 1 個數量級以上。

</div>

> Source: Ch.2 §4

---

## ③ DB SELECTION · 決策樹

```
需要 ACID 事務 / 複雜 join？
├─ 是 → PostgreSQL（先選）/ MySQL
└─ 否 → 看主要查詢模式
        │
        ├─ Primary Key 等值查詢 → KV (Redis / DynamoDB)
        ├─ 巢狀文件 + flexible schema → Document (MongoDB)
        ├─ 寫多 + 線性擴展需求 → Wide-column (Cassandra)
        ├─ 全文搜尋 → Search (Elasticsearch)
        ├─ 多跳關係 → Graph (Neo4j)
        ├─ 時序 metric → TimeSeries (InfluxDB)
        └─ 向量相似 → Vector (Pinecone / pgvector)
```

<span class="muted">**Linus 哲學**：先 PostgreSQL · 撞牆再換 · 90% 系統永遠撞不到牆。</span>

> Source: Ch.4 §1

---

## ③ CACHE PATTERN · 選型

| 場景 | 推薦 | 理由 |
|------|------|------|
| 讀多寫少 · 容忍 staleness | **Cache-aside** | 最簡單 · 應用控管 |
| 一致性重要 · 寫稍慢可接受 | **Write-through** | cache 與 DB 同步 |
| 寫密集 · 容忍丟失 | **Write-back** | 最快 · 風險可控 |
| Cache library 自管 | **Read-through** | 應用碼乾淨 |

<br>

| 災難 | 解法 |
|------|------|
| **Penetration**（查不存在的） | Bloom filter · 快取 null |
| **Avalanche**（同時過期） | TTL 加抖動 · 多級 cache |
| **Stampede**（熱點過期） | single-flight · 永不過期 + 背景更新 |

> Source: Ch.3 §3

---

## ③ QUEUE · 選型

```
事件流 / data pipeline / 重播 ── Kafka
     │
     ├─ 複雜路由 + 工作隊列 ── RabbitMQ
     │
     ├─ 簡單異步 + AWS 棧 ── SQS
     │
     ├─ Pub-Sub + 低延遲 ── NATS / Redis Streams
     │
     └─ 串流 SQL + Materialize ── Pulsar
```

<div class="highlight">

**判斷重點**：要不要 replay？要 → Kafka。  
要不要保證一次處理？要 → 用支援 dedupe 的（Kafka EOS / SQS FIFO）。

</div>

> Source: Ch.7 §1

---

## ③ REAL-TIME · 推送選型

| 需求 | 推薦 | 理由 |
|------|------|------|
| 通知、股票、AI streaming | **SSE** | HTTP 原生 · auto reconnect |
| 聊天、遊戲、協同編輯 | **WebSocket** | 雙向 · binary 支援 |
| IoT 大量設備 | **MQTT** | 低頻寬 · QoS 分級 |
| 點對點視訊 / 音訊 | **WebRTC** | P2P · 媒體優化 |
| 防火牆受限環境 | **Long Polling** | 萬能後備方案 |

<br>

<span class="muted">**經驗法則**：能用 SSE 就不用 WebSocket（少 50% 維運麻煩）。</span>

> Source: Ch.7 §3

---

## ④ 場景 → 模式對照表

| 業務場景 | 推薦組合 |
|---------|---------|
| URL shortener / 小型 OLTP | PostgreSQL + Redis cache + CDN |
| 社群動態（Twitter-like） | Sharded DB + Hybrid Fan-out + Redis ZSet |
| 即時聊天 | Cassandra + WebSocket + Kafka + Redis Pub-Sub |
| 影片串流 | S3 + CDN + HLS + 預先轉碼 |
| 地理派單 | H3/Geohash + Redis Geo + Stream pipeline |
| 全文搜尋 | Elasticsearch + BM25 + index pipeline |
| AI 客服 | pgvector + Hybrid Search + LLM streaming |
| 高並發秒殺 | Redis 預扣 + 異步寫 DB + 限流 + 排隊 |
| 金流交易 | RDBMS + Saga + Outbox + Event Sourcing |
| 推薦系統 | Lambda 架構 / 即時 feature store + offline batch |

> Source: Ch.6 + Ch.7 + Capstone

---

## ⑤ ANTI-PATTERNS · 反模式清單

<div class="alert">

**這些做法經過驗證會失敗**

</div>

<div class="stack">
  <div class="layer client"><strong>① 用 LIKE '%xxx%' 做搜尋</strong>　 → 改用 Elasticsearch / 全文索引</div>
  <div class="layer app"><strong>② 用時間當分片鍵</strong>　 → 今天的 shard 永遠熱 · 昨天的閒</div>
  <div class="layer data"><strong>③ Cache 用 Cassandra（AP）存帳戶餘額</strong>　 → 雙花災難</div>
  <div class="layer infra"><strong>④ 3 人團隊上 K8s</strong>　 → 運維時間 > 業務時間</div>
  <div class="layer infra"><strong>⑤ Retry 固定間隔 3 次</strong>　 → 重試風暴打爆剛恢復的後端</div>
  <div class="layer infra"><strong>⑥ 用 Cassandra 當主存儲卻不冪等消費</strong>　 → 重複事件雙倍執行</div>
  <div class="layer infra"><strong>⑦ QPS 100 上 Kafka + ES</strong>　 → 過度工程，PostgreSQL 全包</div>
  <div class="layer infra"><strong>⑧ 把大檔放 BLOB 欄位</strong>　 → 備份爆炸 · vacuum 卡死</div>
</div>

> Source: 整合 Ch.2–7 各章 alert / 反模式

---

## ⑥ CAPACITY · 速算公式

# 從規模假設到容量估算

<div class="def">
<span class="term">QPS 估算</span>
**DAU × 行為次數 / 86400 × peak 倍率（×3）**<br>
例：10M DAU × 平均 10 次/天 / 86400 × 3 ≈ 3500 QPS peak
</div>

<div class="def">
<span class="term">Storage 估算</span>
**單筆 size × 筆數 × 副本數 × overhead（×1.3）**<br>
例：1KB × 10B × 3 × 1.3 ≈ 39 TB
</div>

<div class="def">
<span class="term">Bandwidth 估算</span>
**QPS × payload size**<br>
例：100k QPS × 5KB = 500 MB/s = 4 Gbps
</div>

<div class="def">
<span class="term">Cache 容量</span>
**熱資料 size（前 20%）× 1.5（overhead）**<br>
例：熱 timeline 1B 條 × 200 bytes × 1.5 = 300 GB
</div>

> Source: Capstone 90 §Estimation

---

## ⑥ CAPACITY · 常見規模對照

| 系統等級 | DAU | QPS（peak） | 儲存 | 推薦架構 |
|---------|-----|-------------|------|---------|
| 內部工具 | < 1k | < 100 | < 100 GB | 單台 PostgreSQL |
| 小型 SaaS | 10k-100k | 500-5k | < 1 TB | PG + Redis + 1 LB |
| 中型應用 | 1M-10M | 10k-100k | 10-100 TB | Sharded + Cache + CDN |
| 大型應用 | 100M+ | 1M+ | PB+ | 全分散式 + 多 region |
| 超大型（FAANG） | 1B+ | 10M+ | 數十 PB | 自研基礎設施 |

<br>

<span class="muted">**自查心態**：90% 工程師工作在前 3 個等級——別過度套用 FAANG 的解法。</span>

> Source: Capstone 90 §Estimation

---

## INTERVIEW · 5 步驟 SOP

```
① REQUIREMENTS         3-5 min  · 功能 + 非功能 + 規模假設
② ESTIMATION           2-3 min  · QPS / storage / bandwidth
③ HIGH-LEVEL DESIGN    10-15 min · 5-7 個方塊 + 資料流
④ DEEP DIVE            15-20 min · 1-2 個 component 深挖
⑤ TRADE-OFFS / FAILURES 5-10 min · 哪邊壞了會怎樣
```

<div class="highlight">

**只有第 3-4 步驟在畫圖**。前 2 步驟是「設定情境」，第 5 步驟是「展現深度」。

</div>

> Source: 90 Capstone §Method

---

## INTERVIEW · 答題金句

<div class="stack">
  <div class="layer client"><strong>不確定時</strong>　 「我假設 X，如果 Y 我會改成 Z」</div>
  <div class="layer app"><strong>講選型</strong>　 「我選 A 因為 B，但 C 場景會選 D」</div>
  <div class="layer data"><strong>主動提失敗</strong>　 「如果 cache 掛了，這裡會怎樣...」</div>
  <div class="layer infra"><strong>承認局限</strong>　 「這個方案在 X 情況下會失效，需要進一步...」</div>
  <div class="layer infra"><strong>引用真實系統</strong>　 「Twitter 的做法是... 因為...」</div>
</div>

<br>

<span class="muted">**面試官最怕**：候選人講 best practice 但不能講 trade-off。**講出 trade-off 就 senior 了**。</span>

> Source: 整合 03_mental_model + 90 Capstone

---

## RECAP · 一頁速查總覽

<div class="tradeoff">
  <div class="pro">
    <h3>Decision Tools</h3>
    <ul>
      <li>4 維框架（C/A/L/Cost）</li>
      <li>11 行 Latency Numbers</li>
      <li>4 個選型決策樹（DB/Cache/Queue/Real-time）</li>
      <li>10 個場景 → 模式對照</li>
    </ul>
  </div>
  <div class="con">
    <h3>Avoid Lists</h3>
    <ul>
      <li>8 個反模式（時間分片、雙花、過度上 K8s ...）</li>
      <li>Capacity 4 個速算公式</li>
      <li>面試 5 步驟 SOP</li>
      <li>5 句答題金句</li>
    </ul>
  </div>
</div>

---

<!-- _class: end -->

# Cheatsheet 完
## *該背的都在這。下一站結尾資源清單。*

<br>

<span class="lead">→ 92 Resources & Next Steps</span>
