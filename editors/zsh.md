#Z shell

- my customizations on listed on the [editor home page](_editors.md)

###Oh My ZSH

####  Upgrade

To upgrade .oh-my-zsh, run:  

```
upgrade_oh_my_zsh
```
[Source](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet "Permalink to Cheatsheet · robbyrussell/oh-my-zsh Wiki · GitHub")
##  Commands

| Command               | Description                                                                                                                  |  
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |  
| _tabs_                | Create a new tab in the current directory (macOS - requires enabling access for assistive devices under System Preferences). |  
| _take_                | Create a new directory and change to it, will create intermediate directories as required.                                   |  
| _x_ / _extract_       | Extract an archive (supported types: tar.{bz2,gz,xz,lzma}, bz2, rar, gz, tar, tbz2, tgz, zip, Z, 7z).                        |  
| _zsh_stats_           | Get a list of the top 20 commands and how many times they have been run.                                                     |  
| _uninstall_oh_my_zsh_ | Uninstall Oh-my-zsh.                                                                                                         |  
| _upgrade_oh_my_zsh_   | Upgrade Oh-my-zsh.                                                                                                           |  
| source ~/.zshrc       | Uptake new changes                                                                                                           |  

* * *

| Alias   | Command                               |  
| ------- | ------------------------------------- |  
| _alias_ | list all aliases                      |  
| ..      | cd ..                                 |  
| ...     | cd ../..                              |  
| ....    | cd ../../..                           |  
| .....   | cd ../../../..                        |  
| /       | cd /                                  |  
| ~       | cd ~                                  |  
| _cd +n_ | switch to directory number `n`        |  
| _1_     | cd -                                  |  
| _2_     | cd +2                                 |  
| _3_     | cd +3                                 |  
| _4_     | cd +4                                 |  
| _5_     | cd +5                                 |  
| _6_     | cd +6                                 |  
| _7_     | cd +7                                 |  
| _8_     | cd +8                                 |  
| _9_     | cd +9                                 |  
| _md_    | mkdir -p                              |  
| _rd_    | rmdir                                 |  
| _d_     | dirs -v (lists last used directories) |  

See `~/.oh-my-zsh/lib/directories.zsh`

###  Alias

example:


    alias -s rb=vim #opens ruby files in vim
    # $ foo.rb
    # vim => foo.rb
    alias -g gp='| grep -i' #creates a global alias for grep
    # $ ps ax gp ruby
    # (all ruby process will be displayed)

| Flag | Description                                    |  
| ---- | ---------------------------------------------- |  
| L    | print each alias in the form of calls to alias |  
| g    | list or define global aliases                  |  
| m    | print aliases matching specified pattern       |  
| r    | list or define regular aliases                 |  
| s    | list or define suffix aliases                  |  

##  Tab-completion

| For options and helpful text of what they do |  
| -------------------------------------------- |  
| _ls -(tab)_                                  |  
| _cap (tab)_                                  |  
| _rake (tab)_                                 |  
| _ssh (tab)_                                  |  
| _sudo umount (tab)_                          |  
| _kill (tab)_                                 |  
| _unrar (tab)_                                |  

##  Git

| Dynamic access to current branch name with the current_branch function |  
| ---------------------------------------------------------------------- |  
| git pull origin $(current_branch)                                      |  
| grb publish $(current_branch) origin                                   |  

