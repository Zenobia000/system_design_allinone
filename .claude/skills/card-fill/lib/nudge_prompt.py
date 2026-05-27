#!/usr/bin/env python3
"""UserPromptSubmit hook — gentle nudge when student mentions a slug.

Coach-mode: this hook does NOT inject upstream content, does NOT auto-load
templates, does NOT call models. It just whispers a 1-2 line tip so the
student remembers to (a) think about upstream, (b) consider their confidence
labelling.

Reads {prompt: "..."} JSON from stdin; emits JSON with additionalContext.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(SKILL_DIR / "lib"))

from _config import load_config, template_path
from parse_frontmatter import get_upstream


def main():
    try:
        payload = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)
    prompt = payload.get("prompt", "")
    if not prompt:
        sys.exit(0)

    cfg = load_config()
    chain = cfg.get("recommended_chain", []) or []
    mentioned = [s for s in chain if s in prompt]
    if not mentioned:
        sys.exit(0)

    tips: list[str] = []
    for slug in mentioned[:2]:  # cap at 2 to stay quiet
        tpl = template_path(cfg, slug)
        if tpl:
            try:
                up = get_upstream(tpl, cfg.get("variant", "template-light"))
                req = up.get("required") or []
                if req:
                    tips.append(f"`{slug}` 上游通常是 {', '.join(req)} — 你決定每個用什麼素材了嗎？")
            except Exception:
                pass
        else:
            tips.append(f"`{slug}` 模板還沒下載：{cfg['atlas_base_url']}/{slug}/ → 存到 `templates/{slug}.md`")
    if not tips:
        sys.exit(0)

    msg = "**[card-fill coach]** " + " · ".join(tips)
    print(json.dumps({"hookSpecificOutput": {"additionalContext": msg}}))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"[card-fill nudge error] {e}", file=sys.stderr)
        sys.exit(0)
