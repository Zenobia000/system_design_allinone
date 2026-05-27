---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.3 · Recap'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 03 · RECAP</div>

# Process & App Types 收斂
## *把 SOP + 類型 + 文件，串成第一次 design review*


---


## CASE · 拍賣 App 的 Day 0 設計會議

# 30 分鐘把 Ch.1–3 用一遍

<div class="stack">
  <div class="layer client"><strong>① 角色</strong>　 你是架構師 · 不寫 code · 主導決策</div>
  <div class="layer app"><strong>② NFR</strong>　 5k QPS peak · 99.95% · 競標 timing ±1s</div>
  <div class="layer data"><strong>③ 流程</strong>　 跑六步走到「組件設計」</div>
  <div class="layer infra"><strong>④ 類型</strong>　 Mobile App + Web API + Worker（混合）</div>
  <div class="layer infra"><strong>⑤ 文件</strong>　 PRD + NFR Matrix + ADR-001 (DB) + C4 Level 1</div>
</div>

<br>

<div class="highlight">

**Day 0 產出**：5 份文件、1 張 C4 圖、1 份 ADR——準備進選型階段。

</div>

> Source: 整合 Ch.1–3 + 拍賣業務典型流程


---


## RECAP · 第三章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>六步驟設計 SOP</li>
      <li>應用類型決策樹</li>
      <li>4 種必備文件格式</li>
      <li>ADR 範本</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>選哪個 DB？　→ Ch.4</li>
      <li>哪個語言/框架？　→ Ch.4</li>
      <li>架構品質怎麼量？　→ Ch.5</li>
      <li>怎麼拆模組？　→ Ch.6</li>
    </ul>
  </div>
</div>


---


<!-- _class: end -->

# Ch.3 完
## *流程立了，下一站學選型。*

<br>

<span class="lead">→ Ch.4 Tech Stack & Data</span>
