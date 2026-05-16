---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · Components & Patterns'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · OVERVIEW</div>

# Components & Patterns
## *和 AI 溝通的高效語言*


---


## OBJECTIVES · 學習目標

看完本章，你能回答：

<div class="stack">
  <div class="layer client"><strong>① 分層架構為何不過時？</strong>　 UI / BL / DAL</div>
  <div class="layer app"><strong>② SOLID + DI 怎麼落地？</strong></div>
  <div class="layer data"><strong>③ GoF 模式選哪幾個必學？</strong></div>
  <div class="layer infra"><strong>④ 為何「模式」是 AI 時代的稀缺技能？</strong></div>
</div>

> Source: `_source/sa_ppt.md` Ch.6 · `SA簡報/S9, S10.pdf` + `Design+Patterns.pdf`


---


## MENTAL MODEL · 模式 = 溝通協議

```
   不會模式的工程師
   ────────────────
   「我們在 service 裡面寫一個 method
    從 DB 撈資料，做一些轉換，
    再呼叫 API 把結果送出去」

   會模式的工程師（架構師）
   ────────────────
   「Repository 撈 → 用 Strategy 轉 → Adapter 出」

   AI 對後者的 prompt 反應準確度高 10×
```

<span class="muted">**Linus 哲學**：模式不是炫技，是讓**未來的你和 AI**讀得懂今天寫的代碼。</span>

> Source: `Design+Patterns.pdf` · §Why Patterns Matter


---


<!-- _class: end -->

# Overview 完
## *先從分層開始。*

<br>

<span class="lead">→ 6.1 Layered Architecture</span>
