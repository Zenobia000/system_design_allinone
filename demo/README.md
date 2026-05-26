# Workshop Demo · SmartTrip FX 完整範例集

這份 `demo/` 是 [`/start/`](http://localhost:3000/start/) 問卷產出的學生專案的**對照標準**。
所有檔案都圍繞同一個案例：**SmartTrip FX**（旅遊外幣費用試算 App，[原始 PRD](../PRD.md)）。

學生跑完問卷拿到自己的 `project-brief.md` 後，跟著 [`/workshop/`](http://localhost:3000/workshop/) 列出的 15 張卡走，
每張卡產出**自己版本**的 markdown 文件，並與本資料夾的 SmartTrip FX 標準答案對照學習。

---

## 結構說明

```
demo/
├── README.md                ← 你正在讀的這份
├── 種子簡報.md               ← SmartTrip FX 的 brief（= /start/ 問卷產出的 project-brief.md）
│
├── 01-discovery/            ← SDLC Stage 1：探索
│   ├── 01-jtbd/
│   │   ├── 模板輸入.md       ← 套上種子簡報後的完整 prompt（學生複製貼到 Claude）
│   │   └── 實際結果.md       ← AI 回的內容 + 教學要點 + 學生常見錯誤
│   └── 02-value-hypothesis/
│
├── 02-define/               ← SDLC Stage 2：定義
│   ├── 03-prd/
│   └── 04-acceptance-criteria/
│
├── 03-design/               ← SDLC Stage 3：設計
│   ├── 05-adr/
│   ├── 06-c4-diagram/
│   ├── 07-api-spec/
│   ├── 08-data-model/
│   └── 09-non-functional-reqs/
│
├── 04-build/                ← SDLC Stage 4：建造
│   ├── 10-code-review-checklist/
│   └── 11-unit-test/
│
├── 05-ship/                 ← SDLC Stage 5：上線
│   ├── 12-release-plan/
│   └── 13-rollback-plan/
│
└── 06-operate/              ← SDLC Stage 6：運維
    ├── 14-runbook/
    └── 15-postmortem/
```

每張卡資料夾包含**固定兩個檔案**：
- `模板輸入.md` — 已把上游 prompt 套上 SmartTrip FX brief（含上游卡輸出）的成品。學生整段複製即可貼到 Claude。
- `實際結果.md` — Claude 真實回應 + 教學要點 + 學生常見錯誤 + 交件 checklist。

---

## 三層教學流程

### 老師（你）— 用 SmartTrip FX 示範

1. 打開 [`content/deliverables/jtbd.md`](../product_to_launch/content/deliverables/jtbd.md) — 看「文件範本」段內的 `> [!IMPORTANT]` 規則與 `<!-- ai-rule -->` 註解
2. 打開 [`demo/01-discovery/01-jtbd/模板輸入.md`](./01-discovery/01-jtbd/模板輸入.md) — 看「套上 SmartTrip 後長什麼樣」（含上游文件 + 薄 trigger 組裝示範）
3. 在課堂上把 `模板輸入.md` 的 trigger 段（含貼位區內容）整段貼到 Claude → 即時演示 AI 產出
4. 對照 [`實際結果.md`](./01-discovery/01-jtbd/實際結果.md) 講解 confidence、source、decision_log、out_of_scope 的判讀方式
5. 講「**學生常見錯誤**」表 — 把那 4-5 行當 anti-pattern 分析

### 學生 — 用自己的專案練習

1. 進 [`/start/`](http://localhost:3000/start/) 填 5 題問卷 → 下載 `project-brief.md`
2. 進 [`/workshop/`](http://localhost:3000/workshop/) 看自己的 15 卡學習路徑
3. 從 01-jtbd 開始，每張卡：
   - 點「前往卡片」打開 `content/deliverables/<slug>.md`
   - 在「文件範本」段選「輕量範本」或「完整範本」tab，按複製
   - 在「怎麼觸發」段複製薄 trigger，把貼位區換成自己的 brief / 上游卡輸出全文
   - 送出，拿到自己版本的 markdown（不再是 YAML）
4. 點「看 SmartTrip FX 標準答案」對照 `demo/` 對應卡的 `實際結果.md`
5. 對照「**學生常見錯誤**」自審，修正後勾起 checkbox

### 對照學習 — 學生產出 vs SmartTrip 範例

每張卡的「實際結果.md」末尾都有：
- **教學要點** — 為什麼某欄標 H 不標 M、mutually_exclusive 為什麼重要、本卡輸出流向哪張下游卡
- **學生常見錯誤** — 4-5 行表格，違反哪條規則、怎麼修
- **交件 checklist** — 6-8 點交件前自審

這三段是討論題的素材：學生帶自己的 PRD 對照 SmartTrip PRD，圍繞「我為什麼選了 P0-X，老師為什麼選了 P0-Y」的 trade-off 對話。

---

## 15 卡與站上模板的對應

| # | 階段 | 卡名 | demo 範例 | 站上模板 |
|---|---|---|---|---|
| 01 | Discovery | JTBD | [`01-discovery/01-jtbd/`](./01-discovery/01-jtbd/) | [`content/deliverables/jtbd.md`](../product_to_launch/content/deliverables/jtbd.md) |
| 02 | Discovery | Value Hypothesis | [`01-discovery/02-value-hypothesis/`](./01-discovery/02-value-hypothesis/) | [`content/deliverables/value-hypothesis.md`](../product_to_launch/content/deliverables/value-hypothesis.md) |
| 03 | Define | PRD | [`02-define/03-prd/`](./02-define/03-prd/) | [`content/deliverables/prd.md`](../product_to_launch/content/deliverables/prd.md) |
| 04 | Define | Acceptance Criteria | [`02-define/04-acceptance-criteria/`](./02-define/04-acceptance-criteria/) | [`content/deliverables/acceptance-criteria.md`](../product_to_launch/content/deliverables/acceptance-criteria.md) |
| 05 | Design | ADR | [`03-design/05-adr/`](./03-design/05-adr/) | [`content/deliverables/adr.md`](../product_to_launch/content/deliverables/adr.md) |
| 06 | Design | C4 Diagram | [`03-design/06-c4-diagram/`](./03-design/06-c4-diagram/) | [`content/deliverables/c4-diagram.md`](../product_to_launch/content/deliverables/c4-diagram.md) |
| 07 | Design | API Spec | [`03-design/07-api-spec/`](./03-design/07-api-spec/) | [`content/deliverables/api-spec.md`](../product_to_launch/content/deliverables/api-spec.md) |
| 08 | Design | Data Model | [`03-design/08-data-model/`](./03-design/08-data-model/) | [`content/deliverables/data-model.md`](../product_to_launch/content/deliverables/data-model.md) |
| 09 | Design | NFR | [`03-design/09-non-functional-reqs/`](./03-design/09-non-functional-reqs/) | [`content/deliverables/non-functional-reqs.md`](../product_to_launch/content/deliverables/non-functional-reqs.md) |
| 10 | Build | Code Review Checklist | [`04-build/10-code-review-checklist/`](./04-build/10-code-review-checklist/) | [`content/deliverables/code-review-checklist.md`](../product_to_launch/content/deliverables/code-review-checklist.md) |
| 11 | Build | Unit Test | [`04-build/11-unit-test/`](./04-build/11-unit-test/) | [`content/deliverables/unit-test.md`](../product_to_launch/content/deliverables/unit-test.md) |
| 12 | Ship | Release Plan | [`05-ship/12-release-plan/`](./05-ship/12-release-plan/) | [`content/deliverables/release-plan.md`](../product_to_launch/content/deliverables/release-plan.md) |
| 13 | Ship | Rollback Plan | [`05-ship/13-rollback-plan/`](./05-ship/13-rollback-plan/) | [`content/deliverables/rollback-plan.md`](../product_to_launch/content/deliverables/rollback-plan.md) |
| 14 | Operate | Runbook | [`06-operate/14-runbook/`](./06-operate/14-runbook/) | [`content/deliverables/runbook.md`](../product_to_launch/content/deliverables/runbook.md) |
| 15 | Operate | Postmortem | [`06-operate/15-postmortem/`](./06-operate/15-postmortem/) | [`content/deliverables/postmortem.md`](../product_to_launch/content/deliverables/postmortem.md) |

> 這 15 張對應 [`taxonomy.ts`](../product_to_launch/lib/taxonomy.ts) 中標記 `essential: true` 的卡 —「沒有它整個產品流程會斷掉」的最小必要集。

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

每張下游卡的「模板輸入.md」會把上游卡的輸出**串成 prompt 的 input 區**。
例如 PRD 的 prompt 會引用 JTBD-001 / JTBD-002 / value-hypothesis 的 H1 假設。

---

## 開發者注意事項

- demo/ 的 `.md` 檔不會被 Next.js 站台 build；只作為對照標準。
- `/workshop/` 頁面的「看 SmartTrip FX 標準答案」按鈕直接連到 GitHub 上的 demo/ blob（會自動 render markdown）。
- 若要在站上開新路由直接 render demo（避免外連 GitHub），可參考 plan 檔的「不做的事」段落（標為二期評估）。

---

## 授權

MIT · © 2026 桑尼資料科學 Lab · 與 [Launch Atlas](https://atlas.sunnydatascience.com/) 同源。
