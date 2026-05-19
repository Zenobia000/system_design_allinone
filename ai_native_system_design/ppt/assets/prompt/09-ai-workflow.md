# Part 3 · AI 實戰工作流 · 圖像 Prompts

> Style guide: [`./0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md)
> Save images to: `openslide/slides/09-ai-workflow/assets/`

**本章圖像**：3 張 · P2 × 3

---

## Image 01 · 5 種高槓桿用法 Pentagon

- **Type**: E · Pentagon Matrix
- **Priority**: P2
- **Save as**: `openslide/slides/09-ai-workflow/assets/W_5_uses.png`
- **Used in**: 09 P03
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual matrix diagram in textbook / consulting style. Flat 2D, NO 3D, NO cartoon.

  Theme: Claude Code's 5 high-leverage uses in system design, shown on a 2D matrix.

  Background: warm cream #F5F1E8.

  Layout: 5 rounded rectangle cards arranged in a Pentagon pattern, each labeled:

  1. (top) 'ADR Generation / ADR 生成'
     Sub: 'Feed NFR → Get options + recommendation'
     Leverage: '10×'
     Color: terracotta #D97757

  2. (top-right) 'Architecture Review / 架構審查'
     Sub: 'Feed diagram → Find SPOF / bottlenecks'
     Leverage: '5×'
     Color: olive #A1813F

  3. (bottom-right) 'PoC Acceleration / PoC 加速'
     Sub: 'Feed spec → Get runnable code'
     Leverage: '20× (highest)'
     Color: sage green #5B9770

  4. (bottom-left) 'Doc Sync / 文檔同步'
     Sub: 'Feed diff → Update docs/tests/diagrams'
     Leverage: '8×'
     Color: slate teal #5B7570

  5. (top-left) 'Tech Selection Debate / 選型辯論'
     Sub: 'Let AI argue opposite side'
     Leverage: '4×'
     Color: warm brown #8B6F47

  Center: large Claude robot icon labeled 'Claude Code'.

  Lines: dark brown #2A2520, 2px from center to each card.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 02 · Context 5 段結構

- **Type**: E · Stack Diagram
- **Priority**: P2
- **Save as**: `openslide/slides/09-ai-workflow/assets/W_context_5parts.png`
- **Used in**: 09 P04
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook style. Flat 2D, NO 3D, NO cartoon.

  Theme: 5-part Context structure for prompting AI in architecture decisions.

  Background: warm cream #F5F1E8.

  5 vertical layered rectangles stacked (like a structured form), each is one Context part:

  1. 'Goal / 目標' - terracotta #D97757
     Sub: '想達成什麼業務目標?'
     Example: '「秒殺活動不超賣」'

  2. 'Constraints / 約束' - olive #A1813F
     Sub: '預算、團隊、既有架構'
     Example: '「team 5 人會 Go, 預算 $5K/月」'

  3. 'NFR / 非功能需求' - sage green #5B9770
     Sub: '量化指標'
     Example: '「100K req/s, P99 < 500ms」'

  4. 'Existing / 現有架構' - slate teal #5B7570
     Sub: '現有系統與限制'
     Example: '「已用 PG, 不能換」'

  5. 'Asks / 期望輸出' - warm brown #8B6F47
     Sub: '你要 AI 回什麼?'
     Example: '「列 3 方案 + ADR 模板」'

  Right side label: 'Stack into prompt / 堆疊成 prompt'.

  Below all 5 blocks: large arrow pointing to a Claude robot icon labeled 'Claude Code'.

  Bottom annotation: '好的 prompt 結構 > 好的 prompt 詞 / Structure beats wording'.

  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 03 · PoC 7 步閉環

- **Type**: E · Circular Loop
- **Priority**: P2
- **Save as**: `openslide/slides/09-ai-workflow/assets/W_poc_loop.png`
- **Used in**: 09 P06
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook style. Flat 2D, NO 3D, NO cartoon.

  Theme: PoC iteration loop showing 7-step closed cycle.

  Background: warm cream #F5F1E8.

  Large circular loop with 7 numbered nodes:

  1. 'Write ADR + API Spec / 寫 ADR' (you 30min) - terracotta
  2. 'AI Generates PoC / AI 生骨架' (AI 5min) - olive
  3. 'Run Happy Path / 跑通主流程' (you+AI 30min) - sage
  4. 'AI Adds Edge Cases / 補 5 case' (AI 5min) - olive
  5. 'Load Test + Verify NFR / 壓測' (you 1hr) - terracotta
  6. 'Assumption Broken / 假設破滅' (you) - slate teal
  7. 'Update ADR / 改 ADR' (loop back to 1) - terracotta

  Arrows clockwise forming the loop, with #7 arrow leading back to #1.

  Center text: 'PoC Loop / 假設驗證閉環' with subtitle 'PoC 的價值是驗證假設，不是拿到 code'.

  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```
