# 架構師 101（software_architect_101）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `Handouts/software_architect_101/` 產出一門全新獨立的「架構師決策」教學簡報課程，套用 `system_design_101` 的設計邏輯（主角敘事 + 六拍 + 雙螺旋 + `slide-XX.md` 規格驅動產圖），一次補齊全部七章。

**Architecture:** 五個 spec 檔當地基（複刻並改寫 101 的 STYLE_GUIDE/SLIDE_SPEC/DIAGRAM_SPEC/LOGO_ASSETS/README），其上是 7 個章節資料夾（Ch0 + 幕1–5 + Capstone）。主角案例為「即時 IoT 設備監控系統」，貫穿全課；架構白皮書隨幕成長 v1→v5；每個決策用 VCRE 計分卡打分。

**Tech Stack:** Markdown（`slides.md` 草稿 + `slide-XX.md` 單頁規格）、YAML frontmatter、程式化圖規格（C4/領域模型/資料流）。無程式編譯；驗證方式為每頁 `QA Checklist`。

**設計來源：** `docs/superpowers/specs/2026-05-28-software-architect-101-design.md`（唯一真相來源，以下簡稱 SPEC）。

---

## 共用設定（主角案例：即時 IoT 設備監控系統）

> **這組數字在 Ch0 一次定義，幕1–5 + Capstone 全部沿用，不得前後矛盾。** 寫任何一章前先回看這段。

- **產品**：工廠設備即時監控 SaaS（B2B），監控機台的溫度/震動/電流感測器，異常即時告警，目標是降低非計畫停機。
- **規模**：10,000 台設備，每台每 5 秒上報 1 筆 → 平均 ~2,000 msg/s，尖峰 ×3 ≈ **6,000 msg/s**。
- **資料**：每筆 ~200 bytes，每天 ~1.7 億筆，~**35 GB/天** 原始時序資料。
- **SLA**：告警延遲 **P99 < 10 秒**（感測異常 → 通知工廠主管）；可用性 **99.9%**。
- **商業目標**：每小時非計畫停機損失約 $20,000；系統要把平均故障發現時間從 30 分鐘壓到 1 分鐘內。
- **約束**：團隊 6 人（熟 Python、剛碰雲）；初期雲費預算 **< $5,000/月**；**3 個月** 交付 MVP。

## VCRE 計分卡（每個決策頁用）

| 維度 | 縮寫 | 白話問法 |
|---|---|---|
| 商業價值 Value | V | 替業務賺錢/省錢/降風險嗎？ |
| 成本 Cost (TCO) | C | 雲費 + 人力 + 維運總成本？ |
| 風險 Risk | R | 會壞在哪？SPOF？暴增 10 倍撐得住？ |
| 可演進 Evolvability | E | 三年後要改會被卡住嗎？ |

## 架構師六拍（Kicker 中性、不具名引導裝置）

| 序 | 內部拍名 | Kicker | 色 Hex |
|---|---|---|---|
| 1 | 情境 | SCENARIO | Coral Red `#E8634F` |
| 2 | 關鍵提問 | KEY QUESTIONS | Mint `#97E8D6` |
| 3 | 方法 | METHOD | Deep Teal `#2E7D86` |
| 4 | 產出物 | ARTIFACT | Deep Navy `#152238` |
| 5 | 業界佐證 | REAL WORLD | Forest Green `#5B9770` |
| 6 | 取捨 | TRADE-OFF | Teal+Red |

Ch0 專用：INTRO（Deep Teal）、PREVIEW（Mint）。Capstone 可用 `whitepaper_recap`。

## 全課硬性規則（每頁 QA 必查）

1. 標題 ≤ 14 中文字；內文每行 ≤ 18 字、整卡 ≤ 3 行。
2. 畫布 1920×1080，安全邊距 96px；色票只用品牌色票。
3. Kicker 對應正確六拍色。
4. **投影片上無任何來源/出處標註**（不放 `> Source:`）。
5. **投影片上無具名引導裝置**（不出現「委員質詢/蘇格拉底/武僧委員會」）。
6. 提到實名工具/雲服務的頁面有 `Logo Assets`。
7. `rendering_mode: programmatic_diagram` 的頁面有完整 `Diagram Spec` + `Technical Flow Details`。
8. 頁尾「桑尼資料科學 · 版權所有 ©」、logo 右下 64px。

