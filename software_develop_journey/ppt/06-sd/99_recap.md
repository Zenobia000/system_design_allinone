---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · SD Recap'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · RECAP</div>

# SD · 回顧
## *三句口訣 · 下一站*


---


## RECAP · 三句口訣

<span class="kicker">MNEMONICS</span>

# 把 Ch.6 收成三句話

<br>

<div class="highlight">

**口訣 1**：SD 是**架構與代碼的橋**——沒有它就是各寫各的。

</div>

<div class="highlight">

**口訣 2**：**API 命名是 SD 的靈魂**——一致、可預測、不會誤導。

</div>

<div class="highlight">

**口訣 3**：好的 SD 讓 **Dev 不用問問題**——文件就是契約。

</div>

> Source: _source/braindump.md · §三句口訣


---


## RECAP · SD Cheatsheet 卡

<!-- _class: compact -->

| 維度 | 內容 |
|---|---|
| **蓋房子對應** | 施工圖繪製師 |
| **一句話定義** | 把架構藍圖翻成可開發的模組與 API |
| **降低的不確定性** | 開發落地不確定性 |
| **經典產出** | Module Design / API Spec / Sequence / Component / Class Diagram |
| **主要工具** | OpenAPI / Swagger / PlantUML / Mermaid / Notion |
| **AI 取代不了的** | 邊界設計 / API 一致性 / 未來擴充考量 |
| **常見誤解** | 「SD = 寫 UML 的人」「SD = 資深 Dev」「SD = Architect 的助理」 |
| **下一個碰到的角色** | DBA（守住資料生命線） |

> Source: _source/braindump.md · §角色 = 消除不確定性（核心思想）


---


## RECAP · 下一站

# Ch.7：DBA · 資料生命線

<div class="note">

SD 寫了 `POST /orders` 的契約跟 sequence，現在問題變成：

- 訂單表 schema 長怎樣？index 怎麼設？
- 庫存扣款怎麼避免 race condition？
- 歷史訂單要不要分表？
- 一年後 1 億筆查得動嗎？

**這些都是 DBA 的事**。

</div>

<br>

<span class="muted">**承先啟後**：SD 給的是 API 契約，DBA 確保**資料找得到、算得準、不會丟**。</span>

> Source: _source/braindump.md · §DBA · 資料生命線


---


<!-- _class: end -->

# Ch.6 完
## *SD 講完，看 DBA。*

<br>

<span class="lead">→ Ch.7 DBA</span>
