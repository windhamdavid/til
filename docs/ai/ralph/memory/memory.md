# Memory

## Memory

_Written 2026-09-19. **Nothing here is built yet** — `mcp-server/src/memory/` doesn't exist,
neither does `~/.ralph/memory/`. This is the design, recorded before the code so the decisions are
reviewable rather than archaeological. Phase 1 is deliberately small: the point is to understand the
shape by running it._

A markdown store behind MCP tools, so that a fact learned in one client and one project is reachable
from every other.

| | |
|---|---|
| 📄 [Design doc](https://davidwindham.com/code/ralph/src/main/docs/memory.md) | `docs/memory.md` — canonical; a working copy in `~/.claude/plans/` defers to it |
| [Design](/docs/ai/ralph/memory/design) | the locked decisions, the store layout, and the two mechanisms the whole thing rests on |
| [Roadmap](/docs/ai/ralph/memory/roadmap) | three phases, the prerequisite that blocks Phase 2, and what counts as done |

### The problem

Memory accumulates **per-client and per-project**, and both of those are the wrong unit.

Claude Code keeps 91 memories across 17 projects in `~/.claude/projects/<slug>/memory/`. Neither VS
Code chat nor Zed can see any of them. Facts learned in `srh` are invisible in `_servers`. The
archive is real, but it's seventeen archives rather than one — and the seams fall exactly where
they're least useful, since the thing worth remembering about a machine is rarely confined to the
repo you happened to learn it in.

### Why Ralph is where it gets fixed

Because after [2026-09-19](/docs/ai/ralph/skills) the `ralph-fs` MCP server is the **only surface
all three clients share**. Memory reached through MCP tools is memory every client has.

That's the whole argument, and it only became true today. The [skills
work](/docs/ai/ralph/skills#client-wiring) registered `ralph-fs` for Claude Code, VS Code chat and
Zed — which incidentally established the one place a cross-client capability can live.

### What it isn't

**Not a view onto `~/.claude/projects/*/memory/`, and it doesn't sync with it.** That directory
belongs to one vendor's client on one machine; a memory living there is unreachable from Zed, from
VS Code chat, and from any local model.

So Ralph keeps its **own** store, and Claude Code becomes just another agent reading it through the
same four tools as everything else. The existing 91 are an *import* in [Phase
3](/docs/ai/ralph/memory/roadmap#phase-3--later-only-if-wanted), not an integration — and a deferred
one, because an empty store makes it obvious when writing is broken and a full one hides it.

### Code here, content elsewhere

"Configured in Ralph" means three files live in the repo, version-controlled and reviewable, while
the content stays outside it:

| In the repo | What it controls |
|---|---|
| `mcp-server/src/memory/policy.md` | the write/read policy injected into the tool descriptions |
| `mcp-server/src/memory/config.ts` | store root, scope list, slug rules, size caps |
| `mcp-server/scripts/memory.mjs` | the no-agent CLI for the same store |

Editing `policy.md` changes what every agent in every client is told about when to write and what to
leave out. **That is the only lever that reaches all of them at once**, and it's a file you can open.

The split itself is the one this repo already uses — procedures in
[`docs/playbook.md`](https://davidwindham.com/code/ralph/src/branch/main/docs/playbook.md),
hostnames in the private ops repo. The [reason it's non-negotiable
here](/docs/ai/ralph/memory/design#the-store-lives-outside-the-repo) is sharper, though: the `code`
remote serves this repo's contents to unauthenticated readers.
