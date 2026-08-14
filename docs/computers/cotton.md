---
toc_max_heading_level: 4
---

# Cotton 🐈

( 26/07/15 ) This machine is mounted in a cabinet beneath my desk with temp controlled fans on it. It's got several purposes but the primary one is acting as a local mirror for remote hosts so that I can rsync between them. It's also going to be used as home automation hub for making backups and providing remote network access. I named it [Cotton after my cat](https://davidwindham.com/cotton-2/) because I like [anthropomorphising machines](https://davidwindham.com/anthropomorphizing-machines/), he was resilient, and it'll always be up under my feet. 

## Log

- **26/07/15** - placeholder for updated server to act as an local downstream server for replacing [Zeke](/docs/computers/zeke)
  - Ubuntu 26.04 LTS (Resolute Raccoon) will run until 2031 or 2036 with ESM.


```sh
david@stu🪩:~ » ssh cotton
Welcome to Ubuntu 26.04 LTS (GNU/Linux 7.0.0-29-generic x86_64)

       _                        
       \`*-.                    
        )  _`-.                 
       .  : `. .                
       : _   '  \               
       ; *` _.   `*-._          
       `-.-'          `-.       
         ;       `       `.     
         :.       .        \    
         . \  .   :   .-'   .   
         '  `+.;  ;  '      :   
         :  '  |    ;       ;-. 
         ; '   : :`-:     _.`* ;
      .*' /  .*' ; .*`- +'  `*'
      `*-*   `*-*  `*-*'


     .     . .              .       .  . 
. . ...-..-| |-. .-. .-.-..-| .-.. ...-| 
 ` ` '' '`-'-' '-`-`-' ' '`-'-`-`-` '`-'-


 System information as of Thu Aug 13 07:53:25 PM EDT 2026

  System load:  0.0                Temperature:             46.0 C
  Usage of /:   2.4% of 454.88GB   Processes:               293
  Memory usage: 3%                 Users logged in:         0
  Swap usage:   0%                 IPv4 address for enp2s0: 192.168.*.***

Expanded Security Maintenance for Applications is enabled.

0 updates can be applied immediately.


Last login: Thu Aug 13 13:23:03 2026 from 192.168.*.***
david@cotton🐈:~ » lscpu
Architecture:                x86_64
  CPU op-mode(s):            32-bit, 64-bit
  Address sizes:             48 bits physical, 48 bits virtual
  Byte Order:                Little Endian
CPU(s):                      16
  On-line CPU(s) list:       0-15
Vendor ID:                   AuthenticAMD
  Model name:                AMD Ryzen 7 7735U with Radeon Graphics
    CPU family:              25
    Model:                   68
    Thread(s) per core:      2
    Core(s) per socket:      8
    Socket(s):               1
    Stepping:                1
    Frequency boost:         enabled
    CPU(s) scaling MHz:      27%
    CPU max MHz:             4821.1401
    CPU min MHz:             406.6030
    BogoMIPS:                5389.98
    Flags:                   fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx f
                             xsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp lm constant_tsc rep_good no
                             pl xtopology nonstop_tsc cpuid extd_apicid aperfmperf rapl pni pclmulqdq monitor ssse
                             3 fma cx16 sse4_1 sse4_2 x2apic movbe popcnt aes xsave avx f16c rdrand lahf_lm cmp_le
                             gacy svm extapic cr8_legacy abm sse4a misalignsse 3dnowprefetch osvw ibs skinit wdt t
                             ce topoext perfctr_core perfctr_nb bpext perfctr_llc mwaitx cpb cat_l3 cdp_l3 hw_psta
                             te ssbd mba ibrs ibpb stibp vmmcall fsgsbase bmi1 avx2 smep bmi2 erms invpcid cqm rdt
                             _a rdseed adx smap clflushopt clwb sha_ni xsaveopt xsavec xgetbv1 xsaves cqm_llc cqm_
                             occup_llc cqm_mbm_total cqm_mbm_local user_shstk clzero irperf xsaveerptr rdpru wbnoi
                             nvd cppc arat npt lbrv svm_lock nrip_save tsc_scale vmcb_clean flushbyasid decodeassi
                             sts pausefilter pfthreshold avic v_vmsave_vmload vgif v_spec_ctrl umip pku ospke vaes
                              vpclmulqdq rdpid overflow_recov succor smca fsrm debug_swap
```

## Notes

This computer is named after Cotton ( [https://davidwindham.com/cotton-2/](https://davidwindham.com/cotton-2/) ) after my cat because I like to [anthropomophize machines](https://davidwindham.com/anthropomorphizing-machines/) and it'll be right up under my feet.

It seems like I stagger migrations every other year between servers.  It seems I'm always looking to up the horsepower but I think the next remote will be the first machine I lease with some dedicated GPU horsepower for spitting out more complex API requests. Instead of playing whack-a-mole with production server configurations, I'd just host an almost exact copy locally so that I can rsync em up anytime. Although most of my production servers are using AMD Ryzen processors, ~~I can use my old [mac mini](/docs/computers/macs) with an intel i7 as a substitute~~... after running through a quick test of the old mac mini, it seems that the old thermal paste is dried out causing too much heat and I'm worried that with a different fan control I'm going to run into problems on down the road because it'll be in a cabinet alongside of an amplifier that also generates heat. I'm going with a new Ryzen 7 box instead.

Aside from the server mirro, it'll handle network backups and provide a headless API server for running LLMs so I'm not constantly adding and removing billions of parameters and 20GB models to my primary machine and so I've got a local AI that's reliable and trainable. When the the M5 Ultra is released, I'll bump up [Stu](/docs/computers/stu.md) so I can use the horsepower. The headless server will handle persistent storage, web mirroring, databases, and Time Machine backups, while my studio retains its full processing and unified memory power for running large models.

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

- DHCP to reserve a static IP on the router 
- **LAN-only — no DMZ, no port forward.** Decided 2026-08-14, see below.

**Cotton's address is a DHCP reservation at the Calix router**, bound to the cabled port's MAC
(`enp2s0`). It is *not* a netplan static — since we control the router here, the reservation is
the one place to look, unlike woozie's leased box where there was no access to the DHCP server.
Verify with `ip -4 -o addr show enp2s0`; it will read `dynamic`, which is correct.

(Addresses and MACs are masked on this page — real values are in the private ops repo.)

The netplan static below is kept as reference only (it is what woozie's leased-box situation
required). Two traps if it is ever actually needed: use `netplan apply`, not `netplan try` —
`try` reports "Configuration accepted" while silently reverting to `dhcp4: true`, because it
cannot survive the SSH session the address change itself kills. And the interface on this box
is `enp2s0`, not `enp3s0`.

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
    enp2s0: # this box's cabled port — confirm with `ip a`
      dhcp4: no
      addresses:
        - 192.168.*.***/24 # server IP — must be on the router's subnet
      routes:
        - to: default
          via: 192.168.*.1 # router IP
      nameservers:
        addresses:
          - 192.168.*.1 # router
          - 1.1.1.1
```

```sh
sudo netplan apply
```

```sh
[ Internet ] 
     │
[ Calix Primary Router ] (Subnet: 192.168.*.X) 
     │
     ├──> [ Cotton ] (LAN only — reserved IP: 192.168.*.***)
     │
     ▼ (WAN Port)
[ TP-Link Deco Mesh ] (Subnet: 192.168.68.X │ WAN IP: 192.168.*.***)
     │
     └──> [ stu ] (Permanent Manual IP: 192.168.*.***)
```

### Why no DMZ

Cotton is **not** in the router's DMZ and has no port forward. Decided 2026-08-14.

The DMZ forwards *every* port, not one. Cotton's whole job is holding mirrors of production
databases and Time Machine backups — putting that entire surface on the public internet so
that Samba, Ollama and anything added later is exposed *by default rather than by decision*
is a bad trade.

The two things I actually wanted turn out not to need it:

- **rsync from cotton to a remote host is outbound.** Cotton opens the connection, so it works
  behind a fully closed inbound firewall. `ufw default allow outgoing` covers it.
- **SSH from another machine at home is LAN traffic.** Also no exposure needed.

That leaves only *inbound SSH while away from home*. If that becomes a real need, use a mesh
VPN (Tailscale/WireGuard) — it opens **no inbound ports at all**, since cotton dials out; it
authenticates better than SSH-on-a-port; and it survives the home IP changing, which is the
problem dynamic DNS was in these notes to solve. Failing that, forward the **single** SSH port
rather than enabling DMZ.

## Ubuntu 


### Install

1. Flash the Bootable USB Drive 
- balenaEtcher - [https://etcher.balena.io](https://etcher.balena.io)
- 64-bit AMD (amd64) from [https://ubuntu.com/download/server](https://ubuntu.com/download/server) — the 7735U is x86, *not* ARM

2. GRUB install
-```F7``` on startup
  - If the F7 popup doesn't appear or the USB isn't listed, enter BIOS with ```Del``` and set
    Boot Option #1 to the USB device in Boot Option Priorities, then **F4** to save and exit
    (this board saves on F4, not F10). Boot Override only lists fully-enumerated UEFI devices,
    so a USB can be missing there while still present in the priority list.
  - Boot → Fast Boot must be **Disabled** — when enabled its ```USB Support = Partial Initial```
    setting enumerates keyboards but skips USB mass storage, hiding the installer drive.
  - Pull the USB at the post-install reboot, then set Boot Option #1 back.
  - choose: Install Ubuntu Server
    - wired ethernet interface - *note user/pass IP
    - **Storage — grow the root LV.** The default "entire disk + LVM group" allocates only
      ~100GB to the root logical volume and leaves the rest of the 500GB NVMe unused in the
      volume group. On the storage screen select the root LV → Edit → set size to max.
  - Enable OpenSSH Server
  - Reboot

3. Resize the root LV (if the install step above was missed)

Safe on a running system — ```resize2fs``` grows a mounted ext4 filesystem online, so there is
no unmount and no reboot. Check for free space in the volume group first; ```VFree``` shows what
was left behind.

```sh
lsblk
df -h /
sudo vgs && sudo lvs

# if VFree > 0 on ubuntu-vg
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv
df -h /
```

If ```vgs``` reports no volume groups, the install used a plain partition rather than LVM. There
is nothing to extend — confirm ```df -h /``` already shows the full disk. Converting a live root
filesystem to LVM in place is not practical; that would be a reinstall.

```sh
ssh me@ip
sudo apt list --upgradable
sudo apt update && sudo apt upgrade -y
# LAN-only posture (no DMZ, no port forward).
#
# Do NOT use `ufw allow ssh` — that opens 22, and sshd here listens on the obscured port via
# the ssh.socket override. Add the allow rule BEFORE tightening the defaults, or I drop my
# own session.
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 192.168.*.0/24 to any port <ssh-port> proto tcp comment 'SSH from LAN'
sudo ufw enable
sudo ufw status verbose

# Add per service as each one lands — scoped to the LAN, never to 'any':
# sudo ufw allow from 192.168.*.0/24 to any port 80,443 proto tcp comment 'HTTP/S on LAN'
# sudo ufw allow from 192.168.*.0/24 to any port 445  proto tcp comment 'Samba / Time Machine'
# sudo ufw allow from 192.168.*.0/24 to any port 5353 proto udp comment 'mDNS discovery'

> **The `/24` is deliberate — a rule naming stu's own mesh address can never match.** The Deco
> NATs, so everything behind it arrives wearing the Deco's WAN address, not its own. Confirmed
> from a live session: `SSH_CONNECTION` on cotton reports the mesh WAN as the source, never
> stu's `192.168.68.x` address. The upshot is that ufw cannot tell stu apart from anything else
> on the mesh — the NAT has already collapsed them into one source.


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

## Web Server

nginx in front, Apache behind it, PHP-FPM behind that.

```sh
   nginx :80/:443         TLS, static, bot blocklist
      │ proxy_pass
   Apache 127.0.0.1:8080  vhosts, .htaccess
      │ proxy_fcgi
   PHP-FPM 8.5            unix socket
```

I kept Apache rather than going straight to PHP-FPM because my sites carry ~70 `.htaccess`
files — hundreds of rewrites, plus expires/auth blocks, the largest 300 lines. Porting that
is a project, and WordPress plugins keep *writing* `.htaccess` at runtime, so they'd look
like they worked while nothing read them.

### Apache

```sh
sudo apt install apache2

# move off :80 BEFORE nginx exists, or nginx can't bind
sudo sed -i 's/^Listen 80$/Listen 127.0.0.1:8080/' /etc/apache2/ports.conf
sudo sed -i 's/<VirtualHost \*:80>/<VirtualHost 127.0.0.1:8080>/' \
  /etc/apache2/sites-available/000-default.conf

# Apache does no TLS here. These are inert only while ssl_module is off — a stray
# `a2enmod ssl` would grab 0.0.0.0:443 out from under nginx.
sudo sed -i 's/^\(\s*\)Listen 443/\1#Listen 443/' /etc/apache2/ports.conf

echo "ServerName localhost" | sudo tee -a /etc/apache2/apache2.conf   # silences AH00558

sudo a2enmod proxy proxy_fcgi setenvif remoteip rewrite headers expires
sudo a2enconf php8.5-fpm
sudo apachectl configtest && sudo systemctl restart apache2

ss -lntp | grep -E ':(80|443|8080)'    # expect ONLY 127.0.0.1:8080
```

> Enable the module *before* any conf using its directives — `remoteip.conf` first gives
> `Invalid command 'RemoteIPHeader'` and Apache won't start. And `restart`, not `reload`,
> after `a2enmod`.

#### mod_remoteip 

Behind a proxy every request reaches Apache from `127.0.0.1`. Without this that's what lands
in `access.log` for everything — which kills goaccess, per-site log review, and the IP
blocklist built *from* those logs, since I'd be blacklisting my own proxy.

`/etc/apache2/conf-available/remoteip.conf` → `sudo a2enconf remoteip`

```apacheconf
RemoteIPHeader X-Forwarded-For
RemoteIPInternalProxy 127.0.0.1
RemoteIPInternalProxy ::1

# %h logs the connection peer (still 127.0.0.1); %a logs what mod_remoteip resolved.
# Overrides the Ubuntu defaults — same strings with %h -> %a.
LogFormat "%v:%p %a %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" vhost_combined
LogFormat "%a %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
LogFormat "%a %l %u %t \"%r\" %>s %O" common
```

`RemoteIPInternalProxy` is a security control — it's why `X-Forwarded-For` is trusted from my
proxy and nowhere else. Without it anyone could forge the header and walk through the blocklist.

### nginx

```sh
sudo apt install nginx
sudo vi /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    # blocklist at the EDGE — blocked requests never reach Apache or PHP
    # include /etc/nginx/bots.d/blockbots.conf;
    # include /etc/nginx/bots.d/ddos.conf;

    client_max_body_size 64m;      # keep >= PHP upload_max_filesize

    location / {
        proxy_pass http://127.0.0.1:8080;

        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;

        proxy_connect_timeout 30s;
        proxy_send_timeout    60s;
        proxy_read_timeout    60s;
    }
}
```

TLS goes on with `certbot --nginx`, not `--apache`. Apache needs no certs.

#### proxy manager

Not used — I configure nginx directly. Left as a pointer in case I want a UI for the
container side later: [https://nginxproxymanager.com](https://nginxproxymanager.com)

### PHP-FPM

Resolute ships **8.5**; neither 8.3 nor 8.4 is in the repos, and getting 8.4 would mean the
`ondrej/php` PPA for one major — not worth a third-party repo whose updates bypass Pro/ESM.

```sh
sudo apt install php8.5-fpm php8.5-cli php8.5-common \
  php8.5-bcmath php8.5-curl php8.5-gd php8.5-imagick php8.5-intl \
  php8.5-mbstring php8.5-mysql php8.5-readline php8.5-sqlite3 \
  php8.5-xml php8.5-zip
```

> **No `php8.5-opcache` package** — it's compiled in as of 8.5, and asking for it fails the
> whole line. Check with `php -m | grep -i opcache`.

Tuning drops into `/etc/php/8.5/{fpm,cli}/conf.d/99-cotton.ini` rather than `php.ini` — not
because php.ini gets clobbered (it's ucf-managed, edits survive) but because 20 reviewable
lines copy forward to the next server and the next PHP version, where finding my changes
inside 1,885 lines means diffing against stock.

```ini
memory_limit = 512M
upload_max_filesize = 50M
post_max_size = 50M            ; must be >= upload_max_filesize
max_execution_time = 30
max_input_time = 60
realpath_cache_size = 256k
realpath_cache_ttl = 3600
display_errors = Off
log_errors = On
date.timezone = UTC
expose_php = Off
```

Stock defaults are 128M / 2M / 8M — the 2M cap breaks WP media uploads and fails vaguely.
Install into **both** `fpm/` and `cli/`; wp-cli reads the CLI copy.

> **`error_log` deliberately unset.** With `log_errors On` and no path, FPM passes errors up
> the FastCGI channel and Apache writes them to *that vhost's* `error.log` as
> `AH01071: Got error 'PHP message: ...'` — which is what gives them per-site attribution and
> what `clear-logs.sh` globs for. A central `error_log` removes them from the per-site logs
> entirely (verified), leaving the review script quiet but looking fine.
>
> `date.timezone = UTC` also deliberate — WP calls `date_default_timezone_set('UTC')` every
> request, so setting local time here would only affect pre-WP fatals and CLI, giving a mix.
> PHP timestamps run ahead of the web logs by the UTC offset.

### Verify Chain

```sh
# 1. proxying? Don't use `curl -I` and read Server: — nginx strips the upstream
#    header and stamps its own, so it says nginx either way. Compare content.
curl -s http://127.0.0.1/ | grep -o '<title>[^<]*</title>'
curl -s http://127.0.0.1:8080/ | grep -o '<title>[^<]*</title>'   # should match

# 2. mod_remoteip — must come from ANOTHER machine; on-box shows 127.0.0.1 legitimately
sudo tail -2 /var/log/apache2/access.log      # expect the real client IP

# 3. PHP through FPM, with REMOTE_ADDR intact
printf '<?php echo PHP_SAPI, " ", $_SERVER["REMOTE_ADDR"], "\n";' > /var/www/html/_check.php
curl -s http://192.168.*.***/_check.php       # expect: fpm-fcgi <real client ip>
rm /var/www/html/_check.php

sudo chown -R david:www-data /var/www/html    # wp-cli needs no sudo
```

`X-Forwarded-For` absent inside PHP is correct — mod_remoteip consumes it once used. Gone,
alongside a real `REMOTE_ADDR`, is the signature of it working.

## Proxy Tunnel

- FRP - [https://github.com/fatedier/frp](https://github.com/fatedier/frp)
- Rathole - [https://github.com/rathole-org/rathole](https://github.com/rathole-org/rathole)

## Wireguard

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