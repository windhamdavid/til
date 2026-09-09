# Ralph

A sandbox repository for learning and experimenting with AI. I'm using it as my parent Model Context Protocol server for other projects so that I can wire in additional features and plugins that are reusable between projects.



<img src="https://davidwindham.com/til/img/ralph-loop.jpg" alt="Ralph loop" width="400"></img>

<img src="/til/img/ralph-model.svg" alt="Ralph as substrate: machines and personal data (Stu, Ovid, Lisa, plus Contacts, Reminders and Calendar) feed Ralph's tools and index; from there the marketplace ships the diagram plugin, mcp-server ships ralph-fs and the RAG corpus split into the daw / daw_til collections, installers/ pins third-party binaries, and tools/ holds standalone CLIs — all reaching any project" width="100%"></img>


## Log

- **26/09/03** - 🔍 the client decision reversed by measuring it, and a 13th tool.
  - VS Code agent mode replaces Cline after one afternoon: **3 requests against Cline's 18**, a third of the
    context, no proxy, thinking left on. The mechanism is the tool protocol — Cline parses XML back out of
    prose, VS Code uses native function calling where the runtime enforces the schema.
  - `git_diff` added — the first tool built *because* of the supervisor rather than inherited. A reviewer's
    central question is "what changed?", and the alternative was enabling a terminal tool, which dissolves
    the boundary the whole design draws.
  - The boundary held: `path-safety.ts` rejected a path the model invented, under a client nothing was
    configured to constrain. First time that claim was exercised outside Claude Code.
