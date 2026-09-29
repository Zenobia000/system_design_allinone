# AI 時代的軟體工程師：從 Coder 到 AI Builder

## 課程導覽
### 核心論點
- AI 讓撰寫程式碼的成本大幅下降，稀缺能力轉為定義、取捨與驗收
- 工程師的進化方向：從執行單一角色，轉為調度各角色能力的 AI Builder（Orchestrator）
- 調度的前提：理解 System Architecture、每個角色的 R&R 與產出，以及 AI 的能力邊界
### 課程架構（Why → What → How）
- Part I　Why：為什麼需要進化
- Part II　What：軟體工程基礎
- Part III　What：AI 基礎
- Part IV　What：架構設計心法
- Part V　How：實戰——從 0 到 1 打造 AI 點餐外送推薦 App
- Part VI　總結：AI Builder 的工作模式
### 編排原則
- 主線：Architecture 隨章節逐步演進（v1 → v6），每一版對應一份規格文件
- 輔線：每章結尾討論「此步驟交給 Agent 時，驗收關卡設在哪裡」
- 標註慣例：💡 重點　📊 圖表　🎤 講者備註　📖 情境　🔗 對應心法　⏱ 時效資料
- ⏱ 時效資料：價格、模型與工具資訊查核日為 2026-09-29，投影片上一律標註查核日

## Part I　Why：為什麼需要進化
### 第 0 章　AI 帶來的產業變化
#### 0.1 生成成本與驗證成本的落差
- 💡 重點：撰寫程式碼的成本大幅下降，驗證是否正確的成本卻沒有
- 📊 圖表：兩條曲線，生成成本下降、驗證成本持平
- 🎤 講者備註：過去的瓶頸是寫不完，現在的瓶頸是分不出對錯
#### 0.2 錯誤型態的轉變
- 💡 重點：語法錯誤變少，需求誤解與架構錯誤變多
- 📖 情境：測試全數通過，業務邏輯卻是錯的
#### 0.3 工程師價值的位移
- 💡 重點：價值往上游（定義）與下游（驗收）移動，中段的實作被壓平
- 📊 圖表：微笑曲線

## Part II　What：軟體工程基礎
### 第 1 章　System Architecture 全景
#### 1.1 系統的六大組成
- ① Presentation Layer：使用者介面（App、Web、管理後台）
- ② Entry Layer：API Gateway、Authentication、Rate Limiting
- ③ Service Layer：業務邏輯（訂單、支付、推薦）
- ④ Data Layer：Database、Cache、Message Queue、Object Storage、Vector DB
- ⑤ External Integration：金流、地圖、LLM API
- ⑥ Operations Layer：部署、監控、告警、成本控管
#### 1.2 架構設計的三個核心問題
- 💡 重點：架構就是決定六大組成如何切分、如何連接、故障時如何應對
- 切分：Monolith 或 Microservices
- 連接：同步呼叫（REST、gRPC）或非同步事件（Message Queue）
- 故障：單一元件失效時，其餘部分是否仍能運作
#### 1.3 AI 應用的架構定位
- 💡 重點：AI 應用仍是軟體系統，LLM 只是第⑤類的外部相依服務
- 🎤 講者備註：LLM 的三個特性——慢、貴、輸出不保證正確

### 第 2 章　開發方法論：Waterfall 與 Agile
#### 2.1 Waterfall
- 流程：需求 → 設計 → 實作 → 測試 → 部署，逐階段完成
- 適用：需求穩定、錯誤代價高（醫療、金融核心系統、硬體）
- 限制：文件成本高於溝通成本；完成後才發現需求錯誤
#### 2.2 Agile
- 流程：短週期迭代 → 可用增量 → 回饋 → 調整
- 適用：需求不確定、需要快速驗證市場
- 限制：常演變成缺乏文件與架構，Technical Debt 持續累積
#### 2.3 兩者的本質差異
- 💡 重點：差別在於「變更成本」付在哪個階段
- 📊 圖表：Waterfall 前期集中投入文件，Agile 分攤到每次迭代的重構
#### 2.4 AI 時代的影響
- 💡 重點：迭代成本更低，驗證成本相對更高
- 🎤 講者備註：一天迭代十次卻沒有規格與測試，等於以十倍速累積錯誤

### 第 3 章　現代分工模式
#### 3.1 SDLC 的九個角色
- 💡 重點：每個角色負責降低一種不確定性
- PM：做什麼、為什麼做（價值）
- UX/UI：使用者如何操作（體驗）
- SA（System Analyst）：系統必須做到什麼、範圍到哪裡（行為與邊界）
- Architect：系統如何達成品質要求（結構與品質）
- SD（System Designer）：模組如何切分與串接（介面）
- DBA：資料如何儲存（資料）
- Developer：實際實作（實作）
- QA：是否做對（驗證）
- DevOps / SRE：上線後是否穩定（維運）
#### 3.2 角色與產出的對應
- PM → PRD
- UX/UI → User Flow、Wireframe
- SA → SRS
- Architect → SAD、ADR
- SD → SDS、API Spec
- DBA → Schema、Migration
- Developer → Source Code
- QA → Test Plan、Test Report
- DevOps / SRE → Runbook、SLO
- 💡 重點：每個角色都是一份關鍵產出的負責人
#### 3.3 SA 與 Architect 的分工
- 💡 重點：SA 管「做什麼、做到哪」，Architect 管「怎麼做得夠好」
- SA：業務語言 → 可實作的流程與規格；界定系統邊界
- Architect：品質屬性 → 結構與技術決策；管理整體品質
- 📊 圖表：SA 看黑箱（外部行為），Architect 看白箱（內部結構）
- 🎤 講者備註：SA 缺席，Architect 會替錯誤的需求設計出很好的架構

