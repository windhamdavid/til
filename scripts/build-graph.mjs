#!/usr/bin/env node
/**
 * build-graph.mjs — generate a {nodes, links} JSON of the site's internal link
 * graph for the on-site force-directed graph (src/pages/graph).
 *
 * Why this exists: md-graph (the VS Code extension) only resolves relative .md
 * links, so it misses this site's cross-section links (posts → docs/notes/lists),
 * which are written as absolute Docusaurus route URLs (/notes/house/helene).
 * Here we normalize BOTH link styles to canonical routes, so those edges appear.
 *
 * Routes mirror Docusaurus, including the folder-index convention: a doc named
 * `index`, `README`, OR the same as its parent folder (dogs/dogs.md) becomes the
 * folder's route (/notes/dogs) — not /notes/dogs/dogs.
 *
 * Underscore files (_posts.md, _computers.md, …) are Docusaurus "partials" with
 * no published route, but they're hand-maintained index/hub files that link to
 * many pages. We include them as non-navigable "index" nodes so those hub
 * connections show up (this is what md-graph does too).
 *
 * Output: src/data/graph.json  →  imported by the graph component.
 * Run: node scripts/build-graph.mjs   (or `npm run graph`; DEBUG=1 for diagnostics)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEBUG = process.env.DEBUG === '1';

const DOC_SECTIONS = [
  { dir: 'docs', base: '/docs', group: 'docs' },
  { dir: 'notes', base: '/notes', group: 'notes' },
  { dir: 'lists', base: '/lists', group: 'lists' },
];
const BLOG_SECTIONS = [{ dir: 'posts', base: '/posts', group: 'posts' }];
const PAGES = [
  { route: '/', label: 'Home', group: 'page' },
  { route: '/ai', label: 'AI Assistant', group: 'page' },
  { route: '/help', label: 'Help', group: 'page' },
  { route: '/map', label: 'Map', group: 'page' },
  { route: '/about', label: 'About', group: 'page' },
  { route: '/posts', label: 'Posts (blog index)', group: 'page' },
];

// ---------- helpers ----------
function walk(dir) {
  const out = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    if (name.startsWith('.') || name === 'node_modules') continue; // skip .obsidian etc.
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.mdx?$/.test(name)) out.push(full);                // include _partials (hubs)
  }
  return out;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: raw };
  const data = {};
  for (const line of raw.slice(3, end).split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: raw.slice(end + 4) };
}

const isTrue = (v) => v === true || v === 'true';
const tidy = (r) => (r.replace(/\/{2,}/g, '/').replace(/(.)\/+$/, '$1') || '/');

function titleOf(data, body, fallback) {
  if (data.title) return data.title;
  const h1 = body.match(/^#\s+(.+)$/m);
  return h1 ? h1[1].trim() : fallback;
}

const partialLabel = (rel) => {
  const b = basename(rel).replace(/^_/, '');
  return `${b.charAt(0).toUpperCase()}${b.slice(1)} (index)`;
};

// Docusaurus folder-index: index | README | same-name-as-folder → folder route.
function folderIndex(rel) {
  const parts = rel.split('/');
  const last = parts[parts.length - 1].toLowerCase();
  const parent = parts.length >= 2 ? parts[parts.length - 2].toLowerCase() : null;
  const isIndex = last === 'index' || last === 'readme' || (parent && last === parent);
  return { isIndex, dir: parts.slice(0, -1).join('/') };
}

function docRoute(base, rel, slug) {
  if (slug && slug.startsWith('/')) return tidy(base + slug);
  const fi = folderIndex(rel);
  if (slug) {
    const dir = fi.isIndex ? fi.dir : rel.split('/').slice(0, -1).join('/');
    return tidy(`${base}/${dir}/${slug}`);
  }
  if (fi.isIndex) return tidy(fi.dir ? `${base}/${fi.dir}` : base);
  return tidy(`${base}/${rel}`);
}

// ---------- pass 1: nodes + a section-relative path → route map ----------
const nodes = new Map();      // route -> {id,label,group,partial?}
const byLc = new Map();       // lower(route) -> route
const fileRoute = new Map();  // `${base}|${relPathNoExt}` -> route (+ folder aliases)
const files = [];             // {base, rel, route, body}

const addNode = (route, label, group, partial = false) => {
  if (!nodes.has(route)) nodes.set(route, partial ? { id: route, label, group, partial: true } : { id: route, label, group });
  if (!byLc.has(route.toLowerCase())) byLc.set(route.toLowerCase(), route);
};
PAGES.forEach((p) => addNode(p.route, p.label, p.group));

let skipped = 0, noSlug = 0;

for (const { dir, base, group } of DOC_SECTIONS) {
  for (const file of walk(join(ROOT, dir))) {
    const { data, body } = parseFrontmatter(readFileSync(file, 'utf8'));
    if (isTrue(data.draft) || isTrue(data.unlisted) || isTrue(data.private)) { skipped++; continue; }
    const rel = relative(join(ROOT, dir), file).replace(/\.mdx?$/, '');
    if (basename(file).startsWith('_')) {                          // hub/index partial
      const id = `${base}/${rel}`;
      addNode(id, partialLabel(rel), 'index', true);
      files.push({ base, rel, route: id, body });
      continue;
    }
    const route = docRoute(base, rel, data.slug);
    addNode(route, titleOf(data, body, basename(rel)), group);
    fileRoute.set(`${base}|${rel}`, route);
    const fi = folderIndex(rel);
    if (fi.isIndex) fileRoute.set(`${base}|${fi.dir}`, route);     // link to the folder itself
    files.push({ base, rel, route, body });
  }
}

for (const { dir, base, group } of BLOG_SECTIONS) {
  for (const file of walk(join(ROOT, dir))) {
    const { data, body } = parseFrontmatter(readFileSync(file, 'utf8'));
    if (isTrue(data.draft) || isTrue(data.unlisted)) { skipped++; continue; }
    const rel = relative(join(ROOT, dir), file).replace(/\.mdx?$/, '');
    if (basename(file).startsWith('_')) {                          // _posts.md hub
      const id = `${base}/${rel}`;
      addNode(id, partialLabel(rel), 'index', true);
      files.push({ base, rel, route: id, body });
      continue;
    }
    let slug = data.slug;
    if (!slug) { slug = rel.replace(/^\d{4}-\d{2}-\d{2}-/, ''); noSlug++; }
    const route = tidy(`${base}/${slug}`);
    addNode(route, titleOf(data, body, slug), group);
    fileRoute.set(`${base}|${rel}`, route);                        // by filename (for _posts.md links)
    fileRoute.set(`${base}|${slug}`, route);
    files.push({ base, rel, route, body });
  }
}

// ---------- link resolution ----------
const matchRoute = (r) => (r == null ? null : nodes.has(r) ? r : byLc.get(r.toLowerCase()) || null);

function resolveLink(href, base, rel) {
  if (!href) return null;
  let h = href.trim();
  if (/^https?:\/\//i.test(h)) {
    const m = h.match(/^https?:\/\/davidawindham\.com(\/.*)?$/i);
    if (!m) return null;
    h = m[1] || '/';
  }
  if (h.startsWith('mailto:') || h.startsWith('#')) return null;
  h = h.split('#')[0].split('?')[0];
  if (!h) return null;
  if (h.startsWith('/til/')) h = h.slice(4);
  else if (h === '/til') h = '/';
  h = h.replace(/\.mdx?$/i, '');
  if (h.startsWith('/')) {                                          // absolute route or file path
    const exact = matchRoute(tidy(h));
    if (exact) return exact;
    const seg = h.replace(/^\//, '').split('/');                   // .md link to a folder-index doc
    return fileRoute.get(`/${seg[0]}|${seg.slice(1).join('/')}`) || null;
  }
  const parts = (dirname(rel) + '/' + h).split('/');               // relative → resolve via file dir
  const st = [];
  for (const p of parts) { if (p === '' || p === '.') continue; if (p === '..') st.pop(); else st.push(p); }
  return fileRoute.get(`${base}|${st.join('/')}`) || matchRoute(tidy(base + '/' + st.join('/')));
}

// ---------- pass 2: edges ----------
const seen = new Set();
const links = [];
const unresolved = new Map();
const LINK_RE = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const HREF_RE = /href=["']([^"']+)["']/g;

for (const { base, rel, route, body } of files) {
  const targets = new Set();
  let m;
  while ((m = LINK_RE.exec(body))) targets.add(m[1]);
  while ((m = HREF_RE.exec(body))) targets.add(m[1]);
  for (const t of targets) {
    const dest = resolveLink(t, base, rel);
    if (!dest) {
      if (DEBUG && (t.startsWith('/') || (!/^https?:|^mailto:|^#/.test(t) && /\.mdx?($|#)/.test(t)))) {
        const k = t.split('#')[0]; unresolved.set(k, (unresolved.get(k) || 0) + 1);
      }
      continue;
    }
    if (dest === route) continue;
    const key = `${route}|${dest}`;
    if (seen.has(key)) continue;
    seen.add(key);
    links.push({ source: route, target: dest });
  }
}

// size nodes by total degree so hubs read as hubs
const deg = new Map();
for (const e of links) { deg.set(e.source, (deg.get(e.source) || 0) + 1); deg.set(e.target, (deg.get(e.target) || 0) + 1); }
const nodeList = [...nodes.values()].map((n) => ({ ...n, val: 1 + (deg.get(n.id) || 0) }));

mkdirSync(join(ROOT, 'src', 'data'), { recursive: true });
writeFileSync(join(ROOT, 'src', 'data', 'graph.json'), JSON.stringify({ nodes: nodeList, links }, null, 0) + '\n');

// ---------- report ----------
const g = (grp) => nodeList.filter((n) => n.group === grp).length;
const orphans = nodeList.filter((n) => !deg.has(n.id));
console.log(`graph.json → ${nodeList.length} nodes, ${links.length} edges`);
console.log(`  nodes: docs=${g('docs')} notes=${g('notes')} lists=${g('lists')} posts=${g('posts')} pages=${g('page')} index=${g('index')}`);
console.log(`  post → page edges: ${links.filter((e) => e.source.startsWith('/posts/')).length}`);
console.log(`  orphans (no links in or out): ${orphans.length}`);
console.log(`  skipped drafts: ${skipped}; posts w/o slug: ${noSlug}`);
if (DEBUG) {
  const top = [...unresolved.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);
  console.log('\n  unresolved internal-looking targets:');
  for (const [t, c] of top) console.log(`    ${c}×  ${t}`);
}
