# Monit

- [mmonit.com/monit](https://mmonit.com/monit/)
- [documentation](https://mmonit.com/monit/documentation/monit.html)

## Log

- **26/08/15** — added `apache2` + `php8.5-fpm` checks to [Cotton](/docs/computers/cotton).
  Three things bit me, all recorded below under [Gotchas](#gotchas): 26.04's hardened
  `monit.service` breaks the FPM socket check, `protocol fastcgi` does not exist, and a `.bak`
  file left in `conf.d/` gets parsed.
- **26/08/15** — fixed a long-standing typo in Woozie's `apache2.conf`: line 3 read
  `start program = "... stop apache2"`. Monit takes the **last** `start program`, so a
  Monit-initiated start would have stopped Apache. Latent since Feb 2023 — it only fires on an
  explicit `monit stop`, never from a check.
- **26/06/24** — PID mismatch with the php-fpm processes on Woozie; Monit reported them down
  while they were fine. Swapped from `with pidfile` to `matching "php-fpm: master process ..."`
  and start/stop via `systemctl`.

## Gotchas

#### Ubuntu 26.04 strips CAP_DAC_OVERRIDE and the FPM socket check fails

The shipped unit runs Monit as root but with capabilities cut to
`CAP_DAC_READ_SEARCH CAP_NET_RAW CAP_SYS_PTRACE`. Connecting to a unix socket needs **write**
permission; `CAP_DAC_READ_SEARCH` only bypasses *read* checks. PHP-FPM's socket is
`srw-rw---- www-data:www-data`, so `connect()` returns EACCES and Monit reports
**"Connection failed"** against a perfectly healthy pool — then restarts it, fails again, and
trips the restart-timeout into `Not monitored`.

22.04 ships an unconfined unit, so Woozie never sees this. It is a 26.04 property.

```ini
# /etc/systemd/system/monit.service.d/override.conf
[Service]
CapabilityBoundingSet=CAP_DAC_READ_SEARCH CAP_NET_RAW CAP_SYS_PTRACE CAP_DAC_OVERRIDE
```

```sh
sudo systemctl daemon-reload && sudo systemctl restart monit
systemctl show monit -p CapabilityBoundingSet
```

`daemon-reload` alone is not enough — capabilities are fixed at process start, so it needs a
**restart**. Do not "fix" this by setting `listen.mode = 0666` on the FPM pool; that makes the
socket writable by every local user to satisfy a monitoring check.

#### There is no `fastcgi` protocol

Monit speaks http, mysql, redis, smtp, pgsql and friends — **not FastCGI**. Writing
`protocol fastcgi` is a parse error, and a parse error takes the **whole daemon** down, not
just that check. Always `monit -t` before `monit reload`.

#### `conf.d/` is globbed, so backups get parsed

Leaving `apache2.conf.bak-<date>` next to `apache2.conf` gives
`Service name conflict, apache2 already defined`. Keep backups outside the directory. Same
trap as `cron.d`, `logrotate.d`, `sites-enabled` and `sudoers.d`.

#### "Not monitored" means disabled, not failing

`if 5 restarts within 5 cycles then timeout` sets a service to `Not monitored` after repeated
restart failures — deliberately, to stop a crash loop. It stays that way until
`monit monitor <service>`. Worth `monit summary | grep -i "not monitored"` occasionally;
anything listed is silently unwatched.

#### Status right after a reload is stale

The poll interval is `set daemon`, so a freshly reloaded check reads `initializing` or shows
the previous state for up to that long. Wait a cycle before believing it.

## Install

Ubuntu starts and enables it automatically:

```sh
sudo apt update && sudo apt install monit
sudo systemctl status monit
```

```sh
sudo monit -t              # validate config — ALWAYS before reload
sudo monit reload          # re-read config
sudo monit summary         # one line per service
sudo monit status <svc>    # detail, including why a check failed
sudo monit monitor <svc>   # re-enable a service left "Not monitored"
```

The local HTTP interface answers without auth if `allow localhost` is set, which is handy when
I cannot sudo:

```sh
curl -s "http://127.0.0.1:2812/_status?format=text"
```

## Daemon config

`/etc/monit/monitrc`. Drop-ins live in `/etc/monit/conf.d/` (and `conf-enabled/` on newer
Ubuntu) and must be **`0600 root:root`** or Monit refuses to start.

```apacheconf
set daemon 120                 # poll interval in seconds
    with start delay 240       # let other services finish booting first
```

Without the start delay, every reboot produces a full set of "service is down" alerts while
things are still coming up.

```apacheconf
set mailserver smtp.example.com port 587
    username "user@example.com" password "app-specific"
    using tls
set alert me@example.com

set eventqueue
    basedir /var/lib/monit/events
    slots 100
```

The event queue matters: without it Monit does **not** retry a failed alert delivery, so an
outage that also breaks mail is an outage I never hear about.

```apacheconf
set httpd port 2812 and
    use address 127.0.0.1
    allow localhost
```

Binding to localhost and putting nginx in front with TLS + basic auth is better than exposing
2812 — that is how it is done on [Cotton](/docs/computers/cotton).

## Checks

#### System and filesystem

```apacheconf
check system $HOST
  if loadavg (5min) > 4 then alert
  if memory usage > 85% then alert
  if cpu usage (user) > 90% for 5 cycles then alert

check filesystem rootfs with path /
  if space usage > 85% then alert
```

#### A process with a pidfile

```apacheconf
check process apache2 with pidfile /run/apache2/apache2.pid
    start program   = "/bin/systemctl start apache2"   with timeout 60 seconds
    stop program    = "/bin/systemctl stop apache2"    with timeout 60 seconds
    restart program = "/bin/systemctl restart apache2" with timeout 120 seconds
    if children > 255 for 5 cycles then alert
    if cpu usage > 85% for 5 cycles then alert
    if failed host 127.0.0.1 port 8080 protocol http request "/" then restart
    if 5 restarts within 5 cycles then timeout
```

Behind a reverse proxy, point the port check at the **backend** port and be explicit about the
host — otherwise a later reader "corrects" it to 80, which nginx owns.

Always include the restart-timeout line. Without it a crash-looping service is restarted
forever and the alert that matters drowns in the noise.

#### A process matched by name

Better than a pidfile when the pidfile is unreliable — which it was for php-fpm:

```apacheconf
check process php8.5-fpm matching "php-fpm: master process \(/etc/php/8.5/fpm/php-fpm.conf\)"
    start program = "/bin/systemctl start php8.5-fpm" with timeout 60 seconds
    stop program  = "/bin/systemctl stop php8.5-fpm"  with timeout 60 seconds
    if failed unixsocket /run/php/php8.5-fpm.sock then restart
    if 5 restarts within 5 cycles then timeout
```

The **socket** check is the one that matters. The FPM master can be alive while every worker is
wedged, and Apache's `proxy_fcgi` talks to the socket, not the process — a process-only check
would call that healthy.

#### A file, to prove a cron job ran

```apacheconf
check file nightly-backup with path /tmp/backup-ok
    if timestamp > 25 hours then alert
```

Have the job `touch /tmp/backup-ok` on a path only reached on success. This catches the case a
process check never will: the job ran, exited 0, and did nothing useful.

#### A remote host

```apacheconf
check host code with address code.example.com
    if failed port 443 protocol https with timeout 30 seconds then alert
```

If Monit only runs on one box and that box dies, nothing tells me. Two hosts checking each
other covers it.
