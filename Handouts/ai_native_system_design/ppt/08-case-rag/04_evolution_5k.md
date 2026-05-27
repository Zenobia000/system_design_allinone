---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · 5K Users'
footer: 'AI 時代系統設計速成 '
---

## C3.4 · Stage 2 · 5K Users · 內測

```
Web UI
   ↓ SSE
API × 4 (auto-scale)
   ↓
   ├─ Redis (answer cache, embedding cache)
   ├─ Embedding queue (Celery + Redis)
   ├─ pgvector + IVFFlat index
   ├─ Re-ranker (cross-encoder, GPU-less)
   └─ LLM Pool (Claude + GPT-4 fallback)

Background:
File Upload → Worker pool → Embed batch → Index
Permission Sync → ACL table
```

**新增**：
- **Answer cache**：semantic cache（相似問題 → 同答案）
- **Embedding cache**：相同 query 不重算
- **Re-ranker**：retrieve 20 → rerank → top 5（提升 precision）
- **Permission ACL**：每 chunk 有 ACL，retrieve 時 SQL filter
- **LLM fallback**：Claude 429 → 切 GPT-4

<br>

<span class="muted">**成本下降**：cache hit 30% → LLM 成本減 30%。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §AI


---


## C3.4 · 權限過濾的正確做法

**錯**：retrieve top 10 → app code filter → 可能 0 結果。
**對**：SQL 內 JOIN ACL，retrieve 時就過濾。

```sql
SELECT c.content, c.source
FROM chunks c
JOIN document_acl a ON c.doc_id = a.doc_id
WHERE a.user_id = $user_id
  AND a.permission >= 'read'
ORDER BY c.embedding <=> $q_vec
LIMIT 10;
```

**配套**：
- ACL 表 partition by user_id（讀快）
- 高頻使用者的 ACL 預載到 Redis Set
- 文件更權限 → 同步觸發 ACL update

<br>

<span class="muted">**金句**：權限是 retrieval 的一等公民—事後 filter 是 bug 來源。</span>

> Source: _source/braindump.md · §三大案例選擇邏輯
