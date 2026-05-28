# 10 Code Review Checklist · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報（`demo/種子簡報.md`）+ 完整 PRD（`PRD.md`）的素材，
> 把上一份「關鍵提問.md」的六題實際答一遍，並產出 SmartTrip 第一份 PR Review Checklist。
> 上游依據：05-ADR（儲存層 = localStorage）、08-data-model（PII 欄位標註）、09-NFR（性能 / 安全紅線）。

---

## Q1 示範：「MUST / SHOULD / NIT 分檔」

**Dev 的判決邏輯**：

| 等級 | 違反後果 | review 行為 |
|---|---|---|
| `[MUST]` | 上 production 會出事（資料外洩、API 被打爆、bundle 爆預算、user 行程消失） | **block merge**，作者修完重 push |
| `[SHOULD]` | 不是立刻出事，但會累積技術債或讓後續測試／維運痛苦 | **留 comment + 等回覆**，作者可以解釋為什麼這次不修，reviewer 同意可放行 |
| `[NIT]` | 個人偏好 / 微優化 / 命名建議 | **留 comment 但不 block**，作者可選擇採納 |

**為什麼是這三檔不是五檔**：四檔以上會出現邊界爭議（「這算 SHOULD-HIGH 還是 MUST-LOW？」）。
三檔對應 **block / discuss / mention** 三種 review 行為，剛好把光譜切乾淨。

---

## Q2 示範：「lint 已覆蓋清單（不寫進 checklist）」

**SmartTrip 已交給機器自動化的事項**（review 時不查）：

| 工具 | 已覆蓋的規則 |
|---|---|
| **ESLint** (`@typescript-eslint/recommended-type-checked`) | unused vars / no-explicit-any / consistent-type-imports / no-floating-promises |
| **Prettier** | 縮排 / 引號 / trailing comma / line width |
| **tsc strict mode** | null safety / type mismatch / missing return |
| **knip** | unused exports / unused files |
| **`size-limit`** CI job | bundle 超出預算自動 fail（門檻見 MUST-08） |

**Dev 表態**：「以上事項 reviewer 一律不查。CI 紅了再說，CI 綠了我們相信機器。**checklist 只列『機器查不到 + 人腦 30 秒能判讀』的事**。」

---

## Q3–Q6 示範：完整 Checklist（10 條）

> 對齊上游：每條都標明依據哪份上游文件。每條 MUST 都附 anti-pattern。

### `[MUST-01]` log 與 analytics event 不准包含 PII / 金額明細

- **依據**：08-data-model `Expense.amount`、`Expense.category`、`Expense.note` 標 `PII=true`；
  PRD §9 Open Questions「重隱私定位」；種子簡報「免登入即開即用」。
- **review check（30 秒）**：grep `console.log`、`logger.`、`track(`、`Plausible.`
  看有沒有把整個 `expense`、`trip`、`user` 物件當參數丟。
- **anti-pattern**：
  ```ts
  // ❌ 整個物件丟下去，amount / category / note 全進 log
  console.log('user added expense:', expense)
  Plausible.track('add_expense', { props: expense })
  ```
- **正確寫法**：
  ```ts
  // ✅ 只 log 不帶資訊量的 id 與計數
  console.log('expense added, trip_id:', trip.id, 'count:', expenses.length)
  Plausible.track('add_expense', { props: { trip_id: trip.id, payment_type: expense.paymentType } })
  ```

### `[MUST-02]` 外部 API 呼叫必有 `timeout + retry 上限`

- **依據**：09-NFR §3「外部 API p95 < 180s」、05-ADR-002「FX API 為單點依賴」；
  PRD P0-8「即時匯率 — 失敗時明確標示『模擬』」。
- **review check（30 秒）**：grep `fetch(`、`axios.`，確認有 `AbortController` / `signal` /
  `axios.create({ timeout })`，且 retry library 有設 max attempts。
- **anti-pattern**：
  ```ts
  // ❌ 沒 timeout、沒 retry 上限，FX 服務掛掉時 generate flow 永遠卡住
  const rate = await fetch(`${FX_API}/today?base=TWD&quote=JPY`).then(r => r.json())
  ```
