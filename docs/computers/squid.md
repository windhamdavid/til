# Squid 🦑

Setting up a new server for a project. This one has to be easily replicated and provide access to multiple systems level administrators. The named comes from a portmantuau of the hosting data center and because cephalopod intelligence is the best of the invertebrates.

```sh

- Processor: Intel(R) Xeon(R) E E-2456 (12 core)
- RAM: 32GB DDR4 SDRAM
- HD1: 2 x 960 GB SSD Hardware Raid 1
- HD2: 1 x 1.92 TB SSD

Static hostname: *****.*****.***
Operating System: AlmaLinux 9.5 (Teal Serval)         
CPE OS Name: cpe:/o:almalinux:almalinux:9::baseos
Kernel: Linux 5.14.0-503.23.2.el9_5.x86_64
Architecture: x86-64

```

## System

### AlmaLinux 9 🐧 

Version 9 will have active support until 31 May 2027, and security support until 31 May 2032

Twenty years ago I started out on CentOS for personal projects because my job was using RHEL. Switched to Debian because it seemed like all the smart folks were using it. Then I started dabbling in Ubuntu and switched because I liked the free security patch model from Canonical. I have an Ubuntu server that has been running for 13 years. CERN switching from Scientific Linux had an impacct and the community model seems better than Rocky which I’d guess might see some of the fate of CentOS. It also seems popular amongst the enterprise folks and the binary is compatible the Red Hat using the Fedora package manager. 

