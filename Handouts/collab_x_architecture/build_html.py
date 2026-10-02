"""Render MINDMAP.md + section_notes.json into a single study-guide HTML page.

Usage:
    python build_html.py                 # writes index.html (full document)
    python build_html.py --fragment OUT  # writes a skeleton-less page for Artifact publishing
"""

from __future__ import annotations

import argparse
import html
import json
import re
from dataclasses import dataclass, field
from pathlib import Path

HERE = Path(__file__).parent
MINDMAP = HERE / "MINDMAP.md"
NOTES = HERE / "section_notes.json"

MARKERS = {
    "💡": ("key", "重點"),
    "📊": ("chart", "圖表"),
    "🎤": ("speaker", "講者備註"),
    "📖": ("story", "情境"),
    "🔗": ("link", "對應"),
    "⏱": ("time", "時效"),
}
MARKER_RE = re.compile(r"^(💡|📊|🎤|📖|🔗|⏱)\s*(?:[^：:]{1,8}[：:])?\s*")
CHAPTER_RE = re.compile(r"^第\s*(\d+)\s*章\s*(.*)$")
SECTION_RE = re.compile(r"^(\d+\.\d+)\s+(.*)$")
PART_RE = re.compile(r"^(Part\s+[IVX]+)\s*(.*)$")


@dataclass
class Bullet:
    text: str
    children: list["Bullet"] = field(default_factory=list)


@dataclass
class Section:
    num: str | None
    title: str
    bullets: list[Bullet] = field(default_factory=list)


@dataclass
class Group:
    title: str
    chapter: int | None
    bullets: list[Bullet] = field(default_factory=list)
    sections: list[Section] = field(default_factory=list)


@dataclass
class Part:
    title: str
    bullets: list[Bullet] = field(default_factory=list)
    groups: list[Group] = field(default_factory=list)


def parse(markdown: str) -> tuple[str, list[Part]]:
    doc_title = ""
    parts: list[Part] = []
    stack: list[tuple[int, list[Bullet]]] = []

    def bullet_root() -> list[Bullet]:
        part = parts[-1]
        if not part.groups:
            return part.bullets
        group = part.groups[-1]
        return group.sections[-1].bullets if group.sections else group.bullets

    for raw in markdown.splitlines():
        line = raw.rstrip()
        if not line.strip():
            continue
        if line.startswith("# "):
            doc_title = line[2:].strip()
        elif line.startswith("## "):
            parts.append(Part(line[3:].strip()))
            stack = []
        elif line.startswith("### "):
            title = line[4:].strip()
            match = CHAPTER_RE.match(title)
            parts[-1].groups.append(
                Group(match.group(2).strip() if match else title, int(match.group(1)) if match else None)
            )
            stack = []
        elif line.startswith("#### "):
            title = line[5:].strip()
            match = SECTION_RE.match(title)
            section = Section(match.group(1), match.group(2)) if match else Section(None, title)
            parts[-1].groups[-1].sections.append(section)
            stack = []
        elif line.lstrip().startswith("- "):
            depth = (len(line) - len(line.lstrip())) // 2
            node = Bullet(line.lstrip()[2:].strip())
            stack = [entry for entry in stack if entry[0] < depth]
            target = stack[-1][1] if stack else bullet_root()
            target.append(node)
            stack.append((depth, node.children))
    return doc_title, parts


def esc(text: str) -> str:
    return html.escape(text, quote=True)


def render_bullets(bullets: list[Bullet], cls: str = "outline") -> str:
    if not bullets:
        return ""
    items = []
    for bullet in bullets:
        text = bullet.text
        match = MARKER_RE.match(text)
        chip = ""
        if match:
            kind, label = MARKERS[match.group(1)]
            chip = f'<span class="chip chip-{kind}">{label}</span>'
            text = text[match.end():]
        items.append(f"<li>{chip}<span>{esc(text)}</span>{render_bullets(bullet.children, 'sub')}</li>")
    return f'<ul class="{cls}">{"".join(items)}</ul>'


def split_part_title(title: str) -> tuple[str, str]:
    match = PART_RE.match(title)
    return (match.group(1), match.group(2).strip()) if match else ("", title)


def slug(index: int, prefix: str) -> str:
    return f"{prefix}{index}"


