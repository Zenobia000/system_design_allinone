---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.9 · QA Outputs'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 09 · TOPIC 01</div>

# QA 經典產出
## *把驗收流程寫成可重複的資產*


---


<!-- _class: compact -->

## OUTPUTS · 5 個經典產出

<span class="kicker">SECTION 1 · ARTIFACTS</span>

| 產出 | 一句話用途 | 看起來像什麼 |
|---|---|---|
| **Test Case** | 單一驗證步驟 | 一張卡：前置 / 步驟 / 預期結果 |
| **Test Plan** | 一次發版的測試藍圖 | Confluence 文件：範圍 / 風險 / 環境 |
| **Bug Report** | 重現 + 影響 + 優先級 | Jira ticket：步驟 / log / 截圖 |
| **Test Automation** | 自動回歸腳本 | Cypress / Playwright / pytest |
| **Coverage Report** | 哪些路徑被測過了 | 顆粒度報告 + risk map |

<br>

<span class="muted">**核心**：產出不是「找了幾個 bug」，是**留下可重複驗證的資產**。</span>

> Source: _source/braindump.md · §QA 視角


---


## OUTPUTS · Test Case 長什麼樣

```
TC-LOGIN-007: 密碼錯誤 5 次後鎖定帳號

前置: 已註冊用戶 alice@x.com / 帳號未鎖
步驟:
  1. 輸入 alice@x.com + 錯誤密碼
  2. 連續送出 5 次
  3. 第 6 次輸入正確密碼
預期:
  - 第 1~5 次: 回應「密碼錯誤」
  - 第 6 次: 回應「帳號已鎖定 30 分」
  - 30 分後再試: 解鎖成功
分類: Negative / Security
優先級: P1
```

<span class="muted">**重點**：好 Test Case 寫**例外與 negative path**，新手只寫 happy path。</span>

> Source: _source/braindump.md · §QA 測試類型


---


## OUTPUTS · 測試金字塔

# Unit / Integration / E2E / Load

<div class="stack">
  <div class="layer client"><strong>Load Test</strong>　 壓力測試（DevOps + QA 共做）</div>
  <div class="layer app"><strong>E2E Test</strong>　 整個流程（QA 主導，模擬真實用戶）</div>
  <div class="layer data"><strong>Integration Test</strong>　 跨模組（QA / SDET 主導）</div>
  <div class="layer infra"><strong>Unit Test</strong>　 單一 function（Dev 自己寫）</div>
</div>

<br>

<span class="muted">**口訣**：**Dev 顧底層，QA 顧上層**。底層多、上層少——金字塔越寬越穩。</span>

> Source: _source/braindump.md · §QA 測試類型


---


## OUTPUTS · 為何 AI 取代不了

<div class="highlight">

**AI 寫得出 Test Case，但寫不出**：

- 哪個 edge case 真的會發生在生產？
- AI 生成的影片「好不好看」要怎麼測？
- 模型更新了，舊的 baseline 還算數嗎？

</div>

<br>

- **Edge case 直覺**：來自踩過的雷，不是來自規格
- **定義未知**：AI 影視沒有「對的答案」——QA 設計人類評分流程
- **跨團隊溝通**：說服 Dev「這個 bug 真的要修」需要政治力

<br>

<span class="muted">在 AI 系統，**QA 從「驗證已知」變成「定義未知」**——這是 Ch.12 會深入的轉折。</span>

> Source: _source/braindump.md · §AI 影視生成挑戰


---


<!-- _class: end -->

# Outputs 完
## *產出講完，看 QA 跟誰打交道。*

<br>

<span class="lead">→ 9.2 QA 邊界</span>
