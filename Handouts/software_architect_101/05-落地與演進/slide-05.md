---
chapter: "幕 5：落地與演進"
chapter_id: "05"
chapter_slug: "05-落地與演進"
slide: "5"
title: "白皮書 v5：開發規範"
original_title: "白皮書 v5：開發規範"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v5"
rendering_mode: "image_prompt"
---

# Slide 05 · 白皮書 v5：開發規範

## On-slide Text
- Kicker: `ARTIFACT`
- Progress Pill: `架構白皮書 v5 · 落地與演進`
- Title: 白皮書 v5：開發規範
- Left panel — Project Structure Tree (code-block style):
  ```
  iot-monitor/
  ├── ingest/          # 上報接收
  ├── processor/       # 消費 + 告警
  ├── query/           # Dashboard API
  ├── shared/          # 共用 model/config
  ├── tests/
  ├── .pre-commit-config.yaml
  └── pyproject.toml
  ```
- Right panel — Dev Rules (3 bullets):
  - 分支：GitHub Flow，feature/<name>，PR 合 main
  - Lint：ruff + black，pre-commit hook 自動執行
  - CI：PR 合 main 前必過 lint + unit test
- Version label (bottom-right of content area): `白皮書 v5`

## Beginner Anchor
ingest / processor / query 是同一個 codebase 的三個套件，不是三個微服務——這是幕 3 modular monolith 決策的直接體現。

## Learning Goal
讓學員看到 FastAPI monorepo 的建議專案結構，以及配套的分支策略、Linter、CI Gate 三條規範，能夠立刻套用到 6 人團隊。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v5 · 落地與演進`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for `v5`, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- Left panel (~55% canvas width): Project structure tree block.
  - Block background: `#172A40`, rounded 12 px, Mint `#97E8D6` 1 px border.
  - Block title: `專案結構` in JetBrains Mono / 24 px / Mint `#97E8D6`, with thin Mint top-border inside block.
  - Tree content: JetBrains Mono / 26 px / Warm White `#F4F1EA`, directory names; comments (after `#`) in Noto Sans TC 400 / 26 px / Mint `#97E8D6` (dimmed).
  - Folder icons: thin flat line-art in Mint `#97E8D6`, 20 px, preceding each directory entry.
  - Tree lines and indent symbols (`├──`, `└──`) in JetBrains Mono / Warm White.
- Right panel (~38% canvas width): Dev Rules 3 bullets.
  - Block background: `#172A40`, rounded 12 px, Mint `#97E8D6` 1 px border.
  - Block title: `開發規範` in JetBrains Mono / 24 px / Mint `#97E8D6`.
  - 3 bullet items, each: label (分支 / Lint / CI) in JetBrains Mono / 26 px / Mint `#97E8D6`, colon, then description in Noto Sans TC 500 / 26 px / Warm White.
  - Tool names (ruff, black, GitHub Flow) in JetBrains Mono / Mint `#97E8D6`.
