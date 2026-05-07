---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.3 · Overview'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 03 · TOPIC 00</div>

# Data Distribution
## *當一台機器塞不下，資料就要散開來活*

<!--
開場 30 秒：
- Ch.2 解決了單機資料層的所有問題；Ch.3 處理「資料散到多台機器」的全部後果
- 4 個關鍵字：Sharding（切）· Replication（複製）· Caching（暫存）· Consistent Hashing（路由）
- 講者語氣：謹慎，因為這章的每個決策都是不可逆的
-->

---

## OBJECTIVES · 學習目標

看完本章，你能回答：

<div class="stack">
  <div class="layer client"><strong>① Consistent Hashing 解什麼？</strong>　加減節點時資料怎麼搬</div>
  <div class="layer app"><strong>② Sharding 怎麼選分片鍵？</strong>　 hot shard 是怎麼煉成的</div>
  <div class="layer data"><strong>③ Replication 三種模式怎麼選？</strong>　 sync / async / semi-sync</div>
  <div class="layer infra"><strong>④ Cache 該擺哪一層？</strong>　 client / CDN / app / DB cache</div>
</div>

> Source: 基本觀念/06 + 09 + 10 + 11

---

## MENTAL MODEL · 分散式資料層的 4 個動作

```
┌──────────────────────────────────────────────────┐
│  ROUTE        Consistent Hash · Locator service  │  ← Topic 01
├──────────────────────────────────────────────────┤
│  SHARD        Range · Hash · Directory · Geo     │  ← Topic 02
├──────────────────────────────────────────────────┤
│  REPLICATE    Leader-Follower · Multi-Leader     │  ← Topic 03
├──────────────────────────────────────────────────┤
│  CACHE        Read-aside · Write-through ...     │  ← Topic 04
└──────────────────────────────────────────────────┘
              「切」與「散」是兩件事
```

<span class="muted">**Sharding 是切**（資料分片）；**Replication 是散**（每片再複製多份）。兩者正交，可以組合使用。</span>

> Source: 整理自 基本觀念/06 + 09 + 10 + 11

---

<!-- _class: end -->

# Overview 完
## *先看路由——加減節點時，怎麼讓資料盡量別動。*

<br>

<span class="lead">→ Topic 01 Consistent Hashing</span>
