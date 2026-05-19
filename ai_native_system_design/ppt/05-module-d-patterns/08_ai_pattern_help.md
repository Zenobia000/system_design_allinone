---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.8 · AI for Pattern Selection'
footer: 'AI 時代系統設計速成 '
---

## D.8 · AI 協助選模式

<div class="prompt">

**Prompt（給 Claude Code）**：

```
領域：訂單 + 庫存 + 付款 + 出貨
現況：單體 PostgreSQL，10K 訂單/日
痛點：付款失敗時，庫存沒釋放（補償邏輯散落各處）
NFR：仍要強一致；未來 3 年 100K 訂單/日

請：
1. 列 3 個適用模式（含 Saga、Outbox、Event Sourcing）
2. 每個模式給：適配度評分、引入成本、3 年後的代價
3. 推薦一個 + ADR 草稿
4. 列出推薦方案的「實作分階段」（PoC → MVP → 完整）
```

</div>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法


---


## D.8 · AI 生 API spec 的標準流程

<div class="prompt">

**Prompt**：

```
領域模型（DDD）：
- Order (id, user_id, status, total)
- OrderItem (order_id, product_id, qty, price)
- Payment (id, order_id, amount, status)

請生成：
1. OpenAPI 3.1 spec（REST 風格）
   - POST /orders, GET /orders/{id}, POST /orders/{id}/pay
2. 對應的 gRPC proto（內部用）
3. 序列圖（PlantUML）：建單 → 付款 → 出貨
4. 失敗處理：付款超時、庫存不足、退款—各對應的 endpoint
5. error code 一覽表
```

</div>

<br>

<span class="muted">**驗證**：AI 給的 endpoint 你自己看 30 秒能不能講清楚每個的「為何存在」。</span>

> Source: _source/braindump.md · §AI 可以代勞的工作
