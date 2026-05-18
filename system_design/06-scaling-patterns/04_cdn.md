---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · CDN'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · TOPIC 04</div>

# CDN
## *把內容推到離使用者 < 50ms 的邊緣*

---

## CDN · WHY + 4 個層級

<div class="highlight">

**沒 CDN**：台灣 → 紐約 RTT 150ms × 數十次 = 數秒延遲。
**有 CDN**：< 50ms 邊緣命中。圖片/影片/CSS/JS/字型 100% 該走，HTML 看靜態程度。

</div>

<div class="stack">
  <div class="layer client"><strong>① Edge POP</strong>　 全球 200+ 點 · 第一層命中（>85%）</div>
  <div class="layer app"><strong>② Mid Tier</strong>　 區域聚合 · 過濾 origin 流量</div>
  <div class="layer data"><strong>③ Origin Shield</strong>　 統一回源點 · 避免 thundering herd</div>
  <div class="layer infra"><strong>④ Origin</strong>　 你的 server / S3</div>
</div>

> Source: 常用技術/10 CDN.pdf · §1-2

---

## CDN · 快取規則 + Invalidation

<div class="tradeoff">
  <div class="pro">
    <h3>強快取 + Hash Busting（推薦）</h3>
    <ul>
      <li><code>max-age=31536000, immutable</code></li>
      <li>檔名 hash <code>main.a3f.css</code> = 改內容 = 換 URL，**永遠不用 invalidate**</li>
      <li>JS / CSS / 字型 / 圖片</li>
    </ul>
  </div>
  <div class="con">
    <h3>短 TTL + 主動 Purge</h3>
    <ul>
      <li><code>no-cache, must-revalidate</code> + ETag → 304</li>
      <li>**Purge API 30 秒到幾分鐘 propagation**（全球 edge 不會瞬間生效）</li>
      <li>HTML / index 頁</li>
    </ul>
  </div>
</div>

<div class="def">
<span class="term">Push vs Pull · Stale-While-Revalidate</span>
**99% 用 Pull**；Push 僅用於可預測爆紅（影片首播）。<br>
**Stale-while-revalidate**：過期 cache 先回，背景去 origin 拉新——origin 不被打爆。
</div>

> Source: 常用技術/10 CDN.pdf · §3-5 Cache & Invalidation

---

## CDN · Edge Compute（CDN 不只是 cache）

<div class="highlight">

CloudFlare Workers / Lambda@Edge / Akamai EdgeWorkers——**在邊緣跑你的程式**。

</div>

| 用途 | 典型範例 |
|------|---------|
| Auth / JWT 驗證 | 無效請求不打 origin |
| A/B 測試分流 | 邊緣決定 variant |
| 個人化 / Geo 路由 | 依使用者地區改 response |
| Bot 防護 / Rate limit | 邊緣擋惡意流量 |
| Image transform | 動態 resize / WebP |

<span class="muted">**Smart routing**：CDN 自己判斷哪條路徑最快——不只地理近，還看實時網路狀況。</span>

> Source: 常用技術/10 CDN.pdf · §6 Edge Compute

---

## CDN · TRADE-OFF

# CDN 不是萬靈丹

<div class="tradeoff">
  <div class="pro">
    <h3>CDN 紅利</h3>
    <ul>
      <li>使用者延遲降到 <50ms</li>
      <li>Origin 頻寬與計算成本降 90%</li>
      <li>DDoS 防護 + WAF（SQL injection / XSS 邊緣擋）</li>
      <li>動態 API 加速（TCP/HTTP3 優化降 30–50% 延遲）</li>
    </ul>
  </div>
  <div class="con">
    <h3>CDN 代價</h3>
    <ul>
      <li>動態內容沒 CDN 加速效益</li>
      <li>Purge propagation 要 30 秒到幾分</li>
      <li>跨 CDN 切換成本高（邊緣規則 vendor lock-in）</li>
      <li>除錯困難（要看 origin / mid / edge 三層）</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：個人化資料（私訊、帳號、推薦）丟 CDN——hit rate 為 0，純浪費。<br>**CDN 只對「多用戶共享同份資料」有意義。**

</div>

> Source: 常用技術/10 CDN.pdf · §8
