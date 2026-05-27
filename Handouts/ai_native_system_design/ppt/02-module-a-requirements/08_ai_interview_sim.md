---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.8 · AI Interview Simulator'
footer: 'AI 時代系統設計速成 '
---

## A.8 · AI 當「需求訪談模擬器」

<span class="kicker">WORKFLOW · 反向練習</span>

# 讓 AI 扮 PM，你練拆需求

<div class="prompt">

**Setup prompt**：

```
你扮演一位有 5 年經驗的 PM。
我（架構師）即將跟你訪談一個新功能。
你的 brief 是：「我們要做一個 AI 客服系統，要能回 90% 的常見問題。」

你的行為：
- 模糊回答（像真實 PM）
- 我問才給細節，不主動全給
- 對於我的技術選型，反問商業價值
- 對於我給的成本，反問為何不能更便宜
- 對於我列的 NFR，質疑數字怎麼來的

我會練習 30 分鐘，最後請給我評語：
- 我哪些問題問得好
- 我漏問哪 5 個關鍵問題
- 我的 NFR 翻譯有哪些可被攻擊
```

</div>

<br>

**為何有用**：在 AI 時代，「會問」比「會答」更稀缺。

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
