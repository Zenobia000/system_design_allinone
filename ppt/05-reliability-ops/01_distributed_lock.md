---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Distributed Lock'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · TOPIC 01</div>

# Distributed Lock
## *在同一時間，只允許一個實體對某資源進行操作*

---

## DISTRIBUTED LOCK · WHY

# 為何分散式鎖比想像中難？

<br>

<div class="highlight">

**單機 mutex** 簡單：靠 OS kernel 的原子操作。
**分散式鎖** 難：客戶端、網路、鎖服務 **任何一邊壞掉**都可能讓兩個 client 同時拿到鎖。

</div>

<br>

- 場景：扣庫存、Leader 選舉、避免重複任務、票券暫存
- 風險：**雙重執行 = 雙倍扣款 / 雙倍 email / 帳本不平**

> Source: 常用技術/09 Distributed Lock.pdf · §1 為什麼需要

---

## DISTRIBUTED LOCK · 4 個經典場景

# PDF 點名的 4 個必用場景

<div class="stack">
  <div class="layer client"><strong>① E-Commerce Checkout</strong>　 結帳期間（10 分鐘）保留限量商品，避免被同時購買</div>
  <div class="layer app"><strong>② Ride-Sharing Matchmaking</strong>　 鎖定司機直到確認/拒絕，避免被多個乘客同時配對</div>
  <div class="layer data"><strong>③ Distributed Cron Jobs</strong>　 多台 server 排程任務，確保同一任務只跑一次</div>
  <div class="layer infra"><strong>④ Online Auction Bidding</strong>　 最後幾秒鎖商品處理新出價，避免同時最高價衝突</div>
</div>

<br>

<span class="muted">**共同特徵**：多 writer 同時想改同一筆資料 / 同一資源 / 同一槽位 → 沒有協調就會出現 double-charge、double-booking。</span>

> Source: 常用技術/09 Distributed Lock.pdf · §1 使用場景

---

## DISTRIBUTED LOCK · HOW

# 4 種實作方案對比

| 方案 | 一致性 | 速度 | 運維成本 | 適合場景 |
|------|--------|------|---------|---------|
| **Redis SET NX EX** | 弱（split-brain 風險） | 極快 | 低 | 已有 Redis · 幂等去重 |
| **ZooKeeper / etcd** | 強（Raft / ZAB 共識） | 中 | 高 | 金流 · Leader 選舉 |
| **DB Row / Advisory Lock** | 強（單 DB 內 ACID） | 慢 | 零（沿用 DB） | 單區域 · 低頻控制 |
| **K8s `replicas: 1`** | N/A（根本沒並發） | — | 低 | 不追求高可用 · 簡單任務 |

<div class="highlight">

**選型公式**：先問**你需要分散式鎖嗎**？K8s 單副本和應用層幂等可以避掉很多場景，**鎖是最後手段**。

</div>

> Source: 常用技術/09 Distributed Lock.pdf · §2 實作工具與策略

---

## DISTRIBUTED LOCK · 三大陷阱

# Lock 出問題的三個經典場景

<div class="def">
<span class="term">① 客戶端 GC 暫停</span>
Java client 拿到鎖後 GC 30 秒，鎖過期被別人搶到，醒來繼續寫。<br>
**解法**：fencing token（鎖帶遞增 ID，server 拒絕舊 token 寫入）
</div>

<div class="def">
<span class="term">② 鎖過期前未完成</span>
業務跑超過 TTL，鎖自動釋放，下一個 client 進來雙重執行。<br>
**解法**：watchdog 線程自動續期（Redisson 的做法）
</div>

<div class="def">
<span class="term">③ 鎖伺服器 failover</span>
Master 拿到鎖後同步給 replica 之前掛掉，新 master 不知道這個鎖。<br>
**解法**：Redlock 多數決，或用強一致的 etcd / ZooKeeper
</div>

> Source: 常用技術/09 Distributed Lock.pdf · §3 常見陷阱

---

## DISTRIBUTED LOCK · Deadlock 與時鐘偏差

# 兩個被忽略的危險

<div class="alert">

**死鎖（Deadlock）**：A 拿了鎖 1 想拿鎖 2，B 拿了鎖 2 想拿鎖 1 → 永久互等。
**解法**：全系統統一**鎖獲取順序**（永遠按 user_id 升序鎖）+ 設計合理的 transaction 邊界。

</div>

<div class="alert">

**時鐘偏差（Clock Skew）+ 網路分區**：Redlock 等基於 wall-clock 的演算法，在節點時鐘不同步、或極端網路分區下，**仍可能違反互斥性**（CAP 定理的代價）。
**解法**：強一致場景用 etcd / ZooKeeper（基於 logical time 的共識）。

</div>

<span class="muted">這也是 **Martin Kleppmann vs antirez 論戰**的核心：Kleppmann 認為 Redlock 不該用於 correctness-critical 場景，只能用於 efficiency 場景（避免重複工作而非保證資料正確）。</span>

> Source: 常用技術/09 Distributed Lock.pdf · §3 + §5 時鐘偏差

---

## DISTRIBUTED LOCK · TRADE-OFF

# 能不用鎖就不用鎖

<div class="tradeoff">
  <div class="pro">
    <h3>替代方案優先</h3>
    <ul>
      <li><strong>樂觀鎖</strong>：version 比對 + 重試</li>
      <li><strong>幂等性</strong>：操作多次結果相同 → 不需鎖</li>
      <li><strong>單分區處理</strong>：同 key 永遠路由同 worker</li>
      <li><strong>原子操作</strong>：DB 的 UPDATE WHERE 條件</li>
      <li><strong>K8s replicas:1</strong>：根本沒並發</li>
    </ul>
  </div>
  <div class="con">
    <h3>必須用鎖的場景</h3>
    <ul>
      <li>多步驟操作須整體互斥</li>
      <li>跨資源（DB + 外部 API）一致</li>
      <li>Leader 選舉 / Singleton 任務</li>
      <li>面向用戶的「預留」流程（票券）</li>
    </ul>
  </div>
</div>

<div class="alert">

**Linus 哲學**：鎖是設計失敗的證據。**先想能不能改資料結構消除鎖**，再考慮鎖。

</div>

> Source: 常用技術/09 Distributed Lock.pdf · §4 + §6 最後思考

---

<!-- _class: end -->

# Distributed Lock 完
## *鎖是粗粒度協調，下一站看更細的爭用控制。*

<br>

<span class="lead">→ 5.2 Contention</span>
