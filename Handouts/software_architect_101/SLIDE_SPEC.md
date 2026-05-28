# SLIDE_SPEC — 單頁投影片規格

本資料夾的 `slide-XX.md` 是產圖用單頁規格。每一頁都必須能獨立交給產圖或渲染流程，不需要讀完整章 `slides.md` 才知道怎麼做。

## Frontmatter

每頁必備欄位：

```yaml
chapter: "幕 N：幕名"
chapter_id: "NN"
chapter_slug: "NN-幕名"
slide: "1"
title: "實際上版短標"
original_title: "來源草稿大標"
beat: "情境 / 關鍵提問 / 方法 / 產出物 / 業界佐證 / 取捨"
kicker: "SCENARIO / KEY QUESTIONS / METHOD / ARTIFACT / REAL WORLD / TRADE-OFF"
layout_type: "scenario"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"   # 內部 metadata，不上版
source_deck: "slides.md"                      # 內部 metadata，不上版
whitepaper_version: ""
rendering_mode: "image_prompt"
```

### 可用 `layout_type` 值

六拍標準型（所有幕通用）：

- `scenario` — 情境拍：丟出架構師會遇到的失敗情境/難題
- `key_questions` — 關鍵提問拍：把模糊形容詞逼成可量化的問題
- `method` — 方法拍：帶出方法與詞彙卡
- `artifact` — 產出物拍：本幕讓架構白皮書 +1（`whitepaper_version` 必填）
- `real_world` — 業界佐證拍：大廠/真實案例怎麼做
- `tradeoff` — 取捨拍：VCRE 四維打分（`VCRE Scorecard` 段落必備）

Ch0 專用型：

- `intro` — 登場（INTRO，Deep Teal）
- `preview` — 預告（PREVIEW，Mint）

Capstone 專用型：

- `whitepaper_recap` — 白皮書完整回顧（v1→v5 演化）

## Rendering Mode

- `image_prompt`：適合情境、關鍵提問、方法、業界佐證、取捨、練習與 Capstone 頁。圖片模型只負責視覺底圖與插畫，精準中文字建議由模板疊上。
- `programmatic_diagram`：只用於正式產出物圖頁（C4 容器圖 / 領域模型 ER / 關鍵資料流）。必須讀取 `Diagram Spec` 產生節點與箭頭，不能讓圖片模型自由發明拓樸。

## Required Sections

每頁必須有這些段落：

- `On-slide Text`：唯一可信的上版文字來源。
- `Beginner Anchor`：給剛轉型架構師角色的工程師的一句話重點。
- `Learning Goal`：本頁教學目標。
- `Visual Spec`：本頁版面與品牌要求。
- `Diagram Spec`：正式產出物圖頁填 YAML，其他頁標 `not_applicable: true`。
- `Logo Assets`：若頁面提到實名公司、雲端服務、框架、套件或開源產品，列出官方 logo asset。
- `Technical Flow Details`：正式產出物圖頁必備，用步驟列出資料流、讀寫路徑、非同步行為與失敗處理。
- `VCRE Scorecard`：取捨拍（`layout_type: tradeoff`）必備，其他頁可選填；四維（V/C/R/E）評分與理由。
- `GPT Image Prompt`：給圖片模型的視覺生成指令。
- `Negative Prompt`：防止模型亂生文字、跑色、跑版。
- `Speaker Notes`：講師旁白或錄音稿參考。
- `QA Checklist`：出圖前檢查項目。

## Title Rule

`title` 是實際建議上版短標，必須盡量控制在 14 個中文字以內。若來源大標過長，保留在 `original_title`，避免模型或模板為了塞字而縮小字級。

## Logo Rule

若頁面提到實名技術或產品，必須補 `Logo Assets`。Logo 必須來自核准的本機官方素材，不可讓 GPT Image 2 仿製。若素材尚未取得，仍要列出 expected asset path，並在 QA Checklist 保留檢查項。

## Technical Flow Rule

正式產出物圖不能只畫高層方塊。`rendering_mode: programmatic_diagram` 的頁面必須提供 `Technical Flow Details`，至少涵蓋：

- 正常 request / response 路徑
- read path 與 write path
- cache hit / miss、replication、queue、alert 觸發等特殊流程
- async / retry / failover / eventual consistency 等失敗或延遲語意

## VCRE Scorecard Rule

`layout_type: tradeoff` 的頁面必須含 `VCRE Scorecard` 段落。格式：

```markdown
## VCRE Scorecard

| 維度 | 評分（1-5） | 本決策的具體理由 |
|------|------------|----------------|
| V 商業價值 | N | ... |
| C 成本 TCO | N | ... |
| R 風險 | N | ... |
| E 可演進 | N | ... |

**核心取捨**：[一句話說明這個決策最關鍵的 trade-off]
```

## No-Citation Rule

投影片上**不得加入任何來源/出處標註**。具體禁止項目：

- 不放 `> Source:` 開頭的參考行
- 不放「參考資料：」「資料來源：」「引用：」等字樣
- 不放學術引用格式（論文標題、作者、年份等）
- 知識素材對應只存在作者內部文件，**不上版**

任何 `On-slide Text` 或 `Speaker Notes` 的內容若包含來源標註，出圖前必須移除。

## No-Named-Device Rule

投影片上**不得出現具名引導裝置**。具體禁止字樣：

- 不出現「委員質詢」
- 不出現「蘇格拉底」
- 不出現「武僧委員會」
- 不出現任何暗示內部教學角色的具名稱謂

Kicker 只能使用 `0_STYLE_GUIDE.md` 六拍視覺編碼表中的中性標籤（SCENARIO / KEY QUESTIONS / METHOD / ARTIFACT / REAL WORLD / TRADE-OFF / INTRO / PREVIEW）。

## `whitepaper_version` Field

- 產出物拍（`layout_type: artifact`）必須填 `whitepaper_version: "v1"` 到 `"v5"`，對應所屬幕的白皮書版本。
- 其他所有頁留空：`whitepaper_version: ""`
- 不使用舊欄位名稱 `diagram_version`；本課程統一使用 `whitepaper_version`。
