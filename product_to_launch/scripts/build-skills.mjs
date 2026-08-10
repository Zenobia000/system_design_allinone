#!/usr/bin/env node
// Build-time: extract each deliverable template and emit a portable Coding Agent
// work package. Stable operating rules stay separate from the task trigger.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "content", "deliverables");
const OUT = path.join(ROOT, "public", "skills");

const SYMBOL_REPLACEMENTS = [
  [/\u2705/g, "[YES]"],
  [/\u274c/g, "[NO]"],
  [/\u26a0\ufe0f?/g, "[CAUTION]"],
  [/\u23eb/g, "[INCREASE]"],
  [/\u23ec/g, "[DECREASE]"],
  [/\u{1f4a1}/gu, "[INSIGHT]"],
  [/\u{1f6e1}\ufe0f?/gu, "[GUARDRAIL]"],
  [/\u2b50/g, "[RATING]"],
  [/\u{1f53a}/gu, "[UP]"],
  [/\u{1f53b}/gu, "[DOWN]"],
  [/\u270b/g, "[STOP]"],
  [/\u2713/g, "YES"],
  [/\u2717/g, "NO"],
  [/\ufe0f/g, ""],
];

function normalizeSymbols(value) {
  return SYMBOL_REPLACEMENTS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    value,
  );
}

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
  return normalizeSymbols(`---
name: ${name}
description: ${yamlScalar(description)}
metadata:
  type: work-package
  variant: ${variant}
  source: launch-atlas
  stage: ${yamlScalar(fm.stage)}
  roles: ${yamlList(fm.roles)}
  deliverable_slug: ${yamlScalar(fm.slug)}
  context_strategy: repository-first
---

# ${fm.title}${variantLabel ? ` · ${variantLabel}` : ""} · 工作包

${fm.when_to_use ? `**何時用：** ${fm.when_to_use}\n\n` : ""}${fm.ai_leverage ? `**AI 加速：** ${fm.ai_leverage}\n\n` : ""}## Agent 協作規則

1. 這份工作包定義輸出品質，不代表上游文件必須依序存在。
2. 先搜尋 Repository、既有文件、設定與測試；找到等價證據即可使用，並標示來源路徑。
3. 人類負責需求、限制、驗收標準與衝突決策。不得替人類猜測決策。
4. 先回報 FOUND、MISSING、CONFLICT。只有缺口會改變輸出時才提問，每次最多 5 題。
5. 資訊不足但不阻擋草稿時保留 TODO，並註明需要什麼證據，不得編造。

## 輸出範本

\`\`\`
${prompt}
\`\`\`
`);
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
