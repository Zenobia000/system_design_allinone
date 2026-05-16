# 架構師的藍圖 · PPT

> **The Architect's Blueprint** — AI 時代的系統設計與商業決策
> 十章 · Anthropic 風格 Marp 簡報
> 對應來源教材：`../SA簡報/`（S1–S17 + 4 份進階閱讀 PDF）

每張 slide 只回答三件事：
**這個決策解決什麼商業問題？代價是什麼？什麼時候不該用？**

---

## Quickstart

從**專案根目錄**執行（不是 `ppt/` 內）：

```bash
# 安裝 Marp CLI（一次；npx 也可）
npm install -g @marp-team/marp-cli

# 整套 PDF + HTML，輸出到 software_architect/dist/
bash software_architect/scripts/build.sh full

# 精簡版（cover + roadmap + how-to-use + 各章 overview + cheatsheet）
bash software_architect/scripts/build.sh minimal

# 單一章節
bash software_architect/scripts/build.sh chapter 01-role-value

# 只產 build/combined.md（不轉 PDF）
bash software_architect/scripts/build.sh combined

# 清除產出
bash software_architect/scripts/build.sh clean
```

產出：
- `software_architect/dist/architect_blueprint_full.pdf` — 整套講義 PDF
- `software_architect/dist/architect_blueprint_full.html` — HTML 版（瀏覽器可直接看）
- `software_architect/dist/<chapter>.pdf` — 單章節

---

## 目錄結構

```
software_architect/ppt/
├── 00-prologue/              序章（封面、地圖、使用說明）
├── 01-role-value/            Ch.1 · 角色定位與職業價值
├── 02-requirements-sla/      Ch.2 · 需求分析與 SLA 量化
├── 03-process-app-types/     Ch.3 · 架構流程與應用類型
├── 04-tech-stack-data/       Ch.4 · 技術選型與資料策略
├── 05-ilities/               Ch.5 · 系統品質屬性
├── 06-components-patterns/   Ch.6 · 組件設計與設計模式
├── 07-system-architecture/   Ch.7 · 系統架構與分散式
├── 08-advanced-patterns/     Ch.8 · 微服務 · Event Sourcing · CQRS
├── 09-case-study/            Ch.9 · 實戰演練與外部約束
├── 10-soft-skills/           Ch.10 · 軟實力與職場生存
├── 90-appendix/              附錄（速查表、Capstone）
├── themes/anthropic.css      Anthropic 主題樣式
├── _source/                  原始規劃稿（McKinsey 風格）+ master 表格
└── assets/                   圖示、流程圖
```

### 命名規範
- 資料夾：`NN-kebab-case/`（`00` 序章、`90` 附錄）
- 檔案：`NN_snake_case.md`（`00` = overview、`99` = recap）
- 全部小寫

---

## 完整章節索引

### 00 · Prologue · 序章
| # | 主題 |
|---|------|
| 00 | [Cover · 封面](00-prologue/00_cover.md) |
| 01 | [Roadmap · 學習地圖](00-prologue/01_roadmap.md) |
| 02 | [How to Use · 使用說明](00-prologue/02_how_to_use.md) |

### 01 · Role & Value · 角色與價值
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [迷思 vs 真相](01-role-value/01_myth_vs_truth.md) | S1, S2 |
| 02 | [思維模式轉變](01-role-value/02_mindset_shift.md) | S2 |
| 03 | [價值三支柱](01-role-value/03_value_pillars.md) | S3 |
| 99 | Recap | — |

### 02 · Requirements & SLA · 需求與量化
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [挖出隱性需求](02-requirements-sla/01_implicit_requirements.md) | S3 |
| 02 | [SLA 數學](02-requirements-sla/02_sla_math.md) | S5 |
| 03 | [吞吐量 vs 負載](02-requirements-sla/03_throughput_vs_load.md) | S5 |
| 99 | Recap | — |

