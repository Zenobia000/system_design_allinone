# 第 6 章：即時與等待

> 本章引入訊息佇列（Message Queue）、非同步 Worker 與即時通知，架構圖從 v6 長出 v7。六拍順序：痛點 → 類比 → 技術（詞彙卡，可拆 2 張）→ 架構圖 → 佐證 + 取捨（合併）→ 畫給我看。
> 共 8 張卡片。架構圖 v7 是接近完整的現代後端架構。

---

### Slide 1 · 痛點開場：客人狂刷新

- 節奏拍：痛點
- 進度條：服務 500 萬用戶
- 卡片文字：
    - 大標：**餐還沒好，客人卻在狂刷新**
    - 內文：
        - 第一行：下單後 Server 同步等待後廚，請求卡住不動。
        - 第二行：五百萬用戶每人每秒刷新，Server 被佔滿。
        - 第三行：後廚慢一點，前台全部塞車。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 500 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個水平流程示意圖。左側：手機圖示（Mint 線條，標「Client」/ JetBrains Mono / 24 px / `#F4F1EA`）。一條箭頭（Coral Red / 2 px / 實線）指向中央「Server」方塊（底色 `#1E3450`，邊框 Coral Red `#E8634F` / 4 px，標「Server」/ JetBrains Mono / 28 px）。Server 方塊右側一條箭頭指向「後廚處理」方塊（底色 `#1E3450`，邊框 Coral Red / 2 px，標「Processing...」/ JetBrains Mono / 24 px / Coral Red）。後廚處理方塊右側有一個大型沙漏 icon（線條，Coral Red），右側標示「等待中...」/ Noto Sans TC 700 / 34 px / Coral Red。Server 方塊下方有一個佇列容量條，填充 95%（Coral Red），標「請求積壓」/ JetBrains Mono / 22 px / Coral Red。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：同步處理的問題在於：一個慢操作，把所有後面的請求都卡住了。這讓學員感受到：當處理速度跟不上請求速度，同步架構會崩潰。外送餐點、影片轉檔、寄送郵件——這些都是「不應該同步等」的場景。

---

### Slide 2 · 放大痛點：同步阻塞

- 節奏拍：痛點
- 卡片文字：
    - 大標：**一個慢請求，卡住所有後面的**
    - 內文：
        - 第一行：同步處理：Server 等後廚做完才回應。
        - 第二行：尖峰時段一百個請求同時進來，全部排隊。
        - 第三行：最後進來的用戶，等到逾時直接報錯。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一條垂直請求列（左側），八個請求方塊（圓角矩形，底色 `#1E3450`，邊框 Coral Red `#E8634F` / 1 px）垂直堆疊，各自標示「請求 #1」至「請求 #8」/ JetBrains Mono / 22 px / `#F4F1EA`。最頂端的「請求 #1」有一條箭頭（Mint / 實線）指向右側「Server」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px）。Server 右側一條虛線箭頭（Coral Red）指向「後廚 Processing」方塊（底色 `#1E3450`，邊框 Coral Red / 4 px），旁邊有沙漏 icon（Coral Red），標「慢...」/ Noto Sans TC 700 / 28 px / Coral Red。其餘請求 #2 至 #8 旁邊各有一個等待 icon（小時鐘，Coral Red）。最底部「請求 #8」旁邊有紅色 X icon，標「逾時」/ Noto Sans TC 700 / 26 px / Coral Red。大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在底部 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：視覺重點是「一長排等待的請求」讓人直覺感受到阻塞的可怕。最後一個請求逾時報錯是讓學員記住的痛——逾時在系統設計中是「最壞的失敗方式之一」，因為用戶不知道操作到底有沒有成功。

---

### Slide 3 · 生活類比

- 節奏拍：類比
- 卡片文字：
    - 大標：**號碼牌：拿了就去坐，叫號再來**
    - 內文：
        - 第一行：點完餐拿號碼牌，去坐著，廚房慢慢做。
        - 第二行：好了叫號通知，客人再來取餐。
        - 第三行：窗口不堵車，客人也不用乾等。
- 視覺 prompt：1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / 深色文字 Deep Navy `#152238`。畫面中央：一個三步驟流程插圖（橫向，線條插畫，Deep Teal `#2E7D86` 線條），由左至右：

  步驟一：客人圖示在窗口取號碼牌（號碼牌圖示，標「#42」），下方 Caption「拿號碼牌」/ Noto Sans TC 400 / 26 px / `#152238`。

  → 箭頭（Mint `#97E8D6`，粗 2 px）

  步驟二：廚師圖示在廚房做菜（廚師帽 + 鍋子，線條），下方 Caption「廚房慢慢做」/ Noto Sans TC 400 / 26 px / `#152238`。

  → 箭頭（Mint）

  步驟三：擴音喇叭 icon（線條），旁邊波紋代表聲音，下方 Caption「叫號通知取餐」/ Noto Sans TC 400 / 26 px / `#152238`。

  右側補充：客人坐在椅子上滑手機（放鬆姿態，線條），旁邊小標「不用乾等」/ Noto Sans TC 400 / 24 px / `#152238`。

  大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：號碼牌類比是 Message Queue 最完美的生活映射：號碼牌就是 Queue 裡的訊息，廚房就是 Worker，叫號通知就是推播/長輪詢。這個類比能讓零基礎學員立刻理解「為什麼要非同步」：不是因為技術需要，而是因為讓人可以去做別的事，而不是乾等。

