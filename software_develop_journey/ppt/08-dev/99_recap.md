---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.8 · Developer Recap'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 08 · RECAP</div>

# Dev · 回顧
## *三句口訣 · 下一站*


---


## RECAP · 三句口訣

<span class="kicker">MNEMONICS</span>

# 把 Ch.8 收成三句話

<br>

<div class="highlight">

**口訣 1**：Dev 不是工人，是**工班師傅**——專業在判斷，不在打字速度。

</div>

<div class="highlight">

**口訣 2**：AI 寫 code 之後，Dev 的價值是**判斷該寫什麼 code**。

</div>

<div class="highlight">

**口訣 3**：**命名比演算法重要**——讀的人比寫的人多 10 倍。

</div>

> Source: _source/braindump.md · §三句口訣


---


## RECAP · Dev Cheatsheet 卡

<!-- _class: compact -->

| 維度 | 內容 |
|---|---|
| **蓋房子對應** | 工班師傅 |
| **一句話定義** | 把設計藍圖變成可運行的代碼 |
| **降低的不確定性** | 實作正確性不確定性 |
| **經典產出** | Code / Unit Tests / Docs / Build Artifacts / PoC |
| **主要工具** | Git / IDE / Copilot / Cursor / Claude Code |
| **AI 取代不了的** | 架構 fit / debug / 業務理解 / Review / 命名 |
| **常見誤解** | 「Dev = 工人」「FE / BE 是兩種職業」「AI 來了 Dev 沒用」 |
| **下一個碰到的角色** | QA（驗收 code 寫得對不對） |

> Source: _source/braindump.md · §Developer 視角


---


## RECAP · 下一站

# Ch.9：QA · 驗收員

<div class="note">

Dev 寫完 code、跑完自己的 unit test 後，問題變成：

- 邊界情境真的有測到嗎？
- 兩個模組串起來會不會壞？
- 上線後流量大會不會塌？
- 「30 分鐘未付款自動取消」這個規則真的成立嗎？

**這些都是 QA 的事**。

</div>

<br>

<span class="muted">**承先啟後**：Dev 確保**單一單元**對；QA 確保**整棟樓**不會塌。</span>

> Source: _source/braindump.md · §QA 視角


---


<!-- _class: end -->

# Ch.8 完
## *Dev 講完，看 QA。*

<br>

<span class="lead">→ Ch.9 QA</span>
