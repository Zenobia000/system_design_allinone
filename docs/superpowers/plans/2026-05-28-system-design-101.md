# 系統設計 101 · 新手課 實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 產出一門給完全程式新手的系統設計入門課，以 prompt 形式的 LinkedIn 4:5 投影片設計稿落地於 `Handouts/system_design_101/`。

**Architecture:** 內容驅動（非程式碼）。主幹是「線上點餐 App 從小長大」的爆點敘事，每章固定六拍節奏，雙螺旋（長大的架構圖 + C/A/L/Cost 計分卡）貫穿。先做 STYLE_GUIDE + 第 0 章當完整範例，驗證教學與視覺成立後，再用同一公式展開其餘章節。

**Tech Stack:** Markdown（prompt 形式設計稿）。視覺規格：1080×1350（4:5）、Noto Sans TC / Inter / JetBrains Mono、品牌色票 navy `#152238` + teal `#2E7D86` + mint `#97E8D6`。渲染（React/Marp/AI 生圖）為後續獨立工作，不在本計畫範圍。

> **驗證方式說明**：本計畫產出是內容，非程式碼。每章的「測試」是一份**目視驗證清單**（見 §驗證清單），逐項勾選即為通過。沒有 pytest。

**設計來源**：`docs/superpowers/specs/2026-05-28-system-design-101-beginner-course-design.md`

---

## 檔案結構

```
Handouts/system_design_101/
├── README.md                  課程總覽 + 爆點地圖 + 架構圖演化總表
├── 0_STYLE_GUIDE.md           視覺/字體/品牌/卡片模板契約（所有章節遵守）
├── 00-世界觀/slides.md        ← 完整範例章（先做、驗證公式）
├── 01-人變多/slides.md
├── 02-狂看菜單/slides.md
├── 03-資料又多又重要/slides.md
├── 04-東西會壞/slides.md
├── 05-照片與影片/slides.md
├── 06-即時與等待/slides.md
├── 07-找東西/slides.md        （選配）
└── 99-結業-capstone/slides.md
```

職責：`0_STYLE_GUIDE.md` = 唯一視覺真相來源；各 `slides.md` = 該章的 prompt 形式卡片設計稿；`README.md` = 入口與全課地圖。

---

## 通用驗證清單（每章 commit 前逐項目視）

- [ ] 六拍齊全：痛點 / 類比 / 技術 / 架構圖 / 佐證 / 取捨 都有對應卡片（第 0 章與結業章例外，見各章說明）
- [ ] 每張卡片有 prompt 模板四欄位：節奏拍、卡片文字（大標＋內文）、視覺 prompt、品牌
- [ ] 大標 ≤ 14 中文字；內文每行 ≤ 18 中文字且 ≤ 3 行
- [ ] 每個新技術名詞首次出現有**詞彙卡**（中英對照 + 白話定義）
- [ ] 該章開頭有**進度條**（服務 N 用戶）
- [ ] 該章結尾有**「畫給我看」**練習
- [ ] 該章「取捨」拍有回到 **C/A/L/Cost 打分**
- [ ] 架構圖卡標明「之前 vs 現在」的增量
- [ ] 視覺 prompt 含 4:5、字體、品牌色票，且風格一致（不出現編輯插畫風）
- [ ] 無 server 內部路徑外洩（本課為公開教學內容）

---

## Phase 1 · 建立並驗證公式

### Task 1：建立資料夾骨架與 README

**Files:**
- Create: `Handouts/system_design_101/README.md`

- [ ] **Step 1：建立資料夾與九章空目錄**

```bash
cd Handouts/system_design_101 2>/dev/null || mkdir -p Handouts/system_design_101 && cd Handouts/system_design_101
mkdir -p 00-世界觀 01-人變多 02-狂看菜單 03-資料又多又重要 04-東西會壞 05-照片與影片 06-即時與等待 07-找東西 99-結業-capstone
```

- [ ] **Step 2：寫 README.md**

內容必含：課程定位（完全新手 → 能畫圖+講取捨）、主角 app（線上點餐）、爆點地圖（9 章一表，同設計文件 §3）、架構圖演化總表（v1→v7 每章長出什麼）、三個學習螺旋說明、如何閱讀（LinkedIn 卡片、可滑動）。

- [ ] **Step 3：驗證**

目視確認 README 涵蓋上述六塊，爆點地圖章節名與資料夾名一致。

- [ ] **Step 4：Commit**

```bash
git add Handouts/system_design_101/README.md
git commit -m "feat(sd101): scaffold beginner course folders + README"
```