---

### Slide 4 · 詞彙卡：訊息佇列 + 非同步 Worker

- 節奏拍：技術
- 卡片文字：
    - 大標：**請求先排隊，Worker 慢慢處理**
    - 內文：
        - 第一行：Queue：請求進來先排進佇列，立刻回應客人。
        - 第二行：Worker：背景慢慢從 Queue 取出任務處理。
        - 第三行：Server 解放，尖峰流量不再塞車。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「請求先排隊，Worker 慢慢處理」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序兩張詞彙卡，垂直堆疊，卡片間距 24 px：

  詞彙卡 A（Message Queue / 訊息佇列）：
  - 圓角 16 px，底色 Deep Teal `#2E7D86`
  - 上行：`Message Queue`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `訊息佇列`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「請求先排隊等候，Worker 依序取出處理，解耦生產與消費」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡 B（Worker / 背景工作）：
  - 圓角 16 px，底色 Deep Teal `#2E7D86`
  - 上行：`Worker`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `背景工作`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「從 Queue 取出任務，在背景非同步執行，不占用 Server 主線程」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  三行內文在詞彙卡下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：Queue 和 Worker 是一對搭檔，必須一起出現才完整。Queue 負責「接收並保存」，Worker 負責「取出並處理」。這個分工讓 Server 的職責變得單純：只管接請求、丟進 Queue，不管後續多慢，Server 都立刻解放了。

---

### Slide 5 · 詞彙卡：即時通知

- 節奏拍：技術
- 卡片文字：
    - 大標：**Worker 做完了，怎麼告訴客人？**
    - 內文：
        - 第一行：推播通知：Server 主動推送「你的餐好了」。
        - 第二行：長輪詢：Client 問一次，Server 等到有消息才回。
        - 第三行：兩種方式讓客人不用自己一直刷新。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「Worker 做完了，怎麼告訴客人？」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方兩張詞彙卡，垂直堆疊，卡片間距 24 px：

  詞彙卡 A（Push Notification / 推播通知）：
  - 圓角 16 px，底色 Deep Teal `#2E7D86`
  - 上行：`Push Notification`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `推播通知`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「Server 主動推送訊息給 Client，Client 不需輪詢」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡 B（Long Polling / 長輪詢）：
  - 圓角 16 px，底色 Deep Teal `#2E7D86`
  - 上行：`Long Polling`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `長輪詢`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「Client 送出請求，Server 保持連線直到有消息才回應」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  三行內文在詞彙卡下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：即時通知這張是點到為止的入門介紹，不深入展開 WebSocket 等進階機制。Push 和 Long Polling 是最入門的兩個方式，讓學員理解「非同步完成後怎麼回報」這個基本問題。重點是概念，不是實作細節。

---

### Slide 6 · 架構圖 v7

