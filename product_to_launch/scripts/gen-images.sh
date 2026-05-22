#!/usr/bin/env bash
# Launch Atlas — GPT-image-2 batch generator
# Outputs 24 high-quality PNGs to public/generated/<name>.png (timestamp stripped)
# Usage:  bash scripts/gen-images.sh              # generate all 24
#         bash scripts/gen-images.sh hero only    # match-prefix filter (bash regex)

set -uo pipefail
cd "$(dirname "$0")/.."

DRAW="/home/sunny/.claude/skills/draw/draw.py"
OUT="public/generated"
mkdir -p "$OUT"

# ─── DSL: gen NAME SIZE PROMPT ──────────────────────────────────────────────
gen() {
  local name=$1; shift
  local size=$1; shift
  local prompt="$*"

  # Optional filter: only run names matching $1 (when caller passes a regex)
  if [ -n "${FILTER:-}" ] && ! [[ "$name" =~ $FILTER ]]; then
    return 0
  fi

  if [ -f "$OUT/${name}.png" ]; then
    echo "[skip] ${name}.png (already exists — delete to regenerate)"
    return 0
  fi

  echo "[gen] ${name} (${size})"
  python3 "$DRAW" "$prompt" \
    --size "$size" --quality high --n 1 \
    --name "$name" --outdir "$OUT" >/dev/null 2>&1 || {
      echo "[FAIL] ${name}"
      return 1
    }

  local found
  found=$(ls -t "$OUT"/${name}_*.png 2>/dev/null | head -1)
  if [ -n "$found" ]; then
    mv "$found" "$OUT/${name}.png"
    echo "[OK] ${name}.png"
  else
    echo "[FAIL] ${name} (no output found)"
    return 1
  fi
}

FILTER="${1:-}"

# ─────────────────────── Hero / OG / Wordmark (4) ───────────────────────────

gen hero-blueprint-desk 1536x1024 \
"Editorial overhead view of an architect's worktable on deep navy ink #0a0e14 surface. \
A large cream blueprint paper #ece5d3 with thin cyan #6dd5ed grid lines, hand-drawn floorplan and arrows. \
Correction-orange #ff6a1a sticky notes, hand-marked annotations, copper ruler, sharpened pencil, \
fading coffee ring, translucent tracing paper overlay. Top-left corner has a small constellation \
of 9 abstract glyph silhouettes representing roles. Minimalist, flat, no photography, no people, \
no faces, no readable text on the blueprint, premium magazine spread style, ultra-clean."

gen og-card 1536x1024 \
"Minimalist Open Graph card for a knowledge website. Deep navy #0a0e14 background, \
fine cream #ece5d3 grid lines, one bold correction-orange #ff6a1a diagonal slash from \
lower-left to upper-right. Center: an empty composition with negative space. \
No text, no logos, pure flat editorial poster, museum exhibit aesthetic."

gen wordmark-zh 1024x512 \
"A clean black serif wordmark composition saying the four Chinese characters 落 地 圖 鑑 \
in Instrument Serif style, refined Traditional Chinese typography with slight blueprint \
draftsman finishes at stroke endings, generous letter spacing, on a cream off-white \
#ece5d3 background, no decorative elements except a single small correction-orange #ff6a1a \
dot at the top-right above the rightmost character, masterpiece typography poster."

gen wordmark-en 1024x512 \
"Wordmark typography poster: the words LAUNCH ATLAS rendered in elegant Instrument Serif \
all-caps, generous tracking +0.15em, sharp serifs, deep ink black letters on cream off-white \
#ece5d3 background. A single small correction-orange #ff6a1a circular accent dot above the \
letter A in ATLAS. No other ornament. Museum-quality minimal typography."

# ─────────────────────── Role Hero × 10 ─────────────────────────────────────
# All use the same frame: deep navy desktop + cream paper artifact + role's signature objects
ROLE_FRAME="Editorial overhead view, deep navy ink #0a0e14 table surface with faint cyan \
#6dd5ed grid, a single sheet of cream off-white #ece5d3 paper with correction-orange #ff6a1a \
annotation accents. Minimal flat illustration, no people, no faces, no readable text. \
On the paper:"

gen role-hero-pm 1536x1024 "${ROLE_FRAME} a roadmap timeline overlaid with sticky notes \
in three colors, a priority matrix 2x2 quadrant chart, a marker pen, a small ruler, \
and a half-empty coffee cup ring stain."

gen role-hero-po 1536x1024 "${ROLE_FRAME} stacked user story cards as a deck, a business model \
canvas grid, value hypothesis cards with checkboxes, all arranged like a tarot spread."

