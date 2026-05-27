---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.5 · Reliability Patterns'
footer: 'AI 時代系統設計速成 '
---

## C.5 · 可靠性模式 5 件套

<span class="kicker">RESILIENCE · 防雪崩</span>

<!-- _class: compact -->

| 模式 | 解決什麼 | 範例配置 |
|---|---|---|
| **Timeout** | 慢呼叫拖死自己 | 上游 3s / 下游 500ms |
| **Retry** | 暫時性失敗 | 3 次 + 指數退避 + jitter |
| **Circuit Breaker** | 下游死了還繼續打 | 50% 錯誤率 → open 30s |
| **Bulkhead** | 一個壞拖死全部 | thread pool 分隔 / connection pool 分配 |
| **Rate Limiter** | 上游過熱 | token bucket, 1000 RPS/user |

<br>

**配合金句**：
- **Timeout 必設**：沒設 timeout 的呼叫是定時炸彈
- **Retry 必加 jitter**：不然 retry 風暴
- **Circuit Breaker 要監控**：開了你要知道
- **Bulkhead 是隔離艙**：船破一個艙不沉

<br>

<span class="muted">**金句**：可靠性不是「不會壞」，是「壞了不雪崩」。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md · §Resilience
