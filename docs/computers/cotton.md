---
toc_max_heading_level: 4
---

# Cotton 🐈

## Log

- **26/07/15** - placeholder for updated server to replace [Zeke](/docs/computers/zeke)
  - Ubuntu 26.04 LTS (Resolute Raccoon) will run until 2031 or 2036 with ESM.


## Notes

This computer is named after Cotton ( [https://davidwindham.com/cotton-2/](https://davidwindham.com/cotton-2/) ) after my cat because I like to [anthropomophize machines](https://davidwindham.com/anthropomorphizing-machines/) and it'll be right up under my feet.

It seems like I stagger migrations every other year between servers.  It seems I'm always looking to up the horsepower but I think the next remote will be the first machine I lease with some dedicated GPU horsepower for spitting out more complex API requests. Instead of playing whack-a-mole with production server configurations, I'd just host an almost exact copy locally so that I can rsync em up anytime. Although most of my production servers are using AMD Ryzen processors, ~~I can use my old [mac mini](/docs/computers/macs) with an intel i7 as a substitute~~... after running through a quick test of the old mac mini, it seems that the old thermal paste is dried out causing too much heat and I'm worried that with a different fan control I'm going to run into problems on down the road because it'll be in a cabinet alongside of an amplifier that also generates heat. I'm going with a new Ryzen 7 box instead.

Aside from the server mirro, it'll handle network backups also going to provide a headless API server for running LLMs so I'm not constantly adding and removing billions of parameters and 20GB models to my primary machine and so I've got a local AI that's reliable and trainable. When the the M5 Ultra is released, I'll bump up [Stu](/docs/computers/stu.md) so I can use the horsepower. The headless server will handle persistent storage, web mirroring, databases, and Time Machine backups, while my studio retains its full processing and unified memory power for running large models.

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

## Proxy Tunnel

- FRP - [https://github.com/fatedier/frp](https://github.com/fatedier/frp)
- Rathole - [https://github.com/rathole-org/rathole](https://github.com/rathole-org/rathole)

## Nginx Proxy Manager
## Docker
## Kubernetes K3

e.g.:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-production-mirror
  labels:
    app: dev-web
spec:
  replicas: 1
  selector:
    matchLabels:
      app: dev-web
  template:
    metadata:
      labels:
        app: dev-web
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        volumeMounts:
        - name: webroot
          mountPath: /usr/share/nginx/html # Or your specific app directory
      volumes:
      - name: webroot
        hostPath:
          path: /var/www # Points directly to your Ubuntu host directory
          type: Directory
```

## Remote RSync

## SMB NAS

will mount an external drive so that I can cron backups of the computers on the network and shift AI models on and off it. 

```sh
sudo mkdir -p /mnt/timemachine
sudo chown -R nobody:nogroup /mnt/timemachine
sudo chmod -R 777 /mnt/timemachine
sudo apt install samba -y
sudo vi /etc/samba/smb.conf

[TimeMachine]
comment = Mac Time Machine Backup
path = /mnt/timemachine
browseable = yes
writeable = yes
create mask = 0600
directory mask = 0700
vfs objects = catia fruit streams_xattr
fruit:time machine = yes
fruit:time machine max size = 1T

sudo adduser --no-create-home --disabled-login --shell /bin/false tmuser
sudo chown -R tmuser: /mnt/timemachine
sudo smbpasswd -a tmuser
sudo systemctl restart smbd
```

#### Connection

- Open Finder and press Cmd + K (or click Go > Connect to Server in the top menu bar).
- Enter your Ubuntu server's IP address using the SMB protocol: smb://your-server-ip
- Click Connect and enter the username (macuser) and password you created in Step 3.
- Open System Settings > General > Time Machine on your Mac.
- Click Add Backup Disk... and select the TimeMachine folder from the network list.

## Ollama

```sh
OLLAMA_HOST=http://your-server-ip:11434 ollama pull qwen2.5-coder:32b
OLLAMA_HOST=http://your-server-ip:11434 ollama list
OLLAMA_HOST=http://your-server-ip:11434 ollama rm qwen2.5-coder:32b

  ┌─────────────────────────────────┐          ┌─────────────────────────────────┐
  │      M4 Pro / M5 Ultra Mac      │          │     Beelink EQR7 Mini PC        │
  │     (Heavy Compute Center)      │          │      (Storage & Dev Server)     │
  └────────────────┬────────────────┘          └────────────────┬────────────────┘
                   │                                            │
                   │           1. Requests Model File           │
                   │───────────────────────────────────────────>│
                   │                                            │
                   │           2. Streams GGUF over LAN         │
                   │<───────────────────────────────────────────│
                   │                                            │
         ┌─────────┴─────────┐                        ┌─────────┴──────────┐
         │ • Runs Ollama     │                        │ • Dev Mirror       │
         │ • 70B+ Models     │                        │ • MySQL/Postgres   │
         │ • Blazing VRAM    │                        │ • Time Machine NAS │
         └───────────────────┘                        │ • 2TB model cache  │
                                                      └────────────────────┘

sudo mkdir -p /mnt/storage/ai-models
sudo chown -R macuser: /mnt/storage/ai-models
sudo vi /etc/samba/smb.conf

[AI-Models]
comment = Central GGUF Model Storage
path = /mnt/storage/models
browseable = yes
writeable = yes
guest ok = no
valid users = macuser

sudo systemctl restart smbd
```

- Open Finder and press Cmd + K.
- Type smb://cotton-ip/AI-Models and click Connect.
- Enter your macuser credentials and check the box to Remember this password in my keychain.
- Open System Settings > General > Login Items on your Mac.
- Under the Open at Login section, click the + icon, navigate to your network locations, and add the mounted AI-Models volume. It will now mount silently every time your Mac boots.

```sh
vi ~/.zshrc

export OLLAMA_MODELS="/Volumes/AI-Models"
```