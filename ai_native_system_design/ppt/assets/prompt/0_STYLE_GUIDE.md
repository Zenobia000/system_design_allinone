# 圖像風格指南 · AI 時代系統設計速成

> 所有 gpt-image-2 生成的技術圖必須遵守本檔風格，確保 30 張圖視覺一致。
> 每章 prompt 文檔（`prompt/0X-*.md`）保留**完整可重生 prompt**（含 subject + composition + style）。
> **與姊妹專案 `software_architect/ppt/assets/diagrams/0_STYLE_GUIDE.md` 同調**——同色票、同風格家族。

---

## 1 · 色票（必背 5 色）

| 用途 | HEX | 說明 |
|------|-----|------|
| 背景 | `#F5F1E8` | warm cream（不要純白） |
| 主強調 | `#D97757` | terracotta（compute services / 主要元件） |
| 次要 | `#A1813F` | olive（queue / broker / 次要元件） |
| 成功 / DB | `#5B9770` | sage green（databases / 推薦） |
| 第四色 | `#5B7570` | slate teal（external / cache / 第四級） |
| 文字 / 線條 | `#2A2520` | dark brown（不要純黑） |
| 警告 | `#E8634F` | soft red（reject / 反 pattern） |
| 柔和 | `#8B6F47` | warm brown（annotation / 副標） |

**禁用**：純白 `#FFFFFF`、純黑 `#000000`、霓虹色、漸層光暈、3D 反射。

---

## 2 · 核心風格定義

### 2.1 風格家族
**「顧問報告 / 技術文件」風**（McKinsey · Gartner · AWS Well-Architected whitepaper）：
- Flat 2D vector
- 平面、無 3D、無 isometric
- 純 schematic clarity（純圖示溝通）
- 教科書級嚴謹

### 2.2 元件形狀分類（**強制遵守**）

| 元件類型 | 形狀 |
|---|---|
| 資料庫 / Database | Cylinder（圓柱） |
| 服務 / Service | Rounded rectangle（圓角矩形） |
| 訊息佇列 / Queue / Broker | Hexagon（六角形） |
| 外部系統 / CDN / Cloud | Cloud shape（雲狀） |
| 使用者 / Client | Small filled circle（小實心圓） |
| 邏輯分組 / Region | Dashed box（虛線框） |

### 2.3 標籤規範（**必有**）

- **雙語**：繁體中文 + English（如「Mosquitto Broker」「告警 SMS/Email」「負載均衡器 / Load Balancer」）
- 字體：clean sans-serif
- 位置：near each element（元件旁邊）
- 簡短：每元件 ≤ 8 中文字 / 30 英文字符

### 2.4 箭頭規範

- 顏色：dark brown `#2A2520`
- 寬度：2px
- 風格：subtle arrowheads（不要誇張）
- 同步流：solid arrows
- 非同步流：dashed arrows
- 重點標註：可加文字 label（如「99% reject」「1K success」）

### 2.5 額外元素

- 左下角：可加 legend（圖例說明顏色與形狀分類）
- 右側：可加 side annotation box（重點說明）
- 底部：可加 takeaway 大字（如「99% reject in earliest layer」）

---

## 3 · 黃金 Prompt 範本

每張圖的 prompt 都用此基底（依主題微調 Theme/Layout 部分）：

```
Clean technical architecture diagram in the style of consulting reports
(McKinsey / Gartner / AWS Well-Architected whitepaper).
Flat 2D vector illustration. NO 3D, NO isometric, NO cartoon, NO Greek pillars.

Theme: {SUBJECT 主題敘述，含實際元件名稱}

Background: warm cream #F5F1E8.
Element fills: terracotta #D97757 services, olive #A1813F queues,
  sage green #5B9770 databases, slate #5B7570 external/cache.
Lines & arrows: dark brown #2A2520, 2px weight, with subtle arrowheads.
Labels: clean sans-serif typography, bilingual Traditional Chinese + English.

Element shapes (consistent):
- Cylinders for databases
- Rounded rectangles for services
- Hexagons for queues / brokers
- Cloud shapes for external systems / CDN
- Small filled circles for clients / users
- Dashed boxes for logical grouping

Layout: {LAYOUT 描述 — top-to-bottom OR left-to-right, generous whitespace}

{LABELS 具體中英雙語標籤清單}

Aspect ratio: 3:2 horizontal
Style: educational textbook + consulting deliverable. Pure schematic clarity.
```

---

## 4 · 圖像類型分類

