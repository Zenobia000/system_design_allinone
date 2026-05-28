# 第 2 章：狂看菜單

> 本章引入快取（Cache），架構圖從 v2 長出 v3。六拍順序：痛點 → 類比 → 技術（詞彙卡）→ 架構圖 → 佐證 → 取捨 → 畫給我看。
> 共 8 張卡片。

---

### Slide 1 · 痛點開場

- 節奏拍：痛點
- 進度條：服務 10 萬用戶
- 卡片文字：
    - 大標：**所有人都在刷菜單，DB 快撐不住**
    - 內文：
        - 第一行：每次打開 App，都去 DB 查一次菜單。
        - 第二行：十萬個人同時查，DB 回應越來越慢。
        - 第三行：菜單根本沒變——卻一直重複查一樣的資料。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 10 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個 DB 圓柱方塊（邊框 Coral Red `#E8634F` / 4 px，底色 `#1E3450`），方塊旁顯示「DB」/ JetBrains Mono / 28 px / `#F4F1EA`。方塊四周以 Coral Red 細線條（2 px）畫出多條密集箭頭從左側射入（代表大量查詢請求湧入），箭頭頂端有小的「菜單？」文字標籤 / JetBrains Mono / 18 px / `#97E8D6`。方塊右側加一個溫度計或警示 icon（線條，Coral Red）表示過熱/超載。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這次的痛是「浪費型」的痛——不是系統壞了，是系統在做蠢事：重複查一樣的東西。學員要感受到「這很沒效率」的那種挫折感，才有動力接受快取的解法。

---

### Slide 2 · 放大痛點：重複查詢的浪費

- 節奏拍：痛點
- 卡片文字：
    - 大標：**同一份菜單，查了十萬次**
    - 內文：
        - 第一行：菜單一天只改一次，但十萬個人各查一次。
        - 第二行：DB 被一樣的問題問到崩潰。
        - 第三行：這不是流量問題，是設計問題。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字 / 同 Slide 1 規格。畫面中央：一個視覺對比區塊——左側標示「菜單更新次數」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，下方巨數字「1」/ JetBrains Mono / 160 px / 900 weight / Mint `#97E8D6`（代表一天更新一次）；右側標示「DB 查詢次數」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，下方巨數字「100,000」/ JetBrains Mono / 80 px / 900 weight / Coral Red `#E8634F`。中間以一個雙向「vs」文字分隔 / Inter 800 / 48 px / `#F4F1EA`。大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：「1 vs 100,000」的數字衝擊讓問題一眼看出來。這不是一道算術題，而是讓學員直觀感受到「浪費」有多荒謬。第三行「這不是流量問題，是設計問題」是關鍵轉折——把責任從使用者身上拉回到設計者身上。

---

### Slide 3 · 生活類比

- 節奏拍：類比
- 卡片文字：
    - 大標：**常吃的東西，放冰箱就好**
    - 內文：
        - 第一行：每次想吃優格，都跑一趟超市——很蠢。
        - 第二行：聰明的做法：買一批，放家裡冰箱，要吃就拿。
        - 第三行：「冰箱」就是快取——把熱資料放在手邊。
- 視覺 prompt：1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。畫面中央：一個橫向對比插圖（線條插畫，非照片）。左側：「每次跑超市」場景——一個人物線條站在超市圖示（矩形代表建築）前，以 Coral Red `#E8634F` 的「×」符號標示「低效」，下方 Caption「每次都去 DB 查」/ Noto Sans TC 400 / 26 px / `#152238`。右側：「放冰箱」場景——一個冰箱圖示（簡化矩形），冰箱門微開，露出優格圖示（圓形），以 Forest Green `#5B9770` 的「v」符號標示「高效」，下方 Caption「放快取，直接拿」/ Noto Sans TC 400 / 26 px / `#152238`。兩個場景以 Deep Teal `#2E7D86` 線條繪製，水平並排，中間留一個「→」轉向箭頭（Mint `#97E8D6`）。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：「每次跑超市 vs 放冰箱」是最具體的快取類比。重點是最後一句揭曉：「冰箱就是快取」，讓學員自己在腦中完成類比對應，不要急著解釋，讓 moment of insight 自然發生。

