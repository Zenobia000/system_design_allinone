# 圖像 Prompt 總索引

> 全套「架構師的藍圖」PPT 視覺化圖像清單。先看本檔挑要做的，再進對應章節 prompt 文檔複製內容。
> Style guide：[`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md) · 工作流：[`../README.md`](../README.md)

---

## 統計

- **總圖數**：~40 張
- **Priority**：P1 × 21（必做）· P2 × 15（很有用）· P3 × 4（錦上添花）
- **Type**：A × 11（hero）· B × 12（隱喻）· C × 6（架構）· D × 7（對照）· E × 4（決策樹/流程）

## 各章圖數

| 章節 | 主題 | 張數 | 文檔 |
|------|------|------|------|
| 00 | Prologue | 1 | [`00-prologue.md`](00-prologue.md) |
| 01 | Role & Value | 4 | [`01-role-value.md`](01-role-value.md) |
| 02 | Requirements & SLA | 4 | [`02-requirements-sla.md`](02-requirements-sla.md) |
| 03 | Process & App Types | 3 | [`03-process-app-types.md`](03-process-app-types.md) |
| 04 | Tech Stack & Data | 4 | [`04-tech-stack-data.md`](04-tech-stack-data.md) |
| 05 | *-ilities | 4 | [`05-ilities.md`](05-ilities.md) |
| 06 | Components & Patterns | 3 | [`06-components-patterns.md`](06-components-patterns.md) |
| 07 | System Architecture | 4 | [`07-system-architecture.md`](07-system-architecture.md) |
| 08 | Advanced Patterns | 4 | [`08-advanced-patterns.md`](08-advanced-patterns.md) |
| 09 | Case Study | 3 | [`09-case-study.md`](09-case-study.md) |
| 10 | Soft Skills | 3 | [`10-soft-skills.md`](10-soft-skills.md) |
| 90 | Appendix | 3 | [`90-appendix.md`](90-appendix.md) |

---

## 預算建議（從哪開始）

| 預算 | 做什麼 | 張數 |
|------|--------|------|
| **最小（試水溫）** | 序章 hero + 10 章 hero + 10 章 mental model | ~21 張 |
| **標準** | 全部 P1 | 21 張 |
| **完整** | P1 + P2 | 36 張 |
| **滿配** | P1 + P2 + P3 | 40 張 |

**強烈建議**：先做 21 張最小集，實際嵌入 PPT 看版面手感後再決定追加。

---

## P1 · 必做（21 張）

> 章首 hero、核心 mental model、最常引用的關鍵架構與對照圖。

| Chapter | Type | Title | Save as |
|---|---|---|---|
| 00-prologue | A | Cover Hero · 課程封面 | `00-prologue/00_cover_hero.png` |
| 01-role-value | A | Hero · Role & Value 章首 | `01-role-value/00_hero.png` |
| 01-role-value | B | Mental Model · 架構師三層責任 | `01-role-value/00_mental_model.png` |
| 02-requirements-sla | A | Hero · Requirements & SLA 章首 | `02-requirements-sla/00_hero.png` |
| 02-requirements-sla | B | Mental Model · 功能 vs 非功能兩層 | `02-requirements-sla/00_mental_model.png` |
| 03-process-app-types | A | Hero · Process 章首 | `03-process-app-types/00_hero.png` |
| 03-process-app-types | B | Mental Model · 設計六步流程 | `03-process-app-types/00_mental_model.png` |
| 04-tech-stack-data | A | Hero · Tech Stack 章首 | `04-tech-stack-data/00_hero.png` |
| 04-tech-stack-data | B | Mental Model · 採購清單心態 | `04-tech-stack-data/00_mental_model.png` |
| 05-ilities | A | Hero · *-ilities 章首 | `05-ilities/00_hero.png` |
| 05-ilities | B | Mental Model · 品質屬性優先級 | `05-ilities/00_mental_model.png` |
| 06-components-patterns | A | Hero · Patterns 章首 | `06-components-patterns/00_hero.png` |
| 06-components-patterns | B | Mental Model · 模式=溝通協議 | `06-components-patterns/00_mental_model.png` |
| 07-system-architecture | A | Hero · System Architecture 章首 | `07-system-architecture/00_hero.png` |
| 07-system-architecture | B | Mental Model · 單體到分散式 | `07-system-architecture/00_mental_model.png` |
| 08-advanced-patterns | A | Hero · Advanced Patterns 章首 | `08-advanced-patterns/00_hero.png` |
| 08-advanced-patterns | B | Mental Model · 進階模式金字塔 | `08-advanced-patterns/00_mental_model.png` |
| 09-case-study | A | Hero · Case Study 章首 | `09-case-study/00_hero.png` |
| 09-case-study | B | Mental Model · 理論碰上約束 | `09-case-study/00_mental_model.png` |
| 10-soft-skills | A | Hero · Soft Skills 章首 | `10-soft-skills/00_hero.png` |
| 10-soft-skills | B | Mental Model · 影響力 vs 權威 | `10-soft-skills/00_mental_model.png` |

---

## P2 · 很有用（15 張）

> 章節內最關鍵的 trade-off / 架構 / 決策圖。

| Chapter | Type | Title | Save as |
|---|---|---|---|
| 01-role-value | D | Mindset · 五維思維轉換矩陣 | `01-role-value/02_mindset_shift_01_matrix.png` |
| 02-requirements-sla | C | SLA · 9 對照表視覺化 | `02-requirements-sla/02_sla_math_01_nines.png` |
| 02-requirements-sla | C | Throughput · 三種流量曲線 | `02-requirements-sla/03_throughput_01_curves.png` |
| 03-process-app-types | E | Process · 六步驟流程圖 | `03-process-app-types/01_six_step_01_flow.png` |
| 04-tech-stack-data | E | DB · 選型決策樹 | `04-tech-stack-data/02_sql_nosql_01_tree.png` |
| 05-ilities | D | Scalability · Scale Up vs Out | `05-ilities/01_scalability_01_up_vs_out.png` |
| 05-ilities | C | Testability · 測試金字塔 | `05-ilities/02_testability_01_pyramid.png` |
| 06-components-patterns | C | Layered · 三層架構標準圖 | `06-components-patterns/01_layered_01_three_tier.png` |
| 07-system-architecture | C | Cache · 四模式對照 | `07-system-architecture/02_cache_01_patterns.png` |
| 07-system-architecture | C | Correlation ID · 分散式追蹤 | `07-system-architecture/03_logging_01_correlation.png` |
| 08-advanced-patterns | D | Microservices · 拆 vs 不拆 | `08-advanced-patterns/01_microservices_01_split.png` |
| 08-advanced-patterns | C | Event Sourcing · CRUD vs ES | `08-advanced-patterns/02_es_01_crud_vs_es.png` |
| 09-case-study | C | IoT · 整體架構圖 | `09-case-study/01_iot_01_architecture.png` |
| 09-case-study | D | Cost · 三軸取捨三角形 | `09-case-study/02_cost_01_triangle.png` |
| 10-soft-skills | D | Communication · 4 角色對照 | `10-soft-skills/02_audience_01_matrix.png` |

---

## P3 · 錦上添花（4 張）

> 細節示意、視覺裝飾。

| Chapter | Type | Title | Save as |
|---|---|---|---|
| 90-appendix | A | Capstone · Hero | `90-appendix/00_capstone_hero.png` |
| 90-appendix | C | Capstone · Uber Eats 架構 | `90-appendix/00_capstone_01_architecture.png` |
| 90-appendix | A | Cheatsheet · Hero | `90-appendix/01_cheatsheet_hero.png` |
| 04-tech-stack-data | D | Polyglot · 多 DB 混用範例 | `04-tech-stack-data/02_sql_nosql_02_polyglot.png` |