### 第 4 章　規格文件體系與 V-Model
#### 4.1 規格文件鏈：PRD → SRS → SAD → SDS
- 💡 重點：每份文件回答一個問題，粒度由粗到細、語言由業務到技術
- 📊 圖表：四份文件由上而下的分解鏈，每層標註負責角色與讀者
#### 4.2 PRD（Product Requirements Document）
- 回答：為什麼做、為誰做、做什麼
- 負責：PM；讀者：全團隊、決策者
- 內容：商業目標、Persona、User Story、範圍與不做的事、Success Metrics
- 語言：業務語言
#### 4.3 SRS（Software Requirements Specification）
- 回答：系統必須做到什麼（只描述外部行為，不描述實作）
- 負責：SA；讀者：Architect、SD、QA
- 內容：系統邊界、Functional Requirement（編號）、NFR、業務規則、Use Case、外部介面
- 參考標準：ISO/IEC/IEEE 29148
- 好需求的特性：明確、單一、可行、可驗證、可追溯
- 📊 圖表：同一需求在 PRD 與 SRS 的寫法對照
  - PRD：使用者可以快速重複上次的訂單
  - SRS：FR-012 系統應於首頁顯示最近 3 筆訂單；點擊後 2 秒內帶入購物車；餐廳休息中時顯示替代推薦
#### 4.4 SAD（Software Architecture Document）
- 回答：系統的整體結構如何滿足品質要求
- 負責：Architect；讀者：SD、DevOps、技術決策者
- 內容：架構視圖（C4 Model）、Quality Attribute Scenario、ADR、技術選型、風險
- 參考標準：ISO/IEC/IEEE 42010
#### 4.5 SDS（Software Design Specification）
- 回答：每個模組如何實作
- 負責：SD、DBA；讀者：Developer、QA
- 內容：模組設計、API Spec、Schema、Sequence Diagram、關鍵演算法
- 參考標準：IEEE 1016
#### 4.6 V-Model：每份規格都對應一層測試
- 💡 重點：左側逐層拆解規格，右側逐層驗證；測試依據就是同層的規格
- 📊 圖表：V 字形，左右對應
- PRD ↔ Acceptance Test：是否解決了業務問題（使用者與 PM 驗收）
- SRS ↔ System Test：系統整體是否符合功能與 NFR
- SAD ↔ Integration Test：模組與服務之間的介面是否正確
- SDS ↔ Unit Test：單一模組的邏輯是否正確
- 參考：ISTQB 測試層級；測試流程標準 ISO/IEC/IEEE 29119
#### 4.7 Verification 與 Validation
- Verification：是否依規格正確實作（Build the product right）
- Validation：是否做出使用者真正需要的東西（Build the right product）
- 🎤 講者備註：AI 產出的程式常通過 Verification，卻過不了 Validation
#### 4.8 Shift Left：測試在寫規格時就開始設計
- 💡 重點：左側文件完成的當下，就寫出右側同層的測試案例
- 🎤 講者備註：規格寫不出測試案例，代表規格本身還不夠明確
#### 4.9 Traceability Matrix
- 💡 重點：每個商業目標都能追到需求、設計、程式碼與測試
- 📊 圖表：PRD 目標 → FR 編號 → 架構元件 → 測試案例

## Part III　What：AI 基礎
### 第 5 章　LLM 運作原理
#### 5.1 Next-Token Prediction
- 💡 重點：輸出的是機率上最可能的內容，不保證正確
#### 5.2 Token 與計價
- Token 是模型處理文字的最小單位，API 依輸入與輸出 Token 數計費
- 輸出 Token 單價通常是輸入的 3–5 倍
- 🎤 講者備註：一次 Agent 任務常反覆讀取整個 Repository，Token 用量可能是單次對話的數百倍
#### 5.3 參數量（Parameters）
- 💡 重點：參數量代表模型的容量，不等於實際表現
- Dense Model：每次推論動用全部參數
- MoE（Mixture of Experts）：總參數很大，每次只啟用一部分（例：總參數 1.6T、啟用 49B）
- 🎤 講者備註：美國主要廠商多半不公開參數量，比較模型應看實測結果與價格
#### 5.4 Context Window
- 💡 重點：模型只知道放進 Context 的資訊
- 主流旗艦模型已達 1M Token（約可放入一個中型 Repository 的重點程式碼）
- 視窗大不等於記得牢：內容越長，中段資訊越容易被忽略
- 未寫進 Prompt、Repository 或文件的內容，對模型而言不存在
#### 5.5 無狀態（Stateless）
- 💡 重點：每次對話都從零開始
- 長期記憶必須存放在外部：Repository、Spec、Rule 檔案（如 CLAUDE.md、AGENTS.md）
#### 5.6 非確定性（Non-deterministic）
- 💡 重點：相同輸入不保證相同輸出
- 因此需要可重複執行的驗證機制：Test、Schema、Eval
#### 5.7 Prompt 如何驅動模型
- 💡 重點：模型看到的是一整份組合後的輸入，Prompt 只是其中一部分
- 組成：System Prompt → Rule 檔案 → 工具定義 → 檢索到的資料與程式碼 → 對話紀錄 → 本次提問
- 輸入決定輸出的機率分布：給什麼脈絡，就得到什麼方向的答案
- 📊 圖表：Context 組裝示意，標示每一層由誰提供
#### 5.8 Agent 的組成
- 💡 重點：Agent = LLM + Tools + Loop
- 📊 圖表：推理 → 呼叫工具 → 觀察結果 → 再推理
- 🎤 講者備註：能執行操作的 AI，犯錯時也會實際執行錯誤操作

### 第 6 章　模型生態：美國派與中國派
#### 6.1 兩大陣營的結構差異
- 美國派（Anthropic、OpenAI、Google、xAI）：封閉權重、不公開參數量，以 API 與訂閱服務提供
- 中國派（DeepSeek、Alibaba Qwen、Moonshot Kimi、Zhipu GLM、MiniMax）：多數釋出開放權重的 MoE 模型，並公開啟用參數量
- 💡 重點：美國派賣的是服務，中國派多半同時釋出模型本身
#### 6.2 代表模型與 API 價格
- ⏱ 查核日 2026-09-29，單位為 USD / 每百萬 Token（輸入 / 輸出）
- 美國派
  - Claude Opus 5.5：$4 / $20，Context 1M
  - Claude Fable 5.1：$10 / $50，Context 1M
  - GPT-6 Astra：$10 / $50
  - GPT-6 Sol：$2 / $10
  - Gemini 3.1 Pro：$2 / $12（200K 以內）
  - Grok 4.7：$2 / $6（200K 以內），Context 500K
