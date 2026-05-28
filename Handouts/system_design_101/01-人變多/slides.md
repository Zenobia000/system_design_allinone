# 第 1 章：人變多

> 本章引入水平擴展與負載均衡器，架構圖從 v1 長出 v2。六拍順序：痛點 → 類比 → 技術（詞彙卡）→ 架構圖 → 佐證 → 取捨 → 畫給我看。
> 共 8 張卡片。

---

### Slide 1 · 痛點開場

- 節奏拍：痛點
- 進度條：服務 1 萬用戶
- 卡片文字：
    - 大標：**中午 12 點，系統整個掛了**
    - 內文：
        - 第一行：訂單全湧進來，一台 Server 扛不住。
        - 第二行：用戶按送出——轉圈圈、無回應、崩潰。
        - 第三行：你的 App 在最忙的時候讓大家失望。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 1 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個 Server 方塊（圓角矩形，邊框 Coral Red `#E8634F` 4 px），方塊內「Server」/ JetBrains Mono / 28 px / `#F4F1EA`，方塊右上角有一個紅色驚嘆號 icon（線條，Coral Red），表示當機。方塊四周以 Coral Red `#E8634F` 細線條（2 px）畫出放射狀衝擊線（5-6 條），暗示爆炸/超載。方塊下方大標「中午 12 點，系統整個掛了」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下角 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ Noto Sans TC 500 / 22 px / `#F4F1EA`，距底部 96 px。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：製造恐慌感。學員要能想像：自己開的店，中午最忙的時刻，客人全部看到轉圈圈。這才是真實的系統設計動力——不是為了炫技，是因為系統真的會爆。

---

### Slide 2 · 診斷：一台扛不住

- 節奏拍：痛點
- 卡片文字：
    - 大標：**問題很簡單：只有一台**
    - 內文：
        - 第一行：一台 Server，記憶體有上限、CPU 有上限。
        - 第二行：同時湧入一萬個請求，資源瞬間耗盡。
        - 第三行：換一台更大的機器？只是延後問題。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字 / 同 Slide 1 規格。畫面中央：一個垂直數字對比區塊，以兩列呈現——左側標示「1 台 Server」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，右側以 JetBrains Mono / 160 px / 900 weight / Coral Red `#E8634F` 呈現巨數字「×」（乘號），代表超載；下方對比行「10,000 請求」/ JetBrains Mono / 80 px / Mint `#97E8D6`。整體視覺傳達嚴重失衡。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：讓學員理解「一台機器就是有天花板」這個物理事實。換更大台只是換更高的天花板，終究還是會爆。這裡埋下「換機器不是解法」的鋪墊，為「多台機器」解法做準備。

---

### Slide 3 · 生活類比

- 節奏拍：類比
- 卡片文字：
    - 大標：**只開一個收銀台，會怎樣？**
    - 內文：
        - 第一行：中午人潮湧入，一個收銀員拚命結帳。
        - 第二行：後面的客人等到天荒地老，氣到走人。
        - 第三行：解法不是換更快的收銀員——是多開幾台。
- 視覺 prompt：1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。畫面中央：一個橫向場景插圖（線條插畫，非照片）。左側：一個收銀台圖示（簡化矩形方塊），台前站著一個人物（線條，服務員姿態）。右側延伸出一條蜿蜒長長的隊伍線條，代表排隊客人（以等距小圓點或小人圖示表示，5-7 個），最後那個小人圖示旁標示一個問號或「？」。整組插圖以 Deep Teal `#2E7D86` 線條繪製，底色 Warm White。圖下方大標「只開一個收銀台，會怎樣？」/ Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：收銀台類比是最直觀的。重點在最後一句：解法不是換更快的收銀員（垂直擴展），而是多開幾台（水平擴展）。學員聽到這句，「哦！」的感覺才出來，然後技術詞彙才登場。

---

### Slide 4 · 詞彙卡：水平擴展 + 負載平衡

- 節奏拍：技術
- 卡片文字：
    - 大標：**兩個詞彙，解決「人太多」**
    - 內文：（以詞彙卡取代一般內文，見視覺 prompt）
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「兩個詞彙，解決「人太多」」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序排列兩張詞彙卡，垂直堆疊，卡片間距 28 px，每張圓角 16 px，底色 Deep Teal `#2E7D86`，內容如下：

  詞彙卡 A：
  - 上行：`Load Balancer`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `負載平衡器`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「把請求分配給多台 Server，不讓一台撐死」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡 B：
  - 上行：`Horizontal Scaling`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `水平擴展`（Noto Sans TC 500 / 34 px / `#F4F1EA`）
  - 下行：「加機器而非換更大的機器，可以無限延伸」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  兩張卡片之字級、色票與詞彙卡格式規範一致。右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：兩個詞同時登場是因為它們總是一起出現——有了水平擴展，才需要負載平衡器來決定「新請求給誰」。術語先記住，細節下一張才說。

---

### Slide 5 · 詞彙卡：Stateless

