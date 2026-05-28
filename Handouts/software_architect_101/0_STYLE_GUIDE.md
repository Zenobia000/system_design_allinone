# 0_STYLE_GUIDE — 架構師 101 視覺規範

> 本文件是設計師／AI 生成卡片時的唯一真相來源。每一張卡片都必須符合以下規格。

---

## 畫布規格

| 項目 | 值 |
|------|----|
| 尺寸 | 1920 × 1080 px（16:9 橫幅） |
| 安全邊距 | 四邊各 96 px |
| 內容可用區 | 1728 × 888 px |
| 色彩模式 | RGB（PPT / 螢幕簡報輸出） |
| 解析度 | 72 dpi（螢幕）/ 導出 @2x 給高密度螢幕 |

---

## 字型家族

| 用途 | 中文字型 | 拉丁 / 數字 | 選用理由 |
|------|----------|-------------|----------|
| 標題 Display | Noto Sans TC 900 Black | Inter 800 ExtraBold | 粗體在投影與螢幕分享時也讀得到 |
| 內文 Body | Noto Sans TC 500 Medium | Inter 500 Medium | 高易讀、專業中性 |
| 技術名詞 / 數字標註 | — | JetBrains Mono 500 Regular | 等寬字型 = 技術術語視覺信號 |

**備援字型**：中文 → 思源黑體 (Source Han Sans TC)；拉丁 → `system-ui, -apple-system, sans-serif`

---

## 字級階層（基準：1920 × 1080 px）

| 角色 | 字級 | 字重 | 行高 | 備註 |
|------|------|------|------|------|
| Hook 大標 H1 | 80 px | 900 | 1.15 | 卡片主視覺標題 |
| 副標 H2 | 48 px | 700 | 1.30 | 段落副標 |
| 內文 Body | 34 px | 500 | 1.60 | 說明文字 |
| 巨數字 Big Number | 160 px | 900 | 1.00 | 裝置數 / 統計衝擊數字 |
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
| 警告 / 情境 | Coral Red | `#E8634F` |
| 成功 / 佐證 | Forest Green | `#5B9770` |

### 禁用規則

- 禁止大面積純白 `#FFFFFF` 作底色
- 禁止純黑 `#000000`
- 禁止霓虹色、3D 反射效果、漸層光暈
- 禁止雜亂裝飾性元素（clipart、隨機貼紙）

---

## 架構師六拍視覺編碼

每張卡片左上角顯示節奏標籤（Kicker），並以對應色塊作為角標或邊線：

| 序 | 內部拍名 | Kicker 文字（上版） | 視覺色票 | Hex |
|----|---------|-------------------|----------|-----|
| 1 | 情境 | SCENARIO | Coral Red | `#E8634F` |
| 2 | 關鍵提問 | KEY QUESTIONS | Mint | `#97E8D6` |
| 3 | 方法 | METHOD | Deep Teal | `#2E7D86` |
| 4 | 產出物 | ARTIFACT | Deep Navy | `#152238` |
| 5 | 業界佐證 | REAL WORLD | Forest Green | `#5B9770` |
| 6 | 取捨 | TRADE-OFF | Teal + Red 雙色並陳 | `#2E7D86` + `#E8634F` |
| — | 登場（Ch0 專用） | INTRO | Deep Teal | `#2E7D86` |
| — | 預告（Ch0 專用） | PREVIEW | Mint | `#97E8D6` |

> **硬性規則（禁用具名引導裝置）**：Kicker 只能使用上表中性標籤。投影片上**不得出現**「委員質詢」「蘇格拉底」「武僧委員會」或任何具名引導裝置的字樣，違者必須移除後才能出圖。

---

## 品牌配置（每卡必須）

**Logo 來源資料夾**：`Handouts/system_design/openslide/assets/branding/`（與 system_design_101 共用品牌素材，路徑不變）

| 場景 | 使用 Logo 檔 |
|------|-------------|
| 深底卡（navy / teal 底） | `logo-light.png` |
| 淺底卡（warm white 底） | `logo-dark.png` 或 `logo-main.png` |

**配置規格**：
- 位置：右下角，距底部邊距 96 px，距右側邊距 96 px
- 高度：64 px（等比例縮放寬度）
- 頁尾文字：`桑尼資料科學 · 版權所有 ©`，22 px / 500 weight，與 logo 同行對齊

---

## 詞彙卡格式（方法拍專用）

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

## 進度膠囊格式（每幕開頭）

顯示當前白皮書版本與幕名：

```
[ 架構白皮書 vN · 幕名 ]
```

