---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · SD Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · TOPIC 02</div>

# SD 邊界
## *跟哪些人打交道·誰主導什麼*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# SD 上下游關係

```
       Architect（系統邊界 + NFR）
              │
              ▼
        ┌──────────┐
        │    SD    │ ← 你在這
        └──────────┘
              │
        ┌─────┼─────┬──────┐
        ▼     ▼     ▼      ▼
       Dev   DBA   QA    DevOps
```

<span class="muted">**上游**：架構決策。**下游**：所有要 implement 的角色。SD 是**設計與實作的橋**。</span>

> Source: _source/braindump.md · §責任鏈


---


## BOUNDARY · SD vs Architect

<div class="tradeoff">
  <div class="pro">
    <h3>Architect = 城市規劃師</h3>
    <ul>
      <li>系統級、跨服務級</li>
      <li>長期演進、NFR</li>
      <li>「拆幾個 service」</li>
      <li>「同步還是非同步」</li>
      <li>不寫 endpoint 細節</li>
    </ul>
  </div>
  <div class="con">
    <h3>SD = 建築設計師</h3>
    <ul>
      <li>模組級、API 級</li>
      <li>開發落地</li>
      <li>「endpoint 怎麼命名」</li>
      <li>「sequence 怎麼跑」</li>
      <li>不決定服務拆不拆</li>
    </ul>
  </div>
</div>

<span class="muted">**口訣**：Architect 定**邊界**、SD 定**細部設計**。SD 在架構師畫的框內把細節補滿。</span>

> Source: _source/braindump.md · §SD vs Architect


---


<!-- _class: compact -->

## BOUNDARY · SD vs Dev

| 面向 | SD | Dev |
|---|---|---|
| **動作** | 寫文件 | 看文件 implement |
| **關心** | 模組怎麼切、契約一致 | 邏輯正確、效能、unit test |
| **產出** | Design Doc / OpenAPI | 可執行的 code |
| **時機** | Coding 之前 | Coding 之中 |
| **判斷標準** | Dev 看完不用問問題 | 跑得起來、過測試 |

<br>

<span class="muted">**陷阱**：小團隊 SD 跟 Dev 同一人 → 容易跳過設計直接 coding → 後面修不動。</span>

> Source: _source/braindump.md · §SD · System Design


---


<!-- _class: compact -->

## BOUNDARY · 誰主導什麼

| 決策 | 主導角色 | 旁邊配合 |
|---|---|---|
| 服務拆幾個 | Architect | SD 落地細部 |
| API endpoint 命名 | **SD** | Architect 看一致性 |
| Module 切分 | **SD** | Architect review |
| Sequence Diagram | **SD** | SA 提供業務流程 |
| Class 結構 | **SD** | Dev 微調實作細節 |
| 錯誤碼設計 | **SD** | QA / Dev 補例外 |
| DB schema 細節 | DBA | SD 提供需求 |
| 演算法實作 | Dev | SD 不碰 |

<span class="muted">**陷阱**：SD 越界寫實作邏輯 → Dev 沒空間；SD 不寫 sequence → Dev 各寫各的。</span>

> Source: _source/braindump.md · §SD 經典產出


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：Architect 說「Order Service 獨立」，SD 怎麼接？

</div>

**新手 SD 會這樣回**：「OK，我畫個 module 圖。」
→ 一張圖、沒 endpoint、沒 sequence、Dev 看完還要問三天。

**成熟 SD 會這樣拆**：
- **拆 API**：`POST /orders`（建單）/ `POST /orders/{id}/cancel`（取消）/ `POST /orders/{id}/refund`（退款）
- **畫 sequence**：建單 → 鎖庫存 → 發 OrderCreated event → Payment 訂閱
- **定錯誤碼**：`OUT_OF_STOCK` / `PAYMENT_PENDING` / `ALREADY_CANCELLED`
- **寫 module**：`order-api` / `order-domain` / `order-event-publisher`

<br>

<span class="muted">**這就是 SD 的價值**：把一句話的架構決策，拆成 Dev 拿著就能開工的細部圖。</span>

> Source: _source/braindump.md · §SD vs Architect


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 6.99 Recap</span>
