# 圖像風格指南 · 架構師的藍圖 PPT

> 所有圖像必須遵守本檔風格，確保整套 PPT 視覺一致。
> 每章 prompt 文檔（`prompts/0X-*.md`）只列 **subject + composition**；
> 風格修飾詞由本檔 template 統一注入。
> **與 `../../../ppt/assets/diagrams/0_STYLE_GUIDE.md` 完全同調**——同一套色票、同一套風格。

---

## 1 · 色票（必背 5 色）

| 用途 | HEX | 說明 |
|------|-----|------|
| 背景 / 主體 | `#F5F1E8` | warm off-white cream（不要純白） |
| 強調色 | `#D97757` | warm orange（重點線條、箭頭、icon） |
| 次要強調 | `#8B6F47` | deep brown（陰影、副線條） |
| 文字 / 黑色 | `#2A2520` | dark navy-brown（不要純黑） |
| 警告色 | `#E8634F` | soft red（反模式提醒、危險區域） |
| 成功色 | `#5B9770` | moss green（推薦做法、安全區域） |

**禁用**：純白 `#FFFFFF`、純黑 `#000000`、霓虹色、漸層光暈、3D 反射。

---

## 2 · 風格描述（Prompt Style Block）

### 2.1 Positive 風格修飾詞（每張圖都要包含）

```
editorial illustration, hand-drawn technical sketch style,
warm color palette: cream off-white #F5F1E8 background, warm orange #D97757 accents,
deep brown #8B6F47 secondary lines, dark navy text,
minimalist flat vector with subtle paper texture,
clean geometric lines, ample whitespace,
educational diagram style, technical accuracy, calm composed mood
```

### 2.2 Negative 修飾詞

```
photo-realistic, 3D render with shadows, glossy reflections,
neon, cyberpunk, dark theme, gradient glow, lens flare,
isometric (除非明確指定), watermark, signature,
cluttered text labels, blurry, low contrast,
kawaii, cartoon, anime, chibi
```

### 2.3 完整 Prompt Template

把每章 prompt 文檔內的 `{SUBJECT}` 和 `{COMPOSITION}` 套進這個模板：

```
{SUBJECT}.
{COMPOSITION}.
editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
--ar {ASPECT} --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
```

---

## 3 · 圖像類型分類

| 類型 | 用途 | 推薦工具 | 為何 |
|------|------|---------|------|
| **A · Hero / Cover** | 章節封面、概念隱喻 | **DALL-E 3 / Midjourney v6** | AI 美感最強，技術內容少 |
| **B · 概念隱喻** | mental model、抽象比喻 | **DALL-E 3 / Midjourney** | 同上 |
| **C · 結構/架構圖** | 系統拓撲、資料流、序列 | **Mermaid / Excalidraw** ⚠️ | AI 對精確 label 與箭頭很差 |
| **D · 對照圖** | 2x2 矩陣、Trade-off 對比 | DALL-E 3（簡單版）/ Excalidraw（含字） | 視文字密度而定 |
| **E · 狀態圖 / 流程** | 決策樹、設計流程 | **Mermaid stateDiagram / flowchart** | AI 完全做不好 |

每張圖在章節 prompt 文檔內會標註 **type**（A/B/C/D/E），如為 C/E 類，prompt 文檔會直接給 Mermaid 原始碼，AI prompt 為輔。

---

## 4 · 命名與儲存規範

```
software_architect/ppt/assets/diagrams/
├── 0_STYLE_GUIDE.md         本檔
├── README.md                工作流
├── prompts/                 各章 prompt 文檔
│   ├── INDEX.md
│   ├── 00-prologue.md
│   ├── 01-role-value.md
│   └── ...
├── 00-prologue/             實際圖檔放這
│   └── 00_hero.png
├── 01-role-value/
│   ├── 00_hero.png
│   ├── 00_mental_model.png
│   └── ...
└── 90-appendix/
    └── ...
```

### 命名規則

`<topic_NN>_<seq>_<short_name>.png`

- `topic_NN` = 對應 slide 檔（不含路徑與副檔名）
- `seq` = 在該 topic 下的圖像序號（兩位數零墊）
- `short_name` = 一兩個字描述（snake_case）

範例：
- `01_myth_vs_truth_01_iceberg.png` — Role/Value 1.1 第 1 張
- `02_sla_math_01_nines_table.png` — Requirements 2.2 第 1 張
- `00_hero.png` — 章首封面

---

## 5 · Aspect Ratio 規範

| 用途 | 比例 |
|------|------|
| 整張 slide 的 hero / 封面 | 16:9 |
| 寬幅 banner（slide 上半） | 16:9 |
| 方形 icon / inline | 1:1 |
| 直幅 illustration | 4:5 |

**預設 16:9**（與 Marp slide 同比例）。

---

## 6 · 整合到 Marp slide

生成的圖檔放到對應資料夾後，在 slide 中用 Marp 圖片語法：

```markdown
<!-- 帶寬度控制 -->
![w:600](../assets/diagrams/01-role-value/01_myth_vs_truth_01_iceberg.png)

<!-- 全幅置中 -->
![bg](../assets/diagrams/01-role-value/00_hero.png)

<!-- 半幅左右排版 -->
![bg left:40%](../assets/diagrams/05-ilities/01_scalability_01_up_vs_out.png)
```

實際整合時，再把每張圖的 alt text 與 width 調好。本階段先產 prompt 與儲存路徑。

---

## 7 · 工作流程（每張圖 4 步）

1. **挑** — 從 `prompts/0X-*.md` 找一張要做的，copy 它的 prompt
2. **生** — 貼到 DALL-E 3 / Midjourney / Mermaid Live，生成
3. **存** — 把產出的 PNG 重新命名為文檔指定的檔名，放到對應資料夾
4. **嵌** — 告訴 Claude「Ch.X / 主題 N / 圖 N 已生成」，把 markdown 圖片語法塞進對應 slide

---

## 8 · 風格範例參考

模仿這些風格組合：
- Anthropic 官方部落格插畫（warm, hand-drawn, geometric）
- The New Yorker 編輯插圖
- Stripe Press 書封與內文插圖
- Edward Tufte 教科書圖示
- Excalidraw 預設手繪風

避免：
- 「AI 感」漸層、發光、超現實
- 太可愛 / 卡通風
- PowerPoint clipart 風

---

## 9 · 優先序系統

每章 prompt 文檔的每張圖會標 **P1 / P2 / P3**：

- **P1（必做）** — 章首 hero、章節 mental model、最常被引用的關鍵圖
- **P2（很有用）** — 主要 trade-off / 關鍵架構
- **P3（錦上添花）** — 細節示意、視覺裝飾

預算有限時：先做完所有 P1（約 20 張）→ 再 P2（約 15 張）→ 最後 P3。
