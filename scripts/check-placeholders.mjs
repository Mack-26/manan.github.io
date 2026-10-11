// Lists metrics still marked `placeholder: true` (invented stand-ins shown with a
// "prelim." tag). Runs before every build as a reminder; never fails the build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PATTERN = /"?placeholder"?\s*:\s*true/;

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(json|js|jsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

export function findPlaceholders(dirs) {
  const hits = [];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir, [])) {
      fs.readFileSync(file, 'utf8').split('\n').forEach((text, i) => {
        if (PATTERN.test(text)) hits.push({ file, line: i + 1 });
      });
    }
  }
  return hits;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const hits = findPlaceholders([path.join(root, 'data'), path.join(root, 'components/projects')]);
  if (hits.length) {
    console.warn(`⚠ ${hits.length} placeholder metric(s) still marked prelim.:`);
    for (const h of hits) console.warn(`  ${path.relative(root, h.file)}:${h.line}`);
  }
}
