# 第 5 章：照片與影片

> 本章引入物件儲存（Blob Storage）與內容傳遞網路（CDN），架構圖從 v5 長出 v6。六拍順序：痛點 → 類比 → 技術（詞彙卡，可拆 2 張）→ 架構圖 → 佐證 + 取捨（合併）→ 畫給我看。
> 共 8 張卡片。

---

### Slide 1 · 痛點開場

- 節奏拍：痛點
- 進度條：服務 300 萬用戶
- 卡片文字：
    - 大標：**食物照片塞爆了資料庫**
    - 內文：
        - 第一行：每家店上傳十張菜單照，三百萬用戶每人存幾張。
        - 第二行：DB 存不下，磁碟空間快滿，備份極慢。
        - 第三行：圖片載入要等五秒，用戶早就離開了。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 300 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個 DB 圓柱方塊（底色 `#1E3450`，邊框 Coral Red `#E8634F` / 4 px），方塊上方堆疊多個小方形 icon（代表圖片檔案，各自不同深淺的 `#1E3450`，邊框 Coral Red / 1 px），數量很多擠成一堆，溢出 DB 方塊邊界。方塊右側有一個容量條，填充至 95%（Coral Red），右端標示「95% FULL」/ JetBrains Mono 500 / 26 px / `#E8634F`。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：圖片和影片的特性與結構性資料完全不同——它們是大型二進位檔案，不適合塞進關聯式資料庫。這個痛要讓學員感受到：DB 是用來存結構化資料的，把大量圖片塞進去是在用錯工具。下一張類比才能讓解法顯得自然。

---

### Slide 2 · 放大痛點：載入慢

- 節奏拍：痛點
- 卡片文字：
    - 大標：**圖片太慢，用戶等不了**
    - 內文：
        - 第一行：台灣用戶連到美國的伺服器，每張圖要等三秒。
        - 第二行：尖峰時段大量請求，Server 傳圖頻寬被佔滿。
        - 第三行：用戶體驗差，直接關掉換競品。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個水平距離示意圖（線條插畫）。左側：手機圖示（線條，Mint `#97E8D6`），標示「台灣用戶」/ Noto Sans TC 500 / 24 px / `#F4F1EA`。右側：Server 方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px，內文「Server（美國）」/ JetBrains Mono / 24 px）。兩者之間的箭頭（Coral Red / 2 px / 虛線，極長，代表遠距）上方標示「3 秒...」/ JetBrains Mono / 34 px / Coral Red。箭頭下方有一個鐘表 icon（線條，Coral Red），秒針指向 3。下方另一個方塊（圓角 16 px，底色 `#1E3450`，邊框 Coral Red / 2 px）：上行「頻寬」/ Noto Sans TC 700 / 28 px / `#F4F1EA`，容量條填滿 100%（Coral Red）。大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在底部 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：兩個痛：儲存問題（DB 塞爆）和速度問題（傳輸太慢）。本章的兩個解法各解一個：Blob Storage 解儲存，CDN 解速度。讓學員在進入類比前先把兩個問題都感受到。

---

### Slide 3 · 生活類比

- 節奏拍：類比
- 卡片文字：
    - 大標：**照片放倉庫，各地開分店就近取**
    - 內文：
        - 第一行：抽屜（DB）放文件；大量照片放專用倉庫。
        - 第二行：全國連鎖店在各城市設分店，就近取貨最快。
        - 第三行：Blob Storage 是倉庫，CDN 是就近的分店。
- 視覺 prompt：1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / 深色文字 Deep Navy `#152238`。畫面中央：兩組插圖並排（線條插畫，Deep Teal `#2E7D86` 線條）：

  左組（Blob Storage 類比）：一個小辦公室抽屜（標「DB 抽屜」/ Noto Sans TC 400 / 24 px / `#152238`，旁邊畫一個大 X Coral Red）旁邊有一個大倉庫建築圖示（標「專用倉庫」/ Noto Sans TC 400 / 24 px / `#152238`，旁邊有 Forest Green 打勾）。抽屜和倉庫之間一條箭頭（Mint）從 X 方向指向倉庫。下方 Caption「照片放倉庫，不塞 DB」/ Noto Sans TC 400 / 26 px / `#152238`。

  右組（CDN 類比）：一個地圖輪廓（台灣 + 部分亞太區，線條），地圖上有三個小店面圖示（各自標「分店」/ Noto Sans TC 400 / 22 px），各自靠近不同地區，各自一條短箭頭（Mint）指向附近的用戶人物圖示。下方 Caption「就近的分店，最快取貨」/ Noto Sans TC 400 / 26 px / `#152238`。

  兩組之間以垂直虛線（Deep Teal / 2 px）分隔。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：兩個類比同時出現，對應兩個技術解法。左邊「辦公室抽屜 vs 倉庫」是最直觀的 Blob Storage 類比；右邊「連鎖店分店」是 CDN 最貼切的描述。第三行直接點名映射關係，讓學員馬上能對上。

