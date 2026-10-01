---
marp: true
theme: anthropic
paginate: true
size: 16:9
footer: 'AI 時代的取捨與決策樹'
style: |
  section h2 { line-height: 1.35; }
  section.statement {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 72px 120px;
  }
  section.statement p { font-size: 31px; line-height: 1.85; }
  section.statement .punch {
    font-family: 'Playfair Display', 'Noto Sans TC', serif;
    font-size: 42px;
    font-weight: 700;
    line-height: 1.5;
  }
  section.statement .dim { color: var(--text-secondary); font-size: 24px; }
  del { text-decoration-color: var(--alert); color: var(--text-secondary); }
  .rod {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 15px;
    letter-spacing: 0.2em;
    color: var(--accent);
    display: block;
    margin-bottom: 6px;
  }
  .checks { font-size: 40px; letter-spacing: 16px; color: var(--success); margin: 18px 0 6px; }
  .checks .bad { color: var(--alert); }
---

<!-- _class: cover -->

# AI 時代的<br>取捨與決策樹

## 何時 Vibe、何時 SDD、何時放手讓 AI 跑

<div class="meta">SOFTWARE ENGINEERING IN THE AGENT ERA · 2026</div>

<!--
不自我介紹超過 20 秒，直接進下一頁。
-->


---


<!-- _class: statement -->

<div class="center">

Spec 寫了 **5,000 行**。
AI 一次生成了整個語音聊天系統。

上線壞掉那天——
<span class="punch">沒有人分得出，錯在模型、介面，還是實作。</span>

<span class="dim">真實案例</span>

</div>

<!--
唸完停三秒。問現場：「有人寫過一千行以上的 spec 嗎？」
出處（口頭）：YC 團隊訪談，2026。
-->


---


## 更可怕的是：測試全綠，邏輯是錯的

<br>

以前的錯：`SyntaxError` ——一跑就炸。

現在的錯：架構合理、API 能跑、測試全綠。

**但 domain logic 是錯的——三個月後才有人發現。**

<div class="checks">✓ ✓ ✓ <span class="bad">✗</span> ✓ ✓</div>

<span class="muted">錯誤沒有變少，它變安靜了。</span>

<!--
金句收尾：「錯誤沒有變少，它變安靜了。」
-->


---


<!-- _class: statement -->

<div class="center">

<span class="punch">AI Engineering<br>= 問題定義 × 環境 × 回饋 × 驗證</span>

模型只是**乘數**。
乘在 0.2 的系統上，十倍速度 = 十倍速製造錯誤。

</div>

<!--
「今天整場，就講這一行。後面全是證據。」
-->


---


## 今天給四支釣竿，不給魚

<br>

**釣竿 ①**　什麼時候該從 Vibe 升級成 SDD？

**釣竿 ②**　這份文件到底該不該寫？

**釣竿 ③**　AI 犯錯，該修哪一層？

**釣竿 ④**　什麼時候可以放手讓它自己跑？

<br>

<span class="muted">工具清單在最後一頁 QR，不用抄筆記。</span>

<!--
每支釣竿是一個「以後問自己的問題」，不是答案。
-->


---


## AI 不會停下來問你——它會很有自信地做完錯的事

<br>

**41%** 的真實 coding session，已經是「AI 寫幾乎全部 code」。

AI 產生的 code，真正留在 commit 裡的**不到一半**。

主動開口問「我理解對嗎？」的——**幾乎沒有**。

<br>

*Autonomy 正在跑得比 Oversight 快。*

<span class="muted">Stanford SWE-chat, 2026</span>

<!--
「而且模型越強，這件事越危險——因為錯得越像對的。」
-->


---


<!-- _class: statement -->

<div class="center">

<span class="muted">Spec 寫了 ≠ 真相</span>
<span class="muted">AI 說完成 ≠ 真相</span>
<span class="muted">Code 能編譯 ≠ 真相</span>
<span class="muted">測試是綠的 ≠ 真相</span>

<span class="punch">No Evidence, No Done.</span>

</div>

<!--
「這五個字，是後面所有決策樹的地基。」
-->


---


