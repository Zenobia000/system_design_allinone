#!/usr/bin/env python3
"""Generate the Ch.11 overlap matrix image programmatically.

Why this exists: gpt-image-2 cannot reliably render specific cell positions
in a data matrix — every regeneration randomizes which cells are filled.
This script renders the matrix from the canonical data defined in
`software_develop_journey/ppt/11-collaboration/02_overlap_matrix.md`
with 100% accuracy.

Layout: two side-by-side blocks (上游 14 decisions × 10 roles | 下游 14 decisions × 10 roles)
so the data is comprehensive AND the image fits 16:9 landscape.

Run: python _generate_overlap_matrix.py
Output: 11-collaboration/02_overlap_matrix.png (1536x1024)
"""

from pathlib import Path

import matplotlib
import matplotlib.pyplot as plt
from matplotlib.patches import Circle

# Style guide palette
COLOR_BG = "#F5F1E8"
COLOR_PRIMARY = "#D97757"
COLOR_SUPPORTING = "#8B6F47"
COLOR_TEXT = "#2A2520"
COLOR_DIVIDER = "#E8E3D8"

# Pick a Traditional-Chinese-capable font. matplotlib only registers JP variants
# of the Noto CJK TTC files, but the glyphs are shared across CJK locales.
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

ROLES = ["PM", "UX", "UI", "SA", "Arch", "SD", "DBA", "Dev", "QA", "Ops"]

# Cell values: 2 = ★ 主 (primary), 1 = 參與 (supporting), 0 = – (none)
# Order of columns must match ROLES.
UPSTREAM = [
    # label,                              PM UX UI SA AR SD DB DV QA OP
    ("1. 商業目標 / KPI",                 [2, 1, 0, 1, 0, 0, 0, 0, 0, 0]),
    ("2. 使用者旅程",                     [1, 2, 1, 1, 0, 0, 0, 0, 0, 0]),
    ("3. 畫面排版 / 資訊層級",            [0, 2, 1, 0, 0, 0, 0, 0, 0, 0]),
    ("4. 互動細節（按哪 / 跳哪）",        [0, 2, 1, 1, 0, 0, 0, 0, 0, 0]),
    ("5. 視覺風格 / 品牌調性",            [1, 1, 2, 0, 0, 0, 0, 0, 0, 0]),
    ("6. Design System 規範",              [0, 1, 2, 0, 0, 0, 0, 0, 0, 0]),
    ("7. 可用性測試結論",                 [1, 2, 1, 0, 0, 0, 0, 0, 0, 0]),
    ("8. 業務規則",                       [1, 1, 0, 2, 1, 0, 1, 0, 0, 0]),
    ("9. 狀態機",                         [0, 1, 0, 2, 1, 0, 1, 0, 0, 0]),
    ("10. 服務邊界",                      [0, 0, 0, 1, 2, 0, 1, 0, 0, 0]),
    ("11. 技術選型",                      [0, 0, 0, 0, 2, 0, 1, 0, 0, 0]),
    ("12. 同步 / 非同步",                 [0, 0, 0, 1, 2, 0, 1, 0, 0, 0]),
    ("13. 一致性策略",                    [0, 0, 0, 1, 2, 0, 2, 0, 0, 0]),
    ("14. NFR / SLA",                      [1, 0, 0, 1, 2, 0, 1, 0, 0, 0]),
]

DOWNSTREAM = [
    # label,                              PM UX UI SA AR SD DB DV QA OP
    ("15. Data Schema",                    [1, 0, 0, 1, 1, 0, 2, 0, 0, 0]),
    ("16. Index 策略",                    [0, 0, 0, 0, 1, 0, 2, 0, 0, 0]),
    ("17. API endpoint 命名",             [0, 0, 0, 0, 0, 2, 0, 1, 0, 0]),
    ("18. Sequence 細節",                 [0, 0, 0, 0, 0, 2, 0, 1, 1, 0]),
    ("19. 程式碼結構",                    [0, 0, 0, 0, 0, 1, 0, 2, 0, 0]),
    ("20. 命名 / 設計模式",               [0, 0, 0, 0, 0, 1, 0, 2, 0, 0]),
    ("21. Unit Test",                      [0, 0, 0, 0, 0, 0, 0, 2, 1, 0]),
    ("22. Integration / E2E",              [0, 0, 0, 0, 0, 0, 0, 1, 2, 0]),
    ("23. Bug 嚴重度",                     [0, 0, 0, 0, 0, 0, 0, 1, 2, 1]),
    ("24. CI/CD pipeline",                 [0, 0, 0, 0, 0, 0, 0, 1, 1, 2]),
    ("25. Deploy 策略",                    [0, 0, 0, 0, 0, 0, 0, 1, 0, 2]),
    ("26. SLO / 錯誤預算",                 [0, 0, 0, 0, 0, 0, 0, 1, 1, 2]),
    ("27. 監控 / Alert",                   [0, 0, 0, 0, 0, 0, 0, 1, 1, 2]),
    ("28. Incident 回應",                  [0, 0, 0, 0, 0, 0, 0, 1, 0, 2]),
]


