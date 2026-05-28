---
chapter: "第 5 章：照片與影片"
chapter_id: "05"
chapter_slug: "05-照片與影片"
slide: "6"
title: "CDN 與倉庫"
original_title: "靜態資源走 CDN，大檔案進倉庫"
beat: "架構圖"
kicker: "DIAGRAM"
layout_type: "architecture_diagram"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "v6"
rendering_mode: "programmatic_diagram"
---

# Slide 06 · CDN 與倉庫

## On-slide Text
- Kicker: `DIAGRAM`
- Title: CDN 與倉庫
- Original title: 靜態資源走 CDN，大檔案進倉庫
- Body:
  - 圖片和影片存進 Blob Storage，DB 只存 URL。
  - CDN 節點在用戶附近，圖片秒開。

## Beginner Anchor
大檔案不要塞 DB，放 Blob Storage，讓 CDN 就近傳給用戶。

## Learning Goal
在上一版架構上新增本章能力區塊，讓演化可視化。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Mint edge.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent node positions or arrow topology.
- Keep only the current chapter capability marked as `new`; previous nodes must use existing styling.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「靜態資源走 CDN，大檔案進倉庫」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   畫面主體為架構圖 v6，延續 v5 佈局，由左至右橫向排列，置中：
>
>   CDN 層（NEW）：最左側加入一個「CDN Edge」方塊（圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px，內文「CDN Edge」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「就近快取」/ `#97E8D6`）。右上角「NEW」標籤（Mini 膠囊 / Mint 底 / Deep Navy 文字 / Inter 700 / 18 px）。CDN Edge 方塊左側有一條箭頭（Mint / 實線）從 Client 指向 CDN Edge（標「靜態請求」/ JetBrains Mono / 18 px）；CDN Edge 右側有一條細虛線箭頭（Mint）指向 Blob Storage（代表 CDN 從 Blob Storage 取源始檔案快取，標「Origin 拉取」/ JetBrains Mono / 18 px）。
>
>   方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v5，無 NEW 標籤）Client 向右的主箭頭依然指向 Load Balancer（API 請求）；另一條向上或向左的箭頭指向 CDN Edge（靜態請求）。
>
>   → 箭頭：Mint / 實線 / 2 px
>
>   方塊 B：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v5，無 NEW 標籤）
>
>   → 箭頭：Mint / 實線，分叉至 Server 群組
>
>   方塊 C：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v5，無 NEW 標籤）
>
>   → 箭頭：Mint，分兩條：一條指向 Cache，一條指向 Primary DB（Write，Coral Red）
>
>   方塊 D：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v5，無 NEW 標籤）
>
>   Blob Storage（NEW）：在架構圖右下方旁掛一個獨立方塊（圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px，內含倉庫 icon + 文字「Blob Storage」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「圖片 · 影片 · 大檔案」/ `#97E8D6`）。右上角「NEW」標籤。Server 方塊以 Mint 箭頭斜向指向 Blob Storage（標「上傳」/ JetBrains Mono / 18 px）。
>
>   資料層（延續 v5 虛線大框，「資料層」）：
>     Primary DB（延續 v5，有閃電標示），邊框 Deep Teal / 2 px，無 NEW。
>     Replica 1、Replica 2（延續 v5），邊框 Deep Teal / 2 px，無 NEW。
>     Health Check（延續 v5），邊框 Deep Teal / 2 px，無 NEW（已從上章帶入）。
>     Failover 路徑（延續 v5），邊框 Deep Teal，無 NEW。
>     Shard 1、Shard 2（延續 v5），邊框 Deep Teal / 2 px，無 NEW。
>
>   圖右下角標示版本號：「架構圖 v6」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。
>
>   圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
version: "v6"
focus: "新增媒體能力：靜態資源走 CDN，大檔案放 Blob Storage。"
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
  - id: "data_layer"
  - id: "reliability_layer"
nodes:
  - id: "cdn"
    label: "CDN Edge"
    subtitle: "就近快取"
    type: "cdn"
    group: "media_layer"
    status: "new"
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
    status: "new"
edges:
  - from: "client"
    to: "cdn"
    label: "static assets"
    style: "solid"
    meaning: "read"
  - from: "cdn"
    to: "blob"
    label: "origin pull"
    style: "dashed"
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
    to: "blob"
    label: "upload file"
    style: "solid"
    meaning: "write"
  - from: "server_pool"
    to: "primary_db"
    label: "write url"
    style: "solid"
    meaning: "write"
  - from: "primary_db"
    to: "replica_group"
    label: "replicate"
    style: "dashed"
    meaning: "async"
  - from: "health_check"
    to: "primary_db"
    label: "check"
    style: "dashed"
    meaning: "health"
```

## Technical Flow Details
1. Static asset request path: Client requests image/video through CDN Edge.
2. If CDN Edge has cached content, it returns the object directly near the user.
3. If CDN Edge misses, it pulls the object from Blob Storage as origin and then caches it.
4. Upload path: Server writes file bytes to Blob Storage and stores only metadata/URL in DB.
5. Dynamic API requests still go through Load Balancer and Server x N, not through CDN asset path.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is DIAGRAM. Title is "CDN 與倉庫". Generate only the background, framing, and simple technical icon style; the architecture diagram must be rendered from the Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.

## Speaker Notes
v6 在 v5 基礎上長出兩個新方塊：CDN Edge（在 Client 最前面）和 Blob Storage（在 Server 旁邊旁掛）。所有 v5 的方塊保持 Deep Teal 邊框，只有 CDN Edge 和 Blob Storage 用 Mint 邊框加 NEW 標籤。架構圖此時開始有分流概念：靜態資源走 CDN，動態 API 走 Load Balancer，兩條路徑清晰分開。

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
