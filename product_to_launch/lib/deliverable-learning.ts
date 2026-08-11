import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface LearningOutlineItem {
  id: string;
  title: string;
  guidance: string;
}

export interface LearningTimingItem {
  tone: "required" | "skip" | "caution" | "neutral";
  label: string;
  text: string;
}

/**
 * curated = hand-written workshop reference under demo/<stage>/<nn>-<slug>/.
 * derived = generated from the SmartTrip canon, not yet reviewed by a human.
 */
export type ExampleProvenance = "curated" | "derived";

export interface DeliverableExample {
  text: string;
  provenance: ExampleProvenance;
}

export interface DeliverableLearningContent {
  problem: string[];
  roles: string[];
  timing: LearningTimingItem[];
  template: string;
  fullTemplate: string;
  outline: LearningOutlineItem[];
  example: DeliverableExample | null;
}

export interface RelationshipNode {
  id: string;
  label: string;
  slug: string | null;
  kind: "deliverable" | "evidence" | "agent";
  relation: "preferred" | "optional" | "discoverable" | "downstream";
}

export interface DeliverableRelationship {
  current: { slug: string; title: string };
  preferred: RelationshipNode[];
  optional: RelationshipNode[];
  discoverable: RelationshipNode[];
  downstream: RelationshipNode[];
  activation: string[];
  skipWhen: string[];
}

interface RelationshipCandidate {
  frontmatter: { slug: string; title: string };
  body: string;
}

const WORKSHOP_EXAMPLE_FILE = "SmartTrip示範.md";
const DERIVED_EXAMPLE_DIR = "derived";
const CURATED_EXAMPLE_DIR = "curated";

const SOURCE_LABELS: Record<string, string> = {
  "project-brief": "專案底稿",
  "problem-statement": "問題陳述",
  constraints: "限制條件",
  "business-rules": "商業規則",
  "org-chart": "組織與角色資料",
  "project-scope": "專案範圍",
  "interview-transcripts": "訪談逐字稿",
  "research-question": "研究問題",
  "technical-discussion-notes": "技術討論紀錄",
  "package-files": "套件與設定檔",
  repository: "專案程式碼",
  "existing-docs": "既有文件",
  "git-diff": "程式碼變更",
  "test-results": "測試結果",
  "historical-metrics": "歷史量測資料",
  "team-capacity": "團隊容量",
};

const RELATION_ALIASES: Record<string, string> = {
  nfr: "non-functional-reqs",
  "slo-definition": "slo",
  "slo-spec": "slo",
  "openapi-spec": "api-spec",
  "north-star-metric": "north-star",
  "user-journey": "journey-map",
};

const SYMBOL_REPLACEMENTS: Array<[RegExp, string]> = [
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

function normalizeSymbols(value: string): string {
  return SYMBOL_REPLACEMENTS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    value,
  );
}

