# 第 7 章：找東西（選配 / 進階）

> 選配章。本章為進階補充，主線學員可跳過；完整學完 v7 後再學習搜尋服務如何作為旁路元件接入現有架構。六拍順序：痛點 → 類比 → 技術（詞彙卡）→ 架構圖 v7+ → 佐證 + 取捨（合併）→ 畫給我看。
> 共 6 張卡片。架構圖為 v7+，延續 v7，旁掛 Search Index 元件。

---

### Slide 1 · 痛點開場：LIKE 查詢拖垮 DB

- 節奏拍：痛點
- 進度條：服務 500 萬用戶
- 卡片文字：
    - 大標：**搜尋「附近蛋餅」，慢到逾時**
    - 內文：
        - 第一行：用 DB 的 LIKE 查詢，全表掃一遍才有結果。
        - 第二行：五百萬筆菜單，一次搜尋讓 DB 喘不過氣。
        - 第三行：查不準、又慢，搜尋功能根本沒人用。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 500 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：左側手機圖示（Mint 線條，標「搜尋：附近蛋餅」/ JetBrains Mono / 24 px / `#F4F1EA`），一條箭頭（Coral Red / 2 px）指向「Database」方塊（底色 `#1E3450`，邊框 Coral Red `#E8634F` / 4 px，標「LIKE '%蛋餅%'」/ JetBrains Mono / 22 px / Coral Red）。Database 方塊右側：一個大型沙漏 icon（線條，Coral Red），旁邊標「掃描 500 萬筆...」/ Noto Sans TC 700 / 30 px / Coral Red。Database 方塊下方有一條進度條，填充 99%（Coral Red），標「全表掃描」/ JetBrains Mono / 22 px / Coral Red。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：LIKE 查詢的問題在於：沒有索引可以走，只能全表掃描。筆數越多越慢，關鍵字越模糊越慢。用戶想搜「附近有什麼蛋餅」，卻等到逾時，體驗崩潰。這是電商、外送 App 都一定會碰到的問題，學員應該立刻有共鳴。

---

### Slide 2 · 生活類比

- 節奏拍：類比
- 卡片文字：
    - 大標：**找書不翻全書，用書末的索引**
    - 內文：
        - 第一行：想找「蛋餅」，不會從第一頁翻到最後一頁。
        - 第二行：翻到書末索引，「蛋餅 → 第 42 頁」，直接跳過去。
        - 第三行：索引是提前建好的，查的時候秒回。
- 視覺 prompt：1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / Deep Navy `#152238` 文字。畫面中央：左側一本翻開的書圖示（線條插畫，Deep Teal `#2E7D86` 線條），書頁顯示滿滿文字（細橫線）。書右側箭頭（Deep Teal / 2 px）指向右側「索引頁」圖示：一頁條目列表，第一條醒目標示「蛋餅 → p.42」/ JetBrains Mono / 24 px / `#152238`，其餘條目為淡色。「索引頁」下方 Caption 26 px：「提前整理好，查詢秒回」/ `#152238`。左側書圖示下方 Caption：「一頁一頁翻？太慢了」/ Coral Red `#E8634F` / 26 px。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：書末索引是最直覺的類比——索引是「提前整理好的查找表」，搜尋引擎的反向索引也是一樣的邏輯：提前把「字出現在哪些文件」記下來，查詢時直接查那張表，不需要翻遍所有資料。讓學員先把這個直覺建立起來，下一張才引入技術名詞。

---

### Slide 3 · 詞彙卡：搜尋引擎與反向索引