def render_page(doc_title: str, parts: list[Part], notes: dict[str, str]) -> tuple[str, str]:
    nav, body = [], []
    group_counter = 0
    for p_index, part in enumerate(parts):
        label, name = split_part_title(part.title)
        part_id = slug(p_index, "part")
        nav_items = []
        groups_html = []
        for group in part.groups:
            group_counter += 1
            is_chapter = group.chapter is not None
            group_id = f"ch{group.chapter}" if is_chapter else slug(group_counter, "g")
            if is_chapter:
                nav_items.append(
                    f'<li><a href="#{group_id}"><span class="nav-num">{group.chapter}</span>{esc(group.title)}</a></li>'
                )
            lead = notes.get(group_id, "") if is_chapter else ""
            sections_html = []
            for section in group.sections:
                note = notes.get(section.num or "", "")
                sec_id = f"s{section.num.replace('.', '-')}" if section.num else ""
                sections_html.append(
                    f'<section class="sec" {f"id={chr(34)}{sec_id}{chr(34)}" if sec_id else ""}>'
                    f'<div class="sec-num">{esc(section.num or "")}</div>'
                    f'<div class="sec-body"><h4>{esc(section.title)}</h4>'
                    f'{f"<p class={chr(34)}note{chr(34)}>{esc(note)}</p>" if note else ""}'
                    f"{render_bullets(section.bullets)}</div></section>"
                )
            eyebrow = f'<p class="eyebrow">第 {group.chapter} 章</p>' if is_chapter else ""
            groups_html.append(
                f'<article class="group {"chapter" if is_chapter else "aux"}" id="{group_id}">'
                f"<header>{eyebrow}<h3>{esc(group.title)}</h3>"
                f'{f"<p class={chr(34)}lead{chr(34)}>{esc(lead)}</p>" if lead else ""}</header>'
                f"{render_bullets(group.bullets)}{''.join(sections_html)}</article>"
            )
        nav.append(
            f'<li class="nav-part"><a href="#{part_id}">{f"<span class={chr(34)}nav-label{chr(34)}>{label}</span>" if label else ""}{esc(name)}</a>'
            f'{f"<ol>{chr(10).join(nav_items)}</ol>" if nav_items else ""}</li>'
        )
        body.append(
            f'<div class="part" id="{part_id}"><div class="part-head">'
            f'{f"<p class={chr(34)}part-label{chr(34)}>{label}</p>" if label else ""}<h2>{esc(name)}</h2></div>'
            f"{render_bullets(part.bullets)}{''.join(groups_html)}</div>"
        )
    chapters = sum(1 for part in parts for group in part.groups if group.chapter is not None)
    sections = sum(1 for part in parts for group in part.groups for s in group.sections if s.num)
    content = TEMPLATE.format(
        title=esc(doc_title),
        chapters=chapters,
        sections=sections,
        nav="".join(nav),
        body="".join(body),
    )
    return content, esc(doc_title)