- **正確寫法**：
  ```ts
  // ✅ timeout 5s + 最多 retry 2 次，失敗 fallback 到模擬資料並標示
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 5000)
  try {
    const rate = await fetchWithRetry(`${FX_API}/today?base=TWD&quote=JPY`, { signal: ctrl.signal, maxRetries: 2 })
    return { source: 'live', rate }
  } catch {
    return { source: 'mock', rate: MOCK_RATE }   // PRD P0-8 明示要標示 mock
  } finally { clearTimeout(t) }
  ```

### `[MUST-03]` localStorage 讀寫失敗必須降級，**禁止 throw 中斷流程**

- **依據**：05-ADR-001「MVP 儲存層 = localStorage，無雲端備份」；
  PRD §3 Non-Goals「不做帳號雲端同步」+ P0-6「儲存行程」AC「重整不消失」。
- **review check（30 秒）**：grep `localStorage.setItem`、`getItem`，看有沒有包 `try/catch` +
  使用者層級的降級處理（譬如 toast 提示「儲存失敗，請截圖」）。
- **anti-pattern**：
  ```ts
  // ❌ Safari 隱私模式 / quota exceeded 會 throw，整個 App 白屏
  localStorage.setItem('trips', JSON.stringify(trips))
  ```
- **正確寫法**：
  ```ts
  // ✅ 失敗就降級提示，不破壞使用者當下流程
  try {
    localStorage.setItem('trips', JSON.stringify(trips))
  } catch (e) {
    notifyUser('儲存失敗，請截圖保留結果')
    reportError('localStorage_write_failed', { quota: e.name })
  }
  ```

### `[MUST-04]` 金額計算禁止用 `number` 直接加減，必須走 cents-int 或 decimal lib

- **依據**：08-data-model `Expense.amount`、`Trip.budget` 使用 integer cents；
  PRD G1「實際現金 vs 建議換匯誤差 < 15%」要求運算精度。
- **review check（30 秒）**：grep `+`、`-`、`*` 旁邊有沒有出現 `.amount`、`rate`、`budget`
  且型別是 `number`。`0.1 + 0.2 !== 0.3` 在金錢計算是 deal-breaker。
- **anti-pattern**：
  ```ts
  // ❌ JS number 浮點誤差，10,000 筆累積誤差會超出 NFR 容忍
  const totalTWD = expenses.reduce((sum, e) => sum + e.amount * rate, 0)
  ```
- **正確寫法**：
  ```ts
  // ✅ 金額用整數分進出，rate 用 decimal lib
  import Decimal from 'decimal.js'
  const totalTWDCents = expenses
    .reduce((sum, e) => sum.plus(new Decimal(e.amountCents).mul(rate)), new Decimal(0))
    .round().toNumber()
  ```

### `[MUST-05]` FX 燈號顯示處必須包「非投資理財建議」免責聲明 component

- **依據**：種子簡報「主要約束 — FX 換匯燈號需要『非投資理財建議』免責聲明」；
  PRD §9 Open Questions「FX 燈號是否需要『非投資/理財建議』免責強化」已決議要做。
- **review check（30 秒）**：grep `STRONG_BUY`、`<FxLight`、`<SignalBadge`，
  確認附近有 `<Disclaimer>` 或 `data-disclaimer` 標記。
- **anti-pattern**：
  ```tsx
  // ❌ 直接秀燈號沒附免責 → 法務風險
  <SignalBadge level="STRONG_BUY" rate={1 / 0.21} ma30={1 / 0.22} />
  ```
- **正確寫法**：
  ```tsx
  // ✅ 燈號 + 免責，免責文案集中在單一 component 方便法務一次性審
  <FxSignalCard level="STRONG_BUY" rate={...}>
    <Disclaimer variant="fx" />   {/* 「本資訊僅供參考，非投資理財建議⋯⋯」 */}
  </FxSignalCard>
  ```

### `[MUST-06]` `generate` flow 的核心函數必須有對應 unit test

- **依據**：09-NFR §可測性「core logic 100% covered by unit test」；下游 11-unit-test 卡。
- **review check（30 秒）**：PR 動到 `lib/recommend.ts`、`lib/fx-signal.ts`、
  `lib/expense-variance.ts` 三個檔案任一，必有對應 `.test.ts` 變更。CI 設 `path-based test required`
  rule 強制執行。
