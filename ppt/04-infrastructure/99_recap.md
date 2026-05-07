---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.4 · Recap'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 04 · TOPIC 99</div>

# Case Study & Recap
## *把 6 個基礎設施串成一個真實系統*

---

## CASE STUDY · 影片上傳 + 轉碼 + 播放

# 設計：6 個基礎設施一次到位

<div class="stack">
  <div class="layer client"><strong>Storage</strong>　 原始影片：S3（presigned upload + multipart）· metadata：PostgreSQL</div>
  <div class="layer app"><strong>Compute</strong>　 上傳完觸發 Lambda → 推 SQS → ECS 跑 ffmpeg 轉碼</div>
  <div class="layer data"><strong>Traffic</strong>　 API Gateway 認證 + 限流 → ALB L7 → ECS Service</div>
  <div class="layer infra"><strong>Delivery</strong>　 轉碼完成寫回 S3 · CloudFront CDN 邊緣分發給觀眾</div>
</div>

<br>

<div class="highlight">

每個元件都對應 Ch.4 的一個 topic。**選型理由說得出來，才算真的會設計**。

</div>

> Source: 整合 Ch.4 全章 + AWS Reference Architecture

---

## CASE STUDY · 選型理由說明

# 為什麼這樣搭

| 元件 | 選擇 | 理由 |
|------|------|------|
| **原始影片** | S3 + Multipart | 大檔（GB 級）· 不可變 · 11 個 9 耐久 |
| **Metadata** | PostgreSQL | 強一致 · 多欄位查詢（用戶、狀態、時間） |
| **上傳觸發** | S3 Event → Lambda | 事件驅動 · 沒有上傳就不花錢 |
| **轉碼** | ECS（Container） | 長任務（&gt; 15 min）· Lambda 上限不夠 |
| **入口** | API Gateway | JWT 認證 + 限流 · 集中管理 |
| **流量分發** | ALB（L7） | HTTP routing · TLS 終止 |
| **觀眾分發** | CloudFront CDN | 全球邊緣快取 · 降原站流量 |

<span class="muted">**為什麼上傳用 Lambda、轉碼用 Container**？因為上傳是事件觸發 + 短任務，轉碼是長計算 + 穩定 batch——**選最合適的工具，不要 all-in 一種**。</span>

> Source: 整合 Ch.4 全章選型決策

---

## RECAP · 第四章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>6 種 DB 選型決策表（含 Vector DB）</li>
      <li>Blob 三模式（Presigned / Multipart / Lifecycle）</li>
      <li>API Gateway 7 件事清單 + BFF 模式</li>
      <li>L4 / L7 LB + 部署拓撲 + Connection Draining</li>
      <li>Container vs Serverless 選型 + Cold Start 數字</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>節點掛了怎麼辦？　→ Ch.5 Reliability</li>
      <li>流量瞬間 10 倍怎麼擋？　→ Ch.5 Overload</li>
      <li>怎麼確保訊息不丟？　→ Ch.5 Reliable Delivery</li>
      <li>系統黑盒裡發生什麼？　→ Ch.5 Observability</li>
    </ul>
  </div>
</div>

---

<!-- _class: end -->

# Ch.4 完
## *基礎設施清楚了，下一站讓系統在故障中存活。*

<br>

<span class="lead">→ Ch.5 Reliability & Ops</span>
