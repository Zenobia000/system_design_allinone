---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'W.8 · Personal AI Workbench'
footer: 'AI 時代系統設計速成 '
---

## W.8 · 個人「AI 架構師工作台」

<span class="kicker">TOOLING · 你的 stack</span>

<!-- _class: compact -->

| 層 | 工具建議 | 用途 |
|---|---|---|
| **CLI / IDE** | Claude Code, Cursor, Continue | 主要對話介面 |
| **MCP servers** | github, filesystem, postgres, slack | 讓 AI 讀真實系統狀態 |
| **Subagents** | code-reviewer, security-auditor | 專業領域助理 |
| **Prompt 庫** | git repo of `.md` templates | 標準化常用對話 |
| **ADR 倉** | `/docs/adr/*.md` | 決策歷史，可餵 AI |
| **CLAUDE.md** | 專案的 AI 工作合約 | 約束 AI 行為 |
| **Eval set** | 30 道測試題 / repo | 換 model / prompt 時驗證 |

<br>

<span class="muted">**建立工作台的 ROI**：頭 2 週投入 10 hour 建好，往後每週省 5+ hour。</span>

> Source: _source/braindump.md


---


## W.8 · MCP servers · 該裝哪些

<!-- _class: compact -->

| MCP | 用途 | 何時裝 |
|---|---|---|
| **filesystem** | 讓 AI 讀本地檔 | 預設 |
| **github** | 讀 issue / PR / 程式碼 | 多人團隊 |
| **postgres** | 直接 query 本地 DB | 開發階段 |
| **slack** | 讀討論串、找決策上下文 | 大公司 |
| **gmail** | 信件查 stakeholder requirement | 跨部門 |
| **figma** | 讀 design spec | 全端 |

<br>

**安全提醒**：MCP server 給 AI 的權限大—**讀** 安全，**寫** 要謹慎。預設 dry-run。

<br>

<span class="muted">**金句**：工具好不好，看「AI 能拿到的真實 context 有多廣」。</span>

> Source: _source/braindump.md
