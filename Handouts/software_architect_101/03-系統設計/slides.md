# 幕 3：系統設計 — 架構師 101 章節草稿

> 白皮書進度：v2 → **v3**（C4 容器圖 + 關鍵資料流 + API 草稿）
> 場景：10,000 台設備；均值 2,000 msg/s，尖峰 6,000 msg/s；SLA P99 告警 <10s、可用 99.9%；技術棧已定（FastAPI / PostgreSQL+TimescaleDB / Redis / Kafka）

---

### Slide 01 · 元件兜不起來

- 節奏拍：SCENARIO
- 卡片文字：
    - 大標：元件兜不起來
    - 內文：
      - 有模型、有技術棧，元件怎麼「接線」還是糨糊
      - FastAPI 跟 Kafka 誰先誰後？Redis 放哪裡？
      - 不畫圖，等到實作才發現接錯就來不及了
- 視覺 prompt：情境拍。1920x1080 px。底色 Deep Navy #152238。左上 SCENARIO Coral Red 膠囊。大標「元件兜不起來」Noto Sans TC 900 / 80px / Warm White。3 行內文。右側插圖：散落的方塊（代表各元件：FastAPI、Kafka、Redis、TimescaleDB）用虛線箭頭互相指向，沒有明確路徑，Mint 2px 線條，無章法佈局。品牌底色色票。
- 品牌：logo-light.png 右下 64px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：模型和技術棧都有了，但架構師的工作還沒結束——元件怎麼接線、誰呼叫誰、同步還是非同步，這些不畫清楚，3 個月後寫程式時才發現問題就已經來不及了。

---

### Slide 02 · 要微服務嗎

- 節奏拍：KEY QUESTIONS
- 卡片文字：
    - 大標：要微服務嗎
    - 內文：
      - REST、gRPC、Queue：通訊方式不同，延遲/保證不同
      - 哪些服務該 stateless？Session 狀態放哪？
      - 上報路徑和查詢路徑能共用同一個 API 嗎？
- 視覺 prompt：提問拍。Mint #97E8D6 左邊線。大標「要微服務嗎」。3 個問號式問題行。背景 Deep Navy。Mint 問號符號作裝飾。
- 品牌：logo-light.png 右下 64px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這一幕的核心問題有三個。第一，各元件之間用什麼通訊？第二，哪些服務必須是 stateless？第三，上報和查詢能共用 API 嗎？把這三個問題答清楚，C4 圖就自然出來了。

---

### Slide 03 · C4 四層視角

- 節奏拍：METHOD
- 卡片文字：
    - 大標：C4 四層視角
    - 內文：（詞彙卡，不列內文行）
    - 詞彙卡 ×4：Context（系統邊界）/ Container（可部署單元）/ Component（模組）/ Code（類別/函數）
- 視覺 prompt：方法拍。Deep Teal 底。4 張垂直/並列詞彙卡。每卡：英文術語 JetBrains Mono Mint + 中文名稱。白話定義一句。圓角 16px。
- 品牌：logo-light.png 右下 64px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：C4 是一套描述軟體架構的視角分層——Context 問「這個系統跟外部誰互動」、Container 問「系統內有哪些可部署的東西（微服務、資料庫、佇列）」、Component 問「某個 Container 裡有哪些模組」、Code 才是類別和函數。本章的白皮書 v3 主要停在 Container 層。

---

### Slide 04 · 削峰用佇列

- 節奏拍：METHOD
- 卡片文字：
    - 大標：削峰用佇列
    - 內文：（詞彙卡，不列內文行）
    - 詞彙卡 ×3：Stateless（無狀態服務）/ Cache（快取）/ Message Queue（訊息佇列）
- 視覺 prompt：方法拍。3 張詞彙卡。每卡 Deep Teal 底、Warm White 字。卡間示意：箭頭從一台設備 → Queue → Consumer，示意削峰邏輯。
- 品牌：logo-light.png 右下 64px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：三個核心詞彙。Stateless 讓你水平擴展、不怕單點失敗。Cache 讓讀取不用每次都打資料庫，P99 SLA 的救命稻草。Message Queue（Kafka）讓尖峰 6,000 msg/s 不直接砸到處理層，Consumer 可以用自己的節奏消費。

---

### Slide 05 · 白皮書 v3：C4 容器圖

- 節奏拍：ARTIFACT
- 卡片文字：
    - 大標：白皮書 v3：C4 容器圖
    - 進度膠囊：架構白皮書 v3 · 系統設計
    - 圖說：Ingest → Queue → Processor → TSDB，讀/寫/告警三條路徑
    - 版本號：白皮書 v3
- 視覺 prompt：programmatic_diagram。不使用圖片模型決定拓樸。
- 白皮書版本：v3
- 旁白：v3 的第一個產出：C4 容器圖。9 個容器，三條路徑——上報寫入路徑（設備 → Ingest API → Kafka → Processor → TSDB）、查詢讀取路徑（Dashboard → Query API → Redis cache → TSDB）、告警路徑（Processor 門檻判斷 → Alert Service）。Kafka 是這張圖的核心設計決策——它把尖峰 6,000 msg/s 的寫入壓力從 Processor 身上解放出來。

---

### Slide 06 · 白皮書 v3：關鍵資料流

- 節奏拍：ARTIFACT
- 卡片文字：
    - 大標：白皮書 v3：關鍵資料流
    - 進度膠囊：架構白皮書 v3 · 系統設計
    - API 草稿：POST /v1/readings、GET /v1/devices/{id}/readings、GET /v1/alerts
    - 版本號：白皮書 v3
- 視覺 prompt：programmatic_diagram。不使用圖片模型決定拓樸。
- 白皮書版本：v3
- 旁白：v3 第二個產出：關鍵資料流。寫入路徑強調非同步 enqueue + ack 語意——設備送完 HTTP 201 就走，不等 TSDB 寫完；讀取路徑強調 cache hit/miss 分支；告警路徑說明 P99 < 10s 的時間預算從哪裡來。API 草稿三個端點讓前後端對齊契約。

---

### Slide 07 · 同步還是佇列

- 節奏拍：TRADE-OFF
- 卡片文字：
    - 大標：同步還是佇列
    - 內文：
      - 同步寫：Ingest API 直接寫 TSDB，簡單，但尖峰 6,000 msg/s 壓垮 DB
      - Queue 非同步：Kafka 削峰，Consumer 獨立重試，但多一個中介層
      - VCRE 如何打分？看卡片
- 視覺 prompt：取捨拍。TRADE-OFF 雙色膠囊（Deep Teal + Coral Red）。大標。3 行內文。下方 VCRE 計分卡 4 格。底色 Deep Navy。
- 品牌：logo-light.png 右下 64px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：同步寫的優點是簡單——Ingest API 收到資料直接 INSERT，不需要 Kafka。但尖峰 6,000 msg/s × 200B，每秒 1.2 MB 同步打進 TimescaleDB，單節點 PostgreSQL 寫入 QPS 很快就飽和。Queue 非同步多了一個中介層，架構複雜一些，但削峰保護讓整個系統更穩定、可演進。