- 中國派
  - DeepSeek V4-Pro：$1.32 / $3.96（離峰半價），Context 1M，MIT 授權，1.6T / 49B
  - Qwen3.8-Max：$2 / $6，Context 1M，未開放權重
  - Kimi K3：開放權重（自訂授權，大型商用有限制），2.8T / 104B
  - GLM-5.3：$1.40 / $4.40
  - MiniMax-M3：開放權重，低價路線
- 📊 圖表：價格 × 能力散佈圖，兩陣營分色
- 🎤 講者備註：完整價格表與來源見附錄 E
#### 6.3 價格水準
- 💡 重點：以 Token 單價計，中國派旗艦約為美國派的 1/3 到 1/10
- 🎤 講者備註：單價低不等於總成本低；要看完成一個任務需要幾輪、幾次重試
#### 6.4 台灣企業的選用考量
- 直接呼叫中國廠商 API：資料傳送至中國境內伺服器，適用中國法規
- 公部門已限制使用中國 AI 產品（確切範圍以主管機關公告為準）
- 開放權重模型可在地端或台灣區域自行部署，此時限制只剩授權條款
- 美國派可透過 AWS Bedrock、Google Cloud Vertex AI 指定區域使用
- 💡 重點：選模型之前，先確認資料能去哪裡
#### 6.5 資料時效提醒
- ⏱ 此市場的價格與模型名稱每月都在變動；2026 年 Copilot、Cursor、Codex 皆調整過計費方式
- 🎤 講者備註：教學重點是比較的方法，數字請於授課前重新查核

### 第 7 章　AI Coding 工具生態
#### 7.1 常見的 AI Coding 應用
- 程式碼補全（Code Completion）
- 對話式問答：解釋程式碼、查 API 用法
- 實作功能：依規格產生程式碼與測試
- Debugging：分析錯誤訊息與 Log，提出修正
- Refactor 與 Migration：框架升級、語言轉換
- Code Review：PR 審查、找出安全與效能問題
- 測試產生：Unit Test、Edge Case 擴充
- 文件產生：README、API 文件、註解
- 理解既有系統：閱讀 Legacy Code、產生架構說明
- Prototype：從描述直接產生可操作的應用程式
#### 7.2 工具的五種型態
- 💡 重點：型態的差別在於 AI 的自主程度，而不在於模型
- IDE 外掛：GitHub Copilot、JetBrains AI
- AI-native IDE：Cursor、Kiro、Trae、Windsurf（已併入 Cognition Devin）
- CLI Agent：Claude Code、Codex CLI、Antigravity CLI（原 Gemini CLI）、Kimi Code、Qwen Code
- Cloud / Async Agent：Codex Cloud、Copilot Coding Agent、Devin、Jules、Claude Code on the web
- App Builder：v0、Bolt、Replit Agent、Lovable
- 📊 圖表：由左到右自主程度遞增的光譜
#### 7.3 四大工具比較：Claude Code、Codex、Cursor、Copilot
- ⏱ 查核日 2026-09-29，個人方案月費（USD）
- Claude Code
  - 型態：以 Terminal 為主，另有 IDE 擴充與 Web 版
  - 自主程度：高，擅長長時間、跨檔案的 Agent 任務
  - 模型：僅 Claude
  - 價格：$20 / $100 / $200
  - 典型用途：大型 Refactor、整個 Repository 範圍的工作
- Codex
  - 型態：CLI、IDE、Cloud 共用同一帳號
  - 自主程度：高，Cloud 任務可非同步平行執行
  - 模型：僅 OpenAI
  - 價格：包含在 ChatGPT 方案內（$8 / $20 / $100 起）
  - 典型用途：平行派發多個非同步任務
- Cursor
  - 型態：以 VS Code 為基礎的 AI-native IDE，另有 Cloud Agent
  - 自主程度：中到高
  - 模型：多家廠商，另有自家 Composer 模型
  - 價格：$20 起
  - 典型用途：在 IDE 內的日常開發
- GitHub Copilot
  - 型態：既有 IDE 的外掛，另有 CLI 與 GitHub 內建的 Coding Agent
  - 自主程度：從補全到自動開 PR，範圍最廣
  - 模型：可選擇的廠商最多
  - 價格：$10 / $39 / $100（2026-06 起改為點數計費）
  - 典型用途：已使用 GitHub 的企業，入門成本低
#### 7.4 中國工具
- Trae（ByteDance）：AI-native IDE
- Qoder CN（Alibaba，原通義靈碼）：Qwen 模型
- Kimi Code（Moonshot）：CLI，含在 Kimi 會員方案
- Qwen Code（Alibaba）：開源 CLI，依 Token 計費
- CodeGeeX（Zhipu）：GLM 模型
#### 7.5 選擇工具的原則
- 💡 重點：先決定要交給 AI 多少自主權，再選工具
- 探索與 Prototype → App Builder 或 Vibe Coding
- 日常開發 → IDE 外掛或 AI-native IDE
- 跨檔案、長任務 → CLI Agent
- 可平行、可獨立驗收的任務 → Cloud Agent
- 🎤 講者備註：工具會換，驗收機制不會換

### 第 8 章　AI 的能力邊界
#### 8.1 AI 擅長的工作
- 💡 重點：有大量既有範例可參考的工作
- Boilerplate：CRUD、設定檔、測試案例擴充
- 轉換：需求轉草稿、程式碼轉文件、語言間轉譯
- 廣度：列舉方案、找出遺漏、摘要大量資料
#### 8.2 AI 不擅長的工作
- 💡 重點：缺乏範例，或需要承擔後果的工作
- 未明說的需求與業務脈絡
- 取捨與決策（模型不承擔後果）
- 跨大量檔案、長時間的一致性
- 辨識自身的不確定（不會主動表示「我不確定」）
#### 8.3 人機分工原則
- 💡 重點：人負責定義與驗收，AI 負責產出
- 📊 圖表：定義（人）→ 產出（AI）→ 驗收（人）
#### 8.4 常見陷阱與防範機制
- Hallucination：不存在的 API 或套件 → 鎖定版本，以實際執行結果為準
- 測試通過但邏輯錯誤 → 關鍵測試案例由人撰寫，AI 負責擴充
- 修改測試以符合程式碼 → 測試與實作分開產生，Review Diff
- 修改範圍失控 → 一次一個任務，維持小幅度 Diff
- Context 汙染與遺失 → 規格寫入 Repository，不依賴對話紀錄
- 安全漏洞（Hardcoded Secret、Injection）→ CI 自動掃描、最小權限原則
- 過度自信的錯誤回答 → No Evidence, No Done

