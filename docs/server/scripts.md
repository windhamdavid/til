# Scripts

My ops scripts. Source of truth is the private `_servers` repo under `scripts/`; they get
deployed to `~/scripts/` on each box. **Edit them in the repo, not on the server** — otherwise
the deployed copy and the tracked copy drift and neither is authoritative.

Nothing here holds credentials. Everything that needs database access reads `~/.my.cnf`
(mode `0600`), which must exist **for the user the job runs as** — under root's crontab that
is `/root/.my.cnf`, not mine.

## Log

- **26/09/25** — wrote `claude-memory-sync.sh` after realising the obvious tool for the job
  loses data quietly. The memory it syncs is one file per fact, so `rsync -u` looks exactly
  right — until you notice each project also keeps a one-line-per-fact **index**, and both
  machines append to it. rsync takes the newer index and drops the other machine's line, while
  the file that line pointed at stays on disk, unlisted and therefore unread. Nothing errors.
  A git union merge keeps both. The lesson generalises past this script: **last-write-wins is
  correct for a fact and wrong for an index.**

  Two bugs surfaced only when I ran it in both directions rather than reading it back. A fresh
  `git init` on the second machine forks an unrelated history and the first sync dies on it.
  And `git merge --no-rebase` is not a valid flag at all — that one belongs to `git pull`.
- **26/09/20** — wrote `wake.sh` while linking the desktop and laptop over SSH, **and it does
  not wake the laptop.** Neither the magic packet nor Apple's own Wake on Demand brought a
  genuinely sleeping machine back, on mains, with its log showing it had dark-woken from
  network traffic before. I stopped there rather than keep pulling, so the honest state is
  "half a tool": the wired desktop wakes, the laptop does not, cause unknown.

  Writing it was still worth it, because measuring corrected two things I had recorded wrong.
  The mesh hands out a `/22`, not the `/24` in my notes, so the broadcast address was off by
  three octets' worth of range. And one machine's "MAC" had the locally-administered bit set —
  a rotating private Wi-Fi address rather than hardware. Both of those fail **silently**: the
  packet sends, nothing wakes, and it looks identical to a machine that is switched off. Which
  is also why I cannot tell you which of them, if either, is why the laptop stayed asleep.
- **26/08/19** — found that the 08/15 `mysql-cron.sh` rewrite had quietly sent a week of
  backups to `/root`. It used `$HOME/backups`, and the job runs from root's crontab, where
  cron sets `HOME` from `/etc/passwd`. It dumped every database correctly, pruned, and exited
  `0` — into a directory the account that consumes the dumps cannot read. Nothing alerted,
  because nothing failed.
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

Environment overrides: `BACKUP_DIR` and `KEEP_DAYS` (default 30). `BACKUP_DIR` defaults to a
**hardcoded absolute path**, deliberately not `$HOME/backups` — see below. Override it for
testing; leave it alone in cron.

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
- **Reports the count and the path on the way out** — `done: 16 dump(s) in <dir>`. A run that
  dumps nothing now cannot look like a run that worked.
- **Chowns each dump to the consuming user when running as root**, `id -u` guarded so it is a
  no-op by hand. Root writing into my home directory produces `root:root 0600` files that I
  cannot read — and a backup its consumer cannot open is not a backup.
- **`mysqlcheck --analyze`, not `-o`.** Every table is InnoDB, which has no OPTIMIZE — MariaDB
  turns it into a full table rebuild plus ANALYZE, hence the *"doing recreate + analyze
  instead"* notice. That rebuilt every table weekly to reclaim space InnoDB reuses anyway, and
  the rebuild takes brief exclusive metadata locks that can queue queries behind a long-running
  one. Run OPTIMIZE by hand against specific tables when
  `information_schema.TABLES.DATA_FREE` shows real waste.

#### Things that fail silently

