---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'W.4 · PoC Loop'
footer: 'AI 時代系統設計速成 '
---

## W.4 · PoC 生成 → 驗證 → 迭代閉環

<span class="kicker">WORKFLOW · 最高槓桿</span>

<!-- _class: compact -->

```
1. 寫 ADR + API spec      (你, 30 min)
       ↓
2. AI 生 PoC 骨架          (AI, 5 min)
       ↓
3. 跑通 happy path         (你 + AI debug, 30 min)
       ↓
4. AI 補 5 個 edge case    (AI, 5 min)
       ↓
5. 跑壓測 / 驗 NFR         (你, 1 hour)
       ↓
6. 找出 2-3 個架構假設破滅 (你)
       ↓
7. 改 ADR、回到 step 2     (迭代)
```

<br>

**閉環關鍵**：每輪都產出「可驗證的 artifact」。不是抽象討論，是 code + test + metric。

<br>

<span class="muted">**金句**：PoC 不是「能跑」，是「能驗證假設」。沒驗證假設 = 沒做 PoC。</span>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法


---


## W.4 · PoC 失敗時的常見原因

<!-- _class: compact -->

| 失敗模式 | 真相 | 解 |
|---|---|---|
| 跑不起來 | dependency 版本不對 | AI 加 lock file + Docker |
| 跑通 happy 但 edge case 死 | AI 沒考慮 | 強制要 «5 個 edge case» |
| 壓測沒到 NFR | 架構假設破滅 | 改 ADR，不是 tune code |
| 通過但維護不了 | code 太「巧妙」 | 強制「let me review readability」 |
| 通過但有 SQL injection | AI 用了 unsafe pattern | 跑 security 掃描 |

<br>

**反 pattern**：PoC 跑通就直接搬到 prod。**真正 PoC = 學到東西就丟**。

<br>

<span class="muted">**金句**：PoC 的價值是「拿到 ADR 驗證」，不是「拿到能用的 code」。</span>

> Source: _source/braindump.md
