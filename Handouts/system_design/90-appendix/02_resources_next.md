---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Resources · 後續學習'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">RESOURCES · 92</div>

# Resources & Next Steps
## *讀完本課後，下一站去哪*

<!--
開場 30 秒：
- 這份不要當「百科全書」讀，當「按需查找」用
- 分 4 大類：書、論文、Engineering blog、訂閱源
- 講者語氣：精選為主，避免過量
-->

---

## OVERVIEW · 後續學習路徑

<div class="stack">
  <div class="layer client"><strong>① 經典書</strong>　 5 本 · 系統地建構 mental model</div>
  <div class="layer app"><strong>② 必讀論文</strong>　 10 篇 · 業界源頭的原始想法</div>
  <div class="layer data"><strong>③ Engineering Blog</strong>　 8 個 · 實戰一手經驗</div>
  <div class="layer infra"><strong>④ 訂閱源</strong>　 Newsletter / Podcast / YouTube</div>
</div>

<br>

<span class="muted">**讀法**：先選 1 本書 + 1 個 blog 訂起來。**廣度後深度**——別嘗試一次吃完。</span>

> Source: 業界公認進階學習資源

---

## ① BOOKS · 5 本經典

| # | 書名 | 作者 | 重點 |
|---|------|------|------|
| 1 | **Designing Data-Intensive Applications** | Martin Kleppmann | 分散式資料系統聖經 · 必讀 |
| 2 | **System Design Interview Vol 1 & 2** | Alex Xu | 面試導向 · 案例豐富 |
| 3 | **Database Internals** | Alex Petrov | 資料庫底層原理 · B+/LSM/Replication |
| 4 | **Site Reliability Engineering** | Google | SRE 思維 · 免費線上版 |
| 5 | **Building Microservices (2nd ed)** | Sam Newman | 微服務拆分原則 · 反 hype |

<br>

<div class="highlight">

**新手只選一本**：**DDIA**（書 #1）。每章配本書 1 個章節讀，是最佳補充。

</div>

> Source: 業界共識

---

## ① BOOKS · 進階書單

<div class="tradeoff">
  <div class="pro">
    <h3>進入企業架構</h3>
    <ul>
      <li><strong>Software Architecture: The Hard Parts</strong> - Ford</li>
      <li><strong>Fundamentals of Software Architecture</strong> - Richards</li>
      <li><strong>Domain-Driven Design</strong> - Eric Evans</li>
      <li><strong>Implementing Domain-Driven Design</strong> - Vaughn Vernon</li>
    </ul>
  </div>
  <div class="con">
    <h3>進入分散式深層</h3>
    <ul>
      <li><strong>Distributed Systems</strong> - van Steen & Tanenbaum</li>
      <li><strong>Database Reliability Engineering</strong> - Campbell</li>
      <li><strong>Streaming Systems</strong> - Akidau</li>
      <li><strong>Designing Distributed Systems</strong> - Brendan Burns</li>
    </ul>
  </div>
</div>

> Source: O'Reilly · Manning · Addison-Wesley

---

## ② PAPERS · 10 篇必讀

| 主題 | 論文 | 影響 |
|------|------|------|
| 分散式儲存 | **GFS**（2003） | HDFS 等的祖宗 |
| 平行運算 | **MapReduce**（2004） | Hadoop / Spark 的前身 |
| KV 商店 | **Dynamo**（2007） | Cassandra / DynamoDB 起源 |
| 列式 DB | **Bigtable**（2006） | HBase / Cassandra 模型 |
| 全球一致 DB | **Spanner**（2012） | TrueTime + 分散式 SQL |
| 共識 | **Raft**（2014） | etcd / Consul / TiKV |
| 訊息流 | **Kafka**（2011） | LinkedIn 工程文 |
| 一致性 | **CAP 12 Years Later**（2012） | Brewer 親自重講 |
| 可觀測性 | **Dapper**（2010） | OpenTelemetry / Jaeger 原型 |
| AI Retrieval | **RAG**（2020） | Lewis et al. · Meta |

