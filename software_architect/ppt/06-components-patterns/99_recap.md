---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · Recap'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · RECAP</div>

# Components & Patterns 收斂
## *把分層 + SOLID + 模式串成一個 service*


---


## CASE · 拍賣 App 的 Order Service 設計

```
   Presentation (Controller)
        ↓                                          ← REST API
   Application (UseCase)         "PlaceBid"        ← 業務流程
        ↓
   Domain (Aggregate)             Order, Bid       ← 商業規則
        ↓
   Infrastructure (Repository)    OrderRepo        ← 資料存取
        ↓
   External Adapter               PaymentAdapter   ← 第三方
```

<br>

| 層 | 套用的模式 |
|---|---------|
| Application | Command (PlaceBidCommand) |
| Domain | Factory (Order.create) · Strategy (BidValidationStrategy) |
| Repository | Repository · Specification |
| Adapter | Adapter (Stripe → Payment interface) |

> Source: 整合 Ch.6 三主題 + 拍賣業務典型架構


---


## RECAP · 第六章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>3 + 4 層架構標準</li>
      <li>SOLID 五原則 + DI</li>
      <li>8 個必學 GoF 模式</li>
      <li>味道偵測清單</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>系統怎麼撐百萬用戶？　→ Ch.7</li>
      <li>分散式怎麼處理一致性？　→ Ch.7</li>
      <li>微服務何時值得？　→ Ch.8</li>
      <li>實戰演練？　→ Ch.9</li>
    </ul>
  </div>
</div>


---


<!-- _class: end -->

# Ch.6 完
## *模式詞彙到手，下一站做架構。*

<br>

<span class="lead">→ Ch.7 System Architecture</span>
