# nginx

## Notes

NGINX - static assets, load balancing, reverse proxy, & rmtp.

## Log

**23/01/12** - Installed nginx on [Woozie](/docs/computers/woozie.md).

```bash
sudo apt install nginx
sudo vi /etc/nginx/sites-enabled/default
port 8080
sudo systemctl status nginx

● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Sun 2023-02-12 15:54:10 EST; 6s ago
       Docs: man:nginx(8)
    Process: 100367 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exite>
    Process: 100368 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status>
   Main PID: 100369 (nginx)
      Tasks: 5 (limit: 9405)
     Memory: 5.1M
        CPU: 34ms
     CGroup: /system.slice/nginx.service
     CGroup: /system.slice/nginx.service
             ├─100369 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             ├─100370 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "">
             ├─100371 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "">
             ├─100372 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "">
             └─100373 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "">

Feb 12 15:54:10 woozie systemd[1]: Starting A high performance web server and a reverse proxy serve>
Feb 12 15:54:10 woozie systemd[1]: Started A high performance web server and a reverse proxy server
```

## rmtp

```bash
sudo apt install libnginx-mod-rtmp
sudo vi /etc/nginx/nginx.conf 

# add rmtp 

rtmp {
  server {
    listen 1935;
    chunk_size 4096;
    allow publish 127.0.0.1;
    deny publish all;

    application live {
      live on;
      record off;

      hls on;
      hls_path /var/www/html/nginx/stream/hls;
      hls_fragment 3;
      hls_playlist_length 60;

      dash on;
      dash_path /var/www/html/nginx/stream/dash;
    }
  }
}
location /nginx_status {
  stub_status on;
  allow 127.0.0.1;
  allow 0.0.0.0;
deny all;
}

# location /auth {
#  if ($arg_pwd = 'stillgame') {
#   return 200;
#   }
#   return 401;
# }

# rtmp stat
location /stat {
rtmp_stat all;
  rtmp_stat_stylesheet stat.xsl;
}
location /stat.xsl {
root /var/www/html/nginx/rtmp;
}

# rtmp control
location /control {
rtmp_control all;
}

# rtmp hls/dash support
location /stream {
#autoindex on;
index index.html
#root /var/www/html/nginx/stream;

add_header 'Cache-Control' 'no-cache';
add_header 'Acccess-Control-Expose-Headers' 'Content_Length';
add_header 'Access-Control-Allow-Origin' '*' always;

types {
  applicatoin/dash+xml mpd;
  application/vnd.apple.mpegurl m3u8;
  video/mp2t ts;
}
}
sudo systemctl reload nginx
```

### Longview support

```sh
sudo su -
sudo vi /etc/linode/longview.d/Nginx.conf
```

#############################################################################

---

## nginx.conf

