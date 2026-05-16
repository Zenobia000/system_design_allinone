---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.10 · Continuous Learning'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 10 · TOPIC 03</div>

# Continuous Learning
## *Keep Calm and Adapt or Die*


---


## WHY · 為何架構師最怕「停下來」？

<br>

<div class="highlight">

5 年前主流：Monolith + jQuery
3 年前主流：Microservices + React
今天主流：Modular monolith + Edge + AI

**技術換得快，「對的判斷」變得更難**——
5 年前對的，今天可能是反模式。

</div>

<br>

- 不持續學 → 用昨天的劍打今天的戰
- AI 工具更新極快 → 不跟上會被取代
- 但**不能追每個新東西**——要會「篩選」

> Source: `S16_Slides.pdf` · §Adapt or Die


---


## HOW · 學習資源金字塔

```
              ┌─────────────────┐
              │ 動手做 (10%)    │  POC · side project
              ├─────────────────┤
              │ 教別人 (15%)    │  conf talk · blog · mentor
              ├─────────────────┤
              │ 跟人聊 (25%)    │  社群 · 內部 chat
              ├─────────────────┤
              │ 讀深度文 (50%)  │  paper · engineering blog · book
              └─────────────────┘

   反金字塔：90% 看影片刷推 = 學了個寂寞
```

<br>

<span class="muted">**Linus 哲學**：跟著 Linux kernel mailing list 看了 5 年——勝過 5 年看抖音科技 KOL。</span>

> Source: `S16_Slides.pdf` · §Learning Pyramid


---


## HOW · 篩選框架（不追每個新技術）

<div class="stack">
  <div class="layer client"><strong>① 它解決真痛點嗎？</strong>　 還是包裝舊問題</div>
  <div class="layer app"><strong>② 是 Linus / Andy Hertzfeld 級別的人推嗎？</strong>　 信號 vs 噪音</div>
  <div class="layer data"><strong>③ 大廠 production 用了嗎？</strong>　 還是只有 demo</div>
  <div class="layer infra"><strong>④ 3 年前的同類產品還活著嗎？</strong></div>
</div>

<br>

<div class="highlight">

**經驗法則**：4 個 yes → 值得學。
3 個 yes → 觀察 6 個月。
< 3 → 忽略。

</div>

> Source: `S16_Slides.pdf` · §Tech Filter


---


## HOW · AI 時代的個人優化

| 工具 | 怎麼用 | 收益 |
|------|-------|------|
| Claude / GPT | 寫 ADR / 評估方案 | 設計疊代 3-5× 快 |
| Copilot | boilerplate code | 寫測試 / DTO 快 5× |
| LangGraph / Agents | 自動 RFC / risk audit | 自動化技術評審初稿 |
| Notebook LM | 啃 paper / RFC | 讀文獻 2× 快 |

<br>

<div class="alert">

**反模式**：把 AI 當「答案機」——它說什麼就信。
**對的用法**：當 brainstorm 夥伴，你做最終判斷。

</div>

> Source: `S16_Slides.pdf` · §AI as Co-Pilot


---


## TRADE-OFF · 深度 vs 廣度

<div class="tradeoff">
  <div class="pro">
    <h3>該深度</h3>
    <ul>
      <li>1-2 個核心領域（DB / 分散式 / AI）</li>
      <li>讀 paper、看 source code</li>
      <li>每年寫一篇深度技術文章</li>
      <li>能在 conf 上講 advanced 主題</li>
    </ul>
  </div>
  <div class="con">
    <h3>該廣度</h3>
    <ul>
      <li>所有主流技術概念認得</li>
      <li>能判斷新技術值不值得花時間</li>
      <li>跨領域對話流暢</li>
      <li>看得懂團隊其他人在做什麼</li>
    </ul>
  </div>
</div>

<div class="highlight">

**π 型人才**：兩個深度 + 一個寬廣面。
**架構師都是 π 型**——只有 T 型，會被淘汰。

</div>

> Source: `S16_Slides.pdf` · §π-shaped


---


<!-- _class: end -->

# Continuous Learning 完
## *軟實力三件套到手，全書收斂。*

<br>

<span class="lead">→ Ch.10 Recap</span>
