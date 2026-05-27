---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Glossary · 詞彙表 80 條'
footer: '系統設計實戰 · v1.0 · 桑尼資料科學'
---

<!-- _class: chapter -->

<div class="ch-no">APPENDIX · 03 · GLOSSARY</div>

# 詞彙表 80 條
## *5 群組 × 3 頁 · 速查 · 對白話*

<!--
完整 80 詞詞彙表：
- 對應主課程章節
- 開場 25 詞屬入門子集
- 此為完整版（含進階詞、AI 詞）
-->

---

<!-- _class: compact -->

## 群組 1/3 · 網路 · 資料庫 · 一致性

| 英文 | 中文 | 一句白話 | 章 |
|---|---|---|---|
| HTTP/HTTPS | 超文字傳輸 | 瀏覽器與 server 溝通格式 | Ch.01 |
| REST | RESTful API | 用 HTTP 動詞操作資源 | Ch.01 |
| RPC | 遠端程序呼叫 | 像呼叫本地函數呼叫遠端 | Ch.01 |
| gRPC | Google RPC | 高效二進位 RPC | Ch.01 |
| GraphQL | 查詢式 API | 客戶端自選欄位 | Ch.01 |
| WebSocket | 全雙工長連線 | 雙向即時推 | Ch.07 |
| TLS / SSL | 傳輸層加密 | HTTPS 用的加密協定 | Ch.01 |
| CDN | 內容分發網路 | 靜態檔放邊緣節點 | Ch.01 |
| Latency | 延遲 | 請求到回應的時間 | Ch.02 |
| Throughput | 吞吐量 | 單位時間處理多少 (QPS/TPS) | Ch.02 |
| RTT | Round-Trip Time | 一來一回的網路時間 | Ch.02 |

---

<!-- _class: compact -->

## 群組 1/3 · 續

| 英文 | 中文 | 一句白話 | 章 |
|---|---|---|---|
| SQL / NoSQL | 關聯式/非關聯式 | 固定欄位 vs 自由形態 | Ch.02 |
| ACID | 事務 4 性質 | 原子/一致/隔離/永久 | Ch.02 |
| BASE | 弱一致 3 性質 | 基本可用/軟狀態/最終一致 | Ch.02 |
| Index | 索引 | 資料表目錄，查快寫慢 | Ch.02 |
| B-Tree / LSM | 兩種索引結構 | 適讀 vs 適寫 | Ch.02 |
| CAP | 一致/可用/分區 | 三選二定理 | Ch.02 |
| PACELC | CAP 延伸 | 沒分區時的延遲 vs 一致 | Ch.02 |
| Strong / Eventual | 強/最終一致 | 馬上同步 vs 最後一致 | Ch.02 |
| Isolation Level | 隔離級別 | RU→RC→RR→Serializable | Ch.02 |
| Transaction | 事務 / 交易 | 要嘛全成功要嘛全失敗 | Ch.02 |
| OLTP / OLAP | 交易型/分析型 | 處理訂單 vs 跑報表 | Ch.02 |

---

<!-- _class: compact -->

## 群組 2/3 · 分散式 · 基建 · 可靠性

| 英文 | 中文 | 一句白話 | 章 |
|---|---|---|---|
| Sharding | 資料分片 | 拆到多台 DB | Ch.03 |
| Partitioning | 分區 | 同庫切表 | Ch.03 |
| Replication | 複製 | 主寫副本讀 | Ch.03 |
| Consistent Hash | 一致性哈希 | 加減機器搬最少 | Ch.03 |
| Virtual Node | 虛擬節點 | 每實體掛多個，分配均勻 | Ch.03 |
| Replica Lag | 複製延遲 | 主到副本看見的時差 | Ch.03 |
| Hot Key | 熱鍵 | 少數 key 流量爆炸 | Ch.03 |
| Cache Stampede | 快取雪崩 | 熱 key 同時過期打爆 DB | Ch.03 |
| Cache-aside | 旁路快取 | miss 才查 DB → 寫回 | Ch.06 |
| Write-through | 寫穿快取 | 同步寫 cache+DB | Ch.06 |
| Write-behind | 寫後快取 | 寫 cache 後非同步寫 DB | Ch.06 |

