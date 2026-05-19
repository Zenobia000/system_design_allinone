---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.6 · Sharding / Replication'
footer: 'AI 時代系統設計速成 '
---

## B.6 · Sharding · Partitioning · Replication

<span class="kicker">THREE TOOLS · 各解一種問題</span>

# 別搞混—三個解決三種痛

<!-- _class: compact -->

| 工具 | 解決什麼 | 引入的代價 |
|---|---|---|
| **Replication** | 讀放大 + HA | 寫一致性、複製延遲 |
| **Partitioning** | 單表太大難管理 | query 多了 routing 邏輯 |
| **Sharding** | 寫放大、總容量 | 跨片 JOIN 痛、reshard 噩夢 |

<br>

**漸進策略**（多數系統的真實路徑）：

```
單機 → 主從複製 (read replica) → 表分區 (partitioning)
     → 讀寫分離 → 垂直分庫 → 水平分片 (sharding)
```

<br>

<span class="muted">**反 pattern**：第一天就 sharding。除非你確定要爆 10M QPS，否則 5 年內不需要。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md


---


## B.6 · Shard key 選錯 = 3 年地獄

<!-- _class: compact -->

**好 shard key 的特徵**：
- 均勻分佈（避免熱點）
- 查詢時通常會帶（避免跨片）
- 不會改變（改 = reshard）

**範例**：
| 業務 | 好 shard key | 壞 shard key |
|---|---|---|
| 訂單 | user_id（多數查詢帶） | order_id（隨機，跨片查 user 訂單痛） |
| 多租戶 SaaS | tenant_id | user_id |
| IoT | device_id + 時間區間 | 純時間（會熱寫） |

<br>

<span class="muted">**金句**：shard key 是分散式設計裡「改一次回不去」的決策—想清再做。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §Sharding
