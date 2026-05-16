---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.4 · Recap'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 04 · RECAP</div>

# Tech Stack & Data 收斂
## *把選型決策寫成一份 ADR*


---


## CASE · 拍賣 App 的選型決策

# 為什麼是 PostgreSQL + Redis + Python？

| 決策 | 選擇 | 理由 |
|------|------|------|
| 主 DB | PostgreSQL 15 | ACID · 適合金流 · 招人易 |
| Cache | Redis 7 | session + 排行榜 + rate limit |
| 後端 | Python / FastAPI | 團隊熟 · async 夠快 · ML 整合 |
| 前端 | Next.js 14 | SSR for SEO · 大社群 |
| Mobile | React Native | code share with web team |
| 部署 | AWS EKS + Fargate | 既有合約 · 不額外學 |

<br>

<span class="muted">**每個決策都有「為什麼選 X 不選 Y」**——這就是 ADR 該寫的內容。</span>

> Source: 整合 Ch.4 + 拍賣業務典型 stack


---


## RECAP · 第四章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>六維選型評分表</li>
      <li>DB 選型決策樹</li>
      <li>Polyglot 儲存範例</li>
      <li>API contract first 流程</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>怎麼量「品質」？　→ Ch.5</li>
      <li>怎麼拆模組？　→ Ch.6</li>
      <li>分散式怎麼設計？　→ Ch.7</li>
      <li>真實案例？　→ Ch.9</li>
    </ul>
  </div>
</div>


---


<!-- _class: end -->

# Ch.4 完
## *選型完成，下一站量化品質。*

<br>

<span class="lead">→ Ch.5 *-ilities</span>
