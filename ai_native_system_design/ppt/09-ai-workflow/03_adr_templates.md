---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'W.3 · ADR Dialogue Templates'
footer: 'AI 時代系統設計速成 '
---

## W.3 · ADR 對話模板 · 三輪法

<span class="kicker">TEMPLATE · 直接套</span>

<div class="prompt">

**Round 1 · 發散**：
```
基於 [W.2 五段 context]，列出 4 個候選方案。
每個給：核心思路 / 主要優點 / 主要缺點 / 適用條件。
不要選，先列。
```

**Round 2 · 收斂**：
```
針對 [方案 A vs B]，做量化 trade-off 表：
維度（權重）: 開發成本 / 運行成本 / 延遲 / 可擴展 / 團隊熟悉
給每個方案打分（1-10）+ 加權總分。
最後推薦 + 為何不選最高分（如有 override）。
```

**Round 3 · 落定**：
```
基於 Round 2，輸出完整 ADR：
按 [A.3 模板] 格式。
特別要求：Open Questions 至少 5 個（需 PoC）。
列出 stakeholders（誰要簽核）。
```

</div>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法


---


## W.3 · 三輪法的兩個好處

<br>

**為何不一次給**：

1. **避免錨定**：第一個 prompt 就要結論 → AI 會選最常見方案；先散後收避免。
2. **保留主導權**：每輪你都看一次、可介入；不是一次性產出黑箱結果。
3. **可重複使用**：Round 1 的方案表能在未來 ADR 重用；Round 2 的 trade-off 維度可成團隊標準。
4. **避免 token 浪費**：每輪短而具體，比一次性長 prompt 省 30%。

<br>

**進階**：把每輪結果存成 markdown，下次直接 reference：
```
@adr-r1.md @adr-r2.md → 繼續 Round 3
```

<br>

<span class="muted">**金句**：架構決策不是一次性對話—是「迭代收斂」。</span>

> Source: _source/braindump.md
