# 05 ADR · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報（`demo/種子簡報.md`）+ 完整 PRD（`PRD.md`）的素材，
> 把上一份「關鍵提問.md」的 6 題 + 1 題送命題實際答一遍。
> 本場會議產出一份完整的 **ADR-001：MVP 儲存層選型**，含 context／decision／
> 3 條 rejected options／consequences／reversibility／review trigger。

---

## 本場 ADR 主題：ADR-001 MVP 儲存層選型

**觸發事件**：04-acceptance-criteria 卡完成、PRD §6 P0-6（儲存行程）與 P0-7（開支紀錄）
要進入實作前，必須先正式回答「資料存哪」的選型問題。種子簡報雖明示「MVP 用 localStorage、
不做帳號雲端同步」，但**未走 trade-off 流程的結論不是 ADR**——本場要把 3 個候選攤開、
走完完整流程，並把 consequences 與 reversibility 寫進文件，給未來的 ADR-008（V1 雲端同步）
留下決策路標。

---

## Q1 示範：「這個決策影響到哪些 NFR？」

| NFR | 為什麼會被綁住 | 量測門檻假設 | confidence |
|---|---|---|---|
| **Performance（讀取延遲）** | 儲存層讀取延遲直接影響「我的行程」列表開啟速度，違反 G1「3 分鐘 UX」 | 列表載入 < 200ms（P95）| [H] |
| **Data durability** | 使用者清 cache / 換瀏覽器 / 換手機 → 資料消失。直接影響 P0-6 驗收標準「重整不消失」與 30 天回訪指標 | 同一裝置 + 同瀏覽器：30 天資料保留率 100%；跨裝置：0%（已知限制） | [H] |
| **Portability** | V1 路線圖要做帳號同步（PRD §10 V1 + §9 Open Question 商業模式分歧）。儲存層決策決定 migration 工作量 | V1 migration 預算 ≤ 2 週 | [M]（依賴 V1 是否確定做） |
| **Cost** | server-side 方案有月固定成本，違反 brief「4 週驗證窗、無商業模式」原則 | 月固定成本 ≤ $5 USD（驗證期上限） | [H] |
| **Privacy** | brief 明示「重隱私、免登入」定位。資料留在 client 對 GDPR / 同意流程友善 | 不需 cookie consent banner（無 server-side tracking）| [H] |

**觀點**：5 個 NFR 中**有 3 個（durability / portability / cost）構成真實 trade-off**——
這就是為什麼即便結論顯而易見，仍需要 ADR：要把「我們選擇放棄 durability」這件事**寫進文件**，
未來客訴來時不會手忙腳亂。

---

## Q2 示範：「可逆性？」

**可逆性等級**：**Hard**（不是 One-way Door，但要規劃 migration sprint）

| Migration 路徑 | 工作量 | 風險 |
|---|---|---|
| localStorage → server-side（帳號雲端同步） | (1) 寫 `POST /trips/migrate` endpoint（讀 client localStorage、上傳 → server）：3 天 (2) 衝突解決策略（同一 user 多裝置不同步資料）：3 天 (3) opt-in flow UI（使用者授權匯入）：2 天 (4) 回滾機制（出問題能否切回 localStorage-only）：2 天 | 總計 **~2 週**。風險：使用者拒絕 opt-in 時資料留在 client 永遠不上雲，要設計「persistent reminder vs 不打擾」UX |
| localStorage → IndexedDB | (1) wrapper 改寫（adapter pattern 替換）：2 天 (2) migration script（讀 localStorage、寫 IndexedDB、保留兩份直到驗證）：2 天 | 總計 **~4 天**。低風險，但無實質好處（見 Q3） |

**為什麼不是 One-way Door**：schema 設計時若預留 `userId`（null for MVP）、
用標準 JSON 序列化（不塞 Date object）、加 `lastModified` timestamp，
未來 server 端能直接讀進來——**這是 ADR-001 對 ADR-008（未來 V1 同步）的開後門設計**，
本場會議必須在 Consequences 段強制寫入。

