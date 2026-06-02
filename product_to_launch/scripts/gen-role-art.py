#!/usr/bin/env python3
"""Generate the SD + DBA role-hero art via GPT-image-2.

The original gen-images.sh relies on a `draw.py` skill that isn't present on
every machine; this script talks to the OpenAI Images API directly (same
approach as Handouts/.../_batch_generate_diagrams.py) and only fills the two
role heroes the app was missing.

Setup once:  echo 'OPENAI_API_KEY=sk-...' >> ~/.openai.env
Run:         python3 scripts/gen-role-art.py
Then:        node scripts/optimize-images.mjs      # PNG -> webp (640w + 1280w)

Output: originals/generated/role-hero-{sd,dba}.png  (1536x1024)
"""
import base64
import os
import sys
import time
from pathlib import Path


def load_env_from_file(path: Path):
    if not path.exists():
        return
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env_from_file(Path.cwd() / ".env")
load_env_from_file(Path.home() / ".openai.env")

# Same editorial frame as the other 10 role heroes in scripts/gen-images.sh,
# so SD/DBA sit visually consistent next to them.
ROLE_FRAME = (
    "Editorial overhead view, deep navy ink #0a0e14 table surface with faint cyan "
    "#6dd5ed grid, a single sheet of cream off-white #ece5d3 paper with "
    "correction-orange #ff6a1a annotation accents. Minimal flat illustration, no "
    "people, no faces, no readable text. On the paper:"
)

ROLES = {
    "role-hero-sd": (
        f"{ROLE_FRAME} a module decomposition diagram with several connected "
        "component boxes and dependency arrows, a UML class box showing attribute "
        "and method rows, a small ports-and-adapters hexagon sketch in one corner, "
        "and a translucent tracing-paper edge lifting at the side."
    ),
    "role-hero-dba": (
        f"{ROLE_FRAME} a database cylinder icon connected by crow's-foot "
        "relationship lines to two entity-relationship boxes, a small B-tree index "
        "sketch, a backup-and-restore timeline with point-in-time-recovery markers, "
        "and a tiny key icon resting on the corner."
    ),
}

OUT = Path("originals/generated")


def main():
    from openai import OpenAI

    if not os.getenv("OPENAI_API_KEY"):
        print(
            "ERROR: OPENAI_API_KEY not found. Add it to ~/.openai.env or ./.env:\n"
            "  echo 'OPENAI_API_KEY=sk-...' >> ~/.openai.env",
            file=sys.stderr,
        )
        sys.exit(1)

    OUT.mkdir(parents=True, exist_ok=True)
    client = OpenAI()
    failed = []

    for name, prompt in ROLES.items():
        outfile = OUT / f"{name}.png"
        if outfile.exists():
            print(f"SKIP {outfile} (exists — delete to regenerate)")
            continue
        print(f"GEN  {name} ...", flush=True)
        t0 = time.time()
        try:
            result = client.images.generate(
                model="gpt-image-2", prompt=prompt, size="1536x1024", quality="high", n=1
            )
            outfile.write_bytes(base64.b64decode(result.data[0].b64_json))
            print(f"OK   {outfile}  ({time.time() - t0:.1f}s, {outfile.stat().st_size // 1024}KB)")
        except Exception as e:  # noqa: BLE001
            print(f"FAIL {name}: {e}", file=sys.stderr)
            failed.append(name)

    if failed:
        sys.exit(1)
    print("\nDone. Next: node scripts/optimize-images.mjs  (then point sd.md/dba.md art at the new webp)")


if __name__ == "__main__":
    main()
