# 早期 Hero 圖 Prompts（v0 · 已被 v1/v2 取代部分）

> 12 張章節 hero 圖（封面 + Module/Case 開章視覺）
> 風格：anthropic isometric illustration，較抽象、無雙語標籤
> 仍在使用（作為 ChapterDivider 配圖），但不符合 v1 顧問風格守則
> 若要重生為「顧問風格 + 雙語標籤」，請改寫 prompt 套 `0_STYLE_GUIDE.md` 範本

---

## 通用 v0 風格基底（已過時，僅作存查）

```
anthropic-design-style isometric illustration,
warm sand background (#F5F1E8),
muted orange accent (#D97757), dark brown text color (#2A2520),
clean minimalist editorial style, no text, no words, no labels,
soft shadows, generous whitespace, high quality print poster aesthetic
```

**已知問題**：「no text / no labels」導致圖太抽象，與內容對照差。v1 起改為要求雙語標籤。

---

## 12 張 v0 Hero 清單

| 檔名 | 用途 | 用於 | 主題 |
|---|---|---|---|
| `00_cover_hero.png` | 封面 | 00-prologue P01 | 機械手 + 人類手相握，AI 協作 |
| `00_judgment_vs_commodity.png` | 對比插畫 | 00-prologue P03 | 機器產 commodity vs 思考者天秤 |
| `01_building_metaphor.png` | 蓋大樓比喻 | 01-sdlc P02 | 半成大樓 + 9 角色小人 |
| `02_module_a_hero.png` | Module A 開章 | 02-A P01 | 漏斗 — 模糊雲變整齊方塊（NFR 量化） |
| `03_module_b_hero.png` | Module B 開章 | 03-B P01 | DB 罐子決策樹 + 放大鏡天秤 |
| `04_module_c_hero.png` | Module C 開章 | 04-C P01 | 五根支柱支撐雲端 |
| `05_module_d_hero.png` | Module D 開章 | 05-D P01 | 單體變樂高微服務 |
| `06_case_ecommerce_hero.png` | Case 1 開章 | 06 P01 | 倒計時鐘 + 購物車 + 閃電 |
| `07_case_livestream_hero.png` | Case 2 開章 | 07 P01 | 攝影機 + 訊息泡泡放射 |
| `08_case_rag_hero.png` | Case 3 開章 | 08 P01 | 大腦 + 多本書 + 搜尋光標 |
| `09_ai_workflow_hero.png` | Part 3 開章 | 09 P01 | 工程師 + AI 助理共看藍圖 |
| `09_director_mindset.png` | Part 3 心態頁 | 09 P11 | 指揮家指揮 AI 機器人樂團 |

---

## Module C v0 圖（已被 v2 取代但保留）

| 檔名 | 為何被取代 | 對應 v2 |
|---|---|---|
| `C_five_pillars.png` | 古典希臘柱、無標籤 | `C_five_pillars_v2.png` |
| `C_ilities_radial.png` | 純抽象、無標籤 | `C_ilities_radial_v2.png` |
| `C_qps_evolution.png` | 構圖混亂 | `C_qps_evolution_v2.png` |
| `C_cache_patterns.png` | 無中文標籤 | `C_cache_patterns_v2.png` |
| `C_reliability_chain.png` | 無中文標籤 | `C_reliability_chain_v2.png` |
| `C_observability_mlt.png` | 無中文標籤 | `C_observability_mlt_v2.png` |

舊版 PNG 仍存在於 `04-module-c-ilities/assets/`，但 React 已切到 v2 import。

---

## v0 vs v1 規格差異

| 維度 | v0（hero / Module C v1） | v1（30 張顧問風） |
|---|---|---|
| Style 修飾詞 | "anthropic isometric, soft shadows" | "AWS Well-Architected, flat 2D" |
| 標籤 | NO text NO labels | **必要 · 中英雙語** |
| 構圖 | isometric 3D 等軸 | flat 2D 平面 |
| 元件形狀 | 自由 | 強制分類（圓柱/圓角矩形/六角/雲） |
| 教學定位 | 視覺裝飾 | 技術文件配圖 |
| 對照投影片內容 | 弱 | 強（標籤對照 slide 總結） |

**未來方向**：12 張 hero 仍可保留作章首裝飾；Module C v1 已淘汰；新生圖一律遵循 v1 顧問風格。
