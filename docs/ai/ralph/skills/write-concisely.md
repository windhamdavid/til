# write-concisely

## write-concisely

**Built here.** Source text is public domain — Strunk, 1918, from [Project Gutenberg
#37134](https://www.gutenberg.org/ebooks/37134).

Tighten prose a person will read: documentation, a README, a commit message, release notes, a post,
a report. Not code, not log lines, not JSON.

### Why it was built rather than vendored

[NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/docs/skills/write-concisely)
(`23e2428`) prompted this, was read, and then wasn't used. Two reasons, either one sufficient.

**It's GPL-3.0** — which would have been the first copyleft license here. A markdown document
sitting beside unrelated code is aggregation rather than a derivative work, so nothing would have
been relicensed. But [this repo is distributed through the `code`
remote](/docs/ai/ralph/memory/design#the-store-lives-outside-the-repo), which turns that from a
theoretical question into a live one — and into one worth simply not inviting.

**It inlines the entire book into `SKILL.md`** — 72,863 chars, ~18k tokens, larger than every other
`SKILL.md` here *combined*, all of it loading on every trigger.

That's the exact inversion of [the split](/docs/ai/ralph/skills#the-shape) this directory is built
on: a cheap map, with the detail opt-in. And a concision skill is a conspicuous place to get it
wrong.

Since the substance is public domain either way, the rules were written fresh instead — from
Gutenberg rather than from NeoLab's markdown, so none of their arrangement travels along. Chapter VI
on spelling was dropped as thoroughly dated, and the exercises with it.

| | Upstream | Here |
|---|---|---|
| `SKILL.md` | 72,863 chars, ~18k tokens | 3.4k, **~850 tokens** |
| The full text | in `SKILL.md`, always loaded | three `references/` files, ~1,950 lines, loaded on demand |

A 21× smaller entry point, and the 74k of source text arrives only when a question actually needs
it. Which is what `references/` is *for*.

### The five that do the work

The map names five rules and says to apply them before reaching for the rest:

- **Omit needless words.** `owing to the fact that` → `since`. The rule that earns the most and gets
  skipped the most.
- **Use the active voice.** Passive hides who acted — usually the thing a technical reader needs.
- **Put statements in positive form.** `did not remember` → `forgot`.
- **Use definite, specific, concrete language.** `A period of unfavorable weather set in` → `It
  rained every day for a week`. The concrete version is shorter *and* says more.
- **Put emphatic words at the end.** The end of a sentence is the position a reader remembers.

The three references split by how they're read: `composition.md` for all eleven principles with
Strunk's examples, `rules-of-usage.md` for punctuation and agreement, and `misused-words.md`
alphabetically — with the instruction to **look a word up, not read it through**.

### Editing is not drafting

The distinction the skill opens with, and the one that matters most in this repo:

> When **editing**, the author's voice wins over the rules — tighten what's there, don't rewrite it
> into something they wouldn't have said. When **drafting**, the rules are yours to follow from the
> start.

That's the same constraint `CLAUDE.md` places on the TIL site, stated as a working rule rather than
a prohibition. A skill that can't tell the two apart turns every edit into a rewrite.

### The working rules

Four more, each guarding against a way this goes wrong:

**Cut first, then fix grammar.** Deleting a sentence solves its comma problem for free; the reverse
spends effort on text that shouldn't survive.

**Report what changed and why** — "cut 40%, mostly hedging and throat-clearing" — so the author can
disagree. Silent rewriting teaches them nothing and hides the judgment calls.

**Keep technical precision over brevity when they conflict.** A shorter sentence that's now slightly
wrong is a bad trade. Terms of art, version numbers and exact conditions stay.

**Don't confuse concise with terse.** The goal is that every word works, not that the text is short.
A necessary clause is not a needless word, and prose stripped past clarity has to be read twice —
which costs the reader more than the words saved.
