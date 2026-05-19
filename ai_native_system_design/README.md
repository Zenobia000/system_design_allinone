# AI 時代系統設計速成 · AI-Native System Design

> **The 200-Page Crash Course** — 給已會寫 code 但想成為 AI 時代架構師的人
> 200 頁 · 11 章 · Marp 簡報（與 `software_develop_journey/ppt/` 同調）
> 姊妹專案：`../software_develop_journey/`（角色全景）｜ `../software_architect/`（架構深度）

每張 slide 只回答兩件事：
**這個觀念為何 AI 取代不了？AI 時代怎麼用 AI 加速？**

---

## Quickstart

從**專案根目錄**執行：

```bash
# 整套 PDF + HTML
bash ai_native_system_design/scripts/build.sh full

# 單章
bash ai_native_system_design/scripts/build.sh chapter 09-ai-workflow
```

---

## 為何需要這本

舊兩本（共 756 頁）解決「廣度」與「深度」，這本解決「**速成**」：

| 痛點 | 本書的解法 |
|---|---|
| 兩本書 26 章太多，3 個月才讀完 | 200 頁，3 週可吸收 |
| 概念散落多章節 | 每節都是「一個可帶走的決策框架」 |
| 沒有 AI 協作章節 | Part 3 整章專講 Claude Code 工作流 |
| 案例不夠端到端 | Part 2 三案例 × 12 頁完整演進 |

---

## 結構：1 + 4 + 3 + 工作流

```
Part 0  導論與 SDLC 全景       ~31 slides  (00-prologue + 01-sdlc-overview)
Part 1  四大核心方法論          ~72 slides  (Module A/B/C/D 各 17-19)
Part 2  三大實戰案例            ~42 slides  (電商/直播/RAG 各 14)
Part 3  AI 實戰工作流           ~20 slides  (Claude Code 工作流)
附錄                            ~12 slides  (速查 + 提示詞庫 + 對照)
─────────────────────────────────────
總計                            ~177 slides ≈ 200 頁
```

> **頁數說明**：目標 200 頁，實際 177 slides。差距源於「高密度單頁」策略——
> 每頁壓進完整決策框架而非分散到多頁。閱讀體驗等同 200+ 頁普通講義。
> 若需擴張至嚴格 200 頁，可從 Part 1 各 Module 擴增進階範例（每章 +2-3 頁）。

---

## 11 章索引

### Part 0 · 導論與全景
- [00-prologue/](ppt/00-prologue/) — 為何學、學習路徑、AI 時代的判斷力（5 頁）
- [01-sdlc-overview/](ppt/01-sdlc-overview/) — 9 角色速覽 + AI 可代勞矩陣（20 頁）

### Part 1 · 四大核心方法論
- [02-module-a-requirements/](ppt/02-module-a-requirements/) — 需求量化 → ADR（28 頁）
- [03-module-b-tech-stack/](ppt/03-module-b-tech-stack/) — 技術選型 → 資料策略（28 頁）
- [04-module-c-ilities/](ppt/04-module-c-ilities/) — *-ilities 與分散式五支柱（28 頁）
- [05-module-d-patterns/](ppt/05-module-d-patterns/) — 設計模式與進階架構（26 頁）

### Part 2 · 三大實戰案例
- [06-case-ecommerce/](ppt/06-case-ecommerce/) — 電商秒殺（12 頁）
- [07-case-livestream/](ppt/07-case-livestream/) — 即時直播 / IM（12 頁）
- [08-case-rag/](ppt/08-case-rag/) — RAG / AI 應用平台（12 頁）

### Part 3 · AI 實戰工作流
- [09-ai-workflow/](ppt/09-ai-workflow/) — Claude Code 在系統設計的高槓桿用法（24 頁）

### 附錄
- [90-appendix/](ppt/90-appendix/) — 速查卡、提示詞庫、詞彙表、延伸閱讀（5 頁）

---

## 三種閱讀路徑

| 路徑 | 對象 | 建議讀法 |
|---|---|---|
| **A · 速成** | 已會 code，趕進度 | Part 0.1-0.3 → Part 1 → Part 2 (~3 週) |
| **B · 工作流** | 想立刻把 AI 用得更深 | Part 3 → Part 2 (~3 天) |
| **C · 全程** | 想當扎實架構師 | Part 0 → 1 → 2 → 3 → 附錄 (~4 週) |

---

## 與舊兩本的關係

| 場景 | 翻哪本 |
|---|---|
| 速成、要可帶走的決策框架 | **本書**（200p） |
| 想看角色全景與職涯地圖 | `software_develop_journey/`（384p） |
| 想深挖架構模式、技術細節 | `software_architect/`（372p） |

每章頁尾標註 `📘 想深入 → 翻 X` 指引。

---

**v0.1 · 2026**
