# AI 時代的取捨與決策樹 — Pitch Deck 規劃書

> 場景：台上演講分享（15–20 分鐘），聽眾預設多少寫過程式。
> 定位：結論先行的 pitch deck，不是課程講義。
> 版本：v0.3 · 2026-08-13

---

## 一、一句話結論（全場只講這一句）

> **AI Engineering = 問題定義 × 環境 × 回饋 × 驗證。**
> 模型只是乘數——乘在 0.2 的工程系統上，十倍速度只是十倍速製造錯誤。

## 二、核心觀點

1. **判斷成為唯一稀缺品**：AI 把「寫」變便宜，錯誤型態從 syntax error 變成「測試全綠但 domain logic 是錯的」。
2. **Vibe vs SDD 是假對立**：同一條開發曲線的兩端，橫軸是「確定性」，不是時間。不知道的先 Vibe，知道的就固化，有人依賴就正式化。
3. **文件不是多就有用，重點是規格**：文件分三種——描述（會過期）、規格（可驗證）、證據（已驗證）。只有中間那種值得維護；規格的終極型態是可執行（schema / openapi / test）。
4. **九角色沒有消失，是被合併**：傳統 SDLC 九個角色本質上是九份文件的生產者。AI 合併了人，留下了產出鏈——問題從「要幾個人」變成「哪些文件值得寫」。
5. **自主權是驗證掙來的**：Autonomy is earned by verification, not by model IQ。

## 三、四支釣竿（交付物：四個聽眾能帶走的「問題」，不是答案）

| # | 釣竿 | 聽眾以後問自己的話 | 解決什麼 |
|---|---|---|---|
| 🎣① | 階段訊號 | 「出現不能隨便改的東西了嗎？第二個模組？重複 regression？忘記當初為什麼？」 | 何時 Vibe、何時 SDD——看訊號，不看週數 |
| 🎣② | 固化判準 | 「這個知識不寫下來，AI 下次會重新猜一次嗎？」 | 該寫哪些文件、固化到哪（Spec / Test / Contract / ADR） |
| 🎣③ | 錯誤歸層 | 「這個錯該修在哪一層——Test？Lint？Rule？Context？CI？」 | 錯誤變成系統升級的素材，不是重打 prompt |
| 🎣④ | 自主權四問 | 「我觀察得到？評估得到？停得下來？滾得回去？」 | 自動化能推到多極致——四個 Yes 才升一級 |

---

## 四、大綱：24 頁 · 五幕

| # | 標題（台上說出口的話） | 頁面內容 | 情緒目標 |
|---|---|---|---|
| 1 | （封面）AI 時代的取捨與決策樹 | 講題 + 一行副標 | — |
| 2 | 「Spec 寫了五千行，AI 一次生成了整個系統。」 | 冷開場：YC 真實案例——上線壞掉那天，沒人分得出錯在模型、介面還是實作 | 不安 |
| 3 | 更可怕的是：測試全綠 | 錯誤型態變了——架構合理、API 能跑、測試綠的，**domain logic 是錯的** | 被戳中 |
| 4 | **結論先給** | 乘法公式，全頁一句話 | 定錨 |
| 5 | 今天給四支釣竿，不給魚 | Roadmap：四個問題預告 | 期待 |

### 第一幕 · 為什麼判斷變稀缺

| # | 標題 | 內容 | 情緒 |
|---|---|---|---|
| 6 | Autonomy 跑得比 Oversight 快 | Stanford SWE-chat 數據：41% session 已是 vibe 型態、AI 幾乎不主動問、安全漏洞引入率更高 | 證據 |
| 7 | Spec ≠ Truth，綠燈 ≠ Truth | 只有 Evidence 是 truth：**No Evidence, No Done** | 立規 |

### 第二幕 · 何時 Vibe 何時 SDD——以及文件的真相

| # | 標題 | 內容 | 情緒 |
|---|---|---|---|
| 8 | Vibe vs SDD 是假對立 | 同一條曲線的兩端：橫軸是確定性，不是時間 | 反轉 |
| 9 | Progressive SDD 四階段 | Explore → Stabilize → Systemize → Productize；文件量跟「確定性 × 風險 × 依賴人數」走 | 框架 |
| 10 | 🎣① 升級看四個訊號，不看週數 | 不能隨便改的東西出現／第二個模組／重複 regression／忘記當初為什麼 | **釣竿** |
| 11 | 回頭看：九個角色，其實是九份文件 | SDLC 九角色一張圖，每人一行：PM→PRD、UX→Flow、SA→SRS、Architect→ADR、SD→模組圖、DBA→Schema、Dev→Code、QA→Test Plan、DevOps→Runbook | 恍然 |
| 12 | AI 合併了人，留下了產出 | 角色壓縮成 2-3 人，但產出鏈一份都沒少——問題變成：哪些值得寫？ | 轉場 |
| 13 | **文件不是多就有用** | 核心觀點頁：Waterfall 死在文件成本 > 溝通成本。文件三分——描述（會過期）／規格（可驗證）／證據（已驗證）。只有中間那種值得維護 | **核心觀點** |
| 14 | 🎣② 這個知識，AI 下次會重新猜嗎？ | 會 → 固化：Requirement→Spec、Behavior→Test、Interface→Contract、Decision→ADR | **釣竿** |
| 15 | 規格的終極型態是可執行 | 一段會過期的 Markdown vs `class UserRequest(BaseModel)` / openapi.yaml——能當真相的不要寫成散文 | 金句 |

### 第三幕 · 開發流程的演進

