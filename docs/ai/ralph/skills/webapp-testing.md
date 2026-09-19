# webapp-testing

## webapp-testing

**Vendored + local — [anthropics/skills](https://github.com/anthropics/skills), Apache-2.0, pinned
at `34040c9`.** Same commit and the same clone as
[`skill-creator`](/docs/ai/ralph/skills/skill-creator), so the two pins move together. Six files:
`SKILL.md`, three worked examples, a `with_server.py` helper, and `LICENSE.txt`.

Drive a local web app with Playwright — verify frontend behaviour, debug UI, capture screenshots,
read browser console logs.

### It didn't run as vendored. Now it does, and nothing was installed.

This is the interesting part, and it's the **first `vendored + local` skill** here — the category
the [register](/docs/ai/ralph/skills#origin-pins-and-the-silent-revert) defined before anything
occupied it.

Playwright is absent from both `/opt/homebrew/bin/python3` and node. And the Homebrew Python is PEP
668 externally-managed, so `pip install` isn't a slow path — it's **refused outright**. Meanwhile
the skill's own instructions say to run `python script.py` and `p.chromium.launch()`, both of which
fail.

Two substitutions fix it without touching the machine's global package set:

| Instead of | Use | Because |
|---|---|---|
| bare `python script.py` | `uv run --with playwright python script.py` | `uv` builds the environment per run; the wheel lands in its cache like any other `uv run` |
| `p.chromium.launch()` | `p.chromium.launch(channel="chrome", headless=True)` | there's no bundled Chromium, so the bare call fails with *"Executable doesn't exist"* |

Driving the **installed Google Chrome** avoids a ~150 MB browser download, and it opens a fresh temp
profile, so it never touches real browsing state. The `channel` argument becomes unnecessary the day
someone runs `playwright install chromium` — until then it's required.

Verified end to end before any of it was written down: page load, element query, console capture and
screenshot, on **Playwright 1.63.0 under Python 3.14.7**. So no version pin is needed either, which
was the other thing that might have bitten.

### Why the note sits in `SKILL.md`

The [house convention](/docs/ai/ralph/skills#the-shape) would put a local note in a sibling file.
Here that placement is **forced**, and the reasoning generalizes.

An agent following this skill runs `python script.py` and hits a traceback *before* it would ever
open a note kept somewhere else. A correction that arrives after the failure it prevents isn't a
correction. So the block goes at the top of `SKILL.md`, immediately after the heading — blockquoted,
marked as non-upstream, and self-contained, so reapplying it after a re-sync is a paste rather than
a reconstruction.

Which is the register earning its keep rather than merely describing a rule. `_skills.md` now
records what changed, *why it sits where it sits*, and **what makes it removable** — the three
things a future whole-directory re-copy would otherwise destroy silently.

### What it adds, given Claude Code already has a browser

There's real overlap. Claude Code reaches a browser through its own tooling, so for that client this
skill is close to redundant.

What it adds is a **scriptable** path — plain Python that any client can drive through
[`ralph-fs`](/docs/ai/ralph/server), rather than a capability that only exists inside one vendor's
client. Which is the same argument the rest of
[`skills/`](/docs/ai/ralph/skills#why-they-live-at-the-repo-root) makes, and the same one the
[architecture](/docs/ai/ralph/architecture) makes about every tool being a thin wrapper over
something runnable by hand.

**The obvious first target is davo-bot's widget.** Its SSE stream and citation rendering are exactly
the kind of behaviour a unit test can't observe — the failure modes are "the stream stalls halfway"
and "the citation renders but the link is wrong", neither of which is visible anywhere but a real
browser.

### The method

Two patterns carry it.

**Reconnaissance, then action.** Don't write selectors from what you think the page contains —
navigate, wait, screenshot or dump the DOM, identify selectors from the *rendered* state, and only
then act. The decision tree branches on static HTML (read the file, take the selectors directly)
versus a dynamic app (reconnaissance first), with a fallback from the first to the second when
reading the file turns out not to be enough.

**The pitfall it names is one mistake**: inspecting the DOM before
`page.wait_for_load_state('networkidle')` on a dynamic app. Everything downstream of that reads a
page that hasn't finished becoming itself.

`scripts/with_server.py` handles server lifecycle, including multiple servers at once — a backend
and a frontend brought up together, the automation script running against both, everything torn down
after. The automation script then contains only Playwright logic.

### Black-box scripts, and why that's a context decision

The instruction attached to the bundled scripts is worth pulling out, because it's about context
rather than testing:

> Always run scripts with `--help` first. **Do not read the source** until you try running the
> script and find a customized solution is absolutely necessary. These scripts can be very large and
> thus pollute your context window.

That's the same [progressive disclosure](/docs/ai/ralph/skills#the-shape) the skill directory is
built on, applied to executables instead of prose: the interface is cheap, the implementation is
opt-in, and reading the implementation by reflex is the expensive mistake. A skill that dumps a
106-line helper into the window every time it's used costs more than it saves.
