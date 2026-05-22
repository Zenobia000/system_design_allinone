---
title: "Test Plan · 測試計畫"
slug: "test-plan"
stage: "build"
roles: ["qa"]
order: 36
hook: "用一張表決定『要測什麼、不測什麼、誰簽』"
when_to_use: "release 含跨模組變更、合規驗收或對外承諾時"
ai_leverage: "用 Claude 把 acceptance criteria 對應到測試層級"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Verification, ISO/IEC/IEEE 29119"
---

## 解決什麼問題

QA 在 release 前最大的成本不是執行測試，是搞清楚「這次到底要不要測它」。Test Plan 是與 PM/Dev 對焦範疇、層級、退場條件的合約。

## 誰負責、和誰對接

- **主責：** QA Lead
- **協作：** PM/PO 確認 acceptance、Dev 提供變更面、SRE 提供風險面
- **下游收件：** Test cases、Release Gate、Go/No-Go

## 何時用、何時不用

- ✅ **必要時機：** Release 含 schema migration、外部介面變更、合規審查
- ❌ **不需要時：** flag 控制的小改動、純文案
- ⚠️ **常見誤用：** 抄上一版只改日期；exit criteria 寫「全部通過」

## AI 怎麼加速

讓 Claude 把 PRD acceptance 對應到 unit/integration/E2E/perf/security 五層，並標出缺測試的需求項。

```prompt-quick
你是有 7+ 年自動化測試經驗的資深 QA lead（熟悉 test pyramid、contract testing、chaos engineering、ISO/IEC/IEEE 29119）。任務：把 PRD acceptance criteria + 變更面 + 風險面轉成 Test Plan（YAML 格式）。

<input>
[PRD acceptance criteria]
[Dev 提供的變更面（哪些 module / API）]
[SRE 提供的風險面（SLO / 上次 incident）]
</input>

輸出 schema：scope (in/out) / test_levels (unit/integration/e2e/perf/sec) / test_data_strategy / environment_matrix / entry_exit_criteria / traceability_to_ac / risk_based_prioritization

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年自動化測試經驗的資深 QA lead，熟悉 test pyramid、contract testing、chaos engineering、ISO/IEC/IEEE 29119、risk-based testing、shift-left。
你的輸出會交給 QA team（執行測試）、Dev Lead（確認變更覆蓋）、PM/PO（簽核 acceptance）、Release Manager（gate Go/No-Go）。
他們需要 30 分鐘內看完並開始排測試，所以你的 plan 必須結構嚴格、可追溯到每條 acceptance criteria、有明確 exit criteria。
</role>

<context>
Release 含跨模組變更、合規驗收或對外承諾時用本 Test Plan。
本卡核心問題：用一張表決定「要測什麼、不測什麼、誰簽」 — 與 PM/Dev 對焦範疇、層級、退場條件的合約。
</context>

<input>
[PRD acceptance criteria（含 FR / NFR）]
[Dev 提供的變更面（changed modules / APIs / schema）]
[SRE 提供的風險面（相關 SLO / 上次 incident / 流量畫像）]
</input>

<rules>
1. 每條 test scope 註明 source：[PRD AC 編號] + [變更面 ref] + [風險面 ref]，缺一者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：跳過 perf test 會縮短 1 day 但若上線後 P99 退化將觸發 SLO breach）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造（例：環境矩陣未確認就標 TODO 並列「需要 DevOps 確認 staging 是否有 PII mask」）。
4. 必須涵蓋五層測試：unit / integration / e2e / perf / security；任一層 N/A 必須說明為何。
5. Out of scope 至少 3 條，明寫不測什麼（例：不測純 UI 文案、不重做 unit 已涵蓋邏輯、不測第三方 SLA）。
6. 每個 entry/exit criteria 標 confidence: [H/M/L]，L 必須附說明（避免「全部通過」這種無意義條件）。
7. traceability：每條 AC 必須對應 ≥ 1 個 test case；無對應者標 TODO + 原因。
</rules>

<output_schema>
scope:
  in: [<feature / module>]
  out: [<thing 1>, <thing 2>, <thing 3>]
  rationale_for_out: <why these are out>
  source: <input ref>

test_levels:
  unit:
    owner: Dev
    coverage_target: <line/branch/mutation>
    in_scope_modules: [<module>]
  integration:
    owner: QA + Dev
    contracts_to_verify: [<API / event>]
  e2e:
    owner: QA
    critical_user_journeys: [<journey>]
  perf:
    owner: QA + SRE
    load_profile: <RPS / concurrency / data volume>
    p99_budget: <ms>
    n_a_rationale: <若 N/A 為何>
  security:
    owner: QA + Security
    threat_categories: [authz, input_validation, crypto, dependency_cve]
    pen_test_required: true | false

test_data_strategy:
  source: synthetic | masked_prod | golden_dataset
  pii_handling: <如何處理>
  refresh_policy: <每次 run 還原 / 共用>
  source_ref: <input ref>

environment_matrix:
  - env: dev | staging | pre-prod
    purpose: <which test levels>
    data_set: <ref>
    parity_to_prod: high | mid | low
    confidence: H | M | L

entry_criteria:
  - <e.g. unit 覆蓋 ≥ 80%>
  - <e.g. integration 在 dev 全綠>

exit_criteria:
  - <e.g. P0 bug = 0, P1 ≤ 2 with mitigation>
  - <e.g. perf P99 ≤ SLO + 10%>
  - <絕不寫「全部通過」這種空話>

traceability_to_ac:
  - ac_id: AC-01
    covered_by: [TC-101, TC-102]
    level: integration
    confidence: H | M | L
  - ac_id: AC-07
    covered_by: TODO(尚未設計，需要 X 資料)

risk_based_prioritization:
  high_risk_areas: [<module + 理由 + 上次 incident ref>]
  test_effort_allocation: <例：60% 高風險區域>
  source: <input ref>

decision_log:
  - decision: <如：在 staging 跑 perf 而非獨立 perf env>
    options_considered: [staging, dedicated_perf_env, prod_shadow]
    chosen: staging
    rejected_reason:
      dedicated_perf_env: <why not>
      prod_shadow: <why not>
    confidence: H | M | L

out_of_scope:
  - 純 UI 文案修改（屬 content review）
  - 重做 unit test 已涵蓋的純函式邏輯
  - 第三方供應商 SLA 驗證（屬合約管理）
</output_schema>

<thinking>
產出前先：
1. 從 PRD AC 抓 3-5 個高風險項（schema migration / 跨服務契約 / 合規欄位 / 效能敏感路徑），分別標 H/M/L confidence
2. 列至少 2 條 viable 測試策略（全層覆蓋 vs risk-based 取捨），各自負面後果
3. 列你做了但 input 沒明說的假設（例如假設 staging 有 prod 流量 replay）
4. 確認五層 + traceability 全部 covered
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪條 AC 對應 confidence < H？是因為 AC 模糊還是測試環境不足？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是 production traffic profile 還是合規條文？為什麼？
</verify>
```

回審重點：human 判斷 risk-based 取捨是否誠實、exit criteria 是否可達成、traceability 是否完整、合規層級是否簽核。
