---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.5 · Sync vs Async Comm'
footer: 'AI 時代系統設計速成 '
---

## D.5 · 同步 vs 非同步通訊

<span class="kicker">COMMUNICATION · 兩種模式</span>

<!-- _class: compact -->

| 維度 | 同步（REST/gRPC） | 非同步（Pub/Sub/Stream） |
|---|---|---|
| 回應時效 | 即時 | 延遲毫秒-秒 |
| 耦合 | 緊（caller 等 callee） | 鬆 |
| 失敗影響 | 上游也死 | 訊息暫存 |
| 複雜度 | 低 | 中-高 |
| 適合 | CRUD、查詢、用戶等待 | 通知、ETL、削峰 |

<br>

**決策口訣**：
- 用戶在等的 → 同步（不然要 loading spinner 半天）
- 後台處理的 → 非同步（重試、容錯更好）
- 跨多個下游的 → 非同步（避免雪崩）
- 需要 replay 的 → 非同步（Kafka）

<br>

<span class="muted">**陷阱**：什麼都非同步 → debug 噩夢。混合用，每段路明確選擇。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md · §Async
