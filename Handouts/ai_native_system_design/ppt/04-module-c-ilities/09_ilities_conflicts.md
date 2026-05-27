---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.9 · *-ilities Conflicts'
footer: 'AI 時代系統設計速成 '
---

## C.9 · *-ilities 兩兩衝突表

<span class="kicker">TRADEOFF · 沒有萬能解</span>

<!-- _class: compact -->

| 衝突 | 範例 | 怎麼平衡 |
|---|---|---|
| Performance ↔ Consistency | 強一致變慢 | 用 Read-your-writes 中間值 |
| Availability ↔ Consistency | CAP | 看業務性質選 |
| Scalability ↔ Simplicity | 分散式變複雜 | 量到了再做 |
| Security ↔ Usability | MFA 用戶煩 | 高風險動作才 MFA |
| Observability ↔ Cost | 全 trace 貴 | 取樣 + 高 P99 強制保留 |
| Velocity ↔ Reliability | 快速發版漏 bug | feature flag + canary |
| Portability ↔ Performance | 抽象掉雲端就慢 | 80/20 法則 |

<br>

<span class="muted">**金句**：架構就是「明知有 trade-off，還是選了一邊」的紀錄。</span>

> Source: software_architect/ppt/_source/05_ilities.md
