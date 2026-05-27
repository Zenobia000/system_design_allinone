---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.3 · UX/UI Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 03 · TOPIC 02</div>

# UX / UI 邊界
## *跟哪些人打交道·誰主導什麼*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# UX / UI 上下游關係

```
            PM（需求 / KPI）
                  │
                  ▼
          ┌──────────────┐
          │   UX / UI    │ ← 你在這
          └──────────────┘
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
   Architect    SA       FE Dev
   (可行性)   (規則)    (實作)
```

<span class="muted">**重點**：UX 不是線性等架構出來——**UX 跟 Architect 平行跑**，UX 探索可用性、架構同步約束可行性。</span>

> Source: _source/braindump.md · §UX vs UI


---


<!-- _class: compact -->

## BOUNDARY · 容易搞混的角色

| 角色 | 跟 UX/UI 差在哪 |
|---|---|
| **PM** | 決定做什麼 feature、KPI；UX 決定怎麼用才順 |
| **UX Researcher** | 偏訪談 / 數據分析；UX Designer 偏設計流程 |
| **UI Designer** | 偏視覺 / 元件 / 風格；UX 偏動線 / 流程 |
| **FE Dev** | 負責把 Mockup 變成可運作的網頁 / App |
| **SA** | 寫系統規則邏輯，不畫 UI；但 UI 上會反映規則 |

<br>

<span class="muted">**核心**：小團隊常常 UX + UI 一人兼，但**動線思考**跟**視覺思考**是兩種腦袋——只是同一個人切換。</span>

> Source: _source/braindump.md · §UX vs UI


---


## BOUNDARY · 誰主導什麼

# 決策樹

<div class="tradeoff">
  <div class="pro">
    <h3>UX / UI 主導</h3>
    <ul>
      <li>畫面排版 / 動線</li>
      <li>互動細節（按哪、跳哪）</li>
      <li>視覺風格 / 品牌調性</li>
      <li>可用性測試結論</li>
      <li>Design System 規範</li>
    </ul>
  </div>
  <div class="con">
    <h3>UX / UI 不主導（但要懂）</h3>
    <ul>
      <li>業務規則（SA）</li>
      <li>技術選型（Architect）</li>
      <li>KPI 與優先級（PM）</li>
      <li>API 結構（SD / Dev）</li>
      <li>資料儲存（DBA）</li>
    </ul>
  </div>
</div>

<span class="muted">**陷阱**：UX 不該決定「這欄位必填」——那是 SA 的事。UX 只反映規則，不發明規則。</span>

> Source: _source/braindump.md · §責任鏈


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：PM 說「給我加個 dashboard」。

</div>

**新手 UX 會這樣做**：直接打開 Figma 開始畫圖表、找模板。
→ 沒問**給誰看**、**看什麼決策**、**多久看一次**。

**成熟 UX 會這樣回**：
- 這 dashboard 給誰看？→ 業務主管 / 客服 / 老闆？
- 看完要做什麼決策？→ 加預算？換策略？發警報？
- 多久看一次？→ 每日 / 每週 / 即時？
- 跟 SA 確認資料源、跟 Architect 確認即時 vs 報表

<br>

<span class="muted">**這就是 UX 的價值**：把「dashboard」這個模糊需求壓縮成「給誰、看什麼、決策什麼」。</span>

> Source: _source/braindump.md · §三層 flow 翻譯


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 3.99 Recap</span>
