---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.11 · Collaboration'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 11 · OVERVIEW</div>

# Collaboration
## *9 角色怎麼一起跑·誰跟誰打架*


---


## OBJECTIVES · 學習目標

看完本章，你能回答：

<div class="stack">
  <div class="layer client"><strong>① 上下游關係長怎樣？</strong>　 從 PM 到 DevOps 的責任鏈</div>
  <div class="layer app"><strong>② 誰主導什麼決策？</strong>　 Overlap matrix——同一件事多個角色都碰</div>
  <div class="layer data"><strong>③ 三層 Flow 翻譯</strong>　 User Flow / System Flow / Architecture Flow</div>
  <div class="layer infra"><strong>④ 大家為什麼會打架？</strong>　 3 個真實衝突場景 + 怎麼解</div>
</div>

> Source: _source/braindump.md · §責任鏈


---


## MENTAL MODEL · 不是線性，是網狀

```
   PM ─────► UX ─────► SA ─────► Architect
    ▲        ▲          ▲           │
    │        │          └───────────┤  ← 回饋
    │        └────────────回饋──────┤
    └──────────────────回饋─────────┘

   ↓ 往下：SD → DBA → Dev → QA → DevOps
   ↑ 但每一層都會打回上一層問問題
```

<span class="muted">**核心**：好的協作不是「一條線跑完」，是「每個交棒都會被質疑、被修正」。</span>

> Source: _source/braindump.md · §三層 flow 翻譯


---


<!-- _class: end -->

# Overview 完
## *看完地圖，從上下游交棒開始。*

<br>

<span class="lead">→ 11.1 Handoff Chain</span>
