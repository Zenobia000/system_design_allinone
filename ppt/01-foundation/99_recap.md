---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.1 · Recap'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 01 · RECAP</div>

# Foundation 收斂
## *四件事，串成一個發推文的故事。*

---

## CASE STUDY · 把四件事串起來

# 設計：Twitter 「發推文」 API

<div class="stack">
  <div class="layer client"><strong>Network</strong>　 全球 CDN 邊緣 + HTTP/3 QUIC（行動弱網）</div>
  <div class="layer app"><strong>Client-Server</strong>　 Stateless API server · Session 放 Redis</div>
  <div class="layer data"><strong>Scale</strong>　 應用層 K8s 自動擴容 · DB 主寫從讀（Ch.3 詳述）</div>
  <div class="layer infra"><strong>API</strong>　 POST /v2/tweets · Idempotency-Key header · Cursor 分頁</div>
</div>

<br>

<div class="highlight">

每個決策都對應 Foundation 的一個面向。
**Ch.2 開始挖資料層** —— Twitter 的 timeline 資料怎麼存才能讓 100M 用戶讀得快？

</div>

> Source: 整合 Ch.1 全章 + Twitter Engineering Blog 公開資料

---

## RECAP · 第一章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>4 層責任分離思考法</li>
      <li>橫向擴展三前提清單</li>
      <li>API 風格選型矩陣</li>
      <li>idempotency / versioning 設計檢核</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>資料層的 trade-off？　→ Ch.2</li>
      <li>怎麼分散資料？　→ Ch.3</li>
      <li>選哪個資料庫？　→ Ch.4</li>
      <li>怎麼撐住流量？　→ Ch.5/6</li>
    </ul>
  </div>
</div>

---

<!-- _class: end -->

# Ch.1 完
## *Foundation 站穩，下一站挖資料層。*

<br>

<span class="lead">→ Ch.2 Data Fundamentals</span>
