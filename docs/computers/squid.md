# Squid 🦑

- Processor: Intel Xeon E-2356G 6 Cores
- RAM: 32GB DDR4 SDRAM
- HD1: 2 x 960 GB SSD Hardware Raid 1
- HD2: 1 x 1.92 TB SSD

## AlmaLinux 9

- Docs - https://wiki.almalinux.org/

### Hardening

- FIPS 140-3 security certification for its Linux distro
- AlmaLinux 9 OpenSCAP Guide - https://wiki.almalinux.org/documentation/openscap-guide-for-9.html
  - SCAP is a U.S. standard maintained by the National Institute of Standards and Technology
  - https://almalinux.org/blog/2023-11-28-cis-benchmarks-update/
  - DoD Guide - https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=unix-linux


### Users

- disable root login
- obscure ssh port


### Ports

#### FirewallD

```sh
# status
sudo systemctl status firewalld
# open port
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
# close port
sudo firewall-cmd --zone=public --remove-port=80/tcp --permanent
# reload
sudo firewall-cmd --reload
# list all ports
sudo netstat -tunlp

```


### Mail

- Mail
  - _Fail_ for un-routable email. 
  - _nobody_ user 