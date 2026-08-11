# Workshop Demo · SmartTrip FX 角色扮演工作坊

這份 `demo/` 是一套**會議室角色扮演**工作坊的對照標準。
所有檔案圍繞同一個案例：**SmartTrip FX**（旅遊外幣費用試算 App，[原始 PRD](../PRD.md)）。

> **核心精神**：學員學的是「**在企業 SDLC 的不同會議裡，怎麼扮演好那個角色、怎麼問對問題、怎麼逼出選擇**」。
> Prompt 工程與文件 markdown 化是 AI 的活（交給 `card-fill` skill + [`product_to_launch`](../product_to_launch/) 站台處理），
> 學員的注意力應該 100% 放在**提問題、提需求、提方案**。

---

## 設計理念：教室裡只做會議實戰

| 層 | 職責 | 工具 |
|---|---|---|
| **教室**（學員 + 老師） | 角色扮演、提問、push back、做選擇、原始筆記 | 紙、白板、口頭 |
| **AI 渲染** | 把會議筆記轉成符合契約的 markdown deliverable | `card-fill` skill |
| **站台** | 模板查閱、上游契約、學員成果上傳、對照範本 | [`product_to_launch`](../product_to_launch/) Next.js 站 |

**三層不重疊。「不在教室碰 prompt」是這個工作坊脫離『Claude 操作課』的關鍵設計。**

---

## 結構說明

```
demo/
├── README.md                ← 你正在讀的這份
├── 種子簡報.md               ← SmartTrip FX 的 brief（= /start/ 問卷產出的 project-brief.md）
├── derived/                 ← AI 推導 · 待審定的 43 份案例（非工作坊教材，見下方說明）
│
├── 01-discovery/
│   ├── 01-jtbd/             ← 訪談覆盤會（PM 主責）
│   │   ├── 角色場景.md       ← 50 行：誰在什麼會議、要拿走什麼、禁忌動作
│   │   ├── 關鍵提問.md       ← 100 行：PM 必問 5–7 題 + 為什麼 + 好壞答案 + push back
│   │   └── SmartTrip示範.md  ← 200 行：用種子簡報答完 6 題 + 現場對話 + 下游影響
│   └── 02-value-hypothesis/ ← 假設定義會（PO 主責）
│
├── 02-define/
│   ├── 03-prd/              ← 範圍對齊會（PM 主責）
│   └── 04-acceptance-criteria/ ← 驗收條件工作坊（QA 主責）
│
├── 03-design/
│   ├── 05-adr/              ← 架構決策會（Architect 主責）
│   ├── 06-c4-diagram/       ← 系統脈絡白板會（Architect 主責）
│   ├── 07-api-spec/         ← 介面契約會（Architect 主責）
│   ├── 08-data-model/       ← 資料模型會（Dev 主責）
│   └── 09-non-functional-reqs/ ← 非功能需求會（DevOps 主責）
│
├── 04-build/
│   ├── 10-code-review-checklist/ ← 團隊規範會（Dev 主責）
│   └── 11-unit-test/        ← 測試策略會（Dev 主責）
│
├── 05-ship/
│   ├── 12-release-plan/     ← 上線排程會（PO 主責）
│   └── 13-rollback-plan/    ← 回滾預演會（DevOps 主責）
│
└── 06-operate/
    ├── 14-runbook/          ← On-call 交接會（DevOps 主責）
    └── 15-postmortem/       ← 事件回顧會（DevOps 主責）
```

**每張卡資料夾固定三個檔案**：

- `角色場景.md` — 這場會議在做什麼、誰在場、你扮的角色、禁忌動作、結束時桌上要有什麼
- `關鍵提問.md` — 主責角色必問的 5–7 個尖銳問題 + 送命題清單
- `SmartTrip示範.md` — 用種子簡報實際把問題答一遍 + 現場對話片段 + 下游影響

---

## 兩種案例，地位不同

站台 [`product_to_launch`](../product_to_launch/) 的交付物卡會顯示 SmartTrip 案例，來源有兩類，**不可混用**：

| | `demo/<階段>/<NN-slug>/SmartTrip示範.md` | `demo/derived/<slug>.md` |
|---|---|---|
| 數量 | **15**（本工作坊的 15 卡） | **43**（其餘交付物） |
| 產製方式 | **手刻**，課堂實跑後收斂 | **AI 依 canon 推導** |
| 審定狀態 | 已審定 | **未審定** |
| 站上標示 | 無標示，直接顯示 | **「AI 推導 · 待審定」** |
| 可以拿來 | 當標準答案對照、當教材 | **看結構與提問方式**；數字與細節需自行查核 |

