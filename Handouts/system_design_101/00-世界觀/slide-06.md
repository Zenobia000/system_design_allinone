---
chapter: "第 0 章：世界觀"
chapter_id: "00"
chapter_slug: "00-世界觀"
slide: "6"
title: "這就是最簡單的系統"
original_title: "這就是最簡單的系統"
beat: "架構圖"
kicker: "DIAGRAM"
layout_type: "architecture_diagram"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "v1"
rendering_mode: "programmatic_diagram"
---

# Slide 06 · 這就是最簡單的系統

## On-slide Text
- Kicker: `DIAGRAM`
- Title: 這就是最簡單的系統
- Body:
  - 一支手機、一台 Server、一個 DB
  - 三個方塊，串起整個服務

## Beginner Anchor
先記住三個角色：Client、Server、Database。

## Learning Goal
在上一版架構上新增本章能力區塊，讓演化可視化。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Mint edge.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent node positions or arrow topology.
- Keep only the current chapter capability marked as `new`; previous nodes must use existing styling.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「這就是最簡單的系統」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，上方。
>
>   畫面主體為架構圖，水平三方塊排列，置中：
>
>   方塊 A：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px（本章新增，全部三個均為新增），內含手機 icon（線條）+ 文字「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ Noto Sans TC 500 / 24 px / `#97E8D6`。
>
>   → 箭頭：Mint `#97E8D6` / 實線 / 2 px，左右雙向（請求 + 回傳）
>
>   方塊 B：同樣圓角矩形規格，內含 server icon（矩形疊層）+ 「Server」+ 「廚房，處理請求」
>
>   → 箭頭同規格
>
>   方塊 C：圓角矩形，內含 DB 圓柱圖示 + 「Database」+ 「冰箱，存放資料」
>
>   三個方塊寬度相等（約 240 px），高度 160 px，水平間距 32 px，整體置中。
>
>   圖右下角標示版本號：「架構圖 v1」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。
>
>   圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。
>
>   所有三個方塊加「NEW」Kicker 標籤（因為這是第一章，三者皆首次登場），標籤規格：Mini 膠囊 / Mint `#97E8D6` 底 / Deep Navy `#152238` 文字 / Inter 700 / 18 px，右上角貼邊。

## Diagram Spec
```yaml
version: "v1"
focus: "三個基本角色串成最小系統。"
rendering_rules:
  canvas: "1080x1350"
  safe_margin_px: 96
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint solid 2px"
  arrow_async: "Mint dashed 2px"
groups: []
nodes:
  - id: "client"
    label: "Client"
    subtitle: "你的手機"
    type: "client"
    group: "main_flow"
    status: "new"
  - id: "server"
    label: "Server"
    subtitle: "處理請求"
    type: "server"
    group: "main_flow"
    status: "new"
  - id: "db"
    label: "Database"
    subtitle: "存放資料"
    type: "database"
    group: "data_layer"
    status: "new"
edges:
  - from: "client"
    to: "server"
    label: "request/response"
    style: "solid"
    meaning: "sync"
  - from: "server"
    to: "db"
    label: "read/write"
    style: "solid"
    meaning: "sync"
```

## Technical Flow Details
1. Client sends an HTTP request to Server.
2. Server executes application logic and reads/writes Database.
3. Database returns data to Server; Server formats the response for Client.

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is DIAGRAM. Title is "這就是最簡單的系統". Generate only the background, framing, and simple technical icon style; the architecture diagram must be rendered from the Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.

## Speaker Notes
這張是本課最重要的一張。「架構圖 v1」要清晰、對稱、乾淨。學員第一次看到架構圖，要覺得「我看得懂！」三個方塊要夠大，標籤要清楚。後面每章都會回來加一個方塊。

## QA Checklist
- [ ] Technical Flow Details match the Diagram Spec edges and do not skip required failure/async behavior.
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `DIAGRAM` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
- [ ] All diagram edges reference existing node ids.
- [ ] Only current-chapter nodes use `status: new` styling.
- [ ] Async edges are dashed and sync edges are solid.
