---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · Trade-offs'
footer: 'AI 時代系統設計速成 '
---

## C3.6 · 關鍵 Trade-off 表

<!-- _class: compact -->

| 決策 | 我們選 | 放棄什麼 | 為何 |
|---|---|---|---|
| Vector DB | pgvector | Pinecone 自管 ANN | 500K vector 內，省 vendor |
| LLM | Claude + 多備援 | 自架最便宜 | 品質 + 維運成本 |
| Cache | semantic + 3-tier | 全跑 LLM | 60% 命中 = 省 60% 成本 |
| Re-ranker | cross-encoder CPU | GPU | 慢一點但便宜 |
| Permission | SQL JOIN filter | app 層 filter | 100% 正確、簡單 |
| LLM Router | 分層 | 全 Claude | 簡單問題用便宜 LLM |
| Streaming | SSE | WebSocket | 單向夠 |
| 評估 | 自建 eval set + thumb | 用 LLM-as-judge | 對自家文件更準 |

<br>

<span class="muted">**金句**：AI 系統的成本曲線陡—早期省力的選擇，後期全部還回來。</span>

> Source: _source/braindump.md