---

## Task 1: Spec 地基（5 個 spec 檔 + logos README）

**Files:**
- Create: `Handouts/software_architect_101/0_STYLE_GUIDE.md`
- Create: `Handouts/software_architect_101/SLIDE_SPEC.md`
- Create: `Handouts/software_architect_101/DIAGRAM_SPEC.md`
- Create: `Handouts/software_architect_101/LOGO_ASSETS.md`
- Create: `Handouts/software_architect_101/README.md`
- Create: `Handouts/software_architect_101/assets/logos/README.md`
- Reference: `Handouts/system_design_101/0_STYLE_GUIDE.md` 等（複刻基底）

- [ ] **Step 1: 建目錄**

Run: `mkdir -p Handouts/software_architect_101/assets/logos`

- [ ] **Step 2: 寫 `0_STYLE_GUIDE.md`**

以 `system_design_101/0_STYLE_GUIDE.md` 為基底，**保留**：畫布規格、字型家族、字級階層、品牌色票、禁用規則、詞彙卡格式、卡片 Prompt 模板、GPT Image 2 使用規則、實名 Logo 使用規則、技術流程嚴謹度、快速自查清單。**改寫**：
- 「六拍視覺編碼」表 → 架構師六拍（SCENARIO/KEY QUESTIONS/METHOD/ARTIFACT/REAL WORLD/TRADE-OFF + INTRO/PREVIEW），色票同上表。
- 「進度條格式」→ 膠囊文字改 `架構白皮書 vN · 幕名`（Mint 底、Deep Navy 字、JetBrains Mono 版本號）。
- 新增「VCRE 計分卡格式」段：四維膠囊（V/C/R/E）+ 白話問法，沿用詞彙卡視覺語言。
- 「架構圖視覺規範」→ 改為「產出物圖視覺規範」，涵蓋 C4 容器圖 / 領域模型(ER) / 關鍵資料流；版本標 `白皮書 vN`。
- 加入硬性規則 4、5（無來源標註、無具名引導裝置）。

- [ ] **Step 3: 寫 `SLIDE_SPEC.md`**

以 101 版為基底。`layout_type` 列表改為：`scenario / key_questions / method / artifact / real_world / tradeoff`，加 Ch0 的 `intro / preview`、Capstone 的 `whitepaper_recap`。Required Sections 沿用 101（On-slide Text / Beginner Anchor / Learning Goal / Visual Spec / Diagram Spec / Logo Assets / Technical Flow Details / GPT Image Prompt / Negative Prompt / Speaker Notes / QA Checklist），新增 `VCRE Scorecard`（tradeoff 頁必備）。新增「No-Citation Rule」「No-Named-Device Rule」兩節。`whitepaper_version` 取代 101 的 `diagram_version`。

- [ ] **Step 4: 寫 `DIAGRAM_SPEC.md`**

以 101 版為基底。Schema 保留 rendering_rules / nodes / edges / node status / edge rules。改寫圖類型為三種：`c4_container`、`domain_model`(ER)、`data_flow`。版本演化語意改成「白皮書產出物 v1→v5」。Flow Detail Expectations 改寫對應各幕：v1 需求無圖、v2 領域模型+ER、v3 C4+資料流(ingest/query/alert 路徑、queue 非同步、cache hit/miss)、v4 故障模式標記(warning 節點)、v5 可觀察性資料流。

- [ ] **Step 5: 寫 `LOGO_ASSETS.md`**

以 101 版為基底。工具清單改：PostgreSQL/TimescaleDB、FastAPI、Apache Kafka、Redis、Docker、Kubernetes、Grafana、Prometheus、OpenTelemetry、AWS（EC2/S3/SQS）。註明「多數已存在 `../../system_design_101/assets/logos/`，可重用或補抓」。保留 provenance 要求與「無官方 logo 改文字 pill」規則。

