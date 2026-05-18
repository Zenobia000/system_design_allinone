---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Observability'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · TOPIC 05</div>

# Observability
## *你不能修復你看不見的東西*

---

## OBSERVABILITY · WHY

# 為何「能登入」不等於「能用」？

<br>

<div class="highlight">

**Monitoring 告訴你「壞了沒」**（已知問題的告警）。
**Observability 告訴你「為什麼壞」**（任意問題都能 debug）。
**沒有 Observability，分散式系統就是黑盒**——你不知道請求死在哪。

</div>

<br>

<span class="muted">PDF 開場：週五晚某個服務 response time 從 200ms 跳到 8 秒。是 DB 慢？下游 API 掛？新部署的 bug？流量爆增？**你不知道，你像在黑暗中摸索**。</span>

> Source: 維運與可靠性/04 Observability.pdf · §1 開場

---

## OBSERVABILITY · 三支柱

# Logs · Metrics · Traces

<div class="matrix-2x2">
  <div class="featured">
    <strong>Metrics（時序聚合）</strong>
    系統<strong>狀態如何</strong>？趨勢是什麼？<br>
    QPS · latency · error rate · Prometheus
  </div>
  <div>
    <strong>Logs（離散事件）</strong>
    這個事件<strong>發生了什麼</strong>？<br>
    結構化 JSON · 帶 trace_id · ELK / Loki
  </div>
  <div>
    <strong>Traces（請求鏈路）</strong>
    請求<strong>走了哪裡 · 哪段慢</strong>？<br>
    一個請求穿過 N 個服務 · OpenTelemetry
  </div>
  <div>
    <strong>Profiles（CPU 火焰圖）</strong>
    第四支柱（新興）<br>
    Continuous profiling
  </div>
</div>

<span class="muted">**三支柱要互相串聯**：log 帶 trace_id、metric 標 service name、trace 採異常請求 → 點 trace_id 跳到對應 logs。</span>

> Source: 維運與可靠性/04 Observability.pdf · §2 三支柱

---

## OBSERVABILITY · Metric 三型

# Counter · Gauge · Histogram

<div class="def">
<span class="term">Counter（計數器）</span>
**只會單調遞增**：HTTP 請求總數、錯誤總數。看的不是值本身，是**增長速率**（每秒新增多少）。
</div>

<div class="def">
<span class="term">Gauge（儀表）</span>
**可上下浮動**：當前記憶體使用、連線池使用數、佇列深度。代表某個時間點的即時狀態。
</div>

<div class="def">
<span class="term">Histogram（直方圖）</span>
**值分桶統計分佈**：用來計算延遲百分位數。<br>
"P99 延遲 = 450ms" 就是從 Histogram 算出，把所有延遲放桶裡，排第 99 百分位的那個值。
</div>

> Source: 維運與可靠性/04 Observability.pdf · §2 Metrics 類型

---

## OBSERVABILITY · 四金信號

# Google SRE 的監控基本盤

<div class="stack">
  <div class="layer client"><strong>① Latency（延遲）</strong>　 要區分**成功**請求和**失敗**請求的延遲（快速失敗 vs 緩慢成功意義完全不同）</div>
  <div class="layer app"><strong>② Traffic（流量）</strong>　 每秒多少請求，衡量系統負載的基準</div>
  <div class="layer data"><strong>③ Errors（錯誤率）</strong>　 區分**顯性錯誤**（HTTP 500）和**隱性錯誤**（回 200 但內容是錯的）</div>
  <div class="layer infra"><strong>④ Saturation（飽和度）</strong>　 系統還有多少餘裕？CPU / 記憶體 / 磁碟，越接近上限越脆弱</div>
</div>

<br>

<span class="muted">**面試一句話**：「我會暴露 Prometheus metrics，監控四個黃金信號：延遲（P99）、流量（RPS）、錯誤率（5xx 比例）、飽和度（CPU / 記憶體使用率）。」</span>

> Source: 維運與可靠性/04 Observability.pdf · §四個黃金信號

---

## OBSERVABILITY · 警告反模式

# 對症狀警告，不對原因警告

<div class="alert">

**反模式 · 對原因警告**：CPU 超 80% 警告、記憶體超 70% 警告。
**結果**：警告太多，但不一定代表用戶有感受到問題 → **alert fatigue（警告疲勞）** → 工程師開始忽略警告。

</div>

```yaml
# 不好：對原因警告
- alert: HighCPU
  expr: cpu_usage > 0.8
  # CPU 高不一定代表用戶有問題

# 好：對症狀警告
- alert: HighErrorRate
  expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.01
  annotations:
    summary: "錯誤率超過 1%，用戶正在受到影響"
```

<span class="muted">**判斷標準**：用戶有沒有感受到問題？沒有就不該叫醒工程師。</span>

> Source: 維運與可靠性/04 Observability.pdf · §對症狀警告

---

## OBSERVABILITY · 排查順序

# Metrics → Traces → Logs

```
1. Metrics 警告觸發
   "P99 延遲從 200ms 升到 2 秒"
        ↓
2. 查 Traces 找到慢的請求
   "這些慢請求都卡在 Order Service 的 DB Query"
        ↓
3. 查 Logs 找到具體原因
   "Order Service 在這段時間有大量 'slow query: 1.8s' 的 warning log"
        ↓
結論：Order Service 有個 SQL 查詢沒用到索引
```

<div class="highlight">

**三者搭配才是完整排查流程**：Metrics 是觀察儀表板（先發現），Traces 縮範圍（哪個服務 / 操作），Logs 給細節（具體錯誤）。

</div>

> Source: 維運與可靠性/04 Observability.pdf · §三者如何互補

