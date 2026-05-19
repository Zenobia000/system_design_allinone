---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.10 · Search & Vector'
footer: 'AI 時代系統設計速成 '
---

## B.10 · 搜尋與向量 DB

<span class="kicker">SEARCH · 兩種需求</span>

<!-- _class: compact -->

| 需求 | 工具 | 範例 |
|---|---|---|
| 文字全文搜 | Elasticsearch / OpenSearch / Meilisearch | 電商搜商品、文件搜 |
| 語義相似（向量） | pgvector / Pinecone / Qdrant / Weaviate | RAG, 推薦, 圖片相似 |
| 混合（lexical + vector） | OpenSearch / Vespa | 高品質 RAG |

<br>

**向量 DB 選型 5 點**：

1. **已用 PostgreSQL?** → 先用 pgvector（最低摩擦）
2. **規模 < 10M vectors?** → pgvector 或 Qdrant
3. **規模 > 100M vectors?** → Pinecone managed, 或自管 Milvus
4. **要 hybrid search?** → Weaviate / OpenSearch
5. **不想自管?** → Pinecone（貴但省事）

<br>

<span class="muted">**RAG 真相**：80% 的 RAG 系統 pgvector 夠用。Pinecone 是後期問題。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §AI / Vector
