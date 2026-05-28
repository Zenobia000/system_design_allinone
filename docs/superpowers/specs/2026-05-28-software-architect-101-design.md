# 架構師 101（software_architect_101）課程設計規格

> 設計日期：2026-05-28
> 來源課程設計邏輯：`Handouts/system_design_101/`
> 來源內容：`Handouts/software_architect/架構師.md`（七步流程骨架）+ `Handouts/software_architect/ppt/`（十章知識，當技術解藥）
> 狀態：設計定稿，待轉實作計畫（writing-plans）

---

## 1. 目標與定位

打造一門全新獨立的教學簡報課程，**套用 `system_design_101` 的設計邏輯**，但內容換成「軟體架構師的決策流程」。

| 項目 | 說明 |
|------|------|
| 課程名 | 架構師 101 · The Architect's Decision（暫定） |
| 一句定位 | 「101 教你**畫**架構圖；這門教你**當架構師做決策**」 |
| 受眾 | 已具備基本系統設計概念（例如上過 101）、想學「如何在商業與技術間做架構決策」的工程師 |
| 教學語言 | 繁體中文（技術術語附英文對照） |
| 與既有資產關係 | **全新獨立資料夾，不動 `software_architect/ppt/` 與 `openslide/`** |
| 品牌 | 桑尼資料科學（沿用 101 品牌、色票、頁尾） |

### 非目標（YAGNI）

- 不重做 / 不遷移既有 Marp `ppt/` 課程。
- 不教「如何打造架構師武僧 Agent 系統」本身（`架構師.md` 只當**敘事骨架**，不是產品介紹主題）。
- Phase 1 不產出最終圖檔，只產出規格（`slide-XX.md`），產圖是後續工作流。

---

## 2. 核心設計決策（已與使用者確認）

1. **敘事骨架** = `架構師.md` 的七步架構設計流程（你扮演架構師，武僧委員會用蘇格拉底式提問引導你）。
2. **主角案例** = 即時 IoT 設備監控系統（貫穿全課；對應既有 `ppt/09-case-study`、`SA簡報/S14`）。
3. **第二螺旋計分卡** = **VCRE**：商業價值 Value / 成本 Cost(TCO) / 風險 Risk / 可演進 Evolvability。
4. **章節切法** = **五幕**（合併七步中內容較薄的步驟）+ Ch0 接案世界觀 + Capstone 白皮書整合。
5. **產出格式** = 完整沿用 101 的 `slide-XX.md` 規格驅動產圖（1920×1080、GPT Image + 程式化圖、桑尼品牌）。
6. **資料夾** = `Handouts/software_architect_101/`。

---

## 3. 五幕地圖

主角：即時 IoT 設備監控系統。架構白皮書隨幕成長 v1→v5。

| 章 | 幕名 | = 架構師.md 步驟 | ppt 知識解藥來源 | 白皮書產出 |
|---|------|----------------|-----------------|-----------|
| Ch0 | 接案世界觀 | Orchestrator（總架構師） | Ch1 角色與價值 | v0：空白委託書 + VCRE 計分卡發放 |
| 幕1 | 需求與約束 | 步驟1 需求分析師 | Ch2 需求/SLA、Ch9 成本/期限/團隊約束 | v1：PRD + NFR 矩陣 + 約束清單 |
| 幕2 | 建模與選型 | 步驟2 領域建模 + 步驟3 技術策略 | Ch3 流程/應用類型、Ch4 SQL/NoSQL/選型 | v2：領域模型 + 技術棧 + ADR-001 |
| 幕3 | 系統設計 | 步驟4 系統設計師 | Ch6 組件/SOLID/GoF、Ch7 stateless/cache/queue | v3：C4 圖 + API 草稿 + 資料流 |
| 幕4 | 風險與韌性 | 步驟5 風險評估師 | Ch5 *-ilities、Ch8 進階模式取捨 | v4：風險評估 + 故障模式分析 |
| 幕5 | 落地與演進 | 步驟6 技術主管 + 步驟7 演進守護者 | Ch7 日誌/監控、Ch8 微服務/ES/CQRS、Ch10 軟實力 | v5：開發規範 + 可觀察性 + 演進路線圖 |
| Capstone | 白皮書整合 | 全流程回顧 | 綜合全章 | v1→v5 完整演化 + 一頁式白皮書 |

驗證：ppt 十章（Ch1–Ch10）全部被當「技術解藥」對應到至少一幕。

---

## 4. 架構師六拍（節奏）

保留 101 六拍骨架與色票，微調前兩拍以貼合「決策引導」情境。每幕的 `slide-XX.md` 依此節奏排列；Ch0 免「委員質詢」拍（同 101 Ch0 免痛點）。

