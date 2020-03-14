# Node.js

* [https://nodejs.org](https://nodejs.org)
* [https://github.com/sindresorhus/awesome-nodejs/blob/master/readme.md](https://github.com/sindresorhus/awesome-nodejs/blob/master/readme.md)

* [npm](npm.md)
* [awesome-nodejs](node_awesome.md)
* [https://github.com/nodesource/distributions](https://github.com/nodesource/distributions)
* [https://github.com/creationix/nvm](https://github.com/creationix/nvm)
* [https://github.com/nodesource](https://github.com/nodesource)




##### setup

```
///nvm localhost
nvm ls
nvm ls-remote
nvm use v6.10.3
nvm run node --version
nvm uninstall v0.1.0

alias               deactivate          install             ls                  run                 unload
clear-cache         exec                list                ls-remote           unalias             use
current             help                list-remote         reinstall-packages  uninstall           version

///package remote
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs


```


##### Calling `nvm use` automatically in a directory with a `.nvmrc` file

Put this into your `$HOME/.zshrc` to call `nvm use` automatically whenever you enter a directory that contains an
`.nvmrc` file with a string telling nvm which node to `use`:

```zsh
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```
