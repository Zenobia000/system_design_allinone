# 圖像 Prompt 總索引

> 全套 PPT 視覺化圖像清單。先看本檔挑要做的，再進對應章節 prompt 文檔複製內容。
> Style guide：[`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md) · 工作流：[`../README.md`](../README.md)

---

## 統計

- **總圖數**：100 張（已索引）+ ~13 張 dual-format（Mermaid + AI 雙寫的 Mental Model 等）
- **Priority**：P1 × 47（必做）· P2 × 46（很有用）· P3 × 7（錦上添花）
- **Type**：A × 7（hero）· B × 24（隱喻）· C × 26（架構）· D × 30（對照）· E × 13（狀態/序列）

## 各章圖數

| 章節 | 主題 | 張數 | 文檔 |
|------|------|------|------|
| 01 | Foundation Layer | 14 | [`01-foundation.md`](01-foundation.md) |
| 02 | Data Fundamentals | 14 | [`02-data-fundamentals.md`](02-data-fundamentals.md) |
| 03 | Data Distribution | 16 | [`03-data-distribution.md`](03-data-distribution.md) |
| 04 | Infrastructure | 18 | [`04-infrastructure.md`](04-infrastructure.md) |
| 05 | Reliability & Ops | 16 | [`05-reliability-ops.md`](05-reliability-ops.md) |
| 06 | Scaling Patterns | 16 | [`06-scaling-patterns.md`](06-scaling-patterns.md) |
| 07 | Advanced Patterns | 19 | [`07-advanced-patterns.md`](07-advanced-patterns.md) |

---

## 預算建議（從哪開始）

| 預算 | 做什麼 | 張數 |
|------|--------|------|
| **最小（試水溫）** | 7 章首 hero + 7 章 mental model | ~14 張 |
| **標準** | 全部 P1 | 47 張 |
| **完整** | P1 + P2 | 93 張 |
| **滿配** | P1 + P2 + P3 | 100 張 |

**強烈建議**：先做 14 張最小集（每章 hero + mental model），實際嵌入 PPT 看版面手感後再決定追加。

---

## P1 · 必做（47 張）

> 章首 hero、核心 mental model、最常引用的關鍵架構與對照圖。

| Chapter | Type | Title | Save as |
|---------|------|-------|---------|
| 01-foundation | A | Hero · 章首封面 | `ppt/assets/diagrams/01-foundation/00_hero.png` |
| 01-foundation | C | Networking · TCP/IP 協定棧速查 | `ppt/assets/diagrams/01-foundation/01_networking_01_stack.png` |
| 01-foundation | B | Networking · RTT 與光速天花板 | `ppt/assets/diagrams/01-foundation/01_networking_02_rtt.png` |
| 01-foundation | D | Client-Server · Thin/Thick × Stateful/Stateless 2x2 | `ppt/assets/diagrams/01-foundation/02_client_server_02_matrix.png` |
| 01-foundation | D | Scalability · Vertical vs Horizontal vs Hybrid | `ppt/assets/diagrams/01-foundation/03_scalability_01_up_vs_out.png` |
| 01-foundation | C | Scalability · 橫向擴展三前提架構 | `ppt/assets/diagrams/01-foundation/03_scalability_02_three_prereq.png` |
| 01-foundation | E | API Design · 風格選型決策樹 | `ppt/assets/diagrams/01-foundation/04_api_design_01_decision_tree.png` |
| 02-data-fundamentals | A | Hero · 章首封面 | `ppt/assets/diagrams/02-data-fundamentals/00_hero.png` |
| 02-data-fundamentals | B | CAP Theorem · 三角形與三類資料庫 | `ppt/assets/diagrams/02-data-fundamentals/01_cap_theorem_01_triangle.png` |
| 02-data-fundamentals | E | Indexing · B+Tree vs LSM-Tree 對照 | `ppt/assets/diagrams/02-data-fundamentals/02_indexing_01_btree_vs_lsm.png` |
| 02-data-fundamentals | B | Transactions · ACID 4 件事 icon | `ppt/assets/diagrams/02-data-fundamentals/03_transactions_01_acid_icons.png` |
| 02-data-fundamentals | D | Transactions · 隔離級別 vs 異常現象矩陣 | `ppt/assets/diagrams/02-data-fundamentals/03_transactions_02_isolation_matrix.png` |
| 02-data-fundamentals | D | Numbers · Latency 階梯圖（對數刻度） | `ppt/assets/diagrams/02-data-fundamentals/04_numbers_01_latency_ladder.png` |
| 03-data-distribution | A | Hero · 章首封面 | `ppt/assets/diagrams/03-data-distribution/00_hero.png` |
| 03-data-distribution | D | Sharding · 三種分片策略對照 | `ppt/assets/diagrams/03-data-distribution/02_sharding_01_strategies.png` |
| 03-data-distribution | B | Sharding · Celebrity Problem · Hot Shard | `ppt/assets/diagrams/03-data-distribution/02_sharding_02_hotshard.png` |
| 03-data-distribution | D | Caching · 四種模式對照 | `ppt/assets/diagrams/03-data-distribution/04_caching_02_patterns.png` |
| 04-infrastructure | A | Hero · 章首封面 | `ppt/assets/diagrams/04-infrastructure/00_hero.png` |
| 04-infrastructure | D | Database · 兩個正交維度 2×2 | `ppt/assets/diagrams/04-infrastructure/01_database_01_matrix.png` |
| 04-infrastructure | D | Blob Storage · File / Block / Object 三種對比 | `ppt/assets/diagrams/04-infrastructure/02_blob_01_three_storage.png` |
| 04-infrastructure | B | API Gateway · 7 件職責拼圖 | `ppt/assets/diagrams/04-infrastructure/03_gw_01_responsibilities.png` |
| 04-infrastructure | D | Load Balancer · L4 vs L7 對比 | `ppt/assets/diagrams/04-infrastructure/04_lb_01_l4_vs_l7.png` |
| 04-infrastructure | B | Container · VM vs Container 隔離邊界 | `ppt/assets/diagrams/04-infrastructure/05_container_01_vm_vs_container.png` |
| 05-reliability-ops | A | Hero · 章首封面 | `ppt/assets/diagrams/05-reliability-ops/00_hero.png` |
| 05-reliability-ops | D | Distributed Lock · 4 方案 Trade-off | `ppt/assets/diagrams/05-reliability-ops/01_distributed_lock_02_tradeoff.png` |
| 05-reliability-ops | E | Distributed Lock · Fencing Token 序列圖 | `ppt/assets/diagrams/05-reliability-ops/01_distributed_lock_03_fencing.png` |
| 05-reliability-ops | E | Contention · Pessimistic vs OCC 序列對比 | `ppt/assets/diagrams/05-reliability-ops/02_contention_01_pessimistic_vs_occ.png` |
| 05-reliability-ops | B | Overload Protection · 6 層防線拼圖 | `ppt/assets/diagrams/05-reliability-ops/03_overload_01_6_layers.png` |
| 05-reliability-ops | D | Overload Protection · Token vs Leaky Bucket | `ppt/assets/diagrams/05-reliability-ops/03_overload_02_token_vs_leaky.png` |
| 05-reliability-ops | C | Reliable Delivery · 6 防線串接 | `ppt/assets/diagrams/05-reliability-ops/04_delivery_01_6_lines.png` |
| 05-reliability-ops | E | Reliable Delivery · Circuit Breaker 三狀態圖 | `ppt/assets/diagrams/05-reliability-ops/04_delivery_02_circuit_breaker.png` |
| 05-reliability-ops | B | Observability · 三支柱 + 串聯關係 | `ppt/assets/diagrams/05-reliability-ops/05_observability_01_three_pillars.png` |
| 06-scaling-patterns | A | Hero · 章首封面 | `ppt/assets/diagrams/06-scaling-patterns/00_hero.png` |
| 06-scaling-patterns | E | Mental Model · 讀路徑 vs 寫路徑取捨地圖 | `ppt/assets/diagrams/06-scaling-patterns/00_mental_model.png` |
| 06-scaling-patterns | C | Scaling Reads · 4 層命中階梯 | `ppt/assets/diagrams/06-scaling-patterns/01_scaling_reads_01_ladder.png` |
| 06-scaling-patterns | C | Scaling Writes · 寫入瓶頸層級圖 | `ppt/assets/diagrams/06-scaling-patterns/02_scaling_writes_01_strategies.png` |
| 06-scaling-patterns | C | Distributed Cache · Cluster vs Sentinel | `ppt/assets/diagrams/06-scaling-patterns/03_distributed_cache_01_topology.png` |
| 06-scaling-patterns | B | Distributed Cache · Consistent Hashing 加減節點 | `ppt/assets/diagrams/06-scaling-patterns/03_distributed_cache_02_consistent_hash.png` |
| 06-scaling-patterns | B | CDN · 全球邊緣節點分布 | `ppt/assets/diagrams/06-scaling-patterns/04_cdn_01_global_edge.png` |
| 07-advanced-patterns | A | Hero · 章首封面 | `ppt/assets/diagrams/07-advanced-patterns/00_hero.png` |
| 07-advanced-patterns | C | Queue · Producer-Queue-Consumer 基本流 | `ppt/assets/diagrams/07-advanced-patterns/01_queue_01_basic_flow.png` |
| 07-advanced-patterns | C | Long Tasks · 4 個必備機制 | `ppt/assets/diagrams/07-advanced-patterns/02_longtasks_01_four_mechanisms.png` |
| 07-advanced-patterns | C | Large Blobs · Presigned URL 序列圖 | `ppt/assets/diagrams/07-advanced-patterns/03_blobs_01_presigned_url.png` |
| 07-advanced-patterns | D | Real-time · 4 種推送技術對比 | `ppt/assets/diagrams/07-advanced-patterns/04_realtime_01_four_protocols.png` |
| 07-advanced-patterns | C | Real-time · 2-Hop Fan-out 架構 | `ppt/assets/diagrams/07-advanced-patterns/04_realtime_02_two_hop_fanout.png` |
| 07-advanced-patterns | C | Search · Inverted Index 結構 | `ppt/assets/diagrams/07-advanced-patterns/05_search_01_inverted_index.png` |
| 07-advanced-patterns | C | RAG · 4 元件流程 | `ppt/assets/diagrams/07-advanced-patterns/07_rag_01_four_components.png` |

---

## P2 · 很有用（46 張）

> 主要 trade-off、關鍵序列圖、重要技術細節。

| Chapter | Type | Title | Save as |
|---------|------|-------|---------|
| 01-foundation | E | Networking · TLS Handshake 序列圖 | `ppt/assets/diagrams/01-foundation/01_networking_03_tls.png` |
| 01-foundation | B | Networking · CDN 全球邊緣 | `ppt/assets/diagrams/01-foundation/01_networking_04_cdn.png` |
| 01-foundation | E | Networking · Circuit Breaker 三狀態 | `ppt/assets/diagrams/01-foundation/01_networking_05_circuit.png` |
| 01-foundation | D | Client-Server vs P2P 架構對照 | `ppt/assets/diagrams/01-foundation/02_client_server_01_vs_p2p.png` |
| 01-foundation | E | API Design · Idempotency 序列圖 | `ppt/assets/diagrams/01-foundation/04_api_design_02_idempotency.png` |
| 01-foundation | C | Recap · Twitter 發推文整合架構 | `ppt/assets/diagrams/01-foundation/99_recap_01_twitter.png` |
| 02-data-fundamentals | E | PACELC · 決策樹 | `ppt/assets/diagrams/02-data-fundamentals/01_cap_theorem_02_pacelc.png` |
| 02-data-fundamentals | D | CAP · 知名 DB 定位象限 | `ppt/assets/diagrams/02-data-fundamentals/01_cap_theorem_03_db_quadrant.png` |
| 02-data-fundamentals | B | CAP · ATM 提款機案例（隱喻分裂） | `ppt/assets/diagrams/02-data-fundamentals/01_cap_theorem_04_atm_split.png` |
| 02-data-fundamentals | E | Indexing · 何時建 Index 決策樹 | `ppt/assets/diagrams/02-data-fundamentals/02_indexing_02_decision.png` |
| 02-data-fundamentals | E | Transactions · Saga 補償交易序列圖 | `ppt/assets/diagrams/02-data-fundamentals/03_transactions_03_saga.png` |
| 03-data-distribution | B | Consistent Hashing · 加減節點 | `ppt/assets/diagrams/03-data-distribution/01_consistent_hashing_02_neighbor.png` |
| 03-data-distribution | D | Sharding · Shard Key 三條件 | `ppt/assets/diagrams/03-data-distribution/02_sharding_03_shardkey.png` |
| 03-data-distribution | B | Replication · Lag 一致性陷阱 | `ppt/assets/diagrams/03-data-distribution/03_replication_03_lag.png` |
| 03-data-distribution | B | Caching · Cache Stampede 反模式 | `ppt/assets/diagrams/03-data-distribution/04_caching_03_stampede.png` |
| 04-infrastructure | D | Database · 4 種 NoSQL 適用場景 | `ppt/assets/diagrams/04-infrastructure/01_database_02_nosql_grid.png` |
| 04-infrastructure | C | Blob Storage · S3 Multipart Upload 序列 | `ppt/assets/diagrams/04-infrastructure/02_blob_02_multipart.png` |
| 04-infrastructure | C | API Gateway · BFF 模式（Web / Mobile / Public） | `ppt/assets/diagrams/04-infrastructure/03_gw_02_bff.png` |
| 04-infrastructure | C | Load Balancer · 演算法決策樹 | `ppt/assets/diagrams/04-infrastructure/04_lb_02_algo_tree.png` |
| 04-infrastructure | C | Container · K8s Pod / Deployment / Service 結構 | `ppt/assets/diagrams/04-infrastructure/05_container_02_k8s.png` |
| 04-infrastructure | C | Container · Liveness vs Readiness 序列圖 | `ppt/assets/diagrams/04-infrastructure/05_container_03_probes.png` |
| 04-infrastructure | D | Serverless · Cold Start 數字階梯 | `ppt/assets/diagrams/04-infrastructure/06_serverless_01_cold_start.png` |
| 04-infrastructure | C | Serverless · FaaS 執行流程 | `ppt/assets/diagrams/04-infrastructure/06_serverless_02_faas_flow.png` |
| 04-infrastructure | C | Recap · 影片上傳完整架構 | `ppt/assets/diagrams/04-infrastructure/99_recap_01_video_arch.png` |
| 05-reliability-ops | B | Distributed Lock · 4 經典場景 | `ppt/assets/diagrams/05-reliability-ops/01_distributed_lock_01_scenarios.png` |
| 05-reliability-ops | B | Contention · 5 層解法複雜度遞進 | `ppt/assets/diagrams/05-reliability-ops/02_contention_02_5_layers.png` |
| 05-reliability-ops | D | Contention · Isolation Level × 異常矩陣 | `ppt/assets/diagrams/05-reliability-ops/02_contention_03_isolation_matrix.png` |
| 05-reliability-ops | E | Reliable Delivery · Transactional Outbox 序列圖 | `ppt/assets/diagrams/05-reliability-ops/04_delivery_03_outbox.png` |
| 05-reliability-ops | D | Observability · 四金信號 + SLO/Error Budget | `ppt/assets/diagrams/05-reliability-ops/05_observability_02_four_signals_slo.png` |
| 05-reliability-ops | C | Recap · Black Friday Incident 時間軸 | `ppt/assets/diagrams/05-reliability-ops/99_recap_01_incident_timeline.png` |
| 06-scaling-patterns | B | Scaling Reads · CQRS 讀寫分離模式 | `ppt/assets/diagrams/06-scaling-patterns/01_scaling_reads_02_cqrs.png` |
| 06-scaling-patterns | B | Scaling Reads · Replication Lag 視覺化 | `ppt/assets/diagrams/06-scaling-patterns/01_scaling_reads_03_lag.png` |
| 06-scaling-patterns | D | Scaling Reads · Cache 三大反模式對照 | `ppt/assets/diagrams/06-scaling-patterns/01_scaling_reads_04_antipatterns.png` |
| 06-scaling-patterns | D | Scaling Writes · Sharding Key 反模式對照 | `ppt/assets/diagrams/06-scaling-patterns/02_scaling_writes_02_sharding_keys.png` |
| 06-scaling-patterns | B | Scaling Writes · Hot Key Split | `ppt/assets/diagrams/06-scaling-patterns/02_scaling_writes_03_hotkey_split.png` |
| 06-scaling-patterns | C | Scaling Writes · Write-Behind 序列 | `ppt/assets/diagrams/06-scaling-patterns/02_scaling_writes_04_write_behind.png` |
| 06-scaling-patterns | D | CDN · Push vs Pull Cache 模式對照 | `ppt/assets/diagrams/06-scaling-patterns/04_cdn_02_push_vs_pull.png` |
| 06-scaling-patterns | C | Recap · 新聞網站完整架構 | `ppt/assets/diagrams/06-scaling-patterns/99_recap_01_news_site.png` |
| 07-advanced-patterns | D | Queue · Kafka vs RabbitMQ vs SQS 三方對比 | `ppt/assets/diagrams/07-advanced-patterns/01_queue_02_three_brokers.png` |
| 07-advanced-patterns | D | Queue · Backpressure 三招 | `ppt/assets/diagrams/07-advanced-patterns/01_queue_03_backpressure.png` |
| 07-advanced-patterns | D | Long Tasks · 編排引擎四方對比 | `ppt/assets/diagrams/07-advanced-patterns/02_longtasks_02_orchestrators.png` |
| 07-advanced-patterns | C | Large Blobs · S3 Multipart Upload | `ppt/assets/diagrams/07-advanced-patterns/03_blobs_02_multipart.png` |
| 07-advanced-patterns | C | Search · CDC vs Dual Write + Reindex with Alias | `ppt/assets/diagrams/07-advanced-patterns/05_search_02_cdc_alias.png` |
| 07-advanced-patterns | D | Pipeline · Lambda vs Kappa 架構對比 | `ppt/assets/diagrams/07-advanced-patterns/06_pipeline_01_lambda_kappa.png` |
| 07-advanced-patterns | D | Pipeline · ETL vs ELT + Stream Window | `ppt/assets/diagrams/07-advanced-patterns/06_pipeline_02_etl_windows.png` |
| 07-advanced-patterns | C | Recap · 客服 AI 助理整合架構 | `ppt/assets/diagrams/07-advanced-patterns/99_recap_01_ai_assistant.png` |

---

## P3 · 錦上添花（7 張）

> 細節示意、視覺裝飾。預算有限可以跳過。

| Chapter | Type | Title | Save as |
|---------|------|-------|---------|
| 02-data-fundamentals | D | Numbers · 現代 DB 容量「反直覺」 | `ppt/assets/diagrams/02-data-fundamentals/04_numbers_02_capacity.png` |
| 03-data-distribution | B | Caching · Hot Key 隔離 | `ppt/assets/diagrams/03-data-distribution/04_caching_04_hotkey.png` |
| 04-infrastructure | B | Blob Storage · 5 個儲存等級階梯 | `ppt/assets/diagrams/04-infrastructure/02_blob_03_tier_ladder.png` |
| 04-infrastructure | D | Load Balancer · Sticky Session 副作用 | `ppt/assets/diagrams/04-infrastructure/04_lb_03_sticky.png` |
| 06-scaling-patterns | B | CDN · Edge Compute 流程（錦上添花） | `ppt/assets/diagrams/06-scaling-patterns/04_cdn_03_edge_compute.png` |
| 07-advanced-patterns | B | Recap · 整套 7 章地圖 | `ppt/assets/diagrams/07-advanced-patterns/99_recap_02_course_map.png` |
| 07-advanced-patterns | D | RAG · Chunking 三策略（可選） | `ppt/assets/diagrams/07-advanced-patterns/07_rag_02_chunking.png` |

---

## Type 速查

| Type | 含義 | 推薦工具 | 張數 |
|------|------|---------|-----:|
| A | Hero / Cover illustration | DALL-E 3 / Midjourney | 7 |
| B | 概念隱喻 | DALL-E 3 / Midjourney | 24 |
| C | 結構/架構/拓撲圖 | **Mermaid** | 26 |
| D | 對照矩陣 / Trade-off / 2x2 | DALL-E 3 / Excalidraw | 30 |
| E | 狀態圖 / 序列圖 / 流程 | **Mermaid** | 13 |

詳細工具選擇邏輯見 [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md) §3。

---

## 注意事項

1. **章節 prompt 文檔內已含完整 prompt 與 Mermaid 原始碼**——本索引只列檔名與優先序，實作時請進對應 `0X-*.md` 找完整 prompt。
2. **Mental Model 等部分圖在原章節文檔中採雙寫**（Mermaid 主稿 + AI 備援），任挑一條路徑生成即可。
3. **生成完成後**：把檔案存到 `Save as` 指定路徑後告訴我，例如「Ch.1 圖 1 已生成」、「Ch.4 圖 5/6/7 已生成」，我把 Marp `![w:N](...)` 語法塞入對應 slide。
