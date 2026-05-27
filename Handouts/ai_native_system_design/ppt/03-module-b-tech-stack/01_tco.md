---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.1 · TCO Model'
footer: 'AI 時代系統設計速成 '
---

## B.1 · TCO 一頁模型

<span class="kicker">COST · 不是只看 server 帳單</span>

# 真實 TCO = 4 個來源

<!-- _class: compact -->

```
TCO 3 年 = 機器成本
        + 人員成本（搭建 + 維運）
        + 移轉成本（學習曲線 / 遷舊資料）
        + 機會成本（沒做別的事）
```

| 來源 | 例：選 Kafka | 例：選 SQS |
|---|---|---|
| 機器 | $1,500/月 × 36 = $54K | $300/月 × 36 = $11K |
| 人員 | 0.5 FTE × 3yr × $120K = $180K | 0.1 FTE × 3yr × $120K = $36K |
| 移轉 | 學習 3 月 + PoC 1 月 ≈ $40K | 學習 0.5 月 ≈ $5K |
| 機會 | 其他 feature 延 4 月 | 幾乎無 |
| **總計** | **$274K** | **$52K** |

<br>

<span class="muted">**金句**：90% 的「便宜方案」反而貴在人。算 TCO 把人算進去。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §TCO
