# 圖像 Prompt 總索引 · 軟體開發旅程

> 全套「軟體開發旅程」PPT 視覺化圖像清單。先看本檔挑要做的，再進對應章節 prompt 文檔複製內容。
> Style guide：[`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md) · 工作流：[`../README.md`](../README.md)

---

## 統計

- **總圖數**：~35 張
- **Priority**：P0 × 3（母模板必做）· P1 × 15（強烈建議）· P2 × 17（錦上添花）
- **Type**：A × 14（hero）· B × 12（隱喻）· C × 3（架構）· D × 4（對照）· E × 2（決策樹/流程）

## 各章圖數

| 章節 | 主題 | 張數 | 文檔 |
|------|------|------|------|
| 00 | Prologue | 2 | [`00-prologue.md`](00-prologue.md) |
| 01 | Big Picture | 4 | [`01-big-picture.md`](01-big-picture.md) |
| 02 | PM | 2 | [`02-pm.md`](02-pm.md) |
| 03 | UX / UI | 2 | [`03-ux-ui.md`](03-ux-ui.md) |
| 04 | SA | 2 | [`04-sa.md`](04-sa.md) |
| 05 | Architect | 2 | [`05-architect.md`](05-architect.md) |
| 06 | SD | 2 | [`06-sd.md`](06-sd.md) |
| 07 | DBA | 2 | [`07-dba-data.md`](07-dba-data.md) |
| 08 | Dev | 2 | [`08-dev.md`](08-dev.md) |
| 09 | QA | 2 | [`09-qa.md`](09-qa.md) |
| 10 | DevOps / SRE | 2 | [`10-devops-sre.md`](10-devops-sre.md) |
| 11 | Collaboration | 3 | [`11-collaboration.md`](11-collaboration.md) |
| 12 | Case Study | 5 | [`12-case-study.md`](12-case-study.md) |
| 90 | Appendix | 1 | [`90-appendix.md`](90-appendix.md) |

---

## 預算建議（從哪開始）

| 預算 | 做什麼 | 張數 |
|------|--------|------|
| **最小（試水溫）** | 3 母模板 + Ch.1 hero + Ch.12 三系統 hero | **7 張** |
| **標準** | 全部 P0 + P1 | 18 張 |
| **完整** | P0 + P1 + P2 | 35 張 |

**強烈建議**：先做 7 張最小集，定下視覺基調，後續逐章補。

---

## P0 · 母模板（3 張·必做）

> 整本教材的視覺軸——做完這 3 張，後續章節 hero 都能對齊。

| Chapter | Type | Title | Save as |
|---|---|---|---|
| 01-big-picture | B | 蓋大樓 9 角色一字排開（全景母模板） | `01-big-picture/01_building_metaphor.png` |
| 00-prologue | B | 同一句需求 9 角色腦中泡泡 | `00-prologue/03_nine_role_bubbles.png` |
| 12-case-study | D | 九角色甘特帶（電商 baseline 版） | `12-case-study/01_ecommerce_gantt.png` |

---

## P1 · 強烈建議（15 張）

> 每章封面 hero + Ch.12 三系統甘特對照圖。

| Chapter | Type | Title | Save as |
|---|---|---|---|
| 00-prologue | A | Cover Hero · 課程封面 | `00-prologue/00_cover_hero.png` |
| 01-big-picture | A | Hero · Big Picture 章首 | `01-big-picture/00_hero.png` |
| 02-pm | A | Hero · PM 章首（建案企劃） | `02-pm/00_hero.png` |
| 03-ux-ui | A | Hero · UX/UI 章首（室內設計師） | `03-ux-ui/00_hero.png` |
| 04-sa | A | Hero · SA 章首（建築師） | `04-sa/00_hero.png` |
| 05-architect | A | Hero · Architect 章首（結構技師） | `05-architect/00_hero.png` |
| 06-sd | A | Hero · SD 章首（施工圖繪製師） | `06-sd/00_hero.png` |
| 07-dba-data | A | Hero · DBA 章首（地基 + 水塔） | `07-dba-data/00_hero.png` |
| 08-dev | A | Hero · Dev 章首（工班師傅） | `08-dev/00_hero.png` |
| 09-qa | A | Hero · QA 章首（驗收員） | `09-qa/00_hero.png` |
| 10-devops-sre | A | Hero · DevOps/SRE 章首（物業/消防） | `10-devops-sre/00_hero.png` |
| 11-collaboration | A | Hero · Collaboration 章首 | `11-collaboration/00_hero.png` |
| 12-case-study | A | Hero · Case Study 章首（三系統並排） | `12-case-study/00_hero.png` |
| 12-case-study | D | 九角色甘特帶（直播版） | `12-case-study/02_livestream_gantt.png` |
| 12-case-study | D | 九角色甘特帶（AI 影視版） | `12-case-study/03_ai_video_gantt.png` |

---

## P2 · 章內加分（17 張）

> 章內 mental model / 概念圖 / 對照圖。視預算自由挑。

| Chapter | Type | Title | Save as |
|---|---|---|---|
| 01-big-picture | B | SDLC 完整流程示意 | `01-big-picture/02_sdlc_map.png` |
| 01-big-picture | C | 不確定性階梯（金字塔） | `01-big-picture/03_uncertainty_ladder.png` |
| 02-pm | B | PRD 與需求壓縮過程 | `02-pm/01_requirement_funnel.png` |
| 03-ux-ui | B | UX 動線 vs UI 樣品屋對照 | `03-ux-ui/01_ux_vs_ui.png` |
| 04-sa | B | SA 補規則的縫隙（訂單狀態） | `04-sa/01_state_machine.png` |
| 05-architect | B | 架構師三層責任（向上 / 向下翻譯） | `05-architect/01_three_layer.png` |
| 06-sd | B | API 命名是 SD 的靈魂 | `06-sd/01_api_naming.png` |
| 07-dba-data | B | 資料是建物命脈（地基隱喻） | `07-dba-data/01_data_lifeline.png` |
| 08-dev | B | AI 寫 80% code 後 Dev 的價值 | `08-dev/01_ai_collaboration.png` |
| 09-qa | B | QA 從驗證已知到定義未知 | `09-qa/01_known_to_unknown.png` |
| 10-devops-sre | B | 物業管理 / 24h 保全 / 消防 | `10-devops-sre/01_property_management.png` |
| 11-collaboration | E | 三層 Flow 翻譯（User → System → Architecture） | `11-collaboration/01_three_views.png` |
| 11-collaboration | D | Overlap matrix 視覺化 | `11-collaboration/02_overlap_matrix.png` |
| 12-case-study | B | 訂單 7 狀態機 | `12-case-study/01_order_state.png` |
| 12-case-study | B | 直播延遲合約（五人合約） | `12-case-study/02_latency_contract.png` |
| 12-case-study | B | AI 影視「定義好」流程 | `12-case-study/03_defining_good.png` |
| 90-appendix | A | 速查表卡片（封面式） | `90-appendix/00_cheatsheet_cover.png` |

---

## 注意事項

1. **每張圖在對應的章節 prompt 文檔內都有完整、可複製的 prompt**——直接複製貼上到 DALL-E 3 / Midjourney 即可，**不要自己改風格**。
2. C 類與 E 類（架構圖、決策樹）使用 Mermaid 比 AI 圖生成可靠 10 倍。
3. 三個母模板（P0）做好後，記得把它們的視覺風格作為基準，後續 hero 才能保持一致。
4. 圖像產出後別忘了在對應 slide 加 `![w:NNN](path)` 引用。
