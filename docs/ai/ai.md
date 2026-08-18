# AI

I'm still not calling it intellegence, but that's likely the John Henry in me. I'm working top down on this page since my knowledge and workflow is developing. I started with Github CoPilot when it was released in 2022. Twenty years ago I wanted at least a single gigabyte of RAM so processing video was quicker and I could have unlimited browser tabs. I've now got 64GB and wanting more to run umpteen-billion parameter models.

## Log

- 26/08/06 - starting to have some decently informed opinions about workflow, models and structure
  - my daily drivers are Opus 5 and Qwen 2.5 local
- 26/05/05 - added  added another essay @ [https://davidwindham.com/artificial-intelligence-part-5/](https://davidwindham.com/artificial-intelligence-part-5/) 
- 26/02/24 - added [Ralph](/docs/ai/ralph.md) and published a writeup @ [Model Context Protocol](/posts/mcp) 
- 25/06/14 - started using [Cursor](https://cursor.com) *stopped a couple months later - back to VSC
- 23/05/09 - added an AI feature and documented @ [https://davidwindham.com/artificial-intelligence-part-3/](https://davidwindham.com/artificial-intelligence-part-3/)
- 22/07/19 - first write up @ [https://davidwindham.com/artificial-intelligence/](https://davidwindham.com/artificial-intelligence/)



## Ralph

RAG/MCP server for all projects - [Ralph](/docs/ai/ralph.md) 👈🏻. I'm trying to keep ralph on top of all other AI related projects and providers so 'he' can function as my local first workflow agent. 

---

## Open Router

- rankings - [https://openrouter.ai/rankings](https://openrouter.ai/rankings) 
- docs - [https://openrouter.ai/docs/](https://openrouter.ai/docs/)

## Kilo 

- [https://kilo.ai/docs/](https://kilo.ai/docs/)
- bench - [https://kilo.ai/kilobench](https://kilo.ai/kilobench)

## Terminal Bench

- [https://www.tbench.ai/leaderboard/terminal-bench/2.1](https://www.tbench.ai/leaderboard/terminal-bench/2.1)
- [https://github.com/harbor-framework](https://github.com/harbor-framework)
- [https://www.harborframework.com/docs](https://www.harborframework.com/docs)

## Hugging Face 

- [https://huggingface.co/windhamdavid](https://huggingface.co/windhamdavid)

## Ollama

- CLI ref - [https://docs.ollama.com/cli](https://docs.ollama.com/cli)

## LM Studio

- docs - [https://lmstudio.ai/docs/developer](https://lmstudio.ai/docs/developer)
- headless - [https://lmstudio.ai/docs/developer/core/headless](https://lmstudio.ai/docs/developer/core/headless)

## MLX-LM 

- [https://github.com/ml-explore/mlx-lm](https://github.com/ml-explore/mlx-lm)



## Claude 

- reference - [https://code.claude.com/docs/en/cli-reference](https://code.claude.com/docs/en/cli-reference)
- changelog - [https://code.claude.com/docs/en/changelog](https://code.claude.com/docs/en/changelog)

The hierarchy, from most-loaded to most-specialized:

1. CLAUDE.md (project root) — freeform prose loaded into every session in that project. Best place for project-specific conventions, build commands, "always do X here" rules. You can also have nested CLAUDE.md files in subdirectories — they're picked up when work happens in that subtree.
2. ~/.claude/CLAUDE.md — user-level prose, loaded across every project. Personal preferences that follow you everywhere.
3. .claude/settings.json (project) and ~/.claude/settings.json (user) — JSON config: tool-permission allowlist, hooks, env vars, MCP server registrations, status line. Not freeform prose — this is the "machine-readable" side.
4. .claude/settings.local.json — gitignored personal overrides on a shared project (e.g., your local API keys, your own permission tweaks on a team repo).
5. .claude/commands/ and .claude/agents/ — custom slash commands and subagent definitions as Markdown files. Great for codifying recurring workflows.
6. Memory — the /Users/david/.claude/projects/.../memory/ directory I already write to per the "auto memory" section of my system prompt. This is evolving preference state, not a static config file.
For Claude Desktop specifically: same ~/.claude/ files apply, plus ~/Library/Application Support/Claude/claude_desktop_config.json for MCP servers.


## CoPilot

- [https://docs.github.com/en/copilot/reference/chat-cheat-sheet](https://docs.github.com/en/copilot/reference/chat-cheat-sheet)

Mostly for Ci and workflow integration but sometimes for review or debugging. prefer the integrated claude chat and code open in the terminal. It's nice to be able to flop around models and providers though.

