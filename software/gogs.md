[https://gogs.io/docs](https://gogs.io/docs)

```

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



sudo vi /etc/apache2/sites-available/code.davidawindham.com.conf

//add
<VirtualHost *:80>
  ServerAdmin david@davidawindham.com
  ServerName  www.code.davidawindham.com
  ServerAlias code.davidawindham.com

 # DirectoryIndex index.html index.php
 # DocumentRoot /var/www/code.davidawindham.com/html


  ProxyPreserveHost On
  ProxyRequests Off
  ProxyPass / http://127.0.0.1:3000/
  ProxyPassReverse / http://127.0.0.1:3000/

  LogLevel warn
  ErrorLog  /var/www/code.davidawindham.com/log/error.log
  CustomLog /var/www/code.davidawindham.com/log/access.log combined
RewriteEngine on
RewriteCond %{SERVER_NAME} =code.davidawindham.com [OR]
RewriteCond %{SERVER_NAME} =www.code.davidawindham.com
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,QSA,R=permanent]
</VirtualHost>

<IfModule mod_ssl.c>
<VirtualHost *:443>
  ServerAdmin david@davidawindham.com
  ServerName  www.code.davidawindham.com
  ServerAlias code.davidawindham.com

 # DirectoryIndex index.html index.php
 # DocumentRoot /var/www/code.davidawindham.com/html

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