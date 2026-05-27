---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.4 · Cache Topology'
footer: 'AI 時代系統設計速成 '
---

## C.4 · 快取拓樸與失效策略

<span class="kicker">CACHE PATTERNS · 4 種</span>

<!-- _class: compact -->

| 策略 | 讀 | 寫 | 何時用 |
|---|---|---|---|
| **Cache-aside** | miss → load → set | 寫 DB + invalidate cache | 預設 |
| **Read-through** | cache 內建 load | 寫 DB + invalidate | 想簡化讀邏輯 |
| **Write-through** | 同 above | 同步寫 cache + DB | 要強一致 |
| **Write-behind** | 同 above | 寫 cache → 非同步寫 DB | 高寫吞吐、容掉 |

<br>

**失效策略**：

```
TTL（最簡）→ 過期再 fetch
TTL + jitter → 防 cache stampede
Event-based → 寫 DB 時 publish invalidate
Versioned key → 改版號自然失效，不用刪
```

<br>

<span class="muted">**陷阱**：「快取雪崩」「快取穿透」「快取擊穿」三兄弟—設計時要明確處理哪個。</span>

> Source: software_architect/ppt/_source/05_ilities.md · §Cache
