# 06 C4 Diagram · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報 + 完整 PRD §6（功能清單）+ ADR-001（localStorage）作為輸入，
> 把上一份「關鍵提問.md」的 6 題 + 1 題送命題實際答一遍，並產出三層 C4 圖
> （Context / Container / Component）。

---

## Q1 示範：「Context 層的 actor vs external system」

### Actor（會主動發起 use case）

| Actor | 來源 | 主要 use case |
|---|---|---|
| **衝動型旅客（25–40 歲）** | PRD §4 主要 persona | 生成行程、看換匯燈號、記旅途開支 |
| **首次自由行新手** | PRD §4 次要 persona | 跟著手把手算出來「該帶多少現金」 |

### External system（被我們呼叫）

| External | 來源 | 用途 |
|---|---|---|
| **FX rate provider**（Wise / 台銀 / Frankfurter 三選一） | PRD §6 P0-8 + §9 Open Question | 取得即時匯率、計算 MA30 |
| **Google Maps Places API** | PRD §6 P0-1 行程地點 | 地點搜尋、座標、營業時間 |
| **Analytics service**（Plausible / GA4 / PostHog） | PRD §6 P0-9 + §8 | 收集 generate / save_trip / return_visit 事件 |
| **Browser localStorage API**（platform） | ADR-001 | 本機儲存（非外部，但屬「外部於我們程式碼」） |

### Context 圖（文字版）

```
                  ┌─────────────────────────┐
   衝動型旅客 ──→ │                         │ ──→ FX rate provider (Tier 2)
                  │   SmartTrip FX (PWA)    │       Wise / 台銀 / Frankfurter
   新手旅客 ────→ │                         │ ──→ Google Maps Places (Tier 3)
                  │                         │ ──→ Analytics (Tier 3)
                  └─────────────────────────┘
                            ↕
                  Browser localStorage API
                  (platform, Tier 1)
```

**Architect 觀點**：注意 Google Maps 與 Plausible 都是 external system，**不是 actor**——
判準是「呼叫方向誰主動」。actor 是旅客（主動點按鈕），external 是被我們程式碼呼叫的服務。

---

## Q2 示範：「Container 邊界依據」

| Container | 類型 | Runtime / Tech | 邊界依據 | confidence |
|---|---|---|---|---|
| **PWA Shell** | shell / UI | React 18 + Next.js（已上線版本）+ service worker | (a) 同一 deploy unit，但 (c) 團隊未來想換 framework 不影響 logic → 與「行程規劃引擎」拆開 | [H] |
| **行程規劃引擎** | service（pure function） | TypeScript module，無 framework 依賴 | (c) 團隊歸屬：邏輯人員獨立維護；(b) 資料生命週期：行程資料的 owner | [H] |
| **FX Adapter** | adapter（external 隔離） | TS module + fetch | (b) 資料生命週期：匯率 cache 獨立；adapter pattern 隔離外部依賴 | [H] |
| **燈號判定服務** | service（演算法） | TS module，pure function | (c) 法規邊界：PRD P0-5「非投資理財建議」免責聲明邏輯獨立才能 audit | [H] |
| **開支記錄子模組** | service | TS module | (b) 資料生命週期：開支資料只在旅途中活躍，與行程資料生命週期錯開 | [M] |
| **Storage Adapter** | adapter（platform 隔離） | TS module + localStorage API | ADR-001 預留 V1 swap 後門：邊界依據是「未來想換 storage 不影響 logic」 | [H] |

**Architect 觀點**：6 個邏輯 container **跑在 1 個 deploy unit**（PWA bundle），這在 C4 圖上
是合法的——container 不等於 server。重點是「邏輯邊界 + 為什麼這樣切」可被挑戰。

### Container 圖（文字版）

