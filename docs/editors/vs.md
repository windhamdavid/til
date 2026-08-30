# VS Code 🗒️

Visual Studio Code is my primary text editor. I occasionally use JetBrains and I previously used Atom, Sublime, and Textmate.

## Notes

**26/08/27** - wrote down the current setup on [Stu](/docs/computers/stu) — 1.135.0, 43 extensions. The `### others` extension list below is from the Ovid era and is out of date.

**11/26/21** - added Visual Studio Code (& Insiders) to [Ovid](/docs/computers/ovid) and need to make some notes as I get along.  

## Stu 🪩

Current configuration, **26/08/27** — VS Code `1.135.0` (arm64) on [Stu](/docs/computers/stu).
Settings live in `~/Library/Application Support/Code/User/`.

### Settings

| | |
|---|---|
| Editor font | `Andale, Menlo, Monaco, 'Courier New', monospace` at 16px, ligatures off |
| Terminal font | `'Andale Mono'` at 15px, minimum contrast ratio 5 |
| Theme | Dark Modern, minimap off, whitespace off, tree sticky-scroll off |
| Indent | 2 spaces |
| Markdown | formatted by `markdown-table-prettify` |
| Prose | cSpell on html + md only, case-sensitive, diagnostics as hints; Harper with `LongSentences` off |
| Copilot | on everywhere except plaintext, markdown, and commit messages |
| Claude Code | docked in the panel (`claudeCode.preferredLocation`) |
| `.htaccess` | associated with `c` so it highlights |

The `workbench.colorCustomizations` block is doing most of the work — roughly thirty overrides
that flatten the chrome into two tones:

- editor and panels `#2b2f37`
- activity bar, sidebar, tabs, status bar, title bar `#30333a`
- terminal `#232323`

The trick is that every `*.border` is set to the *same* value as the background behind it, which
is what removes the seams between panes rather than just recolouring them.

