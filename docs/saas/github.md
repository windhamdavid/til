# Github

## Log

- 24/12/01 - spent a good chunk of time in Github customizing workflows and devcontainers recently so that I can work from [my iPad](/docs/computers/lisa.md) and have a better co-authoring workflow.

### Docs

https://docs.github.com/  
https://formulae.brew.sh/formula/gh
```sh
brew install gh
```
### Pages

https://docs.github.com/en/pages

- always use a specific branch
- Repo Settings -> Evironments -> Deployment Branches

### CLI

https://cli.github.com  
https://docs.github.com/en/github-cli/github-cli

### Codespaces

https://github.com/features/codespaces  
https://docs.github.com/en/codespaces

### Actions

https://docs.github.com/en/actions

#### Using Rsync with Keys

https://github.com/shimataro/ssh-key-action

```sh
cd ~/.ssh
ssh-keygen -t rsa -f git-zeke-action -b 4096 -C "david@ovid.local"
Generating public/private sa key pair.
Enter passphrase (empty for no passphrase): # leave it empty
You indetification has been saved in git-zeke-action.
```

```sh
# login to server and copy over git-zeke-action
cat git-zeke-action.pub >> ~/.ssh/authorized_keys
```

Github Repo > Settings > Secrets

```yml title="deploy-prod.yml"
- name: gwsc-deploy-key
  uses: shimataro/ssh-key-action@v2
  with:
    key: ${{ secrets.GIT_ZEKE_KEY }}
    known_hosts: unnecessary
    if_key_exists: fail

- name: gwsc-known_hosts
  run: ssh-keyscan -p ${{ secrets.GIT_ZEKE_PORT }} -H ${{ secrets.GIT_ZEKE_HOST }} >> ~/.ssh/known_hosts

- name: gwsc-rsync
  run: rsync -aPvz -e "ssh -p ${{ secrets.GIT_ZEKE_PORT }}" --exclude=img/.DS_Store --exclude=robots.txt --delete build/ ${{ secrets.GIT_ZEKE_USER }}@${{ secrets.GIT_ZEKE_HOST }}:/var/www/domain.com/html/
```

