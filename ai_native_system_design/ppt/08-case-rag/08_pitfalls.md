---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · Pitfalls & Monitoring'
footer: 'AI 時代系統設計速成 '
---

## C3.8 · 常見坑 + 監控指標 + 降級

<!-- _class: compact -->

**8 大 RAG 坑**：
1. Chunk 切太碎 → 失上下文；切太大 → similarity 不準
2. 沒 re-rank → top-k 中很多 noise
3. 沒 hybrid search → 關鍵字題目掛掉（純 vector 弱項）
4. 權限事後 filter → 可能 0 結果（用戶看不到應有的）
5. 沒 hallucination guardrail → LLM 瞎掰被當真
6. cache 沒 invalidation → 文件更新後仍回舊答案
7. 沒 cost alert → 月底發現燒爆預算
8. 沒 audit log → 無法追「為何給這答案」

<br>

**核心 alert**：
- LLM cost rate（per minute）> 預算 1.5×
- LLM API error rate > 1%（換 fallback）
- Retrieval recall （eval set 自動跑）下降 > 5%
- p95 latency > 5s（前端會 spinner 太久）

**降級**：LLM 全掛 → 退化「純檢索」模式（顯示 top 5 chunks，不生成）

> Source: software_architect/ppt/_source/05_ilities.md
