# Module A · 需求量化 · 圖像 Prompts

> Style guide: [`./0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md)
> Save images to: `openslide/slides/02-module-a-requirements/assets/`

**本章圖像**：1 張 · P1 × 1

---

## Image 01 · 7 步架構流程環

- **Type**: C · Process Chain（環狀流程）
- **Priority**: P1
- **Save as**: `openslide/slides/02-module-a-requirements/assets/A_7step_process.png`
- **Used in**: 02-A P05
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook / consulting style. Flat 2D, NO 3D, NO cartoon.

  Theme: 7-step architecture process shown as circular workflow.

  Background: warm cream #F5F1E8.

  Large circular ring with 7 numbered nodes (rounded rectangles) arranged clockwise:

  1. 'Problem / 問題理解' (terracotta #D97757)
  2. 'NFR / 量化指標' (terracotta)
  3. 'Constraints / 約束盤點' (olive #A1813F)
  4. 'App Type / 應用類型' (olive)
  5. 'Options / 方案發散' (sage green #5B9770)
  6. 'Trade-off / 取捨評估' (sage)
  7. 'ADR / 決策落定' (slate #5B7570)

  Arrows along the ring showing flow direction (clockwise).

  In center: large text '7 Steps / 7 步流程' with subtitle '問題 → 決策 / Problem to Decision'.

  Each node has a small descriptive label below:
  1. '重述問題 + 利害關係人'
  2. '翻譯模糊詞 → SLI'
  3. '預算/團隊/既有'
  4. 'CRUD/即時/AI/批次'
  5. '至少 3 個架構選項'
  6. '量化比較表'
  7. '寫成可簽核文件'

  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```
