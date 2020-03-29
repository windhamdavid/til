# Zeke

#### bench tests
- 20/03/26   


```sh
david@macs:~/sites/til(master⚡) » ab -n 1000 -c 100 https://dev.davidwindham.com:443/
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
david@macs:~/sites/til(master⚡) »

```  

### init
```sh   

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
sudo chmod +x /etc/update-motd.d/05-windhamdavid

sudo apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo vi .zshrc

Linode Longview
curl -s https://lv.linode.com/464AB0EC-097A-4D7C-BC23DB5CAD79C43A | sudo bash
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

#### LAMP
```sh

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
sudo chown david:www-data -R /var/www/dev.davidwindham.com/
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


#### bad bot blocker
* [https://github.com/mitchellkrogza/apache-ultimate-bad-bot-blocker](https://github.com/mitchellkrogza/apache-ultimate-bad-bot-blocker)

```sh
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
# let's git it to sync it - https://code.davidawindham.com/custom.d
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
#### monitor  
```sh  
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
11 1 * * * sudo /home/david/scripts/monitor.sh

# error logs
sudo vi /etc/apache2/apache2.conf
  ErrorLogFormat "[%t] [%l] [%P] %F: %E: [%a] %M"
goaccess /var/www/dev.davidwindham.com/log/error.log --log-format='[%T] [%l] [%P] %F: %E: [%a] %M'


```

#### tune / audit  
```sh

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
mysqldump db_name --user=db_user --password='db_pass' > /home/david/backups/$(date +"%Y%m%d").db_name.sql
mysqlcheck -o db_name --user=db_user --password='db_pass'

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

#### certbot letsencrypt
```sh
//************** Certbot SSLs ( Zeke ) ***************//

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
```
####packages:
```sh
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
