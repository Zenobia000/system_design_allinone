---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · AI Prompt Flow'
footer: 'AI 時代系統設計速成 '
---

## C1.7 · 用 Claude Code 加速設計（完整 flow）

<div class="prompt">

**Step 1 · 拆需求**：

```
我要設計秒殺系統，1000 件商品，預期峰值 100K req/s。
請列出 10 個我必須回答的設計問題，分 5 類：
庫存準確 / 公平排隊 / 削峰 / 體驗 / 對帳
```

**Step 2 · 容量估算**：

```
給定上述，請算：
- 各層 QPS 需求（CDN/App/Redis/Kafka/DB）
- 各層機器數估算
- 月成本（含 pre-scale 額外）
```

**Step 3 · 架構草稿**：

```
用 PlantUML 畫 stage 3 架構圖。
標出：流量擋在哪、哪些 sync 哪些 async、SPOF。
```

**Step 4 · 反方論證**：

```
扮演對手公司架構師，攻擊這個方案 5 點。
特別針對：Redis SPOF、Kafka 故障、對帳延遲。
```

</div>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
