# 第 4 章：東西會壞

> 本章引入容錯備援（Failover）、重試（Retry）與冪等（Idempotency），架構圖從 v4 長出 v5。六拍順序：痛點 → 類比 → 技術（詞彙卡，可拆 2 張）→ 架構圖 → 佐證 + 取捨（合併）→ 畫給我看。
> 共 8 張卡片。本章是 C/A/L/Cost 框架正式以「框架」之名收斂的一章。

---

### Slide 1 · 痛點開場：機器會掛

- 節奏拍：痛點
- 進度條：服務 100 萬用戶
- 卡片文字：
    - 大標：**機器會掛，網路會斷**
    - 內文：
        - 第一行：Primary DB 突然離線，服務全面中斷。
        - 第二行：Server 重啟中，請求全部逾時等待。
        - 第三行：一個節點壞，整個系統就跟著倒。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 100 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個簡化架構示意（水平三方塊：Client → Server → DB），其中 DB 方塊（圓角矩形，底色 `#1E3450`）邊框改為 Coral Red `#E8634F` / 4 px，方塊右上角有一個閃電符號（線條，Coral Red，代表「當機」），方塊內文字「Primary DB」/ JetBrains Mono 500 / 28 px / `#F4F1EA`。從 Server 到 DB 的箭頭改為 Coral Red 虛線，標示「X 中斷」/ JetBrains Mono / 18 px / Coral Red。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這一章的痛是「硬體本就會壞」——這是任何規模都必須面對的現實，不是優化問題，是生存問題。讓學員感受到：就算前三章的擴展做得再好，硬體故障還是能讓一切瞬間歸零。

---

### Slide 2 · 痛點加深：客人手滑按兩次

- 節奏拍：痛點
- 卡片文字：
    - 大標：**網路一斷，訂單重複了**
    - 內文：
        - 第一行：客人送出訂單，網路卡住沒收到回應。
        - 第二行：客人再按一次，Server 收到兩筆訂單。
        - 第三行：帳戶重複扣款，客服電話打爆。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：兩個並排的問題方塊，各自圓角 16 px，底色 `#1E3450`，邊框 Coral Red `#E8634F` / 2 px：左方塊頂部小標「送出 #1」/ Inter 700 / 24 px / Coral Red。主文字「訂單 A」/ Noto Sans TC 700 / 34 px / `#F4F1EA`。下方小字「$320 元」/ JetBrains Mono / 26 px / `#97E8D6`。右方塊頂部小標「送出 #2（重複）」/ Coral Red。主文字「訂單 A」/ 34 px / `#F4F1EA`。下方小字「$320 元」/ JetBrains Mono / 26 px / Coral Red。兩方塊中間有「×2」文字 / Inter 800 / 64 px / Coral Red `#E8634F`。兩方塊下方：一個寬版方塊，底色 `#1E3450`，邊框 Coral Red / 2 px，內文「扣款兩次」/ Noto Sans TC 700 / 34 px / Coral Red，代表後果。大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在底部 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：第二個痛比機器掛掉更貼近使用者——重複扣款是每個人都能感同身受的噩夢。這讓學員明白「容錯」不只是基礎設施問題，也是業務邏輯問題，冪等性是答案。

---

### Slide 3 · 生活類比

- 節奏拍：類比
- 卡片文字：
    - 大標：**寄重要包裹要簽收，也要備份**
    - 內文：
        - 第一行：簽收確認：包裹送到才算完成，沒收到重寄。
        - 第二行：備份路線：主要快遞掛了，換另一條路送。
        - 第三行：不能寄丟，也不能因重寄而送兩份。
- 視覺 prompt：1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / 深色文字 Deep Navy `#152238`。畫面中央：一個橫向雙路徑插圖（線條插畫，非照片），Deep Teal `#2E7D86` 線條：上方路徑從「寄件人」→ 「主要快遞員」→「收件人（有簽收回條）」；主要快遞員圖示上方畫一個 X（Coral Red / 2 px），表示這條路失敗；下方備援路徑從「寄件人」→「備用快遞員」→「收件人（有簽收回條）」，箭頭用 Mint `#97E8D6`；收件人只有一個（兩條路匯合），右上角有綠色打勾（Forest Green `#5B9770`）。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這個類比同時涵蓋兩個痛：備份路線對應容錯備援（Failover），簽收確認對應冪等（Idempotency）。「不能寄丟，也不能送兩份」是這章最精準的一句話，要讓學員記住。

---

### Slide 4 · 詞彙卡：容錯備援 + 重試