---

### Task 2：寫 `0_STYLE_GUIDE.md`（視覺契約）

**Files:**
- Create: `Handouts/system_design_101/0_STYLE_GUIDE.md`

- [ ] **Step 1：寫畫布與字體規格**

直接取自設計文件 §6：畫布 1080×1350、安全邊距 96px、內容區 888×1158；字型家族表（Noto Sans TC 900/500、Inter 800/500、JetBrains Mono 500）；字級階層表（H1 80 / H2 48 / Body 34 / BigNumber 160 / Kicker 24 / Caption 26 / Footer 22，含字重與行高）。

- [ ] **Step 2：寫色票與品牌配置**

色票 9 色表（navy `#152238`、暖白 `#F4F1EA`、teal `#2E7D86`、mint `#97E8D6`、白 `#FFFFFF`、警告 `#E8634F`、成功 `#5B9770`）+ 禁用清單。品牌：logo 來源 `Handouts/system_design/openslide/assets/branding/`（深底用 logo-light、淺底用 logo-dark/main，右下 64px）；頁尾「桑尼資料科學 · 版權所有 ©」22px。

- [ ] **Step 3：寫六拍視覺編碼 + 卡片 prompt 模板**

六拍角標色表（痛點紅 / 類比 mint / 技術 teal / 架構圖 navy / 佐證綠 / 取捨雙色）；附設計文件 §5.2 的卡片 prompt 模板與字數上限。

- [ ] **Step 4：驗證**

目視確認：字體三家族齊、字級七階齊、色票九色齊、品牌路徑正確存在（`ls Handouts/system_design/openslide/assets/branding/`）、卡片模板四欄位完整。

- [ ] **Step 5：Commit**

```bash
git add Handouts/system_design_101/0_STYLE_GUIDE.md
git commit -m "feat(sd101): add LinkedIn 4:5 style guide (type, palette, branding)"
```

---

### Task 3：寫 `00-世界觀/slides.md`（完整範例章）

**Files:**
- Create: `Handouts/system_design_101/00-世界觀/slides.md`

> 第 0 章是「設定章」，沒有痛點（系統還沒爆）。六拍調整為：登場 → 類比 → 技術 → 圖 → 佐證 → 預告。這是其餘章節的黃金範本，要把每張卡片的**實際文字**寫完整。

**卡片清單（8 張，每張用完整 prompt 模板）：**

- [ ] **Step 1：寫卡片 1-4**

1. **封面/Hook** — 大標「你每天用的 App，背後長什麼樣？」｜拍：登場｜視覺：navy 底 + mint 線條勾一個手機輪廓｜品牌齊。
2. **主角登場** — 大標「我們要開一家線上點餐 App」內文：從 10 個用戶開始。｜進度條：服務 10 用戶｜拍：登場。
3. **生活類比** — 大標「App 就像一家餐廳」內文：客人點餐、廚房做菜、冰箱存料。｜拍：類比｜mint 角標。
4. **技術登場（詞彙卡）** — Client = 客人（你的手機）/ Server = 廚房（處理請求）/ Database = 冰箱（存資料）。中英對照。｜拍：技術｜teal 角標。

- [ ] **Step 2：寫卡片 5-8**

5. **一個請求的旅程** — 大標「點一份蛋餅，中間發生什麼？」內文：手機送請求→server 處理→DB 取資料→送回。｜拍：技術。
6. **架構圖 v1** — 大標「這就是最簡單的系統」圖：手機 →（一台）server → DB 三方塊。標「架構圖 v1」。｜拍：架構圖｜navy。
7. **四維計分卡發放** — 大標「之後每個決定，問這四題」內文：一致性 / 可用性 / 延遲 / 成本。｜拍：取捨（螺旋二啟動）。
8. **預告 + 畫給我看** — 大標「一台機器就夠了…嗎？」內文：人變多會爆，下一章見。練習：闔頁默畫 v1。｜拍：取捨/預告。

- [ ] **Step 3：自我驗證**

對照「通用驗證清單」逐項勾選（第 0 章免「痛點」與「佐證」可選）。確認詞彙卡、進度條、C/A/L/Cost 發放、畫給我看、架構圖 v1 都在。

- [ ] **Step 4：Commit**

```bash
git add Handouts/system_design_101/00-世界觀/slides.md
git commit -m "feat(sd101): add ch00 worldview as reference chapter"
```

---

### Task 4：範例章驗收檢查點（人工審閱閘門）

- [ ] **Step 1：對照設計文件 §7 驗收標準自評**

