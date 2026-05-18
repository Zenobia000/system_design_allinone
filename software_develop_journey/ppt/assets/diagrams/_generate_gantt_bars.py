#!/usr/bin/env python3
"""Generate Ch.12 nine-role gantt bar images for three domains.

Why this exists: gpt-image-2 cannot render bar widths precisely — the AI
arrangement of "thick/thin" bars never matches the canonical effort assessment.
This script renders bars from a single source of truth so all three images
share the same coordinate system and the differential weights are immediately
comparable side-by-side.

Effort scale: 0–10 (1 = trivial, 5 = baseline, 10 = the heart of the system).
The numbers below reflect realistic role-effort estimates from actual practice
of building each system class.

Run: python _generate_gantt_bars.py
Outputs:
  12-case-study/01_ecommerce_gantt.png   (baseline reference)
  12-case-study/02_livestream_gantt.png  (Architect / DevOps heavy)
  12-case-study/03_ai_video_gantt.png    (PM / DBA / DevOps heavy + QA role-shift)
"""

from __future__ import annotations

from pathlib import Path

import matplotlib
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

# Style guide palette
COLOR_BG = "#F5F1E8"
COLOR_PRIMARY = "#D97757"
COLOR_SUPPORTING = "#8B6F47"
COLOR_TEXT = "#2A2520"
COLOR_DIVIDER = "#E8E3D8"
COLOR_HIGHLIGHT_BG = "#FFE5D0"
COLOR_LIGHT = "#C8B8A5"

# Traditional-Chinese-capable font
_available = {f.name for f in matplotlib.font_manager.fontManager.ttflist}
for candidate in (
    "Noto Sans CJK TC",
    "Noto Sans CJK JP",
    "Noto Serif CJK TC",
    "Noto Serif CJK JP",
    "Noto Sans TC",
    "WenQuanYi Zen Hei",
):
    if candidate in _available:
        matplotlib.rcParams["font.family"] = candidate
        break
else:
    matplotlib.rcParams["font.family"] = "sans-serif"

ROLES = ["PM", "UX", "UI", "SA", "Architect", "SD", "DBA", "Dev", "QA", "DevOps"]

# ---------------------------------------------------------------------------
# Canonical effort assessment for each domain (scale 0-10)
# ---------------------------------------------------------------------------

DOMAINS = {
    "ecommerce": {
        "filename": "01_ecommerce_gantt.png",
        "title": "電商訂單系統 · E-commerce (OLTP Baseline)",
        "subtitle": "心臟：SA · DBA · QA — 狀態機 + 對帳 + 邊界驗證",
        "rationale": [
            "PM 6/10 · 促銷 / 會員 / 退款規則繁雜但成熟",
            "UX 7/10 · 結帳流程是 #1 KPI (轉換率)",
            "UI 5/10 · 商品 UI 套件高度標準化",
            "SA 8/10 · 訂單 7 狀態 + 例外規則最多",
            "Architect 7/10 · Saga / Outbox / 服務切分",
            "SD 6/10 · 冪等 API · 標準 sequence",
            "DBA 8/10 · 訂單表 / index / 對帳 / 報表",
            "Dev 6/10 · CRUD + 業務邏輯",
            "QA 8/10 · 邊界 case (退款 / 庫存 / 重複付款)",
            "DevOps 7/10 · 對帳 job · 付款監控",
        ],
        # PM UX UI SA AR SD DB DV QA OP
        "weights": [6, 7, 5, 8, 7, 6, 8, 6, 8, 7],
        "stars": {"SA": "★", "DBA": "★", "QA": "★"},
    },
    "livestream": {
        "filename": "02_livestream_gantt.png",
        "title": "直播串流平台 · Livestream (Real-time / Scale)",
        "subtitle": "心臟：Architect · DevOps — 延遲合約 + 容量規劃 + 邊緣節點",
        "rationale": [
            "PM 5/10 · KPI 主要靠技術指標",
            "UX 5/10 · 觀看體驗主要由技術決定",
            "UI 5/10 · player 控制元件相對標準",
            "SA 6/10 · 連線狀態流比電商簡單",
            "Architect 10/10 · CDN / 邊緣 / 延遲 < 3s 是命脈",
            "SD 7/10 · HLS chunk / buffer / 協議細節",
            "DBA 3/10 · 走 cache + queue · DB 不是核心",
            "Dev 6/10 · 串流 SDK · player 整合",
            "QA 7/10 · 壓力測試 · 容量驗證 · chaos",
            "DevOps 10/10 · autoscale · 24/7 · 邊緣節點管理",
        ],
        "weights": [5, 5, 5, 6, 10, 7, 3, 6, 7, 10],
        "stars": {"Architect": "★★★", "DevOps": "★★★"},
    },
    "ai_video": {
        "filename": "03_ai_video_gantt.png",
        "title": "AI 影視生成 · AI Video (Async / GPU / Cost)",
        "subtitle": "心臟：PM · DBA · DevOps · QA 角色變了 — 從驗證已知到定義未知",
        "rationale": [
            "PM 10/10 · 定義「好」+ 訂閱 / 配額 / 定價",
            "UX 5/10 · 生成流程簡單 · 等待動畫",
            "UI 6/10 · 結果預覽 / prompt 編輯介面",
            "SA 6/10 · 非同步 job 流程 · 配額規則",
            "Architect 8/10 · 排隊 · GPU 池 · 優先級分流",
            "SD 6/10 · 非同步 API · job status",
            "DBA 9/10 · 模型版本 · 生成記錄 · GPU 用量 / 成本",
            "Dev 6/10 · 模型整合 · prompt 工程",
            "QA 9/10 · ★ 角色變了：定義 metric + 人評流程",
            "DevOps 10/10 · GPU 池 / autoscale / 成本控制",
        ],
        "weights": [10, 5, 6, 6, 8, 6, 9, 6, 9, 10],
        "stars": {"PM": "★★★", "DBA": "★★", "DevOps": "★★★", "QA": "★ (角色變了)"},
    },
}


