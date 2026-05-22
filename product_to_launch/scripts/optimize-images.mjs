#!/usr/bin/env node
// Compress source PNGs in originals/generated/ to WebP at display-relevant
// widths, writing to public/generated/. Source PNGs stay out of the
// production deploy. Target: <100KB WebP at 1280w.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "originals/generated";
const DST = "public/generated";
// Output two widths for responsive srcset: mobile@1x/desktop@1x, desktop@2x.
const WIDTHS = [640, 1280];
const QUALITY = 80;

if (!fs.existsSync(SRC)) {
  console.error(`[optimize-images] source directory missing: ${SRC}`);
  process.exit(1);
}
fs.mkdirSync(DST, { recursive: true });

const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".png"));
let beforeTotal = 0;
let afterTotal = 0;

for (const f of files) {
  const inPath = path.join(SRC, f);
  const before = fs.statSync(inPath).size;
  beforeTotal += before;
  const base = f.replace(/\.png$/, "");
  const sizes = [];
  for (const w of WIDTHS) {
    // Default width (no suffix) matches the largest, so existing &lt;img src&gt;
    // references stay valid; smaller widths get a -<w>w suffix.
    const suffix = w === WIDTHS[WIDTHS.length - 1] ? "" : `-${w}w`;
    const outPath = path.join(DST, `${base}${suffix}.webp`);
    await sharp(inPath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath);
    const sz = fs.statSync(outPath).size;
    sizes.push(sz);
    afterTotal += sz;
  }
  console.log(
    `${(before / 1024).toFixed(0).padStart(5)}KB → [${sizes.map((s) => `${(s / 1024).toFixed(0)}KB`).join(" + ")}]  ${base}.webp`
  );
}

const savedMB = ((beforeTotal - afterTotal) / 1024 / 1024).toFixed(1);
const ratio = ((1 - afterTotal / beforeTotal) * 100).toFixed(1);
console.log(`\nTotal: ${(beforeTotal / 1024 / 1024).toFixed(1)}MB → ${(afterTotal / 1024 / 1024).toFixed(1)}MB  (-${savedMB}MB, -${ratio}%)`);
