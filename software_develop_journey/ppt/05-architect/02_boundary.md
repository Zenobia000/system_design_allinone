---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Architect Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · TOPIC 02</div>

# Architect 邊界
## *跟哪些人打交道·誰主導什麼*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# Architect 上下游關係

```
       PM / SA（業務需求 + 規則）
              │
              ▼
        ┌────────────┐
        │  Architect │ ← 你在這
        └────────────┘
              │
        ┌─────┼─────┬──────┐
        ▼     ▼     ▼      ▼
       SD    DBA   DevOps  Dev
```

<span class="muted">**上游**：商業 + 業務規則。**下游**：所有交付角色。架構師是**技術決策的單點責任**。</span>

> Source: _source/braindump.md · §責任鏈


---


<!-- _class: compact -->

## BOUNDARY · 容易搞混的角色

| 角色 | 跟 Architect 差在哪 |
|---|---|
| **SA** | 管「系統應該做什麼」（功能 / 規則）；Architect 管「系統怎麼活下去」 |
| **SD** | 模組級 / API 級的設計；Architect 是系統級 / 跨服務級 |
| **CTO** | 對外代表技術 + 招募 + 戰略；Architect 對內負責落地架構 |
| **Tech Lead** | 帶單一團隊技術 + code review；Architect 跨團隊、跨服務 |
| **Dev** | 寫 code 實作；Architect 不寫產品 code，只寫 PoC |

<br>

<span class="muted">**口訣**：SA 定規則、**Architect 定邊界**、SD 定細部。三個層次別搞混。</span>

> Source: _source/braindump.md · §SA vs Architect


---


## BOUNDARY · SD vs Architect

<div class="tradeoff">
  <div class="pro">
    <h3>Architect = 城市規劃師</h3>
    <ul>
      <li>住宅區 / 商業區怎麼分</li>
      <li>捷運主幹線怎麼走</li>
      <li>水電總管怎麼接</li>
      <li>系統級、跨服務、長期演進</li>
      <li>關心 NFR 與邊界</li>
    </ul>
  </div>
  <div class="con">
    <h3>SD = 建築設計師</h3>
    <ul>
      <li>每層樓怎麼配置</li>
      <li>管線怎麼走、門窗在哪</li>
      <li>樓梯與房間功能</li>
      <li>模組級、API 級、開發可落地</li>
      <li>關心 module 與 contract</li>
    </ul>
  </div>
</div>

<span class="muted">**關鍵**：城市規劃師畫不出每層平面圖，建築師也決定不了捷運該不該蓋。兩者**互補不互換**。</span>

> Source: _source/braindump.md · §SD vs Architect


---


<!-- _class: compact -->

## BOUNDARY · 誰主導什麼

| 決策 | 主導角色 | 旁邊配合 |
|---|---|---|
| 服務邊界（拆幾個 service） | **Architect** | SA 提供業務切點 |
| 技術選型（DB / MQ / Cache） | **Architect** | DBA / DevOps 評估 |
| 資料擁有權（誰能寫某張表） | **Architect** | DBA 落地 |
| 同步 / 非同步通訊 | **Architect** | SD 細化 sequence |
| 部署策略（單體 / 容器 / K8s） | **Architect** | DevOps 主導落地 |
| API endpoint 命名 | SD | Architect 不碰 |
| Schema 欄位細節 | DBA | Architect 只看主鍵與關聯 |

<span class="muted">**陷阱**：架構師越界寫 API 細節 → SD 沒空間；不越界又不出手 → 系統長歪。</span>

> Source: _source/braindump.md · §架構師核心工作


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：PM 說「客戶要即時通知」，Architect 會問什麼？

</div>

**新手會這樣回**：「OK，我畫個 Kafka + WebSocket 架構圖。」
→ 還沒搞清楚問題就先選技術。

**成熟 Architect 會這樣問**：
- 多即時？1 秒、10 秒、1 分鐘？SLA 寫死了嗎？
- 量級？10 個用戶還是 100 萬同連？
- 失敗了會怎樣？漏一則通知用戶會死人嗎？
- 預算？多花 5 台機器跑 Kafka 老闆肯嗎？

<br>

<span class="muted">**這就是架構師的價值**：把「即時」翻成 **latency + throughput + reliability + cost** 四個可決策的數字。</span>

> Source: _source/braindump.md · §架構師收到需求怎麼做


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 5.99 Recap</span>
