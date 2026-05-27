---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · MVP Architecture'
footer: 'AI 時代系統設計速成 '
---

## C3.3 · MVP（1 user 試用）

```
Web UI
   ↓ SSE
API Service (Python/FastAPI)
   ↓
   ├─ Embedding (OpenAI API) ── query embedding
   ├─ pgvector (top-k search) ── retrieve 5 chunks
   ├─ Re-rank (optional cross-encoder)
   └─ LLM (Claude) ────────── generate + stream

Background:
File Upload → Chunker → Embed → INSERT into pgvector
```

**單機可跑**：
- 1 台中型 EC2 + 1 台 RDS PostgreSQL with pgvector
- 用 OpenAI / Anthropic 託管 API
- 月成本 ~$200 + LLM 用量

**MVP 缺點**：
- 沒 cache（每查詢都打 LLM）
- 沒權限過濾
- 沒 streaming 優化

<br>

<span class="muted">**反 pattern**：MVP 就上 Pinecone + LangGraph 一堆 framework—直接 fastapi + 3 行 code 就能跑。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md


---


## C3.3 · MVP 端到端流程（code level）

```python
@app.post("/chat")
async def chat(query: str, user_id: int):
    # 1. embed query
    q_vec = await openai.embeddings.create(
        input=query, model="text-embedding-3-small")

    # 2. retrieve
    chunks = await db.fetch(
        "SELECT content, source FROM chunks "
        "WHERE user_can_access(user_id, doc_id) "
        "ORDER BY embedding <=> $1 LIMIT 5",
        q_vec)

    # 3. build prompt + stream answer
    prompt = build_prompt(query, chunks)
    async for chunk in claude.messages.stream(prompt):
        yield chunk
```

<br>

<span class="muted">**完整 RAG MVP < 50 行 code**。剩下都是優化。</span>

> Source: software_architect/ppt/_source/06_Components_Patterns.md
