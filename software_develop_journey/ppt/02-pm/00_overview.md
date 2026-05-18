---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · PM'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · OVERVIEW</div>

# PM
## *建案企劃·決定要蓋什麼樓、賣給誰*


---


## ROLE · 蓋房子對應

<span class="kicker">METAPHOR ANCHOR</span>

# PM = 建案企劃 / 開發 PM

<div class="stack">
  <div class="layer client"><strong>PM ← 你在這</strong>　 建案企劃——代理甲方做產品決策</div>
  <div class="layer app">UX/UI　 室內設計師——客人怎麼逛才不迷路</div>
  <div class="layer data">SA / Architect / SD　 建築師 / 結構技師 / 施工圖</div>
  <div class="layer infra">Dev / QA / DevOps　 工班 / 驗收 / 物業</div>
</div>

<br>

<span class="muted">**一句話**：把商業問題翻譯成工程團隊能執行的需求。</span>

> Source: _source/braindump.md · §PM 視角


---


## CLARIFY · PM ≠ 甲方

<span class="kicker">COMMON MISCONCEPTION</span>

# PM 不是甲方·是甲方的代理人

<br>

<div class="alert">

**新手最常搞混**：以為 PM = 客戶 / 業務 / 老闆。
**真相**：那些是**真正的甲方**——在團隊外面。
PM 是**團隊內的建案企劃**，代理甲方做產品決策。

</div>

```
   業務 / 客戶 / 老闆（真甲方）── 「我想賺錢 / 解決 X 問題」
              │
              ▼
   PM（建案企劃 · 你）─── 「給誰、做什麼、KPI、優先級」
              │
              ▼
   UX / SA / Architect ...（執行團隊）
```

<span class="muted">**對應建築業**：甲方說「我要在這蓋一棟賺錢的樓」，建案企劃決定「蓋給年輕家庭的 30 坪三房」。</span>

> Source: _source/braindump.md · §PM 為何不只是「開會的人」


---


## ROLE · 一天時間分配

# 真實 PM 一天大概在幹嘛

```
   開會 / 同步           ████████████  40%
   寫 PRD / 規格         ██████        20%
   訪談用戶 / 看數據     █████         15%
   優先級排序            ████          12%
   跟業務 / 老闆談       ███           8%
   思考 / 競品研究       ██            5%
```

<br>

<span class="muted">**反差**：完全不寫 code，但寫的文件 / 開的會直接決定整個團隊往哪走。</span>

> Source: _source/braindump.md · §PM 工作流程


---


## OBJECTIVES · 學習目標

# 看完 Ch.2 你能回答

<div class="stack">
  <div class="layer client"><strong>① PM 到底做什麼？</strong>　 真的是「需求壓縮器」嗎？</div>
  <div class="layer app"><strong>② 客戶說的為什麼不是真需求？</strong>　 「我要做 AI」背後是什麼</div>
  <div class="layer data"><strong>③ PM 的經典產出有哪些？</strong>　 PRD / User Flow / Backlog</div>
  <div class="layer infra"><strong>④ PM vs BA / PO / 老闆 怎麼分？</strong>　 邊界在哪</div>
</div>

> Source: _source/braindump.md · §PM 最重要的能力


---


<!-- _class: end -->

# Overview 完
## *看完角色，看具體產出。*

<br>

<span class="lead">→ 2.1 PM 經典產出</span>