```
┌──────────────────── SmartTrip FX (PWA Bundle, 1 deploy unit) ────────────────────┐
│                                                                                  │
│  ┌────────────────┐                                                              │
│  │   PWA Shell    │  (React + Next.js + service worker, UI/routing)              │
│  │   (UI/Shell)   │                                                              │
│  └───┬─────────┬──┘                                                              │
│      │ in-proc │ in-proc                                                         │
│      ▼         ▼                                                                 │
│  ┌─────────────────┐  ┌────────────────┐  ┌─────────────────┐                    │
│  │ 行程規劃引擎     │  │  FX Adapter    │──┼──→ FX provider (HTTPS, async)        │
│  │ (TS pure fn)    │  │  (adapter)     │  │                                      │
│  └──┬──────────────┘  └──┬─────────────┘  │                                      │
│     │ in-proc            │ in-proc        │                                      │
│     ▼                    ▼                │                                      │
│  ┌────────────────┐  ┌─────────────────┐  │                                      │
│  │ 燈號判定服務    │  │ 開支記錄子模組   │  │                                      │
│  │ (algo + legal) │  │ (service)       │  │                                      │
│  └────────────────┘  └─┬───────────────┘  │                                      │
│                        │ in-proc          │                                      │
│                        ▼                  │                                      │
│                  ┌─────────────────┐      │                                      │
│                  │ Storage Adapter │──────┼──→ localStorage (browser API)        │
│                  │ (platform abs)  │      │                                      │
│                  └─────────────────┘      │                                      │
│                                           │                                      │
│  (全 container 皆 fire) ──────────────────┼──→ Analytics (HTTPS, fire-forget)    │
│                                           │                                      │
└───────────────────────────────────────────┘                                      │
                                            └──→ Google Maps Places (HTTPS, async) │
                                                 [from 行程規劃引擎]                │
                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Q3 示範：「跨 container 通訊協定」

| From → To | Protocol | 同步/非同步 | Payload 格式 |
|---|---|---|---|
| PWA Shell → 行程規劃引擎 | in-process function call | 同步（return Promise） | TS object（`PlanRequest`） |
| 行程規劃引擎 → FX Adapter | in-process async call | 非同步 | TS object（`FxQuery`），return `Promise<FxRate>` |
| 行程規劃引擎 → Google Maps Places | HTTPS REST | 非同步 | JSON（Places API spec） |
| 行程規劃引擎 → 燈號判定服務 | in-process function call | 同步 | TS object（`SignalInput`） |
| FX Adapter → FX provider（Wise/台銀/Frankfurter） | HTTPS REST | 非同步 | JSON（provider-specific，adapter 轉譯成統一格式） |
| 開支記錄子模組 → Storage Adapter | in-process function call | 同步 | TS object（`Expense`） |
| Storage Adapter → localStorage | browser sync API | 同步 | string（JSON.stringify 序列化） |
| 全 container → Analytics | HTTPS POST | 非同步 fire-and-forget | JSON（event payload） |

**Architect 觀點**：注意「in-process function call」也要標——這跟「HTTP」在未來想拆 service 時
意義完全不同。in-process call 升級不需 zero-downtime、HTTP 要設計 backward compat。

---

## Q4 示範：「外部依賴穩定性等級 + failover」

| External | Tier | 失敗影響 | Failover 策略 | 替代方案 |
|---|---|---|---|---|
| **FX rate provider** | **Tier 2**（降級可用） | 燈號無法判定、建議換匯額無法計算 | (1) cache 上次成功值 24 小時 (2) 24h 內：用 cache + 標「資料時效 N 小時前」 (3) 24h 外：燈號改灰色「資料暫時無法取得」、停止建議換匯 | Wise / 台銀 / Frankfurter 三選一可切換（adapter pattern，1–2 天工作量） |
| **Google Maps Places** | **Tier 3**（可選） | 行程地點無座標、無地圖顯示 | 行程改為純文字清單，無地圖 | MapBox / OpenStreetMap（未來考慮，非 MVP） |
| **Analytics（Plausible）** | **Tier 3**（可選） | 我們收不到 metric，使用者無感 | fire-and-forget，失敗即丟棄；本地 console.warn 紀錄 | GA4 / PostHog（任何時候可換，blast radius = analytics SDK 一個檔案） |
| **localStorage（browser platform）** | **Tier 1**（無 failover） | 存檔功能全壞、開支紀錄無法存、行程消失 | 顯示明確錯誤訊息「您的瀏覽器不支援儲存功能，請開啟 cookies / 退出無痕模式」 | 無——這是 platform 限制（屬 ADR-001 已接受的風險） |

**Architect 觀點**：**FX provider 雖然是 Tier 2 但是『商業價值的核心』**——「省錢」這個賣點
完全依賴 FX 數字可信。所以即便分類為 Tier 2，failover 設計要做到位（24h cache + 三 provider 可切）。
**這個 trade-off 必須寫進 09-non-functional-reqs**。

---

## Q5 示範：「最少幾個 container？」

**結論：6 個邏輯 container，1 個 deploy unit（PWA bundle）。**

**6 個邏輯 container 的辯護**：

| Container | 為什麼不能合進其他？ |
|---|---|
| PWA Shell | UI 層，與業務邏輯解耦才能換 framework |
| 行程規劃引擎 | pure function，獨立才能寫 unit test、未來 server-side 化容易 |
| FX Adapter | 外部依賴隔離原則（Q6 詳述），blast radius 控制 |
| 燈號判定服務 | **法規邊界**：PRD P0-5 「非投資理財建議」免責聲明邏輯必須 audit |
| 開支記錄子模組 | 資料生命週期錯開（行程 = 出發前；開支 = 旅途中），未來可獨立 release |
| Storage Adapter | ADR-001 預留 V1 swap 後門，必須隔離 |

**反論考慮**：「行程規劃引擎」與「燈號判定服務」能不能合？
→ **不能**。燈號有法規免責邊界，獨立才能單獨 audit + 加免責聲明 UI。

**為什麼不切到 7 個 container**：考慮過「行程生成」與「行程讀取」拆開，但兩者共用同一個
`Trip` 資料結構與同一個 Storage Adapter → 切開反而增加 coupling 而非減少。**駁回**。

---

## Q6 示範：「外部依賴換了怎麼辦？Blast radius」

**情境：Wise API 停服或改 schema。**

| 動到的範圍 | 預估工作量 |
|---|---|
| `src/fx/providers/wise-provider.ts` 改寫為 `frankfurter-provider.ts` | 0.5 天 |
| `src/fx/fx-adapter.ts` 切換 default provider 設定 | 0.1 天 |
| 整合測試（fixture 更新） | 0.5 天 |
| **上游所有 container（行程規劃引擎、燈號判定服務、PWA Shell）** | **0 改動**——adapter 介面不變 |

**Blast radius = 1 個 container 內的 1 個 module**。

**對外介面契約（FX Adapter 對上游）保持不變**：

```typescript
interface FxAdapter {
  fetchRate(from: Currency, to: Currency): Promise<FxRate>;
  fetchMA30(from: Currency, to: Currency): Promise<number>;
  getCachedRate(from: Currency, to: Currency): FxRate | null;
}
```

**Architect 觀點**：這就是 adapter pattern 的價值——0.5 天的事前設計，換來換 provider 時
省 5 天。**而且 PRD §9 Open Question 明示「即時匯率資料源選哪個還沒定」——adapter pattern
就是給「還沒選」留空間的方法**。MVP 可以先用 Frankfurter（免費 + 公開），驗證通過後再評估
Wise（穩定性好但要 API key）。

---

## Layer 3：Component 圖（拆 FX Adapter 內部）

**為什麼選 FX Adapter 拆 component**：(1) 最複雜的 container（含 cache + retry + provider 切換）
(2) 最容易出 incident 的點（外部依賴）(3) PRD P0-8「待補（關鍵）」標示——這是 MVP 收尾最後一塊。

### FX Adapter 內部 component

```
┌────────────────────── FX Adapter Container ──────────────────────┐
│                                                                  │
│  ┌─────────────────┐         ┌──────────────────────┐            │
│  │ FxFacade        │────────→│ FxCache              │            │
│  │ (public API)    │         │ (24h TTL, in-mem)    │            │
│  └────────┬────────┘         └──────────────────────┘            │
│           │                                                      │
│           │ on cache miss                                        │
│           ▼                                                      │
│  ┌─────────────────┐         ┌──────────────────────┐            │
│  │ ProviderRouter  │────────→│ CircuitBreaker       │            │
│  │ (Wise→台銀→     │         │ (fail-open after 3   │            │
│  │  Frankfurter順) │         │  consecutive errors) │            │
│  └────────┬────────┘         └──────────────────────┘            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │ WiseProvider    │  │ TaibankProvider │  │ FrankfurterProv │   │
│  │ (HTTPS impl)    │  │ (HTTPS impl)    │  │ (HTTPS impl)    │   │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘   │
│           │                    │                    │            │
└───────────┼────────────────────┼────────────────────┼────────────┘
            ▼                    ▼                    ▼
       Wise API            台銀 公開 API         Frankfurter API
       (Tier 2)            (Tier 2)              (Tier 2)