- [ ] **Step 6: 寫 `README.md`**

涵蓋：課程定位（101 的進階續課）、主角案例與共用設定數字、五幕地圖表（含白皮書 vN）、白皮書演化總表、雙螺旋說明、架構師六拍、產圖工作流（沿用 101）、閱讀路徑。**README 內部可寫知識來源對照（作者用），但須註明「不上版」。**

- [ ] **Step 7: 寫 `assets/logos/README.md`**

說明：本課 logo 多數重用 `system_design_101/assets/logos/`；新工具（TimescaleDB/Grafana/Prometheus/OpenTelemetry/K8s/Docker）若缺再補抓；未確認授權前不 commit scraped logo（沿用 101 規範）。

- [ ] **Step 8: QA + Commit**

逐項確認：六拍色票/Kicker 改對、進度膠囊改白皮書版、VCRE 段存在、無來源標註規則、層級命名一致（`scenario` 不要又寫成 `challenge`）。

```bash
git add Handouts/software_architect_101/0_STYLE_GUIDE.md Handouts/software_architect_101/SLIDE_SPEC.md Handouts/software_architect_101/DIAGRAM_SPEC.md Handouts/software_architect_101/LOGO_ASSETS.md Handouts/software_architect_101/README.md Handouts/software_architect_101/assets/logos/README.md
git commit -m "feat(sa101): add spec scaffold (style guide + slide/diagram/logo specs + README)"
```

---

## Task 2: Ch0 接案世界觀（白皮書 v0）

**Files:**
- Create: `Handouts/software_architect_101/00-接案世界觀/slides.md`
- Create: `Handouts/software_architect_101/00-接案世界觀/slide-01.md` … `slide-07.md`

**Storyboard（7 頁；無 SCENARIO 拍，用 INTRO/PREVIEW）：**

| # | beat / kicker | title(≤14) | Beginner Anchor（一句白話） | rendering_mode | whitepaper |
|---|---|---|---|---|---|
| 01 | INTRO | 你被任命為架構師 | 課程封面：你接到一張 IoT 監控系統的委託單 | image_prompt | |
| 02 | INTRO | 主角：工廠監控系統 | 認識主角案例與共用設定數字（1萬台、6千msg/s、P99<10s） | image_prompt | |
| 03 | METHOD | 架構師不是最強工程師 | 架構師是把商業目標翻成技術決策的人（詞彙卡） | image_prompt | |
| 04 | METHOD | 架構師的五幕地圖 | 你會走過：需求→建模選型→設計→風險→落地演進 | image_prompt | |
| 05 | ARTIFACT | 架構白皮書 v0 | 你的產出物是一份會長大的白皮書，現在是空白委託書 | image_prompt | v0 |
| 06 | METHOD | VCRE 計分卡 | 每個決策都用商業價值/成本/風險/可演進打分 | image_prompt | |
| 07 | PREVIEW | 你的任務開始了 | 五幕預告 + 結業能默畫 v1→v5 | image_prompt | |

- [ ] **Step 1: 寫 `slides.md`**（章節草稿：七頁完整敘事，依 SPEC §8 的 `slides.md` 結構：每頁 大標/內文/視覺 prompt/旁白）。
- [ ] **Step 2: 寫 `slide-01.md`…`slide-07.md`**：每頁照 SPEC §8 必備 frontmatter + 段落。Slide 02 的 `On-slide Text` 必須落實「共用設定」數字。Slide 03/06 是詞彙卡（METHOD）。Slide 05 `whitepaper_version: v0`。全部 `rendering_mode: image_prompt`、`audience_level: intermediate`。
- [ ] **Step 3: QA**：跑全課硬性規則 1–8。特別查：無 SCENARIO 拍、無來源標註、無具名引導裝置、數字與共用設定一致。
- [ ] **Step 4: Commit**

```bash
git add Handouts/software_architect_101/00-接案世界觀/
git commit -m "feat(sa101): add Ch0 接案世界觀 (whitepaper v0)"
```

---

## Task 3: 幕1 需求與約束（白皮書 v1）

