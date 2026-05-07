---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Mental Model · 心智模型'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">PROLOGUE · 03</div>

# 系統設計的心智模型
## *Four dimensions you can never escape.*

---

## THE FOUR · 四個你逃不掉的維度

<div class="matrix-2x2">
  <div class="featured">
    <strong>Consistency</strong>
    所有節點同時看到一致的資料？
  </div>
  <div>
    <strong>Availability</strong>
    任何時候都能讀寫？
  </div>
  <div>
    <strong>Latency</strong>
    回應時間夠短？
  </div>
  <div>
    <strong>Cost</strong>
    硬體 / 維運 / 開發成本？
  </div>
</div>

<br>

<div class="highlight">

**沒有「全選」**　·　每個系統設計決策都在這 4 個維度上做取捨。

</div>

> Source: CAP 經典 + PACELC 補強 · 整理自 基本觀念/03 CAP Theorem.pdf

---

## EXAMPLE · 同一需求，三種選擇

**需求**：使用者按讚一篇文章，全球可見

<div class="tradeoff">
  <div class="pro">
    <h3>方案 A · 強一致</h3>
    <ul>
      <li>全球單一資料庫（Spanner）</li>
      <li>C ✓ A ✓ L ✗ Cost ✗✗</li>
      <li><em>適合：金流</em></li>
    </ul>
  </div>
  <div class="con">
    <h3>方案 C · 最終一致</h3>
    <ul>
      <li>多區域複製（Cassandra）</li>
      <li>C ✗ A ✓ L ✓ Cost ✓</li>
      <li><em>適合：社群按讚</em></li>
    </ul>
  </div>
</div>

<br>

<span class="muted">同一個「按讚」功能，給 Stripe 用和給 Twitter 用，**架構應該不一樣**。</span>

> Source: 整理自 基本觀念/03 + 11 Replication.pdf

---

## DECISION · 三個必問的問題

<div class="stack">
  <div class="layer client"><strong>① 業務能容忍多久的不一致？</strong>　 5ms / 5s / 5min？</div>
  <div class="layer app"><strong>② 寫入失敗時要回 503 還是先暫存？</strong>　 銀行 vs 留言板</div>
  <div class="layer data"><strong>③ 99% 的請求要在多少 ms 內完成？</strong>　 P99 / P999</div>
</div>

<br>

<div class="highlight">

回答這三題之後，技術選型就剩下 **2-3 個合理選項**。  
剩下的就是團隊熟悉度與成本。

</div>

> Source: 整理自 維運與可靠性/04 Observability.pdf · SLO 章節

---

## NUMBERS · 一些你該記住的數字

| 操作 | 大致時間 | 比例 |
|------|---------|------|
| L1 cache 讀取 | 0.5 ns | 1× |
| Main memory 讀取 | 100 ns | 200× |
| SSD 隨機讀取 | 100 μs | 200,000× |
| 同 datacenter 來回 | 500 μs | 1,000,000× |
| 跨美洲網路來回 | 150 ms | 300,000,000× |

<br>

<span class="muted">記住數量級就好。**「跨網路慢」比「跨網路慢 N 倍」更重要**。</span>

> Source: 基本觀念/12 Numbers to Know.pdf · 完整版見 Ch.2

---

## RECAP · 心智模型總結

<span class="big-number">4</span>

**Consistency · Availability · Latency · Cost**

<br>

<div class="highlight">

接下來七章每個技術選型，都會回到這四個維度。  
你看到 trade-off 表時，問自己：**「這選項在 C/A/L/Cost 上各打幾分？」**

</div>

<br>

<span class="lead">準備好了 → 進入 Ch.1 Foundation Layer。</span>