`derived/` 的每一份都由 [`種子簡報.md`](./種子簡報.md) + 根目錄 [`PRD.md`](../PRD.md) + 既有 15 份手刻示範推導而成，
並在檔頭與文末保留 `Confidence` 與 `TODO` 欄位標示哪些內容沒有依據。

> **為什麼要標示**：站台原本的文案是「不以 AI 臨時生成的內容冒充實際案例」。
> 補上案例之後，這句承諾靠的就是**標示**而不是**留白** — 審定過的與推導的必須一眼分得出來。

**審定流程**：逐份人工看過並修正後，`git mv demo/derived/<slug>.md demo/curated/<slug>.md`。
站台會自動改判為 curated 並移除標示，**不需要改任何程式碼**（掃描規則見 `product_to_launch/lib/deliverable-learning.ts`）。

> `curated/` 是「審定過但不屬於 15 卡工作坊」的位置。
> 審定不等於升格成工作坊卡 — 後者需要另外補 `角色場景.md` 與 `關鍵提問.md`，並重排卡號。

---

## 15 卡角色—會議—產出 矩陣

| # | 卡 | 主責角色 | 在場其他角色 | 會議類型 | Time-box | 1 行會議目的 |
|---|---|---|---|---|---|---|
| 01 | JTBD | PM | UX, PO | 使用者訪談覆盤會 | 60m | 把 5 份逐字稿翻成 3–5 條 JTBD + 鎖死成功門檻 |
| 02 | Value Hypothesis | PO | PM, UX | 假設定義會 | 45m | 把 JTBD 成功門檻轉成可證偽的 H1/H2/H3 + 驗證窗 |
| 03 | PRD | PM | PO, UX, Architect | 範圍對齊會 | 90m | JTBD + 假設 → P0/P1/P2 需求 + user story |
| 04 | Acceptance Criteria | QA | PO, Dev | 驗收條件工作坊 | 60m | 每條 P0 寫 Given/When/Then + 失敗條件 |
| 05 | ADR | Architect | Dev, SA | 架構決策會 | 60m | 對單一決策列 ≥3 選項 + trade-off + 拒絕理由 |
| 06 | C4 Diagram | Architect | SA, Dev | 系統脈絡白板會 | 75m | 畫 Context／Container／Component 三層 |
| 07 | API Spec | Architect | Dev | 介面契約會 | 60m | 鎖死 endpoint／payload／錯誤碼／版本策略 |
| 08 | Data Model | Dev | Architect | 資料模型會 | 60m | 實體／關係／索引／敏感欄位標記 |
| 09 | NFR | DevOps | Architect, SA | 非功能需求會 | 60m | 性能／可用性／安全／成本目標 + 量測方式 |
| 10 | Code Review Checklist | Dev | Architect, QA | 團隊規範會 | 45m | 本專案 PR review 必查 8–12 條 |
| 11 | Unit Test | Dev | QA | 測試策略會 | 45m | 必測函數 + coverage 目標 + mock 邊界 |
| 12 | Release Plan | PO | DevOps, PM | 上線排程會 | 60m | feature flag／rollout 階段／Go-No-Go 條件 |
| 13 | Rollback Plan | DevOps | PO, Dev | 回滾預演會 | 45m | 失敗信號／回滾動作／資料相容性 |
| 14 | Runbook | DevOps | Dev, QA | On-call 交接會 | 60m | 5 大 incident 的偵測→診斷→緩解→escalation |
| 15 | Postmortem | DevOps | PM, Dev, QA | 事件回顧會（blameless） | 90m | 時間軸／根因／貢獻因素／action items + owner |

**角色輪替覆蓋**：PM ×2，PO ×2，QA ×1，Architect ×3，Dev ×3，DevOps ×4。
跑完 15 卡 = 體驗 5–6 個角色的思考方式。

> 若是 UX-heavy cohort，可把 04-AC 主責換成 UX 視角的「故事邊界工作坊」。

---

## 教學節奏

**總時長**：15 場會議 × 平均 60 min + 25% 過場／角色簡報／debrief + card-fill demo（15 × 10 min）
≈ **22 小時實際接觸時間**

**建議排程**：

| 變體 | 對象 | 安排 |
|---|---|---|
| 3 天密集 bootcamp | 全職學員 | Day 1: 卡 01–04 / Day 2: 卡 05–09 / Day 3: 卡 10–15 |
| 6 週夜間 cohort | 在職工程師 | 每週 1 晚 2 卡（相依卡成對：01+02、03+04、…） |

### 老師（你）每場做什麼

1. **開場讀** `角色場景.md`（5 min）——讓全班知道在哪場會議、你扮的是誰
2. **扮 push-back NPC**——按 `關鍵提問.md` 的「別人會 push back 什麼」欄位即興出招
3. **嚴守 time-box**——學員想偏題就喊「park it in decision log」
4. **debrief 時打開** `SmartTrip示範.md`（15 min）——對照「senior 會問什麼不一樣」
5. **Day 1 demo 一次** `card-fill` skill——之後課程不再花時間在 prompt

