# Pants

* [https://peoplespants.com](https://peoplespants.com)

#### Build Structure

* [Babel](https://babeljs.io/)
* [webpack](https://webpack.js.org/)

#### Front End
* [Vuejs](https://vuejs.org/v2/guide/)

#### Back
* [Laravel](/docs/host/laravel)  

#### Testing
* [Laravel Dusk](https://laravel.com/docs/5.7/dusk)  
#### API

#### Mobile
* [Weex](https://weex.incubator.apache.org/guide/)

#### Database
* [MySQL](https://www.mysql.com/)

#### Payment Processing
* [Stripe - Docs](https://stripe.com/docs)


#### Legal
- [Atlas](https://stripe.com/atlas)

#### Conceptual

#### Other

#### Related

## Pants
( see projects/[pants.md](/projects/pants.md) )

```bash
//********* Ubuntu 18.04 ( Pants )****//

74.207.225.78
2600:3c02::f03c:91ff:fe21:88ca
root@74.207.225.78
sudo apt update && sudo apt upgrade
adduser user
adduser user sudo
logout
user@74.207.225.78

sudo vi /etc/hosts
IP FQDN hostname

ssh-keygen -b 4096
scp ~/.ssh/id_rsa.pub user@74.207.225.78:~/.ssh/authorized_keys

/etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no
Port ####
PubkeyAuthentication yes
sudo systemctl restart sshd

sudo apt-get install ufw
sudo ufw enable
ufw allow OpenSSH
ufw app list
ufw status verbose
sudo ufw allow/deny from IP
sudo ufw allow :PORT

sudo apt install apache2
sudo a2dismod mpm_event
sudo a2enmod mpm_prefork
sudo vi /etc/apache2/mods-available/mpm_event.comf
sudo vi /etc/apache2/mods-available/mpm_prefork.conf
sudo ufw allow 'Apache Full'
sudo systemctl reload apache2

sudo a2ensite blank.conf
sudo service apache2 restart
->add your username to the group adm to access apache logs
sudo usermod -aG adm

sudo add-apt-repository ppa:certbot/certbot
sudo apt install python-certbot-apache
sudo certbot --apache -d example.com
->backup /etc/letsencrypt

sudo apt install git
git config --global user.name "Your Name"
git config --global user.email "youremail@domain.com"

sudo apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo vi .zshrc

sudo apt install mysql-server
sudo mysql_secure_installation
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
mysql> FLUSH PRIVILEGES;
mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
create user 'testuser'@'localhost' identified by 'password';
grant all on testdb.* to 'testuser';
mysql> update mysql.user set user='' where user='root';
-> list users
SELECT user,authentication_string,plugin,host FROM mysql.user;


curl -sL https://raw.githubusercontent.com/richardforth/apache2buddy/master/apache2buddy.pl | perl

sudo apt install mysqltuner
mysqltuner

sudo apt install php libapache2-mod-php php-mysql
--> sudo apt install php-curl php-json php-cgi
sudo vi /etc/apache2/mods-enabled/dir.conf
apt search php- | less

sudo apt install php7.2-mbstring
sudo apt install php-xml
sudo apt install wget php-cli php-zip unzip
sudo apt install curl

/etc/php/7.2/apache2/php.ini
error_reporting = E_COMPILE_ERROR | E_RECOVERABLE_ERROR | E_ERROR | E_CORE_ERROR
max_input_time = 30
memory_limit - 256M
error_log = /var/log/php/error.log
sudo mkdir /var/log/php
sudo chown www-data /var/log/php

<Directory /var/www/>
	Options Indexes FollowSymLinks
	AllowOverride None
	Require all granted
</Directory>

sudo systemctl restart apache2
-> list all apache modules
sudo apache2ctl -M
-> apache2/apache2.conf
<IfModule http2_module>
    LogLevel http2:info
</IfModule>

--> Apache 2.4.27, HTTP/2 not supported in prefork
sudo a2dismod php7.2
sudo a2dismod mpm_prefork
sudo a2enmod php7.2
sudo apt install php7.2-fpm
sudo vi /etc/php/7.2/fpm/php.ini
--> memory/uploads/execution_time etc.

sudo apt install mod_proxy_fcgi
sudo a2enmod actions fastcgi alias proxy_fcgi
sudo apache2ctl -M

<VirtualHost *:443>
	Protocols h2 http/1.1
</VirtualHost>
<FilesMatch \.php$>
	SetHandler "proxy:unix:/var/run/php/php7.2-fpm.sock|fcgi://localhost/"
</FilesMatch>
<Proxy "fcgi://localhost/">
</Proxy>

 -->Tune Apache fpm https://medium.com/@sbuckpesch/apache2-and-php-fpm-performance-optimization-step-by-step-guide-1bfecf161534
https://blog.getpolymorph.com/7-tips-for-heavy-load-testing-with-apache-bench-b1127916b7b6

sudo vi /etc/apache2/mods-enabled/mpm_event.conf
 <IfModule mpm_event_module>
         StartServers             2
         MinSpareThreads          25
         MaxSpareThreads          75
         ThreadLimit              64
         ThreadsPerChild          25
         MaxRequestWorkers        150
         MaxConnectionsPerChild   100
 </IfModule>
/etc/php/7.1/fpm/pool.d/www.conf
sudo service php7.2-fpm restart
sudo apachectl restart
--> apache bench testing
ab -n 500 -c 100 https://example.com:443/
ab -n 1000 -c 100 https://example.com:443/

sudo cp /etc/apache2/sites-available/example.com.conf /etc/apache2/sites-available/sh.example.com.conf
sudo mkdir -p /var/www/sh.example.com/{html,log,backup}
sudo chown david:www-data -R /var/www/sh.example.com/
sudo a2ensite sh.example.com
sudo apachectl restart

sudo certbot --apache -d sh.example.com
sudo apachectl restart

  <Directory /var/www/example.com/html>
          Options  FollowSymLinks
          DirectoryIndex index.html index.php
          AllowOverride All
          Allow from all
          Require all granted
  </Directory>

<FilesMatch \.php$>
SetHandler "proxy:unix:/var/run/php/php7.2-fpm.sock|fcgi://localhost/"
</FilesMatch>

ProxyErrorOverride On

ErrorDocument 403 /error/403.html
ErrorDocument 404 /error/404.html
ErrorDocument 500 /error/503.html
ErrorDocument 502 /error/503.html
ErrorDocument 503 /error/503.html
ErrorDocument 504 /error/503.html

-->enable mod_headers.c
sudo a2enmod headers
sudo a2enmod expires
--> list all mods
apache2ctl -M

--> remove news/help from login
sudo chmod 0644 /etc/update-motd.d/50-motd-news
sudo chmod 0644 /etc/update-motd.d/10-help-text

--> add pants
sudo vi /etc/update-motd.d/05-pants
#!/bin/sh
printf "\n$(cat /etc/update-motd.d/pants.asc)\n"
--> pants.asc
.-.         .        .-.        .   
|-'.-,.-..-.| .-,.-  |-'.-. .-.-|-.-
'  `'-`-'|-''-`'--'  '  `-`-' ' '--'
         '                          
sudo chmod +x /etc/update-motd.d/20-display-logo


sudo apt install redis-server
sudo vi /etc/redis/redis.conf
--> add under # supervision tree. Options:
supervised systemd
--> make sure it's binding to localhost
bind 127.0.0.1 ::1
--> add password
openssl rand 60 | openssl base64 -A
--> cp from .evn.production and paste to:
# requirepass foobared (strong/long password)

sudo systemctl restart redis.service
sudo systemctl status redis

redis-cli
> ping
> get test
> exit

sudo systemctl restart redis
sudo netstat -lnp | grep redis
redis-cli
>auth your_redis_password
>set key1 10
>quit

sudo vi /etc/redis/redis.conf
--> diable dangerous redis commands
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command DEBUG ""
rename-command CONFIG ""

sudo systemctl restart redis.service
redis-cli
> auth your_redis_password
> exit

```
