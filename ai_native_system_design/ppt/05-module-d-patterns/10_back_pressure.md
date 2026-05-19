---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.10 · Back-pressure'
footer: 'AI 時代系統設計速成 '
---

## D.10 · 反壓（Back-pressure）

<span class="kicker">FLOW CONTROL · 慢的影響快的</span>

# 下游慢了，上游要會「停」

<!-- _class: compact -->

**沒反壓的後果**：
- buffer 爆炸 → OOM
- 訊息延遲累積 → 系統雪崩
- consumer lag 越來越大 → 永遠追不上

<br>

**反壓四招**：

| 招式 | 用法 | 範例 |
|---|---|---|
| **拒絕**（reject） | 429 Too Many | rate limiter |
| **丟棄**（drop） | 丟舊保新 / 丟新保舊 | log 系統 |
| **緩衝**（buffer） | 暫存有上限 | Kafka 有 retention |
| **減速**（throttle） | 上游放慢 | consumer credit |

<br>

**判斷**：用戶可重試的 → reject；用戶看不到的內部 → buffer + alert。

<br>

<span class="muted">**金句**：「沒反壓」=「下游沒事的時候系統好棒，下游一慢全部炸」。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md · §Back-pressure
