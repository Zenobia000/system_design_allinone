---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · Long Tasks'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · TOPIC 02</div>

# Long Running Tasks
## *把「接受請求」和「處理請求」徹底分開*

---

## LONG TASKS · WHY

# 為何長任務需要特殊設計？

<div class="big-number">15min</div>

<br>

**HTTP request timeout 通常 30s · Lambda 上限 15 分鐘**。  
但業務常需更長：報表、ETL、影片轉碼、AI 訓練、資料遷移。

<br>

<div class="alert">

**反模式**：同步處理長任務。  
**結果**：使用者超時看到 504 · server worker 卡死 · retry 重複執行。

</div>

> Source: 設計模式/03 Manage Long Running Tasks.pdf · §問題在哪裡

---

## LONG TASKS · HOW

# 4 個必備機制

<div class="stack">
  <div class="layer client"><strong>① 異步觸發</strong>　 API 立即回 task_id · 實際工作丟 queue 背景處理</div>
  <div class="layer app"><strong>② Checkpointing</strong>　 每 N 步存進度 · 失敗從最近 checkpoint 重啟</div>
  <div class="layer data"><strong>③ 進度查詢</strong>　 client 用 task_id 輪詢 / WebSocket 接 push</div>
  <div class="layer infra"><strong>④ 補償機制</strong>　 失敗時 rollback 已完成的 step（Saga）</div>
</div>

<br>

```
[Client] ─POST→ [API] ─enqueue→ [Queue] ─pop→ [Worker]
   │                                              │
   └──── poll task_id ─→ [State Store] ←─update───┘
```

> Source: 設計模式/03 Manage Long Running Tasks.pdf · §解法的架構

---

## LONG TASKS · 關鍵設計

# Idempotency & Heartbeat & Poison Message

<div class="def">
<span class="term">Idempotency Key</span>
用戶手抖點三次「產生報告」？用 <code>user_id + action + timestamp</code> 當 key，**入 queue 前先查資料庫有沒有這個 key 的 job**——有就回現有 job_id，不重複建。
</div>

<div class="def">
<span class="term">Heartbeat（10–30s）</span>
Worker 定期向 queue 回報「我還活著」。沒心跳 → queue 假設它掛了 → 重新指派 job。**間隔太短浪費頻寬；太長則崩潰偵測慢**。
</div>

<div class="def">
<span class="term">Poison Message</span>
某個 job 永遠失敗，會把整個 worker pool 拖垮（每個 worker 試處理它都死）。**失敗 3–5 次後丟 DLQ**——隔離出來，健康的工作繼續。
</div>

> Source: 設計模式/03 Manage Long Running Tasks.pdf · §防止重複工作 + §處理反覆失敗

---

## LONG TASKS · 編排引擎

# Step Function · Temporal · Airflow 對比

| 引擎 | 模型 | DSL | 強項 | 弱項 |
|------|------|-----|------|------|
| **AWS Step Functions** | State machine | JSON | AWS 託管 · 視覺化 | 鎖死 AWS · DSL 不直觀 |
| **Temporal** | Workflow as code | Go/Java/Python SDK | **自動 retry / replay**·程式語意 | 需自部署 · 學習曲線 |
| **Airflow** | DAG schedule | Python | 社群最大 · 偏批次 ETL | scheduler 是瓶頸 · 重啟慢 |
| **Argo Workflows** | DAG (K8s 原生) | YAML | K8s native · 容器化 | 需 K8s 環境 |

<br>

<div class="highlight">

**Temporal 是現代 long-running 工作流的最強解**——把工作流當程式碼寫，failure / retry / state 全部自動化。**面試答 Step Functions 或 Temporal 都安全**。

</div>

> Source: 設計模式/03 Manage Long Running Tasks.pdf · §協調有依賴關係的 Job

---

## LONG TASKS · 混合工作負載

# 短任務 vs 長任務分流

<div class="alert">

**Head-of-line blocking**：5 秒的 PDF 報告卡在 5 小時的年底報告後面 → 用戶體驗崩潰。

</div>

```yaml
queues:
  fast:                     # 快速 queue
    max_duration: 60s
    worker_count: 50
    instance_type: t3.medium

  slow:                     # 慢速 queue
    max_duration: 6h
    worker_count: 10
    instance_type: c5.xlarge
```

<span class="muted">**策略**：依預期執行時間路由；無法預測就先丟 fast，超時自動移 slow。**autoscale metric 用 queue depth 而不是 CPU**——CPU 飆高時 queue 已經堆積很久了。</span>

> Source: 設計模式/03 Manage Long Running Tasks.pdf · §處理混合工作負載

---

<!-- _class: end -->

# Long Tasks 完
## *接受 fast，處理 slow——下一站講大檔案怎麼直傳，bytes 別走自己 server。*

<br>

<span class="lead">→ 03 Large Blobs</span>
