---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · Logging & Monitoring'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · TOPIC 03</div>

# Logging & Monitoring
## *分散式系統的 debug 救命線*


---


## WHY · 為何單體 print() 在分散式裡會死？

<br>

<div class="highlight">

單體：`print(error)` → 看終端 → 找到問題。
分散式：error 發生在 service C，但 user 是從 A → B → C 進來的。
**沒有串聯，根本不知道 error 屬於哪個請求。**

</div>

<br>

- 多 instance 的 log 是分散的
- 沒 correlation ID = 無法追蹤
- 沒 metric = 不知道系統健康
- 沒 alert = 出事才知道

> Source: `S11_Slides.pdf` · §Distributed Debug


---


## HOW · 觀測性三件套

| 維度 | 內容 | 工具 |
|------|------|------|
| **Logs** | 何時 / 誰 / 做了什麼 | ELK · Loki · CloudWatch |
| **Metrics** | 數字趨勢 · QPS / latency / error rate | Prometheus · Datadog |
| **Traces** | 一個請求跨服務的時間線 | Jaeger · Tempo · X-Ray |

<br>

<div class="highlight">

**口訣**：**Log 告訴你發生什麼；Metric 告訴你健不健康；Trace 告訴你卡在哪**。
三者缺一個就 debug 不全。

</div>

> Source: `S11_Slides.pdf` · §Observability Triad


---


## HOW · Correlation ID（救命的繩子）

```
   User 發請求 → API Gateway 生 correlation ID = abc123
                                       ↓
            ┌──────────┐    ┌──────────┐    ┌──────────┐
            │ Service A │ → │ Service B │ → │ Service C │
            └──────────┘    └──────────┘    └──────────┘
                 ↓               ↓               ↓
              log abc123      log abc123      log abc123

   出事時：grep abc123 → 一條 trace 完整顯示哪一步壞掉
```

<br>

<span class="muted">**鐵律**：任何分散式系統的 log 第一個 column 必須是 correlation ID。</span>

> Source: `S11_Slides.pdf` · §Correlation ID


---


## HOW · 該追什麼 metric？

<div class="stack">
  <div class="layer client"><strong>① Golden Signals</strong>　 Latency · Traffic · Errors · Saturation</div>
  <div class="layer app"><strong>② Per-endpoint</strong>　 每個 API 的 P50/P99/error rate</div>
  <div class="layer data"><strong>③ Per-dependency</strong>　 DB / Redis / 外部 API 的健康狀態</div>
  <div class="layer infra"><strong>④ Business KPI</strong>　 訂單成功率 / 結帳轉換 / 註冊轉換</div>
</div>

<br>

<div class="alert">

**反模式**：監控 200 個 metric 但沒有 alert——出事仍然不知道。**alert 才是真正的「監控」**。

</div>

> Source: `S11_Slides.pdf` · §What to Monitor


---


## TRADE-OFF · 日誌完整 vs 成本

<div class="tradeoff">
  <div class="pro">
    <h3>該記</h3>
    <ul>
      <li>所有 error + stacktrace</li>
      <li>關鍵業務事件（訂單成立 / 支付）</li>
      <li>外部 API 呼叫的 req/res</li>
      <li>權限敏感操作（登入 / 變更）</li>
    </ul>
  </div>
  <div class="con">
    <h3>不該記</h3>
    <ul>
      <li>每個 200 OK 的 access log（用 metric）</li>
      <li>使用者密碼 / token</li>
      <li>個資（避免 GDPR 違規）</li>
      <li>大型 payload 全文</li>
    </ul>
  </div>
</div>

<div class="highlight">

**洞察**：日誌成本可能比運算還貴（每月 TB 級 ingestion）。
**Sampling + 結構化日誌 + 分級保留**是必修。

</div>

> Source: `S11_Slides.pdf` · §Logging Cost


---


<!-- _class: end -->

# Logging & Monitoring 完
## *三件套到手，章末收斂。*

<br>

<span class="lead">→ Ch.7 Recap</span>
