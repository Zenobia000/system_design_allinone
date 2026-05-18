---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · PM Outputs'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · TOPIC 01</div>

# PM 經典產出
## *壓縮真實需求·寫進文件*


---


## OUTPUTS · 真需求 vs 假需求

<span class="kicker">SECTION 1 · INSIGHT</span>

# 客戶說的永遠不是需求

<br>

<div class="highlight">

客戶說：「我想做 AI」「我要像 Uber」「我想做會員系統」
**——這都不是需求。**

PM 的工作是**壓縮**：把客戶的話往下挖，
直到找到「**降低客服成本**」「**提升轉單率**」「**提升留存率**」這種真的可衡量的目標。

</div>

<br>

<span class="muted">**核心金句**：PM 是「需求壓縮器」，不是「客戶傳聲筒」。</span>

> Source: _source/braindump.md · §PM 為何不只是「開會的人」


---


<!-- _class: compact -->

## OUTPUTS · 5 個經典產出

| 產出 | 一句話用途 | 看起來像什麼 |
|---|---|---|
| **PRD** | 產品需求文件 | Confluence / Notion 幾十頁 |
| **User Flow** | 使用者操作路徑 | 流程圖（含主流程 / 子流程 / 例外） |
| **Backlog** | 待辦事項池 | Jira: Epic → Story → Task |
| **Persona** | 目標用戶輪廓 | 一張 1 頁人物卡 |
| **Roadmap** | 時程與優先級 | 甘特圖 / 季度路線圖 |

> Source: _source/braindump.md · §PM 工作流程


---


## OUTPUTS · PRD 長什麼樣

```
# PRD: 會員忘記密碼功能

## 目標
- 降低客服「忘記密碼」工單量 40%
- KPI: 每月人工重設次數 < 100

## User Story
身為已註冊用戶, 我想透過 email 重設密碼,
這樣就不用打給客服。

## 需求
- 輸入 email → 寄送重設連結（10 分鐘有效）
- 連結點開 → 設定新密碼（至少 8 字元）
- 重設後 → 自動登入

## 例外
- email 不存在: 仍顯示「已寄出」（防探測）
- 連結過期: 顯示重新申請按鈕
```

<span class="muted">注意 PRD 不只寫**正常路徑**，還要寫**例外**——這是新手 PM 最容易漏的。</span>

> Source: _source/braindump.md · §PM 工作流程


---


## OUTPUTS · 為何 AI 取代不了

<div class="highlight">

**AI 寫得出 PRD，但寫不出**：

- 哪個 feature 真的解客戶痛點？
- 三個 feature 只能挑一個，挑哪個？
- 老闆說做 A、用戶說要 B、技術說做 C，怎辦？

</div>

<br>

- **判斷力**：選擇的代價是另一個選擇
- **政治力**：說服老闆、業務、工程協同
- **同理心**：看穿用戶嘴上 vs 心裡的差距

<br>

<span class="muted">AI 是 PM 的助手，不是替代——它幫你**寫**得快，不幫你**決定**該寫什麼。</span>

> Source: _source/braindump.md · §AI 時代的本質沒變


---


<!-- _class: end -->

# Outputs 完
## *產出講完，看 PM 跟誰打交道。*

<br>

<span class="lead">→ 2.2 PM 邊界</span>
