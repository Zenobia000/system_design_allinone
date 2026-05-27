---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.2 · 20 Patterns Cheat Sheet (1/2)'
footer: 'AI 時代系統設計速成 '
---

## D.2 · 20 個高頻模式 · 1/2

<span class="kicker">CARD · 創建 + 結構</span>

<!-- _class: compact -->

| 模式 | 解什麼問題 | 一句話 |
|---|---|---|
| Factory | 物件創建邏輯複雜 | 用「方法」造而不是直接 new |
| Builder | 物件參數太多 | 鏈式建構 |
| Singleton | 全域唯一 | 慎用，多半是反 pattern |
| Adapter | 介面不相容 | 包一層轉換 |
| Decorator | 動態加功能 | 包裝原物件 |
| Facade | 多個子系統難用 | 統一入口 |
| Proxy | 控制存取 | 中間層攔截 |
| Composite | 樹狀結構 | 葉子和節點同介面 |
| Repository | 資料存取抽象 | DAO + 領域語言 |
| Specification | 複雜查詢條件 | 可組合的條件物件 |

> Source: software_architect/ppt/_source/06_Components_Patterns.md


---


## D.2 · 20 個高頻模式 · 2/2

<span class="kicker">CARD · 行為 + 分散式</span>

<!-- _class: compact -->

| 模式 | 解什麼問題 | 一句話 |
|---|---|---|
| Strategy | 演算法可替換 | 注入不同策略 |
| Observer | 訂閱通知 | pub/sub 本地版 |
| State | 物件行為依狀態變 | 狀態機 |
| Command | 動作物件化 | 可 undo / queue |
| Template Method | 流程固定步驟可變 | 抽象方法 |
| Chain of Responsibility | 多個 handler 串接 | middleware |
| Saga | 跨服務事務 | 補償交易 |
| Event Sourcing | 不存狀態存事件 | 完整 audit, 可重放 |
| CQRS | 讀寫分離模型 | 讀用 view, 寫用 command |
| Outbox | 訊息可靠投遞 | DB + outbox table |

> Source: software_architect/ppt/_source/08_Advanced_Patterns.md
