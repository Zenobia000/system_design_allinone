---
name: card-fill
description: |
  Coach-mode helper for filling structured SDLC deliverables. Use when the
  student types `/card-fill hint <slug>`, `/card-fill register <slug>
  <path>`, `/card-fill check <path>`, `/card-fill map`, or `/card-fill log`,
  or mentions a card slug like jtbd / prd / adr / api-spec in conversation.
  The skill DOES NOT compose triggers, auto-load upstream, or run models.
  It nudges, registers, checks, and visualises — context engineering is
  the student's job.
metadata:
  workshop: smarttrip-fx
  mode: coach (semi-automated, NOT autopilot)
---

# card-fill — coach for the deliverable chain

## Philosophy

**Students grow by doing context engineering themselves**, not by watching
an autopilot fill cards. This skill provides scaffolding, not delivery.

> 過度自動化學員不會學到東西。— 用戶 2026-05-27

## The student's workflow (manual by design)

1. **Pick a slug** — anything from the 54 deliverables on atlas.sunnydatascience.com (or any new slug).
2. **Download the template** from `atlas.sunnydatascience.com/deliverables/<slug>/` and save to `templates/<slug>.md`.
3. **Drag the template into Claude Code** (or paste). Decide what upstream you'll inject — prior cards, the seed brief, external research — and paste those too. Tag each clearly with its source.
4. **Write your own prompt** telling Claude what to fill, what rules to follow, how to label confidence.
5. **Iterate** by talking to Claude until the output matches the template contract.
6. **Save** your filled card to `workspace/<slug>.md` (or wherever you like).
7. **Register** with the skill so it shows up in the map: `/card-fill register <slug> <path>`.
8. **Check** the output against the contract: `/card-fill check <path>` (emits a Reviewer prompt for you to feed into a fresh Claude session).
9. **Map** progress: `/card-fill map` shows your DAG + likely-unblocked next cards.

The skill **never** does steps 1–6 for you. Its territory is steps 7–9.

## Commands

| Command | What it does | What the student does |
|---|---|---|
| `/card-fill hint <slug>` | Prints template URL, upstream (if template downloaded), 3-4 common pitfalls, suggested next moves | Decides if they're ready, downloads template, gathers upstream |
| `/card-fill register <slug> <path>` | Appends to ledger: `{path, sha, registered_at, note}` | Manually commits "I'm calling this done" |
| `/card-fill check <path>` | Mechanical checks (badges, decision log, how-tokens, caution checklist) + writes Reviewer prompt to disk for student to feed to a model | Runs the check, reads issues, decides whether to fix |
| `/card-fill map` | Mermaid DAG: registered ✅, template-downloaded ⏳, recommended-but-untouched 💭 + edges from templates' `upstream:` | Looks at it, decides their own next move |
| `/card-fill log` | Lists ledger contents | Audits their own progress |

## Hooks (light-touch)

- **UserPromptSubmit** → `nudge_prompt.py` — if the student's message mentions a known slug, append a 1-line whisper ("`prd` template not downloaded yet" or "`prd` upstream usually includes project-brief, jtbd — did you decide what each one uses?"). Does NOT inject template content.
- **Stop** → `show_progress.py` — 1-line summary: `N registered · M templates · run /card-fill map`. No auto-next-card recommendation.

There is **no PreToolUse Write guard**. The student is responsible for what they write.

## How to invoke from this session

When the student types a `/card-fill ...` command, run the matching python via Bash:

```bash
python3 .claude/skills/card-fill/lib/hint.py <slug>
python3 .claude/skills/card-fill/lib/register.py <slug> <path> [--note "..."]
python3 .claude/skills/card-fill/lib/check.py <path> [--template <path>] [--no-prompt]
python3 .claude/skills/card-fill/lib/map.py
python3 .claude/skills/card-fill/lib/log.py
```

Then surface the output back to the student. **Do not** offer to "go ahead
and fill that card" — that defeats the design. If asked to fill a card,
ask them to do it themselves and offer `hint` / `check`.

## Files

- `workshop.config.yaml` — paths + recommended_chain hint list (not a hard manifest)
- `lib/_config.py` — config loader
- `lib/parse_frontmatter.py` — reads `upstream:` from template-light/full inner frontmatter
- `lib/hint.py` `register.py` `check.py` `map.py` `log.py` — the 5 commands
- `lib/nudge_prompt.py` `show_progress.py` — the 2 light hooks
- `prompts/reviewer.system.md` — only used by `check.py` (writes a prompt to disk for the student to feed to a model)
- `ledger/smarttrip.ledger.json` — student-controlled record of registered cards

## Anti-patterns this skill refuses to enable

- ❌ Auto-compose trigger / auto-load upstream / auto-run model
- ❌ Hard-block Write with PreToolUse hooks
- ❌ Hardcoded N-card manifest — student can register any slug they've worked on
- ❌ Spawning Reviewer sub-agents on the student's behalf (check.py only produces the prompt; student runs it)
