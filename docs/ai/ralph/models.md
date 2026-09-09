# Models

## Models

Four models are in play, and only one of them ships:

| Model | Role | Where it runs |
|-------|------|---------------|
| `Xenova/bge-small-en-v1.5` | embeddings (384-dim) — [RAG](/docs/ai/ralph/server#rag) indexing and query | in-process, Transformers.js / ONNX |
| `claude-haiku-4-5` | generation + citations for the public `/api/ask` | Anthropic API |
| `llama3.2` | generation for the local-only `/api/chat` | Ollama on `stu`, never deployed |
| `qwen3.6:35b-a3b-q4_K_M` | local coding assistant / supervisor, driven by [Cline](#on-qwen-36-35b-a3b) | Ollama on `stu`, weights on Blue25 |

The fourth is the newest and the least settled — added 2026-09-02 as the local fallback the
[architecture](/docs/ai/ralph/architecture) is built around, not as a quality play. It is 23GB resident and cannot
share memory with `llama3.2`, so the two Ollama models take turns; Ollama's idle unload is what keeps that
from being a conflict. Sizing, the client decision, and the measurements are further down under
[On Qwen 3.6 35B-A3B](#on-qwen-36-35b-a3b).

The split is what keeps the deploy small. Document vectors are baked into `rag.db` at ingest time on the
`stu`, so the hosted server only ever embeds the incoming *question* — no Ollama, no GPU, one Node process.
See [Deployment](/docs/ai/ralph/server#deployment-ollama-free-server).

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
the [Layer 2 boundary](/docs/ai/ralph/architecture) holding under a client it was never configured for. Cline has
been uninstalled. The superseded reasoning is kept below, because the argument that picked wrong is the
useful part.

**Superseded 2026-09-02: Cline**, running Qwen 3.6 35B-A3B. It's the more established agent of the three, open
source with no licensing question (unlike OpenClaude, evaluated and parked), and it has a "Use Compact
Prompt" mode for local inference — a setting that exists because its default system prompt is large enough
to hurt when you're spending from a 32k budget. Decisively, it takes **stdio MCP servers with per-server
`env`**, the same shape `.mcp.json` uses to hand `ralph-fs` its `RALPH_ALLOWED_DIRS`, which is what makes
the [architecture](/docs/ai/ralph/architecture)'s control-plane design possible at all.

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
[docs/architecture.md](/docs/ai/ralph/architecture); the decision stands for now but should not be assumed to
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
  [architecture](/docs/ai/ralph/architecture) wants. Leave all 13 `ralph-fs` tools enabled; narrowing further is
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
