---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Contention'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · TOPIC 02</div>

# Contention
## *讀寫不是原子的，那個微小的窗口足以讓你超賣*

---

## CONTENTION · WHY

# 演唱會搶票的經典 race condition

<br>

**The Weeknd 演唱會剩 1 個座位，Terry 與 Bohr 同時點「立即購買」**：

1. Terry 讀取「剩 1 個座位」
2. Bohr 也讀到「剩 1 個座位」（兩個讀取都在任一寫入發生前完成）
3. 兩人都判斷 1 ≥ 1 → 進入付款
4. Terry 扣 $500，座位數 → 0
5. Bohr 扣 $500，座位數 → **-1**
6. 兩個人到場館，都認為 Row 5 Seat 12 是自己的

<div class="alert">

**root cause**：讀取和寫入**不是原子的**。在「讀取狀態」和「根據狀態做更新」之間有時間差，記憶體裡微秒、網路上毫秒——一切都可能改變。

</div>

> Source: 維運與可靠性/01 Dealing with Contention.pdf · §1 問題

---

## CONTENTION · 五層解法的複雜度遞進

# 從 atomicity 到分散式協調

<div class="stack">
  <div class="layer client"><strong>① Atomicity / Transaction</strong>　 BEGIN ... COMMIT，全部成功或全部失敗</div>
  <div class="layer app"><strong>② Pessimistic Locking</strong>　 SELECT ... FOR UPDATE 先鎖再改</div>
  <div class="layer data"><strong>③ Optimistic Concurrency (OCC)</strong>　 version 比對，衝突再重試</div>
  <div class="layer infra"><strong>④ SERIALIZABLE Isolation</strong>　 DB 自動偵測衝突並 abort 其中一個</div>
  <div class="layer infra"><strong>⑤ 分散式：2PC / Saga / Distributed Lock</strong>　 跨 DB 才用</div>
</div>

<br>

<span class="muted">**口訣**：能在單 DB 解決就不要跨 DB；能用 OCC 就不要用 pessimistic；能用 atomicity 就不要用 lock。</span>

> Source: 維運與可靠性/01 Dealing with Contention.pdf · §2 解法架構

---

## CONTENTION · Pessimistic vs Optimistic

# 兩種典型的併發控制

<div class="tradeoff">
  <div class="pro">
    <h3>Pessimistic Locking</h3>
    <ul>
      <li><code>SELECT ... FOR UPDATE</code> 先取排他鎖</li>
      <li>假設衝突一定會發生，先預防</li>
      <li>**適合高 contention**、嚴格一致性</li>
      <li>代價：lock overhead、可能死鎖</li>
    </ul>
  </div>
  <div class="con">
    <h3>Optimistic (OCC)</h3>
    <ul>
      <li><code>UPDATE WHERE version = X</code></li>
      <li>假設衝突很少，衝突再重試</li>
      <li>**適合低 contention**、讀多寫少</li>
      <li>代價：高衝突時不斷重試、ABA 問題</li>
    </ul>
  </div>
</div>

<div class="alert">

**ABA 問題**：thread A 讀到 A，B 改成 B 再改回 A，A 做 compare-and-swap 以為沒變。OCC 用簡單版本號或記憶體重複使用時可能踩到。

</div>

> Source: 維運與可靠性/01 Dealing with Contention.pdf · §2 + ABA 警告

---

## CONTENTION · Isolation Level

# 4 個標準 isolation level（不是進階程度）

| Level | 看得到 | 場景 |
|-------|-------|------|
| **READ UNCOMMITTED** | 其他 tx 尚未 commit 的變更 | 極少使用 |
| **READ COMMITTED** | 只能看到已 commit 的變更 | PostgreSQL 預設 |
| **REPEATABLE READ** | tx 內多次讀取結果一致 | MySQL 預設 |
| **SERIALIZABLE** | tx 看起來像逐個執行 | 需要強保證 |

<div class="highlight">

**搶票的 race condition**：READ COMMITTED / REPEATABLE READ **都防不住**——Terry 和 Bohr 都讀到「剩 1」再各自更新。**SERIALIZABLE** 透過自動 abort 衝突 tx 來解決，但代價是**衝突偵測 overhead 和 abort 後的重做**。

</div>

> Source: 維運與可靠性/01 Dealing with Contention.pdf · §2 Isolation Level

---

## CONTENTION · 多節點解法

# 跨 DB：2PC vs Saga

