#!/usr/bin/env python3
"""Extract the inner frontmatter from a deliverable's template-light/full code block.

Each deliverable .md under product_to_launch/content/deliverables/ embeds two
fenced code blocks tagged ```template-light and ```template-full. Inside each is
a YAML frontmatter declaring `upstream.required` and `upstream.optional`. This
parser locates that inner frontmatter for a chosen variant.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml


def extract_template_block(md_text: str, variant: str = "template-light") -> str | None:
    pattern = re.compile(
        rf"```{re.escape(variant)}\s*\n(.*?)\n```",
        re.DOTALL,
    )
    m = pattern.search(md_text)
    return m.group(1) if m else None


def parse_inner_frontmatter(block: str) -> dict:
    fm_match = re.match(r"^---\s*\n(.*?)\n---\s*\n?", block, re.DOTALL)
    if not fm_match:
        return {}
    try:
        data = yaml.safe_load(fm_match.group(1)) or {}
    except yaml.YAMLError:
        return {}
    return data if isinstance(data, dict) else {}


def get_upstream(deliverable_path: Path, variant: str = "template-light") -> dict:
    text = deliverable_path.read_text(encoding="utf-8")
    block = extract_template_block(text, variant)
    if not block:
        return {"required": [], "optional": []}
    fm = parse_inner_frontmatter(block)
    upstream = fm.get("upstream", {})
    if not isinstance(upstream, dict):
        return {"required": [], "optional": []}
    return {
        "required": upstream.get("required") or [],
        "optional": upstream.get("optional") or [],
    }


def get_template_body(deliverable_path: Path, variant: str = "template-light") -> str:
    """Return the template block WITHOUT the outer frontmatter (for trigger injection)."""
    text = deliverable_path.read_text(encoding="utf-8")
    block = extract_template_block(text, variant)
    if not block:
        return ""
    fm_match = re.match(r"^---\s*\n.*?\n---\s*\n?", block, re.DOTALL)
    return block[fm_match.end():] if fm_match else block


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: parse_frontmatter.py <deliverable.md> [variant]", file=sys.stderr)
        sys.exit(2)
    variant = sys.argv[2] if len(sys.argv) > 2 else "template-light"
    up = get_upstream(Path(sys.argv[1]), variant)
    print(f"required: {up['required']}")
    print(f"optional: {up['optional']}")
