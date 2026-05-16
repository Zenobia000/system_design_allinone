---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · Stateless'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · TOPIC 01</div>

# Stateless
## *分散式擴展的入場券*


---


## WHY · 為何 Stateless 是水平擴展前提？

<br>

<div class="highlight">

**Stateful Server**：把使用者 session 存在 process memory。
加一台機器後使用者第二次請求被導到新機器 → session 沒了。

**Stateless Server**：state 全部外部化（DB / Redis）。
任何機器都能處理任何請求 → 想加幾台加幾台。

</div>

<br>

- Stateless = 機器間「等價」
- LB 隨便分配，使用者不感知
- 機器掛掉？換一台就好（無狀態 = 無痛失效）

> Source: `S11_Slides.pdf` · §Stateless Why


---


## HOW · 何謂「state」？必須外部化的清單

<div class="stack">
  <div class="layer client"><strong>① Session</strong>　 登入狀態 · CSRF token → Redis</div>
  <div class="layer app"><strong>② File upload state</strong>　 大檔分片進度 → S3 multipart + DB</div>
  <div class="layer data"><strong>③ WebSocket 連線</strong>　 訂閱 channel 對應 → Redis pub/sub / external store</div>
  <div class="layer infra"><strong>④ Cache</strong>　 process 內 cache 改為 distributed cache</div>
  <div class="layer infra"><strong>⑤ Rate limit counter</strong>　 改 Redis sliding window</div>
</div>

<br>

<div class="alert">

**反模式**：把 session 存在 application memory，然後上 LB——使用者每次登入失敗，但只有部分時候，超難 debug。

</div>

> Source: `S11_Slides.pdf` · §State Externalization


---


## HOW · Stateless 設計檢核

| 檢核項 | 通過判準 |
|--------|---------|
| 砍掉一台機器，使用者體驗有差嗎？ | 沒差 ✓ |
| 加一台機器，需要部署特殊設定嗎？ | 不需要 ✓ |
| LB 用 round-robin 而非 sticky session？ | 可以 ✓ |
| 重啟一台機器，會丟失使用者資料嗎？ | 不會 ✓ |
| 兩台機器同時處理同一 user 請求 OK 嗎？ | OK ✓ |

<br>

<span class="muted">**5 條全 yes** → 真 stateless。**任何一條 no** → 要修。</span>

> Source: `S11_Slides.pdf` · §Stateless Checklist


---


## TRADE-OFF · Stateless 的代價

<div class="tradeoff">
  <div class="pro">
    <h3>Stateless 紅利</h3>
    <ul>
      <li>水平擴展無痛</li>
      <li>機器故障無感</li>
      <li>滾動部署簡單</li>
      <li>多 AZ 容易</li>
    </ul>
  </div>
  <div class="con">
    <h3>Stateless 代價</h3>
    <ul>
      <li>每個請求要外取 state（多 1 RTT）</li>
      <li>Redis 變新 SPOF</li>
      <li>大檔上傳分片邏輯複雜</li>
      <li>WebSocket 設計變難</li>
    </ul>
  </div>
</div>

<div class="highlight">

**經驗法則**：Redis 撐起的 state 也要 HA（主從 + sentinel）。
別把 state 從 app 搬到 Redis 卻把 Redis 做成單點。

</div>

> Source: `S11_Slides.pdf` · §Stateless Cost


---


<!-- _class: end -->

# Stateless 完
## *入場券到手，下一站擋流量。*

<br>

<span class="lead">→ 7.2 Cache + Queue</span>
