---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.8 · Recap'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 08 · RECAP</div>

# Advanced Patterns 收斂
## *什麼時候**不要**用這三個模式*


---


## DECISION TREE · 進階模式判斷

```
   你的系統有以下情況嗎？
   ─────────────────

   團隊 > 30 人 + K8s 成熟? ────→ Microservices 值得考慮
        └→ 否 → 留在 Modular Monolith

   業務本質是「事件流」+ 合規要求軌跡? ──→ Event Sourcing 值得考慮
        └→ 否 → Outbox table 就夠

   讀寫比 > 100:1 + 多種 projection 需求? ──→ CQRS 值得考慮
        └→ 否 → 讀寫合一 + cache

   三個都 yes? → 5% 系統的奢侈組合
```

<span class="muted">**Linus 風格**：每個進階模式都是「**沒它解不了**」才該用。</span>

> Source: 整合 Ch.8 三個進階模式


---


## RECAP · 第八章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>微服務 5 個前置條件</li>
      <li>Modular Monolith 中間路</li>
      <li>Event Sourcing 適用清單</li>
      <li>CQRS 三層演進</li>
      <li>進階模式決策樹</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>真實案例怎麼設計？　→ Ch.9</li>
      <li>外部約束怎麼處理？　→ Ch.9</li>
      <li>沒實權怎麼推動？　→ Ch.10</li>
    </ul>
  </div>
</div>


---


<!-- _class: end -->

# Ch.8 完
## *進階武器到手，下一站做實戰。*

<br>

<span class="lead">→ Ch.9 Case Study</span>
