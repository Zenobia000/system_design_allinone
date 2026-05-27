---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Architect Recap'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · RECAP</div>

# Architect · 回顧
## *三句口訣 · 下一站*


---


## RECAP · 三句口訣

<span class="kicker">MNEMONICS</span>

# 把 Ch.5 收成三句話

<br>

<div class="highlight">

**口訣 1**：架構師掌控**複雜度**——不是畫圖，是**消除不確定性**。

</div>

<div class="highlight">

**口訣 2**：決策不是畫圖，是**選擇代價**——每個 trade-off 都在賭未來。

</div>

<div class="highlight">

**口訣 3**：**向上翻商業、向下翻技術**——把「即時」翻成 SLA / RPS / latency。

</div>

> Source: _source/braindump.md · §三句口訣


---


## RECAP · Architect Cheatsheet 卡

<!-- _class: compact -->

| 維度 | 內容 |
|---|---|
| **蓋房子對應** | 結構技師 |
| **一句話定義** | 決定系統未來會不會死 |
| **降低的不確定性** | 系統演進與非功能風險 |
| **經典產出** | Architecture Diagram / ADR / NFR / Service Boundary / Integration Pattern |
| **主要工具** | C4 Model / Miro / Excalidraw / Lucidchart / Notion |
| **AI 取代不了的** | 邊界判斷 / Trade-off / 業務翻譯 / 政治力 |
| **常見誤解** | 「架構師 = 畫架構圖的人」「架構師 = 資深工程師」 |
| **下一個碰到的角色** | SD（把架構藍圖翻成可施工細部圖） |

> Source: _source/braindump.md · §角色 = 消除不確定性（核心思想）


---


## RECAP · 下一站

# Ch.6：SD · 施工圖繪製師

<div class="note">

Architect 說「Order Service 獨立、跟 Payment 走 event」，
現在問題變成：

- Order Service 裡面切成幾個 module？
- API endpoint 怎麼命名？`/orders` 還是 `/v1/orders`？
- 下單成功的 sequence 怎麼跑？
- Class 結構長什麼樣？

**這些都是 SD 的事**。

</div>

<br>

<span class="muted">**承先啟後**：Architect 給的是城市規劃，SD 把它變成每棟樓的施工圖。</span>

> Source: _source/braindump.md · §SD vs Architect


---


<!-- _class: end -->

# Ch.5 完
## *Architect 講完，看 SD。*

<br>

<span class="lead">→ Ch.6 SD</span>
