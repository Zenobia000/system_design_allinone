---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.2 · Distributed Five Pillars'
footer: 'AI 時代系統設計速成 '
---

## C.2 · 分散式系統五大支柱

<span class="kicker">FOUNDATION · 缺一不可</span>

<!-- _class: compact -->

| 支柱 | 為何重要 | 反 pattern |
|---|---|---|
| **1 · 鬆散耦合** | 模組獨立部署 / 故障隔離 | 共享資料庫、同步呼叫一堆 |
| **2 · 無狀態服務** | 任意擴 / 重啟不痛 | session 存 server local |
| **3 · 快取分層** | 抗讀放大 / 降延遲 | 直接打 DB |
| **4 · 非同步通訊** | 削峰 / 容錯 | 全同步呼叫 |
| **5 · 監控可觀測** | 出事能定位 | 只看 log，沒 trace |

<br>

**口訣**：**鬆 · 無 · 快 · 非 · 觀**

<br>

<span class="muted">**金句**：分散式系統不是「把單機放網路上」—是另一套設計哲學。</span>

> Source: software_architect/ppt/_source/07_System_Architecture.md
