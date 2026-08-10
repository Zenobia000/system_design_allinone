# 角色 × 不確定性 對照資料表

> **核心命題**：角色不是用職稱分，而是用「負責消除哪一種不確定性」來分。
> 少一個角色，那種不確定性就沒人負責——就會在某天爆炸。

**素材來源**（Handouts 內既有教材，已整併去重）：

| 檔案 | 提供的欄位 |
|---|---|
| `software_develop_journey/ppt/01-big-picture/03_uncertainty_ladder.md` | 不確定性、缺席代價、抽象度方向 |
| `software_develop_journey/ppt/90-appendix/00_role_cheatsheet.md` | 蓋房子對應、一句話、經典產出 |
| `software_develop_journey/ppt/0X-*/99_recap.md`（9 章） | 工具、AI 取代不了的、常見誤解、交棒對象 |
| `software_develop_journey/ppt/11-collaboration/02_overlap_matrix.md` | 拍板決策 |
| `software_develop_journey/ppt/11-collaboration/03_three_views.md` | 三層 Flow 翻譯 |
| `ai_native_system_design/ppt/01-sdlc-overview/02_uncertainty_ladder.md` | AI 版失敗代價 |
| `ai_native_system_design/ppt/01-sdlc-overview/03_ai_matrix.md` | AI 可代勞 / 取代不了、AI 強區弱區 |
| `ai_native_system_design/ppt/01-sdlc-overview/04_pm.md` ~ `12_devops.md` | 各角色的判斷力核心、AI 強 / 弱 / 陷阱 |

---

## 表 A · 主表：每個角色要解決的不確定性

> **9 角色 · 10 種不確定性**：UX 與 UI 在教材中同屬 Ch.3 一章（所以全套講「9 角色」），
> 但它們消除的是兩種不同的不確定性——動線 vs 視覺，所以本表列 10 列。
> 不確定性的命名以 `software_develop_journey/ppt/_source/braindump.md · §角色 = 消除不確定性` 為 canonical。

| # | 角色 | 抽象層 | 消除的不確定性 | 核心提問（回答不出來就是這個角色沒做事） | 沒這角色會發生什麼 |
|---|---|---|---|---|---|
| 1 | **PM** | 商業 | 商業價值 | 這東西值得做嗎？做了誰買單？成功怎麼衡量？ | 做出沒人要的東西 |
| 2 | **UX** | 使用者 | 使用者行為 | 使用者真的會這樣走嗎？會卡在哪一步？ | 沒人會用、留存差 |
| 3 | **UI** | 使用者 | 視覺呈現 | 畫面長什麼樣才好用、又不會醜到丟臉？ | 醜到丟臉、品牌不一致 |
| 4 | **SA** | 業務邏輯 | 業務規則 | 規則的縫隙補了沒？例外情境誰處理？ | 上線後一堆 edge case 沒人想到 |
| 5 | **Architect** | 系統 | 系統演進與非功能風險 | 量大會不會掛？改一行會不會炸全套？ | 流量大就掛、擴不動、救不回 |
| 6 | **SD** | 模組 | 開發落地 | 工程師拿到這份文件，能不問問題就開工嗎？ | 工程師卡在「怎麼接」、模組糾纏 |
| 7 | **DBA** | 資料 | 資料正確性、效能、可靠性 | 資料找得到、算得準、不會丟嗎？ | 訂單對不上、查詢變超慢、資料掉了 |
| 8 | **Dev** | 代碼 | 實作正確性 | 這段 code 真的照設計跑嗎？ | 寫出 bug |
| 9 | **QA** | 測試 | 結果正確性 | 邊界情境測到了嗎？串起來會不會壞？ | bug 流到正式環境 |
| 10 | **DevOps / SRE** | 機器 | 上線運行 | 上線後還活著嗎？壞了多久救得回？ | 上線當天炸、半夜 on-call、burnout |

**方向性**：越上游越抽象（商業價值），越下游越具體（機器）。每一次交棒就是一次**翻譯**，每翻一次降低一層不確定性。

```
PM                    ── 最抽象（商業價值）
 ▼ 翻譯
UX / UI / SA          ── 使用者行為 / 業務邏輯
 ▼ 翻譯
Architect / SD / DBA  ── 系統 / 模組 / 資料
 ▼ 翻譯
Dev / QA / DevOps     ── 最具體（代碼 / 測試 / 機器）
```

---

## 表 B · 輸入 → 產出 → 交棒

