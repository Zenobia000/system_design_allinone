---
chapter: "第 3 章：資料又多又重要"
chapter_id: "03"
chapter_slug: "03-資料又多又重要"
slide: "6"
title: "DB 變多了，各有分工"
original_title: "DB 變多了，各有分工"
beat: "架構圖"
kicker: "DIAGRAM"
layout_type: "architecture_diagram"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "v4"
rendering_mode: "programmatic_diagram"
---

# Slide 06 · DB 變多了，各有分工

## On-slide Text
- Kicker: `DIAGRAM`
- Title: DB 變多了，各有分工
- Body:
  - Primary DB 負責寫入，Replica 負責讀取。
  - 資料依規則切片，分存到多台 DB。

## Beginner Anchor
讀太多用 Replica 分擔，資料太多用 Sharding 切開。

## Learning Goal
在上一版架構上新增本章能力區塊，讓演化可視化。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Mint edge.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent node positions or arrow topology.
- Keep only the current chapter capability marked as `new`; previous nodes must use existing styling.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「DB 變多了，各有分工」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   畫面主體為架構圖 v4，延續 v3 佈局，由左至右橫向排列，置中：
>
>   方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v3，無 NEW 標籤）
>
>   → 箭頭：Mint / 實線 / 2 px
>
>   方塊 B：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v3，無 NEW 標籤）
>
>   → 箭頭：Mint / 實線，分叉至 Server
>
>   方塊 C（代表 Server 群組，可簡化為一個標示「Server × N」的方塊）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v3，無 NEW 標籤）
>
>   → 箭頭：Mint，分兩條：一條指向 Cache，一條指向 Primary DB（寫入路徑，標「Write」/ JetBrains Mono / 18 px / Coral Red `#E8634F`）
>
>   方塊 D：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v3，無 NEW 標籤）
>
>   → 箭頭：Mint，Cache miss 時指向 Primary DB
>
>   DB 區域（NEW）——右側一個方框群組，圓角矩形大框包圍，框標「資料層」/ Noto Sans TC 500 / 24 px / `#97E8D6`，框邊框 Mint `#97E8D6` / 2 px / 虛線：
>
>     方塊 E（NEW）：較大圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。DB 圓柱圖示 + 「Primary DB」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負責寫入」/ `#97E8D6`。右上角「NEW」標籤。
>
>     → 箭頭：Mint 實線（同步），從 Primary DB 射向下方兩個 Replica 方塊，標「同步」/ JetBrains Mono / 18 px
>
>     方塊 F1、F2（NEW）：各自圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。「Replica 1」、「Replica 2」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負責讀取」/ `#97E8D6`。各自右上角「NEW」標籤。
>
>     → 箭頭：Mint 虛線（表示非同步同步），從 Replica 向 Server 方向回傳讀取結果，標「Read」/ JetBrains Mono / 18 px / Mint
>
>     方塊 G1、G2（NEW）：兩個各自標示「Shard 1」、「Shard 2」的 DB 圓柱方塊，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。下方小字「分片儲存」/ `#97E8D6`。右上角「NEW」標籤。
>
>   圖右下角標示版本號：「架構圖 v4」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。
>
>   圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
version: "v4"
focus: "新增資料層能力區塊：Primary 寫入、Replica 讀取、Shard 分片。"
rendering_rules:
  canvas: "1080x1350"
  safe_margin_px: 96
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint solid 2px"
  arrow_async: "Mint dashed 2px"
groups:
  - id: "data_layer"
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
    status: "existing"
  - id: "primary_db"
    label: "Primary DB"
    subtitle: "負責寫入"
    type: "database"
    group: "data_layer"
    status: "new"
  - id: "replica_group"
    label: "Replica DB x N"
    subtitle: "負責讀取"
    type: "database_group"
    group: "data_layer"
    status: "new"
  - id: "shard_group"
    label: "Shard DB x N"
    subtitle: "分片儲存"
    type: "database_group"
    group: "data_layer"
    status: "new"
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
  - from: "server_pool"
    to: "primary_db"
    label: "write"
    style: "solid"
    meaning: "write"
  - from: "primary_db"
    to: "replica_group"
    label: "replicate"
    style: "dashed"
    meaning: "async"
  - from: "primary_db"
    to: "shard_group"
    label: "partition"
    style: "solid"
    meaning: "write"
  - from: "replica_group"
    to: "server_pool"
    label: "read"
    style: "solid"
    meaning: "read"
```

## Technical Flow Details
1. Write path goes to Primary DB so order writes have one authority.
2. Read path can go to Replica DB x N to reduce Primary load.
3. Primary asynchronously replicates data to Replica DB x N; short replica lag is possible.
4. Shard DB x N partitions data by a deterministic key, such as user_id or order_id range.
5. Cross-shard queries must be treated as slower and more complex than single-shard queries.

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is DIAGRAM. Title is "DB 變多了，各有分工". Generate only the background, framing, and simple technical icon style; the architecture diagram must be rendered from the Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.

## Speaker Notes
v4 是 v3 的 DB 區域大幅擴展。Client、Load Balancer、Server、Cache 都延續 v3，保持 Deep Teal 邊框。新增的 Primary DB、Replica 1/2、Shard 1/2 全部用 Mint 邊框加 NEW 標籤。可以用一個虛線大框把「資料層」包起來，讓學員一眼看到「這章的新東西都在這裡」。

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
