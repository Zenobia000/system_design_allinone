---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · Recap'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · TOPIC 99</div>

# Recap & Graduation
## *把 7 個進階模式串起來 · 整門課的終點*

---

## CASE STUDY · 把進階模式串起來

# 設計：客服 AI 助理

<div class="stack">
  <div class="layer client"><strong>Real-time</strong>　 前端 SSE 串流 LLM token 給用戶（聊天用 WebSocket）</div>
  <div class="layer app"><strong>RAG</strong>　 客戶問題 embed → pgvector → Top-K chunks → rerank → LLM prompt</div>
  <div class="layer data"><strong>Search</strong>　 Elasticsearch BM25 keyword 檢索 · 跟 vector 結果 hybrid</div>
  <div class="layer infra"><strong>Long Tasks</strong>　 複雜任務（退費、查訂單）走 Temporal workflow + saga</div>
  <div class="layer infra"><strong>Large Blobs</strong>　 用戶上傳問題截圖走 presigned URL 直傳 S3</div>
  <div class="layer infra"><strong>Queue</strong>　 對話 log 進 Kafka topic（fan-out 到下游 4 個服務）</div>
  <div class="layer infra"><strong>Pipeline</strong>　 Kafka → Snowflake · 每日 dbt transform 出分析報表</div>
</div>

<div class="highlight">

**每個元件都是 Ch.7 的一個 pattern**——進階模式組合就是現代 AI 應用的縮影。

</div>

> Source: 整合 Ch.7 全章 + Anthropic / OpenAI 公開 best practice

---

## RECAP · 第七章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>Kafka / RabbitMQ / SQS · partition · DLQ · backpressure</li>
      <li>長任務 4 機制 · idempotency · heartbeat · poison message</li>
      <li>大檔案 presigned URL · multipart · CDN · range request</li>
      <li>Real-time 4 種推送 · 兩個 hop · Pub/Sub · CRDT</li>
      <li>Search 倒排索引 · BM25 · CDC · alias reindex · hybrid</li>
      <li>Lambda vs Kappa · ETL vs ELT · Lakehouse · watermark</li>
      <li>RAG 4 元件 · chunking · rerank · agentic</li>
    </ul>
  </div>
  <div class="con">
    <h3>核心心法</h3>
    <ul>
      <li>進階 pattern 不是越多越好</li>
      <li>每個都有「不該用」的情境</li>
      <li>複雜度跟著規模才有意義</li>
      <li>面試時主動指出 trade-off 拿分</li>
    </ul>
  </div>
</div>

---

## 整套課程 · 7 章地圖

```
Ch.1 Foundation       基本元件 · client/server/db/cache/cdn/dns
Ch.2 Data Fundamentals SQL/NoSQL · ACID · CAP · 索引
Ch.3 Data Distribution Sharding · Replication · Consistency
Ch.4 Infrastructure   API Gateway · LB · Container · Serverless
Ch.5 Reliability Ops  Monitoring · 限流 · Circuit Breaker · IaC
Ch.6 Scaling Patterns Read · Write · Cache · Microservices
Ch.7 Advanced         Queue · Long · Blob · RT · Search · Pipe · RAG
```

<div class="highlight">

**從基本元件到分散式 · 從擴展到 AI——你走完了。**  
面試 / 工作時的「locker room」就是這 7 章。

</div>

---

## 畢業 · 下一步學什麼

<div class="stack">
  <div class="layer client"><strong>① 實作練習</strong>　 自己跑一遍 Capstone（90 章）· 實作小型 RAG · scale 到 1k QPS</div>
  <div class="layer app"><strong>② 系統設計面試</strong>　 ByteByteGo · Designing Data-Intensive Applications · Hello Interview · Grokking</div>
  <div class="layer data"><strong>③ 深度延伸</strong>　 DDIA（資料密集應用設計） · SRE Book · The DDD Reference</div>
  <div class="layer infra"><strong>④ 真實案例</strong>　 High Scalability blog · 各大公司 engineering blog（Uber/Netflix/Stripe/Discord）</div>
  <div class="layer infra"><strong>⑤ 動手做</strong>　 自架 Kafka cluster · 寫個 RAG demo · 跑 K8s 部署 · 實際用 Temporal</div>
</div>

<br>

<span class="muted">**最重要的事**：不要只看理論——**自己挖一個系統的 bug、自己 scale 一次 production**，比讀十本書都有用。</span>

---

## 給未來面試 / 工作的你

<div class="highlight">

**面試時的 5 句通關咒**：

1. 「先問清需求和規模，**不要一聽題就畫架構**」
2. 「**主動指出 trade-off**——每個方案的代價是什麼」
3. 「**這個量級不需要 X**——展示你知道什麼時候不該用」
4. 「**從簡單開始**，按需求逐步升級」
5. 「**會不會破壞現有系統？**——backward compatibility 是鐵律」

</div>

<br>

<span class="muted">技術會過時，**判斷力不會**。Linus 說的：「Theory and practice sometimes clash. Theory loses. Every single time.」</span>

---

<!-- _class: end -->

# Ch.7 · 整門課完
## *7 章 · 50+ pattern · 100+ trade-off · 你準備好了。*

<br>

<span class="lead">— 系統設計實戰 v1.0 · 完 —</span>

<br>

<span class="muted">Capstone 案例見 90-appendix · 速查 cheatsheet 見 91 · 後續資源見 92</span>
