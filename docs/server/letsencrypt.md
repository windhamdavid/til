# Certbot
### LetsEncrypt Certbot TLS-SNI-01 deprecated
January 2019 -
Your Let’s Encrypt client used ACME TLS-SNI-01 domain validation to issue a certificate in the past 60 days. TLS-SNI-01 validation is reaching end-of-life and will stop working on **February 13th, 2019.**

Need to recertify the unauthorized domains validated with the earlier protocal:

```
sudo certbot certonly --cert-name domain.com
// for domains validated with TLS-SNI-01
sudo certbot renew --dry-run
// should produce NO errors
```

## Secure Apache with Let's Encrypt on Ubuntu 16.04
[Source](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-16-04 "Permalink to How To Secure Apache with Let's Encrypt on Ubuntu 16.04")

### Introduction

This tutorial will show you how to set up a TLS/SSL certificate from [Let's Encrypt][1] on an Ubuntu 16.04 server running Apache as a web server. We will also cover how to automate the certificate renewal process.

SSL certificates are used within web servers to encrypt the traffic between the server and client, providing extra security for users accessing your application. Let's Encrypt provides an easy way to obtain and install trusted certificates for free.

## Prerequisites

In order to complete this guide, you will need:

* An Ubuntu 16.04 server with a non-root sudo-enabled user, which you can set up by following our [Initial Server Setup][2] guide
* The Apache web server installed with [one or more domain names][3] properly configured through Virtual Hosts that specify `ServerName`.

When you are ready to move on, log into your server using your sudo-enabled account.

## Step 1 — Install the Let's Encrypt Client

Let's Encrypt certificates are fetched via client software running on your server. The official client is called Certbot, and its developers maintain their own Ubuntu software repository with up-to-date versions. Because Certbot is in such active development it's worth using this repository to install a newer version than Ubuntu provides by default.

First, add the repository:

        * sudo add-apt-repository ppa:certbot/certbot


You'll need to press `ENTER` to accept. Afterwards, update the package list to pick up the new repository's package information:

And finally, install Certbot from the new repository with `apt-get`:

        * sudo apt-get install python-certbot-apache


The `certbot` Let's Encrypt client is now ready to use.

## Step 2 — Set Up the SSL Certificate

Generating the SSL certificate for Apache using Certbot is quite straightforward. The client will automatically obtain and install a new SSL certificate that is valid for the domains provided as parameters.

To execute the interactive installation and obtain a certificate that covers only a single domain, run the `certbot` command like so, where example.com is your domain:

        * sudo certbot --apache -d example.com


If you want to install a single certificate that is valid for multiple domains or subdomains, you can pass them as additional parameters to the command. The first domain name in the list of parameters will be the **base** domain used by Let's Encrypt to create the certificate, and for that reason we recommend that you pass the bare top-level domain name as first in the list, followed by any additional subdomains or aliases:

        * sudo certbot --apache -d example.com -d www.example.com


For this example, the **base** domain will be `example.com`.

After the dependencies are installed, you will be presented with a step-by-step guide to customize your certificate options. You will be asked to provide an email address for lost key recovery and notices, and you will be able to choose between enabling both `http` and `https` access or forcing all requests to redirect to `https`. It is usually safest to require `https`, unless you have a specific need for unencrypted `http` traffic.

When the installation is finished, you should be able to find the generated certificate files at `/etc/letsencrypt/live`. You can verify the status of your SSL certificate with the following link (don't forget to replace example.com with your **base** domain):


    https://www.ssllabs.com/ssltest/analyze.html?d=example.com&latest


You should now be able to access your website using a `https` prefix.

## Step 3 — Set Up Auto Renewal

Let's Encrypt's certificates are only valid for ninety days. This is to encourage users to automate their certificate renewal process. We'll need to set up a regularly run command to check for expiring certificates and renew them automatically.

To run the renewal check daily, we will use `cron`, a standard system service for running periodic jobs. We tell `cron` what to do by opening and editing a file called a `crontab`.

Your text editor will open the default crontab which is a text file with some help text in it. Paste in the following line at the end of the file, then save and close it:

crontab


    . . .
    15 3 * * * /usr/bin/certbot renew --quiet


The `15 3 * * *` part of this line means "run the following command at 3:15 am, every day". You may choose any time.

The `renew` command for Certbot will check all certificates installed on the system and update any that are set to expire in less than thirty days. `\--quiet` tells Certbot not to output information nor wait for user input.

`cron` will now run this command daily. Because we installed our certificates using the `\--apache` plugin, Apache will also be reloaded to ensure the new certificates are used.






# How To Secure Nginx with Let's Encrypt on Ubuntu 16.04
[Source](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04 "Permalink to How To Secure Nginx with Let's Encrypt on Ubuntu 16.04")

### Introduction

Let's Encrypt is a new Certificate Authority (CA) that provides an easy way to obtain and install free TLS/SSL certificates, thereby enabling encrypted HTTPS on web servers. It simplifies the process by providing a software client, `certbot`, that attempts to automate most (if not all) of the required steps. Currently, the entire process of obtaining and installing a certificate is fully automated only on Apache web servers. However, Let's Encrypt can be used to easily obtain a free SSL certificate, which can be installed manually, regardless of your choice of web server software.

In this tutorial, we will show you how to use Certbot to obtain a free SSL certificate and use it with Nginx on Ubuntu 16.04. We will also show you how to automatically renew your SSL certificate. If you're running a different web server, simply follow your web server's documentation to learn how to use the certificate with your setup.

![Nginx with Let's Encrypt TLS/SSL Certificate and Auto-renewal][1]

## Prerequisites

Before following this tutorial, you'll need a few things.

You should have an Ubuntu 16.04 server with a non-root user who has `sudo` privileges. You can learn how to set up such a user account by following our [initial server setup for Ubuntu 16.04 tutorial][2].

You must own or control the registered domain name that you wish to use the certificate with. If you do not already have a registered domain name, you may register one with one of the many domain name registrars out there (e.g. Namecheap, GoDaddy, etc.).

If you haven't already, be sure to create an **A Record** that points your domain to the public IP address of your server. This is required because of how Let's Encrypt validates that you own the domain it is issuing a certificate for. For example, if you want to obtain a certificate for `example.com`, that domain must resolve to your server for the validation process to work. Our setup will use `example.com` and `www.example.com` as the domain names, so **both DNS records are required**.

Once you have all of the prerequisites out of the way, let's move on to installing Certbot, the Let's Encrypt client software.

## Step 1: Install Certbot

The first step to using Let's Encrypt to obtain an SSL certificate is to install the `certbot` software on your server. The Certbot developers maintain their own Ubuntu software repository with up-to-date versions of the software. Because Certbot is in such active development it's worth using this repository to install a newer Certbot than provided by Ubuntu.

First, add the repository:

        * sudo add-apt-repository ppa:certbot/certbot


You'll need to press `ENTER` to accept. Afterwards, update the package list to pick up the new repository's package information:

And finally, install Certbot with `apt-get`:

        * sudo apt-get install certbot


The `certbot` Let's Encrypt client is now ready to use.

## Step 2: Obtain an SSL Certificate

Certbot provides a variety of ways to obtain SSL certificates, through various plugins. Unlike the Apache plugin, which is covered in [a different tutorial][3], most of the plugins will only help you with obtaining a certificate which you must manually configure your web server to use. Plugins that only obtain certificates, and don't install them, are referred to as "authenticators" because they are used to authenticate whether a server should be issued a certificate.

We'll show you how to use the **Webroot** plugin to obtain an SSL certificate.

### How To Use the Webroot Plugin

The Webroot plugin works by placing a special file in the `/.well-known` directory within your document root, which can be opened (through your web server) by the Let's Encrypt service for validation. Depending on your configuration, you may need to explicitly allow access to the `/.well-known` directory.

If you haven't installed Nginx yet, do so by following [this tutorial][4]. Continue below when you are finished.

To ensure that the directory is accessible to Let's Encrypt for validation, let's make a quick change to our Nginx configuration. By default, it's located at `/etc/nginx/sites-available/default`. We'll use `nano` to edit it:

        * sudo nano /etc/nginx/sites-available/default


Inside the server block, add this location block:

Add to SSL server block


            location ~ /.well-known {
                    allow all;
            }


You will also want look up what your document root is set to by searching for the `root` directive, as the path is required to use the Webroot plugin. If you're using the default configuration file, the root will be `/var/www/html`.

Save and exit.

Check your configuration for syntax errors:

If no errors are found, restart Nginx with this command:

        * sudo systemctl restart nginx


Now that we know our `webroot-path`, we can use the Webroot plugin to request an SSL certificate with these commands. Here, we are also specifying our domain names with the `-d` option. If you want a single cert to work with multiple domain names (e.g. `example.com` and `www.example.com`), be sure to include all of them. Also, make sure that you replace the highlighted parts with the appropriate webroot path and domain name(s):

        * sudo certbot certonly --webroot --webroot-path=/var/www/html -d example.com -d www.example.com


If this is your first time running `certbot`, you will be prompted to enter an email address and agree to the terms of service. After doing so, you should see a message telling you the process was successful and where your certificates are stored:


    Output

    IMPORTANT NOTES:
     - Congratulations! Your certificate and chain have been saved at
       /etc/letsencrypt/live/example.com/fullchain.pem. Your cert
       will expire on 2017-07-26. To obtain a new or tweaked version of
       this certificate in the future, simply run certbot again. To
       non-interactively renew *all* of your certificates, run "certbot
       renew"
     - If you lose your account credentials, you can recover through
       e-mails sent to sammy@example.com.
     - Your account credentials have been saved in your Certbot
       configuration directory at /etc/letsencrypt. You should make a
       secure backup of this folder now. This configuration directory will
       also contain certificates and private keys obtained by Certbot so
       making regular backups of this folder is ideal.
     - If you like Certbot, please consider supporting our work by:

       Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
       Donating to EFF:                    https://eff.org/donate-le


You will want to note the path and expiration date of your certificate, highlighted in the example above.

**Firewall Note:** If you receive an error like `Failed to connect to host for DVSNI challenge`, your server's firewall may need to be configured to allow TCP traffic on port `80` and `443`.

**Note:** If your domain is routing through a DNS service like CloudFlare, you will need to temporarily disable it until you have obtained the certificate.  

### Certificate Files

After obtaining the cert, you will have the following PEM-encoded files:

* **cert.pem:** Your domain's certificate
* **chain.pem:** The Let's Encrypt chain certificate
* **fullchain.pem:** `cert.pem` and `chain.pem` combined
* **privkey.pem:** Your certificate's private key

It's important that you are aware of the location of the certificate files that were just created, so you can use them in your web server configuration. The files themselves are placed in a subdirectory in `/etc/letsencrypt/archive`. However, Certbot creates symbolic links to the most recent certificate files in the `/etc/letsencrypt/live/your_domain_name` directory. Because the links will always point to the most recent certificate files, this is the path that you should use to refer to your certificate files.

You can check that the files exist by running this command (substituting in your domain name):

        * sudo ls -l /etc/letsencrypt/live/your_domain_name


The output should be the four previously mentioned certificate files. In a moment, you will configure your web server to use `fullchain.pem` as the certificate file, and `privkey.pem` as the certificate key file.

### Generate Strong Diffie-Hellman Group

To further increase security, you should also generate a strong Diffie-Hellman group. To generate a 2048-bit group, use this command:

        * sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048


This may take a few minutes but when it's done you will have a strong DH group at `/etc/ssl/certs/dhparam.pem`.

## Step 3: Configure TLS/SSL on Web Server (Nginx)

Now that you have an SSL certificate, you need to configure your Nginx web server to use it.

We will make a few adjustments to our configuration:

1. We will create a configuration snippet containing our SSL key and certificate file locations.
2. We will create a configuration snippet containing strong SSL settings that can be used with any certificates in the future.
3. We will adjust the Nginx server blocks to handle SSL requests and use the two snippets above.

This method of configuring Nginx will allow us to keep clean server blocks and put common configuration segments into reusable modules.

### Create a Configuration Snippet Pointing to the SSL Key and Certificate

First, let's create a new Nginx configuration snippet in the `/etc/nginx/snippets` directory.

To properly distinguish the purpose of this file, we will name it `ssl-` followed by our domain name, followed by `.conf` on the end:

        * sudo nano /etc/nginx/snippets/ssl-example.com.conf


Within this file, we just need to set the `ssl_certificate` directive to our certificate file and the `ssl_certificate_key` to the associated key. In our case, this will look like this:

/etc/nginx/snippets/ssl-example.com.conf


    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;


When you've added those lines, save and close the file.

### Create a Configuration Snippet with Strong Encryption Settings

Next, we will create another snippet that will define some SSL settings. This will set Nginx up with a strong SSL cipher suite and enable some advanced features that will help keep our server secure.

The parameters we will set can be reused in future Nginx configurations, so we will give the file a generic name:

        * sudo nano /etc/nginx/snippets/ssl-params.conf


To set up Nginx SSL securely, we will be using the recommendations by [Remy van Elst][5] on the [Cipherli.st][6] site. This site is designed to provide easy-to-consume encryption settings for popular software. You can read more about his decisions regarding the Nginx choices [here][7].

**Note:** The default suggested settings on [Cipherli.st][6] offer strong security. Sometimes, this comes at the cost of greater client compatibility. If you need to support older clients, there is an alternative list that can be accessed by clicking the link on the link labeled "Yes, give me a ciphersuite that works with legacy / old software."

The compatibility list can be used instead of the default suggestions in the configuration below. The choice of which config you use will depend largely on what you need to support.

For our purposes, we can copy the provided settings in their entirety. We just need to make a few small modifications.

First, we will add our preferred DNS resolver for upstream requests. We will use Google's for this guide. We will also go ahead and set the `ssl_dhparam` setting to point to the Diffie-Hellman file we generated earlier.

Finally, you should take take a moment to read up on [HTTP Strict Transport Security, or HSTS][8]. HSTS provides increased security, but can have far reaching consequences if accidentally enabled or enabled incorrectly. In this guide, we will disable the header by default, but you can modify that if you are sure you understand the implications:

/etc/nginx/snippets/ssl-params.conf


    # from https://cipherli.st/
    # and https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
    ssl_ecdh_curve secp384r1;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
    # disable HSTS header for now
    #add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;

    ssl_dhparam /etc/ssl/certs/dhparam.pem;


Save and close the file when you are finished.

### Adjust the Nginx Configuration to Use SSL

Now that we have our snippets, we can adjust our Nginx configuration to enable SSL.

We will assume in this guide that you are using the `default` server block file in the `/etc/nginx/sites-available` directory. If you are using a different server block file, substitute it's name in the below commands.

Before we go any further, let's back up our current server block file:

        * sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak


Now, open the server block file to make adjustments:

        * sudo nano /etc/nginx/sites-available/default


Inside, your server block probably begins like this:

/etc/nginx/sites-available/default


    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        # SSL configuration

        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;

        . . .


We will be modifying this configuration so that unencrypted HTTP requests are automatically redirected to encrypted HTTPS. This offers the best security for our sites. If you want to allow both HTTP and HTTPS traffic, use the alternative configuration that follows.

We will be splitting the configuration into two separate blocks. After the two first `listen` directives, we will add a `server_name` directive, set to your server's domain name. We will then set up a redirect to the second server block we will be creating. Afterwards, we will close this short block:

/etc/nginx/sites-available/default


    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name example.com www.example.com;
        return 301 https://$server_name$request_uri;
    }

        # SSL configuration

        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;

        . . .


Next, we need to start a new server block directly below to contain the remaining configuration. We can uncomment the two `listen` directives that use port 443. We can add `http2` to these lines in order to enable HTTP/2 within this block. Afterwards, we just need to include the two snippet files we set up:

**Note:** You may only have **one** `listen` directive that includes the `default_server` modifier for each IP version and port combination. If you have other server blocks enabled for these ports that have `default_server` set, you must remove the modifier from one of the blocks.  

/etc/nginx/sites-available/default


    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name example.com www.example.com;
        return 301 https://$server_name$request_uri;
    }

    server {

        # SSL configuration

        listen 443 ssl http2 default_server;
        listen [::]:443 ssl http2 default_server;
        include snippets/ssl-example.com.conf;
        include snippets/ssl-params.conf;

        . . .


Save and close the file when you are finished.

### (Alternative Configuration) Allow Both HTTP and HTTPS Traffic

If you want or need to allow both encrypted and unencrypted content, you will have to configure Nginx a bit differently. This is generally not recommended if it can be avoided, but in some situations it may be necessary. Basically, we just compress the two separate server blocks into one block and remove the redirect:

/etc/nginx/sites-available/default


    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        listen 443 ssl http2 default_server;
        listen [::]:443 ssl http2 default_server;

        server_name example.com www.example.com;
        include snippets/ssl-example.com.conf;
        include snippets/ssl-params.conf;

        . . .


Save and close the file when you are finished.

## Step 4: Adjust the Firewall

If you have the `ufw` firewall enabled, as recommended by the prerequisite guides, you'll need to adjust the settings to allow for SSL traffic. Luckily, Nginx registers a few profiles with `ufw` upon installation.

You can see the current setting by typing:

It will probably look like this, meaning that only HTTP traffic is allowed to the web server:


    Output

    Status: active

    To                         Action      From
    --                         ------      ----
    OpenSSH                    ALLOW       Anywhere
    Nginx HTTP                 ALLOW       Anywhere
    OpenSSH (v6)               ALLOW       Anywhere (v6)
    Nginx HTTP (v6)            ALLOW       Anywhere (v6)


To additionally let in HTTPS traffic, we can allow the "Nginx Full" profile and then delete the redundant "Nginx HTTP" profile allowance:

        * sudo ufw allow 'Nginx Full'

    * sudo ufw delete allow 'Nginx HTTP'


Your status should look like this now:


    Output

    Status: active

    To                         Action      From
    --                         ------      ----
    OpenSSH                    ALLOW       Anywhere
    Nginx Full                 ALLOW       Anywhere
    OpenSSH (v6)               ALLOW       Anywhere (v6)
    Nginx Full (v6)            ALLOW       Anywhere (v6)


## Step 5: Enabling the Changes in Nginx

Now that we've made our changes and adjusted our firewall, we can restart Nginx to implement our new changes.

First, we should check to make sure that there are no syntax errors in our files. We can do this by typing:

If everything is successful, you will get a result that looks like this:


    Output

    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful


If your output matches the above, your configuration file has no syntax errors. We can safely restart Nginx to implement our changes:

        * sudo systemctl restart nginx


The Let's Encrypt TLS/SSL certificate is now in place and the firewall now allows traffic to port 80 and 443. At this point, you should test that the TLS/SSL certificate works by visiting your domain via HTTPS in a web browser.

You can use the Qualys SSL Labs Report to see how your server configuration scores:


    In a web browser:

    https://www.ssllabs.com/ssltest/analyze.html?d=example.com


This SSL setup should report an **A+** rating.

## Step 6: Set Up Auto Renewal

Let's Encrypt's certificates are only valid for ninety days. This is to encourage users to automate their certificate renewal process. We'll need to set up a regularly run command to check for expiring certificates and renew them automatically.

To run the renewal check daily, we will use `cron`, a standard system service for running periodic jobs. We tell `cron` what to do by opening and editing a file called a `crontab`.

Your text editor will open the default crontab which is a text file with some help text in it. Paste in the following line at the end of the file, then save and close it:

crontab


    . . .
    15 3 * * * /usr/bin/certbot renew --quiet --renew-hook "/bin/systemctl reload nginx"


The `15 3 * * *` part of this line means "run the following command at 3:15 am, every day". You may choose any time.

The `renew` command for Certbot will check all certificates installed on the system and update any that are set to expire in less than thirty days. `\--quiet` tells Certbot not to output information nor wait for user input. `\--renew-hook "/bin/systemctl reload nginx"` will reload Nginx to pick up the new certificate files, but only if a renewal has actually happened.

`cron` will now run this command daily. All installed certificates will be automatically renewed and reloaded when they have thirty days or less before they expire.
