# 軟體開發旅程 · 原始素材（Braindump）

> 本檔為用戶原始長文整理。所有 slide 的 `> Source:` 引用皆指向此檔的章節錨點。
> 章節以 `§` 標示，便於 slide 引用。

---

## §一句話本質

2020 年以前的軟體開發，本質上是「人類把需求逐層翻譯成程式」——流程很重、角色很清楚、文件很多，而且每一層都在**降低不確定性**。

很多人被 AI Agent、Vibe Coding 影響，會以為以前工程師只是「寫 code 的工人」。
其實完全不是。以前的大型產品開發，更像是蓋一座商業大樓。

---

## §角色全景

| 角色 | 本質 |
|---|---|
| PM | 定義「這棟樓為什麼存在」 |
| 架構師 | 決定「承重結構怎麼設計」 |
| 工程師 | 真的把鋼筋水泥一層一層蓋起來 |
| QA | 驗收這棟樓不會塌 |
| DevOps | 處理水電與消防系統 |

而且：以前因為沒有 LLM 幫忙，所以「思考能力」與「系統設計能力」的重要性，比今天還高。

---

## §SDLC 全流程

```
商業需求
    ↓
需求分析（PM）
    ↓
系統分析（SA）
    ↓
架構設計（Architect）
    ↓
技術設計（SD）
    ↓
資料庫設計（DBA / Architect）
    ↓
UI/UX 設計
    ↓
Backend / Frontend 開發
    ↓
測試（QA）
    ↓
部署（DevOps / Infra）
    ↓
維運（SRE / Ops）
    ↓
版本迭代
```

這就是傳統 SDLC。

---

## §PM 視角

PM 的本質：**「把商業問題翻譯成工程團隊能執行的需求。」**

很多人以為 PM 是開會的人。
其實真正強的 PM，是「需求壓縮器」。

### §PM 為何不只是「開會的人」

客戶說的永遠不是需求：

- 我想做 AI
- 我要像 Uber
- 我想做會員系統
- 我要 Dashboard

這都不是需求。

真正需求可能是：

- 降低客服成本
- 提升轉單率
- 降低人工操作
- 增加留存率
- 提升管理透明度

### §PM 工作流程

1. **市場/使用者研究**：User Interview / 問卷 / 客戶訪談 / Persona / Competitor Analysis / SWOT
2. **PRD（Product Requirement Document）**：功能需求 / User Flow / 權限 / 邊界條件 / Error handling / API 規格 / KPI / 時程
3. **User Flow 設計**：登入 → 首頁 → 商品頁 → 加入購物車 → 付款（含 Main Flow / Sub Flow / Exception Flow）
4. **Backlog 管理**：Epic → Story → Task → Sprint

### §PM 最重要的能力

| 能力 | 本質 |
|---|---|
| 問題定義 | 真需求是什麼 |
| 優先級排序 | 哪個最重要 |
| 跨部門協調 | 大家能不能一起動 |

---

## §架構師視角

一句話：**架構師負責決定「系統未來會不會死」。**

因為很多系統不是功能做不出來，是後面根本撐不住。例如：

- 流量爆炸
- DB 鎖死
- API timeout
- 微服務互炸
- deployment 地獄
- legacy 無法修改

這些都是架構問題。

### §架構師核心工作

1. **系統架構設計**：Monolith vs Microservices
2. **技術選型**：Backend / DB / Cache / MQ / Infra / Cloud
3. **非功能需求（NFR）**：

| 非功能需求 | 意思 |
|---|---|
| Scalability | 能不能撐大量流量 |
| Reliability | 會不會掛 |
| Security | 會不會被打 |
| Maintainability | 好不好改 |
| Observability | 能不能 debug |
| Availability | SLA 能不能達標 |

### §架構師收到需求怎麼做

不是畫圖，而是問：「真正的 business goal 是什麼？」

然後：

1. 理解商業目標
2. 辨識不確定性
3. 拆功能邊界
4. 拆系統邊界
5. 定義資料流
6. 定義服務責任
7. 技術選型
8. 風險評估
9. PoC / Spike
10. 架構定案
11. 交給 SD / Dev

真正花時間的根本不是 coding，而是「定義邊界」。

---

## §SA · System Analyst

SA 的本質：**把業務需求翻譯成系統規格。**