```bash
sudo vi /etc/nginx/nginx.conf

user www-data;
worker_processes auto;
worker_cpu_affinity auto;
worker_rlimit_nofile 100000;
pid /run/nginx.pid;

pcre_jit on;

events {
    multi_accept on;
    worker_connections  50000;
    accept_mutex on;
    use epoll;
}

http
{
    sendfile on;
    sendfile_max_chunk 512k;

    tcp_nopush on;
    tcp_nodelay on;

    keepalive_timeout 8;
    keepalive_requests 500;
    keepalive_disable msie6;

    lingering_time 20s;
    lingering_timeout 5s;

    server_tokens off;
    reset_timedout_connection on;
    add_header X-Powered-By "Woozie";
    add_header rt-Fastcgi-Cache $upstream_cache_status;

    # Limit Request
    limit_req_status 403;
    limit_req_zone $remote_addr_ipscrub zone=one:10m rate=1r/s;

    ##
    # Simple DOS mitigation
    ##

    # Max c/s by ip
    #limit_conn_zone $binary_remote_addr zone=limit_per_ip:10m;
    #limit_conn limit_per_ip 80;

    # Max rq/s by ip
    #limit_req_zone $binary_remote_addr zone=allips:10m rate=400r/s;
    #limit_req zone=allips burst=400 nodelay;

    # Proxy Settings
    # set_real_ip_from	proxy-server-ip;
    # real_ip_header	X-Forwarded-For;

    fastcgi_read_timeout 120s;
    client_max_body_size 100m;

    # See - https://www.nginx.com/blog/thread-pools-boost-performance-9x/
    aio threads;

    # tls dynamic records patch directive
   ssl_dyn_rec_enable on;
   ssl_dyn_rec_size_hi 4229;
   ssl_dyn_rec_size_lo 1369;
   ssl_dyn_rec_threshold 40;
   ssl_dyn_rec_timeout 1000;

    # nginx-vts-status module
    vhost_traffic_status_zone;

    # oscp settings
    resolver 8.8.8.8 1.1.1.1 valid=300s;
    resolver_timeout 10;

    ##
    # GeoIP module configuration, before removing comments
    # read the tutorial : https://gist.github.com/VirtuBox/9ed03c9bd9169202c358a8be181b7840
    ##
    #geoip_country /usr/share/GeoIP/GeoIP.dat;
    #geoip_city /usr/share/GeoIP/GeoIPCity.dat;

    ##
    # SSL Settings
    ##

    # SSL Early Data
    ssl_early_data off;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS13+AESGCM+AES128:TLS13+AESGCM+AES256:TLS13+CHACHA20:EECDH+AESGCM:EECDH+CHACHA20';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;
    ssl_ecdh_curve X25519:sect571r1:secp521r1:secp384r1;

    # Common security headers
    more_set_headers "X-Frame-Options : SAMEORIGIN";
    more_set_headers "X-Xss-Protection : 1; mode=block";
    more_set_headers "X-Content-Type-Options : nosniff";
    more_set_headers "Referrer-Policy : strict-origin-when-cross-origin";
    more_set_headers "X-Download-Options : noopen";

    ##
    # Basic Settings
    ##
    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ##
    # Logging Settings
    ##

    # disable access_log for performance
    access_log off;
    error_log /var/log/nginx/error.log;

    # Log format Settings - user IP hashed with the module ipscrub
    log_format rt_cache '$remote_addr_ipscrub $upstream_response_time $upstream_cache_status [$time_local] '
    '$http_host "$request" $status $body_bytes_sent '
    '"$http_referer" "$http_user_agent" $server_protocol';

    # ipscrub settings
    ipscrub_period_seconds 3600;

    ##
    # Gzip Settings
    ##
    # mitigation of CRIME/BREACH attacks
    gzip off;

    ##
    # Brotli Settings
    ##

    brotli on;
    brotli_static on;
    brotli_buffers 16 8k;
    brotli_comp_level 4;
    brotli_types *;


    ##
    # Virtual Host Configs
    ##
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}


#mail {
# # See sample authentication script at:
# # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
# # auth_http localhost/auth.php;
# # pop3_capabilities "TOP" "USER";
# # imap_capabilities "IMAP4rev1" "UIDPLUS";
#
# server {
#  listen     localhost:110;
#  protocol   pop3;
#  proxy      on;
# }
#
# server {
#  listen     localhost:143;
#  protocol   imap;
#  proxy      on;
# }
#}
```

---

https://github.com/VirtuBox/advanced-nginx-cheatsheet
https://github.com/VirtuBox/ubuntu-nginx-web-server


**Table of content**
<!-- TOC -->

