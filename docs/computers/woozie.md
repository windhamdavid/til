# Woozie 🦮

**23.02.04** - Documentation for the migration of [Woozer](woozer)

## Info 
173.230.130.234  
2600:3c02::f03c:93ff:fefc:319e  
Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-58-generic x86_64)

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

curl -s https://lv.linode.com/4635BE5B-C8E8-4CCE-AC83EC4E446411A1 | sudo bash

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

sudo apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo vi .zshrc
theme dpoggi

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

## Security 

```bash 
Linode Longview
curl -s https://lv.linode.com/464AB0EC-097A-4D7C-BC23DB5CAD79C43A | sudo bash
sudo systemctl status longview
sudo systemctl start longview

##################### IPTABLES ########################

#show iptables
sudo iptables -L -nv --line-numbers

# Allow all loopback (lo0) traffic and reject traffic
# to localhost that does not originate from lo0.
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT ! -i lo -s 127.0.0.0/8 -j REJECT

# Linode Longview / Loadbalancer
sudo iptables -A INPUT -s 96.126.119.66 -m state --state NEW -j ACCEPT
sudo iptables -A INPUT -s 192.168.255.0/24 -m state --state NEW -j ACCEPT

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

## reject all others
sudo iptables -A FORWARD -j REJECT
sudo iptables -A INPUT -j REJECT

## make it persistent
apt-get install iptables-persistent

## make sure it's running 
sudo systemctl is-enabled netfilter-persistent.service

sudo ls /etc/iptables
/etc/iptables/rules.v4
/etc/iptables/rules.v6

## Restore rules 
sudo /sbin/iptables-restore < /etc/iptables/rules.v4
sudo /sbin/iptables-restore < /etc/iptables/rules.v6

sudo iptables -L

Reboot to test iptables

```


## LAMP 

## Certbot

## Packages

## Monitor

## Tune / Audit


