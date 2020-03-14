# PHP  

* [https://www.php.net/manual/en/](https://www.php.net/manual/en/)
* [https://www.php.net/manual/en/langref.php](https://www.php.net/manual/en/langref.php)
* [https://www.php.net/manual/en/funcref.php](https://www.php.net/manual/en/funcref.php)

---
January 2020 Notes:  
PHP 7.4.2 (cli) (built: Jan 22 2020 06:30:58) ( NTS )  
[Migrating from PHP 7.3.x to PHP 7.4.x](https://www.php.net/manual/en/migration74.php)  
[PHP 7.4 Release Notes](https://www.php.net/releases/7_4_0.php)  

[Homebrew moved PHP to core and extensions are now through pecl](https://grrr.tech/posts/installing-homebrew-php-extensions-with-pecl/)  
```
david@macs:~ » php --ini  
Configuration File (php.ini) Path: /usr/local/etc/php/7.4  
Loaded Configuration File:         /usr/local/etc/php/7.4/php.ini  
extension=/usr/local/Cellar/php/7.4.2/pecl/20190902/imagick.so  
extension=/usr/local/Cellar/php/7.4.2/pecl/20190902/mcrypt.so  
extension=/usr/local/Cellar/php/7.4.2/pecl/20190902/redis.so  
zend_extension=/usr/local/Cellar/php/7.4.2/pecl/20190902/xdebug.so  

LoadModule deflate_module libexec/apache2/mod_deflate.so  
LoadModule expires_module libexec/apache2/mod_expires.so  
LoadModule rewrite_module libexec/apache2/mod_rewrite.so  

david@macs:~ » pecl list  
imagick 3.4.4   stable  
mcrypt  1.0.3   stable  
redis   5.1.1   stable  
xdebug  2.9.1   stable  
```

September 2019 Notes - PHP 7.3.9 (cli) (built: Sep 14 2019 18:07:55) ( NTS )   
[PHP 7.3 Changelog](https://www.php.net/ChangeLog-7.php#7.3.0)  
[Migrating to 7.3](https://www.php.net/manual/en/migration73.php)  
Configuration File (php.ini) Path: /usr/local/etc/php/7.3  
Loaded Configuration File:         /usr/local/etc/php/7.3/php.ini  
Scan for additional .ini files in: /usr/local/etc/php/7.3/conf.d  
Additional .ini files parsed:      /usr/local/etc/php/7.3/conf.d/ext-opcache.ini,
/usr/local/etc/php/7.3/conf.d/imagick.ini,
/usr/local/etc/php/7.3/conf.d/mcrypt.ini  

[Homebrew](/localhost/brew.md) notes:  
had to remove PECL symlink in /usr/local/Cellar/php/7.3.9_1  
had to specify paths of imagick and mcrypt:  
;imagick extension="/usr/local/Cellar/php/7.3.9_1/pecl/20180731/imagick.so"  
;mcrypt extension="/usr/local/Cellar/php/7.3.9_1/pecl/20180731/mcrypt.so"  

---
