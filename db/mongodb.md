# Mongo DB

**11/10/18** - Ran a > brew upgrade which caused mongodb issues, so I had to downgrade my localhost version in order to repair the databases to bring them up to version 4.0.2 see [https://docs.mongodb.com/manual/release-notes/4.0-upgrade-standalone/](https://docs.mongodb.com/manual/release-notes/4.0-upgrade-standalone/)



```shell
brew uninstall MongoDB
brew install mongodb@3.2

<!-- start mongodb -->
/usr/local/opt/mongodb@3.2/bin/mongod
> db.adminCommand( { setFeatureCompatibilityVersion: "3.2" } )
>quit();

<!-- Quit Mongodb -->
Kill the process by $ kill <PID>
brew uninstall mongodb@3.2

<!-- Repeat the process for 3.4 and 3.6 -->
brew install mongodb@3.4
/usr/local/opt/mongodb@3.4/bin/mongod
> db.adminCommand( { setFeatureCompatibilityVersion: "3.4" } )
>quit();
Kill the process by $ kill <PID>
brew uninstall mongodb@3.2

brew install mongodb@3.6
/usr/local/opt/mongodb@3.6/bin/mongod
> db.adminCommand( { setFeatureCompatibilityVersion: "3.6" } )
>quit();
Kill the process by $ kill <PID>
brew uninstall mongodb@3.6

<!-- Bring it up to verion 4.0.2 -->
brew install mongodb


```  

##### Remote Install

* [Install MongoDB on Ubuntu 16.04](ubuntu-mongo.md)  
* [Install MongoDB Community Edition on Ubuntu — MongoDB Manual 3.2](ubuntu-mongo.md#install-mongodb-community-edition-on-ubuntu-—-mongodb-manual-32)  

##### Resources

* [How To Run a Secure MongoDB Server with OpenVPN and Docker on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-run-a-secure-mongodb-server-with-openvpn-and-docker-on-ubuntu-16-04)
* [Data Model Design](https://docs.mongodb.com/manual/core/data-model-design/)
* [mongoexport](https://docs.mongodb.com/manual/reference/program/mongoexport/)


###### GUI

* [MongoDB Compass GUI](https://docs.mongodb.com/compass/current/)
* [MongoClient](https://github.com/mongoclient/mongoclient)
* [Mongotron](https://github.com/officert/mongotron)
* [Mongo Express](https://github.com/mongo-express/mongo-express)
* [RoboMongo](https://robomongo.org/)
* [Studio3T](https://github.com/Studio3T/robomongo)

###### Hosted

* [mongodb Atlas](https://cloud.mongodb.com)
* [mLab](https://mlab.com/)
* [on AWS](http://docs.aws.amazon.com/quickstart/latest/mongodb/welcome.html)


##### My MongoDB

```
// shell
$ mongo

// Print a list of all databases on the server.
> show dbs
// create user
> db.createUser({user:"username",pwd:"Password", roles:[{role:"userAdminAnyDatabase",db:"admin"}]})
> use user

$ mongo --port 27017 -u "user" -p "password" --authenticationDatabase "database"


//Add SSL to mongodb
$ sudo mkdir /etc/ssl/mongodb/
$ cd /etc/ssl/mongodb/
$ sudo openssl req -new -x509 -days 365 -out mongodb-server-cert.crt -keyout mongodb-server-cert.key

	Enter PEM pass phrase:
	Common Name (e.g. server FQDN or YOUR name) []: mongodb_server_private_ip

$ sudo bash -c 'cat mongodb-server-cert.key mongodb-server-cert.crt > mongodb-server.pem'
$ sudo openssl req -new -x509 -days 365 -out mongodb-client-cert.crt -keyout mongodb-client-cert.key
$ sudo bash -c 'cat mongodb-client-cert.key mongodb-client-cert.crt > mongodb-client.pem'

//connect to client with SSL
$ mongo --ssl --sslCAFile /etc/ssl/mongodb/mongodb-server.pem \
--sslPEMKeyFile /etc/ssl/mongodb/mongodb-client.pem \
--sslPEMKeyPassword (PEM Passphrase) \
--host 127.0.0.1 --port 27017 \
--u "user" -p "passowrd" --authenticationDatabase "database"


//mongdb.conf
security:
  authorization: enabled
net:
  port: 27017
  bindIp: 127.0.0.1
  // add access from cluster
  bindIp: [IP of server]
  // add SSL
  ssl:
       mode: requireSSL
       PEMKeyFile: /etc/ssl/mongodb/mongodb-server.pem
       CAFile: /etc/ssl/mongodb/mongodb-client.pem
       PEMKeyPassword: mongodb_server_test_ssl

storage:
	dbPath: /var/lib/mongodb
	journal:
		enabled: true

```



===============================
``mongo`` Shell Quick Reference
===============================
[Source](https://github.com/mongodb/docs/blob/master/source/reference/mongo-shell.txt)

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

``mongo`` Shell Command History
-------------------------------

You can retrieve previous commands issued in the :program:`mongo` shell
with the up and down arrow keys. Command history is stored in
``~/.dbshell`` file. See :ref:`.dbshell <mongo-dbshell-file>` for more
information.

Command Line Options
--------------------

The :program:`mongo` shell can be started with numerous options. See
:doc:`mongo shell </reference/program/mongo>` page for details on all
available options.

The following table displays some common options for :program:`mongo`:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Option
     - Description

   * - :option:`--help <mongo --help>`
     - Show command line options

   * - :option:`--nodb <mongo --nodb>`

     - Start :program:`mongo` shell without connecting to a database.

       To connect later, see :ref:`mongo-shell-new-connections`.

   * - :option:`--shell <mongo --shell>`

     - Used in conjunction with a JavaScript file (i.e.
       :ref:`\<file.js\> <mongo-shell-file>`) to continue in the
       :program:`mongo` shell after running the JavaScript file.

       See :ref:`JavaScript file <mongo-shell-javascript-file>` for an
       example.

.. _command-helpers:

Command Helpers
---------------

The :program:`mongo` shell provides various help. The following table
displays some common help methods and commands:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Help Methods and Commands
     - Description

   * - ``help``

     - Show help.

   * - :method:`db.help()`

     - Show help for database methods.

   * - :method:`db.\<collection\>.help() <db.collection.help>`

     - Show help on collection methods. The ``<collection>`` can be the
       name of an existing collection or a non-existing collection.

   * - ``show dbs``

     - Print a list of all databases on the server.

   * - ``use <db>``

     - Switch current database to ``<db>``. The :program:`mongo` shell
       variable ``db`` is set to the current database.

   * - ``show collections``

     - Print a list of all collections for current database

   * - ``show users``

     - Print a list of users for current database.

   * - ``show roles``

     - Print a list of all roles, both user-defined and built-in, for
       the current database.

   * - ``show profile``

     - Print the five most recent operations that took 1 millisecond or
       more. See documentation on the :doc:`database profiler
       </tutorial/manage-the-database-profiler>` for more information.

   * - ``show databases``

     - Print a list of all available databases.

   * - ``load()``

     - Execute a JavaScript file. See
       :doc:`/tutorial/write-scripts-for-the-mongo-shell`
       for more information.

Basic Shell JavaScript Operations
----------------------------------

The :program:`mongo` shell provides a
:doc:`JavaScript API </reference/method>` for database operations.

In the :program:`mongo` shell, ``db`` is the variable that references
the current database. The variable is automatically set to the default
database ``test`` or is set when you use the ``use <db>`` to switch
current database.

The following table displays some common JavaScript operations:

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - JavaScript Database Operations
     - Description

   * - :method:`db.auth()`

     - If running in secure mode, authenticate the user.

   * - ``coll = db.<collection>``

     - Set a specific collection in the current database to a variable
       ``coll``, as in the following example:

       .. code-block:: javascript

          coll = db.myCollection;

       You can perform operations on the ``myCollection`` using the
       variable, as in the following example:

       .. code-block:: javascript

          coll.find();

   * - :method:`db.collection.find()`

     - Find all documents in the collection and returns a cursor.

       See the :method:`db.collection.find()` and
       :doc:`/tutorial/query-documents` for more information and
       examples.

       See :doc:`/tutorial/iterate-a-cursor` for information on
       cursor handling in the :program:`mongo` shell.

   * - :method:`db.collection.insertOne()`

     - Insert a new document into the collection.

   * - :method:`db.collection.insertMany()`

     - Insert multiple new documents into the collection.

   * - :method:`db.collection.updateOne()`

     - Update a single existing document in the collection.

   * - :method:`db.collection.updateMany()`

     - Update multiple existing documents in the collection.

   * - :method:`db.collection.save()`

     - Insert either a new document or update an existing document in
       the collection.

   * - :method:`db.collection.deleteOne()`

     - Delete a single document from the collection.

   * - :method:`db.collection.deleteMany()`

     - Delete documents from the collection.

   * - :method:`db.collection.drop()`

     - Drops or removes completely the collection.

   * - :method:`db.collection.createIndex()`

     - Create a new index on the collection if the index does not
       exist; otherwise, the operation has no effect.

   * - :method:`db.getSiblingDB()`

     - Return a reference to another database using this same
       connection without explicitly switching the current database.
       This allows for cross database queries.

For more information on performing operations in the shell, see:

- :doc:`/crud`

- :ref:`js-administrative-methods`

Keyboard Shortcuts
------------------

The :program:`mongo` shell provides most keyboard shortcuts similar to
those found in the ``bash`` shell or in Emacs. For some functions
:program:`mongo` provides multiple key bindings, to accommodate
several familiar paradigms.

The following table enumerates the keystrokes supported by the
:program:`mongo` shell:

.. list-table::
   :header-rows: 1

   * - **Keystroke**
     - **Function**
   * - Up-arrow
     - previous-history
   * - Down-arrow
     - next-history
   * - Home
     - beginning-of-line
   * - End
     - end-of-line
   * - Tab
     - autocomplete
   * - Left-arrow
     - backward-character
   * - Right-arrow
     - forward-character
   * - Ctrl-left-arrow
     - backward-word
   * - Ctrl-right-arrow
     - forward-word
   * - Meta-left-arrow
     - backward-word
   * - Meta-right-arrow
     - forward-word
   * - Ctrl-A
     - beginning-of-line
   * - Ctrl-B
     - backward-char
   * - Ctrl-C
     - exit-shell
   * - Ctrl-D
     - delete-char (or exit shell)
   * - Ctrl-E
     - end-of-line
   * - Ctrl-F
     - forward-char
   * - Ctrl-G
     - abort
   * - Ctrl-J
     - accept-line
   * - Ctrl-K
     - kill-line
   * - Ctrl-L
     - clear-screen
   * - Ctrl-M
     - accept-line
   * - Ctrl-N
     - next-history
   * - Ctrl-P
     - previous-history
   * - Ctrl-R
     - reverse-search-history
   * - Ctrl-S
     - forward-search-history
   * - Ctrl-T
     - transpose-chars
   * - Ctrl-U
     - unix-line-discard
   * - Ctrl-W
     - unix-word-rubout
   * - Ctrl-Y
     - yank
   * - Ctrl-Z
     - Suspend (job control works in linux)
   * - Ctrl-H (i.e. Backspace)
     - backward-delete-char
   * - Ctrl-I (i.e. Tab)
     - complete
   * - Meta-B
     - backward-word
   * - Meta-C
     - capitalize-word
   * - Meta-D
     - kill-word
   * - Meta-F
     - forward-word
   * - Meta-L
     - downcase-word
   * - Meta-U
     - upcase-word
   * - Meta-Y
     - yank-pop
   * - Meta-[Backspace]
     - backward-kill-word
   * - Meta-<
     - beginning-of-history
   * - Meta->
     - end-of-history



Queries
-------

In the :program:`mongo` shell, perform read operations using the
:method:`~db.collection.find()` and :method:`~db.collection.findOne()`
methods.

The :method:`~db.collection.find()` method returns a cursor object
which the :program:`mongo` shell iterates to print documents on
screen. By default, :program:`mongo` prints the first 20. The
:program:`mongo` shell will prompt the user to "``Type it``" to continue
iterating the next 20 results.

The following table provides some common read operations in the
:program:`mongo` shell:

.. list-table::
   :header-rows: 1

   * - Read Operations

     - Description

   * - :method:`db.collection.find(\<query\>) <db.collection.find()>`

     - Find the documents matching the ``<query>`` criteria in the
       collection. If the ``<query>`` criteria is not specified or is
       empty (i.e ``{}`` ), the read operation selects all documents in
       the collection.

       The following example selects the documents in the ``users``
       collection with the ``name`` field equal to ``"Joe"``:

       .. code-block:: javascript

          coll = db.users;
          coll.find( { name: "Joe" } );

       For more information on specifying the ``<query>`` criteria, see
       :ref:`read-operations-query-argument`.

   * - :method:`db.collection.find(\<query\>, \<projection\>)
       <db.collection.find()>`

     - Find documents matching the ``<query>`` criteria and return just
       specific fields in the ``<projection>``.

       The following example selects all documents from the collection
       but returns only the ``name`` field and the ``_id`` field. The
       ``_id`` is always returned unless explicitly specified to not
       return.

       .. code-block:: javascript

          coll = db.users;
          coll.find( { }, { name: true } );

       For more information on specifying the ``<projection>``, see
       :ref:`read-operations-projection`.

   * - :method:`db.collection.find().sort(\<sort order\>) <cursor.sort()>`

     - Return results in the specified ``<sort order>``.

       The following example selects all documents from the collection
       and returns the results sorted by the ``name`` field in
       ascending order (``1``).  Use ``-1`` for descending order:

       .. code-block:: javascript

          coll = db.users;
          coll.find().sort( { name: 1 } );

   * - :method:`db.collection.find(\<query\>).sort(\<sort order\>)
       <cursor.sort()>`

     - Return the documents matching the ``<query>`` criteria in the
       specified ``<sort order>``.

   * - :method:`db.collection.find( ... ).limit( \<n\> ) <cursor.limit()>`

     - Limit result to ``<n>`` rows. Highly recommended if you need only
       a certain number of rows for best performance.

   * - :method:`db.collection.find( ... ).skip( \<n\> )
       <cursor.skip()>`

     - Skip ``<n>`` results.

   * - :method:`db.collection.count()`

     - Returns total number of documents in the collection.

   * - :method:`db.collection.find(\<query\>).count() <cursor.count()>`

     - Returns the total number of documents that match the query.

       The :method:`~cursor.count()` ignores :method:`~cursor.limit()` and :method:`~cursor.skip()`. For
       example, if 100 records match but the limit is 10,
       :method:`~cursor.count()` will return 100. This will be
       faster than iterating yourself, but still take time.

   * - :method:`db.collection.findOne(\<query\>) <db.collection.findOne()>`

     - Find and return a single document. Returns null if not found.

       The following example selects a single document in the ``users``
       collection with the ``name`` field matches to ``"Joe"``:

       .. code-block:: javascript

          coll = db.users;
          coll.findOne( { name: "Joe" } );

       Internally, the :method:`~db.collection.findOne()`
       method is the :method:`~db.collection.find()` method
       with a :method:`limit(1) <cursor.limit()>`.

See :doc:`/tutorial/query-documents` documentation for more information and
examples. See :doc:`/reference/operator/query` to specify other query
operators.

Error Checking Methods
----------------------

.. versionchanged:: 2.6

The :program:`mongo` shell write methods now integrates the
:doc:`/reference/write-concern` directly into the method execution rather
than with a separate :method:`db.getLastError()` method. As such, the
write methods now return a :method:`WriteResult()` object that
contains the results of the operation, including any write errors and
write concern errors.

Previous versions used :method:`db.getLastError()` and
:method:`db.getLastErrorObj()` methods to return error information.

.. _mongo-dba-helpers:
.. _mongo-shell-admin-helpers:

Administrative Command Helpers
------------------------------

The following table lists some common methods to support database
administration:

.. list-table::
   :header-rows: 1

   * - **JavaScript Database Administration Methods**
     - **Description**

   * - :method:`db.cloneDatabase(\<host\>) <db.cloneDatabase()>`

     - Clone the current database from the ``<host>`` specified. The
       ``<host>`` database instance must be in noauth mode.

   * - :method:`db.copyDatabase(\<from\>, \<to\>, \<host\>) <db.copyDatabase()>`

     - Copy the ``<from>`` database from the ``<host>`` to the ``<to>``
       database on the current server.

       The ``<host>`` database instance must be in ``noauth`` mode.

   * - :method:`db.fromColl.renameCollection(\<toColl\>)
       <db.collection.renameCollection()>`

     - Rename collection from ``fromColl`` to ``<toColl>``.

   * - :method:`db.repairDatabase()`

     - Repair and compact the current database. This operation can be
       very slow on large databases.

   * - :method:`db.getCollectionNames()`

     - Get the list of all collections in the current database.

   * - :method:`db.dropDatabase()`

     - Drops the current database.

See also :ref:`administrative database methods
<js-administrative-methods>` for a full list of methods.

Opening Additional Connections
------------------------------

You can create new connections within the :program:`mongo` shell.

The following table displays the methods to create the connections:

.. list-table::
   :header-rows: 1

   * - JavaScript Connection Create Methods

     - Description

   * - .. code-block:: javascript

          db = connect("<host><:port>/<dbname>")

     - Open a new database connection.

   * - .. code-block:: javascript

          conn = new Mongo()
          db = conn.getDB("dbname")

     - Open a connection to a new server using ``new Mongo()``.

       Use ``getDB()`` method of the connection to select a database.

See also :ref:`mongo-shell-new-connections` for more information on the
opening new connections from the :program:`mongo` shell.

Miscellaneous
-------------

The following table displays some miscellaneous methods:

.. list-table::
   :header-rows: 1

   * - **Method**
     - **Description**

   * - ``Object.bsonsize(<document>)``
     - Prints the :term:`BSON` size of a <document> in bytes

See the `MongoDB JavaScript API Documentation
<http://api.mongodb.org/js/index.html>`_ for a full list of JavaScript
methods .

Additional Resources
--------------------

Consider the following reference material that addresses the
:program:`mongo` shell and its interface:

- :program:`mongo`
- :ref:`js-administrative-methods`
- :ref:`database-commands`
- :ref:`aggregation-reference`
- :gettingstarted:`Getting Started Guide </shell>`

Additionally, the MongoDB source code repository includes a `jstests
directory <https://github.com/mongodb/mongo/tree/master/jstests/>`_
which contains numerous :program:`mongo` shell scripts.

------

## Install MongoDB on Ubuntu 16.04
[Source](https://github.com/linode/docs/blob/master/docs/databases/mongodb/install-mongodb-on-ubuntu-16-04.md)


### Add the MongoDB Repository

The `mongodb-server` package from the Ubuntu repository includes version 2.6. However, this version reached end of life in October 2016, so it should not be used in production environments. The most current version available is 3.2 and, as of this writing, the default Ubuntu repositories do not contain an updated package.

Because the Ubuntu repositories don't contain a current version, we'll need to use the MongoDB repository.

1.  Import the MongoDB public GPG key for package signing:

        sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

2.  Add the MongoDB repository to your `sources.list.d` directory:

        echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

3.  Update your repositories. This allows `apt` to read from the newly added MongoDB repo:

        sudo apt-get update

### Install MongoDB

Now that the MongoDB repository has been added, we're ready to install the latest stable version of MongoDB:

    sudo apt-get install mongodb-org

This command installs `mongodb-org`, a meta-package that includes the following:

-   `mongodb-org-server` - The standard MongoDB daemon, and relevant init scripts and configurations
-   `mongodb-org-mongos` - The MongoDB Shard daemon
-   `mongodb-org-shell` - The MongoDB shell, used to interact with MongoDB via the command line
-   `mongodb-org-tools` - Contains a few basic tools to restore, import, and export data, as well as a variety of other functions.

These packages provide a good base that will serve most use cases, and we recommend installing them all. However, if you want a more minimal installation, you can selectively install packages from the above list rather than using the `mongodb-org` metapackage.

For more information on the installation process and options, refer to the [official MongoDB installation tutorial](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

### Configure MongoDB

The configuration file for MongoDB is located at `/etc/mongod.conf`, and is written in YAML format. Most of the settings are well commented within the file. We've outlined the default options below:

- `dbPath` indicates where the database files will be stored (`/var/lib/mongodb` by default)
- `systemLog` specifies the various logging options, explained below:
    - `destination` tells MongoDB whether to store the log output as a file or syslog
    - `logAppend` specifies whether to append new entries to the end of an existing log when the daemon restarts (as opposed to creating a backup and starting a new log upon restarting)
    - `path` tells the daemon where to send its logging information (`/var/log/mongodb/mongod.log` by default)
- `net` specifies the various network options, explained below:
    - `port` is the port on which the MongoDB daemon will run
    - `bindIP` specifies the IP addresses MongoDB to which binds, so it can listen for connections from other applications

These are only a few basic configuration options that are set by default.

We **strongly** recommend uncommenting the `security` section and adding the following:

{: .file-excerpt}
/etc/mongod.conf
:   ~~~ conf
    security:
      authorization: enabled
    ~~~

The `authorization` option enables [role-based access control](https://docs.mongodb.com/manual/core/authorization/) for your databases. If no value is specified, any user will have the ability to modify any database. We'll explain how to create database users and set their permissions later in this guide.

For more information on how to customize these and other values in your configuration file, refer to the [official MongoDB configuration tutorial](https://docs.mongodb.com/manual/reference/configuration-options/).

After making changes to the MongoDB configuration file, restart the service as shown in the following section.

## Start and Stop MongoDB

To start, restart, or stop the MongoDB service, issue the appropriate command from the following:

    sudo systemctl start mongod
    sudo systemctl restart mongod
    sudo systemctl stop mongod

You can also enable MongoDB to start on boot:

    sudo systemctl enable mongod

## Create Database Users

If you enabled role-based access control in the [Configure MongoDB](#configure-mongodb) section, create a user administrator with credentials for use on the database:

1.  Open the `mongo` shell:

        mongo

2.  By default, MongoDB connects to a database called `test`. Before adding any users, create a database to store user data for authentication:

        use admin

3.  Use the following command to create an administrative user with the ability to create other users on any database. For better security, change the values `mongo-admin` and `password`:

        db.createUser({user: "mongo-admin", pwd: "password", roles:[{role: "userAdminAnyDatabase", db: "admin"}]})

    Keep these credentials in a safe place for future reference. The output will display all the information written to the database except the password:

        Successfully added user: {
            "user" : "mongo-admin",
            "roles" : [
                    {
                        "role" : "userAdminAnyDatabase",
                        "db" : "admin"
                    }
            ]
        }

4.  Exit the mongo shell:

        quit()

5.  Test your connection to MongoDB with the credentials created in Step 3, using the `admin` database for authentication:

        mongo -u mongo-admin -p --authenticationDatabase admin

    The `-u`, `-p`, and `--authenticationDatabase` options in the above command are required in order to authenticate connections to the shell. Without authentication, the MongoDB shell can be accessed but will not allow connections to databases.

    The `mongo-admin` user created in Step 3 is purely administrative based on the roles specified. It is defined as an administrator of user for all databases, but does not have any database permissions itself. You may use it to create additional users and define their roles. If you are using multiple applications with MongoDB, set up different users with custom permissions for their corresponding databases.

6.  As the `mongo-admin` user, create a new database to store regular user data for authentication. The following example calls this database `user-data`:

        use user-data

7.  Permissions for different databases are handled in separate `roles` objects. This example creates the user, `example-user`, with read-only permissions for the `user-data` database and has read and write permissions for the `exampleDB` database that we'll create in the [Manage Data and Collections](#manage-data-and-collections) section below.

    Create a new, non-administrative user to enter test data. Change both `example-user` and `password` to something relevant and secure:

        db.createUser({user: "example-user", pwd: "password", roles:[{role: "read", db: "user-data"}, {role:"readWrite", db: "exampleDB"}]})

    To create additional users, repeat Steps 6 and 7 as the administrative user, creating new usernames, passwords and roles by substituing the appropriate values.

8.  Exit the mongo shell:

        quit()

For more information on access control and user management, as well as other tips on securing your databases, refer to the [MongoDB Security Documentation](https://docs.mongodb.org/v3.2/security).

## Manage Data and Collections

Much of MongoDB's popularity comes from its ease of integration. Interactions with databases are done via JavaScript methods, but [drivers for other languages](http://docs.mongodb.org/ecosystem/drivers/) are available. This section will demonstrate a few basic features, but we encourage you to do further research based on your specific use case.

1.  Open the MongoDB shell using the `example-user` we created above:

        mongo -u example-user -p --authenticationDatabase user-data

2.  Create a new database. This example calls it `exampleDB`:

        use exampleDB

    Make sure that this database name corresponds with the one for which the user has read and write permissions (we added these permissions in Step 7 of the previous section).

    To show the name of the current working database, run the `db` command.

3.  Create a new *collection* called `exampleCollection`:

        db.createCollection("exampleCollection", {capped: false})

    If you're not familiar with MongoDB terminology, you can think of a collection as analogous to a table in a relational database management system. For more information on creating new collections, see the MongoDB documentation on the [db.createCollection() method](https://docs.mongodb.com/v3.2/reference/method/db.createCollection/).

    {: .note}
    > Collection names should not include certain punctuation such as hyphens. However, exceptions may not be raised until you attempt to use or modify the collection. For more information, refer to MongoDB's [naming restrictions](https://docs.mongodb.com/manual/reference/limits/#naming-restrictions).

4.  Create sample data for entry into the test database. MongoDB accepts input as *documents* in the form of JSON objects such as those below. The `a` and `b` variables are used to simplify entry; objects can be inserted directly via functions as well.

        var a = { name : "John Doe",  attributes: { age : 30, address : "123 Main St", phone : 8675309 }}
        var b = { name : "Jane Doe",  attributes: { age : 29, address : "321 Main Rd", favorites : { food : "Spaghetti", animal : "Dog" } }}

    Note that documents inserted into a collection need not have the same schema, which is one of many benefits of using a NoSQL database.

5.  Insert the data into `exampleCollection`, using the `insert` method:

        db.exampleCollection.insert(a)
        db.exampleCollection.insert(b)

    The output for each of these operations will show the number of objects successfully written to the current working database:

        WriteResult({ "nInserted" : 1 })

6.  Confirm that the `exampleCollection` collection was properly created:

        show collections

    The output will list all collections containing data within the current working database:

        exampleCollection

7.  View unfiltered data in the `exampleCollection` collection using the `find` method. This returns up to the first 20 documents in a collection, if a query is not passed:

        db.exampleCollection.find()

    The output will resemble the following:

        { "_id" : ObjectId("571a3e7507d0fcd78baef08f"), "name" : "John Doe" }
        { "_id" : ObjectId("571a3e8707d0fcd78baef090"), "age" : 30 }

    You may notice the objects we entered are preceded by `_id` keys and `ObjectId` values. These are unique indexes generated by MongoDB when an `_id` value is not explicitly defined. `ObjectId` values can be used as primary keys when entering queries, although for ease of use, you may wish to create your own index as you would with any other database system.

    The `find` method can also be used to search for a specific document or field by entering a search term parameter (in the form of an object) rather than leaving it empty. For example:

        db.exampleCollection.find({"name" : "John Doe"})

    Running the command above returns a list of documents containing the `{"name" : "John Doe"}` object.

## Additional MongoDB Functionality

As noted above, MongoDB has an available collection of language-specific drivers that can be used to interact with your databases from within non-JavaScript applications. One advantage these drivers provide is the ability to allow applications written in different languages to use the same database without the strict need for an object data mapper (ODM). If you do want to use an object data mapper, however, many well-supported ODMs are available.

The `mongodb-org-tools` package we installed also includes several other tools such as `mongodump` and `mongorestore` for creating and restoring backups and snapshots, as well as `mongoimport` and `mongoexport` for importing and exporting content from extended JSON, or supported CSV or TSV files.

To view the available options or how to use a particular method, append `.help()` to the end of your commands. For example, to see a list of options for the `find` method in Step 6 of [Manage Data and Collections](#manage-data-and-collections):

    db.exampleCollection.find().help()




# How to Install MongoDB on Ubuntu 16.04
[Source](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)

### Introduction

MongoDB is a free and open-source NoSQL document database used commonly in modern web applications. This tutorial will help you set up MongoDB on your server for a production application environment.

As of publication time, the official Ubuntu 16.04 MongoDB packages have not yet been updated to use the new `systemd` init system [which is enabled by default on Ubuntu 16.04][1]. Running MongoDB using those packages on a clean Ubuntu 16.04 server involves following an additional step to configure MongoDB as a `systemd` service that will automatically start on boot.  

## Prerequisites

To follow this tutorial, you will need:

## Step 1 — Adding the MongoDB Repository

MongoDB is already included in Ubuntu package repositories, but the official MongoDB repository provides most up-to-date version and is the recommended way of installing the software. In this step, we will add this official repository to our server.

Ubuntu ensures the authenticity of software packages by verifying that they are signed with GPG keys, so we first have to import they key for the official MongoDB repository.

        * sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927


After successfully importing the key, you will see:

Output


    gpg: Total number processed: 1
    gpg:               imported: 1  (RSA: 1)


Next, we have to add the MongoDB repository details so `apt` will know where to download the packages from.

Issue the following command to create a list file for MongoDB.

        * echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list


After adding the repository details, we need to update the packages list.

## Step 2 — Installing and Verifying MongoDB

Now we can install the MongoDB package itself.

        * sudo apt-get install -y mongodb-org


This command will install several packages containing latest stable version of MongoDB along with helpful management tools for the MongoDB server.

In order to properly launch MongoDB as a service on Ubuntu 16.04, we additionally need to create a unit file describing the service. A _unit file_ tells `systemd` how to manage a resource. The most common unit type is a _service_, which determines how to start or stop the service, when should it be automatically started at boot, and whether it is dependent on other software to run.

We'll create a unit file to manage the MongoDB service. Create a configuration file named `mongodb.service` in the `/etc/systemd/system` directory using `nano` or your favorite text editor.

        * sudo nano /etc/systemd/system/mongodb.service


Paste in the following contents, then save and close the file.

/etc/systemd/system/mongodb.service


    [Unit]
    Description=High-performance, schema-free document-oriented database
    After=network.target

    [Service]
    User=mongodb
    ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

    [Install]
    WantedBy=multi-user.target


This file has a simple structure:

* The **Unit** section contains the overview (e.g. a human-readable description for MongoDB service) as well as dependencies that must be satisfied before the service is started. In our case, MongoDB depends on networking already being available, hence `network.target` here.
* The **Service** section how the service should be started. The `User` directive specifies that the server will be run under the `mongodb` user, and the `ExecStart` directive defines the startup command for MongoDB server.
* The last section, **Install**, tells `systemd` when the service should be automatically started. The `multi-user.target` is a standard system startup sequence, which means the server will be automatically started during boot.

Next, start the newly created service with `systemctl`.

        * sudo systemctl start mongodb


While there is no output to this command, you can also use `systemctl` to check that the service has started properly.

        * sudo systemctl status mongodb


Output


    ● mongodb.service - High-performance, schema-free document-oriented database
       Loaded: loaded (/etc/systemd/system/mongodb.service; enabled; vendor preset: enabled)
       Active: active (running) since Mon 2016-04-25 14:57:20 EDT; 1min 30s ago
     Main PID: 4093 (mongod)
        Tasks: 16 (limit: 512)
       Memory: 47.1M
          CPU: 1.224s
       CGroup: /system.slice/mongodb.service
               └─4093 /usr/bin/mongod --quiet --config /etc/mongod.conf


The last step is to enable automatically starting MongoDB when the system starts.

        * sudo systemctl enable mongodb


The MongoDB server now configured and running, and you can manage the MongoDB service using the `systemctl` command (e.g. `sudo systemctl mongodb stop`, `sudo systemctl mongodb start`).

## Step 3 — Adjusting the Firewall (Optional)

Assuming you have followed the [initial server setup tutorial][2] instructions to enable the firewall on your server, MongoDB server will be inaccessible from the internet.

If you intend to use the MongoDB server only locally with applications running on the same server, it is a recommended and secure setting. However, if you would like to be able to connect to your MongoDB server from the internet, we have to allow the incoming connections in `ufw`.

To allow access to MongoDB on its default port `27017` from everywhere, you could use `sudo ufw allow 27017`. However, enabling internet access to MongoDB server on a default installation gives unrestricted access to the whole database server.

in most cases, MongoDB should be accessed only from certain trusted locations, such as another server hosting an application. To accomplish this task, you can allow access on MongoDB's default port while specifying the IP address of another server that will be explicitly allowed to connect.

        * sudo ufw allow from your_other_server_ip/32 to any port 27017


You can verify the change in firewall settings with `ufw`.

You should see traffic to `27017` port allowed in the output.If you have decided to allow only a certain IP address to connect to MongoDB server, the IP address of the allowed location will be listed instead of _Anywhere_ in the output.

Output


    Status: active

    To                         Action      From
    --                         ------      ----
    27017                      ALLOW       Anywhere
    OpenSSH                    ALLOW       Anywhere
    27017 (v6)                 ALLOW       Anywhere (v6)
    OpenSSH (v6)               ALLOW       Anywhere (v6)



<hr>
<hr>

[Source](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/ "Permalink to Install MongoDB Community Edition on Ubuntu — MongoDB Manual 3.2")

# Install MongoDB Community Edition on Ubuntu — MongoDB Manual 3.2

## Overview[¶][1]

Use this tutorial to install MongoDB Community Edition on LTS Ubuntu Linux systems from `.deb` packages. While Ubuntu includes its own MongoDB packages, the official MongoDB Community Edition packages are generally more up-to-date.

Platform Support

MongoDB only provides packages for 64-bit LTS (long-term support) Ubuntu releases. For example, 12.04 LTS (precise), 14.04 LTS (trusty), 16.04 LTS (xenial), and so on. These packages may work with other Ubuntu releases, however, they are not supported.

## Packages[¶][2]

MongoDB provides officially supported packages in their own repository. This repository contains the following packages:

These packages conflict with the `mongodb`, `mongodb-server`, and `mongodb-clients` packages provided by Ubuntu.

The default `/etc/mongod.conf` configuration file supplied by the packages have `bind_ip` set to `127.0.0.1` by default. Modify this setting as needed for your environment before initializing a [replica set][3].

## Init Scripts[¶][4]

The `mongodb-org` package includes various [init scripts][5], including the init script `/etc/init.d/mongod`. You can use these scripts to stop, start, and restart daemon processes.

The package configures MongoDB using the `/etc/mongod.conf` file in conjunction with the init scripts. See the [Configuration File][6] reference for documentation of settings available in the configuration file.

There are no init scripts for `mongos. You can use the ``mongod`` init script to derive your own [`mongos`][7] init script for use in such environments. See the [`mongos`][7] reference for configuration details.

## Install MongoDB Community Edition[¶][8]

Note

To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0][9].

MongoDB only provides packages for 64-bit LTS (long-term support) Ubuntu releases. For example, 12.04 LTS (precise), 14.04 LTS (trusty), 16.04 LTS (xenial), and so on. These packages may work with other Ubuntu releases, however, they are not supported.

### Import the public key used by the package management system.[¶][10]

The Ubuntu package management tools (i.e. `dpkg` and `apt`) ensure package consistency and authenticity by requiring that distributors sign packages with GPG keys. Issue the following command to import the [MongoDB public GPG Key][11]:


    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927


### Create a list file for MongoDB.[¶][12]

Create the `/etc/apt/sources.list.d/mongodb-org-3.2.list` list file using the command appropriate for your version of Ubuntu:

Ubuntu 12.04


    echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list


Ubuntu 14.04


    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list


Ubuntu 16.04


    echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list


### Reload local package database.[¶][13]

Issue the following command to reload the local package database:

### Install the MongoDB packages.[¶][14]

You can install either the latest stable version of MongoDB or a specific version of MongoDB.

#### Install the latest stable version of MongoDB.[¶][15]

Issue the following command:


    sudo apt-get install -y mongodb-org


#### Install a specific release of MongoDB.[¶][16]

To install a specific release, you must specify each component package individually along with the version number, as in the following example:


    sudo apt-get install -y mongodb-org=3.2.13 mongodb-org-server=3.2.13 mongodb-org-shell=3.2.13 mongodb-org-mongos=3.2.13 mongodb-org-tools=3.2.13


If you only install `mongodb-org=3.2.13` and do not include the component packages, the latest version of each MongoDB package will be installed regardless of what version you specified.

#### Pin a specific version of MongoDB.[¶][17]

Although you can specify any available version of MongoDB, `apt-get` will upgrade the packages when a newer version becomes available. To prevent unintended upgrades, pin the package. To pin the version of MongoDB at the currently installed version, issue the following command sequence:


    echo "mongodb-org hold" | sudo dpkg --set-selections
    echo "mongodb-org-server hold" | sudo dpkg --set-selections
    echo "mongodb-org-shell hold" | sudo dpkg --set-selections
    echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
    echo "mongodb-org-tools hold" | sudo dpkg --set-selections


### (Ubuntu 16.04-only) Create systemd service file[¶][18]

Note

Follow this step ONLY if you are running Ubuntu 16.04.

Create a new file at /lib/systemd/system/mongod.service with the following contents:


    [Unit]
    Description=High-performance, schema-free document-oriented database
    After=network.target
    Documentation=https://docs.mongodb.org/manual

    [Service]
    User=mongodb
    Group=mongodb
    ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

    [Install]
    WantedBy=multi-user.target


## Run MongoDB Community Edition[¶][19]

The MongoDB instance stores its data files in `/var/lib/mongodb` and its log files in `/var/log/mongodb` by default, and runs using the `mongodb` user account. You can specify alternate log and data file directories in `/etc/mongod.conf`. See [`systemLog.path`][20] and [`storage.dbPath`][21] for additional information.

If you change the user that runs the MongoDB process, you **must** modify the access control rights to the `/var/lib/mongodb` and `/var/log/mongodb` directories to give this user access to these directories.

### Start MongoDB.[¶][22]

Issue the following command to start [`mongod`][23]:


    sudo service mongod start


### Verify that MongoDB has started successfully[¶][24]

Verify that the [`mongod`][23] process has started successfully by checking the contents of the log file at `/var/log/mongodb/mongod.log` for a line reading


    [initandlisten] waiting for connections on port


where `` is the port configured in `/etc/mongod.conf`, `27017` by default.

### Stop MongoDB.[¶][25]

As needed, you can stop the [`mongod`][23] process by issuing the following command:

### Restart MongoDB.[¶][26]

Issue the following command to restart [`mongod`][23]:


    sudo service mongod restart


### Begin using MongoDB.[¶][27]

To help you start using MongoDB, MongoDB provides [Getting Started Guides][28] in various driver editions. See [Getting Started][28] for the available editions.

Before deploying MongoDB in a production environment, consider the [Production Notes][29] document.

Later, to stop MongoDB, press `Control+C` in the terminal where the [`mongod`][23] instance is running.

## Uninstall MongoDB Community Edition[¶][30]

To completely remove MongoDB from a system, you must remove the MongoDB applications themselves, the configuration files, and any directories containing data and logs. The following section guides you through the necessary steps.

Warning

This process will _completely_ remove MongoDB, its configuration, and _all_ databases. This process is not reversible, so ensure that all of your configuration and data is backed up before proceeding.

### Stop MongoDB.[¶][31]

Stop the [`mongod`][23] process by issuing the following command:

### Remove Packages.[¶][32]

Remove any MongoDB packages that you had previously installed.


    sudo apt-get purge mongodb-org*


### Remove Data Directories.[¶][33]

Remove MongoDB databases and log files.


    sudo rm -r /var/log/mongodb
    sudo rm -r /var/lib/mongodb
