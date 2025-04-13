# Stu 🪩


## Notes

re: https://davidawindham.com/den-studio/

**25/04/07** - my new Mac Studio came in over the weekend. Right now I'm calling it Stu and it seems like it's going to stick. It's an upgrade I promised myself to go along with the new [studio project](/notes/house/studio). It's a replacement for my old Mac Mini ( [Magic](/docs/computers/magic.md) ) which was the last of my working local machines not on an ARM architecture. I remember when 1GB of memory was considered outrageous. It's a hoss and will serve as my primary desktop alongside of my laptop [Ovid](/docs/computers/ovid).

Every time I spin up a new machine, I take time to make considerations on possible changes. I never boot from backups or stuff new machines with previous projects. My approach is almost always minimalism. I look at my older system and ask myself what I can trim because I inevitably end up with multiple language versions, extraneous packages, and software. 

### Log

- **25/04/07** - init 🔥

## System

### Preferences

Nothing new here: still prefer the un-natural trackpad direction and I've taken to the arial screen savers. 

#### Network
- switching to Quad9 over Google for DNS b/c more privacy and a bit faster ( .1 ms )
  - using the ECS version @ https://quad9.net/service/service-addresses-and-features

### MacOS

I use a good bit of Apple software mainly because of the convenience and interoperability. Passwords, Calendars, Mail, Pages, Photos, Notes, Reminders, Safari, and so on.

#### iCloud

I switched to an Apple One account several years ago so now I use the 2TB liberally syncing almost everything except my working Desktop and Documents files.

### Finder / Files

Show system Library and add additional folders. I've now migrated to using pretty much the exact same file structure on all of my backup and remote drives prefixing them with the machine name. /Projects and /Sites are the two main add-ons and I use acronyms in both. /Graphics are in /Pictures and so on.

```sh 
.
└── stu/
    └── Users/
        └── david/
            ├── Desktop
            ├── Documents
            ├── Downloads
            ├── Library
            ├── Music
            ├── Pictures
            ├── Projects
            ├── Public
            └── Sites
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

dotfiles @ https://code.davidawindham.com/david/dotfiles - Not on Warp, Hyper, Neovim or iTerm. default terminal with [Oh-My-Zsh](https://ohmyz.sh) & [Vundle](https://github.com/VundleVim/Vundle.vim)

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
#### PIP
#### PECL

### Languages

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

#### TypeSript

#### PHP
#### Python
#### Ruby
#### Go
#### Rust
#### Dart

### Servers
#### Apache
```sh
david@stu🪩:~ » apachectl -v
Server version: Apache/2.4.63 (Unix)
Server built:   Jan 20 2025 19:35:41
```
#### Nginx


### Node
### Databases


### Integration
### Audit & Testing
### Frameworks
## Software
### Browsers
### Communications
### Productivity
### Design
### A/V

## Peripheral

🛜 tp-link Deco XE75 Pro ( ethernet ䷇ )  
🖥️ (2) ViewSonic 32" VX3267U-4K / Sony X85K 4K  
📷 FujiFilm XT-1  
 🔈 Onkyo TX-NR636 / WiiM DAC / Polk/Klipsch reference/sub  
🎛️ Focusrite Scarlett / 🎹 Nord Stage 4 88  / 🎙️ Blue yeti 
