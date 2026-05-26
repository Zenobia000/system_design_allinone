---
title: "CI/CD Pipeline"
slug: "ci-cd-pipeline"
stage: "ship"
roles: ["devops", "dev"]
order: 38
hook: "讓『可發布』從人工判斷變成 pipeline 證據"
when_to_use: "團隊 ≥ 2 人或變更頻率高於每週一次時"
ai_leverage: "用 Claude 從現有 pipeline yaml 找出冗餘 stage 與安全 gap"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Implementation, DORA, NIST SSDF"
---

## 解決什麼問題

業界公認的四個交付指標（部署頻率、前置時間、變更失敗率、復原時間）都依賴一件事：pipeline 可信。CI/CD 把 build、test、scan、artifact、deploy 串成可重現流程，並留證據鏈。

## 誰負責、和誰對接

- **主責：** DevOps
- **協作：** Dev（測試 stage）、Security（SAST/SCA gate）、SRE（部署策略）
- **下游收件：** Release Plan、Rollback Plan、Audit

## 何時用、何時不用

- ✅ **必要時機：** 多人協作、跨環境部署、合規要求
- ❌ **不需要時：** 一次性腳本、個人實驗
- ⚠️ **常見誤用：** pipeline 通過就上線，沒有 release gate；artifact 不可重現

## AI 怎麼加速

把現有 pipeline yaml + 安全要求 + DORA 目標丟給 AI 抽出冗餘 stage、安全 gap、reproducibility 漏洞，人工只審 trade-off 與 secret 政策。

```prompt-quick
你是有 7+ 年生產系統經驗的資深 staff platform engineer（熟悉效能調校、observability、breaking change、SOC 2 / NIST SSDF / SLSA）。任務：把 pipeline yaml + 安全要求 + DORA 目標 轉成 CI/CD Pipeline Audit（YAML 格式）。

## 輸入素材

[現有 CI/CD yaml（GitHub Actions / GitLab / Jenkins）]
[安全與合規要求（SAST/SCA/secret scan/SBOM）]
[DORA 目標（部署頻率 / lead time / MTTR / change failure rate）]

輸出 schema：stages（lint/test/build/sec_scan/deploy/smoke）/ gates_per_stage / parallelism / cache_strategy / secret_management / sbom_and_provenance / redundancy_to_remove / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 7+ 年生產系統經驗的資深 staff platform engineer，熟悉效能調校、observability、breaking change policy、SOC 2 / NIST SSDF / SLSA L3、artifact provenance、supply-chain security、DORA metrics。
你的輸出會交給 DevOps（改 yaml）、Security（驗 gate）、Dev Lead（評估影響）、SRE（接 release gate）。
他們需要可機械消費的 audit 結果，所以你的輸出必須含具體 yaml diff 建議、SLI 影響估算、redundancy 識別。

## 情境脈絡

團隊 ≥ 2 人或變更頻率高於每週一次時必要。
本卡核心問題：讓「可發布」從人工判斷變成 pipeline 證據；build/test/scan/artifact/deploy 串成可重現流程並留證據鏈。

## 輸入素材

[現有 CI/CD yaml（含 stage 定義、env、cache、artifact）]
[安全與合規要求（SAST/SCA/secret scan/SBOM/簽章）]
[DORA 目標（部署頻率 / lead time / MTTR / change failure rate 現況與目標）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：加 SBOM 生成會讓 pipeline 多 X 分鐘，影響 lead time）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. 安全與合規 must-have（NIST SSDF / SLSA）：必須涵蓋；任一未覆蓋必須說明風險與補救。
5. Out of scope：明列 3 條本文件不處理（例如：runtime security、image registry 治理、cluster RBAC）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. Redundancy 識別必須附「移除後對 DORA metric 的預估影響」。

## 輸出格式（YAML）

stages:
  - name: <lint | test | build | sec_scan | deploy | smoke>
    purpose: <one-line>
    duration_p95: <minutes>
    parallelizable: true | false
    source: <input ref>
    confidence: H | M | L

gates_per_stage:
  - stage: <name>
    gates: [<例：unit test ≥ 80% / SAST high=0 / SBOM 簽章>]
    fail_action: block | warn | manual_review
    source: <input ref>

parallelism:
  current: <as-is>
  proposed: <to-be>
  expected_lead_time_reduction: <minutes>

cache_strategy:
  layers: [<dependency cache / build cache / test cache>]
  invalidation_rules: [<rule>]
  missing: [<TODO(缺什麼)>]

secret_management:
  storage: <vault | OIDC | env>
  rotation: <policy>
  audit_log: required | TODO
  source: <input ref>

sbom_and_provenance:
  sbom_format: <CycloneDX | SPDX | TODO>
  signing: <cosign | sigstore | none>
  slsa_level: <L1-L4 + 缺什麼補到下一級>
  confidence: H | M | L

redundancy_to_remove:
  - stage: <name>
    reason: <why redundant>
    dora_impact: <lead time / change failure rate 改善預估>
    risk_if_removed: <negative consequence>

decision_log:
  - decision: <例：自建 vs 託管 runner>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - Runtime security（cluster RBAC、admission control）
  - Image registry 治理與 retention policy
  - <第 3 條本文件不處理>

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最慢的 stage、最弱的 gate、最缺的 supply-chain 環節）
2. 列至少 2 條 viable 改造路徑（漸進式 vs 重寫），各自負面後果
3. 列你做了但 input 沒明說的假設（例如：runner 算力預算、團隊接受度）
4. 確認 NIST SSDF / SLSA 必備項都涵蓋

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：human 判斷 trade-off、安全 gate 阻塞嚴格度、cache invalidation 策略、secret rotation 節奏。
