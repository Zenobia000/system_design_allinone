#!/usr/bin/env bash
# Build script for 系統設計實戰 Marp slides.
#
# Usage:
#   bash scripts/build.sh full                       # 整套 PDF + HTML
#   bash scripts/build.sh minimal                    # 精簡版
#   bash scripts/build.sh chapter 01-foundation      # 單一章節（資料夾名）
#   bash scripts/build.sh html-only                  # 僅產生 HTML
#   bash scripts/build.sh clean                      # 清除 dist/ 與 _combined*.md

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PPT_DIR="${ROOT_DIR}/ppt"
THEME_DIR="${PPT_DIR}/themes"
THEME_FILE="${THEME_DIR}/anthropic.css"
OUT_DIR="${ROOT_DIR}/dist"
BUILD_DIR="${PPT_DIR}/build"
MARP="npx --yes @marp-team/marp-cli@latest"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js not installed. Install Node.js >= 18 first." >&2
  echo "  Suggestion: use nvm — 'nvm install 20 && nvm use 20'" >&2
  exit 1
fi

# Auto-detect a usable Chrome for marp-cli PDF rendering when none is on PATH.
# Falls back to puppeteer's cached chromium (installed by previous npx runs).
if [[ -z "${CHROME_PATH:-}" ]] && ! command -v chromium >/dev/null 2>&1 \
   && ! command -v google-chrome >/dev/null 2>&1 && ! command -v chrome >/dev/null 2>&1; then
  detected=$(find "${HOME}/.cache/puppeteer/chrome" -maxdepth 4 -name chrome -type f -executable 2>/dev/null | sort -V | tail -1)
  if [[ -n "${detected}" ]]; then
    export CHROME_PATH="${detected}"
    echo "[chrome] using puppeteer cache: ${CHROME_PATH}"
  fi
fi

mkdir -p "${OUT_DIR}" "${BUILD_DIR}"

# Single source of truth for chapter ordering
ORDERED_DIRS=(
  "00-prologue"
  "01-foundation"
  "02-data-fundamentals"
  "03-data-distribution"
  "04-infrastructure"
  "05-reliability-ops"
  "06-scaling-patterns"
  "07-advanced-patterns"
  "90-appendix"
)

# Minimal subset — cover + roadmap + mental model + each chapter overview + cheatsheet
MINIMAL_FILES=(
  "00-prologue/00_cover.md"
  "00-prologue/01_roadmap.md"
  "00-prologue/03_mental_model.md"
  "01-foundation/00_overview.md"
  "02-data-fundamentals/00_overview.md"
  "03-data-distribution/00_overview.md"
  "04-infrastructure/00_overview.md"
  "05-reliability-ops/00_overview.md"
  "06-scaling-patterns/00_overview.md"
  "07-advanced-patterns/00_overview.md"
  "90-appendix/01_review_cheatsheet.md"
)

# Concatenate markdown files into a single deck.
# Strips frontmatter from all but the first file, ensures slide separators between files.
combine_files() {
  local out="$1"
  shift
  local files=("$@")

  : > "${out}"
  local first=true

  for rel in "${files[@]}"; do
    local f="${PPT_DIR}/${rel}"
    if [[ ! -f "${f}" ]]; then
      echo "  [skip] missing: ${rel}" >&2
      continue
    fi
    if ${first}; then
      # Normalize CRLF → LF so marp parses frontmatter correctly
      sed 's/\r$//' "${f}" >> "${out}"
      first=false
    else
      # Strip leading YAML frontmatter (between first pair of --- markers).
      # sed first normalizes CRLF → LF; without it awk's /^---$/ won't match ---\r
      sed 's/\r$//' "${f}" | awk 'BEGIN{fm=0; printed=0}
           /^---$/{ if(fm==0){fm=1; next} else if(fm==1){fm=2; printed=1; next} }
           { if(fm==2 || printed){print} else if(fm==0){fm=2; print} }' >> "${out}"
    fi
    printf "\n\n---\n\n" >> "${out}"
  done
}