function extractFence(markdown: string, language: string): string {
  const lines = markdown.split("\n");
  let collecting = false;
  let openingLength = 0;
  const content: string[] = [];

  for (const line of lines) {
    if (!collecting) {
      const opening = /^(`{3,})([\w-]+)\s*$/.exec(line);
      if (opening?.[2] === language) {
        collecting = true;
        openingLength = opening[1].length;
      }
      continue;
    }

    const closing = /^(`{3,})\s*$/.exec(line);
    if (closing && closing[1].length >= openingLength) break;
    content.push(line);
  }

  return content.join("\n").trim();
}

function readUpstream(body: string): { required: string[]; optional: string[] } {
  const template = extractFence(body, "template-light") || extractFence(body, "template-full");
  if (!template.startsWith("---")) return { required: [], optional: [] };

  try {
    const upstream = matter(template).data.upstream as { required?: unknown; optional?: unknown } | undefined;
    const values = (input: unknown) => Array.isArray(input)
      ? input.filter((item): item is string => typeof item === "string")
      : [];
    return {
      required: values(upstream?.required),
      optional: values(upstream?.optional),
    };
  } catch {
    return { required: [], optional: [] };
  }
}

function cleanTimingText(value: string): string {
  return value.replace(/^(必要時機|不需要時|常見誤用)\s*[:：]\s*/, "").trim();
}

function normalizeRelationId(id: string): string {
  return RELATION_ALIASES[id] ?? id;
}

function fallbackSourceLabel(id: string): string {
  return id
    .split("-")
    .filter(Boolean)
    .map((part) => part.length <= 4 ? part.toUpperCase() : `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function relationshipNode(
  id: string,
  relation: RelationshipNode["relation"],
  candidates: Map<string, RelationshipCandidate>,
): RelationshipNode {
  const normalized = normalizeRelationId(id);
  const deliverable = candidates.get(normalized);
  return {
    id,
    label: deliverable?.frontmatter.title ?? SOURCE_LABELS[id] ?? fallbackSourceLabel(id),
    slug: deliverable?.frontmatter.slug ?? null,
    kind: deliverable ? "deliverable" : "evidence",
    relation,
  };
}

function extractSection(markdown: string, heading: string): string[] {
  const introEnd = markdown.indexOf("\n## 文件範本");
  const intro = introEnd >= 0 ? markdown.slice(0, introEnd) : markdown;
  const lines = intro.split("\n");
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start < 0) return [];

  const section: string[] = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index])) break;
    const cleaned = lines[index]
      .replace(/^>\s?/, "")
      .replace(/^[-*]\s+/, "")
      .replace(/^\d+\.\s+/, "")
      .replace(/\*\*/g, "")
      .replace(/`/g, "")
      .trim();
    if (cleaned) section.push(cleaned);
  }

  return section;
}

function extractTiming(markdown: string): LearningTimingItem[] {
  return extractSection(markdown, "何時用、何時不用").map((line) => {
    if (line.startsWith("\u2705")) {
      return { tone: "required", label: "REQUIRED", text: line.slice(1).trim() };
    }
    if (line.startsWith("\u274c")) {
      return { tone: "skip", label: "SKIP", text: line.slice(1).trim() };
    }
    if (line.startsWith("\u26a0")) {
      return { tone: "caution", label: "CAUTION", text: line.replace(/^\u26a0\ufe0f?/, "").trim() };
    }
    return { tone: "neutral", label: "NOTE", text: normalizeSymbols(line) };
  });
}

function cleanGuidance(value: string): string {
  return normalizeSymbols(value)
    .replace(/\s+/g, " ")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/<([^>]+)>/g, "$1")
    .trim();
}