逐條問：(a) 讀完能默畫 v1？(b) 取捨拍有用 C/A/L/Cost？(c) 沒有「沒製造痛就丟定義」的名詞？(d) 卡片符合 §6 字體/色票/品牌/4:5？

- [ ] **Step 2：暫停，請使用者審閱範例章**

> 「STYLE_GUIDE 與第 0 章範例已完成。請看 `Handouts/system_design_101/00-世界觀/slides.md` 與 `0_STYLE_GUIDE.md`，確認教學節奏與視覺方向對了，再展開其餘 8 章。」

等使用者確認。要改 → 改完重跑 Task 3-4。通過才進 Phase 2。

---

## Phase 2 · 用同一公式展開其餘章節

> 每章一個 Task，結構相同：依「卡片清單」寫齊六拍 → 跑通用驗證清單 → commit。各章卡片清單已具體列出（拍、核心訊息、新名詞、架構圖增量），執行時依第 0 章範本補完文字。

### Task 5：`01-人變多/slides.md`

**Files:** Create `Handouts/system_design_101/01-人變多/slides.md`

- [ ] **Step 1：寫卡片（進度條：1 萬用戶）**
  - 痛點：「中午 12 點，全部當機」——一台 server 被打爆。
  - 類比：「餐廳只有一個結帳櫃台，大排長龍」。
  - 技術（詞彙卡）：**負載平衡 Load Balancer** + **水平擴展**；附 **stateless**（為何 server 不能自己記東西）。
  - 架構圖 v2：v1 + 負載平衡 + 多台 server。標增量。
  - 佐證：Uber／蝦皮也這樣分流。
  - 取捨：擴展性↑ vs 複雜度↑、session 要外移；C/A/L/Cost 打分。
  - 畫給我看：默畫 v2。
- [ ] **Step 2：跑通用驗證清單**
- [ ] **Step 3：Commit** — `feat(sd101): add ch01 scaling out + load balancer`

### Task 6：`02-狂看菜單/slides.md`

- [ ] **Step 1：寫卡片（進度條：10 萬用戶）**
  - 痛點：大家一直刷菜單，DB 被讀爆、變慢。
  - 類比：每次都跑超市買同樣的東西 vs 放冰箱。
  - 技術（詞彙卡）：**快取 Cache**、cache hit/miss；帶入「記憶體快、網路慢」**數字直覺**（記憶體 ~100ns vs 跨網路 ~ms）。
  - 架構圖 v3：v2 + 快取層。
  - 佐證：所有大站都靠快取扛讀取。
  - 取捨：快 vs 可能讀到舊菜單（一致性）；C/A/L/Cost 打分。
  - 畫給我看：默畫 v3。
- [ ] **Step 2：跑驗證清單**
- [ ] **Step 3：Commit** — `feat(sd101): add ch02 caching + latency numbers`

### Task 7：`03-資料又多又重要/slides.md`

- [ ] **Step 1：寫卡片（進度條：100 萬用戶）**
  - 痛點：訂單爆量，一個 DB 既塞不下又讀不動。
  - 類比：一個冰箱不夠 → 多備幾台（複本）/ 按種類分櫃（分片）。
  - 技術（詞彙卡）：**讀取複本 Read Replica**（解讀取）、**分片 Sharding**（解容量）。
  - 架構圖 v4：DB 變 主庫+複本、資料分片。
  - 佐證：大型電商的訂單庫都分片。
  - 取捨：複本可能不同步、跨片查詢變難；C/A/L/Cost 打分。
  - 畫給我看：默畫 v4。
- [ ] **Step 2：跑驗證清單**
- [ ] **Step 3：Commit** — `feat(sd101): add ch03 replication + sharding`

### Task 8：`04-東西會壞/slides.md`（C/A/L/Cost 正式收斂）

- [ ] **Step 1：寫卡片（進度條：100 萬用戶，但開始談可靠性）**
  - 痛點：機器會掛、網路會斷；客人按兩次送出 → 重複扣款。
  - 類比：寄重要文件要簽收＋備份，不能寄丟也不能寄兩次。
  - 技術（詞彙卡）：**容錯/備援**、**重試 Retry**、**冪等 Idempotency**。
  - 架構圖 v5：標出「會壞的點」與備援路徑。
  - 佐證：金流系統都靠冪等防重複扣款。
  - 取捨：**把 C/A/L/Cost 正式收斂成框架**——可靠 vs 成本/複雜度；用點餐「付款 vs 看菜單」對比強一致/最終一致。
  - 畫給我看：默畫 v5 + 標一個會壞的點。
