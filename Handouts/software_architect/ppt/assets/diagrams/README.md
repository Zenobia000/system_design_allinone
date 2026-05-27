# 圖像資產與生成工作流

本資料夾管理整套「架構師的藍圖」PPT 的視覺化圖像。
**風格與 `../../../ppt/assets/diagrams/` 完全同調**——同一套色票、同一種手繪風格。

## 三份必讀文件

| 檔案 | 內容 |
|------|------|
| [`0_STYLE_GUIDE.md`](0_STYLE_GUIDE.md) | 色票、prompt 模板、命名規範、優先序定義 |
| [`prompts/INDEX.md`](prompts/INDEX.md) | 全部圖像清單與優先序總表（先看這個挑要做的） |
| [`prompts/0X-*.md`](prompts/) | 每章逐張的 prompt 內容 |

---

## 工作流程

### Step 1 · 挑要做的圖
打開 [`prompts/INDEX.md`](prompts/INDEX.md)，先看 **P1 清單**（約 20 張，每章 hero + mental model）。

### Step 2 · 生成
- **A/B/D 類**（hero、概念、簡單對照）→ 用 DALL-E 3 或 Midjourney
- **C/E 類**（結構圖、決策樹）→ 用 Mermaid（Live Editor: <https://mermaid.live>）或 Excalidraw

完整 prompt 內已注入統一風格修飾詞，**直接複製貼上即可**。

### Step 3 · 入檔
產出後重新命名為 prompt 文檔指定的 **save as** 路徑：

```
software_architect/ppt/assets/diagrams/<chapter>/<filename>.png
```

例如：
```
software_architect/ppt/assets/diagrams/01-role-value/01_myth_vs_truth_01_iceberg.png
```

### Step 4 · 通知整合
告訴我「Ch.1 / 01_myth_vs_truth / 圖 1 已生成」，我會把 Marp 圖片語法插入對應 slide：

```markdown
![w:700](../assets/diagrams/01-role-value/01_myth_vs_truth_01_iceberg.png)
```

可一次告知多張。

---

## 圖像類型速查

| 類型 | 例子 | 推薦工具 |
|------|------|---------|
| A | 章首 hero、Section divider | DALL-E 3 / Midjourney |
| B | mental model 概念隱喻 | DALL-E 3 / Midjourney |
| C | 系統架構、拓撲、資料流 | **Mermaid / Excalidraw**（AI 做不準） |
| D | 2x2 矩陣、Trade-off 對照 | DALL-E 3（簡圖）/ Excalidraw（含字） |
| E | 決策樹、流程圖 | **Mermaid**（AI 完全做不好） |

---

## 預算建議

| 預算 | 做哪些 | 張數 |
|------|--------|------|
| 最小 | Cover hero + 10 章 hero + 10 mental model | ~21 張 |
| 標準 | + 各章核心 trade-off / 架構（P2） | ~36 張 |
| 完整 | + 所有 P3 細節 | ~50 張 |

**強烈建議從最小集開始**，做完後實際把它們塞進 PPT 試讀，再決定要不要追加。