SA 介於 PM 與工程之間。他會關心：

- 這個需求在系統裡要怎麼運作？
- 有哪些角色？
- 有哪些狀態？
- 有哪些流程？
- 有哪些商業規則？
- 有哪些例外情境？
- 資料欄位有哪些？
- 系統要跟誰串接？

### §SA 經典產出

| 產出 | 說明 |
|---|---|
| Use Case | 使用案例 |
| Functional Spec | 功能規格 |
| Business Rule | 商業規則 |
| System Flow | 系統流程 |
| State Diagram | 狀態轉換 |
| Data Dictionary | 資料字典 |
| API Requirement | API 需求描述 |
| Exception Flow | 例外流程 |
| Permission Matrix | 權限矩陣 |

### §SA 補規則的範例

例如訂單狀態：

```
pending_payment → paid → preparing → shipped → completed
```

但 SA 會補：

- 若 30 分鐘內未付款 → 自動取消訂單
- 若付款成功但庫存不足 → 進入人工處理
- 若使用者取消但商品已出貨 → 不允許取消
- 若退款申請超過 7 天 → 不允許退款

這就是 SA 的價值——他在補「系統規則的縫隙」。

### §SA vs Architect

| 面向 | SA | Architect |
|---|---|---|
| 核心任務 | 分析需求、定義系統規格 | 設計架構、控制複雜度 |
| 主要關心 | 功能、流程、規則、資料 | 邊界、品質屬性、擴充、維運 |
| 輸入 | PM 需求、業務流程 | SA 規格、NFR、系統現況 |
| 輸出 | 功能規格、流程圖、資料字典 | 架構圖、服務邊界、技術決策 |
| 問題語言 | 這個流程怎麼跑？ | 這個系統怎麼撐？ |

**SA 管「系統應該做什麼」；架構師管「系統應該怎麼活下去」。**

---

## §SD · System Design

SD（System Design / Software Design）的本質：**把架構藍圖翻成模組與 API 設計**，讓開發者拿著就能開始 coding。

SD 比較像建築設計師 / 工程設計師。他決定：

- 這棟樓每層怎麼配置？
- 管線怎麼走？
- 門窗在哪？
- 樓梯怎麼連？
- 每個房間功能怎麼分？

### §SD 經典產出

- Module Design
- API Spec（OpenAPI / Swagger）
- Sequence Diagram
- Component Design
- Class Diagram

例如 Login API：

```
POST /api/v1/auth/login
Request:
{
  "email": "user@example.com",
  "password": "********"
}
Response:
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 3600
}
```

### §SD vs Architect

- **架構師**：城市規劃師——住宅區在哪、商業區在哪、捷運怎麼走
- **SD**：建築設計師——每層怎麼配置、管線怎麼走、門窗在哪

換成軟體：

| 角色 | 關注層級 |
|---|---|
| Architect | 系統級、跨服務級、長期演進 |
| SD | 模組級、功能級、API 級、開發可落地性 |

---

## §DBA · 資料生命線

DBA 不只是「幫你建表」。真正成熟的 DBA 會在前期介入，因為很多系統最後死在資料庫。

### §DBA 介入時機

1. **Data Model Review**：訂單量多大？查詢情境是什麼？是否需要歷史快照？
2. **Schema Design**：Table / Column / PK / FK / Index / Constraint / Partition / View
3. **Index Strategy**：複合索引欄位順序、覆蓋索引、避免 table scan
4. **Transaction & Consistency**：訂單付款扣庫存等多步驟流程怎麼確保一致
5. **Backup / Restore / DR**：RPO / RTO / Point-in-Time Recovery

### §DBA 守住的是資料生命線

不只是建表，是：

- 資料正確性
- 查詢效能
- 備份策略
- 異地備援
- 稽核要求
- 資料保留年限

---

## §Developer 視角

2020 前的工程師其實很硬。沒有 Copilot / Cursor / GPT / Claude Code，得自己：

- 查 StackOverflow
- 看文件
- debug
- trace memory leak

`vim` / `grep` / `awk` / `tail -f` / `tcpdump` 是日常。

### §開發流程（以前）

