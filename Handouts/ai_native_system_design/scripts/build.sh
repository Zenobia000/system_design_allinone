#!/usr/bin/env bash
# Build script for 「AI 時代系統設計速成」(AI-Native System Design Crash Course).
#
# Usage:
#   bash ai_native_system_design/scripts/build.sh full                       # 整套 PDF + HTML
#   bash ai_native_system_design/scripts/build.sh chapter 02-module-a-requirements  # 單章
#   bash ai_native_system_design/scripts/build.sh html-only                  # 僅 HTML
#   bash ai_native_system_design/scripts/build.sh combined                   # 只產 build/combined.md
#   bash ai_native_system_design/scripts/build.sh clean                      # 清除產出

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PPT_DIR="${ROOT_DIR}/ppt"
THEME_DIR="${PPT_DIR}/themes"
OUT_DIR="${ROOT_DIR}/dist"
BUILD_DIR="${PPT_DIR}/build"
MARP="npx --yes @marp-team/marp-cli@latest"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js not installed. Install Node.js >= 18 first." >&2
  exit 1
fi

if [[ -z "${CHROME_PATH:-}" ]] && ! command -v chromium >/dev/null 2>&1 \
   && ! command -v google-chrome >/dev/null 2>&1 && ! command -v chrome >/dev/null 2>&1; then
  detected=$(find "${HOME}/.cache/puppeteer/chrome" -maxdepth 4 -name chrome -type f -executable 2>/dev/null | sort -V | tail -1)
  if [[ -n "${detected}" ]]; then
    export CHROME_PATH="${detected}"
    echo "[chrome] using puppeteer cache: ${CHROME_PATH}"
  fi
fi

mkdir -p "${OUT_DIR}" "${BUILD_DIR}"

ORDERED_DIRS=(
  "00-prologue"
  "01-sdlc-overview"
  "02-module-a-requirements"
  "03-module-b-tech-stack"
  "04-module-c-ilities"
  "05-module-d-patterns"
  "06-case-ecommerce"
  "07-case-livestream"
  "08-case-rag"
  "09-ai-workflow"
  "90-appendix"
)

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
      sed 's/\r$//' "${f}" >> "${out}"
      first=false
    else
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
    render_pdf  "${src}" "${OUT_DIR}/ai_native_full.pdf"
    render_html "${src}" "${OUT_DIR}/ai_native_full.html"
    echo "Done. Output in ${OUT_DIR}/"
    ;;
  chapter)
    name="${2:-}"
    if [[ -z "${name}" ]]; then
      echo "Usage: bash ai_native_system_design/scripts/build.sh chapter <chapter-folder>" >&2
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
    render_html "${src}" "${OUT_DIR}/ai_native_full.html"
    ;;
  combined)
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
    echo "Usage: bash ai_native_system_design/scripts/build.sh {full|chapter <folder>|html-only|combined|clean}"
    exit 1
    ;;
esac
