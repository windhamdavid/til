# Server

## MCP Server

`mcp-server/` contains a local [Model Context Protocol](https://modelcontextprotocol.io) file system server (`ralph-fs`) written in TypeScript. It exposes file system operations to Claude Code as tools, scoped to a set of allowed directories.

### Tools

| Tool | Description |
|------|-------------|
| `read_file` | Read file contents with optional encoding (utf8 / base64) |
| `write_file` | Write content to a file, creating it if it doesn't exist |
| `list_directory` | List files and directories at a given path |
| `create_directory` | Create a directory, including any missing parent directories |
| `file_info` | Get metadata (size, dates, permissions, type) for a file or directory |
| `delete_file` | Delete a file or directory (non-empty directories require `recursive: true`) |
| `search_files` | Search for files matching a glob pattern |
| `git_diff` | Unified diff of a repo's changes — working tree, staged, or against a ref. Read-only. `stat: true` for the file list first. Refs are validated so one can't turn into a git option, and the resolved work-tree root is re-checked against the allowlist. |

### Path safety

All paths are resolved against a primary root (`ROOT_DIR`) and validated against an allowlist before any operation is performed. Requests that escape the allowed directories are rejected with an `InvalidParams` error. The prefix test is case-insensitive on macOS and Windows, matching the filesystem — otherwise `/Users/david/sites/...` would be rejected for a file plainly inside `/Users/david/Sites/...`.

The allowlist is **env-driven**, so the same build can serve different directory sets without a rebuild. Defaults live in `mcp-server/src/utils/path-safety.ts`.

| Variable | Default | Purpose |
|---|---|---|
| `RALPH_ALLOWED_DIRS` | `ralph`, `daw_til`, `srh` under `/Users/david/Sites` | `PATH`-style list (`:`-delimited) of accessible roots |
| `RALPH_ROOT_DIR` | `/Users/david/Sites/ralph` | Base for resolving relative paths |

`ROOT_DIR` is deliberately **not** `ALLOWED_DIRS[0]` — widening the allowlist (say, to all of `/Sites`) shouldn't silently change what relative paths resolve against, or where the RAG index lands.

### Configuration

The server is registered in `.mcp.json` and enabled via `.claude/settings.local.json`. **One file serves both
clients** — Claude Code reads it, and VS Code reads a workspace-root `.mcp.json` natively (not via
`chat.mcp.discovery.enabled`, whose sources are Claude Desktop, Windsurf and Cursor — there is no Claude Code
entry, so disabling discovery does nothing here). Registering `ralph-fs` a second time at VS Code's user
scope produces **two servers with identical tools**, which is worth avoiding on its own and doubly so with a
small model: 26 near-identical entries in the picker is how it starts fabricating paths.

```json
// .mcp.json
{
  "mcpServers": {
    "ralph-fs": {
      "type": "stdio",
      "command": "/Users/david/.nvm/versions/node/v24.20.0/bin/node",
      "args": ["/Users/david/Sites/ralph/mcp-server/dist/index.js"],
      "env": {
        "RAG_DB_PATH": "/Users/david/Sites/ralph/.rag/rag.db",
        "RALPH_ALLOWED_DIRS": "/Users/david/Sites",
        "RALPH_ROOT_DIR": "/Users/david/Sites/ralph"
      }
    }
  }
}
```

**`command` is an absolute interpreter path, deliberately.** Bare `node` resolves against whatever `nvm` has
made default, and on 2026-09-02 that drifted ahead of the runtime `better-sqlite3` was compiled for — every
RAG tool failed with `NODE_MODULE_VERSION 127 vs 137` while the filesystem tools kept working, because only
the RAG half loads the native module. Nothing reported it; the tools simply errored. A GUI-launched VS Code
compounds it by not inheriting a shell `PATH` at all. Pinning the path fixes both, at the cost of one line to
update whenever the default moves *and* the module is rebuilt.

Widening `RALPH_ALLOWED_DIRS` to all of `/Sites` is a real tradeoff: any session that can reach this server can then read and write across every site. Fine on a personal machine, but the allowlist stops being a meaningful boundary at that point.

### Using it from other projects

A project-scoped `.mcp.json` only loads when the cwd is that project. To make `ralph-fs` available everywhere, register it once at **user scope** — the code stays here, only the registration moves:

```bash
claude mcp add --scope user ralph-fs \
  --env RAG_DB_PATH=/Users/david/Sites/ralph/.rag/rag.db \
  --env RALPH_ALLOWED_DIRS=/Users/david/Sites \
  --env RALPH_ROOT_DIR=/Users/david/Sites/ralph \
  -- node /Users/david/Sites/ralph/mcp-server/dist/index.js
```

Note this covers MCP tools only. Slash commands, agents, and skills are distributed separately, by publishing them as a plugin and adding this repo as a marketplace.

### Setup

```bash
cd mcp-server
npm install
npm run build   # compiles TypeScript to dist/
npm start       # run the server directly
```

## RAG

The MCP server includes a local retrieval-augmented generation (RAG) pipeline that lets Claude index and semantically search markdown and text files entirely offline.

### How it works

1. **Ingest** — a file is read, split into overlapping chunks, and each chunk is embedded **in-process** via Transformers.js (`bge-small-en-v1.5`, 384-dim ONNX — no daemon). Embeddings are L2-normalized; queries get BGE's retrieval instruction prefix, documents are raw.
2. **Store** — chunks and their float32 embeddings are persisted in a SQLite database (`<root>/.rag/rag.db`) using the [sqlite-vec](https://github.com/asg017/sqlite-vec) extension for KNN vector search, with a parallel **FTS5** full-text index over the chunk text for keyword search.
3. **Search** — a query is run through both retrievers (semantic + keyword) and the results are merged with Reciprocal Rank Fusion. See [Hybrid search](#hybrid-search).

### RAG tools

| Tool | Description |
|------|-------------|
| `rag_ingest_file` | Chunk, embed, and index a single `.md` or `.txt` file. Requires `collection`. Re-ingesting replaces existing chunks. |
| `rag_ingest_directory` | Recursively walk a directory and ingest every `.md` / `.txt` / `.mdx` file. Requires `collection`. |
| `rag_search` | Hybrid search (semantic + keyword, RRF-fused) returning the top-k most relevant chunks with source and match info. Optional `collection` scopes it to one. Off-topic queries return nothing. |
| `rag_list_documents` | List indexed source files grouped by collection, with chunk count and last-ingested timestamp. |
| `rag_delete_document` | Remove all indexed chunks for a given source file. |

### Collections

Every chunk is tagged with the published corpus it belongs to, and the vocabulary is a **closed set of two** — `daw` (davidwindham.com site content) and `daw_til` (the daw_til docs site) — defined in `mcp-server/src/rag/collections.ts`.

This is a namespace, not a category label. The index backs a public widget that quotes what it retrieves, so before collections existed, pointing `rag_ingest_directory` at any project wrote straight into the corpus the widget cites from, with nothing to distinguish site content from a scratch repo's notes. Both ingest tools now **require** a collection, so an ingest that can't name one fails instead of quietly publishing.

Retrieval filters to the collections it was asked for. `/api/ask` passes `PUBLIC_COLLECTIONS` explicitly at the public boundary; the local chat passes every collection in its own database, which is safe because that process is never deployed and never reaches a cloud model. The filter is applied *inside* the retrievers (sqlite-vec's `rowid IN (…)` pre-filter and an FTS5 `AND`), not over their output — post-filtering a global top-30 would starve the smaller collection whenever the other dominates the neighborhood.

Rows matching no collection are **unreachable rather than deleted**: retrieval names the collections it wants instead of excluding a blocklist, so anything unrecognized fails closed. `rag_list_documents` surfaces them under `(no collection)` for cleanup.

Adding a third collection means editing that file — deliberately, so it stays a review checkpoint rather than something an agent can mint mid-session.

### Chunking strategy

Text is chunked in `mcp-server/src/rag/chunker.ts`:

1. **Split on markdown headings** (`#`–`######`) to respect document structure.
2. **Merge heading-only sections** into the following section — a lone `# WordPress` heading never becomes its own contentless chunk; instead it prefixes the content it introduces.
3. **Cap chunk size** at 1 500 characters: oversized sections split on blank lines (paragraphs), and any single paragraph still over the cap is hard-split at whitespace boundaries (so a wall of text with no blank lines can't produce a giant chunk).
4. **Overlap** — a 150-character overlap is prepended to each chunk (except the first) so context is preserved across boundaries.
5. **Drop noise** — fragments under 40 characters are discarded (keeping at least one chunk per non-empty document).

The earlier version produced ~200 heading-only fragments and one 81 KB mega-chunk (of which only the first 2 KB was ever embedded); both polluted retrieval and are eliminated by steps 2–3.

### Hybrid search

Pure vector search alone is brittle on a corpus like this — small embedding models compress text into a narrow distance band, so short queries pick up spurious neighbours and obvious lexical matches can get buried. The fix is **hybrid retrieval** (`mcp-server/src/rag/retrieve.ts`):

```
query ──┬─► sqlite-vec  (semantic, normalized L2 ≈ cosine)  → top 30
        └─► FTS5 + BM25 (keyword, porter-stemmed)           → top 30
                   │
                   ▼
        Reciprocal Rank Fusion (k=60) → relevance gate → top-k
```

- **Two retrievers.** The semantic side embeds the query (with BGE's retrieval instruction prefix) and runs a KNN search over `rag_embeddings`. The keyword side runs a BM25 query over the `rag_fts` FTS5 index.
- **Reciprocal Rank Fusion (RRF).** Each result contributes `1 / (60 + rank)` to its document's score, summed across both lists. Fusing by *rank position* avoids having to compare an L2 distance against a BM25 score directly. A chunk that ranks well in both retrievers wins; a strong hit in either is still surfaced.
- **Relevance gate.** A chunk is kept only if it's a strong semantic match (normalized L2 distance ≤ `RAG_MAX_DISTANCE`, default `0.9`) **or** a keyword hit. The keyword path ignores stopwords, so an all-stopword query like *"who made this"* registers no keyword hit and, with nothing near in vector space, returns **nothing** — which the chat/ask endpoints turn into an honest "I don't know" instead of hallucinating from noise.
- **Index sync.** `rag_fts` is an external-content FTS5 table linked to `rag_documents` by rowid, kept in sync by insert/delete/update triggers. A one-time `rebuild` (gated on `PRAGMA user_version`) backfills rows that predate the FTS index; everything after stays in sync automatically.

**Tradeoff:** keyword matching boosts recall but matches *terms, not intent*. An off-topic question that shares a word with a note — e.g. *"capital of France"* hitting a places list that mentions France — will retrieve that note. The strict context-only system prompt is the backstop: a capable model (Claude, on `/api/ask`) answers only if the note actually contains the answer and otherwise says it doesn't know; the weaker local `llama3.2` on `/api/chat` can still be clumsy with such near-misses.

Tuning knobs (env): `RAG_MAX_DISTANCE` (semantic gate), `EMBED_MODEL` / `EMBED_QUERY_INSTRUCTION` (the embedder). Changing the embedding model requires a full reindex (and recreates the vec table if the dimension differs).

### Prerequisites

**Embeddings run in-process** (Transformers.js / `bge-small-en-v1.5`) — no Ollama needed for RAG. The ~130MB ONNX model downloads from the Hugging Face hub on first use and is cached thereafter. Override the model via `EMBED_MODEL` (a reindex is required if you change it).

Ollama is only needed by the **local chat server** (`dist/local.js`, llama3.2 generation) — not for embeddings, not for `/api/ask`, and not on the deployed host at all. If you use that path, run Ollama with `OLLAMA_CHAT_MODEL` available (default `llama3.2`); `OLLAMA_HOST` defaults to `http://localhost:11434`.

### Storage

The SQLite database is stored at `.rag/rag.db` and is created automatically on first use. The directory is excluded from version control.

This index is a **fixed corpus** — the two [collections](#collections) backing the ask widget — not per-project state. It lives at one path regardless of which project the server is invoked from, so set `RAG_DB_PATH` explicitly rather than letting it fall back to `ROOT_DIR/.rag/rag.db`; that keeps the index from moving if `ROOT_DIR` ever changes. Anything genuinely per-project (a code-review graph, say) belongs in its own store keyed by repo, not in this one — the collection enum enforces that rather than leaving it to discipline.

The schema is versioned via `PRAGMA user_version`; opening a database at v1 adds the `collection` column and classifies existing rows by source path in one pass, logging the counts. It runs once and is safe to re-open.

### Querying the index from a shell

`rag_search` is the one MCP tool with no hand-runnable equivalent, and the index *is* the accumulated
knowledge — so during a provider outage the notes were unreachable from a terminal. `scripts/rag-query.mjs`
closes that: retrieval needs no generation model (`retrieveHybrid()` is a plain function, embeddings run
in-process), so this is the same hybrid search the tool performs, printed to stdout.

```bash
cd mcp-server
npm run rag:query -- supabase auth        # or: node scripts/rag-query.mjs supabase auth
```

```
3 result(s) for "supabase auth"

1. AI
   /Users/david/Sites/daw_til/notes/work/projects/ai.md
   https://davidwindham.com/til/notes/work/projects/ai
   chunk 7 · daw_til · rrf 0.0318 · vector+keyword, dist 0.8015

   ... ## Resources - ChatGPT for Supabase Docs - https://supabase.com/blog/chatgpt-supabase-docs ...
```

| Flag | |
|---|---|
| `-k, --top-k <n>` | how many chunks (default 5) |
| `-c, --collection <name>` | restrict to `daw` or `daw_til` |
| `--max-distance <n>` | semantic relevance gate (default `RAG_MAX_DISTANCE`, else 0.9) |
| `-f, --full` | print whole chunks instead of a snippet |
| `--paths` | source paths only, deduped, best match first — pipe to `xargs` |
| `--json` | the raw rows, for `jq` |

Exit status follows `grep`: **0** matched, **1** nothing matched, **2** usage or runtime error — so
`rag-query.mjs foo --paths | xargs less` and `rag-query.mjs foo || echo nope` both behave.

### Manually ingesting a directory

When the MCP tools are unavailable (e.g. after a fresh build before Claude Code reconnects), use the standalone bulk ingest script:

```bash
cd mcp-server
node scripts/ingest-dir.mjs /path/to/directory --collection daw_til
```

The script walks the directory recursively, ingests every `.md` and `.txt` file, and prints a per-file summary with chunk counts. `--collection` is required and has no default: unlike the two site scripts, this one applies no draft filtering and attaches no citation URL, so a run against the wrong tree would otherwise put unreviewed content in front of the public widget.

```
Found 53 files to ingest...

  Ingesting art/art.md (7 chunks)... done
  Ingesting health/diet.md (3 chunks)... done
  ...

Ingested 53 files → 629 total chunks.
```

**Notes:**
- Re-ingesting a file replaces its existing chunks (idempotent).
- Chunks are capped at ~1 500 characters by the chunker; the embedder runs in-process, so no daemon needs to be running.
- Add new directories to the allowlist in `mcp-server/src/utils/path-safety.ts` if they fall outside the existing allowed paths.

## AI Assistant — "davo-bot 2000"

Building on the RAG pipeline above, a public-facing chat assistant that answers **only** from David's
own notes and links every claim back to the source page. It's a small, framework-free widget styled like
the macOS-aqua **terminal window** on [davidwindham.com](https://davidwindham.com), embeddable on any
site via a single `<script>` tag.

### Two servers, two processes

`mcp-server/` builds **three** entrypoints. They share `src/rag/*` — retrieval, embeddings, chunking —
and nothing else:

| Entrypoint | Serves | Model | Port | Deployed |
|---|---|---|---|---|
| `dist/public.js` | `/api/ask`, `/ask/widget.js`, `/ask/demo` | Claude | 3001 | woozie |
| `dist/local.js` | `/`, `/api/chat`, `/api/conversations*` | Ollama | 3002 | never |
| `dist/index.js` | MCP stdio tools | — | none | — |

They were one Hono app on one port until the split. Two things were wrong with that. The deployed host
carried the whole chat surface — including `/api/conversations` with **DELETE** and no authentication —
kept unreachable only because Apache proxies just two paths; that is defense by vhost config, one proxy
edit from exposing conversation history on a public box. And because `index.ts` also started the HTTP
server, every Claude Code session holding the MCP server raced to bind 3001 (survivable — `EADDRINUSE`
was caught — but it made the chat window's availability depend on which process won).

**The local chat is Ollama-only, deliberately.** It has no Claude path at all. This is the server whose
`RAG_DB_PATH` can point at a private index, and retrieval feeds whatever it finds straight into the
generation request — a cloud model would transmit those chunks off the machine, so "indexed locally"
would stop meaning "stayed local". The guarantee is a property of the process, not a conditional inside it.

```bash
npm run public    # davo-bot on :3001
npm run local     # chat window on :3002 (what ai.stu proxies)
```

### Generation + citations

`POST /api/ask` (`src/server/http.ts`) runs hybrid retrieval, then streams a grounded answer from Claude
**Haiku 4.5** via `@anthropic-ai/sdk` (`src/rag/anthropic.ts`):

- Retrieved chunks are passed as Anthropic **`document` content blocks** with `citations: { enabled: true }`,
  so Claude returns citation spans that map back (by document index) to each chunk's public URL.
- The system prompt is **`davo-bot.md` (persona) + fixed grounding/safety rules + current-page context**.
  The persona file (`mcp-server/davo-bot.md`, hot-reloaded in dev, override with `DAVO_BOT_PROMPT`) is edited
  like a Claude prompt. The grounding rules keep **factual** claims tied to the retrieved documents and cited;
  the persona lets the bot answer **identity / greeting / abstract** questions ("who are you?") without
  documents, and decline factual ones it has no source for.
- **Page-aware** — the widget sends the page it's embedded on (`{url, title}`, preferring the canonical URL).
  The backend tells Claude which page the visitor is reading *and* boosts that page's own chunks into
  retrieval (`retrieve.ts`), so "what is this?" answers about the current page.
- Streamed to the browser as **SSE** (`sources` → `text` → `citation` → `done`). Deliberately **no
  `thinking` / `output_config`** (both 400 alongside citations / on Haiku) and **no conversation persistence**
  (public, anonymous surface).
- Hardening: CORS allowlist (`ALLOWED_ORIGINS`), per-IP fixed-window rate limit (`ASK_RATE_LIMIT_PER_MIN`),
  question length cap, and 6-turn history clamp. Streaming handlers tolerate client disconnects without
  crashing the process.

### URL-aware indexing

`scripts/ingest-daw-til.mjs` indexes the TIL content (`docs`/`notes`/`lists`/`posts`), **skipping
draft / unlisted / private files and `_`-prefixed Docusaurus partials**, and stores each chunk's public
URL + title in `rag_documents.metadata` so citations resolve to live `/til/...` pages. Run with
`npm run ingest:daw-til` (full reindex of the daw_til rows).

### Other sites (static markdown exports)

David's other sites are ingested from **static markdown exports** under `sites/<domain>/`, via
`scripts/ingest-site.mjs` (`npm run ingest:site [<domain>]`). A small `SITES` config maps each domain to its
folder + base URL; each file's public URL comes from frontmatter `url`/`slug` (else `baseUrl + path`, with
`index.md` → the page root), and chunks are stored with `metadata.{url,title,site}` so citations resolve.
Ingest is idempotent per site (clears that site's rows first). Currently:

- **davidwindham.com** — single-page portfolio; `sites/davidwindham.com/index.md` → `https://davidwindham.com/`.
  (The export was generated once by converting the live page to markdown with `turndown`; it's a committed
  file you can curate.)
- **davidwindham.com-wp (legacy WordPress)** — the old WordPress site, once served at davidawindham.com; its
  posts/pages now redirect to davidwindham.com, so the ingest maps `sites/davidwindham.com-wp/` to the same
  `baseUrl: https://davidwindham.com`. Every file carries a frontmatter `url:`, which is authoritative — the
  export's directory name never influences a citation.

Each export's origin is recorded in `metadata.kind` (`site` / `wp`); the TIL corpus is tagged `til` by
`ingest-daw-til.mjs`, which reads the live Docusaurus repo directly and has no export dir under `sites/`.

### The widget

A vanilla-JS IIFE served at `/ask/widget.js` (`src/server/ui-widget.js`), styled as a centered terminal-window
modal behind a bottom-right `>_` launcher:

- **Terminal chrome** matched to the homepage terminal — light aqua title bar with red/amber/green traffic
  lights (the red dot closes), translucent near-black body, green monospace, cyan accents.
- **Authentic terminal flow** — a typed-out intro followed by an ASCII banner, an inline prompt that starts at
  the top and scrolls as the conversation grows; your question echoes as a shell command, the answer streams
  below in green, and sources list under `// sources` as links to the live pages.
- **Returning-visitor greeting** — first visit asks your name and stores it in a cookie (`dawask_name`);
  subsequent visits greet you by name (`<name>@davo-bot-2000 ~ %`).
- **Page-aware** — sends the embedding page's canonical `{url, title}` with each request (see Generation), so
  "what is this?" answers about the page you're on.
- **CSS isolation** — `all:initial` + a `:where()` zero-specificity reset + `.dawask-*` namespacing so host
  page styles don't bleed in (or out). _Note: namespacing is leaky against aggressive host CSS; Shadow DOM is
  the bulletproof upgrade if a host's framework (e.g. Docusaurus/Infima) interferes._

Embed it (defaults shown; all optional via `data-*` — `data-title`, `data-prompt-user`, `data-prompt-host`,
`data-placeholder`, `data-intro`, `data-mode=inline`, `data-target`):

```html
<script src="https://davidwindham.com/ask/widget.js"
        data-api-url="https://davidwindham.com/ask/api/ask"></script>
```

On a **Docusaurus** site, load it site-wide via a `clientModule` that picks dev vs prod endpoints (so local
dev hits the backend on `:3001` and production stays same-origin through the Apache `/ask` proxy):

```js
// src/clientModules/ask-widget.js  + clientModules: ['./src/clientModules/ask-widget.js'] in the config
if (typeof document !== 'undefined') {
  var dev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  var s = document.createElement('script');
  s.src = dev ? 'http://localhost:3001/ask/widget.js' : '/ask/widget.js';
  s.dataset.apiUrl = dev ? 'http://localhost:3001/api/ask' : '/ask/api/ask';
  document.head.appendChild(s);
}
```

> **Dev CORS:** in production the page and `/ask/api/ask` are the **same origin**, so CORS doesn't apply. In
> local dev the Docusaurus origin (`http://localhost:3000`) differs from the backend (`:3001`), so add it to
> `ALLOWED_ORIGINS` (e.g. `ALLOWED_ORIGINS=https://davidwindham.com,http://localhost:3000`) or the widget's
> fetch is blocked with "Load failed".

### Local development

- **Demo host page** — `GET /ask/demo` (`src/server/widget-demo.html`) embeds the real widget on a simulated
  content page (with deliberately hostile host CSS) for iterating on the widget in context.
- **Hot reload** — set `DEV=1` and the server serves `ui.html` / `ui-widget.js` / `widget-demo.html` fresh
  from `src/` on every request (edit + browser refresh, no rebuild/restart). Production reads the cached
  `dist/` copies.
- **Run** — `DEV=1 npm start` (loads `.env` via `--env-file-if-exists`); needs `ANTHROPIC_API_KEY` in `.env`.

### Embeddings

In-process via Transformers.js (`bge-small-en-v1.5`), swappable via the `embed()` seam in
`src/rag/embeddings.ts`. Because document vectors are baked into `rag.db` at ingest time (on your laptop),
**the hosted server only ever embeds the incoming question** — so `/api/ask` needs no Ollama and runs as a
single Node process. Ollama stays on the laptop solely for `/api/chat`'s llama3.2 generation.

### Deployment (Ollama-free server)

The server is one Node process plus a `rag.db` you build locally and ship. Helpers live in `deploy/`
(`deploy.sh` rsync, `davo-bot.service` systemd unit).

0. **Host prerequisite: Node ≥ 22 (24 LTS recommended).** Node 18 is EOL, below `engines`, and `better-sqlite3`
   needs a Node-matching prebuilt (its source build requires C++20 against Node 24's headers). If other host
   apps run on an older Node, install the new one *alongside* and point the service's `ExecStart` at its
   absolute binary — don't change the system default out from under them.
1. **Build the index locally** — `npm run build`, then `npm run ingest:daw-til` (+ `npm run ingest:site`),
   producing `<root>/.rag/rag.db`. Run the server (or any query) once locally so the embedding model caches to
   `<mcp-server>/.model-cache`.
2. **Ship** with `deploy/deploy.sh woozie` → `/var/www/apps/davo-bot`. (`woozie` is the SSH alias for the host;
   the box runs sshd on a **non-standard port**, so pass the alias — not `user@ip` — and `rsync`/`ssh` pick up
   the port + key from `~/.ssh/config`.) It rsyncs `dist/` + `package.json` +
   `package-lock.json` + `davo-bot.md` + `sites/` + `rag.db` + **`.model-cache/`** (the bge model, so the host
   never needs huggingface.co), leaving the host's `node_modules` / `.env` alone. Then **on the host**:
   `npm ci --omit=dev` — downloads native prebuilts for `better-sqlite3` / `onnxruntime-node` (never copy your
   Mac's `node_modules`; native binaries are platform-specific).
3. **Configure** a host `.env` (chmod 600): `ANTHROPIC_API_KEY`, `ALLOWED_ORIGINS=https://davidwindham.com`
   (add `https://davidwindham.com` if the widget is embedded there too), and
   `RAG_DB_PATH=/var/www/apps/davo-bot/rag.db`. `EMBED_CACHE_DIR` is optional — it defaults to
   `<app>/.model-cache`, exactly where `deploy.sh` ships the model. (If `RAG_DB_PATH` is unset the server fails
   loudly rather than reaching for the dev default.)
   **Run under systemd** — `deploy/davo-bot.service` (set `User=` to the file owner and `ExecStart=` to the
   absolute Node binary, e.g. `/usr/bin/node`), then `daemon-reload && systemctl enable --now davo-bot`.
   `EnvironmentFile` loads `.env` deterministically; `Restart=on-failure` + boot start. No Ollama — `/api/ask`
   embeds the question in-process and generates with Claude. **Update loop:** `deploy/deploy.sh woozie` then
   `ssh woozie 'sudo systemctl restart davo-bot'` (only re-run `npm ci` if `package-lock.json` changed).
4. **Apache** reverse-proxies the public `/ask/*` surface to the service. The server binds **`127.0.0.1` in
   production** (loopback only — not reachable from the public internet; override with `HOST`/`PORT`), and
   dual-stack in dev so a browser hitting `localhost:3001` works over both IPv4 and IPv6. **Proxy to
   `127.0.0.1`, not `localhost`** — else Apache may resolve `localhost`→`::1` and miss the IPv4-only prod bind.
   Two rules are needed because the widget lives at `/ask/widget.js` but the API at `/api/ask` (most-specific
   first). Enable mods first: `a2enmod proxy proxy_http headers setenvif`.

   ```apache
   # davidwindham.com vhost — 127.0.0.1 (not localhost); API path before the prefix
   ProxyPreserveHost On
   RequestHeader set X-Forwarded-Proto https
   ProxyPass        /ask/api/ask  http://127.0.0.1:3001/api/ask  retry=0
   ProxyPassReverse /ask/api/ask  http://127.0.0.1:3001/api/ask
   ProxyPass        /ask/         http://127.0.0.1:3001/ask/     retry=0
   ProxyPassReverse /ask/         http://127.0.0.1:3001/ask/
   # SSE: unbuffered streaming, no gzip on this path
   SetEnv proxy-sendchunked 1
   SetEnvIf Request_URI "^/ask/" no-gzip dont-vary
   ```

   Public `/ask/api/ask` → backend `/api/ask`; public `/ask/widget.js` → backend `/ask/widget.js`. The chat
   The chat UI and `/api/chat` are not merely unproxied — `deploy.sh` no longer ships them, so they are absent from the host.

Reindex after content updates with `node scripts/ingest-daw-til.mjs` (locally, then re-ship `rag.db`).

_Remaining: wire the widget into the daw_til Docusaurus site (load site-wide + replace the legacy Markprompt
block on the AI page)._

