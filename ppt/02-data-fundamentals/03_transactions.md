---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · Transactions'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · TOPIC 03</div>

# Database Transactions
## *讓多步操作要嘛全做、要嘛全不做*

---

## TRANSACTIONS · WHY

# 為何沒有事務的世界會崩塌？

<br>

**例子**：A 轉帳 100 元給 B

```
Step 1: A.balance -= 100   ← 系統在這裡崩潰會怎樣？
Step 2: B.balance += 100
```

<br>

<div class="alert">

**沒有事務 = 100 元蒸發**。Transaction 給你一個保證：  
**「這幾步要嘛全做，要嘛全不做」**——這就是 ACID 的 **A（Atomicity）**。

</div>

> Source: 基本觀念/08 Database Transactions.pdf · §1 Why Tx

---

## TRANSACTIONS · HOW

# ACID 四件事

<div class="stack">
  <div class="layer client"><strong>A · Atomicity</strong>　 全做或全不做（崩潰 → rollback，靠 WAL）</div>
  <div class="layer app"><strong>C · Consistency</strong>　 業務不變式不破（餘額不為負，constraints 不違反）</div>
  <div class="layer data"><strong>I · Isolation</strong>　 並發事務看不到彼此中間狀態</div>
  <div class="layer infra"><strong>D · Durability</strong>　 commit 後即使機器爆炸資料還在（WAL flush）</div>
</div>

<br>

<span class="muted">**A、D 是底線**，幾乎所有資料庫都做。**I 才是真正分級的**——這是 SQL 標準定義 4 種隔離級別的原因。</span>

> Source: 基本觀念/08 Database Transactions.pdf · §2 ACID

---

## TRANSACTIONS · ACID-C ≠ CAP-C

# 兩個 C 是完全不同的概念

<div class="tradeoff">
  <div class="pro">
    <h3>ACID 的 C（Consistency）</h3>
    <ul>
      <li>資料的「業務邏輯正確性」</li>
      <li>tx 前後 constraints 必須成立</li>
      <li>例：餘額不為負、外鍵存在</li>
      <li><em>單機 DB 也談得到</em></li>
    </ul>
  </div>
  <div class="con">
    <h3>CAP 的 C（Consistency）</h3>
    <ul>
      <li>「所有節點同一時間看到相同資料」</li>
      <li>分散式副本之間的同步問題</li>
      <li>例：strong vs eventual consistency</li>
      <li><em>只在多副本才有意義</em></li>
    </ul>
  </div>
</div>

<span class="muted">**面試陷阱**：把 ACID 的 C 和 CAP 的 C 講混的人，會被立刻打分。</span>

> Source: 基本觀念/08 Database Transactions.pdf · §Q6

---

## TRANSACTIONS · 隔離級別

# 4 個隔離級別 vs 3 個異常現象

| 隔離級別 | Dirty Read | Non-Repeatable Read | Phantom Read |
|---------|:----------:|:------------------:|:------------:|
| **Read Uncommitted** | ✗ 可能 | ✗ 可能 | ✗ 可能 |
| **Read Committed** | ✓ 防 | ✗ 可能 | ✗ 可能 |
| **Repeatable Read** | ✓ 防 | ✓ 防 | ✗ 可能 |
| **Serializable** | ✓ 防 | ✓ 防 | ✓ 防 |

<br>

<div class="highlight">

**MySQL InnoDB 預設**：Repeatable Read（用 MVCC + Gap Lock 連 Phantom 也防）。  
**PostgreSQL 預設**：Read Committed（最常見、最快、最容易踩坑）。

</div>

> Source: 基本觀念/08 Database Transactions.pdf · §3 Isolation Levels

---

## TRANSACTIONS · Phantom Read 範例

# 為何同一個 query 兩次跑出不同行數？

```
T1: SELECT count(*) FROM accounts WHERE balance > 1000;
    → 5 筆

T2: INSERT INTO accounts (balance) VALUES (2000);
    → commit

T1: SELECT count(*) FROM accounts WHERE balance > 1000;
    → 6 筆 ← 多出一筆「幽靈資料」
```

<br>

<div class="def">
<span class="term">Phantom Read 與 Non-Repeatable Read 的差別</span>
**Non-Repeatable**：同一筆 row 的值被改掉。<br>
**Phantom**：新增/刪除 row，使範圍查詢結果集改變。<br>
**防法**：MySQL Gap Lock、PostgreSQL Serializable Snapshot Isolation（SSI）。
</div>

> Source: 基本觀念/08 Database Transactions.pdf · §三種並發異常

---

## TRANSACTIONS · MVCC

# 現代資料庫如何不靠鎖實現隔離

<div class="def">
<span class="term">MVCC（Multi-Version Concurrency Control）</span>
**核心思想**：對同一份資料保存多個版本。讀操作看「快照」，寫操作建立新版本，讀寫不互相阻塞。
</div>

```
帳戶餘額歷史版本：
  version 1 : 1000 (T1 commit 時間點)
  version 2 :  500 (T2 commit 時間點)

T3 在 T2 commit 之前開始 → 看到 version 1 (1000)
T4 在 T2 commit 之後開始 → 看到 version 2 (500)
```

<span class="muted">**PostgreSQL、MySQL InnoDB** 都用 MVCC。舊版本由 vacuum / purge 機制清理——這就是 PostgreSQL 為何要定期 VACUUM。</span>