### 第 9 章　與 AI 溝通：從提示詞到提問設計
#### 9.1 Prompt Engineering 的重要性正在下降
- 💡 重點：模型已能理解一般指令，技巧型提示詞的效果越來越小
- 失效的技巧：角色扮演咒語、「深呼吸一步一步想」、威脅或利誘
- 仍然有效的：提供正確的脈絡、清楚的目標、可檢查的標準
- 🎤 講者備註：重點從「怎麼說」轉為「給什麼」與「問什麼」
#### 9.2 Context Engineering：給對的資料
- 💡 重點：答案的品質上限，取決於放進 Context 的資料
- 放入：相關程式碼、規格、錯誤訊息、範例、限制條件
- 排除：無關檔案、過期文件、冗長的對話紀錄
- 固化：反覆需要的脈絡寫進 Rule 檔案與規格，不要每次重打
#### 9.3 提問設計：問對問題
- 💡 重點：問題本身就是規格；問不清楚，代表自己還沒想清楚
- 好問題的五個要素
  - 目的：要解決什麼問題、為什麼
  - 背景：目前的狀態、已經試過什麼
  - 約束：不能改什麼、必須用什麼
  - 驗收標準：怎樣算完成
  - 輸出形式：要程式碼、方案比較，還是決策建議
- 技巧：先請 AI 反問不清楚的地方；一次只問一件事；要求列出假設
- 📊 圖表：同一需求的壞問題與好問題對照
#### 9.4 邏輯表達力與語言
- 💡 重點：AI 的輸出品質，受限於提問者的邏輯表達能力
- 中文常見的歧義：省略主詞、代名詞指涉不清、修飾範圍不明
- 改善方式：主詞明確、條列步驟、數字取代形容詞、專有名詞用英文
- 模型訓練資料以英文為主，技術名詞使用英文較不易誤解
- 🎤 講者備註：會寫規格的人，就會問問題；寫作能力就是新的程式能力
#### 9.5 AI 味從何而來
- 💡 重點：AI 味是訓練方式留下的統計痕跡
- 機率傾向：選擇最常見的用詞與句型，結果趨於平均
- 偏好訓練（RLHF）：傾向討好、面面俱到、語氣保守
- 安全調校：過多的免責聲明與客套話
- 翻譯腔：中文輸出帶有英文句構
#### 9.6 AI 味的常見特徵
- 文字
  - 開場複述問題、結尾重複總結
  - 三段式排比、「不是……而是……」句型
  - 誇大的形容：「至關重要」「全方位」「賦能」
  - 過量的破折號、粗體、條列與表情符號
- 程式碼
  - 每一行都有註解，且只是重述程式碼
  - 過度防禦：到處 try/except，把錯誤吞掉
  - 不必要的抽象層與設定參數
  - 冗長的 Docstring 與範例
#### 9.7 消除 AI 味的方法
- 提供自己的寫作範例，讓模型模仿風格
- 明確列出禁用詞與禁用句型
- 指定讀者與語氣（例：資深工程師、只講結論）
- 要求具體：數字、例子、檔案位置
- 程式碼：以既有程式碼為風格基準，由 Linter 與 Code Review 把關
- 最後一哩由人修改：刪除不影響決策的每一句

### 第 10 章　AI Builder 的工作模型
#### 10.1 Vibe Coding
- 定義：以對話驅動開發，邊做邊調整
- 適用：探索期、Prototype、需求尚不明確
- 限制：缺乏 Single Source of Truth，第二次修改就開始失控
#### 10.2 SDD（Spec-Driven Development）
- 定義：先撰寫規格，AI 依規格實作，再以規格驗收
- 適用：需求已知、多人相依、錯誤代價高
- 限制：前期投入較多，規格本身也可能有誤
#### 10.3 以確定性決定開發方式
- 💡 重點：兩者並非二選一，而是同一條曲線的兩端，橫軸是確定性
- 📊 圖表：Explore → Stabilize → Systemize → Productize
- 原則：未知的先 Vibe，已知的就固化，有人相依就正式化
- 對應：Vibe Coding 近似極端的 Agile；SDD 近似輕量的 Waterfall
#### 10.4 AI 時代的角色整併
- 💡 重點：人力可以整併，產出不能省略
- 🎤 講者備註：九人團隊可能縮減為兩三人，但九種判斷仍需有人負責
#### 10.5 AI 時代的文件鏈
- 💡 重點：規格是 Agent 的輸入，測試是 Agent 的驗收標準
- SRS 的驗收條件 → Gherkin（Given / When / Then）
- SAD 的品質要求 → ADR 與自動化檢查（Fitness Function）
- SDS → OpenAPI、Schema，可直接由工具驗證
- 每個 Agent 任務都引用 FR 編號，產出才能追溯
#### 10.6 AI Builder（Orchestrator）的定義
- 💡 重點：知道何時調度哪個角色的能力，並負責驗收產出
- 調度三要素：輸入（Input）→ 執行者（Skill / Agent）→ 驗收標準（Acceptance）

