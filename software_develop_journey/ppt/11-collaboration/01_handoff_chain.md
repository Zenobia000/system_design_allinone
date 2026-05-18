---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.11 · Handoff Chain'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 11 · TOPIC 01</div>

# 上下游交棒
## *責任鏈·誰把什麼交給誰*


---


## HANDOFF · WHY

<span class="kicker">SECTION 1 · WHY</span>

# 為什麼要看「交棒」？

<br>

<div class="highlight">

**新手最大的盲點**：以為自己只要做好自己那一段。
**真相**：每個角色的產出**就是下個角色的輸入**——產出爛，下游全部跟著爛。

</div>

<br>

- PM 寫的 PRD 模糊 → UX 沒法畫 wireframe
- SA 漏掉狀態 → Architect 沒法切服務
- DBA 沒設 index → Dev 上線變慢
- QA 沒寫測試 → DevOps 半夜被叫起來

<span class="muted">**交棒不是傳球，是傳責任**。每一棒接得不好，下一棒就接得很痛。</span>

> Source: _source/braindump.md · §責任鏈


---


## HANDOFF · 責任鏈完整版

```
   PM         │  Why & What       ──►  商業問題
    ▼
   UX         │  How user behaves ──►  使用者旅程
    ▼
   SA         │  How system behaves ──►  系統規格
    ▼
   Architect  │  How system survives ──►  架構藍圖
    ▼
   SD         │  How modules grow ──►  模組與 API
    ▼
   DBA        │  How data lives   ──►  資料模型
    ▼
   Dev        │  How code implements ──►  程式碼
    ▼
   QA         │  How correctness verified ──►  測試
    ▼
   DevOps     │  How system runs  ──►  上線維運
```

<span class="muted">**這條鏈每一棒都在「翻譯」**——把上一棒的抽象翻成更具體的東西。</span>

> Source: _source/braindump.md · §責任鏈


---


## HANDOFF · 交棒文件範例

<!-- _class: compact -->

| 從 → 到 | 交棒文件 |
|---|---|
| PM → UX | PRD + User Story + KPI |
| PM → SA | PRD + Business Goal |
| UX → Dev (FE) | Wireframe + Mockup + Design System |
| SA → Architect | Use Case + State Diagram + Permission Matrix |
| Architect → SD | Architecture Diagram + Service Boundary + NFR |
| SD → Dev | API Spec + Sequence Diagram + Module Design |
| Architect → DBA | Data Ownership + Consistency Strategy |
| SD → DBA | Data Access Pattern + Query Plan |
| Dev → QA | PR + Unit Test + Test Plan |
| QA → DevOps | Pass Report + Test Coverage |
| Dev / DevOps → SRE | Runbook + Monitoring Spec |

> Source: _source/braindump.md · §SDLC 全流程


---


## HANDOFF · 交棒陷阱

<div class="alert">

**陷阱 1 · 文件過期**：PRD 改了，工程師還在看舊版

</div>

<div class="alert">

**陷阱 2 · 過度詳細**：寫了 30 頁 PRD，沒人會讀，只能靠口頭問

</div>

<div class="alert">

**陷阱 3 · 沒有 source of truth**：Slack 一句、會議一句、Jira 一句——版本對不起來

</div>

<br>

<span class="muted">**反模式**：把交棒當成「丟過去就好」——不確認下游讀懂，等於沒交。</span>

> Source: _source/braindump.md · §責任鏈


---


<!-- _class: end -->

# Handoff Chain 完
## *看完交棒，看 Overlap 矩陣。*

<br>

<span class="lead">→ 11.2 Overlap Matrix</span>