1. **接需求**：通常拿到 PRD / API spec / DB schema / UI mockup
2. **技術設計**：Controller → Service → Repository → Database（Layered Architecture）
3. **Coding**：重視 Design Pattern / OOP / SOLID / Clean Code
4. **Code Review**：命名 / 可讀性 / 邏輯 / 效能 / 安全性
5. **Testing**：Unit / Integration / E2E / Load
6. **CI/CD**：Jenkins / GitLab CI / CircleCI

---

## §QA 視角

QA 的本質：**驗收這棟樓不會塌。**

### §QA 測試類型

| 類型 | 用途 |
|---|---|
| Unit Test | 測 function |
| Integration Test | 測模組 |
| E2E Test | 測整個流程 |
| Load Test | 壓力測試 |

---

## §DevOps / SRE 視角

DevOps / SRE 的本質：**水電與消防系統——讓樓上線後能持續運作。**

工作：

- CI/CD pipeline
- Deployment（Docker / K8s）
- Monitoring / Alerting
- Log / Trace / Metrics
- Incident Response
- Backup / DR
- Security 維運

---

## §UX vs UI

- **UX**：使用者怎麼完成任務才順？User Flow / User Journey / Wireframe / Prototype
- **UI**：畫面如何清楚、可操作、符合品牌？Mockup / Component Library / Style Guide

UX 不是等架構，UX 需要跟架構一起跑。比較好的說法是：
**UX 先探索可用性，架構師同步約束可行性，最後一起收斂成可交付方案。**

---

## §三層 flow 翻譯

| Flow | 回答 | 主導 |
|---|---|---|
| User Flow | 使用者怎麼走？ | PM / UX |
| System Flow | 系統怎麼判斷與處理？ | SA |
| Architecture Flow | 服務、資料、事件、部署怎麼互動？ | Architect |

```
User Flow → System Flow → Architecture Flow
```

很像你把中文翻成英文，再翻成機器語言。每翻一次，都會暴露新的問題。

---

## §責任鏈

```
PM：Why / What
    ↓
UX：How user behaves
    ↓
SA：How system should behave
    ↓
Architect：How system should be structured
    ↓
SD：How modules should be designed
    ↓
DBA：How data should live
    ↓
Dev：How code should be implemented
    ↓
QA：How correctness should be verified
    ↓
DevOps / SRE：How system should run
```

---

## §角色 = 消除不確定性（核心思想）

| 角色 | 降低的不確定性 |
|---|---|
| PM | 商業價值不確定性 |
| UX | 使用者行為不確定性 |
| UI | 視覺呈現不確定性 |
| SA | 業務規則不確定性 |
| Architect | 系統演進與非功能風險 |
| SD | 開發落地不確定性 |
| DBA | 資料正確性、效能、可靠性風險 |
| Dev | 實作正確性不確定性 |
| QA | 結果正確性不確定性 |
| DevOps / SRE | 上線運行不確定性 |

**角色不是用職稱分，而是用它負責消除哪一種不確定性來分。**

---

## §蓋大樓比喻全景

做軟體像蓋一座百貨公司：

- **PM**：決定為什麼要蓋百貨公司，賣給誰
- **UX**：設計客人怎麼逛才不迷路
- **UI**：設計動線、樣品屋、視覺
- **SA**：定義商店、結帳、退貨、會員規則
- **架構師（結構技師）**：決定整棟樓的結構、水電、逃生、未來擴建
- **SD（施工圖繪製師）**：設計每一層樓、每個區域、每條管線怎麼接
- **DBA（地基+水塔+管線總圖）**：管理倉庫、帳本、庫存資料，確保資料找得到、算得準、不會丟
- **Dev（工班師傅）**：真的施工
- **QA（驗收員）**：驗收會不會出錯
- **DevOps / SRE（物業管理+保全+消防）**：開幕後確保電梯、水電、消防都正常

---

## §三句口訣

```
SA 定規則
Architect 定邊界
SD 定細部設計
```

```
DBA 不只是建表
而是守住資料生命線
```

```
規劃不是寫文件
而是逐層消除不確定性
```

```
軟體工程的本質
一直都是降低不確定性
```

---

## §AI 時代的本質沒變

時代差異：

| 時代 | 本質 |
|---|---|
| 2020 前 | 人在驅動系統 |
| 2026 後 | AI 開始協助驅動系統 |

以前：`需求 → 人類分析 → 人類設計 → 人類 coding`
現在：`需求 → AI 協作 → 人類做決策`

差很多。

