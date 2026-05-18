---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · SD'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · OVERVIEW</div>

# SD
## *施工圖繪製師·把藍圖翻成可開發模組*


---


## ROLE · 蓋房子對應

<span class="kicker">METAPHOR ANCHOR</span>

# SD = 施工圖繪製師

<div class="stack">
  <div class="layer client">PM / UX / SA　 企劃、設計、規則</div>
  <div class="layer app">Architect　 結構技師、城市規劃</div>
  <div class="layer data"><strong>SD ← 你在這</strong>　 把建築圖拆成可施工的細部圖</div>
  <div class="layer infra">DBA / Dev / QA / DevOps　 地基 / 工班 / 驗收 / 物業</div>
</div>

<br>

<span class="muted">**一句話**：把架構藍圖翻成可開發的模組與 API，讓工程師拿著就能開工。</span>

> Source: _source/braindump.md · §SD · System Design


---


## ROLE · 一天時間分配

# 真實 SD 一天大概在幹嘛

```
   寫 Design Doc          ████████████  40%
   畫 Sequence / Class    ███████       22%
   API Spec / OpenAPI     ██████        18%
   跟 Dev / Architect 對齊 ████          12%
   Review 既有設計        ███           8%
```

<br>

<span class="muted">**反差**：SD 寫的文件不是給管理層看，是給**Dev 看完不用再問問題**。</span>

> Source: _source/braindump.md · §SD 經典產出


---


## ROLE · 為什麼需要這個角色

# 沒有 SD 會發生什麼

<div class="highlight">

Architect 說：「Order Service 獨立、跟 Payment 走 event。」

Dev 拿到這句話**根本沒辦法開工**——
endpoint 叫什麼？欄位有哪些？失敗怎麼處理？三個 Dev 寫出三套不一樣的 API。

**SD 就是補上這層細節**，讓系統可以「同步開工不撞車」。

</div>

<br>

<span class="muted">**核心金句**：SD 是**架構與代碼的橋**，沒有它就是各寫各的。</span>

> Source: _source/braindump.md · §SD vs Architect


---


## OBJECTIVES · 學習目標

# 看完 Ch.6 你能回答

<div class="stack">
  <div class="layer client"><strong>① SD 到底做什麼？</strong>　 跟架構師、Dev 差在哪</div>
  <div class="layer app"><strong>② OpenAPI / Sequence 為何重要？</strong>　 多人協作的契約</div>
  <div class="layer data"><strong>③ SD vs Architect vs Dev 邊界？</strong>　 誰主導命名 / sequence / class</div>
  <div class="layer infra"><strong>④ 一個服務怎麼從藍圖拆到 API？</strong>　 Order Service 實例</div>
</div>

> Source: _source/braindump.md · §SD 經典產出


---


<!-- _class: end -->

# Overview 完
## *看完角色，看具體產出。*

<br>

<span class="lead">→ 6.1 SD 經典產出</span>
