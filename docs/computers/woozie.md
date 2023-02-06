# Woozie 🦮

**23.02.04** - Documentation for the server migration of [Woozer](woozer) to [Woozie](woozie). I'm running into the EOL ( End of Life ) for 18.04 LTS on April 2023, so I'm giving myself some buffer time to get her warmed up. I also needed a new development server to test Rust and WASM for my [human updates](https://davidawindham.com/human-updates-available/).
## Log

**23.02.04** - Init

## Info 
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

## Init

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

## Packages

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

## iptables 

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

## Monitor

## Audit

## Apache

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


sudo apachectl -L
sudo apachectl -M | grep mpm

sudo apachectl -t
sudo apachectl configtest

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

# Enable http2 headers expires
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod http2

# Disable TLS 1.0 and 1.1 
sudo a2enmod ssl
sudo vi /etc/apache2/mods-available/ssl.conf
SSLProtocol -all +TLSv1.2
SSLCipherSuite HIGH:!aNULL:!MD5:!3DES
sudo systemctl restart apache2

# List modules 
sudo apachectl -M | sort

```

## Nginx

## Certbot

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## DEV

```bash
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

  <Location /server-status>
    SetHandler server-status
    Order allow,deny
    Deny from all
  </Location>

  LogLevel warn
  ErrorLog /var/www/dv.davidawindham.com/log/error.log
  CustomLog /var/www/dv.davidawindham.com/log/access.log combined
  CustomLog /var/log/other_vhosts_access.log combined
</VirtualHost>


sudo certbot --apache -d dv.davidawindham.com -d www.dv.davidawindham.com
sudo systemctl restart apache2
```

## MariaDB

## Redis

## Python

## PHP

## Node

## GoLang

## Rust