## Part IV　What：架構設計心法
### 第 11 章　架構師思維
#### 11.1 架構師的三個核心價值
- 決策權重大於撰寫程式碼：架構師是系統的 Why 守護者
- 商業翻譯重於技術實作：把「提升使用者體驗」翻譯成「P99 < 200ms」
- 全局思考重於局部最佳化：單一服務未必最佳，整體系統更穩定
#### 11.2 架構師是品質的負責人
- 💡 重點：功能決定系統做什麼，品質決定系統能活多久
- SA 交付「做什麼」，Architect 負責「做到多好」並守住品質底線
#### 11.3 從 Individual Contributor 到 Multiplier
- 個人貢獻者：我解決問題
- 團隊領導者：我的團隊解決問題
- 架構師：多個團隊因我的設計而更有效率地解決問題
- 🎤 講者備註：AI Builder 就是以 Agent 為團隊的 Multiplier
#### 11.4 對不同對象使用不同語言
- CEO：成本與風險（「此設計可降低 30% 雲端成本」）
- PM：時程與範圍（「新功能上線時間可縮短」）
- 開發團隊：技術與開發體驗（「可移除大量 Boilerplate」）

### 第 12 章　需求量化與約束條件
#### 12.1 拒絕形容詞
- 💡 重點：每個形容詞都必須對應一個數字
- 「要快」→ P95 < 200ms；「要穩」→ 99.9% Availability
#### 12.2 NFR 五大指標
- Performance：P95 / P99 Latency、Throughput
- Load：尖峰規劃 = 平時負載 × 預期倍數 × 1.5 安全係數
- Data Volume：五年資料成長模型
- Availability：99.9% ≈ 每年停機 8.8 小時；99.99% ≈ 52.6 分鐘
- Concurrency：同時在線人數與行為模式
#### 12.3 約束條件的否決權
- 💡 重點：約束條件往往比功能需求更具決定性
- Deadline：時程是第一驅動力
- Skill：團隊不熟悉的技術，再快也不該選
- Operations：無人能維運的系統，上線之日就是故障之始
#### 12.4 理想架構與務實架構
- 📊 圖表：理想方案 vs. 受約束後的方案（例：Kafka → Managed Queue，因缺乏 SRE 人力）

### 第 13 章　架構設計流程與決策紀錄
#### 13.1 七步架構設計流程
- ① Understand：以 5W2H 將模糊需求轉為技術指標
- ② Conceptualize：以 DDD 建立領域模型，暫不涉及技術
- ③ Select：以 TCO 評估技術選型
- ④ Design：產出 C4 Model、API Spec、安全設計
- ⑤ Validate：Architecture Review，找出風險
- ⑥ Guide：以 Code Review 與範例程式碼確保實作不偏離
- ⑦ Evolve：依運行數據持續改善，以 Strangler Fig 汰換舊系統
#### 13.2 ADR（Architecture Decision Record）
- 💡 重點：錯誤的決策可以修正，消失的決策理由會讓重構失控
- 三要素：Context、Decision、Consequences（含被否決的方案）
#### 13.3 TCO 與 Technical Debt
- TCO 冰山：可見的開發成本約兩成，維運與債務占多數
- Technical Debt 是為了短期交付而借的長期貸款
- 還債策略：固定約 20% 工時處理債務；以 Strangler Fig 漸進替換，避免全面重寫
#### 13.4 七步流程與 Agent Pipeline
- 💡 重點：七步流程可以直接拆成七個 Agent 節點，以結構化 Context 串接
- 📊 圖表：需求分析 → 領域建模 → 技術策略 → 系統設計 → 風險評估 → 技術主管 → 演進守護
- 🎤 講者備註：Agent 之間傳遞結構化資料（JSON / YAML），不傳遞自然語言

### 第 14 章　品質屬性與分散式設計原則
#### 14.1 品質屬性模型
- 參考標準：ISO/IEC 25010
- Functional Suitability、Performance Efficiency、Compatibility、Usability
- Reliability、Security、Maintainability、Portability
- 🎤 講者備註：2023 版新增 Safety，並調整部分名稱
#### 14.2 Quality Attribute Scenario
- 💡 重點：品質要求要寫成可測試的情境，而不是口號
- 格式：來源 → 刺激 → 環境 → 回應 → 量測
- 範例：午餐尖峰 5 倍流量時，推薦 API 的 P95 < 500ms
#### 14.3 品質屬性的取捨
- 💡 重點：完美的系統不存在，先選出對業務最重要的前三個品質屬性
- 提升 Security 常犧牲 Performance；提升 Consistency 常降低 Availability
#### 14.4 CAP Theorem 與資料庫選擇
- 網路分區必然發生時，只能在 CP 與 AP 之間選擇
- ACID：交易關鍵資料（PostgreSQL、MySQL）
- BASE：大規模擴展（Cassandra、DynamoDB）
- Cache：Redis
#### 14.5 分散式系統五大原則
- Loose Coupling：避免共用資料庫與循環相依
- Stateless：伺服器不保存 Session，才能水平擴展
- Caching：以空間換取時間（Browser → CDN → Application → Database）
- Communication：同步即時但耦合高；非同步可靠且能緩衝尖峰流量
- Observability：Metrics、Logs、Traces
#### 14.6 Four Golden Signals
- Latency、Traffic、Errors、Saturation

### 第 15 章　架構模式的選擇
#### 15.1 Layered Architecture 與 Clean Architecture
- Presentation → Application → Domain → Infrastructure
- 💡 重點：相依方向一律指向 Domain，核心業務規則不感知外層技術
#### 15.2 Design Pattern 是人與 AI 的共同語言
- 💡 重點：以 Pattern 名稱下指令，比描述行為更精準
- 常用：Factory、Builder、Facade、Adapter、Repository、Observer、Strategy
- 🔗 對應：9.3 提問設計
#### 15.3 複雜度守恆
- 💡 重點：進階模式不會消除複雜度，只是把程式碼複雜度換成分散式維運複雜度
- 🎤 講者備註：You are not Google
#### 15.4 架構型態決策樹
- 預設：Monolith
- 規模或複雜度上升 → Modular Monolith
- 需要獨立部署與擴展 → Microservices（前提：快速佈建、Distributed Tracing、DevOps 文化）
- 讀寫比例極端 → CQRS
- 需要完整稽核與重播 → Event Sourcing

