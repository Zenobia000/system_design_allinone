---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.1 · Building Metaphor'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 01 · TOPIC 01</div>

# 蓋大樓比喻
## *9 個角色一字排開*


---


## METAPHOR · WHY

<span class="kicker">SECTION 1 · WHY</span>

# 為什麼要用「蓋大樓」當比喻？

<br>

<div class="highlight">

**因為蓋一棟商業大樓，跟做一個軟體系統，遇到的問題長一模一樣**：

要有人定義「為何而蓋」、有人「畫圖」、有人「算結構」、
有人「畫管線」、有人「真的施工」、有人「驗收」、有人「日常維護」。

</div>

<br>

- 軟體開發不是「一個聰明工程師」的事
- 它是**多種專業協作**的工程
- 比喻讓你**不用懂程式**就能掌握角色分工

> Source: _source/braindump.md · §一句話本質


---


<!-- _class: compact -->

## METAPHOR · 9 角色全景

| 軟體角色 | 蓋房子對應 | 一句話 |
|---|---|---|
| **PM** | 建案企劃 / 開發 PM | 代理甲方·決定要蓋什麼樓、賣給誰 |
| **UX/UI** | 室內設計師 | 設計動線、樣品屋、客戶體驗 |
| **SA** | 建築師（平面圖） | 跟甲方對齊機能、畫平面圖 |
| **Architect** | 結構技師 | 承重、耐震、防火、未來擴建 |
| **SD** | 施工圖繪製師 | 把建築圖拆成可施工的細部圖 |
| **DBA** | 地基 + 水塔 + 管線總圖 | 資料是建物命脈（不是倉管） |
| **Dev** | 工班師傅 | 真的把樓蓋起來 |
| **QA** | 驗收員 | 檢查門會不會打不開、結構合規 |
| **DevOps / SRE** | 物業管理 + 24h 保全 + 消防 | 上線後持續維運 |

> Source: _source/braindump.md · §蓋大樓比喻全景


---


## METAPHOR · 流程像不像？

# 蓋大樓 vs 蓋系統

```
業務/客戶（甲方）──────────  「我要在這蓋一棟百貨公司」
   │
   ▼
建案企劃 (PM)    ──────────  「給誰、戶型、KPI、ROI」
   │
   ▼
室內設計 (UX/UI) ──────────  「客人怎麼逛才不迷路？」
   │
   ▼
建築師 (SA)      ──────────  「平面圖：幾層樓、每層做什麼」
   │
   ▼
結構技師 (Arch)  ──────────  「承重、耐震、未來能不能加蓋」
   │
   ▼
施工圖 (SD)      ──────────  「每根樑、每根柱、每條管線的細部」
   │
   ▼
地基 (DBA)       ──────────  「資料是樓的命脈，先打好」
   │
   ▼
工班 (Dev) → 驗收 (QA) → 物業 (DevOps)   完工 → 開幕 → 維運
```

> Source: _source/braindump.md · §SDLC 全流程


---


## METAPHOR · 三個常見誤解

<div class="alert">

**誤解 1**：DBA = 倉管 ❌
真相：DBA 是地基 + 水塔 + 管線總圖——資料是命脈，不是被動存放。

</div>

<div class="alert">

**誤解 2**：Dev = 工人（有貶意）❌
真相：Dev 是專業工班師傅——蓋樓的技術門檻不比設計低。

</div>

<div class="alert">

**誤解 3**：DevOps = 水電工 ❌
真相：DevOps 是物業管理 + 24h 保全 + 消防——是**持續維運**，不是一次性。

</div>

> Source: _source/braindump.md · §蓋大樓比喻全景


---


<!-- _class: end -->

# 蓋大樓比喻 完
## *比喻定錨，看 SDLC 完整流程。*

<br>

<span class="lead">→ 1.2 SDLC 地圖</span>
