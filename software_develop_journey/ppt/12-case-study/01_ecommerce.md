---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.12 · E-commerce'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 12 · TOPIC 01</div>

# 電商訂單系統
## *Baseline · 心臟在 SA · DBA · QA*


---


## ECOMM · 甘特帶

# 投入度：SDLC 標準練習題

```
角色          投入度 (0–10)
──────────────────────────────────
PM            ████████████        6
UX            ██████████████      7
UI            ██████████          5
SA            ████████████████   ★ 8
Architect     ██████████████      7
SD            ████████████        6
DBA           ████████████████   ★ 8
Dev           ████████████        6
QA            ████████████████   ★ 8
DevOps        ██████████████      7
──────────────────────────────────
心臟：狀態機（SA）· 對帳（DBA）· 邊界驗證（QA）
```

<span class="muted">**為什麼這三個是心臟**：訂單 7 狀態的轉換規則由 SA 補完、跨服務一致性靠 DBA 守、邊界 case 由 QA 找漏；少一個就上線翻車。</span>

> Source: _source/braindump.md · §訂單系統實例


---


## ECOMM · KEY HOOK

<span class="kicker">CORE INSIGHT</span>

# 訂單完成 ≠ 付款成功

<br>

<div class="highlight">

**新手以為**：訂單完成 = 用戶按了「付款」按鈕。
**真相**：訂單有 **7 個狀態**，每個狀態轉換都是一個**事務邊界**。

</div>

```
   pending_payment ──► paid ──► preparing ──► shipped
                                                 │
                                                 ▼
                                            delivered ──► completed
                                                 │
                                                 ▼
                                            returned ──► refunded
```

<span class="muted">**這個狀態機就是電商的業務**——所有角色都圍繞它展開。</span>

> Source: _source/braindump.md · §訂單系統實例


---


## ECOMM · Discovery Swim-Lane

# PM · UX · SA 怎麼出力

<div class="stack">
  <div class="layer client"><strong>PM</strong>　 定義 7 個狀態的商業意義 · 退款政策 · KPI（訂單完成率）</div>
  <div class="layer app"><strong>UX</strong>　 商品 → 購物車 → 結帳 → 付款 → 訂單頁的動線 · 失敗時的引導</div>
  <div class="layer data"><strong>SA</strong>　 狀態轉換規則 · 30 分鐘未付款自動取消 · 出貨後不能取消 · 7 天內可退款</div>
</div>

<br>

<div class="alert">

**最容易漏的**：例外情境——付款成功但庫存不足、退款超過 7 天、商品已出貨但要取消。SA 把這些「縫隙」補滿。

</div>

> Source: _source/braindump.md · §SA 補規則的範例


---


## ECOMM · Design Swim-Lane

# Architect · SD · DBA 怎麼出力

<div class="stack">
  <div class="layer client"><strong>Architect</strong>　 切服務（Order / Payment / Inventory / Notification）· 同步 vs 非同步</div>
  <div class="layer app"><strong>SD</strong>　 CreateOrder / CancelOrder / RefundOrder API · idempotency key · sequence diagram</div>
  <div class="layer data"><strong>DBA</strong>　 orders / order_items / payment_records 表 · partition by created_at · index 策略</div>
</div>

<br>

<div class="note">

**Architect 最重要的決策**：付款 + 庫存 + 訂單**跨服務一致性**——選 Saga / Outbox / Eventual Consistency。

</div>

> Source: _source/braindump.md · §訂單系統實例


---


## ECOMM · Build & Run Swim-Lane

# Dev · QA · DevOps 怎麼出力

<div class="stack">
  <div class="layer client"><strong>Dev</strong>　 實作 7 狀態機 · idempotent payment callback · 前端訂單追蹤頁</div>
  <div class="layer app"><strong>QA</strong>　 邊界測試（庫存不足、付款超時、退款逾期、雙重點擊）· 對帳測試</div>
  <div class="layer data"><strong>DevOps</strong>　 每日對帳 job · 付款失敗告警 · 訂單異常 SLA · 退款延遲告警</div>
</div>

<br>

<div class="alert">

**電商最痛的上線後問題**：對帳——金流商說付了、訂單顯示未付、客戶投訴。**沒有對帳 job = 信用炸光**。

</div>

> Source: _source/braindump.md · §訂單系統實例


---


<!-- _class: end -->

# 電商 完
## *Baseline 跑完，看直播差在哪。*

<br>

<span class="lead">→ 12.2 直播串流</span>