## Part V　How：實戰——從 0 到 1 打造 AI 點餐外送推薦 App
### 情境設定
- 產品：依口味、時段、天氣、預算推薦餐點的外送 App
- 團隊：兩位工程師 + 多個 Agent
- 規模：單一城市、5 萬名使用者、300 家餐廳
- 尖峰：午餐時段（11:30–13:00）流量為平時 5 倍
- 目標：三個月完成 MVP；每筆訂單 AI 成本 < NT$0.5
- 使用者類型：訂餐者、店家、外送員
- 🎤 講者備註：以下數字為教學用設定，全課沿用
### 章節與文件對照
- 📊 圖表：第 16 章 PRD → 第 17 章 SRS → 第 18 章 SAD → 第 19 章 SDS → 第 20 章 Test → 第 21 章 Runbook
- 🎤 講者備註：走完 Part V，V-Model 左右兩側都會走一遍

### 第 16 章　需求定義：PM 與 UX/UI
#### 16.1 角色 R&R 與產出
- PM
  - 職責：定義做什麼、為什麼做、不做什麼
  - 價值：把商業目標轉為可驗收的需求
  - 存在理由：缺少對「做對的事」負責的人，團隊會把對的東西做錯
  - 產出：PRD、User Story、優先順序、Success Metrics
- UX/UI
  - 職責：設計使用者完成任務的路徑
  - 價值：讓需求成為可操作的流程
  - 存在理由：功能正確，使用者卻找不到或不會用
  - 產出：User Flow、Wireframe、Prototype、Design System
#### 16.2 情境：「推薦要準」的定義
- 📖 情境：老闆要求「比現有外送平台更懂我」，沒有任何數字
#### 16.3 架構演進 v1：PRD 與需求量化
- 推薦結果 P95 < 500ms
- 新使用者 Cold Start：三個問題內產生第一次推薦
- 推薦點擊率 > 15%
- 範圍外：MVP 不做團購、不做訂閱制
- 🔗 對應心法：4.2 PRD、12.1 拒絕形容詞、12.2 NFR 五大指標
#### 16.4 AI 的角色定位
- 擅長：訪談紀錄整理成 PRD 草稿、列出遺漏情境、產生 Wireframe
- 不擅長：判斷需求的商業價值、決定不做什麼
#### 16.5 Orchestrator 調度方式
- 輸入：老闆訪談紀錄、競品截圖
- 執行者：PM Skill 產出 PRD 與待釐清問題；UX Skill 產出 Happy Path 與 Unhappy Path
- 驗收標準：每項需求都有數字或驗收條件；例外情境（附近無餐廳、雨天、超出預算）皆有對應畫面

### 第 17 章　系統分析：SA
#### 17.1 角色 R&R 與產出
- SA（System Analyst）
  - 職責：將業務語言轉為可實作的流程與規格；界定系統邊界
  - 價值：讓每一條需求都能被實作、被測試、被追溯
  - 存在理由：PM 講的是業務，工程師要的是規則；沒有轉譯，例外流程就由工程師自行猜測
  - 產出：SRS、Context Diagram、Use Case、Activity / Sequence Diagram、State Machine、業務規則表
#### 17.2 SA 的三項核心工作
- 規格：把 User Story 拆成編號的 FR，並附驗收條件
- 流程：畫出主流程與每一條例外流程
- 邊界：界定範圍內外、外部系統與系統責任歸屬
#### 17.3 情境：下單後店家一直不接單，怎麼辦？
- 📖 情境：PRD 只寫「使用者可以下單」，工程師各自假設：有人等 30 分鐘、有人立刻退款
#### 17.4 架構演進 v2：SRS——邊界、流程與規則
- Context Diagram：金流、地圖、LLM API 為外部系統，不在實作範圍內
- 訂單 State Machine：已下單 → 店家接單 → 備餐中 → 已取餐 → 已送達
- 例外規則：店家 5 分鐘未接單 → 自動改推薦同類餐廳；15 分鐘 → 取消並退款
- FR 編號與 PRD 目標對應，建立 Traceability Matrix
- 每條 FR 附 Given / When / Then 驗收條件
- 📊 圖表：Context Diagram 與訂單 State Machine
- 🔗 對應心法：4.3 SRS、4.8 Shift Left、4.9 Traceability Matrix
#### 17.5 AI 的角色定位
- 擅長：由 PRD 展開 Use Case、列舉例外流程、產生 State Machine 草稿、檢查需求是否矛盾
- 不擅長：得知真實的業務規則（店家實際接單時間、退款相關法規）
#### 17.6 Orchestrator 調度方式
- 輸入：v1 PRD、訪談紀錄、店家營運資料
- 執行者：SA Skill 依 ISO/IEC/IEEE 29148 結構產出 SRS、Use Case、State Machine
- 驗收標準：每條 FR 都能追溯到 PRD；每條 FR 都有驗收條件；每個狀態都有例外路徑；業務規則由人確認

### 第 18 章　架構設計：Architect
#### 18.1 角色 R&R 與產出
- Architect
  - 職責：依品質要求決定系統如何切分、如何連接、故障時如何應對
  - 價值：管理整體品質，在約束條件下做出可負擔的取捨
  - 存在理由：錯誤的架構決策，後續每個角色都要付出代價
  - 產出：SAD、C4 Model、Quality Attribute Scenario、ADR、技術選型、風險清單
#### 18.2 情境：LLM 回應需 3 秒，推薦須在 500ms 內顯示
- 📖 情境：同步呼叫 LLM 的 Demo 效果很好，壓力測試全數失敗
#### 18.3 選定前三個品質屬性
- Performance Efficiency：推薦 P95 < 500ms
- Reliability：午餐尖峰下單不中斷
- 成本（約束條件）：每筆訂單 AI 成本 < NT$0.5
- 每項寫成 Quality Attribute Scenario
#### 18.4 模型選型
- 依第 6 章比較價格、Context 與資料落地位置
- Re-ranking 與推薦理由屬高頻、低難度任務 → 選用低價模型
- 客服與複雜查詢 → 保留旗艦模型
- ADR-002：模型選型與資料落地位置
- 🔗 對應：6.2 代表模型與 API 價格、6.4 台灣企業的選用考量
#### 18.5 架構演進 v3：SAD——LLM 移出同步關鍵路徑
- 推薦拆為三段：Retrieval（Vector Search + 規則）→ Re-ranking → Explanation
- Retrieval 同步回應；LLM 負責 Re-ranking 與推薦理由，非同步補上
- 尖峰時段預先計算熱門推薦並寫入 Cache
- 採 Modular Monolith 起步，推薦模組保留獨立拆分的邊界
- ADR-001：不將 LLM 置於同步關鍵路徑（含被否決的方案與理由）
- 📊 圖表：C4 Container Diagram
- 🔗 對應心法：4.4 SAD、14.2 Quality Attribute Scenario、14.5 Communication、15.3 複雜度守恆、15.4 架構型態決策樹、13.2 ADR
#### 18.6 AI 的角色定位
- 擅長：列出候選架構、比較優缺點、繪製草圖、找出遺漏的故障模式
- 不擅長：在預算與團隊能力下做最終決策
#### 18.7 Orchestrator 調度方式
- 輸入：v2 SRS、NFR、約束條件（兩人、三個月、成本上限）
- 執行者：Architect Skill 產出三個方案與取捨比較
- 驗收標準：由人做決策並撰寫 ADR；每個 Quality Attribute Scenario 都能在架構圖上找到對應設計