---

<!-- _class: compact -->

## 群組 2/3 · 續

| 英文 | 中文 | 一句白話 | 章 |
|---|---|---|---|
| Load Balancer | 負載均衡器 | L4/L7 把流量分後端 | Ch.04 |
| Gateway | API 閘道 | 認證/限流/路由統一入口 | Ch.04 |
| VPC / Subnet | 虛擬私有雲 | 雲上你的內網 | Ch.04 |
| Container / K8s | 容器/編排 | Docker + Kubernetes | Ch.04 |
| Serverless / FaaS | 無伺服器 | 只寫函數平台跑 (Lambda) | Ch.04 |
| Blob Storage | 物件儲存 | 存大檔的便宜服務 | Ch.04 |
| IaC | 基建即程式碼 | Terraform 基建寫成 code | Ch.04 |
| Lock | 分散式鎖 | 搶資源誰拿誰做 | Ch.05 |
| Rate Limit | 限流 | 每秒最多 X 請求 | Ch.05 |
| Circuit Breaker | 斷路器 | 下游死了不要繼續打 | Ch.05 |
| Bulkhead | 隔離艙 | 資源分隔，一壞不拖死 | Ch.05 |

---

<!-- _class: compact -->

## 群組 3/3 · 觀測 · 進階 · AI

| 英文 | 中文 | 一句白話 | 章 |
|---|---|---|---|
| SLA / SLO / SLI | 合約/目標/指標 | 對外承諾/對內目標/實際 | Ch.05 |
| Error Budget | 錯誤預算 | 100% - SLO = 允許壞時間 | Ch.05 |
| Observability | 可觀測性 | Metrics + Logs + Traces | Ch.05 |
| Metrics | 指標 | 聚合即時數字 | Ch.05 |
| Logs | 日誌 | 請求明細追溯 | Ch.05 |
| Traces | 追蹤 | 跨服務耗時瀑布 | Ch.05 |
| Idempotency | 冪等性 | 1 次和 10 次結果一樣 | Ch.05 |
| Backpressure | 反壓 | 下游慢時上游放慢 | Ch.05 |
| MTBF / MTTR | 故障間隔/修復 | 系統可靠性兩指標 | Ch.05 |
| SPOF | 單點故障 | 壞了全死的元件 | Ch.05 |
| Retry + Jitter | 重試+抖動 | 加 jitter 防風暴 | Ch.05 |
| Timeout | 超時 | 超過 X 秒放棄 | Ch.05 |

---

<!-- _class: compact -->

## 群組 3/3 · 續

| 英文 | 中文 | 一句白話 | 章 |
|---|---|---|---|
| Queue | 訊息佇列 | Kafka/SQS 削峰解耦 | Ch.07 |
| Pub/Sub | 發布訂閱 | 一發多收 | Ch.07 |
| Stream Processing | 串流處理 | Flink/Spark 即時運算 | Ch.07 |
| Long Task | 長任務 | 幾秒以上丟背景跑 | Ch.07 |
| CQRS | 命令查詢分離 | 讀寫模型分開 | Ch.06 |
| Saga | 補償事務 | 跨服務長事務補償 | Ch.07 |
| Event Sourcing | 事件溯源 | 存事件不存狀態 | Ch.07 |
| Outbox | 訊息可靠投遞 | DB 同時寫 outbox 表 | Ch.07 |
| Pipeline / ETL | 資料管線 | Extract → Transform → Load | Ch.07 |
| RAG | 檢索增強生成 | 先查再生成 | Ch.07 |
| Embedding | 向量化 | 文字變數字向量 | Ch.07 |
| Vector DB | 向量資料庫 | pgvector/Pinecone | Ch.07 |
| Chunk | 文件切塊 | 長文件切小段才能 embed | Ch.07 |
| Hybrid Search | 混合搜尋 | 關鍵字+向量提升召回 | Ch.07 |

---

<!-- _class: end -->

# 80 詞完整詞彙表
## 系統設計常見術語 · 一查就懂

> 入門 25 詞 → 序章 04<br>進階 80 詞 → 附錄 03（本章）<br>更深一層 → 各章節「本章新術語」P02b
