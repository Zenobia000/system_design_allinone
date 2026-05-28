---
chapter: "第 6 章：即時與等待"
chapter_id: "06"
chapter_slug: "06-即時與等待"
slide: "6"
title: "加入非同步層"
original_title: "非同步層加入，接近完整後端架構"
beat: "架構圖"
kicker: "DIAGRAM"
layout_type: "architecture_diagram"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "v7"
rendering_mode: "programmatic_diagram"
---

# Slide 06 · 加入非同步層

## On-slide Text
- Kicker: `DIAGRAM`
- Title: 加入非同步層
- Original title: 非同步層加入，接近完整後端架構
- Body:
  - 請求進 Queue，Worker 從 Queue 取出慢慢處理。
  - Server 只管接收，不再被慢任務拖住。

## Beginner Anchor
慢任務先丟進 Queue，Worker 背景處理，Server 先釋放。

## Learning Goal
在上一版架構上新增本章能力區塊，讓演化可視化。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Mint edge.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent node positions or arrow topology.
- Keep only the current chapter capability marked as `new`; previous nodes must use existing styling.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「非同步層加入，接近完整後端架構」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   畫面主體為架構圖 v7，延續 v6 佈局，由左至右橫向排列，置中：
>
>   CDN Edge（延續 v6，邊框 Deep Teal `#2E7D86` / 2 px，無 NEW 標籤）
>
>   方塊 A（Client）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v6，無 NEW）
>
>   → 箭頭：Mint / 實線 / 2 px
>
>   方塊 B（Load Balancer）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v6，無 NEW）
>
>   → 箭頭：Mint / 實線，分叉至 Server 群組
>
>   方塊 C（Server × N）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v6，無 NEW）
>
>   Server 往兩個方向延伸：
>   - 往右：Mint 箭頭指向 Cache，再指向 Primary DB（Write，Coral Red 標示）
>   - 往下：Mint 虛線箭頭指向 Message Queue（NEW），標「非同步任務」/ JetBrains Mono / 18 px
>
>   方塊 D（Cache）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v6，無 NEW）
>
>   非同步層（NEW）——在架構圖下方加一個方框群組，圓角大框包圍，框標「非同步層」/ Noto Sans TC 500 / 24 px / `#97E8D6`，框邊框 Mint `#97E8D6` / 2 px / 虛線：
>
>     方塊 E（Message Queue，NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。佇列 icon（三條橫線代表排隊）+ 「Message Queue」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「任務排隊」/ `#97E8D6`。右上角「NEW」標籤（Mini 膠囊 / Mint 底 / Deep Navy 文字 / Inter 700 / 18 px）。
>
>     → 箭頭：Mint / 實線，從 Message Queue 指向右側 Worker Pool
>
>     方塊 F（Worker Pool，NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。齒輪 icon（線條）+ 「Worker × N」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「背景處理」/ `#97E8D6`。右上角「NEW」標籤。Worker Pool 方塊右側一條 Mint 箭頭指向 Primary DB（標「寫入結果」/ JetBrains Mono / 18 px）。Worker Pool 上方一條虛線 Mint 箭頭回指 Server（或 Client，標「通知」/ JetBrains Mono / 18 px / Mint），代表任務完成後推送通知。
>
>   Blob Storage（延續 v6，邊框 Deep Teal `#2E7D86` / 2 px，無 NEW 標籤）：Server 旁旁掛。
>
>   資料層（延續 v6 虛線大框，「資料層」）：
>     Primary DB（有閃電標示，延續 v6），邊框 Deep Teal / 2 px，無 NEW。
>     Replica 1、Replica 2（延續），邊框 Deep Teal / 2 px，無 NEW。
>     Health Check（延續），邊框 Deep Teal / 2 px，無 NEW。
>     Failover 路徑（延續），無 NEW。
>     Shard 1、Shard 2（延續），邊框 Deep Teal / 2 px，無 NEW。
>
>   圖右下角標示版本號：「架構圖 v7」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。
>
>   圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
version: "v7"
focus: "新增非同步能力：慢任務進 Queue，Worker 背景處理並通知。"
rendering_rules:
  canvas: "1080x1350"
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
  - id: "reliability_layer"
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
    status: "new"
  - id: "worker"
    label: "Worker x N"
    subtitle: "背景處理"
    type: "worker_pool"
    group: "async_layer"
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
  - from: "worker"
    to: "client"
    label: "notify"
    style: "dashed"
    meaning: "async"
  - from: "server_pool"
    to: "blob"
    label: "upload file"
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
1. Server receives the request and immediately enqueues slow work into Message Queue.
2. Server returns an accepted/queued response so the user is not blocked by the slow task.
3. Worker x N consumes tasks from Message Queue with retry and visibility/ack semantics.
4. Worker writes final result to Primary DB and emits notification/update back to Client.
5. Queue depth, retry count, dead-letter handling, and idempotency must be explicit in implementation.

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is DIAGRAM. Title is "加入非同步層". Generate only the background, framing, and simple technical icon style; the architecture diagram must be rendered from the Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.

## Speaker Notes
v7 是全課程架構演化的高點——幾乎所有現代後端系統都有這幾層：LB、Server、Cache、DB（含 Replica 和 Sharding）、CDN、Blob Storage，以及現在加入的 Message Queue + Worker Pool。新增的兩個方塊（Message Queue 和 Worker Pool）用 Mint 邊框 + NEW 標籤，所有延續方塊用 Deep Teal。讓學員站在 v7 面前說：「我看得懂這個架構！」

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