- **26/09/02** - 🦙 local model stood up and the [architecture](/docs/ai/ralph/architecture) written down.
  - Qwen 3.6 35B-A3B on Ollama, weights on an external volume, driven by [Cline](/docs/ai/ralph/models#on-qwen-36-35b-a3b) in VS Code.
    Loads 100% GPU at 32k context on 36GB. Ollama had to go to 0.33.2 first — 0.17.0 couldn't read the
    architecture at all and failed in a way that reads like a corrupt download.
  - `rag-query.mjs` closes the last gap in the invariant that [every MCP tool wraps something runnable by
    hand](/docs/ai/ralph/architecture#the-invariant) — the index was previously reachable only through a client that wanted a model.
  - Found while testing it: `better-sqlite3` was compiled against a different Node than the one on PATH, so
    **all six RAG tools had been failing silently**. The fallback degraded better than the primary did.
- **26/08/06** - 👾 first written up.

## Features



- **CLAUDE.md** — project-level instructions that guide Claude Code's behavior in this repo
- **MCP server** — local filesystem MCP server (`ralph-fs`) exposing file operations as tools to Claude Code
- **RAG** — local retrieval-augmented generation pipeline backed by SQLite, with **hybrid search** (sqlite-vec semantic + FTS5 keyword) and in-process embeddings (no daemon)
- **AI assistant** — "davo-bot 2000", a public citation-enabled chat widget, styled as a macOS terminal, grounded in the local RAG index and embeddable on any site
- **Codebase graph** — pinned, config-touching-nothing installer for `codebase-memory-mcp`, a third-party code-graph MCP server shared across projects
- **Plugins** — this repo is a plugin marketplace; `diagram` generates editable Excalidraw system maps and installs into any project
- **Local model** — Qwen 3.6 35B-A3B on Ollama as a supervisor/reviewer, so routine work survives a provider
  outage; the [architecture](/docs/ai/ralph/architecture) is built so the fallback doesn't have to be good
- **Shell-first floor** — every MCP tool is a thin wrapper over something runnable by hand, `rag_search`
  included (`scripts/rag-query.mjs`), so the index is reachable from a terminal with no model in the path
- **Dual remotes** — changes pushed to both GitHub and a self-hosted Gogs instance



<br clear="all"/>

## Remotes

| Name | URL |
|------|-----|
| origin | https://github.com/windhamdavid/ralph.git |
| code | https://davidwindham.com/code/ralph.git |

## Reuse across projects

Ralph is the parent repo in the sense that capabilities are *developed and versioned* here and then used from anywhere. That reuse is **not** filesystem inheritance — sitting above `Sites/` gives a project nothing. `CLAUDE.md`, `.claude/settings.json`, and `.mcp.json` are all scoped to the directory they live in and never propagate to a sibling.

What reaches other projects does so through one of three deliberate channels:

| Channel | Distributes | Reaches other projects via | Cost per session |
|---|---|---|---|
| [Plugin marketplace](/docs/ai/ralph/plugins) | skills, commands, agents | `/plugin install <name>@ralph` | **none until invoked** |
| [MCP server](/docs/ai/ralph/server#using-it-from-other-projects) | tools (`ralph-fs`) | `claude mcp add --scope user` | tool schemas, always loaded |
| [Pinned installer](/docs/ai/ralph/plugins#codebase-graph) | third-party binaries | `installers/*.sh` + a registration you run | none until registered |

### Choosing between them

**Prefer a plugin.** Skills load on demand, so a dozen of them cost nothing in a session that never uses one. This is the default for anything that is knowledge or procedure rather than a live capability.

**Use an MCP server when you need a running process** — something holding a database handle, a network connection, or an index. The cost is real and fixed: `codebase-memory`'s schemas measure ~6,500 tokens injected into *every* session it's registered in, used or not, versus ~20,500 tokens for the whole of `mcp-server/src`. Register at user scope only when you'll genuinely use it everywhere; otherwise scope it per-project.

**Use a pinned installer for third-party binaries.** The artifact lands outside this repo (`~/.local/bin`) so a user-scope registration doesn't break when Ralph is moved or re-cloned; only the pinned installer is version-controlled. See [installers/install-codebase-memory.sh](https://davidwindham.com/code/ralph/src/main/installers/install-codebase-memory.sh).

### Not a channel: project-specific tools

A fourth kind of thing lives here that is **not** a reuse channel: standalone CLIs in [tools/](https://davidwindham.com/code/ralph/src/main/tools), kept in Ralph because this is where tooling gets developed and versioned. They are not installed anywhere — you run them.

- [tools/last-fm-snapshot/](https://davidwindham.com/code/ralph/src/main/tools/last-fm-snapshot) — pulls a Last.fm listening snapshot and writes Docusaurus markdown into `daw_til`. Project-specific: its output belongs to exactly one site.
- [tools/reminders-export/](https://davidwindham.com/code/ralph/src/main/tools/reminders-export) — turns Apple Reminders into markdown the local chat reads for context. Feeds the substrate rather than any one project.

Note `installers/` is a different thing again: it holds pinned installers for *third-party* binaries that land outside this repo. `tools/` holds programs written here that produce files.

The distinction is worth keeping visible, because the two categories fail differently. A reuse channel is judged on what it costs *every* project that installs it. A project-specific tool is judged on whether its output lands somewhere appropriate — which is why the scrobble output is [excluded from the RAG index](/docs/ai/ralph/server#collections): it is generated data with no prose to answer a question, and the corpus it would otherwise join is one a public widget quotes from.

### What lives where

```
.claude-plugin/marketplace.json   ← the catalog other projects install from
plugins/<name>/                   ← one directory per plugin
  .claude-plugin/plugin.json
  skills/ commands/ agents/       ← auto-discovered by convention
installers/                       ← pinned installers for external binaries
tools/                            ← standalone CLIs (last-fm-snapshot, reminders-export)
mcp-server/                       ← the ralph-fs MCP server (TypeScript)
```

Adding a plugin means a directory under `plugins/` and an entry in `marketplace.json` — no other wiring. Iterate against a local path (`/plugin marketplace add /Users/david/Sites/ralph`) and switch to `windhamdavid/ralph` once it's stable.

