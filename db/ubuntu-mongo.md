
[Source](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)

# How to Install MongoDB on Ubuntu 16.04

### Introduction

MongoDB is a free and open-source NoSQL document database used commonly in modern web applications. This tutorial will help you set up MongoDB on your server for a production application environment.

As of publication time, the official Ubuntu 16.04 MongoDB packages have not yet been updated to use the new `systemd` init system [which is enabled by default on Ubuntu 16.04][1]. Running MongoDB using those packages on a clean Ubuntu 16.04 server involves following an additional step to configure MongoDB as a `systemd` service that will automatically start on boot.  

## Prerequisites

To follow this tutorial, you will need:

## Step 1 — Adding the MongoDB Repository

MongoDB is already included in Ubuntu package repositories, but the official MongoDB repository provides most up-to-date version and is the recommended way of installing the software. In this step, we will add this official repository to our server.

Ubuntu ensures the authenticity of software packages by verifying that they are signed with GPG keys, so we first have to import they key for the official MongoDB repository.
    
        * sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    

After successfully importing the key, you will see:

Output
    
    
    gpg: Total number processed: 1
    gpg:               imported: 1  (RSA: 1)
    

Next, we have to add the MongoDB repository details so `apt` will know where to download the packages from.

Issue the following command to create a list file for MongoDB.
    
        * echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    

After adding the repository details, we need to update the packages list.

## Step 2 — Installing and Verifying MongoDB

Now we can install the MongoDB package itself.
    
        * sudo apt-get install -y mongodb-org
    

This command will install several packages containing latest stable version of MongoDB along with helpful management tools for the MongoDB server. 

In order to properly launch MongoDB as a service on Ubuntu 16.04, we additionally need to create a unit file describing the service. A _unit file_ tells `systemd` how to manage a resource. The most common unit type is a _service_, which determines how to start or stop the service, when should it be automatically started at boot, and whether it is dependent on other software to run.

We'll create a unit file to manage the MongoDB service. Create a configuration file named `mongodb.service` in the `/etc/systemd/system` directory using `nano` or your favorite text editor.
    
        * sudo nano /etc/systemd/system/mongodb.service
    

Paste in the following contents, then save and close the file.

/etc/systemd/system/mongodb.service
    
    
    [Unit]
    Description=High-performance, schema-free document-oriented database
    After=network.target
    
    [Service]
    User=mongodb
    ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf
    
    [Install]
    WantedBy=multi-user.target
    

This file has a simple structure:

* The **Unit** section contains the overview (e.g. a human-readable description for MongoDB service) as well as dependencies that must be satisfied before the service is started. In our case, MongoDB depends on networking already being available, hence `network.target` here.
* The **Service** section how the service should be started. The `User` directive specifies that the server will be run under the `mongodb` user, and the `ExecStart` directive defines the startup command for MongoDB server.
* The last section, **Install**, tells `systemd` when the service should be automatically started. The `multi-user.target` is a standard system startup sequence, which means the server will be automatically started during boot. 

Next, start the newly created service with `systemctl`.
    
        * sudo systemctl start mongodb
    

While there is no output to this command, you can also use `systemctl` to check that the service has started properly.
    
        * sudo systemctl status mongodb
    

Output
    
    
    ● mongodb.service - High-performance, schema-free document-oriented database
       Loaded: loaded (/etc/systemd/system/mongodb.service; enabled; vendor preset: enabled)
       Active: active (running) since Mon 2016-04-25 14:57:20 EDT; 1min 30s ago
     Main PID: 4093 (mongod)
        Tasks: 16 (limit: 512)
       Memory: 47.1M
          CPU: 1.224s
       CGroup: /system.slice/mongodb.service
               └─4093 /usr/bin/mongod --quiet --config /etc/mongod.conf
    

The last step is to enable automatically starting MongoDB when the system starts.
    
        * sudo systemctl enable mongodb
    

The MongoDB server now configured and running, and you can manage the MongoDB service using the `systemctl` command (e.g. `sudo systemctl mongodb stop`, `sudo systemctl mongodb start`).

## Step 3 — Adjusting the Firewall (Optional)

