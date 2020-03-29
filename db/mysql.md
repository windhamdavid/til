# MySQL  

* 20/03/29 migrating databases
#### Migrating Tables to InnoDB
some tables I'm dealing with were created with MySQL v5.1 [ v5.7.29 zeke/woozer & v8.0.19 -macs ]
```sql
SET @DATABASE_NAME = 'name_of_db';

SELECT  CONCAT('ALTER TABLE `', table_name, '` ENGINE=InnoDB;') AS sql_statements
FROM    information_schema.tables AS tb
WHERE   table_schema = @DATABASE_NAME
AND     `ENGINE` = 'MyISAM'
AND     `TABLE_TYPE` = 'BASE TABLE'
ORDER BY table_name DESC;
```
* [https://dev.mysql.com/doc/refman/8.0/en/data-directory-initialization.html](https://dev.mysql.com/doc/refman/8.0/en/data-directory-initialization.html)   
In MySQL 8.0, the default authentication plugin has changed from mysql_native_password to caching_sha2_password, and the 'root'@'localhost' administrative account uses caching_sha2_password by default. If you prefer that the root account use the previous default authentication plugin (mysql_native_password), see caching_sha2_password and the root Administrative Account.

```sh
cd /usr/local/mysql
mkdir mysql-files
chown mysql:mysql mysql-files
chmod 750 mysql-files
bin/mysqld --initialize --user=mysql

```


```sql
#######  caching_sha2_password -> mysql_native_password in v8 #######

mysql> ALTER USER 'pma'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
ERROR 1726 (HY000): Storage engine 'MyISAM' does not support system tables. [mysql.db]

mysql> alter table mysql.db ENGINE=InnoDB

mysql> REPAIR TABLE mysql.db;
+----------+--------+----------+---------------------------------------------------------+
| Table    | Op     | Msg_type | Msg_text                                                |
+----------+--------+----------+---------------------------------------------------------+
| mysql.db | repair | note     | The storage engine for the table doesnt support repair
```
* also had to grab v5.7 via homebrew so that I could switch between versions.
```sh
If you need to have mysql@5.7 first in your PATH run:
  echo 'export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc

For compilers to find mysql@5.7 you may need to set:
  export LDFLAGS="-L/usr/local/opt/mysql@5.7/lib"
  export CPPFLAGS="-I/usr/local/opt/mysql@5.7/include"

For pkg-config to find mysql@5.7 you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/mysql@5.7/lib/pkgconfig"

To have launchd start mysql@5.7 now and restart at login:
  brew services start mysql@5.7
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/mysql@5.7/bin/mysql.server start
```


* January 2020 Notes:  
Migrated all of my local machines to MySQL v.8.0.19  
Still debating MariaDB and I've chosen to stick with MySQL for the time being due to existing documentation for the various software. Had to briefly install multiple versions using Homebrew and [DBengin](localhost/dbengin.md) in order to rectify some issues between versions by [defining datadir=](https://dev.mysql.com/doc/refman/8.0/en/multiple-data-directories.html).  As of MySQL 8.0.16, the server performs the tasks previously handled by mysql_upgrade. After installation of a new MySQL version, the server now automatically performs all necessary upgrade tasks at the next startup and is not dependent on the DBA invoking mysql_upgrade. All of my existing working local and remote databases are backed up by folder date on my two external drives.  

[What's New is MySQL 8](https://dev.mysql.com/doc/refman/8.0/en/mysql-nutshell.html)  
[MySQL 8 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/)

### commands

    mysql > status  
    mysql > exhibit


    Access monitor: `mysql -u [username] -p;` (will prompt for password)

Show all databases: `show databases;`

Access database: `mysql -u [username] -p [database]` (will prompt for password)

Create new database: `create database [database];`

Select database: `use [database];`

Determine what database is in use: `select database();`

Show all tables: `show tables;`

Show table structure: `describe [table];`

List all indexes on a table: `show index from [table];`

Create new table with columns: `CREATE TABLE [table] ([column] VARCHAR(120), [another-column] DATETIME);`

Adding a column: `ALTER TABLE [table] ADD COLUMN [column] VARCHAR(120);`

Adding a column with an unique, auto-incrementing ID: `ALTER TABLE [table] ADD COLUMN [column] int NOT NULL AUTO_INCREMENT PRIMARY KEY;`

Inserting a record: `INSERT INTO [table] ([column], [column]) VALUES ('[value]', [value]');`

MySQL function for datetime input: `NOW()`

Selecting records: `SELECT * FROM [table];`

Explain records: `EXPLAIN SELECT * FROM [table];`

Selecting parts of records: `SELECT [column], [another-column] FROM [table];`

Counting records: `SELECT COUNT([column]) FROM [table];`

Counting and selecting grouped records: `SELECT *, (SELECT COUNT([column]) FROM [table]) AS count FROM [table] GROUP BY [column];`

Selecting specific records: `SELECT * FROM [table] WHERE [column] = [value];` (Selectors: `<`, `>`, `!=`; combine multiple selectors with `AND`, `OR`)

Select records containing `[value]`: `SELECT * FROM [table] WHERE [column] LIKE '%[value]%';`

Select records starting with `[value]`: `SELECT * FROM [table] WHERE [column] LIKE '[value]%';`

Select records starting with `val` and ending with `ue`: `SELECT * FROM [table] WHERE [column] LIKE '[val_ue]';`

Select a range: `SELECT * FROM [table] WHERE [column] BETWEEN [value1] and [value2];`

Select with custom order and only limit: `SELECT * FROM [table] WHERE [column] ORDER BY [column] ASC LIMIT [value];` (Order: `DESC`, `ASC`)

Updating records: `UPDATE [table] SET [column] = '[updated-value]' WHERE [column] = [value];`

Deleting records: `DELETE FROM [table] WHERE [column] = [value];`

Delete *all records* from a table (without dropping the table itself): `DELETE FROM [table];`
(This also resets the incrementing counter for auto generated columns like an id column.)

Delete all records in a table: `truncate table [table];`

Removing table columns: `ALTER TABLE [table] DROP COLUMN [column];`

Deleting tables: `DROP TABLE [table];`

Deleting databases: `DROP DATABASE [database];`

Custom column output names: `SELECT [column] AS [custom-column] FROM [table];`

Export a database dump (more info [here](http://stackoverflow.com/a/21091197/1815847)): `mysqldump -u [username] -p [database] > db_backup.sql`

Use `--lock-tables=false` option for locked tables (more info [here](http://stackoverflow.com/a/104628/1815847)).

Import a database dump (more info [here](http://stackoverflow.com/a/21091197/1815847)): `mysql -u [username] -p -h localhost [database] < db_backup.sql`

Logout: `exit;`


Aggregate functions
-----------

Select but without duplicates: `SELECT distinct name, email, acception FROM owners WHERE acception = 1 AND date >= 2015-01-01 00:00:00`

Calculate total number of records: `SELECT SUM([column]) FROM [table];`

Count total number of `[column]` and group by `[category-column]`: `SELECT [category-column], SUM([column]) FROM [table] GROUP BY [category-column];`

Get largest value in `[column]`: `SELECT MAX([column]) FROM [table];`

Get smallest value: `SELECT MIN([column]) FROM [table];`

Get average value: `SELECT AVG([column]) FROM [table];`

Get rounded average value and group by `[category-column]`: `SELECT [category-column], ROUND(AVG([column]), 2) FROM [table] GROUP BY [category-column];`


Multiple tables
-----------

Select from multiple tables: `SELECT [table1].[column], [table1].[another-column], [table2].[column] FROM [table1], [table2];`

Combine rows from different tables: `SELECT * FROM [table1] INNER JOIN [table2] ON [table1].[column] = [table2].[column];`

Combine rows from different tables but do not require the join condition: `SELECT * FROM [table1] LEFT OUTER JOIN [table2] ON [table1].[column] = [table2].[column];` (The left table is the first table that appears in the statement.)

Rename column or table using an _alias_: `SELECT [table1].[column] AS '[value]', [table2].[column] AS '[value]' FROM [table1], [table2];`


Users functions
-----------

List all users: `SELECT User,Host FROM mysql.user;`

Create new user: `CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';`

Grant `ALL` access to user for `*` tables: `GRANT ALL ON database.* TO 'user'@'localhost';`

##### Remote database Server   

      sudo apt-get install mysql-server
      systemctl status mysql
      mysql_secure_installation
      sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
      [mysqld]
      bind-address = [database server IP address]
      [add] require_secure_transport = on

setup ssl   

      sudo mysql_ssl_rsa_setup --uid=mysql
      sudo systemctl restart mysql

check that it's listening for external connection

      sudo netstat -plunt | grep mysqld

make sure the port is open on the servers   

      sudo ufw allow mysql

      sudo iptables -L -nv --line-numbers
      sudo iptables -I INPUT 7 -p tcp --dport 3306 -m state --state NEW -j ACCEPT
see also [iptables](../server/iptables.md) & [UFW](../server/ufw.md)


###Performance Tuning

[https://github.com/major/MySQLTuner-perl](https://github.com/major/MySQLTuner-perl)

      wget http://mysqltuner.pl/ -O mysqltuner.pl
      perl mysqltuner.pl --host targetDNS_IP --user admin_user --pass admin_password

### avoid swapping
  [https://mariadb.com/kb/en/mariadb/configuring-swappiness/](https://mariadb.com/kb/en/mariadb/configuring-swappiness/)

## MariaDB