## Vibe 和 SDD 不是路線之爭，是同一條曲線的兩端

<br>

```
  不知道答案                                        知道答案
  ────────────────────────────────────────────────────►
  Vibe                                Spec / Test / Contract
  推翻很便宜                                    修改很貴
```

<br>

**橫軸是確定性，不是時間。**

<span class="muted">越不知道答案，越應該 Vibe；越確定的東西，越應該釘死。</span>

<!--
這一頁破掉「選邊站」的框架，下一頁才給階段。
-->


---


## 文件量跟確定性走，不跟時間走

<br>

```
                                  ┌─ Productize   PRD / QA / Runbook
                   ┌─ Systemize   │  Architecture / Contract / ADR
      ┌─ Stabilize │  小 Spec + Acceptance Test
 ┌─ Explore        │
 │  PROJECT.md 一頁就夠
 │
 └──────────────────────────────────────────────►
    文件量 = f( 確定性 × 風險 × 依賴人數 )
```

<br>

<span class="muted">每一階寫的是「最小」——不是升到這階就把全套補齊。</span>

<!--
Free Vibe 只要一頁 PROJECT.md；文件跟著確定性長，不跟著日曆長。
-->


---


## 升級看四個訊號，不看週數

<span class="rod">釣竿 ①</span>

<br>

**1.** 出現「不能隨便改」的東西　<span class="muted">API 被前端用了、DB 有真資料了</span>

**2.** 長出第二個模組　<span class="muted">A 到底該傳什麼給 B？</span>

**3.** 同一種 regression 重複發生　<span class="muted">修 A 壞 B</span>

**4.** 你忘記當初為什麼這樣設計

<br>

<span class="muted">中兩個以上，你已經欠文件債了。</span>

<!--
每個訊號配一句現場例子，各十秒。
-->


---


## 九個角色，其實是九份文件

<br>

| | | |
|---|---|---|
| PM → **PRD** | UX → **User Flow** | SA → **SRS** |
| Architect → **ADR** | SD → **模組設計** | DBA → **Schema** |
| Dev → **Code** | QA → **Test Plan** | DevOps → **Runbook** |

<br>

<span class="muted">三十年來我們以為在雇九個人，其實是在買九份文件。</span>

<!--
視覺重心在文件不在職稱。這是「文件不是多就有用」的鋪墊。
-->


---


<!-- _class: statement -->

<div class="center">

九個人 → 兩三個人。
九份產出 → **一份都沒少**。

<span class="punch">那——九份都要寫嗎？</span>

</div>

<!--
問句停住，不回答，直接翻下一頁。本幕唯一的懸念鉤。
-->


---


## 文件不是多就有用

<br>

Waterfall 怎麼死的？**文件成本 > 溝通成本。**

文件只有三種：

<div class="highlight">

**描述** —— 寫完就開始過期
**規格** —— 可以被驗證
**證據** —— 已經被驗證

值得維護的，只有後兩種。

</div>

<span class="muted">AI 時代死得更快——描述性文件塞進 context，是在污染 AI 的世界觀。</span>

<!--
全場核心觀點頁。語速放慢。
-->


---


## 這個知識不寫下來，AI 下次會重新猜一次嗎？

<span class="rod">釣竿 ②</span>

<br>

**會重新猜 → 固化：**

　　需求 → Spec　｜　行為 → Test
　　介面 → Contract　｜　決策 → ADR

<br>

**不會 → 不要寫。**

<!--
「這一問淘汰掉的文件，比任何模板產生的都多。」
-->


---


<!-- _class: split -->

## 能當真相的東西，不要寫成散文

<div class="columns">
<div class="con" style="padding:16px 20px;border-radius:8px;border-top:4px solid var(--alert);background:rgba(232,99,79,0.08);">

**會過期**

「API request 應包含
name、email、age」

<span class="muted">三個月後就是謊言</span>

</div>
<div class="pro" style="padding:16px 20px;border-radius:8px;border-top:4px solid var(--success);background:rgba(91,151,112,0.10);">

**是真相**

```python
class UserRequest(BaseModel):
    name: str
    email: EmailStr
    age: int
```

</div>
</div>

<br>

