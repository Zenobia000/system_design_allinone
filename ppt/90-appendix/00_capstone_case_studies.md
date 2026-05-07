---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Capstone · 整合案例'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CAPSTONE · 90</div>

# Capstone Case Studies
## *用 5 個經典案例把 Ch.1–7 全部串起來*

<!--
開場 30 秒：
- 前 7 章是各個概念的「拆解」；Capstone 是把概念「串起來」
- 5 個案例由淺入深：URL Shortener → Twitter → Uber → Slack → AI 客服
- 講者語氣：實戰，每個案例都模擬「面試 45 分鐘」會問到的東西
-->

---

## OBJECTIVES · 學習目標

看完本章，你能：

<div class="stack">
  <div class="layer client"><strong>① 從 0 開始拆解 5 種經典系統</strong>　 URL / Social / Geo / Chat / RAG</div>
  <div class="layer app"><strong>② 在每個案例中辨認 Ch.1–7 的觀念</strong>　 把概念落到具體決策</div>
  <div class="layer data"><strong>③ 跑完 4 步驟設計流程</strong>　 Requirement → Estimation → Sketch → Deep dive</div>
  <div class="layer infra"><strong>④ 學會說出 trade-off 而非「最佳實踐」</strong>　 面試官真正在意的</div>
</div>

> Source: 整合 Ch.1–7 + 業界公開系統架構（Twitter / Uber / Slack / Netflix）

---

## METHOD · 系統設計 4 步驟

```
┌──────────────────────────────────────────────────┐
│  ① REQUIREMENT     功能 / 非功能 / 規模假設      │
├──────────────────────────────────────────────────┤
│  ② ESTIMATION      QPS / Storage / Bandwidth     │
├──────────────────────────────────────────────────┤
│  ③ HIGH-LEVEL      畫 5-7 個方塊的 sketch        │
├──────────────────────────────────────────────────┤
│  ④ DEEP DIVE       對 1-2 個關鍵組件深挖         │
└──────────────────────────────────────────────────┘
            遵循順序，不要跳步驟
```

<span class="muted">**面試最常見的失敗**：跳過 1、2 直接開始畫。沒搞清楚要做什麼之前，畫得再花俏都是錯的。</span>

> Source: 整合 Ch.1 + 03_mental_model

---

## CASE 1 · URL Shortener

<span class="kicker">CASE STUDY · 1 (簡單)</span>

# bit.ly · 短網址系統

**功能**：長 URL → 短碼（7 位） · 點擊跳轉 · 統計

**規模假設**：
- 寫：100 URL/s（每天 ~ 8.6M）
- 讀：1000 click/s（讀:寫 = 10:1）
- 5 年累積：~ 16B 條 URL

> Source: 整合 Ch.1（Foundation）+ Ch.3（Cache）

---

## CASE 1 · Estimation

# 算清楚規模

<div class="stack">
  <div class="layer client"><strong>QPS</strong>　 寫 100/s · 讀 1000/s · peak ×3 = 3000/s</div>
  <div class="layer app"><strong>Storage</strong>　 16B × 500 bytes = 8 TB · 不算多</div>
  <div class="layer data"><strong>Bandwidth</strong>　 1000 reads/s × 500 bytes = 500 KB/s · 微小</div>
  <div class="layer infra"><strong>Cache</strong>　 80/20 → 熱資料 ~ 3.2B × 500 bytes ≈ 1.6 TB（過大）→ 取 top 1% = 16 GB</div>
</div>

> Source: Ch.2 Numbers · Ch.3 Cache 容量規劃

---

## CASE 1 · High-level

# 系統 Sketch

```
                                  ┌─→ Redis Cache（熱 URL）
                                  │
[Browser] → [CDN] → [API GW] → [App] → [Postgres / DynamoDB]
                                  │           ↑ shard by short_code
                                  └─→ Kafka → ClickHouse（統計）
```

<div class="stack">
  <div class="layer client"><strong>讀路徑</strong>　 CDN（304）→ Cache（hit 95%+）→ DB</div>
  <div class="layer app"><strong>寫路徑</strong>　 App 產生 short_code → DB unique constraint</div>
  <div class="layer data"><strong>分析</strong>　 click event → Kafka → 異步寫 ClickHouse</div>
</div>

> Source: Ch.4 GW · Ch.6 CDN · Ch.7 Pipeline

---

## CASE 1 · Deep Dive

# Short Code 怎麼產？

