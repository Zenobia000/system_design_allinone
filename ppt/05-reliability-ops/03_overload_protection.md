---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Overload Protection'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · TOPIC 03</div>

# Overload Protection
## *讓系統在壓力下優雅降級，而不是全面崩潰*

---

## OVERLOAD PROTECTION · WHY

# 為何流量一爆系統就連環炸？

<br>

<div class="highlight">

**沒有保護的系統面對 10× 流量**：
1. CPU 撐不住，response time 飆
2. Client 重試，流量再 ×3
3. Connection pool 滿，timeout 連環
4. 上游服務也跟著崩 → **全棧連鎖故障（雪崩）**

</div>

<br>

<div class="alert">

**核心思想**：在 10 倍流量下，**應該服務其中的 30%，而不是讓 100% 都失敗**。
保護不是 nice-to-have，是上線清單必備。

</div>

> Source: 維運與可靠性/02 Overload Protection.pdf · §1 核心問題

---

## OVERLOAD PROTECTION · HOW

# 6 層防線（不是選一個，是疊起來）

```
外部流量進來
       ↓
① Rate Limiting          擋惡意請求和超量單一客戶
       ↓
② Concurrency Limiting   保護後端資源不被耗盡
       ↓
③ Queue-based Leveling   吸收突發，平滑流量
       ↓                  ← Auto-scaling 持續擴容
④ Bulkhead              隔離不同依賴，防局部過載蔓延
       ↓
⑤ Load Shedding         最後防線：選擇性丟棄低優先級
       ↑
⑥ Backpressure          整條鏈路協同減速訊號
```

<span class="muted">每一層都有它能擋的，也有它擋不住的。**面試重點不是背 6 個名詞，而是說清為什麼需要多層保護**。</span>

> Source: 維運與可靠性/02 Overload Protection.pdf · §1 + §10 工具組合

---

## OVERLOAD PROTECTION · Rate Limit 演算法

# 4 種限流演算法的數學差異

<div class="tradeoff">
  <div class="pro">
    <h3>Token Bucket（業界默認）</h3>
    <ul>
      <li>系統以固定速率往桶放令牌（如每秒 10 個）</li>
      <li>桶有上限（如 100 個）</li>
      <li>**允許短暫突發**（桶裡積令牌）</li>
      <li>Redis + Lua 容易做分散式</li>
    </ul>
  </div>
  <div class="con">
    <h3>Leaky Bucket</h3>
    <ul>
      <li>請求任意速率進入，**固定速率流出**</li>
      <li>強制輸出速率平滑，**不允許突發**</li>
      <li>適合嚴格控制處理速率（外部 API 調用）</li>
      <li>對下游嚴格保護</li>
    </ul>
  </div>
</div>

<div class="alert">

**Fixed Window 反模式**：第 59 秒發 100 個 + 第 61 秒再發 100 個 → 視窗邊界 2 秒內**實際通過 200 個**。Sliding Window 解決邊界突發但占記憶體。

</div>

> Source: 維運與可靠性/02 Overload Protection.pdf · §2 演算法

---

## OVERLOAD PROTECTION · 分散式 Rate Limiting

# 多伺服器各自計數沒意義

<div class="highlight">

**問題**：客戶端把請求分散打到不同 server，每台自己計數 → 輕鬆繞過限制。
**解法**：用**集中式計數器**（通常是 Redis），原子操作（INCR + EXPIRE 或 Lua script）保證計數無 race。

</div>

<br>

**正確的回應 header**（被限的請求應回 `429 Too Many Requests`）：

```
HTTP/1.1 429 Too Many Requests
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1700000060
```

<span class="muted">**延遲代價**：每請求多 1 次 Redis 查詢（< 1ms 可接受）。極低延遲場景用本地計數器 + 定期同步。</span>

> Source: 維運與可靠性/02 Overload Protection.pdf · §2 分散式 + 回應

---

## OVERLOAD PROTECTION · Concurrency Limit

# Rate Limit 不夠：同時處理數才是後端真實壓力

<div class="def">
<span class="term">Rate Limit vs Concurrency Limit</span>
Rate Limit 限「**每秒幾個請求**」；Concurrency Limit 限「**同時處理中幾個請求**」。<br>
若每請求要花 1 秒，限 200 RPS = 同時 200 個在跑，遠超執行緒池容量。
</div>

<div class="def">
<span class="term">Adaptive Concurrency Limiting</span>
Netflix 開源：根據延遲動態調整並發上限。延遲升高 → 自動降並發數；延遲下降 → 逐步放寬。**比靜態值更貼近真實狀況**。
</div>

