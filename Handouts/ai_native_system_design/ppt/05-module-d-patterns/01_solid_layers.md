---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.1 · SOLID + Layers'
footer: 'AI 時代系統設計速成 '
---

## D.1 · SOLID 5 原則 + 分層架構

<span class="kicker">FUNDAMENTALS</span>

<!-- _class: compact -->

| 原則 | 一句話 | 違反訊號 |
|---|---|---|
| **S**RP | 一個類只該為一個 actor 改變 | 一個檔 1000 行 |
| **O**CP | 對擴展開放，對修改封閉 | 加 feature 都改舊 code |
| **L**SP | 子類可以替換父類 | 繼承後 if 判斷型別 |
| **I**SP | 別逼 client 依賴用不到的方法 | 一個 interface 30 個方法 |
| **D**IP | 依賴抽象，不依賴具體 | 直接 new Database() |

<br>

**分層架構（4 層標準）**：

```
Presentation  →  Application  →  Domain  →  Infrastructure
  (UI/API)       (use cases)    (logic)     (DB/external)
```

依賴方向：**只能向內、不能向外**（Clean Architecture）。

<br>

<span class="muted">**金句**：SOLID 不是法律，是工具。違反 OCP 改一行能解 = 不要硬套。</span>

> Source: software_architect/ppt/_source/06_Components_Patterns.md