### 第 19 章　細部設計：SD 與 DBA
#### 19.1 角色 R&R 與產出
- SD（System Designer）
  - 職責：將架構拆解為可實作的模組與介面
  - 價值：讓多人或多個 Agent 並行開發而不互相衝突
  - 存在理由：架構圖的粒度太粗，無法直接實作
  - 產出：SDS、Module Diagram、API Spec（OpenAPI）、Event Schema
- DBA
  - 職責：設計資料的儲存、查詢與成長方式
  - 價值：資料是系統中最難修改的部分
  - 存在理由：Schema 設計錯誤，修正時會波及所有程式碼
  - 產出：ER Diagram、Schema、Migration、Index 策略
#### 19.2 情境：使用者口味資料散落各處
- 📖 情境：訂單、點擊紀錄、評分分散在三處，推薦模組無法取得
#### 19.3 架構演進 v4：SDS——資料流與介面契約
- 領域實體：User、Restaurant、Dish、Order、Courier、Behavior Event
- Behavior Event 經 Message Queue 更新使用者口味向量
- PostgreSQL（交易資料）+ Redis（Cache）+ Vector DB（推薦）
- 模組之間以 OpenAPI 定義契約
- 📊 圖表：點擊 → Event → 口味向量 → Retrieval
- 🔗 對應心法：4.5 SDS、14.4 ACID 與 BASE、14.5 Loose Coupling、15.1 Clean Architecture
#### 19.4 AI 的角色定位
- 擅長：由 SRS 產生 ER 草稿、撰寫 Migration、產生 OpenAPI 骨架
- 不擅長：預估資料成長趨勢、判斷未來可能變動的欄位
#### 19.5 Orchestrator 調度方式
- 輸入：v3 SAD、ADR、Use Case
- 執行者：SD Skill 產出 API Spec；DBA Skill 產出 Schema 與 Migration
- 驗收標準：Spec 通過 Lint；Migration 可 Rollback；每個查詢都有對應 Index

### 第 20 章　實作與驗證：Developer 與 QA
#### 20.1 角色 R&R 與產出
- Developer
  - 職責：將規格實作為可執行的程式
  - 價值：做得出來，而且可維護
  - 存在理由：規格不會自己執行
  - 產出：Source Code、Unit Test、Pull Request
- QA
  - 職責：依各層規格設計測試，證明實作正確並找出錯誤
  - 價值：品質由設計決定，但需要獨立驗證
  - 存在理由：撰寫者最難看見自己的盲點
  - 產出：Test Plan、Test Case、Bug Report、Test Report
#### 20.2 情境：測試全數通過，卻推薦牛排給素食者
- 📖 情境：推薦程式與測試都由同一個 Agent 撰寫，全部通過
#### 20.3 V-Model 在點餐 App 的四層測試
- Unit Test（對應 SDS）：飲食禁忌過濾函式
- Integration Test（對應 SAD）：訂單與支付之間的 Contract Test
- System Test（對應 SRS）：完整下單流程、店家逾時未接單、尖峰負載測試
- Acceptance Test（對應 PRD）：以推薦點擊率與店家試營運驗收
#### 20.4 架構演進 v5：驗證層
- LLM Eval：人撰寫 50 筆 Golden Case，AI 擴充為 500 筆
- Guardrail：過敏與飲食禁忌為硬性規則，不交由 LLM 判斷
- 測試由 QA Agent 依規格獨立產生，不與實作共用 Context
- 📊 圖表：推薦流程加入「規則過濾」與「Eval」兩道關卡
- 🔗 對應心法：4.6 V-Model、4.7 Verification 與 Validation、8.4 常見陷阱與防範機制
#### 20.5 工具的選用
- 單一功能實作 → IDE 或 CLI Agent，一次一個任務
- 可獨立驗收的平行任務（例：各模組的 Unit Test）→ Cloud Agent
- 🔗 對應：7.5 選擇工具的原則、9.6 程式碼的 AI 味
#### 20.6 AI 的角色定位
- 擅長：依規格實作、撰寫 Boilerplate 測試、Refactor、修正 Lint
- 不擅長：驗收自己的產出、判斷業務邏輯是否正確
#### 20.7 Orchestrator 調度方式
- 輸入：v4 SDS、SRS 驗收條件、Golden Case
- 執行者：Developer Agent 一次一個任務、小幅度 Diff；QA Agent 依 V-Model 各層獨立產生測試
- 驗收標準：關鍵測試由人撰寫；每個 FR 都有對應的測試案例；Eval 分數達標才 Merge

### 第 21 章　部署與維運：DevOps 與 SRE
#### 21.1 角色 R&R 與產出
- DevOps / SRE
  - 職責：讓系統可部署、可觀測、可復原
  - 價值：上線不是終點，而是系統真正開始運作
  - 存在理由：開發環境可執行，不代表能承受尖峰流量
  - 產出：CI/CD Pipeline、IaC、Monitoring Dashboard、Runbook、SLO
