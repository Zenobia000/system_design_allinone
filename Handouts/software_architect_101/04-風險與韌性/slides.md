# 幕 4：風險與韌性 — 架構師 101

> 本文件是幕 4 八張投影片的敘事草稿，產圖用單頁規格見 `slide-01.md`…`slide-08.md`。

---

## 白皮書版本：v4（故障模式分析 FMEA）

### 幕 4 學習目標

學員完成本幕後應能：
1. 找出 v3 架構的單點故障（SPOF）
2. 對每個 SPOF 套用 FMEA 框架（失效模式 / 影響 / 緩解手法）
3. 掌握五種韌性手法：複本、重試、冪等、背壓、熔斷
4. 用 VCRE 框架評估「多 AZ 備援」的取捨

---

### Slide 01 · TSDB 掛了就瞎了（SCENARIO）

- 節奏拍：SCENARIO
- 卡片文字：
  - 大標：TSDB 掛了就瞎了（11 字）
  - 內文：
    - 上線前一晚：TimescaleDB 單實例掛掉
    - 告警停了、讀數查不到、整廠監控全黑
    - 停機一小時 = $20,000 的代價
- 視覺 prompt：深海軍藍底。Coral Red 閃電破畫面右側，壓住一個孤立資料庫圖示。左側：大標粗體、三行內文。畫面感是「午夜告警靜默」的緊張感。品牌色票，無霓虹。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這是上線前最真實的噩夢。v3 架構的 TimescaleDB 是單一實例——它一旦掛掉，寫入路徑和讀取路徑同時中斷，告警也停了。這一幕從最痛的 SPOF 開始，要問：你的架構能撐住多少故障？

---

### Slide 02 · SPOF 在哪（KEY QUESTIONS）

- 節奏拍：KEY QUESTIONS
- 卡片文字：
  - 大標：SPOF 在哪（6 字）
  - 內文：
    - 流量暴增 10 倍，哪個元件先垮？
    - Kafka 只有一個 broker，queue 塞爆怎辦？
    - 哪個元件死了讓告警 P99 破 10 秒？
- 視覺 prompt：深海軍藍底，Mint 色標籤「KEY QUESTIONS」。三個問句排列成清單，數字/術語 JetBrains Mono。右側簡單示意箭頭圖，箭頭指向三個標記問號的節點。簡潔問題導向排版。
- 品牌：logo-light.png 右下 64 px + 頁尾
- 旁白：三個提問，對應三個風險維度：容量（10 倍暴增）、佇列（Kafka broker 單點）、告警延遲（P99 破 SLA）。帶學員從模糊的「會不會壞」逼出可量化的問題。

---

### Slide 03 · 找出單點故障（METHOD）

- 節奏拍：METHOD
- 卡片文字：詞彙卡三張
  - SPOF / 單點故障：一個元件掛掉即造成服務中斷
  - Availability / 可用性：系統在約定時間內正常服務的比例
  - FMEA / 故障模式分析：逐一分析每個元件的失效模式與影響
- 視覺 prompt：深海軍藍底，三個 Deep Teal 詞彙卡垂直或水平排列。每張卡：英文術語 JetBrains Mono 34 px，分隔線，中文定義 Noto Sans TC 34 px。圓角 16 px，Warm White 文字。Kicker「METHOD」Deep Teal 標籤左上。
- 品牌：logo-light.png 右下 64 px + 頁尾
- 旁白：三個術語是本幕的語言基礎。SPOF：Single Point of Failure，一個元件掛掉即服務中斷。Availability：正常服務時間比例，99.9% = 每月約 43 分鐘允許停機。FMEA：不是說系統會壞，是主動問「如果這個元件壞了會怎樣？」

---

### Slide 04 · 五種韌性手法（METHOD）

- 節奏拍：METHOD
- 卡片文字：詞彙卡五張
  - Replica / 複本：同一份資料/服務的多個副本，任一掛掉可切換
  - Retry / 重試：操作失敗後自動再試，搭配指數退避避免雪崩
  - Idempotency / 冪等：相同請求執行多次結果相同，重試不產生副作用
  - Backpressure / 背壓：下游告知上游放慢速率，避免佇列無限膨脹
  - Circuit Breaker / 熔斷：偵測到下游異常後自動斷開，防止故障擴散