---

### Slide 4 · 詞彙卡：Blob Storage

- 節奏拍：技術
- 卡片文字：
    - 大標：**大檔案有專用倉庫**
    - 內文：
        - 第一行：圖片、影片、PDF，統一存進物件儲存。
        - 第二行：DB 只存檔案位置（URL），不存原始檔案。
        - 第三行：儲存成本低，容量近乎無限，方便備份。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「大檔案有專用倉庫」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：

  詞彙卡 A（Blob Storage / 物件儲存）：
  - 上行：`Blob Storage`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `物件儲存`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「專門存放大型二進位檔案，不放進關聯式資料庫」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡下方：一個簡化流程示意圖。左側「App Server」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px，JetBrains Mono / 28 px）。一條箭頭（Mint 實線，標「存 URL」/ JetBrains Mono / 18 px）指向右側「DB」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px），DB 方塊內文字「存 URL」/ JetBrains Mono / 22 px / `#97E8D6`。另一條箭頭（Mint 實線，標「存檔案」/ JetBrains Mono / 18 px）從 App Server 斜向指向下方「Blob Storage」方塊（底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px，內含倉庫 icon，標「S3 / GCS 等」/ JetBrains Mono / 22 px / `#97E8D6`，NEW 標籤提示用）。

  三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：Blob Storage 的核心概念是「DB 只存 URL，真實檔案另存專用服務」。AWS S3、Google Cloud Storage 都是這類服務的實例，讓學員知道這是業界標準，不是自建的奇怪東西。第三行的儲存成本低和容量無限是讓學員感受到這個解法的吸引力。

---

### Slide 5 · 詞彙卡：CDN

- 節奏拍：技術
- 卡片文字：
    - 大標：**把檔案快取到離用戶最近的地方**
    - 內文：
        - 第一行：CDN 在全球各地佈署快取節點（Edge）。
        - 第二行：用戶請求圖片，從最近的節點回傳，毫秒級。
        - 第三行：Origin Server 壓力大減，只需首次傳輸。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「把檔案快取到離用戶最近的地方」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：

  詞彙卡 A（CDN / 內容傳遞網路）：
  - 上行：`CDN`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `內容傳遞網路`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「把靜態資源快取到全球各地節點，就近服務用戶」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡下方：一個 CDN 分佈示意圖（極簡地球輪廓，Deep Navy 底，Mint 線條輪廓）。中央：「Origin」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px，標「Origin Server」/ JetBrains Mono / 24 px）。四個方向各有一個「Edge」方塊（底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px，標「Edge」/ JetBrains Mono / 22 px），以 Mint 箭頭從 Origin 指向各 Edge（標「快取」/ JetBrains Mono / 18 px）。各 Edge 旁邊有一個人形 icon，以極短 Mint 箭頭連結（代表就近服務）。

  三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：CDN 的核心概念是「就近快取」——用戶不需要每次都連到遠端 Origin，從最近的 Edge 節點取資源，速度大幅提升。Cloudflare、AWS CloudFront 都是業界廣泛使用的 CDN 服務，可在旁白中補充，讓學員知道這些服務已經在我們的日常生活裡。

---

### Slide 6 · 架構圖 v6

