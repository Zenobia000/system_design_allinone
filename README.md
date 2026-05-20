# System Design All-in-One · 系統設計合集

> 四本獨立講義 · 從新手到 AI 時代架構師的完整學習路徑
> Anthropic 風格 Marp + open-slide React 雙格式

從**會 Python 的小白**到**指揮 AI 的架構師**，這份合集分四階段把整條路徑鋪平：

```
┌──────────────────────────────────────────────────────────────────────┐
│  小白入門            架構深度            AI 時代速成         系統實作  │
│  ↓                  ↓                  ↓                   ↓        │
│  software_develop   software_architect ai_native_system    system_  │
│  _journey/          /                   _design/           design/  │
│  14 章 9 角色全景    12 章架構深度       11 章速成 + 30 圖   7 章 48  │
│                                          + AI 工作流          主題   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 四本講義

### 1️⃣ `software_develop_journey/` · 軟體開發旅程

> **給對軟體開發完全沒概念的人**

| 規模 | 14 章 · ~80 slides · Marp + open-slide |
|---|---|
| 風格 | Beginner on-ramp · 蓋大樓比喻 · 9 角色全景 |
| 主軸 | 「為什麼一個 app 要 9 個角色？」|
| 適合 | 完全新手、轉職者、想搞懂自家公司分工的人 |
| 章節 | PM / UX / SA / Architect / SD / DBA / Dev / QA / DevOps + 協作 + 案例 |

詳細目錄：[`software_develop_journey/README.md`](software_develop_journey/README.md)

---

### 2️⃣ `software_architect/` · 架構師的藍圖

> **給已會 code 想成為架構師的人**

| 規模 | 12 章 · 372 slides · Marp + open-slide |
|---|---|
| 風格 | 深度教材 · 每章 Why / How / Trade-off · 7 大主題包 |
| 主軸 | 「面對 trade-off，怎麼做出可解釋的決策」|
| 適合 | 1-3 年 dev 想升級判斷力、面試準備 staff/principal |
| 章節 | 角色定位 / 需求量化 / 流程 / 技術選型 / *-ilities / 模式 / 分散式 / 進階 / 案例 / 軟實力 |

詳細目錄：[`software_architect/ppt/README.md`](software_architect/ppt/README.md)

---

### 3️⃣ `ai_native_system_design/` · AI 時代系統設計速成 ⭐ NEW

> **AI 把實作變便宜，判斷力變稀缺。這本只教稀缺的**

| 規模 | 11 章 · ~177 slides · Marp + open-slide |
|---|---|
| 風格 | 顧問報告風 · 30 張中英雙語技術圖 · 三句帶走 · 心法貼條 |
| 主軸 | 「先 ADR 再 code · Context 給法 > prompt 詞」|
| 適合 | 想把 Claude Code 用得更深、把架構決策結構化的人 |
| 獨家 | Part 3 整章 24 slides 教 AI 實戰工作流（其他兩本沒有） |
| 章節 | Prologue / 上路詞彙 / SDLC 全景 / 四方法論 ABCD / 三案例 / AI 工作流 / 附錄 |
| 品牌 | 桑尼資料科學 · 含 154 頁全 Chrome（麵包屑 / 頁碼 / 版權聲明） |

詳細目錄：[`ai_native_system_design/README.md`](ai_native_system_design/README.md)

---

### 4️⃣ `system_design/` · 系統設計實戰

> **34 份 PDF 原始教材 + 7 章 48 主題 Marp 簡報**

| 規模 | 7 章 · 48 slides · 34 PDF · Marp + open-slide |
|---|---|
| 風格 | 主題式速查 · CAP / Sharding / Cache / Queue / RAG... |
| 主軸 | 「這個技術解決什麼問題？代價？什麼時候不該用？」|
| 適合 | 工作上想懂某個概念、面試衝刺 |
| 章節 | Foundation / Data / Distribution / Infrastructure / Reliability / Scaling / Advanced |

詳細目錄：[`system_design/README.md`](system_design/README.md)

---

## 推薦學習路徑

| 你是誰 | 建議順序 | 預估時間 |
|---|---|---|
| **完全新手** | 1️⃣ journey → 3️⃣ ai_native → 2️⃣ architect 挑章 | ~3 個月 |
| **1-3 年工程師** | 3️⃣ ai_native (速成) → 2️⃣ architect (深挖) → 4️⃣ system_design (補主題) | ~6 週 |
| **資深工程師升架構師** | 2️⃣ architect → 3️⃣ ai_native Part 3 (AI 工作流) | ~3 週 |
| **面試衝刺** | 3️⃣ ai_native + 4️⃣ system_design 90-appendix cheatsheet | ~1 週 |
| **想懂特定技術** | 4️⃣ system_design 主題查詢 + 對應 PDF | ~小時級 |

---

## Quickstart

### 編譯 Marp 簡報（PDF / HTML）

每個專案都有獨立 build script：

```bash
# software_develop_journey
bash software_develop_journey/scripts/build.sh full

