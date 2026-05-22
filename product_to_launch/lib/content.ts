import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { RoleSlug, StageSlug } from "./taxonomy";

const ROOT = path.join(process.cwd(), "content");

export interface DeliverableFront {
  title: string;
  slug: string;
  stage: StageSlug;
  roles: RoleSlug[];
  order: number;
  hook: string;
  when_to_use?: string;
  ai_leverage?: string;
  source?: string;
  art?: string;
}

export interface RoleFront {
  title: string;
  title_en: string;
  slug: RoleSlug;
  num: string;
  hook: string;
  hires_for?: string;
  fired_when?: string;
  ai_leverage?: string;
  art?: string;
  source?: string;
}

export interface StageFront {
  title: string;
  title_en: string;
  slug: StageSlug;
  num: string;
  hook: string;
  exit_criteria?: string;
  typical_stuck?: string;
  art?: string;
  source?: string;
}

interface Loaded<T> {
  frontmatter: T;
  body: string;
}

function readMarkdown<T>(absPath: string): Loaded<T> {
  const raw = fs.readFileSync(absPath, "utf-8");
  const parsed = matter(raw);
  return { frontmatter: parsed.data as T, body: parsed.content };
}

export function getDeliverable(slug: string): Loaded<DeliverableFront> | null {
  const p = path.join(ROOT, "deliverables", `${slug}.md`);
  if (!fs.existsSync(p)) return null;
  return readMarkdown<DeliverableFront>(p);
}

export function getAllDeliverables(): Loaded<DeliverableFront>[] {
  const dir = path.join(ROOT, "deliverables");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readMarkdown<DeliverableFront>(path.join(dir, f)))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getRole(slug: RoleSlug): Loaded<RoleFront> | null {
  const p = path.join(ROOT, "roles", `${slug}.md`);
  if (!fs.existsSync(p)) return null;
  return readMarkdown<RoleFront>(p);
}

export function getAllRoles(): Loaded<RoleFront>[] {
  const dir = path.join(ROOT, "roles");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readMarkdown<RoleFront>(path.join(dir, f)))
    .sort((a, b) => Number(a.frontmatter.num) - Number(b.frontmatter.num));
}

export function getStage(slug: StageSlug): Loaded<StageFront> | null {
  const p = path.join(ROOT, "stages", `${slug}.md`);
  if (!fs.existsSync(p)) return null;
  return readMarkdown<StageFront>(p);
}

export function getAllStages(): Loaded<StageFront>[] {
  const dir = path.join(ROOT, "stages");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readMarkdown<StageFront>(path.join(dir, f)))
    .sort((a, b) => Number(a.frontmatter.num) - Number(b.frontmatter.num));
}

/** Very small Markdown → HTML used only for short body fragments.
 *  Avoids pulling remark/rehype: we treat the body as light prose with
 *  headings, paragraphs, lists, inline code, bold, fenced code blocks,
 *  and blockquotes. */
export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList: "ul" | "ol" | null = null;
  let inQuote = false;
  let inCode = false;
  let codeLang = "";
  let codeBuf: string[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (inList) { out.push(`</${inList}>`); inList = null; }
  };
  const flushQuote = () => {
    if (inQuote) { out.push("</blockquote>"); inQuote = false; }
  };

  for (const rawLine of lines) {
    // Fenced code block boundary — track exact line, no trimming inside
    // Allow hyphenated lang tags like `prompt-quick` / `prompt-full`.
    const fence = /^```([\w-]*)\s*$/.exec(rawLine);
    if (fence) {
      if (inCode) {
        const safe = codeBuf.join("\n")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        const cls = codeLang ? ` class="lang-${codeLang}"` : "";
        const kind = codeLang === "prompt-quick" ? "quick"
                   : codeLang === "prompt-full" ? "full"
                   : "default";
        out.push(`<pre data-prompt-block data-prompt-kind="${kind}"><code${cls}>${safe}</code></pre>`);
        inCode = false; codeLang = ""; codeBuf = [];
      } else {
        flushPara(); flushList(); flushQuote();
        inCode = true; codeLang = fence[1];
      }
      continue;
    }
    if (inCode) { codeBuf.push(rawLine); continue; }

    const line = rawLine.replace(/\s+$/, "");
    if (!line.trim()) { flushPara(); flushList(); flushQuote(); continue; }

    const h = /^(#{2,4})\s+(.*)/.exec(line);
    if (h) {
      flushPara(); flushList(); flushQuote();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }
    if (line.startsWith("> ")) {
      flushPara(); flushList();
      if (!inQuote) { out.push("<blockquote>"); inQuote = true; }
      out.push(`<p>${inline(line.slice(2))}</p>`);
      continue;
    }
    const liU = /^[-*]\s+(.*)/.exec(line);
    const liO = /^\d+\.\s+(.*)/.exec(line);
    if (liU || liO) {
      flushPara(); flushQuote();
      const kind = liU ? "ul" : "ol";
      if (inList !== kind) { flushList(); out.push(`<${kind}>`); inList = kind as "ul" | "ol"; }
      let text = (liU || liO)![1];
      let badge = "";
      // Convert leading status emoji into stamp-style badges to match the
      // Architect's Blueprint aesthetic (✅/❌/⚠️ → DO / DON'T / CAUTION)
      if (/^✅\s+/.test(text)) {
        badge = '<span class="mark mark-do">DO</span>';
        text = text.replace(/^✅\s+/, "");
      } else if (/^❌\s+/.test(text)) {
        badge = '<span class="mark mark-dont">DON’T</span>';
        text = text.replace(/^❌\s+/, "");
      } else if (/^⚠️?\s+/.test(text)) {
        badge = '<span class="mark mark-caution">CAUTION</span>';
        text = text.replace(/^⚠️?\s+/, "");
      }
      if (badge) {
        out.push(`<li class="li-mark">${badge}<span class="li-mark-body">${inline(text)}</span></li>`);
      } else {
        out.push(`<li>${inline(text)}</li>`);
      }
      continue;
    }
    para.push(line);
  }
  // defensive flush — if a code fence was left unclosed, treat the buffer as text
  if (inCode && codeBuf.length) {
    const safe = codeBuf.join("\n")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    out.push(`<pre data-prompt-block data-prompt-kind="default"><code>${safe}</code></pre>`);
  }
  flushPara(); flushList(); flushQuote();
  return out.join("\n");
}

function inline(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
