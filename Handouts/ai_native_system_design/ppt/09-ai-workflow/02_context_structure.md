---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'W.2 · Context Structure'
footer: 'AI 時代系統設計速成 '
---

## W.2 · 給 AI 結構化 context

<span class="kicker">CRITICAL · 80% 的失敗在 context</span>

# 不要說「幫我寫個 X」，要給 5 段

<!-- _class: compact -->

| 段 | 包含 | 範例 |
|---|---|---|
| **1. Goal** | 想達成什麼業務目標 | 「秒殺活動不超賣」 |
| **2. Constraints** | 預算、團隊、既有架構 | 「team 5 人會 Go，預算 $5K/月」 |
| **3. NFR** | 量化指標 | 「100K req/s, P99 < 500ms」 |
| **4. Existing** | 現有系統與限制 | 「已用 PG, 不能換」 |
| **5. Asks** | 你要 AI 回什麼 | 「列 3 方案 + ADR 模板」 |

<br>

**模板**：
```
# Goal
...
# Constraints
- 預算: ... 
- Team: ...
- Timeline: ...
# NFR
- ...
# Existing Architecture
- ...
# Asks
1. ...
2. ...
```

> Source: _source/braindump.md · §AI 工作流的 7 個常見地雷


---


## W.2 · Context 給法的 3 個地雷

<!-- _class: compact -->

| 地雷 | 症狀 | 解 |
|---|---|---|
| **過於 minimal** | 「幫我設計訊息系統」 | 用 W.2 五段模板 |
| **太多 noise** | 貼整個 wiki 進去 | 提煉成 bullet list |
| **內隱假設** | 沒寫團隊不熟 X | 明寫「team 不熟 Kafka，2 月學習」 |

<br>

**檢查**：寫完 prompt → 自己讀 → 問「沒看過 codebase 的人能答嗎？」

**進階**：用檔案傳遞（不是貼）：
```
請讀以下文件:
- @ADR-001-tech-stack.md
- @architecture/current.puml
- @constraints.md
然後回答 ...
```

<br>

<span class="muted">**金句**：好的 prompt 結構，比好的 prompt 詞更重要。</span>

> Source: _source/braindump.md
