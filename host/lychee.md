# Lychee

[https://photo.davidawindham.com/](https://photo.davidawindham.com/)  
[https://code.davidawindham.com/david/lychee](https://code.davidawindham.com/david/lychee)  
[https://github.com/electerious/Lychee](https://github.com/electerious/Lychee)  

```
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