- **`$HOME` is not an address.** It is whatever `/etc/passwd` says for the user the job runs
  as, which is rarely the user who owns the files. Under root's crontab `$HOME` is `/root`, so
  `BACKUP_DIR="${BACKUP_DIR:-$HOME/backups}"` sent every dump there — successfully. The prune
  ran, against the wrong directory. The exit code was `0`. **When a path is a contract with
  another process, hardcode it and say why in a comment.** Here the contract is
  [`db-sync.sh`](#db-syncsh), which pulls through a key whose forced command is locked to one
  directory: dumps written anywhere else are unreachable by design, so the sync kept succeeding
  against a four-day-old snapshot. A sync that silently serves stale data is worse than one
  that fails.
- **Piping `SHOW DATABASES` straight into `grep` reports grep's exit status, not mysql's.** An
  auth failure yields empty input, grep exits `1` for "no match", and `set -e` kills the script
  — indistinguishable from a successful query whose rows were all filtered out. The database
  list is now captured and checked before it is filtered, and an empty list is a hard failure
  rather than a quiet zero-dump success.
- **Globs expand before `sudo` elevates.** `sudo rm /root/backups/*.gz` is expanded by the
  calling user's shell, which cannot read `/root` — so it dies on "no matches" having done
  nothing. Put the glob inside the elevated shell: `sudo sh -c 'rm /root/backups/*.gz'`.

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

## wake.sh

Wakes the other Mac with `./wake.sh <name>`, or `--ssh` to wait for `sshd` and connect
once it answers.

**Tested honestly, and it only half works.** Waking the wired desktop is fine. Waking the
laptop **does not work at all** — neither the magic packet nor Apple's own Wake on Demand
brought a genuinely sleeping machine back, with it sitting on mains. I stopped chasing the
cause rather than pretend it was solved, and the note in my ops repo says so, because the
expensive failure here is not the script: it is the next person deciding there must be a way
and spending an evening proving there isn't.

**It is the fallback, not the first thing to reach for.** Both machines advertise
`_ssh._tcp` over Bonjour and the house has several Bonjour sleep proxies on it, which is
Apple's *Wake on Demand*: a sleeping Mac hands its registration to a proxy, and the proxy
sends the magic packet when a connection arrives. So plain `ssh <name>` normally wakes the
target by itself, timing out once while it comes up. The script is for when the proxy's
registration has gone stale — a magic packet needs no Bonjour, no registration and no proxy.

No `sudo`, and nothing installed: broadcasting needs `SO_BROADCAST`, not root, and macOS
ships perl, so a five-line socket replaces a Homebrew dependency.

Two things I got wrong before measuring, both worth writing down:

**The subnet is wider than the notes said.** The mesh leases a `/22`, not the `/24` I had
recorded, so the broadcast address is `.71.255` rather than `.68.255`. Sending to the wrong
broadcast fails silently — the packet goes out, nothing receives it, and the machine simply
does not wake. Same trap applies to any firewall rule written as "allow the LAN".

**One MAC was not a MAC.** The laptop's address had the locally-administered bit set — it
was a **private Wi-Fi address**, not hardware. It works while it lasts, but macOS rotates
it, and when it does the wake stops with no error: just a timeout that looks exactly like a
powered-off machine. The wired desktop has a real vendor OUI and is the dependable
direction; the laptop needs Private Wi-Fi Address turned off for the home SSID before its
wake can be trusted.

The general shape of it: **wake-on-LAN is a link-layer broadcast, so the sender has to be
on the same segment.** The always-on Linux box here cannot wake either Mac — it sits
upstream of the mesh's NAT, which is one-way. If both Macs are asleep, nothing on the
network wakes either of them.

## claude-memory-sync.sh

Keeps Claude Code's memory in step between the desktop and the laptop. `init` once per machine,
then bare `./claude-memory-sync.sh` to commit, merge and push. `status` reports the divergence
and changes nothing; `--dry-run` works on any mode.

The work tree **is** `~/.claude/projects`, not a copy of it. The memory files stay exactly where
the tool expects to read them, and a `.gitignore` narrows tracking to `*/memory/**` so the
session transcripts that share that tree are never committed — 97 memory files tracked against
half a gigabyte of transcripts ignored, giving a repo under 200KB. Nothing is symlinked.

Worth knowing before syncing anything: **a project is identified by the absolute path of its
working directory**, slugified, so `~/Sites/thing` becomes one project name and a clone of it
somewhere else becomes a different one. Both machines keep their working copies at identical
paths, which is why the memory is portable between them with no translation at all. That is
load-bearing rather than tidy — move a project on one machine and its memory silently stops
being shared.

#### Why git and not rsync

Memory is one fact per file, so for the facts themselves `rsync -u` is fine: newest wins, which
is the right answer. The index is the problem. Each project keeps a `MEMORY.md` listing its
memories one per line, and **both machines append to it.** With rsync the newer copy of that one
file wins outright, so the other machine's line is simply gone — while the file it pointed at
survives on disk, orphaned, unlisted and no longer read. Nothing fails. You find out when
something you wrote down stops being remembered.

Git fixes exactly that, with one line in `.gitattributes`:

```
*/memory/MEMORY.md merge=union
```

`union` keeps the lines from both sides of a merge instead of raising a conflict. I tested that
specific case before trusting it — a different line added on each machine from a common base,
both present afterwards, no conflict markers, both machines byte-identical.

#### Two bugs that only running it found

**A fresh `git init` on the second machine forks the history.** It starts an unrelated root, and
the first sync then dies on "refusing to merge unrelated histories". `init` now adopts the
existing shared history with `reset --mixed`, which repoints HEAD and rewrites the index without
touching the working tree. It then has to **restore any file the shared repo holds that the
local machine lacks**, because after that reset those read as local deletions — and the next
sync would have committed them, dropping those memories for every machine.

**`git merge --no-rebase` is not a thing.** `--no-rebase` belongs to `git pull`; `git merge`
rejects it as an unknown option and prints its usage, which is what the failure looked like
until I read it properly. An explicit merge is still right: the union driver only applies to
merges, and a rebase replays commits one at a time, reintroducing the conflict the whole
arrangement exists to avoid.

#### Things that fail silently

**It is LAN only.** The bare repo lives on the desktop and is reached over mDNS, which resolves
at home and nowhere else — there is no port forward. Away from home there is nothing to sync and
nothing to fix.

**A git remote written as a hostname rather than an SSH config alias will not authenticate.**
Not this script's bug, but it bit the repo this script lives in. The alias carries the
`IdentityFile`; spell the host out instead and none of that applies, so ssh falls back to the
default key filenames, offers a key that authorises nothing, and the push fails with a
permission error that looks like a key problem rather than a URL problem.
