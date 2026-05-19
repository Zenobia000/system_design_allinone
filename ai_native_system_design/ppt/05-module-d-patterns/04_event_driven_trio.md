---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.4 · Event-Driven Trio'
footer: 'AI 時代系統設計速成 '
---

## D.4 · Saga · Event Sourcing · CQRS

<span class="kicker">THREE PATTERNS · 別混為一談</span>

<!-- _class: compact -->

| 模式 | 解什麼 | 不解什麼 | 殺手場景 |
|---|---|---|---|
| **Saga** | 跨服務事務 | 不存歷史 | 訂單 + 付款 + 出貨 |
| **Event Sourcing** | 完整 audit + 可重放 | 不直接給查詢 | 帳本、版控 |
| **CQRS** | 讀寫模型不同 | 不解 ACID | 讀大寫小、視圖複雜 |

<br>

**常見搭配 / 反 pattern**：
- ✅ Saga 單獨用最常見
- ✅ Event Sourcing + CQRS（事件變更會自然形成讀模型）
- ❌ 為了「將來可能 audit」直接上 Event Sourcing（複雜度爆炸）
- ❌ 為了「將來流量大」直接上 CQRS（多一套模型維護成本）

<br>

<span class="muted">**金句**：這三個都是「重武器」—用之前先確認你的痛真的需要它。</span>

> Source: software_architect/ppt/_source/08_Advanced_Patterns.md
