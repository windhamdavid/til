# Squid 🦑

- Processor: Intel(R) Xeon(R) E E-2456 (12 core)
- RAM: 32GB DDR4 SDRAM
- HD1: 2 x 960 GB SSD Hardware Raid 1
- HD2: 1 x 1.92 TB SSD

```sh
Static hostname: ******.********.***
         Chassis: server
      Machine ID: 1eca121fe4eb451bbfba60ff316c230c
         Boot ID: c99cc4c1fe8b4f59b0d12ffba922832e
Operating System: AlmaLinux 9.5 (Teal Serval)         
     CPE OS Name: cpe:/o:almalinux:almalinux:9::baseos
          Kernel: Linux 5.14.0-503.23.2.el9_5.x86_64
    Architecture: x86-64
 Hardware Vendor: Dell Inc.
  Hardware Model: PowerEdge R360
Firmware Version: 1.5.3
```

## System

### AlmaLinux 9 🐧 

**AlmaLinux 9.5 ( Teal Serval )**  
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


```sh
dnf --help
dnf history
dnf list installed
dnf [ search/install/info/list/remove/upgrade/history/repolist/deplist ]
sudo dnf upgrade package_name
sudo dnf upgrade

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
#### Migrations
### Monitor

### Plesk

- docs - https://docs.plesk.com/en-US/obsidian/administrator-guide/server-administration/server-settings.59423/

```sh
# admin password
plesk bin admin --info
plesk bin --get-login-link
plesk bin admin --set-admin-password -passwd **********
plesk bin admin --set-login ********
plesk bin admin --enable-access-domain **************.com

```

## Webserver
### Apache 
### Nginx
## Databases

## Languages

