

- [https://goaccess.io/](https://goaccess.io/)
- [https://github.com/allinurl/goaccess](https://github.com/allinurl/goaccess)
- [https://goaccess.io/man](https://goaccess.io/man)

```
    $ echo "deb http://deb.goaccess.io/ $(lsb_release -cs) main" | sudo tee -a /etc/apt/sources.list.d/goaccess.list
    $ wget -O - https://deb.goaccess.io/gnugpg.key | sudo apt-key add -
    $ sudo apt-get update
    $ sudo apt-get install goaccess

```
