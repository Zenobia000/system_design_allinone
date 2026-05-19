---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.1 · *-ilities Map'
footer: 'AI 時代系統設計速成 '
---

## C.1 · 10 大 *-ilities 全景

<span class="kicker">QUALITY · 系統好不好的維度</span>

<!-- _class: compact -->

| -ility | 量測 | 衝突誰 |
|---|---|---|
| Scalability | scale-out factor, time | ↔ Simplicity |
| Availability | uptime % | ↔ Cost |
| Reliability | MTBF, MTTR | ↔ Velocity |
| Performance | latency P99 | ↔ Cost, Consistency |
| Security | attack surface | ↔ Usability |
| Maintainability | onboarding 時間 | ↔ Performance |
| Observability | coverage % | ↔ Storage cost |
| Portability | vendor lock-in | ↔ Optimization |
| Testability | test coverage | ↔ Velocity (短期) |
| Cost-efficiency | $ / unit | ↔ Reliability |

<br>

<span class="muted">**判斷力**：選 2-3 個對你最重要的 -ility，其他犧牲。全要 = 全失。</span>

> Source: software_architect/ppt/_source/05_ilities.md