<div class="tradeoff">
  <div class="pro">
    <h3>Two-Phase Commit (2PC)</h3>
    <ul>
      <li>Coordinator 統一管 prepare → commit</li>
      <li>強一致：要嘛全成功要嘛全 rollback</li>
      <li>**昂貴脆弱**：coordinator 在 prepare 後崩潰 → tx 卡死</li>
      <li>跨網路持有開啟中 tx 鎖住 row</li>
    </ul>
  </div>
  <div class="con">
    <h3>Saga Pattern</h3>
    <ul>
      <li>拆成獨立步驟，每步獨立 commit</li>
      <li>失敗用**補償操作**（compensate）撤銷</li>
      <li>韌性好：每步是完整 tx，沒人卡死</li>
      <li>代價：**過程中暫時不一致**（最終一致）</li>
    </ul>
  </div>
</div>

<span class="muted">**選擇**：強一致用 2PC（罕用，不到不得已不上）；追求韌性用 Saga（電商、訂單常見）。**先問：能不能把資料放同一 DB？** 十次有九次可以，那就免了分散式協調。</span>

> Source: 維運與可靠性/01 Dealing with Contention.pdf · §3 多節點

---

## CONTENTION · 5 種方案速判表

# 該選哪個？

| 方案 | 適合 | 不適合 | 延遲 | 複雜度 |
|------|------|--------|------|--------|
| **Pessimistic Locking** | 高 contention · 嚴格一致 · 單 DB | 低 contention · 高吞吐 | 低 | 低 |
| **SERIALIZABLE Isolation** | 自動衝突偵測 · 不確定鎖哪些 | 效能關鍵 · 高 contention | 中 | 低 |
| **Optimistic Concurrency** | 低 contention · 讀多寫少 | 高 contention · 不接受重試 | 低 | 中 |
| **Distributed Transaction** | 跨系統強原子 | 高可用 · 效能關鍵 | 高 | 非常高 |
| **Distributed Lock** | 面向用戶預留 · 比 2PC 簡單 | 純技術協調 | 低 | 中 |

<span class="muted">**決策樹**：資料能放單 DB？高 contention 用 pessimistic lock，低 contention 用 OCC。資料必須跨 DB？能容忍最終一致用 Saga，必須強一致才用 2PC。</span>

> Source: 維運與可靠性/01 Dealing with Contention.pdf · §4 選擇正確的做法

---

## CONTENTION · 應用層預留模式

# Ticketmaster 的「pending」狀態

<div class="highlight">

**問題**：用戶選座位後填付款資訊要 5 分鐘——這 5 分鐘裡座位算誰的？
**糟糕做法**：等付款完成才扣減 → 用戶填完才發現「座位被搶走」。
**正確做法**：選座當下立即進入「**pending（已預留）**」狀態，**TTL 10 分鐘**，給時間完成付款。

</div>

<br>

- Contention 窗口從**整個流程（5 分鐘）縮小到只有「預留」那毫秒**
- Uber 同款：司機狀態設為 `pending_request` 防止多乘客同時配對
- 電商「暫時 hold」進購物車也是同樣模式

> Source: 維運與可靠性/01 Dealing with Contention.pdf · §3 + §5 面試情境

---

## CONTENTION · TRADE-OFF

# 不要過度設計

<div class="tradeoff">
  <div class="pro">
    <h3>降低同時搶同一個東西的人數</h3>
    <ul>
      <li>Sharding 鎖：1 個全局鎖切 100 個子鎖</li>
      <li>Bulkhead：不同業務不同 connection pool</li>
      <li>Backpressure：上游主動降速</li>
      <li>Async / Batch：把同步呼叫改成 queue</li>
    </ul>
  </div>
  <div class="con">
    <h3>常見的過度設計</h3>
    <ul>
      <li>單 DB transaction 加 row lock 就夠 → 硬上 Redis distributed lock</li>
      <li>低 contention 場景 → 用 SERIALIZABLE</li>
      <li>沒跨 DB 需求 → 上 2PC</li>
    </ul>
  </div>
</div>

<div class="alert">

**面試紅線**：被問「contention 怎麼處理」時，**主動從單 DB 開始說起**，不要直接跳到 distributed lock 或 2PC。加新的元件就是加新的故障點。

</div>

> Source: 維運與可靠性/01 Dealing with Contention.pdf · §5 不要過度設計

---

<!-- _class: end -->

# Contention 完
## *單筆資料的爭用解了，再看整個系統的流量爭用。*

<br>

<span class="lead">→ 5.3 Overload Protection</span>
