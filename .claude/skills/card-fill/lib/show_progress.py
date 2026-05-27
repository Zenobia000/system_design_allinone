#!/usr/bin/env python3
"""Stop hook — print a single info line about workshop progress.

Coach-mode: shows count only, no automatic next-card recommendation. The
student looks at /card-fill map when they want to plan.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(SKILL_DIR / "lib"))

from _config import ledger_path, load_config, templates_dir


def main():
    try:
        json.load(sys.stdin)
    except json.JSONDecodeError:
        pass

    cfg = load_config()
    lp = ledger_path(cfg)
    registered = 0
    if lp.exists():
        try:
            ledger = json.loads(lp.read_text(encoding="utf-8"))
            registered = len(ledger)
        except json.JSONDecodeError:
            pass
    tdir = templates_dir(cfg)
    import re
    is_slug = re.compile(r"[a-z0-9]+(-[a-z0-9]+)*").fullmatch
    downloaded = len([p for p in tdir.glob("*.md") if is_slug(p.stem)]) if tdir.exists() else 0
    if registered == 0 and downloaded == 0:
        sys.exit(0)
    msg = f"[card-fill] {registered} card(s) registered · {downloaded} template(s) downloaded · run `/card-fill map` to see the DAG"
    print(json.dumps({"systemMessage": msg}))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"[card-fill progress error] {e}", file=sys.stderr)
        sys.exit(0)
