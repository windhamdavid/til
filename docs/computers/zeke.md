# Zeke 🐕

Zeke was named after [https://davidwindham.com/zeke/](https://davidwindham.com/zeke/) because I like to [anthropomophize machines](https://davidwindham.com/anthropomorphizing-machines/).

Since the 26.04 rebuild Zeke sits at the far end of the **Woozie → Cotton → Zeke** chain — a staging step
for the migration rather than a second production box. That move is a while off yet; this rebuild was about
having it set up and ready to roll when it happens, and I'll probably try a few other builds on it in the
meantime. It's going to run **nginx** this time rather than Apache, so it is deliberately *not* a copy of
[Woozie](/docs/computers/woozie)'s config — the point is to see what nginx does for performance before the
real move. [Cotton](/docs/computers/cotton) stays the reference for practice; the web stack is where this
box is allowed to diverge.

## Log

- **26.09.14** - Stack up 🌐 nginx + php-fpm + MariaDB + phpMyAdmin + Monit, mirroring Cotton but
  **without Apache** — Cotton keeps it on a loopback port and nothing routes to it anyway, so
  there was no reason to carry it over. Real Let's Encrypt cert this time rather than mkcert, and
  one basic-auth gate at the server level since this box is actually on the internet. Remembered
  to exempt the ACME challenge path from that gate, which is the sort of thing that would
  otherwise fail at renewal two months from now with nobody watching. phpMyAdmin at `/pma/`,
  Monit at `/monit/`.
- **26.09.14** - Longview 📊 Lost more time than I'd like to admit to this. The install URL from
  the dashboard carries the **install code**, which is *not* the **API key** that goes in
  `/etc/linode/longview.key` — both are the same shape, so pasting the wrong one gives you a
  well-formed key the collector rejects as "is made up". Two other things worth writing down:
  Linode's Longview repo publishes nothing for `resolute`, so the apt source needs pointing at
  `noble` (same `1.1.5xenial1` package either way — I checksummed it against
  [Woozie](/docs/computers/woozie) and the agent binary is byte-identical), and a Longview key is
  **8-4-4-16**, not a standard GUID's 8-4-4-4-12. That last one reads as a malformed GUID and
  absolutely is not — I "fixed" it twice by adding a hyphen and broke a perfectly good key both
  times. The agent's own regex at `Longview.pl:85` settles it. Also: the init script is from 2013
  and has no stale-pidfile handling, so a failed start leaves an orphan and the next start spawns
  a second agent — `pkill` before restarting or you get several running at once, each posting a
  different old key.
- **26.09.14** - Base build done 🧰 Upgraded to 26.04.1, attached Ubuntu Pro (ESM infra + apps +
  livepatch), timezone off the image default and onto Eastern, locked SSH to keys only with root
  login off, cleaned the MOTD down to just the useful bits with the dog art on top, and put zsh +
  oh-my-zsh on with the `daw` theme so the prompt carries the 🐕. Two debconf prompts on the
  upgrade were worth slowing down for: `grub-pc` wanted to know which disk to write to — the root
  one, not the swap one — and `sshd_config` offered to replace my hardening with the package
  default, which would have quietly re-permitted root login by key. Read the diff, kept mine.
  Also learned SSH drops out mid-upgrade while `openssh-server` is replaced and stays down as long
  as a prompt is blocking, so the box pings but won't accept connections. Have the console open.
- **26.09.14** - Rebuilt on Ubuntu 26.04 LTS 🧱 Back in about a minute, and the socket override bound
  both stacks first time so the trap below never bit. I'd grabbed the host key with `ssh-keyscan` before
  the first root login and checked it again on the moved port afterwards — verifying from two independent
  points beats blind-accepting the fingerprint you're shown. Only the SSH port is reachable now; 22,
  Monit's port and MySQL are all closed from outside. IPv6 SSH is bound and confirmed with `ss` on the box,
  but I couldn't prove it from [Stu](/docs/computers/stu) — that Mac has no global v6 route, only ULA
  addresses, so the timeout was my end. Worth retesting from somewhere with real v6.
- **26.09.14** - Wrote out the 26.04 rebuild sequence before clicking Rebuild 🧱 The `ssh.socket` trap is the one that'll bite — `Port` in `sshd_config` is inert on 24.04+, and a bare `ListenStream` binds IPv6-only. Needs both stacks here since this box has a v6 address.
- **26.09.13** - Correction to myself: not powered off 🐕 still up and serving. Captured `iptables-save` and `ip6tables-save` before the wipe so the rules survive the box. Only the dev host still resolves here — everything else moved to [Woozie](/docs/computers/woozie) a month ago. Crontab is empty, nothing scheduled runs.
- **26.08.09** - Officially DEPRECATED 🚫 -> Migrated to [Woozie](/docs/computers/woozie.md) in a two step while I wire up [Cotton](/docs/computers/cotton) locally so I can spin up a fresh 📦 with some additional 🐴🔋 for more complex API requests.
- **26.05.28** - Haven't migrated yet 😂 Apache upgrade won't load http2 even on event module FTR. Tried a quick reinstall - no dice 🎲 so migration should be on the agenda soon. Will migrate IP so I don't have to fiddle with the domains or backport a buggy http2 module.
👈🏼 .
- **25.07.16** - Six (6) virtual hosts still running. Will remove over the next year. Expanded Security Maintenance (ESM) runs through April 2028.   
- **25.04.11** - Gotta run a clean install on Ubuntu 24.04 LTS to migrate Zeke🦮. Will put this off until summer when my schedule clears up. I'll get around it by migrating to [Woozie](/docs/computers/woozie) 🐕‍🦺


## 🧰 What's on the box

As built 2026-09-14, after the 26.04 rebuild. This is the reference state — the operational
detail and the reasoning behind each choice live in `_servers/zeke/`.

### Hardware / VM

| | |
|---|---|
| Provider | Linode (Akamai), us-southeast |
| CPU | 4 × AMD EPYC 7713 |
| RAM | 7.8 GiB |
| Swap | 511 MiB — on its own disk (`sdb`), not a swapfile |
| Disks | `sda` 159.5 G (root, ext4) · `sdb` 512 M (swap) |
| Usage | 157 G total, 3.6 G used, 3% |

Two disks is the Linode default layout and it matters at upgrade time: `grub-pc` offers both,
and the bootloader belongs on the **root disk**, never the swap one.

### OS

| | |
|---|---|
| Release | Ubuntu 26.04.1 LTS (`resolute`) |
| Kernel | 7.0.0-31-generic |
| Arch | amd64 |
| Init | systemd 259 |

### Access

- SSH on a **non-default port (`####`)**, moved via a `ssh.socket` drop-in — *not* `sshd_config`,
  which is inert for `Port` under socket activation. Bound on **both** stacks.
- **Key auth only.** `PasswordAuthentication no`, `PermitRootLogin no`. Verified by attempting a
  root login with a valid key and getting `Permission denied (publickey)`.
- One admin user in the `sudo` group, password sudo (not NOPASSWD).
- ed25519 key, one per machine, named for the host.
- Serial console (LISH) is the out-of-band path and is unaffected by any of the above — it goes
  through `login`/PAM, not sshd, which is what makes it a real recovery route.

### Security

- **ufw** 0.36.2 — default deny incoming, allow outgoing. SSH is `limit`ed (rate-limited), not
  plain `allow`; 80 and 443 are open ahead of the web stack. **Nothing else.** An external scan
  of 35 common and risky ports finds exactly one open.
- Only one non-loopback listener on the whole box. `systemd-resolved` and the NTP daemon are both
  bound to loopback.
- **Ubuntu Pro** attached — `esm-infra`, `esm-apps`, `livepatch`. The ESM repos are deb822
  `.sources` files, so a `grep '^deb'` finds nothing and looks like a failure; check with
  `apt-cache policy` instead.
- `unattended-upgrades` enabled. No automatic reboot.

### Installed

| | |
|---|---|
| Shell | zsh 5.9 + oh-my-zsh, `daw` theme (dpoggi + the machine emoji) |
| Web | nginx 1.28.3 |
| PHP | 8.5.4 via **php-fpm**, socket `/run/php/php8.5-fpm.sock` |
| Database | MariaDB 11.8.6 — bound to loopback only |
| Admin | phpMyAdmin 5.2.3 at `/pma/` · Monit 5.35.2 at `/monit/` |
| TLS | certbot 4.0.0, Let's Encrypt |
| Metrics | linode-longview 1.1.5 |
| Tooling | git 2.53.0 · curl 8.18.0 · openssl 3.5.5 · python 3.14.4 · ufw 0.36.2 |

PHP modules match Cotton's set: `bcmath bz2 cli common curl fpm gd imagick intl mbstring
mcrypt mysql readline sqlite3 xml zip`.

### The web stack, and how it differs from Woozie

**nginx → php-fpm directly. No Apache.** Woozie is Apache; Cotton keeps apache2 on a loopback
port behind a catch-all but nothing actually routes to it — PHP has been going straight to
php-fpm there for a while. Zeke drops Apache entirely, which is the whole point of this box.

Everything sits behind **one basic-auth gate at the server level**, because unlike Cotton this
machine is on the public internet. Verified: `/`, `/pma/` and `/monit/` all return 401 before
anything else happens.

| path | serves |
|---|---|
| `/` | landing page, docroot `/var/www/<site>/html` |
| `/pma/` | phpMyAdmin, via a **symlink** into the docroot, not an `alias` |
| `/monit/` | proxied to Monit on loopback |

Three details that are load-bearing rather than decorative:

- **`/.well-known/acme-challenge/` is exempted from basic auth**, on both the HTTP and HTTPS
  server blocks, with `^~` so no regex location can steal it. Without this, renewal fails with
  a 401 — **60 days after issuance**, long after anyone is watching. Cotton needs no equivalent
  because mkcert never validates anything.
- **phpMyAdmin is reached by symlink, not `alias`.** With `alias`, a regex PHP location has to
  rebuild `SCRIPT_FILENAME` by hand and gets it subtly wrong. A symlink keeps ordinary `root`
  semantics and the generic `.php` handler just works.
- **Monit needs three directives together** — `proxy_redirect`, `proxy_cookie_path` and
  `sub_filter` — because it emits absolute URLs and its buttons otherwise jump to the site root.
  `Accept-Encoding` must also be cleared or `sub_filter` silently does nothing to a gzipped body.

### Deliberately *not* installed

`apache2` · `docker` · `fail2ban`

## 🔥 Migration

```sh
# everything up to date
sudo apt update -y && sudo apt upgrade -y && sudo apt dist-upgrade -y
# remove unused packages and files
sudo apt autoremove -y && sudo apt autoclean -y

sudo reboot
backup

sudo systemctl | grep running
sudo systemctl stop <application_name>

# allow connections on TCP port **** - fallback port if the main connection drops
sudo ufw status
sudo ufw allow ****/tcp
sudo ufw reload

sudo iptables -L -nv --line-numbers
sudo iptables -A INPUT -p tcp --dport **** -j ACCEPT
sudo systemctl restart iptables
sudo systemctl restart ip6tables

# run update
sudo apt install update-manager-core
sudo vi /etc/update-manager/release-upgrades
# make sure Prompt=lts

sudo do-release-upgrade

```
**25.02.09** - setup php8.1 since 8.2 is now the default... Ubuntu 18.04 (Bionic Beaver) is now no longer supported outside of paid extended support plans. Ondřej Surý's PHP packages are only available for supported versions of Ubuntu, so are no longer available for Ubuntu 18.04.

```sh
# Install
sudo apt install php8.1 -y

sudo apt-get install -y php8.1-cli php8.1-bcmath php8.1-common php8.1-curl php8.1-gd php8.1-imagick php8.1-intl php8.1-json php8.1-mbstring php8.1-mysql php8.1-tidy php8.1-xml php8.1-zip

sudo apt install php8.1-fpm

sudo a2enconf php8.1-fpm.conf
sudo systemctl restart apache2

sudo systemctl start php8.1-fpm
sudo systemctl status php8.1-fpm

# SetHandler
sudo vi /etc/apache2/sites-enabled/etc.conf
<FilesMatch \.php$>
  SetHandler "proxy:unix:/run/php/php8.1-fpm.sock|fcgi://localhost"
</FilesMatch>
or 
Include /etc/apache2/conf-available/php8.1-fpm.conf

apachectl configtest
sudo systemctl restart apache2

## 🧱 Rebuild — Ubuntu 26.04

An **in-place Rebuild keeps the IP**, so DNS, the `/etc/hosts` entry on [Cotton](/docs/computers/cotton), the
whitelist config and the db-sync target all stay correct. What changes is host identity and the box's own
config — nothing that addresses it. Cotton is the reference build, so match it rather than copying the old
box forward.

### Pre-flight

- Upload the `ed25519` public key to the provider profile and tick it in the Rebuild dialog. Image is
  **Ubuntu 26.04 LTS** to match Cotton.
- `iptables-save` / `ip6tables-save` first — the rules are the only record of what was open, and the wipe
  takes them.
- Note the **DNS TTL before the move, not after.** It was 86400s (24h) here, so resolvers keep sending
  traffic to the old answer for a full day. Lower it ahead of time.

### First hour, in order

**1. Clear the old host keys on the client.** They regenerate on rebuild even though the address doesn't,
and without this you get `REMOTE HOST IDENTIFICATION HAS CHANGED`:

```sh
ssh-keygen -R '[dev.davidwindham.com]:****'
ssh-keygen -R <ip>
```

**2. First connection is `root` on 22.** Create the user, install the key, grant sudo.

**3. 🔴 Move SSH via the SOCKET, not `sshd_config`.** 24.04+ socket-activates sshd, so `Port` in
`sshd_config` does nothing. This cost an hour on another box and needed the serial console to recover,
because a bare `ListenStream=<port>` binds **IPv6-only**. In `/etc/systemd/system/ssh.socket.d/override.conf`:

```sh
[Socket]
ListenStream=
ListenStream=0.0.0.0:****
ListenStream=[::]:****
```

The empty `ListenStream=` is required — it clears the inherited `:22`. Then:

```sh
sudo systemctl daemon-reload && sudo systemctl restart ssh.socket
ss -lntp
```

**Verify with `ss -lntp` before closing the root session**, and keep that session open until a second one
succeeds independently.

**4. `ufw`, not raw iptables.** Only 80, 443 and the SSH port. Rate-limit SSH — the old box had none:

```sh
sudo ufw limit ****/tcp
```

**5. Monit from Cotton's configs**, not the older box's. `set alert` carries `not on { instance }` from the
start, or it mails on every reload. Put basic auth in front of the web interface at the proxy, rather than
relying on Monit's own auth as the only layer.

**6. Fresh app password** for Monit's mail, named so it's identifiable in the provider list later.

**7. Re-add the restricted rsync keys** — the wipe destroys `authorized_keys`. The client-side private keys
are unaffected and don't need regenerating.

**8. Update the client `~/.ssh/config`** to point at the new key, and drop the retired host blocks while
you're in there. Back up to `config.bak-<date>` first.

### What the old firewall encoded — and what not to carry

Three things in the captured rules were decisions rather than accidents, and two of them were wrong:

- **Monit's port was ACCEPTed from anywhere**, v4 and v6, while Monit itself only ever bound `127.0.0.1`.
  The firewall and the bind disagreed for years. Don't open it at all.
- **An allow rule for a host nothing identifies.** It's in the old notes and in
  [iptables](/docs/server/iptables), but no note says what it was. Not reproduced anywhere else.
- **A private-network rule that was dead** — this box only ever had `lo` and the public interface, so the
  rule never matched anything.

Otherwise: 80, 443 and the moved SSH port, ICMP types 3/8/11, `RELATED,ESTABLISHED`, default REJECT.

### Worth not repeating

From the migration, kept here because they'll recur on the next rotation:

- **`certbot --apache` can't validate a name whose DNS still points at the old box.** It stages the
  challenge on the new one, the CA reaches the old one, follows the redirect and 404s. Use
  `--webroot` pointed where the redirect *lands*, or DNS-01 and sidestep it.
- **`grep -r` skips symlinks, and `sites-enabled/` is all symlinks** — so a recursive grep reports nothing
  while the name is very much configured. Glob the files instead: `grep name /etc/apache2/sites-enabled/*`.
- **Scan `sites-enabled/`, not `/var/www/`.** A redirect-only vhost has no docroot and is invisible to a
  docroot listing.
- **A `Redirect` inside a vhost that also carries the redirect target as a `ServerAlias` points the site at
  itself.** `configtest` passes and the site stays up, because Apache runs the config it loaded at start —
  the loop only fires on the next reload.

## Monit
sudo vi /etc/monit/conf.d/apache2.conf
  check process php-fpm with pidfile /run/php/php8.1-fpm.pid
    start program = "/usr/sbin/service php8.1-fpm start" with timeout 60 seconds
    stop program = "/usr/sbin/service php8.1-fpm stop"
    if failed unixsocket /var/run/php/php8.1-fpm.sock then restart

sudo monit reload
sudo service monit status
```

**23.06.26** - added cron to clear logs weekly ( sun @5:50am )
```bash
sudo crontab -e 
50 5 * * 0 /home/*****/scripts/clear_logs.sh
```

**23.03.17** - Inline upgrade 18.04.6 LTS -> 20.04.5 LTS
```bash
# make a snapshot backup
sudo uname -mrs
> Linux 4.15.0-206-generic x86_64
# stop non-critical services
sudo systemctl | grep running
sudo systemctl stop monit
sudo systemctl stop apache2
sudo systemctl stop mysql
sudo systemctl stop php7.4-fpm
sudo systemctl stop linode-longview
# update everything
sudo apt update && apt upgrade
# clean repo cache
apt-get autoremove -y
apt-get clean -y
# reboot if needed
sudo apt install update-manager-core
# makes sure Prompt=lts
sudo vi /etc/update-manager/release-upgrades
# allow port ****
sudo iptables -I INPUT -p tcp --dport **** -j ACCEPT
# run the upgrade
sudo do-release-upgrade
# after reboot check version
lsb_release -a
sudo uname -mrs
# enable systemd-networkd
sudo systemctl enable systemd-networkd
```


**23.02.19** - added ESM and combined log to all of the hosts, changed the apache/nginx logrotated to weekly and put the monitor report in cron.

```bash
sudo vi /etc/apache2/sites-available/*.conf
LogLevel warn
  SetEnvIf Remote_Addr "127\.0\.0\.1" dontlog
  SetEnvIf Remote_Addr "::1" dontlog
  CustomLog ${APACHE_LOG_DIR}/other_vhosts_access.log vhost_combined env=!dontlog
sudo systemctl reload apache2

sudo crontab -e
# adjust to daily 
sudo vi /user/******/monitor.sh
sudo awk '$8=$1$8' /var/log/apache2/other_vhosts_access.log | sudo goaccess -a -o /var/www/dev.davidwindham.com/html/monitor/index.html >> /home/user/log/cron.log 2>&!
```

```bash
# ubuntu pro ESM ( extended security maintenance )
sudo pro attach <******key******>
user@zeke:~ » pro --version
27.13.3~18.04.1
*****@zeke:~ » pro security-status
728 packages installed:
    649 packages from Ubuntu Main/Restricted repository
    19 packages from Ubuntu Universe/Multiverse repository
    60 packages from third parties
```

**23.02.05** - remove TLSv1 and 1.1 from /etc/apache2/mods-enabled/ssl.conf
```bash 
SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
```

**23.02.03** - Leaving Zeke ( this server ) on version 18.04.6 for now. EOL ( End of Life ) is April 2023, so it will also be upgraded soon. Decided to bring [Woozer](/docs/computers/woozer) up to Ubuntu v22.04.1 first and enable the Ubuntu pro ESM ( Expanded Security Maintenance ) https://ubuntu.com/pro/tutorial  


disable the Expanded Security Maintenance notification. 

```bash 
sudo chmod 0644 /etc/update-motd.d/88-esm-announce
sudo chmod 0644 /etc/update-motd.d/91-contract-ua-esm-status
```


**20/10/08** - Waited until the first point release to avoid bugs for Ubuntu 20.04.01. Clean install:  Deploy new Linode / Secure the server / Install packages / cp files and data / swap IP address / reboot

```bash
sudo apt-get update && sudo apt-get upgrade
#### sudo apt-get dist-upgrade
#### more cautious approach to packages held back from dependencies
sudo apt-get --with-new-pkgs upgrade
```
  
## Bench testing

20/03/26 - some benchmarks

```bash  
*****@macs:~/sites/til(master⚡) » ab -n 1000 -c 100 https://dev.davidwindham.com:443/
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking dev.davidwindham.com (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        Apache/2.4.29
Server Hostname:        dev.davidwindham.com
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-CHACHA20-POLY1305,2048,256
Server Temp Key:        X25519 253 bits
TLS Server Name:        dev.davidwindham.com

Document Path:          /
Document Length:        18577 bytes

Concurrency Level:      100
Time taken for tests:   2.261 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      18877000 bytes
HTML transferred:       18577000 bytes
Requests per second:    442.28 [#/sec] (mean)
Time per request:       226.100 [ms] (mean)
Time per request:       2.261 [ms] (mean, across all concurrent requests)
Transfer rate:          8153.30 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       53  149  29.5    147     593
Processing:    31   61   9.8     59     113
Waiting:       14   20   5.6     18      52
Total:         88  210  31.6    206     674

Percentage of the requests served within a certain time (ms)
  50%    206
  66%    210
  75%    215
  80%    218
  90%    245
  95%    253
  98%    260
  99%    275
 100%    674 (longest request)
*****@macs:~/sites/til(master⚡) »

```  

## INIT

```bash
//************** Ubuntu 18.04 ( Zeke ) ***************//

45.79.193.63
2600:3c02::f03c:92ff:fed5:bb67

DNS Resolvers (IPv4): 173.230.129.5
DNS Resolvers (IPv6): 2600:3c02::5
173.230.129.5 - *******@173.230.129.5 / *************

sudo apt update && sudo apt upgrade
adduser user
adduser user sudo
logout

sudo vi /etc/hosts
  127.0.0.1 localhost zeke
  45.79.193.63 dev.davidwindham.com

ssh-keygen -b 4096
(from local machine) scp ~/.ssh/id_rsa.pub *****@45.79.193.63:~/.ssh/authorized_keys

/etc/ssh/sshd_config
PermitRootLogin no
#PasswordAuthentication no
Port ####
PubkeyAuthentication yes
sudo systemctl restart sshd
ssh -p **** ******@45.79.193.63

--> remove news/help from login / add asci logo
sudo chmod 0644 /etc/update-motd.d/50-motd-news
sudo chmod 0644 /etc/update-motd.d/10-help-text
sudo chmod +x /etc/update-motd.d/05-**********

sudo apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo vi .zshrc

Linode Longview
# the URL carries the INSTALL CODE, which is NOT the API key that goes in
# /etc/linode/longview.key — both are 8-4-4-16 and easy to confuse
curl -s https://lv.linode.com/********-****-****-**************** | sudo bash
sudo systemctl status longview
sudo systemctl start longview

##################### IPTABLES ########################
sudo iptables -L -nv --line-numbers
sudo iptables -A INPUT -i lo -j ACCEPT

# ICMPtypes 3,8,11 - Echo, Ping, TTL
sudo iptables -A INPUT -p icmp --icmp-type 3 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type 11 -j ACCEPT

# Allow inbound traffic from established connections including ICMP error returns.
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Log what was incoming but denied / Log any traffic that was sent to you for forwarding
sudo iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables_INPUT_denied: " --log-level 7
sudo iptables -A FORWARD -m limit --limit 5/min -j LOG --log-prefix "iptables_FORWARD_denied: " --log-level 7

# Ports
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT (http)
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT (https)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (monit)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (ssh)

# Linode Longview / Loadbalancer
sudo iptables -A INPUT -s 96.126.119.66 -m state --state NEW -j ACCEPT
sudo iptables -A INPUT -s 192.168.255.0/24 -m state --state NEW -j ACCEPT

## /tmp/v4,v6
sudo iptables-restore < /tmp/v4
sudo ip6tables-restore < /tmp/v6
apt-get install iptables-persistent
sudo ls /etc/iptables
sudo iptables -L
/etc/iptables/rules.v4
/etc/iptables/rules.v6
sudo dpkg-reconfigure iptables-persistent   

```

## LAMP

```bash

##################### LAMP ########################
##################### APACHE #####################
sudo apt install apache2
sudo vi /etc/apache2/apache2.conf
  KeepAlive On
  MaxKeepAliveRequests 50
  KeepAliveTimeout 5
  ServerName localhost

sudo a2dismod mpm_prefork
sudo a2enmod mpm_event
sudo vi /etc/apache2/mods-available/mpm_event.conf
<IfModule mpm_event_module>
  StartServers            5
  MinSpareServers         5
  MaxSpareServers         50
  MaxRequestWorkers       250
  MaxConnectionsPerChild  100000
</IfModule>

sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod http2

sudo systemctl restart apache2
sudo apachectl -M | grep mpm

sudo mkdir -p /var/www/dev.davidwindham.com/{html,log,backup}
sudo chown *****:www-data -R /var/www/dev.davidwindham.com/
sudo chmod -R 755 /var/www/dev.davidwindham.com/html
sudo vi /etc/apache2/sites-available/dev.davidwindham.com.conf
sudo a2ensite dev.davidwindham.com.conf

sudo add-apt-repository ppa:certbot/certbot
sudo apt install python-certbot-apache
sudo certbot --apache -d dev.davidwindham.com

# Apache buddy
  curl -sL https://raw.githubusercontent.com/richardforth/apache2buddy/master/apache2buddy.pl | perl
  sudo perl apache2buddy.pl


##################### MYSQL #####################
sudo apt install mysql-server
sudo mysql_secure_installation

# switch from auth_socket to native_password and change username for root user.
  sudo mysql
  mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
  mysql> rename user 'root'@'localhost' to '********'@'localhost';
  mysql> FLUSH PRIVILEGES;
# create new user
  mysql> create user 'user'@'localhost' identified by 'pass';
  mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
  mysql> GRANT ALL PRIVILEGES ON *.* TO '*****'@'localhost' WITH GRANT OPTION;
  mysql> exit

# check version  
  sudo systemctl status mysql.service
  sudo mysqladmin -p -u root version

# extra security
  sudo vi /etc/mysql/my.cnf
    bind-address = 127.0.0.1
    local-infile=0

sudo apt install mysqltuner
sudo mysqltuner

# tune extra
  sudo vi /etc/mysql/my.cnf

    [client]
    default-character-set=utf8
    [mysql]
    default-character-set=utf8
    [mysqld]
    default_storage_engine = InnoDB
    collation-server = utf8_unicode_ci

    init-connect='SET NAMES utf8'
    character-set-server = utf8
    max_allowed_packet = 64M
    max_connections    = 100
    thread_stack       = 128K
    table_open_cache   = 32M
    key_buffer_size    = 32M
    slow_query_log     = 0
    long_query_time    = 5
    log_queries_not_using_indexes   = 1

sudo systemctl restart mysql



##################### PHP ############################
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt-get install php7.4
sudo apt-get install php7.4-cli php7.4-fpm php7.4-bcmath php7.4-curl php7.4-gd php7.4-imagick php7.4-intl php7.4-json php7.4-mbstring php7.4-mysql php7.4-opcache php7.4-tidy php7.4-xml php7.4-xmlrpc php7.4-zip

sudo vi /etc/php/7.4/apache2/php.ini

  max_execution_time = 180
  max_input_time =300
  memory_limit = 512M
  post_max_size = 128M
  upload_max_filesize = 256M

  error_log = /var/log/php/error.log
  sudo mkdir /var/log/php
  sudo chown www-data /var/log/php

# enable PHP 7.4 FPM
sudo a2enmod proxy_fcgi setenvif
sudo a2enmod actions fastcgi alias proxy_fcgi
sudo a2enconf php7.4-fpm
sudo a2dismod mpm_prefork
sudo a2enmod mpm_event

# verify status
sudo service php7.4-fpm status
sudo vi /etc/php/7.4/fmp/php.ini
sudo systemctl reload php7.4-fpm
sudo systemctl restart php7.4-fpm

<VirtualHost *:443>
  Protocols h2 http/1.1
</VirtualHost>
<FilesMatch \.php$>
  SetHandler "proxy:unix:/var/run/php/php7.4-fpm.sock|fcgi://localhost/"
</FilesMatch>
<Proxy "fcgi://localhost/">
</Proxy>

## isolate fpm processes to new user
sudo vi /etc/php/7.4/fpm/pool.d/user123.conf
  [user123]
  user = user1
  group = group1
  listen = /run/php/php7.4-fpm-user1.sock
  listen.owner = www-data
  listen.group = www-data
  pm = dynamic
  pm.max_children = 5
  pm.start_servers = 2
  pm.min_spare_servers = 1
  pm.max_spare_servers = 3

  <FilesMatch ".php$">
     SetHandler "proxy:unix:/var/run/php/php7.4-fpm-user123.sock|fcgi://localhost/"          
  </FilesMatch>

# test config & restart
sudo php-fpm7.4 -t
sudo service php7.4-fpm restart

```

### Bot blocker

* [https://github.com/mitchellkrogza/apache-ultimate-bad-bot-blocker](https://github.com/mitchellkrogza/apache-ultimate-bad-bot-blocker)

```bash
##################### BAD BOTS ############################
# https://github.com/mitchellkrogza/apache-ultimate-bad-bot-blocker/tree/master/Apache_2.4

sudo mkdir /etc/apache2/custom.d

sudo wget https://raw.githubusercontent.com/mitchellkrogza/apache-ultimate-bad-bot-blocker/master/Apache_2.4/custom.d/globalblacklist.conf -O /etc/apache2/custom.d/globalblacklist.conf
sudo wget https://raw.githubusercontent.com/mitchellkrogza/apache-ultimate-bad-bot-blocker/master/Apache_2.4/custom.d/whitelist-domains.conf -O /etc/apache2/custom.d/whitelist-domains.conf
sudo wget https://raw.githubusercontent.com/mitchellkrogza/apache-ultimate-bad-bot-blocker/master/Apache_2.4/custom.d/blacklist-ips.conf -O /etc/apache2/custom.d/blacklist-ips.conf
sudo wget https://raw.githubusercontent.com/mitchellkrogza/apache-ultimate-bad-bot-blocker/master/Apache_2.4/custom.d/bad-referrer-words.conf -O /etc/apache2/custom.d/bad-referrer-words.conf
sudo wget https://raw.githubusercontent.com/mitchellkrogza/apache-ultimate-bad-bot-blocker/master/Apache_2.4/custom.d/blacklist-user-agents.conf -O /etc/apache2/custom.d/blacklist-user-agents.conf

sudo vi /etc/apache2/apache2.conf
    <Location "/">
      AuthMerging And
      Include custom.d/globalblacklist.conf
    </Location>
# ~ or e.g.~
sudo vi /etc/apache2/sites-available/default.conf
   <VirtualHost *:80>
      <Directory "/var/www/html">
         Include custom.d/globalblacklist.conf
      </Directory>
   </VirtualHost>

# whitelist all domains / IPs on Server
sudo vi /etc/apache2/custom.d/whitelist-domains.conf  
sudo vi /etc/apache2/custom.d/whitelist-ips.conf  

sudo apache2ctl configtest
sudo service apache2 reload

# update lists  
sudo wget https://raw.githubusercontent.com/mitchellkrogza/apache-ultimate-bad-bot-blocker/master/Apache_2.4/custom.d/globalblacklist.conf -O /etc/apache2/custom.d/globalblacklist.conf
# let's git it to sync it - https://davidwindham.com/code/custom.d
git filter-branch -f --prune-empty --subdirectory-filter Apache_2.4/custom.d master
git fetch upstream
git merge upstream/master   

# test it
curl -A "googlebot" https://dev.davidwindham.com/
# 200 OK
curl -A "SemrushBot" https://dev.davidwindham.com/
curl -A "masscan" https://dev.davidwindham.com/
curl -I https://dev.davidwindham.com/ -e http://100dollars-seo.com
curl -I https://dev.davidwindham.com/ -e http://zx6.ru
# 403 Forbidden

```

### monitor

```bash
//************** goAccess ( Zeke ) ***************//
# https://goaccess.io/man / https://github.com/allinurl/goaccess
sudo apt-get install goaccess

sudo /etc/goaccess.conf
(time,date,log format)

goaccess --help
goaccess /var/log/apache2/access.log
goaccess /var/www/dev.davidwindham.com/log/access.log

#filter by start date
sed '/28\/Mar\/2020/,$ p' /var/log/apache2/access.log | goaccess -a
#filter to date
grep '28/Mar/2020' /var/log/apache2/access.log | goaccess -a
## tail bots
tail -F -n +0 access.log | grep -i --line-buffered 'bot' | goaccess -

# genrate html page
sudo goaccess /var/log/apache2/access.log --log-format=COMBINED -o /var/www/dev.davidwindham.com/html/monitor/server/index.html
sudo goaccess /var/www/dev.davidwindham.com/log/access.log --log-format=COMBINED -o /var/www/dev.davidwindham.com/html/monitor/index.html

# genrate live html page
sudo goaccess /var/log/apache2/access.log --log-format=COMBINED -o /var/www/dev.davidwindham.com/html/monitor/index.html --real-time-html --addr=127.0.0.1 --ws-url=wss://dev.davidwindham.com:7890

# cron run at 1:11am daily
sudo vi ~/scripts/monitor.sh
  goaccess /var/log/apache2/access.log --log-format=COMBINED -o /var/www/dev.davidwindham.com/html/monitor/server/index.html
  goaccess /var/www/dev.davidwindham.com/log/access.log --log-format=COMBINED -o /var/www/dev.davidwindham.com/html/monitor/index.html
  goaccess /var/www/davidwindham.com/log/access.log --log-format=COMBINED -o /var/www/davidwindham.com/html/monitor/index.html

crontab -e
11 1 * * * sudo /home/*****/scripts/monitor.sh

# error logs
sudo vi /etc/apache2/apache2.conf
  ErrorLogFormat "[%t] [%l] [%P] %F: %E: [%a] %M"
goaccess /var/www/dev.davidwindham.com/log/error.log --log-format='[%T] [%l] [%P] %F: %E: [%a] %M'
```

### tune / audit

```bash

##################### TUNE ############################
# mysql tuner - https://github.com/major/MySQLTuner-perl
[mysqld]
performance_schema = on
perl mysqltuner.pl --host 127.0.0.1
perl mysqltuner.pl --outputfile /tmp/result_mysqltuner.txt
# apache2buddy
curl -sL https://raw.githubusercontent.com/richardforth/apache2buddy/master/apache2buddy.pl | sudo perl
#Apache mod_status

##################### CRON ############################
# mysql-cron.sh

#!/bin/sh
mysqldump db_name --user=db_user --password='db_pass' > /home/*****/backups/$(date +"%Y%m%d").db_name.sql
mysqlcheck -o db_name --user=db_user --password='db_pass'

# run every Sunday at 1:11am
sudo crontab -e
11 1 * * 0 /home/*****/scripts/mysql-cron.sh

##################### MONIT / SERVER-STATUS ############################
sudo apt-get install monit
#sudo iptables -A INPUT 14 -p tcp --dport 2812 -j ACCEPT

sudo vi /etc/monit/monitrc
  set daemon 600            #10 min intervals
    with start delay 240    #delay start 4min

  set alert email@email.com
  set mailserver smtp.gmail.com port 587
    username "email@email.com" password "application_specific"
    using tls
  set httpd port #### and
    use address localhost
    allow localhost
    allow user:pass

sudo vi /etc/monit/conf.d/apache2.conf etc}
  php7-fpm with pidfile /run/php/php7.4-fpm.pid
    start program = "/usr/sbin/service php7.4-fpm start" with timeout 60 seconds
    stop program = "/usr/sbin/service php7.4-fpm stop"
    if failed unixsocket /var/run/php/php7.4-fpm.sock restart
  check process mysql with pidfile /var/run/mysqld/mysqld.pid
    start program = "/usr/sbin/service mysql start" with timeout 60 seconds
    stop program = "/usr/sbin/service mysql stop"
    if failed unixsocket /var/run/mysqld/mysqld.sock then restart
  check process apache2 with pidfile /var/run/apache2/apache2.pid
    start program = "/bin/systemctl start apache2" with timeout 60 seconds
    start program = "/bin/systemctl stop apache2"
    restart program = "/bin/systemctl restart apache2" with timeout 120 seconds
    if children > 255 for 5 cycles then alert
    if cpu usage > 95% for 5 cycles then alert
    if failed port 80 protocol http then restart
sudo monit reload

sudo vi /etc/apache2/sites-available/dev.davidwindham.com-le-ssl.conf
  ProxyPreservehost On
  ProxyPass /monit/ http://127.0.0.1:2812/ connectiontimeout=300 timeout=3-- Keepalive=On
  ProxyPassReverse /monit/ http://127.0.0.1:2812/
  <Location /monit/>
    Order deny,allow
    Allow from all
    ProxyPassReverseCookiePath / /monit/
  </Location>
  <Location /server-status>
    SetHandler server-status
    Order allow,deny
    Deny from all
  </Location>

sudo service monit stop/start/restart/status all/check -t

# clear error logs
sudo bash -c 'echo > error.log'

## don't log longview/server-status/status
sudo vi /etc/apache2/conf-available/other-vhosts-access-log.conf
  CustomLog ${APACHE_LOG_DIR}/other_vhosts_access.log vhost_combined env=!dontlog
  SetEnvIf Remote_Addr "127\.0\.0\.1" dontlog
  SetEnvIf Remote_Addr "::1" dontlog
sudo vi /etc/apache2/sites-available/dev.dw.conf
  SetEnvIf Request_URI "^/server-status*$" dontlog
  SetEnvIf Request_URI "^/monit/$" dontlog


##################### LYNIS ############################
git clone https://github.com/CISOfy/lynis
cd lynis
./lynis audit system
```

### certbot

```bash
//************** Certbot SSLs ( Zeke ) ***************//
## install
sudo certbot --apache -d dev.davidwindham.com

## remove
sudo certbot delete --cert-name dev.davidwindham.com

## moving from another server   
sudo ls -l /etc/letsencrypt/live/davidwindham.com
  lrwxrwxrwx 1 root root 46 Mar 25 13:23 cert.pem -> /etc/letsencrypt/archive/davidwindham.com/cert2.pem
  lrwxrwxrwx 1 root root 47 Mar 25 13:24 chain.pem -> /etc/letsencrypt/archive/davidwindham.com/chain2.pem
  lrwxrwxrwx 1 root root 51 Mar 25 13:24 fullchain.pem -> /etc/letsencrypt/archive/davidwindham.com/fullchain2.pem
  lrwxrwxrwx 1 root root 49 Mar 25 13:24 privkey.pem -> /etc/letsencrypt/archive/davidwindham.com/privkey2.pem

cd ~
sudo tar -chvzf dw_certs.tar.gz /etc/letsencrypt/archive/davidwindham.com /etc/letsencrypt/renewal/davidwindham.com.conf
# move the .tar.gz to the root directory new server via ftp then login

#on destination server in root / directory
sudo tar -xvf dw_certs.tar.gz

#create symbolic links
sudo mkdir /etc/letsencrypt/live/davidwindham.com
sudo ln -s /etc/letsencrypt/archive/davidwindham.com/cert2.pem /etc/letsencrypt/live/davidwindham.com/cert.pem
sudo ln -s /etc/letsencrypt/archive/davidwindham.com/chain2.pem /etc/letsencrypt/live/davidwindham.com/chain.pem
sudo ln -s /etc/letsencrypt/archive/davidwindham.com/fullchain2.pem /etc/letsencrypt/live/davidwindham.com/fullchain.pem
sudo ln -s /etc/letsencrypt/archive/davidwindham.com/privkey2.pem /etc/letsencrypt/live/davidwindham.com/privkey.pem

# davidwindham.com.conf file
<VirtualHost *:80>
  ServerAdmin web@davidwindham.com
  ServerName davidwindham.com
  ServerAlias www.davidwindham.com

  DirectoryIndex index.html index.php
  Documentroot /var/www/davidwindham.com/html

  <Directory /var/www/davidwindham.com/html>
    Options FollowSymLinks
    DirectoryIndex index.html index.php
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
  </Directory>

  LogLevel wan
  ErrorLog /var/www/davidwindham.com/log/error.log
  CustomLog /var/www/davidwindham.com/log/access.log combined

  php_flag log_errors on
  php_flag display_errors off
  php_value error_reporting 32767
  php_value error_log /var/www/davidwindham.com/log/php.error.log

  RewriteEngine on
  RewriteCond %{SERVER_NAME} =davidwindham.com [OR]
  RewriteCond %{SERVER_NAME} =www.davidwindham.com
  RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

<IfModule mod_ssl.c>
<VirtualHost *:443>
  ServerAdmin web@davidwindham.com
  ServerName davidwindham.com
  ServerAlias www.davidwindham.com

  DirectoryIndex index.html index.php
  Documentroot /var/www/davidwindham.com/html

  <Directory /var/www/davidwindham.com/html>
    Options FollowSymLinks
    DirectoryIndex index.html index.php
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
  </Directory>

  LogLevel warn
  ErrorLog /var/www/davidwindham.com/log/error.log
  CustomLog /var/www/davidwindham.com/log/access.log combined

  php_flag log_errors on
  php_flag display_errors off
  php_value error_reporting 32767
  php_value error_log /var/www/davidwindham.com/log/php.error.log

  Include /etc/letsencrypt/options-ssl-apache.conf
  SSLCertificateFile /etc/letsencrypt/live/davidwindham.com/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/davidwindham.com/privkey.pem
</VirtualHost>
</IfModule>

## TEST ##
sudo letsencrypt renew --dry-run
## Crontab ##
sudo crontab -e
11 1 * * 1 certbot renew --quiet --noninteractive
# runs on mondays at 1:11am
```

## Packages

```bash
//************** Packages ( Zeke ) ***************//
dpkg –list
# pkg log
sudo vi /var/log/dpkg.log
sudo vi /var/log/apt/history.log
# installed?
dpkg -L packagename
sudo apt-get clean && sudo apt-get autoremove
# ck for dep issues
dpkg –configure -a
# rm a pkg
apt-get remove packagename
apt-get –-purge remove packagename
```
