

- [https://cisofy.com/lynis/](https://cisofy.com/lynis/)
- [https://github.com/CISOfy/Lynis](https://github.com/CISOfy/Lynis)


```
$ git clone https://github.com/CISOfy/lynis
$ cd lynis
$ ./lynis lynis audit system -Q
```

```sh
david@woozer:~/scripts/lynis(master○) » ./lynis audit system

[ Lynis 3.0.0 ]

################################################################################
  Lynis comes with ABSOLUTELY NO WARRANTY. This is free software, and you are
  welcome to redistribute it under the terms of the GNU General Public License.
  See the LICENSE file for details about using this software.

  2007-2019, CISOfy - https://cisofy.com/lynis/
  Enterprise support available (compliance, plugins, interface and tools)
################################################################################


[+] Initializing program
------------------------------------

  ###################################################################
  #                                                                 #
  #   NON-PRIVILEGED SCAN MODE                                      #
  #                                                                 #
  ###################################################################

  NOTES:
  --------------
  * Some tests will be skipped (as they require root permissions)
  * Some tests might fail silently or give different results

  - Detecting OS...                                           [ DONE ]
  - Checking profiles...                                      [ DONE ]

  ---------------------------------------------------
  Program version:           3.0.0
  Operating system:          Linux
  Operating system name:     Ubuntu
  Operating system version:  18.04
  Kernel version:            5.4.10
  Hardware platform:         x86_64
  Hostname:                  woozer
  ---------------------------------------------------
  Profiles:                  /home/david/scripts/lynis/default.prf
  Log file:                  /tmp/lynis.log
  Report file:               /tmp/lynis-report.dat
  Report version:            1.0
  Plugin directory:          ./plugins
  ---------------------------------------------------
  Auditor:                   [Not Specified]
  Language:                  en
  Test category:             all
  Test group:                all
  ---------------------------------------------------
  - Program update status...                                  [ NO UPDATE ]

[+] System Tools
------------------------------------
  - Scanning available tools...
  - Checking system binaries...

[+] Plugins (phase 1)
------------------------------------
 Note: plugins have more extensive tests and may take several minutes to complete

  - Plugin: pam
    [..]
  - Plugin: systemd
    [................]

[+] Boot and services
------------------------------------
  - Service Manager                                           [ systemd ]
    - Boot loader                                             [ NONE FOUND ]
  - Check running services (systemctl)                        [ DONE ]
        Result: found 24 running services
  - Check enabled services at boot (systemctl)                [ DONE ]
        Result: found 35 enabled services
  - Check startup files (permissions)                         [ OK ]

[+] Kernel
------------------------------------
  - Checking default run level                                [ RUNLEVEL 5 ]
  - Checking CPU support (NX/PAE)
    CPU support: PAE and/or NoeXecute supported               [ FOUND ]
  - Checking kernel version and release                       [ DONE ]
  - Checking kernel type                                      [ DONE ]
  - Checking loaded kernel modules                            [ DONE ]
  - Checking Linux kernel configuration file                  [ FOUND ]
  - Checking for available kernel update                      [ UNKNOWN ]
  - Checking core dumps configuration
    - configuration in systemd conf files                     [ DEFAULT ]
    - configuration in etc/profile                            [ DEFAULT ]
    - 'hard' configuration in security/limits.conf            [ DEFAULT ]
    - 'soft' configuration in security/limits.conf            [ DEFAULT ]
    - Checking setuid core dumps configuration                [ DISABLED ]
  - Check if reboot is needed                                 [ UNKNOWN ]

[+] Memory and Processes
------------------------------------
  - Checking /proc/meminfo                                    [ FOUND ]
  - Searching for dead/zombie processes                       [ NOT FOUND ]
  - Searching for IO waiting processes                        [ NOT FOUND ]
  - Search prelink tooling                                    [ NOT FOUND ]

[+] Users, Groups and Authentication
------------------------------------
  - Administrator accounts                                    [ OK ]
  - Unique UIDs                                               [ OK ]
  - Unique group IDs                                          [ OK ]
  - Unique group names                                        [ OK ]
  - Password file consistency                                 [ SUGGESTION ]
  - Query system users (non daemons)                          [ DONE ]
  - NIS+ authentication support                               [ NOT ENABLED ]
  - NIS authentication support                                [ NOT ENABLED ]
  - Sudoers file(s)                                           [ FOUND ]
  - PAM password strength tools                               [ SUGGESTION ]
  - PAM configuration files (pam.conf)                        [ FOUND ]
  - PAM configuration files (pam.d)                           [ FOUND ]
  - PAM modules                                               [ FOUND ]
  - LDAP module in PAM                                        [ NOT FOUND ]
  - Accounts without expire date                              [ OK ]
  - Accounts without password                                 [ OK ]
  - Checking user password aging (minimum)                    [ DISABLED ]
  - User password aging (maximum)                             [ DISABLED ]
  - Checking Linux single user mode authentication            [ OK ]
  - Determining default umask
    - umask (/etc/profile)                                    [ NOT FOUND ]
    - umask (/etc/login.defs)                                 [ SUGGESTION ]
  - LDAP authentication support                               [ NOT ENABLED ]
  - Logging failed login attempts                             [ ENABLED ]

[+] Shells
------------------------------------
  - Checking shells from /etc/shells
    Result: found 8 shells (valid shells: 8).
    - Session timeout settings/tools                          [ NONE ]
  - Checking default umask values
    - Checking default umask in /etc/bash.bashrc              [ NONE ]
    - Checking default umask in /etc/profile                  [ NONE ]

[+] File systems
------------------------------------
  - Checking mount points
    - Checking /home mount point                              [ SUGGESTION ]
    - Checking /tmp mount point                               [ SUGGESTION ]
    - Checking /var mount point                               [ SUGGESTION ]
  - Query swap partitions (fstab)                             [ OK ]
  - Testing swap partitions                                   [ OK ]
  - Testing /proc mount (hidepid)                             [ SUGGESTION ]
  - Checking for old files in /tmp                            [ OK ]
  - Checking /tmp sticky bit                                  [ OK ]
  - Checking /var/tmp sticky bit                              [ OK ]
  - Mount options of /                                        [ NON DEFAULT ]
  - Checking Locate database                                  [ FOUND ]
  - Disable kernel support of some filesystems

[+] USB Devices
------------------------------------
  - Checking usb-storage driver (modprobe config)             [ NOT DISABLED ]
  - Checking USB devices authorization                        [ DISABLED ]
  - Checking USBGuard                                         [ NOT FOUND ]

[+] Storage
------------------------------------
  - Checking firewire ohci driver (modprobe config)           [ DISABLED ]

[+] NFS
------------------------------------
  - Check running NFS daemon                                  [ NOT FOUND ]

[+] Name services
------------------------------------
  - Checking default DNS search domain                        [ FOUND ]
  - Checking search domains                                   [ FOUND ]
  - Checking /etc/resolv.conf options                         [ FOUND ]
  - Searching DNS domain name                                 [ FOUND ]
      Domain name: members.linode.com
  - Checking /etc/hosts
    - Duplicate entries in hosts file                         [ NONE ]
    - Presence of configured hostname in /etc/hosts           [ FOUND ]
    - Hostname mapped to localhost                            [ NOT FOUND ]
    - Localhost mapping to IP address                         [ OK ]

[+] Ports and packages
------------------------------------
  - Searching package managers
    - Searching dpkg package manager                          [ FOUND ]
      - Querying package manager
    - Query unpurged packages                                 [ FOUND ]
  - Checking security repository in sources.list file         [ OK ]
  - Checking upgradeable packages                             [ SKIPPED ]
  - Checking package audit tool                               [ NONE ]

=================================================================

  Exception found!

  Function/test:  [KRNL-5840:1]
  Message:        Could not find any kernel packages via package manager

  Help improving the Lynis community with your feedback!

  Steps:
  - Ensure you are running the latest version (./lynis update check)
  - If so, create a GitHub issue at https://github.com/CISOfy/lynis
  - Include relevant parts of the log file or configuration file

  Thanks!

=================================================================

  - Toolkit for automatic upgrades (unattended-upgrade)       [ FOUND ]

[+] Networking
------------------------------------
  - Checking IPv6 configuration                               [ ENABLED ]
      Configuration method                                    [ AUTO ]
      IPv6 only                                               [ NO ]
  - Checking configured nameservers
    - Testing nameservers
        Nameserver: 173.230.129.5                             [ OK ]
        Nameserver: 173.230.136.5                             [ OK ]
        Nameserver: 173.230.140.5                             [ OK ]
        Nameserver: 66.228.59.5                               [ OK ]
        Nameserver: 66.228.62.5                               [ OK ]
        Nameserver: 50.116.35.5                               [ OK ]
        Nameserver: 50.116.41.5                               [ OK ]
        Nameserver: 23.239.18.5                               [ OK ]
        Nameserver: 75.127.97.6                               [ OK ]
        Nameserver: 75.127.97.7                               [ OK ]
    - Minimal of 2 responsive nameservers                     [ OK ]
  - Checking default gateway                                  [ DONE ]
  - Getting listening ports (TCP/UDP)                         [ DONE ]
  - Checking promiscuous interfaces                           [ OK ]
  - Checking waiting connections                              [ OK ]
  - Checking status DHCP client                               [ NOT ACTIVE ]
  - Checking for ARP monitoring software                      [ NOT FOUND ]
  - Uncommon network protocols                                [ NOT FOUND ]

[+] Printers and Spools
------------------------------------
  - Checking cups daemon                                      [ NOT FOUND ]
  - Checking lp daemon                                        [ NOT RUNNING ]

[+] Software: e-mail and messaging
------------------------------------

[+] Software: firewalls
------------------------------------
  - Checking iptables support                                 [ FOUND ]
  - Checking host based firewall                              [ ACTIVE ]

[+] Software: webserver
------------------------------------
  - Checking Apache (binary /usr/sbin/apache2)                [ FOUND ]
      Info: Configuration file found (/etc/apache2/apache2.conf)
      Info: Found 157 virtual hosts
    * Loadable modules                                        [ FOUND (114) ]
        - Found 114 loadable modules
          mod_evasive: anti-DoS/brute force                   [ NOT FOUND ]
          mod_reqtimeout/mod_qos                              [ FOUND ]
          ModSecurity: web application firewall               [ NOT FOUND ]
  - Checking nginx                                            [ FOUND ]
    - Searching nginx configuration file                      [ FOUND ]
      - Found nginx includes                                  [ 2 FOUND ]
    - Parsing configuration options
        - /etc/nginx/nginx.conf
ls: cannot access '/etc/nginx//etc/nginx/conf.d/*.conf': No such file or directory
        - /etc/nginx/sites-enabled/default
      - SSL configured                                        [ NO ]
      - Checking log file configuration
        - Missing log files (access_log)                      [ NO ]
        - Disabled access logging                             [ NO ]
        - Missing log files (error_log)                       [ NO ]
        - Debugging mode on error_log                         [ NO ]

[+] SSH Support
------------------------------------
  - Checking running SSH daemon                               [ FOUND ]
    - Searching SSH configuration                             [ FOUND ]
    - OpenSSH option: AllowTcpForwarding                      [ SUGGESTION ]
    - OpenSSH option: ClientAliveCountMax                     [ SUGGESTION ]
    - OpenSSH option: ClientAliveInterval                     [ OK ]
    - OpenSSH option: Compression                             [ SUGGESTION ]
    - OpenSSH option: FingerprintHash                         [ OK ]
    - OpenSSH option: GatewayPorts                            [ OK ]
    - OpenSSH option: IgnoreRhosts                            [ OK ]
    - OpenSSH option: LoginGraceTime                          [ OK ]
    - OpenSSH option: LogLevel                                [ SUGGESTION ]
    - OpenSSH option: MaxAuthTries                            [ SUGGESTION ]
    - OpenSSH option: MaxSessions                             [ SUGGESTION ]
    - OpenSSH option: PermitRootLogin                         [ OK ]
    - OpenSSH option: PermitUserEnvironment                   [ OK ]
    - OpenSSH option: PermitTunnel                            [ OK ]
    - OpenSSH option: Port                                    [ OK ]
    - OpenSSH option: PrintLastLog                            [ OK ]
    - OpenSSH option: StrictModes                             [ OK ]
    - OpenSSH option: TCPKeepAlive                            [ SUGGESTION ]
    - OpenSSH option: UseDNS                                  [ OK ]
    - OpenSSH option: VerifyReverseMapping                    [ NOT FOUND ]
    - OpenSSH option: X11Forwarding                           [ SUGGESTION ]
    - OpenSSH option: AllowAgentForwarding                    [ SUGGESTION ]
    - OpenSSH option: AllowUsers                              [ NOT FOUND ]
    - OpenSSH option: AllowGroups                             [ NOT FOUND ]

[+] SNMP Support
------------------------------------
  - Checking running SNMP daemon                              [ NOT FOUND ]

[+] Databases
------------------------------------
  - MySQL process status                                      [ FOUND ]
  - Redis (server) status                                     [ FOUND ]

=================================================================

  Exception found!

  Function/test:  [DBS-1882]
  Message:        Found Redis, but no configuration file. Report this if you know where it is located on your system.

  Help improving the Lynis community with your feedback!

  Steps:
  - Ensure you are running the latest version (./lynis update check)
  - If so, create a GitHub issue at https://github.com/CISOfy/lynis
  - Include relevant parts of the log file or configuration file

  Thanks!

=================================================================


[+] LDAP Services
------------------------------------
  - Checking OpenLDAP instance                                [ NOT FOUND ]

[+] PHP
------------------------------------
  - Checking PHP                                              [ FOUND ]
    - Checking PHP disabled functions                         [ FOUND ]
    - Checking expose_php option                              [ ON ]
    - Checking enable_dl option                               [ OFF ]
    - Checking allow_url_fopen option                         [ ON ]
    - Checking allow_url_include option                       [ OFF ]

[+] Squid Support
------------------------------------
  - Checking running Squid daemon                             [ NOT FOUND ]

[+] Logging and files
------------------------------------
  - Checking for a running log daemon                         [ OK ]
    - Checking Syslog-NG status                               [ NOT FOUND ]
    - Checking systemd journal status                         [ FOUND ]
    - Checking Metalog status                                 [ NOT FOUND ]
    - Checking RSyslog status                                 [ FOUND ]
    - Checking RFC 3195 daemon status                         [ NOT FOUND ]
    - Checking minilogd instances                             [ NOT FOUND ]
  - Checking logrotate presence                               [ OK ]
  - Checking remote logging                                   [ NOT ENABLED ]
  - Checking log directories (static list)                    [ DONE ]
  - Checking open log files                                   [ DONE ]
  - Checking deleted files in use                             [ FILES FOUND ]

[+] Insecure services
------------------------------------
  - Installed inetd package                                   [ NOT FOUND ]
  - Installed xinetd package                                  [ OK ]
    - xinetd status                                           [ NOT ACTIVE ]
  - Installed rsh client package                              [ OK ]
  - Installed rsh server package                              [ OK ]
  - Installed telnet client package                           [ OK ]
  - Installed telnet server package                           [ NOT FOUND ]
  - Checking NIS client installation                          [ OK ]
  - Checking NIS server installation                          [ OK ]
  - Checking TFTP client installation                         [ OK ]
  - Checking TFTP server installation                         [ OK ]

[+] Banners and identification
------------------------------------
  - /etc/issue                                                [ FOUND ]
    - /etc/issue contents                                     [ WEAK ]
  - /etc/issue.net                                            [ FOUND ]
    - /etc/issue.net contents                                 [ WEAK ]

[+] Scheduled tasks
------------------------------------
  - Checking crontab and cronjob files                        [ DONE ]
  - Checking atd status                                       [ RUNNING ]
    - Checking at users                                       [ DONE ]
    - Checking at jobs                                        [ NONE ]

[+] Accounting
------------------------------------
  - Checking accounting information                           [ NOT FOUND ]
  - Checking sysstat accounting data                          [ DISABLED ]
  - Checking auditd                                           [ NOT FOUND ]

[+] Time and Synchronization
------------------------------------
  - NTP daemon found: systemd (timesyncd)                     [ FOUND ]
  - Checking event based ntpdate (if-up)                      [ FOUND ]
  - Checking for a running NTP daemon or client               [ OK ]

[+] Cryptography
------------------------------------
  - Checking for expired SSL certificates [12/377]            [ FOUND ]

  [WARNING]: Test CRYP-7902 had a long execution: 27.347473 seconds

  - Kernel entropy is sufficient                              [ YES ]
  - HW RNG & rngd                                             [ NO ]

[+] Virtualization
------------------------------------

[+] Containers
------------------------------------

[+] Security frameworks
------------------------------------
  - Checking presence AppArmor                                [ NOT FOUND ]
  - Checking presence SELinux                                 [ NOT FOUND ]
  - Checking presence TOMOYO Linux                            [ NOT FOUND ]
  - Checking presence grsecurity                              [ NOT FOUND ]
  - Checking for implemented MAC framework                    [ NONE ]

[+] Software: file integrity
------------------------------------
  - Checking file integrity tools
  - Checking presence integrity tool                          [ NOT FOUND ]

[+] Software: System tooling
------------------------------------
  - Checking automation tooling
  - Automation tooling                                        [ NOT FOUND ]
  - Checking for IDS/IPS tooling                              [ NONE ]

[+] Software: Malware
------------------------------------

[+] File Permissions
------------------------------------
  - Starting file permissions check
    File: /etc/at.deny                                        [ SUGGESTION ]
    File: /etc/crontab                                        [ SUGGESTION ]
    File: /etc/group                                          [ OK ]
    File: /etc/group-                                         [ OK ]
    File: /etc/hosts.allow                                    [ OK ]
    File: /etc/hosts.deny                                     [ OK ]
    File: /etc/issue                                          [ OK ]
    File: /etc/issue.net                                      [ OK ]
    File: /etc/passwd                                         [ OK ]
    File: /etc/passwd-                                        [ OK ]
    File: /etc/ssh/sshd_config                                [ SUGGESTION ]
    Directory: /etc/cron.d                                    [ SUGGESTION ]
    Directory: /etc/cron.daily                                [ SUGGESTION ]
    Directory: /etc/cron.hourly                               [ SUGGESTION ]
    Directory: /etc/cron.weekly                               [ SUGGESTION ]
    Directory: /etc/cron.monthly                              [ SUGGESTION ]

[+] Home directories
------------------------------------
  - Permissions of home directories                           [ WARNING ]
  - Ownership of home directories                             [ OK ]
  - Checking shell history files                              [ OK ]

[+] Kernel Hardening
------------------------------------
  - Comparing sysctl key pairs with scan profile
    - fs.suid_dumpable (exp: 0)                               [ OK ]
    - kernel.core_uses_pid (exp: 1)                           [ DIFFERENT ]
    - kernel.ctrl-alt-del (exp: 0)                            [ OK ]
    - kernel.dmesg_restrict (exp: 1)                          [ DIFFERENT ]
    - kernel.kptr_restrict (exp: 2)                           [ DIFFERENT ]
    - kernel.randomize_va_space (exp: 2)                      [ OK ]
    - kernel.sysrq (exp: 0)                                   [ DIFFERENT ]
    - kernel.yama.ptrace_scope (exp: 1 2 3)                   [ OK ]
    - net.ipv4.conf.all.accept_redirects (exp: 0)             [ DIFFERENT ]
    - net.ipv4.conf.all.accept_source_route (exp: 0)          [ OK ]
    - net.ipv4.conf.all.bootp_relay (exp: 0)                  [ OK ]
    - net.ipv4.conf.all.forwarding (exp: 0)                   [ OK ]
    - net.ipv4.conf.all.log_martians (exp: 1)                 [ DIFFERENT ]
    - net.ipv4.conf.all.mc_forwarding (exp: 0)                [ OK ]
    - net.ipv4.conf.all.proxy_arp (exp: 0)                    [ OK ]
    - net.ipv4.conf.all.rp_filter (exp: 1)                    [ OK ]
    - net.ipv4.conf.all.send_redirects (exp: 0)               [ DIFFERENT ]
    - net.ipv4.conf.default.accept_redirects (exp: 0)         [ DIFFERENT ]
    - net.ipv4.conf.default.accept_source_route (exp: 0)      [ DIFFERENT ]
    - net.ipv4.conf.default.log_martians (exp: 1)             [ DIFFERENT ]
    - net.ipv4.icmp_echo_ignore_broadcasts (exp: 1)           [ OK ]
    - net.ipv4.icmp_ignore_bogus_error_responses (exp: 1)     [ OK ]
    - net.ipv4.tcp_syncookies (exp: 1)                        [ OK ]
    - net.ipv4.tcp_timestamps (exp: 0 1)                      [ OK ]
    - net.ipv6.conf.all.accept_redirects (exp: 0)             [ DIFFERENT ]
    - net.ipv6.conf.all.accept_source_route (exp: 0)          [ OK ]
    - net.ipv6.conf.default.accept_redirects (exp: 0)         [ DIFFERENT ]
    - net.ipv6.conf.default.accept_source_route (exp: 0)      [ OK ]

[+] Hardening
------------------------------------
    - Installed compiler(s)                                   [ FOUND ]
    - Installed malware scanner                               [ NOT FOUND ]

[+] Custom tests
------------------------------------
  - Running custom tests...                                   [ NONE ]

[+] Plugins (phase 2)
------------------------------------
  - Plugins (phase 2)                                         [ DONE ]

================================================================================

  -[ Lynis 3.0.0 Results ]-

  Great, no warnings

  Suggestions (44):
  ----------------------------
  * Determine why /vmlinuz or /boot/vmlinuz is missing on this Debian/Ubuntu system. [KRNL-5788]
    - Details  : /vmlinuz or /boot/vmlinuz
      https://cisofy.com/lynis/controls/KRNL-5788/

  * If not required, consider explicit disabling of core dump in /etc/security/limits.conf file [KRNL-5820]
      https://cisofy.com/lynis/controls/KRNL-5820/

  * Run pwck manually and correct any errors in the password file [AUTH-9228]
      https://cisofy.com/lynis/controls/AUTH-9228/

  * Install a PAM module for password strength testing like pam_cracklib or pam_passwdqc [AUTH-9262]
      https://cisofy.com/lynis/controls/AUTH-9262/

  * Configure minimum password age in /etc/login.defs [AUTH-9286]
      https://cisofy.com/lynis/controls/AUTH-9286/

  * Configure maximum password age in /etc/login.defs [AUTH-9286]
      https://cisofy.com/lynis/controls/AUTH-9286/

  * Default umask in /etc/login.defs could be more strict like 027 [AUTH-9328]
      https://cisofy.com/lynis/controls/AUTH-9328/

  * To decrease the impact of a full /home file system, place /home on a separate partition [FILE-6310]
      https://cisofy.com/lynis/controls/FILE-6310/

  * To decrease the impact of a full /tmp file system, place /tmp on a separate partition [FILE-6310]
      https://cisofy.com/lynis/controls/FILE-6310/

  * To decrease the impact of a full /var file system, place /var on a separate partition [FILE-6310]
      https://cisofy.com/lynis/controls/FILE-6310/

  * Disable drivers like USB storage when not used, to prevent unauthorized storage or data theft [USB-1000]
      https://cisofy.com/lynis/controls/USB-1000/

  * Purge old/removed packages (60 found) with aptitude purge or dpkg --purge command. This will cleanup old configuration files, cron jobs and startup scripts. [PKGS-7346]
      https://cisofy.com/lynis/controls/PKGS-7346/

  * Install debsums utility for the verification of packages with known good database. [PKGS-7370]
      https://cisofy.com/lynis/controls/PKGS-7370/

  * Install package apt-show-versions for patch management purposes [PKGS-7394]
      https://cisofy.com/lynis/controls/PKGS-7394/

  * Install a package audit tool to determine vulnerable packages [PKGS-7398]
      https://cisofy.com/lynis/controls/PKGS-7398/

  * Install Apache mod_evasive to guard webserver against DoS/brute force attempts [HTTP-6640]
      https://cisofy.com/lynis/controls/HTTP-6640/

  * Install Apache modsecurity to guard webserver against web application attacks [HTTP-6643]
      https://cisofy.com/lynis/controls/HTTP-6643/

  * Add HTTPS to nginx virtual hosts for enhanced protection of sensitive data and privacy [HTTP-6710]
      https://cisofy.com/lynis/controls/HTTP-6710/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : AllowTcpForwarding (set YES to NO)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : ClientAliveCountMax (set 3 to 2)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : Compression (set YES to NO)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : LogLevel (set INFO to VERBOSE)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : MaxAuthTries (set 6 to 3)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : MaxSessions (set 10 to 2)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : TCPKeepAlive (set YES to NO)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : X11Forwarding (set YES to NO)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Consider hardening SSH configuration [SSH-7408]
    - Details  : AllowAgentForwarding (set YES to NO)
      https://cisofy.com/lynis/controls/SSH-7408/

  * Turn off PHP information exposure [PHP-2372]
    - Details  : expose_php = Off
      https://cisofy.com/lynis/controls/PHP-2372/

  * Change the allow_url_fopen line to: allow_url_fopen = Off, to disable downloads via PHP [PHP-2376]
      https://cisofy.com/lynis/controls/PHP-2376/

  * Enable logging to an external logging host for archiving purposes and additional protection [LOGG-2154]
      https://cisofy.com/lynis/controls/LOGG-2154/

  * Check what deleted files are still in use and why. [LOGG-2190]
      https://cisofy.com/lynis/controls/LOGG-2190/

  * Add a legal banner to /etc/issue, to warn unauthorized users [BANN-7126]
      https://cisofy.com/lynis/controls/BANN-7126/

  * Add legal banner to /etc/issue.net, to warn unauthorized users [BANN-7130]
      https://cisofy.com/lynis/controls/BANN-7130/

  * Enable process accounting [ACCT-9622]
      https://cisofy.com/lynis/controls/ACCT-9622/

  * Enable sysstat to collect accounting (disabled) [ACCT-9626]
      https://cisofy.com/lynis/controls/ACCT-9626/

  * Enable auditd to collect audit information [ACCT-9628]
      https://cisofy.com/lynis/controls/ACCT-9628/

  * Check available certificates for expiration [CRYP-7902]
      https://cisofy.com/lynis/controls/CRYP-7902/

  * Install a file integrity tool to monitor changes to critical and sensitive files [FINT-4350]
      https://cisofy.com/lynis/controls/FINT-4350/

  * Determine if automation tools are present for system management [TOOL-5002]
      https://cisofy.com/lynis/controls/TOOL-5002/

  * Consider restricting file permissions [FILE-7524]
    - Details  : See screen output or log file
    - Solution : Use chmod to change file permissions
      https://cisofy.com/lynis/controls/FILE-7524/

  * Double check the permissions of home directories as some might be not strict enough. [HOME-9304]
      https://cisofy.com/lynis/controls/HOME-9304/

  * One or more sysctl values differ from the scan profile and could be tweaked [KRNL-6000]
    - Solution : Change sysctl value or disable test (skip-test=KRNL-6000:<sysctl-key>)
      https://cisofy.com/lynis/controls/KRNL-6000/

  * Harden compilers like restricting access to root user only [HRDN-7222]
      https://cisofy.com/lynis/controls/HRDN-7222/

  * Harden the system by installing at least one malware scanner, to perform periodic file system scans [HRDN-7230]
    - Solution : Install a tool like rkhunter, chkrootkit, OSSEC
      https://cisofy.com/lynis/controls/HRDN-7230/

  Follow-up:
  ----------------------------
  - Show details of a test (lynis show details TEST-ID)
  - Check the logfile for all details (less /tmp/lynis.log)
  - Read security controls texts (https://cisofy.com)
  - Use --upload to upload data to central system (Lynis Enterprise users)

================================================================================

  Lynis security scan details:

  Hardening index : 65 [#############       ]
  Tests performed : 254
  Plugins enabled : 2

  Components:
  - Firewall               [V]
  - Malware scanner        [X]

  Scan mode:
  Normal [ ]  Forensics [ ]  Integration [ ]  Pentest [V] (running non-privileged)

  Lynis modules:
  - Compliance status      [?]
  - Security audit         [V]
  - Vulnerability scan     [V]

  Files:
  - Test and debug information      : /tmp/lynis.log
  - Report data                     : /tmp/lynis-report.dat

================================================================================

  Exceptions found
  Some exceptional events or information was found!

  What to do:
  You can help by providing your log file (/tmp/lynis.log).
  Go to https://cisofy.com/contact/ and send your file to the e-mail address listed

================================================================================

  Skipped tests due to non-privileged mode
    BOOT-5108 - Check Syslinux as bootloader
    BOOT-5116 - Check if system is booted in UEFI mode
    AUTH-9216 - Check group and shadow group files
    AUTH-9252 - Check ownership and permissions for sudo configuration files
    AUTH-9288 - Checking for expired passwords
    FILE-6368 - Checking ACL support on root file system
    PKGS-7390 - Check Ubuntu database consistency
    PKGS-7392 - Check for Debian/Ubuntu security updates
    FIRE-4508 - Check used policies of iptables chains
    FIRE-4512 - Check iptables for empty ruleset
    FIRE-4513 - Check iptables for unused rules
    FIRE-4586 - Check firewall logging
    CRYP-7930 - Determine if system uses LUKS block device encryption

================================================================================

  Lynis 3.0.0

  Auditing, system hardening, and compliance for UNIX-based systems
  (Linux, macOS, BSD, and others)

  2007-2019, CISOfy - https://cisofy.com/lynis/
  Enterprise support available (compliance, plugins, interface and tools)

================================================================================

  [TIP]: Enhance Lynis audits by adding your settings to custom.prf (see /home/david/scripts/lynis/default.prf for all settings)

  david@woozer:~/scripts/lynis(master○) » 

```
