---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · Requirements & NFR'
footer: 'AI 時代系統設計速成 '
---

## C1.1 · 需求量化（NFR）

<span class="kicker">REQUIREMENTS · 從業務翻技術</span>

<!-- _class: compact -->

| 業務需求 | NFR 量化 |
|---|---|
| 「不超賣」 | 庫存扣減 100% accurate（zero over-sell） |
| 「公平」 | 先到先得，FIFO 排隊 |
| 「快」 | 下單 API P99 < 500ms |
| 「能撐住」 | peak 100K req/s 持續 10 秒 |
| 「不掛」 | 秒殺期間 99.99% availability |
| 「能對帳」 | 訂單與庫存最終一致，可審計 |
| 「不能黃牛」 | 同 user 一單，IP rate limit |

<br>

**容量估算**：
- 峰值 QPS：100K（10 秒，總請求 1M）
- 成功訂單：1000（99.9% req 會失敗，要快速 reject）
- DB write：1000 個訂單 + 1000 庫存扣減 = 2000 寫
- 多數請求只需「立刻拒絕」，不該打到 DB

> Source: software_architect/ppt/_source/02_Requirements_SLA.md
