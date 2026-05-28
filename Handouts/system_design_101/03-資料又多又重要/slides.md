# 第 3 章：資料又多又重要

> 本章引入讀取複本（Read Replica）與分片（Sharding），架構圖從 v3 長出 v4。六拍順序：痛點 → 類比 → 技術（詞彙卡）→ 架構圖 → 佐證 → 取捨 → 畫給我看。
> 共 8 張卡片。

---

### Slide 1 · 痛點開場

- 節奏拍：痛點
- 進度條：服務 100 萬用戶
- 卡片文字：
    - 大標：**訂單爆量，一個 DB 快撐不住了**
    - 內文：
        - 第一行：一百萬個訂單，DB 寫入速度越來越慢。
        - 第二行：容量快滿了，每次查詢都要等更久。
        - 第三行：一台 DB 壞掉，所有訂單全部消失。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 100 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個 DB 圓柱方塊（底色 `#1E3450`，邊框 Coral Red `#E8634F` / 4 px）。方塊下方加一個視覺化容量條（進度條樣式），底色 `#1E3450`，填充色 Coral Red `#E8634F`，填充到 90% 以上，代表「快滿了」，右端標示「90% FULL」/ JetBrains Mono 500 / 26 px / `#E8634F`。方塊右側加一個裂縫 icon（線條，Coral Red），代表壓力極限。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這章的痛是雙重的：效能（太慢）加上可靠性（壞了就沒了）。學員要感受到「訂單資料不能消失」這個重量——相比菜單查詢，訂單是金錢，消失代表更大的損失。這種情感重量才能讓後面的解法顯得必要。

---

### Slide 2 · 放大痛點：兩個不同的問題

- 節奏拍：痛點
- 卡片文字：
    - 大標：**一個 DB，同時面對兩個危機**
    - 內文：
        - 第一行：危機一：讀寫請求太多，DB 跑不動。
        - 第二行：危機二：容量快滿，資料快放不下。
        - 第三行：這兩個問題需要不同的解法。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字 / 同 Slide 1 規格。畫面中央：兩個並排的問題方塊，各自圓角 16 px，底色 `#1E3450`，邊框 Coral Red `#E8634F` / 2 px：

  左方塊：頂部小標「危機一」/ Inter 700 / 24 px / Coral Red `#E8634F`。主文字「讀寫太慢」/ Noto Sans TC 700 / 34 px / `#F4F1EA`。下方小字「DB 回應越來越慢，撐不住請求量」/ Noto Sans TC 400 / 26 px / `#F4F1EA` / 行高 1.40。

  右方塊：頂部小標「危機二」/ Inter 700 / 24 px / Coral Red `#E8634F`。主文字「容量不夠」/ Noto Sans TC 700 / 34 px / `#F4F1EA`。下方小字「一台 DB 硬碟有上限，塞不下更多資料」/ Noto Sans TC 400 / 26 px / `#F4F1EA` / 行高 1.40。

  兩方塊中間用「+」文字分隔 / Inter 800 / 48 px / Coral Red `#E8634F`。

  大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：把兩個問題清楚分開是這章最關鍵的教學動作——「讀寫太慢」用複本（Replica）解，「容量不夠」用分片（Sharding）解。兩個問題、兩個解法，學員才不會混淆。

---

### Slide 3 · 生活類比

- 節奏拍：類比
- 卡片文字：
    - 大標：**一台冰箱不夠，怎麼辦？**
    - 內文：
        - 第一行：常用的食物多備幾台冰箱——壞了不怕，備份有。
        - 第二行：東西太多放不下，就依種類分不同冰箱存。
        - 第三行：複本解決「讀太慢」，分片解決「放不下」。
- 視覺 prompt：1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。畫面中央：兩組冰箱插圖（線條插畫，非照片），以深海軍藍 Deep Teal `#2E7D86` 線條繪製：

  左組（複本類比）：一台主冰箱（略大）旁邊有兩台較小的備份冰箱，主冰箱向兩台備份各畫一條箭頭（Mint `#97E8D6`），代表「複製」。三台冰箱排成三角形。下方 Caption「複本：多備幾台，讀取分流」/ Noto Sans TC 400 / 26 px / `#152238`。

  右組（分片類比）：三台冰箱並排，各自貼有標籤（「蔬果」、「肉類」、「飲料」）/ Noto Sans TC 400 / 26 px，代表「分類存放」。下方 Caption「分片：按類型切開，各放各的」/ Noto Sans TC 400 / 26 px / `#152238`。

  兩組之間以垂直分隔線分隔（Deep Teal / 2 px / 虛線）。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：兩個類比同時出現，因為這章有兩個技術解法。左邊「多備幾台」對應複本，右邊「按類型分」對應分片。第三行直接用中文揭曉映射關係，讓學員馬上對得上，不留懸念，下一張再給術語。

