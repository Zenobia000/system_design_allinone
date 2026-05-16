---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.8 · Advanced Patterns'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 08 · OVERVIEW</div>

# Advanced Patterns
## *Only use when relevant—* 三個高成本高回報的模式


---


## OBJECTIVES · 學習目標

看完本章，你能回答：

<div class="stack">
  <div class="layer client"><strong>① Microservices 何時值得？</strong>　 何時是災難？</div>
  <div class="layer app"><strong>② Event Sourcing 解什麼？</strong>　 帶來什麼新麻煩？</div>
  <div class="layer data"><strong>③ CQRS 何時開始發揮價值？</strong></div>
  <div class="layer infra"><strong>④ 三個模式可以混用嗎？</strong></div>
</div>

> Source: `_source/sa_ppt.md` Ch.8 · `MicroServicesReading.pdf` · `EventSourcingReading.pdf` · `CQRSReading.pdf`


---


## MENTAL MODEL · 進階 ≠ 預設

```
   80% 系統：           單體 + 經典 3 層
   ──────────────────────────────
   15% 系統：           單體模組化 + 部分事件驅動
   ──────────────────────────────
   5% 系統：            微服務 + Event Sourcing + CQRS
   ──────────────────────────────

   這 5% 是「面試會考、但你工作不一定遇到」的部分
   架構師的功課：知道什麼時候**不要**用它們
```

<span class="muted">**Linus 哲學**：進階模式是「沒它就解不了的問題」的解法——沒問題就別主動引入。</span>

> Source: `MicroServicesReading.pdf` · §When Not to


---


<!-- _class: end -->

# Overview 完
## *先談微服務。*

<br>

<span class="lead">→ 8.1 Microservices</span>
