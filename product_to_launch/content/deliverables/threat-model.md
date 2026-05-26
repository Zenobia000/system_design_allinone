---
title: "Threat Model · 威脅建模"
slug: "threat-model"
stage: "design"
roles: ["architect"]
order: 29
hook: "在攻擊者之前先把資料流畫清楚"
when_to_use: "新系統處理 PII、金流、權限邊界，或對外暴露新 API 時"
ai_leverage: "用 Claude 跑 STRIDE 對每個 trust boundary 自動列攻擊面"
art: "/generated/stage-design.webp"
source: "software_architect/ppt/05-ilities §Security, NIST SSDF"
---

## 解決什麼問題

把「我們會被怎麼打」從感覺變成清單。輸出 trust boundary、資產、威脅、緩解措施，餵給 NFR 與 Code Review。

## 誰負責、和誰對接

- **主責：** Architect
- **協作：** Security/Compliance、SA 確認資料分類
- **下游收件：** Dev（防禦實作）、QA（負面測試）

## 何時用、何時不用

- ✅ **必要時機：** 新增外部介面、處理高敏感資料、權限模型變更
- ❌ **不需要時：** 純內部工具、無資料分級提升
- ⚠️ **常見誤用：** 把 OWASP Top 10 抄一份當交付；忽略 trust boundary 圖

## AI 怎麼加速

先讓 AI 對每條跨 trust boundary 跑 STRIDE，人類再砍誇張假設、補在地化合規。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 software architect（熟悉 STRIDE / SOC 2 / GDPR / PCI / threat modeling）。任務：把 data flow diagram + 資產清單轉成 threat model（YAML 格式）。

## 輸入素材

[Data flow diagram（含 trust boundary）]
[Assets 清單（PII / 金流 / credential / token）]
[既有 NFR security 章節]

輸出 schema：trust_boundaries / assets / stride_analysis（per asset × 六類） / mitigations（含 effectiveness/cost） / residual_risks / compliance_mapping（GDPR/SOC2/PCI/HIPAA） / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造攻擊路徑。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 10+ 年分散式系統與資安經驗的資深 software architect / security engineer，熟悉 STRIDE、threat modeling、SOC 2、GDPR、PCI DSS、HIPAA、NIST SSDF。
你的輸出會交給 Dev（寫防禦實作）、QA（寫負面測試）、Compliance（稽核對應）。
他們需要可機械消費的威脅清單與緩解優先序，所以 threat model 必須結構嚴格、可審計、不誇張不漏列。

## 情境脈絡

新系統處理 PII、金流、權限邊界，或對外暴露新 API 時用本 threat model。
本卡核心問題：在攻擊者之前把資料流跨 trust boundary 的攻擊面列清楚，並排出緩解優先序。

## 輸入素材

[Data flow diagram（含所有 trust boundary 與資料流向）]
[Assets 清單（PII / 金流 / credential / token / session）]
[既有 NFR security 章節 / 合規承諾（SOC 2 / GDPR / PCI / HIPAA）]

## 規則

1. 每個威脅註明 source：[input 第 X 段] 或 [DFD 第 X 條 flow]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（緩解的成本：latency / dev cost / UX 摩擦）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造攻擊路徑。
4. Compliance 必須對應 GDPR / SOC 2 / PCI / HIPAA / ISO 27001（任一象限沒列要說明為何不適用）。
5. Out of scope 至少 3 條（例：實體安全、社交工程、供應鏈攻擊不在本卡範圍）。
6. 每個威脅標 confidence: [H/M/L]，L 必須附說明（例：依賴未驗證假設）。
7. STRIDE 六類（Spoofing / Tampering / Repudiation / Info-disclosure / DoS / Elevation-of-Privilege）每個 asset 都要逐類評估，不適用要寫 N/A 並說明。

## 輸出格式（YAML）

trust_boundaries:
  - id: TB-1
    name: <e.g. internet → API gateway>
    crosses: [<asset 1>, <asset 2>]
    source: <input ref>
    confidence: H | M | L

assets:
  - id: A-1
    name: <e.g. user PII>
    classification: <public | internal | confidential | restricted>
    location: <where stored / transmitted>

stride_analysis:
  - asset: A-1
    boundary: TB-1
    spoofing: <威脅描述 + 可行性 H/M/L | N/A + 原因>
    tampering: <...>
    repudiation: <...>
    info_disclosure: <...>
    dos: <...>
    eop: <...>
    source: <input ref>

mitigations:
  - id: M-1
    addresses: [<threat ref>]
    control: <e.g. mTLS / WAF rule / rate limit>
    effectiveness: H | M | L
    cost: <one-time + ongoing>
    side_effect: <e.g. +20ms latency>
    confidence: H | M | L

residual_risks:
  - risk: <無法完全緩解的剩餘風險>
    accepted_by: <role / RACI>
    confidence: H | M | L

compliance_mapping:
  gdpr: <對應條款 + 緩解 ref>
  soc2: <對應 trust criteria + 緩解 ref>
  pci: <對應 requirement + 緩解 ref | N/A + 原因>
  hipaa: <對應 safeguard + 緩解 ref | N/A + 原因>

decision_log:
  - decision: <e.g. 採用 mTLS 而非 OAuth client cert>
    options_considered: [A, B, C]
    chosen: A
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - 實體安全 / data center physical security 不在本卡範圍
  - 供應鏈攻擊 / SBOM 審查另開 ADR
  - 社交工程 / phishing 由 Security awareness training 處理

## 思考步驟

產出前先：
1. 從 DFD 抓 3-5 條最高風險 flow（跨外部邊界、含敏感資料），各標 H/M/L confidence
2. 列至少 2 條 viable mitigation 路徑（深度防禦 vs 單點強化），各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設 token 是 JWT、假設 DB 在 VPC）
4. 確認 GDPR / SOC 2 / PCI / HIPAA 對應都評估過

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個威脅 confidence < H？列出來與所需補充資料。
2. 哪些攻擊路徑假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：human 判斷 trade-off 與閾值、誇張假設要砍、在地化合規（GDPR/PIPL/SOC2）要補。
