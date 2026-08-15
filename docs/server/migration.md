# Migration

Moving a fleet of sites from one box to the next. Not machine-specific — the same shape every
time, roughly every couple of years, [by choice rather than at EOL](/docs/computers/zeke).

The current rotation runs **old production → local reference build → new production**. The
middle step is the change from previous rotations: instead of migrating off a live box under
cutover pressure, I build and prove everything locally first, then the new host is a sync from
a machine I have already tested.

```
  woozie 22.04          cotton 26.04            zeke 26.04
  MariaDB 10.6    ──▶   MariaDB 11.8    ──▶     MariaDB 11.8
  PHP 8.3               PHP 8.5                 PHP 8.5
  production today      reference build         next production
```

## Log

- **26/08/15** — full dry run onto Cotton. 33G of `/var/www` in 5m36s, 15 databases restored
  and verified against the source. **Four version-jump traps found, every one of which fails
  silently.** All four will recur on the next box, which is the entire point of doing it here.
- **26/08/14** — settled the direction: the new server mirrors **cotton**, not the old
  production box. "Does this match the old server?" is the wrong question; "is this what I want
  on the next one?" is the right one.

## The traps

Every one of these presents as *"the service is broken"* rather than *"the config is wrong"*,
and none of them appears at restore time.

#### Collation {#collation}

MariaDB 11.4+ changed the default `utf8mb4` collation to `utf8mb4_uca1400_ai_ci`. 10.6 used
`utf8mb4_unicode_ci`. And `mysqldump <db>` emits **no `CREATE DATABASE`** — so the restoring
server invents the database with **its own** default.

Existing tables are fine, because the dump carries their collation explicitly. Nothing looks
wrong. Then a plugin creates a table months later, it inherits the wrong database default,
joins an existing table, and throws `Illegal mix of collations`.

```sh
mysqldump --databases <db>     # emits CREATE DATABASE ... COLLATE ...
```

Fix it at the source so the collation travels inside the dump and no restore can get it wrong.
To check after the fact:

```sh
mysql -N -B -e "SELECT SCHEMA_NAME, DEFAULT_COLLATION_NAME FROM information_schema.SCHEMATA"
```

#### Authentication plugin

10.6 creates accounts as `mysql_native_password`; MariaDB 11 leans to `unix_socket`. Recreate
a user on the new box without saying which, and password auth fails with `ERROR 1698` — which
reads like a wrong password.

```sql
CREATE USER 'name'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('...');
```

`1698` also appears when the account does not exist at all, so it is not proof that it does.
Check before assuming:

```sh
sudo mysql -e "SELECT user,host,plugin FROM mysql.user ORDER BY user,host"
```

#### Monit's capabilities

Ubuntu 26.04 ships a hardened `monit.service` that strips `CAP_DAC_OVERRIDE`, so Monit cannot
connect to a `0660` PHP-FPM socket and reports a healthy pool as failed. See
[Monit](/docs/server/monit#gotchas).

#### Package names move between releases

There is no `php8.5-opcache` — OPcache is compiled in as of 8.5, and asking for it fails the
whole `apt install` line. Check the module set against the new release rather than copying the
old one:

```sh
apt-cache policy php8.5-{bcmath,curl,gd,imagick,intl,mbstring,mysql,xml,zip}
```

## Files

The local box pulls; the production box cannot push to something behind NAT.

```sh
rsync -a --info=progress2 --whole-file -e "ssh -p <port> -i ~/.ssh/<key>" --exclude='*/log/' remote:/ /var/www/
sudo chown -R me:www-data /var/www
```

- **`--whole-file`** on a first copy — the delta algorithm is pure overhead when nothing exists
  locally. Drop it afterwards so later runs ship only deltas.
- **No `-z`** if the tree is mostly media; compressing compressed data costs throughput.
- **`chown` afterwards is required** — only root can preserve ownership, so running as a normal
  user lands everything owned by that user.
- **Anchor excludes with a leading slash.** `--exclude='media/'` matches at *any* depth — it
  will silently exclude `wp-includes/images/media` on every WordPress site and leave subtly
  broken installs.
- **The sync is only as complete as the reading account's access.** Anything it cannot read is
  skipped, rsync exits 23, and it looks like success. Check first:
  `find /var/www -type d ! -readable`
- Run it under `tmux` **on the receiving box** — then a dropped SSH session or a sleeping
  laptop detaches the client and leaves the transfer running.

## Databases

See [`db-sync.sh`](/docs/server/scripts#db-syncsh). Run `mysql-cron.sh` on the source first, or
the dumps are stale.

Verify against the source rather than trusting exit codes. Table counts prove the schema
arrived; row counts prove the data did:

```sh
mysql -N -B -e 'SELECT table_schema, COUNT(*) FROM information_schema.tables GROUP BY table_schema'
```

Note WordPress table prefixes are per-site and frequently not `wp_` — a verification query that
assumes `wp_posts` returns `ERROR 1146` on most of the fleet.

## Sites

- **Scan `sites-enabled/`, not the docroots.** A redirect-only vhost has no `DocumentRoot` and
  is invisible to a docroot listing. I nearly wiped a box still serving a domain redirect that
  way — it did not look like a site because it had no files.
- **`grep -r` skips symlinks**, and `sites-enabled/` is all symlinks, so
  `grep -rl name /etc/apache2/sites-enabled/` reports nothing while the name is plainly
  configured. Glob instead: `grep name /etc/apache2/sites-enabled/*`.
- **`DB_HOST` may vary between sites.** `localhost` uses the UNIX socket, `127.0.0.1` forces
  TCP, and grants are matched per host. If `skip_name_resolve` is ever switched on, every site
  configured with the IP breaks at once.

## Cutover

- **Lower DNS TTLs a day before the move**, not after. A 24h TTL means resolvers keep sending
  traffic to the old box for a day, so it cannot be destroyed on schedule.
- **An IP transfer is often cleaner than re-pointing DNS** — but write down which box the
  address moved from and to, on the day. Otherwise every later reference in these notes is
  ambiguous, and the ambiguity is invisible because the address still resolves.
- **ACME cannot validate a name whose DNS still points at the old box.** HTTP-01 follows
  redirects, so `--webroot` pointed at wherever the redirect *lands* works. DNS-01 sidesteps
  the whole problem.
- **`certbot` needs `--cert-name`** to expand an existing certificate. Taking the interactive
  default creates a *parallel* lineage plus a second vhost, and the duplicate shadows the
  original — which took a live site down for me.
- **`configtest` passing does not mean the running config is fine.** Apache serves what it
  loaded at start, so a bad edit is invisible until something reloads. Reload deliberately and
  check, rather than discovering it at the next logrotate.
