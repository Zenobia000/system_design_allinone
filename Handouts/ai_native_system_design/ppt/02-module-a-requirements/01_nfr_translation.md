---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.1 · NFR Translation'
footer: 'AI 時代系統設計速成 '
---

## A.1 · 模糊詞 → 可量測指標

<span class="kicker">FRAMEWORK · NFR 翻譯表</span>

# 從「希望好用」到「P99 < 200ms」

<!-- _class: compact -->

| 業務詞 | 量化指標 | 範例目標 | 量測工具 |
|---|---|---|---|
| 「快」 | P50 / P95 / P99 latency | P99 < 200ms | OpenTelemetry, Prometheus |
| 「穩」 | availability % / error rate | 99.95% / errors < 0.5% | uptime monitor + SLO |
| 「省」 | unit cost / TCO | < $0.001 per request | billing dashboard |
| 「彈性」 | scale-out factor / time | 10x in 5min | load test |
| 「即時」 | end-to-end lag | message lag < 1s | Kafka lag metrics |
| 「同時很多人」 | concurrent users / QPS | 50K concurrent | load test |
| 「資料不能掉」 | RPO / RTO | RPO=5min, RTO=15min | DR drill |

<br>

<span class="muted">**翻譯口訣**：模糊詞 → 量化 → 量測 → 目標。四步缺一不可。</span>

> Source: _source/braindump.md · §需求量化的核心框架


---


## A.1 · AI 協作：把模糊詞自動展開

<div class="prompt">

**Prompt**：

```
我有以下業務需求（模糊版）：
「使用者上傳影片後，要快速看到結果，且不能掉。」

請：
1. 列出至少 5 個「快速」可能的真實含義（含對應 SLI）
2. 列出「不能掉」對應的 RPO / RTO 範例
3. 給我 3 組可能的目標（保守 / 標準 / 激進），各自的工程代價估算
4. 列出我該回頭問 PM 的 5 個澄清問題
```

</div>

<br>

**為何不直接給 AI 數字**：你給「P99 < 100ms」是承諾，你給「快速」會被解讀成不同數字 → 後面返工。
**真實流程**：用 AI 把模糊詞展開成選項表 → 拿表去跟 PM 對齊。

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