**Files:**
- Create: `Handouts/software_architect_101/01-需求與約束/slides.md`
- Create: `Handouts/software_architect_101/01-需求與約束/slide-01.md` … `slide-07.md`

**Storyboard（7 頁，完整六拍）：**

| # | beat / kicker | title(≤14) | Beginner Anchor | rendering_mode | whitepaper |
|---|---|---|---|---|---|
| 01 | SCENARIO | 老闆只說要快要穩 | 模糊形容詞無法施工：快是多快？穩是幾個9？ | image_prompt | |
| 02 | KEY QUESTIONS | 把形容詞逼成數字 | 問出 P99 告警延遲、設備數、可用性目標 | image_prompt | |
| 03 | METHOD | 功能 vs 非功能需求 | 詞彙卡：NFR / SLA / SLO / SLI | image_prompt | |
| 04 | METHOD | 別忘了三種約束 | 詞彙卡：預算 / Deadline / 團隊技能樹 | image_prompt | |
| 05 | ARTIFACT | 白皮書 v1：需求書 | 產出 PRD + NFR 矩陣 + 約束清單（表格） | programmatic_diagram | v1 |
| 06 | REAL WORLD | 多一個9貴十倍 | 99.9% vs 99.99% 的成本差（業界數字） | image_prompt | |
| 07 | TRADE-OFF | 該追求 99.99% 嗎 | VCRE 打分：把可用性拉高一個9值不值 | image_prompt | |

- [ ] **Step 1: 寫 `slides.md`**（七頁敘事，主角數字全用共用設定）。
- [ ] **Step 2: 寫 slide-01…07**：Slide 03/04 詞彙卡。Slide 05 為產出物頁，`rendering_mode: programmatic_diagram` + `Diagram Spec`（NFR 矩陣以表格型 data_flow/`not_applicable` 視情況；若純表格用 image_prompt 也可，但須在 `Visual Spec` 精確描述表格內容）+ `Technical Flow Details`（此頁是需求矩陣，說明各 NFR 如何量測）。Slide 07 含 `VCRE Scorecard` 段。
- [ ] **Step 3: QA**：硬性規則 1–8；查 SLA 數字 = P99<10s / 99.9%，與 Ch0 一致。
- [ ] **Step 4: Commit**

```bash
git add Handouts/software_architect_101/01-需求與約束/
git commit -m "feat(sa101): add 幕1 需求與約束 (whitepaper v1)"
```

---

## Task 4: 幕2 建模與選型（白皮書 v2，合併步驟2+3）

**Files:**
- Create: `Handouts/software_architect_101/02-建模與選型/slides.md`
- Create: `Handouts/software_architect_101/02-建模與選型/slide-01.md` … `slide-08.md`

**Storyboard（8 頁，內容含領域建模 + 技術選型兩段，各一個產出物）：**

| # | beat / kicker | title(≤14) | Beginner Anchor | rendering_mode | whitepaper |
|---|---|---|---|---|---|
| 01 | SCENARIO | 名詞滿天飛 | 沒對齊語言就建表：device/sensor/reading/alert 各說各話 | image_prompt | |
| 02 | KEY QUESTIONS | 核心名詞與邊界 | 問：哪些是核心實體？邊界在哪？誰擁有資料？ | image_prompt | |
| 03 | METHOD | 統一語言與限界 | 詞彙卡：DDD / Ubiquitous Language / Bounded Context | image_prompt | |
| 04 | ARTIFACT | 白皮書 v2：領域模型 | 產出 ER 圖：Device/Sensor/Reading/Threshold/Alert | programmatic_diagram | v2 |
| 05 | KEY QUESTIONS | 時序資料怎麼存 | 35GB/天的時序資料，SQL 還是 NoSQL？ | image_prompt | |
| 06 | METHOD | SQL vs NoSQL | 詞彙卡：ACID vs BASE / 時序資料庫 | image_prompt | |
| 07 | ARTIFACT | 白皮書 v2：技術棧+ADR | 產出技術棧表 + ADR-001（選 TimescaleDB 的理由） | programmatic_diagram | v2 |
| 08 | TRADE-OFF | 時序DB值得嗎 | VCRE 打分：時序DB vs 通用關聯式 | image_prompt | |

