# 07 API Spec · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報 + PRD §6（功能清單）+ 06-c4-diagram（container 邊界）+ ADR-001
> 作為輸入，把上一份「關鍵提問.md」的 6 題 + 1 題送命題實際答一遍，並產出
> **5 個核心 endpoint 的完整 API spec**。

---

## 前置說明：為什麼 PWA 也要寫 HTTP-style spec

SmartTrip MVP 是 **PWA + localStorage**（ADR-001），實際上 5 個「endpoint」是
**local function 呼叫**：

```typescript
// MVP 階段實際長相
const result = await tripPlanner.generate({ destination, days, budget, ... });
const rate    = await fxAdapter.getRecommendation({ currency: 'JPY', amount: 40000 });
const trip    = storageAdapter.loadTrip(id);
```

但本場示範**仍用 HTTP-style spec**（method / path / response schema）寫，理由有三：

1. **V1 雲端化時無痛轉換**：未來 `POST /v1/trips/generate` 的契約就是現在的 spec
2. **強迫契約思維**：用「resource + verb」思考比「函式呼叫」思考嚴謹
3. **mock 工具支援**：OpenAPI spec 可生 mock server（msw / Prism），FE 能獨立開發

「Path」對 MVP 而言是**邏輯路徑**（不會真的有 HTTP request），但所有欄位 / 錯誤碼 / 併發 /
版本策略都按 HTTP API 標準寫。

---

## 全域策略

### Versioning 策略

- **URL 版本**（`/v1/`）
- MVP 階段所有 endpoint 標 `v1`，即便目前是 local function
- V1 雲端化時，local function call 轉為 `POST /v1/trips/generate`，**契約不變**

### Deprecation 流程

| 階段 | 時程 | 動作 |
|---|---|---|
| Announce | T-90 天 | docs 標 `@deprecated` + response 加 `Sunset: <RFC3339 date>` header（V1 才有 HTTP header） |
| Grace period | T-90 ~ T-0 | 舊 endpoint 仍可用 + console.warn 警告 |
| Sunset | T+0 | 舊 endpoint 回 410 GONE + 指引新 endpoint |
| Hard removal | T+30 天 | 完全移除 endpoint |

### Payload 向後相容規範

| 改動 | 允許 |
|---|---|
| 加 optional 欄位 | ✅ |
| 加 endpoint | ✅ |
| required → optional | ✅ |
| 刪欄位 | ❌（走 deprecation） |
| 改型別 | ❌（必須新欄位 + 舊欄位並存） |
| 加 enum 值 | ⚠️ 事前公告 + client 必有 default case |
| optional → required | ❌（破壞舊 client） |

### 全域錯誤碼字典

| Code | HTTP Status | 業務語意 |
|---|---|---|
| `INVALID_INPUT` | 400 | 欄位型別錯或格式錯 |
| `MISSING_REQUIRED_FIELD` | 400 | 缺必填 |
| `INVALID_CURRENCY_PAIR` | 422 | 幣別組合不支援 |
| `BUDGET_OUT_OF_RANGE` | 422 | 預算 < 1000 或 > 1000000 TWD |
| `DAYS_OUT_OF_RANGE` | 422 | 天數 < 1 或 > 30 |
| `TRIP_ID_CONFLICT` | 409 | trip.id 已存在但內容不一致 |
| `TRIP_NOT_FOUND` | 404 | trip.id 不存在 |
| `EXPENSE_INVALID_AMOUNT` | 422 | amount ≤ 0 |
| `FX_RATE_UNAVAILABLE` | 503 | FX provider 三家都失敗、cache 已過期 |
| `STORAGE_QUOTA_EXCEEDED` | 507 | localStorage 5MB 滿了 |
| `SCHEMA_VERSION_MISMATCH` | 409 | 讀取資料的 schemaVersion 不認得（要升級或拒讀） |

### 全域 response envelope

