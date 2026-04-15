#!/usr/bin/env node

import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE_SVG = "public/static/brand/icon.svg";
const OUTPUT_DIR = "public/static/brand";

const sizes = [
  { name: "favicon-16x16.png", width: 16, height: 16 },
  { name: "favicon-32x32.png", width: 32, height: 32 },
  { name: "icon-192.png", width: 192, height: 192 },
  { name: "icon-512.png", width: 512, height: 512 },
  { name: "og-image.png", width: 1200, height: 630 },
];

async function exportPngs() {
  const svgBuffer = readFileSync(SOURCE_SVG);

  for (const { name, width, height } of sizes) {
    const outputPath = join(OUTPUT_DIR, name);
    let pipeline = sharp(svgBuffer).resize(width, height);

    // og-image gets a purple background
    if (name === "og-image.png") {
      pipeline = pipeline.composite([
        {
          input: Buffer.from(
            `<svg width="${width}" height="${height}"><rect width="100%" height="100%" fill="#341291"/></svg>`
          ),
          blend: "dest-over",
        },
      ]);
    }

    await pipeline.png().toFile(outputPath);
    console.log(`✓ ${outputPath} (${width}x${height})`);
  }

  console.log(`\n${sizes.length} PNG file(s) exported.`);
}

exportPngs().catch((err) => {
  console.error("Error exporting PNGs:", err);
  process.exit(1);
});