---

### Slide 4 · 詞彙卡：Read Replica

- 節奏拍：技術
- 卡片文字：
    - 大標：**讀太慢？加複本來分擔**
    - 內文：
        - 第一行：主 DB（Primary）負責所有寫入。
        - 第二行：複本（Replica）只負責讀取，同步主 DB 的資料。
        - 第三行：讀寫分離，讓兩邊都不會太忙。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「讀太慢？加複本來分擔」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：

  詞彙卡 A：
  - 上行：`Read Replica`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `讀取複本`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「同步主 DB 資料的副本，專門分擔讀取請求」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡下方一個簡化示意圖：左側一個「Primary DB」方塊（邊框 Deep Teal `#2E7D86` / 2 px，底色 `#1E3450`）；右側兩個「Replica」方塊（邊框 Mint `#97E8D6` / 2 px）垂直並列。Primary 向兩個 Replica 各畫一條實線箭頭（Mint，標「同步」/ JetBrains Mono / 18 px）。左上方箭頭（Coral Red `#E8634F`，標「寫入 Write」）射入 Primary；右側箭頭（Mint，標「讀取 Read」）從兩個 Replica 向右射出，指向 Server 示意方塊。

  三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：Read Replica 的核心概念是「讀寫分離」——寫入走 Primary，讀取走 Replica。類比：家裡只有一本帳本（Primary），但可以複印幾份讓家人查帳（Replica），帳本的更新只有主帳本在做，副本同步更新。

---

### Slide 5 · 詞彙卡：Sharding

- 節奏拍：技術
- 卡片文字：
    - 大標：**放不下？把資料切開存**
    - 內文：
        - 第一行：把資料依規則切成多份，各存到不同 DB。
        - 第二行：例如：用戶 1-100 萬存 DB1，101-200 萬存 DB2。
        - 第三行：每台 DB 只存一部分，容量問題解決。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「放不下？把資料切開存」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：

  詞彙卡 A：
  - 上行：`Sharding`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `分片`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「把資料依規則切分，存到多台 DB，解決容量問題」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡下方一個分片示意圖：左側一個大圓角矩形（代表原始大資料，邊框 Coral Red `#E8634F`，標「All Data」/ JetBrains Mono / 26 px）。一個剪刀圖示（線條，Mint `#97E8D6`）在大矩形右側，畫三條切割線。切割後右側出現三個小矩形（各自邊框 Mint `#97E8D6` / 2 px）：標示「Shard 1」、「Shard 2」、「Shard 3」/ JetBrains Mono 500 / 24 px / `#F4F1EA`，垂直並列。每個 Shard 方塊下方有 Caption 例如「用戶 1-100 萬」/ Noto Sans TC 400 / 20 px / `#97E8D6`。

  三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：Sharding 的直觀解釋是「切西瓜」——一個西瓜放不下冰箱，就切開分幾個盒子放。內文第二行的具體數字例子很重要：「用戶 1-100 萬存 DB1」讓抽象概念立刻有了具體感，學員才能真正理解「依規則切」是什麼意思。

---

### Slide 6 · 架構圖 v4

