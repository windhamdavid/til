# Roadmap

## Roadmap

Three phases, deliberately front-loaded with the smallest thing that can be used daily.

### Prerequisite

`ralph-fs` is currently registered only in the `ralph` workspace. Cross-project memory needs it
registered where the other projects are actually opened — either a per-project config in each, or
one user-level registration.

**Decide this before Phase 2**, because the project slug comes from `RALPH_ROOT_DIR`, which is set
per registration. Get it wrong and the slugs don't match the ones already in use, which turns the
Phase 3 migration from a copy back into a remap.

### Phase 1 — global scope only, four tools and a CLI

Enough to use daily and find out what's wrong with it.

| # | Lands | Why it's shaped that way |
|---|---|---|
| 1 | `src/memory/config.ts` | store root from `RALPH_MEMORY_DIR`, scope list, slug rule, size caps — one place to change the shape of the store |
| 2 | `src/memory/policy.md` | the prose injected into tool descriptions at build time; markdown rather than a string literal so it reads like what it is |
| 3 | `src/memory/store.ts` | list/read/write/update/delete/parse over the directory. Hand-rolled frontmatter parse — the delimiters are fixed and `gray-matter` is only a devDependency |
| 4 | `src/tools/memory-list.ts` | `name`, `description`, `type` for every memory. No arguments in Phase 1 |
| 5 | `src/tools/memory-read.ts` | full body by name |
| 6 | `src/tools/memory-write.ts` | create or overwrite by name |
| 7 | `src/tools/memory-update.ts` | modify in place — replace the body, or patch one frontmatter field |
| 8 | registration in `src/tools/index.ts` | |
| 9 | `scripts/memory.mjs` | `list \| read \| write \| update \| rm`, over `store.ts` |

Two of those carry more weight than their size suggests.

**Everything goes through `store.ts`** — every tool *and* the CLI. One implementation, so the CLI
can't drift from what the agents see.

**`memory_update` exists so overwrite isn't the only verb.** Overwrite-only is how a careless agent
silently drops half a memory: it reconstructs the file to change one field, and loses whatever it
didn't think to carry forward.

And `scripts/memory.mjs` is what makes the store **agent-optional** — readable with `cat`, manageable
with a command, on the day nothing else works. Same bet as the
[playbook](https://davidwindham.com/code/ralph/src/branch/main/docs/playbook.md).

### Phase 2 — scope, provenance, deletion

10. **Project scope** — derive the slug from `RALPH_ROOT_DIR`; `memory_list` returns global plus
    current project; `memory_write` takes `scope`.
11. **Stamp `source`** from `clientInfo.name`, [captured at
    `initialize`](/docs/ai/ralph/memory/design#provenance-is-taken-not-asked-for).
12. **`memory_forget`** — delete by name. Wrong memories are worse than missing ones.
13. **`memory_search`** — substring/regex grep across bodies, for when listing isn't enough.

### Phase 3 — later, only if wanted

14. **Migrate the 91.** A copy plus two frontmatter fields, given the
    [layout](/docs/ai/ralph/memory/design#layout).
15. **A derived index** (`memory.db`, reusing `db.ts` + `embeddings.ts`) — and **never `rag.db`**,
    because `PUBLIC_COLLECTIONS === COLLECTIONS`, so a collection there is quotable by davo-bot to a
    stranger.

That second one is why `memory_search` arrives in Phase 2 rather than alongside the index: its
*signature* doesn't change when an index appears, only its implementation. Putting the seam in early
is what keeps the index an addition rather than a rewrite.

## Verify

Phase 1 is done when, from **three different clients**:

```
memory_write  → file appears in ~/.ralph/memory/global/, frontmatter well-formed
memory_list   → the new memory's description appears
memory_read   → body comes back
```

Then the real test: **write a memory in Zed, read it in Claude Code.** That crossing is the entire
point; everything before it is plumbing.

Then the second test, which is the one that proves Ralph *owns* the store rather than brokering
someone else's: **write a memory with `node scripts/memory.mjs write`, with no agent running at all,
and have an agent find it on the next `memory_list`.** If the CLI and the tools disagree about
anything, they are not going through `store.ts`.

Also confirm `memory_write` rejects `../../etc/passwd` and `foo/bar` as names, and that
`git -C ~/Sites/ralph status` stays clean — the store must never appear in the repo.

## Don't

- Don't put the store in `ralph/` or any repo pushed to `code` — [it is served
  unauthenticated](/docs/ai/ralph/memory/design#the-store-lives-outside-the-repo).
- Don't put memory in `rag.db`.
- Don't route memory paths through `safePath()`, and don't loosen `ALLOWED_DIRS` to make it work.
- Don't migrate the 91 in Phase 1 — an empty store makes it obvious when writing is broken, and a
  full one hides it.
- Don't let the agent supply `source`.