- [ ] **Step 1: 寫 `slides.md`**。
- [ ] **Step 2: 寫 slide-01…08**：Slide 04 `programmatic_diagram` + `domain_model` Diagram Spec（節點=實體、邊=關係）+ Technical Flow Details（資料擁有權、聚合根）。Slide 07 `programmatic_diagram`（技術棧表 + ADR 結構）+ `Logo Assets`（PostgreSQL/TimescaleDB/FastAPI…）。Slide 03/06 詞彙卡。Slide 08 含 `VCRE Scorecard`。兩個 ARTIFACT 都標 `whitepaper_version: v2`。
- [ ] **Step 3: QA**：硬性規則 1–8；提到 TimescaleDB/PostgreSQL 頁須有 Logo Assets。
- [ ] **Step 4: Commit**

```bash
git add Handouts/software_architect_101/02-建模與選型/
git commit -m "feat(sa101): add 幕2 建模與選型 (whitepaper v2)"
```

---

## Task 5: 幕3 系統設計（白皮書 v3）

**Files:**
- Create: `Handouts/software_architect_101/03-系統設計/slides.md`
- Create: `Handouts/software_architect_101/03-系統設計/slide-01.md` … `slide-07.md`

**Storyboard（7 頁）：**

| # | beat / kicker | title(≤14) | Beginner Anchor | rendering_mode | whitepaper |
|---|---|---|---|---|---|
| 01 | SCENARIO | 元件兜不起來 | 有模型有技術棧，但怎麼接成系統還是糨糊 | image_prompt | |
| 02 | KEY QUESTIONS | 要微服務嗎 | 問：通訊用 REST/gRPC/Queue？哪裡該 stateless？ | image_prompt | |
| 03 | METHOD | C4 四層視角 | 詞彙卡：Context/Container/Component/Code | image_prompt | |
| 04 | METHOD | 削峰用佇列 | 詞彙卡：Stateless / Cache / Message Queue | image_prompt | |
| 05 | ARTIFACT | 白皮書 v3：C4 圖 | 產出 C4 容器圖：Ingest→Queue→Processor→TSDB | programmatic_diagram | v3 |
| 06 | ARTIFACT | 白皮書 v3：資料流 | 上報路徑 + 告警路徑（同步/非同步、cache hit/miss）+ API 草稿 | programmatic_diagram | v3 |
| 07 | TRADE-OFF | 同步還是佇列 | VCRE 打分：同步處理 vs Queue 非同步 | image_prompt | |

- [ ] **Step 1: 寫 `slides.md`**。
- [ ] **Step 2: 寫 slide-01…07**：Slide 05 `c4_container` Diagram Spec（節點：Device、Ingest API、Message Queue、Processor、TSDB、Query API、Cache、Alert Service；6,000 msg/s 標註）+ Technical Flow。Slide 06 `data_flow` Diagram Spec（write path 同步 ack + async 處理；read path cache hit/miss）+ Technical Flow Details（含 enqueue/ack/retry、告警 P99<10s 路徑）+ `Logo Assets`（Kafka/Redis/FastAPI）。Slide 07 `VCRE Scorecard`。兩 ARTIFACT 標 `whitepaper_version: v3`。
- [ ] **Step 3: QA**：硬性規則 1–8;programmatic 頁有 Diagram Spec + Technical Flow Details;訊息速率與共用設定一致。
- [ ] **Step 4: Commit**

```bash
git add Handouts/software_architect_101/03-系統設計/
git commit -m "feat(sa101): add 幕3 系統設計 (whitepaper v3)"
```

---

## Task 6: 幕4 風險與韌性（白皮書 v4）

**Files:**
- Create: `Handouts/software_architect_101/04-風險與韌性/slides.md`
- Create: `Handouts/software_architect_101/04-風險與韌性/slide-01.md` … `slide-07.md`

**Storyboard（7 頁）：**