**但有件事沒變**：真正厲害的人永遠不是最會寫 code 的，而是：

- 能定義問題的人
- 能拆解系統的人
- 能控制複雜度的人

因為軟體工程本質一直都是：**管理複雜度**。

---

## §訂單系統實例（Ch.12 baseline）

**PM 需求**：讓使用者可以購買商品，並追蹤訂單狀態。

**UX 設計流程**：商品頁 → 購物車 → 結帳 → 付款 → 訂單完成頁 → 訂單查詢頁

**SA 定義 7 個訂單狀態**：

```
pending_payment → paid → preparing → shipped → delivered → completed
                                                              ↘ returned → refunded
```

關鍵：**「訂單完成 ≠ 付款成功」**——每個狀態轉換都是業務規則 + 事務邊界。

**Architect 決定**：
- Order Service / Payment Service / Inventory Service / Notification Service
- 付款與庫存：同步 or 非同步？
- 通知：非同步 queue
- 訂單事件：event log
- 失敗補償：Saga / Outbox Pattern

**SD 細化**：CreateOrder / CancelOrder / RefundOrder API + sequence diagrams

**DBA 設計**：
- `orders` / `order_items` / `payment_records` / `inventory_reservations` / `refund_records` / `order_events`
- index: `order_no`、`user_id + created_at`、`status + updated_at`
- partition by `created_at`
- audit retention policy / backup strategy

**Dev**：前後端實作
**QA**：邊界測試（30 分鐘未付款 / 庫存不足 / 出貨後取消…）
**DevOps**：CI/CD / 監控 / 告警 / 對帳 job

---

## §客服工單系統實例

**PM 需求**：客服人員可以建立工單、分派工單、追蹤處理狀態。
**目標**：降低客服漏單率，提高處理效率。

**SA 狀態機**：

```
new → assigned → in_progress → waiting_customer → resolved → closed
```

**SA 規則**：
- 只有主管可以重新開啟 closed ticket
- 若超過 24 小時未回覆 → SLA warning
- 若超過 48 小時未回覆 → SLA breach

**架構師考量**：
- 工單服務是否獨立？
- 通知要同步還是非同步？
- SLA 計算要即時還是排程？
- 工單歷程是否需要 event log？

---

## §直播串流系統挑戰（Ch.12 differential 1）

**核心難題**：低延遲、高併發、突發流量、CDN 邊緣節點

**沒有任何單一角色可以決定「卡頓」的責任**——延遲是：
- PM（產品定義 < 3s）
- × UX（loading 動畫掩飾 1s）
- × Architect（CDN 邊緣）
- × SD（HLS chunk 大小）
- × DevOps（容量預測）

五個人共同的合約。

**揭露**：NFR 不是 Architect 的專利，是跨角色契約。

---

## §AI 影視生成挑戰（Ch.12 differential 2）

**核心難題**：非同步 job、GPU 排程、模型部署、長任務、成本失控

**最反直覺的事**：**PM 無法寫驗收條件。**

電商可以說「按下付款 → 收到 email」。
AI 影視說「生得好」——好的定義要靠：

- QA 設計人類評分流程
- Data Scientist 設計 metric（FID / CLIP score）

而且每次模型更新就要重做。

**QA 從「驗證已知」變成「定義未知」。**

這是給讀者最強的那句話：**角色職責會隨領域漂移**。

---

## §三系統 3×3 比較矩陣（Ch.12 04_comparison）

| | 電商 | 直播 | AI 影視 |
|---|---|---|---|
| **核心難題**（PM/UX 視角） | 狀態一致性 | 延遲合約 | 定義「好」 |
| **架構的支點**（SA/Architect/SD/DBA） | 事務 + 冪等 | CDN + 邊緣 | 非同步 + GPU 池 |
| **上線後最痛**（Dev/QA/DevOps） | 退款對帳 | 突發流量 | 成本失控 |

9 cells。三個 row 對應 SDLC 三階段（Discovery / Design / Build & Run）。
9 個角色都被分組裝進去了，沒丟。

---

## §結語

軟體工程的本質：**管理複雜度**。

每個角色在做的事：**降低一種不確定性**。

蓋大樓需要 9 種專業，軟體系統也是。

AI 改變了實作門檻，但**判斷力、邊界感、複雜度控制**——這些是 AI 取代不了的核心稀缺。
