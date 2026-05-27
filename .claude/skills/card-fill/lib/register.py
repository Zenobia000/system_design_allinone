#!/usr/bin/env python3
"""`/card-fill register <slug> <path>` — student manually records they finished a card.

Coach-mode: ledger is updated only when the student says so. The skill never
auto-registers based on file writes (no PostToolUse autopilot).

Usage:
  register.py <slug> <path-to-output.md>
  register.py <slug> <path> --note "explanation"
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import sys
from pathlib import Path

from _config import REPO_ROOT, ledger_path, load_config


def main():
    ap = argparse.ArgumentParser(description="Register a completed card in the ledger")
    ap.add_argument("slug")
    ap.add_argument("path", help="path to the student's filled deliverable .md")
    ap.add_argument("--note", default="", help="optional note (e.g. 'used brief for persona, [L] on emotional jobs')")
    ap.add_argument("--unregister", action="store_true", help="remove this slug from the ledger")
    args = ap.parse_args()

    cfg = load_config()
    lp = ledger_path(cfg)
    ledger: dict = {}
    if lp.exists():
        try:
            ledger = json.loads(lp.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            pass

    if args.unregister:
        if args.slug in ledger:
            del ledger[args.slug]
            lp.write_text(json.dumps(ledger, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            print(f"unregistered: {args.slug}")
        else:
            print(f"not in ledger: {args.slug}")
        return

    target = Path(args.path)
    if not target.is_absolute():
        target = REPO_ROOT / target
    if not target.exists():
        print(f"file not found: {target}", file=sys.stderr)
        sys.exit(2)

    sha = hashlib.sha256(target.read_bytes()).hexdigest()[:12]
    rel = target.relative_to(REPO_ROOT) if str(target).startswith(str(REPO_ROOT)) else target
    entry = {
        "path": str(rel),
        "sha": sha,
        "registered_at": dt.datetime.now().isoformat(timespec="seconds"),
        "note": args.note,
    }
    ledger[args.slug] = entry
    lp.parent.mkdir(parents=True, exist_ok=True)
    lp.write_text(json.dumps(ledger, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"registered: {args.slug} → {rel} (sha={sha})")


if __name__ == "__main__":
    main()
