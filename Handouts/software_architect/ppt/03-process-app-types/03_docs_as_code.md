---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.3 · Docs as Code'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 03 · TOPIC 03</div>

# Docs as Code
## *架構文件不是寫給自己看的，是團隊契約*


---


## WHY · 為何 Word / Confluence 是反模式？

<br>

<div class="highlight">

**架構文件的命運**：寫完就過時。
除非：跟代碼住在一起，被 review、被 CI 檢查、被版本控制。

「文件即代碼」不是工具選擇，是**紀律**。

</div>

<br>

- Word 文件：寫完進雲端硬碟，3 個月後沒人找得到
- Confluence 頁面：更新失同步，code 改了文件不知道
- Markdown in Git：和代碼一起 PR，過時自然會被指出

> Source: `S6_Slides.pdf` · §Docs as Code


---


## HOW · 四種必備產出格式

| 文件類型 | 格式 | 工具 | 用途 |
|---------|------|------|------|
| 架構決策記錄 | Markdown | ADR template | 為什麼選 A 不選 B |
| 系統視覺化 | Mermaid | 內嵌 .md | C4 圖 · 流程圖 |
| API 規格 | OpenAPI YAML | Swagger / Redoc | 前後端契約 |
| 部署 / Runbook | Markdown | 內部 wiki | oncall 救命手冊 |

<br>

<div class="highlight">

**鐵律**：所有產出都必須能進 `git diff`。
不能 diff 的文件 = 失同步的開始。

</div>

> Source: `_source/03_Process_App_Types.md` · §Doc Formats


---


## HOW · ADR 範本

```markdown
# ADR-001 · 選擇 PostgreSQL 為主資料庫

Status: Accepted · 2026-05-15

## Context
我們需要 OLTP 主資料庫，預期 5k QPS、需 ACID。

## Decision
選擇 PostgreSQL 15，棄 MongoDB / MySQL。

## Consequences
+ 強 ACID · 完整 SQL · pgvector 未來可用
+ 招募容易
− 寫入擴展不如 NoSQL · 需 read replica
- 跨區同步較複雜

## Alternatives Considered
- MySQL: replication 成熟，但 JSON 支援弱
- MongoDB: schema-free，但 transaction 限制多
```

> Source: `_source/03_Process_App_Types.md` · §ADR Template


---


## HOW · AI 時代的隱性優勢

<div class="stack">
  <div class="layer client"><strong>① 文件即 prompt</strong>　 把 ADR + C4 圖貼給 AI → 生成 boilerplate code</div>
  <div class="layer app"><strong>② OpenAPI 自動生成 stub</strong>　 前後端同時工作不衝突</div>
  <div class="layer data"><strong>③ Mermaid 即圖即文</strong>　 AI 能讀懂、能修改、能延伸</div>
  <div class="layer infra"><strong>④ Git diff 出問題</strong>　 文件改了 code 沒改 → CI 報警</div>
</div>

<br>

<div class="highlight">

**洞察**：文件即代碼 = 給 AI 的高效溝通協定。
未來「會寫好 ADR 的架構師」比「會寫好 code 的工程師」值錢。

</div>

> Source: `S6_Slides.pdf` · §AI-era Docs


---


## TRADE-OFF · 寫多少文件才夠？

<div class="tradeoff">
  <div class="pro">
    <h3>必寫</h3>
    <ul>
      <li>每個重大選型一份 ADR</li>
      <li>C4 Level 1-2 (Context + Container)</li>
      <li>API 規格（OpenAPI）</li>
      <li>核心業務資料流</li>
      <li>oncall runbook</li>
    </ul>
  </div>
  <div class="con">
    <h3>可以省略</h3>
    <ul>
      <li>C4 Level 4 (Code) · 看 code</li>
      <li>每個 function 的 javadoc</li>
      <li>純內部 utility 文件</li>
      <li>變動頻繁的 UI flow</li>
      <li>3 個月內會被改掉的部分</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：寫了 200 頁 Word，沒人看；沒寫 ADR，半年後吵架。**質 > 量。**

</div>

> Source: `S6_Slides.pdf` · §Doc Right-sizing


---


<!-- _class: end -->

# Docs as Code 完
## *流程 + 類型 + 文件三件套到手。*

<br>

<span class="lead">→ Ch.3 Recap</span>
