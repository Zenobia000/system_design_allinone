---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · Layered Architecture'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · TOPIC 01</div>

# Layered Architecture
## *最老的模式，最值錢的模式*


---


## WHY · 為何 50 年前的模式還在用？

<br>

<div class="highlight">

**分層架構**自 1970 年代誕生，至今 80% 企業應用仍在用。
不是因為新模式不夠好——是因為**這套基本盤夠用、夠清楚、夠容易招人**。

別瞧不起 boring tech。

</div>

<br>

- 邊界清楚 → 新人 onboarding 快
- 責任分離 → 改 UI 不動 DB
- 廣為人知 → AI 也認得

> Source: `S9_Slides.pdf` · §Why Layered


---


## HOW · 三層架構標準圖

```
   ┌─────────────────────────────┐
   │  Presentation (UI)          │  React / Vue / Mobile UI
   │  - 渲染 + user input         │
   ├─────────────────────────────┤
   │  Business Logic (BL)        │  Service / Use Case
   │  - 商業規則 + 流程            │
   ├─────────────────────────────┤
   │  Data Access (DAL)          │  Repository / ORM
   │  - DB 操作 + 外部 API 調用    │
   └─────────────────────────────┘
       依賴方向：UI → BL → DAL
       上層不能跨層直接呼叫 DAL
```

<span class="muted">**鐵律**：UI 永遠不該直接 import DAL。違反 = 維護災難開始。</span>

> Source: `S9_Slides.pdf` · §Three-Layer Standard


---


## HOW · 演進：四層 + 進階

<div class="stack">
  <div class="layer client"><strong>+ API / Controller 層</strong>　 介於 UI 與 BL · 處理 HTTP → DTO 轉換</div>
  <div class="layer app"><strong>+ Domain Model 層</strong>　 BL 內細分 · entity 跟 use case 分開</div>
  <div class="layer data"><strong>+ Infrastructure 層</strong>　 DAL + 第三方 SDK + 訊息發送</div>
  <div class="layer infra"><strong>+ Shared Kernel</strong>　 跨模組共用的 utility / 型別</div>
</div>

<br>

<div class="highlight">

**漸進演進**：3 層 → 4 層 → DDD onion → Hexagonal。
**不要直接跳到 Hexagonal** —— 99% 系統不需要那麼多層。

</div>

> Source: `S9_Slides.pdf` · §Layer Evolution


---


## HOW · DDD 與分層的對應

| 經典分層 | DDD Tactical Pattern |
|---------|--------------------|
| Presentation | Application Service |
| Business Logic | Domain Model + Domain Service |
| Data Access | Repository + Specification |
| Infrastructure | Adapter + Anti-Corruption Layer |

<br>

<span class="muted">**理解順序**：先學經典 3 層 → 用 1 年 → 看出痛點 → 才學 DDD。一上來就 DDD = 走火入魔。</span>

> Source: `S9_Slides.pdf` · §Layered vs DDD


---


## TRADE-OFF · 嚴格分層 vs 實用主義

<div class="tradeoff">
  <div class="pro">
    <h3>嚴格分層好處</h3>
    <ul>
      <li>邊界清楚 · 新人快</li>
      <li>單元測試容易</li>
      <li>各層可獨立替換</li>
      <li>權責分明</li>
    </ul>
  </div>
  <div class="con">
    <h3>嚴格分層代價</h3>
    <ul>
      <li>簡單 CRUD 也要寫 3 套類</li>
      <li>跨層 mapping 耗時</li>
      <li>效能略損（多層調用）</li>
      <li>對小專案是過度設計</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：小型內部工具 50 個 endpoint，每個都做完整 3 層 + DTO mapping。半年後沒人想維護。

</div>

> Source: `S9_Slides.pdf` · §Strict vs Pragmatic


---


<!-- _class: end -->

# Layered Architecture 完
## *骨架立了，下一站講原則。*

<br>

<span class="lead">→ 6.2 SOLID + DI</span>
