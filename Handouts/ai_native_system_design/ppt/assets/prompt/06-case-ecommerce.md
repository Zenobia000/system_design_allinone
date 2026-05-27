# Case 1 · 電商秒殺系統 · 圖像 Prompts

> Style guide: [`./0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md)
> Save images to: `openslide/slides/06-case-ecommerce/assets/`

**本章圖像**：4 張 · P0 × 3 + P2 × 1

---

## Image 01 · 削峰漏斗（心智模型）

- **Type**: E · Funnel Diagram
- **Priority**: P2
- **Save as**: `openslide/slides/06-case-ecommerce/assets/case1_funnel.png`
- **Used in**: 06 P02c（新增頁，業務背景後）
- **Aspect**: 1024×1536 直幅
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook style. Flat 2D, NO 3D, NO cartoon.

  Theme: E-commerce flash sale traffic shedding funnel reducing 100K req/s to 1K orders.

  Background: warm cream #F5F1E8.

  A large vertical inverted funnel shape, from wide top to narrow bottom.

  Top entry (widest): '100K req/s / 峰值流量' shown as many small arrows entering.

  4 horizontal filtering bands inside the funnel:

  Band 1 (top): 'CDN + WAF + Rate Limit / 邊緣防護' - terracotta #D97757
  - Removes: 'Bot / DDoS / 重複請求' annotated on side

  Band 2: 'Token Reservation / 預約頁過濾' - olive #A1813F
  - Removes: '無 token / 過期 token' annotated

  Band 3: 'Redis Atomic Decrement / 庫存原子扣減' - sage green #5B9770
  - Removes: '庫存售完' annotated

  Band 4 (bottom narrow): 'Kafka Buffer / 訊息削峰' - slate teal #5B7570
  - Smooths: '排隊平緩到 DB'

  Bottom output (narrow): '1K orders / 1K 成功訂單'.

  Side annotation: '99% reject in earliest layer / 99% 在最便宜的層級擋掉'.

  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 02 · Stage 1 · 1K QPS MVP

- **Type**: A · Architecture (Baseline)
- **Priority**: P0
- **Save as**: `openslide/slides/06-case-ecommerce/assets/06_stage1_mvp.png`
- **Used in**: 06 P05
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in AWS Well-Architected whitepaper style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: E-commerce baseline architecture handling 1K QPS, weekday traffic.

  Background: warm cream #F5F1E8.
  Element fills: terracotta #D97757 for services, olive #A1813F for proxy, sage green #5B9770 for databases, slate #5B7570 for cache.
  Lines: dark brown #2A2520, 2px arrows.
  Labels: clean sans-serif, bilingual Traditional Chinese + English near each element.

  Top-to-bottom flow:
  1. Cloud 'Cloudflare CDN / CDN 邊緣'
  2. Arrow down
  3. Rounded rectangle 'Cloudflare WAF + Rate Limit / 防火牆與限流'
  4. Arrow down
  5. Rounded rectangle 'Load Balancer / 負載均衡器'
  6. Arrow down to 2 parallel rectangles 'App × 2 (stateless) / 應用伺服器'
  7. From apps: 2 arrows splitting left and right
  8. Left: Cylinder 'PostgreSQL (single) / 主資料庫'
  9. Right: Cylinder 'Redis cache + session / 快取與會話'

  Side annotation box: 'Stage 1 · MVP · 1K QPS / 平日量·單機足夠'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 03 · Stage 2 · 10K QPS

- **Type**: A · Architecture (Mid-scale)
- **Priority**: P0
- **Save as**: `openslide/slides/06-case-ecommerce/assets/06_stage2_10k.png`
- **Used in**: 06 P06
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in AWS Well-Architected whitepaper style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: E-commerce 10K QPS architecture with read-write split and Redis cluster.

  Background: warm cream #F5F1E8.
  Element fills: terracotta #D97757 services, olive #A1813F queues, sage green #5B9770 databases, slate #5B7570 cache.
  Lines: dark brown #2A2520, 2px arrows.
  Labels: bilingual Traditional Chinese + English.

  Top-to-bottom flow:
  1. Cloud 'CDN + WAF / 邊緣防護'
  2. Arrow down
  3. Rounded rectangle 'Load Balancer (multi-AZ) / 跨可用區負載均衡'
  4. Arrow down to row of 6 rectangles 'App × 6 (auto-scale) / 應用×6 自動擴展'
  5. From apps split to 3 destinations:
     - Cylinder 'PG Primary / 主庫 (寫)'
     - 2 Cylinders 'Read Replica × 2 / 讀副本×2'
     - 3 connected hexagons 'Redis Cluster / Redis 叢集 (Lua atomic 庫存扣減)'

  Side annotation box: 'Stage 2 · 10K QPS · 加 replica + cache cluster'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 04 · Stage 3 · 100K QPS 秒殺（試水 #1）

- **Type**: A · Architecture (Peak)
- **Priority**: P0
- **Save as**: `openslide/slides/06-case-ecommerce/assets/06_stage3_seckill.png`
- **Used in**: 06 P07
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean technical architecture diagram in the style of AWS Well-Architected whitepaper / McKinsey consulting deck. Flat 2D vector illustration. NO 3D, NO isometric, NO cartoon, NO Greek pillars.

  Theme: E-commerce flash sale (秒殺) architecture handling 100K req/s peak, showing traffic shedding funnel.

  Background: warm cream #F5F1E8.
  Element fills: muted terracotta #D97757 for compute services, olive #A1813F for queues/brokers, sage green #5B9770 for databases.
  Lines: dark brown #2A2520, 2px, with arrowheads showing flow direction.
  Labels: clean sans-serif, bilingual Traditional Chinese + English placed near each element.

  Top-to-bottom vertical flow with these labeled elements:
  1. Cloud shape labeled 'Cloudflare CDN + WAF / CDN 邊緣' at top
  2. Arrow down with red text label '99% reject / 99% 擋掉'
  3. Rounded rectangle 'Token Reservation / 預約頁過濾'
  4. Arrow down
  5. Rounded rectangle 'ALB Load Balancer / 負載均衡器'
  6. Arrow down to row of 3 rectangles 'App × 50 (pre-scaled) / 應用伺服器'
  7. Arrow down
  8. Hexagon (3 connected) 'Redis Cluster / 庫存熱層 Lua atomic'
  9. Arrow down with green text label '1K success / 1K 成功進入'
  10. Hexagon 'Kafka (削峰 buffer) / 訊息佇列'
  11. Arrow down
  12. Rounded rectangle 'Order Service / 訂單服務'
  13. Arrow down
  14. Cylinder 'PostgreSQL / 主資料庫'

  Add side annotation box: 'Funnel Strategy / 削峰漏斗：99% reject in earliest layer'

  Style: educational textbook + consulting deliverable. Pure schematic clarity with informative labels.
  ```