<div class="tradeoff">
  <div class="pro">
    <h3>① Hash + 取前 7 位</h3>
    <ul>
      <li>MD5(url)[:7]</li>
      <li>同 url → 同 short</li>
      <li>容易碰撞，要重試</li>
    </ul>
  </div>
  <div class="con">
    <h3>② Base62 編碼遞增 ID</h3>
    <ul>
      <li>分散式 ID 產生器（Snowflake）</li>
      <li>無碰撞、可排序</li>
      <li>會洩漏「總量」資訊</li>
    </ul>
  </div>
</div>

<span class="muted">**業界常用方案 ②**：用 Snowflake 產生 64-bit ID，base62 後取 7 位 = 7^62 ≈ 3.5 兆組合。</span>

> Source: Ch.3 Sharding（ID 設計）

---

## CASE 2 · Twitter Timeline

<span class="kicker">CASE STUDY · 2 (中等)</span>

# Twitter / X · 動態時間軸

**功能**：發推 · 看自己 timeline（followee 的最新推）· 點讚轉推

**規模假設**：
- 5 億 DAU · 每秒 5000 推 · 每秒 100k timeline view
- 平均 follow 200 人 · KOL 可能 follow 1 億

> Source: 整合 Ch.3（Fan-out）+ Ch.6（Read scaling）

---

## CASE 2 · 核心難題

# Fan-out on Write vs on Read

<div class="matrix-2x2">
  <div class="featured">
    <strong>Fan-out on Write（推）</strong>
    發推時，寫入每個 follower 的 timeline 表<br>
    讀超快 · 寫超貴（KOL 寫爆）
  </div>
  <div>
    <strong>Fan-out on Read（拉）</strong>
    看 timeline 時，現查 followees 最新推<br>
    寫便宜 · 讀慢（要 scatter-gather 200 人）
  </div>
</div>

<div class="highlight">

**Twitter 真實做法：Hybrid**  
普通用戶用 **Fan-out on Write**（pre-compute timeline）  
KOL（千萬粉）用 **Fan-out on Read**（避免一次寫 1 億份）

</div>

> Source: Ch.6 Scaling Reads · Materialized View 模式

---

## CASE 2 · 系統 Sketch

```
  [Tweet 發布] → [API] → [Tweet DB（Sharded by user_id）]
                  │             │
                  │             └→ Kafka ──→ Fan-out worker
                  │                              │
                  │              ┌───────────────┘
                  │              ▼
                  │     [Timeline Cache（Redis）·  per user]
                  │              ▲
  [Read timeline] ─→ [Timeline API] ←── 普通用戶（pre-computed）
                              ↓
                     KOL 拉取 → Tweet DB 直查 → merge
```

<div class="stack">
  <div class="layer client"><strong>寫</strong>　 Tweet DB（user_id sharding）+ Kafka 觸發 fan-out</div>
  <div class="layer app"><strong>Fan-out</strong>　 Worker 把推塞到每個 follower 的 Redis ZSet</div>
  <div class="layer data"><strong>讀</strong>　 80% pre-computed timeline · 20% KOL 即時 merge</div>
</div>

> Source: Ch.3 Sharding · Ch.7 Queue

---

## CASE 3 · Uber Dispatch

<span class="kicker">CASE STUDY · 3 (高難度)</span>

# 地理派單系統

**功能**：乘客叫車 · 媒合最近司機 · 即時追蹤位置

**規模假設**：
- 1000 萬司機 · 每 4 秒上報 1 次 GPS
- 5 萬同時叫車 · 媒合需 < 2 秒

<br>

<div class="alert">

**核心難題**：地理空間檢索 + 即時推送 + 寫入吞吐量極高（2.5M GPS update/s）。

</div>

> Source: 整合 Ch.3（Geo Sharding）+ Ch.7（Real-time + Stream）

---

## CASE 3 · 地理索引

# 為何不用 lat/lon 範圍查詢？

<div class="tradeoff">
  <div class="pro">
    <h3>SQL 範圍查（差）</h3>
    <ul>
      <li>WHERE lat BETWEEN ... AND lon BETWEEN ...</li>
      <li>2D index 弱、結果是「方框」不是「圓」</li>
      <li>不適合高 QPS 寫入</li>
    </ul>
  </div>
  <div class="con">
    <h3>Geohash / S2 / H3（好）</h3>
    <ul>
      <li>把 2D 座標編碼成 1D 字串</li>
      <li>同前綴 = 鄰近 → 用 prefix 查</li>
      <li>Uber 用 H3（六邊形格子）</li>
    </ul>
  </div>
</div>

<span class="muted">**Geo Sharding by H3 cell**：每個格子的司機資料聚在同 shard，查詢「我這格 + 鄰格」只走幾個 shard。</span>

