---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.9 · Idempotency'
footer: 'AI 時代系統設計速成 '
---

## D.9 · 冪等性設計

<span class="kicker">IDEMPOTENCY · 必修</span>

# 在「網路會丟包」的世界，冪等是底線

<!-- _class: compact -->

**為何重要**：retry 不可避免（network、timeout、user click），沒冪等 = 重複收費 / 重複下單。

<br>

**實作三方法**：

| 方法 | 怎麼做 | 適用 |
|---|---|---|
| Idempotency-Key | client 帶唯一 key，server 去重 | 寫操作 (POST) |
| Natural Idempotency | 操作本身即冪等（PUT, DELETE） | RESTful 更新 |
| Versioning | 帶 version, 不匹配拒絕 | 樂觀鎖 |

<br>

**範例**：付款 API
```
POST /payments
Headers: Idempotency-Key: <uuid>
→ 同 key 5 分鐘內回 same response，不重複扣款
```

<br>

<span class="muted">**金句**：所有「寫」API 都該冪等。沒做 = 等著上線後出意外。</span>

> Source: software_architect/ppt/_source/06_Components_Patterns.md · §Idempotency
