# Scripts

My ops scripts. Source of truth is the private `_servers` repo under `scripts/`; they get
deployed to `~/scripts/` on each box. **Edit them in the repo, not on the server** — otherwise
the deployed copy and the tracked copy drift and neither is authoritative.

Nothing here holds credentials. Everything that needs database access reads `~/.my.cnf`
(mode `0600`), which must exist **for the user the job runs as** — under root's crontab that
is `/root/.my.cnf`, not mine.

## Log

- **26/08/16** — wrote `log-digest.sh` after looking at Grafana/Loki, SigNoz and PostHog and
  deciding none of them answered the actual question. Its first run produced **16,636**
  blocklist candidates, including a search crawler and my own house. Fixing that taught me
  more than the tool does.
- **26/08/15** — wrote `db-sync.sh` for the [migration](/docs/server/migration) work. One
  script, both directions, always run from the local box because it is the one behind NAT.
- **26/08/15** — rewrote `mysql-cron.sh`. Enumerating databases instead of using a hardcoded
  list immediately found **two that had never been backed up** — one of them for three and a
  half years.
- **26/08/15** — `scan-exposure.sh`, after reading about malware on open ports. A 40-port
  sample of my own WAN found nothing; a full `-p-` found two.
- **26/08/14** — tracked the rest of what was already on the server (`monitor.sh`,
  `monitor-archive.sh`, `apachetuner.sh`). They had existed only on the box.

---

## db-sync.sh

Moves databases between machines. **Run it on the local box** — it is behind NAT, so it is
always the active party: it *pulls* from the remote production host and *pushes* to a new one.

```sh
./db-sync.sh pull <remote>     # remote's dumps -> restore here
./db-sync.sh push <remote>     # dump here -> restore there
./db-sync.sh verify <remote>   # compare, change nothing

  --db NAME     one database instead of all
  --dry-run     say what would happen, touch nothing
  --yes         skip the confirmation prompt on push
```

Pull reads dumps written by `mysql-cron.sh`, so **run that on the source first** or I get
yesterday's data. Push prompts for the remote's name before overwriting — that direction is
destructive and will eventually point at production.

Remotes are configured in a `case` block at the top of the script: host, port, key, dump
directory, and whether the key allows a shell.

#### Why pull and push use different keys

Pull uses a key restricted with `command="rrsync -ro <dumpdir>"` — it can read dumps and
nothing else, not even a shell. Push needs real shell access, because restoring means running
`mysql` on the far end. The script refuses to push to a remote whose key is restricted rather
than failing obscurely.

#### Things that fail silently