- 節奏拍：技術
- 卡片文字：
    - 大標：**預先建表，查詢秒回**
    - 內文：
        - 第一行：不等查詢時掃描，提前建好「字 → 文件」的對照表。
        - 第二行：查「蛋餅」，秒找出所有含這個詞的菜單。
        - 第三行：還能依相關性排序，最準的結果排最前。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「預先建表，查詢秒回」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序兩張詞彙卡，垂直堆疊，卡片間距 24 px：

  詞彙卡 A（Search Engine / 搜尋引擎）：
  - 圓角 16 px，底色 Deep Teal `#2E7D86`
  - 上行：`Search Engine`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `搜尋引擎`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「專為全文搜尋設計，能排序相關性，比 DB LIKE 快得多」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  詞彙卡 B（Inverted Index / 反向索引）：
  - 圓角 16 px，底色 Deep Teal `#2E7D86`
  - 上行：`Inverted Index`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `反向索引`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
  - 下行：「預先記錄「字 → 出現的文件列表」，查詢時直接跳到結果」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40

  三行內文在詞彙卡下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：兩個詞彙卡一起出現：Search Engine 是整套系統，Inverted Index 是它的核心機制。不需要深入說明 TF-IDF 或相關性算法——只要讓學員理解「提前建好反向對照表，查詢時不掃全表」這個核心邏輯就夠了。與一般 DB index 的差別點到即止：DB index 是「列的值 → 列位置」；Inverted Index 是「詞語 → 含該詞的文件列表」，後者天生為全文搜尋設計。

---

### Slide 4 · 架構圖 v7+

- 節奏拍：架構圖
- 卡片文字：
    - 大標：**搜尋服務旁掛，資料從 DB 同步過去**
    - 內文：
        - 第一行：搜尋請求不進 DB，改進 Search Index。
        - 第二行：資料寫入 DB 後，非同步同步給搜尋索引。
        - 第三行：（留白）
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「DIAGRAM」/ Inter 700 / 24 px / Deep Navy `#152238` 底色 + Mint `#97E8D6` 左側 4 px 色條 / `#F4F1EA` 文字。大標「搜尋服務旁掛，資料從 DB 同步過去」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。

  畫面主體為架構圖 v7+，延續 v7 全部方塊，佈局由左至右橫向排列，置中：

  CDN Edge（延續 v7，邊框 Deep Teal `#2E7D86` / 2 px，無 NEW 標籤）

  方塊 A（Client）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Client」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「你的手機」/ `#97E8D6`。（延續 v7，無 NEW）

  → 箭頭：Mint / 實線 / 2 px

  方塊 B（Load Balancer）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Load Balancer」/ JetBrains Mono 500 / 28 px。（延續 v7，無 NEW）

  → 箭頭分叉至 Server 群組

  方塊 C（Server × N）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Server × N」/ JetBrains Mono 500 / 28 px。（延續 v7，無 NEW）

  Server 往三個方向延伸：
  - 往右：Mint 箭頭指向 Cache，再指向 Primary DB（Write）
  - 往下：Mint 虛線箭頭指向 Message Queue（延續 v7）
  - 往右下（NEW）：Mint 箭頭指向 Search Index（NEW），標「搜尋請求」/ JetBrains Mono / 18 px

  方塊 D（Cache）：底色 `#1E3450`，邊框 Deep Teal `#2E7D86` / 2 px。「Cache」/ JetBrains Mono 500 / 28 px。（延續 v7，無 NEW）

  搜尋服務群組（NEW）——在架構圖右側加一個方框群組，圓角大框包圍，框標「搜尋服務」/ Noto Sans TC 500 / 24 px / `#97E8D6`，框邊框 Mint `#97E8D6` / 2 px / 虛線：

    方塊 G（Search Index，NEW）：圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px。放大鏡 icon（線條）+ 「Search Index」/ JetBrains Mono 500 / 28 px / `#F4F1EA`，下方小字「反向索引」/ `#97E8D6`。右上角「NEW」標籤（Mini 膠囊 / Mint 底 / Deep Navy 文字 / Inter 700 / 18 px）。

  Primary DB → Search Index：Mint 虛線箭頭，從資料層 Primary DB 指向 Search Index，標「資料同步」/ JetBrains Mono / 18 px / Mint。代表資料寫入 DB 後非同步同步至搜尋索引。

  非同步層（延續 v7，Message Queue + Worker Pool，邊框 Deep Teal / 2 px，無 NEW）。

  資料層（延續 v7 虛線大框，Primary DB、Replica、Shard，邊框 Deep Teal / 2 px，無 NEW）。

  圖右下角標示版本號：「架構圖 v7+」/ JetBrains Mono 500 / 26 px / `#97E8D6` / Caption 規格。

  圖下方兩行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：v7+ 的重點是「旁掛」——Search Index 不是插入主路徑，而是旁路掛上去。搜尋請求走 Search Index，一般讀寫請求走原本的 Server → Cache → DB 路徑。資料從 DB 非同步同步給搜尋索引，這條同步路徑用虛線表示。讓學員看到：加一個新功能，不是把整個架構打掉重做，而是旁路增加一個元件。

