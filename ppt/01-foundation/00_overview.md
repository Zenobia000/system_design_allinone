---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.1 · Foundation Layer'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 01 · OVERVIEW</div>

# Foundation Layer
## *四件事，所有系統的地基*

<!--
開場 30 秒：
- 強調「物理常數」的概念：網路、CPU、磁碟有不可逾越的速度上限
- 為何要先學 Foundation：所有後續章節（Sharding、CAP、CDN）都奠基在此
- 講者語氣：穩、不急
-->

---

## OBJECTIVES · 學習目標

看完本章，你能回答：

<div class="stack">
  <div class="layer client"><strong>① 為何網路是分散式系統的底線？</strong>　 延遲與頻寬如何決定架構</div>
  <div class="layer app"><strong>② Client-Server vs P2P，為何前者統治產業？</strong></div>
  <div class="layer data"><strong>③ 系統怎麼從 1 台撐到 1000 台？</strong>　 Vertical / Horizontal / Hybrid</div>
  <div class="layer infra"><strong>④ API 設計有哪些隱性決策？</strong>　 REST / RPC / GraphQL / gRPC</div>
</div>

> Source: 基本觀念/01,02,04,05.pdf

---

## MENTAL MODEL · Foundation 的四層責任

```
┌──────────────────────────────────────────────────┐
│  CLIENT          手機 / 瀏覽器 / IoT             │  ← Ch.1.2
├──────────────────────────────────────────────────┤
│  NETWORK         TCP/IP · DNS · TLS · HTTP/3     │  ← Ch.1.1
├──────────────────────────────────────────────────┤
│  SERVER          API · 商業邏輯 · 認證           │  ← Ch.1.4
├──────────────────────────────────────────────────┤
│  STORAGE         (Ch.2 開始深談)                 │
└──────────────────────────────────────────────────┘
            scale-up vs scale-out · Ch.1.3
```

<span class="muted">這四層責任清楚分離，是「分散式系統可以演化」的前提。</span>

> Source: 整理自 基本觀念/01 + 02

---

<!-- _class: end -->

# Overview 完
## *先看物理底線——進入 Networking。*

<br>

<span class="lead">→ 1.1 Networking</span>
