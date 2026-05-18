---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.11 · Three Views'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 11 · TOPIC 03</div>

# 三層 Flow 翻譯
## *User Flow → System Flow → Architecture Flow*


---


## VIEWS · WHY

<span class="kicker">SECTION 1 · WHY</span>

# 為什麼一個需求要畫三次圖？

<br>

<div class="highlight">

**因為每一層要回答的問題不一樣**：
- **User Flow**：使用者怎麼走？
- **System Flow**：系統怎麼判斷與處理？
- **Architecture Flow**：服務、資料、事件、部署怎麼互動？

很像你把中文翻成英文，再翻成機器語言。
**每翻一次，都會暴露新的問題。**

</div>

> Source: _source/braindump.md · §三層 flow 翻譯


---


<!-- _class: compact -->

## VIEWS · 三層對照

| Flow | 回答 | 主導 | 用什麼畫 |
|---|---|---|---|
| **User Flow** | 使用者怎麼走？ | PM / UX | 流程圖 / Wireframe Flow |
| **System Flow** | 系統怎麼判斷與處理？ | SA | UML Activity / State Diagram |
| **Architecture Flow** | 服務 / 資料 / 事件怎麼跑？ | Architect | C4 / Sequence / Deployment |

<br>

<span class="muted">**三張圖不是誰取代誰**，是同一個需求的**三種翻譯**。每翻一次就降低一層不確定性。</span>

> Source: _source/braindump.md · §三層 flow 翻譯


---


## VIEWS · 同一個需求三種畫法

# 需求：「使用者結帳付款」

```
User Flow（PM / UX）：
  購物車 → 結帳 → 選付款方式 → 完成

System Flow（SA）：
  檢查庫存 → 鎖定庫存 → 建立訂單 → 呼叫金流
  → 若成功 → 扣款 → 訂單 paid 狀態
  → 若失敗 → 釋放庫存 → 訂單 cancelled

Architecture Flow（Architect）：
  Web ──► API GW ──► Order Service ──► Payment Service
                          │                    │
                          ▼                    ▼
                   Inventory Service     [3rd Party PG]
                          │
                          ▼
                       Kafka → Notification Service
```

> Source: _source/braindump.md · §訂單系統實例


---


## VIEWS · 何時畫哪張

<div class="tradeoff">
  <div class="pro">
    <h3>畫 User Flow 的時機</h3>
    <ul>
      <li>產品早期、概念驗證</li>
      <li>對齊 PM / UX / 業務</li>
      <li>說服老闆 / 業務</li>
      <li>避免「沒人會用」</li>
      <li>使用者測試前</li>
    </ul>
  </div>
  <div class="con">
    <h3>畫 Architecture Flow 的時機</h3>
    <ul>
      <li>進入技術設計階段</li>
      <li>跟 Dev / DBA 對齊</li>
      <li>評估流量 / 成本</li>
      <li>選技術 / 切服務</li>
      <li>找風險點</li>
    </ul>
  </div>
</div>

<span class="muted">**System Flow 卡在中間**——它讓上下游能對話。**新手最容易省略這層**，結果上下游各說各話。</span>

> Source: _source/braindump.md · §SA · System Analyst


---


<!-- _class: end -->

# Three Views 完
## *翻譯講完，看真實衝突場景。*

<br>

<span class="lead">→ 11.4 Conflict Cases</span>
