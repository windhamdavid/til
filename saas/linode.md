# Linode  

- [https://manager.linode.com](https://manager.linode.com)
- [https://www.linode.com/docs/security/securing-your-server](https://www.linode.com/docs/security/securing-your-server)

##### updates
- [https://www.linode.com/docs/run-a-distribution-supplied-kernel-with-kvm](https://www.linode.com/docs/tools-reference/custom-kernels-distros/run-a-distribution-supplied-kernel-with-kvm)
  - As of February, 2017, you can boot your Linode using your choice of Linode's own kernel or the upstream kernel provided by a distribution's maintainers. Booting with Linode's kernel is enabled by default, but changing to the distro-supplied kernel is easy. This is useful if you'd like to enable specific kernel features, or if you'd prefer to handle kernel upgrades yourself.


## Pants
```
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

```

## Woozer
```
//********* Ubuntu 16.04 ( Woozer )****//


45.79.219.165
2600:3c02::f03c:91ff:fe67:cbec

http://45.79.219.165/

sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

sudo apt-get update && sudo apt-get upgrade

adduser user
usermod -a -G sudo user
echo "hostname" > /etc/hostname
sudo vi /etc/sshd_config - disable root and password logins
cp ~.ssh/rsa_pub(local) to .ssh/known_hosts(remote) - add keys
sudo service ssh restart

sudo apt-get install zsh
sudo apt-get install git
git config --global user.email "email"
git config user.name "user"
ssh-keygen -t rsa -b 4096 -C ""

sudo apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo vi .zshrc
mkdir ~/.vim/colors ~/.vim/etc
sudo vi .vimrc
source .zshrc .vimrc









sudo iptables -A INPUT -p tcp --dport 'ssh port' -j ACCEPT
sudo iptables -A INPUT ! -i lo -s 127.0.0.0/8 -j REJECT
sudo iptables -A INPUT -p icmp --icmp-type 3 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT
sudo iptables -A INPUT -p icmp --icmp-type 11 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 81 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 4791 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8181 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8282 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8888 -j ACCEPT
sudo iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables_INPUT_denied: " --log-level 7
sudo iptables -A INPUT -j REJECT
sudo iptables -A FORWARD -m limit --limit 5/min -j LOG --log-prefix "iptables_FORWARD_denied: " --log-level 7
sudo iptables -A FORWARD -j REJECT
sudo iptables -A INPUT -s longview.linode.com -m state --state NEW -j ACCEPT
sudo iptables -L

sudo iptables -L --line-numbers
sudo iptables -I INPUT 20 -p tcp --dport 8882 -j ACCEPT
sudo iptables -I INPUT 17 -p tcp --dport 8881 -j ACCEPT

8881 - radio
8181 - chess
8008 - icecast
8888 - show
8080 - chat
8282 - nginx



sudo apt-get install iptables-persistent
sudo iptables-restore < /tmp/v4
sudo ip6tables-restore < /tmp/v6
iptables-save

sudo apt-get install fail2ban
sudo cp jail.conf jail.local > adjust settings

sudo apt-get install apache2
sudo apt-get install apache2-utils


sudo a2ensite blank.conf
sudo a2dismod mpm_event
sudo a2enmod mpm_prefork
sudo vi /etc/apache2/mods-available/mpm_event.comf
sudo vi /etc/apache2/mods-available/mpm_prefork.conf
sudo service apache2 restart

sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo /etc/mysql/my.cnf
mysql> CREATE USER 'user'@'localhost' INDENTIFIED BY 'password';
sudo service mysql restart

sudo apt-get install php5 php-pear php5-mcrypt php5-dev libssh2-1-dev libssh2-php
sudo php5enmod mcrypt

sudo chown david:www-data -R /var/www/example.example.com
sudo chown david:www-data -R /var/www/cc.example.com
sudo chmod 0755 -R /var/www/example.example.com
sudo chmod g+s -R /var/www/example.example.com
## change all directories to 755
sudo find /var/www -type d -exec chmod 755 {} \;
## change all files to 644
sudo find /var/www -type f -exec chmod 644 {} \;

sudo vi /etc/apache2.conf/sites-available/blank.conf
sudo mkdir -p /var/www/blank/html
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/ssl/apache.key -out /etc/apache2/ssl/apache.crt
sudo a2ensite blank.conf
sudo service apache2 restart

sudo certbot --apache -d example.example.com

-- https://github.com/certbot/certbot/issues/5405 --
sudo certbot --authenticator standalone --installer apache -d example.example.com --pre-hook "apache2ctl stop" --post-hook "apache2ctl start"

sudo openssl req -new -newkey rsa:2048 -nodes -keyout windhambrothers.com.key -out windhambrothers.com.csr

wget https://raw.githubusercontent.com/xn/apachebuddy.pl/master/apachebuddy.pl
sudo perl apachebuddy.pl

mkdir /home/user/backups  /home/user/scripts
touch /home/user/scripts/mysql-cron.sh
chmod +x mysql-cron.sh
mysqldump david --user=woozer --password="opu$14473" > /home/david/backups/$(date + "%Y%m%d").david.sql
mysqlcheck -o david --user=woozer --password='opu$14473'

vi /etc/rsyslog.d > uncomment crontab
crontab -e
0 0 * * 0 /home/david/scripts/mysql-cron.sh

sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install nodejs

sudo touch /etc/init/node.conf
sudo vi /etc/init/node.conf

*nope* sudo apt-get install postfix mailutils
sudo vi /etc/aliases

sudo apt-get install monit
sudo vi /etc/monit/monitrc


sudo sh -c "echo deb http://download.opensuse.org/repositories/multimedia:/xiph/xUbuntu_14.04/ ./ >>/etc/apt/sources.list.d/icecast.list"
https://wiki.xiph.org/Icecast_Server/Installing_latest_version_(official_Xiph_repositories)
sudo apt-get install icecast2
http://stream.example.com:8008/admin/
admin / admin
make status2.xsl file.
sudo ln -s /etc/icecast2/web/status2.xsl /usr/share/icecast2/web/status2.xsl


sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get install redis-server
```
