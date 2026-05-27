---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · Trade-offs'
footer: 'AI 時代系統設計速成 '
---

## C1.6 · 關鍵 Trade-off 表

<span class="kicker">DECISION · 我們選擇與代價</span>

<!-- _class: compact -->

| 決策 | 我們選 | 放棄什麼 | 為何 |
|---|---|---|---|
| 庫存層 | Redis（最終一致 + 對帳） | 強一致即時 | 100K QPS 必須 |
| 排隊削峰 | Kafka 異步 | 用戶即時收訂單號 | 削峰 > 即時 |
| 預約頁 | 必過 | 一段「卡頓」體驗 | 過濾無效流量 |
| Rate limit | per IP + per user | 公司網路共用 IP 被誤殺 | 防黃牛 > 個案 |
| Auto-scale | pre-scale | 多燒 30 分鐘錢 | 開賣不能等擴容 |
| 對帳 | 5min 一次 | 5 分鐘內可能不一致 | 對帳成本 vs 一致即時 |

<br>

<span class="muted">**金句**：秒殺架構的所有「優雅」都是用「對帳成本」買的。</span>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