| Type | 用途 | 比例 | 範例 |
|------|------|------|------|
| **A · Case Architecture** | 案例階段架構圖 | 1536x1024 | 06_stage3_seckill |
| **B · Concept Decision** | 概念決策圖（CAP/DB tree/Pattern） | 1536x1024 | B_cap_triangle |
| **C · Process Chain** | 流程鏈（七步/可靠性 5 件套） | 1536x1024 | C_reliability_chain |
| **D · Comparison Matrix** | 對比矩陣（2x2 / 三欄並列） | 1536x1024 | D_api_quadrant |
| **E · Radial / Funnel** | 放射 / 漏斗（特殊構圖） | 1024x1024 / 1024x1536 | C_ilities_radial · case1_funnel |

---

## 5 · 命名與儲存規範

```
ai_native_system_design/
├── openslide/slides/<deck>/assets/    # 實際 PNG 存這（給 React import）
│   ├── 06_stage1_mvp.png
│   ├── 06_stage2_10k.png
│   └── ...
└── ppt/assets/prompt/                  # Prompt 備份（本目錄）
    ├── 0_STYLE_GUIDE.md                本檔
    ├── README.md                        工作流
    ├── INDEX.md                         30 張圖總覽
    ├── 02-module-a.md                  ← 各章 prompt
    ├── 03-module-b.md
    ├── 04-module-c.md
    ├── 05-module-d.md
    ├── 06-case-ecommerce.md
    ├── 07-case-livestream.md
    ├── 08-case-rag.md
    └── 09-ai-workflow.md
```

### PNG 命名規則

| 模式 | 範例 |
|---|---|
| Hero（章首封面） | `00_cover_hero.png`, `02_module_a_hero.png` |
| 案例階段圖 | `06_stage1_mvp.png`, `07_stage3_1m_global.png` |
| 概念字首 + slug | `B_cap_triangle.png`, `D_event_trio.png` |
| Module C v2（含標籤版） | `C_*_v2.png` 與舊版 `C_*.png` 並存 |
| AI workflow | `W_5_uses.png`, `W_poc_loop.png` |

---

## 6 · 整合到 React Slide

PNG 生成後，放到對應 deck 的 `assets/`，在 React 中 import：

```tsx
import img_stage3 from './assets/06_stage3_seckill.png';

const P07: Page = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '65% 35%' }}>
    <img src={img_stage3} alt='Stage 3 Seckill 100K QPS'
         style={{ maxWidth: '100%', maxHeight: '92%', objectFit: 'contain' }} />
    <div>{/* 右側設計重點 + Mantra */}</div>
  </div>
);
```

---

## 7 · 工作流程（每張圖 4 步）

1. **挑** — 從 `prompt/0X-*.md` 找一張要做的、copy 它的 prompt
2. **生** — 用 draw skill 呼叫 gpt-image-2：
   ```bash
   python3 ~/.claude/skills/draw/draw.py "<完整 prompt>" \
     --size 1536x1024 --quality medium \
     --name <檔名> --outdir <對應 deck/assets>
   ```
3. **存** — 去 timestamp、確認檔名與 `Save as` 一致
4. **嵌** — 在對應 React deck `index.tsx` `import` + 在 Page 內 `<img src={...} />`

---

## 8 · 品質檢查清單

新生圖後逐項驗：

- [ ] 背景是 cream `#F5F1E8`，不是純白
- [ ] 元件用正確形狀（DB=圓柱、Service=圓角矩形、Queue=六角...）
- [ ] **有雙語標籤**（中英對照）
- [ ] 顏色限定在 5 種色票內
- [ ] 沒有 cartoon / 3D / isometric / Greek pillar / glow
- [ ] 流向清晰（箭頭方向、間距合理）
- [ ] 有 legend 或 side annotation（複雜圖必有）
- [ ] 比例正確（多數 1536×1024，特殊構圖另定）

---

## 9 · 風格參考

模仿：
- AWS Well-Architected Framework 白皮書圖
- Gartner Magic Quadrant 雷達 / 象限
- McKinsey Insights 報告插圖
- ThoughtWorks Tech Radar 圖
- `software_architect/ppt/assets/diagrams/09-case-study/01_iot_01_architecture_concept.png`（同調姊妹專案範本）

避免：
- 「AI 感」漸層、發光、超現實
- 太可愛 / 卡通風
- 古典隱喻（5 根希臘柱、鏈狀守衛、女神...）
- PowerPoint clipart 風
- isometric 等軸構圖

---

## 10 · 優先序系統

每章 prompt 文檔的每張圖會標 **P0 / P1 / P2**：

- **P0（核心）** — 案例階段圖（解決跑板問題的最關鍵）
- **P1（決策框架）** — 概念決策圖（CAP / DB tree / patterns 等）
- **P2（補強）** — 心法視覺化（funnel / loop / 5 uses）

**全 30 張**：P0 × 15 + P1 × 11 + P2 × 4
