# PPT 製作合約（Marp · 16:9 · anthropic theme）

> Marp 不會自動縮放或裁切溢出。內容超出邊界就直接被切掉或壓到下一頁的空白區。
> 所有規格在「產生內容」這一層守住，渲染層救不了你。

## 1. 畫布與安全區

| 參數 | 值 |
|---|---|
| 投影片尺寸 | 1280 × 720 px |
| 預設 padding | 上 56 / 左右 72 / 下 72 |
| 可用內容區（預設） | **1136 × 536 px**（已扣 header + footer + 頁碼） |
| 字級基準 | 24px（行高 1.55 → 行高 ≈ 37px） |

**每張投影片硬上限**（預設 layout）：
- 標題下方正文 **≤ 10 行**（保守 8 行）
- 每行 **≤ 35 個中文字** 或 **≤ 60 個拉丁字元**

超過任一條 → 拆頁或改用 `compact` / `split` layout。

## 2. 標題字數上限

| 元素 | 字級 | 中文字上限 | 拉丁字元上限 |
|---|---|---|---|
| `h1` | 56px | 16 | 28 |
| `h2` | 38px | 22 | 40 |
| `h3` | 26px | 28 | 50 |
| `section.cover h1` | 88px | 10 | 18 |
| `section.chapter h1` | 80px | 12 | 20 |

## 3. Layout 變體

| Class | padding | 可用區 | 用途 |
|---|---|---|---|
| 預設（無 class） | 56 / 72 | 1136 × 536 | 一般內容頁 |
| `section.cover` | 80 / 100 | 1080 × 480 | 封面，置中對齊 |
| `section.chapter` | 80 / 80 | 1120 × 560 | 章節分隔頁（深色底） |
| `section.end` | 80 / 80 | 1120 × 560 | 章節結束（橘色底） |
| `section.split` | 56 / 64 | 兩欄各 556 px | 左右並排 |
| `section.compact` | 48 / 64 | 1152 × 575（21px 字級） | 內容偏多時 |

切換用法：在投影片第一行加 `<!-- _class: compact -->`。

## 4. 元件容量

| 元件 | 上限 |
|---|---|
| `matrix-2x2` | 固定 4 格，每格 ≤ 25 字 |
| `tradeoff`（pro/con） | 每側 ≤ 5 條 bullet，每條 ≤ 20 字 |
| `stack` 層級 | ≤ 7 層 |
| `highlight` / `alert` / `note` / `def` | 每張投影片總計 ≤ 3 個 |
| 表格 | ≤ 8 列 × ≤ 4 欄，每格 ≤ 15 字 |
| 程式碼區塊 | ≤ 15 行 × ≤ 80 字元/行（字級 16px） |

`alert` 元件每個約佔 80px 高度 → 一張投影片塞 3 個就接近滿版，**不要再放 4 個**。

## 5. 圖片與 Mermaid

Marp 不會自動縮放 SVG/PNG。**必須**用 inline style 限高：

```markdown
<img src="../assets/diagrams/foo.png" style="max-height:420px; width:auto;" />
```

```markdown
<div style="max-height:480px; overflow:hidden;">

```mermaid
flowchart LR
  ...
```

</div>
```

Mermaid 圖節點數 ≤ 12、層數 ≤ 4，否則必然溢出。

## 6. 寫作節奏

- 一張投影片只講一個概念。標題就是那個概念。
- bullet 之間留空白（用 `<br>` 或 `<br><br>`）比塞滿好讀。
- 引用來源 `> Source: ...` 放在最後一行，字級 18px 不佔太多空間。
- 章節間用 `<!-- _class: chapter -->` 強制分頁。

## 7. 自我檢查清單（產生新投影片後）

1. 標題字數是否超過 §2 上限？
2. 正文是否超過 10 行？
3. 元件數量是否符合 §4？
4. 是否有圖片/Mermaid 沒設 `max-height`？
5. 內容若超出 → 改 `compact` 或拆頁，不要硬塞。

---

## 8. 檔案規範

- 所有 `.md` 寫**LF 行尾**（不要 CRLF）。Windows 編輯器要設定。
  - 已知坑：CRLF 會讓 `ppt/scripts/build.sh` 的 frontmatter 合併失敗。
- frontmatter 必填欄位：`marp: true`、`theme: anthropic`、`paginate: true`、`size: 16:9`、`header`、`footer`。
- 投影片分隔用獨立一行的 `---`（前後留空行）。

## 9. 建構驗證

每次大改後執行：

```bash
bash ppt/scripts/build.sh chapter 01-foundation   # 單章節快速驗證
bash ppt/scripts/build.sh full                    # 完整 deck
```

產出在 `dist/`。打開 PDF 翻一遍，目視確認沒有溢出再 commit。
