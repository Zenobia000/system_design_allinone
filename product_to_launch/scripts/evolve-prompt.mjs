#!/usr/bin/env node
// Evolve / lint a deliverable's AI prompt against the design spec
// (docs/prompt-design.md).
//
// Usage:
//   node scripts/evolve-prompt.mjs <slug>            # print quick + full scaffold
//   node scripts/evolve-prompt.mjs <slug> --check    # lint existing prompt
//   node scripts/evolve-prompt.mjs --check-all       # lint every deliverable
//   node scripts/evolve-prompt.mjs <slug> --write    # backup .md then write scaffold

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "content", "deliverables");

// Match fence labels including hyphens (e.g. ```prompt-quick, ```prompt-full)
// and concatenate all fenced blocks so dual-fence cards are linted as one prompt.
const FENCE_RE = /```([\w-]*)\s*\n([\s\S]*?)```/gm;

// ─── lint rubric ────────────────────────────────────────────────
// 10 checks aligned with docs/prompt-design.md §5

const CHECKS = [
  {
    id: "role_specific",
    label: "role 含具體年資/領域（不只「資深 X」）",
    test: (p) => /\d+\s*\+?\s*年|years|熟悉.{0,15}(OKR|JTBD|PRD|ADR|SLO|OpenAPI|WCAG|STRIDE|SOC|GDPR|HIPAA|PCI|ISO)/i.test(p),
  },
  {
    id: "xml_input",
    label: "input 用 XML tag 包住",
    test: (p) => /<input>[\s\S]*<\/input>/i.test(p) || /<context>[\s\S]*<\/context>/i.test(p),
  },
  {
    id: "schema_machine",
    label: "輸出是機械可消費格式（YAML/JSON/table）",
    test: (p) => /yaml|json|schema|<output_schema>/i.test(p) || /^\s*\w[\w_]*:\s*$/m.test(p),
  },
  {
    id: "field_types",
    label: "schema 欄位有型別/source 註記",
    test: (p) => /(type|required|source)\s*:/i.test(p) || /\[H\/M\/L\]|confidence/i.test(p),
  },
  {
    id: "anti_halluc",
    label: "anti-hallucination（缺資料寫 TODO 而非單句「不要編造」）",
    test: (p) => /TODO\s*\(/i.test(p) || /缺.{0,10}(資料|什麼)/.test(p) || /list.{0,10}missing|需要什麼補上/i.test(p),
  },
  {
    id: "out_of_scope",
    label: "明列 out of scope（≥ 3 條）",
    test: (p) => /out[_\s-]?of[_\s-]?scope/i.test(p) && /3|三/.test(p),
  },
  {
    id: "decision_log",
    label: "有 decision log 或 trade-off 欄位",
    test: (p) => /decision[_\s-]?log|trade[_\s-]?off|rejected_reason/i.test(p),
  },
  {
    id: "confidence",
    label: "confidence calibration（H/M/L）",
    test: (p) => /\[H\/M\/L\]|confidence\s*:\s*[HMLhml]|high\/mid\/low/i.test(p),
  },
  {
    id: "thinking",
    label: "<thinking> 強制推理",
    test: (p) => /<thinking>|step[_\s-]by[_\s-]step|先在.{0,10}推理/i.test(p),
  },
  {
    id: "verify",
    label: "<verify> 自審段",
    test: (p) => /<verify>|自審|self[_\s-]?verify|confidence 最低/i.test(p),
  },
];

function lintPrompt(prompt) {
  const results = CHECKS.map((c) => ({ ...c, pass: !!c.test(prompt) }));
  const score = results.filter((r) => r.pass).length;
  return { score, total: CHECKS.length, results };
}

// ─── scaffold generators ────────────────────────────────────────

function quickScaffold(fm) {
  const role = guessRole(fm);
  const inputs = guessInputs(fm);
  return `你是 ${role}。任務：把 ${inputs.short} 轉成 ${fm.title}（YAML 格式）。

<input>
${inputs.list.map((i) => `[${i}]`).join("\n")}
</input>

輸出 schema：<列 5-8 個機械可消費欄位，每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]>

規則：缺資料寫 TODO(缺什麼)，不編造；trade-off 必列負面後果；out of scope ≥ 3 條。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。`;
}

function fullScaffold(fm) {
  const role = guessRole(fm);
  const inputs = guessInputs(fm);
  const downstream = guessDownstream(fm);
  return `<role>
你是 ${role}。
你的輸出會交給 ${downstream}，他們會用來 <填：下游具體動作>。
</role>

<context>
${fm.when_to_use ?? "<填：本卡的觸發情境 / 業務上下文>"}
本卡核心問題：${fm.hook}
</context>

<task>
根據以下 input 產出「${fm.title}」draft。
</task>

<input>
${inputs.list.map((i) => `[${i}]`).join("\n")}
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果，不能只寫好處。
3. 缺資料的欄位標 TODO(缺什麼)，不編造。
4. <填：本卡相關 compliance / NFR>：必須涵蓋。
5. Out of scope：明列 3 條本文件不處理。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
</rules>

<output_schema>
# 依本 deliverable 設計 5-10 個機械可消費欄位（YAML）
# 範例：
# field_name:
#   required: true
#   type: <string | enum[...] | list[<type>]>
#   source: <which input section drove this>
#   confidence: H | M | L
#   example: <inline example>

<填：完整 schema>

decision_log:
  - decision: <what was decided>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - <thing 1 this deliverable does NOT cover>
  - <thing 2>
  - <thing 3>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal，分別標 H/M/L confidence
2. 列至少 2 個 viable trade-off 路徑與各自的負面後果
3. 列你做了但 input 沒明說的假設
4. 確認 compliance/NFR 涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？為什麼？需要什麼補資料？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
</verify>`;
}

// ─── heuristics from frontmatter ────────────────────────────────

const ROLE_HINTS = {
  pm: "有 5+ 年 SaaS B2B 經驗的資深 PM，熟悉 OKR / JTBD / PRD / ADR",
  po: "有 5+ 年 agile 經驗的資深 PO，熟悉 backlog 拆解、user story 寫作、INVEST 原則",
  ba: "有 5+ 年企業系統經驗的資深 BA，熟悉 BPMN、規則引擎、合規需求拆解",
  ux: "有 5+ 年 product design 經驗的資深 UX designer，熟悉 user research、IA、interaction patterns、a11y (WCAG 2.2)",
  architect: "有 10+ 年分散式系統經驗的資深 software architect，熟悉 C4、ADR、DDD、CAP、event-driven、microservices trade-off",
  dev: "有 7+ 年生產系統經驗的資深 staff engineer，熟悉效能調校、可觀測性、breaking change policy",
  qa: "有 7+ 年自動化測試經驗的資深 QA lead，熟悉 test pyramid、contract testing、chaos engineering",
  sre: "有 7+ 年 SRE 經驗的資深 SRE，熟悉 SLO/SLI/error budget、incident response、postmortem 文化",
  security: "有 7+ 年資安經驗的資深 security engineer，熟悉 STRIDE、threat modeling、SOC 2 / GDPR / PCI 合規",
  data: "有 5+ 年 data engineering 經驗的資深 data engineer，熟悉 data modeling、lineage、quality SLO",
};

function guessRole(fm) {
  const r = fm.roles?.[0];
  return ROLE_HINTS[r] || `<填：deliverable 主責角色 + 年資 + 領域脈絡>`;
}

function guessInputs(fm) {
  // hint from ai_leverage if it lists inputs (split on common separators)
  const hint = fm.ai_leverage || "";
  const m = hint.match(/把([^→]+)→/);
  if (m) {
    const items = m[1]
      .split(/[、+,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    return { list: items, short: items.join(" / ") };
  }
  return { list: ["<input 1 type>", "<input 2 type>"], short: "<input 來源>" };
}

function guessDownstream(fm) {
  const stage = fm.stage;
  const map = {
    discovery: "PM、UX、Architect（用來決定要不要做、做什麼）",
    define: "PO、Dev Lead、QA、UX（用來拆 backlog / 寫 test plan / 畫 flow）",
    design: "Dev、QA（用來實作與驗收）",
    build: "QA、SRE（用來測試與發布規劃）",
    ship: "SRE、Support、PM（用來監控、值班、回饋產品）",
    operate: "SRE、PM、Security（用來持續改進、合規稽核）",
  };
  return map[stage] || "<填：下游 consumer>";
}

// ─── CLI ────────────────────────────────────────────────────────

function readDeliverable(slug) {
  const p = path.join(SRC, `${slug}.md`);
  if (!fs.existsSync(p)) {
    console.error(`[evolve-prompt] not found: ${p}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(p, "utf-8");
  const { data: fm, content: body } = matter(raw);
  const blocks = [...body.matchAll(FENCE_RE)].map((m) => m[2].replace(/\s+$/, ""));
  const existingPrompt = blocks.join("\n\n");
  return { p, raw, fm, body, existingPrompt };
}

function printScaffold(slug) {
  const { fm } = readDeliverable(slug);
  console.log(`# Scaffold for: ${fm.title} (${slug})\n`);
  console.log(`## Quick (≤ 12 行)\n\n\`\`\`prompt-quick\n${quickScaffold(fm)}\n\`\`\`\n`);
  console.log(`## Full (30–60 行)\n\n\`\`\`prompt-full\n${fullScaffold(fm)}\n\`\`\`\n`);
}

function lintOne(slug, verbose = true) {
  const { fm, existingPrompt } = readDeliverable(slug);
  if (!existingPrompt) {
    return { slug, title: fm.title, score: 0, results: [], note: "no prompt fence found" };
  }
  const { score, total, results } = lintPrompt(existingPrompt);
  if (verbose) {
    console.log(`\n[${slug}] ${fm.title}`);
    console.log(`  score: ${score} / ${total} ${score >= 8 ? "✓ solid" : "✗ needs rewrite"}`);
    for (const r of results) {
      console.log(`  ${r.pass ? "✓" : "✗"} ${r.label}`);
    }
  }
  return { slug, title: fm.title, score, results };
}

function lintAll() {
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".md"));
  const rows = files.map((f) => lintOne(f.replace(/\.md$/, ""), false));
  rows.sort((a, b) => a.score - b.score || a.slug.localeCompare(b.slug));
  console.log("\nscore | slug                              | title");
  console.log("----- | --------------------------------- | -------------");
  for (const r of rows) {
    const tag = r.score >= 8 ? "✓" : "✗";
    console.log(`${tag} ${String(r.score).padStart(2)}/${CHECKS.length} | ${r.slug.padEnd(34)} | ${r.title}`);
  }
  const below = rows.filter((r) => r.score < 8).length;
  console.log(`\n${below} / ${rows.length} below 8/10 — candidates for rewrite.`);
}

function writeScaffold(slug) {
  const { p, raw, fm } = readDeliverable(slug);
  const backup = p + ".bak";
  fs.writeFileSync(backup, raw, "utf-8");
  // Append scaffold below existing content for human merge — never overwrite blindly.
  const append = `\n\n<!-- ─── evolve-prompt scaffold (review then merge) ─── -->\n\n## AI 加速 · Quick\n\n\`\`\`prompt-quick\n${quickScaffold(fm)}\n\`\`\`\n\n## AI 加速 · Full\n\n\`\`\`prompt-full\n${fullScaffold(fm)}\n\`\`\`\n`;
  fs.appendFileSync(p, append, "utf-8");
  console.log(`[evolve-prompt] backup: ${path.relative(ROOT, backup)}`);
  console.log(`[evolve-prompt] appended scaffold to: ${path.relative(ROOT, p)}`);
  console.log(`               review and merge into the existing AI 加速 section, then delete .bak.`);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("usage:\n  evolve-prompt <slug>           # print scaffold\n  evolve-prompt <slug> --check    # lint existing prompt\n  evolve-prompt <slug> --write    # backup + append scaffold\n  evolve-prompt --check-all       # lint every deliverable");
    process.exit(2);
  }
  if (args[0] === "--check-all") return lintAll();
  const [slug, ...rest] = args;
  if (rest.includes("--check")) return lintOne(slug);
  if (rest.includes("--write")) return writeScaffold(slug);
  return printScaffold(slug);
}

main();
