---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.4 · SA'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 04 · OVERVIEW</div>

# SA
## *建築師·把需求翻成系統規格*


---


## ROLE · 蓋房子對應

<span class="kicker">METAPHOR ANCHOR</span>

# SA = 建築師（平面圖）

<div class="stack">
  <div class="layer client">PM　 建案企劃——決定要蓋什麼</div>
  <div class="layer app">UX / UI　 室內設計師——動線與樣品屋</div>
  <div class="layer data"><strong>SA ← 你在這</strong>　 建築師——跟業務 / PM 對齊機能、畫平面圖</div>
  <div class="layer infra">Architect / SD / Dev / QA / DevOps　 結構技師 / 施工圖 / 工班</div>
</div>

<br>

<span class="muted">**一句話**：把業務需求翻譯成系統規格——補規則、補例外、補狀態。</span>

> Source: _source/braindump.md · §SA · System Analyst


---


## ROLE · 一天時間分配

# 真實 SA 一天大概在幹嘛

```
   寫規格 / 畫流程        ████████████   35%
   跟 PM / 業務確認需求    ███████        20%
   跟 Architect / Dev 對齊  ██████         18%
   研究現況系統 / 資料      █████          15%
   畫狀態圖 / 權限矩陣      ████           10%
   補例外情境              ██              5%
```

<br>

<span class="muted">**反差**：SA 不寫 code，但寫的規格決定 Dev 要寫的每一個 if/else。</span>

> Source: _source/braindump.md · §SA 經典產出


---


## OBJECTIVES · 學習目標

# 看完 Ch.4 你能回答

<div class="stack">
  <div class="layer client"><strong>① SA 到底做什麼？</strong>　 為什麼「補規則的縫隙」是核心</div>
  <div class="layer app"><strong>② 經典產出有哪些？</strong>　 Use Case / State / Rule / Exception</div>
  <div class="layer data"><strong>③ SA vs Architect 差在哪？</strong>　 規則 vs 結構，功能 vs 撐住</div>
  <div class="layer infra"><strong>④ SA vs PM 差在哪？</strong>　 What 跟 How system behaves</div>
</div>

> Source: _source/braindump.md · §SA vs Architect


---


<!-- _class: end -->

# Overview 完
## *看完角色，看具體產出。*

<br>

<span class="lead">→ 4.1 SA 經典產出</span>
