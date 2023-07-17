# Gogs

## About

Gogs ( [https://gogs.io/docs](https://gogs.io/docs) ) is a Golang powered git service which I've been using for about 10 years now. I still keep a GitHub profile and mirror or duplicate my repos there as well. It's nice to have a backup and to be able to spin up user account for collaboration.

Although it's been forked off as Gitea, I still prefer the original version because of the simplicity and I've watched the owner gracefully handle pull requests. I support the BDFL ( [Benevolent Dictator for Life](https://en.wikipedia.org/wiki/Benevolent_dictator_for_life) ) approach in open source software because I've found that it mostly helps the project.  

## Log

**23.07.17** - found a domain pointing at the IP proxy so I added a catch-all on the default .conf and this to code.daw to keep the content from showing under another domain.
```bash
RewriteEngine on
RewriteCond %{HTTP_HOST} !code.davidwindham.com
RewriteRule ^(.*)$ - [F]
```

**23.02.25** - patch for submodules fixes [Issue #6436](https://github.com/gogs/gogs/issues/6436). Upgrading from v0.12.9 -> v.0.12.11 

```bash 
sudo systemctl stop gogs
mv gogs gogs_old
wget https://dl.gogs.io/0.12.11/gogs_0.12.11_linux_amd64.tar.gz
tar -zxvf gogs_0.12.11_linux_amd64.tar.gz
cp -R gogs_old/{custom,data,log} gogs
sudo systemctl start gogs
# check logs /gogs/log
```

- Application version - 0.12.11
- Git version - 2.34.1
- Go version - go1.18.1
- Build time - 2023-02-25 07:18:45 UTC
- Build commit - [c9fba3cb30af0789fcf89098dfcb8f2286ee7d3b](https://github.com/gogs/gogs/commit/c9fba3cb30af0789fcf89098dfcb8f2286ee7d3b)


**23.02.10** - upgrading to version 0.12.9 while migrating servers. Dropping supervisor in favor of systemd. 

```bash 
sudo systemctl start/restart/stop/status gogs
Application version 0.12.9
Git version 2.34.1
Go version go1.18.1
Build time 2022-06-07 05:03:46 UTC
Build commit 012a1ba19ed2f8f5185be4254f655ba6c4b34db2 

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
```
### Migration

Moving from [Woozer](/docs/computers/woozer) -> to [Woozie](/docs/computers/woozie)

```bash 
#migrate files
scp -P ***** -C -i ~/.ssh/tempkey -p -r ******@45.79.219.165:/home/david/gogs /home/******
scp -P ***** -C -i ~/.ssh/tempkey -p -r ******@45.79.219.165:/home/david/gogs-repositories /home/******

mv gogs gogs_old
wget https://dl.gogs.io/$VERSION/gogs_${VERSION}_${OS}_${ARCH}.tar.gz
tar -zxvf gogs_${VERSION}_${OS}_${ARCH}.tar.gz
cp -R gogs_old/{custom,data,log} gogs
rm -rf gogs/custom/templates

sudo cp /home/******/gogs/scripts/systemd/gogs.service /etc/systemd/system/
sudo vi /etc/systemd/system/gogs.service
sudo systemctl daemon-reload
sudo systemctl start gogs
sudo truncate -s 0 log/gogs.log
```

I also found that the .tar and .zip file archives were taking up a considerable amount of space so I'll be removing them along with the option to download since it's rarely ever used except by bots. 

-> Admin Panel -> Operations -> Delete all repositories archives  
-> Admin Panel -> Operations -> Do garbage collection on repositories

I had made a bunch of customizations on the previous install which I'll bring up to the newest version. Some of the variable names have changed between versions and the templates are now packaged inside of the make file. In order to update the variable names, I just compared the edited templates with the versions from https://github.com/gogs/gogs/tree/v0.12.9/templates/

```bash
cd gogs 
cp -R gogs_old/custom/templates/ gogs/custom/templates/
cp -R gogs_old/custom/templates/user gogs/custom/templates/user
cp -R gogs_old/custom/public gogs/custom/
sudo systemctl restart gogs

# create directory for log/backup
sudo mkdir -p /var/www/code.davidawindham.com/{log,backup}
sudo chown david:www-data -R /var/www/code.davidawindham.com/

# on woozer
sudo certbot delete --cert-name code.davidawindham.com

# change the domain -> dns edit
sudo a2ensite code.davidawindham.com.conf
sudo a2dissite cd.davidawindham.com.conf
sudo systemctl reload apache2
sudo rm cd.davidawindham.com.conf
sudo certbot --apache -d code.davidawindham.com -d www.code.davidawindham.com
sudo vi gogs/custom/conf/app.ini

# rm the old version
sudo rm -rf gogs_old

sudo systemctl restart gogs
```

### Original Install 
```bash
sudo apt-get install golang-go

export PATH=$PATH:/usr/bin/go:$GOPATH/bin
export GOPATH=$HOME/go                                                                           
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

wget https://dl.gogs.io/0.11.4/linux_amd64.zip
unzip https://dl.gogs.io/0.11.4/linux_amd64.zip

sudo vi /etc/supervisor/supervisord.conf

//add 
[program:gogs]
directory=/home/david/gogs/
command=/home/david/gogs/gogs web
autostart=true
autorestart=true
startsecs=10
stdout_logfile=/var/log/gogs/stdout.log
stdout_logfile_maxbytes=1MB
stdout_logfile_backups=10
stdout_capture_maxbytes=1MB
stderr_logfile=/var/log/gogs/stderr.log
stderr_logfile_maxbytes=1MB
stderr_logfile_backups=10
stderr_capture_maxbytes=1MB
environment = HOME="/david/git", USER="david"
user = david

sudo service supervisor restart

#restart gogs 
sudo supervisorctl restart gogs

sudo vi /etc/apache2/sites-available/code.davidawindham.com.conf

<IfModule mod_ssl.c>
<VirtualHost *:443>
  ServerAdmin david@davidawindham.com
  ServerName  www.code.davidawindham.com
  ServerAlias code.davidawindham.com

  ProxyPreserveHost On
  ProxyRequests Off
  ProxyPass / http://127.0.0.1:3000/
  ProxyPassReverse / http://127.0.0.1:3000/

  LogLevel warn
  ErrorLog  /var/www/code.davidawindham.com/log/error.log
  CustomLog /var/www/code.davidawindham.com/log/access.log combined
SSLCertificateFile /etc/letsencrypt/live/code.davidawindham.com/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/code.davidawindham.com/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
```
