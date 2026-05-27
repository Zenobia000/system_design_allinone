# Anthropic Theme — Design System

> Marp theme: `anthropic` · 來源：`ppt/themes/anthropic.css`
> 投影片尺寸 1280 × 720（16:9）· 字級基準 24px / 行高 1.55
> 容量限制請對照 `ppt/CLAUDE.md` §1–§4。

---

## 1. Design Tokens

### 1.1 Color Palette

| Token | Hex | 用途 |
|---|---|---|
| `--primary-bg` | `#F5F1E8` | 主背景（米白） |
| `--text-primary` | `#2A2520` | 主要文字（深棕近黑） |
| `--text-secondary` | `#6B6460` | 次要文字、註解 |
| `--accent` | `#D97757` | 主強調色（Anthropic 橘） |
| `--accent-dark` | `#8B6F47` | 次強調色（暖棕） |
| `--highlight` | `#FFE5D0` | 高亮背景（淺橘） |
| `--alert` | `#E8634F` | 警告、錯誤、con |
| `--success` | `#5B9770` | 成功、pro、note |
| `--divider` | `#E8E3D8` | 分隔線、表格邊框 |
| `--code-bg` | `#2A2520` | 程式碼背景 |
| `--code-fg` | `#F5F1E8` | 程式碼前景 |
| `--surface` | `#FFFFFF` | 卡片、元件底色 |

### 1.2 Typography

| Role | Font Family | 用途 |
|---|---|---|
| Display / Heading | `Playfair Display` + `Noto Sans TC` (serif) | h1, h2, big-number |
| Body | `Inter` + `Noto Sans TC` (sans) | section, h3, 一般正文 |
| Mono | `IBM Plex Mono` | code, kicker, meta, footer, page number |

| Element | Size | Weight | Line-height | 顏色 |
|---|---|---|---|---|
| `section`（body） | 24px | 400 | 1.55 | `--text-primary` |
| `h1` | 56px | 700 | 1.15 | `--text-primary` |
| `h2` | 38px | 600 | — | `--text-primary` + `--accent` 底線 |
| `h3` | 26px | 600 | — | `--accent-dark` |
| `cover h1` | 88px | 700 | 1.05 | `--text-primary` |
| `chapter h1` | 80px | 700 | — | `--primary-bg` |
| `end h1` | 72px | 700 | — | `--primary-bg` |
| `.lead` | 28px | 400 | 1.45 | `--text-secondary` |
| `.big-number` | 96px | 700 | 1.0 | `--accent`（Playfair） |
| `.kicker` | 13px | — | — | `--accent`，字距 0.35em，全大寫 |
| `blockquote` | 18px | — | — | `--text-secondary`，italic |
| 表格 | 20px | — | — | — |
| 程式碼 | 16px | — | 1.5 | — |

### 1.3 Spacing

| Layout | Padding | 可用內容區 |
|---|---|---|
| 預設 `section` | `56 72 72` | 1136 × 536 |
| `.cover` | `80 100` | 1080 × 480 |
| `.chapter` | `80` | 1120 × 560 |
| `.end` | `80` | 1120 × 560 |
| `.split` | `56 64` | 兩欄各 556 |
| `.compact` | `48 64` | 1152 × 575（字級 21px） |

---

## 2. Global Base Styles

### 2.1 Inline 元素

| Tag | 樣式 |
|---|---|
| `strong` | `--accent`、700 |
| `em` | `--text-secondary`、不斜體、底線虛線 |
| `a` | `--accent`、底線實線 |
| `hr` | `--divider` 1px、上下 22px |

### 2.2 List

- `ul / ol`：左 padding 1.4em，項目間距 6px
- `ul li::marker`：使用 `--accent`、700

### 2.3 Code

| Element | 樣式 |
|---|---|
| inline `code` | `--highlight` 背景、`--accent-dark` 文字、`IBM Plex Mono`、0.88em |
| block `pre` | `--code-bg` 黑底、`--code-fg` 米白、`--accent` 左邊框 4px、border-radius 8px、16px / 1.5 |

容量：≤ 15 行 × ≤ 80 字元/行（字級 16px）。

### 2.4 Table

- 表頭 `th`：`--accent` 底、`--primary-bg` 字、600 粗體
- 表身 `td`：底線 `--divider`、`vertical-align: top`
- 偶數列：`rgba(232,227,216,0.4)`
- 容量：≤ 8 列 × ≤ 4 欄，每格 ≤ 15 字

### 2.5 Blockquote

- 左邊框 `--accent-dark` 5px、淺橘背景（`#FFE5D0` 50% 透明）
- italic、`--text-secondary`
- 用途：定義、引用、Source 註記

### 2.6 Header / Footer / Pagination

- `section::after`（頁碼）：`current / total`，IBM Plex Mono 13px
- `header`：13px、`--text-secondary`、全大寫、字距 0.06em
- `footer`：12px、`--text-secondary`、字距 0.04em

---

## 3. Layout Variants

切換方式：投影片第一行 `<!-- _class: <variant> -->`

### 3.1 `section.cover` — 封面

```
背景：radial-gradient（左上淺橘斑點） + 米白
排版：垂直置中、左對齊
h1：88px，主標題
h2：32px italic，副標題（無底線）
.meta：底部 monospace 小字（日期、作者、版本）
```

