# 軟體開發旅程 · PPT

> **The Software Development Journey** — 給小白的軟體開發角色地圖
> 14 章 · Anthropic 風格 Marp 簡報
> 對應姊妹專案：`../software_architect/ppt/`（架構師的深度教材）

每張 slide 只回答三件事：
**這個角色做什麼？為什麼存在？跟旁邊的角色差在哪？**

---

## Quickstart

從**專案根目錄**執行：

```bash
# 安裝 Marp CLI（一次；npx 也可）
npm install -g @marp-team/marp-cli

# 整套 PDF + HTML，輸出到 software_develop_journey/dist/
bash software_develop_journey/scripts/build.sh full

# 精簡版（cover + roadmap + 各章 overview + cheatsheet）
bash software_develop_journey/scripts/build.sh minimal

# 單一章節
bash software_develop_journey/scripts/build.sh chapter 01-big-picture

# 只產 build/combined.md（不轉 PDF）
bash software_develop_journey/scripts/build.sh combined

# 清除產出
bash software_develop_journey/scripts/build.sh clean
```

產出：
- `software_develop_journey/dist/dev_journey_full.pdf` — 整套講義 PDF
- `software_develop_journey/dist/dev_journey_full.html` — HTML 版（瀏覽器可直接看）
- `software_develop_journey/dist/<chapter>.pdf` — 單章節

---

## 目錄結構

```
software_develop_journey/ppt/
├── 00-prologue/              序章（封面、為什麼學、地圖、使用說明）
├── 01-big-picture/           Ch.1 · 全局視角（蓋房子比喻 + SDLC 地圖）
├── 02-pm/                    Ch.2 · PM · Why & What
├── 03-ux-ui/                 Ch.3 · UX/UI · 使用者怎麼走
├── 04-sa/                    Ch.4 · System Analyst · 系統怎麼跑
├── 05-architect/             Ch.5 · Architect · 系統怎麼活下去
├── 06-sd/                    Ch.6 · System Design · 模組怎麼長
├── 07-dba-data/              Ch.7 · DBA · 資料生命線
├── 08-dev/                   Ch.8 · Developer · 真的施工
├── 09-qa/                    Ch.9 · QA · 驗收
├── 10-devops-sre/            Ch.10 · DevOps/SRE · 水電消防
├── 11-collaboration/         Ch.11 · 協作地圖（overlap + 衝突場景）
├── 12-case-study/            Ch.12 · 實戰（電商 / 直播 / AI 影視）
├── 90-appendix/              附錄（速查表、口訣、術語表）
├── themes/anthropic.css      Anthropic 主題樣式
├── _source/braindump.md      用戶原始長文（所有概念母本）
└── assets/                   圖示、流程圖
```

### 命名規範
- 資料夾：`NN-kebab-case/`（`00` 序章、`90` 附錄）
- 檔案：`NN_snake_case.md`（`00` = overview、`99` = recap）
- 全部小寫

---

## 14 章索引

### 00 · Prologue · 序章
| # | 主題 |
|---|------|
| 00 | [Cover · 封面](00-prologue/00_cover.md) |
| 01 | [Why this · 為什麼小白要學](00-prologue/01_why_this.md) |
| 02 | [Roadmap · 學習地圖](00-prologue/02_roadmap.md) |
| 03 | [How to Read · 同一句需求 9 角色怎麼聽](00-prologue/03_how_to_read.md) |

### 01 · Big Picture · 全局視角
| # | 主題 |
|---|------|
| 00 | Overview |
| 01 | [蓋大樓比喻 · 9 角色一字排開](01-big-picture/01_building_metaphor.md) |
| 02 | [SDLC 地圖 · 完整生命週期](01-big-picture/02_sdlc_map.md) |
| 03 | [不確定性階梯 · 每個角色降低一種風險](01-big-picture/03_uncertainty_ladder.md) |
| 99 | Recap |

### 02-10 · 9 角色章節（同節奏）
每章 4 檔：`00_overview` / `01_outputs` / `02_boundary` / `99_recap`

| 章 | 角色 | 蓋房子對應 |
|---|---|---|
| 02 | PM | 建案企劃 / 開發 PM |
| 03 | UX/UI | 室內設計師 |
| 04 | SA | 建築師（平面圖） |
| 05 | Architect | 結構技師 |
| 06 | SD | 施工圖繪製師 |
| 07 | DBA | 地基 + 水塔 + 管線總圖 |
| 08 | Dev | 工班師傅 |
| 09 | QA | 驗收員 |
| 10 | DevOps / SRE | 物業管理 + 24h 保全 + 消防 |

### 11 · Collaboration · 協作地圖
| # | 主題 |
|---|------|
| 00 | Overview |
| 01 | [Handoff Chain · 上下游交棒](11-collaboration/01_handoff_chain.md) |
| 02 | [Overlap Matrix · 誰主導什麼](11-collaboration/02_overlap_matrix.md) |
| 03 | [Three Views · 三層 flow 翻譯](11-collaboration/03_three_views.md) |
| 04 | [Conflict Cases · 三場撕逼戲](11-collaboration/04_conflict_cases.md) |
| 99 | Recap |

### 12 · Case Study · 實戰
| # | 主題 |
|---|------|
| 00 | Overview · 九角色甘特帶模板 |
| 01 | [電商訂單系統 · Baseline](12-case-study/01_ecommerce.md) |
| 02 | [直播串流 · 延遲合約](12-case-study/02_livestream.md) |
| 03 | [AI 影視 · 定義「好」](12-case-study/03_ai_video.md) |
| 04 | [3×3 比較矩陣](12-case-study/04_comparison.md) |
| 99 | Recap |

### 90 · Appendix · 附錄
| # | 主題 |
|---|------|
| 00 | [9 角色速查表](90-appendix/00_role_cheatsheet.md) |
| 01 | [三句口訣彙整](90-appendix/01_mnemonics.md) |
| 02 | [專有名詞表](90-appendix/02_glossary.md) |

---

## 三種閱讀路徑

| 路徑 | 對象 | 內容 |
|------|------|------|
| **A · 線性** | 完整入門 | 00 → 12 → 90，依序讀完（約 4-5 小時） |
| **B · 角色** | 想搞懂自己職位的 | 直接挑 Ch.2-10 的某一章 + Ch.11 |
| **C · 案例** | 想看實戰怎麼跑的 | Ch.1 → Ch.12 → Ch.90 |

---

## 風格

- 主題：Marp + Anthropic 配色（與 `../../software_architect/ppt/` 同調）
- 字體：Playfair Display（標題）/ Inter（內文）/ IBM Plex Mono（程式碼）/ Noto Sans TC（中文）
- 每張內容頁必含 `> Source: _source/braindump.md · §...`
- 新增主題依「WHAT / WHY / BOUNDARY」三段節奏
- 蓋大樓比喻貫穿全書

---

## 接下來去哪裡

讀完這份簡報，建議：

1. 還想搞懂架構設計細節？→ 跳到姊妹專案 `software_architect/ppt/`（10 章深度教材）
2. 想實際練手？→ 在 `system_design/` 找一個實戰專案
3. 想深挖某角色？→ 去該角色的官方資源（PM: Marty Cagan / Architect: Mark Richards 等）

---

**v1.0 · 2026**