- Version label bottom-right of content area: `白皮書 v5`, JetBrains Mono / 26 px / Mint `#97E8D6`.
- Logo: `logo-light.png`, 64 px height, bottom-right corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "ARTIFACT document slide — FastAPI monorepo project structure tree + dev rules, structured document format (not a node-edge graph). Per DIAGRAM_SPEC, ADR/document artifact pages use image_prompt rendering mode with not_applicable diagram spec."
```

## Logo Assets
此頁面命名 ruff、black 作為工具術語，但不作為品牌 logo 呈現。FastAPI 是本幕 monorepo 的底層框架，可在規範區以文字 pill 呈現，不需 logo strip（logo strip 出現在 slide-06 可觀察性圖頁）。

| 名稱 | Expected Asset Path | 備註 |
|------|---------------------|------|
| FastAPI（選用） | `assets/logos/api/fastapi.svg` | 若需要 logo strip 識別，放規範區下方；否則以文字 pill 替代。`⚠ 素材尚未取得，QA 確認` |

## Technical Flow Details

### FastAPI Monorepo 結構說明

本頁展示的專案結構對應幕 3 的 modular monolith 決策：

```
iot-monitor/
├── ingest/               # Python package：接收設備上報
│   ├── __init__.py
│   ├── main.py           # FastAPI app，POST /v1/readings
│   └── kafka_producer.py # Kafka Producer 封裝
├── processor/            # Python package：Kafka Consumer + 告警
│   ├── __init__.py
│   ├── consumer.py       # Consumer Group，at-least-once
│   └── alert.py          # 閾值比對 + 觸發 Alert Service
├── query/                # Python package：Dashboard 查詢 API
│   ├── __init__.py
│   ├── main.py           # FastAPI app，GET /v1/devices/.../readings
│   └── cache.py          # Redis cache-aside 封裝
├── shared/               # 共用程式碼，三個套件都引用
│   ├── __init__.py
│   ├── models.py         # Pydantic models：Reading, Alert, Threshold
│   ├── config.py         # 環境變數設定（Kafka URL, DB URL, Redis URL）
│   └── db.py             # TimescaleDB 連線與 hypertable 操作
├── tests/                # 所有單元測試與整合測試
│   ├── ingest/
│   ├── processor/
│   └── query/
├── .pre-commit-config.yaml   # ruff + black 自動執行於 git commit 前
├── pyproject.toml            # 統一 dependency 管理（Poetry 或 pip）
└── Makefile                  # make init / make test / make dev
```

**為什麼是 monorepo 而非多 repo：**
- 三個套件共享 `shared/` 中的 Pydantic models 和設定，避免型別定義重複
- 跨套件重構（如修改 Reading model）一個 PR 就能完成，無需跨 repo 協調
- 6 人團隊，一個 repo 的 code review 效率遠高於三個 repo

**為什麼不是微服務：**
- 一致幕 3 決策：Ingest API、Processor、Query API 可以共用同一個 codebase
- 部署時可以從同一個 repo 建三個 Docker image（每個 package 一個 Dockerfile），不需要強制單一部署

### 開發規範詳細說明

**分支策略：GitHub Flow**
- 主要分支：`main`（唯一長生命週期分支）
- 功能分支：`feature/<name>`，短命（< 2 天），完成後立即 PR 合 main
- 不使用 develop/release 分支（Git Flow 複雜度超出 6 人團隊需要）
- Commit message 格式：Conventional Commits（`feat:`, `fix:`, `docs:` 等）

**Linter / Formatter**
- `ruff`：快速 Python linter（替代 flake8 + isort），設定在 `pyproject.toml` 的 `[tool.ruff]` 段落
- `black`：Python formatter，設定在 `pyproject.toml` 的 `[tool.black]` 段落，line-length = 88
- `.pre-commit-config.yaml` 配置 ruff + black 在 `git commit` 前自動執行（pre-commit hook）
- 新成員只需 `pip install pre-commit && pre-commit install` 一次，後續自動執行

**CI Gate（GitHub Actions 或 GitLab CI）**
- Trigger：PR 建立或更新時
- Steps：`ruff check . && black --check . && pytest tests/ -v`
- 結果：全部通過才允許 merge to main；任一失敗則 PR 標記 fail，block merge
- 覆蓋率要求（可選）：`pytest --cov=. --cov-fail-under=70`

**Scaffold（make init）**
- `Makefile` 提供 `make init`：建立虛擬環境、安裝 dependencies、設定 pre-commit hook
- 新成員流程：`git clone <repo> && make init` → 5 分鐘內可執行 `make dev`（啟動本地開發環境）

## VCRE Scorecard
not_applicable — this is an artifact slide, not a trade-off decision slide. Trade-off scoring for monolith vs microservices is on slide-08.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v5 · 落地與演進" Mint text on Deep Navy, rounded capsule 34 px. Title "白皮書 v5：開發規範" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Content split into left (~55%) and right (~38%) panels, with 16 px gap. Left panel: code-block card with #172A40 background, Mint #97E8D6 1 px border, rounded 12 px. Title "專案結構" JetBrains Mono 24 px Mint. Directory tree in JetBrains Mono 26 px Warm White — showing iot-monitor/ with subfolders ingest/, processor/, query/, shared/, tests/, .pre-commit-config.yaml, pyproject.toml; inline comments after # in dimmed Mint #97E8D6 color; small flat folder icons in Mint preceding each folder. Right panel: rules card with #172A40 background, Mint 1 px border, rounded 12 px. Title "開發規範" JetBrains Mono 24 px Mint. Three labeled bullets: "分支：", "Lint：", "CI：" labels in JetBrains Mono Mint, descriptions in Noto Sans TC 500 26 px Warm White, tool names in JetBrains Mono Mint. Bottom-right of content area: "白皮書 v5" JetBrains Mono 26 px Mint. Bottom-right canvas: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White. Structured document layout, no diagrams, no gradients, no 3D.

## Negative Prompt
- Do not invent extra files, directories, or rules beyond those defined in On-slide Text.
- Do not generate fake, approximate, or AI-invented brand logos inside panels.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the "白皮書 v5" version label.
- Do not add microservices or Docker/K8s icons to the project tree — this is a monorepo, not a multi-service deployment diagram.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
白皮書 v5 的第一個產出：開發規範 + 專案結構。這個 monorepo 的結構直接體現了幕 3 的決策：ingest、processor、query 是三個 Python package，不是三個 repo、也不是三個微服務。shared 套件放所有服務共用的 Pydantic model、DB 連線、設定——這樣修改 Reading model 只需要一個 PR，不需要跨 repo 協調。開發規範三條：分支用 GitHub Flow（6 人以下最簡）、Lint 用 ruff + black（一個 .pre-commit-config.yaml 搞定）、CI 用 GitHub Actions（PR 合 main 前必過測試）。Scaffold 讓新成員 clone + make init 就能跑起來，不需要問「怎麼啟動」。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書 v5：開發規範" — 10 Chinese characters (CJK only), within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v5"` in frontmatter (artifact slide).
- [ ] `rendering_mode: "image_prompt"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v5 · 落地與演進` present below kicker.
- [ ] `Diagram Spec` is `not_applicable: true` with reason (document/tree, not node-edge graph).
- [ ] Project structure tree includes exactly: ingest/, processor/, query/, shared/, tests/, .pre-commit-config.yaml, pyproject.toml.
- [ ] Tree structure consistent with wmu3 modular monolith (three packages in one repo, not three repos).
- [ ] Dev Rules: exactly 3 bullets (分支 GitHub Flow / Lint ruff+black / CI gate).
- [ ] Technical Flow Details covers: tree structure rationale, why monorepo not multi-repo, branch strategy, linter/formatter config, CI gate steps, scaffold workflow.
- [ ] Version label `白皮書 v5` appears in content area.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Project tree consistent with幕3: ingest/processor/query as packages (not microservices, not separate repos).
