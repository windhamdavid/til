# Editor / Shell / CLI / VC

dotfiles ->  
- [https://github.com/windhamdavid/dotfiles/](https://github.com/windhamdavid/dotfiles/)  
- [https://code.davidawindham.com/david/dotfiles](https://code.davidawindham.com/david/dotfiles)  

---

* [atom](atom.md)
* [bash](bash.md)
* [git](git.md)
* [phpstorm](phpstorm.md)
* [sublime](sublime.md)
* [subversion](subversion.md)
* [terminal](terminal.md)
* [textmate](textmate.md)
* [unix](unix.md)
* [vi](vi.md)
* [zsh](zsh.md)

#### Commands
just the things I tend to forget.  

Vim config -> [vim](vi.md)  
Control + N = NERDTree  

#### Terminal
- Command + D - Split Window Pane
- Shift + Command + D = Close Split Pane

#### bindkey
```sh
### ~/.zshrc

bindkey '^P' up-history
bindkey '^N' down-history
bindkey '^?' backward-delete-char
bindkey '^h' backward-delete-char
bindkey '^w' backward-kill-word
bindkey '^r' history-incremental-search-backward

bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
bindkey "$terminfo[kcuu1]" history-substring-search-up
bindkey "$terminfo[kcud1]" history-substring-search-down
```

#### alias  

```sh
### ~/.zshrc

###### LIST ######
alias l='ls -lFh'     #size,show type,human readable
alias la='ls -lAFh'   #long list,show almost all,show type,human readable
alias lr='ls -tRFh'   #sorted by date,recursive,show type,human readable
alias lt='ls -ltFh'   #long list,sorted by date,show type,human readable
alias ll='ls -l'      #long list

###### GIT #######
alias ga="git add"
alias gaa="git add -A"
alias gc="git commit -m '"
alias gs="git status"
alias gpom="git push origin master"
alias gpcm="git push code master"
alias gpod="git push origin dev"
alias gpcd="git push code dev"

##### NPM #####
alias nit="npm init --yes"
alias not="npm outdated"
alias nu="npm update"
alias ni="npm install"
alias nu="npm uninstall"
alias nis="npm install --save"
alias nus="npm uninstall --save"
alias nid="npm install --save-dev"
alias nud="npm uninstall --save-dev"
alias nip="npm install --save-prod"
alias nup="npm uninstall --save-prod"

##### GOLANG ######
alias gob='go build'
alias goc='go clean'
alias god='go doc'
alias gof='go fmt'
alias gofa='go fmt ./...'
alias gog='go get'
alias goi='go install'
alias gol='go list'
alias gom='go mod'
alias gop='cd $GOPATH'
alias gopb='cd $GOPATH/bin'
alias gops='cd $GOPATH/src'
alias gor='go run'
alias got='go test'
alias gov='go vet'

####### BREW #########
alias brewp='brew pin'
alias brews='brew list -1'
alias brewsp='brew list --pinned'
alias bubo='brew update && brew outdated'
alias bubc='brew upgrade && brew cleanup'
alias bubu='bubo && bubc'
alias bcubo='brew update && brew cask outdated'
alias bcubc='brew cask reinstall $(brew cask outdated) && brew cleanup'

####### Laravel ########
alias pa='php artisan'
alias pacache='php artisan cache:clear'
alias paroutes='php artisan route:list'
alias pavendor='php artisan vendor:publish'

```

### Plugins
- [https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins)

```sh
### https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins
plugins=(history-substring-search tmux colorize git golang gulp grunt composer bundler ruby rails textmate)

```

#### zsh-history-substring-search

2.  Bind keyboard shortcuts to this script's functions:

        # bind UP and DOWN arrow keys
        zmodload zsh/terminfo
        bindkey "$terminfo[kcuu1]" history-substring-search-up
        bindkey "$terminfo[kcud1]" history-substring-search-down

        # bind UP and DOWN arrow keys (compatibility fallback
        # for Ubuntu 12.04, Fedora 21, and MacOSX 10.9 users)
        bindkey '^[[A' history-substring-search-up
        bindkey '^[[B' history-substring-search-down

        # bind P and N for EMACS mode
        bindkey -M emacs '^P' history-substring-search-up
        bindkey -M emacs '^N' history-substring-search-down

        # bind k and j for VI mode
        bindkey -M vicmd 'k' history-substring-search-up
        bindkey -M vicmd 'j' history-substring-search-down

3.  Type any part of any previous command and then:

    * Press the UP arrow key to select the nearest command that (1) contains
      your query and (2) is older than the current command in the command
      history.

    * Press the DOWN arrow key to select the nearest command that (1)
      contains your query and (2) is newer than the current command in the
      command history.

    * Press ^U (the Control and U keys simultaneously) to abort the search.

4.  If a matching command spans more than one line of text, press the LEFT
    arrow key to move the cursor away from the end of the command, and then:

    * Press the UP arrow key to move the cursor to the line above.  When the
      cursor reaches the first line of the command, pressing the UP arrow
      key again will cause this script to perform another search.

    * Press the DOWN arrow key to move the cursor to the line below.  When
      the cursor reaches the last line of the command, pressing the DOWN
      arrow key again will cause this script to perform another search.

  ## tmux

  This plugin provides aliases for [tmux](https://tmux.github.io/), the terminal multiplexer.
  To use it add `tmux` to the plugins array in your zshrc file.

  ```zsh
  plugins=(... tmux)
  ```

  The plugin also supports the following:

  - determines if tmux is installed or not, if not, prompts user to install tmux
  - determines if the terminal supports the 256 colors or not, sets the appropriate configuration variable
  - sets the correct local config file to use

  ### Aliases

  | Alias  | Command                | Description                                               |
  | ------ | -----------------------|---------------------------------------------------------- |
  | `ta`   | tmux attach -t         | Attach new tmux session to already running named session  |
  | `tad`  | tmux attach -d -t      | Detach named tmux session                                 |
  | `ts`   | tmux new-session -s    | Create a new named tmux session                           |
  | `tl`   | tmux list-sessions     | Displays a list of running tmux sessions                  |
  | `tksv` | tmux kill-server       | Terminate all running tmux sessions                       |
  | `tkss` | tmux kill-session -t   | Terminate named running tmux session                      |
  | `tmux` | `_zsh_tmux_plugin_run` | Start a new tmux session                                  |

  ### Configuration Variables

  | Variable                            | Description                                                                   |
  |-------------------------------------|-------------------------------------------------------------------------------|
  | `ZSH_TMUX_AUTOSTART`                | Automatically starts tmux (default: `false`)                                  |
  | `ZSH_TMUX_AUTOSTART_ONCE`           | Autostart only if tmux hasn't been started previously (default: `true`)       |
  | `ZSH_TMUX_AUTOCONNECT`              | Automatically connect to a previous session if it exits (default: `true`)     |
  | `ZSH_TMUX_AUTOQUIT`                 | Automatically closes terminal once tmux exits (default: `ZSH_TMUX_AUTOSTART`) |
  | `ZSH_TMUX_FIXTERM`                  | Sets `$TERM` to 256-color term or not based on current terminal support       |
  | `ZSH_TMUX_ITERM2`                   | Sets the `-CC` option for iTerm2 tmux integration (default: `false`)          |
  | `ZSH_TMUX_FIXTERM_WITHOUT_256COLOR` | `$TERM` to use for non 256-color terminals (default: `screen`)                |
  | `ZSH_TMUX_FIXTERM_WITH_256COLOR`    | `$TERM` to use for 256-color terminals (default: `screen-256color`            |
  | `ZSH_TMUX_CONFIG`                   | Set the configuration path (default: `$HOME/.tmux.conf`)                      |
  | `ZSH_TMUX_UNICODE`                  | Set `tmux -u` option to support unicode                                       |

### gulp / grunt

autocompletion for tasks. grabs all tasks in the current directory.

### Bundler

- adds completion for basic bundler commands
- adds short aliases for common bundler commands
  - `be` aliased to `bundle exec`.
    It also supports aliases (if `rs` is `rails server`, `be rs` will bundle-exec `rails server`).
  - `bl` aliased to `bundle list`
  - `bp` aliased to `bundle package`
  - `bo` aliased to `bundle open`
  - `bout` aliased to `bundle outdated`
  - `bu` aliased to `bundle update`
  - `bi` aliased to `bundle install --jobs=<cpu core count>` (only for bundler `>= 1.4.0`)
- adds a wrapper for common gems:
  - looks for a binstub under `./bin/` and executes it (if present)
  - calls `bundle exec <gem executable>` otherwise

Common gems wrapped by default (by name of the executable):
`annotate`, `cap`, `capify`, `cucumber`, `foodcritic`, `guard`, `hanami`, `irb`, `jekyll`, `kitchen`, `knife`, `middleman`, `nanoc`, `pry`, `puma`, `rackup`, `rainbows`, `rake`, `rspec`, `rubocop`, `shotgun`, `sidekiq`, `spec`, `spork`, `spring`, `strainer`, `tailor`, `taps`, `thin`, `thor`, `unicorn` and `unicorn_rails`.

#### Configuration

Please use the exact name of the executable and not the gem name.

#### Add additional gems to be wrapped

Add this before the plugin-list in your `.zshrc`:
```sh
BUNDLED_COMMANDS=(rubocop)
plugins=(... bundler ...)
```
This will add the wrapper for the `rubocop` gem (i.e. the executable).


#### Exclude gems from being wrapped

Add this before the plugin-list in your `.zshrc`:
```sh
UNBUNDLED_COMMANDS=(foreman spin)
plugins=(... bundler ...)
```
This will exclude the `foreman` and `spin` gems (i.e. their executable) from being wrapped.

#### Excluded gems

These gems should not be called with `bundle exec`. Please see [issue #2923](https://github.com/ohmyzsh/ohmyzsh/pull/2923) on GitHub for clarification.

`berks`
`foreman`
`mailcatcher`
`rails`
`ruby`
`spin`

---

### Composer


| Alias  | Command                                        | Description                                                                            |
| ------ | ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| `c`    | `composer`                                     | Starts composer                                                                        |
| `csu`  | `composer self-update`                         | Updates composer to the latest version                                                 |
| `cu`   | `composer update`                              | Updates composer dependencies and `composer.lock` file                                 |
| `cr`   | `composer require`                             | Adds new packages to `composer.json`                                                   |
| `crm`  | `composer remove`                              | Removes packages from `composer.json`                                                  |
| `ci`   | `composer install`                             | Resolves and installs dependencies from `composer.json`                                |
| `ccp`  | `composer create-project`                      | Create new project from an existing package                                            |
| `cdu`  | `composer dump-autoload`                       | Updates the autoloader                                                                 |
| `cdo`  | `composer dump-autoload --optimize-autoloader` | Converts PSR-0/4 autoloading to classmap for a faster autoloader (good for production) |
| `cgu`  | `composer global update`                       | Allows update command to run on COMPOSER_HOME directory                                |
| `cgr`  | `composer global require`                      | Allows require command to run on COMPOSER_HOME directory                               |
| `cgrm` | `composer global remove`                       | Allows remove command to run on COMPOSER_HOME directory                                |
| `cget` | `curl -s https://getcomposer.org/installer`    | Installs composer in the current directory                                             |
