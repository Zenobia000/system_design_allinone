---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.11 · AI-Assisted Selection Workflow'
footer: 'AI 時代系統設計速成 '
---

## B.11 · AI 輔助選型完整 workflow

<span class="kicker">END-TO-END · 從約束到推薦</span>

<div class="prompt">

**Step 1 · 餵約束**：

```
我要選一個 [訊息系統]。
NFR：[QPS、延遲、保留、replay 需求]
約束：[AWS only, team 5 人不熟 Kafka, 預算 $500/月]
現有：[已用 RDS PostgreSQL, Redis]

請列 4 個候選方案 + 一張比較表。
```

**Step 2 · 強制 trade-off**：

```
針對 Kafka vs SQS：
給我 5 個「3 年後我會後悔選 Kafka」的點
給我 5 個「3 年後我會後悔選 SQS」的點
```

**Step 3 · 出 ADR**：

```
基於以上，用 ADR 模板輸出。
特別要求：Open Questions 至少 5 個（需 PoC 驗證）
```

</div>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法


---


## B.11 · 驗證 AI 推薦的 7 個問題

<!-- _class: compact -->

收到 AI 的選型推薦後，逐項問自己：

1. AI 知道我團隊的真實能力嗎？（不知道 → 補上）
2. AI 知道我現有架構嗎？（不知道 → 餵 diagram）
3. AI 列的成本是真實還是估算？（檢查官網價格）
4. AI 列的方案我能在 1 hour 內 PoC 嗎？（不能 → 還沒理解）
5. AI 是否列了「不選 A 的真實壞處」（不只是優點對比）？
6. AI 是否考慮了「3 年後反悔的逆轉成本」？
7. AI 是否敢推薦「保守 / 不時髦」的選項？（總推主流 → 補逼問）

<br>

<span class="muted">**金句**：AI 的選型像 Stack Overflow 的最高票答案—多半正確，少數會害你。</span>

> Source: _source/braindump.md · §AI 工作流的 7 個常見地雷