combine_full() {
  local out="${BUILD_DIR}/combined.md"
  local files=()
  for d in "${ORDERED_DIRS[@]}"; do
    [[ -d "${PPT_DIR}/${d}" ]] || continue
    while IFS= read -r f; do
      files+=("${d}/$(basename "${f}")")
    done < <(find "${PPT_DIR}/${d}" -maxdepth 1 -name '*.md' | sort)
  done
  combine_files "${out}" "${files[@]}"
  echo "${out}"
}

combine_minimal() {
  local out="${BUILD_DIR}/combined_minimal.md"
  combine_files "${out}" "${MINIMAL_FILES[@]}"
  echo "${out}"
}

combine_chapter() {
  local chapter="$1"
  local dir="${PPT_DIR}/${chapter}"
  if [[ ! -d "${dir}" ]]; then
    echo "Error: chapter folder not found: ${chapter}" >&2
    echo "Available chapters:" >&2
    for d in "${ORDERED_DIRS[@]}"; do echo "  - ${d}"; done >&2
    exit 1
  fi
  local out="${BUILD_DIR}/combined_${chapter}.md"
  local files=()
  while IFS= read -r f; do
    files+=("${chapter}/$(basename "${f}")")
  done < <(find "${dir}" -maxdepth 1 -name '*.md' | sort)
  combine_files "${out}" "${files[@]}"
  echo "${out}"
}

render_pdf() {
  local input="$1"
  local output="$2"
  echo "→ Rendering PDF: ${output}"
  ${MARP} "${input}" --theme-set "${THEME_DIR}" --pdf --allow-local-files --browser-timeout 300000 -o "${output}"
}

render_html() {
  local input="$1"
  local output="$2"
  echo "→ Rendering HTML: ${output}"
  ${MARP} "${input}" --theme-set "${THEME_DIR}" --html --allow-local-files --browser-timeout 300000 -o "${output}"
}

cmd="${1:-full}"

case "${cmd}" in
  full)
    src=$(combine_full)
    bytes=$(wc -c < "${src}")
    echo "[combined] ${src} (${bytes} bytes)"
    render_pdf  "${src}" "${OUT_DIR}/system_design_full.pdf"
    render_html "${src}" "${OUT_DIR}/system_design_full.html"
    echo "Done. Output in ${OUT_DIR}/"
    ;;
  minimal)
    src=$(combine_minimal)
    bytes=$(wc -c < "${src}")
    echo "[combined] ${src} (${bytes} bytes)"
    render_pdf  "${src}" "${OUT_DIR}/system_design_minimal.pdf"
    render_html "${src}" "${OUT_DIR}/system_design_minimal.html"
    echo "Done."
    ;;
  chapter)
    name="${2:-}"
    if [[ -z "${name}" ]]; then
      echo "Usage: bash scripts/build.sh chapter <chapter-folder>" >&2
      echo "Available chapters:" >&2
      for d in "${ORDERED_DIRS[@]}"; do echo "  - ${d}"; done >&2
      exit 1
    fi
    src=$(combine_chapter "${name}")
    render_pdf  "${src}" "${OUT_DIR}/${name}.pdf"
    render_html "${src}" "${OUT_DIR}/${name}.html"
    ;;
  html-only)
    src=$(combine_full)
    render_html "${src}" "${OUT_DIR}/system_design_full.html"
    ;;
  combined)
    # Just produce build/combined.md, no rendering
    src=$(combine_full)
    bytes=$(wc -c < "${src}")
    echo "[combined] ${src} (${bytes} bytes)"
    ;;
  clean)
    rm -rf "${OUT_DIR}"
    rm -f "${BUILD_DIR}"/combined*.md
    echo "Cleaned dist/ and ppt/build/combined*.md"
    ;;
  *)
    echo "Unknown command: ${cmd}"
    echo "Usage: bash scripts/build.sh {full|minimal|chapter <folder>|html-only|combined|clean}"
    exit 1
    ;;
esac
