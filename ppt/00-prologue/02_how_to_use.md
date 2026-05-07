---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'How to Use · 如何使用'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">PROLOGUE · 02</div>

# 如何使用這份簡報
## *Symbols, sources, and reading rhythm.*

---

## SYMBOLS · 視覺符號約定

<div class="tradeoff">
  <div class="pro">
    <h3>綠框</h3>
    Pros · 推薦做法 · 解決的問題
  </div>
  <div class="con">
    <h3>紅框</h3>
    Cons · 反模式 · 要付的代價
  </div>
</div>

<div class="highlight">

**橙底框**　·　核心觀念 / 關鍵決策

</div>

<div class="alert">

警告框　·　常見的錯誤假設或反模式

</div>

<div class="def">
<span class="term">定義框</span>
專有名詞首次出現時用此格式說明，附中英對照
</div>

---

## CITATION · 來源引用

每張 slide 底部都會標註 PDF 來源：

> Source: 基本觀念/10 Sharding.pdf · §3

<br>

**為何要標**：

- 想深挖某主題時可直接回查原始 PDF
- 課程未來更新教材時可追溯依賴
- 學員自學時知道完整版去哪找

<br>

<span class="muted">所有 PDF 都在 `/系統設計實戰/` 資料夾，34 份共 4 大類。</span>

---

## SLIDE STRUCTURE · 每張 slide 的節奏

每個主題（如 Sharding、Replication）通常用 **3 張 slide** 講完：

<div class="stack">
  <div class="layer client"><strong>① Why</strong>　 為何需要這個技術 / 解決什麼具體問題</div>
  <div class="layer app"><strong>② How</strong>　 核心機制 / 實作要點 / 一張示意圖</div>
  <div class="layer data"><strong>③ Trade-off</strong>　 得到什麼 vs 失去什麼 / 何時不該用</div>
</div>

<br>

<div class="highlight">

**讀法建議**：先看 Why 與 Trade-off，最後才看 How。  
這樣能先建立「這東西在哪」的座標感，再學機制細節。

</div>

---

## TERMS · 常見術語雙語表

| 中文 | English | 縮寫 |
|-----|---------|------|
| 一致性 / 可用性 / 分區容忍 | Consistency / Availability / Partition Tolerance | CAP |
| 線性一致性 | Linearizability | — |
| 最終一致性 | Eventual Consistency | EC |
| 服務層級目標 / 指標 / 協議 | Service Level Objective / Indicator / Agreement | SLO/SLI/SLA |
| 寫入放大 | Write Amplification | WA |
| 變更資料擷取 | Change Data Capture | CDC |
| 內容傳遞網路 | Content Delivery Network | CDN |
| 檢索增強生成 | Retrieval-Augmented Generation | RAG |

<span class="muted">完整術語表見 90-appendix/01_review_cheatsheet.md。</span>

---

## NEXT · 接下來

<span class="kicker">下一份檔案</span>

# 03 · 心智模型
## *系統設計只有 4 個維度：C / A / L / Cost*

<br>

<span class="lead">這 4 個維度貫穿全書。Ch.1 開始後，每個技術選型都會回到它們。</span>
