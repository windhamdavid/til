


[January 2020 Updates:(TIL)](/index)
* upgraded (macs/magic/gg) to [MacOS Catalina 10.15](apple.md)
* upgraded npm, nvm, and rvm.
```
david@macs:~ » nvm ls
        v6.10.3
        v6.11.2
         v7.6.0
         v8.4.0
        v8.11.4
        v8.12.0
->     v10.16.3
default -> 10.16 (-> v10.16.3)
node -> stable (-> v10.16.3) (default)
stable -> 10.16 (-> v10.16.3) (default)
iojs -> iojs- (-> system) (default)
lts/* -> lts/dubnium (-> v10.16.3)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.16.1 (-> N/A)
lts/dubnium -> v10.16.3

david@macs:~ » rvm ls                                                                                     
   ruby-2.2.3 [ x86_64 ]
   ruby-2.3.1 [ x86_64 ]
   ruby-2.4.0 [ x86_64 ]
   ruby-2.4.1 [ x86_64 ]
   ruby-2.4.4 [ x86_64 ]
   ruby-2.5.1 [ x86_64 ]
=* ruby-2.7.0 [ x86_64 ]

david@macs:~ » npm -v                                                                                               1 ↵
6.9.0
```
* upgraded [MySQL](/docs/db/mysql) to v.8.0.19  
* added [DBEngin](https://dbngin.com/) which is a nice UI to stop start anything homebrew installed. Makes it easy to stop/start when testing.
```sh
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