| 角色 | 蓋房子對應 | 上游拿到什麼 | 交出什麼（經典產出） | 交棒給誰 |
|---|---|---|---|---|
| **PM** | 建案企劃 | 客戶 / 老闆 / 市場訊號 | PRD、User Story、Backlog、Persona、Roadmap | UX / UI |
| **UX** | 室內動線 | PRD、User Flow | User Journey、Wireframe、Prototype、Usability Test | UI / SA |
| **UI** | 樣品屋 | Wireframe | Mockup、Component Library、Design System | SA / Dev |
| **SA** | 建築師（平面圖） | PRD + User Flow | Use Case、State Diagram、Business Rule、Data Dictionary、Permission Matrix、Exception | Architect |
| **Architect** | 結構技師 | Use Case + NFR 需求 | Architecture Diagram、ADR、NFR Spec、Service Boundary、Integration Pattern | SD |
| **SD** | 施工圖 | 架構藍圖 | Module Design、API Spec、Sequence、Component / Class Diagram | DBA / Dev |
| **DBA** | 地基 + 水塔 + 管線總圖 | API 契約 + 業務規則 | ERD、Schema + Index、Transaction 策略、Backup Plan、Data Governance | Dev |
| **Dev** | 工班師傅 | 模組設計 + schema | Code (PR)、Unit Test、Documentation、Build Artifact、PoC | QA |
| **QA** | 驗收員 | 需求 + 規格 + code | Test Case、Test Plan、Bug Report、Automation、Coverage | DevOps |
| **DevOps / SRE** | 物業 + 24h 保全 + 消防 | 可交付產物 + 測試 | CI/CD Pipeline、IaC、Monitoring Dashboard、Runbook、Incident Report | 全隊（回饋迴圈） |

---

## 表 C · 這個不確定性由誰拍板（28 決策 × 10 角色）

「Overlap 不是壞事，問題是 overlap 時誰拍板。」★ = 主導，○ = 參與。

| # | 決策 | PM | UX | UI | SA | Arch | SD | DBA | Dev | QA | Ops |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 商業目標 / KPI | ★ | ○ | | ○ | | | | | | |
| 2 | 使用者旅程 | ○ | ★ | ○ | ○ | | | | | | |
| 3 | 畫面排版 / 資訊層級 | | ★ | ○ | | | | | | | |
| 4 | 互動細節（按哪 / 跳哪） | | ★ | ○ | ○ | | | | | | |
| 5 | 視覺風格 / 品牌調性 | ○ | ○ | ★ | | | | | | | |
| 6 | Design System 規範 | | ○ | ★ | | | | | | | |
| 7 | 可用性測試結論 | ○ | ★ | ○ | | | | | | | |
| 8 | 業務規則 | ○ | ○ | | ★ | ○ | | ○ | | | |
| 9 | 狀態機 | | ○ | | ★ | ○ | | ○ | | | |
| 10 | 服務邊界 | | | | ○ | ★ | | ○ | | | |
| 11 | 技術選型 | | | | | ★ | | ○ | | | |
| 12 | 同步 / 非同步 | | | | ○ | ★ | | ○ | | | |
| 13 | 一致性策略 | | | | ○ | ★ | | ★ | | | |
| 14 | NFR / SLA | ○ | | | ○ | ★ | | ○ | | | |
| 15 | Data Schema | ○ | | | ○ | ○ | | ★ | | | |
| 16 | Index 策略 | | | | | ○ | | ★ | | | |
| 17 | API endpoint 命名 | | | | | | ★ | | ○ | | |
| 18 | Sequence 細節 | | | | | | ★ | | ○ | ○ | |
| 19 | 程式碼結構 | | | | | | ○ | | ★ | | |
| 20 | 命名 / 設計模式 | | | | | | ○ | | ★ | | |
| 21 | Unit Test | | | | | | | | ★ | ○ | |
| 22 | Integration / E2E | | | | | | | | ○ | ★ | |
| 23 | Bug 嚴重度 | | | | | | | | ○ | ★ | ○ |
| 24 | CI/CD pipeline | | | | | | | | ○ | ○ | ★ |
| 25 | Deploy 策略 | | | | | | | | ○ | | ★ |
| 26 | SLO / 錯誤預算 | | | | | | | | ○ | ○ | ★ |
| 27 | 監控 / Alert | | | | | | | | ○ | ○ | ★ |
| 28 | Incident 回應 | | | | | | | | ○ | | ★ |

**雷區**：13 一致性策略同時是 Architect 與 DBA 的 ★——這是最常打架的格子。

