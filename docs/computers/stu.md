# Stu 🪩

![stu](/img/stu-disco.jpg)

Stu Discothèque - Days of Future Future ( [ep. 548](https://simpsons.fandom.com/wiki/Days_of_Future_Future)] April 13, 2014 )
Disco Stu becomes Nothing Stu at a center called MovingOn where Bart undergoes neural implants and Homer is being cloned by Frink. 

## Notes

re: https://davidwindham.com/den-studio/

**25/04/07** - my new Mac Studio came in over the weekend. Right now I'm calling it Stu and it seems like it's going to stick. It's an upgrade I promised myself to go along with the new [studio project](/notes/house/studio). It's a replacement for my old Mac Mini ( [Magic](/docs/computers/magic.md) ) which was the last of my working local machines not on an ARM architecture. I remember when 1GB of memory was considered outrageous. It's a hoss and will serve as my primary desktop alongside of my laptop [Ovid](/docs/computers/ovid).

Every time I spin up a new machine, I take time to make considerations on possible changes. I never boot from backups or stuff new machines with previous projects. My approach is almost always minimalism. I look at my older system and ask myself what I can trim because I inevitably end up with multiple language versions, extraneous packages, and software. 

### Log

- **25/04/07** - init 🔥

## Peripheral

🛜 TP-link Deco XE75 Pro ( ethernet ䷇ )  
🖥️ (2) ViewSonic 32" VX3267U-4K / Sony X85K  
📷 FujiFilm XT-1 / Nikon Z50II  
🔈 Onkyo TX-NR636 / WiiM / Polk monitors/center/sub  
🎛️ Auturia MiniFuse / 🎹 Auturia Mk3  / 🎙️ Blue

## Software

**Productivity** - Alfred, Obsidian, Acrobat, Notes, Reminders  
**Development** - Terminal, Xcode, Visual Studio Code, Cursor, Transmit, TablesPlus, DBngin, Docker, Insomnia, Postman, Proton , GPG Suite  
**Design** - Adobe Illustrator/Photoshop/InDesign, Figma, Color Picker  
**A/V** - Monitor Control, Handbrake, Logic/Final Cut Pro, Adobe Premier/Audition/Encoder, Screenflow, OBS, Audio Hijack/Loopback  
**System** - Mail, Messages, Reminders, Calendar, Numbers, Pages, Photos, Passwords  
**Browsers** - Safari, Orion, Firefox Developer  
**AI** - Claude/OpenAI/Gemini/CoPilot APIs ( for Cursor, VSCode, Kagi Assistant)  
**Deprecated** - Wirecast, Logseq, Slack

## System

### Preferences

- 'unnatural' track pad direction
- aerial screen savers
- dark mode always 

#### Network
- switching to Quad9 over Google for DNS b/c more privacy and a bit faster ( .1 ms )
  - using the ECS version @ https://quad9.net/service/service-addresses-and-features

### MacOS

I use a good bit of Apple software mainly because of the convenience and interoperability.

#### iCloud

I switched to an Apple One account several years ago so now I use the 2TB liberally syncing almost everything except my working Desktop and Documents files.

### Finder / Files

Show system Library and add additional folders. I've now migrated to using pretty much the exact same file structure on all of my backup and remote drives prefixing them with the machine name. /Projects and /Sites are the two main add-ons and I organize by acronyms and dates for both.

```bash
.
├── _silver (2005-2009)
├── _macs (2009-2014)
├── _magic (2012-2025)
├── _ovid (2021-)
└── _stu (2025-)
  └── david/
      ├── Desktop (projects/_desk - never use)
      ├── Documents (daw,car,compute,family,finance,health,house,student,travel,work)
      ├── Downloads (working directory)
      ├── Library (show Library in finder)
      ├── Music (hijack,logic,audition)
      ├── Movies (audio,premier,screenflow,finalcut)
      ├── Pictures ( graphics,scans - org by year )
      ├── Projects (org by acronym/yr - all assets including docs - _notes.md root )
      ├── Public ( rarely use )
      └── Sites ( working projects by acronym - mapped in etc/hosts)
```

I like to use [QLMarkdown](https://github.com/sbarex/QLMarkdown) & [Syntax Highlight](https://github.com/sbarex/SourceCodeSyntaxHighlight) as homebrew casks so that I have code and markdown previews within the finder and preview. I use the Base16 Brush Trees themes for syntax highlighting and the Github theme for Markdown.

```sh
david@stu:~ » brew install --cask qlmarkdown
david@stu:~ » brew install --cask syntax-highlight
```

### Xcode

I need the ISO C++ standard, libc++, & Make libraries

```sh
david@stu:~ » xcode-select –install
```

### Terminal

dotfiles @ https://davidwindham.com/code/dotfiles - Not on Warp, Hyper, Neovim or iTerm. default terminal with [Oh-My-Zsh](https://ohmyz.sh) & [Vundle](https://github.com/VundleVim/Vundle.vim)

```sh
david@stu:~ » sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
david@stu:~ » git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

## Development
### Editors

editor history: Notepad++ -> Textmate -> Sublime -> Atom -> JetBrains -> VSCode -> Cursor  
[Cursor](https://www.cursor.com) is better than Copilot and is a fork so I sync other features and plugins I like. finds lint errors faster. biggest workflow change ✅ I've made in a while. added Gemini, Claude, OpenAI keys for Cursor

```sh
david@stu:~ » /<repo>/ . cursor
```

#### AI

AI in the terminal via https://github.com/simonw/llm & `npm install -g @anthropic-ai/claude-code` - https://github.com/anthropics/claude-code

```sh
david@stu:~ » npm install -g @anthropic-ai/claude-code
david@stu:~ » claude
```

### Packages

#### Homebrew

161 formulae, 3 casks — but only **21 installed on request**. The other 140 arrived as
dependencies, worth remembering before pruning: `brew uninstall` runs autoremove and takes
orphans with it, so the reversal is messier than the install.

```sh
david@stu🪩:~ » brew list --installed-on-request --formula | wc -l
      21
david@stu🪩:~ » brew list --pinned --versions
apr-util 1.6.3_1
httpd 2.4.63
libnghttp2 1.70.0
mariadb 11.7.2
```

**Four formulae are pinned**, so a bare `brew upgrade` skips them and says so:

- **httpd** — PHP loads as `mod_php`, and `libphp.so` is compiled against the httpd headers
  present at build time. Upgrading Apache underneath it leaves a module that may not load,
  which shows up as Apache refusing to start or serving `.php` as plain text.
- **apr-util, libnghttp2** — pinning httpd does not pin what it links against. These would
  still move on a bare upgrade, and `brew cleanup` then drops the old dylibs.
- **mariadb** — see Databases.

#### PIP

Python is Homebrew's, not Apple's. `uv` for anything project-scoped.

```sh
david@stu🪩:~ » pip3 --version
pip 26.1.2 (python 3.14)
david@stu🪩:~ » uv --version
uv 0.12.5
```

#### PECL

One extension only — xdebug and opcache ship with `php@8.3` itself.

```sh
david@stu🪩:~ » pecl list
imagick 3.8.1   stable
```

> **Every `php@8.3` patch upgrade wipes the PECL registry.** It lives inside the Cellar version
> directory while the `.so` files live outside it in `lib/php/pecl/`. So after a PHP upgrade
> `pecl list` reads empty while the extension still loads — it needs *reinstalling*, not
> upgrading. Two more traps, both hit 26/08/20: PECL will not overwrite a `.so` that is
> currently loaded, so comment the `extension=` line out first; and never `sudo pecl install` —
> the root-owned file it leaves behind blocks every later rebuild.

### Languages

#### Rust

used rustup - https://www.rust-lang.org/tools/install 

```sh
david@stu🪩:~ » brew install rustup
david@stu🪩:~ » rustup-init
// installs:
// rustc - the Rust compiler
// cargo - the Rust package manager
// rustup - the Rust toolchain manager
david@stu🪩:~ » rustup toolchain list
stable-aarch64-apple-darwin (active, default)
```

> `rustc` and `cargo` live in `~/.cargo/bin`, which is **not on the shell PATH here** — so
> `rustc --version` returns "command not found" even though the toolchain is installed and
> current. Add `~/.cargo/bin` to PATH, or call them by full path.

#### JS

##### Node.js 

```sh
david@stu🪩:~ » curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
david@stu🪩:~ » nvm install --lts
david@stu🪩:~ » node -v
v22.13.1
david@stu🪩:~ » nvm -v 
0.40.2
david@stu🪩:~ » node -v
v22.13.1
david@stu🪩:~ » npm -v 
10.9.2
```

#### TypeScript

Not installed globally — per-project via npm rather than a global `tsc`.

#### PHP

Two versions installed, and **the running one is deliberately not the newest**.

```sh
david@stu🪩:~ » php -v
PHP 8.3.33 (cli) (built: Jul 28 2026 17:56:10) (NTS)
    with Xdebug v3.4.2
    with Zend OPcache v8.3.33
```

`php@8.3` is what Apache loads and what the shell resolves. The unversioned `php` formula is
also installed (8.5.9) but out of the running stack — only PATH order keeps it there, so
anything resolving `/opt/homebrew/bin/php` directly gets 8.5. Worth knowing before chasing a
mystery version difference in an editor.

**8.3 because that is what the client server runs.** Developing against a newer interpreter
than production is how deprecations ship:

| host | PHP | MariaDB |
|---|---|---|
| client prod | 8.3 (most sites) | 11.4 |
| my prod | 8.4 | 10.6 |
| local mirror | 8.5 | 11.8 |
| **stu** | **8.3.33** | **11.7.2** |

The local mirror is the machine that deliberately runs *ahead* — it models the next server.
stu matches the oldest live target instead.

`php.ini` is a dev profile: `memory_limit 512M`, `max_execution_time 360`,
`upload_max_filesize`/`post_max_size` 80M, `display_errors On`, `error_reporting E_ALL`,
xdebug on port 9001.

#### Python

```sh
david@stu🪩:~ » python3 --version
Python 3.14.6
```

Homebrew's `python@3.14`, not `/usr/bin/python3`.

#### Ruby

Nothing installed — only Apple's system Ruby, 2.6.10 from 2022 and deprecated. If anything
needs Ruby seriously it gets a version manager, not this.

```sh
david@stu🪩:~ » ruby --version
ruby 2.6.10p210 (2022-04-12) [universal.arm64e-darwin25]
```

#### Go

Not installed.

#### Dart

Not installed.

### Servers
#### Apache
```sh
david@stu🪩:~ » apachectl -v
Server version: Apache/2.4.63 (Unix)
Server built:   Jan 20 2025 19:35:41
```
#### Nginx

Installed and current, but **not running** — Apache serves the local sites. Kept for testing
config against the remote hosts, which front everything with nginx.

```sh
david@stu🪩:~ » nginx -v
nginx version: nginx/1.31.4
```

### Node
### Databases

```sh
david@stu🪩:~ » mariadb -N -B -e 'SELECT VERSION();'
11.7.2-MariaDB
```

**Pinned.** Homebrew offers 12.x, and taking it would put stu ahead of everything it develops
against — the next server is 11.8. 11.7 sits deliberately between the oldest live target (11.4)
and that one. No early-warning value in running a version nothing will deploy, and a major bump
runs `mariadb-upgrade` against the data directory, which is one-way without a dump.

The collation default also changed at **11.4**. Dumps restored here need `--databases` so they
carry their own `CREATE DATABASE ... COLLATE`, or the local server invents one with its own
default and the mismatch surfaces months later as an "Illegal mix of collations".

### Integration
### Audit & Testing
### Frameworks



