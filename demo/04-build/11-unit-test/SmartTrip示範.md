# 11 Unit Test · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報（`demo/種子簡報.md`）+ 完整 PRD（`PRD.md`）的素材，
> 把上一份「關鍵提問.md」的六題實際答一遍，並產出 SmartTrip 第一份 Unit Test 策略。
> 上游依據：04-AC（Given/When/Then 場景）、07-api-spec（generate / fx 端點）、08-data-model（Expense / Trip schema）。

---

## Q1 示範：「core logic 必測清單 vs glue / UI 不追 coverage」

**SmartTrip 的 core logic 三劍客**（必測，目標 ≥ 90%）：

| 函數 / 模組 | 為什麼是 core logic | 對應 PRD / AC |
|---|---|---|
| `lib/recommend.ts :: calculateRecommendation(days, persona, budget, items)` | 換匯建議公式，PRD P0-4「cash_only 總和 × 1.1，依幣別進位」；PRD G1「誤差 < 15%」承諾的基礎 | PRD §6 P0-4；G1；04-AC §AC-01 |
| `lib/fx-signal.ts :: classifySignal(todayRate, ma30, history)` | 燈號判定 STRONG_BUY / BUY / HOLD，PRD P0-5；種子簡報「FX 燈號」核心差異化 | PRD §6 P0-5；04-AC §AC-04 |
| `lib/expense-variance.ts :: calcVariance(actual, recommended)` | 開支 vs 建議誤差計算，PRD §7「換匯準確度」量測公式；種子簡報「成功指標 §換匯準確度」 | PRD §7、§8；04-AC §AC-07 |

**Glue / UI 不追 coverage**：

| 範疇 | 怎麼覆蓋 | 為什麼不用 unit test |
|---|---|---|
| React component（卡片、表單、燈號顏色 UI） | Playwright e2e + Storybook 人眼 review | UI render test 99% 在測 React 行為不是產品邏輯，refactor 一次全部要重寫 |
| Next.js API route handler | 1–2 個 e2e happy path | handler 本身只是 thin wrapper，core logic 已單獨測 |
| localStorage 讀寫 | jsdom mock + 1 個 integration test | 邏輯稀疏，bug 透過 e2e 即時可見 |
| FX API client（fetch wrapper） | mock 外部 API 跑 1 個 timeout / 1 個 retry case | 真實邏輯只有 retry policy，1 個 test 涵蓋 |

**Coverage 預期分佈**：

```
src/lib/          → 90%+    （core logic 三劍客）
src/components/   → 0%      （靠 e2e + Storybook）
src/app/api/      → ~30%    （glue，only happy path）
src/lib/storage/  → ~50%    （integration test 兼測）
整體 coverage     → ~60%    （不重要的數字）
```

**Dev 表態**：「整體 60% 看起來不漂亮，但 core 100% confidence。**追的是後者**。」

---

## Q2 示範：「Coverage 數字背後追的是什麼」

**SmartTrip 不追 100% coverage 的理由**：

1. **核心算法 `lib/recommend.ts`** 內含 type guard（`if (typeof days !== 'number') throw`），這些 defensive code 是給 TypeScript strict mode + runtime sanity 用的，測它 = 在測 TypeScript。佔 ~10%，剛好對應 90% 目標。
2. **React component** 沒寫 unit test，整體 coverage 拉到 60% 左右。
3. **真正的 quality gate** 是兩條規則，不是 coverage 數字：
   - 對齊 10-code-review-checklist `[MUST-06]`：path-based test required（core 動了必有 test 變更）
   - 修 bug 必加 regression test（CI rule，下面 Q6 詳述）

**Dev 表態**：「假設明天某個天才工程師把 coverage 衝到 95%——我會去看是不是寫了一堆 garbage test。
60% 是健康，95% 是警訊。」

---

## Q3 示範：「Mock 邊界宣言」

