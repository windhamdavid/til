# skill-creator

## skill-creator

**Vendored — [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/skill-creator),
Apache-2.0, pinned at `34040c9`.** Copied verbatim, with `LICENSE.txt` inside the skill directory.

Taken from the GitHub repo rather than the `officialskills.sh` listing that surfaced it — a listing
is an index, and vendoring needs **a commit to pin and a license to carry**, neither of which an
index gives you. The repo's `THIRD_PARTY_NOTICES.md` doesn't cover this skill, so it wasn't copied.

### The first one that's about this directory itself

Everything else in [`skills/`](/docs/ai/ralph/skills) does a job. This one writes the next skill:
draft it, run eval cases with and without it, grade the outputs, iterate.

The part worth having is **description tuning**. The `description` is [the only thing an agent sees
before deciding to open a file](/docs/ai/ralph/skills#the-shape), so a skill whose description
doesn't trigger is indistinguishable from one that doesn't exist — and that failure is **silent**.
Nothing errors. The skill simply never fires, and you conclude the model isn't very good at the task.

An eval harness is the only way to tell those two apart.

### Two sharp edges, recorded rather than discovered later

**`quick_validate.py` imports PyYAML, which isn't installed** on `/opt/homebrew/bin/python3`.
Nothing was installed to fix it — the [standing rule](/docs/ai/ralph/architecture) is that needing a
tool for the task at hand isn't sufficient reason to change the machine's global package set. The
rest (`run_loop`, `package_skill`, `aggregate_benchmark`, `generate_review`) is stdlib-only and runs
as-is, so the loss is exactly one validator.

**The eval scripts shell out to `claude -p`,** which spawns *nested billable runs*. And
`run_eval.py` writes a command file into the project root's `.claude/commands/` so the skill under
test shows up in the sub-run's skill list — meaning an eval run from inside `ralph` touches
`ralph/.claude/`.

That's the skill working as designed, not a bug. But it isn't what "run the tests" usually implies,
and it's the kind of thing better known beforehand than billed for afterwards.

### On it being redundant in Claude Code

It's also available as the `anthropic-skills:skill-creator` plugin skill, so in Claude Code this
copy earns nothing.

It earns its place two other ways: it's reachable from **VS Code chat and Zed** through
[`ralph-fs`](/docs/ai/ralph/server), which the plugin version isn't — and it's **pinned** at a
commit rather than tracking whatever the plugin currently ships. Which is the same argument the
[register](/docs/ai/ralph/skills#origin-pins-and-the-silent-revert) makes for every vendored thing
here.
