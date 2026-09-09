# Plugins

## Plugins

`.claude-plugin/marketplace.json` makes this repo a plugin marketplace, which is how work developed here becomes reusable in other projects. Unlike an MCP server, a plugin's skills cost **nothing** until invoked — the lesson from the token measurement above.

```bash
/plugin marketplace add /Users/david/Sites/ralph   # local path, for iterating
/plugin marketplace add windhamdavid/ralph         # from GitHub
/plugin install diagram@ralph
```

### diagram — Excalidraw system maps

`plugins/diagram/` generates editable `.excalidraw` files for explaining a system to people who don't have the code in their head.

```bash
python3 plugins/diagram/skills/excalidraw/scripts/build_excalidraw.py \
  --spec plugins/diagram/examples/ralph-layout.spec.json \
  --out ralph-layout.excalidraw
```

Open the result at [excalidraw.com](https://excalidraw.com) or in VS Code via the `pomdtr.excalidraw-editor` extension. `plugins/diagram/examples/` holds a worked example — this repo drawn as its three reuse channels.

**Iterating on a spec:** `--watch` rebuilds on every save, and the VS Code editor picks the file back up on its own as long as the canvas has no unsaved edits of its own.

```bash
build_excalidraw.py --spec ralph-model.seed.json --out ralph-model.excalidraw --watch
```

Polling `mtime` keeps it stdlib-only — no `fswatch`, no install step. Two details make it usable rather than merely working: a spec that is briefly unparseable (any editor mid-save) logs the error and **leaves the last good file in place** instead of exiting, and each build lands via a temp file plus atomic rename, so the editor can never read a half-written diagram and show a blank canvas.

**Hand edits win over the spec.** The builder records a SHA-256 of every file it writes (`.<name>.buildstamp`, gitignored) and refuses to overwrite a drawing that no longer matches — so dragging boxes in Excalidraw, then leaving a `--watch` running, can't silently destroy the layout. `--force` overrides.

The refusal is not conservatism: the round trip is genuinely lossy. Box geometry back-ports into a spec cleanly (`x`/`y`/`width`/`height` overrides land within 0.005px), but **arrow paths cannot** — Excalidraw recomputes them when you move a shape, the builder recomputes them from node centers, and the two disagree by up to ~167px. Once a diagram has been arranged by hand, the `.excalidraw` is the source of truth and the spec becomes a record of the model rather than of the layout.

Style comes from a named theme rather than being restated per diagram; `slate` (white line art on a slate canvas, sans-serif, no fills) is the default the skill reaches for, and individual keys override it.

**Why a script rather than the model emitting JSON.** Excalidraw elements carry ~25 fields each plus *two-way* references between shapes, their labels, and arrows. Miss one backlink and the file still opens — blank, or with every label silently dropped. The script owns the schema and refuses to write a file that fails validation, so a clean exit means it will render.

```bash
build_excalidraw.py --validate diagram.excalidraw
```

Checks label/container backlinks, arrow bindings, and z-order indices. That last one is subtle: Excalidraw sorts elements by comparing `index` as a **string**, so unpadded values put `a10` before `a2` and the layering scrambles once a diagram exceeds nine elements — the indices are zero-padded for that reason.

Output is deterministic: element seeds derive from a hash of the node id, so regenerating an unchanged spec produces a byte-identical file and edits give clean diffs.

**Sharing with a non-technical audience:** export to `.excalidraw.svg`. It stays a fully editable
drawing while displaying as an ordinary image in most places — but not all, so check the one you
care about. Gogs (`davidwindham.com/code`) serves raw `.svg` as `text/plain` with
`X-Content-Type-Options: nosniff`, because an SVG is XML text and its raw handler branches on
content; the header then forbids the browser from sniffing past it, and `<img>` renders nothing.
A `.png` from the same handler comes back as `image/png` and displays. Hence `ralph-model.png`
beside the `.svg` here: the SVG remains the editable source, the PNG is what the README embeds.
Re-export both when the drawing changes —

    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
      --force-device-scale-factor=2 --window-size=1712,1104 \
      --screenshot=ralph-model.png file://$PWD/ralph-model.excalidraw.svg

**Not needed:** an Excalidraw Plus account or API key. This writes files locally and makes no network calls. The [Excalidraw+ MCP](https://plus.excalidraw.com/docs/mcp) is a separate, complementary thing — it syncs diagrams to a hosted Plus workspace for shareable links. If you add it, register it at **user scope**, never in this repo's `.mcp.json`: that file is committed and pushed to two remotes, one of them public.

## Codebase graph

[codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) is a third-party MCP server that indexes a repository into a persistent code graph, so an agent can query structure instead of reading files. It isn't vendored here — it's a C static binary distributed via GitHub Releases, and nothing in `mcp-server/` links against it. This repo owns only the **pinned installer**.

### Installing

```bash
./installers/install-codebase-memory.sh              # -> ~/.local/bin
./installers/install-codebase-memory.sh --dir=/path  # somewhere else
./installers/install-codebase-memory.sh --ui         # variant with the 3D graph UI
```

The script pins an exact release, downloads the archive for your platform, verifies its SHA-256 against `checksums.txt`, verifies its Sigstore provenance with `gh attestation verify`, ad-hoc-signs it on macOS (the binary ships unsigned, so Gatekeeper otherwise kills it), smoke-tests `--version`, and prints the registration command.

**It changes no configuration.** That's the reason it exists rather than upstream's `curl | bash`: upstream's `install` subcommand rewrites MCP client config across ~43 "client surfaces", which includes `~/.claude.json` — where the user-scope `ralph-fs` registration lives. Upstream also always fetches *latest*; at pre-1.0 RC that's an unannounced binary swap under every project at once. Here, updating means bumping `VERSION` at the top of the script, in git, where it's reviewable.

A checksum only proves the archive matches a file served by the same host that served the checksum, so a failed *attestation* is treated as fatal while a missing `gh` is not — an actively bad signal differs from an unchecked one.

### Why the binary lives outside this repo

A user-scope MCP registration is a single absolute path consulted from every project. Pointing it inside `Sites/ralph` would break the server in *every* project the moment this repo is moved, renamed, or re-cloned — so the artifact goes to `~/.local/bin` and only the installer is version-controlled.

```
installers/install-codebase-memory.sh   ← committed; pins the version
~/.local/bin/codebase-memory-mcp   ← the artifact it produces
~/.cache/codebase-memory-mcp/      ← all project graphs (CBM_CACHE_DIR)
```

Leave `CBM_CACHE_DIR` at its default for the same reason.

### Using it across projects

Unlike `ralph-fs`, this server isn't scoped to a working directory — one instance manages many repos, each indexed by absolute path and queried by name. So it needs one registration, not one per project:

```bash
claude mcp add --scope user codebase-memory -- ~/.local/bin/codebase-memory-mcp
```

```
index_repository(repo_path="/Users/david/Sites/daw_til")   # once per repo
list_projects()                                            # what's indexed
<query tools>(project="Users-david-Sites-daw_til")         # from any project
```

Project names are derived from the absolute path (`/Users/david/Sites/daw_til` → `Users-david-Sites-daw_til`), not the bare directory name — use `list_projects` to get the exact string.

Both repos then live in one store and are queryable from any session, regardless of cwd:

```json
{"projects":[
  {"name":"Users-david-Sites-ralph",   "root_path":"/Users/david/Sites/ralph",   "nodes":469,  "edges":867},
  {"name":"Users-david-Sites-daw_til", "root_path":"/Users/david/Sites/daw_til", "nodes":3474, "edges":3675}
]}
```

Indexing is fast (~5s for ralph, ~8s for daw_til, daemon startup included) and applies `.gitignore` plus its own skip-lists without configuration — daw_til's `node_modules`, `.docusaurus`, `build`, and `static` were all excluded automatically.

### Testing it without registering anything

The binary is a CLI as well as an MCP server, so it can be exercised end to end before it's wired into any client. Point `CBM_CACHE_DIR` somewhere disposable and nothing outside that directory is touched:

```bash
export CBM_CACHE_DIR=/tmp/cbm-test
codebase-memory-mcp cli index_repository '{"repo_path":"/Users/david/Sites/ralph"}'
codebase-memory-mcp cli --json search_graph --project Users-david-Sites-ralph --query "safePath" --limit 5
codebase-memory-mcp cli --json query_graph --project Users-david-Sites-ralph \
  --query "MATCH (a)-[r]->(b) WHERE b.name = 'safePath' RETURN a.name, type(r), a.file_path"
```

Note `--json` goes *before* the tool name; after it, it's parsed as a tool flag. Bare `cli <tool>` prints human-readable text instead.

### 3D graph visualization

Requires the `--ui` variant — the standard binary doesn't embed the frontend. Two things are counterintuitive:

```bash
codebase-memory-mcp --ui=true --port=9749   # persists config, then EXITS — serves nothing
codebase-memory-mcp daemon start            # the daemon owns the UI
open http://localhost:9749
```

The first command looks like it should start a server and doesn't; the **daemon** is what serves the UI, so `daemon start` is the step that actually brings it up. And the daemon starts **permanent** — it survives session end and idle, so retire it deliberately:

```bash
codebase-memory-mcp daemon stop
```

`daemon start` may warn `the daemon did not accept the UI configuration` and then serve the UI correctly anyway — observed on `v0.9.1-rc.1`. Check `daemon status`, which reports the bound URL, before chasing it.

### What it's good for, and what it isn't

Indexing both repos makes the split obvious:

| | ralph | daw_til |
|---|---|---|
| Nodes / edges | 469 / 867 | 3474 / 3675 |
| Dominant node type | Function, Method | `Section` (2541 markdown headings) |
| `search_graph` results | accurate | **0 for every query** |

`search_graph`'s BM25 index covers code symbols and filters non-code labels as noise, so on a docs repo it returns nothing even though the nodes exist — they're reachable only via `query_graph` Cypher. This is a **code** tool. For daw_til's prose the RAG index above is the right instrument and already works; the graph earns its keep on repos like `mcp-server/`, where it answers questions grep can't:

```
MATCH (a)-[r]->(b) WHERE b.name = 'safePath' RETURN a.name, type(r), a.file_path
→ 10 CALLS edges, one per tool handler  (verified against grep: exactly 10)
```

The daw_til nodes are indexed, just not searchable — worth knowing so an empty `search_graph` isn't mistaken for a failed index:

```
search_graph --query "ubuntu"                            → total: 0
query_graph  "MATCH (n:Section) RETURN n.name, n.file_path LIMIT 3"
  Tweets          lists/tweets_follow.md
  "Future Build"  notes/house/build.md
  Concepts        notes/house/build.md
```

Because graphs are keyed by project inside the shared cache, daw_til's graph is queryable from a Ralph session and vice versa.

**Tradeoff:** a user-scope registration loads all 15 of its tools into every session in every project, used or not. If that's noise, register it per-project instead — the binary path and shared cache are unchanged, only the scope moves.

Measured on this repo: its MCP tool schemas are ~24KB (**~6,500 tokens**) loaded into every session whether or not a tool is called, while Ralph's entire TypeScript source is ~20,500 tokens. On a codebase this size the graph can't pay for itself — it earns its keep on large, unfamiliar repos where it saves you from opening files you didn't need.

