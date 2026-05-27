---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.2 · SQL vs NoSQL'
footer: 'AI 時代系統設計速成 '
---

## B.2 · SQL vs NoSQL 決策矩陣

<span class="kicker">DECISION · 30 秒判斷</span>

# 用這 6 維度判斷，不要看 Twitter 熱度

<!-- _class: compact -->

| 維度 | 偏 SQL 的訊號 | 偏 NoSQL 的訊號 |
|---|---|---|
| 資料關係 | 多表 JOIN、外鍵約束 | 文件型、嵌套深 |
| 事務需求 | 跨表 ACID、財務 | eventual 可接受 |
| 查詢模式 | ad-hoc、複雜 query | 已知模式、單一 key |
| 規模 | < 10M rows/table | > 100M、需分片 |
| 資料形狀 | 穩定 schema | schema 常變 / 半結構化 |
| 團隊 | 熟 SQL | 願意學新 |

<br>

**預設值**：80% 的應用 PostgreSQL 夠用。先 SQL，遇到瓶頸再換。

**反 pattern**：「未來會很大所以先用 Mongo」—未來沒到，先嘗了 NoSQL 的痛。

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md


---


## B.2 · AI 加速選型對話

<div class="prompt">

**Prompt**：

```
業務：[電商訂單系統]
資料：訂單、商品、用戶、退款（關係多）
查詢：用戶看訂單史、客服看訂單、財報跑 SQL
規模：3 年內 100M 訂單
team：5 人都熟 PostgreSQL

請：
1. 套 B.2 矩陣評分
2. 推薦 + 理由
3. 列出 3 個「為什麼不選 X」（Mongo / DynamoDB / CockroachDB）
4. 如果未來想換，從 PostgreSQL 換成 X 的成本估算
```

</div>

<br>

**驗證**：AI 若推薦你不熟的，逼它列出「team 從 0 到生產的學習曲線時間」。

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
