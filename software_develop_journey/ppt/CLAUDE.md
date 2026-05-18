# PPT 製作合約（Marp · 16:9 · anthropic theme）

> 對應姊妹專案：`../software_architect/ppt/`（架構師深度教材）
> 本目錄為「軟體開發旅程」(The Software Development Journey) 簡報源檔 — 小白導向的 on-ramp 教材。
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

## 4. 寫作節奏（小白導向）

本教材是 on-ramp，每張內容投影片必須回答：
1. **這個角色是什麼？做什麼？**（WHAT）
2. **為什麼這角色存在？沒他會怎樣？**（WHY）
3. **跟旁邊的角色差在哪？邊界在哪？**（BOUNDARY）

每章模板（4 個檔案 × ~5 slide pages）：

```
00_overview.md     章節導讀（chapter divider + 蓋房子比喻定錨 + 一句話定義 + 學習目標 + end）
01_outputs.md      經典產出 + artifact thumbnail + 為何 AI 取代不了
02_boundary.md     與上下游 overlap + 誰主導什麼 + 實務協作場景
99_recap.md        三句口訣 + 連到下一站
```

例外章節：
- `00-prologue/` (4 files): cover/why/roadmap/how-to-read
- `01-big-picture/` (5 files): overview/building_metaphor/sdlc_map/uncertainty_ladder/recap
- `11-collaboration/` (5 files): +conflict_cases
- `12-case-study/` (6 files): overview/ecommerce/livestream/ai_video/comparison/recap
- `90-appendix/` (3 files): cheatsheet/mnemonics/glossary

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
> Source: _source/braindump.md · §角色定義
```

或

```
> Source: _source/braindump.md · §SA vs Architect
```

來源檔對應：
- `_source/braindump.md`：用戶原始長文，本教材所有概念的母本
- 案例研究 (Ch.12) 可額外引用：Shopify Engineering / Twitch Engineering / Runway / Pika 等公開資料

## 7. 檔案規範

- 所有 `.md` 寫 **LF 行尾**（不要 CRLF）
- frontmatter 必填：`marp: true`、`theme: anthropic`、`paginate: true`、`size: 16:9`、`header`、`footer`
- 投影片分隔用獨立一行的 `---`（前後留空行）

## 8. 蓋大樓比喻 — 9 角色 mapping

本教材的核心隱喻，每章 overview 第一張用同一張全景圖 highlight 當下角色：

| 軟體角色 | 蓋房子對應 | 一句話 |
|---|---|---|
| PM | 建案企劃 / 開發 PM | 決定要蓋什麼樓、賣給誰（代理甲方） |
| UX/UI | 室內設計師 | 設計動線、樣品屋、客戶體驗 |
| SA | 建築師（平面圖） | 跟甲方對齊機能、畫平面圖 |
| Architect | 結構技師 | 承重、耐震、防火、未來擴建 |
| SD | 施工圖繪製師 | 把建築圖拆成可施工的細部圖 |
| DBA | 地基 + 水塔 + 管線總圖 | 資料是建物命脈 |
| Dev | 工班師傅 | 真的把樓蓋起來 |
| QA | 驗收員 | 檢查門會不會打不開、結構是否合規 |
| DevOps / SRE | 物業管理 + 24h 保全 + 消防 | 上線後持續維運 |

## 9. 自我檢查清單

產生新投影片後逐項檢查：

1. 標題字數是否超過 §2 上限？
2. 正文是否超過 10 行？
3. 元件數量是否符合 §5？
4. 圖片 / Mermaid 是否設了 `max-height`？
5. 每張內容頁是否都有 `> Source:` 引用？
6. 超出 → 改 `compact` 或拆頁，不要硬塞。

## 10. 建構

從專案根目錄執行：

```bash
# 單一章節（最快驗證）
bash software_develop_journey/scripts/build.sh chapter 01-big-picture

# 整套 PDF + HTML
bash software_develop_journey/scripts/build.sh full

# 純合併（不轉 PDF，看 markdown 結構）
bash software_develop_journey/scripts/build.sh combined
```
