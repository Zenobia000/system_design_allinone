---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.3 · App Type Strategy'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 03 · TOPIC 02</div>

# App Type Strategy
## *Web / Mobile / Service / Console 各自的戰場*


---


## WHY · 為何應用類型決定一切？

<br>

<div class="highlight">

選錯應用類型 = 整個系統打掉重做。

Web App 撐不起即時通訊；
Mobile App 跑不了 batch ETL；
Console 不適合對外服務。

**這是 Day 0 就要鎖定的決策。**

</div>

<br>

- 應用類型 → 決定 deployment / scaling / 安全模型
- 一個系統可以**混合多種類型**（Web 前端 + Service 後端 + Console 排程）
- 重點：每個服務問「使用情境 = ?」

> Source: `S6_Slides.pdf` · §App Type Selection


---


<!-- _class: compact -->

## HOW · 五種應用類型對照

| 類型 | 適用情境 | 部署模式 | 限制 |
|------|---------|---------|------|
| **Web App** | 廣泛存取 · 跨平台 · 內容為主 | 雲端 + CDN | 弱離線、推播限制 |
| **Mobile App** | 高互動 · 定位 · 推播 · 相機 | App Store / Play | 審核週期、版本碎片 |
| **Web API** | 服務化 · 前後端分離 · B2B | API Gateway | 需設計 versioning |
| **Service / Worker** | 背景處理 · ETL · 排程 · 訊息消費 | 容器 / Serverless | 不直接面對 user |
| **Console / CLI** | 內部工具 · DevOps · 一次性腳本 | 本機 / SSH | 沒 UI、權限分散 |

<br>

<span class="muted">**規則**：使用者怎麼用，就選什麼類型。不是「我熟什麼選什麼」。</span>

> Source: `S6_Slides.pdf` · §App Type Matrix


---


## HOW · 決策樹

```
   主要使用者是誰？
   ├─ 終端消費者
   │   ├─ 需要相機/定位/推播 → Mobile App
   │   ├─ 內容瀏覽為主       → Web App + PWA
   │   └─ 跨平台一致體驗     → Hybrid (React Native)
   │
   ├─ 其他系統 (B2B / 內部)
   │   ├─ 同步請求/回應      → Web API (REST / gRPC)
   │   └─ 異步事件處理       → Service / Worker
   │
   └─ 開發者 / 維運
       ├─ 互動式診斷         → Web Admin Console
       └─ 排程 / 一次性       → CLI / Cron Job
```

> Source: `S6_Slides.pdf` · §Decision Tree


---


## HOW · 混合範例：電商系統

<div class="stack">
  <div class="layer client"><strong>Web App</strong>　 顧客端瀏覽 + 結帳（React + CDN）</div>
  <div class="layer app"><strong>Mobile App</strong>　 推播 + 訂單追蹤（iOS / Android）</div>
  <div class="layer data"><strong>Web API</strong>　 商品 / 訂單 / 金流（FastAPI / gRPC）</div>
  <div class="layer infra"><strong>Worker</strong>　 寄信 / 報表 / 庫存同步（Celery）</div>
</div>

<br>

<div class="highlight">

**洞察**：一個業務通常需要 3–5 種應用類型協作。
架構師的工作是**畫出邊界 + 定義接口**。

</div>

> Source: `_source/03_Process_App_Types.md` · §Hybrid Example


---


## TRADE-OFF · 過早承諾 vs 過晚決策

<div class="tradeoff">
  <div class="pro">
    <h3>Day 0 就鎖定的好處</h3>
    <ul>
      <li>選型可以聚焦</li>
      <li>團隊技能可配置</li>
      <li>架構不會半路推倒</li>
      <li>成本可預估</li>
    </ul>
  </div>
  <div class="con">
    <h3>過早承諾的風險</h3>
    <ul>
      <li>需求不清就選 Native iOS → 後悔做不到 Android</li>
      <li>需求變動時改不動</li>
      <li>MVP 階段應留彈性</li>
      <li>市場驗證前不該砸 Native</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：早期就選 Native iOS + Android（兩個團隊）→ 後來發現 Web PWA 就夠。預算燒一半。

</div>

> Source: `S6_Slides.pdf` · §When to Commit


---


<!-- _class: end -->

# App Type Strategy 完
## *類型選好了，下一站講文件紀律。*

<br>

<span class="lead">→ 3.3 Docs as Code</span>
