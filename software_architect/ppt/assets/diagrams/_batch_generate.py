"""
批量生成「架構師的藍圖」PPT 章首 hero 圖
依 prompts/0X-*.md 中的 Type A 提示，呼叫 gpt-image-2 並依章節儲存。

僅生成 Type A（editorial illustration）圖；
Mermaid (C/E) 與 Excalidraw (D) 類由其他工具處理。
"""
import os
import sys
import base64
import time
from pathlib import Path
from datetime import datetime


def load_env_from_file(path: Path):
    if not path.exists():
        return
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env_from_file(Path.cwd() / ".env")
load_env_from_file(Path.home() / ".openai.env")

ROOT = Path(__file__).resolve().parent

STYLE_BLOCK = (
    "editorial illustration, hand-drawn technical sketch style, "
    "warm color palette featuring cream off-white #F5F1E8 background and "
    "warm orange #D97757 accents with deep brown #8B6F47 secondary lines, "
    "minimalist flat vector with subtle paper texture, clean geometric lines, "
    "ample whitespace, educational diagram style, calm composed mood. "
    "No photo-realistic, 3d render, neon, gradient glow, cluttered text, "
    "watermark, kawaii, anime."
)

IMAGES = [
    {
        "chapter": "00-prologue",
        "filename": "00_cover_hero.png",
        "subject": (
            "An editorial illustration of an architect's drafting table covered "
            "with overlapping blueprints, technical schematics, and a hand sketching "
            "a system diagram with a fountain pen; in the background, faint "
            "silhouettes of city skylines and server racks blend into the paper, "
            "suggesting the architect's role as bridge between abstract decision "
            "and concrete reality. A small AI co-pilot icon hovers nearby, present "
            "but subordinate to the human hand."
        ),
        "composition": (
            "top-down view of the drafting table occupying lower 70%; the hand and "
            "pen on the right; ample whitespace on upper-left for title overlay; "
            "warm sunlight streaming from upper-right; geometric stack of blueprints "
            "suggesting layered architectural thinking."
        ),
    },
    {
        "chapter": "01-role-value",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of a calm, composed architect standing at "
            "the center of a wide hall, holding architectural plans rolled in one "
            "hand and a small laptop in the other; behind them are three vertical "
            "panels labeled with abstract symbols for business strategy, system "
            "decisions, and code implementation, connected by faint lines flowing "
            "through the architect. The figure is rendered minimally, more iconic "
            "than realistic."
        ),
        "composition": (
            "centered figure occupying middle one-third; three vertical panels "
            "behind, slightly receding; ample whitespace; warm sidelight from "
            "upper-left; the architect's posture relaxed but attentive."
        ),
    },
    {
        "chapter": "02-requirements-sla",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of a vintage measuring scale on the left "
            "holding an abstract cloud labeled 'fast / stable / many users', and "
            "on the right side three small precise weights labeled 'P99 200ms', "
            "'99.95%', '5000 QPS'; the scale tips toward the right side, "
            "suggesting that quantification gives weight (and meaning) to vague "
            "requirements."
        ),
        "composition": (
            "centered scale occupying middle 60%; cloud on left, weights on right; "
            "warm orange highlight on the weights; calm composed mood."
        ),
    },
    {
        "chapter": "03-process-app-types",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of a workflow diagram drawn on parchment, "
            "showing six interconnected nodes representing the architectural design "
            "process — each node a distinct geometric shape (circle, square, "
            "diamond, hexagon, octagon, star) connected by hand-drawn arrows; in "
            "the corner, a magnifying glass hovers over one node, emphasizing the "
            "inspection and verification aspect of architecture work."
        ),
        "composition": (
            "top-down parchment view; six nodes flowing left-to-right in gentle "
            "curve; warm orange highlights on connecting arrows; magnifying glass "
            "in upper-right; ample whitespace."
        ),
    },
    {
        "chapter": "04-tech-stack-data",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of a procurement manager's clipboard with "
            "a hand ticking off boxes next to a row of technology icons (a database "
            "cylinder, a server, a code symbol, a cloud); on the side, a hand "
            "pushes away a flashy 'new and shiny' item with a stamp, while keeping "
            "the boring proven items — metaphor for rational selection over "
            "hype-driven decisions."
        ),
        "composition": (
            "clipboard centered, occupying middle 50%; icons in a vertical column; "
            "'new shiny' item being rejected on the right side; warm orange accents "
            "on the ticked checkmarks."
        ),
    },
    {
        "chapter": "05-ilities",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of a medical health-check chart on a "
            "clipboard, but instead of body vital signs, the rows are labeled "
            "'Scalability', 'Reliability', 'Testability', 'Modularity', "
            "'Observability'; a stethoscope rests on top, and an architect's hand "
            "holds a pen, marking checkmarks next to each entry. Implies "
            "architectural quality is something you actively measure, not assume."
        ),
        "composition": (
            "clipboard angled slightly to the right, occupying middle 60%; "
            "stethoscope draped over; warm orange checkmarks; calm sidelight."
        ),
    },
    {
        "chapter": "06-components-patterns",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of a craftsman's workbench with neatly "
            "arranged carpentry templates (each labeled subtly as Factory, "
            "Strategy, Observer, Adapter, Repository), being used to assemble a "
            "small wooden architectural model in the center; the templates are "
            "the patterns, the model is the system. Hands visible only at the edges."
        ),
        "composition": (
            "top-down view of workbench; templates arranged on left half; model "
            "assembly on right half; warm wood texture; clean geometric lines."
        ),
    },
    {
        "chapter": "07-system-architecture",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of a single monolithic building gradually "
            "fragmenting into multiple smaller, well-organized buildings connected "
            "by thin lines representing API calls; the transformation flows from "
            "left (one big block) to right (many small blocks). On the ground, "
            "faint dotted lines connect the buildings to a shared underground "
            "utility network (databases, message queues)."
        ),
        "composition": (
            "horizontal flow left-to-right; monolith on left occupying 20%; "
            "distributed buildings on right occupying 50%; ample whitespace below "
            "for caption area; warm orange accents on the API connection lines."
        ),
    },
    {
        "chapter": "08-advanced-patterns",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of an old-fashioned key cabinet, where "
            "each key represents an advanced pattern (Microservices, Event "
            "Sourcing, CQRS, Saga); some keys are clearly labeled and accessible, "
            "but most are kept behind glass with a small sign reading 'Only use "
            "when relevant' — emphasizing that advanced patterns are tools to be "
            "selected carefully, not defaults."
        ),
        "composition": (
            "front view of key cabinet; keys arranged in a 3x3 grid; glass cover "
            "with subtle reflection; warm sidelight; sign visible on top."
        ),
    },
    {
        "chapter": "09-case-study",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of a sandbox arena where an architect's "
            "design (a delicate paper model) is being stress-tested by real-world "
            "constraint cards labeled 'DEADLINE', 'BUDGET', 'TEAM SKILLS', "
            "'COMPLIANCE', 'POLITICS' being pushed against it; the model bends "
            "but doesn't break, hinting at the difference between theoretical "
            "optimum and practical viability."
        ),
        "composition": (
            "top-down sandbox view; model centered; constraint cards on four "
            "sides closing in; warm orange tension lines between cards and model; "
            "ample whitespace."
        ),
    },
    {
        "chapter": "10-soft-skills",
        "filename": "00_hero.png",
        "subject": (
            "An editorial illustration of an architect standing in a meeting room "
            "with no formal authority chart visible; instead, faint ribbons of "
            "trust and influence extend outward connecting them to four different "
            "audiences (a CEO at a finance dashboard, a PM with feature stories, "
            "a developer at a keyboard, an operations engineer near a monitoring "
            "screen) — each ribbon labeled subtly with the kind of language used "
            "for that audience (ROI / UX / Pattern / SLA)."
        ),
        "composition": (
            "architect centered; four audiences in cardinal directions around "
            "them; thin warm orange ribbons radiating outward; ample whitespace."
        ),
    },
    {
        "chapter": "90-appendix",
        "filename": "00_capstone_hero.png",
        "subject": (
            "An editorial illustration of a whiteboard during a system design "
            "interview, with a hand-drawn architecture diagram partially complete; "
            "sticky notes around the edges with constraints like '1000M DAU', "
            "'5 continents', 'P99 < 500ms'; an open notebook on the side showing "
            "the '5-step interview method'."
        ),
        "composition": (
            "angled view of whiteboard; sticky notes scattered; warm orange marker "
            "strokes on the diagram; ample whitespace at top."
        ),
    },
    {
        "chapter": "90-appendix",
        "filename": "01_cheatsheet_hero.png",
        "subject": (
            "An editorial illustration of a pocket-sized reference card / flip "
            "book opened on a desk, with tabs labeled 'NFR / SLA / DB / Patterns "
            "/ Interview'; a hand reaches for the SLA tab. The card is dense but "
            "tidy, like a well-loved pocket reference used by professionals."
        ),
        "composition": (
            "top-down view; card centered; tabs visible on the right edge; warm "
            "sidelight; hand entering from lower-right corner; calm composed mood."
        ),
    },
]