```json
// 成功
{
  "data": { ... },                    // endpoint-specific
  "meta": {
    "schemaVersion": 1,
    "timestamp": "2026-05-28T10:30:00Z",
    "fromCache": false                // 適用於 FX
  }
}

// 失敗
{
  "error": {
    "code": "FX_RATE_UNAVAILABLE",    // 業務 code
    "httpStatus": 503,
    "message": "匯率資料暫時無法取得，請稍後再試",  // 使用者友善訊息
    "details": { ... },               // optional debug info
    "retryable": true,                // client retry hint
    "retryAfterMs": 30000             // optional
  }
}
```

---

## Endpoint 1：POST /v1/trips/generate（行程生成）

### 描述

依使用者輸入（目的地 / 日期 / 預算 / 心情）產出 Low/Mid/High 三方案，每方案含時間軸與
建議換匯額。**最複雜的 endpoint**——涉及行程規劃引擎 + FX Adapter + 燈號判定服務三個 container。

| 欄位 | 值 |
|---|---|
| Operation ID | `trips.generate` |
| Method / Path | `POST /v1/trips/generate` |
| Container | 行程規劃引擎（呼叫 FX Adapter） |
| Auth | none（MVP） |
| Rate limit | 5 RPS per session |
| Idempotency | 天然冪等 + `clientGenerationId` UUID 去重 30 秒 |
| Concurrency | 純計算無寫操作，無 race condition |

### Request schema

```json
{
  "clientGenerationId": "uuid-v4",     // required, idempotency key
  "destination": "Tokyo",              // required, string, max 50
  "departureDate": "2026-08-15",       // required, ISO date, >= today
  "days": 5,                           // required, integer, 1-30
  "budget": 40000,                     // required, integer, 1000-1000000 (TWD)
  "homeCurrency": "TWD",               // required, ISO 4217
  "destinationCurrency": "JPY",        // required, ISO 4217
  "mood": "foodie",                    // required, enum: foodie|nature|shopping|culture|relax
  "partySize": 2,                      // required, integer, 1-10
  "companions": "couple"               // optional, enum: solo|couple|family|friends
}
```

**Validation rules**:
- `destinationCurrency != homeCurrency`（否則 422 `INVALID_CURRENCY_PAIR`）
- `budget`: 1000 ≤ x ≤ 1000000（否則 422 `BUDGET_OUT_OF_RANGE`）
- `days`: 1 ≤ x ≤ 30（否則 422 `DAYS_OUT_OF_RANGE`）

### Response schema（200 success）

```json
{
  "data": {
    "tiers": [
      {
        "tier": "low",                 // enum: low|mid|high
        "totalBudget": 30000,          // integer, TWD
        "suggestedCashJpy": 80000,     // integer, in destinationCurrency
        "suggestedCashTwd": 17600,     // integer, TWD equivalent
        "bufferPercent": 10,           // integer, 10 for low-tier
        "timeline": [
          {
            "day": 1,
            "items": [
              {
                "id": "uuid-v4",
                "name": "築地市場早餐",
                "type": "food",        // enum: food|sightseeing|transport|shopping|stay
                "paymentMethod": "cash_only",  // enum: cash_only|card_ok|either
                "estimatedCost": 1500, // in destinationCurrency
                "location": {          // nullable if Google Maps fails
                  "lat": 35.6655,
                  "lng": 139.7707,
                  "address": "東京都中央区築地"
                }
              }
            ]
          }
        ]
      },
      { "tier": "mid", "...": "..." },
      { "tier": "high", "...": "..." }
    ],
    "fxContext": {
      "rate": 0.22,                    // TWD per JPY
      "ma30": 0.215,
      "signal": "BUY",                 // 引用 /fx/signal 同樣的 enum
      "fetchedAt": "2026-05-28T10:30:00Z",
      "fromCache": false,
      "disclaimer": "本資訊僅供參考，非投資理財建議。"
    }
  },
  "meta": {
    "schemaVersion": 1,
    "timestamp": "2026-05-28T10:30:00Z",
    "generationLatencyMs": 850
  }
}
```

### Error codes

