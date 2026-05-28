# 幕5：落地與演進 — 8-Slide Narrative Draft

> 白皮書 v5 = 開發規範 + 可觀察性 + 演進路線圖。主角仍是 10,000 台設備 IoT 監控系統，幕 3 的 v3 modular monolith 架構已跑起來，幕 4 的韌性層也補上了；本幕回答最後兩個問題：「工程師今天 commit 什麼」與「系統上線後怎麼知道它健不健康」，並給出演進的觸發條件。

---

### Slide 01 · 工程師不知道幹嘛
- 節奏拍：情境（SCENARIO）
- 卡片文字：
  - 大標：工程師不知道幹嘛
  - 內文：
    - 拿到架構圖，還是問「今天 commit 什麼」
    - 上線後沒監控，靠用戶回報才知道壞了
    - 架構師沒做完的最後兩件事
- 視覺 prompt：1920x1080，Deep Navy 底，左側大字顯示「Day 1」與「告警靜默」兩個情境插畫，Coral Red 強調色，SCENARIO kicker 左上角。
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：架構白皮書 v3/v4 寫完了，但工程師拿到 C4 圖，還是不知道今天要 commit 什麼——這是架構師沒說清楚開發規範的問題。上線後也沒有監控儀表板，只能靠用戶打電話說「設備資料停了」才知道系統壞了——這是沒有建立可觀察性的問題。本幕一次補齊這兩件事，產出白皮書 v5。

---

### Slide 02 · 怎麼讓人開工
- 節奏拍：關鍵提問（KEY QUESTIONS）
- 卡片文字：
  - 大標：怎麼讓人開工
  - 內文：
    - 開工問題：分支怎麼開？Lint 怎麼跑？
    - 健康問題：CPU 高了？告警靜默了嗎？
    - 演進問題：何時才該拆微服務？
- 視覺 prompt：1920x1080，Deep Navy 底，三個疑問句佔滿視覺，Mint 強調色，KEY QUESTIONS kicker。
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：本幕要回答三個問題。開工問題——給開發規範，讓工程師第一天就知道怎麼開分支、用什麼 linter、CI 守門什麼。健康問題——建立可觀察性三本柱，告警靜默、CPU 飆高、Consumer lag 積壓，一個都不能漏。演進問題——何時才是拆微服務、引 Event Sourcing/CQRS 的正確時機，給出可量化的觸發條件，不靠直覺。

---

### Slide 03 · 開發護欄
- 節奏拍：方法（METHOD）
- 卡片文字（詞彙卡）：
  - 詞彙卡 1：GitHub Flow — 分支策略，6 人推薦 GitHub Flow，短命分支合 PR；成熟後可走 trunk-based
  - 詞彙卡 2：Linter / Formatter — ruff + black；Python 格式自動化
  - 詞彙卡 3：CI Gate — PR 合併前跑 lint + test；失敗則不可合併
  - 詞彙卡 4：Scaffold — 專案腳手架；新成員 5 分鐘能跑起來
- 視覺 prompt：1920x1080，Deep Navy 底，四個詞彙卡 2×2 排列，Deep Teal 底，Warm White 字，METHOD kicker。
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：開發護欄不是為了限制工程師，是為了讓 6 人小團隊的新成員第一天就知道規則。分支策略：6 人以下推薦 GitHub Flow（短命 feature branch + PR），團隊更成熟後可走 trunk-based；放棄 Git Flow 的 develop/release 分支，那是 10 人以上才有必要的複雜度。Linter + Formatter：Python 用 ruff（快速 lint）+ black（格式化），一個 .pre-commit-config.yaml 統一全團隊。CI Gate：PR 合併前必過 lint + unit test，用 GitHub Actions / GitLab CI，失敗則不可 merge。Scaffold：一個 `make init` 或 `cookiecutter` 模板，新成員 clone repo 後 5 分鐘跑起來，不需要問「怎麼啟動這個 service」。

---

### Slide 04 · 可觀察性三本柱
- 節奏拍：方法（METHOD）
- 卡片文字（詞彙卡）：
  - 詞彙卡 1：Logs — 事件記錄；結構化 JSON，追查是什麼發生了
  - 詞彙卡 2：Metrics — 可聚合數值；CPU、latency、lag，看趨勢
  - 詞彙卡 3：Traces — 跨服務請求路徑；端對端追蹤慢在哪
  - 詞彙卡 4：OpenTelemetry — 三者統一 SDK；一次接入，三類輸出
- 視覺 prompt：1920x1080，Deep Navy 底，四個詞彙卡 2×2 排列，Deep Teal 底，Warm White 字，METHOD kicker。
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：三本柱是可觀察性的基礎。Logs 是事件記錄，「告警 #123 在 14:32:05 觸發」——結構化 JSON 比 print() 方便搜尋。Metrics 是可聚合的數字，CPU 使用率、API 延遲 P99、Kafka Consumer lag，你可以對它畫趨勢圖、設告警閾值。Traces 是跨服務的請求路徑追蹤，一個告警從 Device 到 Alert Service 端對端走了幾毫秒、卡在哪個服務——Traces 告訴你。OpenTelemetry 是把這三者統一的 SDK，用它，你就不必每個服務各自接一套 logging/metrics/tracing 庫。

---

