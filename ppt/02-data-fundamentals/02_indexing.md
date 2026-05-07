---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · Indexing'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · TOPIC 02</div>

# Database Indexing
## *快讀慢寫的物理交易*

---

## INDEXING · WHY

# 為何全表掃描不可行？

<div class="big-number">10⁹</div>

<br>

10 億筆資料、單筆 100 bytes，全表掃過 = **100 GB I/O**。  
SSD 順序讀 ~ 3 GB/s，意即一次查詢 **30+ 秒**。

<br>

<div class="alert">

**O(N) 在資料量爆炸的時代等於不可行。**  
Index 把查詢成本壓到 **O(log N)**——10 億資料只要 30 次磁碟跳。

</div>

> Source: 基本觀念/07 Database Indexing.pdf · §1 Why Index

---

## INDEXING · HOW

# B+Tree vs LSM-Tree

<div class="matrix-2x2">
  <div class="featured">
    <strong>B+Tree（讀友善）</strong>
    平衡樹 · 葉節點雙向連結<br>
    範圍查詢快 · 寫入需 in-place 更新
  </div>
  <div>
    <strong>LSM-Tree（寫友善）</strong>
    Memtable + SSTable + Compaction<br>
    寫入順序 append · 讀需多層合併
  </div>
  <div>
    <strong>Hash Index</strong>
    O(1) 等值查詢 · 不支援範圍<br>
    記憶體型適用（Redis）
  </div>
  <div>
    <strong>Inverted Index</strong>
    Term → Doc 列表<br>
    全文搜尋（Elasticsearch、Lucene）
  </div>
</div>

<span class="muted">**選擇法則**：讀多寫少用 B+Tree（PostgreSQL、MySQL InnoDB）；寫多讀次之用 LSM（Cassandra、RocksDB、HBase）。</span>

> Source: 基本觀念/07 Database Indexing.pdf · §2-3 Tree Structures

---

## INDEXING · 加速哪些操作？

# Index 真正能用的 4 種查詢

<div class="stack">
  <div class="layer client"><strong>① WHERE 條件查詢</strong>　 <code>WHERE email = 'x@y.com'</code> 從 O(N) → O(log N)</div>
  <div class="layer app"><strong>② JOIN 操作</strong>　 被 join 的欄位有 index，hash/merge join 才能跑得動</div>
  <div class="layer data"><strong>③ ORDER BY 排序</strong>　 B+Tree 葉節點本身有序，免 sort step</div>
  <div class="layer infra"><strong>④ Prefix 搜尋</strong>　 <code>LIKE 'abc%'</code> 能用 index；<code>LIKE '%abc'</code> 不行</div>
</div>

<br>

<span class="muted">**反例**：<code>WHERE LOWER(email) = ...</code> 會讓 index 失效——除非建函數索引。</span>

> Source: 基本觀念/07 Database Indexing.pdf · §Q3 自我測驗

---

## INDEXING · TRADE-OFF

# Index 的隱性成本

<div class="tradeoff">
  <div class="pro">
    <h3>Index 帶來</h3>
    <ul>
      <li>查詢從 O(N) 降到 O(log N)</li>
      <li>支援 ORDER BY 不用 sort</li>
      <li>Unique constraint 自動執行</li>
    </ul>
  </div>
  <div class="con">
    <h3>Index 的代價</h3>
    <ul>
      <li>每張 Index 多一份儲存（~ 表大小 30%）</li>
      <li>寫入要同步維護 N 份 Index</li>
      <li>過多 Index 讓 Query Planner 選錯</li>
    </ul>
  </div>
</div>

<div class="def">
<span class="term">Composite Index 順序很重要</span>
<code>(user_id, created_at)</code> 不等於 <code>(created_at, user_id)</code>。<br>
**最左前綴原則**：where 條件能用上的是「從左數連續」的欄位。
</div>

> Source: 基本觀念/07 Database Indexing.pdf · §4 Best Practices

---

## INDEXING · 複合索引欄位順序

# 把選擇度高的擺前面

```sql
-- 場景：查單一用戶最近的訂單
SELECT * FROM orders
WHERE user_id = 42 AND created_at > '2025-01-01'
ORDER BY created_at DESC;

-- ✓ 對：(user_id, created_at)
--   先用等值定位 user_id，再用範圍掃 created_at
-- ✗ 錯：(created_at, user_id)
--   範圍欄位放前面，後續欄位無法走 index
```

<div class="highlight">

**口訣**：**等值在前、範圍在後、選擇度高在前。**  
Composite 欄位數通常 ≤ 3，再多查詢規畫器選不出來。

</div>

> Source: 基本觀念/07 Database Indexing.pdf · §4 Composite Index

---

## INDEXING · Covering Index

# 不回表，直接從索引返回結果

<div class="def">
<span class="term">Covering Index</span>
查詢需要的「所有欄位」都已包含在 index 裡，DB 不需要再回表（heap）讀資料。<br>
**結果**：少一次 I/O，效能提升 2-10×。
</div>

```sql
-- 索引：(user_id, created_at) INCLUDE (status)
-- 查詢：SELECT status FROM orders WHERE user_id = 42 AND created_at > ...
-- → 完全用 index 回答，不碰 heap
```

<br>

<span class="muted">**PostgreSQL** 用 <code>INCLUDE</code>；**MySQL InnoDB** 主鍵自帶 covering（cluster index）；**SQL Server** 也有 INCLUDE 語法。</span>

> Source: 基本觀念/07 Database Indexing.pdf · §Best Practices

---

## INDEXING · 速判決策

# 何時建 Index？何時不建？

```
查詢頻繁 (>100 次/秒)？
├─ 是 → 評估欄位選擇度（distinct values / total）
│       ├─ 選擇度 > 5% → 建 B+Tree Index
│       ├─ 選擇度 < 1% → 不建（全表掃反而快）
│       └─ 範圍查詢多 → 考慮 Composite Index
└─ 否 → 不建（寫成本 > 讀收益）
```

<br>

<div class="highlight">

**口訣**：**選擇度低不建，寫多不建，FK 一定建。**

</div>

> Source: 基本觀念/07 Database Indexing.pdf · §5 Decision Framework

---

<!-- _class: end -->

# Indexing 完
## *查詢快了，下一站看 Transaction 怎麼保證寫入正確。*
