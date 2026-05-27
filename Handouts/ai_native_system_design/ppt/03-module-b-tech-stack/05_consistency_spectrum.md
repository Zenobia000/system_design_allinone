---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.5 · Consistency Spectrum'
footer: 'AI 時代系統設計速成 '
---

## B.5 · 一致性層級光譜

<span class="kicker">SPECTRUM · 不是 binary</span>

# 從 strict 到 eventual 有 6 階

<!-- _class: compact -->

| 層級 | 保證 | 範例 | 業務範例 |
|---|---|---|---|
| Linearizable | 全局即時順序 | Spanner | 銀行轉帳 |
| Sequential | 全局順序但非即時 | 多 leader Postgres | 訂單流水 |
| Causal | 因果順序 | 部分系統 | 留言 + 回覆 |
| Read-your-writes | 自己看自己寫的 | session-sticky | 個人發文 |
| Monotonic reads | 不會看到時光倒流 | client cache | feed |
| Eventual | 最終一致 | DNS、CDN | 推薦結果 |

<br>

**決策口訣**：
- 涉及錢 / 資源扣減 → Linearizable
- 個人視角看自己 → Read-your-writes 夠
- 別人看你的 → Eventual 多半可

<br>

<span class="muted">**金句**：強一致是奢侈品，買得起再買。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §Consistency