| # | beat / kicker | title(≤14) | Beginner Anchor | rendering_mode | whitepaper |
|---|---|---|---|---|---|
| 01 | SCENARIO | TSDB 掛了就瞎了 | 上線前一晚：單點故障會讓整廠監控全黑 | image_prompt | |
| 02 | KEY QUESTIONS | SPOF 在哪 | 問：暴增10倍？queue 塞爆？哪個元件死了最痛？ | image_prompt | |
| 03 | METHOD | 找出單點故障 | 詞彙卡：SPOF / Availability / FMEA 故障模式 | image_prompt | |
| 04 | METHOD | 五種韌性手法 | 詞彙卡：複本 / 重試 / 冪等 / 背壓 / 熔斷 | image_prompt | |
| 05 | ARTIFACT | 白皮書 v4：風險表 | 產出故障模式分析（元件→失效→影響→緩解） | programmatic_diagram | v4 |
| 06 | REAL WORLD | 大廠的混沌工程 | Netflix 主動弄壞自己（業界佐證） | image_prompt | |
| 07 | TRADE-OFF | 多AZ備援值得嗎 | VCRE 打分：多 AZ 備援 vs 成本 | image_prompt | |

- [ ] **Step 1: 寫 `slides.md`**。
- [ ] **Step 2: 寫 slide-01…07**：Slide 05 `programmatic_diagram`——可用 data_flow 標 `warning` 節點（Coral Red 故障標記）標出 SPOF，或表格型 FMEA；附 Technical Flow Details（每個失效模式的偵測與緩解）。Slide 03/04 詞彙卡。Slide 06 Real World（Netflix Chaos Monkey）。Slide 07 `VCRE Scorecard`。Slide 05 標 `whitepaper_version: v4`。
- [ ] **Step 3: QA**：硬性規則 1–8。
- [ ] **Step 4: Commit**

```bash
git add Handouts/software_architect_101/04-風險與韌性/
git commit -m "feat(sa101): add 幕4 風險與韌性 (whitepaper v4)"
```

---

## Task 7: 幕5 落地與演進（白皮書 v5，合併步驟6+7）

**Files:**
- Create: `Handouts/software_architect_101/05-落地與演進/slides.md`
- Create: `Handouts/software_architect_101/05-落地與演進/slide-01.md` … `slide-08.md`

**Storyboard（8 頁，含實施指導 + 演進 + 軟實力）：**

| # | beat / kicker | title(≤14) | Beginner Anchor | rendering_mode | whitepaper |
|---|---|---|---|---|---|
| 01 | SCENARIO | 工程師不知道幹嘛 | 拿到架構圖卻問「今天 commit 什麼」；上線後沒人知系統健不健康 | image_prompt | |
| 02 | KEY QUESTIONS | 怎麼讓人開工 | 問：怎麼開工？上線後怎麼知道活著？何時拆微服務？ | image_prompt | |
| 03 | METHOD | 開發護欄 | 詞彙卡：Git flow / Linter / 專案結構 / scaffold | image_prompt | |
| 04 | METHOD | 可觀察性三本柱 | 詞彙卡：Logs / Metrics / Traces + OpenTelemetry | image_prompt | |
| 05 | ARTIFACT | 白皮書 v5：開發規範 | 產出開發規範 + 建議專案結構 | programmatic_diagram | v5 |
| 06 | ARTIFACT | 白皮書 v5：演進路線 | 可觀察性計畫 + 演進路線（何時微服務/ES/CQRS） | programmatic_diagram | v5 |
| 07 | METHOD | 說服老闆出錢 | 詞彙卡：無實權影響力 / 因人而異溝通 | image_prompt | |
| 08 | TRADE-OFF | 一開始就微服務嗎 | VCRE 打分：單體先行 vs 一開始微服務 | image_prompt | |

- [ ] **Step 1: 寫 `slides.md`**。
- [ ] **Step 2: 寫 slide-01…08**：Slide 05 `programmatic_diagram`（專案結構樹/規範表）。Slide 06 `programmatic_diagram`（演進路線時間軸：MVP 單體→觀測→必要時微服務）+ `Logo Assets`（Grafana/Prometheus/OpenTelemetry/Docker/K8s）。Slide 03/04/07 詞彙卡。Slide 08 `VCRE Scorecard`。兩 ARTIFACT 標 `whitepaper_version: v5`。
- [ ] **Step 3: QA**：硬性規則 1–8;軟實力頁(07)不可流於勵志,要有可複誦句型。
- [ ] **Step 4: Commit**

