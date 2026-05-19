# 圖片規劃 · AI 時代系統設計速成

> 共 **18** 張圖。優先級 P0 = 必生 (12)、P1 = 加分 (6)。
> 統一風格：anthropic 暖沙色背景 `#F5F1E8`、橘色 accent `#D97757`、低飽和、不要任何文字。
> 命名：`{chapter}_{slot}_{slug}.png` · 存於 `ppt/assets/`

---

## 風格基底（每個 prompt 都會加）

```
anthropic-design-style isometric illustration,
warm sand background (#F5F1E8),
muted orange accent (#D97757), dark brown text color (#2A2520),
clean minimalist editorial style, no text, no words, no labels,
soft shadows, generous whitespace, high quality print poster aesthetic
```

---

## P0 · 必生（12 張 · 主要章節 hero）

### 封面 + Prologue
| # | 檔名 | 用途 | Prompt 主題 |
|---|---|---|---|
| 1 | `00_cover_hero.png` | 封面 | 一隻機械手臂與人類手交握，象徵 AI 協作。背景有架構圖元素的抽象線條 |
| 2 | `00_judgment_vs_commodity.png` | 0.1 為何學 | 一台機器在生產「金幣」（commodity），對面一位思考者在做「天秤決策」，對比 |

### Part 0 SDLC
| # | 檔名 | 用途 | Prompt 主題 |
|---|---|---|---|
| 3 | `01_building_metaphor.png` | 蓋大樓 9 角色 | isometric 一棟蓋一半的建築，9 個小人各司其職（設計師、工程師、結構技師等）圍繞 |

### Part 1 四大方法論 hero
| # | 檔名 | 用途 | Prompt 主題 |
|---|---|---|---|
| 4 | `02_module_a_hero.png` | Module A 開章 | 一個漏斗，上方是模糊雲朵（需求），下方流出整齊的方塊（量化指標 SLO） |
| 5 | `03_module_b_hero.png` | Module B 開章 | 多個資料庫罐子排成決策樹形狀，中央有一個放大鏡與天秤 |
| 6 | `04_module_c_hero.png` | Module C 開章 | 五根支柱（pillars）支撐一個發光的雲端，每根柱子有不同的圖標（鎖頭、齒輪等） |
| 7 | `05_module_d_hero.png` | Module D 開章 | 樂高積木組合，從一個單體方塊演變成多個小方塊（微服務） |

### Part 2 三大案例 hero
| # | 檔名 | 用途 | Prompt 主題 |
|---|---|---|---|
| 8 | `06_case_ecommerce_hero.png` | 電商秒殺 | 一個倒計時時鐘、購物車、與一道閃電（peak traffic） |
| 9 | `07_case_livestream_hero.png` | 直播 IM | 一個發光的攝影機與向四面八方放射的訊息泡泡（fanout） |
| 10 | `08_case_rag_hero.png` | RAG | 一個大腦圖案連接著多本書（文件）與一個搜尋光標 |

### Part 3
| # | 檔名 | 用途 | Prompt 主題 |
|---|---|---|---|
| 11 | `09_ai_workflow_hero.png` | Part 3 開章 | 一個工程師坐在桌前，桌上有一個 AI 助理機器人，兩人共同看著一張藍圖 |
| 12 | `09_director_mindset.png` | W.9 心態轉變 | 一位指揮家站在指揮台上，前方是多個 AI 機器人組成的樂團 |

---

## P1 · 加分（6 張 · 重點概念）

| # | 檔名 | 用途 | Prompt 主題 |
|---|---|---|---|
| 13 | `02_nfr_translation.png` | A.1 NFR 翻譯 | 翻譯機器，輸入是「快、穩、省」中文字泡泡，輸出是「P99 < 200ms、99.95%、$/req」量化指標 |
| 14 | `03_cap_triangle.png` | B.3 CAP | 三角形，三個頂點分別是 C、A、P，中間有人在三點之間取捨 |
| 15 | `04_five_pillars.png` | C.2 五支柱 | 五根古典柱子，每根上面分別是：鬆耦合、無狀態、快取、非同步、可觀測 的抽象圖標 |
| 16 | `05_pattern_cards.png` | D.2 模式卡 | 一疊撲克牌風格的設計模式卡片散開，每張有抽象幾何圖案 |
| 17 | `06_seckill_funnel.png` | C1.5 秒殺漏斗 | 一個多層漏斗，從頂部 100K 縮到底部 1K，每層有不同的擋板 |
| 18 | `08_rag_pipeline.png` | C3 RAG pipeline | 由左到右流動的 pipeline：文件 → 切塊 → embedding → 向量資料庫 → LLM → 答案 |

---

## 生成順序

1. **批次 1（P0 covers）**：#1, #2, #3 — 立即視覺品質驗證
2. **批次 2（Module heros）**：#4-7 — Part 1 開章
3. **批次 3（Case heros）**：#8-10 — Part 2 開章
4. **批次 4（Part 3 + 補強）**：#11, #12
5. **P1 視時間補**：#13-18

## 嵌入策略

- 章節 overview (00_overview.md) 在 chapter divider 後加一張全頁 hero
- 關鍵概念頁 (如 C.2 五支柱) 加小圖示輔助 (max-height 300px)
- 封面 (00_cover.md) 用 #1 作為背景或主視覺

## openslide 匯出

每章一個 deck：`software_develop_journey/openslide/` 模式
路徑：`/openslide/slides/{chapter-id}/index.tsx`
複用其 design system + Page components 慣例