Worth noting those are the same values as this site's dark theme — `#2b2f37` is the TIL
background and `#232323` is the ink colour from the [parent site's palette](/docs/computers/stu).

### Keybindings

One override only:

```json
{ "key": "ctrl+cmd+v", "command": "extension.csvToMarkdown" }
```

### Extensions

43 installed. The ones that earn their place:

**Editing** — VIM (vscodevim), Code Spell Checker, Harper, Markdown Table Prettify, MDX,
Markdown Footnotes, Markdown Preview GitHub Styles, md-graph

**Data** — Rainbow CSV, Edit CSV, csvtomarkdown, Table Editor, XML, YAML

**Remote & containers** — Remote SSH (+ Edit), Remote Containers, Remote Explorer, Docker,
Containers, Codespaces

**Languages** — Python (+ Pylance, debugpy, python-envs), C/C++ (+ extension pack, themes,
devtools), CMake (+ Tools), ESLint, Apache

**Git** — GitLens, GitHub Actions, GitHub Theme

**AI** — Claude Code

**Other** — Excalidraw, PDF viewer, Firefox debugger, Speech

**Mine** — [markdown-preview-bg](https://marketplace.visualstudio.com/items?itemName=windhamdavid.markdown-preview-bg),
[wikipedia-link](https://marketplace.visualstudio.com/items?itemName=windhamdavid.wikipedia-link)

Full list any time with `code --list-extensions --show-versions`.


## Extensions

### others

- Atom One Dark Theme ( Mahmoud Ali )
- Azure Repos ( Microsoft )
- C/C++ ( Microsoft )
- C/C++ Extension Pack ( Microsoft )
- C/C++ Themes ( Microsoft )
- ChatGPT - Genie AI 
- CMake ( twxs )
- CMake Tools ( Microsoft )
- Code Spell Checker ( Street Side Software )
- Community Material Theme ( equinusocio )
- CSV to Markdown Table ( Machiore )
- Debugger for Firefox ( Firefox Dev Tools )
- Deno ( deno.land )
- Dev Containers ( Microsoft )
- Docker ( Microsoft )
- Edit csv ( janisdd )
- EditorConfig ( editorconfig )
- ESLint ( Microsoft )
- Figma for VS Code ( Figma )
- GitHub Codespaces ( GitHub )
- GitHub CoPilot ( GitHub )
- GitHub CoPilot Experimental ( GitHub )
- GitHub CoPilot Nightly ( GitHub )
- GitHub Markdown Preview ( Matt Bierner )
- GitHub Theme ( GitHub )
- GitLens ( GitKraken )
- Go ( Go Team at Google )
- Go Template Support ( jinlimig2 )
- Grammerly ( Rahul Kadyan )
- Gutenberg Highlights ( chrisrhymes )
- HMTL-validate
- IntelliCode ( Microsoft )
- IntelliCode API Usage ( Microsoft )
- isort ( Microsoft )
- JavaScript and TypeScript Nightly ( Microsoft )
- JavaScript Debugger Nightly ( Microsoft )
- JSON Validate ( rioj7 )
- Jupyter ( Microsoft )
- Jupyter Cell Tags ( Microsoft )
- Jupyter Slide Show ( Microsoft )
- Live Preview ( Microsoft )
- Live Share ( Microsoft )
- Markdown Checkbox ( Matt Bierner )
- Markdown Emoji ( Matt Bierner )
- Markdown Footnotes ( Matt Bierner )
- Markdown Preview GitHub Styling ( Matt Bierner )
- Markdown Preview Mermaid ( Matt Bierner )
- Markdown Preview VS Code Highlighter ( Matt Bierner )
- Markdown YAML Preview ( Matt Bierner )
- Markdownlint ( David Anson )
- Markmap ( Gerald Liu )
- Material Theme ( Equinusocio )
- Material Theme Light ( Equinusocio )
- md-graph ( Ian J Sikes )
- MDX ( unified )
- One Dark Pro ( binaryify )
- Partial Diff ( Ryuichi Inagaki )
- PHP Debug ( Xdebug )
- PHP Intelephense ( Ben Mewburn )
- Prettier ( Prettier )
- Pylance ( Microsoft )
- Python ( Microsoft )
- Python Debugger ( Microsoft )
- Rainbow CSV ( mechatroner )
- React ( Microsoft )
- React Native ( Microsoft )
- Remote Explorer ( Microsoft )
- Remote SSH ( Microsoft )
- Remote SSH: Editing ( Microsoft )
- Stylelint ( Stylelint )
- Rust Analyzer ( The Rust Programming Language )
- Sunburst Theme ( gerane )
- Table Editor ( sswatson )
- Tailwind CSS ( Tailwind Labs )
- Transmit ( Fabio Spaminato )
- 🔥 Wikpedia Hyperlinker ( windhamdavid 👈🏻 )
- WordPress Block Markup ( Carolina Nymark )
- WordPress Hooks IntelliSense ( John Billion )
- WordPress Syntax Highlighting ( Matthias Hunt )
- VIM ( vscodevim )
- YAML ( Red Hat )


## CoPilot

https://github.com/github/copilot-docs/blob/main/docs/visualstudiocode/gettingstarted.md#getting-started-with-github-copilot-in-visual-studio-code  

Ctrl+Enter. GitHub Copilot will open a new tab and suggest multiple options

## Keyboard Shortcuts

- unassigned shortcuts available at aka.ms/vscodekeybindings 

## General

⇧⌘P, F1 (^) Show Command Palette  
⌘P Quick Open, Go to File...  
⇧⌘N (^) New window/instance  
⌘W (^) Close window/instance  
⌘, (^) User Settings  
⌘K ⌘S (^) Keyboard Shortcuts  
  
## Basic editing  
  
⌘X (^) Cut line (empty selection)  
⌘C (^) Copy line (empty selection)  
⌥↓ / ⌥↑ (^) Move line down/up  
⇧⌥↓ / ⇧⌥↑ (^) Copy line down/up  
⇧⌘K (^) Delete line  
⌘Enter / ⇧⌘Enter (^) Insert line below/above  
⇧⌘\ (^) Jump to matching bracket  
⌘] / ⌘[ (^) Indent/outdent line  
Home / End (^) Go to beginning/end of line  
⌘↑ / ⌘↓ (^) Go to beginning/end of file  
⌃PgUp / ⌃PgDn (^) Scroll line up/down  
⌘PgUp /⌘PgDn (^) Scroll page up/down  
⌥⌘[ / ⌥⌘] Fold/unfold region  
⌘K ⌘[ / ⌘K ⌘] (^) Fold/unfold all subregions  
⌘K ⌘ 0 / ⌘K ⌘J (^) Fold/unfold all regions  
⌘K ⌘C (^) Add line comment  
⌘K ⌘U (^) Remove line comment  
⌘/ (^) Toggle line comment  
⇧⌥A (^) Toggle block comment  
⌥Z Toggle word wrap  
  
## Multi-cursor and selection  
  
⌥ + click (^) Insert cursor  
⌥⌘↑ (^) Insert cursor above  
⌥⌘↓ (^) Insert cursor below  
⌘U (^) Undo last cursor operation  
⇧⌥I (^) Insert cursor at end of each line selected  
⌘L (^) Select current line  
⇧⌘L (^) Select all occurrences of current selection  
⌘F2 (^) Select all occurrences of current word  
⌃⇧⌘→ / ← (^) Expand / shrink selection  
⇧⌥ + drag mouse (^) Column (box) selection  
⇧⌥⌘↑ / ↓ Column (box) selection up/down  
⇧⌥⌘← / → (^) Column (box) selection left/right  
⇧⌥⌘PgUp (^) Column (box) selection page up  
⇧⌥⌘PgDn (^) Column (box) selection page down  
  
## Search and replace  
  
⌘F (^) Find  
⌥⌘F (^) Replace  
⌘G / ⇧⌘G (^) Find next/previous  
⌥Enter Select all occurrences of Find match  
⌘D (^) Add selection to next Find match  
⌘K ⌘D (^) Move last selection to next Find match  
  
## Rich languages editing  
  
⌃Space, ⌘I (^) Trigger suggestion  
⇧⌘Space (^) Trigger parameter hints  
⇧⌥F (^) Format document  
⌘K ⌘F (^) Format selection  
F12 (^) Go to Definition  
⌥F12 (^) Peek Definition  
⌘K F12 (^) Open Definition to the side  
⌘. (^) Quick Fix  
⇧F12 (^) Show References  
F2 (^) Rename Symbol  
⌘K ⌘X (^) Trim trailing whitespace  
⌘K M Change file language  
  
## Navigation  
  
⌘T Show all Symbols  
⌃G (^) Go to Line...  
⌘P (^) Go to File...  
⇧⌘O (^) Go to Symbol...  
⇧⌘M (^) Show Problems panel  
F8 / ⇧F8 (^) Go to next/previous error or warning  
⌃⇧Tab (^) Navigate editor group history  
⌃- / ⌃⇧- (^) Go back/forward  
⌃⇧M (^) Toggle Tab moves focus  
  
## Editor management  
  
⌘W (^) Close editor  
⌘K F (^) Close folder  
⌘\ (^) Split editor  
⌘ 1 / ⌘2 / ⌘ (^3) Focus into 1 st, 2nd, 3rd editor group  
⌘K ⌘← / ⌘K ⌘→ (^) Focus into previous/next editor group  
⌘K ⇧⌘← / ⌘K ⇧⌘→ Move editor left/right  
⌘K ← / ⌘K → (^) Move active editor group  
  
## File management  
  
⌘N (^) New File  
⌘O (^) Open File...  
⌘S (^) Save  
⇧⌘S (^) Save As...  
⌥⌘S (^) Save All  
⌘W (^) Close  
⌘K ⌘W (^) Close All  
⇧⌘T (^) Reopen closed editor  
⌘K Enter (^) Keep preview mode editor open  
⌃Tab / ⌃⇧Tab (^) Open next / previous  
⌘K P (^) Copy path of active file  
⌘K R (^) Reveal active file in Finder  
⌘K O (^) Show active file in new window/instance  
  
## Display  
  
⌃⌘F (^) Toggle full screen  
⌥⌘ (^0) Toggle editor layout (horizontal/vertical)  
⌘= / ⇧⌘- (^) Zoom in/out  
⌘B (^) Toggle Sidebar visibility  
⇧⌘E Show Explorer / Toggle focus  
⇧⌘F (^) Show Search  
⌃⇧G (^) Show Source Control  
⇧⌘D (^) Show Debug  
⇧⌘X (^) Show Extensions  
⇧⌘H (^) Replace in files  
⇧⌘J (^) Toggle Search details  
⇧⌘U Show Output panel  
⇧⌘V (^) Open Markdown preview  
⌘K V (^) Open Markdown preview to the side  
⌘K Z (^) Zen Mode (Esc Esc to exit)  
  
## Debug  
  
F9 (^) Toggle breakpoint  
F5 (^) Start/Continue  
F11 / ⇧F11 (^) Step into/ out  
F10 (^) Step over  
⇧F5 (^) Stop  
⌘K ⌘I (^) Show hover  
  
## Integrated terminal  
  
⌃` (^) Show integrated terminal  
⌃⇧` Create new terminal  
⌘C (^) Copy selection  
⌘↑ / ↓ (^) Scroll up/down  
PgUp / PgDn (^) Scroll page up/down  
⌘Home / End (^) Scroll to top/bottom  
  
 
