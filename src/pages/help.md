---
title: Help
description: Because sometimes I forget to how to use the software
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Help

Because sometimes I forget how to drive the software I'm running.

---

### Todo

- Make all links absolute.  ( e.g. /docs/sass/ai ) While training the documents with OpenAI, I noticed that some of the link references were not absolute. 
- Create Github Actions to rebuild a Supabase index of the documents on every commit for the AI Assistant to use. 

---

### Log

```mermaid
gitGraph
    commit id: ".md files" tag: "v0.0.1"
    commit
    branch gitbook
    commit id: "mv to gitbook" tag: "v0.0.2"
    commit
    checkout main
    merge gitbook
    branch docusaurus
    checkout docusaurus
    commit id: "docusaurus"  tag: "v1"
    commit
    checkout main
    merge docusaurus
    checkout docusaurus
    commit id: "2"  tag: "v2.0"
    commit id: "3.5"  tag: "v3.5"
    commit id: "3.6.1"  tag: "v3.6"
    checkout main
    merge docusaurus
```

#### Repos

- https://code.davidawindham.com/david/til
- https://github.com/windhamdavid/til

### Docusaurus

[https://docusaurus.io/docs](https://docusaurus.io/docs)

```bash
npm install
npm run start
npm run build  
npm run serve
```

---

- **25/04/47** - added abcjs ^6.4.4 & react-piano ^3.1.3 for [/Notes/Music/Notation](/notes/music/abcjs)
- **25/01/23** - 3.6.3 -> 3.7.0
- **24/24/02** - 3.6.1 -> 3.6.3
- **24/11/17** - upgrades ( 3.5.2 👉🏼 3.6.1 ) all good 👍🏼
  - 3.6 switched to Rust 🦀 [rspack](https://rspack.dev), [SWC](https://swc.rs), [Lightning CSS](https://lightningcss.dev) for faster builds
- **24/09/02** - upgrades ( 3.4.0 👉🏼 3.5.2 ) all good 👍🏼
- **24/07/11** - upgrades ( 3.3.2 👉🏼 3.4.0 ) all good 👍🏼
- **24/05/15** - upgrades ( 3.1.1 👉🏼 3.3.2 ) all good 👍🏼

```sh
npm install @docusaurus/core@latest @docusaurus/plugin-content-blog@latest @docusaurus/preset-classic@latest @docusaurus/theme-mermaid@latest --save
```

**24/01/28** - upgrades ( 3.0.1 👉🏼 3.1.1 ) no overides. didn't have to reswizzle. Watch the letter casing, anchors, and relative URLs because the broken link checker has gotten more strict.

:::note

Watch the letter casing, anchors, and relative URLs because the broken link checker has gotten more strict.

:::

```sh
david@ovid🏛 :~/sites/daw_til(main⚡) » npm outdated
david@ovid🏛 :~/sites/daw_til(main⚡) » npm list    
daw-til-2@0.0.3 /Users/david/Sites/daw_til
├── @docusaurus/core@3.1.1
├── @docusaurus/plugin-content-blog@3.1.1
├── @docusaurus/preset-classic@3.1.1
├── @docusaurus/theme-mermaid@3.1.1
├── @mdx-js/mdx@3.0.0
├── @mdx-js/react@3.0.0
├── clsx@2.1.0
├── docusaurus-lunr-search@3.3.2
├── docusaurus-plugin-matomo@0.0.8
├── markprompt@0.1.7
├── plugin-image-zoom@1.1.0 (git+ssh://git@github.com/flexanalytics/plugin-image-zoom.git#8e1b866c79ed6d42cefc4c52f851f1dfd1d0c7de)
├── react-dom@18.2.0
├── react-player@2.14.1
└── react@18.2.0
```

**23/12/12** - 🔥needed a way to preface my `posts` and wanted to change the default width so I `swizzle`'d the `BlogListPage` and `BlogLayout` to widen it with `col--9`.

```sh
npm run swizzle @docusaurus/theme-classic BlogLayout -- --eject
npm run swizzle @docusaurus/theme-classic BlogListPage -- --eject
```

line 15 of `BlogLayout/index.js`

```js
  <main
    className={clsx('col', {
      //'col--7': hasSidebar,
      'col--9': hasSidebar,
      'col--9 col--offset-1': !hasSidebar,
    })}
    ...
  </main>
```

line 33 of `BlogListPage/index.js`

```js
    <BlogLayout sidebar={sidebar}>
      <h1>Posts</h1>
      <p>...</p>
      <hr/>
      <br/>
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
```



**23/11/27** - noticed my Lunr search was kicking JavaScript errors because I had `swizzle`'d it in a previous version and needed to `eject` it before the build. ( see github repo [comment](https://github.com/praveenn77/docusaurus-lunr-search/pull/124#issuecomment-1827933993) )

```sh
david@ovid🏛 :~/sites/daw_til(main○) » npm run swizzle docusaurus-lunr-search SearchBar -- --eject

> daw-til-2@0.0.3 swizzle
> docusaurus swizzle docusaurus-lunr-search SearchBar --eject

[WARNING] 
Swizzle action eject is unsafe to perform on SearchBar.
It is more likely to be affected by breaking changes in the future
If you want to swizzle it, use the `--danger` flag, or confirm that you understand the risks.
✔ Do you really want to swizzle this unsafe internal component? › YES: I know what I am doing!
[SUCCESS] 
Ejected SearchBar from docusaurus-lunr-search to 
- "daw_til/src/theme/SearchBar/DocSearch.js"
- "daw_til/src/theme/SearchBar/HighlightSearchResults.jsx"
- "daw_til/src/theme/SearchBar/algolia.css"
- "daw_til/src/theme/SearchBar/index.jsx"
- "daw_til/src/theme/SearchBar/lunar-search.js"
- "daw_til/src/theme/SearchBar/styles.css"
- "daw_til/src/theme/SearchBar/templates.js"
- "daw_til/src/theme/SearchBar/utils.js"
```

Also noticed that since it now uses the default Algolia search elements which includes dark mode, I had to change the styling on it in `/src/css/custom.css`.
```css
[data-theme='dark'] .ds-dropdown-menu {
  --ifm-background-color: #383a42;
    border-color: #535763;
}
```

#### v3.0.0

**23/11/12** - Docusaurus updated 2.4.3 👉🏼 3.0.0 and React 17.0.2 👉🏼 18.2.0

```bash
david@ovid🏛 :~/sites/daw_til(main○) » npm outdated 
Package                          Current  Wanted  Latest  Location                                      Depended by
@docusaurus/core                   2.4.3   3.0.0   3.0.0  node_modules/@docusaurus/core                 daw_til
@docusaurus/plugin-content-blog    2.4.3   3.0.0   3.0.0  node_modules/@docusaurus/plugin-content-blog  daw_til
@docusaurus/preset-classic         2.4.3   3.0.0   3.0.0  node_modules/@docusaurus/preset-classic       daw_til
@docusaurus/theme-mermaid          2.4.3   3.0.0   3.0.0  node_modules/@docusaurus/theme-mermaid        daw_til
@mdx-js/react                     1.6.22  1.6.22   3.0.0  node_modules/@mdx-js/react                    daw_til
clsx                               1.2.1   1.2.1   2.0.0  node_modules/clsx                             daw_til
docusaurus-lunr-search             3.0.0   3.3.0   3.3.0  node_modules/docusaurus-lunr-search           daw_til
react                             17.0.2  17.0.2  18.2.0  node_modules/react                            daw_til
react-dom                         17.0.2  17.0.2  18.2.0  node_modules/react-dom                        daw_til
```

:::danger

Docusaurus v3 now requires React 18 and Typescript 5

This introduced a bunch of breaking errors in the markdown formatting via the MDX formatting that are documented at:
- [https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3](https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3)
- [https://github.com/facebook/docusaurus/discussions/9312](https://github.com/facebook/docusaurus/discussions/9312). 

:::

Went in and cleaned up the markdown formatting - mostly the tags on links and indented code highlighting formatting.The build process was also failing due to some errors defining text wrapped in `{}` 👇🏼

```bash
Error: Failed to compile due to Webpack errors.
  Error: Docusaurus server-side rendering could not render static page with path /docs/editors/git because of error: stash_number is not defined
  Error: Docusaurus server-side rendering could not render static page with path /docs/lang/Rust because of error: url is not defined
  Error: Docusaurus server-side rendering could not render static page with path /docs/shell/zsh because of error: bz2 is not defined
  Error: Docusaurus server-side rendering could not render static page with path /lists/tweets_follow because of error: SoftwareHardwareDeveloperDesignerMakerInventor is not defined
      at /Users/david/Sites/daw_til/node_modules/@docusaurus/core/lib/webpack/utils.js:207:24
      at /Users/david/Sites/daw_til/node_modules/webpack/lib/MultiCompiler.js:554:14
      at processQueueWorker (/Users/david/Sites/daw_til/node_modules/webpack/lib/MultiCompiler.js:491:6)
      at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
}

[INFO] Docusaurus version: 3.0.0
Node version: v18.12.1
```

```
david@ovid🏛 :~/sites/daw_til(main⚡) » npm list     
daw-til-2@0.0.1 /Users/david/Sites/daw_til
├── @docusaurus/core@3.0.0
├── @docusaurus/plugin-content-blog@3.0.0
├── @docusaurus/preset-classic@3.0.0
├── @docusaurus/theme-mermaid@3.0.0
├── @mdx-js/mdx@3.0.0
├── @mdx-js/react@3.0.0
├── clsx@2.0.0
├── docusaurus-lunr-search@3.3.0
├── docusaurus-plugin-matomo@0.0.6
├── markprompt@0.1.7
├── plugin-image-zoom@1.1.0 (git+ssh://git@github.com/flexanalytics/plugin-image-zoom.git#8e1b866c79ed6d42cefc4c52f851f1dfd1d0c7de)
├── react-dom@18.2.0
├── react-player@2.13.0
└── react@18.2.0
```

**23/09/23** - docusaurus updated -  2.4.1 👉🏼 2.4.3 -> left react at 17 for now, but updated the react player to 2.13. 

```bash
david@ovid🏛 :~/sites/daw_til(main⚡) » npm list     
daw-til-2@0.0.1 /Users/david/Sites/daw_til
├── @docusaurus/core@2.4.3
├── @docusaurus/plugin-content-blog@2.4.3
├── @docusaurus/preset-classic@2.4.3
├── @docusaurus/theme-mermaid@2.4.3
├── @mdx-js/react@1.6.22
├── clsx@1.2.1
├── docusaurus-lunr-search@3.0.0
├── docusaurus-plugin-matomo@0.0.6
├── markprompt@0.1.7
├── plugin-image-zoom@1.1.0
├── react-dom@17.0.2
├── react-player@2.13.0
└── react@17.0.2

david@ovid🏛 :~/sites/daw_til(main⚡) » npm outdated
Package        Current  Wanted  Latest  Location                    Depended by
@mdx-js/react   1.6.22  1.6.22   2.3.0  node_modules/@mdx-js/react  daw_til
clsx             1.2.1   1.2.1   2.0.0  node_modules/clsx           daw_til
react           17.0.2  17.0.2  18.2.0  node_modules/react          daw_til
react-dom       17.0.2  17.0.2  18.2.0  node_modules/react-dom      daw_til
```

**23/08/20** - added an image zoom plugin from [https://github.com/flexanalytics/plugin-image-zoom](https://github.com/flexanalytics/plugin-image-zoom) because I didn't like linking to the images or having them constrained between the sidebars.

**23/08/18** - updated notes structure to include some personal documents like /documents/family/mom/mom.md which is actually a directory outside of the site build on my computer. I ignore them in the builds and repos.  The reason for this is that the more I use machine learning against my own documents, the more the information becomes valuable in vector searches. Because of that, I'm rethinking the way I even organize documents on my computer. For instance this doc when I'm talking to my mom on the phone about whatever, I can reference references I've previously made.


**23/05/24** - docusaurus updated -  2.4.0 👉🏼 2.4.1

```bash
david@ovid🏛 :~/sites/daw_til(main⚡) » npm list     
daw-til-2@0.0.1 /Users/david/Sites/daw_til
├── @docusaurus/core@2.4.1
├── @docusaurus/plugin-content-blog@2.4.1
├── @docusaurus/preset-classic@2.4.1
├── @docusaurus/theme-mermaid@2.4.1
├── @mdx-js/react@1.6.22
├── clsx@1.2.1
├── docusaurus-lunr-search@2.3.2
├── docusaurus-plugin-matomo@0.0.6
├── markprompt@0.1.7
├── react-dom@17.0.2
├── react-player@2.12.0
└── react@17.0.2

```

**23/05/09**

- added react-player
- added markprompt 
```bash
david@ovid🏛 :~/sites/daw_til(main⚡) » npm list     
daw-til-2@0.0.1 /Users/david/Sites/daw_til
├── @docusaurus/core@2.4.0
├── @docusaurus/plugin-content-blog@2.4.0
├── @docusaurus/preset-classic@2.4.0
├── @docusaurus/theme-mermaid@2.4.0
├── @mdx-js/react@1.6.22
├── clsx@1.2.1
├── docusaurus-lunr-search@2.3.2
├── docusaurus-plugin-matomo@0.0.6
├── markprompt@0.1.7
├── react-dom@17.0.2
├── react-player@2.12.0
└── react@17.0.2
```

**23/03/24**

- npm up doc/core 2.3.1 -> 2.4.0
```bash
# still have issues with mdx-js/react@latest - holding it in place
david@ovid🏛 :~/sites/daw_til(main⚡) » npm list     
daw-til-2@0.0.1 /Users/david/Sites/daw_til
├── @docusaurus/core@2.4.0
├── @docusaurus/plugin-content-blog@2.4.0
├── @docusaurus/preset-classic@2.4.0
├── @docusaurus/theme-mermaid@2.4.0
├── @mdx-js/react@1.6.22
├── clsx@1.2.1
├── docusaurus-lunr-search@2.3.2
├── docusaurus-plugin-matomo@0.0.6
├── react-dom@17.0.2
└── react@17.0.2
```


**22/01/31**

- upgraded to docusaurus v2.3.0
```shell
david@ovid🏛 :~/sites/daw_til(master⚡) » npm list     
daw-til-2@0.0.1 /Users/david/Sites/daw_til
├── @docusaurus/core@2.3.0
├── @docusaurus/plugin-content-blog@2.3.0
├── @docusaurus/preset-classic@2.3.0
├── @docusaurus/theme-mermaid@2.3.0
├── @mdx-js/react@1.6.22
├── clsx@1.2.1
├── docusaurus-lunr-search@2.3.2
├── docusaurus-plugin-matomo@0.0.6
├── react-dom@17.0.2
└── react@17.0.2
```

**22/11/13**

- added a Reader page
- move branch master -> main for Git
- addped mermaid and created overview graph
- upgraded to v.2.2.0

```shell
david@ovid🏛 :~/sites/daw_til(master⚡) » npm outdated                                          127 ↵
Package                           Current  Wanted  Latest  Location                                 Depended by
@docusaurus/core            2.0.0-beta.15   2.2.0   2.2.0  node_modules/@docusaurus/core            daw_til
@docusaurus/preset-classic  2.0.0-beta.15   2.2.0   2.2.0  node_modules/@docusaurus/preset-classic  daw_til
@mdx-js/react                      1.6.22  1.6.22   2.1.5  node_modules/@mdx-js/react               daw_til
clsx                                1.1.1   1.2.1   1.2.1  node_modules/clsx                        daw_til
docusaurus-lunr-search             2.1.15   2.3.1   2.3.1  node_modules/docusaurus-lunr-search      daw_til
react                              17.0.2  17.0.2  18.2.0  node_modules/react                       daw_til
react-dom                          17.0.2  17.0.2  18.2.0  node_modules/react-dom                   daw_til
```

- colorMode.switchConfig is deprecated #[6771](https://github.com/facebook/docusaurus/pull/6771) rm'd -

```js
      switchConfig: {
        darkIcon: '\u2800',
        darkIconStyle: {
          marginLeft: '1px',
        },
        lightIcon: '\u2800',
        lightIconStyle: {
          marginLeft: '1px',
        },
      },
```

- lunr-search broken  ( see: https://github.com/praveenn77/docusaurus-lunr-search/pull/91 ) made the following change in the plugin to fix 

```diff
src/theme/SearchBar/lunar-search.js
29  - url: this.baseUrl !== '/' || doc.url.charAt(0) !== '/' ? this.baseUrl + doc.url : doc.url,
    + url: doc.url,
```  

**12/04/2021**

- added in [Notes](/notes) for non-technical docs 
- upgraded to v.2.0.0-beta.13

**11/10/2021**
- Updated the Docusaurus & NPM packages. 
- Combined my old [awesome-david](/lists) repo into it for simplicity and rebuilt.  

**03/18/2021**

Migrated this version from Gitbook because it wasn't playing nicely with Node.js v14 and it had a couple security vulnerabilities in the packages. Gitbook stop supporting the open source version likely for business reasons, so I migrated it all to ~~[https://docsify.js.org/](https://docsify.js.org/)~~... didn't do docsify because I can't generate static HTML which is what my DOM parser depends on to pull content elsewhere. Decided on using [https://docusaurus.io/](https://docusaurus.io/) instead. It required a bit of cleanup in the Markdown to do so. See: [https://davidawindham.com/til/help](/help)

**05/02/2017**  

While working on another project yesterday afternoon, I ran into set of documentation ([https://docs.feathersjs.com/](https://docs.feathersjs.com/)) that I spent a lot of time reading and will likely forget about sometime soon after I abandon using the library in other projects. Of course I stuffed a bookmark of the documentation into my quasi organized set of chrome bookmarks based on each project, but the fact that the documentation was hosted using [Gitbook](https://github.com/GitbookIO/gitbook), reminded me of a practice I've seen others do.

**03/18/21** - **Gotta Migrate** my TIL. Just noticed that gitbook doesn't play nicely with Node.js v14.

```bash
david@macs🐶:~/sites/daw_til(master⚡) » gitbook serve --no-live
/Users/david/.nvm/versions/node/v14.15.4/lib/node_modules/gitbook-cli/node_modules/npm/node_modules/graceful-fs/polyfills.js:287
      if (cb) cb.apply(this, arguments)
TypeError: cb.apply is not a function
    at /Users/david/.nvm/versions/node/v14.15.4/lib/node_modules/gitbook-cli/node_modules/npm/node_modules/graceful-fs/polyfills.js:287:18
    at FSReqCallback.oncomplete (fs.js:184:5)
david@macs🐶:~/sites/daw_til(master⚡) » node -v                                                                                        
v14.15.4
david@macs🐶:~/sites/daw_til(master⚡) » nvm ls
        v6.10.3
        v6.11.2
         v7.6.0
         v8.4.0
        v8.11.4
        v8.12.0
       v10.16.3
->     v14.15.4
         system
default -> 14 (-> v14.15.4)
unstable -> N/A (default)
node -> stable (-> v14.15.4) (default)
stable -> 14.15 (-> v14.15.4) (default)
iojs -> iojs- (-> system) (default)
lts/* -> lts/fermium (-> v14.15.4)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.23.2 (-> N/A)
lts/erbium -> v12.20.1 (-> N/A)
lts/fermium -> v14.15.4
david@macs🐶:~/sites/daw_til(master⚡) » nvm use 10.16.3
Now using node v10.16.3 (npm v7.5.4)
david@macs🐶:~/sites/daw_til(master⚡) » gitbook serve --no-live
info: 18 plugins are installed...
```

**3/14/20** Ran into a couple errors with Gitbook and noticed that they are deprecating the open source version. Will need to migrate Gitbook to Docsify:
    * [https://github.com/GitbookIO/gitbook](https://github.com/GitbookIO/gitbook)
    * [https://github.com/docsifyjs/docsify/](https://github.com/docsifyjs/docsify/)
    * the current [Gitbook Search Plugin](https://github.com/lwdgit/gitbook-plugin-search-plus) key to the current setup and the docsify search is good.
    * ran package upgrades before migration.  
    * docsify doesn't support all prism languages - [https://docsify.js.org/#/language-highlight?id=language-highlight](https://docsify.js.org/#/language-highlight?id=language-highlight)
    * [gitbook-prism-plugin](https://github.com/gaearon/gitbook-plugin-prism) has an outdated version of [prism](https://www.npmjs.com/package/prismjs).
    * forked pkg to [https://www.npmjs.com/package/gitbook-plugin-prism-dw](https://www.npmjs.com/package/gitbook-plugin-prism-dw)
    * add "gitbook-plugin-prism-dw": "^2.4.1" to pkg.json

#### migrate
```bash
# install docsify globally
npm  i docsify-cli -g
# copy existing repo
mv til/ til_old
cp /til_old /til
docsify init til/
# Rename summary.md to _sidebar.md
mv summary.md _sidebar.md
#add loadSidebar: true to window.$docsify in index.html
docsify serve
```
#### migrate notes:

```js
{
  "name": "windhamdavid_til",
  "version": "1.0.0",
  "description": "my til gitbook",
  "dependencies": {
    "gitbook": "^3.2.3",
    "gitbook-plugin-ace": "^0.3.2",
    "gitbook-plugin-advanced-emoji": "^0.2.2",
    "gitbook-plugin-anchors": "^0.7.1",
    "gitbook-plugin-github-embed": "^1.3.1",
    "gitbook-plugin-piwik": "^0.2.1",
    "gitbook-plugin-search-plus": "^1.0.4-alpha-3",
    "gitbook-plugin-toggle-chapters": "0.0.3",
    "gitbook-plugin-toggle-headers": "^0.1.0",
    "gitbook-plugin-video": "0.0.3"
  },
  "devDependencies": {},
  "repository": {
    "type": "git",
    "url": "https://github.com/windhamdavid/til.git"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "David A. Windham",
  "private": true,
  "license": "UNLICENSED",
  "homepage": "https://davidawindham.com"
}
```

```sh
david@macs:~/sites/til(master⚡) » npm outdated                                                          130 ↵
Package                      Current         Wanted         Latest  Location
gitbook-plugin-search-plus     1.0.3  1.0.4-alpha-3  1.0.4-alpha-3  windhamdavid_til
gitbook                        3.2.2          3.2.3          2.6.9  windhamdavid_til
gitbook-plugin-github-embed    1.1.2          1.3.1          1.3.1  windhamdavid_til

```


---


### Admonitions

:::note
Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

### Mermaid

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

```mermaid
  graph TD
    A(Does your flowchart have arrows?) --> B[No]
    A --> C[yes]
    B --> D(Add them already)
    C --> E(Yay, what a great flowchart!)
    D -.->|you can even add text to them| A
```
---
### Creating Docs
Create a Markdown file in /docs/doc.md  
Add to sidebars.js

### Meta Data using Front Matter
```bash
---
id: my-doc
title: My document title
description: My document description
sidebar_label: My doc
---

Markdown content
```
### Markdown links
url paths or relative file paths
```bash
[Create a page](/create-a-page)
[Create a page](./create-a-page.md)
```

---





### Gitbook:
[https://github.com/GitbookIO/gitbook](https://github.com/GitbookIO/gitbook)  
[https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md)  
[https://toolchain.gitbook.com/](https://toolchain.gitbook.com/)
```
npm install -g gitbook-cli

cd sites/til
gitbook help
gitbook build .
gitbook serve .
http://localhost:4000/
```
run for production without livereload.js
```
gitbook serve --no-live
```

### Markdown:

[Markdown Cheatsheet from Github](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
[Markdown Cheatsheet](https://gist.github.com/jonschlinkert/5854601)
#### Headers

```markdown
# h1
## h2
### h3
#### h4
##### h5
###### h6
```

```markdown
Header 1
========
```

```markdown
Header 2
--------
```

#### Emphasis

```markdown
*italic*
_italic_
```

```markdown
**bold**
__bold__
```

```markdown
***bold italic***
___bold italic___
```

```markdown
~~strikethrough~~
```

```markdown
`code`
```

#### Lists

```markdown
* Item 1
* Item 2
```

```markdown
- Item 1
- Item 2
```

```markdown
- [ ] Checkbox off
- [x] Checkbox on
```

```markdown
1. Item 1
2. Item 2
```

#### Links

```markdown
[link](http://google.com)
```

```markdown
[link][google]
[google]: http://google.com
```

```markdown
<http://google.com>
```

#### Images

```markdown
![Image alt text](/path/to/img.jpg)
![Image alt text](/path/to/img.jpg "title")
![Image alt text][img]
```

```markdown
[img]: http://foo.com/img.jpg
```

#### Code

```
    4 space indent
    makes a code block
```

~~~markdown
```
code fences
```
~~~


~~~markdown
```js
codeFences.withLanguage()
```
~~~

#### Blockquotes

```markdown
> This is
> a blockquote
>
> > Nested
> > Blockquote
```

#### Horizontal line

```markdown
----
```

```markdown
****
```

#### Tables

```markdown
| Column 1 Heading | Column 2 Heading |
| ---------------- | ---------------- |
| Some content     | Other content    |
```

```markdown
Column 1 Heading | Column 2 Heading
--- | ---
Some content | Other content
```

### Code:
#### Piwik Plugin
[https://github.com/emmanuel-keller/gitbook-plugin-piwik](https://github.com/emmanuel-keller/gitbook-plugin-piwik)


use the language identifier after the back ticks for the code block in markdown  

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>
<script>
    $(document).ready(function(){
        var something = 5;
        if (something == 5){
            console.log('woohoo');
        }
    });
</script>
<section>
    <p>Hello world</p>
</section>
```

#### Github
[https://github.com/visallo/gitbook-plugin-github-embed](https://github.com/visallo/gitbook-plugin-github-embed)

#### Toggle Chapters
[https://github.com/poojan/gitbook-plugin-toggle-chapters](https://github.com/poojan/gitbook-plugin-toggle-chapters)  
[https://github.com/hypertrack/gitbook-plugin-toggle-headers](https://github.com/hypertrack/gitbook-plugin-toggle-headers)

### Media:
#### Images:
```
![tabs](./img/til_tabs.png)
```  

#### Add video from Youtube or Vimeo
```
{% video %}https://www.domain.com/video_url{% endvideo %}

```
#### Add video from source file
```
//add url using html5
<video width="720" height="480" controls src="/media/wha.mp4" type="video/mp4"></video>
```

###HTML
adding published date with microformat
[https://www.w3.org/TR/NOTE-datetime](https://www.w3.org/TR/NOTE-datetime)
```
<time class="updated" datetime="2016-11-30T11:16:16+00:00" itemprop="datePublished">11/30/2016</time>
```


### Emojis
People

| :bowtie: `:bowtie:` | :smile: `:smile:` | :laughing: `:laughing:` |
|---|---|---|
| :blush: `:blush:` | :smiley: `:smiley:` | :relaxed: `:relaxed:` |
| :smirk: `:smirk:` | :heart_eyes: `:heart_eyes:` | :kissing_heart: `:kissing_heart:` |
| :kissing_closed_eyes: `:kissing_closed_eyes:` | :flushed: `:flushed:` | :relieved: `:relieved:` |
| :satisfied: `:satisfied:` | :grin: `:grin:` | :wink: `:wink:` |
| :stuck_out_tongue_winking_eye: `:stuck_out_tongue_winking_eye:` | :stuck_out_tongue_closed_eyes: `:stuck_out_tongue_closed_eyes:` | :grinning: `:grinning:` |
| :kissing: `:kissing:` | :kissing_smiling_eyes: `:kissing_smiling_eyes:` | :stuck_out_tongue: `:stuck_out_tongue:` |
| :sleeping: `:sleeping:` | :worried: `:worried:` | :frowning: `:frowning:` |
| :anguished: `:anguished:` | :open_mouth: `:open_mouth:` | :grimacing: `:grimacing:` |
| :confused: `:confused:` | :hushed: `:hushed:` | :expressionless: `:expressionless:` |
| :unamused: `:unamused:` | :sweat_smile: `:sweat_smile:` | :sweat: `:sweat:` |
| :disappointed_relieved: `:disappointed_relieved:` | :weary: `:weary:` | :pensive: `:pensive:` |
| :disappointed: `:disappointed:` | :confounded: `:confounded:` | :fearful: `:fearful:` |
| :cold_sweat: `:cold_sweat:` | :persevere: `:persevere:` | :cry: `:cry:` |
| :sob: `:sob:` | :joy: `:joy:` | :astonished: `:astonished:` |
| :scream: `:scream:` | :neckbeard: `:neckbeard:` | :tired_face: `:tired_face:` |
| :angry: `:angry:` | :rage: `:rage:` | :triumph: `:triumph:` |
| :sleepy: `:sleepy:` | :yum: `:yum:` | :mask: `:mask:` |
| :sunglasses: `:sunglasses:` | :dizzy_face: `:dizzy_face:` | :imp: `:imp:` |
| :smiling_imp: `:smiling_imp:` | :neutral_face: `:neutral_face:` | :no_mouth: `:no_mouth:` |
| :innocent: `:innocent:` | :alien: `:alien:` | :yellow_heart: `:yellow_heart:` |
| :blue_heart: `:blue_heart:` | :purple_heart: `:purple_heart:` | :heart: `:heart:` |
| :green_heart: `:green_heart:` | :broken_heart: `:broken_heart:` | :heartbeat: `:heartbeat:` |
| :heartpulse: `:heartpulse:` | :two_hearts: `:two_hearts:` | :revolving_hearts: `:revolving_hearts:` |
| :cupid: `:cupid:` | :sparkling_heart: `:sparkling_heart:` | :sparkles: `:sparkles:` |
| :star: `:star:` | :star2: `:star2:` | :dizzy: `:dizzy:` |
| :boom: `:boom:` | :collision: `:collision:` | :anger: `:anger:` |
| :exclamation: `:exclamation:` | :question: `:question:` | :grey_exclamation: `:grey_exclamation:` |
| :grey_question: `:grey_question:` | :zzz: `:zzz:` | :dash: `:dash:` |
| :sweat_drops: `:sweat_drops:` | :notes: `:notes:` | :musical_note: `:musical_note:` |
| :fire: `:fire:` | :hankey: `:hankey:` | :poop: `:poop:` |
| :shit: `:shit:` | :+1: `:+1:` | :thumbsup: `:thumbsup:` |
| :-1: `:-1:` | :thumbsdown: `:thumbsdown:` | :ok_hand: `:ok_hand:` |
| :punch: `:punch:` | :facepunch: `:facepunch:` | :fist: `:fist:` |
| :v: `:v:` | :wave: `:wave:` | :hand: `:hand:` |
| :raised_hand: `:raised_hand:` | :open_hands: `:open_hands:` | :point_up: `:point_up:` |
| :point_down: `:point_down:` | :point_left: `:point_left:` | :point_right: `:point_right:` |
| :raised_hands: `:raised_hands:` | :pray: `:pray:` | :point_up_2: `:point_up_2:` |
| :clap: `:clap:` | :muscle: `:muscle:` | :metal: `:metal:` |
| :fu: `:fu:` | :walking: `:walking:` | :runner: `:runner:` |
| :running: `:running:` | :couple: `:couple:` | :family: `:family:` |
| :two_men_holding_hands: `:two_men_holding_hands:` | :two_women_holding_hands: `:two_women_holding_hands:` | :dancer: `:dancer:` |
| :dancers: `:dancers:` | :ok_woman: `:ok_woman:` | :no_good: `:no_good:` |
| :information_desk_person: `:information_desk_person:` | :raising_hand: `:raising_hand:` | :bride_with_veil: `:bride_with_veil:` |
| :person_with_pouting_face: `:person_with_pouting_face:` | :person_frowning: `:person_frowning:` | :bow: `:bow:` |
| :couplekiss: `:couplekiss:` | :couple_with_heart: `:couple_with_heart:` | :massage: `:massage:` |
| :haircut: `:haircut:` | :nail_care: `:nail_care:` | :boy: `:boy:` |
| :girl: `:girl:` | :woman: `:woman:` | :man: `:man:` |
| :baby: `:baby:` | :older_woman: `:older_woman:` | :older_man: `:older_man:` |
| :person_with_blond_hair: `:person_with_blond_hair:` | :man_with_gua_pi_mao: `:man_with_gua_pi_mao:` | :man_with_turban: `:man_with_turban:` |
| :construction_worker: `:construction_worker:` | :cop: `:cop:` | :angel: `:angel:` |
| :princess: `:princess:` | :smiley_cat: `:smiley_cat:` | :smile_cat: `:smile_cat:` |
| :heart_eyes_cat: `:heart_eyes_cat:` | :kissing_cat: `:kissing_cat:` | :smirk_cat: `:smirk_cat:` |
| :scream_cat: `:scream_cat:` | :crying_cat_face: `:crying_cat_face:` | :joy_cat: `:joy_cat:` |
| :pouting_cat: `:pouting_cat:` | :japanese_ogre: `:japanese_ogre:` | :japanese_goblin: `:japanese_goblin:` |
| :see_no_evil: `:see_no_evil:` | :hear_no_evil: `:hear_no_evil:` | :speak_no_evil: `:speak_no_evil:` |
| :guardsman: `:guardsman:` | :skull: `:skull:` | :feet: `:feet:` |
| :lips: `:lips:` | :kiss: `:kiss:` | :droplet: `:droplet:` |
| :ear: `:ear:` | :eyes: `:eyes:` | :nose: `:nose:` |
| :tongue: `:tongue:` | :love_letter: `:love_letter:` | :bust_in_silhouette: `:bust_in_silhouette:` |
| :busts_in_silhouette: `:busts_in_silhouette:` | :speech_balloon: `:speech_balloon:` | :thought_balloon: `:thought_balloon:` |
| :feelsgood: `:feelsgood:` | :finnadie: `:finnadie:` | :goberserk: `:goberserk:` |
| :godmode: `:godmode:` | :hurtrealbad: `:hurtrealbad:` | :rage1: `:rage1:` |
| :rage2: `:rage2:` | :rage3: `:rage3:` | :rage4: `:rage4:` |
| :suspect: `:suspect:` | :trollface: `:trollface:` | 

Nature

| :sunny: `:sunny:` | :umbrella: `:umbrella:` | :cloud: `:cloud:` |
|---|---|---|
| :snowflake: `:snowflake:` | :snowman: `:snowman:` | :zap: `:zap:` |
| :cyclone: `:cyclone:` | :foggy: `:foggy:` | :ocean: `:ocean:` |
| :cat: `:cat:` | :dog: `:dog:` | :mouse: `:mouse:` |
| :hamster: `:hamster:` | :rabbit: `:rabbit:` | :wolf: `:wolf:` |
| :frog: `:frog:` | :tiger: `:tiger:` | :koala: `:koala:` |
| :bear: `:bear:` | :pig: `:pig:` | :pig_nose: `:pig_nose:` |
| :cow: `:cow:` | :boar: `:boar:` | :monkey_face: `:monkey_face:` |
| :monkey: `:monkey:` | :horse: `:horse:` | :racehorse: `:racehorse:` |
| :camel: `:camel:` | :sheep: `:sheep:` | :elephant: `:elephant:` |
| :panda_face: `:panda_face:` | :snake: `:snake:` | :bird: `:bird:` |
| :baby_chick: `:baby_chick:` | :hatched_chick: `:hatched_chick:` | :hatching_chick: `:hatching_chick:` |
| :chicken: `:chicken:` | :penguin: `:penguin:` | :turtle: `:turtle:` |
| :bug: `:bug:` | :honeybee: `:honeybee:` | :ant: `:ant:` |
| :beetle: `:beetle:` | :snail: `:snail:` | :octopus: `:octopus:` |
| :tropical_fish: `:tropical_fish:` | :fish: `:fish:` | :whale: `:whale:` |
| :whale2: `:whale2:` | :dolphin: `:dolphin:` | :cow2: `:cow2:` |
| :ram: `:ram:` | :rat: `:rat:` | :water_buffalo: `:water_buffalo:` |
| :tiger2: `:tiger2:` | :rabbit2: `:rabbit2:` | :dragon: `:dragon:` |
| :goat: `:goat:` | :rooster: `:rooster:` | :dog2: `:dog2:` |
| :pig2: `:pig2:` | :mouse2: `:mouse2:` | :ox: `:ox:` |
| :dragon_face: `:dragon_face:` | :blowfish: `:blowfish:` | :crocodile: `:crocodile:` |
| :dromedary_camel: `:dromedary_camel:` | :leopard: `:leopard:` | :cat2: `:cat2:` |
| :poodle: `:poodle:` | :paw_prints: `:paw_prints:` | :bouquet: `:bouquet:` |
| :cherry_blossom: `:cherry_blossom:` | :tulip: `:tulip:` | :four_leaf_clover: `:four_leaf_clover:` |
| :rose: `:rose:` | :sunflower: `:sunflower:` | :hibiscus: `:hibiscus:` |
| :maple_leaf: `:maple_leaf:` | :leaves: `:leaves:` | :fallen_leaf: `:fallen_leaf:` |
| :herb: `:herb:` | :mushroom: `:mushroom:` | :cactus: `:cactus:` |
| :palm_tree: `:palm_tree:` | :evergreen_tree: `:evergreen_tree:` | :deciduous_tree: `:deciduous_tree:` |
| :chestnut: `:chestnut:` | :seedling: `:seedling:` | :blossom: `:blossom:` |
| :ear_of_rice: `:ear_of_rice:` | :shell: `:shell:` | :globe_with_meridians: `:globe_with_meridians:` |
| :sun_with_face: `:sun_with_face:` | :full_moon_with_face: `:full_moon_with_face:` | :new_moon_with_face: `:new_moon_with_face:` |
| :new_moon: `:new_moon:` | :waxing_crescent_moon: `:waxing_crescent_moon:` | :first_quarter_moon: `:first_quarter_moon:` |
| :waxing_gibbous_moon: `:waxing_gibbous_moon:` | :full_moon: `:full_moon:` | :waning_gibbous_moon: `:waning_gibbous_moon:` |
| :last_quarter_moon: `:last_quarter_moon:` | :waning_crescent_moon: `:waning_crescent_moon:` | :last_quarter_moon_with_face: `:last_quarter_moon_with_face:` |
| :first_quarter_moon_with_face: `:first_quarter_moon_with_face:` | :moon: `:moon:` | :earth_africa: `:earth_africa:` |
| :earth_americas: `:earth_americas:` | :earth_asia: `:earth_asia:` | :volcano: `:volcano:` |
| :milky_way: `:milky_way:` | :partly_sunny: `:partly_sunny:` | :octocat: `:octocat:` |
| :squirrel: `:squirrel:` |

Objects

| :bamboo: `:bamboo:` | :gift_heart: `:gift_heart:` | :dolls: `:dolls:` |
|---|---|---|
| :school_satchel: `:school_satchel:` | :mortar_board: `:mortar_board:` | :flags: `:flags:` |
| :fireworks: `:fireworks:` | :sparkler: `:sparkler:` | :wind_chime: `:wind_chime:` |
| :rice_scene: `:rice_scene:` | :jack_o_lantern: `:jack_o_lantern:` | :ghost: `:ghost:` |
| :santa: `:santa:` | :christmas_tree: `:christmas_tree:` | :gift: `:gift:` |
| :bell: `:bell:` | :no_bell: `:no_bell:` | :tanabata_tree: `:tanabata_tree:` |
| :tada: `:tada:` | :confetti_ball: `:confetti_ball:` | :balloon: `:balloon:` |
| :crystal_ball: `:crystal_ball:` | :cd: `:cd:` | :dvd: `:dvd:` |
| :floppy_disk: `:floppy_disk:` | :camera: `:camera:` | :video_camera: `:video_camera:` |
| :movie_camera: `:movie_camera:` | :computer: `:computer:` | :tv: `:tv:` |
| :iphone: `:iphone:` | :phone: `:phone:` | :telephone: `:telephone:` |
| :telephone_receiver: `:telephone_receiver:` | :pager: `:pager:` | :fax: `:fax:` |
| :minidisc: `:minidisc:` | :vhs: `:vhs:` | :sound: `:sound:` |
| :speaker: `:speaker:` | :mute: `:mute:` | :loudspeaker: `:loudspeaker:` |
| :mega: `:mega:` | :hourglass: `:hourglass:` | :hourglass_flowing_sand: `:hourglass_flowing_sand:` |
| :alarm_clock: `:alarm_clock:` | :watch: `:watch:` | :radio: `:radio:` |
| :satellite: `:satellite:` | :loop: `:loop:` | :mag: `:mag:` |
| :mag_right: `:mag_right:` | :unlock: `:unlock:` | :lock: `:lock:` |
| :lock_with_ink_pen: `:lock_with_ink_pen:` | :closed_lock_with_key: `:closed_lock_with_key:` | :key: `:key:` |
| :bulb: `:bulb:` | :flashlight: `:flashlight:` | :high_brightness: `:high_brightness:` |
| :low_brightness: `:low_brightness:` | :electric_plug: `:electric_plug:` | :battery: `:battery:` |
| :calling: `:calling:` | :email: `:email:` | :mailbox: `:mailbox:` |
| :postbox: `:postbox:` | :bath: `:bath:` | :bathtub: `:bathtub:` |
| :shower: `:shower:` | :toilet: `:toilet:` | :wrench: `:wrench:` |
| :nut_and_bolt: `:nut_and_bolt:` | :hammer: `:hammer:` | :seat: `:seat:` |
| :moneybag: `:moneybag:` | :yen: `:yen:` | :dollar: `:dollar:` |
| :pound: `:pound:` | :euro: `:euro:` | :credit_card: `:credit_card:` |
| :money_with_wings: `:money_with_wings:` | :e-mail: `:e-mail:` | :inbox_tray: `:inbox_tray:` |
| :outbox_tray: `:outbox_tray:` | :envelope: `:envelope:` | :incoming_envelope: `:incoming_envelope:` |
| :postal_horn: `:postal_horn:` | :mailbox_closed: `:mailbox_closed:` | :mailbox_with_mail: `:mailbox_with_mail:` |
| :mailbox_with_no_mail: `:mailbox_with_no_mail:` | :door: `:door:` | :smoking: `:smoking:` |
| :bomb: `:bomb:` | :gun: `:gun:` | :hocho: `:hocho:` |
| :pill: `:pill:` | :syringe: `:syringe:` | :page_facing_up: `:page_facing_up:` |
| :page_with_curl: `:page_with_curl:` | :bookmark_tabs: `:bookmark_tabs:` | :bar_chart: `:bar_chart:` |
| :chart_with_upwards_trend: `:chart_with_upwards_trend:` | :chart_with_downwards_trend: `:chart_with_downwards_trend:` | :scroll: `:scroll:` |
| :clipboard: `:clipboard:` | :calendar: `:calendar:` | :date: `:date:` |
| :card_index: `:card_index:` | :file_folder: `:file_folder:` | :open_file_folder: `:open_file_folder:` |
| :scissors: `:scissors:` | :pushpin: `:pushpin:` | :paperclip: `:paperclip:` |
| :black_nib: `:black_nib:` | :pencil2: `:pencil2:` | :straight_ruler: `:straight_ruler:` |
| :triangular_ruler: `:triangular_ruler:` | :closed_book: `:closed_book:` | :green_book: `:green_book:` |
| :blue_book: `:blue_book:` | :orange_book: `:orange_book:` | :notebook: `:notebook:` |
| :notebook_with_decorative_cover: `:notebook_with_decorative_cover:` | :ledger: `:ledger:` | :books: `:books:` |
| :bookmark: `:bookmark:` | :name_badge: `:name_badge:` | :microscope: `:microscope:` |
| :telescope: `:telescope:` | :newspaper: `:newspaper:` | :football: `:football:` |
| :basketball: `:basketball:` | :soccer: `:soccer:` | :baseball: `:baseball:` |
| :tennis: `:tennis:` | :8ball: `:8ball:` | :rugby_football: `:rugby_football:` |
| :bowling: `:bowling:` | :golf: `:golf:` | :mountain_bicyclist: `:mountain_bicyclist:` |
| :bicyclist: `:bicyclist:` | :horse_racing: `:horse_racing:` | :snowboarder: `:snowboarder:` |
| :swimmer: `:swimmer:` | :surfer: `:surfer:` | :ski: `:ski:` |
| :spades: `:spades:` | :hearts: `:hearts:` | :clubs: `:clubs:` |
| :diamonds: `:diamonds:` | :gem: `:gem:` | :ring: `:ring:` |
| :trophy: `:trophy:` | :musical_score: `:musical_score:` | :musical_keyboard: `:musical_keyboard:` |
| :violin: `:violin:` | :space_invader: `:space_invader:` | :video_game: `:video_game:` |
| :black_joker: `:black_joker:` | :flower_playing_cards: `:flower_playing_cards:` | :game_die: `:game_die:` |
| :dart: `:dart:` | :mahjong: `:mahjong:` | :clapper: `:clapper:` |
| :memo: `:memo:` | :pencil: `:pencil:` | :book: `:book:` |
| :art: `:art:` | :microphone: `:microphone:` | :headphones: `:headphones:` |
| :trumpet: `:trumpet:` | :saxophone: `:saxophone:` | :guitar: `:guitar:` |
| :shoe: `:shoe:` | :sandal: `:sandal:` | :high_heel: `:high_heel:` |
| :lipstick: `:lipstick:` | :boot: `:boot:` | :shirt: `:shirt:` |
| :tshirt: `:tshirt:` | :necktie: `:necktie:` | :womans_clothes: `:womans_clothes:` |
| :dress: `:dress:` | :running_shirt_with_sash: `:running_shirt_with_sash:` | :jeans: `:jeans:` |
| :kimono: `:kimono:` | :bikini: `:bikini:` | :ribbon: `:ribbon:` |
| :tophat: `:tophat:` | :crown: `:crown:` | :womans_hat: `:womans_hat:` |
| :mans_shoe: `:mans_shoe:` | :closed_umbrella: `:closed_umbrella:` | :briefcase: `:briefcase:` |
| :handbag: `:handbag:` | :pouch: `:pouch:` | :purse: `:purse:` |
| :eyeglasses: `:eyeglasses:` | :fishing_pole_and_fish: `:fishing_pole_and_fish:` | :coffee: `:coffee:` |
| :tea: `:tea:` | :sake: `:sake:` | :baby_bottle: `:baby_bottle:` |
| :beer: `:beer:` | :beers: `:beers:` | :cocktail: `:cocktail:` |
| :tropical_drink: `:tropical_drink:` | :wine_glass: `:wine_glass:` | :fork_and_knife: `:fork_and_knife:` |
| :pizza: `:pizza:` | :hamburger: `:hamburger:` | :fries: `:fries:` |
| :poultry_leg: `:poultry_leg:` | :meat_on_bone: `:meat_on_bone:` | :spaghetti: `:spaghetti:` |
| :curry: `:curry:` | :fried_shrimp: `:fried_shrimp:` | :bento: `:bento:` |
| :sushi: `:sushi:` | :fish_cake: `:fish_cake:` | :rice_ball: `:rice_ball:` |
| :rice_cracker: `:rice_cracker:` | :rice: `:rice:` | :ramen: `:ramen:` |
| :stew: `:stew:` | :oden: `:oden:` | :dango: `:dango:` |
| :egg: `:egg:` | :bread: `:bread:` | :doughnut: `:doughnut:` |
| :custard: `:custard:` | :icecream: `:icecream:` | :ice_cream: `:ice_cream:` |
| :shaved_ice: `:shaved_ice:` | :birthday: `:birthday:` | :cake: `:cake:` |
| :cookie: `:cookie:` | :chocolate_bar: `:chocolate_bar:` | :candy: `:candy:` |
| :lollipop: `:lollipop:` | :honey_pot: `:honey_pot:` | :apple: `:apple:` |
| :green_apple: `:green_apple:` | :tangerine: `:tangerine:` | :lemon: `:lemon:` |
| :cherries: `:cherries:` | :grapes: `:grapes:` | :watermelon: `:watermelon:` |
| :strawberry: `:strawberry:` | :peach: `:peach:` | :melon: `:melon:` |
| :banana: `:banana:` | :pear: `:pear:` | :pineapple: `:pineapple:` |
| :sweet_potato: `:sweet_potato:` | :eggplant: `:eggplant:` | :tomato: `:tomato:` |
| :corn: `:corn:` |

Places

| :house: `:house:` | :house_with_garden: `:house_with_garden:` | :school: `:school:` |
|---|---|---|
| :office: `:office:` | :post_office: `:post_office:` | :hospital: `:hospital:` |
| :bank: `:bank:` | :convenience_store: `:convenience_store:` | :love_hotel: `:love_hotel:` |
| :hotel: `:hotel:` | :wedding: `:wedding:` | :church: `:church:` |
| :department_store: `:department_store:` | :european_post_office: `:european_post_office:` | :city_sunrise: `:city_sunrise:` |
| :city_sunset: `:city_sunset:` | :japanese_castle: `:japanese_castle:` | :european_castle: `:european_castle:` |
| :tent: `:tent:` | :factory: `:factory:` | :tokyo_tower: `:tokyo_tower:` |
| :japan: `:japan:` | :mount_fuji: `:mount_fuji:` | :sunrise_over_mountains: `:sunrise_over_mountains:` |
| :sunrise: `:sunrise:` | :stars: `:stars:` | :statue_of_liberty: `:statue_of_liberty:` |
| :bridge_at_night: `:bridge_at_night:` | :carousel_horse: `:carousel_horse:` | :rainbow: `:rainbow:` |
| :ferris_wheel: `:ferris_wheel:` | :fountain: `:fountain:` | :roller_coaster: `:roller_coaster:` |
| :ship: `:ship:` | :speedboat: `:speedboat:` | :boat: `:boat:` |
| :sailboat: `:sailboat:` | :rowboat: `:rowboat:` | :anchor: `:anchor:` |
| :rocket: `:rocket:` | :airplane: `:airplane:` | :helicopter: `:helicopter:` |
| :steam_locomotive: `:steam_locomotive:` | :tram: `:tram:` | :mountain_railway: `:mountain_railway:` |
| :bike: `:bike:` | :aerial_tramway: `:aerial_tramway:` | :suspension_railway: `:suspension_railway:` |
| :mountain_cableway: `:mountain_cableway:` | :tractor: `:tractor:` | :blue_car: `:blue_car:` |
| :oncoming_automobile: `:oncoming_automobile:` | :car: `:car:` | :red_car: `:red_car:` |
| :taxi: `:taxi:` | :oncoming_taxi: `:oncoming_taxi:` | :articulated_lorry: `:articulated_lorry:` |
| :bus: `:bus:` | :oncoming_bus: `:oncoming_bus:` | :rotating_light: `:rotating_light:` |
| :police_car: `:police_car:` | :oncoming_police_car: `:oncoming_police_car:` | :fire_engine: `:fire_engine:` |
| :ambulance: `:ambulance:` | :minibus: `:minibus:` | :truck: `:truck:` |
| :train: `:train:` | :station: `:station:` | :train2: `:train2:` |
| :bullettrain_front: `:bullettrain_front:` | :bullettrain_side: `:bullettrain_side:` | :light_rail: `:light_rail:` |
| :monorail: `:monorail:` | :railway_car: `:railway_car:` | :trolleybus: `:trolleybus:` |
| :ticket: `:ticket:` | :fuelpump: `:fuelpump:` | :vertical_traffic_light: `:vertical_traffic_light:` |
| :traffic_light: `:traffic_light:` | :warning: `:warning:` | :construction: `:construction:` |
| :beginner: `:beginner:` | :atm: `:atm:` | :slot_machine: `:slot_machine:` |
| :busstop: `:busstop:` | :barber: `:barber:` | :hotsprings: `:hotsprings:` |
| :checkered_flag: `:checkered_flag:` | :crossed_flags: `:crossed_flags:` | :izakaya_lantern: `:izakaya_lantern:` |
| :moyai: `:moyai:` | :circus_tent: `:circus_tent:` | :performing_arts: `:performing_arts:` |
| :round_pushpin: `:round_pushpin:` | :triangular_flag_on_post: `:triangular_flag_on_post:` | :jp: `:jp:` |
| :kr: `:kr:` | :cn: `:cn:` | :us: `:us:` |
| :fr: `:fr:` | :es: `:es:` | :it: `:it:` |
| :ru: `:ru:` | :gb: `:gb:` | :uk: `:uk:` |
| :de: `:de:` |

Symbols

| :one: `:one:` | :two: `:two:` | :three: `:three:` |
|---|---|---|
| :four: `:four:` | :five: `:five:` | :six: `:six:` |
| :seven: `:seven:` | :eight: `:eight:` | :nine: `:nine:` |
| :keycap_ten: `:keycap_ten:` | :1234: `:1234:` | :zero: `:zero:` |
| :hash: `:hash:` | :symbols: `:symbols:` | :arrow_backward: `:arrow_backward:` |
| :arrow_down: `:arrow_down:` | :arrow_forward: `:arrow_forward:` | :arrow_left: `:arrow_left:` |
| :capital_abcd: `:capital_abcd:` | :abcd: `:abcd:` | :abc: `:abc:` |
| :arrow_lower_left: `:arrow_lower_left:` | :arrow_lower_right: `:arrow_lower_right:` | :arrow_right: `:arrow_right:` |
| :arrow_up: `:arrow_up:` | :arrow_upper_left: `:arrow_upper_left:` | :arrow_upper_right: `:arrow_upper_right:` |
| :arrow_double_down: `:arrow_double_down:` | :arrow_double_up: `:arrow_double_up:` | :arrow_down_small: `:arrow_down_small:` |
| :arrow_heading_down: `:arrow_heading_down:` | :arrow_heading_up: `:arrow_heading_up:` | :leftwards_arrow_with_hook: `:leftwards_arrow_with_hook:` |
| :arrow_right_hook: `:arrow_right_hook:` | :left_right_arrow: `:left_right_arrow:` | :arrow_up_down: `:arrow_up_down:` |
| :arrow_up_small: `:arrow_up_small:` | :arrows_clockwise: `:arrows_clockwise:` | :arrows_counterclockwise: `:arrows_counterclockwise:` |
| :rewind: `:rewind:` | :fast_forward: `:fast_forward:` | :information_source: `:information_source:` |
| :ok: `:ok:` | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:` | :repeat: `:repeat:` |
| :repeat_one: `:repeat_one:` | :new: `:new:` | :top: `:top:` |
| :up: `:up:` | :cool: `:cool:` | :free: `:free:` |
| :ng: `:ng:` | :cinema: `:cinema:` | :koko: `:koko:` |
| :signal_strength: `:signal_strength:` | :u5272: `:u5272:` | :u5408: `:u5408:` |
| :u55b6: `:u55b6:` | :u6307: `:u6307:` | :u6708: `:u6708:` |
| :u6709: `:u6709:` | :u6e80: `:u6e80:` | :u7121: `:u7121:` |
| :u7533: `:u7533:` | :u7a7a: `:u7a7a:` | :u7981: `:u7981:` |
| :sa: `:sa:` | :restroom: `:restroom:` | :mens: `:mens:` |
| :womens: `:womens:` | :baby_symbol: `:baby_symbol:` | :no_smoking: `:no_smoking:` |
| :parking: `:parking:` | :wheelchair: `:wheelchair:` | :metro: `:metro:` |
| :baggage_claim: `:baggage_claim:` | :accept: `:accept:` | :wc: `:wc:` |
| :potable_water: `:potable_water:` | :put_litter_in_its_place: `:put_litter_in_its_place:` | :secret: `:secret:` |
| :congratulations: `:congratulations:` | :m: `:m:` | :passport_control: `:passport_control:` |
| :left_luggage: `:left_luggage:` | :customs: `:customs:` | :ideograph_advantage: `:ideograph_advantage:` |
| :cl: `:cl:` | :sos: `:sos:` | :id: `:id:` |
| :no_entry_sign: `:no_entry_sign:` | :underage: `:underage:` | :no_mobile_phones: `:no_mobile_phones:` |
| :do_not_litter: `:do_not_litter:` | :non-potable_water: `:non-potable_water:` | :no_bicycles: `:no_bicycles:` |
| :no_pedestrians: `:no_pedestrians:` | :children_crossing: `:children_crossing:` | :no_entry: `:no_entry:` |
| :eight_spoked_asterisk: `:eight_spoked_asterisk:` | :eight_pointed_black_star: `:eight_pointed_black_star:` | :heart_decoration: `:heart_decoration:` |
| :vs: `:vs:` | :vibration_mode: `:vibration_mode:` | :mobile_phone_off: `:mobile_phone_off:` |
| :chart: `:chart:` | :currency_exchange: `:currency_exchange:` | :aries: `:aries:` |
| :taurus: `:taurus:` | :gemini: `:gemini:` | :cancer: `:cancer:` |
| :leo: `:leo:` | :virgo: `:virgo:` | :libra: `:libra:` |
| :scorpius: `:scorpius:` | :sagittarius: `:sagittarius:` | :capricorn: `:capricorn:` |
| :aquarius: `:aquarius:` | :pisces: `:pisces:` | :ophiuchus: `:ophiuchus:` |
| :six_pointed_star: `:six_pointed_star:` | :negative_squared_cross_mark: `:negative_squared_cross_mark:` | :a: `:a:` |
| :b: `:b:` | :ab: `:ab:` | :o2: `:o2:` |
| :diamond_shape_with_a_dot_inside: `:diamond_shape_with_a_dot_inside:` | :recycle: `:recycle:` | :end: `:end:` |
| :on: `:on:` | :soon: `:soon:` | :clock1: `:clock1:` |
| :clock130: `:clock130:` | :clock10: `:clock10:` | :clock1030: `:clock1030:` |
| :clock11: `:clock11:` | :clock1130: `:clock1130:` | :clock12: `:clock12:` |
| :clock1230: `:clock1230:` | :clock2: `:clock2:` | :clock230: `:clock230:` |
| :clock3: `:clock3:` | :clock330: `:clock330:` | :clock4: `:clock4:` |
| :clock430: `:clock430:` | :clock5: `:clock5:` | :clock530: `:clock530:` |
| :clock6: `:clock6:` | :clock630: `:clock630:` | :clock7: `:clock7:` |
| :clock730: `:clock730:` | :clock8: `:clock8:` | :clock830: `:clock830:` |
| :clock9: `:clock9:` | :clock930: `:clock930:` | :heavy_dollar_sign: `:heavy_dollar_sign:` |
| :copyright: `:copyright:` | :registered: `:registered:` | :tm: `:tm:` |
| :x: `:x:` | :heavy_exclamation_mark: `:heavy_exclamation_mark:` | :bangbang: `:bangbang:` |
| :interrobang: `:interrobang:` | :o: `:o:` | :heavy_multiplication_x: `:heavy_multiplication_x:` |
| :heavy_plus_sign: `:heavy_plus_sign:` | :heavy_minus_sign: `:heavy_minus_sign:` | :heavy_division_sign: `:heavy_division_sign:` |
| :white_flower: `:white_flower:` | :100: `:100:` | :heavy_check_mark: `:heavy_check_mark:` |
| :ballot_box_with_check: `:ballot_box_with_check:` | :radio_button: `:radio_button:` | :link: `:link:` |
| :curly_loop: `:curly_loop:` | :wavy_dash: `:wavy_dash:` | :part_alternation_mark: `:part_alternation_mark:` |
| :trident: `:trident:` | :black_square: `:black_square:` | :white_square: `:white_square:` |
| :white_check_mark: `:white_check_mark:` | :black_square_button: `:black_square_button:` | :white_square_button: `:white_square_button:` |
| :black_circle: `:black_circle:` | :white_circle: `:white_circle:` | :red_circle: `:red_circle:` |
| :large_blue_circle: `:large_blue_circle:` | :large_blue_diamond: `:large_blue_diamond:` | :large_orange_diamond: `:large_orange_diamond:` |
| :small_blue_diamond: `:small_blue_diamond:` | :small_orange_diamond: `:small_orange_diamond:` | :small_red_triangle: `:small_red_triangle:` |
| :small_red_triangle_down: `:small_red_triangle_down:` | :shipit: `:shipit:` |