**UX / UI 的分界**（決策 2–7）：動線與骨架歸 UX（3、4、7），視覺與元件歸 UI（5、6）。兩者都**不主導業務規則**——UX 只反映規則，不發明規則（決策 8 是 SA 的 ★）。

**NFR / SLA vs SLO**（決策 14 / 26）：Architect 定設計目標，DevOps 定運行門檻——同一件事的兩面，分屬不同拍板人。

> 同一份資料的三個 rendering：本表 · `11-collaboration/02_overlap_matrix.md` 的四張表（①產品與體驗 ②規則與系統 ③實作與交付 ④維運與可靠性）· `_generate_overlap_matrix.py` 的 `UPSTREAM` / `DOWNSTREAM`。改一處要三處一起改。

---

## 表 D · AI 可代勞 vs 人必須拍板

分界只有一條：**AI 產出「選項」，人做「取捨」。** 凡是有唯一正確答案的、可以窮舉的、有前例可循的，交給 AI；
凡是要在互斥的代價之間選一個、要對後果負責的，人自己來。

### D-1 · 三面向主表

| 角色 | AI 可代勞（70–90%） | AI 做不了（能力邊界） | 必須由人拍板的決策 |
|---|---|---|---|
| **PM** | 競品調研、PRD 草稿、roadmap markdown、訪談逐字稿整理、改文案 | 對自家用戶的直覺、政治決策、跨團隊談判 | 哪個需求 ROI 最高？哪個其實只是 nice to have？**什麼時候砍掉一個 90% 完成的 feature？** |
| **UX** | 線稿生成、A/B 文案變體、行為數據分析 | 真實使用者訪談、文化情境判斷 | 使用者「真的痛」在哪（vs PM 以為的痛）？資訊架構：什麼放第一層、什麼藏第二層？模態框 vs 全頁跳轉？ |
| **UI** | icon、配色變體、Tailwind 樣式、design token 補齊 | 品味（什麼叫乾淨 / 擁擠 / 廉價感）、品牌一致性 | 品牌調性是專業冷靜還是年輕活潑？三個視覺方案哪個真的能用？ |
| **SA** | edge case 展開、狀態機草稿、規格 markdown、PlantUML | 跟客戶談判、業務規則仲裁、法規 / 合規判斷 | 客戶說「自動」是哪種自動？11 種退款 edge case 怎麼分類？**哪些規則是鐵律、哪些是常見但有例外？** |
| **Architect** | 方案比較表、ADR 草稿、架構圖、選型 trade-off 表 | 團隊能力評估、政治約束、5 年後的演進判斷 | 哪個 NFR 是 must（不滿足就死）vs nice？微服務 vs 模組化單體——**我的團隊撐得起哪個？** 引入 Kafka 值得多 1 個維運人嗎？ |
| **SD** | OpenAPI / Protobuf spec、序列圖、ER 圖、模組骨架 | 領域邊界（DDD bounded context）、API 演進策略 | 該開新 service 還是擴既有 module？REST / gRPC / GraphQL？同步呼叫還是發 event？ |
| **DBA** | DDL、索引建議、EXPLAIN 解讀、查詢重寫 | 跨業務的一致性策略、災難恢復演練、容量曲線預判 | SQL vs NoSQL vs Vector？哪些欄位該 index（寫入成本）？**分片鍵選錯，未來 5 年都在 reshard。** |
| **Dev** | 90% boilerplate、單元測試、bug 重現 script、refactor | 演算法選擇、技術債判斷、跨檔案的隱性依賴 | 這段該重構還是接受技術債？bug 修根因還是症狀？**AI 給的 code 我要全收還是只收 60%？** |
| **QA** | test case 展開、自動化 script、stub / mock 資料、回歸表 | 定義 invariant、判斷哪個 bug 阻擋上線、安全攻擊面 | AI 系統的「對」怎麼定（沒有 ground truth）？哪些 case 是 must test？監控能取代多少手動測試？ |
| **DevOps / SRE** | Terraform、CI yaml、Prometheus rule、runbook 模板、Grafana JSON | incident 決策樹、SLO 跟業務談判、成本最適化 | SLO 設多少（99.9% vs 99.99% 成本差 10 倍）？**該不該為這個 alert 半夜叫人？** incident 後改流程還是改架構？ |

### D-2 · 每個角色用 AI 的典型陷阱

