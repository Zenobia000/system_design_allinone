# Braindump · 200 頁速成版的源思想

> 這份文件是本書所有內容的母本。
> 每張 slide 的 `> Source:` 都會指回這份文件的某個 §。

---

## §核心金句

- 「AI 把實作能力變成 commodity，把判斷能力變成稀缺。」
- 「Trade-off 永遠是人做的，AI 只能列出選項。」
- 「不要問 AI 能不能做，要問你能不能把 context 餵清楚。」
- 「先設計 ADR，再讓 AI 寫 code。順序錯了就是返工。」
- 「『速成』不是『淺』，是『拿掉不會用到的』。」

---

## §200 頁的取捨原則

**保留**：可重複套用的決策框架、Trade-off 的判斷依據、AI 取代不了的核心判斷力。
**捨棄**：可被 AI 即時生成的（boilerplate、CI/CD 樣板、API 文件骨架）、可在現場 google 的（套件 API、語法）。
**外推**：純角色職責描述、團隊溝通技巧、軟實力 → 翻舊書。

---

## §學習路徑分層

- **新手路徑（80h）**：Part 0 全讀 → Part 1 順讀 → Part 2 案例 1 → Part 3 W.1-W.4
- **工程師升級（40h）**：Part 0.1-0.3 → Part 1 → Part 2 全部 → Part 3 W.3-W.6
- **資深架構師（15h）**：直接 Part 1 + Part 3，挑案例補

---

## §需求量化的核心框架

商業目標 → 使用者場景 → 系統行為 → **可量測指標** → SLO/SLI → 容量 → 技術選項。

模糊詞翻譯：
- 「快」→ P50 / P99 latency target
- 「穩」→ availability % (SLA), error budget
- 「省」→ TCO / unit economics
- 「彈性」→ scale-out factor, time-to-scale
- 「即時」→ end-to-end lag budget

---

## §AI 取代不了的核心判斷

- 商業假設正確性（PM）
- 使用者真實痛點（UX）
- 業務規則 edge case（SA）
- 非功能風險取捨（Architect）
- 模組邊界劃分（SD）
- 資料一致性決策（DBA）
- 技術債選擇（Dev）
- 「對」的定義（QA）
- SLO 與成本平衡（DevOps）

---

## §AI 可以代勞的工作（學員只需懂原理）

- Code boilerplate / scaffold
- 文檔、註解、changelog
- 測試案例生成（人定 invariant）
- API spec 從 schema 反推
- 監控設定範本
- 架構圖 PlantUML / Mermaid 轉換
- 翻譯：規格 ↔ 實作 ↔ 文件 ↔ 投影片

---

## §三大案例選擇邏輯

| 案例 | 代表類型 | 核心挑戰 |
|---|---|---|
| 電商秒殺 | 高一致性 OLTP | 庫存準確 + 削峰 |
| 即時直播 / IM | 高 fanout、低延遲 | WebSocket + 訊息佇列 |
| RAG / AI 平台 | AI 整合、向量檢索 | LLM 整合 + 成本控管 |

三個共同呈現 MVP → 10K QPS → 100K QPS 的演進。

---

## §AI 工作流的五種高槓桿用法

1. **ADR 生成**：餵 NFR + 約束 → 拿到備選方案表 + 推薦 + 風險
2. **架構審查**：餵架構圖 → 找 SPOF / 容量瓶頸 / 監控缺口
3. **PoC 加速**：餵 API spec → 拿到可跑的最小驗證
4. **文檔同步**：餵 diff → 拿到更新後的文件 / 圖 / 測試
5. **技術選型辯論**：讓 AI 扮演對立面，找出未考慮的反方論點

---

## §AI 工作流的 7 個常見地雷

1. AI 過度自信（編出不存在的 API）
2. AI 不知公司既有約束（不知道你用的版本 / SaaS 限制）
3. AI 把問題範圍縮小回答（漏掉 edge case）
4. AI 反向偏見（會避開「最佳」答案以免顯得武斷）
5. AI 對成本 / 延遲 不敏感（會推薦最高品質方案）
6. AI 無法處理「公司政治」決策
7. AI 不會主動問澄清問題（除非設定）

對應策略：人工 review checklist、Context 結構化（約束 / 偏好 / 既有架構）、強制要 trade-off 表。

---

## §引用對照（舊→新）

對應對照詳見 `90-appendix/04_mapping.md`。
