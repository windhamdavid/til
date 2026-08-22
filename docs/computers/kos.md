# Kosmo 🏛️⚕️

**25/11/08** - I named this one Kosmo as a reference to the Greek island Kos ( [https://en.wikipedia.org/wiki/Kos](https://en.wikipedia.org/wiki/Kos) ) because Hippocrates of Kos - [https://en.wikipedia.org/wiki/Hippocrates](https://en.wikipedia.org/wiki/Hippocrates) was 'the father of medicine'. It's physically in Virginia, but the internet is also kinda cosmic 🪐.

## Log

- **26/08/22** - configured analytics to share and create reports across every site on the box. 

## Notes

```sh
██████@stu🪩:~ » ssh █████@██████████████
Enter passphrase for key '/Users/████████/.ssh/██████████████': 
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.14.0-1014-azure x86_64)
                     .+#######+.               
                  #####...#...#####            
               .#######...#...#######.         
              #########...#...#########        
             ##########...#...##########       
            ###########...#...###########      
           .############..#..############.     
           #............#-#-#............#     
           ###############################     
           #............#-#-#............#     
           .############..#..############.     
            ###########...#...###########      
             ##########...#...##########       
              #########...#...#########        
               .#######...#...#######.         
                  #####...#...#####            
                     .+#######+.               

 System information as of Sat Nov  8 11:05:00 EST 2025
  System load:  0.6                 Processes:             225
  Usage of /:   41.4% of 246.94GB   Users logged in:       0
  Memory usage: 4%                  IPv4 address for eth0: ███.███.███.███
  Swap usage:   0%
Expanded Security Maintenance for Applications is enabled.
0 updates can be applied immediately.
Last login: Sat Nov  8 10:56:18 2025 from ███.███.███.███
█████████@██████████████🏛️:~ » lscpu
Architecture:                x86_64
  CPU op-mode(s):            32-bit, 64-bit
  Address sizes:             46 bits physical, 48 bits virtual
  Byte Order:                Little Endian
CPU(s):                      8
  On-line CPU(s) list:       0-7
Vendor ID:                   GenuineIntel
  Model name:                Intel(R) Xeon(R) CPU E5-2673 v4 @ 2.30GHz
█████████@██████████████🏛️:~ » free -h
               total        used        free      shared  buff/cache   available
Mem:           125Gi       3.4Gi        21Gi       264Mi       101Gi       122Gi
```


## System

### Development

### Software

#### Analytics

**Log import** `misc/log-analytics/import_logs.py`, builds visits web-server logs with no JavaScript at all.

**cron's PATH is `/usr/bin:/bin`, and nginx lives in `/usr/sbin`.** So `nginx -s reopen` fails
with "command not found" under cron while working perfectly from an interactive sudo — and it
fails *after* the log has been moved aside. Set `PATH` explicitly at the top of any script cron
runs. Found by using the panel's **Run Now** rather than waiting for the schedule to fire, which
is worth doing on every new scheduled task for exactly this reason.

**Import exactly once, or not at all.** `import_logs.py` has no memory of what it has read; run
it twice on one file and every visit is counted twice with no error. So the script moves the log
aside, tells nginx to reopen, and **waits until no process still holds the moved file** before
reading it — draining workers can keep a descriptor open for minutes on HTTP/2 keepalive. A fixed
`sleep` is not enough. It also refuses outright if the log contains anything outside its intended
scope, so a broken config stops the import instead of importing the wrong data.


#### notes

- **`MultiSites.getAll` omits a site with no archived data for the period** — absent, not zero.
  Both conditions matter: a site that exists but has no visits is missing, and a site with live
  visits is *still* missing until the next archive run. `Live.getCounters` reads the raw tables, so
  the pair distinguishes "not archived yet" from "not tracking".
- **Excluded IPs are global as well as per-site**, on separate admin screens. Clearing a per-site
  list does nothing if the address is in the global one — which presents as "tracking is broken"
  when it is working exactly as configured. Exclusion matches the full IP *before* anonymisation,
  so IP masking does not break it.
- **Today's archive is considered fresh for 900s.** Re-archiving inside that window is skipped and
  reports look stale. Scheduling the import ten minutes before the archive cron avoids ever
  meeting this.
- **A new site's default report date is `yesterday`**, so day one looks empty until you move the
  date picker.







  