- **`--databases` in the dump is load-bearing.** Without it the dump is tables-only, and the
  restoring server invents the database with **its own** default collation. See
  [migration](/docs/server/migration#collation) — this is the trap that does not surface for
  months.
- **Never mirror the `phpmyadmin` database.** Its control schema is tied to the phpMyAdmin
  *version*; copying it between boxes running different versions produces exactly the
  "configuration storage" breakage the warning exists to flag. Each host builds its own from
  its packaged `sql/create_tables.sql`.

---

## mysql-cron.sh

Weekly dump of every database plus `mysqlcheck --analyze`. Cron, Sunday 01:11.

```sh
~/scripts/mysql-cron.sh                 # writes ~/backups/<date>.<db>.sql.gz
ls -lh ~/backups/$(date +%Y%m%d).*.sql.gz
```

Environment overrides: `BACKUP_DIR` (default `~/backups`), `KEEP_DAYS` (default 30).

#### What it does that the old version did not

- **Enumerates databases from `SHOW DATABASES`** rather than a hardcoded list. The old list had
  14 names; the server had 16. One of the two missing had gone unbacked-up for three and a half
  years. A list in a script drifts from reality and nothing says so.
- **`--single-transaction --quick`** — a consistent InnoDB snapshot with no table locks. The
  default `--lock-tables` blocks writes on live sites, serially, across every database.
- **`--routines --triggers --events`** — not included by default. Stored procedures, triggers
  and scheduled events vanish without them, and nothing warns me. Silent data loss in a file
  that looks like a backup.
- **`--databases`** — carries `CREATE DATABASE ... COLLATE ...` so the collation travels with
  the dump.
- **Dumps to `.partial` and renames on success.** A plain `>` truncates *before* mysqldump
  runs, so a failure leaves a 0-byte file that looks fine in a directory listing.
- **`mysqlcheck --analyze`, not `-o`.** Every table is InnoDB, which has no OPTIMIZE — MariaDB
  turns it into a full table rebuild plus ANALYZE, hence the *"doing recreate + analyze
  instead"* notice. That rebuilt every table weekly to reclaim space InnoDB reuses anyway, and
  the rebuild takes brief exclusive metadata locks that can queue queries behind a long-running
  one. Run OPTIMIZE by hand against specific tables when
  `information_schema.TABLES.DATA_FREE` shows real waste.

---

## clear-logs.sh

Review per-site `error.log`s, and optionally truncate the access/error logs.

```sh
./clear-logs.sh              # review, then prompt to clear
./clear-logs.sh --review     # review only, never clears
./clear-logs.sh --code       # just my code's errors — core + scanner noise stripped
./clear-logs.sh --clear      # clear immediately, no prompt (for cron)
./clear-logs.sh --dry-run    # show sizes, change nothing
./clear-logs.sh --site=example.com
```

**Under cron it needs `--clear`.** Invoked bare it runs the interactive review-then-prompt
mode; with no TTY the prompt reads EOF and nothing is truncated — while the job looks like it
ran fine.

It truncates rather than `rm`s, which keeps Apache's open file handle valid — no reload, no
leaked disk space.

Largely superseded by logrotate where that is configured: rotation keeps compressed history
to review, where truncation just discards it. `--review` and `--code` stay useful regardless.

---

## scan-exposure.sh

What a host looks like from the internet.

```sh
./scan-exposure.sh <target>            # top 1000 TCP
./scan-exposure.sh <target> --full     # all 65535 — USE THIS
./scan-exposure.sh <target> --udp      # top 100 UDP, separate space
./scan-exposure.sh <target> --log      # tee to ~/logs/
```

**Must be run from a machine outside the target's network.** Scanning a home WAN from inside
the house hairpins through NAT loopback and returns a confident wrong answer; the script
refuses to run if its own egress IP matches the target.

**Always `--full`.** A 40-port common-service sample of my own WAN found nothing at all; only
`-p-` found the two that were open. An arbitrary high port is exactly where a backdoor sits, so
a sampled scan coming back clean is not evidence of a clean host.

`-Pn` is set because a correctly configured router drops ICMP — without it nmap decides the
host is down and scans nothing, which reads identically to "everything is closed". On a
dropping host `--max-retries 1 --min-rate 1000` takes `-p-` from hours to about two minutes.

Neither scan sees the router's own config. Port forwards, UPnP and WAN-side admin are a
separate manual check.

---

## wp-update-all.sh

Fleet WordPress updates — backs up, flips `DISALLOW_FILE_MODS`, updates, restores the
constant.

```sh
./wp-update-all.sh
```

Afterwards it is worth confirming the sites actually serve, not just that wp-cli exited 0. A
successful update and a working site are different claims.

---

## monitor.sh / monitor-archive.sh

GoAccess reports from the Apache and nginx logs, daily 06:00; the archive script snapshots the
HTML before it is regenerated, Sunday 05:55.

Both append to `~/logs/cron.log`, which has no rotation and grows unbounded.

---

## log-digest.sh

Pulls the web logs off the remote boxes and reduces them to a digest small enough to actually
read — with **paste-ready blocklist candidates** at the end, which is the point of it.

```sh
./log-digest.sh                 # digest to stdout
./log-digest.sh -o digest.md    # and to a file
./log-digest.sh --no-pull       # re-analyse the cache, no network
```

Run it on the **local box**, same reasoning as `db-sync.sh` — it is behind NAT so it is always
the active party, and it reuses the restricted rsync key that already exists for pulling
`/var/www`. That key's scope happens to cover the per-site logs, so no new access was needed.

#### Why a digest and not a dashboard

Production alone holds ~2M access lines. A dashboard answers *"draw me the 4xx rate"*. It does
not answer *"this user agent is new this week and it is walking wp-login across every site in
alphabetical order"* — and the second question is the one I care about. That needs the log
reduced to facts, not plotted. The output is markdown I can read directly or hand to Claude;
feeding either one raw logs is worse **and** more expensive, because ~97% of the volume is 200s
carrying no information.

It also replaces the blacklist review I was doing by hand. Anything not already in `custom.d`
and not whitelisted comes out formatted as `Require not ip <addr>`, ready to paste.

#### The thresholds exist because the first version was useless

It produced **16,636** candidates. 98% of them qualified on a single "probe path" hit, and the
top two entries were a major search crawler and **my own home IP address**. Three fixes:

- **Probe paths are tiered.** `/.env`, `/.git`, `/vendor`, `wp-config` are conclusive — nothing
  legitimate requests them — and qualify at two hits. `wp-login.php`, `xmlrpc.php` and
  `/wp-admin` are *ambiguous*: real people log in and link-following crawlers fetch them
  constantly. They never qualify an address on their own. That one change was most of the
  16,636.
- **Declared crawlers are excluded** and reported separately. One crawler was ~48% of all
  traffic. Whether it may index the sites is a `robots.txt` decision, not something to arrive
  at by pasting a generated list.
- **The runner's own WAN address is excluded**, looked up fresh each run because it is dynamic.
  The local box shares the house address with every machine I develop from, so my own admin
  traffic read as an attacker.

Result: 16,636 → ~700.

#### Things that fail silently

- **No `custom.d` found** → candidates are not filtered against the existing blocklist, so the
  list quietly fills with addresses already blocked. The digest prints a warning for this, but
  only if you read the header.
- **WAN lookup fails** → my own traffic can appear as a candidate. Also warned, same caveat.
- **SSH attackers are NOT in the blocklist section.** `custom.d` is Apache-level, so pasting a
  brute-forcer there blocks it from the websites and does *nothing* to sshd. Those get their
  own section, and the answer for them is fail2ban or a firewall deny.
- **CIDR suppression only matches /24.** A wider prefix already in the blocklist will not
  suppress its members, so expect the occasional duplicate suggestion.

#### Still to do

`auth.log` needs a second restricted key per host — the existing one is scoped to the web root
and cannot see it. Until then the SSH section stays empty.

---

## apachetuner.sh

Fetches `apache2buddy`, verifies **md5 and sha256** against the upstream checksums, and only
then pipes it to perl. Worth noting the checksums come from the same repository as the script,
so it protects against a corrupted download rather than a compromised upstream.
