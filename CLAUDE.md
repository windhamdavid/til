# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**TIL ("Today I Learned")** — David Windham's personal knowledge base and notes
site, published at https://davidawindham.com/til/ (baseUrl `/til/`). It's a place
to store notes, documentation, lists, and posts. Built with
[Docusaurus](https://docusaurus.io/) v3.10.x (React 18). Content is Markdown/MDX,
authored partly through Obsidian (each content dir may have a git-ignored
`.obsidian/` vault).

Remotes: `origin` → GitHub (windhamdavid/til), `code` → self-hosted Gitea
(code.davidawindham.com/david/til). `editUrl`s point at the Gitea `main` branch.

## Commands

```bash
npm start          # dev server with hot reload (docusaurus start)
npm run build      # static production build → ./build
npm run serve      # serve the built site locally
npm run clear      # clear the .docusaurus cache
npm run deploy     # docusaurus deploy
```

There is no test suite or linter. The build is the check: `npm run build` must
pass. Broken Markdown links and images **throw** (see `markdown.hooks` in the
config), so a typo in a relative link or image path will fail the build.

## Layout

Content is split into several Docusaurus instances, each its own top-level dir
with its own sidebar file:

| Dir       | Route        | Sidebar               | Type  |
|-----------|--------------|-----------------------|-------|
| `docs/`   | `/docs/`     | `sidebars.js`         | docs (classic preset) |
| `notes/`  | `/notes/`    | `sidebarsnotes.js`    | docs  |
| `lists/`  | `/lists/`    | `sidebarslists.js`    | docs  |
| `posts/`  | `/posts/`    | auto                  | blog  |
| `ideas/`  | `/ideas/`    | auto                  | blog (path may not exist yet) |

- `src/pages/` — standalone pages (`about.md`, `help.md`, `ai.mdx`, `map.md`, `index.md`).
- `src/theme/` — swizzled theme components (custom `SearchBar`, `BlogLayout`, `BlogListPage`).
- `src/components/` — e.g. `ABCNotation.jsx` (music notation; `abcjs`/`react-piano` are deps).
- `src/css/custom.css` — global styles.
- `static/` — assets (`img/`, `pdf/`, `katex/`). **Git-ignored** (`/static`).
- `build/`, `.docusaurus/`, `node_modules/` — generated/installed; never edit.

Config lives in `docusaurus.config.js`. When adding a new docs/blog instance,
register the plugin there and add a matching sidebar file.

## Content conventions

- Posts use a `YYYY/YYYY-MM-DD-posts.md` naming pattern with front matter
  (`title`, `slug`, `description`, `tags`, `image`, often
  `hide_table_of_contents: true`). Use `<!-- truncate -->` to mark the fold.
- Dark mode is the default; Mermaid diagrams are enabled.
- Search is `docusaurus-lunr-search` (local), not Algolia.
- `src/pages/ai.mdx` is **git-ignored** — don't assume it's committed.
- The README holds a human-readable changelog/LOG of upgrades and changes.

## Working here

- This is a personal site — keep the author's voice in prose content; don't
  rewrite or "improve" existing notes/posts unless asked.
- When editing content, verify relative links and image paths so the build
  doesn't throw.
- Commit/push only when asked. The default working branch is `main`.

## Planned: AI assistant (replacing Markprompt)

[ai.mdx](src/pages/ai.mdx) currently uses the third-party **Markprompt** widget (their hosted
vector DB + OpenAI). It's being replaced with a self-hosted, Claude-powered RAG assistant that
answers **only** from this site's content and **links back to the source pages** via Anthropic
native citations. Full plan: `~/.claude/plans/radiant-wiggling-sunrise.md`.

**The backend is NOT in this repo** — it's an extension of `/Users/david/Sites/ralph/mcp-server`
(`better-sqlite3` + `sqlite-vec`, local Ollama embeddings, Hono server on `:3001`). See that
repo's `CLAUDE.md` for the backend build. This repo owns only the **frontend wiring**:

- **Indexing (runs from ralph, reads this repo):** `ralph/mcp-server/scripts/ingest-daw-til.mjs`
  walks `docs/ notes/ lists/ posts/`, **skips `draft|unlisted|private` frontmatter and `_`-prefixed
  partials**, and stores each chunk's public TIL URL + title so citations resolve. URL mapping must
  mirror [docusaurus.config.js](docusaurus.config.js): docs/notes/lists → `/til/<route>/<path>`
  (respecting `slug:/` and `index.md`→dir root); **posts → `/til/posts/<slug>` (slug, not filename)**.
  Re-run after every content change.
- **Widget, site-wide:** add `clientModules: ['./src/clientModules/ask-widget.js']` to
  docusaurus.config.js — a net-new module that injects the `<script src=".../ask/widget.js"
  data-api-url=".../ask/api/ask">` tag (the widget bundle is served by the ralph backend).
- **Replace `<Markprompt>` in ai.mdx** with the widget's inline mode (`<div id="dawask-inline">`);
  update the page copy (Claude + working citation links now). The new page has **no secret** (key is
  server-side), so **remove `/src/pages/ai.mdx` from [.gitignore](.gitignore)** and commit it.
- **Drop the dep:** remove the `markprompt` import and the `markprompt` entry in
  [package.json](package.json); `npm install`; `grep -r markprompt src/` to confirm it's gone.

Model: Claude **Haiku 4.5** (cheap, public endpoint). Generation/citations/CORS/rate-limiting all
live in the ralph backend.