---

## OBSERVABILITY · Cardinality 反模式

# 標籤爆炸殺死 Prometheus

<div class="alert">

**反模式**：metric 加 `user_id` 當 label → 1000 萬用戶 → **1000 萬條時序**，記憶體爆炸、查詢龜速。
Prometheus、Datadog 等都對 cardinality 有上限，超過就拒絕寫入或破產。

</div>

<br>

| 維度 | 適合做 metric label | 適合放 log / trace |
|------|---------------------|-------------------|
| `service`, `endpoint`, `method`, `status_code` | ✓ 數量有限 | — |
| `region`, `tenant_id`（少量大客戶） | ✓ | — |
| `user_id`, `request_id`, `trace_id`, `email` | ✗ 高 cardinality | ✓ 放 log / trace |

<span class="muted">**規則**：label 的 unique 值估計超過幾千個就要警惕；超過幾萬個必爆。需要 per-user 分析？放 log 用 ES / Loki 查。</span>

> Source: 維運與可靠性/04 Observability.pdf · §Metrics 設計（補強重點）

---

## OBSERVABILITY · Tail-Based Sampling

# 全採樣太貴 · Head-based 採樣會漏 bug

<div class="tradeoff">
  <div class="pro">
    <h3>Head-based Sampling</h3>
    <ul>
      <li>請求一進來就決定採不採（隨機 1%）</li>
      <li>實作簡單、開銷低</li>
      <li>**問題**：隨機 1% 大概率採不到那個慢請求</li>
    </ul>
  </div>
  <div class="con">
    <h3>Tail-based Sampling（業界做法）</h3>
    <ul>
      <li>所有 trace 收集到記憶體 buffer</li>
      <li>只保留**錯誤的、慢的、重要的**</li>
      <li>正常請求按 1% 採</li>
      <li>比 head-based 聰明 10 倍</li>
    </ul>
  </div>
</div>

<span class="muted">**Log 取樣策略**：對 INFO level 取樣 10-20%，**ERROR / WARN 永遠 100% 保留**；設 TTL（30-90 天）；只對關鍵欄位（service、user_id、trace_id、level）建索引，不全文索引（Loki 模式）。</span>

> Source: 維運與可靠性/04 Observability.pdf · §採樣 + Log 量太大

---

## OBSERVABILITY · SLI / SLO / SLA

# 三個被混淆的概念

<div class="def">
<span class="term">SLI · Service Level Indicator</span>
你用來衡量服務品質的具體**指標**。例：「成功請求的比例」、「P99 延遲」。SLI 就是一個 metric。
</div>

<div class="def">
<span class="term">SLO · Service Level Objective</span>
你對 SLI 設定的**目標值**（內部承諾）。例：「成功率 ≥ 99.9%」、「P99 ≤ 500ms」。決定是否觸發警告、是否要放慢發布。
</div>

<div class="def">
<span class="term">SLA · Service Level Agreement</span>
你對**外部客戶承諾的合約**，通常比內部 SLO 寬鬆。內部 SLO 99.9%，對外 SLA 可能 99.5% 留緩衝。
</div>

<span class="muted">**目前狀態：SLI > SLO > SLA**，一切正常。</span>

> Source: 維運與可靠性/04 Observability.pdf · §SLI SLO SLA

---

## OBSERVABILITY · Error Budget

# 把可靠性變成可以討論的數字

<div class="big-number">43 min</div>

**SLO 99.9% → 每月允許停機 0.1% × 30 天 × 24h × 60min = 約 43 分鐘**

<br>

<div class="tradeoff">
  <div class="pro">
    <h3>錯誤預算還充足</h3>
    <ul>
      <li>可以繼續快速發布新功能</li>
      <li>承擔風險的空間還在</li>
    </ul>
  </div>
  <div class="con">
    <h3>錯誤預算快耗盡</h3>
    <ul>
      <li>放慢發布節奏</li>
      <li>優先修復可靠性問題</li>
    </ul>
  </div>
</div>

<span class="muted">**反模式**：SLO 設 100%。意味永遠不能做任何可能影響穩定性的改動，包括發新功能。**通常從 99.9% 開始**，根據業務敏感度調整。</span>

> Source: 維運與可靠性/04 Observability.pdf · §Error Budget

---

## OBSERVABILITY · USE / RED Method

# 兩個常用的指標方法論

<div class="tradeoff">
  <div class="pro">
    <h3>USE Method（資源視角）</h3>
    <ul>
      <li><strong>U</strong>tilization：使用率（CPU / 記憶體 / 磁碟）</li>
      <li><strong>S</strong>aturation：飽和度（隊列深度 / 等待時間）</li>
      <li><strong>E</strong>rrors：錯誤計數</li>
      <li>適合監控**基礎設施**（Brendan Gregg 提出）</li>
    </ul>
  </div>
  <div class="con">
    <h3>RED Method（請求視角）</h3>
    <ul>
      <li><strong>R</strong>ate：請求速率（RPS）</li>
      <li><strong>E</strong>rrors：錯誤率</li>
      <li><strong>D</strong>uration：延遲分佈</li>
      <li>適合監控**服務 / API**（Tom Wilkie 提出）</li>
    </ul>
  </div>
</div>

<span class="muted">**搭配**：四金信號 ≈ RED + Saturation。對 service 用 RED，對 host / pod 用 USE，組合起來覆蓋全棧。</span>

> Source: 維運與可靠性/04 Observability.pdf · §補充（業界共識）

---

<!-- _class: end -->

# Observability 完
## *五道防線都有了，看一個 incident 怎麼把它們串起來。*

<br>

<span class="lead">→ 5.6 Recap & Case Study</span>
