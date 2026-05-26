#!/usr/bin/env node
// Build-time: extract the first fenced code block from each deliverable
// and emit a Claude Code skill-shaped markdown file to public/skills/.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "content", "deliverables");
const OUT = path.join(ROOT, "public", "skills");

// CommonMark N-backtick rule: opening uses ≥ 3 backticks; closing must match or
// exceed the opening count. Inner fences with fewer backticks are content.
// Matches a fence opener at start-of-line/string, captures backtick count + info string,
// then lazily consumes until a closing fence of equal-or-greater backticks.
const FENCE_RE_GLOBAL = /(?:^|\n)(`{3,})([^\n]*)\n([\s\S]*?)\n\1`*[ \t]*(?=\n|$)/g;

function extractFences(body) {
  const out = { default: null, quick: null, full: null };
  for (const m of body.matchAll(FENCE_RE_GLOBAL)) {
    const lang = m[2].trim();
    const text = m[3].replace(/\s+$/, "");
    // template-light/full = new doc-driven names; prompt-quick/full = legacy fallback.
    const kind = lang === "template-light" || lang === "prompt-quick" ? "quick"
               : lang === "template-full" || lang === "prompt-full" ? "full"
               : "default";
    if (out[kind] == null) out[kind] = text;
  }
  return out;
}

function yamlScalar(v) {
  if (v == null) return "";
  const s = String(v).replace(/"/g, '\\"');
  return `"${s}"`;
}

function yamlList(arr) {
  if (!Array.isArray(arr) || !arr.length) return "[]";
  return `[${arr.map((x) => yamlScalar(x)).join(", ")}]`;
}

function buildSkill(fm, prompt, variant) {
  const suffix = variant === "default" ? "prompt" : variant;
  const name = `${fm.slug}-${suffix}`;
  const description = fm.hook || `${fm.title} prompt`;
  const variantLabel = variant === "quick" ? "Quick (≤ 12 行)"
                     : variant === "full" ? "Full (含 markdown 分段 / schema / self-verify)"
                     : null;
  return `---
name: ${name}
description: ${yamlScalar(description)}
metadata:
  type: prompt
  variant: ${variant}
  source: launch-atlas
  stage: ${yamlScalar(fm.stage)}
  roles: ${yamlList(fm.roles)}
  deliverable_slug: ${yamlScalar(fm.slug)}
---

# ${fm.title}${variantLabel ? ` · ${variantLabel}` : ""}

${fm.when_to_use ? `**何時用：** ${fm.when_to_use}\n\n` : ""}${fm.ai_leverage ? `**AI 加速：** ${fm.ai_leverage}\n\n` : ""}## Prompt

\`\`\`
${prompt}
\`\`\`
`;
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`[build-skills] missing source dir: ${SRC}`);
    process.exit(1);
  }
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".md"));
  let emitted = 0;
  let skipped = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(SRC, file), "utf-8");
    const { data: fm, content: body } = matter(raw);
    const fences = extractFences(body);

    if (fences.quick && fences.full) {
      // Upgraded card: emit both variants.
      fs.writeFileSync(path.join(OUT, `${fm.slug}-quick.md`), buildSkill(fm, fences.quick, "quick"), "utf-8");
      fs.writeFileSync(path.join(OUT, `${fm.slug}-full.md`), buildSkill(fm, fences.full, "full"), "utf-8");
      emitted += 2;
      continue;
    }

    if (fences.quick) {
      fs.writeFileSync(path.join(OUT, `${fm.slug}-quick.md`), buildSkill(fm, fences.quick, "quick"), "utf-8");
      emitted++;
      continue;
    }
    if (fences.full) {
      fs.writeFileSync(path.join(OUT, `${fm.slug}-full.md`), buildSkill(fm, fences.full, "full"), "utf-8");
      emitted++;
      continue;
    }
    if (fences.default) {
      fs.writeFileSync(path.join(OUT, `${fm.slug}.md`), buildSkill(fm, fences.default, "default"), "utf-8");
      emitted++;
      continue;
    }
    skipped++;
  }

  console.log(`[build-skills] emitted ${emitted} skills, skipped ${skipped} (no prompt fence) → ${path.relative(ROOT, OUT)}/`);
}

main();