### Slide 05 · 白皮書 v5：開發規範
- 節奏拍：產出物（ARTIFACT）
- 卡片文字：
  - 大標：白皮書 v5：開發規範
  - 主視覺：FastAPI monorepo 專案結構樹 + 開發規範重點
  - 開發規範要點（右側欄）：
    - 分支策略：GitHub Flow，feature/<name>，直接向 main 合 PR
    - Linter：ruff + black，pre-commit hook 自動執行
    - CI Gate：PR 合併前必過 lint + unit test
  - 專案結構樹（左側欄）：
    ```
    iot-monitor/
    ├── ingest/          # 接收上報
    ├── processor/       # 消費 + 告警
    ├── query/           # Dashboard API
    ├── shared/          # 共用程式碼
    ├── tests/
    ├── .pre-commit-config.yaml
    └── pyproject.toml
    ```
- 版本標：白皮書 v5
- 視覺 prompt：1920x1080，Deep Navy 底，左側深色背景程式碼框顯示目錄樹，右側三條開發規範 bullet，ARTIFACT kicker，進度膠囊「架構白皮書 v5 · 落地與演進」。
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：白皮書 v5 的第一個產出：開發規範 + 專案結構。注意這個 monorepo 結構：ingest、processor、query 是三個套件（Python package），不是三個 repo、不是三個微服務——這和幕 3 決定的「modular monolith，不是微服務」一致。shared 套件放公用的 model、config、client。pre-commit-config.yaml 讓 ruff + black 在 commit 前自動執行，不需要 reviewer 浪費時間在格式問題。pyproject.toml 統一 dependency 管理。

---

### Slide 06 · 白皮書 v5：可觀察性
- 節奏拍：產出物（ARTIFACT）
- 卡片文字：
  - 大標：白皮書 v5：可觀察性
  - 主視覺：Diagram（Ingest/Processor/Query → OTel Collector → Prometheus + Grafana + Trace Backend）
  - 演進路線（右側）：
    - 現在：modular monolith，單一 codebase
    - 觸發條件 → 才考慮拆微服務：
      - 團隊 > 20 人 且 部署衝突頻繁
      - 某一模組需獨立擴展（如 Ingest 吞吐量 10×）
      - 商業需求要求不同模組獨立 SLA
- 版本標：白皮書 v5
- 視覺 prompt：左側主圖（programmatic diagram），右側演進路線條列，ARTIFACT kicker，進度膠囊「架構白皮書 v5 · 落地與演進」。
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：白皮書 v5 的第二個產出：可觀察性資料流 + 演進路線圖。三個服務（Ingest API、Processor、Query API）透過 OpenTelemetry SDK 同時輸出 Logs、Metrics、Traces，OpenTelemetry Collector 統一接收後，分發給 Prometheus（指標）和 Grafana（儀表板與告警規則）和 Trace 後端（Tempo 或 Jaeger）。演進路線不是「未來可能要做的事」，是「有觸發條件才做」——團隊 < 20 人、部署沒有嚴重衝突、單一模組不需要獨立擴展，就不要拆微服務。過早拆分的代價是分散式事務、API 版本管理、on-call 人力都要 × N。

---

### Slide 07 · 說服老闆出錢
- 節奏拍：方法（METHOD）
- 卡片文字（詞彙卡 / 句型）：
  - 詞彙卡 1：無實權影響力 — 沒有預算決定權，靠論點說服決策者
  - 詞彙卡 2：因人而異溝通 — 對老闆講錢/風險；對工程師講複雜度
  - 對老闆的句型：「現在每小時停機損失 $20,000；監控投資每月 $300；把故障發現從 30 分鐘壓到 1 分鐘，一次停機就省 > $10,000」
  - 對工程師的句型：「有 Traces，你 15 分鐘找到慢查詢；沒有，你除錯三天」
- 視覺 prompt：1920x1080，Deep Navy 底，兩個詞彙卡 + 兩個引言句框，METHOD kicker，Mint/Teal 對話框視覺。
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：架構師沒有預算決定權，但有說服義務。對老闆，用錢說話：每小時停機 $20,000，監控工具每月 $300（Grafana Cloud free tier 足夠），把故障發現時間從 30 分鐘壓到 1 分鐘，一次停機就省 > $10,000——ROI 非常清楚。對工程師，用時間說話：有 Traces，你 15 分鐘找到慢查詢在哪個服務；沒有，你 print + 猜、除錯三天。因人而異溝通是實用技能，不是政治技巧——同一件事，換一個聽眾聽得懂的語言說清楚。

---

### Slide 08 · 一開始就微服務嗎
- 節奏拍：取捨（TRADE-OFF）
- 卡片文字：
  - 大標：一開始就微服務嗎
  - 內文：
    - 6 人團隊、3 個月 MVP、雲費 < $5,000/月
    - Monolith 先行：結構清楚，可演進
    - 微服務先行：分散式複雜度 Day 1
  - VCRE 計分卡（比較兩個選項）
- 視覺 prompt：1920x1080，Deep Navy 底，TRADE-OFF kicker 雙色 pill，VCRE 四個卡片。
- 品牌：logo 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：本幕最後一個取捨：一開始就拆微服務，還是先做 modular monolith？給定 6 人團隊、3 個月、$5k/月，答案很清楚：modular monolith 先行。V（商業價值）：monolith 先行讓 MVP 3 個月可交付，微服務先行很可能 3 個月沒有可用系統。C（成本）：微服務需要 K8s、Service Mesh、Distributed Tracing Day 1，雲費和人力成本超出預算。R（風險）：分散式事務、服務間 API 版本衝突、on-call 分散，Day 1 的風險是 monolith 的 5 倍。E（可演進）：modular monolith 有清楚的 package 邊界，未來沿邊界拆開是可控的演進，不是重寫。
