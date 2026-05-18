---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · PM Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · TOPIC 02</div>

# PM 邊界
## *跟哪些人打交道·誰主導什麼*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# PM 上下游關係

```
       老闆 / 業務 / 客戶
              │
              ▼
        ┌──────────┐
        │    PM    │ ← 你在這
        └──────────┘
              │
        ┌─────┼─────┬─────┐
        ▼     ▼     ▼     ▼
       UX    SA    Dev   QA
```

<span class="muted">**PM 上游**：商業需求源頭。**下游**：所有交付角色。PM 是**整個團隊的翻譯中樞**。</span>

> Source: _source/braindump.md · §責任鏈


---


<!-- _class: compact -->

## BOUNDARY · 容易搞混的角色

| 角色 | 跟 PM 差在哪 |
|---|---|
| **BA**（Business Analyst） | 偏需求分析，PM 偏產品策略；中小公司常合併 |
| **PO**（Product Owner, Scrum） | 偏 Backlog 排序，PM 偏整體產品；大公司分開 |
| **Project Manager** | 偏專案管理（時程預算），PM 偏產品（價值方向） |
| **老闆 / 業務** | 提需求源頭，PM 把它翻譯成可執行的東西 |
| **SA** | 系統規則細節，PM 不碰；PM 提需求給 SA |

<br>

<span class="muted">**核心**：PM = 產品經理（**Product** Manager），不是 **Project** Manager。中文常翻成「產品經理」反而比英文清楚。</span>

> Source: _source/braindump.md · §PM 視角


---


## BOUNDARY · 誰主導什麼

# 決策樹

<div class="tradeoff">
  <div class="pro">
    <h3>PM 主導</h3>
    <ul>
      <li>做不做某 feature</li>
      <li>優先級排序</li>
      <li>MVP 範圍</li>
      <li>商業 KPI 定義</li>
      <li>跟業務 / 老闆對齊</li>
    </ul>
  </div>
  <div class="con">
    <h3>PM 不主導（但要懂）</h3>
    <ul>
      <li>技術選型（Architect）</li>
      <li>UI 細節（UX/UI）</li>
      <li>業務規則邊界（SA）</li>
      <li>資料庫 schema（DBA）</li>
      <li>部署策略（DevOps）</li>
    </ul>
  </div>
</div>

<span class="muted">**陷阱**：PM 不該指定「用 React」「用 PostgreSQL」——那是 Architect 的事，PM 越界會弄壞團隊信任。</span>

> Source: _source/braindump.md · §PM 最重要的能力


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：業務說「客戶想要即時通知」。

</div>

**新手 PM 會這樣回**：「好，下個月做。」
→ 沒問**為什麼即時**、**多即時才算即時**、**ROI 多少**。

**成熟 PM 會這樣回**：
- 為什麼即時？→ 業務說：客戶抱怨晚了 5 分鐘
- 那 1 分鐘可以嗎？→ 業務查了：可以
- 即時推播 vs 1 分鐘 polling 成本差 10 倍 → 跟 Architect 確認
- 折衷方案：「**1 分鐘 polling，第二期再上 push**」

<br>

<span class="muted">**這就是 PM 的價值**：把「即時」這個模糊需求壓縮成可執行的數字 + 階段。</span>

> Source: _source/braindump.md · §PM 為何不只是「開會的人」


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 2.99 Recap</span>