| 對象 | 永遠 mock | 永遠不 mock | 工具 |
|---|---|---|---|
| FX API（`api.fx-rate.com/today`） | ✅ | | `msw`（Mock Service Worker），定義 handler 模擬 STRONG_BUY / BUY / HOLD 三組 rate |
| `Date.now()` / `new Date()` | ✅ | | `vi.useFakeTimers()`（測「今日匯率」需要固定時間） |
| `Math.random()` | ✅ | | `vi.spyOn(Math, 'random').mockReturnValue(0.5)` |
| `localStorage` | ✅ | | jsdom 自帶（測「重整不消失」用） |
| `lib/recommend` | | ✅ | 測 React component 呼叫它時，直接讓真實函數跑 |
| `lib/fx-signal` | | ✅ | 同上 |
| `lib/expense-variance` | | ✅ | 同上 |
| Plausible / GA4 analytics | ✅ | | `vi.fn()` stub，斷言事件名 + props 而已 |

**反 pattern 範例**：

```ts
// ❌ Mock 自己的 core logic，等於在測 mock
import * as recommend from '@/lib/recommend'

test('TripForm submits and shows result', () => {
  vi.spyOn(recommend, 'calculateRecommendation').mockReturnValue({ jpyAmount: 50000, bufferPct: 10 })
  // ...
  // 改了 calculateRecommendation 的邏輯這個 test 還是綠的——但 production 壞了
})
```

```ts
// ✅ 讓真實 core logic 跑，只 mock 外部依賴
import { server } from '@/test/msw-server'
import { rest } from 'msw'

test('TripForm submits and shows real recommendation', async () => {
  server.use(rest.get('/api/fx', (req, res, ctx) => res(ctx.json({ rate: 0.21, ma30: 0.22 }))))
  // 真實 calculateRecommendation 會跑，bug 立刻現形
})
```

**Dev 表態**：「**規則**：mock 跨網路、跨檔案系統、跨時鐘的東西。**不 mock 自己的純函數**。」

---

## Q4 示範：「Property-based vs Example-based 分配」

| 函數 | 測試風格 | 為什麼 |
|---|---|---|
| `calculateRecommendation` | **property-based**（`fast-check` 跑 1000 隨機 input） | 公式有明確不變式：`buffer ≥ 0`、`recommended ≥ cashTotal`、`recommended ≤ budget * 1.5`、`days * minDaily ≤ recommended ≤ days * maxDaily`。Fuzz 出浮點與整數邊界 |
| `classifySignal` | **example-based**（9 個關鍵場景） | 輸出只有 3 種（STRONG_BUY / BUY / HOLD），邊界明確（譬如偏離 % > 3% 算 STRONG_BUY），example-based 反而清楚 |
| `calcVariance` | **混合**（3 個 example + 1 個 property） | example 蓋商業規則；property 確保「對稱性」（`variance(a, b) === variance(b, a)`）與「零點」（`variance(x, x) === 0`） |

**fast-check property test 範例**（換匯建議公式）：

```ts
import * as fc from 'fast-check'
import { calculateRecommendation } from '@/lib/recommend'

test('property: recommended amount always covers cash total with buffer', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 1, max: 30 }),               // days
      fc.constantFrom('impulsive', 'newcomer'),       // persona
      fc.integer({ min: 10000, max: 200000 }),        // budget (TWD)
      fc.array(fc.record({
        amountCents: fc.integer({ min: 0, max: 50000_00 }),
        paymentType: fc.constantFrom('cash', 'card'),
      }), { minLength: 0, maxLength: 50 }),           // items
      (days, persona, budget, items) => {
        const result = calculateRecommendation(days, persona, budget, items)
        const cashTotal = items.filter(i => i.paymentType === 'cash').reduce((s, i) => s + i.amountCents, 0)

        expect(result.recommendedCents).toBeGreaterThanOrEqual(cashTotal)        // 覆蓋現金
        expect(result.bufferPct).toBeGreaterThanOrEqual(0)                       // buffer 非負
        expect(result.recommendedCents).toBeLessThanOrEqual(budget * 100 * 1.5)  // 不爆預算太多
      },
    ),
    { numRuns: 1000 },
  )
})
```