# software_architect
bash software_architect/scripts/build.sh full

# ai_native_system_design
bash ai_native_system_design/scripts/build.sh full

# system_design
bash system_design/ppt/scripts/build.sh full
```

### 啟動 open-slide React 簡報（互動 + 動畫）

```bash
# 各專案的 openslide 子目錄
cd ai_native_system_design/openslide
pnpm install
pnpm dev   # http://localhost:5173/

# 同時開兩個（不同 port）
cd software_develop_journey/openslide && pnpm dev   # 自動 5174
```

需要 Node.js >= 18、pnpm。

---

## 設計理念（四本共通）

### 1. 不背名詞，學決策

每張 slide 真正在問三件事：
> **這個技術解決什麼問題？代價是什麼？什麼時候不該用？**

### 2. Why → How → Trade-off 三段節奏

- **Why**：解決什麼具體痛（不是抽象優勢）
- **How**：核心機制 + 一張示意圖
- **Trade-off**：得到什麼 vs 失去什麼

### 3. 圖為主、文為輔

- 全套採 Anthropic 暖色系（橘 `#D97757` + 米白 `#F5F1E8`）
- AI 時代速成版（3️⃣）採顧問風技術圖（中英雙語標籤）
- 每章末「三句帶走」海報式 recap

---

## 能力分級（跨四本）

| Level | 能力 | 對應講義 + 章節 |
|---|---|---|
| **L0** | 看得懂 IT 在做什麼 | 1️⃣ journey 全本 |
| **L1** | 讀懂團隊架構文件 | 4️⃣ system_design Ch.1+2 |
| **L2** | 能畫基本架構圖 | + 4️⃣ Ch.3+4 / 3️⃣ Module A+B |
| **L3** | 能落地中型系統 | + 4️⃣ Ch.5 / 3️⃣ 三大案例 |
| **L4** | 能 review 別人的設計 | + 4️⃣ Ch.6 / 2️⃣ architect Ch.5+7 |
| **L5** | 能設計新 pattern | + 4️⃣ Ch.7 / 2️⃣ Ch.6+8 + Capstone |
| **L6** | 能指揮 AI 做架構 | + 3️⃣ Part 3 AI 實戰工作流 |

---

## 技術棧

- **內容源**：Marp markdown
- **渲染（靜態）**：Marp CLI → PDF / HTML
- **渲染（互動）**：open-slide React framework + Vite
- **主題**：Anthropic 同調 CSS（4 本共用 `themes/anthropic.css`）
- **圖片**：gpt-image-2 生成（30 張 + 12 張 hero）
- **品牌**：桑尼資料科學 logo · 中英雙語

---

## 授權

- **簡報、腳本、原創文字**（`ppt/`, `openslide/`, `scripts/`）：MIT License — 見 [LICENSE](LICENSE)
- **`system_design/系統設計實戰/` 內的原始 PDF**：著作權屬原作者，僅作個人學習收藏，不對外散佈
- **gpt-image-2 生成圖片**：MIT（同 OpenAI policy）

---

## 開發者

**桑尼資料科學 · Sunny Data Science**
🤖 Co-authored with Claude Code (Anthropic)

---

**v2.0 · 2026** · 4 本講義合集
