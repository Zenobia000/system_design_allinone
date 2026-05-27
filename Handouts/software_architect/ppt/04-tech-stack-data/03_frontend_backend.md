---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.4 · Frontend / Backend'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 04 · TOPIC 03</div>

# Frontend / Backend Split
## *前後端分離的隱性成本*


---


## WHY · 為何「全棧 monolith」反而效率更高（早期）？

<br>

<div class="highlight">

前後端分離是**規模化的解法**，不是**新專案的預設**。

MVP 階段：Rails / Django monolith → 一個 PR 涵蓋前後端。
規模化後：Web API + SPA → 才開始享受分離紅利。

</div>

<br>

- 分離 = 兩套 build、兩套部署、兩個 team（或同 team 切 context）
- 早期分離 = 雙倍的 boilerplate + 多一倍 bug 表面
- 對的時機：團隊 > 8 人、有專職前後端

> Source: `S7_Slides.pdf` · §Monolith vs Split


---


## HOW · 三種架構模式

| 模式 | 適用階段 | 範例 |
|------|---------|------|
| **Server-rendered Monolith** | MVP / 小團隊 | Django + jinja · Rails ERB |
| **BFF + SPA** | 中型 / 多前端 | Next.js + REST API |
| **Microservices + Multi-frontend** | 大型 / 多產品線 | Web + Mobile + Admin 各自 SPA |

<br>

<div class="highlight">

**演進路徑**：① → ② → ③，**不要跳級**。
直接從 0 跳到 ③ 是 90% 早期創業團隊的死法。

</div>

> Source: `_source/04_Tech_Stack_Data.md` · §Frontend Architecture


---


## HOW · 前端框架 2026 速覽

| 框架 | 強項 | 弱項 |
|------|------|------|
| **React + Next.js** | 生態最大 · SSR/SSG 完備 | 過度工程化、學習曲線陡 |
| **Vue 3 + Nuxt** | API 直觀 · 漸進式 | 企業採用較少 |
| **Svelte / SvelteKit** | 編譯時優化 · bundle 小 | 生態較淺 |
| **Solid / Qwik** | 細粒度反應、效能極佳 | 新 · 招人難 |
| **Alpine + HTMX** | 後端渲染 · 無 SPA 包袱 | 不適合複雜互動 |

<br>

<span class="muted">**口訣**：「選 React 不會被開除」——保守選擇的優勢在於人才市場。</span>

> Source: `S7_Slides.pdf` · §Frontend 2026


---


## HOW · API 契約是分離成敗關鍵

<div class="stack">
  <div class="layer client"><strong>OpenAPI 規格優先</strong>　 寫 spec → 生 stub → 前後端並行</div>
  <div class="layer app"><strong>Type-safe API</strong>　 tRPC / GraphQL codegen / gRPC</div>
  <div class="layer data"><strong>Versioning 策略</strong>　 /v1 路徑 · 棄用至少 6 個月</div>
  <div class="layer infra"><strong>Mock server</strong>　 前端不等後端 · Prism / msw</div>
</div>

<br>

<div class="highlight">

**洞察**：分離後最大的痛是「**等別人的 API**」。
解法：先定 contract，雙方各自 mock 開發。

</div>

> Source: `S7_Slides.pdf` · §API Contract


---


## TRADE-OFF · 分離的紅利 vs 代價

<div class="tradeoff">
  <div class="pro">
    <h3>分離的紅利</h3>
    <ul>
      <li>前後端獨立部署</li>
      <li>不同人才招聘容易</li>
      <li>多前端共用後端</li>
      <li>SPA 提升使用體驗</li>
      <li>適合 Mobile + Web 同源</li>
    </ul>
  </div>
  <div class="con">
    <h3>分離的代價</h3>
    <ul>
      <li>兩套 CI/CD</li>
      <li>API contract drift</li>
      <li>跨域 / 認證複雜化</li>
      <li>SEO 需 SSR 補救</li>
      <li>整體 latency 增加</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：3 人團隊做 React SPA + 獨立後端，每個 feature 改兩處——效率不如 Rails 一半。

</div>

> Source: `S7_Slides.pdf` · §Split Cost-Benefit


---


<!-- _class: end -->

# Frontend / Backend 完
## *選型三件套到手，章末收斂。*

<br>

<span class="lead">→ Ch.4 Recap</span>
