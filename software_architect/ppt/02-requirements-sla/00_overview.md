---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · Requirements & SLA'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · OVERVIEW</div>

# Requirements & SLA
## *把「很快」翻譯成「P99 < 100ms」*


---


## OBJECTIVES · 學習目標

看完本章，你能回答：

<div class="stack">
  <div class="layer client"><strong>① 怎麼挖出客戶沒講的隱性需求？</strong></div>
  <div class="layer app"><strong>② 99.99% 到底意味著什麼？</strong>　 SLA 數學</div>
  <div class="layer data"><strong>③ 吞吐量 vs 負載差在哪？</strong>　 為黑五設計</div>
  <div class="layer infra"><strong>④ 哪些 NFR 必須在 Day 1 就量化？</strong></div>
</div>

> Source: `_source/sa_ppt.md` Ch.2 · `SA簡報/S3, S5.pdf`


---


## MENTAL MODEL · 需求的兩層

```
┌─────────────────────────────────────────────┐
│  FUNCTIONAL      系統做什麼                 │  (顯性，PM 會講)
│                  user stories · features    │
├─────────────────────────────────────────────┤
│  NON-FUNCTIONAL  系統承受什麼               │  (隱性，要逼問)
│                  load · latency · uptime    │
│                  scale · cost · security    │
└─────────────────────────────────────────────┘
   架構失敗 90% 出在「下層沒挖清楚」
```

<span class="muted">**Linus 哲學**：壞代碼是 bug，壞架構是「沒問 NFR 就先動工」。</span>

> Source: `S5_Slides.pdf` · §需求兩層模型


---


<!-- _class: end -->

# Overview 完
## *先學怎麼挖出隱性需求。*

<br>

<span class="lead">→ 2.1 Implicit Requirements</span>
