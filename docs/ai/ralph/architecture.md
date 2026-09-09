# Architecture

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
