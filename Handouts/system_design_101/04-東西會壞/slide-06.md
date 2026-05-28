---
chapter: "第 4 章：東西會壞"
chapter_id: "04"
chapter_slug: "04-東西會壞"
slide: "6"
title: "標出故障點"
original_title: "標出會壞的點，加上備援路徑"
beat: "架構圖"
kicker: "DIAGRAM"
layout_type: "architecture_diagram"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "v5"
rendering_mode: "programmatic_diagram"
---

# Slide 06 · 標出故障點

## On-slide Text
- Kicker: `DIAGRAM`
- Title: 標出故障點
- Original title: 標出會壞的點，加上備援路徑
- Body:
  - Primary 掛了，自動切換到 Replica 當主。
  - 健康檢查隨時偵測，發現掛掉立即切換。

## Beginner Anchor
系統一定會壞，所以要能切換、重試，並避免重複處理。

## Learning Goal
在上一版架構上新增本章能力區塊，讓演化可視化。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Mint edge.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent node positions or arrow topology.
- Keep only the current chapter capability marked as `new`; previous nodes must use existing styling.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「標出會壞的點，加上備援路徑」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   畫面主體為架構圖 v5，延續 v4 佈局，由左至右橫向排列，置中：
>
>   方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v4，無 NEW 標籤）
>
>   → 箭頭：Mint / 實線 / 2 px
>
>   方塊 B：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v4，無 NEW 標籤）
>
>   → 箭頭：Mint / 實線，分叉至 Server 群組
>
>   方塊 C：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v4，無 NEW 標籤）
>
>   → 箭頭：Mint，分兩條：一條指向 Cache，一條指向 Primary DB（寫入路徑，標「Write」/ JetBrains Mono / 18 px / Coral Red `#E8634F`）
>
>   方塊 D：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v4，無 NEW 標籤）
>
>   → 箭頭：Mint，Cache miss 時指向 Primary DB
>
>   資料層（延續 v4 虛線大框，標「資料層」/ Noto Sans TC 500 / 24 px / `#97E8D6`，框邊框 Mint `#97E8D6` / 2 px / 虛線）：
>
>     方塊 E：「Primary DB」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負責寫入」/ `#97E8D6`，邊框 Deep Teal `#2E7D86` / 2 px。方塊右上角加一個閃電 icon（線條，Coral Red `#E8634F`），標示「會壞的點」/ JetBrains Mono / 18 px / Coral Red，代表潛在故障節點。（延續 v4，非 NEW，但新增閃電標示）
>
>     方塊 F1、F2：「Replica 1」、「Replica 2」/ JetBrains Mono 500 / 28 px，邊框 Deep Teal `#2E7D86` / 2 px。（延續 v4，無 NEW 標籤）
>
>     方塊 G（NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。「Health Check」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「持續偵測節點」/ `#97E8D6`。右上角「NEW」標籤（Mini 膠囊 / Mint `#97E8D6` 底 / Deep Navy `#152238` 文字 / Inter 700 / 18 px）。Health Check 方塊用虛線 Mint 箭頭指向 Primary DB 和 Server，代表偵測。
>
>     備援切換路徑（NEW）：從 Primary DB 到 Replica 1 加一條粗虛線箭頭（Mint `#97E8D6` / 3 px / 虛線），標「Failover」/ JetBrains Mono / 18 px / Mint，代表「Primary 掛了，Replica 接手」。右上角「NEW」標籤貼在箭頭中段。
>
>     方塊 H1、H2（延續 v4，無 NEW）：「Shard 1」、「Shard 2」，邊框 Deep Teal `#2E7D86` / 2 px。
>
>   圖右下角標示版本號：「架構圖 v5」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。
>
>   圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
version: "v5"
focus: "新增可靠性能力：標出故障點，加入 Health Check 與 Failover 路徑。"
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
  - id: "reliability_layer"
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
  - from: "health_check"
    to: "primary_db"
    label: "check"
    style: "dashed"
    meaning: "health"
  - from: "health_check"
    to: "server_pool"
    label: "check"
    style: "dashed"
    meaning: "health"
  - from: "primary_db"
    to: "replica_group"
    label: "failover"
    style: "dashed"
    meaning: "failover"
```

## Technical Flow Details
1. Health Check continuously probes Server x N and Primary DB.
2. When Primary DB fails, Failover promotes a Replica to accept writes.
3. Retry is allowed only when the operation has an idempotency key or dedupe guard.
4. Payment/order creation must use a unique request/order key to avoid duplicate side effects.

## Interview Angle
- Likely follow-up: "使用者按付款兩次，或 retry 送了兩次，怎麼避免重複扣款？"
- Strong answer: "寫入類操作要用 idempotency key，讓同一個業務請求重送時只被處理一次。Retry 提高可用性，但沒有冪等會製造重複副作用。"
- Common trap: 只說 retry 可以修復失敗，卻沒說 retry 也可能讓付款、下單、寄信重複發生。

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is DIAGRAM. Title is "標出故障點". Generate only the background, framing, and simple technical icon style; the architecture diagram must be rendered from the Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.

## Speaker Notes
v5 在 v4 基礎上做兩件事：用閃電符號標出會壞的點（Primary DB、Server），加上 Health Check 方塊和 Failover 備援路徑。延續方塊保持 Deep Teal 邊框，新增的 Health Check 和 Failover 路徑用 Mint 邊框 + NEW 標籤。讓學員看到「原來備援是這樣長進架構的」。

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
