---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.11 · Distributed Traps'
footer: 'AI 時代系統設計速成 '
---

## C.11 · 分散式 8 大謬誤

<span class="kicker">FALLACIES · 都別假設</span>

<!-- _class: compact -->

| # | 謬誤 | 真相 |
|---|---|---|
| 1 | 網路可靠 | 會丟、會 partition |
| 2 | 延遲為零 | 跨 region > 100ms |
| 3 | 頻寬無限 | 影片串流會打死 |
| 4 | 網路安全 | 必須 zero-trust |
| 5 | 拓樸不變 | LB 重啟、scale 隨時 |
| 6 | 一個管理員 | 跨團隊 / 跨公司 |
| 7 | 傳輸成本零 | 跨 region 流量很貴 |
| 8 | 網路均質 | 不同 region 性能差很多 |

<br>

<span class="muted">**金句**：分散式系統 90% 的 bug 是「以為網路會跟單機一樣可靠」。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md · §Fallacies