> Source: 整合 ACM / Google / Meta / LinkedIn 公開論文

---

## ② PAPERS · 讀法建議

<div class="stack">
  <div class="layer client"><strong>① 先讀 Abstract + Intro + Conclusion</strong>　 90% 論文這 3 段就夠</div>
  <div class="layer app"><strong>② 圖表優先</strong>　 系統論文的精華在 Figure 1（架構圖）</div>
  <div class="layer data"><strong>③ 配 blog 解讀</strong>　 The Morning Paper · High Scalability 都有</div>
  <div class="layer infra"><strong>④ 找對應實作</strong>　 Raft → etcd source · Dynamo → Cassandra design doc</div>
</div>

<br>

<div class="highlight">

**論文不是教材是 reference**——遇到問題回去查，比一次讀完有效 10 倍。

</div>

> Source: 學術閱讀方法論

---

## ③ ENGINEERING BLOGS · 8 個必訂

| Blog | 強項 | 頻率 |
|------|------|------|
| **High Scalability** | 系統架構案例彙整 | 週 |
| **Netflix Tech Blog** | 串流 / Cache / 微服務 | 週 |
| **Uber Engineering** | Geo / Real-time / Mobile | 月 |
| **Airbnb Engineering** | Search / ML / Data | 月 |
| **Stripe Engineering** | 金流 / API / Reliability | 月 |
| **Cloudflare Blog** | Edge / Network / Security | 週 |
| **Discord Engineering** | Real-time scaling | 月 |
| **Meta Engineering** | 大規模分散式 | 週 |

<br>

<span class="muted">**訂閱方式**：用 RSS reader（Feedly）統一收。**不要靠社群媒體**——演算法會漏。</span>

> Source: 業界公開資源

---

## ③ BLOGS · 個人作者

<div class="tradeoff">
  <div class="pro">
    <h3>架構導向</h3>
    <ul>
      <li><strong>Martin Fowler</strong> - 模式 / 重構</li>
      <li><strong>Marc Brooker（AWS）</strong> - 分散式系統實踐</li>
      <li><strong>Adrian Colyer</strong> - The Morning Paper</li>
      <li><strong>Henrik Kniberg</strong> - Spotify model 等</li>
    </ul>
  </div>
  <div class="con">
    <h3>資料庫導向</h3>
    <ul>
      <li><strong>Martin Kleppmann</strong> - DDIA 作者博客</li>
      <li><strong>Daniel Abadi</strong> - 資料庫研究</li>
      <li><strong>Brendan Gregg</strong> - 效能工程</li>
      <li><strong>Aphyr</strong>（Kyle Kingsbury）- Jepsen 一致性測試</li>
    </ul>
  </div>
</div>

> Source: 個人技術博客圈

---

## ③ BLOGS · System Design 教學

| 來源 | 形式 | 適用 |
|------|------|------|
| **ByteByteGo**（Alex Xu） | YouTube + Newsletter | 視覺化、入門好 |
| **System Design Primer**（GitHub） | 開源整合 | 自學起點 |
| **The Pragmatic Engineer**（Gergely Orosz） | Newsletter（付費） | 大公司內幕 |
| **Hello Interview** | YouTube | 面試實戰 |
| **Tech Dummies / Gaurav Sen** | YouTube | 印度技術頻道 · 系統設計 |
| **Awesome Distributed Systems** | GitHub list | 論文 + blog 彙整 |

> Source: 教學資源圈

---

## ④ NEWSLETTERS · 訂閱

<div class="stack">
  <div class="layer client"><strong>ByteByteGo</strong>　 每週一個系統設計概念 · 大量視覺化</div>
  <div class="layer app"><strong>The Pragmatic Engineer</strong>　 大公司工程文化 + 內部 case study（付費）</div>
  <div class="layer data"><strong>InfoQ Architecture & Design</strong>　 業界趨勢 + 大會議題</div>
  <div class="layer infra"><strong>The New Stack</strong>　 雲原生 / K8s / observability</div>
  <div class="layer infra"><strong>Quastor</strong>　 Engineering blog 摘要重整</div>