- 節奏拍：技術
- 卡片文字：
    - 大標：**掛了就切，切了再試**
    - 內文：
        - 第一行：Failover：主機掛了，自動切到備援節點。
        - 第二行：健康檢查持續偵測各節點是否存活。
        - 第三行：Retry：失敗了自動重送，但要小心重複。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「掛了就切，切了再試」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序兩張詞彙卡，垂直堆疊，卡片間距 24 px：

  詞彙卡 A（Failover / 容錯備援）：
  - 圓角 16 px，底色 Deep Teal `#2E7D86`
  - 上行：`Failover`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `容錯備援`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「主機掛了，自動切到備援，服務不中斷」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡 B（Retry / 重試）：
  - 圓角 16 px，底色 Deep Teal `#2E7D86`
  - 上行：`Retry`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `重試`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「請求失敗後自動重新送出，等待系統恢復」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  三行內文在詞彙卡下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：Failover 和 Retry 是一對搭檔——Failover 解決硬體層的斷點，Retry 解決網路層的暫時失敗。兩者一起讓系統在局部故障時仍能繼續運作。注意最後一句「但要小心重複」留下懸念，引出下一張的冪等。

---

### Slide 5 · 詞彙卡：冪等

- 節奏拍：技術
- 卡片文字：
    - 大標：**同一個操作做幾次，結果都一樣**
    - 內文：
        - 第一行：送出「訂單 #A001」，不管送幾次只建一筆。
        - 第二行：靠唯一訂單編號去重，防止重複扣款。
        - 第三行：Retry 安全的前提，就是操作必須冪等。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「同一個操作做幾次，結果都一樣」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：

  詞彙卡 A（Idempotency / 冪等）：
  - 上行：`Idempotency`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `冪等`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「同一操作執行多次，效果與執行一次相同」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡下方：一個冪等示意圖。左側一個請求箭頭（Mint `#97E8D6`，標「POST /orders  #A001」/ JetBrains Mono / 24 px），分成三條虛線箭頭（代表送了三次），全部射入中央「Server」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px，內文「Server」/ JetBrains Mono / 28 px / `#F4F1EA`）。Server 方塊右側只射出一條箭頭（Mint 實線），指向「DB」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px），DB 方塊內文「1 筆訂單」/ Noto Sans TC 500 / 26 px / `#97E8D6`。示意圖右上方有一個小標籤「去重 key: #A001」/ JetBrains Mono / 22 px / `#97E8D6`，帶圓角膠囊底色 `#1E3450`。

  三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：冪等是這章最抽象的概念，必須用具體例子讓它變得具體：訂單編號 #A001 就是去重的 key。示意圖的重點是「三條箭頭進去，只產生一筆結果」，讓學員一眼看懂。第三行「Retry 安全的前提」把前後兩張卡的關係明確說出，讓架構感更清晰。

---

### Slide 6 · 架構圖 v5

- 節奏拍：架構圖
- 卡片文字：
    - 大標：**標出會壞的點，加上備援路徑**
    - 內文：
        - 第一行：Primary 掛了，自動切換到 Replica 當主。
        - 第二行：健康檢查隨時偵測，發現掛掉立即切換。
        - 第三行：（留白）
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「標出會壞的點，加上備援路徑」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。

  畫面主體為架構圖 v5，延續 v4 佈局，由左至右橫向排列，置中：

  方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v4，無 NEW 標籤）

  → 箭頭：Mint / 實線 / 2 px

  方塊 B：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v4，無 NEW 標籤）

  → 箭頭：Mint / 實線，分叉至 Server 群組

  方塊 C：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v4，無 NEW 標籤）

  → 箭頭：Mint，分兩條：一條指向 Cache，一條指向 Primary DB（寫入路徑，標「Write」/ JetBrains Mono / 18 px / Coral Red `#E8634F`）

  方塊 D：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v4，無 NEW 標籤）

  → 箭頭：Mint，Cache miss 時指向 Primary DB

  資料層（延續 v4 虛線大框，標「資料層」/ Noto Sans TC 500 / 24 px / `#97E8D6`，框邊框 Mint `#97E8D6` / 2 px / 虛線）：

    方塊 E：「Primary DB」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負責寫入」/ `#97E8D6`，邊框 Deep Teal `#2E7D86` / 2 px。方塊右上角加一個閃電 icon（線條，Coral Red `#E8634F`），標示「會壞的點」/ JetBrains Mono / 18 px / Coral Red，代表潛在故障節點。（延續 v4，非 NEW，但新增閃電標示）

    方塊 F1、F2：「Replica 1」、「Replica 2」/ JetBrains Mono 500 / 28 px，邊框 Deep Teal `#2E7D86` / 2 px。（延續 v4，無 NEW 標籤）

    方塊 G（NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。「Health Check」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「持續偵測節點」/ `#97E8D6`。右上角「NEW」標籤（Mini 膠囊 / Mint `#97E8D6` 底 / Deep Navy `#152238` 文字 / Inter 700 / 18 px）。Health Check 方塊用虛線 Mint 箭頭指向 Primary DB 和 Server，代表偵測。

    備援切換路徑（NEW）：從 Primary DB 到 Replica 1 加一條粗虛線箭頭（Mint `#97E8D6` / 3 px / 虛線），標「Failover」/ JetBrains Mono / 18 px / Mint，代表「Primary 掛了，Replica 接手」。右上角「NEW」標籤貼在箭頭中段。

    方塊 H1、H2（延續 v4，無 NEW）：「Shard 1」、「Shard 2」，邊框 Deep Teal `#2E7D86` / 2 px。

  圖右下角標示版本號：「架構圖 v5」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。

  圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v5 在 v4 基礎上做兩件事：用閃電符號標出會壞的點（Primary DB、Server），加上 Health Check 方塊和 Failover 備援路徑。延續方塊保持 Deep Teal 邊框，新增的 Health Check 和 Failover 路徑用 Mint 邊框 + NEW 標籤。讓學員看到「原來備援是這樣長進架構的」。