---

## Q3 示範：「3 個 rejected options + 拒絕理由」

### Option A（**選用**）：browser **localStorage**

**Pros**:
- API 簡單（`setItem` / `getItem`），FE 2 人皆熟悉，學習曲線 = 0
- 零成本（不需 server / DB）
- 同步 API，搭配 React state 易於整合
- 對 PWA service worker 完全相容（離線可讀）
- 完美對齊 brief「免登入即開即用」定位

**Cons**:
- 容量上限 ~5MB（每瀏覽器，2026 年實測 Chrome 10MB / Safari 5MB）
- 同步 API：大資料寫入會 block main thread（但本案資料量 < 100KB 不會發生）
- 跨裝置不同步、清 cache 即消失（**已知並接受的限制**）

### Option B（**rejected**）：**IndexedDB**

**Pros**:
- 容量上限大（>50MB）
- async API，不 block main thread
- 支援 transaction、index、複雜查詢

**Cons / Rejection reasons**:
1. **規模不需要**：本案資料量估算 = 10 個行程 × ~10KB JSON = ~100KB，遠低於 localStorage 5MB 上限。
   IndexedDB 的 50MB+ 容量等於用大砲打蚊子
2. **API 複雜度 3 倍**：要寫 wrapper / Promise 化 / handle versioning，FE 估算需多 1 週開發時間。
   4 週 MVP 沒這個預算
3. **沒用到的能力**：行程列表查詢只是「讀全部 → filter」，根本沒用到 IndexedDB 的 index / transaction
4. **iOS Safari < 14 已知 bug**：IndexedDB 在 PWA mode + Safari 14 以下會偶發資料消失（StackOverflow
   多人回報）。目標族群（25–40 歲）30% 用 iPhone，不能賭

**結論**：IndexedDB 是「未來 V2 真的有大量歷史資料時」的方案，不是 MVP 方案。

### Option C（**rejected**）：**Firebase Firestore / Supabase（server-side）**

**Pros**:
- 跨裝置同步「免費」拿到
- Data durability（資料在雲端）
- 預備好 V1 帳號功能基礎建設

**Cons / Rejection reasons**:
1. **違反 brief 約束**：種子簡報明示「不做帳號雲端同步」「免登入即開即用」。
   server-side persistence 要嘛強制登入（違反），要嘛用 anonymous user（4 週驗證窗的複雜度不值得）
2. **月成本 $25 USD（Firestore Spark plan 免費額度估算）**：4 週驗證窗失敗就是浪費；
   驗證通過後 DAU > 1K 要升 Blaze plan，月成本 $50+
3. **新依賴 = 新風險**：Firebase outage 直接打死 MVP；MVP 階段不應引入「外部服務 SLA」這層風險
4. **學習曲線**：FE 2 人都沒用過 Firebase，預估 1 週 onboarding + 1 週踩雷 = MVP 50% 時間燒掉
5. **PWA offline 反而變難**：要自己處理 sync conflict，比 localStorage 純 client 複雜 10 倍

**結論**：server-side 是 V1 帳號功能的方案，不是 MVP 方案。本案要驗證的是「使用者願不願用」，
不是「同步機制能不能 work」。

### Option D（**rejected**，補考慮）：**Cookie**

**Pros**: 跨 subdomain 共享、自動跟 HTTP request

**Cons / Rejection reasons**:
1. 容量上限 4KB，**裝不下單一行程 JSON**
2. 每個 request 都送出去，浪費 bandwidth
3. 跟 GDPR cookie consent 衝突（brief 重隱私定位）

**結論**：不在同一個 weight class，純列為「考慮過」。

---

## Q4 示範：「6 個月後會後悔的情境？Review trigger」

**Review trigger 列表**（觸發 ADR-001 重審）：

