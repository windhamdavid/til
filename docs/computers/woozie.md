# Woozie 🦮

## Notes

**23.02.04** - Documentation for the server migration of [Woozer](woozer) to [Woozie](woozie). I'm running into the EOL ( End of Life ) for 18.04 LTS on April 2023, so I'm giving myself some buffer time to get her warmed up. I also needed a new development server to test Rust and WASM for my [human updates](https://davidawindham.com/human-updates-available/).



## Log

**23.02.04** - Init

### Todo

- Monit actions work but redirect to root /url
- email settings for code.daw

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
http://173.230.130.234  
https://dv.davidawindham.com  
2600:3c02::f03c:93ff:fefc:319e  
Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-58-generic x86_64)  
AMD EPYC 7542 32-Core Processor
8GB Ram 512 Swap / 200GB Storage

* Woozie - Linode Initial Configuration - Completed Sat, 04 Feb 2023 22:08:07 GMT
* Woozie - Deploy from distribution - Completed Sat, 04 Feb 2023 22:08:07 GMT
* Woozie - Create Swap - Completed Sat, 04 Feb 2023 22:08:39 GMT
* Woozie - System Boot - Ubuntu 22.04 LTS Disk - Completed Sat, 04 Feb 2023 22:08:40 GMT

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
173.230.130.234 dv.davidawindham.com
2600:3c02::f03c:93ff:fefc:319e dv.davidawindham.com

mkdir -p ~/.ssh && sudo chmod -R 700 ~/.ssh/
logout
scp ~/.ssh/id_rsa.pub user@173.230.130.234:~/.ssh/authorized_keys
sudo chmod -R 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys

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

### systemd

### packages

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

### Backup

System keeps daily, a 2-7 day old, and 8-14 day old

```bash
# crontab
sudo crontab -e
11 1 * * 1 /usr/bin/certbot renew --quiet --noninteractive
11 1 * * 0 /home/user/scripts/mysql-cron.sh
30 8 * * * /home/user/scripts/monitor.sh

# mysql-cron.sh
#!/bin/sh
#Backup 'gg' to /home/user/backups/
mysqldump gg --user=******* --password='*******' > /home/david/backups/$(date +"%Y%m%d").gg.sql
#Optimize tables in 'gg'
mysqlcheck -o gg --user=******* --password='*******'

```

## Security 



### IPtables 

```bash 
#show iptables
sudo iptables -L
sudo ip6tables -L
# verbose
sudo iptables -vL
sudo ip6tables -vL
sudo iptables -L -nv --line-numbers

# Allow all loopback (lo0) traffic and reject traffic
# to localhost that does not originate from lo0.
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT ! -i lo -s 127.0.0.0/8 -j REJECT

sudo ip6tables -A INPUT -i lo -j ACCEPT
sudo ip6tables -A INPUT ! -i lo -s ::1/128 -j REJECT

# Linode Longview / Loadbalancer
sudo iptables -A INPUT -s 96.126.119.66 -m state --state NEW -j ACCEPT
sudo iptables -A INPUT -s 192.168.255.0/24 -m state --state NEW -j ACCEPT

# ICMPtypes 3,8,11 - Echo, Ping, TTL
sudo iptables -A INPUT -p icmp --icmp-type 3 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type 11 -j ACCEPT

sudo ip6tables -A INPUT -p icmpv6 -j ACCEPT

# Allow inbound traffic from established connections including ICMP error returns.
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

sudo ip6tables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Log what was incoming but denied / Log any traffic that was sent to you for forwarding
sudo iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables_INPUT_denied: " --log-level 7
sudo iptables -A FORWARD -m limit --limit 5/min -j LOG --log-prefix "iptables_FORWARD_denied: " --log-level 7

sudo ip6tables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "ip6tables_INPUT_denied: " --log-level 7

# Ports
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT (http)
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT (https)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (monit)
sudo iptables -A INPUT -p tcp --dport #### -j ACCEPT (ssh)

sudo ip6tables -A INPUT -p tcp --dport 80 -m state --state NEW -j ACCEPT
sudo ip6tables -A INPUT -p tcp --dport 443 -m state --state NEW -j ACCEPT
sudo ip6tables -A INPUT -p tcp --dport #### -j ACCEPT
sudo ip6tables -A INPUT -p tcp --dport #### -j ACCEPT

# Linode Longview / Loadbalancer
sudo iptables -A INPUT -s 96.126.119.66 -m state --state NEW -j ACCEPT
sudo iptables -A INPUT -s 192.168.255.0/24 -m state --state NEW -j ACCEPT

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
sudo dpkg-reconfigure iptables-persistent
Reboot to test iptables

```

