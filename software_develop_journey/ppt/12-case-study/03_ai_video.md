---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.12 · AI Video'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 12 · TOPIC 03</div>

# AI 影視生成
## *Differential · QA 從驗證已知變成定義未知*


---


## AIVID · 甘特帶

# 投入度：PM / DBA / DevOps 特粗

```
角色          投入度 (0–10)
──────────────────────────────────
PM            ████████████████████ ★★★ 10
UX            ██████████          5
UI            ████████████        6
SA            ████████████        6
Architect     ████████████████    8
SD            ████████████        6
DBA           ██████████████████ ★★  9
Dev           ████████████        6
QA            ██████████████████ ★  9（角色變了）
DevOps        ████████████████████ ★★★ 10
──────────────────────────────────
心臟：定義「好」（PM）· 模型 / 成本 / 用量（DBA + DevOps）· QA 變定義者
```

<span class="muted">**為什麼漂移**：AI 影視最反直覺——PM 寫不出「好」的驗收條件，所以 QA 從「驗證已知」變成「定義未知」（設計人評流程 + metric）。DBA 守模型版本與 GPU 成本，DevOps 養 GPU 池。</span>

> Source: _source/braindump.md · §AI 影視生成挑戰


---


## AIVID · vs 電商

# 哪些一樣，哪些變了

<!-- _class: compact -->

| 面向 | 電商 | AI 影視 |
|---|---|---|
| 任務時間 | 毫秒級 | 分鐘到小時級（非同步） |
| 驗收條件 | 「訂單成立」可寫 | 「生得好」寫不出來 |
| 成本模型 | 每筆訂單成本固定 | 每次生成 GPU 成本浮動 |
| 主要挑戰 | 對帳 / 退款 | 成本失控 / 模型品質 |
| QA 工作 | 驗證已知行為 | **定義未知標準** |
| DBA 工作 | 訂單表 / 索引 | 模型版本 / 生成記錄 / GPU 用量 |

> Source: _source/braindump.md · §AI 影視生成挑戰


---


## AIVID · KEY HOOK

<span class="kicker">CORE INSIGHT</span>

# PM 寫不出驗收條件

<br>

<div class="highlight">

**電商**：「按下付款 → 收到 email」——可驗收。
**AI 影視**：「生得好」——怎麼驗？

「好」的定義要靠：

- **QA 設計人類評分流程**（盲測 / 評分卡 / 多人共識）
- **Data Scientist 設計 metric**（FID / CLIP score / 人臉一致性）
- **每次模型更新就要重做**

</div>

<span class="muted">**核心金句**：在 AI 系統裡，**QA 從「驗證已知」變成「定義未知」**——這是角色職責**隨領域漂移**最強的例子。</span>

> Source: _source/braindump.md · §AI 影視生成挑戰


---


## AIVID · 成本失控怎麼擋

# 一次生成 $0.5，1 萬用戶誰擋

<div class="alert">

**情境**：模型每次推論 GPU 成本 $0.5，免費試用一天被刷 1 萬次 → $5,000 / 天

</div>

<div class="stack">
  <div class="layer client"><strong>PM</strong>　 定價策略：每月配額 / 訂閱 vs 按次計費 / 試用上限</div>
  <div class="layer app"><strong>Architect</strong>　 排隊系統 + 優先級分流（免費 vs 付費）</div>
  <div class="layer data"><strong>DBA</strong>　 GPU 用量記錄 / 模型版本 / 用戶配額追蹤</div>
  <div class="layer infra"><strong>DevOps</strong>　 GPU 池 autoscale + 用量告警 + 成本 daily report</div>
</div>

<br>

<span class="muted">**最反直覺**：在 AI 系統裡，**成本控制不是 DevOps 一個人的事**——PM 要先定義「值不值得」，否則 DevOps 怎麼擋都擋不住。</span>

> Source: _source/braindump.md · §AI 影視生成挑戰


---


<!-- _class: end -->

# AI 影視 完
## *三系統都看過，收成 3×3 對照。*

<br>

<span class="lead">→ 12.4 比較矩陣</span>