> Source: 基本觀念/08 Database Transactions.pdf · §資料庫如何實現隔離

---

## TRANSACTIONS · TRADE-OFF

# 隔離級別 vs 並發效能

<div class="tradeoff">
  <div class="pro">
    <h3>強隔離（Serializable）</h3>
    <ul>
      <li>完全沒有並發異常</li>
      <li>程式碼簡單，不用想 race</li>
      <li><em>代價：吞吐量掉 5-10×</em></li>
    </ul>
  </div>
  <div class="con">
    <h3>弱隔離（Read Committed）</h3>
    <ul>
      <li>並發吞吐量高</li>
      <li>大多數查詢沒事</li>
      <li><em>代價：寫不變式要自己處理</em></li>
    </ul>
  </div>
</div>

<div class="def">
<span class="term">SELECT FOR UPDATE</span>
弱隔離下，要保護「讀後寫」邏輯（如扣庫存）必須顯式加鎖。<br>
**典型場景**：訂單、票券、優惠券——讀庫存後判斷再寫，中間必須 lock。
</div>

> Source: 基本觀念/08 Database Transactions.pdf · §4 Concurrency

---

## TRANSACTIONS · Lost Update

# 兩個 tx 各扣 200、各扣 300，最後只扣了一個

```
帳戶餘額：1000
T1: 讀 1000，計算 1000 - 200 = 800
T2: 讀 1000，計算 1000 - 300 = 700
T1: 寫入 800，commit
T2: 寫入 700，commit  ← 覆蓋了 T1，T1 的扣款消失了
正確結果應為 500，實際卻是 700
```

<div class="tradeoff">
  <div class="pro">
    <h3>樂觀鎖（Optimistic）</h3>
    <ul>
      <li><code>UPDATE ... WHERE version = N</code></li>
      <li>版本不符就拒絕、由 app 重試</li>
      <li><em>適合：衝突不常發生</em></li>
    </ul>
  </div>
  <div class="con">
    <h3>悲觀鎖（Pessimistic）</h3>
    <ul>
      <li><code>SELECT ... FOR UPDATE</code></li>
      <li>讀時就鎖住，其他 tx 等待</li>
      <li><em>代價：可能 deadlock、並行性低</em></li>
    </ul>
  </div>
</div>

<span class="muted">**最簡解**：原子 UPDATE — <code>UPDATE SET qty = qty - 1 WHERE qty > 0</code>，一條 SQL 就搞定，不用提到 Serializable。</span>

> Source: 基本觀念/08 Database Transactions.pdf · §Lost Update

---

## TRANSACTIONS · Deadlock

# 兩個 tx 互鎖時資料庫會做什麼？

```
T1: BEGIN; UPDATE account WHERE id=1;  -- 鎖住 1
T2: BEGIN; UPDATE account WHERE id=2;  -- 鎖住 2
T1: UPDATE account WHERE id=2;         -- 等 T2
T2: UPDATE account WHERE id=1;         -- 等 T1 → DEADLOCK
```

<div class="alert">

**資料庫的 deadlock detection 會自動 rollback 其中一個 tx**，回傳錯誤給 application。  
Application 必須處理重試邏輯——不要假設「commit 一定成功」。

</div>

<span class="muted">**預防**：所有 tx 用一致的順序鎖定資源（例：永遠先鎖 <code>min(account_id)</code>）。</span>

> Source: 基本觀念/08 Database Transactions.pdf · §悲觀鎖 + §主動說明死鎖風險

---

## TRANSACTIONS · 分散式延伸

# 2PC vs Saga vs Outbox

<div class="matrix-2x2">
  <div class="featured">
    <strong>2PC（Two-Phase Commit）</strong>
    Coordinator 統籌 prepare → commit<br>
    強一致 · 但 coordinator 壞 = 全卡
  </div>
  <div>
    <strong>Saga</strong>
    一連串本地 tx + 補償<br>
    最終一致 · 業務碼複雜
  </div>
  <div>
    <strong>Outbox Pattern</strong>
    本地 tx 寫主表 + outbox 表<br>
    背景搬運至 message queue
  </div>
  <div>
    <strong>TCC（Try-Confirm-Cancel）</strong>
    類 2PC 但業務層實作<br>
    強一致 · 侵入性高
  </div>
</div>

<span class="muted">**現代微服務首選 Saga + Outbox**——避免分散式鎖、可獨立部署、失敗可重試。</span>

> Source: 基本觀念/08 Database Transactions.pdf · §5 Distributed Tx

---

## TRANSACTIONS · Saga 補償交易細節

# 失敗時逐步回滾 = 補償 (compensation)

```
建立訂單流程（正向）：
  1. 訂單服務：建立訂單記錄（local commit）
  2. 庫存服務：扣減庫存（local commit）
  3. 付款服務：扣款（local commit）

如果步驟 3 失敗（付款失敗）：
  ← 補償步驟 2：把庫存加回去
  ← 補償步驟 1：把訂單標記為「已取消」
```

<div class="highlight">

**關鍵**：補償操作必須**冪等**（重試不出錯）、**可逆**（業務允許 rollback）。  
不可逆的操作（寄信、出貨）必須延後到 saga 終點才執行。

</div>

> Source: 基本觀念/08 Database Transactions.pdf · §Saga Pattern

---

<!-- _class: end -->

# Transactions 完
## *寫入有保證了，下一站看 Latency 數字怎麼推架構決策。*
