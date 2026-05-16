# Ch.7 · System Architecture · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_architect/ppt/assets/diagrams/07-system-architecture/`

**本章圖像總覽**：4 張 · P1 × 2 · P2 × 2 · A × 1 · B × 1 · C × 2

---

## Image 01 · Hero · 章首封面

- **Type**: A
- **Priority**: P1
- **Save as**: `software_architect/ppt/assets/diagrams/07-system-architecture/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a single monolithic building gradually fragmenting into multiple smaller, well-organized buildings connected by thin lines representing API calls; the transformation flows from left (one big block) to right (many small blocks). On the ground, faint dotted lines connect the buildings to a shared underground utility network (databases, message queues).
  Composition: horizontal flow left-to-right; monolith on left occupying 20%; distributed buildings on right occupying 50%; ample whitespace below for caption area; warm orange accents on the API connection lines.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```

---

## Image 02 · Mental Model · 單體到分散式

- **Type**: B
- **Priority**: P1
- **Save as**: `software_architect/ppt/assets/diagrams/07-system-architecture/00_mental_model.png`
- **Aspect**: 16:9
- **建議用 Excalidraw**：兩欄對照
  - 左欄「單體」：一個 process / 一份 memory / call function / 一份 log / 一個事務
  - 右欄「分散式」：N 個 process / 多份 + 一致性問題 / call API|queue / 多份 + correlation ID / 分散事務 Saga
  - 底部標語：「90% 系統不該主動拆 → 撐不住才拆」

---

## Image 03 · Cache · 四模式對照

- **Type**: C · 對照組合
- **Priority**: P2
- **Slide**: `07-system-architecture/02_cache_queue.md` · Cache 四模式
- **Save as**: `software_architect/ppt/assets/diagrams/07-system-architecture/02_cache_01_patterns.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart LR
  subgraph CA["Cache-aside"]
    A1[App] -.->|讀 miss| C1[Cache]
    A1 --> D1[(DB)]
  end
  subgraph WT["Write-through"]
    A2[App] --> C2[Cache] --> D2[(DB)]
  end
  subgraph WB["Write-back"]
    A3[App] --> C3[Cache] -.->|異步| D3[(DB)]
  end
  subgraph RT["Read-through"]
    A4[App] --> C4[Cache] -->|miss 自動| D4[(DB)]
  end

  classDef app fill:#D97757,stroke:#8B6F47,color:#F5F1E8
  classDef cache fill:#FFE5D0,stroke:#8B6F47,color:#2A2520
  classDef db fill:#F5F1E8,stroke:#8B6F47,color:#2A2520
  class A1,A2,A3,A4 app
  class C1,C2,C3,C4 cache
  class D1,D2,D3,D4 db
```

---

## Image 04 · Correlation ID · 分散式追蹤

- **Type**: C · 序列圖
- **Priority**: P2
- **Slide**: `07-system-architecture/03_logging_monitoring.md` · Correlation ID
- **Save as**: `software_architect/ppt/assets/diagrams/07-system-architecture/03_logging_01_correlation.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
sequenceDiagram
  participant U as User
  participant G as API Gateway
  participant A as Service A
  participant B as Service B
  participant C as Service C
  Note over G: 生 correlation_id = abc123
  U->>G: request
  G->>A: req [abc123]
  A->>B: req [abc123]
  B->>C: req [abc123]
  Note right of A: log abc123
  Note right of B: log abc123
  Note right of C: log abc123 (ERROR!)
  C-->>B: 500
  B-->>A: 500
  A-->>G: 500
  G-->>U: 500
  Note over U,C: grep abc123 → 看到完整 trace
```
