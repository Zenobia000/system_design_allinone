---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.4 · SA Recap'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 04 · RECAP</div>

# SA · 回顧
## *三句口訣 · 下一站*


---


## RECAP · 三句口訣

<span class="kicker">MNEMONICS</span>

# 把 Ch.4 收成三句話

<br>

<div class="highlight">

**口訣 1**：**SA 在補規則的縫隙**——PM 給箭頭，SA 給箭頭旁邊的條件。

</div>

<div class="highlight">

**口訣 2**：**SA 管系統怎麼跑、Architect 管系統怎麼活**——功能 vs 撐住。

</div>

<div class="highlight">

**口訣 3**：**Use Case 是 SA 的靈魂**——其他產出都是把它拆細的副產物。

</div>

> Source: _source/braindump.md · §SA vs Architect


---


## RECAP · SA Cheatsheet 卡

<!-- _class: compact -->

| 維度 | 內容 |
|---|---|
| **蓋房子對應** | 建築師（平面圖） |
| **一句話定義** | 把業務需求翻譯成系統規格 |
| **降低的不確定性** | 業務規則不確定性 |
| **經典產出** | Use Case / State / Rule / Data Dict / Permission / Exception |
| **主要工具** | Confluence / Visio / draw.io / PlantUML / Mermaid |
| **AI 取代不了的** | 領域知識 / 邊界情境 / 跨部門協調 |
| **常見誤解** | 「SA = 寫文件的」「SA 跟 PM 一樣」「SA = Architect」 |
| **下一個碰到的角色** | Architect（決定系統怎麼撐住） |

> Source: _source/braindump.md · §角色 = 消除不確定性（核心思想）


---


## RECAP · 下一站

# Ch.5：Architect · 結構技師

<div class="note">

SA 寫完「30 分鐘未付款自動取消」規則，現在問題變成：

- 訂單量百萬級時，這 30 分鐘掃描怎麼做才不會卡死？
- 服務要拆嗎？訂單跟付款分開好還是合一好？
- 高峰一秒一千單，系統撐得住嗎？
- 萬一付款服務掛了，訂單還能進嗎？

**這些都是 Architect 的事**。

</div>

<br>

<span class="muted">**承先啟後**：SA 給「系統應該做什麼」，Architect 給「系統應該怎麼活下去」。</span>

> Source: _source/braindump.md · §架構師視角


---


<!-- _class: end -->

# Ch.4 完
## *SA 講完，看 Architect。*

<br>

<span class="lead">→ Ch.5 Architect</span>
