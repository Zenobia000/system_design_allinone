---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.4 · Rational Selection'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 04 · TOPIC 01</div>

# Rational Selection
## *別追潮流，要追問題*


---


## WHY · 為何「最新最潮」是陷阱？

<br>

<div class="highlight">

**Resume-Driven Development**：選技術是為了履歷好看，不是為了解問題。
3 年後變成「我們公司被 framework 鎖死」的悲劇。

**架構師選技術的職責：對 5 年後的自己負責。**

</div>

<br>

- 新技術 = 不穩定 API + 社群小 + 招不到人
- 成熟技術 = 文件齊全 + 邊角 case 都被踩過 + 人才市場大
- **新技術值得追**：當且僅當解決了舊技術解不了的痛

> Source: `S7_Slides.pdf` · §Hype vs Maturity


---


<!-- _class: compact -->

## HOW · 六維度評分表

| 維度 | 問題 | 評分依據 |
|------|------|---------|
| **適用性** | 解決我們的核心問題？ | use case match 程度 |
| **成熟度** | 多少公司在 production 用？ | 上市時間、知名 case |
| **社群** | StackOverflow 答案數 / GitHub stars | 活躍 contributors |
| **人才** | 半年內招得到 5 個？ | 求職網職缺數 |
| **成本** | License + 雲端 + 訓練成本？ | 5 年 TCO |
| **演進** | Vendor 還在嗎？fork 容易嗎？ | 過去 3 年版本節奏 |

<br>

<span class="muted">**口訣**：每維度 1–5 分，總分 < 20 → 慎選；總分 < 15 → 不要。</span>

> Source: `S7_Slides.pdf` · §Scoring Matrix


---


## HOW · 後端語言對照（2026）

| 語言 | 強項 | 弱項 | 適用場景 |
|------|------|------|---------|
| **Python** | AI / Data / 快速開發 | runtime 慢 · GIL | ML pipeline · 內部工具 · API |
| **Node.js** | I/O 密集 · 全端共用 | CPU 密集弱 · npm 生態複雜 | BFF · 即時通訊 · serverless |
| **Java** | 穩定 · enterprise · JVM 生態 | 啟動慢 · 樣板多 | 銀行 · 大型企業 · Spring 棧 |
| **Go** | 並發強 · 編譯快 · 雲原生 | 生態較淺 · 泛型晚 | 微服務 · K8s 周邊 · CLI |
| **C# / .NET** | 微軟生態 · 工具鏈強 | Linux 部署較新 | 企業內部 · 遊戲 (Unity) |

> Source: `S7_Slides.pdf` · §Backend Stack 2026


---


## TRADE-OFF · 該追新還是守舊？

<div class="tradeoff">
  <div class="pro">
    <h3>可以追新（新技術值得試）</h3>
    <ul>
      <li>解決舊技術做不到的痛</li>
      <li>有 1 個 senior 已熟練</li>
      <li>後備方案存在</li>
      <li>POC 先驗證</li>
      <li>小範圍上線</li>
    </ul>
  </div>
  <div class="con">
    <h3>應該守舊（boring tech）</h3>
    <ul>
      <li>核心交易系統</li>
      <li>規模小團隊（< 10 人）</li>
      <li>沒人懂的新框架</li>
      <li>無 fallback 路徑</li>
      <li>合規敏感領域</li>
    </ul>
  </div>
</div>

<div class="alert">

**「Choose Boring Technology」原則**：每個團隊有 *innovation token* 配額——一年 1-2 個。花在解決真痛點，別花在「我想試新東西」。

</div>

> Source: `S7_Slides.pdf` · §Innovation Tokens


---


<!-- _class: end -->

# Rational Selection 完
## *框架有了，下一站講 DB 取捨。*

<br>

<span class="lead">→ 4.2 SQL vs NoSQL</span>