---

### Slide 5 · 佐證 + 取捨

- 節奏拍：取捨
- 卡片文字：
    - 大標：**電商搜尋都是獨立搜尋引擎**
    - 內文：
        - 第一行：蝦皮、Momo 等電商搜尋走 Elasticsearch 之類的引擎。
        - 第二行：快又準；代價是多一套系統要維護。
        - 第三行：（C/A/L/Cost 計分卡見視覺 prompt）
- 視覺 prompt：1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「電商搜尋都是獨立搜尋引擎」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。

  大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，左對齊。

  佐證下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：

  格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「↓ DB 寫入後索引非同步更新，搜尋結果可能短暫落後」/ Noto Sans TC 500 / 26 px / `#F4F1EA`。

  格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ `#F4F1EA` / 48 px。評分：「↑ 搜尋服務獨立，搜尋掛了不影響主系統下單」/ 26 px。

  格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint `#97E8D6` / 48 px。評分：「↑ 反向索引查詢遠快於 DB LIKE 全表掃描」/ 26 px。

  格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ `#F4F1EA` / 48 px。評分：「↑ 獨立搜尋服務的運算、儲存費用，資料同步工程成本」/ 26 px。

  四格下方 Caption：「沒有最好的答案，只有取捨。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。

  右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。
- 品牌：logo-dark.png 或 logo-main.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：搜尋引擎的最大取捨是一致性：DB 寫入後，搜尋索引不是立刻更新，有一段同步延遲。大部分搜尋場景可以接受這個最終一致性（剛上架的商品不一定要立刻出現在搜尋結果）。另一個成本是維運：多一套系統就多一套要監控、備份、升版的複雜度。讓學員用 C/A/L/Cost 框架感受到：搜尋引擎在延遲（L）和可用性（A）上有明顯收益，但在一致性（C）和成本（Cost）上需要付出代價。

---

### Slide 6 · 畫給我看

- 節奏拍：預告
- 卡片文字：
    - 大標：**闔上這頁，默畫含搜尋的架構圖**
    - 內文：
        - 第一行：v7 基礎上，右側旁掛一個 Search Index 方塊。
        - 第二行：DB 畫一條虛線箭頭指向 Search Index（資料同步）。
        - 第三行：恭喜完成選配章，你的架構圖升級為 v7+。
- 視覺 prompt：1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / Deep Navy `#152238` 文字。大標「闔上這頁，默畫含搜尋的架構圖」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。

  大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。

  文字下方「畫給我看」練習區方塊：
  - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
  - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
  - 方塊內文字（提示）：「默畫 v7+。在 v7 右側加 Search Index 方塊，從 DB 畫一條虛線同步箭頭到 Search Index。」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
  - 方塊下方空白區（約 160 px 高）視覺留白

  方塊下方 Caption：「v7+ 是選配旁路，加一個方塊，不改動主線。」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。

  右下角 logo-light.png 64 px。頁尾同規格。
- 品牌：logo-light.png 右下 64 px + 頁尾「桑尼資料科學 · 版權所有 ©」
- 旁白：這張收尾強調選配章的設計邏輯：v7+ 是「旁路」，不改動主線架構，只是加一個獨立的搜尋服務旁掛上去。讓學員理解「系統演化不一定是線性的，有時候是旁路擴充」。Caption 點明：加一個方塊，不改動主線，這是微服務拆分的前身思維。
