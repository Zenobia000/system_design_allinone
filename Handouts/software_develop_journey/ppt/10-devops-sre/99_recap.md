---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.10 · DevOps Recap'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 10 · RECAP</div>

# DevOps / SRE · 回顧
## *三句口訣 · 下一站*


---


## RECAP · 三句口訣

<span class="kicker">MNEMONICS</span>

# 把 Ch.10 收成三句話

<br>

<div class="highlight">

**口訣 1**：DevOps 不是裝完就走的**水電工**，是 24h 待命的**物業管理**。

</div>

<div class="highlight">

**口訣 2**：監控不是**事後補救**，是**事前約定 SLO**——沒指標就沒可靠性。

</div>

<div class="highlight">

**口訣 3**：災難演練不是**有就好**，是**定期練才算**——runbook 沒跑過就是廢紙。

</div>

> Source: _source/braindump.md · §DevOps / SRE 視角


---


## RECAP · DevOps / SRE Cheatsheet 卡

<!-- _class: compact -->

| 維度 | 內容 |
|---|---|
| **蓋房子對應** | 物業管理 + 24h 保全 + 消防 |
| **一句話定義** | 上線後讓系統持續活著 |
| **降低的不確定性** | 上線運行不確定性 |
| **經典產出** | CI/CD / IaC / Monitor / Runbook / Incident Report |
| **主要工具** | Jenkins / GitHub Actions / Terraform / Grafana / K8s |
| **AI 取代不了的** | incident 判斷 / 容量規劃 / 跨團隊政治 |
| **常見誤解** | 「DevOps = 水電工」「裝完就走」「title = SRE 才厲害」 |
| **下一個碰到的角色** | 全部 9 角色（Ch.11 看怎麼協作） |

> Source: _source/braindump.md · §DevOps / SRE 視角


---


## RECAP · 下一站

# Ch.11：協作與衝突

<div class="note">

走完 9 個角色，現在問題變成：

- PM 跟 Architect 在會議室吵架，怎麼辦？
- SA 的規則跟 Dev 的實作對不上，誰讓步？
- DevOps 的 release gate 卡住 Dev 的 hotfix，誰贏？
- 9 種專業怎麼湊成一個團隊？

**這些都是 Ch.11 協作篇的事**。

</div>

<br>

<span class="muted">**承先啟後**：認識完角色，下一步是**看角色怎麼互相磨合**——衝突案例與責任邊界。</span>

> Source: _source/braindump.md · §責任鏈


---


<!-- _class: end -->

# Ch.10 完
## *DevOps 講完，看協作與衝突。*

<br>

<span class="lead">→ Ch.11 協作</span>
