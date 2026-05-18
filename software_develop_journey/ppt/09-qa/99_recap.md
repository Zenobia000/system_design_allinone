---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.9 · QA Recap'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 09 · RECAP</div>

# QA · 回顧
## *三句口訣 · 下一站*


---


## RECAP · 三句口訣

<span class="kicker">MNEMONICS</span>

# 把 Ch.9 收成三句話

<br>

<div class="highlight">

**口訣 1**：QA 不是按按鈕的人，是**設計驗證框架**的人。

</div>

<div class="highlight">

**口訣 2**：在 AI 時代，QA 從**驗證已知**變成**定義未知**。

</div>

<div class="highlight">

**口訣 3**：Bug 不是 QA 的責任，是 QA 的**價值**——提前發現比上線炸了便宜 100 倍。

</div>

> Source: _source/braindump.md · §QA 視角


---


## RECAP · QA Cheatsheet 卡

<!-- _class: compact -->

| 維度 | 內容 |
|---|---|
| **蓋房子對應** | 驗收員 |
| **一句話定義** | 驗收這棟樓不會塌 |
| **降低的不確定性** | 結果正確性不確定性 |
| **經典產出** | Test Case / Plan / Bug / Automation / Coverage |
| **主要工具** | Cypress / Playwright / pytest / JMeter / TestRail |
| **AI 取代不了的** | edge case 直覺 / 定義未知 / 設計人類評分流程 |
| **常見誤解** | 「QA = 點按鈕」「QA = Dev 之後才上場」「bug 是 QA 的錯」 |
| **下一個碰到的角色** | DevOps / SRE（把測試接進 CI/CD） |

> Source: _source/braindump.md · §QA 視角


---


## RECAP · 下一站

# Ch.10：DevOps / SRE · 物業管理

<div class="note">

QA 寫好的自動化測試，現在問題變成：

- 每次 commit 要不要自動跑？
- 跑在哪台機器？
- 過了之後要不要自動部署？
- 上線後怎麼知道沒爆？

**這些都是 DevOps / SRE 的事**。

</div>

<br>

<span class="muted">**承先啟後**：QA 確認「上線前沒問題」，DevOps 確認「上線後活著」。</span>

> Source: _source/braindump.md · §DevOps / SRE 視角


---


<!-- _class: end -->

# Ch.9 完
## *QA 講完，看 DevOps / SRE。*

<br>

<span class="lead">→ Ch.10 DevOps / SRE</span>
