# macs
my main machine
#### [https://davidawindham.com/anthropomorphizing-machines/](https://davidawindham.com/anthropomorphizing-machines/)

#### notes:

using mkcert
```sh
david@macs:/usr/local/etc/httpd/ssl » openssl version                                                                      130 ↵
OpenSSL 1.1.1d  10 Sep 2019
brew install mkcert nss
cd ~
mkcert daw.macs
    Run "mkcert -install" to avoid verification errors ‼️
sudo mv daw.macs.pem /usr/local/etc/httpd/ssl/
sudo vi /usr/local/httpd/extra/httpd-vhosts.conf httpd-vhosts.conf
```

while migrating a bunch of websites around I had to be able to switch versions of php easily to test them. hat tip [https://getgrav.org/blog/macos-catalina-apache-multiple-php-versions](https://getgrav.org/blog/macos-catalina-apache-multiple-php-versions)

```sh
brew install php@7.2
brew install php@7.4
curl -L https://gist.githubusercontent.com/rhukster/f4c04f1bf59e0b74e335ee5d186a98e2/raw > /usr/local/bin/sphp
chmod +x /usr/local/bin/sphp
sphp 7.2
sphp 7.4

############### had to redo pecl in 7.4.2 -> 7.4.4 update ######
### https://davidawindham.com/til/lang/php.html

david@macs:~ » php --ini  
Configuration File (php.ini) Path: /usr/local/etc/php/7.4  
Loaded Configuration File:         /usr/local/etc/php/7.4/php.ini  
extension=/usr/local/Cellar/php/7.4.2/pecl/20190902/imagick.so  
extension=/usr/local/Cellar/php/7.4.2/pecl/20190902/mcrypt.so  
extension=/usr/local/Cellar/php/7.4.2/pecl/20190902/redis.so  
zend_extension=/usr/local/Cellar/php/7.4.2/pecl/20190902/xdebug.so  

LoadModule deflate_module libexec/apache2/mod_deflate.so  
LoadModule expires_module libexec/apache2/mod_expires.so  
LoadModule rewrite_module libexec/apache2/mod_rewrite.so  

david@macs:~ » pecl list  
imagick 3.4.4   stable  
mcrypt  1.0.3   stable  
redis   5.1.1   stable  
xdebug  2.9.1   stable

################ I keep starting the built in Apache ###############
## stop using this version
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist 2>/dev/null

brew services start httpd
sudo vi /usr/local/etc/httpd/httpd.conf
sudo vi /usr/local/etc/httpd/extra/httpd-ssl.conf
ErrorLog "/usr/local/var/log/httpd/error_log"
CustomLog "/usr/local/var/log/httpd/access_log" common

sudo apachectl -k restart

```
* 20/03/29 - brew ls


```sh
brew list
david@macs:/usr/local/etc/php/7.4 » brew list                                                        127 ↵
adns				libassuan			openexr
aom				libbluray			openjpeg
apr				libde265			openldap
apr-util			libev				openssl
argon2				libevent			openssl@1.1
aspell				libffi				opus
autoconf			libgcrypt			p11-kit
automake			libgpg-error			pandoc
boost				libheif				pcre
brew-cask			libidn				php
brotli				libidn2				php@7.2
c-ares				libksba				phpunit
cairo				libmetalink			pinentry
composer			libogg				pixman
curl-openssl			libomp				pkg-config
dnsmasq				libpng				postgresql
faac				libpq				python
ffmpeg				libpqxx				python@2
flac				libsamplerate			readline
fontconfig			libsndfile			redis
freetds				libsodium			rtmpdump
freetype			libsoxr				rubberband
frei0r				libssh2				sdl2
fribidi				libtasn1			shared-mime-info
gdbm				libtiff				snappy
gettext				libtool				speex
giflib				libunistring			sphinx-doc
gist				libusb				sqlite
glib				libvidstab			tesseract
gmp				libvorbis			texi2html
gnupg				libvpx				theora
gnutls				libxml2				tidy-html5
go				libyaml				tmux
graphite2			libzip				unbound
harfbuzz			little-cms2			unixodbc
heroku				lzo				utf8proc
heroku-node			makedepend			webp
httpd				mcrypt				wp-cli
httpd24				mhash				x264
httrack				ncurses				x265
icu4c				nettle				xvid
ilmbase				nghttp2				xz
imagemagick			nginx				yarn
jansson				ngrok				yasm
jemalloc			node				zlib
jpeg				npth				zsh-history-substring-search
lame				nvm				zsh-syntax-highlighting
leptonica			oniguruma
libass				opencore-amr
david@macs:/usr/local/etc/php/7.4 »
```