</div>

<br>

<span class="muted">**訂太多會讀不完**。**選 2 個就好**——一個面寬、一個面深。</span>

> Source: Substack / Medium 平台

---

## ④ PODCASTS · 通勤聽

| Podcast | 主持 | 主題 |
|---------|------|------|
| **Software Engineering Daily** | Jeff Meyerson 等 | 各領域技術 daily |
| **The InfoQ Podcast** | InfoQ 編輯 | 大公司架構案例 |
| **Distributed Systems Podcast** | Allen Helton | 分散式深度討論 |
| **Lex Fridman**（部分集數） | Lex | 巨頭工程師訪談 |
| **CoRecursive** | Adam Gordon Bell | 系統設計故事 |
| **The Changelog** | Jerod Santo · Adam Stacoviak | Open source 文化 |

<br>

<span class="muted">**通勤路上聽**：1 集約 60 分 · 1 週聽 1-2 集就夠。</span>

> Source: Apple Podcasts / Spotify

---

## ④ YOUTUBE · 視覺化資源

<div class="tradeoff">
  <div class="pro">
    <h3>系統設計</h3>
    <ul>
      <li>ByteByteGo（最多訂閱）</li>
      <li>Hello Interview（面試實戰）</li>
      <li>Gaurav Sen / Tech Dummies</li>
      <li>System Design Concepts by Mikhail</li>
    </ul>
  </div>
  <div class="con">
    <h3>分散式系統</h3>
    <ul>
      <li>MIT 6.824 公開課（必看）</li>
      <li>Stanford CS244B</li>
      <li>Tim Berglund（Confluent 系列）</li>
      <li>Jepsen analyses（一致性測試）</li>
    </ul>
  </div>
</div>

<div class="highlight">

**MIT 6.824 是分散式系統的金標準**——免費課程 + 完整 Lab（用 Go 實作 Raft / MapReduce）。

</div>

> Source: YouTube · MIT OpenCourseWare

---

## NEXT STEPS · 接下來怎麼做

<div class="stack">
  <div class="layer client"><strong>① 寫一篇你自己的 Capstone</strong>　 選一個你工作系統 · 用 4 步驟分析</div>
  <div class="layer app"><strong>② 加入讀書會</strong>　 找 3-5 人共讀 DDIA · 每週一章</div>
  <div class="layer data"><strong>③ 寫 blog</strong>　 把工作中的設計決策寫成短文 · 強迫自己思考 trade-off</div>
  <div class="layer infra"><strong>④ 實作一個 toy system</strong>　 例如：用 Go 寫 mini Kafka / Raft</div>
  <div class="layer infra"><strong>⑤ 從面試題反向學</strong>　 每週設計 1 個系統，無論工作有沒有需要</div>
</div>

<br>

<div class="highlight">

**真正讓你進步的不是讀完這份簡報，而是用學到的 framework 去拆解新問題**。

</div>

> Source: 學習方法論共識

---

## CLOSING · 最後一張投影片

<br>
<br>

<div class="big-number">7 章 + 5 案例</div>

<br>

涵蓋了系統設計面試與工作 **80% 的場景**。

剩下的 20% 不靠讀，**靠寫、靠錯、靠改**。

<br>

<div class="highlight">

**Linus 的話**：「**Talk is cheap. Show me the code.**」  
讀完這份不去寫，就只是談話。**寫一個系統，再回來看這份**——你會看到完全不同的東西。

</div>

> Source: 課程設計者寄語

---

<!-- _class: end -->

# 系統設計實戰 · 完
## *Foundation 站穩 → 資料散開 → 設施撐住 → 故障存活 → 擴展爆裂 → 進階收尾*

<br>

<span class="lead">願你下一個系統，**設計得簡單、跑得穩、改得動**。</span>