- Docs - [https://wiki.almalinux.org/](https://wiki.almalinux.org/)
- CERN - https://linux.web.cern.ch/almalinux/
	- https://gitlab.cern.ch/linuxsupport
- Wiki - https://en.wikipedia.org/wiki/AlmaLinux

### User

disable root, add user, change ssh ports, add keys
```sh
useradd ***********
usermod -aG wheel ***********
su - ***********
sudo vi /etc/ssh/sshd_config
# disable root login
PermitRootLogin no
# obscure ssh port
Port ****
sudo systemctl restart sshd
```
add user to www-data  
psaserv ( /conf /httpdocs )  
psacln ( /)  
```sh
sudo usermod -a -G www-data ***********
```

### Shell

change to oh-my-zsh
```sh
sudo dnf install zsh
chsh -s $(which zsh)
# log out/in
sudo dnf install git curl wget
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

```

### Packages

- https://docs.fedoraproject.org/en-US/docs/
- Dandified YUM manager - https://docs.fedoraproject.org/en-US/docs/

```sh
sudo dnf clean all
sudo dnf update
```

```sh
dnf --help
dnf history
dnf list installed
dnf [ search/install/info/list/remove/upgrade/history/repolist/deplist ]
sudo dnf upgrade package_name
sudo dnf upgrade

sudo dnf install htop
```



### Systemd
### rsyslog

## Security
### Hardening

- FIPS 140-3 security certification for its Linux distro
- AlmaLinux 9 OpenSCAP Guide - [https://wiki.almalinux.org/documentation/openscap-guide-for-9.html](https://wiki.almalinux.org/documentation/openscap-guide-for-9.html)
    - SCAP is a U.S. standard maintained by the National Institute of Standards and Technology
    - [https://almalinux.org/blog/2023-11-28-cis-benchmarks-update/](https://almalinux.org/blog/2023-11-28-cis-benchmarks-update/)
    - DoD Guide - [https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=unix-linux](https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=unix-linux)


### Ports

these are the default open ports for plesk
```sh
- 53 - DNS (TCP and UDP)    
- 80 - HTTP (TCP)
- 110 - POP3 (TCP)
- 123 - NTP (UDP)
- 143 - IMAP (TCP)
- 443 - HTTPS (TCP) (mandatory licensing)
- 465 - SMTPS (TCP)
- 587 - SMTP (Submission) (TCP)
- 953 - RNDC (TCP)
- 990 - FTPS (TCP)
- 993 - IMAPS (TCP)
- 995 - POP3S (TCP)
- 3306 - MySQL (remote only) (TCP)
- 5432 - PostgreSQL (TCP)
- 8443 - Plesk HTTPS (TCP)
- 8447 - Plesk Installer (TCP)
- 8880 - Plesk HTTP (TCP)
- 49152 - 65535 - (TCP) for FTP passive mode - incoming only
```

#### FirewallD

```sh
# status
sudo systemctl status firewalld
# open port
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
# close port
sudo firewall-cmd --zone=public --remove-port=80/tcp --permanent
# reload
sudo firewall-cmd --reload
# list all ports
sudo netstat -tunlp

### Mail

- Mail
    - _Fail_ for un-routable email.
    - _nobody_ user
```

#### IPTables

#### Blacklist

## Admin

### Backup

Acronis Backups of full server everyday at 1:00am  
Keep - daily 7days - weekly 4wks - monthly 1mo
    

#### Migrations
### Monitor

## Plesk

- docs - https://docs.plesk.com/


Plesk is somewhat painful for me but I need to have a system that is migration capable in case it or me need to be replaced. I’d prefer a stripped down version of Linux variant but it isn’t the best choice in this case. I like to complain about it. What gets me most of all is the lack of a barrier to entry means a bunch of novice users junking up the forums and making it hard to find the good information easily. It’s highly opinionated in how it operates creating a messy web of permissions and configuration files in an effort to give those features to the GUI users.  



Admin
```sh
# admin password
plesk bin admin --info
plesk bin --get-login-link
plesk bin admin --set-admin-password -passwd **********
plesk bin admin --set-login ********
plesk bin admin --enable-access-domain **************.com
```
Theme
```sh 
zip -r srh_theme.zip . -x '**/.DS_Store'
plesk bin branding_theme -i -vendor ******* -source srh_theme.zip
plesk bin branding_theme -u -name srh_theme
```

Repair file system permissions
```sh
sudo plesk repair fs
sudo plesk repair fs -vhosts
sudo plesk repair fs example.com -vhosts
```

### Extensions

```sh
plesk bin extension --list
plesk bin extension --install extension_name
plesk bin extension --upgrade extension_name
plesk bin extension --uninstall extension_name
plesk bin extension --disable extension_name
plesk bin extension --enable extension_name
```

```sh

plesk bin extension --disable servershield
plesk bin extension --disable laravel
plesk bin extension --disable plesk-sitejet
plesk bin extension --disable xovi
plesk bin extension --disable nodejs
plesk bin extension --disable composer
plesk bin extension --disable wp-toolkit

- acronis-backup - Acronis Backup
- advisor - Advisor
- composer - PHP Composer
- configurations-troubleshooter - Webserver Configurations Troubleshooter
- dnssec - Plesk DNSSEC
- git - Git
- heavy-metal-skin - Skins and Color Schemes
- help-center - Help Center
- imunify360 - Imunify
- laravel - Laravel Toolkit
- letsencrypt - Let's Encrypt
- log-browser - Log Browser
- mfa - Multi-Factor Authentication (MFA)
- monitoring - Monitoring
- nodejs - Node.js Toolkit
- ntp-timesync - NTP Timesync
- panel-ini-editor - Panel.ini Editor
- plesk-sitejet - Sitejet Builder
- repair-kit - Repair Kit
- servershield - ServerShield by Cloudflare
- site-import - Site Import
- ssh-terminal - SSH Terminal
- sslit - SSL It!
- wp-toolkit - WP Toolkit
- xovi- SEO Toolkit
```

### Mail

🚫 I’ve maintained a lot of different servers over the years and the only thing I’ve constantly had issues with was email. I’ve also maintained servers dedicated just to email. I learned some years ago with my web servers to just wipe out the email systems and relay it to a third party. A lot of folks do this too… Google Cloud Platform, Amazon Web Services, and Microsoft Azure all blocks outbound traffic on port 25 which effectively blocks all email features. I no longer maintain any email servers and it’s one of the few services where I always rely on a third parties. 

#### Security

Anyone who’s spent anytime in an enterprise IT environment can tell you that email phishing, compliance, training, and management is the bain of existence for sysadmins. Since email hacking tends to be the origin of a lot of bad stuff, I avoid the liability by refusing to manage anything other than pointing domain records elsewhere. 

```sh
# disable all mail services and ports
```

#### SMTP

Will need to create a couple SMTP relay accounts
- sysadmin notifications
- cms notifications
- form notifications



## Webserver

### Apache 

### Nginx


## Languages

### PHP

```sh
v8.3.17 FPM
pkg 8.3.17-0redhat.9.250214.1431
```

- https://support.plesk.com/hc/en-us/articles/12377086904471-How-to-calculate-pm-max-children-value-on-a-Plesk-server
- https://support.plesk.com/hc/en-us/articles/12377661896343-Websites-on-PHP-FPM-are-unavailable-or-loading-slowly-server-reached-max-children-setting-consider-raising-it
- Monitoring PHP-FPM - https://docs.360monitoring.com/docs/php-fpm-plugin

```sh
ps -ylC php-fpm --sort:rss
S UID PID PPID C PRI NI RSS SZ WCHAN TTY TIME CMD
S 0 931 1 0 80 0 87040 99039 ep_pol ? 00:00:00 php-fpm

pm.max_children = Total RAM / Max child process size
```

## Databases

### MariaDB

- allow local connections only

```sh
 MariaDB v10.5.27
```