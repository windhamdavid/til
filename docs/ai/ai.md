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

My sandbox repo for Claude Code experiments — and where the RAG/MCP server lives.

- https://github.com/windhamdavid/ralph
- https://code.davidawindham.com/david/ralph

The `mcp-server/` is a local [Model Context Protocol](https://modelcontextprotocol.io) filesystem server (`ralph-fs`) plus a RAG pipeline — SQLite + [sqlite-vec](https://github.com/asg017/sqlite-vec) for vector storage and local [Ollama](https://ollama.com) (`nomic-embed-text`) embeddings. It chunks markdown, embeds it, and does KNN search entirely offline. It already exposes filesystem tools (read/write/search) and RAG tools (ingest/search/list/delete) to Claude Code, and its path allowlist already includes this TIL repo.

## Site Assistant (Clippy)

26/06/06 - Ripping out the old [Markprompt](https://markprompt.com) widget on the [AI page](/ai) (it used their hosted vector DB + OpenAI) and replacing it with my own thing built on the Ralph RAG server above. The idea: a little pop-up "Clippy" bot I can drop on any of my sites that **only** answers from my own notes/docs/lists/posts and links back to the source pages.

How it fits together:

- **Index** — a script walks the TIL content, skips drafts/private/partials, chunks + embeds it locally, and stores each chunk's public URL so citations resolve to real pages.
- **Ask** — a new `/api/ask` endpoint on the Ralph server embeds the question, vector-searches the index, and hands the top matches to Claude (Haiku 4.5) with Anthropic's [native citations](https://docs.claude.com/en/docs/build-with-claude/citations) turned on, streaming the answer back over SSE.
- **Widget** — a small framework-free JS bundle (floating launcher + chat panel) embeddable on any site via a `<script>` tag; on the AI page it renders inline.

Notes to self:

- Anthropic has no embeddings API — that's why embeddings stay local (Ollama). Claude only does the generation.
- It's a public, paid endpoint, so: per-IP rate limiting, question-length caps, Haiku for cost, no conversation persistence.
- The index is the trust boundary — keep draft/private notes out of it (the ingest filters frontmatter).
- Full plan + build steps live in `CLAUDE.md` (both here and in ralph).