> Source: Ch.3 Consistent Hashing 進階變體

---

## CASE 3 · 系統 Sketch

```
[Driver App] ─GPS 4s─→ [Ingest GW] ─→ [Kafka]
                                          │
                            ┌─────────────┴─────────────┐
                            ▼                           ▼
                      [Flink Stream]              [Redis Geo Set]
                       Geo aggregation             real-time location
                            │                           ▲
                            ▼                           │
                      [Cassandra]                       │
                      historic trail                    │
                                                        │
[Rider App] ── request ──→ [Match Engine] ──H3 cell────┘
                                  │
                                  ▼
                         [Selected Driver] ──WebSocket──→ Driver
```

<div class="stack">
  <div class="layer client"><strong>Ingest</strong>　 GPS 寫 Kafka（partition by driver_id）</div>
  <div class="layer app"><strong>Match</strong>　 用 H3 cell 查 Redis Geo Set · BFS 鄰居 cell 找 5 個候選</div>
  <div class="layer data"><strong>Realtime</strong>　 配對成功 → WebSocket 通知司機 · 客戶 SSE 看軌跡</div>
</div>

> Source: Ch.7 Stream Pipeline · Real-time

---

## CASE 4 · Slack-like Chat

<span class="kicker">CASE STUDY · 4 (高難度)</span>

# 即時聊天系統

**功能**：1-on-1 / 群組 / channel · 訊息歷史 · 即時推送 · 搜尋

**規模假設**：
- 1 億 DAU · 每秒 100k 訊息
- 平均 user 在 50 個 channel · 每 channel 100-1000 人

> Source: 整合 Ch.3（Sharding）+ Ch.5（Reliable Delivery）+ Ch.7（Real-time + Search）

---

## CASE 4 · 訊息儲存

# Sharding 策略

<div class="tradeoff">
  <div class="pro">
    <h3>By user_id（差）</h3>
    <ul>
      <li>同訊息要寫多份（每個 recipient）</li>
      <li>儲存放大 N 倍</li>
      <li>Group chat 是災難</li>
    </ul>
  </div>
  <div class="con">
    <h3>By channel_id（好）</h3>
    <ul>
      <li>訊息寫一次（channel timeline）</li>
      <li>讀的時候每個 user 拉自己 channel 列表</li>
      <li>Slack / Discord 都這樣做</li>
    </ul>
  </div>
</div>

<span class="muted">**底層儲存**：Cassandra（高寫吞吐 + time-series 模型）；channel_id 作 partition key，message_ts 作 clustering key。</span>

> Source: Ch.3 Sharding · Ch.4 NoSQL 選型

---

## CASE 4 · 系統 Sketch

```
[Web/Mobile] ←─WebSocket─→ [WS Gateway Cluster]
                                  │  ↑
                                  │  │
                                  ▼  │
                          [Redis Pub-Sub]
                                  │
                                  ▼
[Send API] → [Message Service] → [Kafka] → [Cassandra]（持久化）
                                     │
                                     └─→ [ES Indexer] → 全文搜尋
```

<div class="stack">
  <div class="layer client"><strong>連線層</strong>　 WebSocket Gateway 千台 · 各 Pod 透過 Redis Pub-Sub 廣播</div>
  <div class="layer app"><strong>送出</strong>　 寫 Cassandra 同步 · Kafka 異步觸發推送 + 索引</div>
  <div class="layer data"><strong>離線推</strong>　 user 不在線 → APNS / FCM push</div>
</div>

> Source: Ch.7 Real-time Scaling · Ch.5 Reliable Delivery

---

## CASE 4 · 訊息送達保證

<div class="def">
<span class="term">Exactly-once delivery（業務面）</span>
client 帶 `client_msg_id`（UUID）· server 用此 dedupe table<br>
**重發 N 次也不會 N 條訊息**——At-least + 冪等 = 業務 exactly-once
</div>

<div class="def">
<span class="term">Read Receipt</span>
單獨表記錄 `(user_id, channel_id, last_read_msg_id)`<br>
**不要每讀一條更新**——批次 flush 1s/次
</div>

<div class="def">
<span class="term">離線推送</span>
連線 disconnect ≥ 30s · 訊息走 push notification<br>
**不丟訊息**：所有 server-side push 都要寫 outbox + retry
</div>

> Source: Ch.5 Reliable Delivery 全套

---

## CASE 5 · AI Customer Support

<span class="kicker">CASE STUDY · 5 (前沿)</span>

# RAG-based AI 客服

