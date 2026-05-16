---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · Recap'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · RECAP</div>

# Requirements & SLA 收斂
## *把 Ch.2 串成一張需求問卷*


---


## CASE · 客戶說「我要做一個拍賣 App」

# 架構師的第一輪逼問

<div class="stack">
  <div class="layer client"><strong>① 商業</strong>　 怎麼賺錢？廣告？抽成？多少 GMV？</div>
  <div class="layer app"><strong>② 規模</strong>　 DAU? Peak 競標 QPS？單一物件競標人數上限？</div>
  <div class="layer data"><strong>③ SLA</strong>　 競標結束時間誤差容忍？stop bidding 必須準時？</div>
  <div class="layer infra"><strong>④ Extreme</strong>　 熱門物件最後 10 秒流量會是平均 100×？</div>
</div>

<br>

<div class="highlight">

**結論**：拍賣系統 = high write contention + strict timing + spike tolerance。
這不是「再多寫一個 CRUD」——是個需要 Ch.5/Ch.7 的硬骨頭。

</div>

> Source: 整合 Ch.2 + 拍賣業務典型 NFR


---


## RECAP · 第二章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>NFR 量化六問</li>
      <li>9 的對照表（必背）</li>
      <li>複合 SLA 計算法</li>
      <li>容量規劃公式</li>
      <li>極端情況四武器</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>怎麼設計流程？　→ Ch.3</li>
      <li>選什麼技術？　→ Ch.4</li>
      <li>怎麼保證 scalability？　→ Ch.5</li>
      <li>實戰案例？　→ Ch.9</li>
    </ul>
  </div>
</div>


---


<!-- _class: end -->

# Ch.2 完
## *量化能力到手，下一站學流程。*

<br>

<span class="lead">→ Ch.3 Process & App Types</span>
