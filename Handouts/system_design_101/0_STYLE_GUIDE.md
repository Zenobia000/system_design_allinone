# 0_STYLE_GUIDE — 系統設計 101 視覺規範

> 本文件是設計師／AI 生成卡片時的唯一真相來源。每一張卡片都必須符合以下規格。

---

## 畫布規格

| 項目 | 值 |
|------|----|
| 尺寸 | 1080 × 1350 px（4:5 直幅） |
| 安全邊距 | 四邊各 96 px |
| 內容可用區 | 888 × 1158 px |
| 色彩模式 | RGB（社群平台輸出） |
| 解析度 | 72 dpi（螢幕）/ 導出 @2x 給高密度螢幕 |

---

## 字型家族

| 用途 | 中文字型 | 拉丁 / 數字 | 選用理由 |
|------|----------|-------------|----------|
| 標題 Display | Noto Sans TC 900 Black | Inter 800 ExtraBold | 粗體在 feed 縮圖也讀得到 |
| 內文 Body | Noto Sans TC 500 Medium | Inter 500 Medium | 高易讀、專業中性 |
| 技術名詞 / 數字標註 | — | JetBrains Mono 500 Regular | 等寬字型 = 技術術語視覺信號 |

**備援字型**：中文 → 思源黑體 (Source Han Sans TC)；拉丁 → `system-ui, -apple-system, sans-serif`

---

## 字級階層（基準：1080 × 1350 px）

| 角色 | 字級 | 字重 | 行高 | 備註 |
|------|------|------|------|------|
| Hook 大標 H1 | 80 px | 900 | 1.15 | 卡片主視覺標題 |
| 副標 H2 | 48 px | 700 | 1.30 | 段落副標 |
| 內文 Body | 34 px | 500 | 1.60 | 說明文字 |
| 巨數字 Big Number | 160 px | 900 | 1.00 | 用戶數 / 統計衝擊數字 |
| 節奏標籤 Kicker | 24 px | 700 | 1.20 | 全大寫 + 字距 0.12 em |
| 詞彙卡術語 | 34 px | 500 | 1.40 | JetBrains Mono，中英對照 |
| 註解 Caption | 26 px | 400 | 1.40 | 圖說、補充說明 |
| 頁尾品牌 | 22 px | 500 | 1.20 | 頁尾固定位置 |

### 字數硬上限（每卡）

- **大標**：≤ 14 中文字
- **內文每行**：≤ 18 中文字
- **整卡內文行數**：≤ 3 行
- 超出字數時，必須刪字而非縮小字級。

---

## 色票

> 品牌主色：深海軍藍底 + 藍綠→薄荷漸層

| 角色 | 名稱 | Hex |
|------|------|-----|
| 深底 | Deep Navy | `#152238` |
| 暖白 | Warm White | `#F4F1EA` |
| 主強調 | Deep Teal | `#2E7D86` |
| 次強調 | Mint | `#97E8D6` |
| 純白點綴 | White | `#FFFFFF` |
| 深底上文字 | Warm White | `#F4F1EA` |
| 淺底上文字 | Deep Navy | `#152238` |
| 警告 / 痛點 | Coral Red | `#E8634F` |
| 成功 / 佐證 | Forest Green | `#5B9770` |

### 禁用規則

- 禁止大面積純白 `#FFFFFF` 作底色
- 禁止純黑 `#000000`
- 禁止霓虹色、3D 反射效果、漸層光暈
- 禁止雜亂裝飾性元素（clipart、隨機貼紙）

---

## 六拍視覺編碼

每張卡片左上角顯示節奏標籤（Kicker），並以對應色塊作為角標或邊線：

| 節奏拍 | Kicker 文字 | 視覺色票 | Hex |
|--------|------------|----------|-----|
| 痛點 | PAIN POINT | Coral Red | `#E8634F` |
| 類比 | ANALOGY | Mint | `#97E8D6` |
| 技術 | CONCEPT | Deep Teal | `#2E7D86` |
| 架構圖 | DIAGRAM | Deep Navy | `#152238` |
| 佐證 | REAL WORLD | Forest Green | `#5B9770` |
| 取捨 | TRADE-OFF | Teal + Red 雙色並陳 | `#2E7D86` + `#E8634F` |
| 登場（Ch0 專用） | INTRO | Deep Teal | `#2E7D86` |
| 預告（Ch0 專用） | PREVIEW | Mint | `#97E8D6` |

---

## 品牌配置（每卡必須）

**Logo 來源資料夾**：`Handouts/system_design/openslide/assets/branding/`

| 場景 | 使用 Logo 檔 |
|------|-------------|
| 深底卡（navy / teal 底） | `logo-light.png` |
| 淺底卡（warm white 底） | `logo-dark.png` 或 `logo-main.png` |

**配置規格**：
- 位置：右下角，距底部邊距 96 px，距右側邊距 96 px
- 高度：64 px（等比例縮放寬度）
- 頁尾文字：`桑尼資料科學 · 版權所有 ©`，22 px / 500 weight，與 logo 同行對齊

---

## 詞彙卡格式（技術拍專用）

每次技術術語首次出現，必須以詞彙卡樣式呈現：

```
┌─────────────────────────────────────────┐
│  [英文術語]  /  [中文名稱]              │
│  JetBrains Mono 34px  +  Noto Sans TC   │
│  ─────────────────────────────────────  │
│  [一句白話定義，≤ 18 字]               │
│  Noto Sans TC 500 / 34px                │
└─────────────────────────────────────────┘
```

