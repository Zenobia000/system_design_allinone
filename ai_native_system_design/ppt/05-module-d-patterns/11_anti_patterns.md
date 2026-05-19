---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.11 · Anti-Patterns'
footer: 'AI 時代系統設計速成 '
---

## D.11 · 7 大反 pattern · 別踩

<!-- _class: compact -->

| 反 pattern | 為何坑 | 替代方案 |
|---|---|---|
| Distributed Monolith | 拆服務但共用 DB / 必須一起 deploy | 真正解耦 or 合回單體 |
| God Service | 一個服務做所有事 | 按子域拆 |
| Chatty Microservices | 一個 request 跨 10 個服務 | 合服務 / BFF / GraphQL |
| Shared Database | 多服務寫同 DB | 各自 DB + event |
| Synchronous Chain | A→B→C→D 全同步 | 引入 event/queue |
| Premature Sharding | 100k rows 就分片 | 先 vertical scale |
| Over-engineering | 為「未來」加複雜度 | YAGNI |

<br>

<span class="muted">**金句**：架構優雅 ≠ 工程價值。多數系統需要的是「無聊但可運維」。</span>

> Source: software_architect/ppt/_source/08_Advanced_Patterns.md · §Anti-Patterns
