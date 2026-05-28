# DIAGRAM_SPEC — 程式化架構圖規格

正式架構圖頁使用 `rendering_mode: programmatic_diagram`。這些頁面的 `Diagram Spec` 是渲染唯一真相來源；GPT Image 2 不負責決定節點、箭頭或資料流方向。

## Schema

```yaml
version: "v7"
focus: "本頁新增能力的一句話"
rendering_rules:
  canvas: "1920x1080"
  safe_margin_px: 96
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint solid 2px"
  arrow_async: "Mint dashed 2px"
groups:
  - id: "data_layer"
nodes:
  - id: "server_pool"
    label: "Server x N"
    subtitle: "多台服務"
    type: "server_pool"
    group: "main_flow"
    status: "existing"
edges:
  - from: "server_pool"
    to: "queue"
    label: "async task"
    style: "dashed"
    meaning: "async"
```

## Node Status

- `existing`：前面版本已出現的節點，Deep Teal 2 px 邊框。
- `new`：本章新增能力，Mint 4 px 邊框，右上角加 `NEW`。
- `warning`：本章要提醒會壞或需監控的節點，保留既有邊框並加 Coral Red 故障標記。

## Edge Rules

- `style: solid` 用於同步請求、讀取、寫入與主要資料流。
- `style: dashed` 用於非同步、同步延遲、通知、健康檢查、Failover。
- `meaning` 只能使用穩定語意：`sync`、`async`、`read`、`write`、`failover`、`health`。

## Rendering Constraints

- 不渲染 `Diagram Spec` 之外的節點或箭頭。
- v4 之後可將多個同類元件合併成 group，例如 `Replica DB x N`、`Shard DB x N`，避免圖面過密。
- `畫給我看` 練習頁不是正式架構圖頁，即使文字提到 vN，也應使用 `rendering_mode: image_prompt`。
- 最終圖上所有節點文字使用 JetBrains Mono；中文 subtitle 使用 Noto Sans TC。
- 正式架構圖頁必須搭配 `Technical Flow Details`，確認讀寫路徑、同步/非同步、失敗處理沒有被簡化掉。
- 若圖中節點對應實際產品或套件，logo 只放在旁邊的工具/案例區，不直接取代架構節點標籤。

## Flow Detail Expectations

- v1-v3：必須說清 request、DB access、cache hit/miss。
- v4：必須區分 Primary write、Replica read、replication lag、sharding key。
- v5：必須包含 health check、failover、retry 與 idempotency 的關係。
- v6：必須區分 static asset path、dynamic API path、origin pull、file upload、DB metadata write。
- v7：必須包含 enqueue、accepted response、worker consume、ack/retry、result write、notification。
- v7+：必須包含 search query path、DB source of truth、async index sync、eventual consistency、reindex/backfill。
