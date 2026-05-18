---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.9 · QA'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 09 · OVERVIEW</div>

# QA
## *驗收員·不是按按鈕的人*


---


## ROLE · 蓋房子對應

<span class="kicker">METAPHOR ANCHOR</span>

# QA = 驗收員

<div class="stack">
  <div class="layer client">PM / UX / SA　 決定要蓋什麼、規則怎麼跑</div>
  <div class="layer app">Architect / SD / DBA　 結構、模組、資料</div>
  <div class="layer data">Dev　 工班師傅把樓蓋起來</div>
  <div class="layer infra"><strong>QA ← 你在這</strong>　 驗收門會不會打不開、結構是否合規</div>
</div>

<br>

<span class="muted">**一句話**：驗收這棟樓不會塌——設計驗證框架，不是只點按鈕。</span>

> Source: _source/braindump.md · §QA 視角


---


## ROLE · 為什麼 QA 不是按按鈕的人

<div class="alert">

**最常見誤解**：以為 QA 就是「拿到功能、手動點一點、找 bug」。

</div>

點按鈕只是 QA 工作的 10%。真正的 QA 在做的是：
**設計一整套驗證框架**——測試策略、邊界條件、自動化、回歸 baseline。

<br>

- **Dev 寫的是 happy path**，QA 想的是**所有失敗路徑**
- **Bug 不是 QA 製造的**，是 QA**幫公司提前發現**的
- 在 AI 系統裡，QA 甚至要**定義「對」是什麼意思**

<br>

<span class="muted">**核心金句**：QA 不是按按鈕的人，是**設計驗證框架**的人。</span>

> Source: _source/braindump.md · §QA 視角


---


## ROLE · 一天時間分配

# 真實 QA 一天大概在幹嘛

```
   設計 / 撰寫 Test Case      ████████      25%
   執行測試 / 回歸            ███████       22%
   寫自動化腳本               ██████        18%
   bug 報告 / 重現            █████         15%
   跟 Dev / PM 對齊           ████          12%
   測試環境維護               ███           5%
   讀 PRD / 看 spec           █             3%
```

<br>

<span class="muted">**反差**：QA 不是「Dev 寫完才上場」，是**從 PRD 階段就介入**，越早介入 bug 越便宜。</span>

> Source: _source/braindump.md · §QA 視角


---


## OBJECTIVES · 學習目標

# 看完 Ch.9 你能回答

<div class="stack">
  <div class="layer client"><strong>① QA 到底做什麼？</strong>　 只是點按鈕嗎？</div>
  <div class="layer app"><strong>② QA 的 5 個經典產出？</strong>　 Test Case / Plan / Bug / Auto / Coverage</div>
  <div class="layer data"><strong>③ QA vs Dev vs SDET？</strong>　 誰寫 unit 誰寫 E2E</div>
  <div class="layer infra"><strong>④ AI 系統裡 QA 怎麼變？</strong>　 從驗證已知變成定義未知</div>
</div>

> Source: _source/braindump.md · §QA 測試類型


---


<!-- _class: end -->

# Overview 完
## *看完角色，看具體產出。*

<br>

<span class="lead">→ 9.1 QA 經典產出</span>