- [Nginx Performance](#nginx-performance)
  - [Load-Balancing](#load-balancing)
    - [php-fpm Unix socket](#php-fpm-unix-socket)
    - [php-fpm TCP](#php-fpm-tcp)
    - [HTTP load-balancing](#http-load-balancing)
  - [WordPress Fastcgi cache](#wordpress-fastcgi-cache)
    - [mapping fastcgi_cache_bypass conditions](#mapping-fastcgi_cache_bypass-conditions)
    - [Define fastcgi_cache settings](#define-fastcgi_cache-settings)
    - [fastcgi_cache vhost example](#fastcgi_cache-vhost-example)
- [Nginx as a Proxy](#nginx-as-a-proxy)
  - [Simple Proxy](#simple-proxy)
  - [Proxy in a subfolder](#proxy-in-a-subfolder)
  - [Proxy keepalive for websocket](#proxy-keepalive-for-websocket)
  - [Reverse-Proxy for Apache](#reverse-proxy-configuration-to-handle-static-files-and-pass-other-requests-to-apache)
- [Nginx Security](#nginx-security)
  - [Denying access](#denying-access)
    - [common backup and archives files](#common-backup-and-archives-files)
    - [Deny access to hidden files & directory](#deny-access-to-hidden-files--directory)
  - [Blocking common attacks](#blocking-common-attacks)
    - [base64 encoded url](#base64-encoded-url)
    - [javascript eval() url](#javascript-eval-url)
- [Nginx SEO](#nginx-seo)
  - [robots.txt location](#robotstxt-location)
  - [Make a website not indexable](#make-a-website-not-indexable)
- [Nginx Media](#nginx-media)
  - [MP4 stream module](#mp4-stream-module)
  - [WebP images](#webp-images)

<!-- /TOC -->

### Nginx Performance

### Load-Balancing

#### php-fpm Unix socket

```nginx
upstream php {
    least_conn;

    server unix:/var/run/php/php-fpm.sock;
    server unix:/var/run/php/php-two-fpm.sock;

    keepalive 5;
}
```

#### php-fpm TCP

```nginx
upstream php {
    least_conn;

    server 127.0.0.1:9090;
    server 127.0.0.1:9091;

    keepalive 5;
}
```

#### HTTP load-balancing

```nginx
# Upstreams
upstream backend {
    least_conn;

    server 10.10.10.1:80;
    server 10.10.10.2:80;
}

server {

    server_name site.ltd;

    location / {
        proxy_pass http://backend;
        proxy_redirect      off;
        proxy_set_header    Host            $host;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Fastcgi cache

#### mapping fastcgi_cache_bypass conditions

To put inside a configuration file in /etc/nginx/conf.d/

```nginx
# do not cache xmlhttp requests
map $http_x_requested_with $http_request_no_cache {
    default 0;
    XMLHttpRequest 1;
}
# do not cache requests for the following cookies
map $http_cookie $cookie_no_cache {
    default 0;
    "~*wordpress_[a-f0-9]+" 1;
    "~*wp-postpass" 1;
    "~*wordpress_logged_in" 1;
    "~*wordpress_no_cache" 1;
    "~*comment_author" 1;
    "~*woocommerce_items_in_cart" 1;
    "~*woocommerce_cart_hash" 1;
    "~*wptouch_switch_toogle" 1;
    "~*comment_author_email_" 1;
}
# do not cache requests for the following uri
map $request_uri $uri_no_cache {
    default 0;
    "~*/wp-admin/" 1;
    "~*/wp-[a-zA-Z0-9-]+.php" 1;
    "~*/feed/" 1;
    "~*/index.php" 1;
    "~*/[a-z0-9_-]+-sitemap([0-9]+)?.xml" 1;
    "~*/sitemap(_index)?.xml" 1;
    "~*/wp-comments-popup.php" 1;
    "~*/wp-links-opml.php" 1;
    "~*/wp-.*.php" 1;
    "~*/xmlrpc.php" 1;
}
# do not cache request with args (like site.tld/index.php?id=1)
map $query_string $query_no_cache {
    default 1;
    "" 0;
}
# map previous conditions with the variable $skip_cache
map $http_request_no_cache$cookie_no_cache$uri_no_cache$query_no_cache $skip_cache {
    default 1;
    0000 0;
}
```

#### Define fastcgi_cache settings

To put inside another configuration file in /etc/nginx/conf.d

```nginx
# FastCGI cache settings
fastcgi_cache_path /var/run/nginx-cache levels=1:2 keys_zone=WORDPRESS:360m inactive=24h max_size=256M;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
fastcgi_cache_use_stale error timeout invalid_header updating http_500 http_503;
fastcgi_cache_methods GET HEAD;
fastcgi_buffers 256 32k;
fastcgi_buffer_size 256k;
fastcgi_connect_timeout 4s;
fastcgi_send_timeout 120s;
fastcgi_busy_buffers_size 512k;
fastcgi_temp_file_write_size 512K;
fastcgi_param SERVER_NAME $http_host;
fastcgi_ignore_headers Cache-Control Expires Set-Cookie;
fastcgi_keep_conn on;
fastcgi_cache_lock on;
fastcgi_cache_lock_age 1s;
fastcgi_cache_lock_timeout 3s;
```

To work with cookies, you can edit the fastcgi_cache_key. Cookie can be added with variable `$cookie_{COOKIE_NAME}`. For example, the WordPress plugin Polylang use a cookie named `pll_language`, so the directive fastcgi_cache_key would be :

```nginx
fastcgi_cache_key "$scheme$request_method$host$request_uri$cookie_pll_language";
```

#### fastcgi_cache vhost example

```nginx
server {

    server_name domain.tld;

    access_log /var/log/nginx/domain.tld.access.log;
    error_log /var/log/nginx/domain.tld.error.log;

    root /var/www/domain.tld/htdocs;
    index index.php index.html index.htm;

    # add X-fastcgi-cache header to see if requests are cached
    add_header X-fastcgi-cache $upstream_cache_status;

    # default try_files directive for WP 5.0+ with pretty URLs
    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }
    # pass requests to fastcgi with fastcgi_cache enabled
    location ~ \.php$ {
        try_files $uri =404;
        include fastcgi_params;
        fastcgi_pass php;
        fastcgi_cache_bypass $skip_cache;
        fastcgi_no_cache $skip_cache;
        fastcgi_cache WORDPRESS;
        fastcgi_cache_valid 200 30m;
    }
    # block to purge nginx cache with nginx was built with ngx_cache_purge module
    location ~ /purge(/.*) {
        fastcgi_cache_purge WORDPRESS "$scheme$request_method$host$1";
        access_log off;
    }

}
```


### Simple Proxy

```nginx
location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_redirect      off;
        proxy_set_header    Host            $host;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
```

### Proxy in a subfolder

```nginx
location /folder/ { # The / is important!
        proxy_pass http://127.0.0.1:3000/;# The / is important!
        proxy_redirect      off;
        proxy_set_header    Host            $host;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
```

### Proxy keepalive for websocket

```nginx
# Upstreams
upstream backend {
    server 127.0.0.1:3000;
    keepalive 5;
}
# HTTP Server
server {
    server_name site.tld;
    error_log /var/log/nginx/site.tld.access.log;
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forward-Proto http;
        proxy_set_header X-Nginx-Proxy true;
        proxy_redirect off;
    }
}
```

### Reverse-Proxy For Apache

```nginx
server {

    server_name domain.tld;

    access_log /var/log/nginx/domain.tld.access.log;
    error_log /var/log/nginx/domain.tld.error.log;

    root /var/www/domain.tld/htdocs;

    # pass requests to Apache backend
    location / {
        proxy_pass http://backend;
    }
    # handle static files with a fallback
    location ~* \.(ogg|ogv|svg|svgz|eot|otf|woff|woff2|ttf|m4a|mp4|ttf|rss|atom|jpe?g|gif|cur|heic|png|tiff|ico|zip|webm|mp3|aac|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid|midi|wav|bmp|rtf|swf|webp)$ {
        add_header "Access-Control-Allow-Origin" "*";
        access_log off;
        log_not_found off;
        expires max;
        try_files $uri @fallback;
    }
    # fallback to pass requests to Apache if files are not found
    location @fallback {
        proxy_pass http://backend;
    }
}
```

### Denying access

#### common backup and archives files

```nginx
location ~* "\.(old|orig|original|php#|php~|php_bak|save|swo|aspx?|tpl|sh|bash|bak?|cfg|cgi|dll|exe|git|hg|ini|jsp|log|mdb|out|sql|svn|swp|tar|rdf)$" {
    deny all;
}
```

#### Deny access to hidden files & directory

```nginx
location ~ /\.(?!well-known\/) {
    deny all;
}
```

### Blocking common attacks

#### base64 encoded url

```nginx
location ~* "(base64_encode)(.*)(\()" {
    deny all;
}
```

#### javascript eval() url

```nginx
location ~* "(eval\()" {
    deny all;
}
```

### robots.txt location

```nginx
location = /robots.txt {
# Some WordPress plugin gererate robots.txt file
# Refer #340 issue
    try_files $uri $uri/ /index.php?$args @robots;
    access_log off;
    log_not_found off;
}
location @robots {
    return 200 "User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n";
}
```

### Make a website not indexable

```nginx
add_header X-Robots-Tag "noindex";

location = /robots.txt {
  return 200 "User-agent: *\nDisallow: /\n";
}
```

### MP4 stream module

```nginx
location /videos {
    location ~ \.(mp4)$ {
        mp4;
        mp4_buffer_size       1m;
        mp4_max_buffer_size   5m;
        add_header Vary "Accept-Encoding";
        add_header "Access-Control-Allow-Origin" "*";
        add_header Cache-Control "public, no-transform";
        access_log off;
        log_not_found off;
        expires max;
    }
}
```

### WebP images

Mapping conditions to display WebP images

```nginx
# serve WebP images if web browser support WebP
map $http_accept $webp_suffix {
   default "";
   "~*webp" ".webp";
}
```

Set conditional try_files to server WebP image :

- if web browser support WebP
- if WebP alternative exist

```nginx


# webp rewrite rules for jpg and png images
# try to load alternative image.png.webp before image.png
location /wp-content/uploads {
    location ~ \.(png|jpe?g)$ {
        add_header Vary "Accept-Encoding";
        add_header "Access-Control-Allow-Origin" "*";
        add_header Cache-Control "public, no-transform";
        access_log off;
        log_not_found off;
        expires max;
        try_files $uri$webp_suffix $uri =404;
    }
}
```