---

### Slide 7 · 佐證 + 取捨

- 節奏拍：取捨
- 卡片文字：
    - 大標：**金流系統靠冪等防重複扣款**
    - 內文：
        - 第一行：Stripe 等金流每筆請求帶唯一 key，去重防重複。
        - 第二行：付款要「強一致」；看菜單可以「最終一致」。
        - 第三行：（C/A/L/Cost 計分卡見視覺 prompt）
- 視覺 prompt：1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「金流系統靠冪等防重複扣款」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。

  大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，左對齊。

  佐證下方：一個小對照方塊（圓角 12 px，底色 `#152238`，文字 `#F4F1EA`，邊框 Deep Teal / 1 px，寬幅橫向）：左半「付款 → 強一致 C 優先」/ JetBrains Mono / 24 px / Mint `#97E8D6`；中間分隔線（Coral Red / 1 px）；右半「看菜單 → 最終一致 A/L 優先」/ JetBrains Mono / 24 px / `#97E8D6`。代表 C/A/L/Cost 框架正式收斂：不同場景永遠在四維之間取捨，沒有萬能解。

  對照方塊下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：

  格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「↑ 冪等保障付款不重複，一致性提升」/ Noto Sans TC 500 / 26 px / `#F4F1EA`。

  格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ `#F4F1EA` / 48 px。評分：「↑ Failover 備援讓系統掛了仍可切換服務」/ 26 px。

  格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint `#97E8D6` / 48 px。評分：「健康檢查偵測+切換有秒級延遲，可接受」/ 26 px。

  格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ `#F4F1EA` / 48 px。評分：「↑ 備援節點+健康檢查服務，成本增加」/ 26 px。

  四格下方 Caption：「C/A/L/Cost：每個決定都是四維取捨，沒有免費的保障。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。

  右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這張是本章核心——把 C/A/L/Cost 從「發放工具」升格為「正式框架」。對照方塊清楚說明：不同操作在四維上的優先順序不同，沒有萬能設定。Stripe 的冪等 key 是真實案例，讓學員看到這不只是理論，是業界標準做法。Caption 要明確點名「C/A/L/Cost」四個字母作為框架名，讓學員從此記住這個工具的名字。

---

### Slide 8 · 畫給我看

- 節奏拍：預告
- 卡片文字：
    - 大標：**闔上這頁，默畫架構圖 v5**
    - 內文：
        - 第一行：v4 基礎上，加上健康檢查方塊與備援路徑。
        - 第二行：哪個節點標了「會壞的點」？Failover 往哪切？
        - 第三行：下章：圖片和影片，DB 要怎麼存？
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v5」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。

  大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。

  文字下方「畫給我看」練習區方塊：
  - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
  - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
  - 方塊內文字（提示）：「默畫 v5。在 Primary DB 旁邊加一個會壞的點標示，再加一條 Failover 路徑。」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
  - 方塊下方空白區（約 160 px 高）視覺留白

  方塊下方 Caption：「下章揭曉：照片和影片，塞爆 DB 怎麼辦？」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。

  右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v5 的默畫重點是兩個新增元素：Health Check 方塊和 Failover 路徑。提示文字聚焦在這兩個新東西，讓學員回想本章的核心概念。預告「照片影片塞爆 DB」立刻埋下下一章的衝突，製造好奇心。
