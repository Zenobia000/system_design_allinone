---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · Requirements & NFR'
footer: 'AI 時代系統設計速成 '
---

## C3.1 · 需求量化（NFR）

<!-- _class: compact -->

| 業務需求 | NFR 量化 |
|---|---|
| 「快速回答」 | First token P95 < 1s, full response P95 < 5s |
| 「答對」 | Retrieval recall@10 > 90%, thumbs-up rate > 85% |
| 「沒看到的別講」 | Hallucination rate < 5%（grounded in source）|
| 「不能洩密」 | 權限過濾 100% accurate, audit log 完整 |
| 「成本可控」 | Cost/query < $0.01, 月預算 $15K |
| 「新文件即時可查」 | Index lag < 5min |
| 「能溯源」 | 每答案附引用，可點開原文 |

<br>

**容量估算**：
- Vector 數量：500K chunks × 1536 dim × 4 byte = 3 GB
- LLM 呼叫：50K/day × $0.005 = $250/day, $7.5K/month
- 假設 30% cache hit → 真 LLM call = 35K = $5.2K/month
- Embedding（新文件）：每月 10K 新 chunk × $0.0001 = 微小
- Vector DB QPS：200 peak（cache miss）

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §AI
