---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.8 · AI Architecture Review'
footer: 'AI 時代系統設計速成 '
---

## C.8 · 用 AI 做架構審查

<span class="kicker">REVIEW · 把圖丟給 AI</span>

<div class="prompt">

**Prompt**：

```
以下是我的架構圖（PlantUML / Mermaid / 文字描述）：
[貼圖或描述]

目標 NFR：
- 100K QPS, P99 < 200ms
- 99.95% SLA
- 3 region active

請審查並回報：
1. SPOF（單點故障）有哪些？
2. 容量瓶頸最先在哪？對應 QPS 估算？
3. 監控覆蓋哪些缺口？（缺 metric / 缺 trace / 缺 alert）
4. 安全攻擊面（OWASP top 10 對照）
5. 成本浪費點（如：cache 命中低、replica 過多）
6. 演進到 1M QPS 需要先改什麼？
7. 我沒在圖上但應該補的元件
```

</div>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法


---


## C.8 · 把 AI 審查結果排優先

<!-- _class: compact -->

收到 AI 的審查報告後，逐項標：

| 標籤 | 含義 | 行動 |
|---|---|---|
| 🔴 P0 阻擋上線 | SLA 直接受影響 | 本週修 |
| 🟠 P1 1 月內 | 規模到了會死 | sprint 排入 |
| 🟡 P2 1 季內 | 演進性問題 | roadmap |
| 🟢 P3 後話 | 完美主義 | 記下不做 |
| ❌ 拒絕 | AI 過度建議 | 寫 ADR 拒絕理由 |

<br>

<span class="muted">**陷阱**：AI 會把所有建議都列「重要」—你要排優先，不能全做。</span>

> Source: _source/braindump.md · §AI 工作流的 7 個常見地雷
