---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · Trade-offs'
footer: 'AI 時代系統設計速成 '
---

## C2.6 · 關鍵 Trade-off 表

<!-- _class: compact -->

| 決策 | 我們選 | 放棄什麼 | 為何 |
|---|---|---|---|
| 推送協定 | WebSocket | HTTP polling 簡單 | 1M 連線 polling 不可行 |
| 訊息丟棄 | 高峰隨機丟聊天 | 100% 訊息到達 | 用戶感知差別 = 0 |
| 連線分片 | by room hash | 完全均衡 | 同房需同機 |
| 禮物推送 | 強一致 + 對帳 | 即時 fanout | 涉及錢 |
| 跨 region 房間 | 接受 200ms 延遲 | 全球無感 | 跨洋光速限制 |
| 持久化 | Cassandra | PostgreSQL | 寫吞吐 + 時序分區 |
| 監控自訂 metric | 投入 SRE 2 人月 | 用通用工具 | 連線/lag 指標太特殊 |

<br>

<span class="muted">**金句**：即時系統的精髓 = 「哪些可丟、哪些絕不能丟」要先想清楚。</span>

> Source: _source/braindump.md