**Dev 表態**：「公式類函數一定 property-based。改一次公式跑 1000 case 自動驗證，省得每次手動補 example。」

---

## Q5 示範：「Snapshot test 使用準則」

| 場景 | 用 snapshot？ | 理由 |
|---|---|---|
| `generate()` 函數的 JSON output dump | ✅ 用 | 純資料 schema，diff 一眼看出哪個欄位變了 |
| React component 渲染結果 | ❌ **禁用** | 改 className / 拆 div 全部 fail，team 變成「按 u 更新」儀式 |
| API response shape | ✅ 用 | 同 generate() 理由，schema 穩定性監控 |
| 燈號顏色 / 圖示 | ❌ **禁用** | UI 變化用 Storybook + Chromatic 視覺 diff |

**例子**：

```ts
// ✅ 對函數 output 做 snapshot
test('generate() returns stable schema', () => {
  const output = generate({ destination: 'Tokyo', days: 5, persona: 'impulsive', budget: 40000 })
  expect(output).toMatchSnapshot()  // schema 改動會立刻被 PR diff 抓到
})

// ❌ 對 component render 做 snapshot
test('Card renders', () => {
  const { container } = render(<TripCard {...mock} />)
  expect(container).toMatchSnapshot()  // 改個 padding 也 fail，最後團隊全部按 u
})
```

**Dev 表態**：「snapshot 只用於 deterministic data，不用於 UI。UI 變化用 Storybook + Chromatic visual regression。」

---

## Q6 示範：「修 bug 必加 regression test」

**CI 規則**（已對齊 10-code-review-checklist `[MUST-06]`，並加強 bug fix 規則）：

```yaml
# .github/workflows/bugfix-test-required.yml
name: bugfix-test-required
on: pull_request
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Detect bug-fix PR
        run: |
          TITLE="${{ github.event.pull_request.title }}"
          BODY="${{ github.event.pull_request.body }}"
          if [[ "$TITLE" =~ ^fix\( || "$TITLE" =~ ^hotfix || "$BODY" =~ fixes\ #[0-9]+ ]]; then
            CHANGED_TESTS=$(git diff --name-only origin/${{ github.base_ref }} | grep -E '\.test\.(ts|tsx)$' | wc -l)
            HAS_LABEL=$(gh pr view ${{ github.event.pull_request.number }} --json labels -q '.labels[].name' | grep -c '^no-test$' || true)
            if [[ "$CHANGED_TESTS" -eq 0 && "$HAS_LABEL" -eq 0 ]]; then
              echo "::error::Bug-fix PR must include a regression test, or add the 'no-test' label with reviewer approval."
              exit 1
            fi
          fi
```

**Dev 表態**：「同一個 bug 出現兩次以上 → 直接列 P0 incident，回頭查為什麼第一次沒鎖。**這條沒有商量空間**。」

---

## 6 個必測 Test Scenario（完整規格）

> 對齊 04-AC 的 Given/When/Then，每個 scenario 都標明對應 AC 編號與「為什麼必測」。

### Scenario 1：`calculateRecommendation` — 衝動型 5 天日本

| 項目 | 內容 |
|---|---|
| **函數** | `lib/recommend.ts :: calculateRecommendation` |
| **Input** | `{ days: 5, persona: 'impulsive', budget: 40000, items: [{amountCents: 1500_00, type: 'cash'}, {amountCents: 3000_00, type: 'cash'}, {amountCents: 2000_00, type: 'card'}] }` |
| **Expected** | `{ recommendedJPY: 49500, bufferPct: 10, breakdown: { cashTotalJPY: 45000, buffer: 4500 } }`（cash total 45000 × 1.1，依日圓進位至 100 ） |
| **對應 AC** | AC-01「衝動型 + 預算 40K → 三方案 Low/Mid/High，Mid 方案的建議換匯額為 cash_only × 1.1」 |
| **為什麼必測** | 這是 PRD P0-4「建議換匯現金額 = cash_only × 1.1」的字面實作。錯一個小數點就違反 PRD G1「誤差 < 15%」。 |

