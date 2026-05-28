# SLIDE_SPEC — 單頁投影片規格

本資料夾的 `slide-XX.md` 是產圖用單頁規格。每一頁都必須能獨立交給產圖或渲染流程，不需要讀完整章 `slides.md` 才知道怎麼做。

## Frontmatter

每頁必備欄位：

```yaml
chapter: "第 N 章：章名"
chapter_id: "NN"
chapter_slug: "NN-章名"
slide: "1"
title: "實際上版短標"
original_title: "來源草稿大標"
beat: "痛點 / 類比 / 技術 / 架構圖 / 取捨 / 預告"
kicker: "PAIN POINT / ANALOGY / CONCEPT / DIAGRAM / TRADE-OFF / PREVIEW"
layout_type: "pain_point"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
```

面試實戰章可使用這些額外 `layout_type`：

- `interview_practice`
- `interview_sop`
- `interview_question_card`
- `interview_estimation`
- `interview_antipattern`
- `interview_answer_template`
- `interview_architecture_walkthrough`
- `interview_followup`
- `practice_experience`
- `interview_cheatsheet`

## Rendering Mode

- `image_prompt`：適合痛點、類比、詞彙卡、取捨、練習與 Capstone 頁。圖片模型只負責視覺底圖與插畫，精準中文字建議由模板疊上。
- `programmatic_diagram`：只用於正式架構圖頁。必須讀取 `Diagram Spec` 產生節點與箭頭，不能讓圖片模型自由發明拓樸。

## Required Sections

每頁必須有這些段落：

- `On-slide Text`：唯一可信的上版文字來源。
- `Beginner Anchor`：給零系統設計經驗學員的一句話重點。
- `Learning Goal`：本頁教學目標。
- `Visual Spec`：本頁版面與品牌要求。
- `Diagram Spec`：正式架構圖頁填 YAML，其他頁標 `not_applicable: true`。
- `Logo Assets`：若頁面提到實名公司、雲端服務、框架、套件或開源產品，列出官方 logo asset。
- `Technical Flow Details`：正式架構圖頁必備，用步驟列出資料流、讀寫路徑、非同步行為與失敗處理。
- `GPT Image Prompt`：給圖片模型的視覺生成指令。
- `Negative Prompt`：防止模型亂生文字、跑色、跑版。
- `Speaker Notes`：講師旁白或錄音稿參考。
- `QA Checklist`：出圖前檢查項目。

第 8 章面試實戰頁額外必備：

- `Interview Skill`：本頁訓練的面試能力與可練習口條。
- `Rubric`：好回答與弱回答的判準。
- `Mock Interviewer Prompt`：面試官可能丟出的題目或追問。
- `Answer Template`：新手可直接套用的回答句型。
- `Common Mistakes`：本頁要避免的常見錯誤。

## Title Rule

`title` 是實際建議上版短標，必須盡量控制在 14 個中文字以內。若來源大標過長，保留在 `original_title`，避免模型或模板為了塞字而縮小字級。

## Logo Rule

若頁面提到實名技術或產品，必須補 `Logo Assets`。Logo 必須來自核准的本機官方素材，不可讓 GPT Image 2 仿製。若素材尚未取得，仍要列出 expected asset path，並在 QA Checklist 保留檢查項。

## Technical Flow Rule

正式架構圖不能只畫高層方塊。`rendering_mode: programmatic_diagram` 的頁面必須提供 `Technical Flow Details`，至少涵蓋：

- 正常 request / response 路徑
- read path 與 write path
- cache hit / miss、replication、queue、search sync 等特殊流程
- async / retry / failover / eventual consistency 等失敗或延遲語意

## Interview Practice Rule

面試實戰章不能只做勵志提醒。每一頁都要能回答「面試時下一句怎麼講」，因此必須提供：

- 可複誦的回答句型
- 一個 mock interviewer prompt
- 至少三個 common mistakes
- 一個 rubric，明確區分好回答和弱回答

如果面試頁提到 Kafka、Redis、Elasticsearch 等工具但重點是追問語境，可只用文字呈現；若頁面是在正式介紹框架、套件或產品，仍必須遵守 Logo Rule。