| Code | 何時觸發 | 範例 message |
|---|---|---|
| `MISSING_REQUIRED_FIELD` | 缺 `destination` 等 | `"缺少必填欄位：destination"` |
| `INVALID_INPUT` | 型別錯 | `"budget 必須為整數"` |
| `INVALID_CURRENCY_PAIR` | TWD → TWD | `"目的地幣別不可與本國幣別相同"` |
| `BUDGET_OUT_OF_RANGE` | budget = 500 | `"預算需介於 1000 ~ 1000000"` |
| `DAYS_OUT_OF_RANGE` | days = 50 | `"天數需介於 1 ~ 30"` |
| `FX_RATE_UNAVAILABLE` | FX provider 全 fail | `"匯率資料暫時無法取得，您可先生成行程，匯率資訊隨後更新"`（**降級策略**：仍回傳 tiers，但 `fxContext = null`）|

**降級行為**：FX 失敗時 `fxContext = null` + `suggestedCash*` 欄位 = null，但 `tiers` 與
`timeline` 仍正常產出。client UI 顯示「換匯資料暫時無法取得」橫幅。

### Mock data 範本

```json
// Happy path
{
  "data": {
    "tiers": [
      { "tier": "low",  "totalBudget": 30000, "suggestedCashJpy": 80000, ... },
      { "tier": "mid",  "totalBudget": 40000, "suggestedCashJpy": 100000, ... },
      { "tier": "high", "totalBudget": 55000, "suggestedCashJpy": 130000, ... }
    ],
    "fxContext": { "rate": 0.22, "signal": "BUY", "disclaimer": "..." }
  },
  "meta": { "schemaVersion": 1, "generationLatencyMs": 850 }
}

// 業務錯誤（預算超界）
{
  "error": {
    "code": "BUDGET_OUT_OF_RANGE",
    "httpStatus": 422,
    "message": "預算需介於 1000 ~ 1000000",
    "details": { "field": "budget", "value": 500, "min": 1000, "max": 1000000 },
    "retryable": false
  }
}

// 系統錯誤（FX 降級）
{
  "data": {
    "tiers": [ ... ],
    "fxContext": null
  },
  "meta": { "schemaVersion": 1, "fxDegraded": true, "fxDegradeReason": "FX_RATE_UNAVAILABLE" }
}
```

---

## Endpoint 2：GET /v1/fx/recommendation（換匯建議金額）

### 描述

依目的地幣別與行程預算，回傳「建議換多少現金」。實作為 **`cash_only 總和 × (1 + buffer%)`**
（PRD P0-4），buffer 隨 tier 變動（low=10% / mid=15% / high=20%）。

| 欄位 | 值 |
|---|---|
| Operation ID | `fx.recommendation` |
| Method / Path | `GET /v1/fx/recommendation` |
| Container | FX Adapter |
| Auth | none |
| Rate limit | 10 RPS per session |
| Idempotency | 天然冪等（純讀取） |
| Concurrency | 無寫操作，無 race condition |

### Request（query params）

```
GET /v1/fx/recommendation?destinationCurrency=JPY&homeCurrency=TWD&cashOnlyTotalTwd=15000&tier=mid
```

| Param | Required | Type | Validation |
|---|---|---|---|
| `destinationCurrency` | yes | ISO 4217 | 必須是支援幣別（PRD P1：30+ 幣別） |
| `homeCurrency` | yes | ISO 4217 | 通常 TWD |
| `cashOnlyTotalTwd` | yes | integer | 1 ~ 1000000 |
| `tier` | yes | enum | low \| mid \| high |

### Response schema（200）

```json
{
  "data": {
    "suggestedAmountDestination": 100000,    // integer, JPY
    "suggestedAmountHomeEquivalent": 22000,  // integer, TWD（含 buffer 後）
    "bufferPercent": 15,
    "fxRate": 0.22,                          // TWD per JPY
    "fetchedAt": "2026-05-28T10:30:00Z",
    "fromCache": false,
    "rounding": "thousand",                  // JPY 進位至千；KRW 進位至萬；USD 進位至十
    "disclaimer": "本資訊僅供參考，非投資理財建議。"
  },
  "meta": { "schemaVersion": 1 }
}
```

