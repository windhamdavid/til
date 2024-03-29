

[http://icecast.org/](http://icecast.org/)

---

**23.02.08** - Since I'm migrating this to a new server, I noticed that I had installed both 18.04 and 18.10 versions in /etc/apt/sources.list.d/icecast.list. I removed one version and updated the key with:  

```bash
wget -qO - http://icecast.org/multimedia-obs.key | sudo apt-key add -
```

**20/02/21** - The Icecast2 gpg package key expired last month and the one available at Xiph hadn't been updated. I used the one from OpenSuse and installed the new key via:  

```bash
wget -qO - https://download.opensuse.org/repositories/multimedia:/xiph/xUbuntu_18.04/Release.key  | sudo apt-key add -
```

**11/08/18** - I'll need this for later. A server update to Icecast overwrote ( because I was in a rush and didn't pay attention for the first couple of inputs ) some of the xml files I was using to pull data into my broadcast page @ [radio.davidawindham.com](http://radio.davidawindham.com)

```bash

Setting up icecast2 (2.4.4-1) ...

Configuration file '/etc/icecast2/web/status.xsl'
 ==> Modified (by you or by a script) since installation.
 ==> Package distributor has shipped an updated version.
   What would you like to do about it ?  Your options are:
    Y or I  : install the package maintainer's version
    N or O  : keep your currently-installed version
      D     : show the differences between the versions
      Z     : start a shell to examine the situation
 The default action is to keep your current version.
*** status.xsl (Y/I/N/O/D/Z) [default=N] ? y
Installing new version of config file /etc/icecast2/web/status.xsl ...
Installing new version of config file /etc/icecast2/web/server_version.xsl ...
Installing new version of config file /etc/icecast2/web/auth.xsl ...
Installing new version of config file /etc/icecast2/admin/updatemetadata.xsl ...

Configuration file '/etc/icecast2/admin/listclients.xsl'
 ==> Modified (by you or by a script) since installation.
 ==> Package distributor has shipped an updated version.
   What would you like to do about it ?  Your options are:
    Y or I  : install the package maintainer's version
    N or O  : keep your currently-installed version
      D     : show the differences between the versions
      Z     : start a shell to examine the situation
 The default action is to keep your current version.
*** listclients.xsl (Y/I/N/O/D/Z) [default=N] ? n
Installing new version of config file /etc/icecast2/admin/manageauth.xsl ...
Installing new version of config file /etc/icecast2/admin/response.xsl ...

Configuration file '/etc/icecast2/admin/listmounts.xsl'
 ==> Modified (by you or by a script) since installation.
 ==> Package distributor has shipped an updated version.
   What would you like to do about it ?  Your options are:
    Y or I  : install the package maintainer's version
    N or O  : keep your currently-installed version
      D     : show the differences between the versions
      Z     : start a shell to examine the situation
 The default action is to keep your current version.
*** listmounts.xsl (Y/I/N/O/D/Z) [default=N] ? y
Installing new version of config file /etc/icecast2/admin/listmounts.xsl ...
Installing new version of config file /etc/icecast2/admin/moveclients.xsl ...

Configuration file '/etc/icecast2/admin/stats.xsl'
 ==> Modified (by you or by a script) since installation.
 ==> Package distributor has shipped an updated version.
   What would you like to do about it ?  Your options are:
    Y or I  : install the package maintainer's version
    N or O  : keep your currently-installed version
      D     : show the differences between the versions
      Z     : start a shell to examine the situation
 The default action is to keep your current version.
*** stats.xsl (Y/I/N/O/D/Z) [default=N] ? n

Configuration file '/etc/icecast2/icecast.xml'
 ==> Modified (by you or by a script) since installation.
 ==> Package distributor has shipped an updated version.
   What would you like to do about it ?  Your options are:
    Y or I  : install the package maintainer's version
    N or O  : keep your currently-installed version
      D     : show the differences between the versions
      Z     : start a shell to examine the situation
 The default action is to keep your current version.
*** icecast.xml (Y/I/N/O/D/Z) [default=N] ?  
```