- 視覺 prompt：深海軍藍底，五個詞彙卡以 mini 表格或縱列方式排列。每行：英文術語 JetBrains Mono + 中文定義 Noto Sans TC，≤ 18 字。Deep Teal 底色卡，Warm White 文字。Kicker「METHOD」。
- 品牌：logo-light.png 右下 64 px + 頁尾
- 旁白：這五種手法是韌性工具箱。Replica 解決 SPOF；Retry + Idempotency 解決暫時性失敗；Backpressure 解決流量暴增；Circuit Breaker 解決雪崩式連鎖故障。後面 slide-06 的 FMEA 表會把這五種手法對應到具體元件。

---

### Slide 05 · 白皮書 v4：故障模式圖（ARTIFACT）

- 節奏拍：ARTIFACT
- 白皮書版本：v4
- 卡片文字：
  - 大標：白皮書 v4：故障模式圖（10 字）
  - 圖說：在 v3 架構標出 SPOF · FMEA 失效模式與緩解手法
  - 版本標籤：`白皮書 v4`
- 視覺 prompt：深海軍藍底，ARTIFACT 標籤。程式化圖：使用 v3 架構七個節點，對 TSDB、Kafka、Stream Processor 加 Coral Red 閃電警告標記。右側 FMEA 摘要表。品牌工具 logo strip（Kafka、Redis）。
- 品牌：logo-light.png 右下 64 px + 頁尾
- 旁白：這是白皮書 v4 的核心產出。在 v3 架構上，我們標出三個 SPOF（TimescaleDB 單實例、單一 Kafka broker、單一 Stream Processor）。每個 SPOF 對應 FMEA：失效模式是什麼、對 SLA 和停機成本的影響、要用哪種韌性手法緩解。

---

### Slide 06 · 大廠主動弄壞自己（REAL WORLD）

- 節奏拍：REAL WORLD
- 卡片文字：
  - 大標：大廠主動弄壞自己（9 字）
  - 內文：
    - 混沌工程：故意注入故障，找出潛在 SPOF
    - 多 AZ 部署：跨可用區，單 AZ 掛不影響整體
    - 業界共識：韌性要演練，不能只靠「希望它不壞」
- 視覺 prompt：Forest Green 強調色搭配深海軍藍底。REAL WORLD 標籤綠色。三行內文左側，右側示意「intentional failure」圖示——一個網路節點被主動切斷的線稿。無具名公司 logo。品牌色票，無霓虹。
- 品牌：logo-light.png 右下 64 px + 頁尾
- 旁白：韌性不是紙上設計，需要主動演練。混沌工程的核心理念是主動在系統中注入故障（殺程序、切網路、拔資料庫），在受控環境下找出潛在 SPOF，而不是等生產環境爆炸才發現。多 AZ 部署讓單一可用區故障不會造成整體中斷。

---

### Slide 07 · 多 AZ 備援值得嗎（TRADE-OFF）

- 節奏拍：TRADE-OFF
- 卡片文字：
  - 大標：多 AZ 備援值得嗎（8 字）
  - 內文：
    - 多 AZ：跨區備援，單 AZ 故障不中斷
    - 成本：雲費約增 1.5–2×，$3,000–6,000/月
    - 現階段：6 人團隊 MVP，複雜度超出能力邊界
- VCRE 計分卡：V=3 / C=5 / R=3 / E=5
- 視覺 prompt：深海軍藍底，TRADE-OFF 雙色標籤（Deep Teal + Coral Red）。三行內文，下方 VCRE 四格計分卡。數字 JetBrains Mono。品牌色票。
- 品牌：logo-light.png 右下 64 px + 頁尾
- 旁白：多 AZ 備援是正確方向，但時機點很重要。現在：6 人 Python 新手雲端團隊、3 個月 MVP、雲費 < $5,000/月——加上多 AZ 讓雲費直接翻 1.5–2 倍，維運複雜度也翻倍。演進路徑：先做好 SPOF 緩解（複本 + 重試 + 冪等），v5 再加多 AZ。VCRE 顯示 C（成本）和 E（可演進）是關鍵考量。