### Error codes

| Code | 何時 |
|---|---|
| `MISSING_REQUIRED_FIELD` | 缺 `destinationCurrency` 等 |
| `INVALID_CURRENCY_PAIR` | 幣別組合不支援（譬如 TWD → CUP 古巴幣） |
| `FX_RATE_UNAVAILABLE` | provider 三家失敗 + cache 過期 |

### 降級行為

- cache hit（24h 內）：`fromCache: true`，response 加 `cacheAgeMs` 欄位
- cache miss + provider 失敗：回 503 `FX_RATE_UNAVAILABLE`，**不假裝有資料**

---

## Endpoint 3：GET /v1/fx/signal（換匯燈號）

### 描述

回傳「現在換 vs 等等再換」的燈號（PRD P0-5）。實作：`(今日匯率 - MA30) / MA30 × 100`，
依偏離 % 分檔。

| 欄位 | 值 |
|---|---|
| Operation ID | `fx.signal` |
| Method / Path | `GET /v1/fx/signal` |
| Container | 燈號判定服務（呼叫 FX Adapter 取資料） |
| Auth | none |
| Rate limit | 10 RPS per session |
| Idempotency | 天然冪等 |
| Concurrency | 無 race |

### Request

```
GET /v1/fx/signal?from=TWD&to=JPY
```

### Response（200）

```json
{
  "data": {
    "signal": "BUY",                 // enum: STRONG_BUY|BUY|HOLD
    "todayRate": 0.22,
    "ma30": 0.215,
    "deviationPercent": -2.33,       // negative = home 升值 = 適合換出
    "recommendation": "目前匯率優於 30 日均值 2.3%，是換匯好時機。",
    "fetchedAt": "2026-05-28T10:30:00Z",
    "fromCache": false,
    "disclaimer": "本資訊僅供參考，非投資理財建議，請依個人狀況評估。"
  },
  "meta": { "schemaVersion": 1 }
}
```

**Signal 分檔規則**（寫進 spec，避免 client 自己解讀）：
- `STRONG_BUY`：deviationPercent ≤ -3%
- `BUY`：-3% < deviationPercent ≤ -1%
- `HOLD`：deviationPercent > -1%
- **無 SELL / STRONG_SELL**（PRD P0-5 法規邊界：只提供「換匯時機」非「投資建議」）

### Error codes

| Code | 何時 |
|---|---|
| `INVALID_CURRENCY_PAIR` | 不支援的幣別 |
| `FX_RATE_UNAVAILABLE` | provider + cache 全失敗 |

### 降級行為

- cache hit but stale（> 4h 但 < 24h）：仍回傳 + `staleWarning: "匯率資料為 N 小時前"`
- 完全無資料：503 + 客戶端 UI 改顯示灰色燈號「資料暫時無法取得」

---

## Endpoint 4：POST /v1/expenses（新增開支紀錄）

### 描述

旅途中新增單筆開支（PRD P0-7），用於對比建議換匯額 vs 實際使用。

| 欄位 | 值 |
|---|---|
| Operation ID | `expenses.create` |
| Method / Path | `POST /v1/expenses` |
| Container | 開支記錄子模組 → Storage Adapter |
| Auth | none |
| Rate limit | 20 RPS per session |
| Idempotency | 用 `expense.id` 為冪等 key（client UUID） |
| Concurrency | append-only，無 race |

### Request

```json
{
  "id": "uuid-v4",                   // required, client-generated idempotency key
  "tripId": "uuid-v4",               // required, ref existing trip
  "amount": 1500,                    // required, integer, > 0, in tripCurrency
  "currency": "JPY",                 // required, ISO 4217（必須 = trip.destinationCurrency）
  "paymentMethod": "cash",           // required, enum: cash|card
  "category": "food",                // required, enum: food|transport|shopping|stay|other
  "occurredAt": "2026-08-16T12:30:00+09:00",  // required, ISO 8601 with TZ
  "note": "築地市場海鮮丼"            // optional, max 200
}
```

