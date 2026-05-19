---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'W.1 · Five High-Leverage Uses'
footer: 'AI 時代系統設計速成 '
---

## W.1 · Claude Code 在系統設計的 5 種用法

<span class="kicker">HIGH LEVERAGE · 排序</span>

<!-- _class: compact -->

| # | 用法 | 槓桿（時間省） | 失敗風險 |
|---|---|---|---|
| 1 | **ADR 生成** · 餵 NFR → 拿備選方案 + 推薦 + 風險 | 10× | 不選反方意見 → 偏執 |
| 2 | **架構審查** · 餵架構圖 → 找 SPOF / 瓶頸 / 缺口 | 5× | AI 過度建議 |
| 3 | **PoC 加速** · 餵 API spec → 拿可跑代碼 | 20× | 代碼有 bug → 仍要 review |
| 4 | **文檔同步** · 餵 diff → 拿更新文件 / 圖 / 測試 | 8× | 文件遲於 code |
| 5 | **技術選型辯論** · 讓 AI 扮對立面 | 4× | 雙方都 AI = 失去人類判斷 |

<br>

<span class="muted">**最高槓桿**：PoC 加速（20×）。最危險：ADR 偏執（單方面論證）。</span>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法


---


## W.1 · 5 種用法的選用時機

<!-- _class: compact -->

```
你在哪個階段？

需求理解   → W.5 「文檔同步」+ AI 訪談模擬器（A.8）
架構發想   → W.1 「ADR 生成」+ W.5 「技術選型辯論」
方案敲定   → W.2 「架構審查」+ A.11 「devil advocate」
PoC 驗證   → W.3 「PoC 加速」
實作開發   → W.4 「PoC 加速」更深、code review with AI
上線後     → W.5 「文檔同步」、incident analysis
```

<br>

<span class="muted">**口訣**：「不同階段、不同 prompt」—別一套 prompt 用到死。</span>

> Source: _source/braindump.md
