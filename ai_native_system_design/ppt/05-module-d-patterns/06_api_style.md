---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.6 · API Style'
footer: 'AI 時代系統設計速成 '
---

## D.6 · API 四選一

<span class="kicker">API · 怎麼設介面</span>

<!-- _class: compact -->

| 風格 | 強項 | 弱項 | 殺手場景 |
|---|---|---|---|
| **REST** | 通用、cacheable、生態好 | 過/欠取資料、版本痛 | 公開 API、CRUD |
| **gRPC** | 高效、強型別、stream | 瀏覽器不直接、debug 麻煩 | 內部服務間 |
| **GraphQL** | 客戶端選欄位、聚合 | 後端複雜、cache 難 | BFF、行動端 |
| **WebSocket** | 雙向即時 | 連線管理、scale 難 | 聊天、直播、即時通知 |

<br>

**判斷流程**：
```
公開給第三方 + 簡單 CRUD？  → REST
高 QPS 內部呼叫？           → gRPC
前端要靈活取多種資料？      → GraphQL
需要 server 主動推？         → WebSocket
```

<br>

<span class="muted">**金句**：API 風格是「組合的」，不是「二選一」—大專案常 3 種都用。</span>

> Source: software_architect/ppt/_source/06_Components_Patterns.md · §API