### Response（201 created）

```json
{
  "data": {
    "id": "uuid-v4",
    "tripId": "uuid-v4",
    "amount": 1500,
    "amountHomeEquivalent": 330,     // 計算結果（用 trip.fxContext.rate）
    "currency": "JPY",
    "paymentMethod": "cash",
    "category": "food",
    "occurredAt": "2026-08-16T12:30:00+09:00",
    "createdAt": "2026-08-16T12:31:05+09:00",
    "schemaVersion": 1
  },
  "meta": { "schemaVersion": 1 }
}
```

### Error codes

| Code | 何時 |
|---|---|
| `MISSING_REQUIRED_FIELD` | 缺 `tripId` 等 |
| `EXPENSE_INVALID_AMOUNT` | amount ≤ 0 |
| `TRIP_NOT_FOUND` | tripId 不存在 |
| `INVALID_CURRENCY_PAIR` | currency != trip.destinationCurrency |
| `STORAGE_QUOTA_EXCEEDED` | localStorage 滿了 |
| `EXPENSE_ID_CONFLICT` | 同 id 重送但 payload 不一致 |

### 冪等性細節

- 同 `id` + 同 payload 重送：回 **200 OK**（不是 201）+ 既有資料，不重複新增
- 同 `id` + **不同** payload：回 409 `EXPENSE_ID_CONFLICT`，提示「請用新 id 或先 DELETE」

### 併發場景

兩 tab 同時送同 `id` + 同 payload → 兩個都回 200 + 同一筆資料（localStorage 同步寫入後者覆蓋
前者，但內容相同所以使用者無感）。

---

## Endpoint 5：GET /v1/trips/:id（讀取行程）

### 描述

依 id 讀取已儲存的行程（PRD P0-6）。

| 欄位 | 值 |
|---|---|
| Operation ID | `trips.get` |
| Method / Path | `GET /v1/trips/{id}` |
| Container | Storage Adapter |
| Auth | none |
| Rate limit | unlimited（純讀本地） |
| Idempotency | 天然冪等 |
| Concurrency | 純讀無 race |

### Request

```
GET /v1/trips/{uuid-v4}
```

### Response（200）

```json
{
  "data": {
    "id": "uuid-v4",
    "userId": null,                  // MVP 永遠 null（ADR-001 為 V1 預留）
    "schemaVersion": 1,               // ADR-001 為 V1 migration 預留
    "lastModified": "2026-08-15T18:00:00Z",
    "destination": "Tokyo",
    "departureDate": "2026-08-15",
    "days": 5,
    "budget": 40000,
    "selectedTier": "mid",            // 三方案中使用者選的
    "tiers": [ /* 同 endpoint 1 */ ],
    "fxContextAtSave": { /* 存檔當下的 FX 快照 */ },
    "expenses": [ /* endpoint 4 的 list */ ]
  },
  "meta": { "schemaVersion": 1, "fromCache": false }
}
```

### Error codes

| Code | 何時 |
|---|---|
| `TRIP_NOT_FOUND` | id 不存在 |
| `SCHEMA_VERSION_MISMATCH` | 讀到的資料 schemaVersion > 當前認識的版本（譬如使用者把舊瀏覽器資料 import 到新版） |

### Schema migration 行為

當讀到 `schemaVersion < 當前版本`：

1. 觸發 `schema-migrator.migrate(data, fromVersion, toVersion)`
2. migrator 內部寫死所有版本間的轉換規則（譬如 v1 → v2 加 `selectedTier` 預設值）
3. migrate 後寫回 localStorage（升級存檔）
4. response 回傳 migrated data

當讀到 `schemaVersion > 當前版本`：拒讀，回 409 `SCHEMA_VERSION_MISMATCH`。
這保護使用者「降級瀏覽器版本」時不會誤刪新版資料。

