---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · One-Page Cheat Sheet'
footer: 'AI 時代系統設計速成 '
---

<!-- _class: end -->

## Case 3 · 一頁速查

<!-- _class: compact -->

```
場景：企業 RAG 系統，100K 員工，50K 文件

核心 5 步：
1. Chunk + Embed → pgvector（500K 向量內）
2. SQL JOIN ACL → 權限過濾在 retrieval 層
3. Hybrid search → vector + BM25 提升 recall
4. Re-rank → cross-encoder 取 top 5
5. LLM stream + citation enforcement

品質 5 道防線：
retrieval threshold / citation / self-check / feedback / eval

關鍵 trade-off：
- 強 vector DB → pgvector 夠（後悔再換）
- 全 Claude → LLM router（便宜題目用便宜 model）

紅線：
- Hallucination rate > 5% → 沒人會用
- Cost/query > $0.01 → 經濟學死
- 權限漏洞 → 公司死
```

> Source: 整合 Module B + C + D
