---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · Tech Selection'
footer: 'AI 時代系統設計速成 '
---

## C3.2 · 技術選型決策矩陣

<!-- _class: compact -->

| 元件 | 選 | 不選 | 理由 |
|---|---|---|---|
| Vector DB | pgvector（PostgreSQL extension）| Pinecone, Qdrant | 已用 PG，500K 向量內夠 |
| LLM | Claude Sonnet 4.6 | 自架 LLaMA | 成本/品質平衡 |
| Embedding | OpenAI text-embedding-3-small | self-host | 便宜、穩定 |
| 文件處理 | Unstructured.io + custom chunker | 全自建 | OSS 維護好 |
| Cache（answer） | Redis | 不 cache | 重複問題 cache → 省 80% |
| Cache（embedding） | Redis | 不 cache | 同 query 不重算 |
| Search Hybrid | pgvector + tsvector (BM25) | 純 vector | 提升 recall |
| Streaming | Server-Sent Events | WebSocket | 單向夠用 |
| 監控 | Langfuse + Prometheus | 自建 | LLM 觀測專業工具 |

<br>

<span class="muted">**核心決策**：能用既有 PG 就不引入新 vector DB。500K vector pgvector 沒問題。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md