---

## Q1–Q6 一次答完總表

| Q | Endpoint 1 | Endpoint 2 | Endpoint 3 | Endpoint 4 | Endpoint 5 |
|---|---|---|---|---|---|
| **Q1 併發** | 純讀無 race | 純讀無 race | 純讀無 race | append-only + 同 id 同 payload 共存 | 純讀無 race |
| **Q2 冪等** | `clientGenerationId` 30s 去重 | 天然冪等 | 天然冪等 | `expense.id` UUID | 天然冪等 |
| **Q3 錯誤碼** | 6 碼（見上） | 3 碼 | 2 碼 | 6 碼 | 2 碼 |
| **Q4 版本** | v1 URL | v1 URL | v1 URL | v1 URL | v1 URL |
| **Q5 相容** | response 加欄位（如 V1 加 `userId`）OK | 加 `cacheAgeMs` 等 OK | 不加 SELL enum（法規禁） | 加 `tags` 欄位 OK | 加 `userId` 為 V1 必經之路 |
| **Q6 rate limit** | 5 RPS | 10 RPS | 10 RPS | 20 RPS | unlimited |

---

## 送命題示範：「FE 今天下午能不能用 mock 開始寫？」

**判準**：每個 endpoint 已附 **3 組 mock**（happy / 業務錯 / 系統錯，見上方各 endpoint 範例）。
FE 在會議結束後安裝 msw：

```typescript
// src/mocks/handlers.ts（FE 會議後 2 小時內就能寫）
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/v1/trips/generate', () => HttpResponse.json(generateMockHappy)),
  http.get('/v1/fx/signal', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('to') === 'CUP') {
      return HttpResponse.json(errorMockInvalidPair, { status: 422 });
    }
    return HttpResponse.json(signalMockBuy);
  }),
  // ...
];
```

**驗收**：FE 在會議當日下班前能跑出三方案 UI（mock data 驅動），**完全不等任何 BE 實作**。
這就是「契約律師到場」的回報。

---

## 現場對話（~10 輪示範）

> 場景：60 分鐘會議第 40 分鐘，Architect 跟 Dev 在爭辯燈號 enum 要不要加 `SELL`。

**Dev**：「燈號為什麼只有 STRONG_BUY / BUY / HOLD？沒有 SELL？對稱性很差啊。」

**Architect**：「**PRD P0-5 法規邊界**。種子簡報明示『FX 換匯燈號需要非投資理財建議
免責聲明』。提供『買入時機』可解釋為消費決策；提供『賣出時機』就是投資建議——
這條線跨過去，產品經理要去蹲法務溝通 3 個月。MVP 階段**不加 SELL**，spec 寫死。」

**Dev**：「那 deviation = +5% 怎麼辦？使用者看到 HOLD 不覺得奇怪嗎？」

**Architect**：「**HOLD 包含『正偏離』**——意思是『現在不是好時機，但也不勸你做反向操作』。
recommendation 文字會講清楚『目前匯率高於均值，建議再等等』，但**不會說『建議賣出』**。
這個微妙差別必須在 spec 鎖死。」

**Dev**：「OK。下一個問題——`POST /trips/generate` 為什麼需要 `clientGenerationId`？
這是 local function call，retry 由誰發起？」

**Architect**：「**為 V1 與 analytics 雙重保險**。V1 是 HTTP 後，網路丟包 client 會 retry。
MVP 階段是 React StrictMode 的 double-render 可能讓 useEffect 重複 call，不去重的話
analytics 會送兩次 `generate` event，導致 PRD §7『啟用率』指標被高估。**0.5 天的去重設計，
保護整個 metric 的可信度**。」

**Dev**：「Endpoint 4 開支新增為什麼回 201？localStorage 又不是真的 HTTP server。」

**Architect**：「**為了 V1 雲端化時的契約一致性**。MVP 階段 local function 內部 throw
`ExpenseCreatedResult` object 攜帶 `httpStatus: 201`，FE 用同樣的 client 邏輯處理 200 vs 201
（前者代表 idempotent replay，後者代表真的新增）。V1 切 HTTP 時 FE 0 改動。」

