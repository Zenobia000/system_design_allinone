---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · Queue'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · TOPIC 01</div>

# Queue
## *系統的緩衝、解耦、削峰、重試 — 但不是萬靈丹*

---

## QUEUE · WHY

# 為何要在系統中間加 Queue？

<br>

<div class="highlight">

**Queue 解 4 件事**：  
**① 解耦**（生產 / 消費獨立部署） · **② 削峰**（流量高峰緩衝）  
**③ 容錯**（消費端壞了訊息留著） · **④ 重試**（自動退避 / DLQ）

</div>

<br>

- 場景：訂單事件 → 物流 / 通知 / 數據分析 多個下游
- 沒 Queue 的世界：上游同步呼叫 N 個下游 → 任一個壞 = 整鏈失敗

<div class="alert">

**警告**：在同步工作負載中引入 queue 要特別小心。如果你有 < 500ms 延遲要求，**加上 queue 幾乎一定會破壞它**。

</div>

> Source: 常用技術/07 Queue.pdf · §基本概念

---

## QUEUE · 三大選型

# Kafka vs RabbitMQ vs SQS

| 維度 | Kafka | RabbitMQ | SQS |
|------|-------|----------|-----|
| 模型 | Pub-Sub log | Broker（Exchange + Queue） | Managed queue |
| 吞吐量 | 100k+ msg/s/partition | 10–30k msg/s | 3k msg/s（per queue） |
| 訊息保留 | days/weeks（log） | consume 即刪 | 14 天 max |
| 順序 | **partition 內保序** | 單 queue 保序 | FIFO queue 保序 |
| 重播 | ✓（rewind offset） | ✗ | ✗ |
| 運維 | 重（自管 ZK / KRaft） | 中 | 0（AWS 託管） |

<br>

<span class="muted">**選擇法則**：事件流 / 數據管線用 Kafka；複雜路由 / 工作隊列用 RabbitMQ；簡單異步任務用 SQS（已在 AWS）。Redis Stream 是輕量替代。</span>

> Source: 常用技術/07 Queue.pdf · §常見產品與服務

---

## QUEUE · 核心機制

# 面試會問的 5 個關鍵字

<div class="def">
<span class="term">Partition Key</span>
Queue 透過分區擴展。指定 partition key（例如 user_id）確保**相關訊息存放在同一個分區**——保序的最小單位是 partition，不是整條 queue。
</div>

<div class="def">
<span class="term">Consumer Group</span>
多個 consumer 組成 group 並行消費；同一條訊息**只會被 group 中一個 consumer 處理**。新增 consumer = 拉高吞吐。
</div>

<div class="def">
<span class="term">DLQ（Dead Letter Queue）</span>
失敗達 3-5 次後丟到 DLQ，**避免 poison message 卡死整個 worker pool**。SQS 用 redrive policy；RabbitMQ 用 dead letter exchange。
</div>

<div class="def">
<span class="term">Visibility Timeout / Heartbeat</span>
SQS 的訊息被 pull 後隱藏 N 秒；worker 沒回 ack 就會被別人重試。**10–30s 是合理起點**。
</div>

> Source: 常用技術/07 Queue.pdf · §面試重點 + 設計模式/03 §處理故障

---

## QUEUE · Backpressure

# 反壓 — Queue 最常被忽略的問題

<div class="alert">

**反模式**：以為 queue 可以無限緩衝。  
每秒處理 200 但收到 300 = **永遠處理不完**，queue 只是把問題藏起來。

</div>

<br>

<div class="highlight">

**Backpressure 三招**：  
① **設 queue 深度上限**——滿了就拒絕新訊息回 503  
② **基於 queue depth 自動擴 worker**（不是 CPU usage——等到 CPU 高時 queue 早就堆積了）  
③ **Fast / Slow Queue 分離**——避免長 job 卡住短 job 的 head-of-line blocking

</div>

> Source: 常用技術/07 Queue.pdf · §反壓 + 設計模式/03 §管理 Backpressure

---

## QUEUE · TRADE-OFF

# Queue 帶來的隱性成本

<div class="tradeoff">
  <div class="pro">
    <h3>Queue 紅利</h3>
    <ul>
      <li>上下游解耦 · 獨立 scale</li>
      <li>流量平滑（吸收 burst）</li>
      <li>異步重試降低錯誤率</li>
    </ul>
  </div>
  <div class="con">
    <h3>Queue 代價</h3>
    <ul>
      <li>多一個故障源（broker 壞）</li>
      <li>End-to-end latency 增加</li>
      <li>消費端必須冪等（at-least-once）</li>
      <li>排序、去重變複雜</li>
      <li>運維 + 監控成本</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：QPS 100 加 Kafka。**Kafka 的運維成本 > 你業務本身**，這時 Postgres + LISTEN/NOTIFY 就夠。

</div>

> Source: 常用技術/07 Queue.pdf · §適用場景

---

<!-- _class: end -->

# Queue 完
## *Queue 是緩衝，不是垃圾桶——下一站講長任務怎麼用 queue 做切片。*

<br>

<span class="lead">→ 02 Long Running Tasks</span>
