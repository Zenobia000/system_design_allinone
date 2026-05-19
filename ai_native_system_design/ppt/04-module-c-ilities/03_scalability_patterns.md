---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.3 · Scalability Patterns'
footer: 'AI 時代系統設計速成 '
---

## C.3 · 擴展模式：垂直 vs 水平

<span class="kicker">SCALE · 兩條路</span>

<!-- _class: compact -->

| 模式 | 怎麼做 | 何時用 |
|---|---|---|
| **垂直** | 換更大的機器 | 第 1 階段、CPU/RAM bound |
| **水平** | 加更多機器 | 真正可擴展 |
| **讀寫分離** | 讀去 replica | 讀寫比 > 5:1 |
| **分區** | 單表切多片 | 表 > 100M rows |
| **分片** | 跨庫分布 | 寫吞吐打到 DB 上限 |
| **CDN** | 邊緣節點 | 靜態 / 大檔 |
| **Sharding by feature** | 按功能拆服務 | 團隊 > 30 人 |

<br>

**演進順序**：
垂直 → 加 replica → 加 cache → 加 CDN → 表分區 → 分片 → 微服務

<br>

<span class="muted">**陷阱**：跳過順序 = 用炸彈炸蚊子。垂直擴展能擋多久就多久。</span>

> Source: software_architect/ppt/_source/05_ilities.md · §Scalability