def build_prompt(item):
    return f"{item['subject']} Composition: {item['composition']} {STYLE_BLOCK}"


def main():
    from openai import OpenAI

    if not os.getenv("OPENAI_API_KEY"):
        print("ERROR: OPENAI_API_KEY not found", file=sys.stderr)
        sys.exit(1)

    client = OpenAI()
    total = len(IMAGES)
    print(f"準備生成 {total} 張章首 hero 圖（16:9, low quality, ~NT$0.3/張）", flush=True)
    print(f"輸出根目錄: {ROOT}\n", flush=True)

    succeeded = []
    skipped = []
    failed = []

    for idx, item in enumerate(IMAGES, 1):
        outdir = ROOT / item["chapter"]
        outdir.mkdir(parents=True, exist_ok=True)
        outfile = outdir / item["filename"]

        prefix = f"[{idx:02d}/{total}] {item['chapter']}/{item['filename']}"

        if outfile.exists():
            print(f"{prefix}  SKIP (已存在)", flush=True)
            skipped.append(str(outfile))
            continue

        prompt_text = build_prompt(item)
        t0 = time.time()
        try:
            result = client.images.generate(
                model="gpt-image-2",
                prompt=prompt_text,
                size="1536x1024",
                quality="low",
                n=1,
            )
            png_bytes = base64.b64decode(result.data[0].b64_json)
            outfile.write_bytes(png_bytes)
            elapsed = time.time() - t0
            size_kb = outfile.stat().st_size // 1024
            print(f"{prefix}  OK  ({elapsed:.1f}s, {size_kb}KB)", flush=True)
            succeeded.append(str(outfile))
        except Exception as e:
            elapsed = time.time() - t0
            print(f"{prefix}  FAIL ({elapsed:.1f}s): {e}", flush=True)
            failed.append((str(outfile), str(e)))

    print("\n" + "=" * 60)
    print(f"完成。成功 {len(succeeded)} · 略過 {len(skipped)} · 失敗 {len(failed)}")
    if failed:
        print("\n失敗清單：")
        for path, err in failed:
            print(f"  - {path}")
            print(f"    {err}")


if __name__ == "__main__":
    main()
