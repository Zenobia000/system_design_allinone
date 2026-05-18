---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · DBA'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · OVERVIEW</div>

# DBA
## *資料生命線·不是倉管*


---


## ROLE · 蓋房子對應

<span class="kicker">METAPHOR ANCHOR</span>

# DBA = 地基 + 水塔 + 管線總圖

<div class="stack">
  <div class="layer client">PM / UX / SA　 決定要蓋什麼、規則怎麼跑</div>
  <div class="layer app">Architect / SD　 決定結構、模組、API</div>
  <div class="layer data"><strong>DBA ← 你在這</strong>　 守住地基、水塔、管線總圖</div>
  <div class="layer infra">Dev / QA / DevOps　 工班 / 驗收 / 物業</div>
</div>

<br>

<span class="muted">**一句話**：守住資料正確性、效能、可靠性的最後一道防線。</span>

> Source: _source/braindump.md · §DBA · 資料生命線


---


## ROLE · 為什麼 DBA 不是倉管

<div class="alert">

**最常見誤解**：以為 DBA 就是「幫你建表」「幫你跑備份」。

</div>

倉管：把貨放進去、有人來領、登記一下。
DBA：當訂單湧入、查詢變慢、磁碟掛掉、資料對不上時——**整間公司營運就斷在這**。

<br>

- **資料一旦壞掉，下游全錯**（金額、庫存、稽核）
- **效能一旦塌，產品直接死**（query 一慢 → API timeout → 用戶流失）
- **備份一旦失效，公司可能直接倒**（勒索病毒、誤刪、機房災難）

<br>

<span class="muted">**核心金句**：DBA 不是建表的人，是**守住資料生命線**的人。</span>

> Source: _source/braindump.md · §DBA 守住的是資料生命線


---


## ROLE · 一天時間分配

# 真實 DBA 一天大概在幹嘛

```
   Schema / Index Review     ████████      25%
   慢查詢 / 效能 tuning      ███████       22%
   備份 / 還原演練           █████         15%
   On-call / 救火            █████         15%
   跟 Dev / Architect 對齊   ████          12%
   容量規劃 / 容災演練       ███           8%
   稽核 / 權限 / 合規        █             3%
```

<br>

<span class="muted">**反差**：寫的 SQL 量不一定比 Dev 多，但每一條 SQL 都可能讓整個系統卡住。</span>

> Source: _source/braindump.md · §DBA 介入時機


---


## OBJECTIVES · 學習目標

# 看完 Ch.7 你能回答

<div class="stack">
  <div class="layer client"><strong>① 為什麼 DBA 不是倉管？</strong>　 資料生命線是什麼意思</div>
  <div class="layer app"><strong>② DBA 的 5 個經典產出？</strong>　 ERD / Index / Tx / Backup / Governance</div>
  <div class="layer data"><strong>③ DBA vs Architect vs Dev？</strong>　 誰決定資料歸屬、誰決定怎麼存</div>
  <div class="layer infra"><strong>④ 查詢上線後變慢，誰救？</strong>　 DBA 怎麼介入</div>
</div>

> Source: _source/braindump.md · §DBA · 資料生命線


---


<!-- _class: end -->

# Overview 完
## *看完角色，看具體產出。*

<br>

<span class="lead">→ 7.1 DBA 經典產出</span>
