---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.12 · Comparison'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 12 · TOPIC 04</div>

# 三系統比較
## *同一招的三種長相*


---


## COMPARE · 3 × 3 矩陣

# SDLC 三階段 × 三系統

<!-- _class: compact -->

| 階段 | 電商 | 直播 | AI 影視 |
|---|---|---|---|
| **Discovery**（PM/UX/SA） | 狀態一致性 | 延遲合約 | 定義「好」 |
| **Design**（Arch/SD/DBA） | 事務 + 冪等 | CDN + 邊緣 | 非同步 + GPU 池 |
| **Build & Run**（Dev/QA/DevOps） | 退款對帳 | 突發流量 | 成本失控 |

<br>

<span class="muted">**讀法**：9 個 cell 各對應一個核心挑戰——同一套角色，三種完全不同的「最痛點」。</span>

> Source: _source/braindump.md · §三系統 3×3 比較矩陣


---


## COMPARE · 同一招的三種長相

# 「冪等」（Idempotency）在三系統

<!-- _class: compact -->

| 系統 | 冪等出現在哪 | 為什麼 |
|---|---|---|
| **電商** | Payment Callback API | 金流商可能重送 callback，不能重複扣款 |
| **直播** | 進房 / 心跳 API | 網路不穩會重試，不能重複計人數 |
| **AI 影視** | 生成任務 submit API | 用戶可能 double-click，不能重複收費 |

<br>

<div class="note">

**同一個技術概念**（冪等），**三個截然不同的業務動機**——但都是「網路重試造成重複動作」這個問題的不同臉孔。

</div>

<span class="muted">**架構師的價值**：能把同一招套到不同領域——這就是**模式語言**的力量。</span>

> Source: _source/braindump.md · §訂單系統實例


---


## COMPARE · 三大發現

<div class="highlight">

**發現 1**：**角色不變、權重會變**——9 個角色一個都不能少，但每個系統的「重心」不同。

</div>

<div class="highlight">

**發現 2**：**NFR 是跨角色合約**——延遲、成本、可靠性不是 Architect 一人的事。

</div>

<div class="highlight">

**發現 3**：**領域變化會讓角色職責漂移**——AI 影視裡 QA 從驗證變成「定義」。

</div>

<br>

<span class="muted">**這就是本教材想證明的事**：軟體工程的角色框架是**通用**的，但**應用是領域特化**的。</span>

> Source: _source/braindump.md · §結語


---


<!-- _class: end -->

# Comparison 完
## *三系統看完，最後收成口訣。*

<br>

<span class="lead">→ 12.99 Recap</span>
