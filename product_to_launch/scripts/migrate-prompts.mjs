#!/usr/bin/env node
// One-shot codemod: migrate prompt fences from XML tags to markdown headers.
//
// Before: ```prompt-quick / prompt-full fences with <role>...</role>
//         <input>...</input> <output_schema>...</output_schema> ...
// After:  same fences, but with markdown `## 角色` / `## 輸入素材` /
//         `## 輸出格式（YAML）` ... headers. YAML schema body unchanged.
//
// Whitelist only — schema example placeholders like <string>, <input ref>,
// <field_name> are NOT touched (they don't sit at start-of-line on their own).
//
// Usage:
//   node scripts/migrate-prompts.mjs                # apply
//   node scripts/migrate-prompts.mjs --dry-run      # diff to stdout, no write
//   node scripts/migrate-prompts.mjs --report       # apply + per-file tag counts

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "content", "deliverables");

const TAG_MAP = {
  role: "角色",
  context: "情境脈絡",
  task: "任務",
  input: "輸入素材",
  rules: "規則",
  output_schema: "輸出格式（YAML）",
  thinking: "思考步驟",
  output: "輸出",
  verify: "自審",
};

const FENCE_RE = /^(```)(prompt-quick|prompt-full)([ \t]*)\n([\s\S]*?)^(```)([ \t]*)$/gm;

function migrateFenceContent(content) {
  const counts = {};
  let out = content;

  for (const [tag, header] of Object.entries(TAG_MAP)) {
    const openRe = new RegExp(`^<${tag}>[ \\t]*$`, "gm");
    const closeRe = new RegExp(`^</${tag}>[ \\t]*$`, "gm");

    const openMatches = out.match(openRe);
    const closeMatches = out.match(closeRe);
    const opens = openMatches ? openMatches.length : 0;
    const closes = closeMatches ? closeMatches.length : 0;
    if (opens || closes) counts[tag] = { open: opens, close: closes };

    // Header gets a trailing blank line for readability:
    // `<role>\n你是...` → `## 角色\n\n你是...`
    out = out.replace(openRe, `## ${header}\n`);
    out = out.replace(closeRe, "");
  }

  // Narrative references that point to the old XML tag names — found in quick
  // block trailers like `結尾 <verify>：...`. Map to the new header names so the
  // AI doesn't look for a tag that's no longer there.
  const NARRATIVE_MAP = [
    [/結尾\s*<verify>/g, "結尾以 `## 自審` 段"],
    [/<verify>\s*段/g, "`## 自審` 段"],
    [/在\s*<thinking>\s*區塊/g, "在 `## 思考步驟` 段"],
  ];
  for (const [re, rep] of NARRATIVE_MAP) {
    out = out.replace(re, rep);
  }

  // Collapse 3+ consecutive newlines (introduced by removed close tags) → 2.
  out = out.replace(/\n{3,}/g, "\n\n");
  // Trim trailing whitespace lines at the end of the fence body.
  out = out.replace(/\s+$/, "");
  return { migrated: out, counts };
}

function migrateFile(raw) {
  const totals = { quick: null, full: null };
  let touched = false;

  const next = raw.replace(FENCE_RE, (match, openFence, lang, openTrail, body, closeFence, closeTrail) => {
    const { migrated, counts } = migrateFenceContent(body);
    if (lang === "prompt-quick") totals.quick = counts;
    else if (lang === "prompt-full") totals.full = counts;
    if (migrated !== body.replace(/\s+$/, "")) touched = true;
    return `${openFence}${lang}${openTrail}\n${migrated}\n${closeFence}${closeTrail}`;
  });

  return { next, touched, totals };
}

function unifiedDiff(slug, before, after) {
  if (before === after) return "";
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");
  // Minimal context diff — line-by-line first divergence + a few following lines.
  const lines = [];
  lines.push(`--- ${slug}.md  (before)`);
  lines.push(`+++ ${slug}.md  (after)`);
  let bi = 0, ai = 0;
  while (bi < beforeLines.length || ai < afterLines.length) {
    const b = beforeLines[bi];
    const a = afterLines[ai];
    if (b === a) { bi++; ai++; continue; }
    if (b !== undefined && !afterLines.slice(ai, ai + 10).includes(b)) {
      lines.push(`- ${b}`);
      bi++;
    } else if (a !== undefined && !beforeLines.slice(bi, bi + 10).includes(a)) {
      lines.push(`+ ${a}`);
      ai++;
    } else {
      lines.push(`- ${b ?? ""}`);
      lines.push(`+ ${a ?? ""}`);
      bi++; ai++;
    }
  }
  return lines.join("\n");
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const report = args.includes("--report");
  const verbose = args.includes("--verbose");

  if (!fs.existsSync(SRC)) {
    console.error(`[migrate-prompts] missing source dir: ${SRC}`);
    process.exit(1);
  }

  const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".md"));
  let touchedCount = 0;
  let totalTagsConverted = 0;
  const skipped = [];

  for (const file of files) {
    const fp = path.join(SRC, file);
    const raw = fs.readFileSync(fp, "utf-8");
    const { next, touched, totals } = migrateFile(raw);
    const slug = file.replace(/\.md$/, "");

    if (!touched) {
      skipped.push(slug);
      continue;
    }
    touchedCount++;

    if (report) {
      const sum = (c) => c ? Object.values(c).reduce((s, x) => s + x.open + x.close, 0) : 0;
      const q = sum(totals.quick);
      const f = sum(totals.full);
      totalTagsConverted += q + f;
      console.log(`[${slug}]  quick=${q}  full=${f}  tags`);
    }

    if (dryRun) {
      if (verbose) {
        console.log(unifiedDiff(slug, raw, next));
        console.log("");
      }
      continue;
    }

    fs.writeFileSync(fp, next, "utf-8");
  }

  const mode = dryRun ? "dry-run" : "wrote";
  console.log(`\n[migrate-prompts] ${mode} ${touchedCount} / ${files.length} files`);
  if (skipped.length) {
    console.log(`[migrate-prompts] skipped (no structural tags found): ${skipped.length}`);
    if (verbose) skipped.forEach((s) => console.log(`  - ${s}`));
  }
  if (report) {
    console.log(`[migrate-prompts] total structural tags converted: ${totalTagsConverted}`);
  }
  if (dryRun) {
    console.log(`[migrate-prompts] no files modified (dry-run). Re-run without --dry-run to apply.`);
  }
}

main();