#### 21.2 情境：尖峰流量五倍，LLM 費用一天用掉一個月預算
- 📖 情境：每次 Re-ranking 都呼叫 LLM，沒有 Cache，也沒有費用上限
#### 21.3 架構演進 v6：可觀測性與降級機制
- 監控指標：Latency、Error Rate、每筆訂單 AI 成本
- Graceful Degradation：LLM 故障或超出預算時退回規則推薦，App 不中斷
- 成本控管：每日 LLM 預算上限、Cache Hit Rate
- 部署流程：CI 自動測試 → Canary Release → 一鍵 Rollback
- 📊 圖表：完整六大組成架構圖，Operations Layer 涵蓋全局
- 🔗 對應心法：5.2 Token 與計價、14.6 Four Golden Signals、13.1 ⑦ Evolve
#### 21.4 AI 的角色定位
- 擅長：撰寫 Dockerfile、IaC、CI 設定；分析 Log；起草 Runbook
- 不擅長：判斷是否應在尖峰時段部署；承擔正式環境權限的後果
#### 21.5 Orchestrator 調度方式
- 輸入：v5 系統、SLO 目標
- 執行者：DevOps Skill 產出 Pipeline、監控設定與 Runbook
- 驗收標準：實際演練一次 Rollback；正式環境權限不交給 Agent

## Part VI　總結：AI Builder 的工作模式
### 第 22 章　從文件鏈到工作流程
#### 22.1 架構與文件的演進
- 📊 圖表：v1 PRD → v2 SRS → v3 SAD → v4 SDS → v5 驗證層 → v6 維運
#### 22.2 Orchestrator 工作流程
- 💡 重點：定義 → 調度 → 驗收 → 固化
- 📊 圖表：第 16–21 章的「輸入、執行者、驗收標準」串成一條 Pipeline，並疊上 V-Model
#### 22.3 Agent 自主權的四個前提
- 💡 重點：Autonomy is earned by verification
- 可觀測（Observe）
- 可評估（Evaluate）
- 可中止（Stop）
- 可回復（Rollback）
#### 22.4 結語
- 💡 重點：AI 時代工程師的價值在於定義、提問與驗收，不在於輸入速度
- 🎤 講者備註：回扣第 0 章的微笑曲線

## 附錄
### A　九個角色 R&R 速查表
### B　規格文件範本：PRD、SRS、SAD、SDS
### C　V-Model 測試層級對照表
### D　Traceability Matrix 範本
### E　模型與工具價格總表（⏱ 查核日 2026-09-29）
- 美國派模型
  - Claude Fable 5.1：$10 / $50，1M（platform.claude.com）
  - Claude Opus 5.5：$4 / $20，1M（platform.claude.com）
  - GPT-6 Astra：$10 / $50（developers.openai.com）
  - GPT-6 Sol：$2 / $10（developers.openai.com；有第三方來源報 $5 / $30，以官方為準）
  - Gemini 3.1 Pro Preview：$2 / $12，200K 以內（ai.google.dev）
  - Gemini 3.8 Flash：$0.75 / $3.75，2027-01-01 起價格加倍（ai.google.dev）
  - Grok 4.7：$2 / $6（200K 以內）、$4 / $12（超過 200K），500K（docs.x.ai）
- 中國派模型
  - DeepSeek V4-Pro：$1.32 / $3.96（尖峰，離峰半價），1M，MIT，1.6T / 49B（api-docs.deepseek.com、Hugging Face）
  - Qwen3.8-Max：$2 / $6（新加坡端點），1M（alibabacloud.com）
  - Kimi K3：$3 / $15（第三方來源），1M，自訂授權，2.8T / 104B（Hugging Face）
  - GLM-5.3：$1.40 / $4.40（docs.z.ai）；參數量約 744B / 40B（第三方來源）
  - MiniMax-M3：$0.30 / $1.20（512K 以內），1M，開放權重，428B / 23B（第三方來源）
- AI Coding 工具（個人方案月費，USD）
  - Claude Code：$20 / $100 / $200
  - Codex：ChatGPT Go $8 / Plus $20 / Pro $100 起
  - Cursor：$20 起
  - GitHub Copilot：Free / $10 / $39 / $100（點數計費）
  - Devin（含 Windsurf）：$20 / $200
  - Kiro：$20 / $40 / $100 / $200
  - Trae：$20 / $60 / $200
  - Antigravity CLI（原 Gemini CLI）：含在 Google AI Pro $19.99、Ultra $99.99 起
  - Kimi Code：含在 Kimi 會員 $19 起
  - Qoder CN（原通義靈碼）：Pro ¥59、Pro+ ¥169
  - v0：$30；Bolt：$25；Replit：$18 / $90（年繳）
- 待查證：JetBrains AI、Lovable、CodeGeeX 的價格；各模型 Coding Benchmark 分數（官方多改用 DeepSWE，暫不上投影片）
### F　AI 能力邊界與常見陷阱
### G　提問設計檢核表與 AI 味禁用清單
### H　ADR 範本
### I　NFR 量化檢核表
### J　點餐 App 情境數據表
### K　術語表
- PRD、SRS、SAD、SDS、NFR、SLA、SLO、ADR、C4 Model、TCO、CAP、ACID、BASE
- V-Model、Verification、Validation、UAT、Traceability Matrix、Gherkin
- Token、Context Window、MoE、Open Weights、RLHF、Context Engineering
- DDD、CQRS、Event Sourcing、Strangler Fig、IaC、CI/CD、RAG、Eval、Guardrail
- 標準：ISO/IEC/IEEE 29148、ISO/IEC/IEEE 42010、IEEE 1016、ISO/IEC 25010、ISO/IEC/IEEE 29119、ISTQB

## 編排檢核
- 用詞：台灣科技書慣用語（程式碼、資料、介面、品質、元件、維運、使用者、預設）
- 專有名詞保留英文，第一次出現時附中文說明
- Part II–IV 每一章都從前一章推導而來
- Part V 每章順序固定：R&R → 情境 → 架構演進 → AI 定位 → Orchestrator 調度
- Part V 每章的架構決策都要標註 🔗 對應心法
- ⏱ 時效資料一律標註查核日，授課前重新查核
- 只讀大標與小標，必須能看出完整的課程結構