def render_domain(domain_key: str, out_dir: Path) -> Path:
    """Render one gantt-bar image for a given domain."""
    config = DOMAINS[domain_key]
    n = len(ROLES)
    weights = config["weights"]
    stars = config["stars"]

    # Figure: 1536 x 1024 px at 100 dpi
    fig, ax = plt.subplots(figsize=(15.36, 10.24), dpi=100)
    ax.set_facecolor(COLOR_BG)
    fig.patch.set_facecolor(COLOR_BG)

    # Layout (axis units):
    # bars span x from 0 to 10 (max weight = 10)
    # rows: 0 = bottom (DevOps), n-1 = top (PM)
    BAR_MAX_X = 10.0
    LABEL_X = -1.2        # x coord for role labels on the left
    RATIONALE_X = 12.5    # x coord for rationale text on the right

    # --- Title and subtitle ---
    ax.text(
        BAR_MAX_X / 2,
        n + 1.8,
        config["title"],
        ha="center",
        va="center",
        fontsize=22,
        fontweight="bold",
        color=COLOR_TEXT,
    )
    ax.text(
        BAR_MAX_X / 2,
        n + 1.0,
        config["subtitle"],
        ha="center",
        va="center",
        fontsize=13,
        color=COLOR_PRIMARY,
        fontweight="bold",
    )

    # --- Axis scale ticks (0, 5, 10) ---
    for x in (0, 5, 10):
        ax.plot(
            [x, x],
            [-0.4, n + 0.2],
            color=COLOR_DIVIDER,
            linewidth=0.6,
            alpha=0.6,
            zorder=0,
        )
        ax.text(
            x,
            -0.7,
            str(x),
            ha="center",
            va="top",
            fontsize=9,
            color=COLOR_LIGHT,
        )
    ax.text(
        BAR_MAX_X / 2,
        -1.1,
        "投入度  (0 = 輕  ·  5 = baseline  ·  10 = 心臟)",
        ha="center",
        va="top",
        fontsize=10,
        color=COLOR_SUPPORTING,
    )

    # --- Bars (top to bottom: PM, UX, ..., DevOps) ---
    for i, role in enumerate(ROLES):
        # Convert so index 0 (PM) sits at top
        y = n - i - 1
        weight = weights[i]

        # Bar colour: emphasised bars use solid orange, others lighter
        is_star = role in stars
        color = COLOR_PRIMARY if is_star else COLOR_LIGHT
        edge = COLOR_TEXT if is_star else COLOR_SUPPORTING
        alpha = 1.0 if is_star else 0.85
        lw = 1.2 if is_star else 0.8

        # Bar rectangle
        bar = Rectangle(
            (0, y + 0.18),
            weight,
            0.64,
            facecolor=color,
            edgecolor=edge,
            linewidth=lw,
            alpha=alpha,
            zorder=2,
        )
        ax.add_patch(bar)

        # Role label on the left
        label = role
        ax.text(
            LABEL_X,
            y + 0.5,
            label,
            ha="right",
            va="center",
            fontsize=12,
            fontweight="bold" if is_star else "normal",
            color=COLOR_TEXT,
        )

        # Numeric weight at end of bar (inside if room, outside if short)
        if weight >= 1.5:
            ax.text(
                weight - 0.15,
                y + 0.5,
                str(weight),
                ha="right",
                va="center",
                fontsize=10,
                fontweight="bold",
                color=COLOR_BG if is_star else COLOR_TEXT,
            )
        else:
            ax.text(
                weight + 0.15,
                y + 0.5,
                str(weight),
                ha="left",
                va="center",
                fontsize=10,
                color=COLOR_TEXT,
            )

        # Star annotation past the bar
        if is_star:
            star_label = stars[role]
            ax.text(
                BAR_MAX_X + 0.3,
                y + 0.5,
                star_label,
                ha="left",
                va="center",
                fontsize=11,
                fontweight="bold",
                color=COLOR_PRIMARY,
            )

    # --- Rationale column on the right ---
    ax.text(
        RATIONALE_X,
        n + 0.4,
        "實務 weight 依據",
        ha="left",
        va="bottom",
        fontsize=12,
        fontweight="bold",
        color=COLOR_SUPPORTING,
    )
    for i, line in enumerate(config["rationale"]):
        ax.text(
            RATIONALE_X,
            n - i - 0.5,
            f"·  {line}",
            ha="left",
            va="center",
            fontsize=9.5,
            color=COLOR_TEXT,
        )

    # --- Frame ---
    ax.set_xlim(-2.8, 22.5)
    ax.set_ylim(-2.0, n + 3.0)
    ax.set_aspect("auto")
    ax.axis("off")

    out_path = out_dir / config["filename"]
    plt.savefig(out_path, dpi=100, facecolor=COLOR_BG, bbox_inches="tight", pad_inches=0.3)
    plt.close()
    return out_path


def main() -> None:
    out_dir = Path(__file__).parent / "12-case-study"
    out_dir.mkdir(parents=True, exist_ok=True)
    for key in DOMAINS:
        path = render_domain(key, out_dir)
        print(f"[OK] {path}")


if __name__ == "__main__":
    main()
