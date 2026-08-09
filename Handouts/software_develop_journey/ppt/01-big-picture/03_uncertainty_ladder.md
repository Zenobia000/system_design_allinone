---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.1 · Uncertainty Ladder'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 01 · TOPIC 03</div>

# 不確定性階梯
## *每個角色降低一種風險*


---


## LADDER · WHY

<span class="kicker">SECTION 1 · WHY</span>

# 為什麼角色「越多越好」是錯的？

<br>

<div class="highlight">

**新手以為**：每多一個人就多分擔工作。
**真相**：每多一個**角色**，是多消除一種**特定的不確定性**。

少一個角色，那種不確定性就**沒人負責**——就會在某天爆炸。

</div>

<br>

<span class="muted">這個 mental model 就是整本教材的**核心金句**：「**角色不是用職稱分，而是用負責消除哪種不確定性來分**」。</span>

> Source: _source/braindump.md · §角色 = 消除不確定性


---


<!-- _class: compact -->

## LADDER · 9 角色 · 10 種不確定性

| 角色 | 不確定性 | 沒這角色會發生什麼 |
|---|---|---|
| **PM** | 商業價值 | 做出沒人要的東西 |
| **UX** | 使用者行為 | 沒人會用 |
| **UI** | 視覺呈現 | 醜到丟臉 |
| **SA** | 業務規則 | 上線後一堆 edge case 沒人想到 |
| **Architect** | 系統演進與非功能風險 | 流量大就掛、改一行炸全套 |
| **SD** | 開發落地 | 工程師卡在「怎麼接」 |
| **DBA** | 資料正確性、效能、可靠性 | 訂單對不上、查詢變超慢 |
| **Dev** | 實作正確性 | 寫出 bug |
| **QA** | 結果正確性 | bug 流到正式環境 |
| **DevOps** | 上線運行 | 上線當天炸、半夜叫起來 |

> Source: _source/braindump.md · §角色 = 消除不確定性


---


## LADDER · 不確定性的「方向性」

# 越上游越抽象，越下游越具體

```
PM        ◄──────  最抽象（商業價值）
 │
 ▼        翻譯
UX / UI / SA  ◄──  使用者 / 視覺 / 業務邏輯
 │
 ▼        翻譯
Architect / SD / DBA  ◄──  系統 / 模組 / 資料
 │
 ▼        翻譯
Dev / QA / DevOps  ◄──────  最具體（代碼 / 測試 / 機器）
```

<span class="muted">**翻譯**這個動作就是 SDLC 的本質。每翻一次就降低一層不確定性。</span>

> Source: _source/braindump.md · §三層 flow 翻譯


---


## LADDER · AI 改變了什麼

<div class="highlight">

**AI 改變了最下游兩層**：

- **Dev**：AI 可以幫你寫 80% 的 code
- **QA**：AI 可以生成測試案例

但**上面 7 個角色幾乎沒變**——因為那些是「**定義問題**」「**控制複雜度**」的工作。

</div>

<br>

<div class="note">

**核心金句**：AI 把實作能力變成 commodity，把**判斷能力**變得更稀缺。

</div>

<br>

<span class="muted">所以 PM / Architect / SA / DBA 這些「上游角色」在 AI 時代**反而更值錢**——他們是 AI 用得好不好的決定者。</span>

> Source: _source/braindump.md · §AI 時代的本質沒變


---


<!-- _class: end -->

# 不確定性階梯 完
## *Big Picture 三件事講完。*

<br>

<span class="lead">→ 1.99 Recap</span>
