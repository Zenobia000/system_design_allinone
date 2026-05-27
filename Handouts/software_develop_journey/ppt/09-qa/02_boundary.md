---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.9 · QA Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 09 · TOPIC 02</div>

# QA 邊界
## *跟誰寫測試·誰判 bug 嚴重度*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# QA 上下游關係

```
        PM / SA（規格 / 驗收條件）
              │
              ▼
        ┌──────────┐
        │   Dev    │ ─→ unit test 自己寫
        └──────────┘
              │
              ▼
        ┌──────────┐
        │    QA    │ ← 你在這
        └──────────┘
              │
              ▼
        DevOps（測試環境 / CI 集成）
```

<span class="muted">**QA 上游**：規格與實作。**下游**：上線品質——驗證資產交給 DevOps 跑進 CI/CD。</span>

> Source: _source/braindump.md · §責任鏈


---


<!-- _class: compact -->

## BOUNDARY · QA vs Dev：誰寫哪一層

| 層級 | 主要寫的人 | 為什麼 |
|---|---|---|
| **Unit Test** | Dev | 最貼近 code，跟著 PR 一起進 |
| **Integration Test** | QA / SDET | 需要懂跨模組契約 |
| **E2E Test** | QA | 模擬真實用戶，用 PRD 視角 |
| **Load / Stress** | QA + DevOps | 需要壓測環境與監控配合 |
| **Exploratory Test** | QA | 沒腳本的手動嘗試，找未知未知 |

<br>

<span class="muted">**陷阱**：Dev 說「我測過了」通常只測過 unit + happy path——**E2E 與 edge case 是 QA 的責任**。</span>

> Source: _source/braindump.md · §QA 測試類型


---


## BOUNDARY · 容易搞混的角色

<!-- _class: compact -->

| 角色 | 跟 QA 差在哪 |
|---|---|
| **Manual Tester** | 手動執行為主，不寫自動化、不設計策略 |
| **QA Engineer** | 設計測試策略 + 部分自動化（本章主角） |
| **SDET** | Software Dev Engineer in Test，**寫測試框架** |
| **Dev** | 寫產品 code + unit test，不負責 E2E |
| **DevOps** | 把測試**接進 CI/CD**，不寫測試 case |
| **PM** | 定義驗收條件（What），QA 設計怎麼驗（How） |

<br>

<span class="muted">**核心**：QA 是 spectrum——從手動測試到 SDET 寫框架，**自動化能力決定階級**。</span>

> Source: _source/braindump.md · §QA 視角


---


## BOUNDARY · 誰主導什麼

# 決策樹

<div class="tradeoff">
  <div class="pro">
    <h3>QA 主導</h3>
    <ul>
      <li>整體測試策略</li>
      <li>E2E / 回歸自動化選型</li>
      <li>bug 嚴重度分級</li>
      <li>release 是否可上線</li>
      <li>AI 系統的人類評分流程</li>
    </ul>
  </div>
  <div class="con">
    <h3>QA 不主導（但要懂）</h3>
    <ul>
      <li>unit test 寫不寫（Dev）</li>
      <li>驗收條件（PM）</li>
      <li>業務規則邊界（SA）</li>
      <li>CI/CD pipeline（DevOps）</li>
      <li>壓測環境基建（DevOps）</li>
    </ul>
  </div>
</div>

<span class="muted">**陷阱**：QA 不該定義「P1 / P2」標準——那要跟 PM 一起談；**QA 應該堅持的是「測試覆蓋率」與「release gate」**。</span>

> Source: _source/braindump.md · §QA 視角


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：Dev 拍胸脯說「這個功能我測過了，可以上線」。

</div>

**新手 QA 會這樣回**：「好，那我跑一下 smoke test 就 release。」
→ 沒問 Dev 測了哪些 case、有沒有 edge case、自動化跑了沒。

**成熟 QA 會這樣回**：
- 你的 unit test 覆蓋率多少？→ Dev：80%
- 有跑 integration / E2E 嗎？→ Dev：沒有
- 那這幾個 edge case 你跑了嗎（列 5 個）？→ Dev：漏了 2 個
- 補完 E2E + 加進回歸 suite，**下次自動跑，不靠人記得**

<br>

<span class="muted">**轉折**：在 AI 系統，這套不夠用——**「對的答案」要先被定義**，QA 變成設計人類評分流程的人。</span>

> Source: _source/braindump.md · §AI 影視生成挑戰


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 9.99 Recap</span>
