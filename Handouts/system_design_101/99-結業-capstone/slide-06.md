---
chapter: "第 99 章：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "6"
title: "選解藥畫圖"
original_title: "選 2-3 個學過的解藥，畫出來"
beat: "CHALLENGE"
kicker: "CHALLENGE"
layout_type: "concept_vocab"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 06 · 選解藥畫圖

## On-slide Text
- Kicker: `CHALLENGE`
- Title: 選解藥畫圖
- Original title: 選 2-3 個學過的解藥，畫出來
- Body:
  - LB 分流 → DB 寫入投票（Primary，強一致）
  - Queue 削峰，Worker 慢慢寫入結果
  - Cache 存即時票數，DB 存最終正確票數

## Beginner Anchor
能畫圖、能說痛點、能講取捨，就是這門課的驗收。

## Learning Goal
讓學員用固定框架理解本頁重點。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CHALLENGE」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。大標「選 2-3 個學過的解藥，畫出來」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   畫面中央：一個「草稿架構圖」方塊（圓角大框，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線，框標「你的架構圖草稿」/ Noto Sans TC 500 / 24 px / `#97E8D6`）。框內呈現一個簡化的投票系統示意架構，由左至右橫向排列，方塊規格比正式架構圖小（草稿風格，邊框 Deep Teal `#2E7D86` / 1 px，底色 `#1E3450`）：
>
>   [Client] → [LB] → [Server × N] → [Message Queue] → [Worker] → [Primary DB]
>                                    ↓
>                                [Cache（票數）]
>
>   每個方塊文字 JetBrains Mono 500 / 22 px / `#F4F1EA`，箭頭 Mint `#97E8D6` / 1 px。方塊刻意比正式架構圖小且間距緊湊，呈現「草稿」感。
>
>   草稿方塊右上角：手寫風提示標籤「你來畫」/ Noto Sans TC 700 / 26 px / Coral Red，帶一個小箭頭。
>
>   三行內文在框下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## Interview Angle
- Likely follow-up: "投票系統最重要的取捨是什麼？"
- Strong answer: "每人只能投一次，所以一致性優先。即時票數可以快但允許短暫不準，最終票數必須以 DB 或可審計資料為準。"
- Common trap: 為了顯示即時票數而把 Cache 當 source of truth，導致重複投票或票數錯誤時沒有可回復依據。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CHALLENGE. Title is "選解藥畫圖". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這張是驗收的核心：學員要從七章學過的技術中，選出適合投票系統的組合。參考答案不是唯一解——用 LB + Primary DB 直接寫入（強一致）也行；用 Queue + Worker 削峰，Cache 存即時票數、DB 存最終結果也合理。重點是：能說清楚「為什麼這樣選」「犧牲了什麼」。鼓勵學員真的拿紙筆畫一遍，而不只是看答案。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CHALLENGE` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
