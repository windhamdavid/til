# Magic 🖥

Late 2012 i7 mac mini. 
My current main machine is [~~Macs~~](/docs/computers/macs) [~~Ovid~~](/docs/computers/ovid) [Stu](/docs/computers/stu)

## Log

- 🔥 26/08/03 - I decided to convert this old machine into a local server that I can use for testing and mirroring production servers since it's got an i7 processor and enough memory to run locally. 
- 22/11/8 - Preparing for my annual machine cleaning and migration to ARM.  In doing so, I've moved the magic mini up to the office to act as a server on which to drop my development projects during the migration. I previously had used the mini as a media server in the den but I've found that it's easier to user AirPlay from a tablet.  I'll leave a breadcrumb trail here of the specifics as a reference. 
- 20/07/27 - I finally took it out of commission long enough to migrate to the ARM ( [https://davidwindham.com/arm/](https://davidwindham.com/arm/) ) architecture and replace the old drive with an SSD - [https://davidwindham.com/mac-mini](https://davidwindham.com/mac-mini). 


## Ubuntu

- 24.04 - Late 2012 Quad-Core i7 is native 64-bit EFI so not bootloader 32-bit workarounds. 
- gotta go ```autoinstall``` so I don't need a headless monitor

1. flash Server ISO to USB drive
2. create a configuration file named user-data inside the USB's root directory containing your user details, SSH keys, network settings, and disk wiping rules.
```sh
#cloud-config
autoinstall:
  version: 1
  interactive-sections: []
  
  # Set system identity & login credentials
  identity:
    hostname: macmini-server
    username: admin
    # Default password below is: "ubuntu"
    # To generate a custom SHA-512 password hash, run on a Mac/Linux terminal:
    # python3 -c 'import crypt; print(crypt.crypt("yourpassword", crypt.mksalt(crypt.METHOD_SHA512)))'
    password: "$6$rounds=4096$rounds=4096$c3VwZXJzZWNyZXQ$mR6wY0GZ2M9O7JzG3w0JzX1qV7x0JzX1qV7x0JzX1qV7x0JzX1qV7x0JzX1qV7x0JzX1qV7x0JzX1qV7x"

  # Automatically enable OpenSSH server during install
  ssh:
    install-server: true
    allow-pw: true

  # Automatically format the internal drive (overwrites macOS completely)
  storage:
    layout:
      name: direct

  # Reboot automatically when the installation finishes
  late-commands:
    - "curtin in-target -- shutdown -r now"
```


3. edit the GRUB menu configuration on the USB drive to append autoinstall to the boot flags.
4. Plug the USB into the Mac mini, power it on, hold Option, press Enter (to hit the default EFI boot option blindly).
5. Ubuntu will read the configuration file, wipe the internal drive, set up SSH, reboot automatically, and come online on your local network—all with zero display attached.

### Linux install notes

```sh
# Create the systemd unit file
sudo bash -c 'cat <<EOF > /etc/systemd/system/mac-power-on.service
[Unit]
Description=Set Mac mini auto power on after AC loss
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/usr/bin/setpci -s 0:1f.0 0xa4.b=0

[Install]
WantedBy=multi-user.target
EOF'

# Reload systemd and enable the service
sudo systemctl daemon-reload
sudo systemctl enable mac-power-on.service

# Test-run the command once
sudo setpci -s 0:1f.0 0xa4.b=0
```

install mac fan controll (macfanctld)

```sh
sudo apt update
sudo apt install -y macfanctld
sudo systemctl enable --now macfanctld
```

Enable Auto-Power-On After Power Failure
```sh
sudo setpci -s 0:1f.0 0xa4.b=0
```
add systemd
```sh 
sudo bash -c 'cat <<EOF > /etc/systemd/system/mac-power-on.service
[Unit]
Description=Set Mac mini auto power on after AC loss
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/usr/bin/setpci -s 0:1f.0 0xa4.b=0

[Install]
WantedBy=multi-user.target
EOF'

sudo systemctl daemon-reload
sudo systemctl enable mac-power-on.service
```

Prevent Idle Sleep & Hibernation
```sh
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

## Notes:

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
Migrated dotfiles using my repo @ [https://davidwindham.com/code/dotfiles](https://davidwindham.com/code/dotfiles)

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