| Alias |  Command |  
| ---- | ----  |
| _g_ |  git |  
| _ga_ |  git add |  
| _gaa_ |  git add --all |  
| _gapa_ |  git add --patch |  
| _gb_ |  git branch |  
| _gba_ |  git branch -a |  
| _gbr_ |  git branch --remote |  
| _gc_ |  git commit -v |  
| _gc!_ |  git commit -v --amend |  
| _gca_ |  git commit -v -a |  
| _gca!_ |  git commit -v -a --amend |  
| _gcl_ |  git config --list |  
| _gclean_ |  git clean -fd |  
| _gpristine_ |  git reset --hard && git clean -dfx |  
| _gcm_ |  git checkout master |  
| _gcmsg_ |  git commit -m |  
| _gco_ |  git checkout |  
| _gcount_ |  git shortlog -sn |  
| _gcp_ |  git cherry-pick |  
| _gcs_ |  git commit -S |  
| _gd_ |  git diff |  
| _gdca_ |  git diff --cached |  
| _gdt_ |  git diff-tree --no-commit-id --name-only -r |  
| _gdt_ |  git difftool |  
| _gfa_ |  git fetch --all --prune |  
| _gg_ |  git gui citool |  
| _gga_ |  git gui citool --amend |  
| _ggpnp_ |  git pull origin $(current_branch) && git push origin $(current_branch) |  
| _ggpull_ |  git pull origin $(current_branch) |  
| _ggl_ |  git pull origin $(current_branch) |  
| _ggpur_ |  git pull --rebase origin $(current_branch) |  
| _glum_ |  git pull upstream master |  
| _ggpush_ |  git push origin $(current_branch) |  
| _ggp_ |  git push origin $(current_branch) |  
| _ggsup_ |  git branch --set-upstream-to=origin/$(current_branch) |  
| _gignore_ |  git update-index --assume-unchanged |  
| _gignored_ |  git ls-files -v | grep "^[[:lower:]]" |  
| _git-svn-dcommit-push_ |  git svn dcommit && git push github master:svntrunk |  
| _gk_ |  gitk --all --branches |  
| _gl_ |  git pull |  
| _glg_ |  git log --stat --max-count = 10 |  
| _glgg_ |  git log --graph --max-count = 10 |  
| _glgga_ |  git log --graph --decorate --all |  
| _glo_ |  git log --oneline --decorate --color |  
| _glog_ |  git log --oneline --decorate --color --graph |  
| _glp_ |  _git_log_prettily (git log --pretty=$1) |  
| _gm_ |  git merge |  
| _gmt_ |  git mergetool --no-prompt |  
| _gp_ |  git push |  
| _gpoat_ |  git push origin --all && git push origin --tags |  
| _gr_ |  git remote |  
| _grba_ |  git rebase --abort |  
| _grbc_ |  git rebase --continue |  
| _grbs_ |  git rebase --skip |  
| _grbi_ |  git rebase -i |  
| _grh_ |  git reset HEAD |  
| _grhh_ |  git reset HEAD --hard |  
| _grmv_ |  git remote rename |  
| _grrm_ |  git remote remove |  
| _grset_ |  git remote set-url |  
| _grt_ |  cd $(git rev-parse --show-toplevel || echo ".") |  
| _grup_ |  git remote update |  
| _grv_ |  git remote -v |  
| _gsd_ |  git svn dcommit |  
| _gsps_ |  git show --pretty = short --show-signature |  
| _gsr_ |  git svn rebase |  
| _gss_ |  git status -s |  
| _gst_ |  git status |  
| _gsta_ |  git stash save |  
| _gstaa_ |  git stash apply |  
| _gstd_ |  git stash drop |  
| _gstl_ |  git stash list |  
| _gstp_ |  git stash pop |  
| _gsts_ |  git stash show --text |  
| _gts_ |  git tag -s |  
| _gunignore_ |  git update-index --no-assume-unchanged |  
| _gunwip_ |  git log -n 1 | grep -q -c "--wip--" && git reset HEAD~1 |  
| _gup_ |  git pull --rebase |  
| _gvt_ |  git verify-tag |  
| _gwch_ |  git whatchanged -p --abbrev-commit --pretty = medium |  
| _gwip_ |  git add -A; git ls-files --deleted -z | xargs -r0 git rm; git commit -m "--wip--" |

You also find these commands in Dash as a Cheat-sheet.

##  Editors

| Alias | Command                                                                  |  
| ----- | ------------------------------------------------------------------------ |  
| _stt_ | (When using `sublime` plugin) Open current directory in Sublime Text 2/3 |  
| _v_   | (When using `vi-mode` plugin) Edit current command line in Vim           |  

##  Symfony2

| Alias         | Command                     |  
| ------------- | --------------------------- |  
| _sf_          | php ./app/console           |  
| _sfcl_        | php app/console cache:clear |  
| _sfcontainer_ | sf debug:container          |  
| _sfcw_        | sf cache:warmup             |  
| _sfgb_        | sf generate:bundle          |  
| _sfroute_     | sf debug:router             |  
| _sfsr_        | sf server:run -vvv          |  

##  tmux

| Alias  | Command              |  
| ------ | -------------------- |  
| _ta_   | tmux attach -t       |  
| _tad_  | tmux attach -d -t    |  
| _ts_   | tmux new-session -s  |  
| _tl_   | tmux list-sessions   |  
| _tksv_ | tmux kill-server     |  
| _tkss_ | tmux kill-session -t |  

##  Systemd

###  systemctl