### 3.2 `section.chapter` — 章節分頁

```
背景：linear-gradient 135deg，深棕 (#2A2520 → #1F1A16)
文字：米白為主、橘色強調
排版：完全置中
.ch-no：上方 monospace 章節編號，0.4em 字距
h1：80px 章節標題
h2：28px italic，章節副題
```

### 3.3 `section.end` — 章節結尾

```
背景：linear-gradient 135deg 橘色 (#D97757 → #C46647)
文字：米白
h1：72px、h2：28px italic
用途：感謝頁、Recap 結束
```

### 3.4 `section.split` — 左右分欄

```html
<!-- _class: split -->
<div class="columns">
  <div>左欄</div>
  <div>右欄</div>
</div>
```

`grid-template-columns: 1fr 1fr`，gap 40px。

### 3.5 `section.compact` — 緊湊版

- 字級 21px、padding 48 / 64
- h2：32px（縮減）
- 表格：18px、程式碼：14px
- 用途：內容超過預設可用區時使用

---

## 4. Components

### 4.1 Highlight Box

```html
<div class="highlight">重點段落</div>
```

`--highlight` 底、`--accent` 左邊 6px。中性高亮、放重點結論。

### 4.2 Alert（警告）

```html
<div class="alert">注意這個陷阱…</div>
```

橘紅底（10% 透明）、`--alert` 左邊 6px，自動加 `⚠` icon。

### 4.3 Note（補充 / Pro Tip）

```html
<div class="note">小提示 / 補充說明</div>
```

綠色底（10% 透明）、`--success` 左邊 6px。

> §4.1–§4.3 每張投影片合計 ≤ 3 個（每個約 80px 高）。

### 4.4 Definition

```html
<div class="def">
  <span class="term">CAP Theorem</span>
  分散式系統中…的描述。
</div>
```

白底卡、`--accent-dark` 上邊 4px、`.term` 為粗體標題。

### 4.5 Trade-off（雙欄比較）

```html
<div class="tradeoff">
  <div class="pro">
    <h3>Pros</h3>
    <ul><li>...</li></ul>
  </div>
  <div class="con">
    <h3>Cons</h3>
    <ul><li>...</li></ul>
  </div>
</div>
```

- `.pro`：綠色系、`--success` 上邊
- `.con`：橘紅系、`--alert` 上邊
- 容量：每側 ≤ 5 bullet × ≤ 20 字

### 4.6 2×2 Matrix

```html
<div class="matrix-2x2">
  <div><strong>象限 1</strong>內容</div>
  <div class="featured"><strong>象限 2</strong>重點</div>
  <div><strong>象限 3</strong>內容</div>
  <div><strong>象限 4</strong>內容</div>
</div>
```

- 固定 4 格，每格 ≤ 25 字
- `.featured`：`--accent` 2px 邊框 + `--highlight` 底

### 4.7 Stack（架構層級）

```html
<div class="stack">
  <div class="layer client">Client</div>
  <div class="layer app">Application</div>
  <div class="layer data">Data</div>
  <div class="layer infra">Infrastructure</div>
</div>
```

| Modifier | 顏色（左邊框） |
|---|---|
| `.client` | `--accent`（橘） |
| `.app` | `--accent-dark`（棕） |
| `.data` | `--success`（綠） |
| `.infra` | `--text-secondary`（灰） |

容量：≤ 7 層；字級 18px monospace。

---

## 5. Utility Classes

| Class | 效果 |
|---|---|
| `.lead` | 28px 大段落引言，`--text-secondary` |
| `.kicker` | 上方 monospace 小標籤，13px、全大寫、`--accent` |
| `.center` | 文字置中 |
| `.muted` | `--text-secondary` 灰字 |
| `.big-number` | 96px Playfair 數字（KPI / 統計） |
| `.small-caps` | 0.85em 全大寫、字距 0.12em |

---

## 6. Usage Cheatsheet

### 6.1 標題字數上限

| 元素 | 字級 | 中文上限 | 拉丁上限 |
|---|---|---|---|
| `h1` | 56px | 16 | 28 |
| `h2` | 38px | 22 | 40 |
| `h3` | 26px | 28 | 50 |
| `cover h1` | 88px | 10 | 18 |
| `chapter h1` | 80px | 12 | 20 |

### 6.2 投影片硬上限（預設 layout）

- 標題下方正文 **≤ 10 行**（保守 8 行）
- 每行 **≤ 35 中文字** 或 **≤ 60 拉丁字元**
- 超過任一條 → 拆頁或用 `compact` / `split`

### 6.3 圖片與 Mermaid

Marp 不會自動縮放，必須限高：

```html
<img src="../assets/diagrams/foo.png" style="max-height:420px; width:auto;" />
```

```html
<div style="max-height:480px; overflow:hidden;">
```

Mermaid：節點 ≤ 12、層數 ≤ 4。

---

## 7. Frontmatter Template

```yaml
---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'System Design · Chapter X'
footer: '© 2026 · v1.0'
---
```

- 檔案行尾必須是 LF（CRLF 會讓 `scripts/build.sh` 失敗）
- 投影片分隔線 `---` 前後留空行
