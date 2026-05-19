---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.01 · Handoff Chain'
footer: 'AI 時代系統設計速成 '
---

## HOW · 9 角色的交棒鏈

<span class="kicker">COLLABORATION</span>

# 上下游接力—AI 並沒減少角色，只讓每人能扛更多

<!-- _class: compact -->

```
PM     UX      SA      Architect  SD     DBA    Dev    QA    DevOps
 │      │       │         │        │      │      │      │      │
 ├─商業─┤       │         │        │      │      │      │      │
 │     ├─體驗──┤         │        │      │      │      │      │
 │     │       ├─規格───┤        │      │      │      │      │
 │     │       │         ├─NFR───┤      │      │      │      │
 │     │       │         │        ├─模組─┤      │      │      │
 │     │       │         │        │      ├─schema─┤    │      │
 │     │       │         │        │      │      ├─code─┤      │
 │     │       │         │        │      │      │      ├─test─┤
 │     │       │         │        │      │      │      │      ├─運維
```

<br>

<span class="muted">**金句**：AI 時代不是「不需要這些角色」，是「一個人能同時兼三個角色」。</span>

> Source: software_develop_journey/ppt/11-collaboration/01_handoff_chain.md


---


## HOW · 常見衝突場景速覽

<!-- _class: compact -->

| 衝突 | 表面爭吵 | 真正的根因 |
|---|---|---|
| PM ↔ Architect | 「你怎麼要 6 個月？」 | NFR 沒談清就承諾日期 |
| SA ↔ Dev | 「spec 寫的不可能！」 | spec 沒寫 edge case |
| Architect ↔ DBA | 「為什麼選 Mongo？」 | schema 與一致性策略沒共識 |
| Dev ↔ QA | 「這不是 bug」 | 「對」的定義沒寫進 spec |
| Dev ↔ DevOps | 「我的 code 在本地能跑」 | 環境一致性沒做 |

<br>

<span class="muted">**速成口訣**：衝突 90% 是「上游沒講清」，不是「下游不配合」。</span>

> Source: software_develop_journey/ppt/11-collaboration/04_conflict_cases.md
