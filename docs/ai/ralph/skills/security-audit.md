# security-audit

## security-audit

**Vendored — [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill),
MIT, pinned at `c1c8a8c`.** Copied verbatim with its `LICENSE` alongside: 20 files, 12 topic
references, two Node validators whose suites pass (34 + 31 tests).

Source-first vulnerability review. Its own framing: find vulnerabilities that violate a **real trust
boundary**, then hand the owner source evidence, safe reproduction, priority, and the smallest
effective fix. A candidate without a concrete affected principal, resource, or security outcome is
not a finding.

### Two modes, and the default is the quiet one

The distinction it opens with is the reason it's safe to leave loaded:

| Mode | When | What it does |
|---|---|---|
| **Guidance** (default) | security questions, focused reviews, methodology, triage | uses only the relevant parts — no phases, no output directory, no artifacts |
| **Full audit** | an explicit ask to audit or pen-test, a full/comprehensive review, or a request for report artifacts | all six phases, writes the report files |

**Loading it does not authorize the audit.** And if the request could mean either, it asks one
focused question before creating a single file. That's an unusually disciplined default for a skill
this large — the failure mode it's avoiding is a casual "is this secure?" turning into a directory
full of half-evidenced findings.

### Execution safety

The rules that apply in *both* modes are the part worth reading even if the workflow never runs.
Source inspection is read-only. Anything target-controlled — builds, tests, browsers, fuzzers,
fixture processing — runs only inside an OS-enforced sandbox with no external network, an empty
allowlisted environment, a read-only target, and explicit CPU/memory/process/disk/wall-clock limits.

If every control can't be enforced, it **doesn't execute** — it reports the missing sandbox
capability as a needs-validation blocker and gives a safe validation plan instead. Never probe
deployed endpoints, shared infrastructure, production identities, or other users' data; if the
decisive fact lives outside source or the fixture, that's reported rather than reached for.

The write-isolation procedure behind it is genuinely paranoid in a way that reads as earned — every
promoted artifact is walked from retained directory descriptors with no-follow, `fstat`-verified for
type, link count and size, and re-verified after the copy. Symlinks, FIFOs, hard links and changing
files are all refused.

### Coverage as a countable thing

The mechanism underneath full audit mode is a **coverage ledger**, and it exists so that no run can
imply more than it did.

- No one pass is complete, and the final coverage statement says so — including when no prior ledger
  exists.
- Prior runs are read before planning, and a prior `confirmed` record is only carried forward when
  the relevant source is *unchanged*; a prior source ref alone isn't evidence of that.
- A scoped or `quick` run presents itself as partial. Out-of-scope surfaces are recorded
  `out_of_scope` — never `covered`.
- Profiles (`quick` / `standard` / `deep`) change breadth and redundancy, **never the evidence bar**.
- Budget is measured in agent invocations, with critics and validation *reserved before* hunting. If
  the budget can't fund the minimum, it launches nothing and says so rather than silently thinning
  the evidence.

### Two things it does differently, both left alone

This is the skill that establishes the house convention isn't a rule:

- **Detail sits in flat `CAPS.md` siblings** — `HUNTING.md`, `ATTACK-CLASSES.md`,
  `WEB-PROTOCOL-AND-AUTH.md` and nine more — rather than in `references/`, and `SKILL.md` names
  those files directly. So the layout *can't be tidied* into the [house
  shape](/docs/ai/ralph/skills#the-shape) without breaking it.
- **It assumes a delegating agent** — a Task tool, `research` and `general` sub-agents, parent-owned
  shared state. That maps cleanly onto Claude Code and means considerably less in a client that
  can't spawn anything.

Which is the general shape of vendoring here: keep the upstream layout, pin the commit, and write
down anything changed — because a re-sync is a whole-directory re-copy, and an
[unrecorded](/docs/ai/ralph/skills#origin-pins-and-the-silent-revert) local edit gets wiped
by it.
