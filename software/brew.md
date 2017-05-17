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