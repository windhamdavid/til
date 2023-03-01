# Woozie 🦮

## Notes

**23.02.04** - Documentation for the server migration of [Woozer](/docs/computers/woozer) to [Woozie](/docs/computers/woozie). I'm running into the EOL ( End of Life ) for 18.04 LTS on April 2023, so I'm giving myself some buffer time to get her warmed up. I also needed a new development server to test Rust and WASM for my [human updates](https://davidawindham.com/human-updates-available/).

## Log

**23.02.04** - Init

### Todo

- Monitor
  - watch logs for bots/IPs & block
  - conf awk for cron to show virtual hosts
  - ~~combine A records for subdomains.~~
  - [lifeasweknowit.com](http://lifeasweknowit.com) is still pointed to the IP
- Tune
  - apache/nginx
  - mariadb
  - postgreSQL
- custom apache/nginx error pages
- ~~code.daw~~
  - ~~email settings for code.daw~~
  - ~~gogs submodules issue - <https://github.com/gogs/gogs/issues/6436>~~
    - ~~patch has landed in 0.13.0+dev, and will be back-ported to 0.12.11 (no ETA).~~
- ~~daw.com/wik/mail/reader/bookmarks~~
  - migrating to php v7.4.33 need to test with 8.1
  - add Redis caching for daw
  - cron for analytics logs
- ~~radio.daw stream.daw~~
  - add a feature to convert rmtp stream to icecast
  - auth for redis radio chat
  - ssl support for icecast
- block/switch port for rmtp with auth
- ~~add nginx to monit~~
- Monit actions redirect to root /url
- ~~longview MariaDB conf~~
  - ~~ticket submitted about <https://github.com/linode/longview/pull/49>~~
- ~~upgrade openssl <https://nvd.nist.gov/vuln/detail/CVE-2023-0286>~~
  - see [#Security ESM Pro](#security)
- configure remote db connections for Redis/MariaDB
  - ~~allow ip / auth~~
  - rename dangerous commands * see [Note](#redis) for redis about renaming

### Migration

Transfer IP address - [Docs](https://www.linode.com/docs/products/compute/compute-instances/guides/manage-ip-addresses/#transferring-ip-addresses)  
SCP (secure copy)

```bash
# add key on woozer
ssh-keygen ssh-keygen -t ed25519 -f ~/.ssh/tempkey
# on woozie 
scp -P (port) -C -i ~/.ssh/tempkey -p -r user@ip.ip.ip.ip:/home/user/dir /home/user
scp -P (port) -C -i ~/.ssh/tempkey -p user@ip.ip.ip.ip:/home/user/file /home/user/dir
```

## System

### Info

173.230.130.234  
45.79.219.165  
<http://173.230.130.234>  
<http://45.79.219.165>  
<https://dev.davidawindham.com>  
2600:3c02::f03c:93ff:fefc:319e  
Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-58-generic x86_64)  
AMD EPYC 7542 32-Core Processor  
8GB Ram 512 Swap / 200GB Storage

- Woozie - Linode Initial Configuration - Completed Sat, 04 Feb 2023 22:08:07 GMT
- Woozie - Deploy from distribution - Completed Sat, 04 Feb 2023 22:08:07 GMT
- Woozie - Create Swap - Completed Sat, 04 Feb 2023 22:08:39 GMT
- Woozie - System Boot - Ubuntu 22.04 LTS Disk - Completed Sat, 04 Feb 2023 22:08:40 GMT

```bash
*******@woozie:~ » lscpu
Architecture:            x86_64
  CPU op-mode(s):        32-bit, 64-bit
  Address sizes:         48 bits physical, 48 bits virtual
  Byte Order:            Little Endian
CPU(s):                  4
  On-line CPU(s) list:   0-3
Vendor ID:               AuthenticAMD
  Model name:            AMD EPYC 7542 32-Core Processor
    CPU family:          23
    Model:               49
    Thread(s) per core:  1
    Core(s) per socket:  4
    Socket(s):           1
    Stepping:            0
    BogoMIPS:            5799.99
    Flags:               fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clf
                         lush mmx fxsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp lm rep_
                         good nopl cpuid extd_apicid tsc_known_freq pni pclmulqdq ssse3 fma cx16 sse
                         4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand
                          hypervisor lahf_lm cmp_legacy cr8_legacy abm sse4a misalignsse 3dnowprefet
                         ch osvw perfctr_core ssbd ibrs ibpb stibp vmmcall fsgsbase tsc_adjust bmi1 
                         avx2 smep bmi2 rdseed adx smap clflushopt clwb sha_ni xsaveopt xsavec xgetb
                         v1 xsaves clzero xsaveerptr wbnoinvd arat umip rdpid arch_capabilities
Virtualization features: 
  Hypervisor vendor:     KVM
  Virtualization type:   full
Caches (sum of all):     
  L1d:                   256 KiB (4 instances)
  L1i:                   256 KiB (4 instances)
  L2:                    2 MiB (4 instances)
  L3:                    64 MiB (4 instances)
  ```

### Services

```bash
service --status-all
service --status-all | grep '\[ + \]'
# list all services
systemctl list-units
```

### Init

```bash
ssh root@173.230.130.234
sudo apt-get update && sudo apt-get upgrade
sudo apt list --upgradable

sudo timedatectl set-timezone 'America/New_York'
root@localhost:~# date
Sat Feb  4 05:40:00 PM EST 2023

root@localhost:~# hostnamectl set-hostname woozie
root@localhost:~# logout
Connection to 173.230.130.234 closed.
david@ovid🏛 :~ » ssh root@173.230.130.234

adduser user
adduser user sudo
logout

david@ovid🏛 :~ » ssh user@173.230.130.234
sudo vi /etc/hosts

127.0.0.1       localhost
173.230.130.234 dev.davidawindham.com
2600:3c02::f03c:93ff:fefc:319e dev.davidawindham.com

mkdir -p ~/.ssh && sudo chmod -R 700 ~/.ssh/
logout
scp ~/.ssh/id_rsa.pub user@173.230.130.234:~/.ssh/authorized_keys
sudo chmod -R 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys

# Block Logins
sudo vi /etc/ssh/sshd_config
AddressFamily inet
PermitRootLogin no
PasswordAuthentication no
Port ####

sudo systemctl restart sshd

# zsh
sudo apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo vi .zshrc
theme dpoggi

# Longview
curl -s https://lv.linode.com/464AB0EC-097A-4D7C-BC23DB5CAD79C43A | sudo bash
sudo systemctl status longview
sudo systemctl start longview

# motd
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

Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-58-generic x86_64)

     .     . .              .       .  . 
. . ...-..-| |-. .-. .-.-..-| .-.. ...-| 
 ` ` '' '`-'-' '-`-`-' ' '`-'-`-`-` '`-'-

  System information as of Sat Feb  4 06:14:51 PM EST 2023

  System load:           0.080078125
  Usage of /:            1.7% of 156.92GB
  Memory usage:          2%
  Swap usage:            0%
  Processes:             121
  Users logged in:       0
  IPv4 address for eth0: 173.230.130.234
  IPv6 address for eth0: 2600:3c02::f03c:93ff:fefc:319e

0 updates can be applied immediately.
```

### Shell

```bash
cd ~
touch .vimrc
vi .vimrc
set tabstop=2
set shiftwidth=2
set expandtab
```

### Systemd

### Packages

```bash
apt list --installed
apt list --upgradeable
apt list --installed | grep nginx

sudo apt-get update && sudo apt-get upgrade
sudo apt-get --with-new-pkgs upgrade

sudo apt-get clean && sudo apt-get autoremove
apt-get remove packagename
apt-get –-purge remove packagename

```

### rsyslog

```bash
# move log to /var/log/iptables/iptables.log
sudo mkdir /var/log/iptables
sudo touch /var/log/iptables/iptables.log

# filter iptables.log
sudo vi /etc/rsyslog.d/10-iptables.conf
:msg, regex, "iptables: " -/var/log/iptables.log
& ~

# rotate iptables.log
sudo vi /etc/logrotate.d/iptables
/var/log/iptables.log
{
  su root adm
  rotate 4
  daily
  missingok
  notifempty
  compress
  delaycompress
  postrotate
    /usr/lib/rsyslog/rsyslog-rotate
  endscript
}

sudo systemctl restart rsyslog
```

## Security

### ESM Pro

<https://ubuntu.com/pro/tutorial>

```bash
user@woozie:~ » pro --version
27.13.3~22.04.1
user@woozie:~ » pro security-status
785 packages installed:
    759 packages from Ubuntu Main/Restricted repository
    25 packages from Ubuntu Universe/Multiverse repository
    1 package from a third party

# check an exploit
user@woozie:~ » pro fix CVE-2023-0286
CVE-2023-0286: OpenSSL vulnerabilities
https://ubuntu.com/security/CVE-2023-0286
1 affected source package is installed: openssl
(1/1) openssl:
A fix is available in Ubuntu standard updates.
The update is already installed.
✔ CVE-2023-0286 is resolved.
```

### Cron

System keeps daily, a 2-7 day old, and 8-14 day old

```bash
# crontab
sudo crontab -e
# set path for crontab to run awk,zsh,etc..
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# lets encrypt renew every Monday at 1:01
11 1 * * 1 /usr/bin/certbot renew --quiet --noninteractive
# db optimize/backup every Sunday at 01:11
11 1 * * 0 /home/user/scripts/mysql-cron.sh
# monitor every morning at 06:00
00 6 * * * /home/user/scripts/monitor.sh
# monitor-archive every Sunday at 05:55 ( since weekly runs at 6:47 )
55 5 * * * /home/user/scripts/monitor-archive.sh

# mysql-cron.sh
#!/bin/sh
#Backup 'gg' to /home/user/backups/
mysqldump gg --user=******* --password='*******' > /home/user/backups/$(date +"%Y%m%d").gg.sql
#Optimize tables in 'gg'
mysqlcheck -o gg --user=******* --password='*******'

# monitor-cron.sh
#!/bin/sh
awk '$8=$1$8' /var/log/apache2/other_vhosts_access.log | goaccess -a -o /var/www/dev.davidawindham.com/html/**********/index.html - >> /home/*******/logs/cron.log 2>&1

goaccess /var/log/nginx/access.log -o /var/www/dev.davidawindham.com/html/monitor/nginx/index.html --log-format='%h %^[%d:%t %^] "%r" %s %b "%R" "%u" %T' >> /home/*******/logs/cron.log 2>&1

# monitor-archive.sh
#!/bin/sh
cp /var/www/dev.davidawindham.com/html/monitor/nginx/index.html /var/www/dev.davidawindham.com/html/monitor/nginx/$(date +"%y%m%d").html

cp /var/www/dev.davidawindham.com/html/monitor/index.html /var/www/dev.davidawindham.com/html/monitor/$(date +"%y%m%d").html



```

### IPtables

```bash
#show iptables
sudo iptables -L
sudo ip6tables -L
# verbose
sudo iptables -vL
sudo ip6tables -vL

sudo iptables -L --line-numbers
sudo ip6tables -L --line-numbers
sudo iptables -L -nv --line-numbers

# delete rule by line# 
sudo iptables -D INPUT (line number)

# Allow all loopback (lo0) traffic and reject traffic
# to localhost that does not originate from lo0.
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT ! -i lo -s 127.0.0.0/8 -j REJECT

sudo ip6tables -A INPUT -i lo -j ACCEPT
sudo ip6tables -A INPUT ! -i lo -s ::1/128 -j REJECT

# Linode Loadbalancer / Longview
sudo iptables -A INPUT -s 192.168.255.0/24 -m state --state NEW -j ACCEPT
sudo iptables -A OUTPUT 1 -p tcp --dport 443 -d longview.linode.com -j ACCEPT

# ICMPtypes 3,8,11 - Echo, Ping, TTL
sudo iptables -A INPUT -p icmp --icmp-type 3 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type 11 -j ACCEPT

sudo ip6tables -A INPUT -p icmpv6 -j ACCEPT

# Allow inbound traffic from established connections including ICMP error returns.
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo ip6tables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Log, prefix to sort, and limit to 5/min
sudo iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables: " --log-level 7
sudo iptables -A FORWARD -m limit --limit 5/min -j LOG --log-prefix "iptables: " --log-level 7
sudo ip6tables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables: " --log-level 7
sudo ip6tables -A FORWARD -m limit --limit 5/min -j LOG --log-prefix "iptables: " --log-level 7

# Ports (duplicate for ip6tables)
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT (http)
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT (https)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (monit)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (monitor)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (ssh)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (rmtp proxy)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (stream proxy)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (nginx proxy)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (node proxy)

## reject all others
sudo iptables -A FORWARD -j REJECT
sudo iptables -A INPUT -j REJECT

sudo ip6tables -A FORWARD -j REJECT
sudo ip6tables -A INPUT -j REJECT

## make it persistent
apt-get install iptables-persistent

## make sure it's running 
sudo systemctl is-enabled netfilter-persistent.service

sudo ls /etc/iptables
/etc/iptables/rules.v4
/etc/iptables/rules.v6

## Save current rules
sudo su - 
iptables-save >/etc/iptables/rules.v4
ip6tables-save > /etc/iptables/rules.v6

## Restore rules 
sudo /sbin/iptables-restore < /etc/iptables/rules.v4
sudo /sbin/iptables-restore < /etc/iptables/rules.v6

# re-save persistent
sudo dpkg-reconfigure iptables-persistent netfilter-persistent
sudo systemctl restart netfilter-persistent
Reboot to test iptables

# insert rules with line number
sudo iptables -L --line-numbers
sudo iptables -L -nv --line-numbers
sudo iptables -I INPUT (line-number) -p tcp --dport #### -j ACCEPT
```

### Monitor

```bash
# htop
sudo snap install htop 

# netstat
sudo apt install netstat
sudo netstat -ntlp | grep -i 3000
```

### Longview

```bash
sudo systemctl start longview

# mariadb support
sudo mysql -u root -p
mysql> CREATE USER '************'@'localhost' IDENTIFIED BY '****************';
mysql> Flush Privileges;
sudo vi /etc/linode/longview.d/MySQL.conf
sudo vi /opt/linode/longview/Linode/DataGetter/Applications/MySQL.pm 
-> our $SIGNATURES = ['mariadbd']
sudo systemctl restart longview

```

### GoAccess

```bash
sudo apt-get install goaccess
sudo vi /etc/goaccess/goaccess.conf
# Set wss-url, ssl-key, etc. 
# NCSA Combined Log Format with Virtual Host
log-format %v:%^ %h %^[%d:%t %^] "%r" %s %b "%R" "%u"

# block access 
<Location /monitor/>
    Require ip 0.0.0.0
</Location>

# cron to keep it updated for quick reference
sudo vi ~/user/scripts/monitor.sh
#! /bin/bash
goaccess /var/log/apache2/other_vhosts_access.log -o /var/www/dv.davidawindham.com/html/monitor/index.html >> /home/user/logs/cron.log 2>&1
goaccess /var/log/nginx/access.log -o /var/www/dv.davidawindham.com/html/monitor/nginx/index.html --log-format='%h %^[%d:%t %^] "%r" %s %b "%R" "%u" %T' >> /home/user/logs/cron.log 2>&1
# run daily @ 1:31am
sudo crontab -e
31 1  * * * /home/user/scripts/monitor.sh

# Nginx log format
sudo goaccess /var/log/nginx/access.log -o /var/www/dv.davidawindham.com/html/monitor/nginx/index.html --log-format='%h %^[%d:%t %^] "%r" %s %b "%R" "%u" %T'

# real time output
sudo goaccess /var/log/apache2/other_vhosts_access.log -o /var/www/dv.davidawindham.com/html/monitor/index.html --real-time-html

# from command line with no output daemonized
sudo goaccess /var/log/apache2/other_vhosts_access.log -o /var/www/dv.davidawindham.com/html/monitor/index.html --real-time-html --daemonize > /dev/null 2>&1 &

# add virtual hosts to requests
sudo awk '$8=$1$8' /var/log/apache2/other_vhosts_access.log | sudo goaccess -a -o /var/www/dv.davidawindham.com/html/monitor/index.html
```

### Monit

```bash
sudo apt-get install monit
sudo service monit stop/start/restart/reload/status all/check -t

sudo vi /etc/monit/monitrc
# 10 min intervals so as not to drain CPU and/or alert on manual restarts
  set daemon 600
# 4 min delay start          
    with start delay 240    

  set alert email@email.com
  set mailserver smtp.gmail.com port 587
    username "email@email.com" password "application_specific"
    using tls
  set httpd port #### and
    use address localhost
    allow localhost
    allow user:pass

# https://mmonit.com/wiki/Monit/ConfigurationExamples
sudo vi /etc/monit/conf.d/apache2.conf {etc}
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
  check process php-fpm with pidfile /run/php/php8.1-fpm.pid
    start program = "/usr/sbin/service php8.1-fpm start" with timeout 60 seconds
    stop program = "/usr/sbin/service php8.1-fpm stop"
    if failed unixsocket /var/run/php/php8.1-fpm.sock then restart
  check process nginx with pidfile /var/run/nginx.pid
    group www
    group nginx
    start program = "/etc/init.d/nginx start"
    stop program = "/etc/init.d/nginx stop"
    if failed port 8282 protocol http request "/" then restart
    if 5 restarts with 5 cycles then timeout

sudo monit reload

sudo service monit status
● monit.service - LSB: service and resource monitoring daemon
     Loaded: loaded (/etc/init.d/monit; generated)
     Active: active (running) since Thu 2023-02-09 09:17:09 EST; 15min ago
       Docs: man:systemd-sysv-generator(8)
    Process: 5629 ExecStart=/etc/init.d/monit start (code=exited, status=0/SUCCESS)
      Tasks: 2 (limit: 9405)
     Memory: 2.4M
        CPU: 123ms
     CGroup: /system.slice/monit.service
             └─5635 /usr/bin/monit -c /etc/monit/monitrc
```

### Blacklist

see repo @ <https://code.davidawindham.com/david/custom.d>

```bash
sudo vi /etc/apache2/apache2.conf
######## GLOBAL BLACKLIST ##########
<Location "/">
 AuthMerging And
 Include custom.d/globalblacklist.conf
</Location>
sudo systemctl restart apache2
```

### Audit

#### Lynis

## Webserver

### Apache

```bash
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
  ServerLimit             25
  MinSpareThreads         25
  MaxSpareThreads         75
  ThreadLimit             64
  ThreadsPerChild         25
  MaxRequestWorkers       600
  MaxConnectionsPerChild  100000
</IfModule>

# List modules 
sudo apachectl -L
sudo apachectl -M | grep mpm
sudo apachectl -M | sort

# configtest
sudo apachectl -t
sudo apachectl configtest

# status
sudo systemctl status apache2
sudo systemctl stop apache2
sudo systemctl start apache2
sudo systemctl status apache2

● apache2.service - The Apache HTTP Server
     Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
     Active: active (running) since Sun 2023-02-05 10:06:50 EST; 7s ago
       Docs: https://httpd.apache.org/docs/2.4/
    Process: 2744 ExecStart=/usr/sbin/apachectl start (code=exited, status=0/SUCCESS)
   Main PID: 2748 (apache2)
      Tasks: 53 (limit: 9406)
     Memory: 4.6M
        CPU: 58ms
     CGroup: /system.slice/apache2.service
             ├─2748 /usr/sbin/apache2 -k start
             └─2753 /usr/sbin/apache2 -k start

Feb 05 10:06:50 woozie systemd[1]: Starting The Apache HTTP Server...
Feb 05 10:06:50 woozie systemd[1]: Started The Apache HTTP Server.
Apache/2.4.52 (Ubuntu) Server

# Disable default conf
sudo a2dissite 000-default.conf
sudo systemctl reload apache2

# Enable http2,headers,expires,rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod http2
sudo a2enmod rewrite

# Disable TLS 1.0 and 1.1 
sudo a2enmod ssl
sudo vi /etc/apache2/mods-available/ssl.conf
SSLProtocol -all +TLSv1.2
SSLCipherSuite HIGH:!aNULL:!MD5:!3DES
sudo systemctl restart apache2

## server-status
sudo a2enmod status
sudo vi /etc/apache2/mods-enabled
<IfModule mod_status.c>
  <Location /server-status>
    SetHandler server-status
    Require local
    Require ip 127.0.0.1
    Require ip ***.**.**.**
    Require host dev.davidawindham.com
  </Location>
  <IfModule mod_proxy.c>
    ProxyStatus on
  </IfModule>
</IfModule>

## don't log longview/server-status/status
sudo vi /etc/apache2/conf-available/other-vhosts-access-log.conf
  CustomLog ${APACHE_LOG_DIR}/other_vhosts_access.log vhost_combined env=!dontlog
  SetEnvIf Remote_Addr "127\.0\.0\.1" dontlog
  SetEnvIf Remote_Addr "::1" dontlog
sudo vi /etc/apache2/sites-available/dev.dw.conf
  SetEnvIf Request_URI "^/server-status*$" dontlog
  SetEnvIf Request_URI "^/monit/$" dontlog

# change log rotation
sudo vi /etc/logrotate.d/apache2
daily -> weekly
create 640 root adm  -> create 644 root adm
rotate 14 -> rotate 4
sudo logrotate /etc/logrotate.d/apache2

# truncate logs
sudo truncate -s 0 /var/log/apache2/*.log
sudo truncate -s 0 /var/log/linode/*.log
sudo truncate -s 0 /var/www/dev.davidawindham.com/log/*.log
sudo truncate -s 0 /var/www/code.davidawindham.com/log/*.log
```

### Nginx

see [/docs/server/nginx](/docs/server/nginx)

```bash
sudo apt install nginx

# change default host port 
sudo vi /etc/nginx/sites-available/default
server {
  listen **** default_server;
  listen [::]:**** default_server;
}

# change log rotation
sudo vi /etc/logrotate.d/nginx
daily -> weekly
rotate 14 -> 4

# don't log local
sudo vi /etc/nginx/nginx.conf
http {
  map $remote_addr $notlocal {
    ~^::1$ 0;
    ~^127.0.0.1$ 0;
    default 1;
  }
  access_log /var/log/nginx/access.log combined if=$notlocal;
}

# rmtp module
sudo vi /etc/nginx/nginx.conf
rmtp {
  server {
    listen ****;
    chuck_size 4096;
    allow publish 127.0.0.1;
    allow publish *.*.*.*;
    deny publish all;
  }
  application live {
    live on;
    record off;

    hls on;
    hls_path /var/www/html/nginx/stream/hls;
    hls_fragment 3;
    hls_playlist_length 60;

    dash on;
    dash_path /var/www/html/nginx/stream/dash;:
  }
}

sudo nginx -t
sudo service nginx reload

# truncate logs
sudo truncate -s 0 /var/log/nginx/*.log
```

### Certbot

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo certbot --apache -d domain.com -d www.domain.com
sudo certbot delete --cert-name the-ham.org
sudo systemctl restart apache2

# set cron to renew
sudo crontab -e
11 1 * * 1 /usr/bin/certbot renew --quiet --noninteractive
```

### Dev

- reroute the IP ( 000-default.conf ) to dev.daw.com
- use .htaccess to protect directory but allow localhost
- route status, server-status, nginx_status, monitor, & monit

```bash
AuthName "Uh... What'cha doing?"
AuthType Basic
AuthUserFile /var/www/dev.davidawindham.com/.htpasswd
<RequireAny>
    Require ip 127.0.0.1
    Require valid-user
</RequireAny>
```

```bash
sudo mkdir -p /var/www/dev.davidawindham.com/{html,log,backup}
sudo chown david:www-data -R /var/www/dev.davidawindham.com/
sudo chmod -R 755 /var/www/dev.davidawindham.com/html
sudo vi /etc/apache2/sites-available/dev.davidawindham.com.conf

<VirtualHost *:80>
  ServerAdmin web@davidwindham.com
  ServerName dev.davidawindham.com
  ServerAlias www.dev.davidawindham.com
  DirectoryIndex index.html index.php
  Documentroot /var/www/dev.davidawindham.com/html

  <Directory /var/www/dev.davidawindham.com/html>
    Options Indexes FollowSymLinks
    DirectoryIndex index.html index.php
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
  </Directory>

  ProxyPreservehost On
  ProxyRequests Off
  ProxyPass /monit/ http://127.0.0.1:2812/ connectiontimeout=300 timeout=3-- Keepalive=On
  ProxyPassReverse /monit/ http://127.0.0.1:2812/
  <Location /monit/>
    Require ip 0.0.0.0
    ProxyPassReverseCookiePath / /monit/
  </Location>

  LogLevel warn
  SetEnvIf Remote_Addr "127\.0\.0\.1" dontlog
  SetEnvIf Remote_Addr "::1" dontlog
  SetEnvIf Request_URI "^/server-status*$" dontlog
  SetEnvIf Request_URI "^/monit/$" dontlog
  ErrorLog /var/www/dev.davidawindham.com/log/error.log
  CustomLog /var/www/dev.davidawindham.com/log/access.log combined env=!dontlog
  CustomLog ${APACHE_LOG_DIR}/other_vhosts_access.log vhost_combined env=!dontlog
</VirtualHost>

sudo a2ensite dev.davidawindham.com.conf
sudo certbot --apache -d dev.davidawindham.com -d www.dev.davidawindham.com

<VirtualHost *:443>
...
Include /etc/letsencrypt/options-ssl-apache.conf
SSLCertificateFile /etc/letsencrypt/live/dev.davidawindham.com/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/dev.davidawindham.com/privkey.pem
</VirtualHost>

sudo systemctl restart apache2
```

### Code

see - [/docs/host/gogs](/docs/host/Gogs)

```bash
sudo cp /home/******/gogs/scripts/systemd/gogs.service /etc/systemd/system/
sudo systemctl start gogs
sudo systemctl status gogs
● gogs.service - Gogs
     Loaded: loaded (/etc/systemd/system/gogs.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-02-10 16:07:32 EST; 1min 36s ago
   Main PID: 31027 (gogs)
      Tasks: 7 (limit: 9405)
     Memory: 39.7M
        CPU: 381ms
     CGroup: /system.slice/gogs.service
             └─31027 /home/******/gogs/gogs web

Feb 10 16:07:32 woozie systemd[1]: Started Gogs.
Feb 10 16:07:32 woozie gogs[31027]: 2023/02/10 16:07:32
```

## Databases

### MariaDB

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
  Change the root password? n
  Remove anonymous users? y
  Disallow root login remotely? y
  Remove test database? y
  Reload privilege tables now? y

sudo systemctl status mariadb
● mariadb.service - MariaDB 10.6.11 database server
     Loaded: loaded (/lib/systemd/system/mariadb.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2023-02-07 09:39:05 EST; 2min ago
       Docs: man:mariadbd(8)
             https://mariadb.com/kb/en/library/systemd/
   Main PID: 19765 (mariadbd)
     Status: "Taking your SQL requests now..."
      Tasks: 8 (limit: 9406)
     Memory: 61.0M
        CPU: 690ms
     CGroup: /system.slice/mariadb.service
             └─19765 /usr/sbin/mariadbd

sudo mysqladmin -p -u root version
mysqladmin  Ver 9.1 Distrib 10.6.11-MariaDB, for debian-linux-gnu on x86_64
Server version 10.6.11-MariaDB-0ubuntu0.22.04.1
Protocol version 10
Connection Localhost via UNIX socket
UNIX socket /run/mysqld/mysqld.sock
Uptime: 5 min 38 sec

#obsure root user
sudo mariadb
  mysql> rename user 'root'@'localhost' to '********'@'localhost';
  mysql> ALTER USER '********'@'localhost' IDENTIFIED BY '********';
  mysql> FLUSH PRIVILEGES;

# create new user
  mysql> create user '********'@'localhost' identified by '********';
  mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
  mysql> GRANT ALL PRIVILEGES ON *.* TO '********'@'localhost' WITH GRANT OPTION;
  mysql> FLUSH PRIVILEGES;
  mysql> exit

# create longveiw user
sudo mysql -u root -p
  mysql>CREATE USER 'linode-longview'@'localhost' IDENTIFIED BY '***********';
  mysql>flush privileges;
  mysql> exit

# /etc/mysql/my.cnf
[client]
default-character-set=utf8mb4

[mysql]
default-character-set=utf8mb4

[mysqld]
max_allowed_packet = 128M
character-set-client-handshake = FALSE
collation-server = utf8mb4_unicode_ci
init-connect = 'SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci'
character-set-server = utf8mb4
local-infile=0
bind-address = 127.0.0.1

# mysqltuner
wget -O /usr/bin/mysqltuner https://raw.githubusercontent.com/major/MySQLTuner-perl/master/mysqltuner.pl

# phpmyadmin 
CREATE USER 'pma'@'localhost' IDENTIFIED VIA mysql_native_password USING '********';
GRANT SELECT, INSERT, UPDATE, DELETE ON `database`.* TO 'pma'@'localhost';

```

### PostgreSQL

### Redis

```bash
sudo apt install redis-server
sudo vi /etc/redis/redis.conf
  supervised systemd
  bind 127.0.0.1 ::1
  port ****

# generate a random since redis can process 150k per/sec
openssl rand 60 | openssl base64 -A
sudo vi /etc/redis/redis.conf
  requirepass **************
sudo systemctl restart redis

sudo netstat -lnp | grep redis

# rename commands
sudo vi /etc/redis/redis.conf
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command DEBUG ""
rename-command CONFIG "CONFIG_*********"
rename-command SHUTDOWN "SHUTDOWN_*********"

# Command renaming (DEPRECATED).
# WARNING: avoid using this option if possible. Instead use ACLs to remove
# commands from the default user, and put them only in some admin user you
# create for administrative purposes.

# test
redis-cli
auth <Password>
exit

redis-cli -v
redis-cli 6.0.16
redis-server -v
Redis server v=6.0.16 sha=00000000:0 malloc=jemalloc-5.2.1 bits=64 build=a3fdef44459b3ad6
sudo systemctl status redis
● redis-server.service - Advanced key-value store
     Loaded: loaded (/lib/systemd/system/redis-server.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2023-02-16 08:19:37 EST; 1h 35min ago
       Docs: http://redis.io/documentation,
             man:redis-server(1)
   Main PID: 285004 (redis-server)
     Status: "Ready to accept connections"
      Tasks: 5 (limit: 9405)
     Memory: 2.6M
        CPU: 13.535s
     CGroup: /system.slice/redis-server.service
             └─285004 "/usr/bin/redis-server 127.0.0.1:****" "" "" "" "" "" "" "" "" "" "" "" "" "">

Feb 16 08:19:37 woozie systemd[1]: Starting Advanced key-value store...
Feb 16 08:19:37 woozie systemd[1]: Started Advanced key-value store.
```

## Languages

### Go

```bash
sudo apt-get install golang-go
export PATH=$PATH:/usr/local/go/bin
go version
go version go1.18.1 linux/amd64
```

### Node

```bash
sudo apt install nodejs
node -v 
v12.22.9
sudo apt install npm
npm -v
8.5.1

# add nvm to get an updated version
```

### PHP

```bash
sudo apt install php libapache2-mod-php php-mysql
php -v
PHP 8.1.2-1ubuntu2.10 (cli) (built: Jan 16 2023 15:19:49) (NTS)
Zend Engine v4.1.2, with Zend OPcache v8.1.2-1ubuntu2.10

# php.ini
sudo vi /etc/php/8.1/apache2/php.ini
max_execution_time = 30
max_input_time = 60
memory_limit = 512M
post_max_size = 50M
upload_max_filesize = 50M
realpath_cache_size = 256k
realpath_cache_ttl = 3600
error_log = /var/log/php/error.log

sudo mkdir /var/log/php
sudo chown www-data /var/log/php

sudo systemctl restart apache2

# additional pkgs ( some already installed by default )
sudo apt install php-bcmath php-curl php-gd php-imagick php-intl php-json php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip
sudo apt install libpcre3 libpcre3-dev

## enable php8.1-fpm
sudo apt install php8.1-fpm
sudo a2enmod proxy_fcgi setenvif
sudo systemctl restart apache2
sudo a2enconf php8.1-fpm

sudo vi /etc/php/8.1/fmp/php.ini
sudo systemctl reload php8.1-fpm
sudo systemctl restart php8.1-fpm
sudo systemctl status php8.1-fpm
sudo systemctl restart apache2
```

**version 7.4.33** - Needed this version for migration.

```bash
sudo apt -y install software-properties-common
sudo add-apt-repository ppa:ondrej/php

sudo apt install php7.4
sudo apt-get install -y php7.4-cli php7.4-json php7.4-common php7.4-mysql php7.4-zip php7.4-gd php7.4-mbstring php7.4-curl php7.4-xml php7.4-bcmath

# 7.4 php.ini
sudo vi /etc/php/7.4/apache2/php.ini

## enable php7.4-fpm
sudo apt install php7.4-fpm
sudo a2enconf php7.4-fpm.conf
sudo systemctl restart apache2

sudo systemctl start php7.4-fpm
sudo systemctl status php7.4-fpm

# SetHandler
sudo vi /etc/apache2/sites-enabled/etc.conf
<FilesMatch \.php$>
  SetHandler "proxy:unix:/run/php/php7.4-fpm.sock|fcgi://localhost"
</FilesMatch>
or 
Include /etc/apache2/conf-available/php7.4-fpm.conf
```

### Python

```bash
python3
Python 3.10.6 (main, Nov 14 2022, 16:10:14) [GCC 11.3.0] on linux
```

### Ruby

### Rust