| Command           | Description                              |  
| ----------------- | ---------------------------------------- |  
| _sc-status NAME_  | show the status of the NAME process      |  
| _sc-show NAME_    | show the NAME systemd .service file      |  
| _sc-start NAME_   | start the NAME process                   |  
| _sc-stop NAME_    | stop the NAME process                    |  
| _sc-restart NAME_ | restart the NAME process                 |  
| _sc-enable NAME_  | enable the NAME process to start at boot |  
| _sc-disable NAME_ | disable the NAME process at boot         |  



### Prerequisites

* A Unix-like operating system: macOS, Linux, BSD. On Windows: WSL is preferred, but cygwin or msys also mostly work.
* [Zsh](https://www.zsh.org) should be installed (v4.3.9 or more recent). If not pre-installed (run `zsh --version` to confirm), check the following instructions here: [Installing ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
* `curl` or `wget` should be installed
* `git` should be installed (recommended v1.7.2 or higher)

### Basic Installation

Oh My Zsh is installed by running one of the following commands in your terminal. You can install this via the command-line with either `curl` or `wget`.

#### via curl

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

#### via wget

```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

#### Manual inspection

It's a good idea to inspect the install script from projects you don't yet know. You can do
that by downloading the install script first, looking through it so everything looks normal,
then running it:

```shell
curl -Lo install.sh https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
sh install.sh
```

## Using Oh My Zsh

### Plugins

Oh My Zsh comes with a shitload of plugins to take advantage of. You can take a look in the [plugins](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins) directory and/or the [wiki](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins) to see what's currently available.

#### Enabling Plugins

Once you spot a plugin (or several) that you'd like to use with Oh My Zsh, you'll need to enable them in the `.zshrc` file. You'll find the zshrc file in your `$HOME` directory. Open it with your favorite text editor and you'll see a spot to list all the plugins you want to load.

```shell
vi ~/.zshrc
```

For example, this might begin to look like this:

```shell
plugins=(
  git
  bundler
  dotenv
  osx
  rake
  rbenv
  ruby
)
```

_Note that the plugins are separated by whitespace. **Do not** use commas between them._

#### Using Plugins

Most plugins (should! we're working on this) include a __README__, which documents how to use them.

### Themes

We'll admit it. Early in the Oh My Zsh world, we may have gotten a bit too theme happy. We have over one hundred themes now bundled. Most of them have [screenshots](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) on the wiki. Check them out!

#### Selecting a Theme

_Robby's theme is the default one. It's not the fanciest one. It's not the simplest one. It's just the right one (for him)._

Once you find a theme that you'd like to use, you will need to edit the `~/.zshrc` file. You'll see an environment variable (all caps) in there that looks like:

```shell
ZSH_THEME="robbyrussell"
```

To use a different theme, simply change the value to match the name of your desired theme. For example:

```shell
ZSH_THEME="agnoster" # (this is one of the fancy ones)
# see https://github.com/ohmyzsh/ohmyzsh/wiki/Themes#agnoster
```

_Note: many themes require installing the [Powerline Fonts](https://github.com/powerline/fonts) in order to render properly._

Open up a new terminal window and your prompt should look something like this:

![Agnoster theme](https://cloud.githubusercontent.com/assets/2618447/6316862/70f58fb6-ba03-11e4-82c9-c083bf9a6574.png)

In case you did not find a suitable theme for your needs, please have a look at the wiki for [more of them](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes).

If you're feeling feisty, you can let the computer select one randomly for you each time you open a new terminal window.


```shell
ZSH_THEME="random" # (...please let it be pie... please be some pie..)
```

And if you want to pick random theme from a list of your favorite themes:

```shell
ZSH_THEME_RANDOM_CANDIDATES=(
  "robbyrussell"
  "agnoster"
)
```

If you only know which themes you don't like, you can add them similarly to a blacklist:

```shell
ZSH_THEME_RANDOM_BLACKLIST=(pygmalion tjkirch_mod)
```

### FAQ

If you have some more questions or issues, you might find a solution in our [FAQ](https://github.com/ohmyzsh/ohmyzsh/wiki/FAQ).

## Advanced Topics

If you're the type that likes to get their hands dirty, these sections might resonate.

### Advanced Installation

Some users may want to manually install Oh My Zsh, or change the default path or other settings that
the installer accepts (these settings are also documented at the top of the install script).

#### Custom Directory

The default location is `~/.oh-my-zsh` (hidden in your home directory)

If you'd like to change the install directory with the `ZSH` environment variable, either by running
`export ZSH=/your/path` before installing, or by setting it before the end of the install pipeline
like this:

```shell
ZSH="$HOME/.dotfiles/oh-my-zsh" sh install.sh
```

#### Unattended install

If you're running the Oh My Zsh install script as part of an automated install, you can pass the
flag `--unattended` to the `install.sh` script. This will have the effect of not trying to change
the default shell, and also won't run `zsh` when the installation has finished.

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
```

#### Installing from a forked repository

The install script also accepts these variables to allow installation of a different repository:

- `REPO` (default: `ohmyzsh/ohmyzsh`): this takes the form of `owner/repository`. If you set
  this variable, the installer will look for a repository at `https://github.com/{owner}/{repository}`.

- `REMOTE` (default: `https://github.com/${REPO}.git`): this is the full URL of the git repository
  clone. You can use this setting if you want to install from a fork that is not on GitHub (GitLab,
  Bitbucket...) or if you want to clone with SSH instead of HTTPS (`git@github.com:user/project.git`).

  _NOTE: it's incompatible with setting the `REPO` variable. This setting will take precedence._

- `BRANCH` (default: `master`): you can use this setting if you want to change the default branch to be
  checked out when cloning the repository. This might be useful for testing a Pull Request, or if you
  want to use a branch other than `master`.

For example:

```shell
REPO=apjanke/oh-my-zsh BRANCH=edge sh install.sh
```

#### Manual Installation

##### 1. Clone the repository:

```shell
git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh
```

##### 2. *Optionally*, backup your existing `~/.zshrc` file:

```shell
cp ~/.zshrc ~/.zshrc.orig
```

##### 3. Create a new zsh configuration file

You can create a new zsh config file by copying the template that we have included for you.

```shell
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

##### 4. Change your default shell

```shell
chsh -s $(which zsh)
```

You must log out from your user session and log back in to see this change.

##### 5. Initialize your new zsh configuration

Once you open up a new terminal window, it should load zsh with Oh My Zsh's configuration.

### Installation Problems

If you have any hiccups installing, here are a few common fixes.

* You _might_ need to modify your `PATH` in `~/.zshrc` if you're not able to find some commands after
switching to `oh-my-zsh`.
* If you installed manually or changed the install location, check the `ZSH` environment variable in
`~/.zshrc`.

### Custom Plugins and Themes

If you want to override any of the default behaviors, just add a new file (ending in `.zsh`) in the `custom/` directory.

If you have many functions that go well together, you can put them as a `XYZ.plugin.zsh` file in the `custom/plugins/` directory and then enable this plugin.

If you would like to override the functionality of a plugin distributed with Oh My Zsh, create a plugin of the same name in the `custom/plugins/` directory and it will be loaded instead of the one in `plugins/`.

## Getting Updates

By default, you will be prompted to check for upgrades every few weeks. If you would like `oh-my-zsh` to automatically upgrade itself without prompting you, set the following in your `~/.zshrc`:

```shell
DISABLE_UPDATE_PROMPT=true
```

To disable automatic upgrades, set the following in your `~/.zshrc`:

```shell
DISABLE_AUTO_UPDATE=true
```

### Manual Updates

If you'd like to upgrade at any point in time (maybe someone just released a new plugin and you don't want to wait a week?) you just need to run:

```shell
upgrade_oh_my_zsh
```

Magic! 🎉

## Uninstalling Oh My Zsh

Oh My Zsh isn't for everyone. We'll miss you, but we want to make this an easy breakup.

If you want to uninstall `oh-my-zsh`, just run `uninstall_oh_my_zsh` from the command-line. It will remove itself and revert your previous `bash` or `zsh` configuration.

## How do I contribute to Oh My Zsh?

Before you participate in our delightful community, please read the [code of conduct](CODE_OF_CONDUCT.md).

I'm far from being a [Zsh](https://www.zsh.org/) expert and suspect there are many ways to improve – if you have ideas on how to make the configuration easier to maintain (and faster), don't hesitate to fork and send pull requests!

We also need people to test out pull-requests. So take a look through [the open issues](https://github.com/ohmyzsh/ohmyzsh/issues) and help where you can.

See [Contributing](CONTRIBUTING.md) for more details.

### Do NOT send us themes

We have (more than) enough themes for the time being. Please add your theme to the [external themes](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes) wiki page.

## Contributors

Oh My Zsh has a vibrant community of happy users and delightful contributors. Without all the time and help from our contributors, it wouldn't be so awesome.
