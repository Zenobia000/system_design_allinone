# PPT 製作合約（Marp · 16:9 · anthropic theme）

> 對應姊妹專案：`../../ppt/`（系統設計實戰）
> 本目錄為「架構師的藍圖」(The Architect's Blueprint) 簡報源檔。
> Marp 不會自動縮放或裁切溢出。內容超出邊界就直接被切掉或壓到下一頁的空白區。

## 1. 畫布與安全區

| 參數 | 值 |
|---|---|
| 投影片尺寸 | 1280 × 720 px |
| 預設 padding | 上 56 / 左右 72 / 下 72 |
| 可用內容區（預設） | **1136 × 536 px** |
| 字級基準 | 24px（行高 1.55 → 行高 ≈ 37px） |

每張投影片硬上限（預設 layout）：
- 標題下方正文 **≤ 10 行**（保守 8 行）
- 每行 **≤ 35 中文字** 或 **≤ 60 拉丁字元**

超過任一條 → 拆頁或改用 `compact` / `split` layout。

## 2. 標題字數上限

| 元素 | 字級 | 中文字上限 | 拉丁字元上限 |
|---|---|---|---|
| `h1` | 56px | 16 | 28 |
| `h2` | 38px | 22 | 40 |
| `h3` | 26px | 28 | 50 |
| `section.cover h1` | 88px | 10 | 18 |
| `section.chapter h1` | 80px | 12 | 20 |

## 3. Layout 變體（沿用 anthropic.css）

| Class | 用途 |
|---|---|
| 預設（無 class） | 一般內容頁 |
| `section.cover` | 封面，置中對齊 |
| `section.chapter` | 章節分隔頁（深色底） |
| `section.end` | 章節結束（橘色底） |
| `section.split` | 左右並排 |
| `section.compact` | 內容偏多時 |

切換用法：投影片第一行加 `<!-- _class: compact -->`。

## 4. 寫作節奏（每張 slide 只回答三件事）

每張內容投影片必須回答：
1. **這個概念解決什麼問題？**（WHY）
2. **怎麼做？**（HOW · 表格 / 決策樹 / 步驟）
3. **代價是什麼？什麼時候不該用？**（TRADE-OFF）

每章模板（沿用 `../../ppt/` 的節奏）：

```
00_overview.md     章節導讀（chapter divider + objectives + mental model + end）
01_topic.md        主題 1（chapter divider + WHY + HOW + TRADE-OFF + end）
02_topic.md        主題 2
...
99_recap.md        章節收斂（case study + 帶走的東西 + end）
```

## 5. 元件容量

| 元件 | 上限 |
|---|---|
| `matrix-2x2` | 固定 4 格，每格 ≤ 25 字 |
| `tradeoff`（pro/con） | 每側 ≤ 5 bullet，每條 ≤ 20 字 |
| `stack` 層級 | ≤ 7 層 |
| `highlight` / `alert` / `note` / `def` | 每張投影片總計 ≤ 3 個 |
| 表格 | ≤ 8 列 × ≤ 4 欄，每格 ≤ 15 字 |
| 程式碼區塊 | ≤ 15 行 × ≤ 80 字元/行 |

## 6. 引用來源（強制）

每張內容投影片最後一行：

```
> Source: SA簡報/S1_Slides.pdf · §XXX
```

或

```
> Source: _source/sa_ppt.md · Ch.1 三大重點
```

來源檔對應：
- `SA簡報/S1.pdf` ~ `S17.pdf`：核心講義
- `SA簡報/Design+Patterns.pdf`：設計模式
- `SA簡報/MicroServicesReading.pdf`、`EventSourcingReading.pdf`、`CQRSReading.pdf`：Ch.8 進階閱讀
- `_source/sa_ppt.md`：master 課程表（10 章三大重點）
- `_source/01_Role_Value.md` ~ `10_Soft_Skills.md`：每章規劃稿

## 7. 檔案規範

- 所有 `.md` 寫 **LF 行尾**（不要 CRLF）
- frontmatter 必填：`marp: true`、`theme: anthropic`、`paginate: true`、`size: 16:9`、`header`、`footer`
- 投影片分隔用獨立一行的 `---`（前後留空行）

## 8. 自我檢查清單

產生新投影片後逐項檢查：

1. 標題字數是否超過 §2 上限？
2. 正文是否超過 10 行？
3. 元件數量是否符合 §5？
4. 圖片 / Mermaid 是否設了 `max-height`？
5. 每張內容頁是否都有 `> Source:` 引用？
6. 超出 → 改 `compact` 或拆頁，不要硬塞。

## 9. 建構

從 `software_architect/ppt/` 目錄執行：

```bash
# 單一主題
marp --theme-set themes/ 01-role-value/01_myth_vs_truth.md --pdf

# 全章節（手動 combine）
cat 00-prologue/*.md 01-role-value/*.md ... > build/combined.md
marp --theme-set themes/ build/combined.md --pdf
```

> 與 `../../ppt/` 的 `scripts/build.sh` 同調，未來可擴充。