### 學員每場做什麼

1. **課前讀** `角色場景.md` + `關鍵提問.md`（20 min 作業）
2. **課堂扮主責角色**問 5–7 題 + 接 push back
3. **原始 bullet 筆記**——不寫 markdown、不寫 prompt、不查模板
4. **課後**自己跑 `card-fill register/check` 把筆記變 deliverable
5. **對照** `SmartTrip示範.md` 看自己漏問了什麼

---

## `card-fill` skill 怎麼接

學員的會議筆記 → AI 渲染 → 符合站台契約的 markdown deliverable：

```
/card-fill register 01-jtbd <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 [`product_to_launch/content/deliverables/<slug>.md`](../product_to_launch/content/deliverables/) 的範本結構自動產出。
**學員在教室裡不需要看 prompt、不需要看 trigger、不需要看 yaml frontmatter**。

---

## `product_to_launch` 站台怎麼接

| 時機 | 學員做什麼 |
|---|---|
| 工作坊前 | 進 [`/start/`](http://localhost:3000/start/) 填 5 題問卷 → 下載自己專案的 `project-brief.md`（= 你的種子簡報） |
| 每場會議前 5 分鐘 | 進 [`/workshop/<slug>`](http://localhost:3000/workshop/) 看那張卡的模板與上游契約（pre-read 用） |
| 每場會議後 | 跑 `card-fill` → 把 markdown 結果丟回 `student-projects/<name>/` |
| 工作坊結束 | 拿到 15 份自己專案的 markdown 技術文件——可直接餵 AI coder 起步 |

---

## 上下游關係

不是隨機 15 張卡，是有依賴順序的：

```
01 JTBD ─→ 02 Value Hypothesis ─→ 03 PRD ─→ 04 AC ─→ 05 ADR ─┐
                                                              ↓
              ┌─────────────────────────────────────── 06 C4 ─┤
              ↓                                                ↓
        09 NFR ←──────────────── 07 API Spec ←── 08 Data Model
              ↓
        10 Code Review ─→ 11 Unit Test ─→ 12 Release Plan ─→ 13 Rollback Plan
                                                                    ↓
                                                            14 Runbook ─→ 15 Postmortem
```

每張下游卡的 `SmartTrip示範.md` 末段「下游影響」會明示自己的哪個答案會變成下游卡的哪個欄位。
範例：JTBD Q3 的 success criteria 「誤差 < 15%」會直接變成 Value Hypothesis 的 H1 假設數字。

---

## 工作坊的最終產出（學員帶走什麼）

- ✅ 15 份自己專案的 markdown 技術文件（PRD、ADR、API Spec、Runbook…）
- ✅ 5–6 個角色的會議實戰經驗——下次參加類似會議能直接帶問題進場
- ✅ 對「AI native dev 中人與 AI 的職責邊界」有清楚判斷力
- ✅ 一套可重複的個人 SOP：訪談 → JTBD → PRD → ⋯ → Postmortem

---

## 對照學習：學員產出 vs SmartTrip 範例

每張卡的 `SmartTrip示範.md` 是「**senior 會怎麼答**」的對照標準。
debrief 時的關鍵討論題：「**我為什麼選 X，老師為什麼選 Y——trade-off 在哪？**」

範例對照軸：

- JTBD 卡：你的 mutually exclusive jobs 怎麼挑的？跟 SmartTrip 的「衝動 vs 精打細算」邏輯類似嗎？
- ADR 卡：你選 A 拒絕 B 的判準，跟 SmartTrip ADR 用的判準是同一類嗎？
- Postmortem 卡：你的 action items 有 owner 嗎？SmartTrip 範例為什麼每條都掛人？

---

## 開發者注意事項

- `SmartTrip示範.md`、`derived/*.md`、`curated/*.md` **會**在 build 時被讀入交付物卡的「案例」分頁
  （`product_to_launch/lib/deliverable-learning.ts`）。改動這些檔案要重跑 build 才會反映到站上。
- `角色場景.md` 與 `關鍵提問.md` 不會被 build，只作為課堂對照標準
- [`/workshop/`](http://localhost:3000/workshop/) 的「看 SmartTrip FX 標準答案」按鈕直接連到 GitHub 上的 demo/ blob
- 若要在站上開新路由直接 render demo（避免外連 GitHub），可參考 plan 檔的「不做的事」段落

---

## 授權

MIT · © 2026 桑尼資料科學 Lab · 與 [Launch Atlas](https://atlas.sunnydatascience.com/) 同源。