```

### 每個 component 的單一職責

| Component | 單一職責 |
|---|---|
| **FxFacade** | 對外只暴露 3 個 method（`fetchRate` / `fetchMA30` / `getCachedRate`），上游不知道下面有 cache / retry / provider 切換 |
| **FxCache** | in-memory cache（Map）+ 24h TTL；提供 hit/miss 統計（給 Analytics） |
| **ProviderRouter** | 按設定的 fallback 順序嘗試各 provider；失敗則切下一個 |
| **CircuitBreaker** | 連續 3 次失敗則開路（30 秒不再嘗試），避免雪崩；半開狀態探測恢復 |
| **WiseProvider / TaibankProvider / FrankfurterProvider** | 各家 API 的 HTTPS 實作 + 回應格式轉譯成統一的 `FxRate` |

**Architect 觀點**：Layer 3 圖**不要全 container 都畫**——只挑「最複雜」「最容易出事」「跨團隊
合作」的 container 拆。MVP 拆 1–2 個就夠，剩下的 4 個 container 內部留給 Dev 在實作時自由設計。
過度設計是技術債的另一個源頭。

---

## 送命題示範：「每個 container 對應到哪個檔案 / 哪個 PR？」

**目的**：讓 6 週後 Dev 拿到 ticket「修改換匯邏輯」時，3 秒內找到對應 code。

| Container | 對應檔案結構 | 主責 PR 規模估算 |
|---|---|---|
| PWA Shell | `src/app/`（Next.js app router）+ `src/components/shell/` | 已上線，僅維護 |
| 行程規劃引擎 | `src/engine/trip-planner.ts` + `src/engine/tier-calculator.ts` | 已上線，僅維護 |
| FX Adapter | `src/fx/`（含 facade / cache / router / providers/ 子目錄）| **P0-8 主要實作 PR，~3–5 天** |
| 燈號判定服務 | `src/signal/signal-evaluator.ts` + `src/signal/disclaimer.ts` | 已上線（演算法），P0-5 強化免責 ~1 天 |
| 開支記錄子模組 | `src/expense/`（含 expense-store.ts + comparison.ts） | 已上線，僅維護 |
| Storage Adapter | `src/storage/storage-adapter.ts` + `src/storage/schema-migrator.ts` | 已上線，**schema-migrator 待補 ~1 天**（為 V1 開後門） |

**這張對應表必須寫進 README 或 ADR-002（程式碼結構）**。
6 週後新人 onboard，看 C4 圖 + 對應表 → 5 分鐘理解全系統。

---

## 現場對話（~10 輪示範）

> 場景：75 分鐘會議第 40 分鐘，Architect 跟 Dev 在爭辯「燈號判定要不要獨立 container」。

**Dev**：「燈號就是個算 MA30 偏離 % 的函數，幹嘛獨立 container？併到 FX Adapter 就好啊。」

**Architect**：「**因為法規邊界**。PRD P0-5 寫『FX 換匯燈號需要非投資理財建議免責聲明』。
這意味著燈號邏輯未來要被 audit、要加免責 UI、可能要被法務 review。**獨立 container 才能單獨 audit**。」

**Dev**：「audit 又不是 MVP 要做的事⋯⋯」

**Architect**：「**現在不獨立，未來要拆會痛**。3 個月後法務說『燈號邏輯要單獨送審』，
你把它從 FX Adapter 挖出來時會發現 cache / retry 邏輯都纏在一起。**現在切，0.5 天；
3 個月後切，3 天**。」

**SA**：「我看你的 Container 圖，FX Adapter 跟 Google Maps 都是外部 API，為什麼 FX 有
adapter container 但 Google Maps 沒有？不對稱。」

**Architect**：「**Tier 不同**。FX 是 Tier 2（壞了系統降級可用，且是商業核心）→ 必須做
adapter 隔離 + 三 provider failover。Google Maps 是 Tier 3（壞了只是無地圖顯示）→
直接在『行程規劃引擎』內 fetch 就好，不值得多開 container。**對稱不是目的，trade-off 才是**。」

**Dev**：「那為什麼 Analytics 也是 Tier 3，但你把它畫成『全 container 都連』？」

**Architect**：「因為 Analytics 是**橫切關注點**（cross-cutting concern）——
generate / save_trip / add_expense / return_visit 事件分散在多個 container 觸發。
畫一個總線比每條線單畫清楚。**這是 C4 圖的便宜行事，但你問了我就要承認這是簡化**。」

**SA**：「Container 數量 6 個，老實說我覺得對 PWA 太多了。3 個夠嗎？UI / Logic / Storage 三層。」

**Architect**：「我們挑戰看看：合『行程規劃引擎』+『燈號判定服務』+『FX Adapter』+『開支記錄子模組』
變成一個『Logic』container——問題是 **(1) 法規邊界沒了 (2) FX 外部依賴隔離沒了
(3) 開支獨立 release 的能力沒了**。三個合一拿到什麼？少 3 個 box——**沒有實質好處，
只有省幾筆畫**。駁回。」

**Dev**：「OK，但 6 個 container 跑在 1 個 PWA bundle，這在 C4 model 真的合法嗎？我以為
container 就是 deploy unit。」

**Architect**：「**C4 model 允許『邏輯 container』**——重點是『邊界依據』，不是
『有沒有獨立 process』。Simon Brown（C4 作者）原文也說過：『Container 是部署單位
**或邏輯邊界**』。我們在 README 加註『6 個邏輯 container 跑在 1 個 PWA bundle』就清楚。」

**SA**：「Adapter pattern 對 FX 我懂了。Storage Adapter 為什麼也要？localStorage API 已經
夠簡單了吧？」

**Architect**：「**為 ADR-001 的 V1 後門**。ADR-001 寫『未來換 server-side 是 Hard 但非 One-way Door』
的前提就是 Storage Adapter 隔離。沒有這層 adapter，未來換 storage 要動 N 個檔案。**這個 0.5 天的
adapter 是 ADR-001 可逆性的物理實現**。」

**Dev**：「最後一個問題——Component 圖你只畫 FX Adapter 一個，其他 container 不畫嗎？」

**Architect**：「**MVP 階段只畫最複雜 + 最容易出事的 container**。FX Adapter 兼具：
複雜（cache + retry + 多 provider）、容易出事（外部依賴）、跨人合作（FE 寫 facade、
資深 Dev 寫 circuit breaker）。其他 container 內部留給實作時自由設計。**過度設計是
技術債的另一個源頭**——畫太細的 component 圖會把 Dev 鎖死在『照圖實作』。」

---

## 下游影響：本場 C4 圖如何流向 07 / 08 / 09 / 10

**流向 07-api-spec**：

> 跨 container 通訊都需 interface 契約，本場 C4 圖直接列出 ~8 個契約：
> - `tripPlanner.generate(req: PlanRequest): Promise<PlanResult>`
> - `fxAdapter.fetchRate(from, to): Promise<FxRate>`
> - `fxAdapter.fetchMA30(from, to): Promise<number>`
> - `signalEvaluator.evaluate(input: SignalInput): SignalResult`
> - `expenseStore.add(expense: Expense): void`
> - `storageAdapter.saveTrip(trip: Trip): void`
> - `storageAdapter.loadTrip(id: string): Trip | null`
> - `storageAdapter.listTrips(): Trip[]`
>
> 07-api-spec 卡要為**每一個**定義 input schema / output schema / 錯誤型別 / 併發語意 / 版本策略。

**流向 08-data-model**：

> 資料 owner 從 container 圖判定：
> - `Trip` schema → owner = 行程規劃引擎（但 read by Shell, Expense）
> - `Expense` schema → owner = 開支記錄子模組
> - `FxRate` cache schema → owner = FX Adapter
> - 所有 schema 序列化規範遵守 ADR-001（無 Date、無 undefined）

**流向 09-non-functional-reqs**：

> 每個 container 分配 SLA 預算：
> - PWA Shell：首屏 LCP < 2s
> - 行程規劃引擎：generate latency P95 < 500ms（不含 external fetch）
> - FX Adapter：cached fetch < 10ms；fresh fetch < 1s（含 retry budget）
> - Storage Adapter：read/write < 50ms

**流向 10-threat-model**：

> Trust boundary 從 container 圖畫出：
> - PWA Shell 內所有 container 共享 trust（同 origin）
> - PWA Bundle ↔ 任何外部（FX / Maps / Analytics）= **trust boundary**，必須驗 response schema
> - localStorage data → **不可信**（使用者可手動改），讀回時必須 schema validate

**流向 12-release-plan**：

> Deploy unit = 1 個 PWA bundle → release = 1 次 build & deploy。
> 但 P0-8（FX Adapter 即時匯率）可獨立 feature flag，與 P0-5 燈號逐步 rollout。

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的白板照片 + 6 題 + 送命題的答案 + ADR-001 + PRD §6
丟給 `card-fill` skill：

```
/card-fill register 06-c4-diagram <你的白板筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/c4-diagram.md` 的範本結構，
產出含三層圖（mermaid 或 ASCII）+ container 清單表 + 外部依賴清單 + component 拆解
的 markdown deliverable。

**本場會議的學習目標到送命題答完就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**畫出邊界 + 寫下邊界依據**」，不是「**畫得漂亮**」。
