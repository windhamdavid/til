# Woozer

## Woozer
* had a DDOS issue and did some quick reconfigurations: Just making notes here wrote a post about it at [https:davidawindham.com/shall-we-play-a-game/](https:davidawindham.com/shall-we-play-a-game/):


```sh
# mod_evasive
sudo vi /etc/apache2/mods-enabled/evasive.conf
rm these later - sudo apt remove / sudo apt purge
bsd-mailx libapache2-mod-evasive postfix
sudo a2dismod evasive
sudo a2dismod evasive
perl /usr/share/doc/libapache2-mod-evasive/examples/.pl

# /etc/apache2/code.davidawindham.com-le-ssl.conf

RewriteEngine on
RewriteCond %{REQUEST_METHOD} ^(CONNECT|GET|HEAD|OPTIONS|POST|PROFIND|PUT) [NC]
#RewriteRule ^(.*)$ http://%{REMOTE_ADDR}/ [R=301,L]
RewriteRule (.*) http://chess.davidawindham.com$1 [R=301, L]
<Proxy *>
   Order deny,allow
   Deny from all
   Allow from (ip)
</Proxy>
~ or ~
<Proxy *>
   Require all granted
</Proxy>
<Location />
   SetEnvIfNoCase User-Agent "SemrushBot" bad_bot
   Deny from env=bad_bot
   <RequireAll>
      Require all granted
      Include /etc/apache2/ipblacklist.conf
   </RequireAll>
</Location>

# Monit dev/monit
sudo iptables -A INPUT 14 -p tcp --dport 2812 -j ACCEPT
sudo monit stop/start all/reload/check -t

# Apache mod_status dev/server-status
apachectl status
sudo vi /etc/httpd/conf.d/server-status.conf

sudo systemctl status apache2

# UFW (Universal Firewall)
sudo ufw enable/disable
sudo ufw status numbered
sudo ufw delete 2
sudo ufw status verbose
sudo ufw deny from (ip)

# clear error logs
sudo bash -c 'echo > error.log'

# Remove the ufw chains in iptables
for ufw in `sudo iptables -L |grep ufw|awk '{ print $2 }'`; do sudo iptables -F $ufw; done
for ufw in `sudo iptables -L |grep ufw|awk '{ print $2 }'`; do sudo iptables -X $ufw; done

for i in `sudo iptables -L INPUT --line-numbers |grep '[0-9].*ufw' | cut -f 1 -d ' ' | sort -r `; do sudo iptables -D INPUT $i ; done
for i in `sudo iptables -L FORWARD --line-numbers |grep '[0-9].*ufw' | cut -f 1 -d ' ' | sort -r `; do sudo iptables -D FORWARD $i ; done
for i in `sudo iptables -L OUTPUT --line-numbers |grep '[0-9].*ufw' | cut -f 1 -d ' ' | sort -r `; do sudo iptables -D OUTPUT $i ; done
for i in `sudo iptables -L | grep 'Chain .*ufw' | cut -d ' ' -f 2`; do sudo iptables -X $i ; done

# add nginx port back.
sudo iptables -I INPUT 14 -p tcp --dport 8282 -j ACCEPT

# block a bunch of bots - https://github.com/mitchellkrogza/apache-ultimate-bad-bot-blocker
sudo mkdir /etc/apache2/custom.d
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

# test it
curl -A "googlebot" https://davidawindham.com/
curl -A "SemrushBot" https://code.davidawindham.com/
curl -A "masscan" https://code.davidawindham.com/
curl -I https://davidawindham.com/ -e http://100dollars-seo.com
curl -I https://davidawindham.com/ -e http://zx6.ru

## don't log longview
/etc/apache2/conf-available/other-vhosts-access-log.conf
SetEnvIf Remote_Addr "127\.0\.0\.1" dontlog
CustomLog ${APACHE_LOG_DIR}/other_vhosts_access.log vhost_combined env=!dontlog

SetEnvIf Remote_Addr "127\.0\.0\.1" dontlog
SetEnvIf Remote_Addr "::1" dontlog

```

- php version updates:  

```sh
sudo apt-get install php7.4-cli php7.4-fpm php7.4-bcmath php7.4-curl php7.4-gd php7.4-imagick php7.4-intl php7.4-json php7.4-mbstring php7.4-mysql php7.4-opcache php7.4-recode php7.4-tidy php7.4-xml php7.4-xmlrpc php7.4-zip
sudo apt-get install php7.3-cli php7.3-fpm php7.3-bcmath php7.3-curl php7.3-gd php7.3-imagick php7.3-intl php7.3-json php7.3-mbstring php7.3-mysql php7.3-opcache php7.3-recode php7.3-tidy php7.3-xml php7.3-xmlrpc php7.3-zip
sudo apt-get install php7.2-cli php7.2-fpm php7.2-bcmath php7.2-curl php7.2-gd php7.2-imagick php7.2-intl php7.2-json php7.2-mbstring php7.2-mysql php7.2-opcache php7.2-recode php7.2-tidy php7.2-xml php7.2-xmlrpc php7.2-zip
sudo apt install php7.2-fpm
sudo vi /etc/php/7.2/fpm/php.ini
--> memory/uploads/execution_time etc.

sudo apt install mod_proxy_fcgi
sudo a2enmod actions fastcgi alias proxy_fcgi

<VirtualHost *:443>
    Protocols h2 http/1.1
</VirtualHost>
<FilesMatch \.php$>
    SetHandler "proxy:unix:/var/run/php/php7.2-fpm.sock|fcgi://localhost/"
</FilesMatch>
<Proxy "fcgi://localhost/">
</Proxy>

```
- switch to mpm_event_module to support http/2  

```
# vi /etc/apache2/apache2.config

Protocols h2 h2c http/1.1

<IfModule http2_module>
    LogLevel http2:info
</IfModule>

```

20.2.21: System upgrade from 16.04 LTS to 18.04.4 LTS ( This machine has had three major version upgrades ).

```
sudo apt-get update && sudo apt-get autoclean && sudo apt-get clean && sudo apt-get autoremove
```


```
Welcome to Ubuntu 18.04.4 LTS (GNU/Linux 5.4.10-x86_64-linode132 x86_64)

	     .     . .              .       .  .
	. . ...-..-| |-. .-. .-.-..-| .-.. ...-|
	 ` ` '' '`-'-' '-`-`-' ' '`-'-`-`-` '`-'-


0 packages can be updated.
0 updates are security updates.

david@woozer:~ » lsb_release -d
Description:	Ubuntu 18.04.4 LTS
david@woozer:~ » sudo dpkg --list                                                                                     

```


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