<span class="muted">SDD ≠ Markdown Driven Development。</span>

<!--
「左邊那句話三個月後就是謊言；右邊那段 code 永遠不會。」
-->


---


## 開發迴圈變成六步

<br>

```
   Frame → Challenge → Contract → Execute → Verify → Learn
    (人)     (人)        (人)      (AI)      (AI)     (人)
     ▲                                                 │
     └─────────────────────────────────────────────────┘
```

<br>

AI 只出現在兩步。

**剩下四步，就是九個角色濃縮之後剩下的判斷。**

<!--
呼應九角色，一句帶過即可，不展開。
-->


---


## AI 犯錯，修系統不修 prompt

<span class="rod">釣竿 ③</span>

<br>

AI 犯錯時，只問一句：

**「這類錯，下次怎麼被自動擋住？」**

<br>

Test？　Lint？　Architecture rule？　Context？　CI？

<br>

*Failure becomes Harness.*

<span class="muted">重打 prompt 是把同一個錯再租一次；寫進 harness 是買斷它。</span>

<!--
租 vs 買斷——這是本頁的記憶點。
-->


---


## 沒寫進 repo 的決策，等於沒發生過

<br>

Slack 裡的共識、會議室的決定、你腦袋裡的原因——

對下一個開新 context 的 AI 而言：

**從來沒有發生過。**

<br>

沉澱：ADR　｜　Schema　｜　Contract　｜　Test　｜　Runbook

<br>

<span class="muted">你不是在寫文件給同事，你是在餵記憶給下一個 agent。</span>

<!--
Repo = AI 的長期記憶與世界模型。
-->


---


<!-- _class: statement -->

<div class="center">

<span class="punch">那……什麼時候可以放著讓它自己跑，<br>我去喝咖啡？</span>

</div>

<!--
「這是今天大家真正想問的問題，對吧。」停兩秒。
-->


---


<!-- _class: statement -->

<div class="center">

~~錯誤答案：模型夠聰明，就可以放手。~~

<span class="punch">Autonomy is earned<br>by verification.</span>

自主權不是模型給的，是**驗證**掙來的。

</div>

<!--
「模型 IQ 決定它能跑多快；你的驗證系統決定它能跑多遠。」
-->


---


## 多數人卡在 L2，卻想直接跳 L7

<br>

```
                                            ┌ L7 生產環境   ◄─ 多數人想去這
                                     ┌ L6 多 Agent
                              ┌ L5 長程任務
                       ┌ L4 自動修復迴圈
                ┌ L3 跑測試
         ┌ L2 改碼人審    ◄─ 多數人在這
   ┌ L1 建議                    ⋯⋯ L2 ⇢ L7 的捷徑 ⋯⋯
 L0 解釋                       （五千行 Spec 那家人走的路）
```

<!--
收 P2 的伏筆：「中間那條虛線捷徑，就是五千行 Spec 那家人走的路。」
-->


---


## 四個 Yes，才升一級

<span class="rod">釣竿 ④</span>

<br>

☐　我**觀察**得到它在做什麼嗎？

☐　我**評估**得到它做對了嗎？

☐　我**停**得下來嗎？

☐　我**滾**得回去嗎？

<br>

<span class="muted">這四問跟模型多強完全無關——全部在問你的系統。</span>

<!--
逐條唸，讓聽眾在心裡打勾。
-->


---


<!-- _class: statement -->

<div class="center">

不知道的，先 **Vibe**。

知道的，就**固化**。

有人依賴，就**正式化**。

</div>

<!--
逐句對應回三幕：「第一句是釣竿①、第二句是釣竿②、第三句是文件三分法。」
-->


---


<!-- _class: end -->

# 敢讓 AI 寫程式的系統

## 不是學怎麼讓 AI 寫程式——是學怎麼設計它

<br>

<span style="font-size:17px;opacity:0.85;">附錄自取：九角色速查卡 ｜ Excel Traceability ｜ Task Contract 模板 ｜ 12 類 Failure Modes</span>

<!--
「前者會被下一次模型升級淘汰，後者不會。謝謝大家。」
QR code 放這頁右下（待補圖）。
-->