gen role-hero-ba 1536x1024 "${ROLE_FRAME} a BPMN swimlane flowchart with diamond decision nodes \
and rectangular process boxes, interview notes in shorthand, a decision tree diagram \
in the corner."

gen role-hero-ux 1536x1024 "${ROLE_FRAME} hand-drawn wireframe sketches with placeholder boxes, \
a card-sorting cluster diagram, a user journey curve graph with emotion peaks and valleys, \
usability test annotation marks."

gen role-hero-ui 1536x1024 "${ROLE_FRAME} a design system color swatch palette grid, type \
specimen samples in various weights, Figma-style component variations laid out as a \
modular kit, spacing measurement annotations."

gen role-hero-sa 1536x1024 "${ROLE_FRAME} a system context diagram with external actor stick \
figures pointing into a central system box, use case bubbles, sequence diagram arrows, \
a translucent tracing paper edge."

gen role-hero-architect 1536x1024 "${ROLE_FRAME} layered C4 architecture diagrams (context, \
container, component) stacked vertically, an ADR document stamped ACCEPTED, a \
technology selection trade-off matrix, a small architectural blueprint scroll."

gen role-hero-dev 1536x1024 "${ROLE_FRAME} a terminal window outline with a blinking cursor, \
a git branch flow diagram with merge points, a pull-request review checklist with \
checkbox ticks, a keyboard silhouette at the bottom edge."

gen role-hero-qa 1536x1024 "${ROLE_FRAME} a test pyramid diagram (unit/integration/e2e \
proportions), a bug tag with priority labels, a regression checklist, a magnifying \
glass icon zooming in on one row."

gen role-hero-devops 1536x1024 "${ROLE_FRAME} a CI/CD pipeline horizontal flow with stage \
gates, a dashboard panel with line charts and gauge meters, a container icon, a \
night-shift on-call lamp icon glowing softly."

# ─────────────────────── SDLC Stage Dividers × 6 ────────────────────────────

gen stage-discovery 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: an open interview notebook, a magnifying \
glass resting on top, scattered sticky notes in cream and orange, a Polaroid-style frame, \
faint cyan grid background, no people, no faces, no readable text. Minimalist composition."

gen stage-define 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: a PRD draft document with correction-orange \
#ff6a1a red-pen circles around key sentences, a sticky-note question stack, a copper \
ruler weighing down one corner, faint cyan grid background, no people, no readable text."

gen stage-design 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: multiple layered translucent tracing \
papers (wireframe to high-fidelity progression), a sharp pencil, a compass-protractor \
drafting tool, an ADR paper next to it, faint cyan grid background, no people, no text."

gen stage-build 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: a translucent overlay revealing a \
git commit graph beneath it, a terminal window silhouette with a prompt cursor, PR \
review tag stickers, a coffee ring, faint cyan grid background, no people, no faces."

gen stage-ship 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: a paper-airplane rocket silhouette \
taking off, a deployment checklist with green checkmarks, a launch console with one \
big orange button, faint cyan grid background, no people, no faces, no readable text."

gen stage-operate 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: a dashboard panel with steady line \
graphs and SLO gauges, a runbook scroll partially unrolled, a small lamp icon glowing \
warm against the dark, a pager beeper, faint cyan grid background, no people, no text."

# ─────────────────────── Key Deliverable Heroes × 4 ─────────────────────────

gen key-deliverable-prd 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: a PRD product requirements document \
in cream paper with a correction-orange #ff6a1a stamp imprint reading APPROVED (avoid \
any other text), sticky-note priority labels covering the margins, a copper ruler \
holding down the edge, faint cyan grid background."

gen key-deliverable-adr 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: three cream paper cards laid \
side-by-side, each with a tiny colored stamp imprint at top (one orange, one gray, \
one cyan) representing decision statuses, an old-fashioned balance scale beside \
them, faint cyan grid background, no readable body text, no people."

gen key-deliverable-runbook 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: an open runbook binder, left page \
shows a simple step-by-step flowchart with arrows, right page shows an incident \
timeline as horizontal bars with markers, a small warm lamp icon and a coffee cup \
in the corner, faint cyan grid background, no readable text."

gen key-deliverable-slo 1536x1024 \
"Editorial flat illustration on deep navy #0a0e14: a glass-pane SLO dashboard with \
an error-budget progress bar (mostly green with a small red sliver), four small SLI \
quadrant charts in cyan #6dd5ed lines, faint cyan grid background, no readable text, \
no people, no faces."

echo
echo "──────────────────────────────────────────"
echo "Done. Listing ${OUT}/:"
ls -la "$OUT/" | grep -v '^total' | grep -v '^d' | awk '{printf "  %-40s %8s bytes\n", $NF, $5}' || true