---

### Slide 4 · 詞彙卡：Cache + Cache Hit / Miss

- 節奏拍：技術
- 卡片文字：
    - 大標：**快取三個詞，先背起來**
    - 內文：（以詞彙卡取代一般內文，見視覺 prompt）
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「快取三個詞，先背起來」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序排列三張詞彙卡，垂直堆疊，卡片間距 24 px，每張圓角 16 px，底色 Deep Teal `#2E7D86`：

  詞彙卡 A：
  - 上行：`Cache`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `快取`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「把熱資料存在記憶體，下次直接拿，不去 DB」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡 B：
  - 上行：`Cache Hit`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `快取命中`（Noto Sans TC 500 / 34 px / `#F4F1EA`）
  - 下行：「資料在快取裡找到了，速度快，不打 DB」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡 C：
  - 上行：`Cache Miss`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `快取未命中`（Noto Sans TC 500 / 34 px / `#F4F1EA`）
  - 下行：「快取沒有，只好去 DB 查，然後存回快取」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  三張卡片之字級、色票與詞彙卡格式規範一致。右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：三個詞同時出現——Cache、Cache Hit、Cache Miss——因為 Hit 和 Miss 是 Cache 的使用語言，不能分開教。讓學員一眼看到「快取不是魔法，只是分兩種情況：有就拿，沒有才去查」。

---

### Slide 5 · 數字直覺：記憶體 vs 跨網路

- 節奏拍：技術
- 卡片文字：
    - 大標：**快幾萬倍——不誇張**
    - 內文：
        - 第一行：記憶體讀取：約 100 奈秒（ns）。
        - 第二行：跨網路讀 DB：約 1-10 毫秒（ms）。
        - 第三行：快取命中比去 DB 快了一萬倍。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「快幾萬倍——不誇張」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。

  大標下方：一個橫向延遲對比圖（視覺化條狀圖，非精確數學）。兩條水平色條，由左對齊起始：
  - 上方色條（短）：標示「記憶體」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，色條顏色 Mint `#97E8D6`，條長約 1/8 畫面寬，右端標示「~100 ns」/ JetBrains Mono 500 / 34 px / `#97E8D6`。
  - 下方色條（極長，甚至超出畫面或以箭頭結束）：標示「跨網路 DB」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，色條顏色 Coral Red `#E8634F`，條長約 7/8 畫面寬或以「→」延伸，右端標示「~10 ms」/ JetBrains Mono 500 / 34 px / `#E8634F`。
  - 兩條色條間距 24 px，整組置中於畫面中央。
  - 色條下方一行粗體補充文字「差距：× 100,000 倍」/ JetBrains Mono 900 / 48 px / Mint `#97E8D6`，居中。

  數字對比圖下方三行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。所有數字（100 ns、1-10 ms）以 JetBrains Mono 標注。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：數字要衝擊感。「一萬倍」在文字上說出來不夠，視覺上用條狀圖的長度比例讓學員直接看出差距有多驚人。這張是讓學員「哇！快取值得用！」的說服張，數字要清楚標出單位（ns vs ms），不然沒有感覺。

---

### Slide 6 · 架構圖 v3

