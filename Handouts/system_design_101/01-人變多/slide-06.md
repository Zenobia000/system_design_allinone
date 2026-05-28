---
chapter: "第 1 章：人變多"
chapter_id: "01"
chapter_slug: "01-人變多"
slide: "6"
title: "架構長出新方塊了"
original_title: "架構長出新方塊了"
beat: "架構圖"
kicker: "DIAGRAM"
layout_type: "architecture_diagram"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "v2"
rendering_mode: "programmatic_diagram"
---

# Slide 06 · 架構長出新方塊了

## On-slide Text
- Kicker: `DIAGRAM`
- Title: 架構長出新方塊了
- Body:
  - Load Balancer 站在最前面，分流請求。
  - 後面多台 Server 一起扛，不再一台孤軍。

## Beginner Anchor
人變多時，不是只換大機器，而是用 Load Balancer 分給多台 Server。

## Learning Goal
在上一版架構上新增本章能力區塊，讓演化可視化。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Mint edge.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent node positions or arrow topology.
- Keep only the current chapter capability marked as `new`; previous nodes must use existing styling.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「架構長出新方塊了」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   畫面主體為架構圖 v2，由左至右橫向排列，置中：
>
>   方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。內含手機 icon（線條）+ 「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ Noto Sans TC 500 / 24 px / `#97E8D6`。（延續 v1，無 NEW 標籤）
>
>   → 箭頭：Mint `#97E8D6` / 實線 / 2 px，左右雙向
>
>   方塊 B（NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px（新增方塊用 Mint 邊框）。內含「Load Balancer」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負載平衡器」/ Noto Sans TC 500 / 24 px / `#97E8D6`。右上角貼「NEW」Mini 膠囊標籤，Mint `#97E8D6` 底 / Deep Navy `#152238` 文字 / Inter 700 / 18 px。
>
>   → 箭頭：Mint `#97E8D6` / 實線 / 2 px，分叉成兩條，分別指向下方兩台 Server
>
>   方塊 C1、C2（NEW）：各自獨立圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。垂直並列（上下排列或左右排列），各自標示「Server 1」、「Server 2」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「廚房 × N」/ `#97E8D6`。各自右上角有「NEW」標籤。
>
>   → 箭頭：Mint / 實線，從兩台 Server 匯流指向右側 DB
>
>   方塊 D：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。DB 圓柱圖示 + 「Database」/ JetBrains Mono / 28 px / `#F4F1EA`。（延續 v1，無 NEW 標籤）
>
>   圖右下角標示版本號：「架構圖 v2」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。
>
>   圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
version: "v2"
focus: "新增分流能力：Load Balancer 將請求分給多台 Server。"
rendering_rules:
  canvas: "1920x1080"
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
    status: "existing"
  - id: "lb"
    label: "Load Balancer"
    subtitle: "分流請求"
    type: "load_balancer"
    group: "main_flow"
    status: "new"
  - id: "server_pool"
    label: "Server x N"
    subtitle: "多台服務"
    type: "server_pool"
    group: "main_flow"
    status: "new"
  - id: "db"
    label: "Database"
    subtitle: "存放資料"
    type: "database"
    group: "data_layer"
    status: "existing"
edges:
  - from: "client"
    to: "lb"
    label: "request"
    style: "solid"
    meaning: "sync"
  - from: "lb"
    to: "server_pool"
    label: "distribute"
    style: "solid"
    meaning: "sync"
  - from: "server_pool"
    to: "db"
    label: "read/write"
    style: "solid"
    meaning: "sync"
```

## Technical Flow Details
1. Client sends request to Load Balancer instead of a single Server.
2. Load Balancer selects a healthy Server instance from Server x N.
3. Selected Server handles the request and talks to Database.
4. State must not live only inside one Server; session/state should be externalized.

## Interview Angle
- Likely follow-up: "為什麼不只把 Server 換成更大台？"
- Strong answer: "垂直擴展比較快，但有上限也有單點風險；水平擴展加 LB 可以繼續加機器，代價是部署和狀態管理變複雜。"
- Common trap: 只說 Load Balancer 可以分流，卻沒說 Server 必須盡量無狀態，否則請求切到不同機器會出問題。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is DIAGRAM. Title is "架構長出新方塊了". Generate only the background, framing, and simple technical icon style; the architecture diagram must be rendered from the Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.

## Speaker Notes
v2 是 v1 長出來的，Client 和 DB 要跟 v1 保持一樣的樣式。新加入的 Load Balancer 和多台 Server 要用 Mint 邊框標示「NEW」，讓學員一眼看到「這次加了什麼」。這張是本章視覺高峰。

## QA Checklist
- [ ] Technical Flow Details match the Diagram Spec edges and do not skip required failure/async behavior.
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `DIAGRAM` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
- [ ] All diagram edges reference existing node ids.
- [ ] Only current-chapter nodes use `status: new` styling.
- [ ] Async edges are dashed and sync edges are solid.
