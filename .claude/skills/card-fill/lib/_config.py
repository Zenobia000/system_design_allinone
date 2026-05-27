"""Shared config loader for the coach-mode card-fill skill."""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

SKILL_DIR = Path(__file__).resolve().parent.parent  # .claude/skills/card-fill
REPO_ROOT = SKILL_DIR.parent.parent.parent           # repo root
CONFIG_PATH = SKILL_DIR / "workshop.config.yaml"

sys.path.insert(0, str(SKILL_DIR / "lib"))


def load_config() -> dict:
    cfg = yaml.safe_load(CONFIG_PATH.read_text(encoding="utf-8"))
    cfg["_repo_root"] = REPO_ROOT
    cfg["_skill_dir"] = SKILL_DIR
    return cfg


def templates_dir(cfg: dict) -> Path:
    return REPO_ROOT / cfg["templates_dir"]


def workspace_dir(cfg: dict) -> Path:
    return REPO_ROOT / cfg["workspace_dir"]


def ledger_path(cfg: dict) -> Path:
    return REPO_ROOT / cfg["ledger_path"]


def seed_brief_path(cfg: dict) -> Path:
    return REPO_ROOT / cfg["seed_brief"]


def template_path(cfg: dict, slug: str) -> Path | None:
    """Return path to student-downloaded template, or None if not downloaded yet."""
    p = templates_dir(cfg) / f"{slug}.md"
    return p if p.exists() else None
