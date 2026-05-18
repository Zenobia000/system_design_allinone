# 圖像資產與生成工作流

本資料夾管理整套「軟體開發旅程」PPT 的視覺化圖像。
**風格與姊妹專案 `../../../software_architect/ppt/assets/diagrams/` 完全同調**——同一套色票、同一種手繪風格。

## 三份必讀文件

| 檔案 | 內容 |
|------|------|
| [`0_STYLE_GUIDE.md`](0_STYLE_GUIDE.md) | 色票、prompt 模板、命名規範、優先序定義 |
| [`prompts/INDEX.md`](prompts/INDEX.md) | 全部圖像清單與優先序總表（先看這個挑要做的） |
| [`prompts/0X-*.md`](prompts/) | 每章逐張的 prompt 內容 |

---

## 工作流程

### Step 1 · 挑要做的圖
打開 [`prompts/INDEX.md`](prompts/INDEX.md)，先看 **P1 清單**（約 18 張，每章 hero + master template）。

### Step 2 · 生成
- **A/B/D 類**（hero、概念、簡單對照）→ 用 DALL-E 3 或 Midjourney
- **C/E 類**（結構圖、決策樹）→ 用 Mermaid（Live Editor: <https://mermaid.live>）或 Excalidraw

完整 prompt 內已注入統一風格修飾詞，**直接複製貼上即可**。

### Step 3 · 入檔
產出後重新命名為 prompt 文檔指定的 **save as** 路徑：

```
software_develop_journey/ppt/assets/diagrams/<chapter>/<filename>.png
```

例如：
```
software_develop_journey/ppt/assets/diagrams/01-big-picture/01_building_metaphor.png
```

### Step 4 · 插入 slide
告訴我「Ch.1 / 01_building_metaphor / 圖已生成」，我會把 Marp 圖片語法插入對應 slide：

```markdown
![w:900](../assets/diagrams/01-big-picture/01_building_metaphor.png)
```

可一次告知多張。

---

## 三個母模板（必做）

本教材獨有的視覺母模板——做好這 3 張，整本教材的視覺軸就立起來了：

| # | 母模板 | 出現位置 | 優先 |
|---|--------|---------|------|
| 1 | 蓋大樓 9 角色一字排開 | Ch.1 + 每章 overview 引用 | **P0** |
| 2 | 9 角色腦中泡泡 | Ch.0 prologue 03_how_to_read | **P0** |
| 3 | 九角色甘特帶 | Ch.12 三系統各一張 | **P0** |

詳細 prompt 見 [`prompts/INDEX.md`](prompts/INDEX.md)。

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
| **最小（試水溫）** | 3 個母模板 + Ch.1 hero + Ch.12 三系統 hero | ~7 張 |
| **標準** | + 14 章每章 hero | ~21 張 |
| **完整** | + 各章 mental model / 概念圖 | ~35 張 |

**強烈建議從最小集 7 張開始**——這 7 張定錨後，後續可逐章補充。
