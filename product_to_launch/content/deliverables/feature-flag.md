---
title: "Feature Flag · 功能旗標"
slug: "feature-flag"
stage: "build"
roles: ["dev", "po"]
order: 37
hook: "把『部署』與『發布』拆開"
when_to_use: "需要灰度、AB、kill switch、或 trunk-based 高頻部署時"
ai_leverage: "用 Claude 掃 code 找出該被 flag 包起來的高風險變更"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Implementation, §Deployment, Netflix canary"
---

## 解決什麼問題

把上線風險從「不能合進主幹」變成「合進去但默認關閉」。Flag 是 trunk-based、canary、AB、kill switch 的共同基石。

## 誰負責、和誰對接

- **主責：** Dev 寫 flag、PO 決定開關時機
- **協作：** SRE 監控 flag 對 SLO 影響、QA 驗 on/off 雙路徑
- **下游收件：** Release Plan、Canary Strategy、Rollback Plan

## 何時用、何時不用

- ✅ **必要時機：** 高風險變更、AB 實驗、依賴未就緒、需逐步放量
- ❌ **不需要時：** 純 bug fix、安全 patch、UI 文字
- ⚠️ **常見誤用：** flag 不設過期；flag 之間互相耦合；on/off 路徑不測

## AI 怎麼加速

把 diff + 既有 flag inventory + release plan 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己標出高風險變更與 cleanup 任務，**人工只審 expiry 合理性與 kill switch 觸發條件**。本卡輸出**真實 Feature Flag spec markdown 文件**（含 flag 表、telemetry、cleanup policy），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給單 flag / kill switch / 小規模灰度用，**完整範本** 給 AB 實驗 / 跨服務 rollout / 合規場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "feature-flag"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["git-diff", "flag-inventory"]
  optional: ["release-plan"]
---

# Feature Flag: <flag-name>

**Status:** Draft v0.X · **Owner:** <Dev DRI> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 4, 5, 9, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：diff path:line / release-plan §X）`；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**flag 必須有 expiry_date（≤ 90 天）+ cleanup owner + fallback**，缺一視為不合格。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，Dev/SRE/PO 30 秒讀完。內容：flag 名、保護什麼變更、預計 rollout 期、kill switch 條件 -->

<3-5 行說明>

> **TL;DR:** <一句話：這個 flag 把哪個變更從「不能合」變成「合進去但預設關閉」>

---

## 2. Flag Identity

<!-- ai-rule: 命名必含模組 prefix（snake_case），對齊既有 inventory 規約 -->

| Field | Value | Confidence |
|---|---|---|
| **Name** | `<module>_<feature>` (e.g. `checkout_new_pricing`) | **[H]** |
| **Type** | release / experiment / ops / permission | **[H]** |
| **Scope** | rollout %: 0-100 / segment / region | **[H]** |
| **Expiry date** | YYYY-MM-DD (≤ 90 天) | **[H]** |

---

## 4. Owners & Lifecycle

<!-- ai-rule: DRI + cleanup owner 必填（可同人）；expiry 缺失視為不合格 -->

- **DRI:** <person or team>
- **Cleanup owner:** <負責退役>
- **Escalation:** <on-call rotation>
- **Cleanup trigger:** <e.g. rollout = 100% sustained 14 days OR expiry_date reached>

---

## 5. Telemetry & Kill Switch

<!-- ai-rule: 必有 exposure metric + SLO impact metric + kill switch alert 三件 -->

| Signal | Name | Threshold |
|---|---|---|
| **Exposure** | `flag.<name>.exposure` | track on/off ratio |
| **SLO impact** | <e.g. error_rate by flag> | < 1% |
| **Kill switch alert** | <e.g. error_rate > 1% sustained 5min> | auto-disable flag |

**Fallback on flag eval failure:** <e.g. default to off — 保守路徑>

---

## 9. Risks（top 3）

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <風險描述> — **Mitigation:** <如何降低> — **Owner:** <誰負責>
>
> **R2:** ...
>
> **R3:** ...

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的 SLO 定義 / incident postmortem>

### TODO（缺資料）

- _TODO: 需要 SLO 數值校準 kill switch threshold_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 4, 5, 9, 12，刻意不連號）
> - [ ] Flag name 含模組 prefix + snake_case
> - [ ] Expiry date 存在且 ≤ 90 天
> - [ ] DRI + cleanup owner 兩者皆填
> - [ ] Telemetry 三件齊：exposure + SLO impact + kill switch alert
> - [ ] Fallback on eval failure 已寫
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（spec 是給人讀的 markdown）
```

```template-full
---
doc_type: "feature-flag"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["git-diff", "flag-inventory", "release-plan"]
  optional: ["slo-definition", "ab-test-design"]
---

# Feature Flag: <flag-name>

**Status:** Draft v0.X · **Owner:** <Dev DRI> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev / SRE / PO / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 LaunchDarkly / Unleash / OpenFeature / Netflix canary 實踐。每結論行內 `（依據：diff path:line / release-plan §X / SLO §Y）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**flag 必須有 expiry_date（≤ 90 天）+ cleanup owner + fallback + kill switch + telemetry**，缺一視為不合格；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: Dev DRI · required: always -->

<!-- ai-fill: 3-5 行：flag 名、保護什麼變更、預計 rollout 期、kill switch 條件、cleanup 期 -->

<3-5 行說明>

> **TL;DR:** <一句話總結>

---

## 2. Flag Identity
<!-- owner: Dev DRI · required: always -->

