---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.10 · Trade-off Matrix'
footer: 'AI 時代系統設計速成 '
---

## A.10 · Trade-off 矩陣標準格式

<span class="kicker">FORMAT · 寫進每份 ADR</span>

# 沒有 trade-off 表的 ADR 是垃圾

<!-- _class: compact -->

| 維度 | 權重 | 方案 A | 方案 B | 方案 C |
|---|---|---|---|---|
| 開發成本（人月） | 30% | 3 | 5 | 8 |
| 運行成本（$/月） | 20% | $2K | $1K | $3K |
| 延遲 P99 | 15% | 200ms | 80ms | 50ms |
| 可擴展性（10x） | 15% | 需重做 | OK | OK |
| 團隊熟悉度 | 10% | 高 | 中 | 低 |
| 維運複雜度 | 10% | 低 | 中 | 高 |
| **加權總分** | 100% | **7.2** | **8.1** | **6.8** |

<br>

**規則**：
- 維度權重要先固定，避免事後改成「你想選 B」的權重
- 量化（不要寫「高/中/低」）—換成數字、時間、金額
- 評分後 → 看推薦 → 必要時人工 override（但要寫「為何不選最高分」）

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md
