# Skills

## Skills

_Added 2026-09-19._

A skill is a directory of markdown describing how to do **one kind of work** — what it is, when to
reach for it, and how to proceed. Not code, not a tool call: procedure, written down where an agent
can find it. Same shape as the skill inside [`plugins/diagram`](/docs/ai/ralph/plugins), but
client-neutral — these live at the repo root so any agent can reach them, not just Claude Code.

| | |
|---|---|
| 📇 [Register](https://davidwindham.com/code/ralph/src/main/skills/_skills.md) | `skills/_skills.md` — where each skill came from, what it's pinned at, what changed |
| [`demo`](/docs/ai/ralph/skills/demo) | summarizes the project currently open; doubles as the canary that proves skill wiring works |
| [`security-audit`](/docs/ai/ralph/skills/security-audit) | source-first vulnerability review — vendored from Cloudflare, kept verbatim |
| [`spec-driven`](/docs/ai/ralph/skills/spec-driven) | work from a written spec rather than a prompt — a `.specs/` lifecycle, criteria before code |
| [`skill-creator`](/docs/ai/ralph/skills/skill-creator) | writes the next skill — drafting, evals, and tuning a description until it triggers |
| [`webapp-testing`](/docs/ai/ralph/skills/webapp-testing) | drives a local web app with Playwright — runs via `uv` against the installed Chrome, installing nothing |
| [`write-concisely`](/docs/ai/ralph/skills/write-concisely) | tightens prose a person will read — Strunk's rules as a map over the public-domain text |

### The shape

```
skills/
  <skill-name>/
    SKILL.md          # the map: what this is, when to use it, how to work
    references/*.md   # the detail, read only when the job needs it
    scripts/*         # anything the skill shells out to
```

`SKILL.md` opens with frontmatter, and the `description` is doing nearly all the work:

```yaml
---
name: excalidraw
description: Create editable Excalidraw diagrams that map a system, flow, or architecture. Use when asked to diagram, map, visualize, or sketch how something fits together. Not for data charts.
---
```

It's the only part an agent sees before deciding whether to open the file, so it has to carry the
trigger — what the skill does *and* when to reach for it. Keeping `SKILL.md` short enough to read in
one pass and pushing the bulk into `references/` is the whole point of the directory shape: the
summary is cheap, the detail is opt-in.

That layout is the house convention, not a rule a vendored skill has to meet.
[`security-audit`](/docs/ai/ralph/skills/security-audit) keeps its upstream shape instead, and
tidying it would break it.

### Why they live at the repo root

These sit in [`skills/`](https://davidwindham.com/code/ralph/src/main/skills), not `.claude/skills/`,
and that's deliberate. Native discovery reads `.claude/skills/` — but the client that needs these
most isn't Claude Code. The [supervisor](/docs/ai/ralph/models#on-qwen-36-35b-a3b) runs elsewhere,
and VS Code chat and Zed both reach the repo through the [`ralph-fs` MCP
server](/docs/ai/ralph/server). A vendor directory is the wrong home for something three clients
read.

The cost of that choice is that **nothing auto-loads them**. So the discovery mechanism is one line
in `CLAUDE.md` telling an agent to go look:

> Before starting a task, read `skills/README.md`. If a listed skill fits, read its `SKILL.md` and
> follow it.

That instruction existed only in conversation until it was written into the repo. Which is the
recurring lesson here — a thing that only works because you remember to say it isn't wired up, it's
a habit.

### Two files, because they're read at different moments

| File | Answers | Read when |
|---|---|---|
| [`README.md`](https://davidwindham.com/code/ralph/src/main/skills/README.md) | what's here and what each skill is *for* | picking a skill |
| [`_skills.md`](https://davidwindham.com/code/ralph/src/main/skills/_skills.md) | where each came from, what commit it's pinned at, what changed | auditing one |

That costs a row in each file on every addition. The alternative was one file serving as both a menu
and a provenance log, and those get read at completely different moments.

`_`-prefixed so the register sorts to the top and reads as meta rather than as a skill — nothing
loads it at runtime.

### Origin, pins, and the silent revert

Every entry in the register carries an origin — **built** (written here), **vendored** (copied in,
untouched), or **vendored + local** (copied in, then changed) — and vendored skills carry the
upstream commit they were pinned at.

The pin is what makes a re-sync a diff against a known point rather than a guess: re-copy the
upstream directory whole, bump the pin. But re-copying whole is exactly what wipes a local edit. So
the moment a vendored skill is edited it becomes *vendored + local*, and the change gets written
down under **Local changes** in its log entry — what changed and why, in enough detail to reapply by
hand.

That note is the only thing standing between a deliberate customization and a silent revert six
months later. If the local changes outgrow a short list, the answer is to fork upstream and vendor
the fork instead.

[`webapp-testing`](/docs/ai/ralph/skills/webapp-testing) is the first skill to occupy that middle
category, and it's worth reading for what the register records when one does: not just *what*
changed, but why the change sits where it sits — and what would make it removable.

### Access

Nothing new was needed. `RALPH_ALLOWED_DIRS` already covers `/Users/david/Sites`, so
`list_directory`, `read_file` and `search_files` reach `skills/` today with no new code.

The gap is **discovery, not access** — an agent only looks if something tells it to. Dedicated
`skill_list` / `skill_load` tools would put the descriptions in front of the model at startup
instead, which is worth adding once there are enough skills here that finding one is the bottleneck,
and not before. Every tool schema is paid for in every session, [used or
not](/docs/ai/ralph#choosing-between-them).

### Deliberately not RAG

Skills are looked up **by name, not by similarity**, so the [index](/docs/ai/ralph/server#rag) is
the wrong instrument twice over.

The second reason matters more: `PUBLIC_COLLECTIONS` equals `COLLECTIONS`, so a third collection is
quotable to a stranger the moment it exists. The index is a closed corpus backing a public widget,
and private workflow notes have no business in it.

### Client wiring

`ralph-fs` is registered per-workspace for three clients, all invoking the same command with the
same env — see [Configuration](/docs/ai/ralph/server#configuration) for the file each one reads and
the key each one expects, which is not the same key in any two of them.

Verified over stdio with the exact command all three configs invoke: `initialize` returns
`ralph-fs-server 0.1.0`, `tools/list` returns all 13.
