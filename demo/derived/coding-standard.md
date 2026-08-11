# Coding Standard · 編碼規範 · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + `PRD.md` v0.1 + `demo/04-build/10-code-review-checklist` 推導，未經課堂實跑與人工審定。
> 與 `demo/04-build/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`module-design`、`class-diagram`、`error-handling`　**下游**：`code-review-checklist`、`pr-template`、`ci-cd-pipeline`

---

## 1. Executive Summary

規範只寫**兩人團隊會真的違反、而且違反會出事**的規則。

排除原則很直接：**Prettier 能自動修的，不寫進規範**（縮排、引號、分號、行寬）。把格式爭議寫成文件是最經典的浪費。

留下來的 12 條規則，全部滿足兩個條件之一：

- **能用 linter 擋住**（那就設定它，不是寫文件叫人記得）；或
- **擋不住但出事很痛**（那就寫進 `code-review-checklist` 當必查項）。

---

## 2. Language Scope

| 項目 | 內容 |
|---|---|
| 語言 | TypeScript 5.x，`strict: true` |
| 框架 | React 18 + Next.js（`c4-diagram` PWA Shell） |
| 格式化 | **Prettier，零設定爭論**，CI 檢查 |
| Lint | ESLint + `@typescript-eslint` + `eslint-plugin-boundaries` |
| 適用範圍 | `src/**`。spike 程式碼（`tech-spike` D3）不適用，但必須放在 `spikes/` 且不得被 `src` import |

---

## 3. Rules（top 12）

| # | 規則 | 為什麼 | 執行方式 |
|---|---|---|---|
| **R1** | **`domain/**` 不得 import `adapters`／`react`／`next`** | `module-design` R1；違反即失去可測性 | **ESLint** `no-restricted-imports` |
| **R2** | **`fetch(`／`localStorage.`／`document.` 只能出現在 `adapters/**`** | `module-design` R4；I/O 集中才可測 | **ESLint** `no-restricted-globals` + review |
| **R3** | **依賴圖不得成環** | `module-design` R3 | **CI** `madge --circular` |
| **R4** | **domain 內金額一律用 `Money`，禁止裸 `number` 表示金額** | `class-diagram` R1；多幣別相加無防護 | **ESLint** 自訂規則 + review 必查 |
| **R5** | **業務常數不得硬編碼**（1.1 緩衝、燈號門檻、進位單位、TTL） | `module-design` R2；散落會導致調整時漏改 | 集中於 `domain/<模組>/constants.ts`；**review 必查** |
| **R6** | **adapter 公開方法不得 throw**，回結果型別 | `error-handling` C1 | **review 必查**（型別無法強制） |
| **R7** | **禁止對 adapter 回傳值使用 `!` 非空斷言與 `as` 斷言** | `error-handling` R4；會繞過錯誤路徑 | **ESLint** `no-non-null-assertion` + review |
| **R8** | **`FxResult.source` 不得被覆寫或推導**，只能原樣傳遞 | `threat-model` T2（最高優先威脅） | **review 必查** + `unit-test` 強制案例 |
| **R9** | **`catch` 不得空實作**；除 `adapters/analytics` 外不得吞錯 | 靜默失敗是最難查的 bug | **ESLint** `no-empty` + review |
| **R10** | **UI 文案不得硬編碼在元件中**，集中於文案表 | `error-handling` C3；燈號文案需法務檢視 | review |
| **R11** | **禁止在 domain 使用 `Date.now()`／`new Date()`**，時間由參數注入 | `component-design` 注入 `clock`；否則 TTL 與 MA30 無法測 | **ESLint** `no-restricted-globals` |
| **R12** | **公開函式需有回傳型別標註** | 避免推導出 `any` 擴散 | **ESLint** `explicit-module-boundary-types` |

### 明確不規範的事

| 不寫 | 理由 |
|---|---|
| 縮排、引號、分號、行寬、import 排序 | Prettier 自動處理，寫了只是給人爭論的素材 |
| 檔名大小寫慣例 | 由 `module-design` 的目錄結構隱含決定 |
| 註解密度 | 強制註解會產生 `// 設定 x 為 1` 這類噪音 |
| 函式最大行數 | 用 review 判斷，硬性上限會誘發拆得莫名其妙的函式 |

### 命名

| 對象 | 慣例 | 例 |
|---|---|---|
| 變數／函式 | camelCase | `suggestCash` |
| 型別／類別 | PascalCase | `CashSuggestion` |
| 常數 | UPPER_SNAKE | `CASH_BUFFER_RATIO` |
| 檔案 | kebab-case | `fx-facade.ts` |
| 布林 | `is`／`has`／`should` 開頭 | `isEmpty`、`isOverBudget` |
| **錯誤碼** | `ST-<域>-<序號>` | `ST-FX-005`（`error-handling`） |

---

## 5. Enforcement Matrix

| 規則 | Prettier | ESLint | CI 額外檢查 | Code Review | 備註 |
|---|---|---|---|---|---|
| 格式 | ✔ | — | ✔ `--check` | — | 不進 review 討論 |
| R1 R2 R7 R9 R11 R12 | — | ✔ | ✔ `--max-warnings 0` | — | **擋得住就不靠人** |
| R3 | — | — | ✔ `madge` | — | |
| R4 | — | ✔（自訂） | ✔ | ✔ | 自訂規則有漏網，仍需人看 |
| R5 R6 R8 R10 | — | — | — | **✔ 必查** | 型別／linter 無法表達 |
| 型別檢查 | — | — | ✔ `tsc --noEmit` | — | |

### 落地順序（重要）

| 階段 | 動作 | 為什麼這個順序 |
|---|---|---|
| 1 | 導入 Prettier + `tsc --noEmit` 進 CI | 零爭議，先把格式問題永久移出討論 |
| 2 | ESLint 以 **warn** 上線，跑一輪看既有違規量 | 產品已上線（PRD §6），直接 error 會讓 CI 全紅 |
| 3 | 既有違規記入清單，**新程式碼零容忍**（僅對變更檔案 error） | 避免為了合規做大範圍重構，衝擊 4 週窗 |
| 4 | 逐步清理存量，最後全域轉 error | |

> **第 3 步是本文件最實際的一條**。`module-design` §12 已指出「本文件描述的是目標結構，與現況差距未盤點」——規範若一次全開，會在驗證窗最忙的時候把 CI 卡死。

---

## 10. Decision Log

| # | 決策 | 理由 | 影響 |
|---|---|---|---|
| D1 | **格式全交給 Prettier，規範不提** | 消滅格式爭論 | review 時不得討論格式 |
| D2 | **只留 12 條，全部有出事理由** | 規範越長越沒人讀 | 拒絕加入「最佳實踐」型條目 |
| D3 | **R5 業務常數集中** | 1.1 緩衝與燈號門檻是 KR3／G4 的本體 | 調整係數時只有一處要改 |
| D4 | **R8 單獨列規則而非併入 R6** | `threat-model` T2 是最高優先威脅，值得獨立條目 | review checklist 必查 |
| D5 | **ESLint 分階段轉 error** | 既有程式碼已上線，一次全開會卡死 CI | 需維護存量違規清單 |
| D6 | **R11 禁用 domain 內取時間** | 沒有它，快取過期與 MA30 只能用 sleep 測 | 需一併提供 `clock` 注入慣例 |

---

## 12. Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| R1～R3（分層與依賴） | `[H]` | `module-design` 明列 |
| R4／R5／R8（金額、常數、source） | `[M]` | 推導自 `class-diagram`／`threat-model` |
| 分階段落地 | `[M]` | 依產品已上線的事實推導 |
| 工具選型（ESLint plugin 名稱） | `[L]` | **推導**，未驗證套件是否符合需求 |

**TODO / 未解**

- [ ] **既有違規量未知**。第 2 步「跑一輪看看」還沒跑，因此無法判斷第 3～4 步要多久，也無法確認導入成本是否吃掉驗證窗的工時。
- [ ] **R4 的自訂 ESLint 規則尚未撰寫**，可能比預期難（要判斷「這個 number 是不是金額」）。若做不出來，R4 退化為純 review 項。
- [ ] **未與 `code-review-checklist` 對齊**：該卡已有 8–12 條必查項，本文件的「review 必查」欄可能重複或衝突，需合併。
- [ ] **無 commit message 與分支規範**：`ci-cd-pipeline` 可能有依賴，但本文件未涵蓋。
