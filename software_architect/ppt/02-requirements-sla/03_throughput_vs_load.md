---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · Throughput vs Load'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · TOPIC 03</div>

# Throughput vs Load
## *處理速度 vs 崩潰極限——為黑五設計*


---


## WHY · 兩個指標常被混為一談

<br>

<div class="highlight">

**Throughput**（吞吐量）：穩態下每秒處理多少請求。
**Load**（負載）：系統開始降級之前能承受的上限。

吞吐 5k QPS ≠ 撐得住 5k QPS 持續一小時。

</div>

<br>

- 廠商行銷數字通常是 **burst throughput**，不是 sustained
- 真實上線：要看 **P99 latency 不爆** 的最大流量
- 黑五 / 雙 11 = 平日 10–30 倍 → 必須**事前壓測**

> Source: `S5_Slides.pdf` · §Throughput vs Load


---


## HOW · 三種流量曲線

| 曲線類型 | 特徵 | 設計重點 |
|---------|------|---------|
| **穩態** | 24 小時平均 ±20% | 容量規劃用 average + 50% |
| **日週期** | 工作時間高、夜間低 | LB + auto-scale，無需 over-provision |
| **尖峰突發** | 黑五 / 廣告投放 / 病毒事件 | **預先擴容 + 限流 + 降級** |

<br>

<div class="alert">

**反模式**：用過去 7 天平均 QPS 規劃容量——黑五當天 10× 流量打進來，系統雪崩。

</div>

> Source: `_source/02_Requirements_SLA.md` · §Traffic Patterns


---


## HOW · 容量規劃公式

```
   Peak QPS  =  DAU × 平均行為次數 / 86400  ×  Peak 倍率
   ─────────────────────────────────────────────────
   例：100k DAU × 30 次/天 / 86400 × 3 (peak)
       ≈ 100 QPS 平均 → 300 QPS peak

   容量目標 =  Peak × 2 (safety margin)
   ─────────────────────────────────────────────────
       300 QPS × 2 = 600 QPS 容量上限
```

<br>

<div class="highlight">

**面試金句**：「我會規劃 2× peak 容量，超過用限流 + 排隊，極端情況降級非核心功能」。

</div>

> Source: `S5_Slides.pdf` · §Capacity Planning


---


## HOW · 極端情況四個武器

<div class="stack">
  <div class="layer client"><strong>① Auto-Scaling</strong>　 提前 10 分鐘擴容（不是即時）</div>
  <div class="layer app"><strong>② Rate Limiting</strong>　 token bucket · 防止單一 client 打爆</div>
  <div class="layer data"><strong>③ Circuit Breaker</strong>　 後端慢 → 快速失敗 · 避免級聯</div>
  <div class="layer infra"><strong>④ Graceful Degradation</strong>　 流量爆 → 關推薦、關搜尋建議</div>
</div>

<br>

<span class="muted">**Linus 哲學**：不要假設流量會均勻——準備接受**最壞情況**的設計才能上線。</span>

> Source: `S5_Slides.pdf` · §Extreme Cases


---


## TRADE-OFF · Over-provisioning 該做多少？

<div class="tradeoff">
  <div class="pro">
    <h3>多備容量（safety margin 高）</h3>
    <ul>
      <li>意外流量不雪崩</li>
      <li>P99 穩定</li>
      <li>不必半夜起來擴容</li>
      <li>客戶體驗一致</li>
    </ul>
  </div>
  <div class="con">
    <h3>多備容量的代價</h3>
    <ul>
      <li>常態 CPU 用量 < 20%</li>
      <li>雲端帳單翻倍</li>
      <li>資源閒置浪費</li>
      <li>需配合 auto-scale 降本</li>
    </ul>
  </div>
</div>

<div class="highlight">

**業界做法**：穩態 30–40% CPU 用量；peak 70–80%；超過 → auto-scale 介入。
這是「**便宜又活得下來**」的平衡點。

</div>

> Source: `S5_Slides.pdf` · §Provisioning Best Practice


---


<!-- _class: end -->

# Throughput vs Load 完
## *容量算清楚了，整章收斂。*

<br>

<span class="lead">→ Ch.2 Recap</span>
