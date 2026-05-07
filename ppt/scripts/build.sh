#!/usr/bin/env bash
# 把 ppt/ 下所有章節 markdown 依資料夾與檔名排序串成一份完整 deck。
# 用法：
#   bash scripts/build.sh              # 產生 build/combined.md
#   bash scripts/build.sh --pdf        # 額外用 marp 產 PDF（需安裝 @marp-team/marp-cli）
#   bash scripts/build.sh --html       # 額外產 HTML
set -euo pipefail

PPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${PPT_DIR}/build"
OUT_MD="${OUT_DIR}/combined.md"

mkdir -p "${OUT_DIR}"

cd "${PPT_DIR}"

# Collect content directories in order: prologue → 01..07 chapters → appendix
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

# Take frontmatter from first file only; subsequent files have frontmatter stripped
first=true
: > "${OUT_MD}"
for dir in "${ORDERED_DIRS[@]}"; do
  [[ -d "${dir}" ]] || continue
  # Sort by file name (00_overview comes first, 99_recap last)
  while IFS= read -r f; do
    if ${first}; then
      cat "${f}" >> "${OUT_MD}"
      first=false
    else
      # Strip leading YAML frontmatter (between first pair of --- markers)
      awk 'BEGIN{fm=0; printed=0} /^---$/{ if(fm==0){fm=1; next} else if(fm==1){fm=2; printed=1; next} } { if(fm==2 || printed){print} else if(fm==0){fm=2; print} }' "${f}" >> "${OUT_MD}"
    fi
    # Slide separator already present at top of each new file via Marp `---` page breaks within;
    # ensure a hard page break between files
    printf '\n\n---\n\n' >> "${OUT_MD}"
  done < <(find "${dir}" -maxdepth 1 -name '*.md' | sort)
done

bytes=$(wc -c < "${OUT_MD}")
lines=$(wc -l < "${OUT_MD}")
echo "[build] wrote ${OUT_MD}: ${lines} lines, ${bytes} bytes"

if [[ "${1:-}" == "--pdf" ]]; then
  command -v marp >/dev/null || { echo "marp CLI not installed"; exit 1; }
  marp --theme-set themes/ "${OUT_MD}" --pdf -o "${OUT_DIR}/combined.pdf"
  echo "[build] wrote ${OUT_DIR}/combined.pdf"
fi

if [[ "${1:-}" == "--html" ]]; then
  command -v marp >/dev/null || { echo "marp CLI not installed"; exit 1; }
  marp --theme-set themes/ "${OUT_MD}" --html -o "${OUT_DIR}/combined.html"
  echo "[build] wrote ${OUT_DIR}/combined.html"
fi