Assuming you have followed the [initial server setup tutorial][2] instructions to enable the firewall on your server, MongoDB server will be inaccessible from the internet. 

If you intend to use the MongoDB server only locally with applications running on the same server, it is a recommended and secure setting. However, if you would like to be able to connect to your MongoDB server from the internet, we have to allow the incoming connections in `ufw`.

To allow access to MongoDB on its default port `27017` from everywhere, you could use `sudo ufw allow 27017`. However, enabling internet access to MongoDB server on a default installation gives unrestricted access to the whole database server.

in most cases, MongoDB should be accessed only from certain trusted locations, such as another server hosting an application. To accomplish this task, you can allow access on MongoDB's default port while specifying the IP address of another server that will be explicitly allowed to connect.
    
        * sudo ufw allow from your_other_server_ip/32 to any port 27017
    

You can verify the change in firewall settings with `ufw`.

You should see traffic to `27017` port allowed in the output.If you have decided to allow only a certain IP address to connect to MongoDB server, the IP address of the allowed location will be listed instead of _Anywhere_ in the output.

Output
    
    
    Status: active
    
    To                         Action      From
    --                         ------      ----
    27017                      ALLOW       Anywhere
    OpenSSH                    ALLOW       Anywhere
    27017 (v6)                 ALLOW       Anywhere (v6)
    OpenSSH (v6)               ALLOW       Anywhere (v6)
	 
	 

<hr>
<hr>

[Source](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/ "Permalink to Install MongoDB Community Edition on Ubuntu — MongoDB Manual 3.2")

# Install MongoDB Community Edition on Ubuntu — MongoDB Manual 3.2

## Overview[¶][1]

Use this tutorial to install MongoDB Community Edition on LTS Ubuntu Linux systems from `.deb` packages. While Ubuntu includes its own MongoDB packages, the official MongoDB Community Edition packages are generally more up-to-date.

Platform Support

MongoDB only provides packages for 64-bit LTS (long-term support) Ubuntu releases. For example, 12.04 LTS (precise), 14.04 LTS (trusty), 16.04 LTS (xenial), and so on. These packages may work with other Ubuntu releases, however, they are not supported.

## Packages[¶][2]

MongoDB provides officially supported packages in their own repository. This repository contains the following packages:

These packages conflict with the `mongodb`, `mongodb-server`, and `mongodb-clients` packages provided by Ubuntu.

The default `/etc/mongod.conf` configuration file supplied by the packages have `bind_ip` set to `127.0.0.1` by default. Modify this setting as needed for your environment before initializing a [replica set][3].

## Init Scripts[¶][4]

The `mongodb-org` package includes various [init scripts][5], including the init script `/etc/init.d/mongod`. You can use these scripts to stop, start, and restart daemon processes.

The package configures MongoDB using the `/etc/mongod.conf` file in conjunction with the init scripts. See the [Configuration File][6] reference for documentation of settings available in the configuration file.