### Scenario 2：`calculateRecommendation` property test — 不變式

| 項目 | 內容 |
|---|---|
| **函數** | `lib/recommend.ts :: calculateRecommendation` |
| **Input** | `fast-check` 隨機產生 1000 組 `(days, persona, budget, items)` |
| **Expected**（不變式） | (a) `recommendedCents ≥ cashTotalCents` (b) `bufferPct ∈ [0, 50]` (c) `recommendedCents ≤ budget * 100 * 1.5` (d) `days * 1000 ≤ recommendedCents ≤ days * 20000`（合理日花範圍） |
| **對應 AC** | AC-02「換匯建議在所有 persona 與預算組合下都不爆預算太多、不會建議負數、不會建議比 cash total 少」 |
| **為什麼必測** | property test 抓邊界（budget = 0、items = 空、persona unknown）。example test 永遠想不全。 |

### Scenario 3：`classifySignal` — STRONG_BUY 邊界

| 項目 | 內容 |
|---|---|
| **函數** | `lib/fx-signal.ts :: classifySignal` |
| **Input** | `{ todayRate: 0.21, ma30: 0.22, history30: [...30 個樣本] }`（今日相對 MA30 偏離 -4.5%） |
| **Expected** | `{ level: 'STRONG_BUY', deviationPct: -4.5, reason: '今日匯率較 30 日均值低 4.5%，可考慮現在換' }` |
| **對應 AC** | AC-04「偏離 < -3% → STRONG_BUY；-3% ≤ x < 0% → BUY；x ≥ 0% → HOLD」 |
| **為什麼必測** | 燈號是 PRD P0-5 的核心差異化。判定錯 → 使用者依錯誤訊號換匯 → 種子簡報「省錢」護城河崩塌。 |

### Scenario 4：`classifySignal` — 邊界與資料不足

| 項目 | 內容 |
|---|---|
| **函數** | `lib/fx-signal.ts :: classifySignal` |
| **Input** | (a) `{ history30: [...只有 15 個樣本] }` (b) `{ todayRate: 0 }`（API 失敗回 0） (c) `{ todayRate: NaN }` |
| **Expected** | (a) `{ level: 'HOLD', reason: 'INSUFFICIENT_HISTORY', fallback: true }` (b) (c) `{ level: 'HOLD', reason: 'INVALID_RATE', fallback: true }` |
| **對應 AC** | AC-05「資料不足或匯率異常時必須回 HOLD 並標記 fallback=true，不能 throw 或顯示 BUY/STRONG_BUY」 |
| **為什麼必測** | FX API 不可靠（PRD §9 Open Questions）。Fallback 失敗 = 燈號變成空白或誤導 → 使用者信心崩盤。 |

### Scenario 5：`calcVariance` — 0% 誤差與對稱性

| 項目 | 內容 |
|---|---|
| **函數** | `lib/expense-variance.ts :: calcVariance` |
| **Input** | (example) `{ actualCashCents: 45000_00, recommendedCents: 49500_00 }` → 應為 -9.09% |
| **Expected** | `{ variancePct: -9.09, withinTolerance: true }`（容忍 ±15% 內） |
| **對應 AC** | AC-07「實際 vs 建議誤差 % = (actual - recommended) / recommended × 100，誤差絕對值 ≤ 15% 標 withinTolerance=true」 |
| **為什麼必測** | 這條公式直接餵進 PRD §7「換匯準確度 ≥ 60%」量測。算錯 → 整個 G2 假設驗證歪掉。 |

### Scenario 6：`calcVariance` property — 對稱與零點

