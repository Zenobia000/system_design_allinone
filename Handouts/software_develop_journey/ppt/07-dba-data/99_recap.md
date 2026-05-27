---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · DBA Recap'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · RECAP</div>

# DBA · 回顧
## *三句口訣 · 下一站*


---


## RECAP · 三句口訣

<span class="kicker">MNEMONICS</span>

# 把 Ch.7 收成三句話

<br>

<div class="highlight">

**口訣 1**：DBA 不只是建表，是**守住資料生命線**。

</div>

<div class="highlight">

**口訣 2**：Schema 不是技術問題，是**業務問題**——欄位怎麼切，影響的是金錢與稽核。

</div>

<div class="highlight">

**口訣 3**：備份不是有就好，是**還原得回來才算**。

</div>

> Source: _source/braindump.md · §三句口訣


---


## RECAP · DBA Cheatsheet 卡

<!-- _class: compact -->

| 維度 | 內容 |
|---|---|
| **蓋房子對應** | 地基 + 水塔 + 管線總圖 |
| **一句話定義** | 守住資料正確性、效能、可靠性 |
| **降低的不確定性** | 資料正確性、效能、可靠性風險 |
| **經典產出** | ERD / Schema+Index / Tx 策略 / Backup / Governance |
| **主要工具** | dbdiagram / pt-query-digest / pgBadger / Liquibase |
| **AI 取代不了的** | 業務 context / 效能直覺 / 災難判斷 |
| **常見誤解** | 「DBA = 倉管」「DBA = 跑備份的」「DBA = CREATE TABLE 的人」 |
| **下一個碰到的角色** | Dev（把 schema 變成可運行的 code） |

> Source: _source/braindump.md · §DBA · 資料生命線


---


## RECAP · 下一站

# Ch.8：Dev · 工班師傅

<div class="note">

DBA 給了 schema、index、transaction 策略，現在問題變成：

- 怎麼把 schema 翻成 ORM model？
- Service / Repository 怎麼切？
- 怎麼寫 unit test？
- query 怎麼放才能命中索引？

**這些都是 Dev 的事**。

</div>

<br>

<span class="muted">**承先啟後**：DBA 給的是資料的家，Dev 把所有業務邏輯真的長在這個家裡。</span>

> Source: _source/braindump.md · §Developer 視角


---


<!-- _class: end -->

# Ch.7 完
## *DBA 講完，看 Dev。*

<br>

<span class="lead">→ Ch.8 Developer</span>
