---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 3 · AI Prompt Flow'
footer: 'AI 時代系統設計速成 '
---

## C3.7 · 用 Claude Code 加速設計

<div class="prompt">

**Step 1 · Chunking 策略**：

```
我有 50K 文件，含 PDF、Word、Confluence。
平均文件 5000 字。
請：
1. 比較 3 種 chunking 策略（fixed-size, semantic, hierarchical）
2. 各自的 recall / precision trade-off
3. 哪一個對「規章查詢」最好？對「How-to 文件」最好？
4. 給我 Python code 範例（用 langchain TextSplitter）
```

**Step 2 · Eval framework**：

```
請給我 30 道測試題用於 eval RAG 品質：
- 10 道精確問答（有 ground truth）
- 10 道 multi-hop（需多文件）
- 5 道 negative（文件中沒有，應該說 don't know）
- 5 道 adversarial（誘導 hallucination）
標出每道題的「成功標準」+「自動評分方法」。
```

**Step 3 · 成本優化**：

```
當前每查詢 $0.02，月 100K 查詢 = $2000。
列出 7 個降本方法，按 ROI 排序：
- semantic cache / batch embed / Llama 路由 / context 縮短 / ...
每個給：預估降幅 + 實作成本 + 風險。
```

</div>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
