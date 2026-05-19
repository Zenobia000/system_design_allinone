---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.01 · DBA'
footer: 'AI 時代系統設計速成 '
---

## ROLE 6 · DBA · 資料工程 / DBA

<span class="kicker">地基 + 水塔 + 管線</span>

# 資料是命脈—錯一個 schema 全公司返工

<br>

**經典產出**：schema、索引、分片策略、備份方案、查詢優化。

**判斷力核心**：
- SQL vs NoSQL vs Vector—哪個對應業務？
- 哪些欄位該 index？哪些不該（寫入成本）？
- 分片鍵選錯，未來 5 年都在 reshard。

<br>

<span class="muted">📘 想深入 → software_architect/ppt/04-tech-stack-data/</span>

> Source: _source/braindump.md · §AI 取代不了的核心判斷


---


## DBA · AI 協作模式

<div class="prompt">

**典型 prompt**：

```
業務：[訂單系統，預計 100K 訂單/日，3 年內 10M]
讀寫比：8:1，最多 join 4 表
查詢模式：[列前 5 個常見 query]
請給：
1. PostgreSQL DDL（含 partition 策略）
2. 索引建議 + 為何（含寫入成本估算）
3. 哪些 query 該 cache、哪些不該
```

</div>

<br>

**AI 強**：DDL、索引建議、EXPLAIN 解讀、查詢重寫。
**AI 弱**：跨業務的一致性策略、災難恢復演練、容量曲線預判。
**陷阱**：AI 會推「最佳實踐」schema—忽略現有資料遷移成本。

> Source: _source/braindump.md · §AI 工作流的 7 個常見地雷
