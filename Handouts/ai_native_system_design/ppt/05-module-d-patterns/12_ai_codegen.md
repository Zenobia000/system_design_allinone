---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.12 · AI Code Gen Patterns'
footer: 'AI 時代系統設計速成 '
---

## D.12 · 用 AI 生 code 的 4 個 pattern

<span class="kicker">CODE GENERATION · 工作流</span>

<!-- _class: compact -->

| Pattern | 流程 | 適用 |
|---|---|---|
| **Spec-First** | ADR → API spec → AI 生 code | 新功能 |
| **Test-First** | 寫測試 → AI 生實作 → 跑測試 | 重構、TDD |
| **Skeleton-Fill** | 人寫框架 → AI 填細節 | 樣板程式碼 |
| **Pair-Refactor** | 人指出問題 → AI 提方案 → 人選擇 | 重構、優化 |

<br>

**反 pattern**：
- ❌ 「幫我寫一個 X」without spec → 你會收到通用模板
- ❌ 全收 AI 的 code 不 review → 上線後維護地獄
- ❌ 沒測試就改 → AI 不知道你哪裡會炸

<br>

<span class="muted">**金句**：AI 生 code 像實習生交件—收下前要 review，發現問題要教它。</span>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
