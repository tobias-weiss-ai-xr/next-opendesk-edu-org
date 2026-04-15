#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SVG_DIR = "public/static";
const MAX_SIZE_KB = 500;

function findSvgFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findSvgFiles(fullPath));
    } else if (entry.name.endsWith(".svg")) {
      results.push(fullPath);
    }
  }
  return results;
}

function validateSvg(filePath) {
  const errors = [];

  // File size check
  const stats = statSync(filePath);
  const sizeKB = stats.size / 1024;
  if (sizeKB > MAX_SIZE_KB) {
    errors.push(`file size ${sizeKB.toFixed(1)}KB exceeds ${MAX_SIZE_KB}KB limit`);
  }

  // Read content
  let content;
  try {
    content = readFileSync(filePath, "utf-8");
  } catch {
    errors.push("cannot read file");
    return errors;
  }

  // Check for <svg root element
  if (!/<svg[\s>]/.test(content)) {
    errors.push('missing <svg> root element');
    return errors;
  }

  // Check for proper closing
  if (!/<\/svg>\s*$/.test(content.trim()) && !/<svg[^>]*\/>\s*$/.test(content.trim())) {
    errors.push('missing proper </svg> closing tag');
  }

  // Check viewBox OR width+height
  const hasViewBox = /viewBox\s*=\s*["'][^"']+["']/i.test(content);
  const hasWidth = /width\s*=\s*["'][^"']+["']/i.test(content);
  const hasHeight = /height\s*=\s*["'][^"']+["']/i.test(content);

  if (!hasViewBox && !(hasWidth && hasHeight)) {
    errors.push("missing viewBox or width+height attributes");
  }

  return errors;
}

const svgFiles = findSvgFiles(SVG_DIR);
if (svgFiles.length === 0) {
  console.log("No SVG files found in", SVG_DIR);
  process.exit(0);
}

let hasErrors = false;

for (const filePath of svgFiles) {
  const relPath = relative(process.cwd(), filePath);
  const errors = validateSvg(filePath);

  if (errors.length === 0) {
    console.log(`✓ ${relPath}`);
  } else {
    console.log(`✗ ${relPath} — ${errors.join("; ")}`);
    hasErrors = true;
  }
}

console.log(`\n${svgFiles.length} SVG file(s) checked.`);
process.exit(hasErrors ? 1 : 0);
