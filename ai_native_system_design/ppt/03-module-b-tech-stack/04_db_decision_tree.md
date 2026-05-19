---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.4 · DB Decision Tree'
footer: 'AI 時代系統設計速成 '
---

## B.4 · 七大 DB 類型決策樹

<span class="kicker">CHEAT SHEET · 一頁全包</span>

```
       業務資料屬性
            |
    +-------+-------+--------+--------+
    |       |       |        |        |
  關聯     文件     KV     時序     圖
    |       |       |        |        |
PostgreSQL Mongo  Redis  Influx  Neo4j
 MySQL    Couch   DynamoDB Prometheus
                  Memcached
            |
        分析 / OLAP？
            |
       +----+----+
       |         |
    列存       搜尋
    ClickHouse  Elasticsearch
    Snowflake   OpenSearch
       BigQuery
            |
        AI 向量？
            |
         pgvector / Pinecone / Qdrant / Weaviate
```

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §DB Types


---


## B.4 · 七大 DB 各自的「殺手場景」

<!-- _class: compact -->

| 類型 | 殺手場景 | 反例（別硬用） |
|---|---|---|
| 關聯（PostgreSQL） | 多表 JOIN、強事務 | 高 fanout 推送 |
| 文件（Mongo） | schema 變動快、嵌套深 | 跨文件交易 |
| KV（Redis） | session、cache、leaderboard | 複雜查詢 |
| 時序（Influx） | metrics、IoT、log | 跨時段事務 |
| 圖（Neo4j） | 多跳關係、推薦 | OLTP 主存 |
| 列存（ClickHouse） | OLAP 大量掃描 | OLTP 高頻寫 |
| 向量（pgvector） | RAG、相似搜尋 | 精確 key 查詢 |

<br>

<span class="muted">**預設**：先 PostgreSQL，遇到瓶頸再針對性加。多數系統不需要 5 種 DB。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md