- 字型：Inter 700 + JetBrains Mono（版本號 `vN` 部分）
- 色票：Mint `#97E8D6` 文字，Deep Navy `#152238` 底，圓角膠囊形
- 字級：34 px，放於卡片頂部內容區

---

## VCRE 計分卡格式

每個架構決策從 VCRE 四維評分，凸顯「沒有絕對最佳解，只有取捨」。計分卡採詞彙卡視覺語言（Deep Teal 底、Warm White 字、圓角 16 px），四個維度以 2×2 或水平並列膠囊呈現：

| 維度 | 縮寫 | 白話問法 |
|------|------|----------|
| 商業價值 Value | V | 這個決策替業務賺錢/省錢/降風險嗎？ |
| 成本 Cost (TCO) | C | 總體擁有成本多少？（雲費 + 人力 + 維運） |
| 風險 Risk | R | 會壞在哪？SPOF？流量暴增 10 倍撐得住？ |
| 可演進 Evolvability | E | 三年後要改，這決定會卡住我們嗎？ |

### 計分方向（scale polarity，全課一致）

評分採 1–5 分。**各維度方向不同，務必一致**：

- **V 商業價值 / E 可演進**：分數越高越好（5 = 價值高 / 很好演進）。高分用 Forest Green `#5B9770`。
- **C 成本 / R 風險**：分數越高代表負擔越重（5 = 成本最高 / 風險最高），是越需警惕的訊號。高分用 Coral Red `#E8634F`。

即「V/E 高 = 好；C/R 高 = 該擔心」。每張計分卡的理由必須與分數方向一致（例如 C=5 的理由要說明成本為何很高，而非說它便宜）。

```
┌──────────┬──────────┬──────────┬──────────┐
│  V 商業值 │  C 成本  │  R 風險  │  E 演進  │
│  [評分]  │  [評分]  │  [評分]  │  [評分]  │
│  [理由]  │  [理由]  │  [理由]  │  [理由]  │
└──────────┴──────────┴──────────┴──────────┘
```

Ch0 第一張 VCRE 計分卡發放時，需附四維白話問法說明。取捨拍（TRADE-OFF）必須含 VCRE 計分。

---

## 產出物圖視覺規範

本課程的程式化圖涵蓋三類：**C4 容器圖 / 領域模型（ER）/ 關鍵資料流**。

- 底色：Deep Navy `#152238`
- 方塊邊框：Deep Teal `#2E7D86`，2 px
- 方塊文字：Warm White `#F4F1EA`，JetBrains Mono 500，28 px
- 箭頭：Mint `#97E8D6`，粗 2 px，實線（同步）/ 虛線（非同步）
- **本幕新增方塊**：邊框改為 Mint `#97E8D6`，4 px，並加「NEW」標籤（Kicker 規格）
- **故障/風險節點**：保留既有邊框，疊加 Coral Red `#E8634F` 閃電標記（`warning` 標記）
- 每幕版本號標於圖右下：`白皮書 vN`，Caption 規格，JetBrains Mono
- 正式產出物圖頁必須使用單頁 `slide-XX.md` 的 `Diagram Spec` 程式化渲染
- GPT Image 2 只可用於圖表背景、外框與簡單 icon 風格，不可決定節點、箭頭或拓樸
- v4（風險與韌性）之後優先用群組節點降低密度，例如 `Worker × N`、`Consumer Group`

---

## 卡片 Prompt 模板

原始章節草稿使用以下結構（`slides.md` 檔案格式）：

```markdown
### Slide N · [卡片標題]
- 節奏拍：[架構師六拍之一]
- 卡片文字：
    - 大標：[≤ 14 中文字，粗體]
    - 內文：[≤ 3 行，每行 ≤ 18 中文字，白話]
- 視覺 prompt：[可直接拿去生成的圖像/版面描述，含 16:9 PPT 尺寸說明、字型、品牌色票]
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：（選填，供講師/錄音稿使用）
```

單頁產圖規格使用 `slide-XX.md`，必須包含：

```markdown
---
chapter: "幕 N：幕名"
chapter_id: "NN"
chapter_slug: "NN-幕名"
slide: "1"
title: "≤ 14 中文字短標"
original_title: "來源大標"
beat: "情境 / 關鍵提問 / 方法 / 產出物 / 業界佐證 / 取捨"
kicker: "SCENARIO / KEY QUESTIONS / METHOD / ARTIFACT / REAL WORLD / TRADE-OFF"
layout_type: "scenario"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"   # 內部 metadata，不上版
source_deck: "slides.md"                      # 內部 metadata，不上版
whitepaper_version: ""
rendering_mode: "image_prompt"
---

## On-slide Text
## Beginner Anchor
## Learning Goal
## Visual Spec
## Diagram Spec
## Logo Assets
## Technical Flow Details
## VCRE Scorecard
## GPT Image Prompt
## Negative Prompt
## Speaker Notes
## QA Checklist
```