<br>

<span class="muted">**搭配關係**：Rate limit 擋突發流量（公平性），concurrency limit 保護內部資源（容量）——兩者通常一起用。</span>

> Source: 維運與可靠性/02 Overload Protection.pdf · §3 Concurrency

---

## OVERLOAD PROTECTION · Load Shedding 與優先級

# 過載時策略性丟棄，不是隨機丟棄

| 優先級 | 請求類型 | 理由 |
|--------|---------|------|
| **最高** | 付費用戶的核心操作 | 直接影響收入和 SLA |
| **高** | 一般用戶的核心操作 | 業務關鍵功能 |
| **中** | 非核心功能（推薦、搜尋） | 可降級或跳過 |
| **低** | 後台任務、分析請求 | 可延遲處理 |
| **最低** | 監控、日誌上報 | 不影響用戶 |

<div class="highlight">

**Linus 哲學**：處理 30% 的請求 + 其他 70% 快速失敗（明確錯誤），**遠比讓所有請求一起慢死要好**。
**重試請求優先丟棄**：帶 `X-Retry-Count: 2` 的請求，這次過載可能就是它造成的，先丟它保第一次嘗試的新請求。

</div>

> Source: 維運與可靠性/02 Overload Protection.pdf · §6 + §7 Request Prioritization

---

## OVERLOAD PROTECTION · Bulkhead

# 艙壁隔離：一艙進水不沉船

<div class="stack">
  <div class="layer client"><strong>執行緒池隔離</strong>　 不同下游依賴用獨立執行緒池（DB / 支付 / 通知）</div>
  <div class="layer app"><strong>租戶隔離</strong>　 大客戶獨立服務實例 / 資料庫分片；小客戶共用但有 concurrency limit</div>
  <div class="layer data"><strong>連線池隔離</strong>　 Read pool 走 replica · Write pool 走 primary</div>
  <div class="layer infra"><strong>故障域隔離</strong>　 不同 AZ / region · 一個 AZ 掛不影響另一個</div>
</div>

<br>

<div class="def">
<span class="term">粒度怎麼決定？</span>
**根據故障影響的相關性劃分**：把那些「如果它掛掉，你希望不影響哪些功能」隔離成獨立 bulkhead。從 3 到 5 個 bulkhead 開始，根據實際故障模式再調。
</div>

> Source: 維運與可靠性/02 Overload Protection.pdf · §8 + §11 deep dive

---

## OVERLOAD PROTECTION · Backpressure

# 讓壓力訊號往上游傳播

<div class="def">
<span class="term">TCP 層</span>
接收方緩衝區滿 → 通知發送方縮小傳送視窗（receive window） → 自動放慢
</div>

<div class="def">
<span class="term">gRPC（HTTP/2 flow control）</span>
每個 stream 和 connection 都有流量控制視窗，接收方暫停接收讓發送方等待
</div>

<div class="def">
<span class="term">應用層</span>
回 <code>429 + Retry-After: 5</code>，讓 client 主動退避而不是盲目重試
</div>

<br>

<span class="muted">**Backpressure vs Load Shedding**：load shedding 是**丟棄請求**；backpressure 是**讓上游放慢，不丟任何東西**。Backpressure 更溫和，但需上游配合。</span>

> Source: 維運與可靠性/02 Overload Protection.pdf · §9 Backpressure

---

## OVERLOAD PROTECTION · 退避加抖動

# Retry 的正確姿勢

<div class="def">
<span class="term">Exponential Backoff</span>
重試間隔：1s → 2s → 4s → 8s · **避免立即重試的雪崩**
</div>

<div class="def">
<span class="term">Full Jitter（AWS 推薦）</span>
<code>delay = random(0, base × 2^attempt)</code> · **避免重試風暴**（thundering herd）
</div>

<div class="def">
<span class="term">Retry Budget</span>
全局限制：重試流量不超過正常流量的 **10%** · **避免重試本身放大故障**
</div>

<div class="alert">

**反模式**：所有客戶端**指數退避曲線相同** → 第 2、4、8 秒同步重試，仍形成脈衝。**抖動是必須的**。

</div>

> Source: 維運與可靠性/03 Reliable Delivery.pdf · §退避加抖動

---

<!-- _class: end -->

# Overload Protection 完
## *系統不被擊倒了，下一步看訊息怎麼可靠送達。*

<br>

<span class="lead">→ 5.4 Reliable Delivery</span>