| 序 | 101 原拍 | 架構師版拍 | Kicker | 色票 | Hex |
|----|---------|-----------|--------|------|-----|
| 1 | 痛點 | 委員質詢（武僧丟失敗情境/尖銳問題） | CHALLENGE | Coral Red | `#E8634F` |
| 2 | 類比 | 蘇格拉底提問（逼你把形容詞變數字） | SOCRATIC | Mint | `#97E8D6` |
| 3 | 技術 | 方法 / 詞彙卡（PRD、NFR、DDD、C4、ADR…） | METHOD | Deep Teal | `#2E7D86` |
| 4 | 架構圖 | 產出物（本步驟讓白皮書 +1） | ARTIFACT | Deep Navy | `#152238` |
| 5 | 佐證 | 業界佐證（大廠怎麼做） | REAL WORLD | Forest Green | `#5B9770` |
| 6 | 取捨 | VCRE 取捨（四維打分） | TRADE-OFF | Teal + Red | `#2E7D86` + `#E8634F` |

Ch0 專用拍：`INTRO`（登場，Deep Teal）、`PREVIEW`（預告，Mint）。

---

## 5. 雙螺旋

### 螺旋一：架構白皮書逐幕生長（對應 101 的架構圖 v1→v7）

- 每幕只長**一份核心產出物**，累積成完整架構白皮書。
- 進度膠囊由 101 的「服務 N 用戶」改為「**架構白皮書 vN · 幕名**」。
- 每幕結尾有「畫給我看 / 補白皮書」回顧練習：學員只需在上一版加一份產出物。
- Capstone 能默寫 v1→v5 完整白皮書。

### 螺旋二：VCRE 計分卡（對應 101 的 C/A/L/Cost）

| 維度 | 縮寫 | 白話問法 |
|------|------|----------|
| 商業價值 Value | V | 這個決策替業務賺錢/省錢/降風險嗎？ |
| 成本 Cost (TCO) | C | 總體擁有成本多少？（雲費 + 人力 + 維運） |
| 風險 Risk | R | 會壞在哪？SPOF？流量暴增 10 倍撐得住？ |
| 可演進 Evolvability | E | 三年後要改，這決定會卡住我們嗎？ |

- Ch0 發放四維計分卡。
- 每個架構決策從 VCRE 四維評分，凸顯「沒有絕對最佳解，只有取捨」。

---

## 6. 規格檔改寫清單（複刻 101 的五個 spec，逐一調整）

以 `Handouts/system_design_101/` 對應檔為基底改寫：

| 檔案 | 沿用 | 需改寫 |
|------|------|--------|
| `0_STYLE_GUIDE.md` | 畫布 1920×1080、安全邊距 96px、字型家族、品牌色票、字數硬上限、詞彙卡格式 | 六拍視覺編碼 → 架構師六拍；進度條 → 「架構白皮書 vN」；計分卡 → VCRE；架構圖視覺規範 → C4/領域模型/資料流 |
| `SLIDE_SPEC.md` | frontmatter 結構、必備段落、Title Rule、Logo Rule | `layout_type` 換成 `challenge / socratic / method / artifact / real_world / tradeoff`（+ Ch0 的 `intro / preview`、Capstone 的 `whitepaper_recap`）；`diagram_version` 範圍 v1→v5 |
| `DIAGRAM_SPEC.md` | rendering_mode 機制、節點/邊規則、JetBrains Mono 標籤 | 程式化圖類型改為 **C4 容器圖 / 領域模型(ER) / 關鍵資料流**；版本演化語意改為「白皮書產出物 v1→v5」而非擴展性架構 |
| `LOGO_ASSETS.md` | logo 原則、Logo Strip 規格、provenance 要求 | 工具清單改架構師課用到的（PostgreSQL、FastAPI、Kafka、Redis、Docker、Kubernetes、Grafana、OpenTelemetry…）；**多數已在 `system_design_101/assets/logos/` 抓過，可重用** |
| `README.md` | 課程閱讀方式、產圖工作流 | 課程定位、五幕地圖、白皮書演化總表、雙螺旋、架構師六拍 |

---

## 7. 目錄結構

```
Handouts/software_architect_101/
├── 0_STYLE_GUIDE.md
├── SLIDE_SPEC.md
├── DIAGRAM_SPEC.md
├── LOGO_ASSETS.md
├── README.md
├── assets/
│   └── logos/
│       └── README.md          # 沿用 101 既有素材，必要時補抓
├── 00-接案世界觀/
│   ├── slides.md              # 章節草稿（完整敘事）
│   └── slide-XX.md            # 每頁產圖規格
├── 01-需求與約束/
│   ├── slides.md
│   └── slide-XX.md
├── 02-建模與選型/
├── 03-系統設計/
├── 04-風險與韌性/
├── 05-落地與演進/
└── 99-結業-capstone/
```

