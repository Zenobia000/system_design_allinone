#!/usr/bin/env python3
"""`/card-fill check <path>` — verify a student-filled deliverable against the template contract.

Coach-mode: emits a Reviewer prompt for the student to feed into a fresh
Claude session (or Task sub-agent). Does NOT call any model directly.

Also runs a handful of cheap mechanical checks locally so the student gets
instant feedback on the most common errors.

Usage:
  check.py <path-to-output.md> [--template <path-to-template.md>] [--no-prompt]
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

from _config import SKILL_DIR


HOW_TOKENS = [
    r"\bSELECT\s+\*",
    r"\bINSERT\s+INTO\b",
    r"\bif\s*\(",
    r"\bfor\s*\(",
    r"```python",
    r"```ts",
    r"```js",
    r"http[s]?://\S+/api/",
]


def mechanical_checks(text: str) -> list[tuple[str, str]]:
    """Return (severity, message) tuples for cheap rule-based checks."""
    issues: list[tuple[str, str]] = []

    # 1. confidence badges anywhere?
    if not re.search(r"\[H\]|\[M\]|\[L\]", text):
        issues.append(("P0", "全文沒有任何 [H]/[M]/[L] confidence badge — 範本契約要求每量化結論都有"))

    # 2. [L] without 依據:
    l_lines = [ln for ln in text.splitlines() if "[L]" in ln]
    naked_l = [ln for ln in l_lines if "（依據" not in ln and "(依據" not in ln and "依據：" not in ln]
    if naked_l:
        issues.append(("P1", f"{len(naked_l)} 條 [L] 標註沒附「（依據：...）」說明為何不確定"))

    # 3. _TODO_ markers (good — but flag silently filled fields that should have been _TODO_)
    todo_count = len(re.findall(r"_TODO[:_]", text))
    if todo_count == 0 and any("[L]" in ln for ln in text.splitlines()):
        issues.append(("P2", "有 [L] 標註但沒任何 _TODO_ — 確認所有缺資料都誠實標出來了"))

    # 4. Decision Log + ≥ 2 rejected options
    if re.search(r"#+\s*Decision\s*Log", text, re.IGNORECASE):
        block = text[text.lower().find("decision log") :]
        rejected = len(re.findall(r"rejected", block, re.IGNORECASE))
        if rejected < 2:
            issues.append(("P1", f"Decision Log 段只找到 {rejected} 處 rejected — 範本要求每條決策 ≥ 2 個 rejected options"))

    # 5. How-tokens (only flag if NOT api-spec / data-model / unit-test by filename heuristic)
    how_hits = []
    for pat in HOW_TOKENS:
        if re.search(pat, text, re.IGNORECASE):
            how_hits.append(pat)
    if how_hits:
        issues.append(("P2", f"偵測到 how 字眼：{how_hits[:3]}... — 若本卡不該寫 how (例如 PRD / JTBD / ADR)，請改寫"))

    # 6. 自檢清單
    if "[!CAUTION]" in text:
        # any unchecked ⬜ or ❌ after the caution block?
        caution_block = text[text.find("[!CAUTION]") :]
        unchecked = len(re.findall(r"^\s*-\s*\[\s*\]", caution_block, re.MULTILINE))
        if unchecked > 0:
            issues.append(("P0", f"範本結尾 CAUTION 自檢清單有 {unchecked} 條未勾選"))
    else:
        issues.append(("P2", "未保留範本結尾的 `> [!CAUTION]` 自檢清單區塊"))

    return issues


def build_reviewer_prompt(output_text: str, template_text: str | None) -> str:
    reviewer_sys = (SKILL_DIR / "prompts" / "reviewer.system.md").read_text(encoding="utf-8")
    parts = [reviewer_sys, "\n\n## Draft to review\n", output_text]
    if template_text:
        parts.append("\n\n## Template contract (for reference)\n")
        parts.append(template_text)
    return "".join(parts)


def main():
    ap = argparse.ArgumentParser(description="Check a filled deliverable")
    ap.add_argument("path", help="path to the student's output .md")
    ap.add_argument("--template", help="path to the downloaded template (templates/<slug>.md)")
    ap.add_argument("--no-prompt", action="store_true", help="skip emitting the Reviewer prompt")
    args = ap.parse_args()

    p = Path(args.path)
    if not p.exists():
        print(f"file not found: {p}", file=sys.stderr)
        sys.exit(2)
    text = p.read_text(encoding="utf-8")

    print(f"# Mechanical checks · `{p.name}`\n")
    issues = mechanical_checks(text)
    if not issues:
        print("✅ no mechanical issues detected\n")
    else:
        for sev, msg in issues:
            print(f"- **{sev}**: {msg}")
        print()

    if args.no_prompt:
        return

    template_text = None
    if args.template:
        tp = Path(args.template)
        if tp.exists():
            template_text = tp.read_text(encoding="utf-8")
        else:
            print(f"_(template not found at {tp}; skipping template-aware review)_\n")

    prompt = build_reviewer_prompt(text, template_text)
    prompt_path = p.with_suffix(p.suffix + ".reviewer-prompt.txt")
    prompt_path.write_text(prompt, encoding="utf-8")

    print(f"## AI reviewer prompt written to\n\n`{prompt_path}`\n")
    print("把這份檔案的內容貼給 Claude（建議用新 session 或 Task sub-agent），讓 reviewer 出 issue list。")
    print("如果只要看機械檢查結果，可以加 `--no-prompt` 跳過這步。")


if __name__ == "__main__":
    main()
