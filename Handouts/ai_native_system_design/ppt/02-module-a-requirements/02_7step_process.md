---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.2 · 7-Step Process'
footer: 'AI 時代系統設計速成 '
---

## A.2 · 7 步架構流程速查

<span class="kicker">CHECKLIST · 拿了就用</span>

# 從問題到上線，這 7 步別跳

<!-- _class: compact -->

| 步驟 | 動作 | 產出 | AI 加速 |
|---|---|---|---|
| 1 · 問題理解 | 重述問題、列利害關係人 | 一段 problem statement | AI 重述驗證 |
| 2 · NFR 量化 | 翻譯模糊詞 → 指標 | NFR 清單 | A.1 prompt |
| 3 · 約束盤點 | 預算 / 團隊 / 既有架構 | constraints.md | AI 列盲點 |
| 4 · 應用類型 | CRUD / 即時 / AI / 批次 | type 標記 + 模式 | A.4 決策樹 |
| 5 · 方案發散 | 3 個架構選項 | 比較表 | AI 列方案 |
| 6 · Trade-off | 成本 / 風險 / 複雜度 | 矩陣 + 推薦 | AI 扮反方 |
| 7 · ADR 落定 | 寫決策、為何不選別的 | ADR markdown | A.3 模板 |

<br>

<span class="muted">**陷阱**：80% 的人從第 5 步開始想（直接畫架構圖）—會回頭重做 1-4。</span>

> Source: software_architect/ppt/_source/03_Process_App_Types.md
