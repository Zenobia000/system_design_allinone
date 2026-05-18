---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.8 · Developer'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 08 · OVERVIEW</div>

# Developer
## *工班師傅·真的把樓蓋起來*


---


## ROLE · 蓋房子對應

<span class="kicker">METAPHOR ANCHOR</span>

# Dev = 工班師傅

<div class="stack">
  <div class="layer client">PM / UX / SA　 決定要蓋什麼、規則怎麼跑</div>
  <div class="layer app">Architect / SD / DBA　 結構、施工圖、地基管線</div>
  <div class="layer data"><strong>Dev ← 你在這</strong>　 拿著圖把樓真的蓋起來</div>
  <div class="layer infra">QA / DevOps　 驗收 / 物業</div>
</div>

<br>

<span class="muted">**一句話**：把設計藍圖變成可運行的代碼——不是工人，是專業工班師傅。</span>

> Source: _source/braindump.md · §Developer 視角


---


## ROLE · FE / BE 都是 Dev

<div class="alert">

**常見誤解**：以為「前端 / 後端是兩種職業」。其實兩個都是 **Dev**——只是負責的樓層不同。

</div>

- **前端 Dev**：執行 UX/UI 給的樣品屋——畫面、互動、表單、狀態管理
- **後端 Dev**：執行 Architect/SD 給的結構——API、業務邏輯、資料存取
- **行動 Dev**：iOS / Android / RN / Flutter——前端的延伸但平台特性更重
- **資料 Dev**：ETL / Pipeline / 報表——後端的延伸但側重批次與大資料

<br>

<span class="muted">**核心**：Dev 是一個**職能光譜**，不是兩個對立工種。看的是「離使用者多近 vs 離資料多近」。</span>

> Source: _source/braindump.md · §開發流程（以前）


---


## ROLE · 一天時間分配

# 真實 Dev 一天大概在幹嘛

```
   寫 code / debug          ████████████  40%
   開會 / standup           ████          12%
   Code Review              ████          12%
   寫 / 跑測試              ████          12%
   讀 spec / 問 SD          ███           10%
   研究技術 / 試 PoC        ███           8%
   雜事（環境、CI 修壞）    ██            6%
```

<br>

<span class="muted">**反差**：純粹寫新 code 的時間其實沒想像中多，**debug + 讀別人的 code** 才是大宗。</span>

> Source: _source/braindump.md · §開發流程（以前）


---


## OBJECTIVES · 學習目標

# 看完 Ch.8 你能回答

<div class="stack">
  <div class="layer client"><strong>① Dev 是工人還是師傅？</strong>　 專業在哪、價值在哪</div>
  <div class="layer app"><strong>② Dev 的 5 個經典產出？</strong>　 不只是 code，還有什麼</div>
  <div class="layer data"><strong>③ FE / BE / SD / QA 邊界？</strong>　 誰主導命名、測試、切分</div>
  <div class="layer infra"><strong>④ AI 寫了 80% code，Dev 還做什麼？</strong>　 判斷的價值</div>
</div>

> Source: _source/braindump.md · §AI 時代的本質沒變


---


<!-- _class: end -->

# Overview 完
## *看完角色，看具體產出。*

<br>

<span class="lead">→ 8.1 Dev 經典產出</span>
