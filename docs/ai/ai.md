# AI

26/02/23 - I've gradually been adopting more agent involvement into my workflow and I really need to start making and keeping some docs on the setups as they evolve.  

## Claude 

Yes. The hierarchy, from most-loaded to most-specialized:

1. CLAUDE.md (project root) — freeform prose loaded into every session in that project. Best place for project-specific conventions, build commands, "always do X here" rules. You can also have nested CLAUDE.md files in subdirectories — they're picked up when work happens in that subtree.
2. ~/.claude/CLAUDE.md — user-level prose, loaded across every project. Personal preferences that follow you everywhere.
3. .claude/settings.json (project) and ~/.claude/settings.json (user) — JSON config: tool-permission allowlist, hooks, env vars, MCP server registrations, status line. Not freeform prose — this is the "machine-readable" side.
4. .claude/settings.local.json — gitignored personal overrides on a shared project (e.g., your local API keys, your own permission tweaks on a team repo).
5. .claude/commands/ and .claude/agents/ — custom slash commands and subagent definitions as Markdown files. Great for codifying recurring workflows.
6. Memory — the /Users/david/.claude/projects/.../memory/ directory I already write to per the "auto memory" section of my system prompt. This is evolving preference state, not a static config file.
For Claude Desktop specifically: same ~/.claude/ files apply, plus ~/Library/Application Support/Claude/claude_desktop_config.json for MCP servers.

For this repo, the answer to "where do I add the clarification rule we just discussed" would be CLAUDE.md at the project root (or ~/.claude/CLAUDE.md if you want it across all your projects). Want me to look at whether either of those exists yet?

## CoPilot

Still mostly for Ci and workflow integration but sometimes for review or debugging. prefer the integrated claude chat and code open in the terminal. It's nice to be able to flop around models and providers.

## MCP Ralph

- https://github.com/windhamdavid/ralph