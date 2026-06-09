
### (TIL) Today I Learned  

---  

## About
This is a place to store some notes and documentation. It was originally built as a way to make notes on interesting things I learn based on one of my favorite sub-reddit/[TIL](https://www.reddit.com/r/todayilearned/). While installing it the first time I wrote 'Today I learned that Google will translate to and from [Zulu](https://en.wikipedia.org/wiki/Zulu_language)'.  

![zulu](https://davidawindham.com/til/img/zulu.png)  

 > The page above in this site referring to the database and computer [operating system](https://en.wikipedia.org/wiki/Ubuntu) and not the [Zulu philosophy](https://en.wikipedia.org/wiki/Ubuntu_(philosophy))  of a universal bond of sharing that connects all humanity. 

I'm often searching online documentation for answers to commands, configurations, and error messages. I figured that since I spend most of my working time with the terminal, git, and text files, a more efficient and easier method of documenting the time I spend reading other documentation would be to build my own TIL. This way the information I learn will be easy to record, search and edit. The problem is that I've found myself repeating those searches because of the breadth and depth of the amount of functions and libraries involved in development. My wife suggested I call it TIHIDI 'this is how I did it' after explaining what I was working on. It makes sense to use a static documentation instead of database because it's quicker, easier to search, under version control, and the file formats are interoperable with other software and publishing frameworks.  

I'm hoping it'll help me keep my bookmarks as little less cluttered and it'll leave my [desk page](https://davidawindham.com/desk) free for longer form essays. I'll keep the LOG in the [README](https://code.davidawindham.com/david/til/src/master/README.md), add a [help page](/help), and some [vi cheat sheets](/docs/shell/vi) to get started because I'm always forgetting some of them.

Here's a map 👇🏼

[![md-graph map](https://davidawindham.com/til/img/til.jpg)](https://davidawindham.com/til/img/til.jpg)

## Todo

Things I'd like to automate so this place stays current instead of rotting — most of them are the same shape: pull from some external source and render it to a markdown file.

- [ ] **Sync Apple Reminders → [lists/todo.md](lists/todo.md)** — I keep real todos in Apple Reminders but rarely mirror them here. Find an easy export/sync (a Shortcut, or a small script via `reminders-cli` / AppleScript → markdown) so the [Todo list](https://davidawindham.com/til/lists/todo) isn't hand-maintained.
- [ ] **Sync Last.fm → [lists/now/listening.md](lists/now/listening.md)** — pull recent scrobbles from the Last.fm API and render to markdown so [Now / Listening](https://davidawindham.com/til/lists/now/listening) updates itself.
- [ ] **Generalize the "external source → markdown" sync** — both of the above are identical in shape, so build one small repeatable pattern (a `scripts/sync-*.mjs` per source, run on a schedule or in the prebuild step) so the next one is trivial: Letterboxd → Watching, StoryGraph/Goodreads → Reading, Strava → … etc.
- [ ] **Import my other sites as markdown for the davo-bot corpus** — convert my other sites (davidawindham.com, davidwindham.com, srh, …) to markdown and feed them into the [ralph](https://code.davidawindham.com/david/ralph) RAG / vector pipeline, so the AI [davo-bot](https://davidawindham.com/til/ai) answers from my whole web presence, not just this TIL site — more complete retrieval and citations.

## Log

- 26/06/06 - reworking the [AI page](https://davidawindham.com/til/ai): dropping Markprompt/OpenAI for a self-hosted assistant — Claude (Haiku) + local vector search over my own notes/docs/lists/posts, answers that link back to the source pages, as a little pop-up "Clippy" widget I can drop on any of my sites. Only answers from my stuff. Backend rides on my [ralph](https://code.davidawindham.com/david/ralph) RAG/MCP server (SQLite + sqlite-vec + local Ollama embeddings).
- 26/06/06 - upgrades ( 3.9.2 👉🏼 3.10.1) all good 👍🏼
- 24/11/23 - dev branch for .devcontainer / codespace
- 24/11/17 - upgrades ( 3.5.2 👉🏼 3.6.1 ) all good 👍🏼
  - 3.6 switched to Rust 🦀 rspack, SWC, Lightning CSS for faster builds
- 24/09/02 - upgrades ( 3.4.0 👉🏼 3.5.2 ) all good 👍🏼
- 24/07/11 - upgrades ( 3.3.2 👉🏼 3.4.0 ) all good 👍🏼
- 24/05/15 - upgrades ( 3.1.1 👉🏼 3.3.2 ) all good 👍🏼
- 24/01/28 - upgrades ( 3.0.1 -> 3.1.1 )
- 23/12/10 - modified blog layout - log @ [https://davidawindham.com/til/help](https://davidawindham.com/til/help)
- 23/11/12 - update 2.4.3 👉🏼 3.0.0 and React 17.0.2 👉🏼 18.2.0
- 23/08/18 - added private and draft notes with git controls. log @ [https://davidawindham.com/til/help](https://davidawindham.com/til/help)
- 23/05/05 - added AI page @ [https://davidawindham.com/til/ai](https://davidawindham.com/til/ai)
- 23/02/11 - mv master to main / migrate to [woozie](https://davidawindham.com/til/docs/computers/woozie/)
- 22/11/13 - upgraded to v.2.2.0 / added mermaid
- 12/04/2021 - added in Notes for non-technical docs / upgraded to v.2.0.0-beta.13
- 11/10/2021 - Updated the Docusaurus & NPM packages / Combined my old [awesome-david](/lists) repo into it for simplicity and rebuilt. 

#### 03/18/2021

Migrated this version from Gitbook because it wasn't playing nicely with Node.js v14 and it had a couple security vulnerabilities in the packages. Gitbook stop supporting the open source version likely for business reasons, so I migrated it all to ~~[https://docsify.js.org/](https://docsify.js.org/)~~ ... didn't do docsify because I can't generate static HTML which is what my DOM parser depends on to pull content elsewhere. Decided on using [https://docusaurus.io/](https://docusaurus.io/) instead. It required a bit of cleanup in the Markdown to do so. See: [https://davidawindham.com/til/help](https://davidawindham.com/til/help)

#### 05/02/2017  

While working on another project yesterday afternoon, I ran into set of documentation ([https://docs.feathersjs.com/](https://docs.feathersjs.com/)) that I spent a lot of time reading and will likely forget about sometime soon after I abandon using the library in other projects. Of course I stuffed a bookmark of the documentation into my quasi organized set of chrome bookmarks based on each project, but the fact that the documentation was hosted using [Gitbook](https://github.com/GitbookIO/gitbook), reminded me of a practice I've seen others do.

