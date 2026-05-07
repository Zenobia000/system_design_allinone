---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.1 · Networking'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 01 · TOPIC 01</div>

# Networking
## *光速是天花板，物理問題不是工程問題。*

---

## NETWORKING · WHY

<span class="kicker">SECTION 1 · NETWORKING</span>

# 為何網路是天花板？

<br>

<div class="highlight">

**光速是 30 萬 km/s**　·　台北 ↔ 紐約 一趟約 130 ms。
這不是工程問題，是**物理問題**。

</div>

<br>

- 任何「跨地理位置即時同步」的需求，先回頭問物理可行性
- 同一機房內 ~ 0.5 ms RTT；同國跨城市 ~ 10–30 ms；跨洲 ~ 100–200 ms
- 光纖中的光速約為真空 2/3（~200,000 km/s）：**紐約↔倫敦 5,600 km，理論最低 56 ms**
- **架構決策的第一個分水嶺**：可不可以放在使用者附近？

> Source: 基本觀念/01 Networking Essentials.pdf · §區域化和延遲

---

## NETWORKING · HOW

# 協定棧速查

| 層級 | 協定 | 解決什麼 |
|------|------|---------|
| 應用層 | HTTP/1.1 · HTTP/2 · HTTP/3 (QUIC) · gRPC · WebSocket | 訊息語意 |
| 傳輸層 | TCP（可靠、有序）· UDP（快、可丟） | 可靠性與順序 |
| 路由層 | IP · BGP | 跨網段定址 |
| 資料連結 | Ethernet · WiFi · 5G | 物理介質 |
| 補強 | TLS · DNS · CDN | 安全 / 命名 / 加速 |

<br>

<span class="muted">**HTTP/3 + QUIC** 在弱網（行動）下顯著優於 HTTP/2，但伺服器支援度仍在追趕。</span>

> Source: 基本觀念/01 Networking Essentials.pdf · §傳輸層 + 應用層

---

## NETWORKING · TRADE-OFF

# 連線數 vs 延遲 vs 可靠性

<div class="tradeoff">
  <div class="pro">
    <h3>Keep-alive / Connection Pool</h3>
    <ul>
      <li>免去 TCP / TLS handshake 成本</li>
      <li>同一 client 重複請求快 5-10×</li>
      <li>降低伺服器負擔</li>
    </ul>
  </div>
  <div class="con">
    <h3>長連線的代價</h3>
    <ul>
      <li>佔用伺服器 file descriptor</li>
      <li>load balancer sticky session 副作用</li>
      <li>伺服器升級時需 graceful drain</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：行動 App 對每個 API 都新建 HTTPS 連線。TCP 三次握手 1 RTT + TLS 1-2 RTT，弱網下輕鬆吃掉 200 ms。

</div>

> Source: 基本觀念/01 Networking Essentials.pdf · §HTTP keep-alive

---

## NETWORKING · 邊緣加速

# CDN：把資料推到使用者附近

<div class="def">
<span class="term">CDN · Content Delivery Network</span>
全球數百到數千個邊緣節點（edge location），快取靜態資源。<br>
使用者打到「最近的」邊緣，避開跨洲 100+ ms 的物理延遲。
</div>

<br>

- 適用：圖片、影片、JS/CSS、API 回應（短 TTL）
- **區域分片**（regional partitioning）是另一種解法：Uber 把資料按城市切，邁阿密用戶不會查詢紐約司機
- 兩者本質都在解 **資料局部性（data locality）**：把資料放在計算需要它的地方

<div class="highlight">

**經驗法則**：靜態用 CDN、動態用區域分片、跨區同步用 async replication。

</div>

> Source: 基本觀念/01 Networking Essentials.pdf · §CDN + Regional Partitioning

---

## NETWORKING · 故障模式

# 網路不可靠，必須假設它會壞

<div class="stack">
  <div class="layer client"><strong>Timeout + Retry with Exponential Backoff</strong>　 重試前等待，並加入 jitter 抖動避免 thundering herd</div>
  <div class="layer app"><strong>Idempotency Key</strong>　 重試不能重複扣款；寫操作必須冪等</div>
  <div class="layer data"><strong>Circuit Breaker · 三狀態</strong>　 Closed / Open / Half-Open，防止級聯故障</div>
</div>

<br>

<div class="alert">

**面試金句**：「retry with exponential backoff and jitter」、「circuit breaker on downstream calls」——資深訊號。

</div>

> Source: 基本觀念/01 Networking Essentials.pdf · §處理故障和失敗模式

---

<!-- _class: end -->

# Networking 完
## *物理底線知道了——下一步看誰跟誰講話。*

<br>

<span class="lead">→ 1.2 Client-Server</span>