| Field | Value | Confidence |
|---|---|---|
| **Name** | `<module>_<feature>` (snake_case + prefix) | **[H]** |
| **Type** | release / experiment / ops / permission | **[H]** |
| **Naming convention ref** | <既有 inventory link> | **[H]** |
| **Created date** | YYYY-MM-DD | **[H]** |
| **Expiry date** | YYYY-MM-DD (≤ 90 天) | **[H]** |

---

## 3. Scope & Targeting
<!-- owner: Dev DRI + PO · required: always -->

<!-- ai-rule: rollout % / segment / region 三者至少一個明確；不能寫「全開」當預設 -->

| Dimension | Value | Confidence |
|---|---|---|
| **Rollout %** | 0-100 (progressive) | **[H]** |
| **Segments** | beta_users / internal / power_users | **[H]** |
| **Regions** | tw / jp / global | **[H]** |
| **Sticky bucketing** | by user_id / session_id | **[H]** |

---

## 4. Owners & Lifecycle
<!-- owner: Dev DRI · required: always -->

<!-- ai-rule: DRI + cleanup owner + escalation 三件齊；cleanup trigger 必須機械可判斷 -->

- **DRI:** <person or team>
- **Cleanup owner:** <負責退役，可同 DRI>
- **Escalation:** <on-call rotation>
- **Cleanup trigger:** <e.g. rollout = 100% sustained 14 days OR expiry_date reached>
- **Removal PR template:** <link to PR template for flag removal>
- **Audit log:** <where cleanup is tracked>

---

## 5. Telemetry & Kill Switch
<!-- owner: Dev DRI + SRE · required: always -->

<!-- ai-rule: 三類 signal 必有 — exposure / SLO impact / kill switch alert。每類含名稱 + threshold + action -->

| Signal type | Name | Threshold | Action |
|---|---|---|---|
| **Exposure** | `flag.<name>.exposure` | on/off ratio tracking | dashboard |
| **SLO impact** | <e.g. `error_rate{flag=on}`> | < 1% | alert SRE |
| **Kill switch** | <e.g. error_rate > 1% sustained 5min> | trigger | auto-disable flag |
| **Latency impact** | <e.g. `p99_latency{flag=on}`> | < SLO + 10% | alert |

---

## 6. Fallback Behavior
<!-- owner: Dev DRI · required: full-only -->

<!-- ai-rule: provider outage 與 eval failure 兩種情境都要寫；預設行為傾向保守 -->

- **On flag eval failure:** <e.g. default to off — 保守路徑>
- **On provider outage:** <e.g. cache last known value 60s, then default to off>
- **On config drift:** <e.g. CI lint 比對 inventory 與 prod state>

---

## 7. Dependencies
<!-- owner: Dev DRI + Architect · required: full-only -->

<!-- ai-rule: 至少列 upstream flags + blocking services + data migration ref -->

| Type | Item | Status |
|---|---|---|
| **Upstream flags** | <flag A must be ON> | required |
| **Blocking services** | <service X migrated to v2> | required |
| **Data migration** | <link or N/A> | pre-req |

---

## 8. Rollout Plan
<!-- owner: Dev DRI + PO · required: full-only -->

<!-- ai-rule: 階段 + 觀察窗口 + 升級條件，禁止「直接全開」 -->

| Phase | % | Window | Promotion criteria |
|---|---|---|---|
| Canary | 1% | 24h | error_rate < 0.5%, p99 < SLO |
| Beta | 10% | 3 days | + no user complaint |
| GA | 50% → 100% | 7 days | + cleanup PR ready |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <例：flag 不清會累積技術債> — **Mitigation:** <expiry + cleanup owner + 每季 audit> — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：是否需要 sticky bucketing by user_id？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: Dev DRI · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Flag platform 選擇 | LaunchDarkly / Unleash / in_house | LaunchDarkly | Unleash (OSS 但缺 audit log)、in_house (運維成本高) | **[H]** |

---

## 11. Out of Scope
<!-- owner: Dev DRI · required: full-only -->

本 flag spec **不處理**：

- ❌ **不處理純 bug fix** — 不需要 flag
- ❌ **不處理安全 patch** — 不能延遲
- ❌ **不處理 UI 文案修改** — 屬另一機制（content delivery）
- ❌ **不處理長期 config** — flag ≠ config，flag 必須有 expiry

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <e.g. SLO 定義 / incident postmortem / consumer traffic profile>

### TODO（缺資料）

- _TODO: 需要 SLO p99 數值校準 kill switch threshold_
- _TODO: 補 cleanup PR template link_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Flag name 含模組 prefix + snake_case，對齊既有 inventory
> - [ ] Expiry date 存在且 ≤ 90 天
> - [ ] DRI + cleanup owner + escalation 三件齊
> - [ ] Telemetry 四類齊：exposure + SLO impact + kill switch + latency
> - [ ] Fallback 寫了 eval failure + provider outage 兩種
> - [ ] Rollout Plan 階段化（禁直接全開）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（spec 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Feature Flag spec markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 git diff 全文 / 既有 flag inventory / release-plan.md / SLO 定義 / incident 史）
⏫
```

> [!TIP]
> **常見錯誤：** flag 不設 expiry（變永久 config 累積技術債）、flag 之間互相耦合（rollout 變地獄）、on/off 路徑不測（其中一條走入死路）、kill switch 沒有 alert 觸發條件（人工發現太慢）、cleanup owner 未指派（沒人退役）、把 bug fix 包進 flag（不需要的延遲）、預設行為傾向開（fallback 應保守傾向關）。AI 若漏這些，自檢清單會抓到並回頭補。