### Monitor

```bash
# htop
sudo snap install htop 

# netstat
sudo apt install netstat
sudo netstat -ntlp | grep -i 3000
```

### Monit

```bash
sudo apt-get install monit
sudo service monit stop/start/restart/reload/status all/check -t

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

# https://mmonit.com/wiki/Monit/ConfigurationExamples
sudo vi /etc/monit/conf.d/apache2.conf {etc}
  check process php-fpm with pidfile /run/php/php8.1-fpm.pid
    start program = "/usr/sbin/service php8.1-fpm start" with timeout 60 seconds
    stop program = "/usr/sbin/service php8.1-fpm stop"
    if failed unixsocket /var/run/php/php8.1-fpm.sock then restart
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

### Audit

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
  MaxRequestWorkers       250
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
    #Require local
    #Require ip 127.0.0.1
    #Require host dv.davidawindham.com
    Order deny,allow
    Deny from all
    Allow from 127.0.0.1
    Allow from dv.davidawindham.com
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

# /etc/logrotate.d/apache2 
create 640 root adm  -> create 644 root adm
rotate 14 -> rotate 10

# truncate logs
sudo truncate -s 0 /var/log/apache2/*.log
sudo truncate -s 0 /var/www/dv.davidawindham.com/log/*.log
sudo truncate -s 0 /var/www/cd.davidawindham.com/log/*.log
```

### Nginx

### Certbot

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo certbot --apache -d domain.com -d www.domain.com
sudo systemctl restart apache2
```

### Dev

#### home

```bash
sudo mkdir -p /var/www/code.davidawindham.com/{html,log,backup}
sudo chown david:www-data -R /var/www/code.davidawindham.com/
sudo a2ensite code.davidawindham.com.conf
sudo systemctl reload apache2

sudo mkdir -p /var/www/dv.davidawindham.com/{html,log,backup}
sudo chown david:www-data -R /var/www/dv.davidawindham.com/
sudo chmod -R 755 /var/www/dv.davidawindham.com/html
sudo vi /etc/apache2/sites-available/dv.davidawindham.com.conf
sudo a2ensite dv.davidawindham.com.conf

<VirtualHost *:80>
  ServerAdmin web@davidwindham.com
  ServerName dv.davidawindham.com
  ServerAlias www.dv.davidawindham.com

  DirectoryIndex index.html index.php
  Documentroot /var/www/dv.davidawindham.com/html

  <Directory /var/www/dv.davidawindham.com/html>
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
  ErrorLog /var/www/dv.davidawindham.com/log/error.log
  CustomLog /var/www/dv.davidawindham.com/log/access.log combined env=!dontlog
  CustomLog ${APACHE_LOG_DIR}/other_vhosts_access.log vhost_combined env=!dontlog
</VirtualHost>

sudo certbot --apache -d dv.davidawindham.com -d www.dv.davidawindham.com
sudo systemctl restart apache2
```

### Gogs
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
Server version		10.6.11-MariaDB-0ubuntu0.22.04.1
Protocol version	10
Connection		Localhost via UNIX socket
UNIX socket		/run/mysqld/mysqld.sock
Uptime:			5 min 38 sec

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

# /etc/mysql/my.cnf
[client]
default-character-set=utf8mb4

[mysql]
default-character-set=utf8mb4

[mysqld]
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

## Languages

### Go
```bash
sudo apt-get install golang-go
export PATH=$PATH:/usr/local/go/bin
go version
go version go1.18.1 linux/amd64
```

### Node



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
### Python
```bash 
python3
Python 3.10.6 (main, Nov 14 2022, 16:10:14) [GCC 11.3.0] on linux

```

### Ruby

### Rust