- 節奏拍：架構圖
- 卡片文字：
    - 大標：**架構中間多了一層快取**
    - 內文：
        - 第一行：Server 先問快取，有就直接回，不打 DB。
        - 第二行：快取沒有，才去 DB 查，然後存進快取。
        - 第三行：（留白）
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「架構中間多了一層快取」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。

  畫面主體為架構圖 v3，延續 v2 佈局，由左至右橫向排列，置中：

  方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v2，無 NEW 標籤）

  → 箭頭：Mint / 實線 / 2 px，左右雙向

  方塊 B：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負載平衡器」/ `#97E8D6`。（延續 v2，無 NEW 標籤）

  → 箭頭：Mint / 實線 / 2 px，分叉至兩台 Server

  方塊 C1、C2：各自圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server 1」、「Server 2」/ JetBrains Mono / 28 px。（延續 v2，無 NEW 標籤）

  → 箭頭：Mint / 實線，從兩台 Server 指向 Cache（優先路徑）；另有虛線箭頭（Cache Miss 路徑）從 Cache 指向 DB

  方塊 D（NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px（新增方塊用 Mint 邊框）。圖示可用閃電或記憶體 icon（線條）+ 「Cache」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「快取層」/ `#97E8D6`。右上角貼「NEW」Mini 膠囊標籤，Mint `#97E8D6` 底 / Deep Navy `#152238` 文字 / Inter 700 / 18 px。

  → 箭頭：Mint / 實線，從 Cache 指向右側 DB（Cache Miss 時才走）；這條箭頭標注「miss」/ JetBrains Mono / 18 px / `#97E8D6`

  方塊 E：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。DB 圓柱圖示 + 「Database」/ JetBrains Mono / 28 px。（延續 v2，無 NEW 標籤）

  圖右下角標示版本號：「架構圖 v3」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。

  圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v3 是 v2 長出 Cache 方塊。所有 v2 的舊方塊都要維持原樣（Deep Teal 邊框、無 NEW 標籤），只有 Cache 是 Mint 邊框加 NEW 標籤。箭頭要清楚標示兩條路徑：hit 路徑（Server → Cache → 回傳）和 miss 路徑（Server → Cache miss → DB → 回寫 Cache）。

---

### Slide 7 · 佐證 + 取捨

- 節奏拍：取捨
- 卡片文字：
    - 大標：**速度快了，但菜單可能是舊的**
    - 內文：
        - 第一行：幾乎所有大站都靠快取扛讀取流量。
        - 第二行：代價：快取沒更新時，客人看到舊菜單。
        - 第三行：（C/A/L/Cost 打分見視覺 prompt）
- 視覺 prompt：1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「速度快了，但菜單可能是舊的」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。

  大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60。

  佐證下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：

  格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「↓ 快取未更新時，資料可能是舊的」/ 26 px / `#F4F1EA`。

  格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ 48 px。評分：「DB 壓力降低，整體更穩定」/ 26 px。

  格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint / 48 px。評分：「↓ 大幅降低，命中時快幾萬倍」/ 26 px。

  格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ 48 px。評分：「記憶體比 DB 貴，但減少 DB 擴展費用」/ 26 px。

  四格下方 Caption：「沒有最好的答案，只有取捨。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。

  右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：取捨的核心是「一致性 vs 延遲」的拉扯。快取讓 L（延遲）大幅降低，但 C（一致性）下降——客人可能看到已經改掉的舊菜單。這個取捨在電商非常真實（商品價格、庫存都有此問題），要讓學員理解「沒有免費的午餐」。

---

### Slide 8 · 畫給我看

- 節奏拍：預告
- 卡片文字：
    - 大標：**闔上這頁，默畫架構圖 v3**
    - 內文：
        - 第一行：v2 基礎上，在 Server 和 DB 之間加一個 Cache。
        - 第二行：哪條箭頭是 hit？哪條是 miss？
        - 第三行：下章：訂單爆量，一個 DB 放不下了。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v3」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。

  大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。

  文字下方「畫給我看」練習區方塊：
  - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
  - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
  - 方塊內文字（提示）：「闔上這頁，默畫 v3。Cache 放在哪？兩條箭頭分別代表什麼？」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
  - 方塊下方空白區（約 160 px 高）視覺留白

  方塊下方 Caption：「下章揭曉：訂單爆量，一個 DB 再也不夠用了」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。

  右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v3 的默畫要點是：1）Cache 放在 Server 和 DB 之間；2）有兩條路徑（hit 和 miss）；3）舊方塊不加 NEW 標籤。預告點名「一個 DB 再也不夠用」，帶出下章的資料庫分片痛點。
