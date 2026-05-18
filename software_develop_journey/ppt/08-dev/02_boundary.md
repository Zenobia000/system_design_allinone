---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.8 · Developer Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 08 · TOPIC 02</div>

# Dev 邊界
## *FE / BE / SD / QA·誰主導什麼*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# Dev 上下游關係

```
       SD（給施工圖 / API spec）　 DBA（給 schema）
                    │
                    ▼
              ┌──────────┐
              │   Dev    │ ← 你在這
              └──────────┘
                    │
              ┌─────┴─────┐
              ▼           ▼
             QA         DevOps
        （驗收 code）（拿去部署）
```

<span class="muted">**Dev 上游**：拿 SD 的施工圖、DBA 的 schema、UX/UI 的稿。**下游**：交給 QA 驗、交給 DevOps 部署。</span>

> Source: _source/braindump.md · §責任鏈


---


<!-- _class: compact -->

## BOUNDARY · 容易搞混的角色

| 角色 | 跟 Dev 差在哪 |
|---|---|
| **FE Dev** | 執行樣品屋（畫面 / 互動）；離使用者最近 |
| **BE Dev** | 執行結構（API / 業務邏輯 / 資料存取）；離資料最近 |
| **SD** | SD 寫**怎麼設計**的文件；Dev 看 SD 文件**真的去寫** |
| **QA** | Dev 寫 unit test（單一函式）；QA 寫 E2E / integration（整條流程） |
| **Architect** | 決定**框架選擇**（用 Spring 還是 FastAPI）；Dev 不決定但要懂 |

<br>

<span class="muted">**核心**：FE 和 BE 都是 Dev，只是負責的樓層不同；不是兩個對立工種。</span>

> Source: _source/braindump.md · §SD vs Architect


---


## BOUNDARY · 誰主導什麼

# 決策樹

<div class="tradeoff">
  <div class="pro">
    <h3>Dev 主導</h3>
    <ul>
      <li>框架選擇細節（lib / 寫法）</li>
      <li>Function 怎麼切</li>
      <li>命名（變數 / 函式 / 類別）</li>
      <li>Unit Test coverage</li>
      <li>local refactor</li>
    </ul>
  </div>
  <div class="con">
    <h3>Dev 不主導（但要懂）</h3>
    <ul>
      <li>系統架構（Architect）</li>
      <li>API 規格定案（SD）</li>
      <li>Schema / Index（DBA）</li>
      <li>E2E 測試計畫（QA）</li>
      <li>部署策略（DevOps）</li>
    </ul>
  </div>
</div>

<span class="muted">**陷阱**：Dev 越界改 schema 會踩到 DBA；越界改 API 介面會踩到 SD 跟其他服務的 Dev。</span>

> Source: _source/braindump.md · §SD vs Architect


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：SD 文件不清楚——「當訂單付款失敗時，呼叫 refund」——但沒寫**失敗多次**怎麼辦。

</div>

**新手 Dev**：自己猜——「retry 3 次吧」「失敗就寫 log 吧」。
→ 出事後**沒人知道規則是誰定的**。

**成熟 Dev**：
- 先**回問 SD**：「retry 邏輯 spec 沒寫，是漏的還是 Dev 自由決定？」
- 如果 SD 也不確定 → 拉**SA / Architect 一起拍板**
- 拍板後**寫進 PR description + 補 spec**——下個 Dev 看得到
- 在 code 裡留 comment：`// per RFC-2024-08-12: retry 3 times then dead-letter queue`

<br>

<span class="muted">**這就是 Dev 的師傅樣**：不猜、不英雄主義、**把模糊變明確並寫下來**。</span>

> Source: _source/braindump.md · §SD · System Design


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 8.99 Recap</span>