### 03 · Process & App Types · 流程與應用類型
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [六步流程](03-process-app-types/01_six_step_process.md) | S4 |
| 02 | [應用類型選擇](03-process-app-types/02_app_type_strategy.md) | S6 |
| 03 | [文件即代碼](03-process-app-types/03_docs_as_code.md) | S6 |
| 99 | Recap | — |

### 04 · Tech Stack & Data · 技術選型
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [理性選型](04-tech-stack-data/01_rational_selection.md) | S7 |
| 02 | [SQL vs NoSQL](04-tech-stack-data/02_sql_vs_nosql.md) | S7 |
| 03 | [前後端分離](04-tech-stack-data/03_frontend_backend.md) | S7 |
| 99 | Recap | — |

### 05 · *-ilities · 品質屬性
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [Scalability](05-ilities/01_scalability.md) | S8 |
| 02 | [Testability](05-ilities/02_testability.md) | S8 |
| 03 | [Modularity](05-ilities/03_modularity.md) | S8 |
| 99 | Recap | — |

### 06 · Components & Patterns · 組件與模式
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [分層架構](06-components-patterns/01_layered.md) | S9 |
| 02 | [SOLID + DI](06-components-patterns/02_solid_di.md) | S10 |
| 03 | [GoF 模式](06-components-patterns/03_gof_patterns.md) | Design+Patterns |
| 99 | Recap | — |

### 07 · System Architecture · 系統架構
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [Stateless 設計](07-system-architecture/01_stateless.md) | S11 |
| 02 | [Cache + Queue](07-system-architecture/02_cache_queue.md) | S11 |
| 03 | [日誌與監控](07-system-architecture/03_logging_monitoring.md) | S11 |
| 99 | Recap | — |

### 08 · Advanced Patterns · 進階模式
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [Microservices](08-advanced-patterns/01_microservices.md) | S15, MicroServicesReading |
| 02 | [Event Sourcing](08-advanced-patterns/02_event_sourcing.md) | EventSourcingReading |
| 03 | [CQRS](08-advanced-patterns/03_cqrs.md) | CQRSReading |
| 99 | Recap | — |

### 09 · Case Study · 實戰演練
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [IoT 監控系統](09-case-study/01_iot_case.md) | S14 |
| 02 | [成本與期限](09-case-study/02_cost_timeline.md) | S12 |
| 03 | [團隊技能約束](09-case-study/03_team_constraints.md) | S12 |
| 99 | Recap | — |

### 10 · Soft Skills · 軟實力
| # | 主題 | 來源 PDF |
|---|------|----------|
| 00 | Overview | — |
| 01 | [無實權的影響力](10-soft-skills/01_influence.md) | S16 |
| 02 | [因人而異溝通](10-soft-skills/02_audience_tuned.md) | S16, S3 |
| 03 | [持續學習](10-soft-skills/03_continuous_learning.md) | S16 |
| 99 | Recap | — |

### 90 · Appendix · 附錄
| # | 主題 |
|---|------|
| 00 | [Capstone Case Study](90-appendix/00_capstone.md) |
| 01 | [Architect Cheatsheet](90-appendix/01_cheatsheet.md) |

---

## 三種閱讀路徑

| 路徑 | 對象 | 內容 |
|------|------|------|
| **A · 線性** | 完整轉型者 | 00 → 10 → 90，依序讀完（約 6 小時） |
| **B · 主題** | 在職架構師 | 直接挑章節，搭配 PDF 深讀 |
| **C · 面試** | 架構師職位面試 | Ch.1 + Ch.5 + Ch.7 + Ch.8 + 90/Cheatsheet |

---

## 風格

- 主題：Marp + Anthropic 配色（與 `../../ppt/` 同調）
- 字體：Playfair Display（標題）/ Inter（內文）/ IBM Plex Mono（程式碼）/ Noto Sans TC（中文）
- 每張內容頁必含 `> Source:` 引用
- 新增主題依「Why / How / Trade-off」三段節奏
- 不引入新 CSS class，沿用 [`themes/anthropic.css`](themes/anthropic.css)

---

**v1.0 · 2026**
