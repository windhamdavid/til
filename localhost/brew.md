# Homebrew

[http://docs.brew.sh/](http://docs.brew.sh/)  
[https://github.com/Homebrew/brew/](https://github.com/Homebrew/brew/)

```
//

brew help
brew update
brew outdated
brew upgrade
brew upgrade <formula>

brew doctor

//stop certain formulae from being updated
brew pin <formula>
brew unpin <formula>

//see what's being cleaned up
brew cleanup -n
brew cleanup
brew cleanup <formula>

```

#### kegs
01/20/20:
```
david@macs:~ » brew -v    
Homebrew 2.2.5
Homebrew/homebrew-core (git revision a79229; last commit 2020-02-06)
Homebrew/homebrew-cask (git revision 12439; last commit 2020-02-06)

david@macs:~ » brew list --versions
adns 1.5.1 aom 1.0.0
apr 1.7.0
apr-util 1.6.1_3
argon2 20190702_1
aspell 0.60.8
autoconf 2.69
automake 1.16.1_1
boost 1.72.0
brew-cask 0.60.1
brotli 1.0.7
c-ares 1.15.0
cairo 1.16.0_2
composer 1.9.3
curl-openssl 7.68.0
dnsmasq 2.80
faac 1.29.9.2
ffmpeg 4.2.2_1
flac 1.3.3
fontconfig 2.13.1
freetds 1.1.24
freetype 2.10.1
frei0r 1.7.0
fribidi 1.0.8
gdbm 1.18.1
gettext 0.20.1
giflib 5.2.1
gist 5.0.0
glib 2.62.4
gmp 6.1.2_2
gnupg 2.2.19
gnutls 3.6.12
graphite2 1.3.13
harfbuzz 2.6.4
heroku 7.37.0
heroku-node 12.13.0
httpd 2.4.41_1
httrack 3.49.2_1
icu4c 64.2
ilmbase 2.4.0
imagemagick 7.0.9-21
jansson 2.12
jemalloc 5.2.1
jpeg 9d
lame 3.100
leptonica 1.79.0
libass 0.14.0_1
libassuan 2.5.3
libbluray 1.1.2
libde265 1.0.5
libev 4.31
libevent 2.1.11_1
libffi 3.2.1
libgcrypt 1.8.5
libgpg-error 1.36
libheif 1.6.2
libidn 1.35
libidn2 2.3.0
libksba 1.3.5
libmetalink 0.1.3
libogg 1.3.4
libomp 9.0.1
libpng 1.6.37
libpq 12.1_1
libpqxx 6.4.5_4
libsamplerate 0.1.9_1
libsndfile 1.0.28
libsodium 1.0.18_1
libsoxr 0.1.3
libssh2 1.9.0_1
libtasn1 4.16.0
libtiff 4.1.0
libtool 2.4.6_1
libunistring 0.9.10
libusb 1.0.23
libvidstab 1.1.0
libvorbis 1.3.6
libvpx 1.8.2
libxml2 2.9.10
libyaml 0.2.2
libzip 1.6.1
little-cms2 2.9
lzo 2.10
makedepend 1.0.6
mcrypt 2.6.8
mhash 0.9.9.9
ncurses 6.1_1
nettle 3.4.1
nghttp2 1.40.0
nginx 1.17.8
ngrok 1.7.1
node 13.8.0
npth 1.6
nvm 0.35.2
oniguruma 6.9.4
opencore-amr 0.1.5
openexr 2.4.0
openjpeg 2.3.1
openldap 2.4.49
openssl 1.0.2s
openssl@1.1 1.1.1d
opus 1.3.1
p11-kit 0.23.20
pcre 8.43
php 7.4.2
phpunit 8.5.2
pinentry 1.1.0_1
pixman 0.38.4
pkg-config 0.29.2
postgresql 12.1
python 3.7.6_1
python@2 2.7.17_1
readline 8.0.1
redis 5.0.7
rtmpdump 2.4+20151223_1
rubberband 1.8.2_1
sdl2 2.0.10
shared-mime-info 1.15
snappy 1.1.8
speex 1.2.0
sphinx-doc 2.3.1
sqlite 3.31.1
tesseract 4.1.1
texi2html 5.0
theora 1.1.1
tidy-html5 5.6.0
unbound 1.9.6
unixodbc 2.3.7
webp 1.1.0
wp-cli 2.4.0
x264 r2917_1
x265 3.2.1
xvid 1.3.7
xz 5.2.4
yarn 1.22.0
yasm 1.3.0_2
zlib 1.2.11
zsh-history-substring-search 1.0.2
zsh-syntax-highlighting 0.6.0
```

```
david@macs:~ » brew list
adns		gist		libffi		libxml2		node		pinentry	xz
autoconf	gmp		libgcrypt	libyaml		npth		pkg-config	yasm
automake	gnupg		libgpg-error	makedepend	nvm		readline	zlib
brew-cask	gnutls		libksba		mcrypt		openssl		redis
dnsmasq		httrack		libpng		mhash		openssl@1.1	texi2html
faac		icu4c		libtasn1	mongodb		p11-kit		unixodbc
ffmpeg		jpeg		libtool		nettle		pcre		wp-cli
freetype	lame		libunistring	nginx		php70		x264
gettext		libassuan	libusb		ngrok		php70-mcrypt	xvid
```
```
08/17/17

david@macs:~/sites/juryd-2 » brew outdated
apr (1.5.2_3) < 1.6.2
apr-util (1.5.4_4) < 1.6.0
automake (1.15) < 1.15.1
dnsmasq (2.76) < 2.77_3
faac (1.28) < 1.29
ffmpeg (3.3.1) < 3.3.3
gnupg (2.1.21) < 2.1.23
gnutls (3.5.12) < 3.5.14
homebrew/apache/httpd24 (2.4.25) < 2.4.27
httrack (3.49.1) < 3.49.2
icu4c (58.2) < 59.1
jpeg (8d) < 9b
libgcrypt (1.7.6) < 1.8.0
libpng (1.6.29) < 1.6.31
libtasn1 (4.10) < 4.12
libxml2 (2.9.4_2) < 2.9.4_3
mongodb (3.4.4) < 3.4.7
nginx (1.12.0_1) < 1.12.1
node (7.10.0) < 8.4.0
npth (1.4) < 1.5
openssl (1.0.2k) < 1.0.2l
openssl@1.1 (1.1.0e) < 1.1.0f
p11-kit (0.23.5) < 0.23.7
pcre (8.40) < 8.41
homebrew/php/php70 (7.0.18_10) < 7.0.22_14
homebrew/php/php70-mcrypt (7.0.18_10) < 7.0.22_14
homebrew/php/php71 (7.1.5_17) < 7.1.8_20
redis (3.2.9) < 4.0.1
homebrew/php/wp-cli (1.1.0) < 1.3.0
x264 (r2748) < r2795
yarn (0.24.5) < 0.27.5_1
yasm (1.3.0) < 1.3.0_1
david@macs:~/sites/juryd-2 » brew upgrade nginx

```

#### PHP 7.1 Upgrade
After removing old homebrew php versions, built in apache wouldn't start.
[https://github.com/Homebrew/homebrew-php/issues/3601](https://github.com/Homebrew/homebrew-php/issues/3601)

```
david@macs:~ » sudo apachectl configtest
httpd: Syntax error on line 118 of /private/etc/apache2/httpd.conf: Cannot load /usr/local/opt/php70/libexec/apache2/libphp7.so into server: dlopen(/usr/local/opt/php70/libexec/apache2/libphp7.so, 10): image not found

david@macs:~ » sudo vi /etc/apache2/httpd.conf
//comment out old php
//#LoadModule php7_module    /usr/local/opt/php70/libexec/apache2/libphp7.so
//LoadModule php7_module /usr/local/opt/php71/libexec/apache2/libphp7.so

//update x-code build tools
david@macs:~ » xcode-select --install

david@macs:~ » brew install php71 --with-httpd24

//load into .zshrc
export PATH="$(brew --prefix homebrew/php/php71)/bin:$PATH"

david@macs:~ » sudo apachectl restart
[Mon May 22 10:23:46.853689 2017] [so:warn] [pid 11606] AH01574: module php7_module is already loaded, skipping

david@macs:~ » brew unlink httpd24
// see issue #3601 above

david@macs:~ » sudo apachectl configtest
Password:
Syntax OK
david@macs:~ » sudo apachectl restart

```