| 角色 | 陷阱 | 防範動作 |
|---|---|---|
| **PM** | AI 會「贊成你」 | prompt 明說「請扮演挑戰者，給我 3 條不做的理由」 |
| **UX / UI** | AI 生的 UI 都「平均美」，缺辨識度 | 人加品牌個性；仍要跑真人可用性測試 |
| **SA** | AI 列的 edge case 漏掉「真實世界的怪異組合」 | 拿真實資料回放驗證，不信憑空展開的清單 |
| **Architect** | AI 推薦的常是「業界主流」，不一定適合你的規模 | 把團隊人數 / 預算 / 現有技術棧寫進 prompt 當硬約束 |
| **SD** | AI 設的 API 容易「太 RESTful」，實際業務常需要 RPC 風格 | 先定領域邊界，再讓 AI 產 spec |
| **DBA** | AI 推「最佳實踐」schema，忽略現有資料遷移成本 | 每個 schema 建議都要問「這筆遷移要鎖表多久」 |
| **Dev** | AI 寫的 code「會跑但難維護」 | review 可讀性與命名，不只看測試綠燈 |
| **QA** | AI 生的 test 都是「正常 case」 | 邊界 / 並發 / 安全要人特別逼問 |
| **DevOps** | AI 生的告警「太敏感」，噪音多會讓人忽視真問題 | 每條 alert 都要能回答「這值得半夜叫人嗎」 |

### D-3 · 跨角色的通則：AI 強區 vs 弱區

| AI 強區（直接代勞） | AI 弱區（你必須會） |
|---|---|
| 套件 API、語法、樣板 | 定義「對」的標準 |
| 文檔翻譯、changelog | 跨團隊邊界劃分 |
| 測試案例展開 | 成本 vs 品質取捨 |
| 監控 / IaC 設定生成 | 「不做」的決策 |
| PlantUML / Mermaid 轉換 | 處理公司政治約束 |

**規律**：越「重複」AI 越強；越「判斷」AI 越弱。

### D-4 · 這對職涯的意義

| 角色 | AI 時代的位置 | 為什麼 |
|---|---|---|
| **Architect** | ↑↑ 最值錢 | 全部工作都是 trade-off，AI 只能列選項不能承擔後果 |
| **PM / SA / SD / DBA** | ↑ 更值錢 | 定義問題與控制複雜度，AI 產出的品質取決於這層餵得多清楚 |
| **UX / DevOps** | → 持平 | 產出被加速，但真實訪談與 incident 判斷無法外包 |
| **UI** | ↓ 部分被壓縮 | 視覺產出最容易被生成，剩下的是品味與品牌一致性 |
| **QA** | ↓ 轉型 | 從「驗證已知」轉成「定義未知」——測試案例好生成，invariant 難定義 |
| **Dev** | ↓↓ 衝擊最大 | 90% boilerplate 被吃掉，價值移到判斷該寫什麼 code |

**核心判斷**：AI 改變的是最下游兩個角色（Dev / QA）；上面 7 個角色幾乎沒變——因為那些是「定義問題」與「控制複雜度」的工作。
**AI 把實作能力變成 commodity，把判斷能力變得更稀缺。**

---

## 表 E · 不確定性沒消除的三種典型衝突

| 衝突 | 表面爭執 | 問題本質 | 怎麼解 |
|---|---|---|---|
| **PM vs Architect** | 「下週上線」vs「上線會炸」 | 商業價值 與 非功能風險 的優先級天生對撞 | Architect 不說 NO，說「可以，但要砍 30% 功能」——把選擇權還給 PM |
| **Dev vs QA** | 「這不是 bug，是 feature」 | bug 嚴重度定義不一致 | 先寫 Definition of Done + Test Plan；嚴重度本質是商業判斷，找 PM 拍板 |
| **DBA vs Dev** | 「加個欄位上線一下」vs「鎖表 30 分鐘」 | Dev 不知道 schema 變更的成本 | Migration Review + 線上變更工具（gh-ost / pt-osc）+ 分階段（nullable → backfill → NOT NULL） |

**原則**：角色會打架，是因為各自守著不同的不確定性。**不打架反而代表有人沒做自己的事。**

---

## 表 F · 三層 Flow：同一個不確定性，翻譯三次

| Flow | 回答什麼 | 主導 | 用什麼畫 | 消除的不確定性 |
|---|---|---|---|---|
| **User Flow** | 使用者怎麼走？ | PM / UX | 流程圖、Wireframe Flow | 商業價值、使用者行為 |
| **System Flow** | 系統怎麼判斷與處理？ | SA | UML Activity、State Diagram | 業務規則 |
| **Architecture Flow** | 服務 / 資料 / 事件怎麼跑？ | Architect | C4、Sequence、Deployment | 系統演進、非功能風險 |

**新手最容易省略 System Flow 這層**，結果上下游各說各話。
