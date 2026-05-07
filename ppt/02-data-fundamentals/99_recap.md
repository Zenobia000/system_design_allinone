---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · Recap'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · RECAP</div>

# Ch.2 整合 & 收尾
## *把資料層四件事串成一個電商下訂單*

---

## CASE STUDY · 把資料層四件事串起來

# 設計：電商「下訂單」交易流程

<div class="stack">
  <div class="layer client"><strong>CAP</strong>　 訂單庫選 CP（PostgreSQL HA）· 推薦庫選 AP（Cassandra）</div>
  <div class="layer app"><strong>Index</strong>　 orders(user_id, created_at) Composite · 庫存 unique(sku)</div>
  <div class="layer data"><strong>Tx</strong>　 扣庫存 + 建訂單 = 本地 ACID Tx · 通知物流 = Saga + Outbox</div>
  <div class="layer infra"><strong>Numbers</strong>　 P99 預算 200ms · 1 次 DB 寫 ~ 5ms · 預留 10 次跨服務呼叫額度</div>
</div>

<br>

<div class="highlight">

每個決策都對應 Ch.2 的一個面向。  
**Ch.3 開始挖分散式資料層**——當單機 PostgreSQL 撐不住時要怎麼水平切？

</div>

> Source: 整合 Ch.2 全章 + Shopify Engineering Blog 公開資料

---

## RECAP · 第二章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>CAP / PACELC 選邊清單</li>
      <li>B+Tree vs LSM 決策樹</li>
      <li>4 個隔離級別 vs 3 個異常現象</li>
      <li>MVCC + Lost Update 解法</li>
      <li>Latency Numbers 11 行表</li>
      <li>Saga / Outbox / 2PC 選型</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>單機撐不住怎麼切？　→ Ch.3 Sharding</li>
      <li>讀寫分離怎麼做？　→ Ch.3 Replication</li>
      <li>cache 該擺哪一層？　→ Ch.3 Caching</li>
      <li>請求怎麼路由到正確的 shard？　→ Ch.3 Consistent Hash</li>
    </ul>
  </div>
</div>

---

<!-- _class: end -->

# Ch.2 完
## *資料層基礎打穩，下一站把資料切散到多台機器。*

<br>

<span class="lead">→ Ch.3 Data Distribution</span>
