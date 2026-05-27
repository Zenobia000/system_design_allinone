#!/usr/bin/env python3
"""`/card-fill log` — print the ledger as a readable table.

Usage:
  log.py
"""

from __future__ import annotations

import json

from _config import ledger_path, load_config


def main():
    cfg = load_config()
    lp = ledger_path(cfg)
    if not lp.exists():
        print("(ledger empty — nothing registered yet)")
        return
    try:
        ledger: dict = json.loads(lp.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        print("(ledger file corrupt)")
        return
    if not ledger:
        print("(ledger empty — nothing registered yet)")
        return
    # Format
    print(f"# Ledger · {len(ledger)} cards registered\n")
    for slug, entry in sorted(ledger.items()):
        print(f"## `{slug}`")
        print(f"- path: `{entry.get('path')}`")
        print(f"- sha:  `{entry.get('sha')}`")
        print(f"- when: {entry.get('registered_at')}")
        if entry.get("note"):
            print(f"- note: {entry['note']}")
        print()


if __name__ == "__main__":
    main()
