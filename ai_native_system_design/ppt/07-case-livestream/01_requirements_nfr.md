---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · Requirements & NFR'
footer: 'AI 時代系統設計速成 '
---

## C2.1 · 需求量化（NFR）

<!-- _class: compact -->

| 業務需求 | NFR 量化 |
|---|---|
| 「即時推送」 | E2E delay P99 < 1s, P50 < 200ms |
| 「不掉訊息」（聊天） | 99.99% delivered, at-least-once |
| 「禮物精準」 | 100% delivered, idempotent |
| 「不卡頓」 | WebSocket connection stable, 重連 < 3s |
| 「fanout 撐得住」 | 單房 100K 連線, 推送 lag < 500ms |
| 「成本可控」 | 每連線 < $0.001/天 |
| 「審查」 | 違規訊息 1s 內過濾 |

<br>

**容量估算**：
- 連線總數：1M concurrent WebSocket
- 訊息產生：50K msg/s（聊天 + 禮物）
- Fanout 倍率：平均 100×，峰值單房 100K
- 推送總量：5M msg/s（向觀眾推）
- 單連線 idle 流量：~100 byte/s（心跳）

> Source: software_architect/ppt/_source/02_Requirements_SLA.md