- 節奏拍：架構圖
- 卡片文字：
    - 大標：**非同步層加入，接近完整後端架構**
    - 內文：
        - 第一行：請求進 Queue，Worker 從 Queue 取出慢慢處理。
        - 第二行：Server 只管接收，不再被慢任務拖住。
        - 第三行：（留白）
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「非同步層加入，接近完整後端架構」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。

  畫面主體為架構圖 v7，延續 v6 佈局，由左至右橫向排列，置中：

  CDN Edge（延續 v6，邊框 Deep Teal `#2E7D86` / 2 px，無 NEW 標籤）

  方塊 A（Client）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v6，無 NEW）

  → 箭頭：Mint / 實線 / 2 px

  方塊 B（Load Balancer）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v6，無 NEW）

  → 箭頭：Mint / 實線，分叉至 Server 群組

  方塊 C（Server × N）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v6，無 NEW）

  Server 往兩個方向延伸：
  - 往右：Mint 箭頭指向 Cache，再指向 Primary DB（Write，Coral Red 標示）
  - 往下：Mint 虛線箭頭指向 Message Queue（NEW），標「非同步任務」/ JetBrains Mono / 18 px

  方塊 D（Cache）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v6，無 NEW）

  非同步層（NEW）——在架構圖下方加一個方框群組，圓角大框包圍，框標「非同步層」/ Noto Sans TC 500 / 24 px / `#97E8D6`，框邊框 Mint `#97E8D6` / 2 px / 虛線：

    方塊 E（Message Queue，NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。佇列 icon（三條橫線代表排隊）+ 「Message Queue」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「任務排隊」/ `#97E8D6`。右上角「NEW」標籤（Mini 膠囊 / Mint 底 / Deep Navy 文字 / Inter 700 / 18 px）。

    → 箭頭：Mint / 實線，從 Message Queue 指向右側 Worker Pool

    方塊 F（Worker Pool，NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。齒輪 icon（線條）+ 「Worker × N」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「背景處理」/ `#97E8D6`。右上角「NEW」標籤。Worker Pool 方塊右側一條 Mint 箭頭指向 Primary DB（標「寫入結果」/ JetBrains Mono / 18 px）。Worker Pool 上方一條虛線 Mint 箭頭回指 Server（或 Client，標「通知」/ JetBrains Mono / 18 px / Mint），代表任務完成後推送通知。

  Blob Storage（延續 v6，邊框 Deep Teal `#2E7D86` / 2 px，無 NEW 標籤）：Server 旁旁掛。

  資料層（延續 v6 虛線大框，「資料層」）：
    Primary DB（有閃電標示，延續 v6），邊框 Deep Teal / 2 px，無 NEW。
    Replica 1、Replica 2（延續），邊框 Deep Teal / 2 px，無 NEW。
    Health Check（延續），邊框 Deep Teal / 2 px，無 NEW。
    Failover 路徑（延續），無 NEW。
    Shard 1、Shard 2（延續），邊框 Deep Teal / 2 px，無 NEW。

  圖右下角標示版本號：「架構圖 v7」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。

  圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v7 是全課程架構演化的高點——幾乎所有現代後端系統都有這幾層：LB、Server、Cache、DB（含 Replica 和 Sharding）、CDN、Blob Storage，以及現在加入的 Message Queue + Worker Pool。新增的兩個方塊（Message Queue 和 Worker Pool）用 Mint 邊框 + NEW 標籤，所有延續方塊用 Deep Teal。讓學員站在 v7 面前說：「我看得懂這個架構！」

---

### Slide 7 · 佐證 + 取捨

- 節奏拍：取捨
- 卡片文字：
    - 大標：**外送 App 訂單狀態都走佇列 + 推播**
    - 內文：
        - 第一行：Uber Eats 和 Foodpanda 用 Queue 處理訂單狀態。
        - 第二行：解耦讓系統能扛尖峰；代價是結果不是即時的。
        - 第三行：（C/A/L/Cost 計分卡見視覺 prompt）
- 視覺 prompt：1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「外送 App 訂單狀態都走佇列 + 推播」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。

  大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，左對齊。

  佐證下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：

  格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「↓ 結果是最終一致，使用者不能即時看到處理完成」/ Noto Sans TC 500 / 26 px / `#F4F1EA`。

  格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ `#F4F1EA` / 48 px。評分：「↑ 解耦：後端慢或掛，Queue 仍保住請求不遺失」/ 26 px。

  格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint `#97E8D6` / 48 px。評分：「Server 回應快，但處理完成有時間差，非零延遲」/ 26 px。

  格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ `#F4F1EA` / 48 px。評分：「↑ Queue 服務 + Worker Pool，增加架構複雜度與費用」/ 26 px。

  四格下方 Caption：「沒有最好的答案，只有取捨。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。

  右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：Queue 的最大取捨是一致性：操作不是立刻完成，用戶要等通知。這對某些場景（訂單狀態）是可以接受的，但對某些場景（付款確認）就需要額外的機制確保最終一定完成。讓學員連回第四章的 C/A/L/Cost 框架，感受到「每個章節的技術選擇，都在這四個維度上移動」。

---

### Slide 8 · 畫給我看

- 節奏拍：預告
- 卡片文字：
    - 大標：**闔上這頁，默畫架構圖 v7**
    - 內文：
        - 第一行：v6 基礎上，Server 下方加一條箭頭進 Queue，Queue 接 Worker Pool。
        - 第二行：Worker 做完後，結果往哪走？通知怎麼回？
        - 第三行：恭喜：你已能默畫現代後端完整架構。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v7」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。

  大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。

  文字下方「畫給我看」練習區方塊：
  - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
  - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
  - 方塊內文字（提示）：「默畫 v7。在 Server 下方加 Message Queue，Queue 右邊加 Worker Pool，再畫一條通知回去的箭頭。」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
  - 方塊下方空白區（約 160 px 高）視覺留白

  方塊下方 Caption：「v1 → v7，你已經走完了一個系統從零到現代的完整演化。」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。

  右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這是七章的高潮——v7 是最接近真實後端架構的版本，學員默畫完它，就完成了從 v1 三個方塊到 v7 完整架構的整個旅程。Caption 要給學員成就感：「v1 → v7，你走完了一個完整的系統演化。」這是課程中最值得停下來感受的一刻。