底色用 Deep Teal `#2E7D86`；文字用 Warm White `#F4F1EA`；圓角 16 px。

---

## 進度條格式（每章開頭）

顯示當前模擬的服務用戶數：

```
[ 服務 [N] 用戶 ]
```

- 字型：Inter 700 + JetBrains Mono（數字部分）
- 色票：Mint `#97E8D6` 文字，深底 `#152238` 底，圓角膠囊形
- 字級：34 px，放於卡片頂部內容區

---

## 架構圖視覺規範

- 底色：Deep Navy `#152238`
- 方塊邊框：Deep Teal `#2E7D86`，2 px
- 方塊文字：Warm White `#F4F1EA`，JetBrains Mono 500，28 px
- 箭頭：Mint `#97E8D6`，粗 2 px，實線（同步）/ 虛線（非同步）
- **當章新增方塊**：邊框改為 Mint `#97E8D6`，4 px，並加「NEW」標籤（Kicker 規格）
- 每章版本號標於圖右下：`架構圖 vN`，Caption 規格
- 正式架構圖頁必須使用單頁 `slide-XX.md` 的 `Diagram Spec` 程式化渲染
- GPT Image 2 只可用於架構圖背景、外框與簡單 icon 風格，不可決定節點、箭頭或拓樸
- v4 之後優先用群組節點降低密度，例如 `Replica DB x N`、`Shard DB x N`

---

## 卡片 Prompt 模板

原始章節草稿使用以下結構（`slides.md` 檔案格式）：

```markdown
### Slide N · [卡片標題]
- 節奏拍：[六拍之一]
- 卡片文字：
    - 大標：[≤ 14 中文字，粗體]
    - 內文：[≤ 3 行，每行 ≤ 18 中文字，白話]
- 視覺 prompt：[可直接拿去生成的圖像/版面描述，含 4:5 尺寸說明、字型、品牌色票]
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：（選填，供講師/錄音稿使用）
```

單頁產圖規格使用 `slide-XX.md`，必須包含：

```markdown
---
chapter: "第 N 章：章名"
slide: "1"
title: "≤ 14 中文字短標"
original_title: "來源大標"
beat: "六拍之一"
kicker: "PAIN POINT / ANALOGY / CONCEPT / DIAGRAM / TRADE-OFF / PREVIEW"
layout_type: "layout id"
audience_level: "beginner"
output: "1080x1350"
rendering_mode: "image_prompt | programmatic_diagram"
diagram_version: "vN 或空字串"
---

## On-slide Text
## Beginner Anchor
## Learning Goal
## Visual Spec
## Diagram Spec
## GPT Image Prompt
## Negative Prompt
## Speaker Notes
## QA Checklist
```

### GPT Image 2 使用規則

- 圖片模型不負責產生最終中文字；最終中文字以 `On-slide Text` 為準
- 圖片模型不負責架構拓樸；正式架構圖以 `Diagram Spec` 為準
- 圖片模型不負責繪製實名品牌 logo；logo 必須使用核准的官方 asset 後製疊上
- Prompt 必須指定品牌色票、畫布、kicker、短標與禁止事項
- Negative Prompt 必須禁止亂生額外文字、改寫中文、霓虹色、3D 反光、clipart、雜亂貼紙

### 實名 Logo 使用規則

- 凡提到公司、雲端服務、框架、套件、開源產品，單頁規格必須列 `Logo Assets`
- Logo 使用官方素材，不可用 AI 生成近似圖
- Logo strip 最多 4 個，放在案例/佐證區，不取代架構圖節點
- 若 logo 素材尚未取得，仍需列 expected asset path，並於 QA 階段阻擋最終輸出

### 技術流程嚴謹度

- 正式架構圖頁除了 `Diagram Spec`，還必須有 `Technical Flow Details`
- 技術流程需說明讀寫路徑、同步/非同步、快取命中/未命中、複寫延遲、重試、Failover、Queue ack/retry、搜尋索引同步等關鍵細節
- 若一張 4:5 圖面放不下所有細節，圖面可分層，但 `Technical Flow Details` 不可省略

---

## 快速自查清單

製作每張卡片前，確認：

- [ ] 畫布 1080 × 1350 px，安全邊距 96 px
- [ ] 大標 ≤ 14 字，內文每行 ≤ 18 字，整卡 ≤ 3 行
- [ ] 字型：標題 Noto Sans TC 900 + Inter 800；內文 Noto Sans TC 500 + Inter 500
- [ ] 術語使用 JetBrains Mono
- [ ] 色票來自品牌色票，無霓虹、無純黑底
- [ ] 節奏標籤（Kicker）正確對應六拍色票
- [ ] 技術術語首次出現有詞彙卡
- [ ] logo 右下角 64 px，版本正確（深/淺底對應）
- [ ] 頁尾文字「桑尼資料科學 · 版權所有 ©」
- [ ] 架構圖有版本號（vN）且新增方塊有 Mint 邊框標示
- [ ] 單頁 `slide-XX.md` 有 `Beginner Anchor`，能用一句話講清本頁重點
- [ ] `rendering_mode: programmatic_diagram` 的頁面有完整 `Diagram Spec`
- [ ] `rendering_mode: image_prompt` 的頁面不要求模型畫精準架構拓樸
- [ ] 提到實名公司/服務/套件的頁面有 `Logo Assets`
- [ ] 架構圖頁有 `Technical Flow Details`，沒有省略關鍵讀寫、非同步或失敗流程
