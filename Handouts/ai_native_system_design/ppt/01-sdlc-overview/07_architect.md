---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.01 · Architect'
footer: 'AI 時代系統設計速成 '
---

## ROLE 4 · Architect · 系統架構師

<span class="kicker">結構技師</span>

# 承重、耐震、未來擴建—讓系統活下去

<br>

**經典產出**：架構圖、ADR、NFR 清單、技術選型矩陣、風險評估。

**判斷力核心**：
- 哪個 NFR 是 must（不滿足就死）vs nice？
- 微服務 vs 模組化單體—我的團隊撐得起哪個？
- 引入 Kafka 換來的吞吐，值得多 1 個維運人嗎？

<br>

<span class="muted">📘 想深入 → software_architect/ppt/05-ilities/ + 07-system-architecture/</span>

> Source: _source/braindump.md · §AI 取代不了的核心判斷


---


## Architect · AI 協作模式

<div class="prompt">

**典型 prompt**：

```
NFR：100K QPS、P99 < 200ms、99.95% SLA、3 region。
現有：team 5 人、預算 $20K/月、已用 PostgreSQL。
列出 3 個架構方案 + trade-off 表（成本/複雜度/風險）。
最後選一個並寫 ADR（含被否決方案的「為何不選」）。
```

</div>

<br>

**AI 強**：方案比較表、ADR 草稿、PlantUML 架構圖、選型 trade-off。
**AI 弱**：團隊能力評估、政治約束、5 年後的演進判斷。
**陷阱**：AI 推薦的常是「業界主流」—不一定適合你的規模。

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
