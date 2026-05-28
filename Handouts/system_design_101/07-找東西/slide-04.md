---
chapter: "第 7 章：找東西（選配 / 進階）"
chapter_id: "07"
chapter_slug: "07-找東西"
slide: "4"
title: "搜尋旁掛"
original_title: "搜尋服務旁掛，資料從 DB 同步過去"
beat: "架構圖"
kicker: "DIAGRAM"
layout_type: "architecture_diagram"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "v7+"
rendering_mode: "programmatic_diagram"
---

# Slide 04 · 搜尋旁掛

## On-slide Text
- Kicker: `DIAGRAM`
- Title: 搜尋旁掛
- Original title: 搜尋服務旁掛，資料從 DB 同步過去
- Body:
  - 搜尋請求不進 DB，改進 Search Index。
  - 資料寫入 DB 後，非同步同步給搜尋索引。

## Beginner Anchor
搜尋不要掃 DB 全表，旁掛 Search Index 處理全文查詢。

## Learning Goal
在上一版架構上新增本章能力區塊，讓演化可視化。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Mint edge.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent node positions or arrow topology.
- Keep only the current chapter capability marked as `new`; previous nodes must use existing styling.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「搜尋服務旁掛，資料從 DB 同步過去」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   畫面主體為架構圖 v7+，延續 v7 全部方塊，佈局由左至右橫向排列，置中：
>
>   CDN Edge（延續 v7，邊框 Deep Teal `#2E7D86` / 2 px，無 NEW 標籤）
>
>   方塊 A（Client）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v7，無 NEW）
>
>   → 箭頭：Mint / 實線 / 2 px
>
>   方塊 B（Load Balancer）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v7，無 NEW）
>
>   → 箭頭分叉至 Server 群組
>
>   方塊 C（Server × N）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v7，無 NEW）
>
>   Server 往三個方向延伸：
>   - 往右：Mint 箭頭指向 Cache，再指向 Primary DB（Write）
>   - 往下：Mint 虛線箭頭指向 Message Queue（延續 v7）
>   - 往右下（NEW）：Mint 箭頭指向 Search Index（NEW），標「搜尋請求」/ JetBrains Mono / 18 px
>
>   方塊 D（Cache）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v7，無 NEW）
>
>   搜尋服務群組（NEW）——在架構圖右側加一個方框群組，圓角大框包圍，框標「搜尋服務」/ Noto Sans TC 500 / 24 px / `#97E8D6`，框邊框 Mint `#97E8D6` / 2 px / 虛線：
>
>     方塊 G（Search Index，NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。放大鏡 icon（線條）+ 「Search Index」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「反向索引」/ `#97E8D6`。右上角「NEW」標籤（Mini 膠囊 / Mint 底 / Deep Navy 文字 / Inter 700 / 18 px）。
>
>   Primary DB → Search Index：Mint 虛線箭頭，從資料層 Primary DB 指向 Search Index，標「資料同步」/ JetBrains Mono / 18 px / Mint。代表資料寫入 DB 後非同步同步至搜尋索引。
>
>   非同步層（延續 v7，Message Queue + Worker Pool，邊框 Deep Teal / 2 px，無 NEW）。
>
>   資料層（延續 v7 虛線大框，Primary DB、Replica、Shard，邊框 Deep Teal / 2 px，無 NEW）。
>
>   圖右下角標示版本號：「架構圖 v7+」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。
>
>   圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
version: "v7+"
focus: "新增搜尋旁路：搜尋請求走 Search Index，資料從 DB 非同步同步。"
rendering_rules:
  canvas: "1920x1080"
  safe_margin_px: 96
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint solid 2px"
  arrow_async: "Mint dashed 2px"
groups:
  - id: "media_layer"
  - id: "async_layer"
  - id: "data_layer"
  - id: "search_layer"
nodes:
  - id: "cdn"
    label: "CDN Edge"
    subtitle: "就近快取"
    type: "cdn"
    group: "media_layer"
    status: "existing"
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
    status: "warning"
  - id: "cache"
    label: "Cache"
    subtitle: "快取層"
    type: "cache"
    group: "main_flow"
    status: "existing"
  - id: "primary_db"
    label: "Primary DB"
    subtitle: "負責寫入"
    type: "database"
    group: "data_layer"
    status: "warning"
  - id: "replica_group"
    label: "Replica DB x N"
    subtitle: "負責讀取"
    type: "database_group"
    group: "data_layer"
    status: "existing"
  - id: "shard_group"
    label: "Shard DB x N"
    subtitle: "分片儲存"
    type: "database_group"
    group: "data_layer"
    status: "existing"
  - id: "health_check"
    label: "Health Check"
    subtitle: "偵測節點"
    type: "monitor"
    group: "reliability_layer"
    status: "existing"
  - id: "blob"
    label: "Blob Storage"
    subtitle: "圖片影片"
    type: "object_storage"
    group: "media_layer"
    status: "existing"
  - id: "queue"
    label: "Message Queue"
    subtitle: "任務排隊"
    type: "queue"
    group: "async_layer"
    status: "existing"
  - id: "worker"
    label: "Worker x N"
    subtitle: "背景處理"
    type: "worker_pool"
    group: "async_layer"
    status: "existing"
  - id: "search"
    label: "Search Index"
    subtitle: "反向索引"
    type: "search"
    group: "search_layer"
    status: "new"
edges:
  - from: "client"
    to: "cdn"
    label: "static assets"
    style: "solid"
    meaning: "read"
  - from: "client"
    to: "lb"
    label: "api request"
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
  - from: "server_pool"
    to: "search"
    label: "search query"
    style: "solid"
    meaning: "read"
  - from: "primary_db"
    to: "search"
    label: "sync data"
    style: "dashed"
    meaning: "async"
  - from: "server_pool"
    to: "queue"
    label: "async task"
    style: "dashed"
    meaning: "async"
  - from: "queue"
    to: "worker"
    label: "consume"
    style: "solid"
    meaning: "async"
  - from: "worker"
    to: "primary_db"
    label: "write result"
    style: "solid"
    meaning: "write"
  - from: "primary_db"
    to: "replica_group"
    label: "replicate"
    style: "dashed"
    meaning: "async"
```

## Technical Flow Details
1. Search query path: Server sends keyword queries to Search Index, not to DB LIKE full scan.
2. Write path remains Primary DB first so the database is the source of truth.
3. Index sync path sends DB changes to Search Index asynchronously.
4. Search results may lag behind DB writes; this is an eventual consistency trade-off.
5. Reindex/backfill path is required when index schema or ranking logic changes.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is DIAGRAM. Title is "搜尋旁掛". Generate only the background, framing, and simple technical icon style; the architecture diagram must be rendered from the Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.

## Speaker Notes
v7+ 的重點是「旁掛」——Search Index 不是插入主路徑，而是旁路掛上去。搜尋請求走 Search Index，一般讀寫請求走原本的 Server → Cache → DB 路徑。資料從 DB 非同步同步給搜尋索引，這條同步路徑用虛線表示。讓學員看到：加一個新功能，不是把整個架構打掉重做，而是旁路增加一個元件。

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