1. **DAU > 10,000**：localStorage 5MB 上限可能對重度使用者（存 50+ 行程）構成壓力
2. **「換手機資料就沒了」客訴 > 5 件/週**：代表 durability gap 對使用者實際造成痛苦，需評估 V1 帳號功能優先序
3. **V1 帳號功能進入 roadmap 啟動**：自動觸發 ADR-008（雲端同步策略），ADR-001 改標 deprecated
4. **iOS Safari quota policy 變更**：Apple 曾數次調整 PWA storage quota；若 quota < 1MB，MVP 直接掛
5. **使用者開始要求「跨裝置同步」於 NPS 調查中 > 20% 提及**：商業訊號，啟動 V1 同步

**未列入 trigger 的情境**（明示不重審）：
- 「Firebase 出新功能」「IndexedDB 變快」——技術演進不是 review trigger，使用者痛苦才是

---

## Q5 示範：「綁住了哪些下游卡？」

| 下游卡 | 受 ADR-001 影響的具體欄位 / 決策 |
|---|---|
| **06-c4-diagram** | (a) Container 圖中 `Storage` box 類型標 **`browser-local`**，不是 `external service` (b) 不畫向外的 storage 箭頭 (c) PWA shell 與 storage 同一個 deploy unit |
| **07-api-spec** | (a) 行程 CRUD 是 **local function 契約**（`storage.saveTrip(trip)`），不是 `POST /trips` (b) **不需要** auth header / rate limiting / pagination (c) 必須定義 schema versioning（為 V1 migration 開後門） |
| **08-data-model** | (a) ID 用 **client-side UUID v4**（不需 server 序號）(b) **必須**預留 `userId: null`、`lastModified: ISO8601` 欄位（為 ADR-008 開後門）(c) 序列化用標準 JSON，**禁止**塞 Date object / Symbol / undefined |
| **09-non-functional-reqs** | (a) Durability SLA = 「同裝置 + 同瀏覽器 30 天保留 100%」（明示跨裝置不保證）(b) Capacity = 單裝置 ≤ 50 個行程（5MB / 100KB 估算）|
| **11-unit-test** | storage layer 用 `jest-localstorage-mock`，**不需要** mock HTTP / database |
| **12-release-plan** | MVP 不需 migration window；V1 啟動時需獨立排 2 週 migration sprint（見 Q2）|

---

## Q6 示範：「沉沒成本 vs 學習曲線」

| 維度 | localStorage | IndexedDB | Firebase |
|---|---|---|---|
| 團隊熟悉度 | FE 2 人皆熟悉（過去 3 個專案用過） | 1 人略懂、1 人沒碰過 | 0 人用過 |
| 學習曲線估算 | 0 天 | +5 天 | +10 天（包含 踩雷） |
| 沉沒成本 | 已上線版本就用 localStorage，**改了要重寫 6 個檔案** | 需重寫 wrapper + migration | 需重寫 + 加 auth + 加 sync logic |
| MVP 4 週時間佔比 | 0% | 18%（5/28 天）| 36%（10/28 天）|

**Architect 結論**：4 週 MVP 的「正確技術」是「**團隊能 ship 的**」。
Firebase 在 V1 才是正確選擇，現在不是。

---

## 送命題示範：「V1 雲端同步會綁死什麼？預先列 migration path」

**為 ADR-008（V1 雲端同步）開的後門**（必須寫進 ADR-001 Consequences）：

1. **Schema 預留欄位**（08-data-model 必須遵守）：
   ```json
   {
     "id": "uuid-v4",
     "userId": null,           // MVP 永遠 null；V1 帳號功能填入
     "lastModified": "ISO8601", // MVP 不用，V1 衝突解決需要
     "schemaVersion": 1,        // 升級時走 migration
     "data": { ... }
   }
   ```

2. **序列化規範**：
   - 禁用 `Date` object（用 ISO8601 string）
   - 禁用 `undefined`（用 `null`）
   - 禁用 `Symbol` / `Map` / `Set`（非 JSON 標準）

