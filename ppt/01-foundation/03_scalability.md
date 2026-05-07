---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.1 · Scalability'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 01 · TOPIC 03</div>

# Scalability
## *單機撐不住，但別急著分散。*

---

## SCALABILITY · WHY

<span class="kicker">SECTION 3 · SCALABILITY</span>

# 為何單機撐不住？

<div class="big-number">100×</div>

<br>

從 100 用戶到 10,000 用戶 ≠ 加 100 倍 CPU。
有些東西的成本**指數成長**：

- 鎖競爭（Lock contention）：併發數 ↑，等待時間 ↑↑
- Context switch：執行緒數 ↑，CPU 浪費 ↑
- 記憶體頻寬：單機 RAM 有實體上限

<br>

<div class="alert">

**Vertical scaling** 終究會撞牆。問題不是「會不會」，是「什麼時候」。

</div>

> Source: 基本觀念/04 Scalability.pdf · §為什麼重要

---

## SCALABILITY · HOW

# 橫向擴展的三個前提

<div class="stack">
  <div class="layer client"><strong>① Stateless</strong>　 任一台機器都能處理任一請求</div>
  <div class="layer app"><strong>② Shared Storage</strong>　 狀態放外部（DB / Cache / Object Store）</div>
  <div class="layer data"><strong>③ 可路由</strong>　 Load Balancer 知道把流量導去哪</div>
</div>

<br>

```
              ┌─── Server-A ───┐
  Client ─→ LB ── Server-B ───┼──→ Shared DB / Cache
              └─── Server-C ───┘
```

<span class="muted">三個前提缺一不可。沒有 stateless 就沒有自由路由；沒有 shared storage 就沒有一致性。</span>

> Source: 基本觀念/04 Scalability.pdf · §Horizontal Scaling

---

## SCALABILITY · TRADE-OFF

# Up vs Out vs Hybrid

<div class="tradeoff">
  <div class="pro">
    <h3>Scale Up（垂直）</h3>
    <ul>
      <li>實作零成本（換更大機器）</li>
      <li>適合資料庫主節點</li>
      <li>Latency 最低（無網路跳）</li>
    </ul>
  </div>
  <div class="con">
    <h3>Scale Out（水平）</h3>
    <ul>
      <li>無上限（理論）</li>
      <li>但開發成本高（要 stateless）</li>
      <li>Distributed system complexity</li>
    </ul>
  </div>
</div>

<div class="highlight">

**典型策略**：應用層 Scale Out · 資料層 Scale Up（直到撞牆，再 Shard）
**現代硬體很強**：先用 vertical scaling 解掉短期需求，別過早分散。

</div>

> Source: 基本觀念/04 Scalability.pdf · §比較表 + 01 §負載平衡

---

## SCALABILITY · 案例

# 大廠怎麼撐住流量？

<div class="def">
<span class="term">Netflix · 全球串流</span>
應用層全 stateless，跑在 AWS 上彈性擴容；影片內容透過 Open Connect CDN 推到 ISP 機房，避免跨洲頻寬。
</div>

<div class="def">
<span class="term">Uber · 區域分片</span>
按城市切資料：邁阿密的乘客永遠不會匹配紐約的司機。每個區域有自己的 DB，**讓「跨區查詢」變成不存在的問題**。
</div>

<div class="def">
<span class="term">Twitter · Timeline Fan-out</span>
讀請求是寫的 100×，所以 fan-out on write（推送）而非 fan-out on read（拉取）。
</div>

<div class="alert">

**洞察**：規模不是靠「更聰明的演算法」，是靠**消除問題**——分區後跨區互動變零。

</div>

> Source: 整合 基本觀念/04 + 01 §Regional Partitioning

---

<!-- _class: end -->

# Scalability 完
## *規模問題用「消除」解，不是「優化」解——下一步是 API。*

<br>

<span class="lead">→ 1.4 API Design</span>
