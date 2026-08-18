# Claude

- from [cc.storyfox.cz](https://cc.storyfox.cz) v2.1.234 updated **26/08/17** - source rebuilds daily

## ⌨️ Keyboard Shortcuts

### General Controls

| Shortcut | Action |
|---|---|
| `Ctrl+C` | Cancel input/generation |
| `Ctrl+D` | Exit session |
| `Ctrl+L` | Clear prompt input + force full screen redraw |
| `Ctrl+O` | Toggle transcript viewer (verbose tool usage); cycles focus view in fullscreen |
| `Ctrl+U` | Clear entire input buffer |
| `Ctrl+Y` | Restore cleared input buffer |
| `Ctrl+G` | Open in editor (same as Ctrl+X Ctrl+E) |
| `Ctrl+R` | Reverse search history |
| `Ctrl+X Ctrl+K` | Kill all background agents (press twice to confirm) |
| `Ctrl+B` | Background running tasks |
| `Ctrl+T` | Toggle task list |
| `Esc+Esc` | Rewind or summarize |

### Mode Switching

| Shortcut | Action |
|---|---|
| `Shift+Tab` | Cycle permission modes (default → acceptEdits → plan → …) |

### Mac Option Keys (configure Option as Meta)

| Shortcut | Action |
|---|---|
| `⌥+P` | Switch model |
| `⌥+T` | Toggle extended thinking |
| `⌥+O` | Toggle fast mode |

### Input

| Shortcut | Action |
|---|---|
| `\+Enter` | Newline |
| `v` | Vim visual mode (char selection + operators) |
| `V` | Vim visual-line mode |

### Prefixes

| Shortcut | Action |
|---|---|
| `/` | Slash command |
| `!` | Direct bash; live file path autocomplete |
| `@` | File mention + autocomplete |

## 🔌 MCP Servers

### Add Servers

| Command | What it does |
|---|---|
| `--transport http` | Remote HTTP (recommended) |
| `--transport stdio` | Local process |
| `--transport sse` | Remote SSE |

### Scopes

| Command | What it does |
|---|---|
| `Local` | ~/.claude.json (you only) |
| `Project` | .mcp.json (shared/VCS) |
| `User` | ~/.claude.json (global) |

### Manage

| Command | What it does |
|---|---|
| `/mcp` | Interactive UI |
| `claude mcp list` | List all servers |
| `alwaysLoad: true` | Keep server connected across all sessions (server config) |
| `maxResultSizeChars` | `_meta["anthropic/maxResultSizeChars"]` raises per-tool text threshold (up to 500K chars) |

## ⚡ Slash Commands

### Session

| Command | What it does |
|---|---|
| `/clear` | Clear conversation |
| `/compact [focus]` | Compact context |
| `/branch [name]` | Branch conversation (/fork alias) |
| `/usage` | Token usage, cost and cache breakdown (replaces `/cost`/`/stats`) |
| `/context` | Visualize context (grid) |
| `/diff` | Interactive diff viewer |
| `/copy [N]` | Copy last (or Nth) response |
| `/recap` | Summarize session context when returning |
| `/undo` | Alias for /rewind |
| `/rewind` | Rewind conv / code checkpoint; resumes past `/clear` |
| `/export` | Export conversation |
| `/plan [desc]` | Enter plan mode directly |
| `/resume [session]` | Resume by ID/name |
| `/focus` | Toggle focus view (fullscreen only) |
| `/goal [desc]` | Set completion goal; Claude works until met with live progress overlay |

### Config

| Command | What it does |
|---|---|
| `/config [key [value]]` | View/set settings (persists to `~/.claude/settings.json`) |
| `/model [model]` | Switch model (←→ effort) |
| `/fast [on\|off]` | Toggle fast mode |
| `/theme [name]` | Create and switch named custom themes; includes "Auto (match terminal)" dark/light |
| `/permissions` | View/update permissions |
| `/effort [level]` | Set effort (low/medium/high/xhigh/max); opens interactive slider with arrow keys when called without args |
| `/color [color]` | Set prompt-bar color |
| `/keybindings` | Customize keyboard shortcuts |
| `/scroll-speed [speed]` | Adjust output scroll speed |
| `/terminal-setup` | Configure terminal keybindings |

### Tools

| Command | What it does |
|---|---|
| `/init` | Create CLAUDE.md |
| `/memory` | Edit CLAUDE.md files, toggle auto memory, view entries |
| `/mcp` | Manage MCP servers |
| `/hooks` | Manage hooks |
| `/skills` | List available skills |
| `/reload-skills` | Reload skills without restarting |
| `/agents` | Manage agent configurations |
| `/workflows` | View and manage background multi-agent workflow runs |
| `/review` | Alias for /code-review |
| `/ultrareview [PR#]` | Cloud code review — parallel multi-agent analysis |
| `/security-review` | Scan diff for vulnerabilities |
| `/loop [interval] [prompt]` | Recurring task (/proactive alias) |
| `/ide` | IDE integrations status |
| `/add-dir <path>` | Add working directory |

### Special

| Command | What it does |
|---|---|
| `/btw <question>` | Ask a side question without adding to the conversation |
| `/extra-usage` | Extra usage when rate limited |
| `/voice` | Toggle push-to-talk voice dictation |
| `/doctor` | Full setup checkup (`/checkup` alias) |
| `/insights` | Analyze sessions report |
| `/desktop` | Continue in Desktop app |
| `/rename [name]` | Rename current session |
| `/help` | Show help + commands |
| `/feedback` | Submit feedback (alias: /bug) |

## 📁 Memory & Files

### CLAUDE.md Locations

| Path / file | Purpose |
|---|---|
| `./CLAUDE.md or ./.claude/CLAUDE.md` | Project (team-shared) |
| `./CLAUDE.local.md` | Local personal project notes (gitignored) |
| `~/.claude/CLAUDE.md` | Personal (all projects) |
| `/etc/claude-code/CLAUDE.md` | Managed policy (Linux/WSL, org-wide) |

### Rules & Import

| Path / file | Purpose |
|---|---|
| `.claude/rules/*.md` | Project rules |
| `~/.claude/rules/*.md` | User rules |
| `paths: frontmatter` | Path-specific rules |
| `@path/to/file` | Import in CLAUDE.md |

### Auto Memory

| Path / file | Purpose |
|---|---|
| `~/.claude/projects/<proj>/memory/` |  |
|  | `MEMORY.md` auto-loads at startup (first 25KB or 200 lines); topic files load on demand |

## 🧠 Workflows & Tips

### Plan Mode

| Tip | Notes |
|---|---|
| `Shift+Tab` | Manual → Auto-Accept → Plan |
| `--permission-mode plan` | Start in plan mode |
| `Plan file naming` | Files named after your prompt (e.g. `fix-auth-race-snug-otter.md`) |

### Thinking & Effort

| Tip | Notes |
|---|---|
| `Alt+T` | Toggle thinking on/off |
| `"ultrathink"` | Max effort for turn |
| `Ctrl+O` | See thinking (verbose) |
| `/effort` | ○ low · ◐ medium · ● high · ★ xhigh · ★★ max |

### Auto Mode Denied

| Tip | Notes |
|---|---|
| `/permissions → Recent` | Retry denied with R |

### Git Worktrees

| Tip | Notes |
|---|---|
| `--worktree name` | Isolated branch per feature |
| `isolation: worktree` | Agent in own worktree |
| `sparsePaths` | Checkout only needed dirs |
| `workspace.git_worktree` | Status line JSON: linked worktree path |
| `/batch` | Auto-creates worktrees |

### Voice Mode

| Tip | Notes |
|---|---|
| `/voice` | Enable push-to-talk |
| `Space+(hold)` | Record, release to send |
| `20 languages` | EN, ES, FR, DE, CZ, PL… |

### Context Management

| Tip | Notes |
|---|---|
| `/context` | Usage + optimization tips |
| `/compact [focus]` | Compress with focus |
| `1M context` | Sonnet 5 (promo), Opus 5 (Max/Team/Ent) |

### Session Power Moves

| Tip | Notes |
|---|---|
| `claude -c` | Continue last conv |
| `claude -r "name"` | Resume by name |
| `/btw question` | Side Q, no context cost |

### SDK / Headless

| Tip | Notes |
|---|---|
| `claude -p "query"` | Non-interactive |
| `--output-format json` | Structured output |
| `--max-budget-usd 5` | Cost cap |
| `cat file \| claude -p` | Pipe input |

### Scheduling & Remote

| Tip | Notes |
|---|---|
| `/loop 5m msg` | Recurring task |
| `--remote` | Web session on claude.ai |
| `! <cmd>` | Run shell cmd as background session |

## ⚙️ Config & Env

### Config Files

| Setting | Notes |
|---|---|
| `~/.claude/settings.json` | User settings |
| `.claude/settings.json` | Project (shared) |
| `.claude/settings.local.json` | Local only |
| `~/.claude.json` | OAuth, MCP, state |
| `.mcp.json` | Project MCP servers |
| `managed-settings.d/` | Drop-in policy fragments |

### Key Settings

| Setting | Notes |
|---|---|
| `modelOverrides` | Map model picker → custom IDs |
| `autoMode.hard_deny` | Unconditional auto-mode classifier deny rules |
| `hooks: if` | Conditional hooks (permission rule syntax) |
| `DISABLE_PROMPT_CACHING*` | Startup warning when prompt caching is disabled |
| `Monitor tool` | Stream events from background scripts |
| `PermissionDenied` | Hook: auto-mode denial |
| `showThinkingSummaries` | Opt-in (off by default now) |
| `hooks: "defer"` | Pause headless → resume later |
| `axScreenReader` | Plain-text screen reader rendering |
| `continueOnBlock` | Hook config: keep running after a blocked tool call |
| `fallbackModel` | Up to 3 fallback models on failure |
| `refreshInterval` | Re-run custom status line every N sec |

### Key Env Vars

| Setting | Notes |
|---|---|
| `ANTHROPIC_API_KEY` |  |
| `ANTHROPIC_MODEL` |  |
| `ANTHROPIC_BASE_URL` | Proxy/gateway override |
| `ANTHROPIC_BETAS` | Additional beta headers |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | Custom /model entry |
| `MAX_THINKING_TOKENS` | 0=off |
| `ENABLE_PROMPT_CACHING_1H` | Opt into 1h prompt cache TTL |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | Force recap when telemetry disabled |
| `CLAUDECODE` | Detect CC shell (=1) |
| `CLAUDE_CODE_DISABLE_CRON` | Disable scheduled tasks |
| `DISABLE_UPDATES` | Block all update paths |
| `API_TIMEOUT_MS` | API timeout (default: 600000ms) |
| `MCP_TIMEOUT` | MCP server startup timeout (ms) |
| `CLAUDE_CODE_SESSION_ID` | Unique session ID for hooks and CI tracing |
| `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` | Opt out of fullscreen rendering (=1) |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` |  |
| `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` | Disable mouse click/drag/hover in fullscreen (=1) |
| `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` | Auto-upgrade via Homebrew/WinGet |
| `CLAUDE_AX_SCREEN_READER` | Screen reader mode (=1) |

## 🔧 Skills & Agents

### Built-in Skills

| Item | Notes |
|---|---|
| `Skill tool` | Discovers built-in slash commands (/init, /review, /security-review…) |
| `/code-review [effort]` | Code review; `--fix` flag applies findings to working tree |
| `/batch` | Large parallel changes (5-30 worktrees) |
| `/debug [desc]` | Troubleshoot from debug log |
| `/loop [interval]` | Recurring scheduled task |
| `/claude-api` | Load API + SDK reference |

### Custom Skill Locations

| Item | Notes |
|---|---|
| `.claude/skills/<name>/` | Project skills |
| `~/.claude/skills/<name>/` | Personal skills |

### Skill Frontmatter

| Item | Notes |
|---|---|
| `description` | Auto-invocation trigger |
| `allowed-tools` | Skip permission prompts |
| `disallowed-tools` | Block specific tools from skill |
| `model` | Override model for skill |
| `effort` | Override effort level |
| `paths: [globs]` | Path-specific (YAML list) |
| `context: fork` | Run in subagent |
| `$ARGUMENTS` | User input placeholder |
| `${CLAUDE_SKILL_DIR}` | Skill's own directory |
| `${CLAUDE_EFFORT}` | Current effort level (skill variable) |
| `!`cmd`` | Dynamic context injection |
| `plugin bin/` | Ship executables for Bash tool |

### Built-in Agents

| Item | Notes |
|---|---|
| `Explore` | Fast read-only (Haiku) |
| `Plan` | Research for plan mode |
| `General` | Full tools, complex tasks |
| `Bash` | Terminal separate context |

### Agent Frontmatter

| Item | Notes |
|---|---|
| `permissionMode` | default/acceptEdits/plan/dontAsk/bypassPermissions |
| `isolation: worktree` | Run in git worktree |
| `memory: user\|project\|local` | Persistent memory |
| `background: true` | Background task |
| `maxTurns` | Limit agentic turns |
| `initialPrompt` | Auto-submit first turn |
| `SendMessage` | Resume agents (replaces resume) |
| `@agent-name` | Mention named subagents |

## 🖥️ CLI & Flags

### Core Commands

| Flag | What it does |
|---|---|
| `claude` | Interactive |
| `claude "q"` | With prompt |
| `claude -p "q"` | Headless (SDK) |
| `claude -c` | Continue last |
| `claude -r "n"` | Resume by ID/name |
| `claude update` | Update |
| `claude auth login` | Sign in (--sso, --console) |
| `claude agents` | List agents |
| `claude mcp` | MCP config |
| `claude plugin` | Plugin management |
| `claude plugin init <name>` | Scaffold new plugin |
| `claude project purge [path]` | Delete all Claude Code project state |
| `claude ultrareview [target]` | Non-interactive code review (PR / branch / path) |

### Key Flags

| Flag | What it does |
|---|---|
| `--model` | Set model |
| `-n / --name` | Session name |
| `--resume, -r` | Resume session |
| `--continue, -c` | Continue most recent |
| `--add-dir` | Add working dir |
| `--agent` | Use agent |
| `--allowedTools` | Pre-approve tools |
| `--disallowedTools` | Remove tools |
| `--output-format` | text/json/stream-json |
| `--max-budget-usd` | Cost cap |
| `--remote` | Web session on claude.ai |
| `--effort` | low/medium/high/xhigh/max |
| `--permission-mode` | default/acceptEdits/plan/auto/dontAsk/bypassPermissions |
| `--dangerously-skip-permissions` | Skip all prompts ⚠️ |
| `--debug [filter]` | Debug logging |
| `--safe-mode` | Disable all customizations for troubleshooting (CLAUDE.md, plugins, hooks, MCP) |
| `--settings <file>` | Load settings JSON |
| `--from-pr` | Load PR context (GitHub / GitLab / Bitbucket / GHE) |
| `--fallback-model` | Set fallback model for interactive sessions |


## Permission Modes

| Mode | Behaviour |
|---|---|
| `default` | prompts |
| `acceptEdits` | auto-accept edits |
| `plan` | read-only |
| `dontAsk` | deny unless allowed |
| `bypassPermissions` | skip all |
| `--dangerously-skip-permissions` | CLI flag |

## More Env Vars

| Variable | Notes |
|---|---|
| `CLAUDE_CODE_CERT_STORE` | TLS CA: `bundled`, `system` |