### GPT Image 2 使用規則

- 圖片模型不負責產生最終中文字；最終中文字以 `On-slide Text` 為準
- 圖片模型不負責架構拓樸；正式產出物圖以 `Diagram Spec` 為準
- 圖片模型不負責繪製實名品牌 logo；logo 必須使用核准的官方 asset 後製疊上
- Prompt 必須指定品牌色票、畫布、kicker、短標與禁止事項
- Negative Prompt 必須禁止亂生額外文字、改寫中文、霓虹色、3D 反光、clipart、雜亂貼紙

### 實名 Logo 使用規則

- 凡提到公司、雲端服務、框架、套件、開源產品，單頁規格必須列 `Logo Assets`
- Logo 使用官方素材，不可用 AI 生成近似圖
- Logo strip 最多 4 個，放在案例/佐證區，不取代產出物圖節點
- 若 logo 素材尚未取得，仍需列 expected asset path，並於 QA 階段阻擋最終輸出

### 技術流程嚴謹度

- 正式產出物圖頁除了 `Diagram Spec`，還必須有 `Technical Flow Details`
- 技術流程需說明讀寫路徑、同步/非同步、快取命中/未命中、Queue ack/retry、Failover、可觀察性鏈路等關鍵細節
- 若一張 16:9 投影片放不下所有細節，圖面可分層，但 `Technical Flow Details` 不可省略

---

## 硬性規則

### 規則一：投影片不標來源出處

- 投影片上的所有文字以 `On-slide Text` 為唯一真相來源
- **不得**在任何投影片上加入 `> Source:`、`參考資料：`、`來自：` 等來源/出處標註
- 知識素材對應只存在作者內部文件（如本設計規格），**不得上版**

### 規則二：不使用具名引導裝置

- 投影片上 **不得出現**「委員質詢」「蘇格拉底」「武僧委員會」或任何具名引導裝置字樣
- Kicker 一律使用「架構師六拍視覺編碼」中的中性標籤（SCENARIO / KEY QUESTIONS / METHOD / ARTIFACT / REAL WORLD / TRADE-OFF / INTRO / PREVIEW）

---

## 快速自查清單

製作每張卡片前，確認：

- [ ] 畫布 1920 × 1080 px，安全邊距 96 px
- [ ] 大標 ≤ 14 字，內文每行 ≤ 18 字，整卡 ≤ 3 行
- [ ] 字型：標題 Noto Sans TC 900 + Inter 800；內文 Noto Sans TC 500 + Inter 500
- [ ] 術語使用 JetBrains Mono
- [ ] 色票來自品牌色票，無霓虹、無純黑底
- [ ] 節奏標籤（Kicker）正確對應架構師六拍色票
- [ ] 技術術語首次出現有詞彙卡
- [ ] logo 右下角 64 px，版本正確（深/淺底對應）
- [ ] 頁尾文字「桑尼資料科學 · 版權所有 ©」
- [ ] 進度膠囊顯示「架構白皮書 vN · 幕名」（非「服務 N 用戶」）
- [ ] 產出物圖有版本號（白皮書 vN）且新增方塊有 Mint 邊框標示
- [ ] 單頁 `slide-XX.md` 有 `Beginner Anchor`，能用一句話講清本頁重點
- [ ] `rendering_mode: programmatic_diagram` 的頁面有完整 `Diagram Spec`
- [ ] `rendering_mode: image_prompt` 的頁面不要求模型畫精準架構拓樸
- [ ] 提到實名公司/服務/套件的頁面有 `Logo Assets`
- [ ] 產出物圖頁有 `Technical Flow Details`，沒有省略關鍵讀寫、非同步或失敗流程
- [ ] 取捨拍（TRADE-OFF）有 `VCRE Scorecard`
- [ ] **投影片上無任何來源/出處標註**（不出現 `Source:`、`參考：` 等字樣）
- [ ] **投影片上無具名引導裝置**（不出現「委員質詢」「蘇格拉底」「武僧委員會」等字樣）
- [ ] `whitepaper_version` 欄位：產出物頁填 `v0`..`v5`（v0 為 Ch0 空白委託書），其他頁留空
