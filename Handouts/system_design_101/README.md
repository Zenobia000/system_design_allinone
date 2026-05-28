# 系統設計 101

> 給完全初學者的系統設計入門課 — 從零開始，畫出架構圖，解釋取捨。

---

## 課程定位

| 項目 | 說明 |
|------|------|
| 目標學員 | 會寫一點程式、但從沒考慮過「系統怎麼長大」的完全新手 |
| 課程終點 | 能畫出基本架構圖，並說明每個決定的取捨 |
| 不是什麼 | 不是刷題課、不是求職課、不是程式語言課 |
| 獨立運作 | 本課程為全新獨立課，與其他課程無依賴 |
| 教學語言 | 繁體中文（技術術語附英文對照） |

---

## 主角 App：線上點餐系統

全課程跟著同一個主角成長：**一個線上點餐 App**，從 10 位用戶一路撐到百萬用戶。
每一章，系統就「爆」一次；爆了，才知道為什麼需要下一個技術解藥。

---

## 爆點地圖（10 章總覽）

| # | 章節 | 開場的痛 | 技術解藥 | 架構圖長出什麼 |
|---|------|----------|----------|---------------|
| 0 | 世界觀 | — | 三層架構（Client / Server / DB） | v1：手機 → Server → DB |
| 1 | 人變多 | Server 一台，塞爆 | 水平擴展 + 負載均衡器 | v2：Load Balancer + 多台 Server |
| 2 | 狂看菜單 | DB 每次都重查，太慢 | Cache（快取） | v3：Cache 層加入 |
| 3 | 資料又多又重要 | 訂單爆量，一台 DB 塞不下也讀不動 | 讀取複本 + 分片（Sharding） | v4：Primary + Replica + 分片 |
| 4 | 東西會壞 | 機器會掛、客人按兩次重複扣款 | 容錯複本 + 重試 + 冪等 | v5：備援 + 標出會壞的點 |
| 5 | 照片與影片 | 圖片太大，DB 塞不下 | CDN + 物件儲存 | v6：CDN + Blob Storage |
| 6 | 即時與等待 | 同步處理，一個慢全慢 | 訊息佇列（Message Queue） | v7：Queue + Worker |
| 7 | 找東西（選配） | 關鍵字搜尋太慢 | 搜尋引擎（Search Index） | v7+：Search Index 旁路 |
| 8 | 面試實戰（選修） | 會畫圖，但不知道面試怎麼講 | 需求 → 估算 → v1 → 爆點 → 取捨 | 面試回答 SOP + 投票題示範 |
| 99 | 結業 Capstone | — | 綜合所有章節，設計新系統 | v1 → v7 完整演化 |

---

## 架構圖演化總表

```
v1（Ch0）  手機 ──→ Server ──→ DB
v2（Ch1）  手機 ──→ Load Balancer ──→ [Server × N] ──→ DB
v3（Ch2）  手機 ──→ LB ──→ [Server × N] ──→ Cache → DB
v4（Ch3）  ... → Cache → Primary DB ⇌ Replica DB + 分片（Sharding）
v5（Ch4）  備援節點 + 重試/冪等（防重複扣款），標出會壞的點
v6（Ch5）  CDN ─→ 靜態資源；Blob Storage 旁掛
v7（Ch6）  Message Queue + Worker Pool 非同步處理層
```

每一章只新增「一個能力區塊」，不跳章。部分能力區塊會包含多個元件，例如 v4 的 Primary / Replica / Shard，或 v6 的 CDN / Blob Storage。

---

## 雙螺旋設計

本課程有兩條線索貫穿所有章節，互相強化：

### 螺旋一：架構圖逐章生長
- 每章結尾有「畫給我看」回顧練習
- 學員只需在上一版本加一個能力區塊
- 結業時能默畫完整 v1 → v7

### 螺旋二：C/A/L/Cost 計分卡
- 第 0 章發放四維計分卡
- 每章的技術解藥都從這四個維度評分
- 沒有絕對的最佳解，只有取捨

| 維度 | 縮寫 | 白話問法 |
|------|------|----------|
| 一致性 Consistency | C | 所有人看到的資料一樣嗎？ |
| 可用性 Availability | A | 系統掛掉了還能用嗎？ |
| 延遲 Latency | L | 多快回應？ |
| 成本 Cost | Cost | 要燒多少錢？ |

---

## 六拍節奏

每一章的卡片序列依固定節奏排列（第 0 章免「痛點」拍）：

1. **痛點**（警告紅）— 系統爆了，感受衝擊
2. **類比**（mint）— 用日常生活解釋
3. **技術**（teal）— 帶出術語詞彙卡
4. **架構圖**（navy）— 長出新方塊
5. **佐證**（成功綠）— IG / Uber / 蝦皮也這樣做
6. **取捨**（teal+red）— C/A/L/Cost 複盤

第 8 章是選修橋接章，不強制使用六拍節奏。它改用面試 SOP：問需求 → 估規模 → 畫 v1 → 找爆點 → 講取捨。目標是把 101 的學習成果轉成面試與實務討論時能說出口的回答。

---

## 如何閱讀本課程內容

- 原始草稿：每章一個 `slides.md` 檔案，保留完整敘事脈絡
- 產圖規格：每張投影片一個 `slide-XX.md` 檔案，可直接作為批量產圖輸入
- 每頁規格含 frontmatter、On-slide Text、Beginner Anchor、Visual Spec、GPT Image Prompt、Negative Prompt、Speaker Notes、QA Checklist
- 第 8 章面試實戰頁額外含 Interview Skill、Rubric、Mock Interviewer Prompt、Answer Template、Common Mistakes
- `layout_type: architecture_diagram` 的頁面必須使用 `Diagram Spec` 程式化渲染，不交給圖片模型自由生成架構拓樸
- 視覺風格：**LinkedIn 4:5 可滑動卡片**（1080 × 1350 px）
- 製作時請搭配 `0_STYLE_GUIDE.md` 確保字型、色票、邊距一致
- `slides.md` 是章節草稿；`slide-XX.md` 是單頁產圖規格，仍非最終渲染成品

---

## 產圖工作流

1. 讀取單頁 `slide-XX.md`。
2. 使用 frontmatter 決定產圖方式：
   - `rendering_mode: image_prompt`：可交給 GPT Image 2 產生插畫 / 版面底圖。
   - `rendering_mode: programmatic_diagram`：先用 `Diagram Spec` 產生 SVG / HTML / 其他向量圖，再套用品牌樣式。
3. 若頁面有 `Logo Assets`，使用核准的官方 logo asset 後製疊上，不讓模型仿製品牌標誌。
4. 若頁面有 `Technical Flow Details`，確認最終架構圖完整呈現讀寫路徑、非同步行為、失敗處理與一致性取捨。
5. 最終中文字、logo、頁尾與精準架構圖建議由模板或程式化流程疊上，不依賴圖片模型臨場生成。
6. 出圖前跑每頁 `QA Checklist`，尤其檢查標題字數、色票、邊距、官方 logo 與技術流程是否嚴謹。
