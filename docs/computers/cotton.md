---
toc_max_heading_level: 4
---

# Cotton 🐈

## Log

- **26/07/15** - placeholder for updated server to replace [Zeke](/docs/computers/zeke)
  - Ubuntu 26.04 LTS (Resolute Raccoon) will run until 2031 or 2036 with ESM.


## Notes

This computer is named after Cotton - [https://davidwindham.com/cotton-2/](https://davidwindham.com/cotton-2/) because it'll be right up under my feet and at my fingertips.

It seems like I stagger migrations every other year between servers.  It seems I'm always looking to up the horsepower but I think this will be the first remote machine I lease with some dedicated GPU horsepower for spitting out more complex API requests.  I've also also decided that instead of playing whack-a-mole with production server configurations, I'd just host an almost exact copy locally so that I can rsync em up anytime. Although most of my production servers are using AMD Ryzen processors, ~~I can use my old [mac mini](/docs/computers/macs) with an intel i7 as a substitute~~... after running through a quick test of the old mac mini, it seems that the old thermal paste is dried out causing too much heat and I'm worried that with a different fan control from Ubuntu I'm going to run into problems on down the road because it'll be in a cabinet alongside of an amplifier that also generates heat. I'm going with a new Ryzen 7 box instead.



## Hardware

Beelink EQR7 Mini PC,AMD Ryzen 7 7735U - 24GB LPDDR5 RAM 500GB M.2 PCIE4.0x4 SSD Graphics 12core 2200MHz

-  "U" designation means it is a low-voltage ultra-efficient chip designed to operate between 15W to 30W TDP.
- bottom-intake silent fan means the EQR7 will run incredibly cool and virtually silent when serving up Linux containers.
- hdi-usb-c video capture dongle to use ipad as temp monitor with Orion.
- mini perixx usb keyboard
- underdesk metal mount for cabinet ( bottom airflow )



## BIOS

- Enable Restore After Power Loss (Auto Power On)
  - Shut down the system completely.
  - Turn it on, and immediately tap the Del key repeatedly to enter the BIOS.
  - Use the arrow keys to navigate to the Advanced tab.
  - Scroll down and enter AMD CBS.
  - Select FCH Common options.
  - Enter Ac Power Loss Options.
  - Change the setting from Always Off to Always On.
  - Press F4 to save your configuration and exit.
- Enable Wake-on-LAN - The EQR7 hardware natively supports magic packets across its dual Gigabit Ethernet ports.
  - In the BIOS: Navigate to the Advanced tab. 
  - Look for APM Configuration or Network Stack Configuration and ensure Wake-on-LAN (or Resume By Onboard LAN) is toggled to Enabled.
  - In Ubuntu Server: Linux natively controls the network interfaces. You must tell Ubuntu to listen for the magic packet before it powers down.
    - Install ethtool: ```sudo apt install ethtool```
    - Check your ethernet port name (e.g., enp2s0 or eth0): ip aEnable WOL on that port:  
    ```sudo ethtool -s <interface_name> wol g```
  
(Note: To make this persistent in Ubuntu so it stays active after reboots, you will want to add a quick systemd service file or a cron @reboot task targeting that ethtool command).

## Network

[http://192.168.7.1](http://192.168.7.1)
- DHCP to reserve a static IP on the router 
- Dynamic DNS to map domain without home IP
- DMZ enabled for device
```sh
ip r | grep default
# interface name
sudo vi /etc/netplan/00-installer-config.yaml
```

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0: # Change to your interface name
      dhcp4: no
      addresses:
        - 192.168.1.200/24 # server P
      routes:
        - to: default
          via: 192.168.7.1 # router IP
      nameservers:
        addresses:
```

```sh
sudo netplan apply
```

```sh



[ Internet ] 
     │
[ Calix Primary Router ] (Subnet: 192.168.7.X) 
     │
     ├──> [ Cotton ] (DMZ Target IP: 192.168.7.200)
     │
     ▼ (WAN Port)
[ TP-Link Deco Mesh ] (Subnet: 192.168.68.X │ WAN IP: 192.168.7.122)
     │
     └──> [ stu ] (Permanent Manual IP: 192.168.68.74)
```

router - enable and add 192.168.7.200 into the DMZ Hosts

## Ubuntu 

### Install

1. Flash the Bootable USB Drive 
- balenaEtcher - [https://etcher.balena.io](https://etcher.balena.io)
- 64B AMD from [https://ubuntu.com/download/server](https://ubuntu.com/download/server)

2. GRUB install
-```F7``` on startup
  - choose: Install Ubuntu Server
    - wired ethernet interface - *note user/pass IP
  - Enable OpenSSH Server
  - Reboot


```sh
ssh me@ip
sudo apt list --upgradable
sudo apt update && sudo apt upgrade -y
sudo ufw allow ssh
sudo ufw enable

sudo ufw allow 80/tcp comment 'Public HTTP'
sudo ufw allow 443/tcp comment 'Public HTTPS'

# block stu from DMZ server - DHCP reserve IP/device
sudo ufw deny out to 192.168.68.74 comment 'block stu'
sudo ufw allow from 192.168.68.74 to any port <port> proto tcp comment 'SSH stu'
sudo ufw allow from 192.168.7.122 to any port 22 proto tcp comment 'SSH from internal mesh network'
sudo ufw deny out to 192.168.7.122 comment 'Block cotton from scanning network router'
sudo ufw reload


sudo timedatectl set-timezone 'America/New_York'

service --status-all
service --status-all | grep '\[ + \]'
systemctl list-units

sudo vi /etc/ssh/sshd_config
AddressFamily inet
PermitRootLogin no
PasswordAuthentication no
Port ####
sudo systemctl restart sshd

# stu/local
# map IP to a domain
sudo vi /etc/hosts
# ssh keys
mkdir -p ~/.ssh && sudo chmod -R 700 ~/.ssh/
scp ~/.ssh/id_rsa.pub user@173.230.130.234:~/.ssh/authorized_keys
sudo chmod -R 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
# ssh shortcut
sudo vi /etc/ssh/sshd_config

```

### zsh
```sh
sudo apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo vi .zshrc
theme dpoggi
```

### motd
```sh
cd /etc/update-motd.d
sudo vi windhamdavid.asc
sudo vi 05-windhamdavid
#!/bin/sh
printf "\n$(cat /etc/update-motd.d/windhamdavid.asc)\n"
sudo chmod +x /etc/update-motd.d/05-windhamdavid
sudo chmod 0644 /etc/update-motd.d/10-help-text
sudo chmod 0644 /etc/update-motd.d/50-motd-news
sudo chmod 0644 /etc/update-motd.d/88-esm-announce
sudo chmod 0644 /etc/update-motd.d/91-contract-ua-esm-status
```

### Shell
```sh
cd ~
touch .vimrc
vi .vimrc
set tabstop=2
set shiftwidth=2
set expandtab
```

### Packages

```sh
apt list --installed
apt list --upgradeable
apt list --installed | grep nginx

sudo apt-get update && sudo apt-get upgrade
sudo apt-get --with-new-pkgs upgrade

sudo apt-get clean && sudo apt-get autoremove
apt-get remove packagename
apt-get –-purge remove packagename
```

### Cron 


## Remote RSync