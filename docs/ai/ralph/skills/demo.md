# demo

## demo

**Built here.** Summarizes whatever project is open — what it is, how it's laid out, what's been
happening in it — for someone who has never seen it.

That's the stated job. The real one is to be the **canary for skill wiring**: a half-wired client
should fail *visibly* rather than quietly producing something plausible.

### What it asks for

Three things, and two of them exist only to break loudly.

1. **A literal marker line**, first, exactly:

   ```
   🐈 ralph-skill-loaded: demo
   ```

   Then one line naming *how* the file was reached — the client, and the tool that got there
   (`read_file` via [`ralph-fs`](/docs/ai/ralph/server), a native skill loader, a paste). This is
   the part that says which wiring actually works.

2. **A summary**, built by reading rather than inferring: `README.md` / `CLAUDE.md` / `docs/` for
   what it's *for* in the author's words, the manifest for language and entry points, a top-level
   listing for the shape, `git log`/`git status` for what's in flight.

3. **An output format that lives in a sibling file** — [`reference.md`](https://davidwindham.com/code/ralph/src/main/skills/demo/reference.md),
   never in `SKILL.md`. Six sections in a fixed order (One line, Shape, Stack, Lately, Worth
   knowing, Read), a 400-word cap, and a closing pass phrase that exists nowhere else.

### Why the format lives somewhere else

**Sibling reachability is the thing that actually breaks** when wiring is half-done, and it's
invisible if the canary only exercises its entry point. A client that loads `SKILL.md` but can't
read its neighbours will cheerfully invent a plausible six-section format and hand back something
that looks right.

So the skill's last rule is *never guess the format*: if `reference.md` can't be read, stop and name
the error. That failure **is** the useful signal — inventing a format hides exactly the bug being
tested for.

The pass phrase closes the loop from the other direction. It appears in `reference.md` and nowhere
else, so its presence in the output is proof the file was read rather than guessed at.

### The rules worth stealing

Three of the standing instructions aren't about wiring at all, and generalize to any summarizing
skill:

- **Say what you read.** A summary built from the README and one directory listing is fine — but
  name that, so the reader knows how much weight it carries.
- **Don't pad.** If the project is three scripts, say so in three sentences. Length is not evidence
  of effort.
- **Flag what's odd.** A stale lockfile, a directory that contradicts the README, a half-finished
  migration — worth more to a newcomer than another paragraph restating the README. And if nothing
  qualifies, write `Nothing surprising.` and stop rather than inventing entries to fill the section.

### What it proved

Run across the three registered clients, `demo` is what confirmed the
[wiring](/docs/ai/ralph/server#configuration) end to end — `initialize` returning
`ralph-fs-server 0.1.0`, `tools/list` returning all 13, and a sibling file reachable from each one.
