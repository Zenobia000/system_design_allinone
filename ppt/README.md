# 系統設計實戰 · PPT

> 七章 × 四十八主題 · Anthropic 風格 Marp 簡報
> 對應來源教材：[`../系統設計實戰/`](../系統設計實戰/) 共 34 份 PDF

每張 slide 只回答三件事：
**這個技術解決什麼問題？代價是什麼？什麼時候不該用？**

---

## Quickstart

從**專案根目錄**執行（不是 `ppt/` 內）：

```bash
# 安裝 Marp CLI（一次；npx 也可）
npm install -g @marp-team/marp-cli

# 整套 PDF + HTML，輸出到 ../dist/
bash ../scripts/build.sh full

# 精簡版（cover + roadmap + 章節 overview + cheatsheet）
bash ../scripts/build.sh minimal

# 單一章節
bash ../scripts/build.sh chapter 01-foundation

# 只產 build/combined.md（不轉 PDF）
bash ../scripts/build.sh combined

# 編譯單一主題（直接用 marp）
marp --theme-set themes/ 01-foundation/01_networking.md --pdf
```

---

## 目錄結構

```
ppt/
├── 00-prologue/          序章（封面、地圖、心智模型）
├── 01-foundation/        Ch.1 · 網路、C/S、可擴展性、API
├── 02-data-fundamentals/ Ch.2 · CAP、Indexing、Transactions、Numbers
├── 03-data-distribution/ Ch.3 · Hashing、Sharding、Replication、Caching
├── 04-infrastructure/    Ch.4 · DB、Blob、GW、LB、Container、Serverless
├── 05-reliability-ops/   Ch.5 · Lock、Contention、Overload、Delivery、Observability
├── 06-scaling-patterns/  Ch.6 · Reads、Writes、Distributed Cache、CDN
├── 07-advanced-patterns/ Ch.7 · Queue、Long Tasks、Blobs、Real-time、Search、Pipeline、RAG
├── 90-appendix/          附錄（Capstone、Cheatsheet、後續資源）
├── themes/anthropic.css  Anthropic 主題樣式
├── assets/               圖示、流程圖
└── build/                編譯產出（gitignore；由根目錄 scripts/build.sh 產出）
```

### 命名規範
- 資料夾：`NN-kebab-case/`（兩位數零墊；`00` 序章、`90` 附錄）
- 檔案：`NN_snake_case.md`（`00` = overview、`99` = recap）
- 全部小寫
- 每個 topic 對應一份來源 PDF

---

## 完整章節索引

### 00 · Prologue · 序章
| # | 主題 | 路徑 |
|---|------|------|
| 00 | 封面 · Cover | [00-prologue/00_cover.md](00-prologue/00_cover.md) |
| 01 | 學習地圖 · Roadmap | [00-prologue/01_roadmap.md](00-prologue/01_roadmap.md) |
| 02 | 如何使用本簡報 | [00-prologue/02_how_to_use.md](00-prologue/02_how_to_use.md) |
| 03 | 心智模型 · 4 維框架 | [00-prologue/03_mental_model.md](00-prologue/03_mental_model.md) |

### 01 · Foundation Layer · 地基
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview · 章節導讀 | — |
| 01 | [Networking](01-foundation/01_networking.md) | 基本觀念/01 Networking Essentials |
| 02 | [Client-Server](01-foundation/02_client_server.md) | 基本觀念/02 Client-Server Architecture |
| 03 | [Scalability](01-foundation/03_scalability.md) | 基本觀念/04 Scalability |
| 04 | [API Design](01-foundation/04_api_design.md) | 基本觀念/05 API Design |
| 99 | Recap · 案例 + 結語 | — |

### 02 · Data Fundamentals · 資料層基礎
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [CAP Theorem](02-data-fundamentals/01_cap_theorem.md) | 基本觀念/03 CAP Theorem |
| 02 | [Indexing](02-data-fundamentals/02_indexing.md) | 基本觀念/07 Database Indexing |
| 03 | [Transactions](02-data-fundamentals/03_transactions.md) | 基本觀念/08 Database Transactions |
| 04 | [Numbers to Know](02-data-fundamentals/04_numbers.md) | 基本觀念/12 Numbers to Know |
| 99 | Recap | — |

### 03 · Data Distribution · 資料分散
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [Consistent Hashing](03-data-distribution/01_consistent_hashing.md) | 基本觀念/06 Consistent Hashing |
| 02 | [Sharding](03-data-distribution/02_sharding.md) | 基本觀念/10 Sharding |
| 03 | [Replication](03-data-distribution/03_replication.md) | 基本觀念/11 Replication |
| 04 | [Caching](03-data-distribution/04_caching.md) | 基本觀念/09 Caching |
| 99 | Recap | — |

