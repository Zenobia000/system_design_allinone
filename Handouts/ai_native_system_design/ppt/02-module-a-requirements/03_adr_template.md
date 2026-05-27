---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.3 · ADR Template'
footer: 'AI 時代系統設計速成 '
---

## A.3 · ADR 標準模板（一頁版）

<span class="kicker">TEMPLATE · 直接複製用</span>

```markdown
# ADR-NNN：[短標題]
Status: Proposed | Accepted | Deprecated | Superseded by ADR-XXX
Date: 2026-MM-DD
Deciders: [姓名]

## Context
- 業務問題 (1-2 行)
- NFR (3-5 條量化指標)
- 約束 (預算、團隊、既有架構)

## Decision
- 我們選擇 X，因為 Y。

## Considered Alternatives
| 方案 | 優 | 缺 | 為何不選 |
|---|---|---|---|
| A | ... | ... | ... |
| B | ... | ... | ... |

## Consequences
- 好：... | 壞：... | 中性：...
- 後續可逆嗎？逆轉成本？

## Open Questions
- 待驗證假設 / 待量測項
```

> Source: software_architect/ppt/_source/03_Process_App_Types.md · §ADR


---


## A.3 · AI 寫 ADR 的標準流程

<div class="prompt">

**Prompt**：

```
我要寫一份 ADR，主題：[「選 PostgreSQL 還是 DynamoDB」]
Context：
- NFR：[貼 A.1 產出的 NFR 清單]
- 約束：[團隊 5 人會 SQL，無 NoSQL 經驗；預算 $10K/月]
- 現有：[已用 PostgreSQL on RDS]

請套用標準 ADR 模板生成。
特別要求：
1. Alternatives 至少 3 個，含被否決的 MySQL
2. Trade-off 表要量化（成本估算 / 學習曲線週數 / 風險等級）
3. Consequences 要含「3 年後反悔的逆轉成本」
4. Open Questions 至少 3 個「需 PoC 驗證」
```

</div>

<br>

**驗收**：AI 給的 ADR 你要能說「這份我會簽名」—不能就再改。

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
