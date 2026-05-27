# PPT 製作合約（Marp · 16:9 · anthropic theme）

> 對應姊妹專案：`../../software_architect/ppt/`（深度教材）｜ `../../software_develop_journey/ppt/`（角色全景）
> 本目錄為「AI 時代系統設計速成」200 頁版簡報源檔。
> 風格沿用 anthropic.css，與兩本姊妹專案同調。

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

## 4. 寫作節奏（速成導向）

本教材是工作手冊，每張內容投影片必須回答：
1. **這是什麼框架 / 決策 / 模式？**（WHAT）
2. **為何 AI 取代不了 / 為何需要人來判斷？**（JUDGMENT）
3. **AI 時代怎麼用 AI 加速？**（AI-LEVERAGE，至少給一個 prompt 範例或 workflow）

### 每章模板（彈性）
- 概念章（Part 0, 1）：每節 2-4 slide
- 案例章（Part 2）：每案例 12 slide 固定結構
- 工作流章（Part 3）：每節 2-3 slide 步驟分鏡

## 5. 元件容量

| 元件 | 上限 |
|---|---|
| `matrix-2x2` | 固定 4 格，每格 ≤ 25 字 |
| `tradeoff`（pro/con） | 每側 ≤ 5 bullet，每條 ≤ 20 字 |
| `stack` 層級 | ≤ 7 層 |
| `highlight` / `alert` / `note` / `def` | 每張投影片總計 ≤ 3 個 |
| 表格 | ≤ 8 列 × ≤ 4 欄，每格 ≤ 15 字 |
| 程式碼區塊 | ≤ 15 行 × ≤ 80 字元/行 |
| AI prompt block | 獨立樣式（`<div class="prompt">...</div>`），≤ 12 行 |

## 6. 引用來源（強制）

每張內容投影片最後一行：

```
> Source: _source/braindump.md · §XXX
```

或對應到姊妹專案：

```
> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §SQL vs NoSQL
```

## 7. 檔案規範

- LF 行尾、UTF-8 編碼
- frontmatter 必填：`marp: true`、`theme: anthropic`、`paginate: true`、`size: 16:9`、`header`、`footer`
- 投影片分隔用獨立一行的 `---`（前後留空行）

## 8. AI 時代金句（貫穿全書）

每章 overview 引一句相關：

> 「AI 把實作能力變成 commodity，把判斷能力變成稀缺。」
> 「不要問 AI 能不能做，要問你能不能把 context 餵清楚。」
> 「Trade-off 永遠是人做的，AI 只能列出選項。」
> 「先設計 ADR，再讓 AI 寫 code。順序錯了就是返工。」

## 9. 引導學員翻舊書

凡是壓縮自舊書的章節，頁尾加：

```
> 📘 想深入 → software_architect/ppt/04-tech-stack-data/ §B.4
> 📗 想看角色全景 → software_develop_journey/ppt/07-dba-data/
```

## 10. 自我檢查清單

每張投影片產生後：
1. 標題字數是否超過 §2 上限？
2. 正文是否超過 10 行？
3. 是否有 `> Source:` 引用？
4. 是否回答了 §4 三個問題（特別是 AI-LEVERAGE）？
5. 超出 → 改 `compact` 或拆頁，不要硬塞。