### 04 · Infrastructure · 基礎建設
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [Database](04-infrastructure/01_database.md) | 常用技術/01 Database |
| 02 | [Blob Storage](04-infrastructure/02_blob_storage.md) | 常用技術/02 Blob Storage |
| 03 | [API Gateway](04-infrastructure/03_api_gateway.md) | 常用技術/03 API Gateway |
| 04 | [Load Balancer](04-infrastructure/04_load_balancer.md) | 常用技術/04 Load Balancer |
| 05 | [Container](04-infrastructure/05_container.md) | 常用技術/05 Container |
| 06 | [Serverless](04-infrastructure/06_serverless.md) | 常用技術/06 Serverless |
| 99 | Recap | — |

### 05 · Reliability & Ops · 可靠性與維運
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [Distributed Lock](05-reliability-ops/01_distributed_lock.md) | 常用技術/09 Distributed Lock |
| 02 | [Contention](05-reliability-ops/02_contention.md) | 維運/01 Dealing with Contention |
| 03 | [Overload Protection](05-reliability-ops/03_overload_protection.md) | 維運/02 Overload Protection |
| 04 | [Reliable Delivery](05-reliability-ops/04_reliable_delivery.md) | 維運/03 Reliable Delivery |
| 05 | [Observability](05-reliability-ops/05_observability.md) | 維運/04 Observability |
| 99 | Recap | — |

### 06 · Scaling Patterns · 擴展模式
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [Scaling Reads](06-scaling-patterns/01_scaling_reads.md) | 設計模式/01 Scaling Reads |
| 02 | [Scaling Writes](06-scaling-patterns/02_scaling_writes.md) | 設計模式/02 Scaling Writes |
| 03 | [Distributed Cache](06-scaling-patterns/03_distributed_cache.md) | 常用技術/08 Distributed Cache |
| 04 | [CDN](06-scaling-patterns/04_cdn.md) | 常用技術/10 CDN |
| 99 | Recap | — |

### 07 · Advanced Patterns · 進階模式
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [Queue](07-advanced-patterns/01_queue.md) | 常用技術/07 Queue |
| 02 | [Long Running Tasks](07-advanced-patterns/02_long_running_tasks.md) | 設計模式/03 Manage Long Running Tasks |
| 03 | [Large Blobs](07-advanced-patterns/03_large_blobs.md) | 設計模式/04 Handling Large Blobs |
| 04 | [Real-time Updates](07-advanced-patterns/04_realtime_updates.md) | 設計模式/05 Real-time Updates |
| 05 | [Search System](07-advanced-patterns/05_search_system.md) | 設計模式/06 Search System |
| 06 | [Data Pipeline](07-advanced-patterns/06_data_pipeline.md) | 設計模式/07 Data Pipeline Design |
| 07 | [RAG](07-advanced-patterns/07_rag.md) | 設計模式/08 RAG |
| 99 | Recap | — |

### 90 · Appendix · 附錄
| # | 主題 |
|---|------|
| 00 | [Capstone Case Studies](90-appendix/00_capstone_case_studies.md) |
| 01 | [Review Cheatsheet](90-appendix/01_review_cheatsheet.md) |
| 02 | [Resources & Next Steps](90-appendix/02_resources_next.md) |

---

## 三種閱讀路徑

| 路徑 | 對象 | 內容 |
|------|------|------|
| **A · 線性** | 自學 8 小時 | 00 → 07 → 90，依序讀完 |
| **B · 主題** | 工作查手冊 | 直接挑章節，搭配 PDF 深讀 |
| **C · 面試** | 3 天衝刺 | Ch.1 + Ch.2 + 90/01_review_cheatsheet + 90/00_capstone |

---

## 風格與貢獻

- 主題：Marp + Anthropic 配色（暖橙 `#D97757` + 米白底 `#F5F1E8`）
- 字體：Playfair Display（標題）/ Inter（內文）/ IBM Plex Mono（程式碼）/ Noto Sans TC（中文）
- 修改 slide 時請保留 `> Source: ...` 引用格式
- 新增主題時請依「Why / How / Trade-off」三段節奏
- 不引入新 CSS class，沿用 [`themes/anthropic.css`](themes/anthropic.css) 既有 component

---

**v1.0 · 2026**
