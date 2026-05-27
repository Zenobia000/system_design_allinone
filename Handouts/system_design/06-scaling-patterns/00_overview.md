---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · Overview'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · TOPIC 00</div>

# Scaling Patterns
## *把系統擴展到 10×、100×、1000× 的具體模式*

<!--
開場 30 秒：
- Ch.5 教「故障下存活」；Ch.6 教「流量爆發下存活」
- 4 個關鍵字：Scale Reads · Scale Writes · Distributed Cache · CDN
- 講者語氣：模式驅動，每個 pattern 都對應一個明確的 bottleneck
-->


---

<!-- _class: cover -->

<div style="text-align:center;">

![w:880](../assets/diagrams/06-scaling-patterns/00_hero.png)

</div>


---



## OBJECTIVES · MENTAL MODEL · NUMBERS

<div class="stack">
  <div class="layer client"><strong>① READ PATH</strong>　 Replica · Cache · Materialized View → Ch.6.1</div>
  <div class="layer app"><strong>② WRITE PATH</strong>　 Shard · Batch · Queue · Aggregate → Ch.6.2</div>
  <div class="layer data"><strong>③ CACHE</strong>　 Distributed cache · 一致性 · HA → Ch.6.3</div>
  <div class="layer infra"><strong>④ EDGE</strong>　 CDN · Edge compute · 全球分發 → Ch.6.4</div>
</div>

| 元件 | 單機上限 | 撞牆訊號 |
|------|---------|---------|
| 關聯式 DB（B-tree） | ~1K wps | CPU/IO wait |
| Cassandra（append-only） | ~10K wps | compaction 排隊 |
| Redis 單機 | ~100K ops/s | network bw 滿 |
| Read replica（有 index） | 50K–100K rps | replication lag |

<span class="muted">**讀寫不對稱**：90% 系統讀:寫 = 100:1。先優化讀，撞牆再優化寫。</span>

![w:560](../assets/diagrams/06-scaling-patterns/00_mental_model.png)

> Source: 常用技術/08 + 10 · 設計模式/01 §2 · 02 §1
