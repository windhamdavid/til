# Magic 🖥

My secondary machine ( i7 mac mini )  
My current main machine is [Macs](macs)  
**[https://davidawindham.com/mac-mini/](https://davidawindham.com/mac-mini/)**  
**[https://davidawindham.com/anthropomorphizing-machines/](https://davidawindham.com/anthropomorphizing-machines/)**  
**[https://davidawindham.com/arm/](https://davidawindham.com/arm/)**

### Notes:
**22/11/8** - Preparing for my annual machine cleaning and migration to ARM.  In doing so, I've moved the magic mini up to the office to act as a server on which to drop my development projects during the migration. I previously had used the mini as a media server in the den but I've found that it's easier to user AirPlay from a tablet.  I'll leave a breadcrumb trail here of the specifics as a reference. 
```sh
$magic
```
### Network
Moved it to have an ethernet connection to the main router and reserved the IP address: **192.168.7.177** so that it's available to all of the machines on the network. 

### Storage
Renamed the drive ( MiniSSD ) and wiped clean the original 1TB disc ( Magick ) to use as a NAS backup drive. Added my two Lacie drives ( Silverbullet / Farpoe ) so that they are accessible via the network. Changed the file permissions to allow Remote Management and access. 

### Operating System
It's going to be permanently stuck on MacOS 11 Catalina due to Monterey not supporting it. Installed the lastest XCode command line tools to bring Homebrew up to speed. Matched up the software on macs so I have duplicates and I'm making notes on which ones are x86, universal, and ARM native.

### Terminal
Oh My ZSH configuration to match servers and other machines. I use an identifying emoji ( Macs 🐶 / Magic 🎱 / Zeke 🦊 / Woozer 🐻  )for each prompt to make it easier to differentiate the machines.
Migrated dotfiles using my repo @ [https://code.davidawindham.com/david/dotfiles](https://code.davidawindham.com/david/dotfiles)

### Databases
Duplicated all of my existing project databases:
- MySQL 8.0.26 x86 64bit
- PostGreSQL 13.4 
- MongoDB 4.4
- Redis 6.2

### Languages
- PHP 7.4.24 & 8.0.11
- Ruby 2.7.4 & 3.0.2 ( via RVM )
- Python 3.9.7
- GoLang 1.17.3 
- Node 16.13 & 17.0.1 ( via NVM )

### Software
- Abandoned 
  - RDM ( Redis Now in TablesPlus )
  - Colloquy ( No IRC anymore )
  
- Migrated
  - TablesPlus
  - Sequel Pro
  - MongoDB Compass
  - Docker
  - DBengin
  - Postman/Insomnia
  - Vercel Now
  - WebStorm/RubyMine/PyCharm/PhpStorm/GoLand
  - VSCode/Textmate/Sublime/Atom/CodeKit
  - AdobeCC/Sketch/Sip
  - Final Cut/Audio Hijack/VLC/Handbrake/Screenflow/Licecap
  - Keybase/Slack/Zoom
  - Apache/Nginx
  - Homebrew 3.3.3
  
### Homebrew
```sh
brew leaves | column
```
|            |  |                      |
|--------------------|-------------|------------------------------|
| automake           | libmetalink | php@7.2                      |
| boost              | libpqxx     | php@7.4                      |
| composer           | libxml2     | phpunit                      |
| dnsmasq            | libyaml     | postgresql                   |
| faac               | makedepend  | redis                        |
| ffmpeg             | mcrypt      | sphinx-doc                   |
| gist               | mkcert      | texi2html                    |
| gnupg              | mysql@5.7   | tmux                         |
| go                 | nghttp2     | wp-cli                       |
| heroku/brew/heroku | nginx       | yarn                         |
| httpd              | nss         | yasm                         |
| httrack            | nvm         | zlib                         |
| ilmbase            | pandoc      | zsh-history-substring-search |
| imagemagick        | php         | zsh-syntax-highlighting      |

```sh
brew list
```

|                       |                  |                              |
|-----------------------|------------------|------------------------------|
| adns                  | leptonica        | nspr                         |
| aom                   | libass           | nss                          |
| apr                   | libassuan        | nvm                          |
| apr-util              | libbluray        | oniguruma                    |
| argon2                | libde265         | opencore-amr                 |
| aspell                | libev            | openexr                      |
| autoconf              | libevent         | openjpeg                     |
| automake              | libffi           | openldap                     |
| bdw-gc                | libgcrypt        | openssl@1.1                  |
| boost                 | libgpg-error     | opus                         |
| brotli                | libheif          | p11-kit                      |
| c-ares                | libidn           | pandoc                       |
| ca-certificates       | libidn2          | pcre                         |
| cairo                 | libksba          | pcre2                        |
| composer              | liblqr           | php                          |
| curl                  | libmetalink      | php@7.2                      |
| curl-openssl          | libnghttp2       | php@7.4                      |
| dav1d                 | libogg           | phpunit                      |
| dnsmasq               | libomp           | pinentry                     |
| docbook               | libpng           | pixman                       |
| docbook-xsl           | libpq            | pkg-config                   |
| faac                  | libpqxx          | postgresql                   |
| ffmpeg                | libpthread-stubs | python@3.10                  |
| flac                  | libsamplerate    | python@3.9                   |
| fontconfig            | libsndfile       | rav1e                        |
| freetds               | libsodium        | readline                     |
| freetype              | libsoxr          | redis                        |
| frei0r                | libssh2          | rtmpdump                     |
| fribidi               | libtasn1         | rubberband                   |
| gd                    | libtiff          | sdl2                         |
| gdbm                  | libtool          | shared-mime-info             |
| gettext               | libunistring     | snappy                       |
| ghostscript           | libusb           | speex                        |
| giflib                | libvidstab       | sphinx-doc                   |
| gist                  | libvmaf          | sqlite                       |
| glib                  | libvorbis        | srt                          |
| gmp                   | libvpx           | tesseract                    |
| gnu-getopt            | libx11           | texi2html                    |
| gnupg                 | libxau           | theora                       |
| gnutls                | libxcb           | tidy-html5                   |
| go                    | libxdmcp         | tmux                         |
| gobject-introspection | libxext          | unbound                      |
| graphite2             | libxml2          | unixodbc                     |
| guile                 | libxrender       | utf8proc                     |
| harfbuzz              | libyaml          | webp                         |
| heroku                | libzip           | wp-cli                       |
| heroku-node           | little-cms2      | x264                         |
| httpd                 | lzo              | x265                         |
| httpd24               | m4               | xmlto                        |
| httrack               | makedepend       | xorgproto                    |
| icu4c                 | mcrypt           | xvid                         |
| ilmbase               | mhash            | xz                           |
| imagemagick           | mkcert           | yarn                         |
| imath                 | mpdecimal        | yasm                         |
| jansson               | mysql@5.7        | zeromq                       |
| jbig2dec              | ncurses          | zimg                         |
| jemalloc              | nettle           | zlib                         |
| jpeg                  | nghttp2          | zsh-history-substring-search |
| jpeg-xl               | nginx            | zsh-syntax-highlighting      |
| krb5                  | node             | zstd                         |
| lame                  | npth             |                              |



