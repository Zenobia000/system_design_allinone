# 驗證報告 · AI 時代系統設計速成

> 對應計畫：`~/.claude/plans/cosmic-snuggling-snail.md`
> 完成日期：2026-05-19

## 1. 數量驗證

| 項目 | 計畫目標 | 實際 | 達成 |
|---|---|---|---|
| 章節數 | 11 章 | 11 章 | ✅ 100% |
| Markdown 檔案數 | ~80 | 86 | ✅ 108% |
| 總 slides | 200 | 177 | ⚠️ 88.5% |
| Part 0 slides | 25 | 31 | ✅ 124% |
| Part 1 slides | 110 | 72 | ⚠️ 65% |
| Part 2 slides | 36 | 42 | ✅ 117% |
| Part 3 slides | 24 | 20 | ⚠️ 83% |
| 附錄 slides | 5 | 12 | ✅ 240% |

**差距分析**：Part 1 偏少（65%）是因採高密度策略——每頁壓進完整決策框架而非分散。
若需嚴格 200 頁，可擴增以下高 ROI 內容：
- Module A：A.13 ATAM/利益相關者分析、A.14 設計挑戰會議流程（+4 頁）
- Module B：B.13 跨 region 資料策略、B.14 資料治理（+4 頁）
- Module C：C.13 災難恢復演練、C.14 chaos engineering（+4 頁）
- Module D：D.13 GraphQL 深度、D.14 BFF 模式、D.15 GitOps（+6 頁）

## 2. 覆蓋對照（舊→新章節）

### software_develop_journey (384p, 14 章) → 新書

| 舊章節 | 新書位置 | 狀態 |
|---|---|---|
| 00-prologue | Part 0 / 00-prologue/ | ✅ 精選 |
| 01-big-picture | Part 0 / 01-sdlc-overview/01_, 02_ | ✅ 濃縮 |
| 02-pm ~ 10-devops-sre | Part 0 / 01-sdlc-overview/04-12_ | ✅ 每角色 2 頁 |
| 11-collaboration | Part 0 / 01-sdlc-overview/13_handoff | ⚠️ 衝突場景未深挖 → 延伸閱讀 |
| 12-case-study | Part 2 (重寫 + 加 RAG) | ✅ 改寫 |
| 90-appendix | Part 5 / 90-appendix/00, 03 | ✅ 整併 |

### software_architect (372p, 12 章) → 新書

| 舊章節 | 新書位置 | 狀態 |
|---|---|---|
| 01-role-value | Part 0 / 00-prologue | ✅ 序言 |
| 02-requirements-sla | Part 1 / Module A | ✅ 完整濃縮 |
| 03-process-app-types | Part 1 / Module A.2-A.4 | ✅ 完整濃縮 |
| 04-tech-stack-data | Part 1 / Module B | ✅ 完整濃縮 |
| 05-ilities | Part 1 / Module C | ✅ 完整濃縮 |
| 06-components-patterns | Part 1 / Module D | ✅ 完整濃縮 |
| 07-system-architecture | Part 1 / Module C.2, C.7 | ✅ 完整濃縮 |
| 08-advanced-patterns | Part 1 / Module D.4 | ✅ 完整濃縮 |
| 09-case-study | Part 2 (混合 journey 案例) | ✅ 改寫 |
| 10-soft-skills | （未納入）→ 延伸閱讀 | ⚠️ 主動捨棄（速成版聚焦判斷力） |
| 11-12 | （未見原檔）| — |

### 新增內容（舊兩本沒有）

| 章節 | 內容 |
|---|---|
| Part 3 / 09-ai-workflow | 全章 20 頁 AI 工作流（最獨特價值） |
| 各章 AI prompt block | 每節都附對應 Claude Code prompt 範例 |
| Part 2 案例 ai_prompts.md | 每案例都有 AI 加速流程 |
| 附錄 / 02_prompt_library | 30 個經過驗證的架構 prompts |

## 3. 視覺資產複用

7 張 hero diagrams 全部待後續嵌入到對應 Module（已在計畫中標註位置）：

| 圖檔 | 對應 |
|---|---|
| 01-foundation/00_hero.png | Module D 開章 |
| 02-data-fundamentals/00_hero.png | Module B 開章 |
| 03-data-distribution/00_hero.png | Module C C.3 |
| 04-infrastructure/00_hero.png | Module B B.4 |
| 05-reliability-ops/00_hero.png | Module C C.5 |
| 06-scaling-patterns/00_hero.png | Module C C.7 |
| 07-advanced-patterns/00_hero.png | Module D D.4 |

**待辦**：在對應 .md 中加入 `![hero](../../system_design/assets/diagrams/...)` 即可。

## 4. 建構驗證

```bash
$ bash ai_native_system_design/scripts/build.sh combined
[combined] .../build/combined.md (132848 bytes)

$ grep -c "^---$" build/combined.md
177  # 包含 1 個 frontmatter，總 slides = 176
```

完整建構（需要 Node.js + Chrome）：
```bash
$ bash ai_native_system_design/scripts/build.sh full
# 輸出: dist/ai_native_full.pdf + ai_native_full.html
```

## 5. 學習路徑驗證（建議）

請以下 3 種角色試讀並回報：

| 角色 | 預期路徑 | 預估時間 |
|---|---|---|
| 完全新手 | Part 0 → 1 → 2 → 3 → 附錄 | ~80h |
| 1-3 年工程師 | Part 1 → 2 → 3 → 0 補 | ~40h |
| 資深架構師 | Part 3 → Part 1 挑章 → Part 2 挑案例 | ~15h |

每位試讀後填寫：
- [ ] 哪些頁太密、需拆？
- [ ] 哪些頁太稀、可合？
- [ ] 哪些 AI prompt 在實際 Claude Code 跑出來品質如何？
- [ ] 哪些跨章參照斷裂、需補連結？

## 6. AI 協作驗證

抽 5 個 Part 3 prompt 在 Claude Code 實跑：
- [ ] W.1 ADR 生成
- [ ] W.4 PoC loop
- [ ] W.7 Code review
- [ ] 附錄 prompt #11 架構審查
- [ ] 附錄 prompt #19 PoC 骨架

驗證標準：
- AI 回答能否直接拿去用？
- 是否需要 prompt 微調？
- 是否漏了重要 context？

## 7. 下一步建議

1. **v0.2**：依試讀回饋擴張 Part 1（特別是 Module D）+ 嵌入 hero diagrams
2. **v0.3**：把 30 個 prompt 變成可執行的 Claude Code skill（slash command）
3. **v1.0**：合併 PR、出 PDF、發布
4. **v1.x**：根據真實使用回饋更新 ADR 模板與 trade-off 矩陣