3. **Migration endpoint 設計提前思考**（07-api-spec V1 版本要實作）：
   - `POST /v1/migrate/trips` — 讀 client localStorage 全量上傳
   - Body: `{ trips: [...], clientLastModified: ISO8601 }`
   - Response: `{ migrated: N, conflicts: [...] }`
   - 衝突策略：last-write-wins（簡單）vs manual resolve（複雜）→ V1 決定

4. **回滾路徑**：
   - V1 上線後出問題，能否切回 localStorage-only mode？
   - 設計：feature flag `cloud_sync_enabled`，預設 false，逐步 rollout

**不寫進 ADR-001 的代價**：6 個月後做 V1，會發現 (a) schema 沒留 userId 欄位要全量 migration
(b) 序列化塞了 Date object 反序列化爛掉 (c) 沒有 schemaVersion 不知道誰是舊資料。
**這就是 4 週重構的源頭**。

---

## 本場 ADR 文件最終樣貌

```markdown
# ADR-001: MVP 採用 localStorage 作為儲存層

**Status**: Accepted
**Date**: 2026-05-28
**Decider**: Architect（W）｜ Reviewers: Dev × 2, SA × 1

## Context
PRD §6 P0-6（儲存行程）與 P0-7（開支紀錄）需要 persistent storage。種子簡報
明示「MVP 用 localStorage、不做帳號雲端同步、4 週驗證窗」。需正式記錄選型
trade-off 與未來 migration path（V1 雲端同步見 ADR-008，TBD）。

## Decision
MVP 採用 **browser localStorage**。Schema 預留 `userId` / `lastModified` /
`schemaVersion` 欄位以為 V1 雲端同步開後門。

## Options Considered
- ✅ **localStorage**（採用）：team-familiar、零成本、符合 brief 限制
- ❌ **IndexedDB**：API 複雜 3 倍、本案資料量 100KB 用不到、Safari 14 以下 bug 風險
- ❌ **Firebase Firestore**：違反 brief「免登入」、月成本 $25、團隊 0 熟悉度（+10 天學習）
- ❌ **Cookie**：4KB 容量裝不下行程 JSON

## Consequences
**Positive**：
- 零基礎建設成本，4 週 MVP 時程不受拖累
- 完美 offline support（PWA 加分）
- 隱私友善（無 server-side tracking）

**Negative**（明示接受）：
- 跨裝置不同步（已知，V1 解決）
- 清 cache 資料消失（需 UX 警告語）
- 容量上限 ~5MB（DAU > 10K 重審）

## Reversibility
**Hard**——非 One-way Door。V1 帳號同步路徑：~2 週 migration sprint。
Schema 已預留兼容欄位（見 Decision 段）。

## Review Triggers
1. DAU > 10,000
2. 「資料消失」客訴 > 5 件/週
3. V1 帳號功能啟動（自動觸發 ADR-008）
4. iOS Safari quota policy 變更
```

---

## 現場對話（~10 輪示範）

> 場景：60 分鐘會議第 25 分鐘，Architect 已完成 Context 段、開始挑戰 Dev 提出的選項。

**Architect**：「Dev，你說選 localStorage，rejected options 列了幾個？」

**Dev**：「呃⋯⋯Firebase。我覺得 Firebase 不適合 MVP。」

**Architect**：「**1 個不算 ADR**。至少要 3 個。IndexedDB 呢？Cookie 呢？SessionStorage 呢？
你不列就是沒做功課，60 分鐘的會就是在這時候挑出來。」

**Dev**：「Cookie 太小裝不下，SessionStorage 關瀏覽器就沒了，這還要列嗎？」

**Architect**：「**要**。理由就一行『Cookie 4KB 容量裝不下行程 JSON』，這樣 3 個月後新人
問『為什麼不用 cookie』有答案。你現在覺得理所當然，3 個月後沒人記得當初為什麼這樣選。」

**SA**：「我有疑問——種子簡報已經寫『MVP 用 localStorage』，這場 ADR 還要開幹嘛？老闆說了算啊。」

