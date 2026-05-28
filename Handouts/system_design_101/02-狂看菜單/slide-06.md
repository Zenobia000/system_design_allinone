---
chapter: "第 2 章：狂看菜單"
chapter_id: "02"
chapter_slug: "02-狂看菜單"
slide: "6"
title: "架構中間多了一層快取"
original_title: "架構中間多了一層快取"
beat: "架構圖"
kicker: "DIAGRAM"
layout_type: "architecture_diagram"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "v3"
rendering_mode: "programmatic_diagram"
---

# Slide 06 · 架構中間多了一層快取

## On-slide Text
- Kicker: `DIAGRAM`
- Title: 架構中間多了一層快取
- Body:
  - Server 先問快取，有就直接回，不打 DB。
  - 快取沒有，才去 DB 查，然後存進快取。

## Beginner Anchor
重複讀同一份資料時，先查 Cache，減少 DB 壓力。

## Learning Goal
在上一版架構上新增本章能力區塊，讓演化可視化。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Mint edge.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent node positions or arrow topology.
- Keep only the current chapter capability marked as `new`; previous nodes must use existing styling.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「架構中間多了一層快取」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   畫面主體為架構圖 v3，延續 v2 佈局，由左至右橫向排列，置中：
>
>   方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v2，無 NEW 標籤）
>
>   → 箭頭：Mint / 實線 / 2 px，左右雙向
>
>   方塊 B：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負載平衡器」/ `#97E8D6`。（延續 v2，無 NEW 標籤）
>
>   → 箭頭：Mint / 實線 / 2 px，分叉至兩台 Server
>
>   方塊 C1、C2：各自圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server 1」、「Server 2」/ JetBrains Mono / 28 px。（延續 v2，無 NEW 標籤）
>
>   → 箭頭：Mint / 實線，從兩台 Server 指向 Cache（優先路徑）；另有虛線箭頭（Cache Miss 路徑）從 Cache 指向 DB
>
>   方塊 D（NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px（新增方塊用 Mint 邊框）。圖示可用閃電或記憶體 icon（線條）+ 「Cache」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「快取層」/ `#97E8D6`。右上角貼「NEW」Mini 膠囊標籤，Mint `#97E8D6` 底 / Deep Navy `#152238` 文字 / Inter 700 / 18 px。
>
>   → 箭頭：Mint / 實線，從 Cache 指向右側 DB（Cache Miss 時才走）；這條箭頭標注「miss」/ JetBrains Mono / 18 px / `#97E8D6`
>
>   方塊 E：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。DB 圓柱圖示 + 「Database」/ JetBrains Mono / 28 px。（延續 v2，無 NEW 標籤）
>
>   圖右下角標示版本號：「架構圖 v3」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。
>
>   圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
version: "v3"
focus: "新增快取能力：Server 先查 Cache，miss 才打 DB。"
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
    status: "existing"
  - id: "server_pool"
    label: "Server x N"
    subtitle: "多台服務"
    type: "server_pool"
    group: "main_flow"
    status: "existing"
  - id: "cache"
    label: "Cache"
    subtitle: "快取層"
    type: "cache"
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
    to: "cache"
    label: "read first"
    style: "solid"
    meaning: "sync"
  - from: "cache"
    to: "db"
    label: "miss"
    style: "dashed"
    meaning: "sync"
```

## Technical Flow Details
1. Server checks Cache before querying Database.
2. Cache hit: Cache returns menu data directly and Database is not touched.
3. Cache miss: Server queries Database, returns data, then writes the hot data back to Cache.
4. Cache invalidation or TTL is required when menu data changes.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is DIAGRAM. Title is "架構中間多了一層快取". Generate only the background, framing, and simple technical icon style; the architecture diagram must be rendered from the Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.

## Speaker Notes
v3 是 v2 長出 Cache 方塊。所有 v2 的舊方塊都要維持原樣（Deep Teal 邊框、無 NEW 標籤），只有 Cache 是 Mint 邊框加 NEW 標籤。箭頭要清楚標示兩條路徑：hit 路徑（Server → Cache → 回傳）和 miss 路徑（Server → Cache miss → DB → 回寫 Cache）。

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
