---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.8 · CQRS'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 08 · TOPIC 03</div>

# CQRS
## *讀寫分離——當讀寫比例失衡時*


---


## WHY · 為何要把 Read 和 Write 分開？

<br>

<div class="highlight">

對絕大多數系統：
- **寫**：訂單成立 / 留言 / 編輯 （規模 1×）
- **讀**：商品列表 / 動態瀏覽 / 報表 （規模 100–1000×）

讀寫比例 1:100+ 的系統，用同一個 model 解決兩端
→ 寫端被讀端拖慢、讀端被寫端複雜度拖累。

**CQRS = 為讀寫設計兩套 model。**

</div>

> Source: `CQRSReading.pdf` · §Why CQRS


---


## HOW · 核心架構

```
   ┌──────────────────────────────┐
   │      Command (寫端)           │
   │   - 強 schema · 驗證 · 事務   │
   │   - 寫到 master DB / event   │
   └─────────────┬────────────────┘
                 │  事件 / replication
                 ▼
   ┌──────────────────────────────┐
   │      Query (讀端)             │
   │   - 多個 projection           │
   │   - 反正規化 · 預先 join      │
   │   - 各自最佳化（ES / Cache）  │
   └──────────────────────────────┘
```

<br>

<span class="muted">**洞察**：寫端要正確、讀端要快。兩種優化方向完全不同 → 分開設計。</span>

> Source: `CQRSReading.pdf` · §Architecture


---


## HOW · 適合與不適合

| 情境 | 適合 CQRS? |
|------|-----------|
| 讀寫比 < 10:1 | ✗ 不必 |
| 讀寫比 > 100:1 | ✓ 強烈建議 |
| 報表 / dashboard 多 | ✓ 多 projection 有用 |
| 簡單 CRUD | ✗ 過度設計 |
| 配合 Event Sourcing | ✓ 天作之合 |
| MVP / POC | ✗ 不要 |
| 需要不同存儲（DB + Search） | ✓ 自然 fit |

<br>

<div class="highlight">

**CQRS + Event Sourcing**：黃金組合，但維運複雜度極高——只有 5% 系統值得。

</div>

> Source: `CQRSReading.pdf` · §When to Use


---


## HOW · 三層演進

<div class="stack">
  <div class="layer client"><strong>① 同 DB · 分 Service</strong>　 一個 Command service + 一個 Query service · 同 DB</div>
  <div class="layer app"><strong>② 分 DB · 同 schema</strong>　 主從複製 · 讀寫實體分庫</div>
  <div class="layer data"><strong>③ 分 DB · 異 schema</strong>　 寫 PostgreSQL · 讀 Elasticsearch · 透過事件同步</div>
</div>

<br>

<div class="alert">

**反模式**：直接跳到第 ③ 層。要先驗證 ② 已不夠用，才有資格上 ③。

</div>

> Source: `CQRSReading.pdf` · §Evolution


---


## TRADE-OFF · 三大坑

<div class="tradeoff">
  <div class="pro">
    <h3>CQRS 紅利</h3>
    <ul>
      <li>讀端可極致優化</li>
      <li>寫端邏輯純粹</li>
      <li>多種讀模型並存</li>
      <li>讀寫獨立 scale</li>
    </ul>
  </div>
  <div class="con">
    <h3>CQRS 代價</h3>
    <ul>
      <li>最終一致性必然</li>
      <li>兩套 model 維護</li>
      <li>事件同步 = 新故障點</li>
      <li>新人 onboarding 慢</li>
      <li>「剛寫完看不到」UX 問題</li>
    </ul>
  </div>
</div>

<div class="highlight">

**經驗法則**：先簡單做（單一 model + cache），讀寫比真的失衡再上 CQRS。
**不是先 CQRS 後優化**——是先優化失敗才 CQRS。

</div>

> Source: `CQRSReading.pdf` · §Cost-Benefit


---


<!-- _class: end -->

# CQRS 完
## *三個進階模式串好，章末收斂。*

<br>

<span class="lead">→ Ch.8 Recap</span>