**Architect**：「**老闆寫了結論，沒寫 trade-off**。我們今天的工作是把 trade-off 補上去——
為什麼不選 IndexedDB？為什麼不選 Firebase？這些『沒選』的理由才是 ADR 的核心。
未來老闆換人、要重審儲存層時，新老闆會看 ADR 而不是看舊老闆的決策。」

**Dev**：「OK 我補 IndexedDB 跟 Firebase 的拒絕理由⋯⋯但 IndexedDB 我會在 Safari 14 翻車這件事
是 3 年前的舊事了，現在還算 con 嗎？」

**Architect**：「你**寫進去 + 標日期**：『2023 年 StackOverflow 多人回報，2026 年未實測』。
這就叫『誠實的拒絕理由』。未來有人質疑，他自己去實測，但他知道我們當初的判斷依據是什麼。」

**SA**：「Reversibility 為什麼是 Hard 不是 Easy？換個 wrapper 不就好了？」

**Architect**：「換 wrapper 是 Easy。但要從『純 client』變『有 server 同步』，
要寫 migration endpoint、解決多裝置衝突、設計 opt-in flow——這是 **2 週工作量**，標 Hard。
但**不是 One-way Door**——schema 預留 userId 欄位的話，server-side 能直接讀回去。」

**Dev**：「那 schema 預留 userId 這件事要寫在哪？」

**Architect**：「**寫進 ADR-001 的 Consequences 段，標『為 ADR-008 開後門』**。
然後 08-data-model 卡開會時，主席會看到這條，把它變成 model 的 required field 規範。
這就是 ADR 流向下游的方式——**不是『下游自己看著辦』，是 ADR 寫死、下游遵守**。」

**SA**：「Review trigger 那段，DAU > 10K 怎麼來的？我們現在 DAU 是 0 啊⋯⋯」

**Architect**：「**假設值，標 [M] confidence**。logic 是『localStorage 5MB / 平均使用者
50 行程 = 每行程 100KB = OK』；DAU 10K 時假設有 5% 重度使用者存 100+ 行程，
那批人會壓爆 quota。**這數字錯沒關係，重要的是寫下來、未來有人能挑戰**。
沒寫就沒人能挑戰，這才是真正的技術債。」

---

## 下游影響：本場 ADR 如何流向 06 / 07 / 08

**流向 06-c4-diagram**：

> ADR-001 鎖死 → 06-c4 的 Container 圖中：
> - `Storage` box 類型 = `browser-local`（不是 `external service`）
> - PWA Shell ↔ Storage 不畫網路箭頭（同 process）
> - 不出現 `DB Server` / `Cloud Storage` box

**流向 07-api-spec**：

> ADR-001 鎖死 → 07-api-spec 必須：
> - 定義 `storage.saveTrip(trip)` 為 local function 契約（非 HTTP endpoint）
> - 不需 auth / rate-limit / pagination
> - 必須定義 schema versioning interface（為 V1 migration 開後門）
> - 錯誤碼用 thrown Error type（`StorageQuotaExceededError` 等），非 HTTP status

**流向 08-data-model**：

> ADR-001 鎖死 → 08-data-model 的 `Trip` schema **必須**包含：
> - `id: string` (UUID v4，client 生成)
> - `userId: string | null` (MVP 永遠 null，為 V1 開後門)
> - `lastModified: string` (ISO8601，為 V1 衝突解決開後門)
> - `schemaVersion: number` (升級時走 migration)
>
> **禁止**欄位：`Date` object、`undefined`、`Symbol`、`Map`、`Set`

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（6 題 + 送命題的答案 + PRD §6/§8 + 種子簡報）
丟給 `card-fill` skill：

```
/card-fill register 05-adr <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/adr.md` 的範本結構，
產出符合契約的 markdown deliverable（含 Context / Decision / Options / Consequences /
Reversibility / Review Triggers 6 段）。

**本場會議的學習目標到送命題答完就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**逼出 3 個 rejected options、寫具體拒絕理由、標可逆性**」，
不是「**寫對 markdown**」。