| # | 標題 | 內容 | 情緒 |
|---|---|---|---|
| 16 | 迴圈變成這樣了 | Frame → Challenge → Contract → Execute → Verify → Learn 一張圖 | 全景 |
| 17 | 🎣③ AI 犯錯，你修哪一層？ | 錯誤不是重 prompt 的理由，是升級系統的素材：Test? Lint? Rule? Context? CI?——**Failure becomes Harness** | **釣竿** |
| 18 | Repo 是 AI 的長期記憶 | 沒沉澱進 repo 的決策（Slack、口頭、腦袋），對下一個 context 的 agent 等於從沒發生過 | 洞察 |

### 第四幕 · 自動化的極致

| # | 標題 | 內容 | 情緒 |
|---|---|---|---|
| 19 | 那……什麼時候可以去喝咖啡？ | 全場最想問的問題，單獨成頁 | 懸念 |
| 20 | 錯誤答案：模型夠聰明就可以 | 正解：**Autonomy is earned by verification** | 反轉 |
| 21 | Autonomy Ladder：L0 → L7 | 階梯圖（Explain → Suggest → Edit → Execute → Iterate → Long Run → Multi-Agent → Production），標「多數人卡在 L2 卻想跳 L7」 | 對號入座 |
| 22 | 🎣④ 升級前回答四問 | Observe? Evaluate? Stop? Rollback? 四個 Yes 才升一級 | **釣竿** |

### 第五幕 · 收線

| # | 標題 | 內容 | 情緒 |
|---|---|---|---|
| 23 | 三句口訣 | 不知道的，先 Vibe／知道的，就固化／有人依賴，就正式化 | 帶走 |
| 24 | 「設計一個敢讓 AI 寫程式的系統」 | 收束一句 + QR（附錄自取） | 餘韻 |

### 附錄（備詢頁，不進主線，Q&A / QR 自取）

- 九角色完整速查卡（回收自 `ppt/90-appendix/00_role_cheatsheet.md`）
- Excel Traceability 五張表（Requirement → Spec → AC → TestCase → Evidence + Dashboard / Maturity / Readiness Score）
- AI Engineering Task Contract 模板（goal / why / context / constraints / non_goals / risks / acceptance / verification / stop_condition / human_gate）
- 12 類 Vibe Coding Failure Modes 對照表
- RACI 矩陣全表

---

## 五、設計意圖（為什麼這樣擺）

1. **結論在第 4 頁，懸念留到第 19 頁。** 公式先給，聽眾前兩分鐘就拿到帶走的東西；「到底能自動化到什麼程度」刻意壓到第四幕——先付訂金、再吊尾款。
2. **九角色放在頁 11-12，不放開頭。** 開頭放會變職涯介紹；放在 Progressive SDD 之後，它是「SDD 階段該寫哪些文件」的答案素材——亮出九角色=九份文件，聽眾自己會問「九份都要寫嗎？」，核心觀點（頁 13）在這個問句上落地，不用硬轉。
3. **「重點是規格」拆三頁遞進，不是一頁宣言。** 頁 13 破（文件多≠有用）、頁 14 立（什麼該固化）、頁 15 收（規格的極致是可執行）。聽眾自己推導到「該寫的是 contract 不是小作文」——這才是釣竿的給法。
4. **每支釣竿排在「痛完之後」。** 先看五千行 Spec 的災難才給階段訊號；先問「什麼時候能喝咖啡」才給四問。釣竿在餓的時候發才有人接。
5. **給魚的內容全部降級成附錄。** Excel 五張表、Task Contract、12 類 failure modes——塞進主線會變產品說明書。台上只留判斷規則，台下自取工具箱。

## 六、頁面風格守則（沿用手工感原則）

- 標題全部是「台上會說出口的句子」，禁止 `SECTION 1 · INSIGHT` 式 kicker 標籤。
- 一頁一念頭；密度頁之後排留白頁（一句話置中）控制呼吸。
- 每幕限用一次 highlight 框——整本畫線等於沒畫線。
- 冷開場、反轉頁用對話體 / 場景體，不用定義體。
- Source 引用移到 speaker notes，不佔版面。

## 七、素材複用對照

| 新 deck 頁面 | 來源 |
|---|---|
| 頁 11 九角色=九份文件 | `ppt/90-appendix/00_role_cheatsheet.md` 壓成一張圖 |
| 頁 9 Progressive SDD | ChatGPT 研究稿 · Progressive AI-Native Development 四階段 |
| 頁 10 四個升級訊號 | 同上 · Signal 1–4 |
| 頁 14 固化判準 | 同上 · 「文件升級規則」 |
| 頁 15 可執行規格 | 同上 · 「不應該寫 Markdown」段 |
| 頁 17 Failure becomes Harness | 同上 · SOP 第 ⑨ 步 LEARN |
| 頁 21-22 Autonomy Ladder + 四問 | 同上 · 「AI Autonomy Ladder」 |
| 附錄 Excel Traceability | 同上 · Requirement Traceability Pipeline 全套 |
| 附錄 RACI | `ppt/11-collaboration/02_overlap_matrix.md` |

> 舊 370 頁課程版（`ppt/`）不丟：定位為主線的彈藥庫 + 附錄來源，與本 pitch（`pitch/`）並存為兩條產品線。

## 八、下一步

1. 先做前 10 頁樣張（冷開場 → 釣竿①）+ 頁 11-15 核心觀點區，共 15 頁，驗節奏。
2. 節奏確認後補第三、四、五幕與附錄備詢頁。
3. Marp + anthropic theme，但拿掉 kicker / 框線結構感，走留白手工感。