- [ ] **Step 2：跑驗證清單**
- [ ] **Step 3：Commit** — `feat(sd101): add ch04 reliability + idempotency (CALC framework)`

### Task 9：`05-照片與影片/slides.md`

- [ ] **Step 1：寫卡片**
  - 痛點：上傳食物照塞爆 DB；圖片載很慢。
  - 類比：照片不放抽屜（DB），放專門的倉庫（blob）；分店就近取貨（CDN）。
  - 技術（詞彙卡）：**Blob Storage**、**CDN 內容傳遞網路**（為何影片秒開）。
  - 架構圖 v6：加上檔案儲存 + CDN edge。
  - 佐證：YouTube／Netflix 靠 CDN。
  - 取捨：成本/架構複雜 vs 速度/減輕 DB；C/A/L/Cost 打分。
  - 畫給我看：默畫 v6。
- [ ] **Step 2：跑驗證清單**
- [ ] **Step 3：Commit** — `feat(sd101): add ch05 blob storage + CDN`

### Task 10：`06-即時與等待/slides.md`

- [ ] **Step 1：寫卡片**
  - 痛點：「我的餐好了沒」客人狂刷新；做菜久，請求卡住不能等。
  - 類比：餐廳取餐號碼牌（佇列）；好了再叫你（通知）而不是站著等。
  - 技術（詞彙卡）：**佇列 Queue**、**非同步/背景工作 Worker**、**即時通知**（推播/long polling 入門）。
  - 架構圖 v7：加上佇列 + worker。
  - 佐證：外送 App 的訂單狀態都走佇列＋推播。
  - 取捨：解耦/扛尖峰 vs 最終才完成、要處理失敗重試；C/A/L/Cost 打分。
  - 畫給我看：默畫 v7（接近完整架構）。
- [ ] **Step 2：跑驗證清單**
- [ ] **Step 3：Commit** — `feat(sd101): add ch06 queue + async + realtime`

### Task 11：`07-找東西/slides.md`（選配）

- [ ] **Step 1：寫卡片**
  - 痛點：「附近有什麼餐廳？」用一般 DB 查超慢/查不到。
  - 類比：書的索引／字典；不用一頁頁翻。
  - 技術（詞彙卡）：**搜尋系統/反向索引**入門（與 DB index 的差別點到為止）。
  - 架構圖（選配增量）：加上搜尋服務。
  - 佐證：電商站的搜尋都是獨立搜尋引擎。
  - 取捨：搜尋強 vs 多一套要維護的系統、資料要同步；C/A/L/Cost 打分。
  - 畫給我看：默畫含搜尋的版本。
- [ ] **Step 2：跑驗證清單**
- [ ] **Step 3：Commit** — `feat(sd101): add ch07 search system (optional)`

### Task 12：`99-結業-capstone/slides.md`（驗收終點能力）

> 不教新技術。給新需求，讓學員自己跑完整流程——這是「能畫+能講」的驗收。

- [ ] **Step 1：寫卡片**
  - 回顧：把 v1→v7 架構圖演化一次攤開（一張總圖）。
  - 框架複習：C/A/L/Cost 四題 + 六拍如何用在任何系統。
  - **新需求挑戰**：給一個全新題目（例：「設計一個線上投票系統」），引導學員：先問四維 → 選 2-3 個技術 → 畫圖 → 講取捨。
  - 自評表：對照「能默畫、能說 2 個選項＋取捨」。
  - 下一步：想再深入 → 指向進階資源（不引用 repo 內部路徑）。
- [ ] **Step 2：跑驗證清單（結業章免「痛點/類比」拍）**
- [ ] **Step 3：Commit** — `feat(sd101): add capstone chapter (apply to new problem)`

---

## Self-Review（計畫對照設計文件）

- **Spec 覆蓋**：設計文件 §3 的 9 章 → Task 1(scaffold)+3(ch0)+5~12(ch1-7+capstone) 全覆蓋；§6 STYLE_GUIDE → Task 2；§4 六拍與雙螺旋 → 通用驗證清單 + 各章卡片清單；§7 驗收 → Task 4 + Task 12。無缺口。
- **無佔位符**：第 0 章卡片有實際文字；其餘章節有具體卡片清單（拍/訊息/名詞/架構增量），非 TODO。
- **一致性**：架構圖版本 v1→v7 跨章遞增一致；詞彙卡、進度條、畫給我看、C/A/L/Cost 命名全程一致；資料夾名與設計文件 §5.1 一致。
- **範圍**：單一課程、可逐章獨立產出與審閱，無需拆成多計畫。
