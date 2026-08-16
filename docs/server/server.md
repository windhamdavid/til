# Server Tools

Machine-agnostic notes — the workflows, scripts and services that apply to every box. Anything
specific to one machine lives in [Computers](/docs/#computers) instead.

**Workflow**

[Migration](migration) |
[Scripts](scripts)

**Services**

[Apache](apache) |
[Nginx](nginx) |
[Monit](monit) |
[GoAccess](goaccess) |
[Docker](docker) |
[Kubernetes](kubernetes) |
[Mail](mail)

**System**

[Ubuntu](ubuntu) |
[htop](htop) |
[Lynis](lynis)

**Network**

[UFW](ufw) |
[iptables](iptables) |
[Letsencrypt](letsencrypt)

---

Quick answers to the things I look up most:

| I need to… | |
|---|---|
| back up every database | [`mysql-cron.sh`](scripts#mysql-cronsh) |
| move databases between boxes | [`db-sync.sh`](scripts#db-syncsh) |
| see what a host exposes to the internet | [`scan-exposure.sh`](scripts#scan-exposuresh) |
| review or clear per-site logs | [`clear-logs.sh`](scripts#clear-logssh) |
| find IPs worth adding to the blocklist | [`log-digest.sh`](scripts#log-digestsh) |
| see who is actually hitting the sites | [`log-digest.sh`](scripts#log-digestsh) |
| move a fleet to a new server | [Migration](migration) |
| work out why Monit says a healthy service failed | [Monit → Gotchas](monit#gotchas) |