- **anti-pattern**：
  ```
  # ❌ 改了 recommend.ts 沒動 recommend.test.ts
  PR diff:
    src/lib/recommend.ts    | +35 -2
    src/components/Card.tsx | +12
    （沒有 test 變更）
  ```
- **正確寫法**：
  ```
  # ✅ core logic 與 test 同 PR 進入 review
  PR diff:
    src/lib/recommend.ts        | +35 -2
    src/lib/recommend.test.ts   | +18
  ```

### `[MUST-07]` 環境變數 / API key 禁止 hard-code 或進入 client bundle

- **依據**：09-NFR §安全「FX API key 須只存在 server-side env」；
  PRD §9 Open Questions「FX 資料源 — 成本/額度」涉及配額管控。
- **review check（30 秒）**：grep `process.env.NEXT_PUBLIC_` 後綴是否帶 `KEY` / `SECRET` /
  `TOKEN`；grep 字串字面值是否含 `sk_`、`pk_`、長度 > 30 的隨機字串。
- **anti-pattern**：
  ```ts
  // ❌ NEXT_PUBLIC_ 前綴會被打包進 bundle，所有人都能 view-source 看到
  const apiKey = process.env.NEXT_PUBLIC_FX_API_KEY
  fetch(`${FX_API}/today?api_key=${apiKey}`)
  ```
- **正確寫法**：
  ```ts
  // ✅ FX call 走 server route，key 留 server
  // app/api/fx/route.ts
  const apiKey = process.env.FX_API_KEY   // 沒 NEXT_PUBLIC_ 前綴
  ```

### `[MUST-08]` 單一 PR 不准讓 bundle gzip size 增加 > 20 KB

- **依據**：09-NFR §性能「LCP < 2.5s（mobile 4G）」、「初始 JS bundle < 200KB gzip」；
  種子簡報「主要受眾 = 衝動型 = 決策快怕麻煩」。
- **review check（30 秒）**：看 CI `size-limit` job 結果。超過自動 fail。
- **anti-pattern**：
  ```
  # ❌ 為了一個小功能引入 moment.js (67KB gzip)
  + import moment from 'moment'
  ```
- **例外條件**：經 Architect 簽核並寫進 ADR 的可放行（譬如即時匯率 SDK 是 P0 必要）。

### `[SHOULD-09]` 函數超過 50 行或 cyclomatic complexity > 10 建議拆解

- **依據**：09-NFR §可測性「函數小於 50 行有助於 mock 邊界清晰」；
  本團隊維護性偏好。
- **review check**：CI `eslint-plugin-complexity` 報 warn（不 fail）。
- **可商量情境**：state machine / switch case 必要的 boilerplate；reviewer 同意可放行。
- **不是 MUST 的原因**：邏輯密度高 ≠ 品質差，太硬會逼出無意義的拆分。

### `[NIT-10]` 變數命名偏好 `verbFor` 而非 `xxx_handler`

- **依據**：無上游強制，純團隊習慣。
- **行為**：reviewer 留 comment 但不 block。作者可選擇採納。
- **為什麼留 NIT 不是直接拿掉**：對齊命名風格降低新人 onboard 認知成本。

---

## Lint / Formatter / CI 已覆蓋清單（不入 checklist）

| 自動化工具 | 已覆蓋 | 違反後果 |
|---|---|---|
| ESLint + `@typescript-eslint/strict` | `no-explicit-any`、`no-floating-promises`、unused imports | CI fail |
| Prettier | 所有 formatting | CI fail |
| tsc `strict: true` + `noUncheckedIndexedAccess` | null safety、型別錯誤 | CI fail |
| `size-limit` | bundle 超 200KB / PR 增 > 20KB | CI fail（對應 MUST-08）|
| `knip` | unused exports | CI warn |
| GitHub Actions `path-filter` | core logic 動到必有 test | CI fail（對應 MUST-06）|

**Dev 表態**：「以上事項 review 時 reviewer 一律不留 comment——CI 紅就修，綠了就信任機器。」

---

## Review SLA（給 PR 作者 + reviewer 一份）

