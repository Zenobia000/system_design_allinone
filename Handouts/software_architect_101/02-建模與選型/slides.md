# 幕 2：建模與選型 — 敘事草稿

> 白皮書演化：v1（需求書）→ **v2（領域模型 + 技術棧 + ADR-001）**
> 共 8 張卡片；前 4 張做領域建模，後 4 張做技術選型

---

### Slide 01 · 名詞滿天飛

- 節奏拍：情境（SCENARIO）
- 卡片文字：
  - 大標：名詞滿天飛
  - 內文：
    - 工程師說「data point」，PM 說「讀數」，DBA 說「row」
    - 同一件事叫三個名字，需求就會漏掉
    - 建模第一步：把名詞統一成一張表
- 視覺 prompt：深底卡，左側大字 Kicker「SCENARIO」Coral Red，右側插圖：三個對話泡泡各寫不同術語，顏色混亂
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這就是最常見的建模災難——沒有統一語言，每個人用不同詞彙描述同一件事，等到要寫 API contract 或 DB schema，才發現根本對不上。解法不是開會爭，是先畫出核心名詞的邊界。

---

### Slide 02 · 核心名詞與邊界

- 節奏拍：關鍵提問（KEY QUESTIONS）
- 卡片文字：
  - 大標：核心名詞與邊界
  - 內文：
    - 哪些是核心實體？誰擁有資料？
    - Device 跟 Sensor 是同一件事嗎？
    - Alert 是資料還是事件？邊界在哪？
- 視覺 prompt：深底卡，Kicker「KEY QUESTIONS」Mint，中央三個問號圖示，下方三行問句，字體整齊對齊
- 品牌：logo 右下 64 px + 頁尾
- 旁白：問題本身就是答案的一半。一台設備可以有多個感測器；一個感測器產生大量讀數；Alert 是業務語義，不只是 DB row。把這些邊界問清楚，ER 圖自然就出來了。

---

### Slide 03 · 統一語言與限界（詞彙卡）

- 節奏拍：方法（METHOD）
- 卡片文字：
  - 大標：統一語言與限界
  - 詞彙卡 A：`Ubiquitous Language` / 統一語言 — 全團隊用同一套術語描述業務
  - 詞彙卡 B：`Bounded Context` / 限界上下文 — 術語有效範圍的邊界
  - 詞彙卡 C：`Domain Model` / 領域模型 — 業務實體與關係的結構化描述
- 視覺 prompt：深底卡，三張詞彙卡垂直堆疊，Deep Teal 底，JetBrains Mono 術語
- 品牌：logo 右下 64 px + 頁尾
- 旁白：DDD 核心三個術語。Ubiquitous Language 是共識，Bounded Context 是邊界，Domain Model 是產出。這三個概念在接下來的 ER 圖裡都會體現。

---

### Slide 04 · 白皮書 v2：領域模型（程式化圖）

- 節奏拍：產出物（ARTIFACT）
- 卡片文字：
  - 大標：白皮書 v2：領域模型
  - 進度膠囊：`架構白皮書 v2 · 建模與選型`
  - 圖說：Device / Sensor / Reading / Threshold / Alert 五個核心實體
- 視覺：programmatic_diagram — domain_model ER 圖
- 品牌：logo 右下 64 px + 頁尾
- 旁白：這張 ER 圖就是白皮書 v2 的核心輸入。Reading 是高量時序資料主體（~35 GB/天），它決定了後面的技術選型方向。

---

### Slide 05 · 時序資料怎麼存

- 節奏拍：關鍵提問（KEY QUESTIONS）
- 卡片文字：
  - 大標：時序資料怎麼存
  - 內文：
    - 每天 35 GB 讀數，SQL 還是 NoSQL？
    - 查詢模式：「過去 1 小時平均溫度」
    - 刪除模式：超過 90 天自動 purge
- 視覺 prompt：深底卡，Kicker「KEY QUESTIONS」Mint，右側對比圖：SQL 表格 vs 時間序列折線圖
- 品牌：logo 右下 64 px + 頁尾
- 旁白：時序資料有三個特徵：append-only、按時間查詢、按時間刪除（retention policy）。這三個特徵讓通用 SQL 效率很差——但有 PostgreSQL 的時序擴充 TimescaleDB，可以用熟悉的 SQL 語法同時搞定這三件事。

---

### Slide 06 · SQL vs NoSQL（詞彙卡）

- 節奏拍：方法（METHOD）
- 卡片文字：
  - 大標：SQL vs NoSQL
  - 詞彙卡 A：`ACID` / ACID 事務 — 原子性、一致性、隔離性、持久性
  - 詞彙卡 B：`BASE` / BASE 特性 — 基本可用、軟狀態、最終一致
  - 詞彙卡 C：`Time-Series DB` / 時序資料庫 — 以時間為主鍵、原生壓縮與保留策略
- 視覺 prompt：深底卡，三張詞彙卡垂直堆疊，術語 JetBrains Mono
- 品牌：logo 右下 64 px + 頁尾
- 旁白：ACID vs BASE 是取捨維度，不是對立。IoT 時序資料是 append-only，不需要複雜事務，但需要高效時間查詢——TimescaleDB 在 ACID 的 PostgreSQL 上加了時序原生能力。

---

### Slide 07 · 白皮書 v2：技術棧（程式化圖）

- 節奏拍：產出物（ARTIFACT）
- 卡片文字：
  - 大標：白皮書 v2：技術棧
  - 進度膠囊：`架構白皮書 v2 · 建模與選型`
  - 技術棧表 + ADR-001：選 TimescaleDB 的理由
- 視覺：image_prompt — 技術棧表 + ADR-001 結構化文件
- Logo strip：PostgreSQL、TimescaleDB、FastAPI、Redis
- 品牌：logo 右下 64 px + 頁尾
- 旁白：ADR（Architecture Decision Record）是架構決策的文字記錄，讓三個月後的自己、新加入的工程師都知道「當時為什麼選這個」。ADR-001 是第一個正式決策：選 TimescaleDB（PostgreSQL 的時序擴充外掛）而非通用關聯式 DB。

---

### Slide 08 · 時序 DB 值得嗎

- 節奏拍：取捨（TRADE-OFF）
- 卡片文字：
  - 大標：時序 DB 值得嗎
  - 內文：
    - TimescaleDB vs 純 PostgreSQL
    - 時序壓縮省空間，但學習成本存在
    - VCRE 打分：短期 C 高、長期 V 更高
- VCRE 計分卡：TimescaleDB vs 通用 PostgreSQL
- 視覺 prompt：深底卡，Kicker「TRADE-OFF」雙色，四格 VCRE 卡片
- 品牌：logo 右下 64 px + 頁尾
- 旁白：TimescaleDB 就是 PostgreSQL 的一個擴充——不是另一套系統，所以 R（風險）分數不應太高。它最大的 V（商業價值）在於自動壓縮和 retention policy，讓每天 35 GB 的資料在 3 個月後不會壓垮 $5,000/月的雲費預算。
