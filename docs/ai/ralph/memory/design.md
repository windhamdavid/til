# Design

## Design

The decisions that are locked, and the two mechanisms the whole thing rests on. Every one is chosen
so that **growing into an indexed store later is an addition, not a rewrite**.

### Markdown files are the truth. There is no database.

One fact per file, read with `cat`, searched with `grep`, diffed with `git`.

This is the same bet [`docs/playbook.md`](https://davidwindham.com/code/ralph/src/branch/main/docs/playbook.md)
makes, and the same [invariant](/docs/ai/ralph/architecture#the-invariant) the rest of the repo
runs on: **a memory reachable only through a running server fails on the day the server is what's
broken.** An index can be derived later; it is never the source.

### The store lives outside the repo

Non-negotiable, and the reason is specific rather than hygienic. GitHub reports this repo private —
but that isn't the whole picture, because **the `code` remote serves its contents to unauthenticated
readers**, verified 2026-09-19. So: treat everything committed here as public.

Ralph supplies the *code*. The *content* lives at `RALPH_MEMORY_DIR`, defaulting to
`~/.ralph/memory/`.

### No vectors, no SQLite, not yet

At 91 memories, listing every description costs **~1,500 tokens** — cheaper *and* more accurate than
any search over a corpus that size.

Search becomes worth building when listing stops fitting, which is a problem to have later. Same
progressive disclosure as [`skills/`](/docs/ai/ralph/skills): list descriptions, then read one body.
The pattern already works in this repo, and reusing it means one mental model for both.

### Layout

Mirrors Claude Code's slug convention, so the [deferred
migration](/docs/ai/ralph/memory/roadmap#phase-3--later-only-if-wanted) of the existing 91 is a copy
rather than a remap:

```
~/.ralph/memory/
  global/                          # facts that travel across every project
    <slug>.md
  projects/
    -Users-david-Sites-srh/        # same slug Claude Code already uses
      <slug>.md
```

Frontmatter is a **superset of what's already written**, so existing files stay valid:

```yaml
---
name: <kebab-slug>                 # matches filename
description: <one line, used for recall>
metadata:
  type: user | feedback | project | reference
  scope: global | <project-slug>
  source: <MCP clientInfo.name>    # server-stamped, never agent-supplied
  written: 2026-09-19
---
```

## The two mechanisms that matter

### Provenance is taken, not asked for

The MCP `initialize` handshake carries `clientInfo.name`. The server captures it at connect and
stamps every write.

So an agent **cannot claim to be something else**, and a memory written by a local Ollama supervisor
is distinguishable from one written by Opus without anyone remembering to say so. Which matters
precisely because the [fallback model](/docs/ai/ralph/models#on-qwen-36-35b-a3b) is weaker — a fact
it recorded deserves a second look, and that's only possible if the provenance survived.

### Policy travels in tool descriptions

**This is the whole design, not a detail.**

What makes the existing memories good is the discipline about when to write and what to leave out —
and that discipline currently lives in a Claude Code system prompt that Zed and VS Code never see.
`CLAUDE.md` doesn't reach them either; [skill discovery hit exactly this
wall](/docs/ai/ralph/skills#why-they-live-at-the-repo-root) the same day.

The one thing every MCP client puts in front of the model is the **tool description**. So the policy
goes there:

| Tool | Description carries |
|---|---|
| `memory_write` | "One fact per call. Include why it matters. Do not save repo structure, git history, or anything the code already records." |
| `memory_list` | "Call this before starting work. Returns every memory's description." |
| `memory_read` | "Memories reflect what was true when written. Verify before relying." |

### Security: a name, never a path

Load-bearing, and the one place this design deliberately diverges from the rest of the server.

These tools write **outside `ALLOWED_DIRS`**, so [`safePath()`](/docs/ai/ralph/server#path-safety)
would reject them — and must not simply be bypassed.

Constrain by construction instead: the tool accepts a **name, never a path**, and the name is
slug-validated (`^[a-z0-9][a-z0-9-]*$`) before being joined to a fixed root. No `..`, no separators,
no traversal. The same fail-closed posture `path-safety.ts` takes, enforced a different way because
the root is different.