function extractOutline(template: string): LearningOutlineItem[] {
  const matches = [...template.matchAll(/^##\s+(?:(\d+)\.\s*)?(.+?)\s*$/gm)];

  return matches.map((match, index) => {
    const sectionStart = (match.index ?? 0) + match[0].length;
    const sectionEnd = matches[index + 1]?.index ?? template.length;
    const section = template.slice(sectionStart, sectionEnd);
    const instruction = /<!--\s*(?:ai-fill|ai-rule)\s*:\s*([\s\S]*?)-->/.exec(section)?.[1];
    const number = match[1] ?? String(index + 1);

    return {
      id: number.padStart(2, "0"),
      title: cleanGuidance(match[2]),
      guidance: instruction
        ? cleanGuidance(instruction)
        : "把已確認的內容、判斷依據與仍待補充的資訊清楚分開。",
    };
  });
}

function findRepoRoot(): string {
  if (fs.existsSync(path.join(process.cwd(), "demo"))) return process.cwd();
  return path.resolve(process.cwd(), "..");
}

function directories(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function flatExamples(
  dir: string,
  provenance: ExampleProvenance,
): Array<[string, { file: string; provenance: ExampleProvenance }]> {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => [name.slice(0, -3), { file: path.join(dir, name), provenance }]);
}

/**
 * Examples live under demo/ by convention, so adding one is a file drop with no
 * code change. Later sources win, so reviewing an example is a `git mv` from
 * derived/ to curated/ — no edit here:
 *   demo/derived/<slug>.md                          → derived (awaiting review)
 *   demo/curated/<slug>.md                          → curated (reviewed)
 *   demo/<nn>-<stage>/<nn>-<slug>/SmartTrip示範.md  → curated (workshop canon)
 */
function discoverExamples(): Map<string, { file: string; provenance: ExampleProvenance }> {
  const demoRoot = path.join(findRepoRoot(), "demo");
  const found = new Map([
    ...flatExamples(path.join(demoRoot, DERIVED_EXAMPLE_DIR), "derived"),
    ...flatExamples(path.join(demoRoot, CURATED_EXAMPLE_DIR), "curated"),
  ]);

  for (const stage of directories(demoRoot)) {
    if (stage === DERIVED_EXAMPLE_DIR || stage === CURATED_EXAMPLE_DIR) continue;
    for (const card of directories(path.join(demoRoot, stage))) {
      const file = path.join(demoRoot, stage, card, WORKSHOP_EXAMPLE_FILE);
      if (!fs.existsSync(file)) continue;
      found.set(card.replace(/^\d+-/, ""), { file, provenance: "curated" });
    }
  }

  return found;
}

let exampleCache: Map<string, { file: string; provenance: ExampleProvenance }> | null = null;

function readExample(slug: string): DeliverableExample | null {
  exampleCache ??= discoverExamples();
  const entry = exampleCache.get(slug);
  if (!entry) return null;
  return {
    text: normalizeSymbols(fs.readFileSync(entry.file, "utf-8").trim()),
    provenance: entry.provenance,
  };
}

export function buildDeliverableLearningContent(body: string, slug: string): DeliverableLearningContent {
  const template = extractFence(body, "template-light");
  const fullTemplate = extractFence(body, "template-full");

  return {
    problem: extractSection(body, "解決什麼問題"),
    roles: extractSection(body, "誰負責、和誰對接"),
    timing: extractTiming(body),
    template: normalizeSymbols(template),
    fullTemplate: normalizeSymbols(fullTemplate || template),
    outline: extractOutline(template || fullTemplate),
    example: readExample(slug),
  };
}

export function buildDeliverableRelationship(
  current: RelationshipCandidate,
  allDeliverables: RelationshipCandidate[],
): DeliverableRelationship {
  const candidates = new Map(allDeliverables.map((item) => [item.frontmatter.slug, item]));
  const upstream = readUpstream(current.body);
  const timing = extractTiming(current.body);
  const downstream = allDeliverables
    .filter((item) => item.frontmatter.slug !== current.frontmatter.slug)
    .flatMap((item) => {
      const itemUpstream = readUpstream(item.body);
      const required = itemUpstream.required.some(
        (id) => normalizeRelationId(id) === current.frontmatter.slug,
      );
      const optional = itemUpstream.optional.some(
        (id) => normalizeRelationId(id) === current.frontmatter.slug,
      );
      if (!required && !optional) return [];
      return [{
        id: item.frontmatter.slug,
        label: item.frontmatter.title,
        slug: item.frontmatter.slug,
        kind: "deliverable" as const,
        relation: "downstream" as const,
      }];
    });

  return {
    current: {
      slug: current.frontmatter.slug,
      title: current.frontmatter.title,
    },
    preferred: upstream.required.map((id) => relationshipNode(id, "preferred", candidates)),
    optional: upstream.optional.map((id) => relationshipNode(id, "optional", candidates)),
    discoverable: [
      {
        id: "repository-context",
        label: "Repository、既有文件與設定",
        slug: null,
        kind: "agent",
        relation: "discoverable",
      },
    ],
    downstream,
    activation: timing
      .filter((item) => item.tone === "required")
      .map((item) => cleanTimingText(item.text)),
    skipWhen: timing
      .filter((item) => item.tone === "skip")
      .map((item) => cleanTimingText(item.text)),
  };
}
