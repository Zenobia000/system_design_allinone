# Case 3 · RAG / AI 應用平台 · 圖像 Prompts

> Style guide: [`./0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md)
> Save images to: `openslide/slides/08-case-rag/assets/`

**本章圖像**：3 張 · P0 × 3

---

## Image 01 · Stage 1 · RAG MVP（試水 #2）

- **Type**: A · Architecture (with Swimlanes)
- **Priority**: P0
- **Save as**: `openslide/slides/08-case-rag/assets/08_stage1_rag_mvp.png`
- **Used in**: 08 P05
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in the style of AWS Well-Architected whitepaper / consulting report. Flat 2D vector illustration. NO 3D, NO isometric, NO cartoon, NO Greek pillars.

  Theme: RAG (Retrieval-Augmented Generation) MVP system architecture showing query flow and document ingestion pipeline.

  Background: warm cream #F5F1E8.
  Element fills: muted terracotta #D97757 for application services, olive #A1813F for AI/embedding, sage green #5B9770 for vector databases, slate #5B7570 for external LLMs.
  Lines: dark brown #2A2520, 2px, with arrowheads.
  Labels: clean sans-serif, bilingual Traditional Chinese + English near each element.

  Layout: two horizontal swimlanes labeled 'Query Path / 查詢路徑' (top) and 'Indexing Pipeline / 索引管線' (bottom).

  Top swimlane (left-to-right):
  1. Small circle 'User / 使用者'
  2. Arrow to Rounded rectangle 'Web UI / 前端介面'
  3. Arrow to Rounded rectangle 'API Service / API 服務 (FastAPI)'
  4. Arrow to Rounded rectangle 'Embedding API / OpenAI Embedding'
  5. Arrow to Cylinder 'pgvector / 向量資料庫 (top-k=5)'
  6. Arrow to Cloud 'Claude LLM / Anthropic streaming'
  7. Arrow back to Web UI labeled 'SSE Stream / 串流回應'

  Bottom swimlane (left-to-right):
  1. Rounded rectangle 'File Upload / 文件上傳'
  2. Arrow to Rounded rectangle 'Chunker / 切塊器'
  3. Arrow to Rounded rectangle 'Embedding / 向量化'
  4. Arrow to Cylinder 'pgvector INSERT / 向量入庫'

  Add side note box: 'MVP < 50 lines of code / 50 行 code 可跑通'

  Style: educational textbook + consulting deliverable. Pure schematic clarity with informative labels.
  ```

---

## Image 02 · Stage 2 · RAG 5K users 內測

- **Type**: A · Architecture (Mid-scale with cache + ACL)
- **Priority**: P0
- **Save as**: `openslide/slides/08-case-rag/assets/08_stage2_rag_5k.png`
- **Used in**: 08 P06
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in AWS Well-Architected whitepaper style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: RAG 5K users with caching, re-ranking, ACL permission filtering.

  Background: warm cream #F5F1E8.
  Element fills: terracotta #D97757 services, olive #A1813F queue, sage green #5B9770 databases, slate #5B7570 external LLM.
  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Top-to-bottom flow:
  1. Small circle 'User / 使用者'
  2. Arrow down
  3. Rounded rectangle 'Web UI / 前端'
  4. Arrow down
  5. Row of 4 rectangles 'API × 4 (auto-scale) / API 4 副本'
  6. Arrow down splits to:
     - Hexagon 'Redis Cache / 答案+向量快取 (semantic)'
     - Cylinder 'pgvector + ACL JOIN / 向量庫+權限過濾'
     - Rounded rectangle 'Re-ranker (cross-encoder) / 重排序器'
  7. Arrow merges and flows down
  8. Cloud 'LLM Pool: Claude + GPT-4 fallback / LLM 池'
  9. Side cloud connection 'OpenAI Embedding / 向量化 API'

  Side annotation: 'Stage 2 · 5K users · cache + re-rank + ACL'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 03 · Stage 3 · RAG 100K Enterprise

- **Type**: A · Architecture (Enterprise scale)
- **Priority**: P0
- **Save as**: `openslide/slides/08-case-rag/assets/08_stage3_rag_100k.png`
- **Used in**: 08 P07
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in AWS Well-Architected whitepaper style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: Enterprise RAG 100K users with full observability, sharded vectors, LLM router.

  Background: warm cream #F5F1E8.
  Element fills: terracotta #D97757 services, olive #A1813F monitoring, sage green #5B9770 databases, slate #5B7570 LLMs.
  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Top-to-bottom flow:
  1. Cloud 'CDN + Auth Gateway (SSO) / 邊緣 + 單一登入'
  2. Arrow down
  3. Row of rectangles 'API × 20 (auto-scale 10-50) / API 20 副本'
  4. Arrow down to 3-tier cache, 3 hexagons stacked: 'L1 in-memory' / 'L2 Redis' / 'L3 Semantic'
  5. Arrow down to row of 4 cylinders 'pgvector (sharded by tenant) / 多租戶分片向量庫'
  6. Arrow down to dashed box 'LLM Router / LLM 路由器' containing 3 clouds:
     - 'Claude (primary) / 主'
     - 'GPT-4 (fallback) / 備'
     - 'Self-host Llama (cheap) / 自架便宜'
  7. Side rail (right): 'Langfuse / LLM 追蹤', 'Prometheus / 系統指標', 'Audit Log → S3 / 稽核日誌'

  Side annotation: 'Stage 3 · 100K enterprise users · full observability'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```
