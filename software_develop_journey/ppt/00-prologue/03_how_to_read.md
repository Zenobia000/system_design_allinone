---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Prologue · How to Read'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">PROLOGUE · HOW TO READ</div>

# 同一句需求

## *9 個角色怎麼聽*


---


## MASTER TEMPLATE · 一句話

<span class="kicker">MOTHER TEMPLATE</span>

# 客戶說：「我要做一個會員系統」

<br>

<div class="highlight">

這句話聽在 **9 個角色耳裡**，每個人腦中浮現的東西**完全不同**。

這張頁是**全書最重要的母模板**——
每個角色章節都會重現這張，讓你看見**該角色的視角**。

</div>

<br>

<span class="muted">看完這頁就懂：「角色不同 ≠ 立場不同，而是**看到的問題不同**」。</span>

> Source: _source/braindump.md · §角色 = 消除不確定性


---


<!-- _class: compact -->

## MASTER TEMPLATE · 9 角色腦中浮現什麼

| 角色 | 一聽到「會員系統」，腦中浮現… |
|---|---|
| **PM** | 使用者註冊要幹嘛？KPI 是留存率還是轉換率？ |
| **UX** | 註冊流程幾步？忘記密碼要幾秒？樣品屋長怎樣？ |
| **UI** | 按鈕配色、表單元件、品牌一致性 |
| **SA** | 角色幾種？權限矩陣？驗證規則？被鎖怎辦？ |
| **Architect** | 要不要 SSO？token 還是 session？存哪？ |
| **SD** | API 是 `/auth/login` 還是 `/login/auth`？回傳格式？ |
| **DBA** | `users` 表 schema？email 加 index？密碼怎麼存？ |
| **Dev** | 用 NextAuth 還是自己寫？前後端怎麼接？ |
| **QA** | 弱密碼？SQL injection？2FA bypass？暴力破解？ |
| **DevOps** | secret 怎麼管？failed login 監控？session timeout？ |

> Source: _source/braindump.md · §角色全景


---


## MASTER TEMPLATE · 觀察一下

<span class="kicker">INSIGHT</span>

# 三個重要發現

<br>

<div class="note">

**1. 沒有任何兩個角色問的問題重複**——他們看到的根本是不同層的問題。

</div>

<div class="note">

**2. 每個問題都是真的會出事的問題**——少一個角色就少一層保護。

</div>

<div class="note">

**3. 越往下游問題越具體**——PM 問商業，DevOps 問營運，中間每層都在翻譯。

</div>

<br>

<span class="muted">這份簡報接下來會把每個角色拉出來，**單獨拍特寫**——但你都記得，他們其實在看同一句話。</span>

> Source: _source/braindump.md · §一句話本質


---


## MASTER TEMPLATE · 怎麼讀每個角色章節

# 每章節奏（Ch.2–Ch.10 都一樣）

<div class="stack">
  <div class="layer client"><strong>00_overview</strong>　 蓋房子比喻 highlight 當下角色 · 一句話定義 · 一天時間 · 學習目標</div>
  <div class="layer app"><strong>01_outputs</strong>　 3-5 個經典產出 · artifact 範例 · 為何 AI 取代不了</div>
  <div class="layer data"><strong>02_boundary</strong>　 與上下游 overlap · 誰主導什麼 · 實務場景</div>
  <div class="layer infra"><strong>99_recap</strong>　 三句口訣 · cheatsheet 卡 · 連到下一站</div>
</div>

<br>

<span class="muted">第二章看完就會建立**節奏預期**——後續章節讀起來像聽熟悉的副歌。</span>

> Source: _source/braindump.md · §SDLC 全流程


---


<!-- _class: end -->

# How to Read 完
## *母模板講完，開始正式上路。*

<br>

<span class="lead">→ Ch.1 全局視角</span>
