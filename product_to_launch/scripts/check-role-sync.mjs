/**
 * Role-sync drift guard.
 *
 * Root-causes the "dual source of truth" problem: roles are declared both in
 * lib/taxonomy.ts (the canonical, typed, data-driven source the app renders
 * from) and hand-authored in public/atlas-map.html (the Blueprint Studio
 * poster). They drifted before — atlas shipped a DBA card the app never had,
 * and the app shipped PO/BA/UI/SD the poster never had.
 *
 * Contract enforced here:
 *   atlas role slugs  ⊆  taxonomy ROLES slugs
 *
 * i.e. the poster may curate a SUBSET (it deliberately merges UX·UI and omits
 * product roles for an engineering-delivery lens), but it may NOT show a role
 * that does not exist in the canonical taxonomy. Any orphan fails the build.
 * Intentionally-omitted roles are printed as info, not errors.
 *
 * Run via prebuild/predev (see package.json).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TAXONOMY = join(root, "lib", "taxonomy.ts");
const ATLAS = join(root, "public", "atlas-map.html");

/** Canonical role slugs from the ROLES array in taxonomy.ts. */
function taxonomyRoles() {
  const src = readFileSync(TAXONOMY, "utf8");
  const block = src.match(/export const ROLES[^=]*=\s*\[([\s\S]*?)\];/);
  if (!block) throw new Error("check-role-sync: could not locate ROLES array in taxonomy.ts");
  return new Set([...block[1].matchAll(/\{\s*slug:\s*"([a-z-]+)"/g)].map((m) => m[1]));
}

/** Role slugs declared on atlas-map.html role cards via data-role-slug. */
function atlasRoles() {
  const html = readFileSync(ATLAS, "utf8");
  return new Set([...html.matchAll(/data-role-slug="([a-z-]+)"/g)].map((m) => m[1]));
}

const canonical = taxonomyRoles();
const atlas = atlasRoles();

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
  `✓ check-role-sync: atlas (${atlas.size}) ⊆ taxonomy (${canonical.size}). ` +
    (omitted.length ? `Intentionally omitted from poster: ${omitted.join(", ")}.` : "Full parity.")
);
