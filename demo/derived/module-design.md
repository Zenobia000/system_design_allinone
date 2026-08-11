# Module Design · 模組設計 · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + 根目錄 `PRD.md` v0.1 + `demo/03-design/06-c4-diagram` 推導，未經課堂實跑與人工審定。
> 與 `demo/03-design/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`c4-diagram`（6 個邏輯 container）、`adr` ADR-001　**下游**：`component-design`、`class-diagram`、`coding-standard`

---

## 1. Executive Summary

C4 已經把 SmartTrip 切成 6 個邏輯 container，跑在 1 個 PWA bundle。本文件把它落到**檔案系統與依賴規則**：

> **6 個模組，依賴只能單向往下流，`domain` 層不得 import 任何 adapter。**

三個設計判斷：

1. **依賴方向比模組切分更重要**。切錯還能改，方向錯了會長成球。
2. **adapter 是唯一能碰外部世界的層**（fetch、localStorage、analytics）。這條規則讓 `unit-test` 不需要任何 mock 框架。
3. **不引入 DI 容器**。6 個模組、2 個開發者，建構子傳參數就夠了。

---

## 2. Module Map

```
src/
├── app/                    ← [shell] Next.js 路由與頁面
├── components/             ← [shell] React 元件
│
├── domain/                 ← 純函數，零 I/O，零 framework
│   ├── planning/           ← M1 行程規劃引擎
│   ├── cash/               ← M2 換匯計算（frd BR-01）
│   ├── signal/             ← M3 燈號判定（frd BR-02，法規敏感）
│   └── expense/            ← M4 開支記錄
│
├── adapters/               ← 唯一允許 I/O 的層
│   ├── fx/                 ← M5 FX Adapter
│   ├── storage/            ← M6 Storage Adapter
│   └── analytics/          ← M7 Analytics（fire-and-forget）
│
└── shared/                 ← 型別、Money 值物件、錯誤型別
```

### 依賴方向

```
        app / components  (shell)
                 │
                 ▼
        ┌────────────────┐
        │    domain      │  ← 不得 import adapters / shell / react
        │ planning cash  │
        │ signal expense │
        └────────┬───────┘
                 │ 只透過 shared 的介面型別
                 ▼
        ┌────────────────┐
        │    adapters    │  ← 實作 domain 定義的 port
        │  fx storage    │
        │   analytics    │
        └────────┬───────┘
                 ▼
      fetch / localStorage / beacon
