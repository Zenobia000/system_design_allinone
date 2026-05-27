# Ch.12 Case Study · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/12-case-study/`

**本章圖像總覽**：5 張 · P0 × 1（母模板）· P1 × 3 · P2 × 1
- 3 張甘特帶（電商 / 直播 / AI 影視）+ Hero + 訂單狀態機

---

## Image 01 · Hero · Case Study 章首（三系統並排）

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `12-case-study/00_overview.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/12-case-study/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration showing three distinct buildings standing side-by-side at the foot of a single shared blueprint sheet that connects all three. Left: a traditional commercial storefront (e-commerce) with shopping bags and a tidy cash register; middle: a modern broadcast/streaming tower with antennas and many small viewer figures looking up at it (livestream); right: a futuristic studio with film reels merging into glowing screens and GPU rack silhouettes (AI video). Below all three, a single set of nine professional figures stands as if they could walk into any of the three buildings—suggesting "same roles, different challenges".
  Composition: three buildings of similar height arranged horizontally with equal spacing; shared blueprint scroll connecting them at the foot; nine identical-looking figures across the bottom; warm soft daylight; ample whitespace above for title.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 章首要立刻傳達「同一套角色，三種人生」的核心訊息。三棟建築風格鮮明可區分但底下站著同一批人。

---

## Image 02-04 · 九角色甘特帶（三系統對照組）· 母模板

- **Type**: D · 對照圖（橫條圖）
- **Priority**: **P0**（母模板·必做）· 三張一組
- **Slides**: `12-case-study/01_ecommerce.md` · `02_livestream.md` · `03_ai_video.md`
- **Save as**:
  - `12-case-study/01_ecommerce_gantt.png`
  - `12-case-study/02_livestream_gantt.png`
  - `12-case-study/03_ai_video_gantt.png`
- **Aspect**: 16:9 (1536×1024 each)
- **產生方式**：執行 `_generate_gantt_bars.py`（**程式生成、不用 AI**）

  ```bash
  python software_develop_journey/ppt/assets/diagrams/_generate_gantt_bars.py
  ```

  一鍵產出三張，所有座標、字距、色票完全一致——只有條長因 domain 不同。

### 為什麼不用 AI 生圖

gpt-image-2 無法準確控制橫條的長度。每次重生：
- 「粗」「細」對比隨機
- 不同 domain 之間的 baseline 不一致（一張的「8 格」可能跟另一張的「6 格」一樣長）
- 條粗細無法和語意對齊（你要說 Architect 10/10 它可能畫到一半）

程式產出則確保**三張圖在同一座標系統**，差異可直接視覺比對。

### 投入度評估（0-10 scale）

| 角色 | 電商 | 直播 | AI 影視 |
|---|---|---|---|
| PM | 6 | 5 | **10 ★★★** |
| UX | 7 | 5 | 5 |
| UI | 5 | 5 | 6 |
| SA | **8 ★** | 6 | 6 |
| Architect | 7 | **10 ★★★** | 8 |
| SD | 6 | 7 | 6 |
| DBA | **8 ★** | 3 | **9 ★★** |
| Dev | 6 | 6 | 6 |
| QA | **8 ★** | 7 | **9 ★（角色變了）** |
| DevOps | 7 | **10 ★★★** | **10 ★★★** |

**心臟對比**：
- 電商：SA · DBA · QA（狀態機 + 對帳 + 邊界驗證）
- 直播：Architect · DevOps（延遲合約 + 容量規劃）
- AI 影視：PM · DBA · DevOps · QA 角色變了（從驗證已知到定義未知）

### 改數字的方式

直接修改 `_generate_gantt_bars.py` 內的 `DOMAINS` dict——每個 domain 的 `weights` 陣列（10 個數字對應 PM/UX/UI/SA/Arch/SD/DBA/Dev/QA/Ops），重跑 script 即可。圖內**自動帶出右側「實務 weight 依據」**說明欄，所以改數字記得同步改 rationale。

### Note

- 三張甘特帶的**橫軸刻度都是 0-10**，數值意義一致
- ★ 標記是「該 domain 的心臟角色」（非絕對 weight 排名）
- 每張圖右側列 10 行 rationale，讓讀者知道「為何給這個分數」——這是教學重點，不是純美學
- 若要更新評估，**先動 script + slide ASCII，再重生圖**（保持 single source of truth）

---

## Image 05 · 訂單 7 狀態機

- **Type**: E · 狀態圖
- **Priority**: P2
- **Slide**: `12-case-study/01_ecommerce.md` · 第 3 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/12-case-study/01_order_state.png`
- **Aspect**: 16:9
- **建議用 Mermaid**：

  ```mermaid
  stateDiagram-v2
    [*] --> pending_payment: 建立訂單
    pending_payment --> paid: 付款成功
    pending_payment --> cancelled: 30 分鐘逾時
    paid --> preparing: 庫存確認
    preparing --> shipped: 出貨
    shipped --> delivered: 送達
    delivered --> completed: 確認收貨
    delivered --> returned: 7 天內退貨
    returned --> refunded: 退款完成
    paid --> cancelled: 庫存不足
    completed --> [*]
    refunded --> [*]
    cancelled --> [*]
  ```

- **Note**: 對應 Ch.12 電商章節的核心 hook「訂單完成 ≠ 付款成功」。每個狀態轉換都是業務規則 + 事務邊界。用 Mermaid render 後存 PNG，配色照 style guide（橘色為主邊框、米白底）。
