# 系統設計實戰 · System Design All-in-One

> 七章 × 四十八主題 · Anthropic 風格 Marp 簡報 + 三十四份原始 PDF 教材

從基礎到架構，把每個 trade-off 看清楚。給寫過幾年 code、想往架構師走的工程師。
**不背名詞，學決策。**

---

## 內容組成

```
system_design_allinone/
├── 系統設計實戰/    34 份 PDF 原始教材（4 大類）
│   ├── 基本觀念/    Networking / CAP / Indexing / Sharding ...（12）
│   ├── 常用技術/    DB / Blob / Gateway / LB / Container ...（10）
│   ├── 維運與可靠性/ Contention / Overload / Delivery / O11y（4）
│   └── 設計模式/    Scaling / Long Tasks / Search / RAG ...（8）
├── ppt/             Anthropic 風格 Marp 簡報（48 主題）
│   ├── 00-prologue/         序章（封面、地圖、心智模型）
│   ├── 01-foundation/       Ch.1 · 網路、C/S、可擴展性、API
│   ├── 02-data-fundamentals/ Ch.2 · CAP、Indexing、Tx、Numbers
│   ├── 03-data-distribution/ Ch.3 · Hashing、Sharding、Replication、Caching
│   ├── 04-infrastructure/    Ch.4 · DB、Blob、GW、LB、Container、Serverless
│   ├── 05-reliability-ops/   Ch.5 · Lock、Contention、Overload、Delivery、O11y
│   ├── 06-scaling-patterns/  Ch.6 · Reads、Writes、Distributed Cache、CDN
│   ├── 07-advanced-patterns/ Ch.7 · Queue、Long Tasks、Real-time、Search、Pipeline、RAG
│   └── 90-appendix/         附錄（Capstone、Cheatsheet、Resources）
├── scripts/build.sh         編譯腳本（PDF / HTML / 單章節）
└── README.md                本檔
```

簡報詳細目錄見 [`ppt/README.md`](ppt/README.md)。

---

## 三種使用方式

| 路徑 | 對象 | 內容 |
|------|------|------|
| **A · 線性自學** | 8 小時走完 | 從 `00-prologue` 讀到 `90-appendix`，依序 |
| **B · 主題查詢** | 工作上想懂某個概念 | 直接挑 `0X-章節/NN_topic.md`，搭配對應 PDF 深讀 |
| **C · 面試衝刺** | 3 天 | `Ch.1` + `Ch.2` + `90-appendix/01_review_cheatsheet.md` + 三個 capstone case |

---

## Quickstart

### 編譯簡報

```bash
# 安裝 Node.js >= 18 與 Marp CLI（一次）
nvm install 20 && nvm use 20

# 從專案根目錄執行
bash scripts/build.sh full          # 整套 PDF + HTML，輸出到 dist/
bash scripts/build.sh minimal       # 精簡版（只 cover + roadmap + 章節 + cheatsheet）
bash scripts/build.sh chapter 01-foundation   # 單一章節
bash scripts/build.sh html-only     # 僅產生 HTML
bash scripts/build.sh clean         # 清除 dist/ 與 _combined*.md
```

### 直接閱讀 Markdown

每份 `ppt/0X-章節/NN_topic.md` 都是獨立的 Marp deck，可在 IDE 內直接讀（VS Code 安裝 Marp 擴充即時預覽）。

---

## 設計理念

每張 slide 的真正主題只有一句：

> 這個技術解決什麼問題？代價是什麼？什麼時候不該用？

如果你能回答這三個問題，你就是架構師。

簡報結構刻意保留 **Why / How / Trade-off** 三段節奏：
- **Why**：解決什麼具體問題（不是抽象優勢）
- **How**：核心機制 + 一張示意圖
- **Trade-off**：得到什麼 vs 失去什麼，何時不該用

---

## 章節能力分級

| Level | 描述 | 對應章節 | 典型場景 |
|-------|------|---------|---------|
| L1 | 看得懂技術名詞 | Ch.1 + Ch.2 | 讀懂團隊架構文件 |
| L2 | 能畫出基本架構圖 | + Ch.3 + Ch.4 | 通過初級面試 |
| L3 | 能落地實作中型系統 | + Ch.5 | 帶領 3-5 人小組 |
| L4 | 能 review 別人的設計 | + Ch.6 | 跨團隊 architect |
| L5 | 能設計新 pattern | + Ch.7 + Capstone | Staff / Principal |

本套教材目標：**把你從 L1 帶到 L4 的入口**。

---

## 風格

- 主題：Marp + Anthropic 配色（暖橙 `#D97757` + 米白底 `#F5F1E8`）
- 字體：Playfair Display（標題）/ Inter（內文）/ IBM Plex Mono（程式碼）/ Noto Sans TC（中文）
- 主題 CSS：[`ppt/themes/anthropic.css`](ppt/themes/anthropic.css)

---

## 授權

- **本專案的簡報與腳本**（`ppt/`、`scripts/`）採 MIT License — 見 [LICENSE](LICENSE)
- **`系統設計實戰/` 內的原始 PDF 教材** 著作權屬原作者所有，僅作個人學習收藏，不對外重新散佈

---

**v1.0 · 2026**
