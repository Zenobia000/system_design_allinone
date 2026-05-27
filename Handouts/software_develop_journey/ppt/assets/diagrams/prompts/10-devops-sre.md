# Ch.10 DevOps / SRE · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/10-devops-sre/`

**本章圖像總覽**：2 張 · P1 × 1（Hero）· P2 × 1（mental model）· A × 1 · B × 1

---

## Image 01 · Hero · DevOps/SRE 章首（物業 + 24h 保全 + 消防）

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `10-devops-sre/00_overview.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/10-devops-sre/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a property management control room located in the basement / management floor of a tall building. The room is filled with continuous operations infrastructure: a wall of 24-hour security monitoring panels showing live CCTV feeds from multiple floors, a fire safety dashboard with green/yellow/red indicator lights and a sprinkler-system schematic, an intercom system with several handsets, and a small map of the entire building floor plan with sensor dots. Multiple professional staff figures are visible in shift rotation: one operator seated at the monitoring wall watching feeds, one walking the floor with a flashlight and walkie-talkie, one inspecting a fire extinguisher cabinet on the wall, and a small "shift change" board behind them showing 3 names with arrows indicating rotation. A wall clock prominently shows "03:14 AM" — emphasizing continuous round-the-clock operation. Outside the control room window, the rest of the building sleeps; only this room stays awake.
  Composition: control room interior occupying full frame; monitoring wall on left wall; fire safety panel on right wall; 3 staff figures distributed across the room in different activities; shift rotation board upper-right; wall clock prominently visible; subtle window glimpse of dark building behind; ample whitespace upper-left for title; warm interior lamp light contrasting with cool exterior darkness implied.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: DevOps/SRE 的母模板比喻是「物業管理 + 24h 保全 + 消防」——絕對不是一次性派工的水電工。要傳達「continuous operations」這個本質：輪班、24 小時、監控、告警、應變。「03:14 AM」的時鐘 + 「shift change」交接表是關鍵 visual cue，避免讓人誤以為是 one-time 任務。

---

## Image 02 · Mental Model · 物業 / 保全 / 消防 三重身份

- **Type**: B · 概念隱喻
- **Priority**: P2
- **Slide**: `10-devops-sre/01_outputs.md` · 第 2 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/10-devops-sre/01_property_management.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration showing three side-by-side panels, each featuring the SAME DevOps/SRE figure switching between three hats / roles. PANEL 1 "物業管理 · Property Manager": the figure wears a clean blazer, holding a clipboard with a CI/CD pipeline schematic on it (rows of build → test → deploy stages), inspecting a pipe-like infrastructure on the wall, signing off a release form. PANEL 2 "24h 保全 · Security Guard": the SAME figure now wears a security uniform vest, standing in front of a monitoring wall with alerting dashboards (small graph spikes, red/yellow/green status dots, a beeping alert icon), one hand on a walkie-talkie reporting an anomaly. PANEL 3 "消防 · Firefighter": the SAME figure now wears a fire-response jacket and helmet, holding a fire extinguisher, actively responding to a small smoke plume coming from a server icon labeled "Incident", with a runbook open at their feet. Three small hats / icons float subtly above each panel indicating the role-switch; thin vertical dividers separate the panels; the figure's face stays consistent across all three for clear continuity.
  Composition: three equal vertical panels of 33% each; same figure in three different costumes/roles; consistent eye level across panels; small role label captions at top of each panel; thin vertical dividers; ample whitespace below for explanatory text; warm consistent lighting across all three panels.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 把 DevOps/SRE 的「三重身份」一次說清楚：日常的物業管理（CI/CD、release management）、隨時待命的保全（monitoring、alerting）、突發應變的消防（incident response、runbook）。同一個人在三個 panel 換三套衣服是關鍵——強調「不是三個職位，是同一個角色的三種模式」。
