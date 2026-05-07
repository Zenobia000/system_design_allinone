---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Reliability & Ops'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05</div>

# Reliability & Ops
## *系統故障是常態，怎麼讓使用者感覺不到*

<!--
開場 30 秒：
- Ch.1-4 解決「系統能跑」；Ch.5 解決「系統在出錯時還能跑」
- 5 個關鍵字：Lock（並發爭用）· Contention · Overload · Reliable Delivery · Observability
- 講者語氣：嚴肅，因為這章的失敗都會上新聞
-->

---

## OBJECTIVES · 學習目標

看完本章，你能回答：

<div class="stack">
  <div class="layer client"><strong>① 分散式鎖怎麼安全實作？</strong>　 fencing token · Redlock 為何爭議</div>
  <div class="layer app"><strong>② 爭用如何拖垮系統？</strong>　 Pessimistic vs Optimistic vs SERIALIZABLE vs 2PC vs Saga</div>
  <div class="layer data"><strong>③ 流量爆炸怎麼擋？</strong>　 6 層防線：Rate / Concurrency / Queue / Auto-scale / Shed / Backpressure</div>
  <div class="layer infra"><strong>④ 訊息要怎麼「絕對」送到？</strong>　 Timeout · Retry · Idempotency · Backoff · Failover · Fallback</div>
  <div class="layer infra"><strong>⑤ 黑盒怎麼變透明？</strong>　 三支柱 + 四金信號 + SLO/Error Budget</div>
</div>

> Source: 常用技術/09 + 維運與可靠性/01 + 02 + 03 + 04

---

## MENTAL MODEL · 可靠性的 5 個層次

```
┌──────────────────────────────────────────────────┐
│  ⑤ OBSERVE     Logs · Metrics · Traces           │  ← Ch.5.5
├──────────────────────────────────────────────────┤
│  ④ DELIVER     Retry · Idempotency · DLQ         │  ← Ch.5.4
├──────────────────────────────────────────────────┤
│  ③ PROTECT     Rate limit · Circuit breaker · LB │  ← Ch.5.3
├──────────────────────────────────────────────────┤
│  ② COORDINATE  Lock · Lease · Quorum             │  ← Ch.5.1
├──────────────────────────────────────────────────┤
│  ① CONTAIN     Bulkhead · Timeout · Backpressure │  ← Ch.5.2
└──────────────────────────────────────────────────┘
       由內向外，從爭用控制到全局可觀測
```

<span class="muted">**Reliability 不是單點優化**，而是 5 層交織。任何一層缺失都會讓系統在壓力下崩潰。</span>

> Source: 整理自 常用技術/09 + 維運與可靠性/01-04

---

## MENTAL MODEL · 故障是常態，不是例外

<div class="highlight">

**伺服器會崩潰、網路會丟包、資料庫會變慢、第三方服務會抖動。**
把每個依賴的故障概率乘起來，加上每天幾百萬個請求 → **故障在統計上就是必然發生的事**。

</div>

<br>

<div class="def">
<span class="term">真正的問題</span>
不是「如何防止故障」，而是「故障發生時，你的系統如何優雅應對」。
</div>

<br>

<span class="muted">本章 5 個主題不是孤立的工具箱，而是**互相依存的防線**：每一個都建立在前一個的基礎上。</span>

> Source: 維運與可靠性/03 Reliable Delivery.pdf · §1 開篇

---

<!-- _class: end -->

# Overview 完
## *先進入第一道防線：分散式鎖。*

<br>

<span class="lead">→ 5.1 Distributed Lock</span>
