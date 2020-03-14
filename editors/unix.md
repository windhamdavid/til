# UNIX  

## Commands

#### Files

* **ls** \--- lists your files   
**ls -l** \--- lists your files in 'long format', which contains lots of useful information, e.g. the exact size of the file, who owns the file and who has the right to look at it, and when it was last modified.   
**ls -a ** \--- lists all files, including the ones whose filenames begin in a dot, which you do not always want to see.   
There are many more options, for example to list files by size, by date, recursively etc.
* **more _filename_** \--- shows the first part of a file, just as much as will fit on one screen. Just hit the space bar to see more or **q** to quit. You can use **/_pattern_** to search for a pattern.
* **emacs _filename_** \--- is an editor that lets you create and edit a file. See the [emacs page][3].
* **mv _filename1 filename2_** \--- moves a file (i.e. gives it a different name, or moves it into a different directory (see below)
* **cp _filename1 filename2_** \--- copies a file
* **rm _filename_** \--- removes a file. It is wise to use the option rm -i, which will ask you for confirmation before actually deleting anything. You can make this your default by making an [alias][4] in your .cshrc file.
* **diff _filename1 filename2_** \--- compares files, and shows where they differ
* **wc _filename_** \--- tells you how many lines, words, and characters there are in a file
* **chmod _options filename_** \--- lets you change the read, write, and execute permissions on your files. The default is that only you can look at them and change them, but you may sometimes want to change these permissions. For example, **chmod o+r _filename_** will make the file readable for everyone, and **chmod o-r _filename_** will make it unreadable for others again. Note that for someone to be able to actually look at the file the directories it is in need to be at least executable. See [help protection][5] for more details.
* File Compression
    * **gzip _filename_** \--- compresses files, so that they take up much less space. Usually text files compress to about half their original size, but it depends very much on the size of the file and the nature of the contents. There are other tools for this purpose, too (e.g. **compress**), but gzip usually gives the highest compression rate. Gzip produces files with the ending '.gz' appended to the original filename.
    * **gunzip _filename_** \--- uncompresses files compressed by gzip.
    * **gzcat _filename_** \--- lets you look at a gzipped file without actually having to gunzip it (same as **gunzip -c**). You can even print it directly, using **gzcat _filename_ | lpr**
* printing
    * **lpr _filename_** \--- print. Use the -P option to specify the printer name if you want to use a printer other than your default printer. For example, if you want to print double-sided, use 'lpr -Pvalkyr-d', or if you're at CSLI, you may want to use 'lpr -Pcord115-d'. See 'help printers' for more information about printers and their locations.
    * **lpq** \--- check out the printer queue, e.g. to get the number needed for removal, or to see how many other files will be printed before yours will come out
    * **lprm _jobnumber_** \--- remove something from the printer queue. You can find the job number by using lpq. Theoretically you also have to specify a printer name, but this isn't necessary as long as you use your default printer in the department.
    * **genscript** \--- converts plain text files into postscript for printing, and gives you some options for formatting. Consider making an alias like **alias ecop 'genscript -2 -r !* | lpr -h -Pvalkyr'** to print two pages on one piece of paper.
    * **dvips _filename_** \--- print **.dvi** files (i.e. files produced by LaTeX). You can use **dviselect** to print only selected pages. See the [LaTeX page][6] for more information about how to save paper when printing drafts.

#### Directories

Directories, like folders on a Macintosh, are used to group files together in a hierarchical structure.

* **mkdir _dirname_** \--- make a new directory
* **cd _dirname_** \--- change directory. You basically 'go' to another directory, and you will see the files in that directory when you do 'ls'. You always start out in your 'home directory', and you can get back there by typing 'cd' without arguments. 'cd ..' will get you one level up from your current position. You don't have to walk along step by step - you can make big leaps or avoid walking around by specifying [pathnames][7].
* **pwd** \--- tells you where you currently are.

#### Finding things

* **ff** \--- find files anywhere on the system. This can be extremely useful if you've forgotten in which directory you put a file, but do remember the name. In fact, if you use **ff -p** you don't even need the full name, just the beginning. This can also be useful for finding other things on the system, e.g. documentation.
* **grep _string filename(s)_** \--- looks for the string in the files. This can be useful a lot of purposes, e.g. finding the right file among many, figuring out which is the right version of something, and even doing serious corpus work. grep comes in several varieties (**grep**, **egrep**, and **fgrep**) and has a lot of very flexible options. Check out the man pages if this sounds good to you.

#### About other people

* **w** \--- tells you who's logged in, and what they're doing. Especially useful: the 'idle' part. This allows you to see whether they're actually sitting there typing away at their keyboards right at the moment.
* **who** \--- tells you who's logged on, and where they're coming from. Useful if you're looking for someone who's actually physically in the same building as you, or in some other particular location.
* **finger _username_** \--- gives you lots of information about that user, e.g. when they last read their mail and whether they're logged in. Often people put other practical information, such as phone numbers and addresses, in a file called **.plan**. This information is also displayed by 'finger'.
* **last -1 _username_** \--- tells you when the user last logged on and off and from where. Without any options, **last** will give you a list of everyone's logins.
* **talk _username_** \--- lets you have a (typed) conversation with another user
* **write _username_** \--- lets you exchange one-line messages with another user
* **elm** \--- lets you send e-mail messages to people around the world (and, of course, read them). It's not the only mailer you can use, but the one we recommend. See the [elm page][8], and find out about the departmental [ mailing lists][9] (which you can also find in /user/linguistics/helpfile).

#### About your (electronic) self

* **whoami** \--- returns your username. Sounds useless, but isn't. You may need to find out who it is who forgot to log out somewhere, and make sure *you* have logged out.
* **finger** & .plan files   
of course you can finger yourself, too. That can be useful e.g. as a quick check whether you got new mail. Try to create a useful .plan file soon. Look at other people's .plan files for ideas. The file needs to be readable for everyone in order to be visible through 'finger'. Do 'chmod a+r .plan' if necessary. You should realize that this information is accessible from anywhere in the world, not just to other people on turing.
* **passwd** \--- lets you change your password, which you should do regularly (at least once a year). See the [LRB guide][10] and/or look at [help password][11].
* **ps -u _yourusername_** \--- lists your processes. Contains lots of information about them, including the process ID, which you need if you have to kill a process. Normally, when you have been kicked out of a dialin session or have otherwise managed to get yourself disconnected abruptly, this list will contain the processes you need to kill. Those may include the shell (tcsh or whatever you're using), and anything you were running, for example emacs or elm. Be careful not to kill your current shell - the one with the number closer to the one of the ps command you're currently running. But if it happens, don't panic. Just try again :) If you're using an X-display you may have to kill some X processes before you can start them again. These will show only when you use **ps -efl**, because they're root processes.
* **kill _PID_** \--- kills (ends) the processes with the ID you gave. This works only for your own processes, of course. Get the ID by using **ps**. If the process doesn't 'die' properly, use the option -9. But attempt without that option first, because it doesn't give the process a chance to finish possibly important business before dying. You may need to kill processes for example if your modem connection was interrupted and you didn't get logged out properly, which sometimes happens.
* **quota -v** \--- show what your disk quota is (i.e. how much space you have to store files), how much you're actually using, and in case you've exceeded your quota (which you'll be given an automatic warning about by the system) how much time you have left to sort them out (by deleting or gzipping some, or moving them to your own computer).
* **du _filename_** \--- shows the disk usage of the files and directories in _filename_ (without argument the current directory is used). **du -s** gives only a total.
* **last _yourusername_** \--- lists your last logins. Can be a useful memory aid for when you were where, how long you've been working for, and keeping track of your phonebill if you're making a non-local phonecall for dialling in.  



```
du -hsx * | sort -rh | head -10

* du command -h option : display file sizes in human readable format.
* du command -s option : Show total for each argument.
* du command -x option : Skip directories. (if on different file systems)
* sort command -r option : Reverse the result of comparisons.
* sort command -h option : Compare the numbers.
* head command -10 OR -n 10 option : Displays the first 10 lines of the output.

```
find the largest files & directories on Linux per directory (cd to /path/)

    find . -regextype posix-egrep -regex ".*(rb|js)$"

Find all files ending in .rb or .js.

    find . -name "*js" -o -name "*rb"

Same as above, not using regular expressions.

    find . -regextype posix-ergep -regex ".*(rb|js)$" -exec grep -l matchNameHere {} \;

Find all files ending in .rb or .js, then search those files for 'matchNameHere'. The -l option prints the line number of the occurance. (http://www.devdaily.com/unix/edu/examples/find.shtml)

    find ~/some/directory -name "*rb" -exec basename {} \;

Find all files ending in .rb, then print a list of filenames (no paths). **Note that the '\;' is mandatory, it tells find where to stop the command execution**

####### sed

    ls *.rb | awk '{print("mv "$1" "$1)}' | sed 's/\.rb/_service\.rb/2' | /bin/sh

Batch rename all files matching a pattern, insert the `_service` before the file suffix

    find /some/path -name "*rb" -o -name "*yml" | xargs grep -sl "some_phrase" | xargs sed -i -e 's/some_phrase/replacement_phrase'

Find all files ending in *rb or *yml, then grep those files for *some_phrase*, then replace those instances using sed

    cat /some/file.txt | awk '{print "mkdir /path/to/"$0""}' | /bin/sh

Read input from file, pipe to awk to generate a system command, then execute it.

##### display file with line numbers  
    cat file -n

##### display gzipped file with line numbers  
    zcat file | cat -n

##### display file from the i. line to j. line (that is j minus i there)
    cat file | head -n j | tail -n j-i

##### remove first line of the file (efficient)
    tail -n +2 file > new_file

##### remove first line of the file (less efficient)
    sed 1d file > newfile

##### count how many lines of a file contain a pattern
    cat file | grep pattern | wc -l
    grep pattern -c file

##### select non-matching lines
    cat file | grep -v pattern

##### get the number of the first line where a pattern occur
    cat file -n | grep pattern -m 1 | cut -f1 | tr -d ' '

##### display N lines after, before, around pattern
    grep -A N pattern file
    grep -B N pattern file
    grep -C N pattern file

##### display N lines around pattern (only first appearance, useful if you know that pattern is unique)
    grep -m 1 -C N pattern file

##### adding together two (or more) files and create a new file from the result
    cat file1 file2 > newfile

##### create new compressed tar archive
    tar -zcvf archive.tar.gz dirname

##### extract from tar archive
    tar -xzf archive.tar.gz

##### view an tar archive
    tar tvf archive.tar.gz

##### extract tar.bz2
    tar jxf filename.tar.bz2

##### add user
    sudo adduser <username>

##### add group
    sudo groupadd <groupname>

##### add existing user to group
    sudo usermod -a -G <groupname> <username>

##### add a user to multiple groups
    sudo usermod -a -G <groupname1>,<groupname2>,<groupname3> <username>

##### view user's group assignemnts
    id <username>
    groups <username>

##### make a directory accessible for a group
##### change group of all files/directories recursively
    sudo chgrp -R <groupname> <directory>
##### add write permissions to group
    sudo chmod -R g+w <directory>
##### set "GID", so that all new files and directories created under <directory> are owned by the group
    sudo find <directory> -type d -exec chmod 2775 {} \;

##### randomize lines of a big file memory efficiently
    uuid -v 4 -n $(wc -l < lines.txt) | paste - lines.txt | sort | cut -f2 > lines_random.txt

##### change hostname
    sudo vim /etc/hostname -> change old name to new name
    sudo vim /etc/hosts -> change old name to new name
    sudo /etc/init.d/hostname restart

##### search a device for bad blocks
    sudo badblocks -v <device_name>
    sudo badblocks -v /dev/md2

##### renice (reset priority of processgroup): niceness: 0 (normal) - 19 (low)
    sudo renice -n <niceness> -g <pid>

##### count and filter csv files
##### remove header (first line), the separator in csv file is ","; count the rows where the value in the second column is above a threshold value (4.5)
    tail -n +2 file.csv | awk -F "," '$2 >= <my threshold value>' | wc -l

##### pg_dump ssh tunnel
    ssh -o "Compression=no" mydbserver "pg_dump -Fc -Z9 -U postgres mydb" > mydb.dump

##### generate random password
##### of course there are tons of ways to do this
##### you can replace 32 with the desired password length
    < /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-32};echo;

##### force the user to change their password upon next login
    sudo chage -d 0 <username>

##### server shutdown
    sudo shutdown -h now
    sudo poweroff

##### encrypt/decrypt file with openssl
    openssl aes-256-cbc -salt -in <file> -out <encrypted_file> -k <passphrase>
    openssl aes-256-cbc -d -in <encrypted_file> -out <file> -k <passphrase>

##### generate your dhparam.pem file
    openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048

##### search for pattern in codebase
    grep -inIEr --color=ALWAYS "<pattern_to_search>" .

##### copy directory tree recursively without overwrite
    rsync -a -v --ignore-existing <src_dir> <dst_dir>

##### find processes with most memory usage
    ps -e -orss,%mem,cputime,%cpu,pid,args | sort -b -k1,1n | pr -TW$COLUMNS

##### find processes with maximum file descriptors
    lsof -Fpcn | nawk '/^p/ { pid=substr($0,2) } /^c/ { cmd=substr($0,2) } /^n/ { fd[cmd"["pid"]"]++ } END  { for (cc in fd) printf("%-30s %i\n",cc,fd[cc]) } ' | sort -n -k 2 | tail -30
