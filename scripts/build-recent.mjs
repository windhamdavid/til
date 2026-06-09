#!/usr/bin/env node
/**
 * build-recent.mjs — extract the latest 10 entries from each section index's
 * `## Log` (docs/notes/lists) into src/data/recent.json, for the "Recent"
 * column on the home page. URLs are normalized to real routes (verified against
 * graph.json) so the sidebar links resolve. Run via `npm run recent` (and the
 * prebuild hook). Reads graph.json, so run build-graph.mjs first.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const N = 10;
const SECTIONS = [
  { key: 'docs', file: 'docs/index.md', base: '/docs' },
  { key: 'notes', file: 'notes/index.md', base: '/notes' },
  { key: 'lists', file: 'lists/index.md', base: '/lists' },
];

const graph = JSON.parse(readFileSync(join(ROOT, 'src/data/graph.json'), 'utf8'));
const routes = new Set(graph.nodes.map((n) => n.id));
const routesLc = new Map(graph.nodes.map((n) => [n.id.toLowerCase(), n.id]));

function normalizeUrl(url, base) {
  let u = url.split('#')[0].split('?')[0].replace(/\.mdx?$/i, '');
  if (!u.startsWith('/')) u = `${base}/${u}`;
  u = u.replace(/\/{2,}/g, '/');
  if (u.length > 1) u = u.replace(/\/$/, '');
  if (routes.has(u)) return u;
  const ci = routesLc.get(u.toLowerCase());
  if (ci) return ci;
  const seg = u.split('/');                                  // folder-index collapse: /x/foo/foo → /x/foo
  if (seg.length >= 2 && seg[seg.length - 1] === seg[seg.length - 2]) {
    const collapsed = seg.slice(0, -1).join('/');
    if (routes.has(collapsed)) return collapsed;
  }
  return u; // best effort
}

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/;
const out = {};

for (const { key, file, base } of SECTIONS) {
  const text = readFileSync(join(ROOT, file), 'utf8');
  const logStart = text.indexOf('## Log');
  const body = logStart === -1 ? '' : text.slice(logStart);
  const items = [];
  for (const line of body.split('\n')) {
    const dm = line.match(/^\s*-\s*(\d{2}\/\d{2}(?:\/\d{2})?)\s*-\s*(.*)$/);
    if (!dm) continue;
    const link = dm[2].match(LINK_RE);
    if (!link) continue;
    items.push({ date: dm[1], title: link[1].replace(/[`*_]/g, '').trim(), url: normalizeUrl(link[2], base) });
    if (items.length >= N) break;
  }
  out[key] = items;
}

mkdirSync(join(ROOT, 'src', 'data'), { recursive: true });
writeFileSync(join(ROOT, 'src', 'data', 'recent.json'), JSON.stringify(out, null, 0) + '\n');
console.log('recent.json →', SECTIONS.map((s) => `${s.key}=${out[s.key].length}`).join(' '));
for (const s of SECTIONS) console.log(`  ${s.key}: ${out[s.key].slice(0, 3).map((i) => i.date + ' ' + i.url).join(' | ')} …`);