- 節奏拍：技術
- 卡片文字：
    - 大標：**Server 不能自己記東西**
    - 內文：
        - 第一行：你登入後，下一個請求可能被不同 Server 處理。
        - 第二行：如果 Server 自己記登入狀態，就會出問題。
        - 第三行：解法：把狀態外移到 DB 或 Session Store。
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「Server 不能自己記東西」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：
  - 上行：`Stateless`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `無狀態`（Noto Sans TC 500 / 34 px / `#F4F1EA`）
  - 下行：「每個請求帶齊所有資訊，Server 不記任何狀態」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡下方有一個簡化示意圖：兩台 Server 方塊（邊框 Mint `#97E8D6` 2 px），中間上方一個 Session Store 圓柱方塊（邊框 Deep Teal `#2E7D86` 2 px），兩條虛線箭頭（Mint）從兩台 Server 分別指向 Session Store，代表「狀態外移」。圖示下方三行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：Stateless 是水平擴展能成立的關鍵前提，這個概念很多人卡在這裡。類比：你去任何一家麥當勞點餐，服務員不需要認識你——你只要告訴他你要點什麼就好。Server 也一樣，不記狀態，才能隨意分配請求。

---

### Slide 6 · 架構圖 v2

- 節奏拍：架構圖
- 卡片文字：
    - 大標：**架構長出新方塊了**
    - 內文：
        - 第一行：Load Balancer 站在最前面，分流請求。
        - 第二行：後面多台 Server 一起扛，不再一台孤軍。
        - 第三行：（留白）
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「架構長出新方塊了」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。

  畫面主體為架構圖 v2，由左至右橫向排列，置中：

  方塊 A：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。內含手機 icon（線條）+ 「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ Noto Sans TC 500 / 24 px / `#97E8D6`。（延續 v1，無 NEW 標籤）

  → 箭頭：Mint `#97E8D6` / 實線 / 2 px，左右雙向

  方塊 B（NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px（新增方塊用 Mint 邊框）。內含「Load Balancer」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「負載平衡器」/ Noto Sans TC 500 / 24 px / `#97E8D6`。右上角貼「NEW」Mini 膠囊標籤，Mint `#97E8D6` 底 / Deep Navy `#152238` 文字 / Inter 700 / 18 px。

  → 箭頭：Mint `#97E8D6` / 實線 / 2 px，分叉成兩條，分別指向下方兩台 Server

  方塊 C1、C2（NEW）：各自獨立圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。垂直並列（上下排列或左右排列），各自標示「Server 1」、「Server 2」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「廚房 × N」/ `#97E8D6`。各自右上角有「NEW」標籤。

  → 箭頭：Mint / 實線，從兩台 Server 匯流指向右側 DB

  方塊 D：圓角矩形，底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。DB 圓柱圖示 + 「Database」/ JetBrains Mono / 28 px / `#F4F1EA`。（延續 v1，無 NEW 標籤）

  圖右下角標示版本號：「架構圖 v2」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。

  圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v2 是 v1 長出來的，Client 和 DB 要跟 v1 保持一樣的樣式。新加入的 Load Balancer 和多台 Server 要用 Mint 邊框標示「NEW」，讓學員一眼看到「這次加了什麼」。這張是本章視覺高峰。

---

### Slide 7 · 佐證 + 取捨

- 節奏拍：取捨
- 卡片文字：
    - 大標：**擴展性變好，代價是什麼？**
    - 內文：
        - 第一行：Uber、蝦皮尖峰都靠負載平衡分流。
        - 第二行：但系統更複雜，Session 要外移，成本升高。
        - 第三行：（C/A/L/Cost 打分見視覺 prompt）
- 視覺 prompt：1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「擴展性變好，代價是什麼？」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。

  大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60。

  佐證下方：C/A/L/Cost 四格計分卡（同第 0 章格式，2×2），每格圓角 16 px，間距 20 px：

  格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「Session 外移，一致性設計複雜度升高」/ 26 px / `#F4F1EA`。

  格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ 48 px。評分：「↑ 一台掛掉，其他繼續服務」/ 26 px。

  格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint / 48 px。評分：「多一層轉發，延遲微增」/ 26 px。

  格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ 48 px。評分：「↑ 多台機器，費用倍增」/ 26 px。

  四格下方 Caption：「沒有最好的答案，只有取捨。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。

  右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：佐證和取捨合在一張，讓節奏緊湊。先給佐證（真實世界大公司都這樣做，有效！），再列取捨（但代價是什麼），讓學員同時建立「可行」和「有代價」的雙重認知。C/A/L/Cost 格子從這章開始每章必出現，要讓學員慢慢習慣這個工具。

---

### Slide 8 · 畫給我看

- 節奏拍：預告
- 卡片文字：
    - 大標：**闔上這頁，默畫架構圖 v2**
    - 內文：
        - 第一行：手機 → Load Balancer → 兩台 Server → DB
        - 第二行：哪個方塊是新的？邊框是什麼顏色？
        - 第三行：下章：DB 被打爆了，怎麼辦？
- 視覺 prompt：1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v2」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。

  大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。

  文字下方「畫給我看」練習區方塊：
  - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
  - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
  - 方塊內文字（提示）：「闔上這頁，默畫 v2。Load Balancer 放在哪？幾台 Server？」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
  - 方塊下方空白區（約 160 px 高）視覺留白

  方塊下方 Caption：「下章揭曉：大家瘋狂刷菜單，DB 快打爆了」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。

  右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：「畫給我看」每章結尾必出現，建立習慣。提示文字要點出 v2 的關鍵新增元素（Load Balancer、多台 Server），讓學員知道自己要畫什麼。第三行預告點名下章痛點，帶出 Cache 的前置情境。
