# Case 2 · 即時直播 / IM 推送 · 圖像 Prompts

> Style guide: [`./0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md)
> Save images to: `openslide/slides/07-case-livestream/assets/`

**本章圖像**：3 張 · P0 × 3

---

## Image 01 · Stage 1 · MVP（1 主播 / 1K 觀眾）

- **Type**: A · Architecture (Baseline)
- **Priority**: P0
- **Save as**: `openslide/slides/07-case-livestream/assets/07_stage1_livestream.png`
- **Used in**: 07 P05
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in AWS Well-Architected whitepaper style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: Livestream MVP with WebSocket and Redis Pub/Sub.

  Background: warm cream #F5F1E8.
  Element fills: terracotta #D97757 services, olive #A1813F broker, sage green #5B9770 DB.
  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Top-to-bottom flow:
  1. Small circle 'Streamer / 主播' on left
  2. Small circles representing 'Audience × 1K / 觀眾 1K' on right
  3. Both connect (with WebSocket-style wavy arrows labeled 'WebSocket / 雙向長連線') to center:
  4. Rounded rectangle 'WebSocket Server (Go single) / WebSocket 伺服器'
  5. Arrow down to Hexagon 'Redis Pub/Sub / 訂閱發佈 (in-memory)'
  6. Side connection: Cylinder 'PostgreSQL / 歷史訊息儲存'

  Side annotation box: 'Stage 1 · 1 streamer / 1K audience · single Go server'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 02 · Stage 2 · 100K 連線

- **Type**: A · Architecture (Sharded)
- **Priority**: P0
- **Save as**: `openslide/slides/07-case-livestream/assets/07_stage2_100k_conn.png`
- **Used in**: 07 P06
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in AWS Well-Architected whitepaper style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: Livestream platform at 100K connections, with sharded WebSocket gateways and Kafka persistence.

  Background: warm cream #F5F1E8.
  Element fills: terracotta #D97757 gateways, olive #A1813F brokers, sage green #5B9770 databases.
  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Top-to-bottom flow:
  1. Multiple small circles 'Clients × 100K / 觀眾 100K' at top, split across 3 groups
  2. Arrow down
  3. Rounded rectangle 'LB (sticky by room_id hash) / 黏性負載均衡'
  4. Arrow down to row of 10 small rectangles 'WS Gateway × 10 (10K conn each) / WS 閘道×10'
  5. Arrow down to row of 3 hexagons 'Redis Stream (sharded by room) / 分片訊息流'
  6. Arrow down
  7. Hexagon 'Kafka (persistence) / 訊息持久化'
  8. Arrow down
  9. Cylinder 'Cassandra (history) / 寬列歷史庫'

  Side annotation box: 'Stage 2 · 100K connections · sharded by room'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 03 · Stage 3 · 1M 連線 / 多 region

- **Type**: A · Architecture (Multi-region)
- **Priority**: P0
- **Save as**: `openslide/slides/07-case-livestream/assets/07_stage3_1m_global.png`
- **Used in**: 07 P07
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in AWS Well-Architected whitepaper style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: Global livestream platform 1M connections across 3 regions.

  Background: warm cream #F5F1E8.
  Element fills: terracotta #D97757 services, olive #A1813F brokers, sage green #5B9770 databases.
  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Top-down layout:
  1. Cloud at top 'Cloudflare Edge (Geo Routing) / 全球邊緣節點'
  2. Arrow down to 3 dashed boxes side-by-side, each labeled:
     - Left: 'US East / 美國東部' containing 'WS Gateway × 100'
     - Middle: 'EU West / 歐洲西部' containing 'WS Gateway × 100'
     - Right: 'Asia East / 亞太東部' containing 'WS Gateway × 100'
  3. Each region has its own small Hexagon 'Regional Redis + Kafka'
  4. Below all 3 regions, a central horizontal Hexagon 'Global Kafka (cross-region sync) / 跨區同步'
  5. Arrow down
  6. Cylinder 'Cassandra (multi-DC) / 多資料中心'

  Side annotation box: 'Stage 3 · 1M connections · multi-region active-active'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```