| 違反等級 | reviewer 行為 | 作者行為 |
|---|---|---|
| MUST | **block merge**，留 `[MUST]` prefix comment | 修完重 push，不爭辯 |
| SHOULD | 留 `[SHOULD]` prefix comment，等回覆 | 可解釋為何不修；reviewer 同意可放行 |
| NIT | 留 `[NIT]` prefix comment | 自由採納 |

**PR 作者自審 = reviewer checklist 同一份**——送 PR 前先自己跑一遍。

---

## 現場對話（~14 輪）

> 場景：45 分鐘會議第 25 分鐘，候選清單列到第 13 條，QA 想再加「PR 必須附 screenshot」。

**Dev**：「目前清單 13 條，超過上限 12。我要砍 1 條。先過一遍每條：MUST-01 PII 不准進 log——必留。」

**QA**：「同意。我這邊 incident report 已經有兩個專案踩過。」

**Dev**：「MUST-02 timeout——必留，09-NFR 直接寫 p95 < 180s。MUST-03 localStorage 降級——必留，05-ADR-001 就是這個前提。」

**Architect**：「MUST-04 金額用 decimal 也必留。15% 誤差是 PRD G1 寫死的數字。」

**Dev**：「MUST-05 免責聲明——種子簡報明示，必留。MUST-06 core logic 必有 test——下游 11-unit-test 卡靠這條。」

**QA**：「等等，MUST-06 reviewer 怎麼 30 秒查？」

**Dev**：「CI 設 `path-based test required` rule。改 `lib/recommend.ts` 沒動 test 自動 fail。reviewer 不用人工查，看 CI 就好。」

**QA**：「OK 那這條其實是 CI 規則，不是 reviewer 規則。」

**Dev**：「**對。但保留在 checklist 給 PR 作者看**——作者送之前知道這條會被 CI 擋。」

**Architect**：「MUST-07 API key 不准進 bundle——必留。MUST-08 bundle size——必留，但加例外條件。」

**Dev**：「SHOULD-09 函數長度——降為 SHOULD，因為 state machine 之類例外多。NIT-10 命名偏好——保留 NIT。」

**QA**：「screenshot 那條呢？」

**Dev**：「**砍**。screenshot 是 PR template 該寫的事，不是 review checklist。template 加一個欄位，作者沒填就退件——這是流程，不是 review 判斷。」

**Architect**：「同意。流程的事用 template 解，不要塞進 checklist 稀釋 review 注意力。」

**Dev**：「定案 10 條。送 #dev channel + pin 在 PR template。下週 sprint review 第一個 PR 開始適用，4 週後我們回頭看哪幾條從沒擋過 PR、哪幾條我們事後發現該擋沒擋。」

---

## 下游影響：本 checklist 如何流向 11-unit-test 與 12-release-plan

### → 11-unit-test

`MUST-06`「core logic 必有 test」直接成為下一場會議的入場券：

> **11-unit-test 會議第一題**：「core logic 的範圍到底是什麼？」
> — 答案必須對齊本 checklist 的 `path-based test required` 規則涵蓋的檔案
> （`lib/recommend.ts`、`lib/fx-signal.ts`、`lib/expense-variance.ts`），
> 不能新增也不能減少，否則 CI rule 跟 unit test 策略會脫鉤。

### → 12-release-plan

`MUST-08`「bundle size 不准超預算」直接成為 release Go criteria：

> **12-release-plan 5% rollout Go criteria 之一**：
> 過去 7 天主分支累積 bundle size 未超過 200KB gzip → Go；超過 → 退 PR 至 5% 之前不准放行。

### → 14-monitoring-runbook（後續卡）

`MUST-01`「log 不准包含 PII」直接影響 alert 規則：

> 監控系統若偵測到 log 包含 `amount`、`category` 等 PII 欄位字串 → 觸發 P1 alert，
> 同時回頭追是哪個 PR 漏看（reviewer + 作者一起補課）。

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（6 題的答案 + 10 條 checklist 條目 + ADR/data-model/NFR 引用）
丟給 `card-fill` skill：

```
/card-fill register 10-code-review-checklist <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/code-review-checklist.md` 的範本結構，
產出符合契約的 markdown deliverable。

**本場會議的學習目標到 Q6 答完、checklist 10 條敲定就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**逼出 must / should / nit 的分檔判決**」，不是「**寫對 markdown**」。
