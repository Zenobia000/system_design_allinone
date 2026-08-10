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

export interface DeliverableLearningContent {
  problem: string[];
  roles: string[];
  timing: LearningTimingItem[];
  template: string;
  fullTemplate: string;
  outline: LearningOutlineItem[];
  example: string | null;
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

const SMARTTRIP_EXAMPLES: Record<string, string> = {
  jtbd: "demo/01-discovery/01-jtbd/SmartTrip示範.md",
  "value-hypothesis": "demo/01-discovery/02-value-hypothesis/SmartTrip示範.md",
  prd: "demo/02-define/03-prd/SmartTrip示範.md",
  "acceptance-criteria": "demo/02-define/04-acceptance-criteria/SmartTrip示範.md",
  adr: "demo/03-design/05-adr/SmartTrip示範.md",
  "c4-diagram": "demo/03-design/06-c4-diagram/SmartTrip示範.md",
  "api-spec": "demo/03-design/07-api-spec/SmartTrip示範.md",
  "data-model": "demo/03-design/08-data-model/SmartTrip示範.md",
  "non-functional-reqs": "demo/03-design/09-non-functional-reqs/SmartTrip示範.md",
  "code-review-checklist": "demo/04-build/10-code-review-checklist/SmartTrip示範.md",
  "unit-test": "demo/04-build/11-unit-test/SmartTrip示範.md",
  "release-plan": "demo/05-ship/12-release-plan/SmartTrip示範.md",
  "rollback-plan": "demo/05-ship/13-rollback-plan/SmartTrip示範.md",
  runbook: "demo/06-operate/14-runbook/SmartTrip示範.md",
  postmortem: "demo/06-operate/15-postmortem/SmartTrip示範.md",
};

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

function readExample(slug: string): string | null {
  const relativePath = SMARTTRIP_EXAMPLES[slug];
  if (!relativePath) return null;
  const absolutePath = path.join(findRepoRoot(), relativePath);
  if (!fs.existsSync(absolutePath)) return null;
  return normalizeSymbols(fs.readFileSync(absolutePath, "utf-8").trim());
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
