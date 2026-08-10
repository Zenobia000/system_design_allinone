/**
 * Role-sync drift guard.
 *
 * Root-causes the "dual source of truth" problem: roles are declared both in
 * lib/taxonomy.ts (the canonical, typed, data-driven source the app renders
 * from) and hand-authored in public/atlas-map.html (the Blueprint Studio
 * poster). They drifted before — atlas shipped a DBA card the app never had,
 * and the app shipped PO/BA/UI/SD the poster never had.
 *
 * Contracts enforced here:
 *   1. atlas role slugs  ⊆  taxonomy ROLES slugs
 *   2. taxonomy ROLES slugs  ==  content/roles/*.md slugs
 *   3. taxonomy title/titleEn  ==  markdown title/title_en, per role
 *
 * (1) the poster may curate a SUBSET (it deliberately merges UX·UI and omits
 * product roles for an engineering-delivery lens), but it may NOT show a role
 * that does not exist in the canonical taxonomy. Any orphan fails the build.
 * Intentionally-omitted roles are printed as info, not errors.
 *
 * (2)(3) taxonomy holds STRUCTURE (ordering, stage mapping, colour) and the
 * markdown holds PROSE. The two overlap on title/titleEn only, so those are
 * the only fields that can drift — and they did: `hook` used to live in both
 * and disagreed on 9 of 12 roles, with BA and SA describing each other's job.
 * `hook` now lives only in the markdown; these checks stop the remaining
 * shared fields from repeating that.
 *
 * Run via prebuild/predev (see package.json).
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TAXONOMY = join(root, "lib", "taxonomy.ts");
const ATLAS = join(root, "public", "atlas-map.html");
const ROLE_DIR = join(root, "content", "roles");

/** Role entries from the ROLES array in taxonomy.ts, keyed by slug. */
function taxonomyEntries() {
  const src = readFileSync(TAXONOMY, "utf8");
  const block = src.match(/export const ROLES[^=]*=\s*\[([\s\S]*?)\];/);
  if (!block) throw new Error("check-role-sync: could not locate ROLES array in taxonomy.ts");
  const out = new Map();
  for (const line of block[1].split("\n")) {
    const slug = line.match(/\bslug:\s*"([a-z-]+)"/)?.[1];
    if (!slug) continue;
    out.set(slug, {
      slug,
      title: line.match(/\btitle:\s*"([^"]*)"/)?.[1],
      titleEn: line.match(/\btitleEn:\s*"([^"]*)"/)?.[1],
    });
  }
  return out;
}

/** Frontmatter of every content/roles/*.md, keyed by slug. */
function markdownEntries() {
  const out = new Map();
  for (const file of readdirSync(ROLE_DIR).filter((f) => f.endsWith(".md"))) {
    const fm = readFileSync(join(ROLE_DIR, file), "utf8").split(/^---$/m)[1] ?? "";
    const slug = fm.match(/^slug:\s*"?([a-z-]+)"?\s*$/m)?.[1];
    if (!slug) throw new Error(`check-role-sync: content/roles/${file} has no slug in frontmatter`);
    out.set(slug, {
      slug,
      file,
      title: fm.match(/^title:\s*"(.*)"\s*$/m)?.[1],
      titleEn: fm.match(/^title_en:\s*"(.*)"\s*$/m)?.[1],
    });
  }
  return out;
}

/** Role slugs declared on atlas-map.html role cards via data-role-slug. */
function atlasRoles() {
  const html = readFileSync(ATLAS, "utf8");
  return new Set([...html.matchAll(/data-role-slug="([a-z-]+)"/g)].map((m) => m[1]));
}

const taxonomy = taxonomyEntries();
const markdown = markdownEntries();
const canonical = new Set(taxonomy.keys());
const atlas = atlasRoles();

// Contract 2 — taxonomy and markdown must describe the same set of roles.
const missingMd = [...taxonomy.keys()].filter((s) => !markdown.has(s));
const orphanMd = [...markdown.keys()].filter((s) => !taxonomy.has(s));
if (missingMd.length || orphanMd.length) {
  if (missingMd.length)
    console.error(
      `✗ check-role-sync: taxonomy ROLES has role(s) with no content/roles/<slug>.md: ${missingMd.join(", ")}`
    );
  if (orphanMd.length)
    console.error(
      `✗ check-role-sync: content/roles has markdown for role(s) absent from taxonomy ROLES: ${orphanMd.join(", ")}`
    );
  process.exit(1);
}

// Contract 3 — the fields both sources carry must agree verbatim.
const fieldDrift = [];
for (const [slug, tax] of taxonomy) {
  const md = markdown.get(slug);
  if (tax.title !== md.title)
    fieldDrift.push(`  ${slug}.title      taxonomy="${tax.title}"   md="${md.title}"`);
  if (tax.titleEn !== md.titleEn)
    fieldDrift.push(`  ${slug}.titleEn    taxonomy="${tax.titleEn}"   md="${md.title_en ?? md.titleEn}"`);
}
if (fieldDrift.length) {
  console.error(
    "✗ check-role-sync: taxonomy and markdown disagree on shared role fields:\n" +
      fieldDrift.join("\n") +
      "\n  Prose belongs in the markdown; taxonomy holds structure. Make them match."
  );
  process.exit(1);
}

if (atlas.size === 0) {
  console.error("✗ check-role-sync: no data-role-slug attributes found in atlas-map.html — did the markup change?");
  process.exit(1);
}

const orphans = [...atlas].filter((s) => !canonical.has(s));
const omitted = [...canonical].filter((s) => !atlas.has(s));

if (orphans.length) {
  console.error(
    `✗ check-role-sync: atlas-map.html shows role(s) absent from taxonomy ROLES: ${orphans.join(", ")}\n` +
      `  Either add the role to lib/taxonomy.ts (and content/roles/<slug>.md) or remove the card from atlas-map.html.`
  );
  process.exit(1);
}

console.log(
  `✓ check-role-sync: taxonomy (${canonical.size}) ≡ markdown (${markdown.size}) on slug/title/titleEn; ` +
    `atlas (${atlas.size}) ⊆ taxonomy. ` +
    (omitted.length ? `Intentionally omitted from poster: ${omitted.join(", ")}.` : "Full parity.")
);
