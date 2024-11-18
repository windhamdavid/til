# PostgreSQL

24/11/18 - using Postgres a bit more as it relates to [pgvector](https://github.com/pgvector/pgvector) and [supabase](/docs/saas/supabase.md).

## Log

- 24/11/18 - upgraded to version 17 since brew pgvector only supports @14 & @17 and ran into a couple issues 👇🏼

- change path in .zshrc
```sh
export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"
```

```sh
david@ovid🏛 :~ » brew uninstall postgresql@15
Uninstalling /opt/homebrew/Cellar/postgresql@15/15.8_3... (3,706 files, 62.6MB)
david@ovid🏛 :~ » brew uninstall pgvector     
Uninstalling /opt/homebrew/Cellar/pgvector/0.8.0... (86 files, 511.7KB)
david@ovid🏛 :~ » brew install postgresql@17
david@ovid🏛 :~ » psql postgres                                                                 2 ↵
psql (17.0 (Homebrew))
Type "help" for help.

postgres=# \dx
                 List of installed extensions
  Name   | Version |   Schema   |         Description          
---------+---------+------------+------------------------------
 plpgsql | 1.0     | pg_catalog | PL/pgSQL procedural language
(1 row)

postgres=# CREATE EXTENSION pgvector;
ERROR:  extension "pgvector" is not available
DETAIL:  Could not open extension control file "/opt/homebrew/share/postgresql@17/extension/pgvector.control": No such file or directory.
HINT:  The extension must first be installed on the system where PostgreSQL is running.
postgres=# \du
                             List of roles
 Role name |                         Attributes                         
-----------+------------------------------------------------------------
 david     | Superuser, Create role, Create DB, Replication, Bypass RLS

postgres=# \q

david@ovid🏛 :~ » which pg_config
/opt/homebrew/opt/postgresql@17/bin/pg_config
david@ovid🏛 :~ » brew info pgvector     
==> pgvector: stable 0.8.0 (bottled)
Open-source vector similarity search for Postgres
https://github.com/pgvector/pgvector
Installed
/opt/homebrew/Cellar/pgvector/0.8.0 (86 files, 511.7KB) *
  Poured from bottle using the formulae.brew.sh API on 2024-11-18 at 16:14:38
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/p/pgvector.rb
License: PostgreSQL
==> Dependencies
Build: postgresql@14 ✘, postgresql@17 ✔
==> Analytics
install: 870 (30 days), 2,270 (90 days), 8,271 (365 days)
install-on-request: 871 (30 days), 2,269 (90 days), 8,271 (365 days)
build-error: 9 (30 days)

david@ovid🏛 :~ » psql postgres
psql (17.0 (Homebrew))
postgres=# CREATE EXTENSION vector;
CREATE EXTENSION
postgres-# \dx
                             List of installed extensions
  Name   | Version |   Schema   |                     Description                      
---------+---------+------------+------------------------------------------------------
 plpgsql | 1.0     | pg_catalog | PL/pgSQL procedural language
 vector  | 0.8.0   | public     | vector data type and ivfflat and hnsw access methods

```



---

## Cheat Sheet

Magic words:
```bash
psql -U postgres
```
Some interesting flags (to see all, use `-h` or `--help` depending on your psql version):
- `-E`: will describe the underlaying queries of the `\` commands (cool for learning!)
- `-l`: psql will list all databases and then exit (useful if the user you connect with doesn't has a default database, like at AWS RDS)

Most `\d` commands support additional param of `__schema__.name__` and accept wildcards like `*.*`

- `\?`: Show help (list of available commands with an explanation)
- `\q`: Quit/Exit
- `\c __database__`: Connect to a database
- `\d __table__`: Show table definition (columns, etc.) including triggers
- `\d+ __table__`: More detailed table definition including description and physical disk size
- `\l`: List databases
- `\dy`: List events
- `\df`: List functions
- `\di`: List indexes
- `\dn`: List schemas
- `\dt *.*`: List tables from all schemas (if `*.*` is omitted will only show SEARCH_PATH ones)
- `\dT+`: List all data types
- `\dv`: List views
- `\dx`: List all extensions installed
- `\df+ __function__` : Show function SQL code. 
- `\x`: Pretty-format query results instead of the not-so-useful ASCII tables
- `\copy (SELECT * FROM __table_name__) TO 'file_path_and_name.csv' WITH CSV`: Export a table as CSV
- `\des+`: List all foreign servers
- `\dE[S+]`: List all foreign tables
- `\! __bash_command__`: execute `__bash_command__` (e.g. `\! ls`)

User Related:
- `\du`: List users
- `\du __username__`: List a username if present.
- `create role __test1__`: Create a role with an existing username.
- `create role __test2__ noinherit login password __passsword__;`: Create a role with username and password.
- `set role __test__;`: Change role for current session to `__test__`.
- `grant __test2__ to __test1__;`: Allow `__test1__` to set its role as `__test2__`.
- `\deu+`: List all user mapping on server

## Configuration

- Service management commands:
```
sudo service postgresql stop
sudo service postgresql start
sudo service postgresql restart
```

- Changing verbosity & querying Postgres log:
  <br/>1) First edit the config file, set a decent verbosity, save and restart postgres:
```
sudo vim /etc/postgresql/9.3/main/postgresql.conf

# Uncomment/Change inside:
log_min_messages = debug5
log_min_error_statement = debug5
log_min_duration_statement = -1

sudo service postgresql restart
```
  2) Now you will get tons of details of every statement, error, and even background tasks like VACUUMs
```
tail -f /var/log/postgresql/postgresql-9.3-main.log
```
  3) How to add user who executed a PG statement to log (editing `postgresql.conf`):
```
log_line_prefix = '%t %u %d %a '
```

- Check Extensions enabled in postgres: `SELECT * FROM pg_extension;`

- Show available extensions: `SELECT * FROM pg_available_extension_versions;`

## Create command

There are many `CREATE` choices, like `CREATE DATABASE __database_name__`, `CREATE TABLE __table_name__` ... Parameters differ but can be checked [at the official documentation](https://www.postgresql.org/search/?u=%2Fdocs%2F9.1%2F&q=CREATE).

## Handy queries
- `SELECT * FROM pg_proc WHERE proname='__procedurename__'`: List procedure/function
- `SELECT * FROM pg_views WHERE viewname='__viewname__';`: List view (including the definition)
- `SELECT pg_size_pretty(pg_total_relation_size('__table_name__'));`: Show DB table space in use
- `SELECT pg_size_pretty(pg_database_size('__database_name__'));`: Show DB space in use
- `show statement_timeout;`: Show current user's statement timeout
- `SELECT * FROM pg_indexes WHERE tablename='__table_name__' AND schemaname='__schema_name__';`: Show table indexes
- Get all indexes from all tables of a schema:
```sql
SELECT
   t.relname AS table_name,
   i.relname AS index_name,
   a.attname AS column_name
FROM
   pg_class t,
   pg_class i,
   pg_index ix,
   pg_attribute a,
    pg_namespace n
WHERE
   t.oid = ix.indrelid
   AND i.oid = ix.indexrelid
   AND a.attrelid = t.oid
   AND a.attnum = ANY(ix.indkey)
   AND t.relnamespace = n.oid
    AND n.nspname = 'kartones'
ORDER BY
   t.relname,
   i.relname
```
- Execution data:
  - Queries being executed at a certain DB:
```sql
SELECT datname, application_name, pid, backend_start, query_start, state_change, state, query 
  FROM pg_stat_activity 
  WHERE datname='__database_name__';
```
  - Get all queries from all dbs waiting for data (might be hung): 
```sql
SELECT * FROM pg_stat_activity WHERE waiting='t'
```
  - Currently running queries with process pid:
```sql
SELECT 
  pg_stat_get_backend_pid(s.backendid) AS procpid, 
  pg_stat_get_backend_activity(s.backendid) AS current_query
FROM (SELECT pg_stat_get_backend_idset() AS backendid) AS s;
```
  - Get Connections by Database: `SELECT datname, numbackends FROM pg_stat_database;`

Casting:
- `CAST (column AS type)` or `column::type`
- `'__table_name__'::regclass::oid`: Get oid having a table name

Query analysis:
- `EXPLAIN __query__`: see the query plan for the given query
- `EXPLAIN ANALYZE __query__`: see and execute the query plan for the given query
- `ANALYZE [__table__]`: collect statistics  

Generating random data ([source](https://www.citusdata.com/blog/2019/07/17/postgres-tips-for-average-and-power-user/)):
- `INSERT INTO some_table (a_float_value) SELECT random() * 100000 FROM generate_series(1, 1000000) i;`

Get sizes of tables, indexes and full DBs:
```sql
select current_database() as database,
  pg_size_pretty(total_database_size) as total_database_size,
  schema_name,
  table_name,
  pg_size_pretty(total_table_size) as total_table_size,
  pg_size_pretty(table_size) as table_size,
  pg_size_pretty(index_size) as index_size
  from ( select table_name,
          table_schema as schema_name,
          pg_database_size(current_database()) as total_database_size,
          pg_total_relation_size(table_name) as total_table_size,
          pg_relation_size(table_name) as table_size,
          pg_indexes_size(table_name) as index_size
          from information_schema.tables
          where table_schema=current_schema() and table_name like 'table_%'
          order by total_table_size
      ) as sizes;
```

- [COPY command](https://www.postgresql.org/docs/9.2/sql-copy.html): Import/export from CSV to tables:
```sql 
COPY table_name [ ( column_name [, ...] ) ]
FROM { 'filename' | STDIN }
[ [ WITH ] ( option [, ...] ) ]

COPY { table_name [ ( column_name [, ...] ) ] | ( query ) }
TO { 'filename' | STDOUT }
[ [ WITH ] ( option [, ...] ) ]
```

- List all grants for a specific user
```sql
SELECT table_catalog, table_schema, table_name, privilege_type
FROM   information_schema.table_privileges
WHERE  grantee = 'user_to_check' ORDER BY table_name;
```

- List all assigned user roles
```sql
SELECT
    r.rolname,
    r.rolsuper,
    r.rolinherit,
    r.rolcreaterole,
    r.rolcreatedb,
    r.rolcanlogin,
    r.rolconnlimit,
    r.rolvaliduntil,
    ARRAY(SELECT b.rolname
      FROM pg_catalog.pg_auth_members m
      JOIN pg_catalog.pg_roles b ON (m.roleid = b.oid)
      WHERE m.member = r.oid) as memberof, 
    r.rolreplication
FROM pg_catalog.pg_roles r
ORDER BY 1;
```

- Check permissions in a table:
```sql
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_name='name-of-the-table';
```

- Kill all Connections:
```sql
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE datname = current_database() AND pid <> pg_backend_pid();
```


## Keyboard shortcuts
- `CTRL` + `R`: reverse-i-search

## Tools
- `ptop` and `pg_top`: `top` for PG. Available on the APT repository from `apt.postgresql.org`.
- [pg_activity](https://github.com/julmon/pg_activity): Command line tool for PostgreSQL server activity monitoring.
- [Unix-like reverse search in psql](https://dba.stackexchange.com/questions/63453/is-there-a-psql-equivalent-of-bashs-reverse-search-history):
```bash
$ echo "bind "^R" em-inc-search-prev" > $HOME/.editrc
$ source $HOME/.editrc
``` 
- Show IP of the DB Instance: `SELECT inet_server_addr();`
- File to save PostgreSQL credentials and permissions (format: `hostname:port:database:username:password`): `chmod 600 ~/.pgpass`
- Collect statistics of a database (useful to improve speed after a Database Upgrade as previous query plans are deleted): `ANALYZE VERBOSE;`
- To obtain the `CREATE TABLE` query of a table, any visual GUI like [pgAdmin](https://www.pgadmin.org/) allows to easily, but else you can use `pg_dump`, e.g.: `pg_dump -t '<schema>.<table>' --schema-only <database>` ([source](https://stackoverflow.com/questions/2593803/how-to-generate-the-create-table-sql-statement-for-an-existing-table-in-postgr))

## Resources & Documentation
- [Operations Cheat Sheet](https://wiki.postgresql.org/wiki/Operations_cheat_sheet): Official PG wiki cheat sheet with an amazing amount of explanations of many topics, features, and many many internal implementation details
- [Postgres Weekly](https://postgresweekly.com/) newsletter: The best way IMHO to keep up to date with PG news
- [100 psql Tips](https://mydbanotebook.org/psql_tips_all.html): Name says all, lots of useful tips!
- [PostgreSQL Exercises](https://pgexercises.com/): An awesome resource to learn to learn SQL, teaching you with simple examples in a great visual way. **Highly recommended**.
- [A Performance Cheat Sheet for PostgreSQL](https://severalnines.com/blog/performance-cheat-sheet-postgresql): Great explanations of `EXPLAIN`, `EXPLAIN ANALYZE`, `VACUUM`, configuration parameters and more. Quite interesting if you need to tune-up a postgres setup.
- [annotated.conf](https://github.com/jberkus/annotated.conf): Annotations of all 269 postgresql.conf settings for PostgreSQL 10.
- `psql -c "\l+" -H -q postgres > out.html`: Generate a html report of your databases (source: 

