---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.12 · Livestream'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 12 · TOPIC 02</div>

# 直播串流平台
## *Differential · 延遲是跨角色合約*


---


## STREAM · 甘特帶

# 投入度：SA / Architect / DevOps 特粗

```
角色          投入度 (0–10)
──────────────────────────────────
PM            ██████████          5
UX            ██████████          5
UI            ██████████          5
SA            ████████████        6
Architect     ████████████████████ ★★★ 10
SD            ██████████████      7
DBA           ██████              3
Dev           ████████████        6
QA            ██████████████      7
DevOps        ████████████████████ ★★★ 10
──────────────────────────────────
心臟：延遲合約（Architect）· 24/7 容量（DevOps）· DBA 反而輕
```

<span class="muted">**為什麼漂移**：直播的命脈是「延遲」「突發流量」「邊緣節點」——Architect / DevOps 暴增到 10，DBA 因為走 cache + queue 反而降到 3。</span>

> Source: _source/braindump.md · §直播串流系統挑戰


---


## STREAM · vs 電商

# 哪些一樣，哪些變了

<!-- _class: compact -->

| 面向 | 電商 | 直播 |
|---|---|---|
| 一致性 | 強一致（金流） | 最終一致（觀看人數可以差幾秒） |
| 寫入模式 | 訂單事件批次寫 | 心跳 / 進房 / 彈幕高頻寫 |
| 讀取模式 | 訂單頁查詢 | 影音 stream + 聊天即時 |
| 主要挑戰 | 對帳 / 退款 | 卡頓 / 突發流量 |
| DBA 角色 | 主角（資料正確） | 配角（快取 + queue 為主） |
| Architect 角色 | 中等（切服務） | 主角（CDN + 邊緣 + 容量） |

> Source: _source/braindump.md · §直播串流系統挑戰


---


## STREAM · KEY HOOK

<span class="kicker">CORE INSIGHT</span>

# 延遲是跨角色合約

<br>

<div class="highlight">

**新手以為**：「卡頓」是 Architect 一個人的責任。
**真相**：延遲是**五人合約**——任何一個人沒守住，使用者就會抱怨「卡」。

</div>

```
   PM        產品定義「< 3s 才算可用」
    +
   UX        loading 動畫掩飾首段 1 秒
    +
   Architect CDN 邊緣節點 / HLS chunk 策略
    +
   SD        chunk size 多大、buffer 多少
    +
   DevOps    容量預測 / autoscale / 邊緣節點規劃
```

<span class="muted">**核心金句**：NFR 不是 Architect 的專利，是**跨角色契約**。</span>

> Source: _source/braindump.md · §直播串流系統挑戰


---


## STREAM · 突發流量怎麼擋

# 千人變十萬人，誰負責

<div class="alert">

**情境**：某網紅突然開播，觀看人數 1 分鐘內 1 千人 → 10 萬人

</div>

<div class="stack">
  <div class="layer client"><strong>PM</strong>　 定義 SLO：99% 觀眾 buffering &lt; 2s</div>
  <div class="layer app"><strong>Architect</strong>　 邊緣節點預配 + CDN 接管 + 主源 fallback</div>
  <div class="layer data"><strong>DevOps</strong>　 即時 autoscale + 預警閾值 + on-call 鏈</div>
  <div class="layer infra"><strong>SRE</strong>　 容量演練 + chaos engineering + 災難切換</div>
</div>

<br>

<span class="muted">**直播跟電商最大的差別**：電商是「對得起每一筆訂單」，直播是「不卡每一個觀眾」——前者是正確性，後者是體驗。</span>

> Source: _source/braindump.md · §直播串流系統挑戰


---


<!-- _class: end -->

# 直播 完
## *延遲合約講完，看 AI 影視最難的地方。*

<br>

<span class="lead">→ 12.3 AI 影視</span>
