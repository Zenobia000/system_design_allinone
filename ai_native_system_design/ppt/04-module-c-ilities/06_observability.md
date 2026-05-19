---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.6 · Observability'
footer: 'AI 時代系統設計速成 '
---

## C.6 · 可觀測性三本柱

<span class="kicker">OBSERVABILITY · MLT</span>

<!-- _class: compact -->

| 維度 | 答什麼問題 | 工具 |
|---|---|---|
| **Metrics** | 系統現在怎樣？（聚合） | Prometheus, Datadog |
| **Logs** | 這個 request 發生什麼？（明細） | Loki, ELK, CloudWatch |
| **Traces** | request 跨服務的耗時分佈？ | Jaeger, Tempo, OpenTelemetry |

<br>

**SLO → SLI → Alert 鏈**：

```
SLO: P99 < 200ms (90% 時間達成)
↓
SLI: 過去 5min 的 P99
↓
Alert: 連續 5min SLI > 200ms 且 error budget < 30% → page
```

<br>

**設計原則**：
- Metrics 用於告警（便宜、即時）
- Traces 用於定位（出事時拉細節）
- Logs 用於審計（出事後重建）

<br>

<span class="muted">**金句**：你不能改善看不見的東西—觀測是設計的一部分，不是事後補。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md · §Observability
