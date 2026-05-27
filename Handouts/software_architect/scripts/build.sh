#!/usr/bin/env bash
# Build script for 架構師的藍圖 (The Architect's Blueprint) Marp slides.
#
# Usage:
#   bash software_architect/scripts/build.sh full                  # 整套 PDF + HTML
#   bash software_architect/scripts/build.sh minimal               # 精簡版（每章 overview + cheatsheet）
#   bash software_architect/scripts/build.sh chapter 01-role-value # 單一章節（資料夾名）
#   bash software_architect/scripts/build.sh html-only             # 僅產生 HTML
#   bash software_architect/scripts/build.sh combined              # 只產 build/combined.md
#   bash software_architect/scripts/build.sh clean                 # 清除 dist/ 與 build/combined*.md

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
  "01-role-value"
  "02-requirements-sla"
  "03-process-app-types"
  "04-tech-stack-data"
  "05-ilities"
  "06-components-patterns"
  "07-system-architecture"
  "08-advanced-patterns"
  "09-case-study"
  "10-soft-skills"
  "90-appendix"
)

# Minimal subset — cover + roadmap + how-to-use + each chapter overview + cheatsheet
MINIMAL_FILES=(
  "00-prologue/00_cover.md"
  "00-prologue/01_roadmap.md"
  "00-prologue/02_how_to_use.md"
  "01-role-value/00_overview.md"
  "02-requirements-sla/00_overview.md"
  "03-process-app-types/00_overview.md"
  "04-tech-stack-data/00_overview.md"
  "05-ilities/00_overview.md"
  "06-components-patterns/00_overview.md"
  "07-system-architecture/00_overview.md"
  "08-advanced-patterns/00_overview.md"
  "09-case-study/00_overview.md"
  "10-soft-skills/00_overview.md"
  "90-appendix/01_cheatsheet.md"
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
    render_pdf  "${src}" "${OUT_DIR}/architect_blueprint_full.pdf"
    render_html "${src}" "${OUT_DIR}/architect_blueprint_full.html"
    echo "Done. Output in ${OUT_DIR}/"
    ;;
  minimal)
    src=$(combine_minimal)
    bytes=$(wc -c < "${src}")
    echo "[combined] ${src} (${bytes} bytes)"
    render_pdf  "${src}" "${OUT_DIR}/architect_blueprint_minimal.pdf"
    render_html "${src}" "${OUT_DIR}/architect_blueprint_minimal.html"
    echo "Done."
    ;;
  chapter)
    name="${2:-}"
    if [[ -z "${name}" ]]; then
      echo "Usage: bash software_architect/scripts/build.sh chapter <chapter-folder>" >&2
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
    render_html "${src}" "${OUT_DIR}/architect_blueprint_full.html"
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
    echo "Usage: bash software_architect/scripts/build.sh {full|minimal|chapter <folder>|html-only|combined|clean}"
    exit 1
    ;;
esac