- 節奏拍：架構圖
- 卡片文字：
    - 大標：**靜態資源走 CDN，大檔案進倉庫**
    - 內文：
        - 第一行：圖片和影片存進 Blob Storage，DB 只存 URL。
        - 第二行：CDN 節點在用戶附近，圖片秒開。
        - 第三行：（留白）
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「靜態資源走 CDN，大檔案進倉庫」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。

  畫面主體為架構圖 v6，延續 v5 佈局，由左至右橫向排列，置中：

  CDN 層（NEW）：最左側加入一個「CDN Edge」方塊（圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px，內文「CDN Edge」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「就近快取」/ `#97E8D6`）。右上角「NEW」標籤（Mini 膠囊 / Mint 底 / Deep Navy 文字 / Inter 700 / 18 px）。CDN Edge 方塊左側有一條箭頭（Mint / 實線）從 Client 指向 CDN Edge（標「靜態請求」/ JetBrains Mono / 18 px）；CDN Edge 右側有一條細虛線箭頭（Mint）指向 Blob Storage（代表 CDN 從 Blob Storage 取源始檔案快取，標「Origin 拉取」/ JetBrains Mono / 18 px）。

  方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v5，無 NEW 標籤）Client 向右的主箭頭依然指向 Load Balancer（API 請求）；另一條向上或向左的箭頭指向 CDN Edge（靜態請求）。

  → 箭頭：Mint / 實線 / 2 px

  方塊 B：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v5，無 NEW 標籤）

  → 箭頭：Mint / 實線，分叉至 Server 群組

  方塊 C：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v5，無 NEW 標籤）

  → 箭頭：Mint，分兩條：一條指向 Cache，一條指向 Primary DB（Write，Coral Red）

  方塊 D：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v5，無 NEW 標籤）

  Blob Storage（NEW）：在架構圖右下方旁掛一個獨立方塊（圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px，內含倉庫 icon + 文字「Blob Storage」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「圖片 · 影片 · 大檔案」/ `#97E8D6`）。右上角「NEW」標籤。Server 方塊以 Mint 箭頭斜向指向 Blob Storage（標「上傳」/ JetBrains Mono / 18 px）。

  資料層（延續 v5 虛線大框，「資料層」）：
    Primary DB（延續 v5，有閃電標示），邊框 Deep Teal / 2 px，無 NEW。
    Replica 1、Replica 2（延續 v5），邊框 Deep Teal / 2 px，無 NEW。
    Health Check（延續 v5），邊框 Deep Teal / 2 px，無 NEW（已從上章帶入）。
    Failover 路徑（延續 v5），邊框 Deep Teal，無 NEW。
    Shard 1、Shard 2（延續 v5），邊框 Deep Teal / 2 px，無 NEW。

  圖右下角標示版本號：「架構圖 v6」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。

  圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v6 在 v5 基礎上長出兩個新方塊：CDN Edge（在 Client 最前面）和 Blob Storage（在 Server 旁邊旁掛）。所有 v5 的方塊保持 Deep Teal 邊框，只有 CDN Edge 和 Blob Storage 用 Mint 邊框加 NEW 標籤。架構圖此時開始有分流概念：靜態資源走 CDN，動態 API 走 Load Balancer，兩條路徑清晰分開。

---

### Slide 7 · 佐證 + 取捨

- 節奏拍：取捨
- 卡片文字：
    - 大標：**全球影音平台靠 CDN 撐起來的**
    - 內文：
        - 第一行：YouTube 每分鐘上傳 500 小時影片，全靠物件儲存。
        - 第二行：Netflix 在全球 4000+ 節點快取，才能一秒開片。
        - 第三行：（C/A/L/Cost 計分卡見視覺 prompt）
- 視覺 prompt：1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「YouTube 和 Netflix 靠 CDN 撐全球影音」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。

  大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，左對齊。

  佐證下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：

  格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「CDN 快取可能短暫落後，更新要等快取過期」/ Noto Sans TC 500 / 26 px / `#F4F1EA`。

  格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ `#F4F1EA` / 48 px。評分：「↑ CDN 節點分散，Origin 掛了 Edge 仍可服務」/ 26 px。

  格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint `#97E8D6` / 48 px。評分：「↑ 就近快取，圖片和影片載入速度大幅提升」/ 26 px。

  格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ `#F4F1EA` / 48 px。評分：「↑ CDN 流量費用 + Blob Storage 費用，但 DB 成本降低」/ 26 px。

  四格下方 Caption：「沒有最好的答案，只有取捨。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。

  右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這章的取捨最直觀：延遲大幅改善、可用性提升，代價是多了一層架構和 CDN + Blob Storage 費用，以及 CDN 快取可能短暫落後（一致性稍降）。讓學員看到：每加一層解法，架構就更複雜、成本就增加，但換來的效能提升是真實的。這是工程師每天面對的權衡。

---

### Slide 8 · 畫給我看

- 節奏拍：預告
- 卡片文字：
    - 大標：**闔上這頁，默畫架構圖 v6**
    - 內文：
        - 第一行：v5 基礎上，Client 前加 CDN，Server 旁加 Blob Storage。
        - 第二行：靜態資源走哪條路？動態 API 走哪條路？
        - 第三行：下章：訂單做好了沒？一直刷新很煩。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v6」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。

  大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。

  文字下方「畫給我看」練習區方塊：
  - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
  - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
  - 方塊內文字（提示）：「默畫 v6。在 Client 前加 CDN Edge，在 Server 旁邊加 Blob Storage。兩條路徑要畫清楚。」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
  - 方塊下方空白區（約 160 px 高）視覺留白

  方塊下方 Caption：「下章揭曉：請求太慢？用佇列讓客人先去坐著等。」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。

  右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v6 的默畫要求學員記住兩條路徑的分流邏輯：靜態資源走 CDN，動態請求走 Load Balancer。提示文字特別說明「兩條路徑要畫清楚」，這是 v6 架構圖最有教學意義的地方。預告「佇列」帶出下章主題，讓學員帶著「那非同步怎麼做」的好奇心離開。
