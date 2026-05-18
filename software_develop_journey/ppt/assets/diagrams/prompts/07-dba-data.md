# Ch.7 DBA · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/07-dba-data/`

**本章圖像總覽**：2 張 · P1 × 1（Hero）· P2 × 1（mental model）· A × 1 · B × 1

---

## Image 01 · Hero · DBA 章首（地基 + 水塔 + 管線總圖）

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `07-dba-data/00_overview.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/07-dba-data/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration showing a detailed cross-section view of a tall building's foundation level: deep reinforced concrete piles sunk far into the bedrock, a large cylindrical water tower mounted on the upper-right, and a comprehensive network of plumbing pipes branching out horizontally and vertically with labeled control valves, pressure gauges, and flow meters. In the center foreground stands a single professional DBA figure in technical attire (clean overall + hard hat + safety glasses), holding a clipboard and operating a central control panel with dials and indicator lights; behind them a wall-mounted schematic shows the entire pipe network as a circulatory map. The figure is clearly an engineer managing a complex utility lifeline — not a warehouse worker or a casual storeroom keeper. Faint database cylinder icons and index trees are subtly embedded within the pipe network, suggesting that the plumbing is also a data system.
  Composition: building cross-section spanning full frame, foundation level occupying lower 60%; water tower upper-right; central control panel + DBA figure at frame center; pipe network radiating outward with clear hierarchy; ample whitespace upper-left for title overlay; warm directional light from upper-right; technical sketch feel with annotated callouts.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: DBA 的母模板比喻是「地基 + 水塔 + 管線總圖」——絕對不是倉管或倉庫管理員。要傳達「資料是建物命脈」這個層次，圖中所有元素（地基、水塔、管線、控制台）都是維繫整棟建築運作的關鍵基礎設施。資料庫圖示（cylinder、index）必須隱約融入管線網路，暗示「管線即資料流」。

---

## Image 02 · Mental Model · 資料是建物命脈

- **Type**: B · 概念隱喻
- **Priority**: P2
- **Slide**: `07-dba-data/01_outputs.md` · 第 2 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/07-dba-data/01_data_lifeline.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration showing a vertical cross-section of a multi-story building (5-6 floors visible), with a central reservoir/water tank at the basement level connected to vertical riser pipes that branch out horizontally on every floor. Each floor is labeled with a different application service name (e.g., "會員 Service", "訂單 Service", "金流 Service", "推薦 Service", "報表 Service"), and on each floor the pipes feed small consumer stations (taps, valves, gauges) where tiny figures use the water/data. The pipes are drawn with clear flow direction arrows; some pipes are thicker (hot path / high traffic), some are thinner (analytical / cold path); a few backflow arrows show data being returned for write-back. The central reservoir is labeled subtly as a database cylinder. The whole image emphasizes that one shared underground source feeds every floor above.
  Composition: vertical building cross-section taking full frame height; basement reservoir at bottom 20%; 5-6 floors stacked above, each clearly labeled; pipe network running vertically as the spine and horizontally on each floor; flow direction arrows in warm orange; ample whitespace on left side for explanatory captions; technical schematic feel.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 把「資料就是大樓的水電命脈」這件事視覺化——任何一層應用（service）都要從同一個地下水源（資料庫）拿水。當地基的水管漏了，整棟樓所有樓層同時停水。這張圖配合 slide 上「資料一致性 / schema 變更 / migration」的論述使用。