TEMPLATE = """<title>AI Builder 課程地圖</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@600;700&display=swap">
<style>
/* Layout: sticky chapter index on the left, one reading column; each section is a spec row (number | title, key point, outline). */
:root {{
  --paper: #f3f5f7; --surface: #ffffff; --ink: #17202a; --muted: #56626f; --rule: #d6dde4;
  --accent: #0b6a66; --accent-soft: #dff0ed; --warn: #8f5500; --warn-soft: #fbeedb;
  --font-display: "Noto Serif TC", "Songti TC", serif;
  --font-body: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
  --step-0: 1rem; --step-1: 1.125rem; --step-2: 1.4rem; --step-3: 1.9rem; --step-4: 2.6rem;
}}
@media (prefers-color-scheme: dark) {{
  :root:not([data-theme="light"]) {{
    --paper: #10151b; --surface: #161d24; --ink: #e3e8ed; --muted: #9aa6b2; --rule: #27313b;
    --accent: #5fc4b9; --accent-soft: #15302d; --warn: #e6b062; --warn-soft: #2d2415; color-scheme: dark;
  }}
}}
:root[data-theme="dark"] {{
  --paper: #10151b; --surface: #161d24; --ink: #e3e8ed; --muted: #9aa6b2; --rule: #27313b;
  --accent: #5fc4b9; --accent-soft: #15302d; --warn: #e6b062; --warn-soft: #2d2415; color-scheme: dark;
}}
* {{ box-sizing: border-box; }}
html {{ scroll-behavior: smooth; }}
@media (prefers-reduced-motion: reduce) {{ html {{ scroll-behavior: auto; }} }}
body {{ margin: 0; background: var(--paper); color: var(--ink); font-family: var(--font-body); font-size: var(--step-0); line-height: 1.75; }}
a {{ color: inherit; }}
a:focus-visible, input:focus-visible {{ outline: 2px solid var(--accent); outline-offset: 2px; }}
.wrap {{ max-width: 1240px; margin: 0 auto; padding-inline: 16px; padding-block: 0 4rem; }}
.masthead {{ padding-block: 3rem 2rem; border-bottom: 1px solid var(--rule); display: grid; gap: 1rem; }}
.masthead .kicker {{ font-family: var(--font-mono); font-size: .8rem; letter-spacing: .08em; color: var(--accent); margin: 0; }}
.masthead h1 {{ font-family: var(--font-display); font-size: var(--step-4); line-height: 1.25; margin: 0; text-wrap: balance; }}
.masthead .stats {{ color: var(--muted); margin: 0; }}
.filter {{ display: flex; gap: .75rem; align-items: center; flex-wrap: wrap; }}
.filter label {{ font-size: .9rem; color: var(--muted); }}
.filter input {{ flex: 1 1 16rem; max-width: 28rem; padding: .55rem .8rem; font: inherit; color: var(--ink); background: var(--surface); border: 1px solid var(--rule); border-radius: 6px; }}
.filter output {{ font-family: var(--font-mono); font-size: .85rem; color: var(--muted); }}
.layout {{ display: grid; grid-template-columns: 17rem minmax(0, 1fr); gap: 3rem; margin-top: 2rem; }}
nav.index {{ position: sticky; top: env(safe-area-inset-top, 0px); align-self: start; max-height: 100vh; overflow-y: auto; padding-block: 1rem; font-size: .9rem; }}
nav.index ul, nav.index ol {{ list-style: none; margin: 0; padding: 0; }}
nav.index .nav-part {{ margin-bottom: 1rem; }}
nav.index .nav-part > a {{ display: block; font-weight: 700; text-decoration: none; margin-bottom: .25rem; }}
nav.index .nav-label {{ display: block; font-family: var(--font-mono); font-size: .75rem; letter-spacing: .06em; color: var(--accent); font-weight: 600; }}
nav.index ol a {{ display: flex; gap: .5rem; padding: .2rem .5rem; border-radius: 4px; text-decoration: none; color: var(--muted); }}
nav.index ol a:hover {{ color: var(--ink); background: var(--accent-soft); }}
nav.index ol a.active {{ color: var(--ink); background: var(--accent-soft); font-weight: 500; }}
.nav-num {{ font-family: var(--font-mono); min-width: 1.5rem; text-align: right; color: var(--accent); font-variant-numeric: tabular-nums; }}
main {{ min-width: 0; }}
.part {{ margin-bottom: 4rem; }}
.part-head {{ border-top: 3px solid var(--ink); padding-top: 1rem; margin-bottom: 1.5rem; }}
.part-label {{ font-family: var(--font-mono); color: var(--accent); letter-spacing: .08em; margin: 0; font-size: .85rem; }}
.part-head h2 {{ font-family: var(--font-display); font-size: var(--step-3); margin: .25rem 0 0; line-height: 1.3; text-wrap: balance; }}
.group {{ margin-bottom: 3rem; scroll-margin-top: 1rem; }}
.group header {{ margin-bottom: 1rem; }}
.eyebrow {{ font-family: var(--font-mono); font-size: .8rem; color: var(--muted); margin: 0; letter-spacing: .06em; }}
.group h3 {{ font-family: var(--font-display); font-size: var(--step-2); margin: .2rem 0 .5rem; line-height: 1.35; text-wrap: balance; }}
.group.aux h3 {{ font-size: var(--step-1); font-family: var(--font-body); font-weight: 700; }}
.lead {{ font-size: var(--step-1); max-width: 42em; margin: 0; }}
.sec {{ display: grid; grid-template-columns: 4rem minmax(0, 1fr); gap: 1rem; padding-block: 1.1rem; border-top: 1px solid var(--rule); scroll-margin-top: 1rem; }}
.sec-num {{ font-family: var(--font-mono); font-weight: 600; color: var(--accent); font-variant-numeric: tabular-nums; padding-top: .15rem; }}
.sec-body {{ min-width: 0; }}
.sec h4 {{ margin: 0 0 .35rem; font-size: var(--step-1); line-height: 1.5; }}
.note {{ margin: 0 0 .6rem; max-width: 42em; background: var(--accent-soft); padding: .6rem .85rem; border-radius: 6px; }}
ul.outline, ul.sub {{ margin: 0; padding-left: 1.1rem; color: var(--muted); font-size: .92rem; line-height: 1.7; max-width: 46em; }}
ul.sub {{ margin-top: .15rem; }}
ul.outline li, ul.sub li {{ margin-block: .1rem; }}
.chip {{ display: inline-block; font-size: .72rem; letter-spacing: .04em; font-weight: 500; padding: 0 .45rem; margin-right: .4rem; border-radius: 3px; border: 1px solid var(--rule); color: var(--ink); vertical-align: .1em; white-space: nowrap; }}
.chip-key {{ border-color: var(--accent); color: var(--accent); }}
.chip-time {{ border-color: var(--warn); color: var(--warn); background: var(--warn-soft); }}
.chip-link {{ border-style: dashed; }}
.empty {{ color: var(--muted); padding-block: 2rem; }}
@media (max-width: 860px) {{
  .layout {{ grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }}
  nav.index {{ position: static; max-height: none; border: 1px solid var(--rule); border-radius: 6px; padding: 1rem; background: var(--surface); }}
  .masthead h1 {{ font-size: var(--step-3); }}
  .sec {{ grid-template-columns: minmax(0, 1fr); gap: .25rem; }}
}}
</style>
<div class="wrap">
  <header class="masthead">
    <p class="kicker">課程心智圖 · 每節重點說明</p>
    <h1>{title}</h1>
    <p class="stats">共 {chapters} 章、{sections} 節。每一節上方的底色段落是這一節要讓學生帶走的重點，下方是心智圖原文大綱。</p>
    <div class="filter">
      <label for="q">搜尋章節</label>
      <input id="q" type="search" placeholder="例如：V-Model、ADR、AI 味" autocomplete="off">
      <output id="count" for="q"></output>
    </div>
  </header>
  <div class="layout">
    <nav class="index" aria-label="章節目錄"><ul>{nav}</ul></nav>
    <main id="content">{body}<p class="empty" id="empty" hidden>沒有符合的章節，換個關鍵字試試。</p></main>
  </div>
</div>
<script>
(() => {{
  const input = document.getElementById('q');
  const count = document.getElementById('count');
  const empty = document.getElementById('empty');
  const groups = [...document.querySelectorAll('.group')];
  const parts = [...document.querySelectorAll('.part')];
  input.addEventListener('input', () => {{
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    groups.forEach(group => {{
      const secs = [...group.querySelectorAll('.sec')];
      const headMatch = !q || group.querySelector('header').textContent.toLowerCase().includes(q);
      let any = false;
      secs.forEach(sec => {{
        const hit = headMatch || sec.textContent.toLowerCase().includes(q);
        sec.hidden = !hit;
        if (hit) {{ any = true; shown += 1; }}
      }});
      group.hidden = !(headMatch || any || (!secs.length && group.textContent.toLowerCase().includes(q)));
    }});
    parts.forEach(part => {{ part.hidden = ![...part.querySelectorAll('.group')].some(g => !g.hidden); }});
    count.textContent = q ? `符合 ${{shown}} 節` : '';
    empty.hidden = !q || parts.some(p => !p.hidden);
  }});
  const links = new Map([...document.querySelectorAll('nav.index ol a')].map(a => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {{
    const observer = new IntersectionObserver(entries => {{
      entries.forEach(entry => {{
        if (!entry.isIntersecting) return;
        links.forEach(a => a.classList.remove('active'));
        const link = links.get(entry.target.id);
        if (link) link.classList.add('active');
      }});
    }}, {{ rootMargin: '0px 0px -70% 0px' }});
    document.querySelectorAll('.group.chapter').forEach(el => observer.observe(el));
  }}
}})();
</script>
"""


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--fragment", type=Path, help="write a skeleton-less page to this path")
    args = parser.parse_args()

    doc_title, parts = parse(MINDMAP.read_text(encoding="utf-8"))
    notes = json.loads(NOTES.read_text(encoding="utf-8"))
    content, _ = render_page(doc_title, parts, notes)

    missing = [
        s.num for p in parts for g in p.groups for s in g.sections if s.num and s.num not in notes
    ]
    if missing:
        raise SystemExit(f"section_notes.json is missing notes for: {', '.join(missing)}")

    if args.fragment:
        args.fragment.write_text(content, encoding="utf-8")
        print(f"wrote {args.fragment}")
        return
    head, body = content.split('<div class="wrap">', 1)
    full = (
        '<!doctype html>\n<html lang="zh-Hant">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        f'{head}</head>\n<body>\n<div class="wrap">{body}\n</body>\n</html>\n'
    )
    out = HERE / "index.html"
    out.write_text(full, encoding="utf-8")
    print(f"wrote {out}")


if __name__ == "__main__":
    main()
