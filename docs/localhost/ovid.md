# Ovid 💻

### Notes

11/23/21 - I wrote a quick post about why I purchased it and why I named it Ovid @ [https://davidawindham.com/ovid](https://davidawindham.com/ovid) and I'll document the rest of the it here. Picked him up from the Apple Store. Moved my old laptop so that I could share the screen for referencing configuration. Booted her up and loaded up activity monitor and command line top to watch the processes. I always avoid using the migration assistant so that I can start clean. My main goal is to keep the machine as minimal and simple as possible. I am going to try and avoid running any x86 processes under Rosetta in my attempt to go fully ARM [https://davidawindham.com/arm/](https://davidawindham.com/arm/).

&nbsp;

## System

---

### Preferences

**General** : Auto / Accent multi  
**Desktop & Screen Save** : Dark Grey Desktop color, Screen Saver 10min Monterey  
**Dock & Menu Bar** : Remove all default, Auto Hide Dock Left w/ Magnification, no recent apps or indicators  
**Mission Control** : set Hot Corners  
**Notifications & Focus** : turn off all notifications except Kerberos, Calendar, Mail, Messages & Reminders. Turn on Focus automatically from 6-10am and 6-10pm weekdays.  
**Internet Accounts** : add email accounts w/ mail, contacts, calendar. iCloud: enable drive, photos, mail, contacts, calendars, reminders, notes, safari, KeyChain, find my mac. turn off all iCloud drive except pages.  
**Passwords** : Wallet & Pay: only on phone/tablet  
**ScreenTime** : disabled  
**Security & Privacy** : Allow apps from identified developers.  FileVault:Off, Firewall:On, Privacy:disable all location. show location icon in menu bar.  
**Network** : Set up WiFi, Advanced -> DNS
**Bluetooth** : add keyboard/TrackPad  
**Sound** :default  
**Keyboard** :Text:add period with double-space
**Touch ID** : setup  
**TrackPad** :scroll direction un-natural  
**Displays** : configure external monitors  
**Printer** : Add epson wireless  
**Battery** : turn off display 7min. optimize battery charging, wake for network access  
**Sharing** : rename, file/screen airplay sharing.  
**Time Machine** : set backup disk on network  
**Startup Disk** : rename hard drive to network machine name.

### MacOS

Arrange software based on usage and function

* Pages, Notes, Reminders
* Numbers, Keynote
* Calendar, Contacts, Mail, Facetime, Messages  
* Photos, QuickTime, Preview
* Activity Monitor, Disk Utility, Console, Color Meter

### Finder

* Change sidebar order and add my default work folders ( Projects / Sites )
* Add [QLMarkdown](https://github.com/sbarex/QLMarkdown) and [Syntax Highlight](https://github.com/sbarex/SourceCodeSyntaxHighlight) Extensions ( as HomeBrew Casks )

```bash
david@ovid:~ » brew install --cask qlmarkdown
david@ovid:~ » brew install --cask syntax-highlight
```

### Xcode

Install command line developer tools. Xcode still requires Rosetta to run some builds and since I don't regularly do Swift development, I can let the app sit without installing Rosetta  

```bash
david@ovid:~ » xcode-select –install
```

**Git** - set --global .gitignore/.gitconfig - version included with Xcode  

```bash
david@ovid:~/sites/dotfiles(master○) » git version
git version 2.30.1 (Apple Git-130)
```

### Terminal

SSH Keys - move existing keys, generate fresh keys  
GPG Keys  - move existing, generate fresh, validate [Github](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)  
Git Auth/Keys - keychain  
Vim & Vundle - plugins ( NERDTree, NERDTree-Git, Fugative ) colors ( sunburst, vividchalk, solarized )  

```bash
david@ovid:~ » git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

**dotfiles** @ [https://code.davidawindham.com/david/dotfiles](https://code.davidawindham.com/david/dotfiles)  

Oh My Zsh - ( aliases, plugins, theme )
macos, git, gulp, grunt, brew, yarn, textmate, vscode, history-substring-search, zsh-autosuggestions, zsh-syntax-highlighting

```bash
david@ovid:~ » sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
david@ovid:~ » git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
david@ovid:~ » git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

#### New Features

```bash
david@ovid:~ » networkQuality ( network tests )
david@ovid:~ » aea ( Manipulate Apple Encrypted Archives )
```

&nbsp;  

## Development

---

Quick reference for Apple Silicon compatibility - [https://doesitarm.com](https://doesitarm.com)  

### Text Editors

**Textmate** - set as default editor, shell support  global .tm_properties  
**Jet Brains** - CLion, Rider, GoLand, Rust, RubyMine, PyCharm, PhpStorm, WebStorm  
**Visual Studio Code** - Insiders (Universal Build) - plugins ( Sunburst, One Dark Pro, Transmit, Vim, GitLens, Github Markdown, Markdown Lint, Spell Check )  
**~~Atom~~** - dropped b/c x86. Microsoft now owns Github and any package I used there is now on VS Code.  
**~~Sublime~~** - dropped Sublime and Merge  
**Nova** - trying out Nova from Panic Inc.  
**Kaleidoscope** - for complex/visual diffs.

### Homebrew

Homebrew - trying to avoid all x86 packages
 *installed in /opt/homebrew for ARM

```bash
david@ovid:~/sites/dotfiles(master○) » arch
arm64
david@ovid:~/sites/dotfiles(master○) » brew doctor
Your system is ready to brew.
david@ovid:~/sites/dotfiles(master○) » brew --version
Homebrew 3.3.5
Homebrew/homebrew-core (git revision c29456a994b; last commit 2021-11-25)
david@ovid:~/sites/dotfiles(master○) » 
david@ovid:~/sites/_a » brew config            
HOMEBREW_VERSION: 3.3.5
ORIGIN: https://github.com/Homebrew/brew
HEAD: 354718c40a4e7cc4e5d1d4b03fdce8b992e04e8a
Last commit: 6 days ago
Core tap ORIGIN: https://github.com/Homebrew/homebrew-core
Core tap HEAD: c32f243acaddffb510bc5c640e83202e5101690c
Core tap last commit: 36 minutes ago
Core tap branch: master
HOMEBREW_PREFIX: /opt/homebrew
HOMEBREW_CASK_OPTS: []
HOMEBREW_CORE_GIT_REMOTE: https://github.com/Homebrew/homebrew-core
HOMEBREW_MAKE_JOBS: 10
Homebrew Ruby: 2.6.8 => /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/bin/ruby
CPU: 10-core 64-bit arm_firestorm_icestorm
Clang: 13.0.0 build 1300
Git: 2.30.1 => /Applications/Xcode.app/Contents/Developer/usr/bin/git
Curl: 7.77.0 => /usr/bin/curl
macOS: 12.0.1-arm64
CLT: 13.1.0.0.1.1633545042
Xcode: 13.1
Rosetta 2: false
```

### Languages

Apple is removing languages from the OS via [Xcode 11 release notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-11-release-notes): "Scripting language runtimes such as Python, Ruby, and Perl are included in macOS for compatibility with legacy software. In future versions of macOS, scripting language runtimes won't be available by default, and may require you to install an additional package." Instead of adding four or five versions of each language to support legacy codebase, I'm going to bring modify the old projects.  
  
**PHP** - 8.1.0  
**Python** - 3.9.9  
**Ruby** - 3.0.3 ( switched from using rvm to rbenv )  

```bash
david@ovid:~ » brew install rbenv ruby-build
david@ovid:~ » echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
david@ovid:~ » echo 'eval "$(rbenv init -)"' >> ~/.zshrc
david@ovid:~ » rbenv install 3.0.3 
david@ovid:~ » ruby -v            
ruby 2.6.8p205 (2021-07-07 revision 67951) [universal.arm64e-darwin21]
david@ovid:~ » rbenv global 3.0.3
david@ovid:~ » ruby -v
ruby 3.0.3p157 (2021-11-24 revision 3fb7d2cadc) [arm64-darwin21]
```

**GoLang** 1.17.2  
**Rust** - 1.56.1 (still haven't learned Rust 🛠 )


```bash
david@ovid:~ » rustc --version
rustc 1.56.1
david@ovid:~ » go version     
go version go1.17.2 darwin/arm64
```

#### SSL ( Open, Libre, Boring )
Mkcert

#### Packages

| | | | | | | |
|-|-|-|-|-|-|-|
| apr | fontconfig | gmp | libnghttp2	| libzip	|	pcre2	|	rust
| apr-util | freetds	|	go	|	libpng	|	m4	|	php	|	sqlite
| argon2	|	freetype |	httpd	|	libpq	|	mkcert	|	pkg-config |	tidy-html5
| aspell	|	gd	|	icu4c	|	libsodium	| mpdecimal| python<span>@</span>3.9	| unixodbc
| autoconf	| gdbm	|	jpeg	|	libssh2	|	oniguruma	| rbenv	|	webp
| brotli	|	gettext	|	krb5	|	libtiff	|	openldap	| readline | xz
| ca-certificates	| gh	|	libffi	|	libtool	|	openssl<span>@</span>1.1	| rtmpdump	| zstd
| curl	|	giflib	|	libidn2	|	libunistring	| pcre	|	ruby-build


#### Casks

||||
|---|---|---|
| qlmarkdown  | syntax-highlight  |   |

### Node.js & NVM  

* v.16.13.0 is Universal and has LTS
* Will bring my older Node.js projects up to this version

```bash
david@ovid:~ » curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
david@ovid:~ » nvm install --lts
david@ovid:~/sites/dotfiles(master○) » nvm
Node Version Manager (v0.37.2)
david@ovid:~/sites/dotfiles(master○) » node -v
v16.13.0
david@ovid:~/sites/daw_til(master○) » npm -v
8.1.0
```

* ran into a bug 🪲 where the ~/.npm directory was not installed.

```bash
david@ovid:~/sites/daw_til(master○) » npm install       
npm ERR! code EACCES
npm ERR! syscall mkdir
npm ERR! path /Users/david/.npm/_cacache
npm ERR! errno -13
npm ERR! 
npm ERR! Your cache folder contains root-owned files, due to a bug in
npm ERR! previous versions of npm which has since been addressed.
npm ERR! 
npm ERR! To permanently fix this problem, please run:
npm ERR!   sudo chown -R 501:20 "/Users/david/.npm"

david@ovid:~ » sudo mkdir .npm 
david@ovid:~/sites/daw_til(master○) » sudo chown -R $(whoami) ~/.npm 

npm notice New patch version of npm available! 8.1.0 -> 8.1.4
david@ovid:~/sites/daw_til(master⚡) » npm install -g npm@8.1.4
```

### Databases

PostgreSQL  
MySQL  
MongoDB  
Redis  
DBngin  
Tables Plus  

### Integration  

Docker  
Now  
Insomnia  
Postman

### Audit & Testing  

Proxyman  
Screaming Frog  

## Software

---

### Communications

Final Draft  
Slack  
Keybase  
Authy  
Zoom  

### Productivity

Quicksilver, Alfred, Launchbar  
Objective Development - Launchbar/Little Snitch  
Side Mirror  
[Obsidian](https://obsidian.md)  
[Pandoc](https://pandoc.org)  

### Design

Adobe ( Illustrator, Photoshop, InDesign, ~~Acrobat Pro(x86)~~, Premier )  
Sketch  
Sip  

### A/V

[Rogue Amoeba](https://rogueamoeba.com) - Audio Hijack / Airfoil / Satellite  
Ace ( [System Kernel Extension](https://developer.apple.com/documentation/apple-silicon/installing-a-custom-kernel-extension ) )  
ExistentialAudio/BlackHole  
Spotify  
[Monitor Control](https://github.com/MonitorControl/MonitorControl)  
VLC  
[Telestream](https://www.telestream.net) - Screenflow / Wirecast / Presenter  

&nbsp;

## Peripheral

---

ViewSonic VP3881 - [Manual](http://www.viewsonicglobal.com/public/products_download/user_guide/Display/VP3881/VP3881_UG_ENG.pdf?pass)  
Lenovo 32q-20 - [Manual](https://download.lenovo.com/consumer/monitor/lenovo_c32q-20_ug_201906_en.pdf)  
Klipsch Pro Media 2.1 - [Manual](http://images.klipsch.com/ProMedia21OwnersManualRev2012_635042122162050000.pdf)  
Blue Yeti - [Manual](https://s3.amazonaws.com/cd.bluemic.com/pdf/manuals/yeti/Blue_Yeti_QuickStartGuide-EN.pdf)  
FujiFilm XT2 - [Manual](https://fujifilm-dsc.com/en/manual/x-t2/)  
TP-Link Archer [AX50](https://www.tp-link.com/us/support/download/archer-ax50/) / [RE505X](https://www.tp-link.com/us/support/download/re505x/)  