**功能**：客戶問問題 → AI 從公司 KB 找答案 → 串流回覆 + 引用來源 · 必要時轉人工

**規模假設**：
- 100 萬條 KB 文件 · 1000 並發對話
- P99 first-token < 1.5s · 完整答案 < 6s

> Source: 整合 Ch.6（Read scaling）+ Ch.7（RAG + Real-time + Long Running）

---

## CASE 5 · 核心 Pipeline

```
[User Q] → [API GW] → [Auth + Rate Limit]
              │
              ▼
        [Query Rewriter（small LLM）]
              │
       ┌──────┴──────┐
       ▼             ▼
  [Vector Search]  [BM25 Search]
   pgvector         Elasticsearch
       └──────┬──────┘
              ▼
        [Reranker（Cohere / cross-encoder）]
              │
              ▼  Top-5 chunks
        [LLM Generate]（Anthropic / OpenAI）
              │
              ▼  SSE streaming
          [User UI]
```

<div class="stack">
  <div class="layer client"><strong>Hybrid Search</strong>　 Vector 抓語意 + BM25 抓關鍵字 · 取聯集 50 候選</div>
  <div class="layer app"><strong>Rerank</strong>　 cross-encoder 細排 · 取 top-5 進 prompt</div>
  <div class="layer data"><strong>Streaming</strong>　 SSE 串流 token · first-byte 短</div>
</div>

> Source: Ch.7 RAG 全套 + Ch.7 Real-time SSE

---

## CASE 5 · 工程化議題

# 把 LLM 當服務跑會遇到的事

<div class="def">
<span class="term">Latency 預算</span>
P99 6s = embedding(100ms) + retrieval(200ms) + rerank(300ms) + LLM(5s)<br>
**LLM 是大頭**——streaming first-token 為 UX 必須。
</div>

<div class="def">
<span class="term">Hallucination 控制</span>
prompt 強制：「**只用 context 回答** + 引用 chunk_id**」<br>
監控：若 LLM 引用不在 context 的 chunk_id → 標為 hallucination 案例
</div>

<div class="def">
<span class="term">成本控制</span>
熱問題 cache（query → answer 短 TTL）· 降階模型路由（簡單問題用 Haiku）<br>
**典型省 60% token 成本**
</div>

<div class="def">
<span class="term">Long Running 升級</span>
複雜任務（退費）→ Temporal workflow · LLM 當 router 而非 executor
</div>

> Source: Ch.7 RAG · Ch.5 Reliability · Ch.7 Long Running

---

## INTERVIEW NOTES · 面試常見陷阱

# 5 個面試官最在意的事

<div class="stack">
  <div class="layer client"><strong>① 別跳過 Requirement</strong>　 直接畫圖 = 不及格。先講「我假設 X、Y、Z」</div>
  <div class="layer app"><strong>② 給數字</strong>　 「QPS 大」沒用 · 「peak 5k QPS、storage 8TB」才有討論價值</div>
  <div class="layer data"><strong>③ 講 Trade-off 而非 Best</strong>　 沒有最佳解 · 只有「在 X 約束下我選 Y 因為...」</div>
  <div class="layer infra"><strong>④ 主動提失敗模式</strong>　 「如果 cache 掛了會怎樣」「如果 leader 壞了多久才 failover」</div>
  <div class="layer infra"><strong>⑤ 知道何時該停</strong>　 不要把 7 章全 dump · 留時間讓面試官問問題</div>
</div>

> Source: 整合 Ch.5 Reliability + 03_mental_model 決策原則

---

## SUMMARY · 5 個案例的觀念對應表

| 案例 | 主要觀念 | 主要章節 |
|------|---------|---------|
| URL Shortener | Cache + Sharding + ID 生成 | Ch.3, 6 |
| Twitter Timeline | Fan-out + Hybrid + Materialized View | Ch.3, 6 |
| Uber Dispatch | Geo Index + Stream + Real-time | Ch.3, 7 |
| Slack Chat | WebSocket scaling + Reliable Delivery | Ch.5, 7 |
| AI Support | RAG + Streaming + LLM ops | Ch.7 |

<br>

<span class="muted">**這 5 個案例組合幾乎涵蓋面試與 senior 級別工作 80% 場景**。其餘 20% 是它們的變形組合。</span>

> Source: 整合 Ch.1–7 全部

---

<!-- _class: end -->

# Capstone 完
## *5 個案例打通了 Ch.1–7 的全部觀念。下一站速查表整理。*

<br>

<span class="lead">→ 91 Review Cheatsheet</span>
