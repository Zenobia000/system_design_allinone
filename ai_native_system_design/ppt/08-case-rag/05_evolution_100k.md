---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · 100K Users · Enterprise'
footer: 'AI 時代系統設計速成 '
---

## C3.5 · Stage 3 · 100K Users · 企業全推

```
            CDN + Auth Gateway (SSO)
                    ↓
            API × 20 (auto-scale 10-50)
                    ↓
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    Redis Cluster  pgvector    LLM Router
    (3-tier cache) (sharded    ├─ Claude (primary)
                    by tenant) ├─ GPT-4 (fallback)
                               └─ Self-host Llama
                                    (cheap path)
                ↓
        Langfuse (LLM tracing)
        Prometheus (system metrics)
        Audit Log → S3 (compliance)
```

**新增**：
- **3-tier cache**：L1 in-memory / L2 Redis / L3 semantic similarity
- **pgvector sharding**：500K → 5M vectors，by tenant_id
- **LLM Router**：簡單問題用 self-host Llama（便宜），複雜用 Claude
- **Audit log**：每查詢留存（誰、查什麼、看到什麼、答什麼）

<br>

<span class="muted">**成本**：cache hit 60% + smart routing → $0.005/query。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md


---


## C3.5 · 答案品質保證流程

**問題**：LLM 有時瞎掰。怎麼確保品質？

**5 道防線**：

1. **Retrieval guardrail**：top-k 平均 similarity < threshold → 回「找不到」
2. **Citation enforcement**：強制 LLM 引用 chunk id → 沒引用 = reject
3. **Self-check**：另一次 LLM call 驗證「答案是否從 source 來」
4. **User feedback loop**：thumbs up/down → 進入 eval set
5. **Eval pipeline**：每週跑 100 標準題 → 品質下降立刻 alert

<br>

<span class="muted">**金句**：RAG 的 90% 工程力花在「不讓 LLM 瞎掰」，不是 retrieval。</span>

> Source: _source/braindump.md · §AI 工作流的 7 個常見地雷
