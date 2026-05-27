---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.4 · SA Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 04 · TOPIC 02</div>

# SA 邊界
## *跟哪些人打交道·誰主導什麼*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# SA 上下游關係

```
        PM（What / Why）
              │
              ▼
        ┌──────────┐
        │    SA    │ ← 你在這
        └──────────┘
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
   Architect  SD    Dev
   (撐住)  (拆模組) (實作)
```

<span class="muted">**SA 上游**：PM 的 What。**下游**：Architect / SD / Dev 的 How。SA 是**業務語言到技術語言的翻譯層**。</span>

> Source: _source/braindump.md · §責任鏈


---


<!-- _class: compact -->

## BOUNDARY · SA vs Architect

| 面向 | SA | Architect |
|---|---|---|
| **核心任務** | 分析需求、定義系統規格 | 設計架構、控制複雜度 |
| **主要關心** | 功能 / 流程 / 規則 / 資料 | 邊界 / 擴充 / 維運 |
| **輸入** | PM 需求 / 業務流程 | SA 規格 / NFR / 現況 |
| **輸出** | 功能規格 / 流程圖 / 資料字典 | 架構圖 / 服務邊界 / 技術決策 |
| **問題語言** | 這流程**怎麼跑**？ | 這系統**怎麼撐**？ |

<br>

<span class="muted">**核心**：SA 管「系統應該**做什麼**」；Architect 管「系統應該**怎麼活下去**」。</span>

> Source: _source/braindump.md · §SA vs Architect


---


## BOUNDARY · 誰主導什麼

# 決策樹

<div class="tradeoff">
  <div class="pro">
    <h3>SA 主導</h3>
    <ul>
      <li>Use Case 與業務規則</li>
      <li>狀態轉換與例外流程</li>
      <li>資料欄位與權限矩陣</li>
      <li>跨系統介接需求</li>
      <li>規則的邊界情境</li>
    </ul>
  </div>
  <div class="con">
    <h3>SA 不主導（但要懂）</h3>
    <ul>
      <li>技術選型（Architect）</li>
      <li>模組拆分（SD）</li>
      <li>UI 細節（UX/UI）</li>
      <li>商業 KPI（PM）</li>
      <li>DB schema 細節（DBA）</li>
    </ul>
  </div>
</div>

<span class="muted">**陷阱**：SA 寫「用 Redis cache」就越界了——SA 該寫的是「這查詢必須 < 1 秒」，怎麼做是 Architect 決定。</span>

> Source: _source/braindump.md · §SA vs Architect


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：客服工單系統，PM 說「逾期未處理要警示」。

</div>

**新手 SA 會這樣寫**：「逾期就跳警告」。
→ 沒問**逾期多久**、**警示給誰**、**多久檢查一次**。

**成熟 SA 會這樣補**：
- **逾期 24h** → SLA warning → 通知工單主管
- **逾期 48h** → SLA breach → 通知部門經理 + 紀錄 KPI
- **客戶主動催** → 升級為 priority high
- **狀態 = closed 但客戶回信** → 自動 reopen

<br>

<span class="muted">**這就是 SA 的價值**：把「警示」這個模糊規則拆成可實作的時間軸與條件。</span>

> Source: _source/braindump.md · §客服工單系統實例


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 4.99 Recap</span>
