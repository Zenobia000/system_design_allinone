---
title: "UX 設計"
title_en: "UX Designer"
slug: "ux"
num: "04"
hook: "讓使用者真的能完成任務"
hires_for: "在動工前就驗證使用者卡在哪、為什麼卡"
fired_when: "只畫 happy path、不畫 error/empty/loading"
ai_leverage: "用 Claude 從 usability test 錄影摘要痛點、生 task flow 草稿"
art: "/generated/role-hero-ux.png"
source: "deep-research-report.md §UX"
---

## 這個角色做什麼

**UX 不是畫圖的，是研究使用者怎麼想、怎麼卡的。** 從 journey、user flow、IA、wireframe、prototype 到 usability test，整條鏈都在驗證「使用者真的能完成這個任務嗎」。

**核心**：在高保真 UI 之前先把流程跑通。錯誤路徑、空狀態、退件流程比 happy path 更難。

## 主要產出

- **User Journey** — 跨 touchpoint 的全景圖
- **User Flow** — 任務拆步驟、分支、錯誤、成功路徑
- **Wireframe / Prototype** — 低保真先驗證流程
- **Usability Report** — 假設 vs 實測結果

## 跟誰對接

- **上游接：** PM 的目標、研究資料、現有痛點數據
- **下游交：** Flow 給 UI/FE/Mobile；usability findings 給 PM
- **常衝突：** 跟 PM（時程 vs 研究深度）、跟工程（理想 flow vs 技術限制）

## 同理心無法被 prompt 出來

**AI 能生 wireframe，但生不出「為什麼這個使用者按了 3 次還是放棄」。** 觀察、訪談、共感力，這幾件事 AI 還是最弱的環節。

加速範例：`基於這 10 段 usability test 逐字稿，把使用者卡點按頻率排序`。

## 何時該招這個角色

**做 B2C 產品、或 B2B 但使用者抱怨多** 時，沒 UX 會卡在「工程做完了，但沒人用」。

---

> Source: deep-research-report.md §UX