- 節奏拍：架構圖
- 卡片文字：
    - 大標：**DB 變多了，各有分工**
    - 內文：
        - 第一行：Primary DB 負責寫入，Replica 負責讀取。
        - 第二行：資料依規則切片，分存到多台 DB。
        - 第三行：（留白）
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「DB 變多了，各有分工」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。

  畫面主體為架構圖 v4，延續 v3 佈局，由左至右橫向排列，置中：

  方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v3，無 NEW 標籤）

  → 箭頭：Mint / 實線 / 2 px

  方塊 B：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v3，無 NEW 標籤）

  → 箭頭：Mint / 實線，分叉至 Server

  方塊 C（代表 Server 群組，可簡化為一個標示「Server × N」的方塊）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v3，無 NEW 標籤）

  → 箭頭：Mint，分兩條：一條指向 Cache，一條指向 Primary DB（寫入路徑，標「Write」/ JetBrains Mono / 18 px / Coral Red `#E8634F`）

  方塊 D：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v3，無 NEW 標籤）

  → 箭頭：Mint，Cache miss 時指向 Primary DB

  DB 區域（NEW）——右側一個方框群組，圓角矩形大框包圍，框標「資料層」/ Noto Sans TC 500 / 24 px / `#97E8D6`，框邊框 Mint `#97E8D6` / 2 px / 虛線：

    方塊 E（NEW）：較大圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。DB 圓柱圖示 + 「Primary DB」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負責寫入」/ `#97E8D6`。右上角「NEW」標籤。

    → 箭頭：Mint 實線（同步），從 Primary DB 射向下方兩個 Replica 方塊，標「同步」/ JetBrains Mono / 18 px

    方塊 F1、F2（NEW）：各自圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。「Replica 1」、「Replica 2」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負責讀取」/ `#97E8D6`。各自右上角「NEW」標籤。

    → 箭頭：Mint 虛線（表示非同步同步），從 Replica 向 Server 方向回傳讀取結果，標「Read」/ JetBrains Mono / 18 px / Mint

    方塊 G1、G2（NEW）：兩個各自標示「Shard 1」、「Shard 2」的 DB 圓柱方塊，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。下方小字「分片儲存」/ `#97E8D6`。右上角「NEW」標籤。

  圖右下角標示版本號：「架構圖 v4」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。

  圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v4 是 v3 的 DB 區域大幅擴展。Client、Load Balancer、Server、Cache 都延續 v3，保持 Deep Teal 邊框。新增的 Primary DB、Replica 1/2、Shard 1/2 全部用 Mint 邊框加 NEW 標籤。可以用一個虛線大框把「資料層」包起來，讓學員一眼看到「這章的新東西都在這裡」。

---

### Slide 7 · 佐證 + 取捨

- 節奏拍：取捨
- 卡片文字：
    - 大標：**大電商的訂單系統都長這樣**
    - 內文：
        - 第一行：大型電商訂單庫都分片加複本，撐住百億資料。
        - 第二行：但複本可能短暫不同步，跨片查詢變複雜。
        - 第三行：（C/A/L/Cost 打分見視覺 prompt）
- 視覺 prompt：1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「大電商的訂單系統都長這樣」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。

  大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60。

  佐證下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：

  格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「↓ 複本同步有延遲，可能短暫讀到舊資料」/ 26 px / `#F4F1EA`。

  格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ 48 px。評分：「↑ 一台壞掉，複本仍可服務」/ 26 px。

  格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint / 48 px。評分：「讀取分流，延遲改善；跨片查詢延遲升高」/ 26 px。

  格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ 48 px。評分：「↑ 多台 DB，成本倍增，維護複雜度也升高」/ 26 px。

  四格下方 Caption：「沒有最好的答案，只有取捨。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。

  右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這章的取捨比前兩章更複雜：一致性（C）和成本（Cost）都下降，可用性（A）和延遲（L，部分）改善。重點要帶出「複本同步延遲」這個真實存在的問題——這就是後面「最終一致性」概念的伏筆。讓學員意識到「技術債務在累積，沒有免費的擴展」。

---

### Slide 8 · 畫給我看

- 節奏拍：預告
- 卡片文字：
    - 大標：**闔上這頁，默畫架構圖 v4**
    - 內文：
        - 第一行：v3 基礎上，DB 區域長出 Primary + Replica + 分片。
        - 第二行：哪條箭頭是寫入？哪條是讀取同步？
        - 第三行：下章：機器壞了怎麼辦？資料不能消失。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v4」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。

  大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。

  文字下方「畫給我看」練習區方塊：
  - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
  - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
  - 方塊內文字（提示）：「闔上這頁，默畫 v4。Primary 和 Replica 各負責什麼？分片怎麼畫？」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
  - 方塊下方空白區（約 160 px 高）視覺留白

  方塊下方 Caption：「下章揭曉：機器會壞，系統要能撐住」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。

  右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v4 的默畫比前幾章複雜，所以提示文字要更具體：Primary 負責寫、Replica 負責讀、Shard 是切片儲存。預告「機器會壞」帶出下章的容錯主題，讓學員帶著「那 Replica 壞了怎辦？」的問題離開，製造懸念。
