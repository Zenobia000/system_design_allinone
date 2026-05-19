# Module B · 技術選型與資料策略 · 圖像 Prompts

> Style guide: [`./0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md)
> Save images to: `openslide/slides/03-module-b-tech-stack/assets/`

**本章圖像**：3 張 · P1 × 3

---

## Image 01 · CAP 三角

- **Type**: B · Concept Triangle
- **Priority**: P1
- **Save as**: `openslide/slides/03-module-b-tech-stack/assets/B_cap_triangle.png`
- **Used in**: 03-B P05
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook / consulting style. Flat 2D, NO 3D, NO cartoon.

  Theme: CAP Theorem triangle showing trade-off between Consistency, Availability, Partition Tolerance.

  Background: warm cream #F5F1E8.

  Large equilateral triangle in center. 3 corners labeled:
  - Top: 'C / Consistency · 一致性'
  - Bottom-left: 'A / Availability · 可用性'
  - Bottom-right: 'P / Partition Tolerance · 分區容忍'

  Inside triangle, central text: '網路會壞，P 必選 / Partition is unavoidable - pick 2'.

  Along each edge, label the trade-off pair:
  - CP edge (top to bottom-right): 'Spanner · PG (跨 region)'
  - AP edge (top to bottom-left): 'DynamoDB · Cassandra · Mongo'
  - CA edge (bottom): 'PostgreSQL 單 region only / single region only'

  Place example database logos / labels near each corner zone.

  Bottom annotation: 'PACELC extension: Else, trade-off Latency vs Consistency / 分區沒發生時，延遲 vs 一致性'.

  Lines: dark brown #2A2520, 2px.
  Element fills: terracotta #D97757, olive #A1813F, sage green #5B9770.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 02 · 七大 DB 決策樹

- **Type**: B · Decision Tree
- **Priority**: P1
- **Save as**: `openslide/slides/03-module-b-tech-stack/assets/B_db_decision_tree.png`
- **Used in**: 03-B P06
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook style. Flat 2D, NO 3D, NO cartoon.

  Theme: Decision tree for selecting database type based on data characteristics.

  Background: warm cream #F5F1E8.

  Root node at top: rounded rectangle '資料屬性 / Data Characteristics'.

  Branches down to 7 leaf nodes (each a cylinder = DB), tree structure:

  Level 1 split: '關係? / Relational?'
  - Yes → Level 2: '事務需求?'
    - Strong → 'PostgreSQL · OLTP / 強事務'
    - Analytical → 'ClickHouse · BigQuery / OLAP 列存'

  Level 1 No branch → 'Schema 變動?'
  - Often → 'Mongo · CouchDB / 文件型'
  - Stable → 'Schema-on-read 模式'

  Level 1 split: 'Key-Value 簡單?'
  - Yes → 'Redis · Memcached / KV 快取'

  Level 1 split: 'Time-series?'
  - Yes → 'InfluxDB · TimescaleDB / 時序'

  Level 1 split: '關係多跳?'
  - Yes → 'Neo4j · Neptune / 圖資料庫'

  Level 1 split: '相似度查詢?'
  - Yes → 'pgvector · Pinecone / 向量資料庫'

  Bottom annotation: '預設 PostgreSQL，遇到瓶頸再針對性加 / Default to PG'.

  Lines: dark brown #2A2520, 2px.
  Element fills: terracotta #D97757, olive #A1813F, sage #5B9770.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 03 · Sharding 三件套

- **Type**: D · Three-column Comparison
- **Priority**: P1
- **Save as**: `openslide/slides/03-module-b-tech-stack/assets/B_sharding_topology.png`
- **Used in**: 03-B P08
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook / AWS whitepaper style. Flat 2D, NO 3D, NO cartoon.

  Theme: Three data scaling techniques compared side-by-side: Replication, Partitioning, Sharding.

  Background: warm cream #F5F1E8.

  3 vertical columns separated by dashed lines, each shows a mini topology:

  Left column: 'Replication / 複製'
  - 1 Primary cylinder + 2 Replica cylinders, arrows from Primary to Replicas
  - Note: '解：讀放大 + HA / Read scale + HA'
  - Cost: '寫一致性 / Write consistency'

  Middle column: 'Partitioning / 分區'
  - 1 Cylinder split horizontally into 3 segments labeled 'P1, P2, P3'
  - Note: '解：單表太大 / Big table'
  - Cost: 'query routing 邏輯'

  Right column: 'Sharding / 分片'
  - 3 separate cylinders side-by-side labeled 'Shard 1, 2, 3'
  - App splits requests by shard key
  - Note: '解：寫吞吐 + 總容量 / Write scale + capacity'
  - Cost: '跨片 JOIN 痛 / Cross-shard JOIN pain'

  Top annotation: 'Three Tools for Three Problems / 三件套解三痛'.

  Element fills: terracotta #D97757 services, sage green #5B9770 databases.
  Lines: dark brown #2A2520, 2px arrows.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```
