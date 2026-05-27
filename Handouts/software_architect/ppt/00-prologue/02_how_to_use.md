---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Prologue · How to Use'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">PROLOGUE · HOW TO USE</div>

# 怎麼用這份簡報
## *先讀方法，再讀內容*


---


## HOW · 每張 slide 都是一個決策

<span class="kicker">SLIDE ANATOMY</span>

# 三段節奏

<div class="stack">
  <div class="layer client"><strong>WHY</strong>　 這個決策解決什麼商業問題？</div>
  <div class="layer app"><strong>HOW</strong>　 怎麼做？（表格 / 決策樹 / 步驟）</div>
  <div class="layer data"><strong>TRADE-OFF</strong>　 代價是什麼？什麼時候不該用？</div>
</div>

<br>

<div class="highlight">

讀完一張 slide，問自己三件事：能寫成一句 PRD 嗎？能對 CEO 解釋 ROI 嗎？能對工程師解釋 trade-off 嗎？

</div>

> Source: 課程設計哲學


---


## HOW · 不要硬背名詞

# 架構師的工作是「翻譯」

<div class="def">
<span class="term">向上翻譯（Upward）</span>
把技術細節翻譯成商業價值。<br>
「我們用 Redis cache 把 P99 從 800ms 降到 80ms」→「客戶轉換率提升 12%」
</div>

<div class="def">
<span class="term">向下翻譯（Downward）</span>
把模糊的商業目標翻譯成可執行的技術約束。<br>
「黑色星期五要撐住」→「設計 10× 流量 spike，DB 連線池 200，CDN warm-up」
</div>

<br>

<span class="muted">**這份簡報每一章，都在練這兩種翻譯。**</span>

> Source: `_source/sa_ppt.md` · 課程核心邏輯


---


## HOW · 配合 PDF 深讀

| 想學什麼 | 看簡報 + 讀 PDF |
|---------|---------------|
| 架構師的角色與職涯 | Ch.1 + `SA簡報/S1–S3` |
| 設計流程與 NFR | Ch.2–3 + `S4–S6` |
| 技術選型 | Ch.4 + `S7` |
| 品質屬性與模式 | Ch.5–6 + `S8–S10` + `Design+Patterns.pdf` |
| 系統架構 | Ch.7 + `S11` |
| 進階模式 | Ch.8 + `MicroServices / EventSourcing / CQRS Reading` |
| 實戰演練 | Ch.9 + `S12, S14` |
| 軟實力 | Ch.10 + `S16` |

<br>

<div class="alert">

**反模式**：跳過 Ch.1–2 直接讀 Ch.8 微服務。沒有商業約束的框架，全是過度設計。

</div>

> Source: `SA簡報/` 18 份 PDF 索引


---


<!-- _class: end -->

# How to Use 完
## *方法學完，正式進入第一章。*

<br>

<span class="lead">→ Ch.1 Role & Value</span>
