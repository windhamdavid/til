# spec-driven

## spec-driven

**Built here** — the method adapted from
[NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/sdd)
(`23e2428`), the machinery left behind.

A task gets a file before it gets code. The file says what done means, and the work is finished when
the file says so — not when the diff looks plausible.

### 865 KB of it was for a swarm

NeoLab's `sdd` plugin is **865 KB, ~216k tokens**: eight agent definitions (`business-analyst.md`
alone is 171 KB), an 85 KB `implement-task/SKILL.md` that would load on every trigger, and a 68 KB
`plan-task`.

The method underneath is small and good. The other 860 KB is prompt engineering for a **particular
agent swarm** — five model-assigned phases, three parallel analysis agents, an LLM-as-judge gate
after each.

That's the disqualifying part, and it isn't really about size. It assumes Claude Code's sub-agent
dispatch and per-step model tiers, so **only one of the [three clients](/docs/ai/ralph/server#configuration)
wired here could execute it** — and the [local supervisor](/docs/ai/ralph/models#on-qwen-36-35b-a3b)
couldn't run a 216k-token workflow at all. Vendoring it would have put a workflow two clients cannot
use into a directory that exists *precisely because* it's client-neutral.

So the method was rewritten agent-optional: no agent names, no model tiers, works with one agent,
several, or none.

| | Upstream | Here |
|---|---|---|
| Size | 865 KB, ~216k tokens | **8.1 KB** across `SKILL.md` and two templates |
| Runs on | Claude Code's sub-agent dispatch | anything, including nothing |

A **106× cut**. And it's GPL-3.0 again, like
[`write-concisely`](/docs/ai/ralph/skills/write-concisely) — so building rather than vendoring keeps
copyleft out of a [publicly-served repo](/docs/ai/ralph/memory/design#the-store-lives-outside-the-repo)
for the second time in a day.

### Folder-as-state

```
.specs/
├── tasks/
│   ├── draft/       # written down, not yet thought through
│   ├── todo/        # planned: criteria and steps exist
│   ├── in-progress/
│   └── done/
└── sub-tasks/
    └── <task-name>/ # created at planning time, NEVER moves
        ├── 01-<step>.md
        └── 02-<step>.md
```

The task file moves between the four folders; **the sub-task folder never does.** Deliberate — paths
recorded during planning stay valid for the whole lifecycle, so nothing needs rewriting when a task
advances.

And state lives in the directory layout because `ls .specs/tasks/in-progress/` answers "what's
underway?" with **no tool, no index and no agent**. Same bet as the
[playbook](https://davidwindham.com/code/ralph/src/branch/main/docs/playbook.md), and the same
reason the [memory design](/docs/ai/ralph/memory/design#markdown-files-are-the-truth-there-is-no-database)
chose files over SQLite.

### The four moves

**1. Draft.** Capture the request before thinking hard about it. Rough is fine — the point is that
it exists outside a chat window.

**2. Plan.** Produce two things: **acceptance criteria written before any code**, and **one file per
step**, each naming what it depends on so the parallelizable ones are visible.

**3. Implement.** One step at a time. An executor reads *its* sub-task file and the parent task file
— not the other twelve. That's the whole reason steps are separate files, and it's what keeps the
method usable by a small local model as well as a large one.

**4. Review, then done.** Score against the acceptance criteria that phase was responsible for — not
against a general sense of quality.

### Criteria before code is the load-bearing rule

Everything else is filing. This is the part that carries the method:

> If you find yourself writing acceptance criteria after the implementation, you are writing a
> description, not a specification.

Criteria written afterwards describe what was built, and therefore **test nothing**. The remedy the
skill gives is to stop and write them from the original request instead.

Four more rules, each guarding a specific way this decays:

- **A step is one sitting's work.** If a sub-task can't be finished in one go, it's two steps.
  Oversized steps are where the method quietly turns back into vibe coding.
- **Record what actually happened.** When implementation diverges from the spec — and it will —
  update the file with the reason. A spec describing a build that didn't happen is *worse* than no
  spec, because the next reader trusts it.
- **The files are the state.** Anything true only in the chat is lost at the end of the session,
  which is the failure this whole method exists to prevent.
- **Don't fabricate criteria to fill the template.** If a section doesn't apply, delete it. A rubric
  invented to satisfy a heading teaches the reviewer nothing.

### When to skip it

Stated in the skill itself, and worth repeating: **skip it when the change is small and obvious.**

> A spec for a typo fix is ceremony, and ceremony is what makes people stop using a process.

It's for work spanning more than one sitting, work handed to another agent or client, changes
touching several files in a way that's easy to half-finish, or a task where "done" is genuinely
arguable.
