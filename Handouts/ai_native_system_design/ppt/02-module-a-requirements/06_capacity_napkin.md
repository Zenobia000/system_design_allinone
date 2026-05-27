---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.6 · Capacity Napkin Math'
footer: 'AI 時代系統設計速成 '
---

## A.6 · 容量規劃一頁算式

<span class="kicker">BACK-OF-NAPKIN</span>

# 從用戶數估算 QPS / 儲存 / 頻寬

<!-- _class: compact -->

**用戶 → QPS**

```
DAU × per-user-actions-per-day / 86400 = avg QPS
peak QPS = avg × peak-ratio (常用 3-10×)
```

**儲存**

```
DAU × records-per-day × bytes-per-record × retention-days
× (1 + index-overhead 30%) × (1 + replication-factor)
```

**頻寬**

```
QPS × avg-payload-bytes × 8 (bits) = bps
+ 30% TLS/overhead，+ peak-ratio
```

<br>

**範例**：10M DAU × 100 actions × 1KB = **1 TB/day**，平均 ~11 QPS write，peak ~50 QPS。
若每 record 30 天保留 + 3x replication = ~120 TB warm storage。

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §Capacity


---


## A.6 · AI 加速容量規劃

<div class="prompt">

**Prompt**：

```
業務假設：[DAU 10M, 每人每天 50 動作, 70% read 30% write,
          peak/avg = 5x, 每筆 1KB, 保留 90 天]

請給我：
1. avg / peak QPS (read, write)
2. 儲存需求（含 index 30%、副本 3x、90 天）
3. 出口頻寬（含 TLS）
4. 對應 PostgreSQL 應該 partition 還是分片
5. cache 命中率假設 90% 時，DB 實際 QPS

最後給我一張表，標出哪些「假設」最敏感（變動 ±50% 對結果衝擊最大）。
```

</div>

<br>

**人要做的**：驗證 DAU 假設、決定 peak-ratio 是否真實、判斷 cache 命中率假設。

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
