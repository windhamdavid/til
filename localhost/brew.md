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

