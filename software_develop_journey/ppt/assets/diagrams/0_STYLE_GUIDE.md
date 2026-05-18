# 圖像風格指南 · 軟體開發旅程 PPT

> 所有圖像必須遵守本檔風格，確保整套 PPT 視覺一致。
> 每章 prompt 文檔（`prompts/0X-*.md`）只列 **subject + composition**；
> 風格修飾詞由本檔 template 統一注入。
> **與姊妹專案 `../../../software_architect/ppt/assets/diagrams/0_STYLE_GUIDE.md` 完全同調**——同一套色票、同一套風格。

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
software_develop_journey/ppt/assets/diagrams/
├── 0_STYLE_GUIDE.md         本檔
├── README.md                工作流
├── prompts/                 各章 prompt 文檔
│   ├── INDEX.md
│   ├── 00-prologue.md
│   ├── 01-big-picture.md
│   └── ...
├── 00-prologue/             實際圖檔放這
│   └── 00_cover_hero.png
├── 01-big-picture/
│   ├── 00_hero.png
│   ├── 01_building_metaphor.png
│   └── ...
└── 90-appendix/
    └── ...
```

### 命名規則

`<seq>_<short_name>.png`

- `seq` = 兩位數序號，配合 slide 內順序（`00` 通常代表 hero / overview 圖）
- `short_name` = 用底線分隔的英文簡名（如 `building_metaphor`、`gantt_band`）
- 副檔名一律 `.png`（hero / mental model），向量圖（Mermaid 輸出）可用 `.svg`

範例：
- `00-prologue/00_cover_hero.png` — 序章封面 hero
- `01-big-picture/01_building_metaphor.png` — Ch.1 蓋大樓 9 角色一字排開
- `12-case-study/01_ecommerce_gantt.png` — Ch.12 電商版甘特帶

---

## 5 · 軟體開發旅程獨有的視覺母模板

本教材**三個母模板**反覆出現，視覺需要保持一致。

### 5.1 蓋大樓 9 角色一字排開

- 全景圖：9 個建築工人/角色從左到右一字排開，每人手持各自工具
- PM 建案企劃看市場資料 / 戶型配比；UX/UI 室內設計師畫家具樣品；
  SA 建築師拿平面圖；Architect 結構技師看承重計算；
  SD 施工圖繪製師拿細部圖；DBA 工人挖地基 / 接管線；
  Dev 工班蓋牆；QA 拿驗收清單；DevOps 物業/消防員
- 每章 overview 第一張用同一張全景圖 highlight 當下角色

### 5.2 同一句需求 9 角色腦中泡泡

- 中央一個甲方 / 客戶說「我要做一個會員系統」
- 9 個 thought bubble 圍繞他，每個 bubble 各自畫該角色腦中的東西
- 統一使用 hand-drawn bubble + 線條風

### 5.3 九角色甘特帶

- 9 條橫條代表 9 個角色，依「投入度」改變粗細
- 電商：9 條粗細平均
- 直播：SA / Architect / DevOps 特粗
- AI 影視：PM / DBA / DevOps 特粗
- 用同一套刻度，三張並排或上下對照

---

## 6 · 圖像在 slide 內的尺寸建議

| 用途 | Marp 語法 | 像素 |
|------|----------|------|
| 章首 hero | `![w:1100](...)` | 1100 × 619 (16:9) |
| 章內 mental model | `![w:900](...)` | 900 × 506 (16:9) |
| 章內中型概念圖 | `![w:700](...)` | 700 × 394 (16:9) |
| 章內小型 icon / 對照 | `![w:480](...)` | 480 × 270 (16:9) |

圖像必須限制最大高度避免超出 slide 安全區（536 px）：

```html
<img src="../assets/diagrams/01-big-picture/01_building_metaphor.png" style="max-height:420px; width:auto;" />
```

---

## 7 · 引用版型

每張圖在 prompt 文檔內必須包含：

- **Type**: A / B / C / D / E
- **Priority**: P1 / P2 / P3
- **Slide**: 對應 slide 檔路徑 + 第幾張
- **Save as**: 完整存檔路徑
- **Aspect**: 16:9 / 1:1 / 3:2 等
- **Prompt**: 完整可複製貼上的 prompt（已注入風格修飾詞）
- **Note**: 為什麼這張圖、要傳達什麼訊息
