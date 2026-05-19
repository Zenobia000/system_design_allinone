---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.7 · Evolution Case · 1K → 100K QPS'
footer: 'AI 時代系統設計速成 '
---

## C.7 · 1K → 100K QPS 演進三階段

<span class="kicker">CASE · 不要一次到位</span>

<!-- _class: compact -->

**Stage 1 · 1K QPS (MVP)**

```
Client → ALB → 2× App (stateless) → PostgreSQL (single)
                     └→ Redis (cache)
```
單機 PG 可撐到 ~5K read QPS（含 cache）。

<br>

**Stage 2 · 10K QPS**

```
+ Read Replica × 2（讀寫分離）
+ Redis Cluster 主從
+ Cloud CDN（靜態 + API GET cacheable）
```
App 橫向擴到 6 台，PG 主寫從讀。

<br>

**Stage 3 · 100K QPS**

```
+ PG 分片（by tenant_id, 4 shards）
+ Kafka 削峰（寫先 enqueue）
+ App 自動擴 20-50 台
+ 多 region active-passive
```
此時開始有專職 SRE。


---


## C.7 · 每階段的「該不該升級」判斷

<!-- _class: compact -->

| 訊號 | 該升的階段 | 不該升的反例 |
|---|---|---|
| DB CPU > 70% 持續 | 1 → 2（加 replica） | 還沒 cache 就分片 |
| Read replica 撐不住讀 | 2 → 2.5（加 cache layer） | 上來就 Cassandra |
| 單表 > 100M rows | 2 → 3（分區/分片） | 還沒到就提前分片 |
| 寫 QPS > 10K 持續 | 2 → 3（Kafka 削峰） | 為了「未來」先上 Kafka |
| 跨 region 用戶投訴慢 | 3 → multi-region | 都還在台灣就跨 region |

<br>

<span class="muted">**金句**：架構演進是被流量「逼出來」的，不是先設計好的。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md
