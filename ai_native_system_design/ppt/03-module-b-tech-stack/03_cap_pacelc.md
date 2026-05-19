---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.3 · CAP / PACELC'
footer: 'AI 時代系統設計速成 '
---

## B.3 · CAP 與 PACELC 取捨地圖

<span class="kicker">THEOREM · 不是選 2 個，是選 trade-off</span>

# 真實世界：P 必選，CA 之間二選一

<!-- _class: compact -->

```
分區發生時 (P):
    一致性 (C) ←———————→ 可用性 (A)
       CP                       AP
       |                         |
    銀行交易              社交動態
    票券扣減              聊天訊息
    庫存                  推薦結果

分區沒發生時 (PACELC 補充):
    延遲 (L) ←———————→ 一致性 (C)
       Latency                  Consistency
```

| 系統 | 預設定位 | 切換時機 |
|---|---|---|
| PostgreSQL（單 region） | CA | 跨 region 必須選 CP 或 AP |
| MongoDB | AP/PA-EL | replica 配置可調 |
| Cassandra | AP/PA-EL | tunable consistency |
| Spanner | CP/PC-EC | 但延遲較高 |
| DynamoDB | AP/PA-EL | strong read 可選但貴 |

<br>

<span class="muted">**判斷力金句**：「強一致」不是越強越好—成本與延遲都跟著上來。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §CAP
