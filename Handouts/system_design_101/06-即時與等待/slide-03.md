---
chapter: "第 6 章：即時與等待"
chapter_id: "06"
chapter_slug: "06-即時與等待"
slide: "3"
title: "號碼牌：拿了就去坐，叫號再來"
original_title: "號碼牌：拿了就去坐，叫號再來"
beat: "類比"
kicker: "ANALOGY"
layout_type: "analogy"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 03 · 號碼牌：拿了就去坐，叫號再來

## On-slide Text
- Kicker: `ANALOGY`
- Title: 號碼牌：拿了就去坐，叫號再來
- Body:
  - 點完餐拿號碼牌，去坐著，廚房慢慢做。
  - 好了叫號通知，客人再來取餐。
  - 窗口不堵車，客人也不用乾等。

## Beginner Anchor
慢任務先丟進 Queue，Worker 背景處理，Server 先釋放。

## Learning Goal
用生活情境建立直覺，再映射到系統元件。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / 深色文字 Deep Navy `#152238`。畫面中央：一個三步驟流程插圖（橫向，線條插畫，Deep Teal `#2E7D86` 線條），由左至右：
>
>   步驟一：客人圖示在窗口取號碼牌（號碼牌圖示，標「#42」），下方 Caption「拿號碼牌」/ Noto Sans TC 400 / 26 px / `#152238`。
>
>   → 箭頭（Mint `#97E8D6`，粗 2 px）
>
>   步驟二：廚師圖示在廚房做菜（廚師帽 + 鍋子，線條），下方 Caption「廚房慢慢做」/ Noto Sans TC 400 / 26 px / `#152238`。
>
>   → 箭頭（Mint）
>
>   步驟三：擴音喇叭 icon（線條），旁邊波紋代表聲音，下方 Caption「叫號通知取餐」/ Noto Sans TC 400 / 26 px / `#152238`。
>
>   右側補充：客人坐在椅子上滑手機（放鬆姿態，線條），旁邊小標「不用乾等」/ Noto Sans TC 400 / 24 px / `#152238`。
>
>   大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is ANALOGY. Title is "號碼牌：拿了就去坐，叫號再來". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
號碼牌類比是 Message Queue 最完美的生活映射：號碼牌就是 Queue 裡的訊息，廚房就是 Worker，叫號通知就是推播/長輪詢。這個類比能讓零基礎學員立刻理解「為什麼要非同步」：不是因為技術需要，而是因為讓人可以去做別的事，而不是乾等。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `ANALOGY` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