```

| 規則 | 內容 | 檢查方式 |
|---|---|---|
| **R1** | `domain/**` 不得出現 `import ... from "@/adapters"`、`react`、`next` | ESLint `no-restricted-imports`（`coding-standard`） |
| **R2** | `adapters/**` 不得 import `domain` 的實作，只能 import `shared` 的型別 | 同上 |
| **R3** | 依賴圖**不得成環** | CI 跑 `madge --circular` |
| **R4** | 外部世界只能透過 adapter 進入 | code review 檢查 `fetch(` / `localStorage.` 出現位置 |

---

## 3. Responsibility Table

| # | 模組 | 單一職責 | 對應 C4 container | 對外介面 | 不負責什麼 |
|---|---|---|---|---|---|
| **M1** | `domain/planning` | 由輸入條件產出 Low／Mid／High 三級距與行程時間軸 | 行程規劃引擎 | `plan(request): PlanResult` | 不取匯率、不存檔 |
| **M2** | `domain/cash` | 由行程的 cash 項目算建議換匯額（`frd` BR-01） | （屬行程規劃引擎） | `suggestCash(items, currency): CashSuggestion` | 不決定進位以外的呈現 |
| **M3** | `domain/signal` | 由今日匯率與 MA30 判定燈號（`frd` BR-02） | 燈號判定服務 | `judge(today, ma30): Signal \| null` | **不取資料、不決定要不要顯示** |
| **M4** | `domain/expense` | 開支加總、計畫 vs 實際、誤差率 | 開支記錄子模組 | `summarize(plan, expenses): ExpenseSummary` | 不存檔 |
| **M5** | `adapters/fx` | 取匯率與 MA30，含快取、重試、provider 切換 | FX Adapter | `fetchRate` / `fetchMA30` / `getCachedRate` | **不判定燈號** |
| **M6** | `adapters/storage` | 行程與開支的持久化，schema 驗證 | Storage Adapter | `save` / `load` / `list` / `remove` | 不知道 domain 的業務規則 |
| **M7** | `adapters/analytics` | 送匿名事件（`frd` BR-05） | （橫切） | `track(event, props)` | **不得拋錯、不得阻塞** |

### 兩個容易被合併但不該合併的邊界

| 邊界 | 為什麼不能合 |
|---|---|
| **M3 燈號判定 ⇄ M5 FX Adapter** | 判定邏輯有法規責任（非投資建議），必須能被獨立 audit 與測試。混進 adapter 就無法在沒有網路的情況下驗證算式 |
| **M2 換匯計算 ⇄ M1 行程規劃** | 兩者都在行程規劃引擎內，但 M2 是 `okr` KR3 的量測本體，必須能單獨測誤差 |

### 依賴矩陣

| 呼叫方 ↓ ／ 被呼叫 → | M1 | M2 | M3 | M4 | M5 | M6 | M7 |
|---|---|---|---|---|---|---|---|
| **shell** | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| **M1 planning** | — | ✔ | — | — | ✘ | ✘ | ✘ |
| **M2 cash** | ✘ | — | ✘ | ✘ | ✘ | ✘ | ✘ |
| **M3 signal** | ✘ | ✘ | — | ✘ | **✘** | ✘ | ✘ |
| **M4 expense** | ✘ | ✔ | ✘ | — | ✘ | ✘ | ✘ |
| **M5 fx** | ✘ | ✘ | ✘ | ✘ | — | ✘ | ✔ |
| **M6 storage** | ✘ | ✘ | ✘ | ✘ | ✘ | — | ✔ |

> **M3 → M5 是 ✘ 而非 ✔**，這是本表最重要的一格。燈號模組**接收**匯率作為參數，而不是自己去拿。編排（拿資料 → 判定）的責任在 shell。

---

## 9. Risks

| # | 風險 | 影響 | 緩解 |
|---|---|---|---|
| **R1** | **shell 變成上帝層**。編排責任都在 shell，頁面元件會逐漸塞滿業務邏輯 | 邏輯散落在 React 元件，無法單測 | 編排集中在少數 `useXxx` hook；review 時檢查元件內不得出現算式 |
| **R2** | **M2 的 1.1 緩衝係數散落多處** | 調整係數時漏改，KR3 誤差量測失真 | 係數只能存在 `domain/cash` 的單一常數，`coding-standard` 列入禁止硬編碼清單 |
| **R3** | **M7 analytics 若拋錯會炸主流程** | 違反 `srs` D3 | adapter 內部全 try/catch 吞掉；`integration-test` 需有「analytics 掛掉主流程仍完成」的案例 |
| **R4** | **M6 讀回的資料不可信**（使用者可手改 localStorage） | schema 不符導致 crash | 讀回一律 schema validate，失敗視為無資料（`c4-diagram` 已列此信任邊界） |
| **R5** | **模組數量對 MVP 偏多** | 兩人團隊的認知負擔 | 接受：6 個模組對應 6 個 C4 container，非新增抽象 |

---

## 12. Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| 6 模組對應 6 個 C4 container | `[H]` | `c4-diagram` Q2 明列 |
| domain／adapters 分層與依賴方向 | `[M]` | 推導；canon 只說 adapter pattern，未定義完整分層 |
| M3 不得依賴 M5 | `[M]` | 推導自 C4「法規邊界獨立才能 audit」 |
| 不引入 DI 容器 | `[M]` | 依團隊規模判斷 |

**TODO / 未解**

- [ ] **既有程式碼結構未查證**。產品多數功能已上線（PRD §6），本文件描述的是目標結構，**與現況的差距未盤點**。若現況是扁平結構，這份設計等於一次重構，成本未估。
- [ ] **R1 沒有硬性防線**：ESLint 擋得住 import 方向，擋不住把算式寫進元件。需 `coding-standard` 補規則。
- [ ] **M1 與 Google Maps Places 的關係未畫**：C4 圖顯示行程規劃引擎會呼叫 Maps，但那違反 R4（domain 不得 I/O）。**需新增一個 `adapters/places`**，或確認 C4 圖的箭頭有誤。此為本文件與上游的直接衝突。
- [ ] `madge --circular` 尚未接入 CI（`ci-cd-pipeline` 未涵蓋）。
