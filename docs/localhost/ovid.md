# Ovid 💻

11/23/21 - Apple Store pickup
Moved my desk around, did some cable management, moved my old MacBook Pro so that I could share the screen for referencing configuration.
Booted her up and loaded up activity monitor and command line top to watch the processes closely to see what's running. I always avoid using the migration assistant so that I can start clean. My main goal is to keep the machine as minimal and simple as possible. I am going to try and avoid running any x86 processes under Rosetta in my attempt to go fully ARM. I wrote a quick post about why I purchased it and why I named it Ovid @ [https://davidawindham.com/ovid](https://davidawindham.com/ovid) and I'll document the rest of the it here.

&nbsp;

## System

---

### Preferences

**General** : Dark / Accent multi  
**Desktop & Screen Save** : Dark Grey Desktop color, Screen Saver 10min Monterey  
**Dock & Menu Bar** : Remove all default, Auto Hide Dock Left w/ Magnification, no recent apps or indicators  
**Mission Control** : set Hot Corners  
**Notifications & Focus** : turn off all notifications except Kerberos, Wallet, Calendar, Mail, Messages & Reminders. Turn on Focus automatically from 6-10am and 6-10pm weekdays.  
**Internet Accounts** : add email accounts w/ mail, contacts, calendar. iCloud: enable drive, photos, mail, contacts, calendars, reminders, notes, safari, KeyChain, find my mac. turn off all iCloud drive except pages.  
**Passwords** : Wallet & Pay: only on phone/tablet  
**ScreenTime** : disabled  
**Security & Privacy** : Allow apps from identified developers.  FileVault:Off, Firewall:On, Privacy:disable all location. show location icon in menu bar.  
**Network** : Set up WiFi  
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

install command line developer tools.

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
Git Auth/Keys - use keychain  
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

## Software

---

Quick reference for Apple Silicon compatibility - [https://doesitarm.com](https://doesitarm.com)  

### Text Editors

**Textmate** - set as default editor, shell support  global .tm_properties  
**Jet Brains** - CLion, Rider, GoLand, Rust, RubyMine, PyCharm, PhpStorm, WebStorm  
**Visual Studio Code** - Insiders (Universal Build) - plugins ( Sunburst, One Dark Pro, Transmit, Vim, GitLens, Github Markdown, Markdown Lint, Spell Check )  
**~~Atom~~** - dropped b/c Microsoft now owns Github and any package I used there is now on VS Code.  
**~~Sublime~~** - dropped Sublime and Merge  
**Nova** - trying out Nova from Panic Inc.  
**Kaleidoscope**

### Languages

Apple is removing languages from the OS via [Xcode 11 release notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-11-release-notes): "Scripting language runtimes such as Python, Ruby, and Perl are included in macOS for compatibility with legacy software. In future versions of macOS, scripting language runtimes won’t be available by default, and may require you to install an additional package."

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
```

#### SSL ( Open, Libre, Boring )

#### Packages

|   |   |   |
|---|---|---|
| gh  |   |   |

#### Casks

||||
|---|---|---|
| qlmarkdown  | syntax-highlight  |   |

### Node.js via NVM  

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

## Other Software

Monitor Control
Quicksilver, Alfred, Launchbar  
Rogue Amoeba - Audio Hijack/Airfoil/Satellite  
Objective Development - Launchbar/Little Snitch  
Adobe  
Sketch  
Tables Plus  
Screenflow  
Obsidian  
Screaming Frog  
Sip  
Sublime  
VLC  
Spotify  
Zoom  
Insomnia  
Postman  
Codekit
Now  
Keybase  
Github Desktop  
DBngin  
Docker  
Authy