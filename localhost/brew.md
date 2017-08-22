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
