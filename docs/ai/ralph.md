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
- **26/09/02** - 🦙 local model stood up and the [architecture](#architecture) written down.
  - Qwen 3.6 35B-A3B on Ollama, weights on an external volume, driven by [Cline](#on-qwen-36-35b-a3b) in VS Code.
    Loads 100% GPU at 32k context on 36GB. Ollama had to go to 0.33.2 first — 0.17.0 couldn't read the
    architecture at all and failed in a way that reads like a corrupt download.
  - `rag-query.mjs` closes the last gap in the invariant that [every MCP tool wraps something runnable by
    hand](#the-invariant) — the index was previously reachable only through a client that wanted a model.
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
  outage; the [architecture](#architecture) is built so the fallback doesn't have to be good
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
| [Plugin marketplace](#plugins) | skills, commands, agents | `/plugin install <name>@ralph` | **none until invoked** |
| [MCP server](#using-it-from-other-projects) | tools (`ralph-fs`) | `claude mcp add --scope user` | tool schemas, always loaded |
| [Pinned installer](#codebase-graph) | third-party binaries | `installers/*.sh` + a registration you run | none until registered |

### Choosing between them

**Prefer a plugin.** Skills load on demand, so a dozen of them cost nothing in a session that never uses one. This is the default for anything that is knowledge or procedure rather than a live capability.

**Use an MCP server when you need a running process** — something holding a database handle, a network connection, or an index. The cost is real and fixed: `codebase-memory`'s schemas measure ~6,500 tokens injected into *every* session it's registered in, used or not, versus ~20,500 tokens for the whole of `mcp-server/src`. Register at user scope only when you'll genuinely use it everywhere; otherwise scope it per-project.

**Use a pinned installer for third-party binaries.** The artifact lands outside this repo (`~/.local/bin`) so a user-scope registration doesn't break when Ralph is moved or re-cloned; only the pinned installer is version-controlled. See [installers/install-codebase-memory.sh](https://davidwindham.com/code/ralph/src/main/installers/install-codebase-memory.sh).

### Not a channel: project-specific tools

A fourth kind of thing lives here that is **not** a reuse channel: standalone CLIs in [tools/](https://davidwindham.com/code/ralph/src/main/tools), kept in Ralph because this is where tooling gets developed and versioned. They are not installed anywhere — you run them.

- [tools/last-fm-snapshot/](https://davidwindham.com/code/ralph/src/main/tools/last-fm-snapshot) — pulls a Last.fm listening snapshot and writes Docusaurus markdown into `daw_til`. Project-specific: its output belongs to exactly one site.
- [tools/reminders-export/](https://davidwindham.com/code/ralph/src/main/tools/reminders-export) — turns Apple Reminders into markdown the local chat reads for context. Feeds the substrate rather than any one project.

Note `installers/` is a different thing again: it holds pinned installers for *third-party* binaries that land outside this repo. `tools/` holds programs written here that produce files.

The distinction is worth keeping visible, because the two categories fail differently. A reuse channel is judged on what it costs *every* project that installs it. A project-specific tool is judged on whether its output lands somewhere appropriate — which is why the scrobble output is [excluded from the RAG index](#collections): it is generated data with no prose to answer a question, and the corpus it would otherwise join is one a public widget quotes from.

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

## Models

Four models are in play, and only one of them ships:

| Model | Role | Where it runs |
|-------|------|---------------|
| `Xenova/bge-small-en-v1.5` | embeddings (384-dim) — [RAG](#rag) indexing and query | in-process, Transformers.js / ONNX |
| `claude-haiku-4-5` | generation + citations for the public `/api/ask` | Anthropic API |
| `llama3.2` | generation for the local-only `/api/chat` | Ollama on `stu`, never deployed |
| `qwen3.6:35b-a3b-q4_K_M` | local coding assistant / supervisor, driven by [Cline](#on-qwen-36-35b-a3b) | Ollama on `stu`, weights on Blue25 |

The fourth is the newest and the least settled — added 2026-09-02 as the local fallback the
[architecture](#architecture) is built around, not as a quality play. It is 23GB resident and cannot
share memory with `llama3.2`, so the two Ollama models take turns; Ollama's idle unload is what keeps that
from being a conflict. Sizing, the client decision, and the measurements are further down under
[On Qwen 3.6 35B-A3B](#on-qwen-36-35b-a3b).

The split is what keeps the deploy small. Document vectors are baked into `rag.db` at ingest time on the
`stu`, so the hosted server only ever embeds the incoming *question* — no Ollama, no GPU, one Node process.
See [Deployment](#deployment-ollama-free-server).

`nomic-embed-text` may still be sitting in a local Ollama install. Nothing imports it — it predates the move
to in-process embeddings and can go with `ollama rm nomic-embed-text`.

### Where the weights live

| Path | Holds | Override |
|------|-------|----------|
| `mcp-server/.model-cache` | the ONNX embedding model (~130MB), kept outside `node_modules` so `npm ci` can't wipe it; ships with deploys | `EMBED_CACHE_DIR` |
| `~/.ollama/models` → `/Volumes/Blue25/_ralph/MODELS/ollama` | Ollama's blobs (`llama3.2`, `qwen3.6`, `nomic-embed-text`) | **symlink, not `OLLAMA_MODELS`** — see below |

`OLLAMA_MODELS` is deliberately unused. Ollama runs as a `brew services` agent, and `brew services`
regenerates its launchd plist from the formula on every restart — so the variable would be wiped by the next
`brew services restart`. The store is symlinked instead, which also fails safer: pointed at an unmounted
`/Volumes/Blue25/...`, Ollama would create that tree on the internal disk and quietly fill it, where a
dangling symlink simply cannot be written through.

### Swapping the embedding model

`EMBED_MODEL` overrides the embedder, but it is not a drop-in. Vectors from different models aren't
comparable, and the `rag_embeddings` vec0 table fixes its width at create time (`EMBEDDING_DIM = 384` in
`src/rag/db.ts`), so a model of a different dimensionality means recreating that table and reindexing both
collections — not just changing the name. `RAG_MAX_DISTANCE`, the relevance gate that produces the widget's
"I don't know", is tuned to the current model's distance distribution and has to be re-tuned with it.

### Upgrade assessment — working notes

_Captured 2026-08-30 from a planning conversation about swapping the embedder, adding a reranker, and moving
model weights to an external volume. **None of this is implemented yet**; it records what the repo actually
does today and what an upgrade would cost._

The reranker and the model relocation are both good calls, but three of the premises didn't match what's in
the repo.

#### The embedding model isn't `nomic-embed-text`

`embeddings.ts` runs `Xenova/bge-small-en-v1.5` in-process via Transformers.js — 384-dim, no daemon.
`nomic-embed-text` is a leftover 274MB Ollama pull that nothing imports; the only Ollama consumer left is
`llama3.2` for `local.ts`'s `/api/chat`. So there's no nomic→X swap; there's a bge-small→X swap, and the
column is `float[384]`, not 768.

That also changes the deployment math. `/api/ask` embeds the incoming question at query time **on woozie**,
so whatever you pick has to run there on CPU. bge-small is 128MB ONNX and ~10ms. Qwen3-Embedding-0.6B is
~600M params — several hundred MB quantized and a couple orders of magnitude slower per query. That's the
real constraint on the embedding swap, not disk.

#### The reranker is the strong idea, and it's independent

`retrieve.ts` already does vec KNN + FTS5 BM25 → RRF → relevance gate, pulling `CANDIDATES = 30` and cutting
to `topK`. A cross-encoder slots in exactly there: rerank the 30 fused candidates down to 6. Crucially it
needs **no schema change and no reindex** — pure query-time addition, rollback is an env flag. And its own
comment at `retrieve.ts:5-8` says the embedder "compresses this corpus into a narrow distance band", which is
the exact failure a reranker fixes. Do this first; it may make the embedding swap unnecessary.

#### Rollback: parallel vec table, not a second collection

`collection` is a column on `rag_documents`; the vec0 dimension is fixed per *table*. A 1024-dim vector can't
go into `rag_embeddings` under any collection value. Duplicating the corpus into a second collection would
also double `rag_documents` and skew BM25 stats, so you'd no longer be comparing like with like.

Instead: add `rag_embeddings_1024` as a second vec0 table sharing rowid with the same `rag_documents`. Both
vector spaces over identical chunks, one env var picks which table retrieval reads, rollback is instant, and
the A/B is clean. Then it's genuinely one commit — new table + backfill script + read switch — with nothing
destructive.

One hazard to plan for: `DEFAULT_MAX_DISTANCE = 0.9` is tuned to bge-small's distance distribution, and it's
what produces the off-topic "I don't know" on the public widget. A new embedder invalidates that constant and
silently changes what the widget refuses to answer. It needs re-tuning as part of the swap, and the eval set
should include the off-topic cases, not just the hits. (Note the `sqlite3` CLI here has no `vec0` module, so
eval tooling has to go through node.)

#### Models on Blue25: yes for Ollama, no for the embedder

Disk headroom is the reason, though the numbers need reading carefully. The APFS container is 94.5%
consumed with 27.2GB not allocated, and `df` reports ~25GiB available — but Settings > Storage says ~150GB,
because it counts **purgeable** space and `df` doesn't. The difference is mostly one Time Machine local
snapshot that `diskutil apfs listSnapshots disk3s5` marks `Purgeable: Yes` / "limits the minimum size of
APFS Container disk3".

So a 20GB pull would probably succeed — macOS evicts that snapshot under pressure. The objection isn't a
hard wall, it's that the headroom is reclaimable-on-demand rather than owned: the OS chooses when to free
it, and doing so discards a local restore point. None of this is an Ollama limit — Ollama has no quota and
writes until the volume fills. Blue25 has 1.4TB of actually-unallocated space.

**Done 2026-09-02, but not with `OLLAMA_MODELS`.** Ollama now runs as a `brew services` agent, and
`brew services` regenerates its launchd plist from the formula on every restart — so an `OLLAMA_MODELS`
entry added there is wiped by the next `brew services restart`. The store itself was relocated instead:

    ~/.ollama/models -> /Volumes/Blue25/_ralph/MODELS/ollama

The symlink also fails *safer* than the env var. With `OLLAMA_MODELS` pointed at an unmounted
`/Volumes/Blue25/...`, Ollama creates that tree on the internal disk and quietly fills it — the exact
outcome this section is trying to avoid. A dangling symlink cannot be written through, so an absent volume
is a loud failure and `/api/chat` is down, which was the accepted worst case anyway.

Two env vars *do* come from the formula and survive restarts, confirmed on the running process:
`OLLAMA_FLASH_ATTENTION=1` and `OLLAMA_KV_CACHE_TYPE=q8_0`. The second is load-bearing for the sizing above.

Leave `.model-cache` on the internal disk though. It's 128MB, it gets rsynced to woozie as part of the deploy
artifact, and it's on the critical path for the thing that must always work. Moving it to a separate volume
buys 128MB and adds a mount-order failure mode where Transformers.js silently re-downloads from HF. If a much
larger embedder lands later, relocate *those* weights and keep a fallback path.

#### On Qwen 3.6 35B-A3B

Specs per [canirun.ai](https://www.canirun.ai/model/qwen3.6-35b-a3b): 36B total parameters, 3.0B active,
sparse MoE (256 experts, 8 active), 256K context, released 2026-04. It behaves like a small model for
throughput while needing the full weight set resident.

| Quant | Size (canirun) | Ollama tag | Actual | On a 36GB M4 Max |
|-------|------|------|------|------------------|
| `Q4_K_M` | 18.9 GB | `qwen3.6:35b-a3b-q4_K_M` | **23 GB** | pulled 2026-09-02 — **loads 100% GPU at 32k ctx** |
| `Q4_K_M` (mtp) | — | `qwen3.6:35b-a3b-mtp-q4_K_M` | 23 GB | multi-token-prediction variant, untested |
| `Q5_K_M` | 23.6 GB | | | borderline against Metal's default wired limit (~75% of RAM) |
| `Q6_K` | 28.2 GB | | | needs `iogpu.wired_limit_ratio` raised |
| `Q8_0` | 37.4 GB | | | exceeds total RAM |

**The canirun figures run ~20% light.** Ollama's actual `Q4_K_M` is 23GB, not 18.9GB — close to what the
table called borderline for `Q5_K_M`, so treat the third column as the real one and the estimates as a
lower bound.

Measured 2026-09-02, first load: `ollama ps` reports **23 GB / 100% GPU / 32768 context**, cold start plus a
trivial generation in **13.8s**, system memory free dropping to **11%**. So it fits — with `OLLAMA_FLASH_ATTENTION=1`
and `OLLAMA_KV_CACHE_TYPE=q8_0` doing the work that makes 32k viable at this weight — but there is no room
for a second resident model. `llama3.2` for `/api/chat` and this cannot both be warm; Ollama's idle unload
(~4 min) is what makes that survivable rather than a conflict.

The 256K context is irrelevant here — `/api/chat` sends `TOP_K = 5` chunks of ≤1500 chars, so a couple of
thousand tokens. What *is* relevant: `local.ts` sets no `options.num_ctx` on its Ollama request, so it
inherits Ollama's small default and silently truncates from the front. Worth fixing before judging any
retrieval change on that path — otherwise better-retrieved chunks get dropped before the model sees them.

**Ollama must be recent enough to know the architecture.** The first load failed with
`unknown model architecture: 'qwen35moe'` on Ollama **0.17.0** — nothing to do with memory or storage; it
failed at architecture dispatch before allocating anything. Upgrading to **0.33.2** fixed it outright.
Worth knowing because the error text points at a blob path and reads like a corrupt-download or
out-of-memory problem, which sends you debugging the wrong thing entirely. `/api/chat` was re-tested across
that sixteen-version jump and is unaffected — NDJSON streaming and citation URLs both intact.

Two intended uses, and they pull in different directions:

1. **Generation for `/api/chat`** — swaps `llama3.2` in `local.ts`. Short contexts, low memory, easy.
2. **A local coding assistant in VS Code** — long contexts over real files, running *alongside* VS Code,
   Node, and whatever else. This is the demanding one: `Q4_K_M`'s 18.9GB plus an Electron host plus a KV
   cache that grows with context is what will actually strain 36GB. Budget context deliberately (32–64K,
   not 256K) and treat `num_ctx` as a memory knob, not a free parameter.

Neither is on the path that ships. Public `/api/ask` generation is locked to Haiku 4.5, so retrieval work
validated here still has to be measured against the eval set, not against how the local chat feels.

VS Code needs a client extension to talk to Ollama — none is installed today. Continue.dev was the usual
recommendation but has been acquired by Cursor and is no longer independent; the open-source code remains
public. Current options: **Cline** (agentic, open source, takes an Ollama base URL), **Roo Code** (a Cline
fork with per-mode model selection — useful for local-cheap / Claude-hard splits), or **Twinny** (light,
local-first, completion-focused).

**Chosen 2026-09-03: VS Code agent mode**, running Qwen 3.6 35B-A3B — replacing Cline a day after picking
it, on measurements rather than reading. Same model, same prompt, same afternoon: **3 requests against
Cline's 18**, a peak prompt of **11,974 tokens against 32,767** (Cline hit the ceiling exactly), ~28 seconds
against minutes of retries, thinking left **on** where Cline needed it forced off, and no proxy. The
mechanism is the tool protocol — Cline describes tools as XML in the prompt and parses them back out of
prose, so a small model has to follow ~15k tokens of instructions; VS Code uses native function calling,
where the runtime enforces the schema. Handed the same tool with a required boolean, the model filled it in
correctly first time.

Deselecting VS Code's **built-in** tools was what made it work — with them enabled the model fabricated a
path into VS Code's own workspace storage instead of calling `rag_search`; with only `ralph-fs` exposed (all
12 tools, not a narrowed set) it chose correctly. `path-safety.ts` rejected that fabricated path, which is
the [Layer 2 boundary](#architecture) holding under a client it was never configured for. Cline has
been uninstalled. The superseded reasoning is kept below, because the argument that picked wrong is the
useful part.

**Superseded 2026-09-02: Cline**, running Qwen 3.6 35B-A3B. It's the more established agent of the three, open
source with no licensing question (unlike OpenClaude, evaluated and parked), and it has a "Use Compact
Prompt" mode for local inference — a setting that exists because its default system prompt is large enough
to hurt when you're spending from a 32k budget. Decisively, it takes **stdio MCP servers with per-server
`env`**, the same shape `.mcp.json` uses to hand `ralph-fs` its `RALPH_ALLOWED_DIRS`, which is what makes
the [architecture](#architecture)'s control-plane design possible at all.

Kilo was the runner-up and remains the better *documented* setup for this: per-mode model selection
(Code/Architect/Debug/Custom) maps onto the local-cheap / Claude-hard split, and its Ollama docs name the
settings that actually matter — an explicit `num_ctx` with a 32k recommended floor, and an adjustable
request timeout (default 10 minutes, itself a fair warning about local prefill). Cline's Ollama docs name
no context minimum at all, so **take Kilo's 32k floor as the number to set anyway**; it's the same Ollama
knob either way.

**Two caveats, both found the same day, and together they reopen the client question.** Cline's built-in
tools can't be disabled — `autoApprove` controls approval prompts, not availability — so the MCP boundary
constrains what runs *unattended*, not what the model can reach. And its **CLI is account-gated**: the
provider config writes fine and the local model genuinely answers (Ollama logged `200 | 43.79s | POST
/api/chat`), but the CLI then discards the turn with `Unauthorized: ... re-authenticate your Cline account`.
Inference isn't the gate; the session layer is. That retracts the terminal-first half of the case for
Cline — the VS Code extension works and is the surface, which is what VS Code agent mode already offered
with no account and with tools that *can* be deselected. See
[docs/architecture.md](#architecture); the decision stands for now but should not be assumed to
survive a real side-by-side.

##### Turn thinking off, or tool calling breaks

The first real Cline session failed with *"Cline hit repeated tool call failures. Try guiding it with a new
prompt"* — on the question *"what model are you using?"*, which needs no tool at all. Ollama's log exonerates
the server completely: every request returned `200` with `truncated = 0`, at `n_tokens = 16505`. The model
answered; Cline couldn't use the answer.

Reproduced against Ollama directly with a minimal Cline-shaped prompt (a system message demanding exactly one
XML tool call), holding everything else constant and toggling `think`:

| `think` | thinking tokens | tool emitted |
|---------|-----------------|--------------|
| `true` | **10,752** | `<search_wikipedia>` — **invented; not in the allowed set** |
| `false` | 0 | `<ask_followup_question>` — valid, and it answered the question |

So with reasoning on it spent 10.7k tokens and hallucinated a tool that was never offered; Cline rejects the
unknown tool, retries, gets another invention, and reports repeated failures. With reasoning off it picked a
real tool on the first attempt.

**Two settings fix it**, both in Cline: **Adaptive Thinking → None**, and **Settings → Features → Use Compact
Prompt**. The second matters because the arithmetic is tight — a 16.5k system prompt plus 10.7k of thinking is
27k of a 32k budget before anything useful is said. `ollama show` reports `thinking` among the model's
capabilities and it is **on by default**; Ollama accepts `think:false` per request, and Cline has a `think`
boolean it can send.

**Read this as one observation, not a verdict.** It is a single prompt shape on a single day, and what it
establishes is narrow: that a default made a working setup look broken, and that the visible error pointed
somewhere other than the cause. It does *not* establish that the model is good at agentic work with thinking
off — that needs real tasks. It is worth knowing that both logs said `200`, so nothing outside a deliberate
A/B would have found this; the same class of problem as the `num_ctx` truncation above, and the reason both
are written down rather than remembered.

##### Running it: the settings that matter

Four things, none of them obvious, all found by hitting them:

- **Use a 64K model variant.** VS Code refuses to run agent mode below 64K (*"Ollama is using a 32K context
  window"*). Ollama's server default is 32,768 and the extension exposes no context setting, so the fix
  belongs to the model:

      printf 'FROM qwen3.6:35b-a3b-q4_K_M\nPARAMETER num_ctx 65536\n' > Modelfile
      ollama create qwen3.6:35b-a3b-64k -f Modelfile

  This costs **no disk** — Ollama shares the weight layers between the two entries — and **no memory**: still
  23GB, still 100% GPU, still 11% free, because `OLLAMA_KV_CACHE_TYPE=q8_0` keeps the cache small enough that
  doubling the window is nearly free. Baking it into the model beats `OLLAMA_CONTEXT_LENGTH` on the service,
  which `brew services` would wipe on its next restart — the same trap as `OLLAMA_MODELS`, [above](#models-on-blue25-yes-for-ollama-no-for-the-embedder).
  Note the two entries differ *only* by that parameter and sort adjacently in the picker, so a 32K warning
  usually means the wrong one is selected rather than a stale cache.

- **Deselect VS Code's built-in tools.** Not optional — it is what makes the model work, not merely what the
  [architecture](#architecture) wants. Leave all 13 `ralph-fs` tools enabled; narrowing further is
  unnecessary.

- **Consider dropping the six mutating tools too.** `write_file`, `create_directory`, `delete_file`,
  `rag_ingest_file`, `rag_ingest_directory`, `rag_delete_document`. A reviewer reads and diffs; it does not
  write, and `rag_delete_document` can quietly damage the index that *is* the accumulated knowledge.

- **Servers start lazily.** An MCP server showing as stopped is normal, not broken — it starts on first tool
  use. After a rebuild adds a tool, though, a warm process keeps serving the old list: `MCP: List Servers` →
  *Restart*, and watch for the tool count (13, not 12).

Also under consideration, both **editors rather than extensions** — they replace VS Code instead of plugging
into it:

- **[Zed](https://zed.dev)** — standalone, written in Rust, open source. Agentic editing, edit prediction,
  inline assistant, parallel agent threads, and external agents over ACP (Claude Agent, Codex). Its landing
  page doesn't state Ollama support; verify before counting on it.
- **[Void](https://voideditor.com)** — a VS Code *fork*, so themes, keybinds, and settings transfer in one
  click. Open source, YC-backed (Glass Devtools), **in beta**. Supports Ollama directly, plus FIM models for
  tab completion, and Agent/Gather/chat modes with checkpoints.

The fork question is the real trade: Void keeps the VS Code muscle memory, Zed abandons it for speed and a
cleaner agent story. Neither is a small switch, and Void's beta status argues for waiting.

Note that completion and chat want different models: tab completion needs fill-in-the-middle support, which
instruct models like 35B-A3B handle poorly. The usual setup is a small coder base model for FIM plus the
larger model for chat and agent work.

#### Suggested order

1. ~~Ollama models → Blue25~~ — **done 2026-09-02** (symlinked, not `OLLAMA_MODELS`; see above)
2. Build a fixed eval set — queries with expected source URLs, plus off-topic cases
3. Reranker behind an env flag, measured against the eval set
4. Only then the embedding swap, via parallel vec table + re-tuned distance gate

### M5 Ultra

Open question: whether to replace `stu` — a 36GB M4 Max Mac Studio (`Mac16,9`) — with a **96GB M5 Ultra Mac
Studio**. Note this is a same-class upgrade: `stu` is already an always-on desktop, so the only variable is
memory (and whatever bandwidth an Ultra adds over a Max). Recorded here because the Qwen sizing above is
the concrete case for and against it. The M5 Ultra's own specs are taken as a premise — core counts and
bandwidth aren't verified here, and only the memory figure drives the argument below.

#### What 96GB actually changes

Metal reserves roughly 75% of unified memory for the GPU by default, so usable budget goes from ~27GB to
~72GB. Against Qwen 3.6 35B-A3B:

| Quant | Size | 36GB M4 Max | 96GB M5 Ultra |
|-------|------|-------------|---------------|
| `Q4_K_M` | 18.9 GB | fits, ~8GB spare | trivial, large KV headroom |
| `Q5_K_M` | 23.6 GB | borderline at the wired limit | comfortable |
| `Q6_K` | 28.2 GB | needs `iogpu.wired_limit_ratio` raised | comfortable |
| `Q8_0` | 37.4 GB | exceeds total RAM | comfortable |
| `F16` | 74.3 GB | impossible | possible, past the default wired limit |

The honest reading: **`stu` already runs the model you'd actually run.** `Q4_K_M` fits today with room to
spare, and the quality gap from Q4 to Q8 on a 3B-active MoE is real but modest. The upgrade doesn't
unlock the stated use case; it makes it roomier.

#### The arguments that do hold

- **Context, not weights.** The binding constraint for a coding assistant is the KV cache, which grows with
  context while the weights stay fixed. 96GB is what turns "budget 32–64K carefully" into "use the 256K".
- **Concurrency.** At 36GB the model competes with VS Code's Electron host, Node servers, and Claude Code
  for the same pool. 96GB means it stops being a zero-sum allocation.
- **Bandwidth.** An Ultra is two Max dies, so memory bandwidth should roughly double — and bandwidth is what
  sets token throughput. Not verified for M5; worth confirming before it counts as a reason.
- **Ingest and reindex** currently pin `stu` while they run. More headroom makes that a background job
  rather than a stop-everything one.
- **Headroom for the next model,** which will be larger. 36GB is already the ceiling for this one at high
  quant.

#### The arguments against

- **Nothing that ships is affected.** Public `/api/ask` runs Haiku 4.5 on woozie, and the RAG embedder is a
  128MB CPU model. Neither gets faster or better with more local memory — this is purely an experimentation
  purchase.
- **It doesn't fix the disk problem.** The 95%-full volume is `stu`'s boot disk, and a new box starts the
  same clock unless the storage habits change. Blue25 relocation is the cheap fix either way.
- **It's not what's blocking the RAG work.** The reranker needs no new hardware, and the eval set is what
  decides whether retrieval improved. Buying a Studio answers a different question than the one being asked.

#### Where that leaves it

Justified if local models become a daily driver — a coding assistant used in earnest, or an always-on host
for the local stack. Not justified by the RAG upgrade, which runs the same on both machines. The cheap moves
(`OLLAMA_MODELS` → Blue25, `Q4_K_M`, a `num_ctx` that fits) should come first, if only because they establish
whether local models get used enough to warrant the box.


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

## Architecture

_Written 2026-09-01. This describes the intended shape and audits how far the repo
currently is from it. Where the two differ, the gap is named rather than smoothed over._

### The problem this shape solves

Ralph's capabilities are reached almost entirely through Claude Code today. That is a
good primary — it is the best of the available clients — but it makes a third-party
provider a single point of failure for operating things that are otherwise entirely
local: a SQLite index on this machine, a Node server on loopback, an rsync to a box
over SSH.

The failure being designed against is not really "the API is down." It is that
**operational knowledge accumulates in conversations rather than in runnable form**, so
an outage turns routine work into archaeology. A local model does not fix that on its
own — a weaker model reading undocumented scripts under time pressure is worse than
doing it by hand.

So the goal is inverted: make the fallback not need to be good.

### Three layers

| Layer | What it is | Depends on | Interface |
|---|---|---|---|
| 1. Clients | Claude Code (primary), a local agent (fallback) | a model, possibly a provider | conversation |
| 2. `ralph-fs` MCP | the 12 tools + the path boundary | Node, the repo | tool calls |
| 3. CLIs | `npm` scripts, `tools/`, `scripts/`, `deploy/deploy.sh` | a shell | typed commands |

Each layer is independently usable, and they degrade in that order. Layer 1 is
swappable by design — no client is the architecture. Layer 3 is the floor, and the
floor has no model in it at all.

#### The invariant

**Every MCP tool is a thin wrapper over something that can also be run by hand.**

This is the whole design in one line. It is what makes "the fallback doesn't have to be
good" concrete rather than aspirational, and it means the runbook is not a separate
document that drifts — the runbook is Layer 3, written down.

A tool that is the *only* way to perform an operation breaks the floor, and should be
treated as a defect rather than a convenience.

### Audit: where the invariant holds

| MCP tool | Shell equivalent | Holds |
|---|---|---|
| `read_file`, `write_file`, `list_directory`, `create_directory`, `delete_file`, `file_info`, `search_files` | `cat`, heredoc, `ls`, `mkdir`, `rm`, `stat`, `rg` | yes — Unix already is the floor |
| `git_diff` | `git -C <repo> --no-pager diff --no-color …` | yes — the tool *is* the command |
| `rag_ingest_directory` | `scripts/ingest-dir.mjs` | yes |
| `rag_list_documents` | `sqlite3 .rag/rag.db` over `rag_documents` | yes — a plain table, no `vec0` needed |
| `rag_ingest_file` | none; `ingest-dir.mjs` takes a directory | partial |
| `rag_delete_document` | `sqlite3` can reach `rag_documents`, but the paired `rag_embeddings` rows need the `vec0` module the CLI does not load | no |
| `rag_search` | `scripts/rag-query.mjs` (`npm run rag:query`) | yes |

The filesystem half is sound because Unix supplied the floor before we did. The RAG
half is where the shape was unfinished, and `rag_search` was the load-bearing one: the
index *is* the accumulated knowledge, and it could only be queried through an MCP client
or the `:3002` web UI, both of which want a model. During a provider outage with nothing
pulled locally, the notes were unreachable from a terminal.

Closed 2026-09-02 by `scripts/rag-query.mjs`. Retrieval needs no generation model —
embeddings are in-process via Transformers.js and `retrieveHybrid()` in
`src/rag/retrieve.ts` is already a plain function — so the script is a thin argument
parser and a printer over the same call the tool makes, with grep's exit-status
convention so it composes with `xargs` and `||`.

**Remaining, in order:** a delete path that owns both tables, then `ingest-file` parity.

#### `git_diff`, and why it is not a terminal tool

Added 2026-09-03, the first tool added *because* of the supervisor rather than inherited
from the filesystem server. A reviewer's central question is "what changed?", and nothing
in the previous twelve tools could answer it — which makes the obvious fix enabling the
client's terminal tool, and that dissolves the boundary this document exists to draw.

So the capability comes from here instead, kept as narrow as the job allows: fixed
argument vectors through `execFile` with no shell, read-only (it never stages, writes, or
checks anything out), output truncated rather than unbounded, and two checks that are less
obvious than they look —

- **Refs are validated against `^[A-Za-z0-9][A-Za-z0-9._/@^~-]*$`.** A ref is a positional
  argument, so one beginning with `-` is read as an option instead. `base:
  "--output=/tmp/pwned"` is rejected rather than passed to git.
- **The work-tree root is re-checked after resolution.** The supplied path passing
  `safePath()` is not sufficient: it may be a subdirectory, and a checkout can point its
  work tree somewhere else entirely, so `rev-parse --show-toplevel` is run first and its
  answer is put back through `isPathAllowed()`.

Both are cases where the boundary would have held for the path the caller named while
leaking the tree git actually reads.

#### A floor that does not run is not a floor

Writing `rag-query.mjs` surfaced this: `better-sqlite3` had been compiled against Node
v22 (`NODE_MODULE_VERSION 127`) while the default `node` here is v24 (`137`), so anything
opening the index aborted before it started. Fixed 2026-09-02 with `npm rebuild
better-sqlite3`.

It was never only a Layer 3 problem. `.mcp.json` invokes the server as bare `node`, so
**all six RAG tools were failing too** — confirmed by calling `rag_search` and getting the
module-version message instead of results. The filesystem tools were unaffected; they
never load the native module.

Which is this document's own subject in miniature, and it cuts against the story the
layers tell: the fallback was fine — hand a script a different interpreter and it runs —
while the *primary* was down, silently, because a native module was pinned to a runtime
nobody declared. Layer 3 degraded better than Layer 2 did.

Nobody noticed because nothing exercises either path on an ordinary day, which is the
argument already made under *Where the supervisor attaches*. The rebuild was also not a
durable fix: it binds the module to whatever `node` happened to be active, and the next
`nvm` default change would break it again.

**Closed 2026-09-03:** `.mcp.json` now names an absolute interpreter
(`/Users/david/.nvm/versions/node/v24.20.0/bin/node`) rather than bare `node`. That
survives an `nvm` default change, and it is also required for VS Code, which when launched
from the Dock inherits no shell `PATH` at all. One registration now serves both clients —
VS Code reads a workspace-root `.mcp.json` natively — so the pin applies to both from one
version-controlled file. What remains is the reverse direction: the path must be updated
by hand if the default moves *and* `better-sqlite3` is rebuilt against it. An `.nvmrc`
would document the intended version but cannot enforce it here, since neither client reads
one.

### Layer 2 is the control plane

The MCP server is not a convenience wrapper; it is where restrictions are enforced, and
that placement is deliberate. Any agent client ships its own bash/file/grep tools, and
those answer to the client's permission model — code that lives elsewhere, versioned by
someone else, changeable in a release you did not read.

`src/utils/path-safety.ts` resolves every path and throws `McpError` unless it falls
inside `ALLOWED_DIRS` (default: `ralph`, `daw_til`, `srh`; overridable per registration
via `RALPH_ALLOWED_DIRS`). `ROOT_DIR` is kept deliberately separate so widening the
allowlist cannot silently move what relative paths resolve against.

Two consequences worth stating:

- A supervisor's capability should come from these tools with the client's native tools
  **restricted**, not merely unused. Otherwise the boundary is nominal.
- `ALLOWED_DIRS` holding only local paths already satisfies the standing rule that
  nothing autonomous touches `woozie`, `kosmo`, or `squid`. Deployment stays a typed
  command at Layer 3, run by a person.

Anything a supervisor needs that the tools cannot express is an argument for a new tool
here — never for loosening the client.

### Where the supervisor attaches

It is a reviewer, not a chat surface; there is already a good chat surface. So it is
*invoked* — on a diff, on a commit, or on a schedule — rather than opened.

That choice also solves rot. A backup exercised only during an outage is an assumption,
not a backup: the day it matters is the day you discover the model was never pulled,
`num_ctx` was never verified, and the tool boundary was never tested. Wiring the
supervisor as a hook or a scheduled review means it earns its keep on ordinary days
with a second opinion, and the same path is the one you fall back to.

**Decided 2026-09-03: VS Code agent mode drives it, running Qwen 3.6 35B-A3B on Ollama.**
Cline was chosen on 2026-09-02 and replaced a day later, on measurements rather than
reading. The record of why is kept below rather than deleted, because the reasoning that
picked wrong is the useful part.

Same model, same prompt (*"use rag_search to find what my notes say about pgvector, and
give me the source paths"*), same day:

| | Cline | VS Code agent |
|---|---|---|
| requests for one task | **18** | **3** |
| peak prompt | **32,767** — the context ceiling | **11,974** |
| wall clock | minutes of retries | ~28s |
| thinking | had to be forced off | left on, harmless |
| proxy required | yes | no |
| built-in tools restrictable | no | **yes — and it was necessary** |

The mechanism is the tool protocol. Cline describes its tools as XML *in the prompt* and
parses them back out of prose, so compliance depends on the model following ~15k tokens
of instructions; it invented tool names with thinking on, and omitted required parameters
with thinking off. VS Code uses **native function calling**, where the schema is enforced
by the runtime — the same model, handed the same tool with a required boolean, filled it
in correctly on the first attempt with thinking left on.

Two findings worth keeping:

- **Deselecting VS Code's built-in tools was what made it work.** With them enabled the
  model fabricated a path into VS Code's own workspace storage instead of calling
  `rag_search`; with only `ralph-fs` exposed — all 12 tools, not a narrowed set — it chose
  correctly. So the tool restriction this document asks for on *security* grounds turned
  out to be a *capability* fix as well. That is a happy accident, not a principle, but it
  removes the tension between the two.
- **The boundary held under an unfamiliar client.** `path-safety.ts` rejected that
  fabricated path with an `McpError` — the workspace was inside `ALLOWED_DIRS` and the
  model went outside it unprompted. Nothing was configured client-side to make that
  happen, which is the whole claim of Layer 2 and had never been exercised outside Claude
  Code until now. The model then suggested widening `ALLOWED_DIRS` to include VS Code's
  storage; that is exactly the move this document rules out, and the rejection is the
  feature.

The superseded Cline reasoning follows.

**Superseded 2026-09-02: Cline drives it, running Qwen 3.6 35B-A3B on Ollama.** OpenClaude
was evaluated first and parked on licensing grounds (a fork of proprietary Claude Code
source); Cline is open source with no such question over it, is the more established of
the extensions surveyed in the README, and — the part that actually decides it — takes
stdio MCP servers with per-server `env`, which is the shape `.mcp.json` already uses to
hand `ralph-fs` its `RALPH_ALLOWED_DIRS`. The point of Layer 2 is that this stays cheap
to revisit if it disappoints.

What the choice forces:

- **`Q4_K_M`** (18.9GB) is the quant, per the sizing in the README — a coding assistant
  runs alongside an Electron host, so the larger quants are not on the table.
- **Budget `num_ctx` deliberately** (32–64K, not the model's 256K). Cline's Ollama docs
  name no minimum, so the number is ours to set and it is a memory knob.
- **Turn on "Use Compact Prompt"** (Settings → Features). Cline documents it for exactly
  this case; its default system prompt is large enough to eat a local context budget.
- **Ollama models onto Blue25 first.** Unchanged as the first step — an 18.9GB pull is
  the reason that item was first in the README's order.

**The unresolved part is the boundary, and it is the important one.** Cline's built-in
tools (`read_file`, `write_to_file`, `execute_command`, `search_files`, `list_files`)
have no documented way to be disabled; `autoApprove` governs *approval prompts*, not
availability. So the design's "capability comes from the 12 MCP tools with the client's
native tools restricted, not merely unused" cannot be enforced as written.

The workable version is to enforce it on *unattended* capability rather than on
availability: auto-approve the `ralph-fs` tools and leave every native tool requiring a
click. Anything the supervisor does on its own then goes through the path boundary in
`path-safety.ts`; anything outside it stops and asks a person. That is weaker than
revoking the tools and should be written down as such rather than described as a
sandbox. The hard guarantee — that nothing autonomous reaches `woozie`, `kosmo`, or
`squid` — does not rest on this, since `ALLOWED_DIRS` holds only local paths and deploys
stay a typed Layer 3 command.

Cline's CLI is real — `cline` 3.0.61, with `cline mcp add`, `-P/--provider`, and
`cline auth`. **It does not work with a local model, though the failure is subtler than
a refusal.** Tested 2026-09-02:

- Provider config writes fine with no account: `actModeApiProvider = "ollama"`,
  `actModeOllamaModelId`, `ollamaBaseUrl`. (`cline auth ollama -b <url>` errors —
  "base URL is only supported for OpenAI and OpenAI-compatible providers" — but writes
  the settings anyway. `--apikey` is demanded for a provider that takes no key.)
- **The local model answers.** Ollama logged the CLI's request:
  `200 | 43.79s | POST "/api/chat"`.
- The CLI then discards it: `Unauthorized: Please make sure you're using the latest
  version of Cline and re-authenticate your Cline account.` The saved session holds the
  prompt and no reply.

So inference is not the gate; something in the session layer is account-gated and throws
away a completed local turn — 44 seconds of local compute spent to reach an auth error.
Two `hook dispatch failed: session.hook requires a valid hook event payload` errors fire
first, so the `Unauthorized` may be downstream of those rather than a hard requirement;
separating them needs a signed-in comparison that has not been run. `cline config` and
the auth wizard also refuse to run without a TTY, so this was not tested by the path a
person would actually use.

**This retracts the terminal-first argument for Cline.** The client was picked partly
because a CLI suits the habit better than a VS Code panel; if that CLI needs a Cline
account, the argument does not survive, and the surface is the extension — which does
work, sharing `~/.cline/data/globalState.json` with the CLI. A local fallback whose
terminal surface phones home is close to the opposite of the point, per the continuity
argument this document opens with.

One default to watch on whichever surface: `--auto-approve` is documented as "tool
auto-approval for all tools (default: **true**)", and a bare `cline "prompt"` starts in
act mode with it on — the opposite of what the paragraph above wants.

#### The boundary gap may not be Cline's to fix — VS Code agent mode

Noticed 2026-09-02, after the decision, and it bears directly on the gap rather than on
the choice of model. VS Code's own agent mode (shipping in 1.136, no extension to
install) now takes local models, and on the two points that decide this it is stronger
than Cline:

- **No account, no subscription.** "BYOK models work without signing into a GitHub
  account and without a Copilot plan." A fallback that needs a third-party login before
  it starts is not a fallback, so this was the objection to check first; it does not
  hold.
- **Tools can be *deselected*, not merely left unapproved.** "Select or deselect tools
  to control which ones are available for the current request" — applying to built-in,
  MCP, and extension tools alike, with profile-wide tool sets and per-agent tool lists
  in prompt files. That is the thing Cline has no documented way to do, and it is
  precisely the sentence this document could not enforce: *capability comes from the 12
  MCP tools with the client's native tools restricted, not merely unused.*

`ollama show` confirms the model qualifies for agent mode, which requires tool calling:
capabilities are `completion, vision, tools, thinking`.

Two caveats. VS Code's built-in Ollama provider is **deprecated** in favour of the
official Ollama extension, so the obvious path is the one being retired. And local
models there lose semantic search, inline completions, and anything embedding-backed —
irrelevant for a reviewer that reads diffs, relevant if it were meant to replace
day-to-day assistance.

**Not acted on, but the balance has shifted.** Cline's VS Code extension is configured
and working end to end, and the comparison that matters — how the model behaves under
each harness on a real review — cannot be read out of documentation. But Cline now loses
on both axes it was chosen for: its CLI is account-gated, so it is no more terminal-first
than VS Code is, and its built-in tools cannot be deselected, so it cannot express the
boundary this document specifies. VS Code agent mode gives up neither. Test both on a
real review; do not assume the 2026-09-02 decision survives it.

### Degradation

| Condition | What still works |
|---|---|
| Anthropic down, local model ready | Layers 2 and 3; supervisor reviews, `/api/chat` answers from the index |
| Anthropic down, no local model | Layer 3 only — every routine operation, typed by hand, plus `rag-query` once it exists |
| Ollama down | Layers 1 and 3; the public widget is unaffected, it never used Ollama |
| This machine down | `davo-bot` on `woozie` keeps serving `/api/ask`; vectors are baked into `rag.db` at ingest |

The last row is not an accident — it is why the embedder runs in-process and the hosted
server needs no Ollama.

### Deliberately not in this shape

- **A second chat UI.** `:3002` already answers from the index. The supervisor is a
  different interaction, not another window.
- **Model-driven deployment.** Deploys stay a typed command. See the standing rule on
  production hosts.
- **A universal abstraction over clients.** MCP already is one. Wrapping it again buys
  nothing and adds a layer that can itself break.

### Open questions

1. ~~Which local model, and which client drives it.~~ **Answered 2026-09-03** — VS Code
   agent mode driving Qwen 3.6 35B-A3B, on measurements rather than documentation: 3
   requests against Cline's 18, a third of the context, no workarounds, and built-in tools
   that can actually be deselected. See *Where the supervisor attaches*. The model half is
   the half that cost the most to establish, but "settled" overstates it — the first real
   agentic session produced invented tool calls until thinking was turned off, and one
   good A/B is not a track record. The client half is **open again**: Cline's CLI turned
   out to be account-gated, which retracts the terminal-first half of the case for it, and
   its built-in tools cannot be deselected, which is the one requirement this document
   states. VS Code agent mode meets both.

   What both halves need is the same thing and it is not more reading: real tasks, run
   under each configuration, judged on whether the output is usable. Until then this
   fallback is unexercised, which is precisely the failure mode argued against under
   *Where the supervisor attaches* — a backup nobody runs on an ordinary day.
2. Whether the supervisor runs as a Claude Code hook, on a schedule, or both.
3. Whether this repo goes private before the runbook lands — the topology (`woozie`,
   `/var/www/apps/davo-bot`, the systemd unit, the ports) is already published, and a
   runbook layered on that is a better map than either alone.