```bash
git add Handouts/software_architect_101/05-落地與演進/
git commit -m "feat(sa101): add 幕5 落地與演進 (whitepaper v5)"
```

---

## Task 8: Capstone 白皮書整合（v1→v5）

**Files:**
- Create: `Handouts/software_architect_101/99-結業-capstone/slides.md`
- Create: `Handouts/software_architect_101/99-結業-capstone/slide-01.md` … `slide-06.md`

**Storyboard（6 頁）：**

| # | beat / kicker | title(≤14) | Beginner Anchor | rendering_mode | whitepaper |
|---|---|---|---|---|---|
| 01 | whitepaper_recap | 五幕走完了 | 回顧：你從空白委託書走到完整白皮書 | image_prompt | |
| 02 | ARTIFACT | 白皮書演化 v1→v5 | 一張圖看完五份產出物如何長出來 | programmatic_diagram | v1→v5 |
| 03 | ARTIFACT | 一頁式架構白皮書 | 最終成品：IoT 監控系統完整架構決策摘要 | programmatic_diagram | v1→v5 |
| 04 | KEY QUESTIONS | 換你默畫一次 | 練習：不看講義默畫 v1→v5 + 每步關鍵決策 | image_prompt | |
| 05 | TRADE-OFF | VCRE 決策總複盤 | 五幕所有 VCRE 打分一次攤開看取捨 | image_prompt | |
| 06 | PREVIEW | 你能當架構師了 | 結業 + 下一步學習方向 | image_prompt | |

- [ ] **Step 1: 寫 `slides.md`**。
- [ ] **Step 2: 寫 slide-01…06**：Slide 02 `programmatic_diagram`（白皮書 v1→v5 演化總表，類似 101 的架構圖演化總表）。Slide 03 `programmatic_diagram`（一頁式白皮書版面）。Slide 05 把五幕 VCRE 打分彙整。其餘 image_prompt。
- [ ] **Step 3: QA**：硬性規則 1–8;v1→v5 內容與前五章一致無矛盾。
- [ ] **Step 4: Commit**

```bash
git add Handouts/software_architect_101/99-結業-capstone/
git commit -m "feat(sa101): add Capstone 白皮書整合 (v1→v5)"
```

---

## 收尾

- [ ] **全課一致性複查**：開 README 五幕地圖對照各章是否齊全；抽查每章一頁確認無來源標註、無具名引導裝置、數字一致。
- [ ] 依 `superpowers:finishing-a-development-branch` 收尾（合併回 main 由使用者自己 push）。

---

## Self-Review（plan 對 spec 覆蓋檢查）

- SPEC §3 五幕地圖 → Task 2–8 逐章覆蓋（含白皮書 v0→v5）。✔
- SPEC §4 六拍 → 每章 storyboard 的 beat/kicker 欄落實，色票在共用段。✔
- SPEC §5 雙螺旋 → 白皮書 vN 標在每個 ARTIFACT 頁；VCRE 在每章 TRADE-OFF 頁 + Ch0 發卡。✔
- SPEC §6 五個 spec 檔改寫 → Task 1 Step 2–6 逐檔。✔
- SPEC §7 目錄結構 → Task 1 Step 1 + 各章 Files。✔
- SPEC §8 slide-XX.md 段落 + No-Citation/No-Named-Device → Task 1 Step 3 寫進 SLIDE_SPEC；每章 QA 查。✔
- SPEC §10 一次補齊全部章節 → 8 個 Task 一次涵蓋，無 Phase 切分。✔
- 命名一致性：layout_type 一律 `scenario/key_questions/method/artifact/real_world/tradeoff`；版本欄一律 `whitepaper_version`。✔
- 無 placeholder：每章 storyboard 提供具體 title/anchor/beat/rendering_mode/artifact，執行時依 SPEC §8 模板補最終文案與視覺 prompt。
