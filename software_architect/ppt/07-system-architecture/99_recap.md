---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · Recap'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · RECAP</div>

# System Architecture 收斂
## *拍賣 App 的分散式設計藍圖*


---


## CASE · 拍賣系統 100k DAU 架構

```
   ┌─────────┐   ┌─────────┐
   │ Mobile  │   │  Web    │
   └────┬────┘   └────┬────┘
        └────────┬────┘
                 ▼
         ┌─────────────┐         ┌────────┐
         │ API Gateway │ ───────│  CDN   │
         └──────┬──────┘         └────────┘
                ▼
    ┌────────── LB ──────────┐
    ▼          ▼          ▼
  [Bid svc] [Order svc] [User svc]    ← Stateless
    │          │          │
    └─────► Redis ◄───────┘            ← Session + Cache
                ▼
           PostgreSQL                  ← 主寫從讀
                ▲
          Kafka ─┘                     ← Bid 事件流
```

<span class="muted">每個方塊都對應 Ch.7 的一個概念。**架構 = 概念組裝。**</span>

> Source: 整合 Ch.7 + 拍賣案例


---


## RECAP · 第七章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>Stateless 設計檢核 5 條</li>
      <li>Cache 四模式 + 三災難</li>
      <li>Queue 同步異步取捨</li>
      <li>觀測性三件套</li>
      <li>Correlation ID</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>微服務何時值得？　→ Ch.8</li>
      <li>Event Sourcing 何時用？　→ Ch.8</li>
      <li>CQRS 解什麼問題？　→ Ch.8</li>
      <li>完整案例？　→ Ch.9</li>
    </ul>
  </div>
</div>


---


<!-- _class: end -->

# Ch.7 完
## *分散式骨架完成，下一站講進階模式。*

<br>

<span class="lead">→ Ch.8 Advanced Patterns</span>