**Dev**：「Schema version 那段我看不懂。為什麼讀到 newer version 要拒讀，不是直接讀？」

**Architect**：「**保護降級場景**。想像使用者用 v2 PWA 存了行程，後來把瀏覽器降回 v1 PWA（譬如
service worker bug）—— v1 不認識 v2 的新欄位，讀進來解析錯誤、可能誤刪資料。**拒讀 + 提示
『請更新到最新版』比『讀錯資料』安全**。這是 ADR-001 schema versioning 後門的具體用法。」

**SA**（旁聽，插話）：「`POST /expenses` 同 id 不同 payload 為什麼回 409 不是直接覆蓋？這跟
`POST /trips/save` 的 last-write-wins 邏輯不一致。」

**Architect**：「**問得好**。差別在『開支是 immutable event』vs『行程是 mutable document』。
開支一旦記下就是事實（你那天確實花了 1500 日圓），不該被改；要改就用新 id 加新筆 + DELETE
舊筆，audit trail 才完整。行程是計畫，可以反覆編輯，所以 last-write-wins。**這個語意差異
必須在 spec 寫清楚，否則 FE 會自己猜**。」

**Dev**：「Rate limit 5 RPS 怎麼來的？我覺得 1 RPS 就夠了。」

**Architect**：「**5 是上限，不是預期值**。預期使用者是『按下 generate → 等 1 秒看結果』，
1 RPS 都用不到。5 RPS 是『**保護自己**』——React StrictMode double-render + useEffect 依賴
寫錯可能 5 次/秒，超過這個就一定是 bug，要拋警告。**rate limit 是 bug 偵測器，不是業務上限**。」

**Dev**：「最後問——`fxContext = null` 的降級行為，FE 怎麼判斷？」

**Architect**：「**`meta.fxDegraded: true` 顯式標記**。FE 看到這個 flag 就 render「換匯資料
暫時無法取得」橫幅。**不要靠 client 自己判斷 `fxContext === null`**——`null` 跟 `undefined`
跟 `missing` 在 JSON 解析後可能不同，明確 flag 才不會誤判。**spec 教 client 怎麼判斷，
而不是讓 client 自己腦補**。」

**Dev**：「OK，spec 我懂了。我下午就 commit mock handlers。」

**Architect**：「對。**會議結束的判準就是『FE 能立刻獨立開發』**。做不到，spec 還沒完成。」

---

## 下游影響：本場 API spec 如何流向 08 / 11 / 12

**流向 08-data-model**：

> API schema → storage schema 對應規則：
> - `Trip` 物件直接 1:1 序列化進 localStorage key `smarttrip:trip:{id}`
> - `Expense` 物件 1:1 序列化進 localStorage key `smarttrip:expense:{id}`
> - `FxRate` cache 進 in-memory Map，不入 localStorage（24h TTL）
> - 所有 schema 必含 `schemaVersion: number`（ADR-001 強制）
> - 所有 timestamp 用 ISO 8601 string（不存 Date object，ADR-001 強制）

**流向 11-unit-test**：

> 本場已附 5 endpoints × 3 mock scenario = **15 組 mock data**，可直接：
> - 寫 contract test：actual implementation 必須符合 spec response shape
> - 寫 FE component test：用 msw 攔截、給 mock response、驗 UI render
> - 寫降級行為 test：模擬 FX_RATE_UNAVAILABLE 驗 UI 正確顯示橫幅
> - 寫冪等 test：同 id 重送，驗回應一致

**流向 12-release-plan**：

> Deprecation 流程（4 階段）決定 release window：
> - 任何 breaking change 需排 90 天 grace period
> - sunset 後 30 天才能 hard remove
> - V1 雲端化視為 v1 → v1 同版本（schema 兼容），**不觸發 deprecation**
> - Feature flag：`fx_provider_v2` 等用於灰度切換 provider，與 spec versioning 無關