There are no init scripts for `mongos. You can use the ``mongod`` init script to derive your own [`mongos`][7] init script for use in such environments. See the [`mongos`][7] reference for configuration details.

## Install MongoDB Community Edition[¶][8]

Note

To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0][9].

MongoDB only provides packages for 64-bit LTS (long-term support) Ubuntu releases. For example, 12.04 LTS (precise), 14.04 LTS (trusty), 16.04 LTS (xenial), and so on. These packages may work with other Ubuntu releases, however, they are not supported.

### Import the public key used by the package management system.[¶][10]

The Ubuntu package management tools (i.e. `dpkg` and `apt`) ensure package consistency and authenticity by requiring that distributors sign packages with GPG keys. Issue the following command to import the [MongoDB public GPG Key][11]:
    
    
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    

### Create a list file for MongoDB.[¶][12]

Create the `/etc/apt/sources.list.d/mongodb-org-3.2.list` list file using the command appropriate for your version of Ubuntu:

Ubuntu 12.04
    
    
    echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    

Ubuntu 14.04
    
    
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    

Ubuntu 16.04
    
    
    echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    

### Reload local package database.[¶][13]

Issue the following command to reload the local package database:

### Install the MongoDB packages.[¶][14]

You can install either the latest stable version of MongoDB or a specific version of MongoDB.

#### Install the latest stable version of MongoDB.[¶][15]

Issue the following command:
    
    
    sudo apt-get install -y mongodb-org
    

#### Install a specific release of MongoDB.[¶][16]

To install a specific release, you must specify each component package individually along with the version number, as in the following example:
    
    
    sudo apt-get install -y mongodb-org=3.2.13 mongodb-org-server=3.2.13 mongodb-org-shell=3.2.13 mongodb-org-mongos=3.2.13 mongodb-org-tools=3.2.13
    

If you only install `mongodb-org=3.2.13` and do not include the component packages, the latest version of each MongoDB package will be installed regardless of what version you specified.

#### Pin a specific version of MongoDB.[¶][17]

Although you can specify any available version of MongoDB, `apt-get` will upgrade the packages when a newer version becomes available. To prevent unintended upgrades, pin the package. To pin the version of MongoDB at the currently installed version, issue the following command sequence:
    
    
    echo "mongodb-org hold" | sudo dpkg --set-selections
    echo "mongodb-org-server hold" | sudo dpkg --set-selections
    echo "mongodb-org-shell hold" | sudo dpkg --set-selections
    echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
    echo "mongodb-org-tools hold" | sudo dpkg --set-selections
    

### (Ubuntu 16.04-only) Create systemd service file[¶][18]

Note

Follow this step ONLY if you are running Ubuntu 16.04.

Create a new file at /lib/systemd/system/mongod.service with the following contents:
    
    
    [Unit]
    Description=High-performance, schema-free document-oriented database
    After=network.target
    Documentation=https://docs.mongodb.org/manual
    
    [Service]
    User=mongodb
    Group=mongodb
    ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf
    
    [Install]
    WantedBy=multi-user.target
    

## Run MongoDB Community Edition[¶][19]

The MongoDB instance stores its data files in `/var/lib/mongodb` and its log files in `/var/log/mongodb` by default, and runs using the `mongodb` user account. You can specify alternate log and data file directories in `/etc/mongod.conf`. See [`systemLog.path`][20] and [`storage.dbPath`][21] for additional information.

If you change the user that runs the MongoDB process, you **must** modify the access control rights to the `/var/lib/mongodb` and `/var/log/mongodb` directories to give this user access to these directories.

### Start MongoDB.[¶][22]

Issue the following command to start [`mongod`][23]:
    
    
    sudo service mongod start
    

### Verify that MongoDB has started successfully[¶][24]

Verify that the [`mongod`][23] process has started successfully by checking the contents of the log file at `/var/log/mongodb/mongod.log` for a line reading
    
    
    [initandlisten] waiting for connections on port 
    

where `` is the port configured in `/etc/mongod.conf`, `27017` by default.

### Stop MongoDB.[¶][25]

As needed, you can stop the [`mongod`][23] process by issuing the following command:

### Restart MongoDB.[¶][26]

Issue the following command to restart [`mongod`][23]:
    
    
    sudo service mongod restart
    

### Begin using MongoDB.[¶][27]

To help you start using MongoDB, MongoDB provides [Getting Started Guides][28] in various driver editions. See [Getting Started][28] for the available editions.

Before deploying MongoDB in a production environment, consider the [Production Notes][29] document.

Later, to stop MongoDB, press `Control+C` in the terminal where the [`mongod`][23] instance is running.

## Uninstall MongoDB Community Edition[¶][30]

To completely remove MongoDB from a system, you must remove the MongoDB applications themselves, the configuration files, and any directories containing data and logs. The following section guides you through the necessary steps.

Warning

This process will _completely_ remove MongoDB, its configuration, and _all_ databases. This process is not reversible, so ensure that all of your configuration and data is backed up before proceeding.

### Stop MongoDB.[¶][31]

Stop the [`mongod`][23] process by issuing the following command:

### Remove Packages.[¶][32]

Remove any MongoDB packages that you had previously installed.
    
    
    sudo apt-get purge mongodb-org*
    

### Remove Data Directories.[¶][33]

Remove MongoDB databases and log files.
    
    
    sudo rm -r /var/log/mongodb
    sudo rm -r /var/lib/mongodb