| 項目 | 內容 |
|---|---|
| **函數** | `lib/expense-variance.ts :: calcVariance` |
| **Input** | `fast-check` 產生 1000 組 `(actual, recommended)` |
| **Expected**（不變式） | (a) `variance(x, x) === 0` (b) `|variance(a, b)| === |variance(b, a)|`（絕對值對稱）(c) `recommended = 0` 時回 `{ variancePct: null, reason: 'ZERO_RECOMMENDATION' }` 不 throw |
| **對應 AC** | AC-08「edge case：recommended = 0 不能除以零、actual = 0 不能 throw」 |
| **為什麼必測** | 浮點除法 + 零點是經典 bug 來源。Property test 一次蓋全。 |

---

## 現場對話（~12 輪）

> 場景：45 分鐘會議第 30 分鐘，QA 提議對 React component 寫 enzyme test。

**Dev**：「core logic 三劍客定案：`recommend` / `fx-signal` / `expense-variance`。各 ≥ 90% coverage。」

**QA**：「component 呢？我覺得 `<TripForm>` 也該測，那是使用者第一接觸點。」

**Dev**：「`<TripForm>` 走 Playwright e2e。我們已經有 `e2e/generate-flow.spec.ts` 跑完整 happy path。」

**QA**：「但 e2e 慢，PR review 不會每次跑。如果有人改 `<TripForm>` 改壞了表單驗證——unit test 馬上發現。」

**Dev**：「**如果 `<TripForm>` 改壞了驗證，Playwright 會在 PR pre-merge gate 抓到**。我們沒必要為了快 30 秒寫 100 行 enzyme test 然後 refactor 一次全部重寫。」

**QA**：「那 form validation 邏輯本身呢？那是 logic 不是 UI。」

**Dev**：「**好問題**。form validation 如果是純函數（譬如 `validateBudget(value): ValidationResult`），那就抽出來放 `lib/validation.ts` 列入 core logic 必測。如果是 react-hook-form 的 schema config，那是 declarative config，不測。」

**QA**：「OK 那把 `validateBudget` 加進 core logic 清單第 4 個。」

**Dev**：「等等——`validateBudget` 只是判斷 `value > 0 && value < 1000000`，這算 core 嗎？」

**Architect**（旁聽）：「不算。這 1 個 expect 能蓋完的不算 core，list 進去會稀釋『core 必測』的訊號。寫個 example test 就好，不要列入 90% 目標清單。」

**Dev**：「同意。**core 清單只列 3 個就鎖死**。其他函數該寫 test 就寫，但不背 coverage 目標。」

**QA**：「最後一個問題：snapshot test 真的全部不用？我看 jest 的官方 example 都在用。」

**Dev**：「Jest 官方 example 是 demo 用，production code 別跟。**snapshot 只用在 `generate()` JSON output**，React component 一律不用。下週 sprint review 看到有人對 component 寫 `toMatchSnapshot()` 我會 block PR。」

**QA**：「成交。」

---

## 下游影響：本策略如何流向 12-release-plan

`12-release-plan` 的 5% 階段 Go criteria 直接引用本場結論：

> **5% rollout Go criteria 之一**：
> - `lib/recommend.ts` 單元測試覆蓋率 ≥ 90% ✅
> - `lib/fx-signal.ts` 單元測試覆蓋率 ≥ 90% ✅
> - `lib/expense-variance.ts` 單元測試覆蓋率 ≥ 90% ✅
> - 主分支過去 7 天無 flaky test alert
> - 修 bug PR 100% 含 regression test（CI rule 強制）
>
> **任一未達 → 退回 5% 之前，不准放行。**

`13-rollback-plan` 的「rollback 後驗證清單」直接引用本場「6 個必測 test scenario」——
rollback 後跑這 6 個 test 全綠才算 rollback 成功。

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（6 題的答案 + 6 個 test scenario + mock 邊界宣言）
丟給 `card-fill` skill：

```
/card-fill register 11-unit-test <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/unit-test.md` 的範本結構，
產出符合契約的 markdown deliverable。

**本場會議的學習目標到 Q6 答完、6 個 scenario 規格敲定就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**逼出 core / glue 分界、mock 邊界、coverage 真正在追什麼**」，不是「**寫對 markdown**」。
