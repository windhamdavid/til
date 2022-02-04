

[https://photo.davidawindham.com/](https://photo.davidawindham.com/)  
[https://code.davidawindham.com/david/lychee](https://code.davidawindham.com/david/lychee)  
~~[https://github.com/electerious/Lychee](https://github.com/electerious/Lychee)~~  
[https://github.com/LycheeOrg/Lychee](https://github.com/LycheeOrg/Lychee)  

**12/21/03** - in the process of adding some family photos, I noticed that the original repo has moved to it's own organization with volunteer maintainers. ( Also looks like they boated it up with Laravel too ) Added the new upstream repositories but I noticed that PHP 7.4 support has been dropped to upgrade to v4.4.0. Will deal with this on new server later. 

```shell
david@ovid:~/sites/daw_photo(master○) » git remote -v                                                                      1 ↵
code	https://code.davidawindham.com/david/lychee.git (fetch)
code	https://code.davidawindham.com/david/lychee.git (push)
origin	https://github.com/windhamdavid/Lychee.git (fetch)
origin	https://github.com/windhamdavid/Lychee.git (push)
upstream	https://github.com/LycheeOrg/Lychee.git (fetch)
upstream	https://github.com/LycheeOrg/Lychee.git (push)
david@ovid:~/sites/daw_photo(master○) » git fetch upstream
remote: Enumerating objects: 13375, done.
remote: Counting objects: 100% (5170/5170), done.
remote: Compressing objects: 100% (2256/2256), done.
remote: Total 13375 (delta 3648), reused 4195 (delta 2821), pack-reused 8205
Receiving objects: 100% (13375/13375), 37.47 MiB | 24.77 MiB/s, done.
Resolving deltas: 100% (9403/9403), done.
From https://github.com/LycheeOrg/Lychee
 * [new branch]        azure-pipelines      -> upstream/azure-pipelines
 * [new branch]        build_docker         -> upstream/build_docker
 * [new branch]        consistent_json_api  -> upstream/consistent_json_api
 * [new branch]        enable-phpstan       -> upstream/enable-phpstan
 * [new branch]        faster-ghostbusting  -> upstream/faster-ghostbusting
 * [new branch]        fix-search           -> upstream/fix-search
 * [new branch]        keyboard-navigation  -> upstream/keyboard-navigation
 * [new branch]        livewire/more-work   -> upstream/livewire/more-work
 * [new branch]        master               -> upstream/master
 * [new branch]        refactor_photo_model -> upstream/refactor_photo_model
 * [new branch]        wip-symlink-except   -> upstream/wip-symlink-except
 * [new tag]           v4.0.0               -> v4.0.0
 * [new tag]           v4.0.0-alpha.1       -> v4.0.0-alpha.1
 * [new tag]           v4.0.0-beta.1        -> v4.0.0-beta.1
 * [new tag]           v4.0.0-beta.2        -> v4.0.0-beta.2
 * [new tag]           v4.0.1               -> v4.0.1
 * [new tag]           v4.0.2               -> v4.0.2
 * [new tag]           v4.0.3               -> v4.0.3
 * [new tag]           v4.0.4               -> v4.0.4
 * [new tag]           v4.0.5               -> v4.0.5
 * [new tag]           v4.0.6               -> v4.0.6
 * [new tag]           v4.0.7               -> v4.0.7
 * [new tag]           v4.0.8               -> v4.0.8
 * [new tag]           v4.1.0               -> v4.1.0
 * [new tag]           v4.2.0               -> v4.2.0
 * [new tag]           v4.2.1               -> v4.2.1
 * [new tag]           v4.2.2               -> v4.2.2
 * [new tag]           v4.3.0               -> v4.3.0
 * [new tag]           v4.3.4               -> v4.3.4
 * [new tag]           v4.3.5               -> v4.3.5
 * [new tag]           v4.3.6               -> v4.3.6
 * [new tag]           v4.4.0               -> v4.4.0
```

```shell
david@macs:~/sites/lychee(dw○) » git remote -v
code	https://code.davidawindham.com/david/lychee.git (fetch)
code	https://code.davidawindham.com/david/lychee.git (push)
origin	https://github.com/windhamdavid/Lychee.git (fetch)
origin	https://github.com/windhamdavid/Lychee.git (push)
upstream	https://github.com/electerious/Lychee.git (fetch)
upstream	https://github.com/electerious/Lychee.git (push)
david@macs:~/sites/lychee(dw○) » git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
david@macs:~/sites/lychee(master○) » git fetch upstream
remote: Counting objects: 35, done.
remote: Total 35 (delta 22), reused 22 (delta 22), pack-reused 13
Unpacking objects: 100% (35/35), done.
From https://github.com/electerious/Lychee
   cd471be..34d2c74  develop    -> upstream/develop
   3eaaed7..27f207d  master     -> upstream/master
 * [new tag]         v3.1.6     -> v3.1.6
david@macs:~/sites/lychee(master○) » git merge upstream/master
Updating 3eaaed7..27f207d
Fast-forward
 .htaccess             |   7 +++++++
 LICENSE               |   2 +-
 README.md             |   2 +-
 dist/main.js          | Bin 193340 -> 192803 bytes
 dist/view.js          | Bin 111887 -> 111440 bytes
 docs/Changelog.md     |   7 +++++++
 php/Modules/Album.php |   2 --
 src/package.json      |  20 ++++++++++----------
 src/scripts/lychee.js |   4 ++--
 9 files changed, 28 insertions(+), 16 deletions(-)
 mode change 100755 => 100644 dist/view.js
david@macs:~/sites/lychee(master○) » git checkout dw
Switched to branch 'dw'
david@macs:~/sites/lychee(dw○) » git merge master
david@macs:~/sites/lychee/src(dw⚡) » gulp
[14:03:11] Using gulpfile ~/Sites/Lychee/src/gulpfile.js
[14:03:11] Starting 'view--svg'...
[14:03:11] Starting 'view--js'...
[14:03:11] Starting 'main--svg'...
[14:03:11] Starting 'main--js'...
[14:03:11] Starting 'main--styles'...
[14:03:11] gulp-inject 2 files into view.php.
[14:03:11] gulp-inject 2 files into index.html.
[14:03:12] Finished 'main--svg' after 403 ms
[14:03:12] Finished 'view--svg' after 905 ms
[14:03:12] Finished 'main--styles' after 1.25 s
[14:03:12] Finished 'view--js' after 1.71 s
[14:03:12] Starting 'view--scripts'...
[14:03:14] Finished 'view--scripts' after 1.74 s
[14:03:15] Finished 'main--js' after 3.81 s
[14:03:15] Starting 'main--scripts'...
[14:03:17] Finished 'main--scripts' after 1.91 s
[14:03:17] Starting 'default'...
[14:03:17] Starting 'clean'...
[14:03:17] Finished 'default' after 15 ms
[14:03:17] Finished 'clean' after 21 ms
david@macs:~/sites/lychee/src(dw⚡) » git status

resolve Unmerged paths -> commit & Push

david@woozer:/var/www/photo.davidawindham.com/html(dw○) » git pull origin dw
```
