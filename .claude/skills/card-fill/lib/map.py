#!/usr/bin/env python3
"""`/card-fill map` — render Mermaid DAG of cards the student has registered.

Coach-mode: this is a mirror, not a controller. It shows what the student
has done and what's next from the downloaded templates' frontmatter — but
does not enforce any order.

Usage:
  map.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from _config import (
    REPO_ROOT,
    ledger_path,
    load_config,
    templates_dir,
)
from parse_frontmatter import get_upstream

import re


def _is_slug(name: str) -> bool:
    """Slugs are lowercase letters / digits / hyphens only. README etc. → skipped."""
    return bool(re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", name))


def collect_edges(cfg: dict, registered: set[str]) -> tuple[list[tuple[str, str]], set[str]]:
    """Walk downloaded templates; emit edges = (upstream_slug, slug).

    Also returns the set of slugs whose templates exist (so map can show them
    as nodes even if not yet registered).
    """
    edges: list[tuple[str, str]] = []
    seen_slugs: set[str] = set()
    tdir = templates_dir(cfg)
    if not tdir.exists():
        return edges, seen_slugs
    for tpl in sorted(tdir.glob("*.md")):
        slug = tpl.stem
        # Skip non-slug files (README, notes, anything not lowercase kebab-case)
        if not _is_slug(slug):
            continue
        seen_slugs.add(slug)
        try:
            up = get_upstream(tpl, cfg.get("variant", "template-light"))
        except Exception:
            continue
        for u in up["required"]:
            edges.append((u, slug))
            seen_slugs.add(u)
    return edges, seen_slugs


def main():
    cfg = load_config()
    lp = ledger_path(cfg)
    ledger: dict = {}
    if lp.exists():
        try:
            ledger = json.loads(lp.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            pass
    registered = set(ledger.keys())

    edges, downloaded = collect_edges(cfg, registered)
    all_nodes = downloaded | registered | set(cfg.get("recommended_chain", []))

    print("```mermaid")
    print("stateDiagram-v2")
    print("    direction LR")
    for slug in sorted(all_nodes):
        if slug in registered:
            label = f"{slug} ✅"
        elif slug in downloaded:
            label = f"{slug} ⏳ (template ready)"
        else:
            label = f"{slug} 💭 (recommended, not downloaded)"
        print(f'    state "{label}" as {slug.replace("-", "_")}')
    for src, dst in edges:
        print(f"    {src.replace('-', '_')} --> {dst.replace('-', '_')}")
    print("```\n")

    print(f"**已 register**: {len(registered)} 張")
    print(f"**已下載模板**: {len(downloaded)} 張")
    print(f"**recommended chain 未動**: {len(set(cfg.get('recommended_chain', [])) - registered - downloaded)} 張")

    # Suggest next moves (NOT auto-execute)
    if downloaded - registered:
        unblocked: list[str] = []
        for slug in downloaded - registered:
            tpl_path = templates_dir(cfg) / f"{slug}.md"
            try:
                up = get_upstream(tpl_path, cfg.get("variant", "template-light"))
            except Exception:
                up = {"required": [], "optional": []}
            missing_in_workshop = [u for u in up["required"] if u in downloaded and u not in registered]
            if not missing_in_workshop:
                unblocked.append(slug)
        if unblocked:
            print(f"\n**可下手的候選**（你已下載模板、上游也都 register 或屬於外部來源）：")
            for s in unblocked:
                print(f"- `{s}` — 跑 `python3 .claude/skills/card-fill/lib/hint.py {s}` 看詳細提示")


if __name__ == "__main__":
    main()
