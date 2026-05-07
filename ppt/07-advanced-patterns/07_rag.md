---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · RAG'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · TOPIC 07</div>

# RAG (Retrieval-Augmented Generation)
## *把外部知識喂給 LLM — 把幻覺換成引用*

---

## RAG · WHY

# Foundation Model 的 4 個根本限制

<div class="highlight">

**① Knowledge Cutoff**　 訓練資料凍結在某天，**不知道近期事件**  
**② 缺乏特定領域深度**　 醫療罕見病、最新療法等高度專業化資料不在訓練集  
**③ 不知道私有資料**　 公司內部流程、人事、商業機密  
**④ Probabilistic 輸出 → Hallucination**　 模型分配機率包括錯的後續，有 temperature/top-k 隨機性，**模型無法區分「我知道」和「我不知道」**

</div>

<br>

**RAG = Retrieval-Augmented Generation**：把外部知識**先檢索**，再把命中片段塞進 LLM prompt——**用引用取代幻覺**。

> Source: 設計模式/08 RAG.pdf · §Foundation Model 的限制

---

## RAG · HOW · 4 個元件

```
[Documents] ─chunk→ [Embedding Model] ─vec→ [Vector DB]
                                                 │ similarity search
                                                 ▼
[User Query] ─embed→ [Vector DB] ──→ Top-K chunks
                                          │
                                          ▼
                              [LLM Prompt: Q + Context]
                                          │
                                          ▼
                                      [Answer + Citations]
```

<div class="stack">
  <div class="layer client"><strong>① Ingestion</strong>　 chunk → embed → 載入 Vector DB（offline）</div>
  <div class="layer app"><strong>② Retrieval</strong>　 query embed → similarity search → top-K candidates</div>
  <div class="layer data"><strong>③ Augmentation</strong>　 把 retrieved context 包成 prompt 給 LLM</div>
  <div class="layer infra"><strong>④ Generation</strong>　 LLM 基於 context 生成答案 + 引用</div>
</div>

> Source: 設計模式/08 RAG.pdf · §RAG 是怎麼運作的

---

## RAG · Chunking

# 切分策略決定一切

<div class="alert">

**Chunking 沒做好 = 整個 RAG 廢掉**——chunk 太大塞不進 prompt；太小失去語意脈絡。

</div>

<div class="def">
<span class="term">固定大小切分</span>
200–500 token / chunk · 相鄰 chunk overlap 10–20%（防止關鍵句剛好被切斷）。最常用。
</div>

<div class="def">
<span class="term">語意切分</span>
按段落、句號、標題切——**保留語意邊界**，避免半句話被分開。
</div>

<div class="def">
<span class="term">遞迴切分</span>
先按章節切大塊 → 大塊太大再按段落切 → 段落太大按句切。LangChain `RecursiveCharacterTextSplitter` 是預設。
</div>

> Source: 設計模式/08 RAG.pdf · §第一步：Ingestion

---

## RAG · Hybrid Search & Rerank

# 提升 RAG 品質的 5 個招式

<div class="def">
<span class="term">① Hybrid Search</span>
**dense vector**（semantic）+ **sparse vector / BM25**（lexical）取聯集 → rerank。處理「縮寫、產品名、團隊名」等 lexical 強場景。
</div>

<div class="def">
<span class="term">② Query Rewriting / HyDE</span>
LLM 先把 query 改寫成多個變體 → 並行檢索 → 結果合併。HyDE = LLM 先生成「假想答案」再用它做 vector search。
</div>

<div class="def">
<span class="term">③ Re-ranking</span>
召回 50 個 → cross-encoder model rerank → 取 top 5 進 prompt。**Cohere Rerank / BGE Reranker** 是常見選擇。
</div>

<div class="def">
<span class="term">④ Citation Enforcement</span>
Prompt 強制「**只用 context 內容回答 + 引用來源 ID**」。沒命中就回「I don't know」。
</div>

<div class="def">
<span class="term">⑤ Evaluation Loop</span>
**Ground Truth Eval Set**：一組 query + 預期答案。用 RAGAS / LLM-as-judge 衡量 retrieval（recall / precision）和 generation（faithfulness / answer relevance）。
</div>

> Source: 設計模式/08 RAG.pdf · §RAG 怎麼運作 + §什麼是 RAG

---

## RAG · Hallucination 對策

<div class="tradeoff">
  <div class="pro">
    <h3>降低幻覺 ✓</h3>
    <ul>
      <li>Prompt 強制「只用 context 回答」</li>
      <li>沒命中時回「I don't know」</li>
      <li>每個答案附 source citation（人工可審）</li>
      <li>Temperature 設低（0.0–0.3）</li>
      <li>Eval set 持續監控 faithfulness 分數</li>
    </ul>
  </div>
  <div class="con">
    <h3>常見錯誤 ✗</h3>
    <ul>
      <li>Top-K 設太大塞爆 context window</li>
      <li>Chunk 邊界切壞（半句話）</li>
      <li>沒做 reranking 直接餵 vector top-K</li>
      <li>沒監控 retrieval recall</li>
      <li>Embedding model 跟內容語言不匹配</li>
    </ul>
  </div>
</div>

> Source: 設計模式/08 RAG.pdf · §失去用戶信任 + §RAG 帶來的好處

---

## RAG · Vector DB 選型

<div class="tradeoff">
  <div class="pro">
    <h3>專用 Vector DB（Pinecone / Weaviate / Qdrant）</h3>
    <ul>
      <li>查詢延遲穩定（< 50ms p99）</li>
      <li>HNSW / IVF index 內建</li>
      <li>10M+ 向量也順</li>
      <li>多租戶隔離</li>
    </ul>
  </div>
  <div class="con">
    <h3>傳統 DB 加掛（pgvector / Redis）</h3>
    <ul>
      <li>沿用現有 Postgres</li>
      <li>事務 + 關聯查詢一站搞定</li>
      <li>< 100k 向量足夠快</li>
      <li>運維簡單</li>
    </ul>
  </div>
</div>

<div class="highlight">

**經驗法則**：原型 + 中小規模用 **pgvector**；千萬向量以上 + 多租戶用 **Pinecone / Qdrant**。

</div>

> Source: 設計模式/08 RAG.pdf · §第二步：Retrieval

---

## RAG · Agentic RAG

# 從靜態 retrieve 到 agent orchestration

```
[User Query]
    │
    ▼
[Agent (LLM)] ──┬──→ [Vector DB · Pinecone]
    │           ├──→ [User Config API]
    │           ├──→ [Usage History API]
    │           ├──→ [Slack / SMS]
    │           └──→ ...更多工具
    ▼
[Reasoning · Validate · Aggregate] → [Output]
```

<div class="highlight">

**Agentic RAG**：LLM 自己決定**該問什麼問題、用哪些工具、何時用、如何聚合結果**——RAG 不再只是「一次 vector lookup + prompt」，而是**動態 orchestration**。

</div>

<span class="muted">問題已經不是「要不要實作 RAG」，而是「**如何針對你的 use case 設計它的架構**」。</span>

> Source: 設計模式/08 RAG.pdf · §RAG 在 Agentic Workflow 中的角色

---

<!-- _class: end -->

# RAG 完
## *Retrieve → Augment → Generate · Eval · Iterate——下一站把 7 個 pattern 串成一個案例。*

<br>

<span class="lead">→ 99 Recap</span>
