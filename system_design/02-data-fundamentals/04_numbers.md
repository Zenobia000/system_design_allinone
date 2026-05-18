---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · Numbers'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · TOPIC 04</div>

# Numbers to Know
## *工程師的物理常數表*

---

## NUMBERS · WHY

# 為何要記這些數字？

<br>

<div class="highlight">

**設計時你心裡在算什麼？**  
「這個 RPC 需要多少時間？」「這個 join 跑得起嗎？」  
答案不來自直覺，來自**數量級的本能**。

</div>

<br>

- 沒有這份直覺，你會把跨機房 RPC 當本地呼叫
- 沒有這份直覺，你會在 hot path 加 100ms 還覺得「沒什麼」
- 這 8 個數字 ≈ 工程師的「物理常數表」

> Source: 基本觀念/12 Numbers to Know.pdf · §1

---

## NUMBERS · 必背 Latency Table

# Latency Numbers Every Engineer Should Know

| 操作 | 時間 | 倍率 | 意義 |
|------|------|------|------|
| L1 cache reference | 0.5 ns | 1× | CPU 快取命中 |
| Branch mispredict | 5 ns | 10× | 分支預測失敗 |
| L2 cache reference | 7 ns | 14× | 一級錯一級 |
| Mutex lock/unlock | 25 ns | 50× | 無爭用鎖 |
| Main memory reference | 100 ns | 200× | RAM 讀取 |
| 1 KB compress（snappy） | 3 μs | 6,000× | 應用層壓縮 |
| Send 1 KB over 1 Gbps | 10 μs | 20,000× | 區網傳送 |
| SSD random read | 150 μs | 300,000× | NVMe 隨機讀 |
| Read 1 MB sequentially from SSD | 1 ms | 2M× | SSD 順序讀 |
| Round trip within same DC | 0.5 ms | 1M× | 同機房 RTT |
| Round trip CA → Netherlands | 150 ms | 300M× | 跨洲 RTT |

> Source: 基本觀念/12 Numbers to Know.pdf · Jeff Dean's table

---

## NUMBERS · SSD vs HDD vs Network

# 補：磁碟與網路的數量級對比

| 操作 | 時間 | 對比 |
|------|------|------|
| RAM random read | 100 ns | 1× |
| **SSD (NVMe) random read** | **150 μs** | **1,500×** |
| **HDD random seek** | **10 ms** | **100,000×** |
| Cross-AZ RTT (same region) | 1-2 ms | 10,000× |
| **Cross-region RTT (US-EU)** | **80-120 ms** | **800,000×** |
| Cross-continent RTT (US-Asia) | 150-200 ms | 1,500,000× |

<br>

<div class="highlight">

**口訣**：**HDD 比 SSD 慢 60×**、**跨 region 比跨 AZ 慢 50-100×**、**從不要在 hot path 上跨 region**。

</div>

> Source: 基本觀念/12 Numbers to Know.pdf · §AWS / Google networking docs

---

## NUMBERS · 現代資料庫實際容量

# 別停留在 2010 年的數字

<div class="matrix-2x2">
  <div class="featured">
    <strong>PostgreSQL / MySQL</strong>
    單機 64 TiB · Aurora 128 TiB<br>
    cached read 1-5ms · 寫入 10-20k TPS
  </div>
  <div>
    <strong>Redis</strong>
    單節點 1 TB RAM · &lt;1ms read<br>
    100k+ ops/sec
  </div>
  <div>
    <strong>Kafka</strong>
    1 broker = 1M msgs/sec<br>
    50 TB 儲存 · 數週數月 retention
  </div>
  <div>
    <strong>App Server</strong>
    100k+ concurrent · 25 Gbps<br>
    64-512 GB RAM（可至 2 TB）
  </div>
</div>

<span class="muted">**反直覺**：很多人在 500GB-2TB 就急著談 sharding——一台調校良好的 PostgreSQL 撐到 50 TiB 才該考慮。</span>

> Source: 基本觀念/12 Numbers to Know.pdf · §Databases / Caching / MQ

---

## NUMBERS · 速算技巧

# 三個常用換算

<div class="stack">
  <div class="layer client"><strong>① 1 ms 內 CPU 能做什麼？</strong>　 約 200 萬次 L1 操作 / 1 萬次 RAM 讀</div>
  <div class="layer app"><strong>② 跨機房 RPC = 多少本地操作？</strong>　 0.5 ms = 跑 100 萬次 L1，這就是「微服務不要太細」的原因</div>
  <div class="layer data"><strong>③ 100 GB 表能裝進記憶體嗎？</strong>　 雲端 256 GB RAM 機器很常見，常常**直接 in-memory** 就贏</div>
</div>

<br>

<div class="highlight">

**口訣**：**RAM 比 SSD 快 1000 倍 · SSD 比網路 RTT 快 3 倍 · 跨洲 RTT 比本機 RAM 慢 100 萬倍**。

</div>

> Source: 基本觀念/12 Numbers to Know.pdf · §2 Practical

---

## NUMBERS · TRADE-OFF

# 用數字推架構決策

<div class="tradeoff">
  <div class="pro">
    <h3>常見錯估</h3>
    <ul>
      <li>「這 API 加個 cache 就快」<br>→ cache miss 時跨網路 1ms 起跳</li>
      <li>「Microservice 拆細沒事」<br>→ 每跳一次服務 +0.5ms RTT</li>
      <li>「序列化成本可忽略」<br>→ JSON 1MB ≈ 30ms 純 CPU</li>
    </ul>
  </div>
  <div class="con">
    <h3>正確判斷</h3>
    <ul>
      <li>P99 100ms 預算<br>= 200 次本機 RAM = 100 次 SSD = 10 次 cross-AZ</li>
      <li>Hot path 想加 RPC？<br>先計算現有預算花在哪</li>
      <li>記憶體 vs 磁碟 vs 網路<br>差 3 個數量級</li>
    </ul>
  </div>
</div>

> Source: 基本觀念/12 Numbers to Know.pdf · §3 Decision Making

---

## NUMBERS · 避免過度設計

# 面試官真正在意的事

<div class="alert">

**最常見的錯誤**：只有幾 TB 資料、幾千 QPS 就急著說要 sharding、要微服務。  
**面試官欣賞的是**：能根據數據做出合理判斷，而不是盲目套用 fancy words。

</div>

<br>

**Sharding 之前的優化順序**：
- 慢查詢 → 加 index / 優化 SQL
- 讀取瓶頸 → 加 cache / 加 read replica
- 寫入瓶頸 → 調 DB 參數 / 升級硬體
- **以上都用盡** → 才談 sharding

<span class="muted">Sharding 解決的是**寫入擴展**問題（replica 幫不上）；但會大幅增加跨 shard 查詢、分散式交易、資料遷移的複雜度。</span>

> Source: 基本觀念/12 Numbers to Know.pdf · §面試中如何使用這些數字

---

<!-- _class: end -->

# Numbers 完
## *物理常數記住了，回頭把整章串成一個電商案例。*