### 命名規範（沿用 101）

- 章節資料夾：`NN-中文幕名/`（`00` 世界觀、`99` capstone）。
- 草稿：每章一個 `slides.md`。
- 單頁規格：`slide-XX.md`（兩位數補零）。

---

## 8. 單頁 `slide-XX.md` 規格（沿用 101 + 架構師調整）

每頁 frontmatter 必備欄位（沿用 101，值改架構師版）：

```yaml
chapter: "幕 N：幕名"
chapter_id: "NN"
chapter_slug: "NN-幕名"
slide: "1"
title: "≤ 14 中文字短標"
original_title: "來源大標"
beat: "委員質詢 / 蘇格拉底提問 / 方法 / 產出物 / 業界佐證 / 取捨"
kicker: "CHALLENGE / SOCRATIC / METHOD / ARTIFACT / REAL WORLD / TRADE-OFF"
layout_type: "challenge"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""          # 產出物頁填 v1..v5，其他頁留空
rendering_mode: "image_prompt"  # 或 programmatic_diagram
```

必備段落（沿用 101）：

- `On-slide Text`、`Beginner Anchor`、`Learning Goal`、`Visual Spec`
- `Diagram Spec`（C4/領域模型/資料流頁填 YAML，其他頁 `not_applicable: true`）
- `Logo Assets`（提到實名工具/雲服務時必填）
- `Technical Flow Details`（正式架構/資料流圖頁必備：讀寫路徑、同步/非同步、失敗處理）
- `GPT Image Prompt`、`Negative Prompt`、`Speaker Notes`、`QA Checklist`

架構師課新增段落（取捨頁 / 決策頁建議）：

- `VCRE Scorecard`：本決策在商業價值 / 成本 / 風險 / 可演進四維的評分與理由。

---

## 9. 產圖工作流與品牌（沿用 101）

1. 讀單頁 `slide-XX.md`，依 `rendering_mode` 決定產圖方式。
2. `image_prompt` → GPT Image 2 產底圖/插畫；`programmatic_diagram` → 由 `Diagram Spec` 程式化渲染 C4/領域/資料流圖。
3. GPT Image 2 不決定最終中文字、不決定架構拓樸、不仿製品牌 logo。
4. Logo 用核准官方素材後製疊上；多數工具 logo 已存在 `system_design_101/assets/logos/`，可重用或軟連結。
5. 頁尾固定「桑尼資料科學 · 版權所有 ©」，logo 右下 64px。
6. 出圖前跑每頁 `QA Checklist`。

---

## 10. 建置計畫（分階段）

### Phase 1（本次 spec 主範圍 → 第一份實作計畫）

把格式端到端跑通，鎖定可複製的樣板：

1. 五個 spec 檔（`0_STYLE_GUIDE` / `SLIDE_SPEC` / `DIAGRAM_SPEC` / `LOGO_ASSETS` / `README`）。
2. `assets/logos/README.md`（重用 101 素材的說明）。
3. **Ch0 接案世界觀**整章（`slides.md` + 全部 `slide-XX.md`）。
4. **幕1 需求與約束**整章（`slides.md` + 全部 `slide-XX.md`）當第一個內容樣板。

驗收：Ch0 + 幕1 每頁通過自身 QA Checklist；六拍、進度膠囊、VCRE 計分卡、白皮書 v1 產出物都正確呈現。

### Phase 2+（各自獨立 plan）

- 幕2 建模與選型（白皮書 v2）
- 幕3 系統設計（白皮書 v3）
- 幕4 風險與韌性（白皮書 v4）
- 幕5 落地與演進（白皮書 v5）
- Capstone 白皮書整合（v1→v5）

---

## 11. 成功標準

- 任何人讀 `README.md` 能在 2 分鐘內理解五幕地圖、雙螺旋、六拍。
- 任一 `slide-XX.md` 能獨立交付產圖流程，不需讀完整章草稿。
- Ch0 + 幕1 樣板能被直接複製套用到幕2–5，無需重新發明結構。
- 全課視覺與 `system_design_101` 同調（同品牌、同畫布、同 spec 哲學），但內容與節奏明確是「架構師決策」而非「系統擴展」。

---

## 12. 風險與注意事項

- **顆粒度不均**：幕2、幕5 各合併兩個步驟，內容量大；產內容時注意每幕張數控制（建議每幕 6–8 頁，與 101 一致）。
- **主角一致性**：IoT 監控系統的設定（裝置數、訊息頻率、SLA）須在 Ch0 一次定義清楚，後續各幕沿用同一組數字，避免前後矛盾。
- **logo 授權**：沿用 101 既有素材；公開上線前須確認商標使用條款（同 101 的 `LOGO_ASSETS` 規範）。
