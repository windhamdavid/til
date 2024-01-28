
**23/11/12** - Rarely using MongoDB in production so I'm removing the documentation here due to MDX errors in the markdown and some of it is outdated. I'll leave the notes just in case.

**18/10/11** - Ran a > brew upgrade which caused mongodb issues, so I had to downgrade my localhost version in order to repair the databases to bring them up to version 4.0.2 see [https://docs.mongodb.com/manual/release-notes/4.0-upgrade-standalone/](https://docs.mongodb.com/manual/release-notes/4.0-upgrade-standalone/)



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
