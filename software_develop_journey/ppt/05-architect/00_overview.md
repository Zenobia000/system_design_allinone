---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Architect'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · OVERVIEW</div>

# Architect
## *結構技師·決定系統未來會不會死*


---


## ROLE · 蓋房子對應

<span class="kicker">METAPHOR ANCHOR</span>

# Architect = 結構技師

<div class="stack">
  <div class="layer client">PM / UX / SA　 企劃、設計動線、定規則</div>
  <div class="layer app"><strong>Architect ← 你在這</strong>　 承重、耐震、防火、未來擴建</div>
  <div class="layer data">SD / DBA　 施工圖、地基與管線</div>
  <div class="layer infra">Dev / QA / DevOps　 工班 / 驗收 / 物業</div>
</div>

<br>

<span class="muted">**一句話**：架構師負責決定「系統未來會不會死」。</span>

> Source: _source/braindump.md · §架構師視角


---


## ROLE · 一天時間分配

# 真實 Architect 一天大概在幹嘛

```
   設計討論 / 白板會議    ████████████  40%
   ADR / 架構文件         ██████        20%
   Code Review / PoC      █████         15%
   跨團隊對齊             ████          12%
   技術選型研究           ███           8%
   救火 / 應急決策        ██            5%
```

<br>

<span class="muted">**反差**：寫 code 比例極少，但每個決策影響整個系統未來 3~5 年。</span>

> Source: _source/braindump.md · §架構師核心工作


---


## ROLE · 為什麼需要這個角色

# 沒有架構師會發生什麼

<div class="highlight">

很多系統不是**功能做不出來**，是**後面根本撐不住**：

流量爆炸 → DB 鎖死 → API timeout → 微服務互炸 → deployment 地獄 → legacy 改不動。

</div>

<br>

<span class="muted">**核心金句**：架構師不是畫圖的人，是**消除系統演進與非功能風險**的人。</span>

> Source: _source/braindump.md · §架構師視角


---


## OBJECTIVES · 學習目標

# 看完 Ch.5 你能回答

<div class="stack">
  <div class="layer client"><strong>① 架構師到底做什麼？</strong>　 為什麼不是只畫架構圖</div>
  <div class="layer app"><strong>② NFR 是什麼？為何比功能重要？</strong>　 撐不住 = 全部歸零</div>
  <div class="layer data"><strong>③ 架構師 vs SA / SD / CTO 差在哪？</strong>　 邊界釐清</div>
  <div class="layer infra"><strong>④ 收到需求架構師會問什麼？</strong>　 不是怎麼做，是為什麼</div>
</div>

> Source: _source/braindump.md · §架構師核心工作


---


<!-- _class: end -->

# Overview 完
## *看完角色，看具體產出。*

<br>

<span class="lead">→ 5.1 Architect 經典產出</span>
