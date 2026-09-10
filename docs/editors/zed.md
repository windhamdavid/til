# Zed ⚡

[Zed](https://zed.dev) is a standalone editor written in Rust, open source, from the people who built
[Atom](https://en.wikipedia.org/wiki/Atom_(text_editor)) and Tree-sitter. **Not installed here yet** — this page is the evaluation and a cheat sheet off the docs, not a setup.

## Notes

**26/09/10** - wrote this up out of the editor comparison in [Ralph → Models](/docs/ai/ralph/models), where
Zed and [Void](https://voideditor.com) both came up as *editors rather than extensions* — they replace
[VS Code](/docs/editors/vs) instead of plugging into it. Cheat sheet below is from the
[docs](https://zed.dev/docs/), not from use.

## Why it's on the list

The whole [Ralph](/docs/ai/ralph) setup currently runs through VS Code's agent mode against local models,
and the friction there is documented: VS Code refuses agent mode under a 64K context window, exposes no
context setting of its own, and needs its built-in tools deselected by hand before the local model behaves.
None of that is Ollama's fault — it's the extension host sitting between the model and the work.

Zed's pitch is that the agent isn't an extension. Agentic editing, edit prediction, an inline assistant, and
parallel agent threads are in the editor, and external agents connect over **ACP** (Agent Client Protocol) —
Claude Agent and Codex being the two named ones. It also speaks **MCP**, which is the part that matters for
Ralph, since the thirteen `ralph-fs` tools are the actual investment and they're portable to anything that
speaks the protocol.

## The open questions, answered

The [models](/docs/ai/ralph/models) note flagged that Zed's landing page doesn't state Ollama support and
said to verify before counting on it. Both of the things that bit in VS Code are settings here:

- **Ollama is a first-class provider.** `language_models.ollama`, auto-discovery on by default, `api_url`
  defaulting to `http://localhost:11434`.
- **The context window is a setting, not a Modelfile.** Zed sends context length to Ollama as `num_ctx` and
  **defaults to 4096** — lower than VS Code's 32K, and it would be wrong out of the box. But it's
  `language_models.ollama.context_window` globally, or `max_tokens` per model in `available_models`. No
  second Ollama entry, no `PARAMETER num_ctx` baked into a Modelfile, nothing `brew services` can wipe.
- **Narrowing the tool set is a profile, not thirteen checkboxes.** The docs' own advice for making sure a
  given MCP server actually gets used is a custom **agent profile** that disables the conflicting built-in
  tools and enables only that server's.

That last one is the real find. The VS Code version of this is manual and resets; here it's a named,
saved profile.

## Cheat sheet

macOS bindings. Zed supports chords (`Cmd+K Cmd+C`) the way VS Code does.

### Getting around

| | |
|---|---|
| Command palette | `Cmd+Shift+P` |
| Go to file | `Cmd+P` |
| Go to symbol (file) | `Cmd+Shift+O` |
| Go to symbol (project) | `Cmd+T` |
| Find in project | `Cmd+Shift+F` |
| Rename symbol | `F2` |
| Open recent project | `Cmd+Opt+O` |
| Toggle terminal | `` Ctrl+` `` |
| Split pane | `Cmd+K` then an arrow key |
| Move line up/down | `Cmd+Ctrl+Up` / `Cmd+Ctrl+Down` |
| Expand selection (syntactic) | `Opt+Up` / `Opt+Down` |
| Extensions | `Cmd+Shift+X` |
| Theme selector | `Cmd+K Cmd+T` |
| Settings | `Cmd+,` |

`Opt+Up` being *syntax-aware* selection rather than move-line is the one that'll bite muscle memory
hardest — it's the same key doing a different job, which is worse than a key that does nothing.

### Config files

All reachable from the command palette, which is the actual point of the design — panels are optional,
the palette isn't.

| | |
|---|---|
| Settings (GUI) | `Cmd+,` |
| Settings (JSON) | `zed: open settings file` |
| Keymap | `zed: open keymap` |
| Tasks | `zed: open tasks` |
| Snippets | `snippets: configure snippets` |
| Import VS Code settings | `zed: import vs code settings` |
| Per-project overrides | `.zed/settings.json` in the repo |

### CLI

`zed .` opens the current directory, the same habit as `code .`.

### Layout

Two named layouts, switched from the user menu or the palette — `workspace: use agentic layout` puts the
Agent Panel and Threads Sidebar on the left, `workspace: use classic layout` gives back the editor-first
arrangement. Agent panel is `Cmd+Shift+A`, inline assistant is `Cmd+Enter`.

### Ollama

```json
{
  "language_models": {
    "ollama": {
      "api_url": "http://localhost:11434",
      "context_window": 65536,
      "auto_discover": false,
      "available_models": [
        {
          "name": "qwen3.6:35b-a3b-q4_K_M",
          "display_name": "qwen3.6 35b",
          "max_tokens": 65536,
          "supports_tools": true,
          "supports_thinking": true
        }
      ]
    }
  }
}
```

`supports_tools` matters — an agent is useless without it. Leaving `auto_discover` on is fine to start;
turning it off is how you stop the picker filling with models you don't want to pick by accident, which was
the [32K-versus-64K trap](/docs/ai/ralph/models) in the VS Code setup.

### MCP servers

```json
{
  "context_servers": {
    "ralph-fs": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {}
    },
    "remote-example": {
      "url": "https://example.com/mcp",
      "headers": { "Authorization": "Bearer …" }
    }
  }
}
```

Local servers are `command` / `args` / `env`; remote ones are `url` / `headers`, and a remote server with
no auth header triggers the standard MCP OAuth flow. Settings → AI → MCP Servers writes these for you.
Tool approval is `agent.tool_permissions.default` — `confirm`, `allow`, or `deny` — with individual tools
addressable as `mcp:<server>:<tool_name>`, e.g. `mcp:ralph-fs:rag_search`. Per the docs that granular form
arrived in **v0.224.0**.

Given the standing note about `rag_delete_document` being able to quietly damage the index, per-tool
permissions are worth more here than the blanket setting.

## Migrating from VS Code

There's a [dedicated migration guide](https://zed.dev/docs/migrate/vs-code), and it does more than I
expected — `zed: import vs code settings` maps something like seventy settings across editor, files,
terminal, tabs, project panel, git, and window behaviour. `editor.fontFamily` → `buffer_font_family` and so
on down the line.

What that means for the [rebuild list](#what-id-have-to-rebuild) below: the fonts, indent, minimap,
whitespace, file associations, and terminal config are probably an import rather than an afternoon. The
thirty `workbench.colorCustomizations` overrides are not — that's a theme, and Zed themes are a different
format with a different set of keys. Same for the extensions.

Bindings that are already the same: `Cmd+P`, `Cmd+Shift+P`, `Cmd+Shift+F`, `Cmd+T`, `F2`, `Cmd+K Cmd+T`.
The ones that moved are in the table above.

Concepts that don't map:

- **No `.code-workspace`.** Multi-root is *File → Add Folder to Project*, and Zed can hold multiple projects
  in one window via the threads sidebar, which is a different model rather than a missing feature.
- **The marketplace is smaller.** Offset somewhat by things that are extensions in VS Code being built in
  here — terminal, task runner, LSP diagnostics, fuzzy search, AI, and collaboration with voice. The docs
  admit DevOps and container tooling is thin.
- **Copilot** is configured under Settings → AI → Edit Predictions rather than as an extension.

## The trade

| | VS Code | Void | Zed |
|---|---|---|---|
| Relationship | current | VS Code *fork* | ground-up rewrite |
| Settings | mine, tuned | transfer in one click | importer covers most |
| Themes / keybinds | mine, tuned | transfer in one click | start over |
| Written in | TypeScript / Electron | TypeScript / Electron | Rust |
| Status | stable | **beta** | stable |
| Local models | via extension | Ollama direct, plus FIM | Ollama direct |
| Context window | Modelfile workaround | ? | `context_window` setting |

Void keeps the muscle memory and Zed abandons it for speed and a cleaner agent story. Neither is a small
switch. Void's beta status argues for waiting; Zed's cost is the theme and the extensions, which the
importer doesn't carry.

## What I'd have to rebuild

Straight off the [VS Code](/docs/editors/vs) page — the parts that are config rather than habit, with what
the importer likely handles struck through:

- ~~Editor font `Andale, Menlo, Monaco` at 16px, ligatures off; terminal `Andale Mono` at 15px~~ — imports
- ~~2-space indent, minimap off, whitespace off~~ — imports
- ~~`.htaccess` associated with `c` so it highlights~~ — file associations import
- The two-tone chrome — `#2b2f37` editor and panels, `#30333a` bars and tabs, `#232323` terminal — with
  every `*.border` set to the background behind it. That's the trick that removes the seams, and Zed's
  theme format is JSON but not *that* JSON.
- Spell and prose checking. cSpell and Harper are VS Code extensions; Zed has its own extension registry
  and the equivalents may or may not be there.
- Markdown table formatting (`markdown-table-prettify`)

## Not evaluated

Everything above is from the docs; everything below is a claim from the site or general reputation, and
none of it is tested here:

- Speed. The entire premise is GPU-accelerated rendering and no [Electron](https://en.wikipedia.org/wiki/Electron_(software_framework)). Believable, unmeasured.
- Vim mode, multibuffers, and the collaboration features — irrelevant to a single-user setup.
- Edit prediction ("Zeta"), which is a hosted model, so it's a different privacy question than local Ollama.
- Extension parity. This is the one that usually decides it. Thirty-eight of the forty-three extensions on
  Stu are probably replaceable; the question is the other five.
- Whether `context_window` actually behaves. It's a setting, which is more than VS Code offered, but a
  setting existing and a setting working are different claims.

## Suggested order

1. Install alongside VS Code — nothing here requires switching to find out
2. `zed: import vs code settings` and see how much of Stu comes across
3. Point it at the Ralph MCP server, confirm all thirteen tools enumerate
4. Set `context_window` to 65536 and run the same local model against the same repo
5. Build the agent profile that turns off the built-ins, and check the six mutating tools are excluded
6. Only then decide whether the theme rebuild is worth it

## References

- [Zed docs](https://zed.dev/docs/) — the whole thing
- [Coming from VS Code](https://zed.dev/docs/migrate/vs-code) — settings importer, keybinding diffs
- [Use a local model](https://zed.dev/docs/ai/use-a-local-model) — Ollama, `context_window`, `num_ctx`
- [Model Context Protocol](https://zed.dev/docs/ai/mcp) — `context_servers`, tool permissions
- [Keybindings](https://zed.dev/docs/key-bindings) — the keymap format
- [All settings](https://zed.dev/docs/reference/all-settings) / [All actions](https://zed.dev/docs/all-actions) — the reference dumps
- [Themes](https://zed.dev/docs/themes) — what the chrome rebuild would involve
- [Extensions](https://zed.dev/docs/extensions) — registry and the parity question
- [Zed on GitHub](https://github.com/zed-industries/zed)