def draw_block(ax, data, x_offset: float, y_top: float, title: str, subtitle: str):
    """Draw one half of the matrix (11 rows × 9 cols) at the given offset."""
    n_rows = len(data)
    n_cols = len(ROLES)

    # Block title (above column headers)
    ax.text(
        x_offset + n_cols / 2,
        y_top + 1.8,
        title,
        ha="center",
        va="center",
        fontsize=14,
        fontweight="bold",
        color=COLOR_PRIMARY,
    )
    ax.text(
        x_offset + n_cols / 2,
        y_top + 1.2,
        subtitle,
        ha="center",
        va="center",
        fontsize=10,
        color=COLOR_SUPPORTING,
    )

    # Column headers
    for j, role in enumerate(ROLES):
        ax.text(
            x_offset + j + 0.5,
            y_top + 0.3,
            role,
            ha="center",
            va="bottom",
            fontsize=10,
            fontweight="bold",
            color=COLOR_TEXT,
            rotation=0,
        )

    # Cells (filled circles for primary, outlined for supporting)
    for i, (label, row) in enumerate(data):
        for j, val in enumerate(row):
            cx = x_offset + j + 0.5
            cy = y_top - i - 0.5
            if val == 2:
                ax.add_patch(
                    Circle(
                        (cx, cy),
                        0.32,
                        facecolor=COLOR_PRIMARY,
                        edgecolor=COLOR_TEXT,
                        linewidth=0.8,
                        zorder=2,
                    )
                )
            elif val == 1:
                ax.add_patch(
                    Circle(
                        (cx, cy),
                        0.28,
                        facecolor=COLOR_BG,
                        edgecolor=COLOR_SUPPORTING,
                        linewidth=1.6,
                        zorder=2,
                    )
                )

    # Grid lines for this block
    for i in range(n_rows + 1):
        ax.plot(
            [x_offset, x_offset + n_cols],
            [y_top - i, y_top - i],
            color=COLOR_DIVIDER,
            linewidth=0.5,
            alpha=0.8,
            zorder=1,
        )
    for j in range(n_cols + 1):
        ax.plot(
            [x_offset + j, x_offset + j],
            [y_top - n_rows, y_top],
            color=COLOR_DIVIDER,
            linewidth=0.5,
            alpha=0.8,
            zorder=1,
        )

    # Row labels (decisions) on the left of the block
    for i, (label, _) in enumerate(data):
        ax.text(
            x_offset - 0.2,
            y_top - i - 0.5,
            label,
            ha="right",
            va="center",
            fontsize=9.5,
            color=COLOR_TEXT,
        )


def main() -> None:
    # Figure: 1536 x 1024 at 100 dpi  →  matches the rest of the deck's PNGs
    fig, ax = plt.subplots(figsize=(15.36, 10.24), dpi=100)
    ax.set_facecolor(COLOR_BG)
    fig.patch.set_facecolor(COLOR_BG)

    n_cols = len(ROLES)

    # Layout (in axis units):
    #   left labels    | upstream block | gap | right labels   | downstream block
    #   width  ~4.5    |   9            | 1   |   ~4.5         |   9
    LEFT_PAD = 7.0     # space for upstream row labels (left margin)
    BLOCK_W = n_cols   # 10
    MID_PAD = 7.0      # space for downstream row labels between the two blocks
    upstream_x = LEFT_PAD
    downstream_x = LEFT_PAD + BLOCK_W + MID_PAD
    total_w = downstream_x + BLOCK_W + 0.5  # tiny right margin

    BLOCK_H = max(len(UPSTREAM), len(DOWNSTREAM))
    y_top = BLOCK_H  # top of block in axis units
    total_h_top = y_top + 4   # extra room for title + headers
    total_h_bottom = -2.5     # legend area

    # Master title
    ax.text(
        total_w / 2,
        y_top + 3.0,
        "OVERLAP MATRIX",
        ha="center",
        va="center",
        fontsize=24,
        fontweight="bold",
        color=COLOR_TEXT,
    )
    ax.text(
        total_w / 2,
        y_top + 2.4,
        "28 decisions × 10 roles · 誰主導什麼決策",
        ha="center",
        va="center",
        fontsize=12,
        color=COLOR_SUPPORTING,
    )

    # Two blocks
    draw_block(
        ax,
        UPSTREAM,
        x_offset=upstream_x,
        y_top=y_top,
        title="上游決策",
        subtitle="Product / Rules / System (1–14)",
    )
    draw_block(
        ax,
        DOWNSTREAM,
        x_offset=downstream_x,
        y_top=y_top,
        title="下游決策",
        subtitle="Data / Build / Run (15–28)",
    )

    # Legend at the bottom, two items spaced apart
    legend_y = -1.5
    # Primary swatch + label (left of center).
    # Offsets are in axis units; the label text is ~7 units wide at fontsize 12,
    # so keep >= 8 units between the two swatches or the labels collide.
    ax.add_patch(
        Circle(
            (total_w / 2 - 8.5, legend_y),
            0.25,
            facecolor=COLOR_PRIMARY,
            edgecolor=COLOR_TEXT,
            linewidth=0.8,
        )
    )
    ax.text(
        total_w / 2 - 8.1,
        legend_y,
        "★ 主  Primary (Decision-Maker)",
        ha="left",
        va="center",
        fontsize=12,
        color=COLOR_TEXT,
    )
    # Supporting swatch + label (right of center, well separated)
    ax.add_patch(
        Circle(
            (total_w / 2 + 1.0, legend_y),
            0.22,
            facecolor=COLOR_BG,
            edgecolor=COLOR_SUPPORTING,
            linewidth=1.8,
        )
    )
    ax.text(
        total_w / 2 + 1.4,
        legend_y,
        "○ 參與  Supporting (Participant)",
        ha="left",
        va="center",
        fontsize=12,
        color=COLOR_TEXT,
    )

    # Frame the visible area precisely so bbox_inches='tight' doesn't crop weirdly.
    ax.set_xlim(0, total_w)
    ax.set_ylim(total_h_bottom, total_h_top)
    ax.set_aspect("equal")
    ax.axis("off")

    out_path = Path(__file__).parent / "11-collaboration" / "02_overlap_matrix.png"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    plt.savefig(out_path, dpi=100, facecolor=COLOR_BG, bbox_inches="tight", pad_inches=0.3)
    plt.close()
    print(f"[OK] {out_path}")


if __name__ == "__main__":
    main()
