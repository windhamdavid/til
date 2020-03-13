#htop  

#### **NAME**

       htop - interactive process viewer

#### **SYNOPSIS**

       **htop** **\[**\-dChusv\]

#### **DESCRIPTION**

       Htop is a free (GPL) ncurses-based process viewer for Linux.

       It is similar to top, but allows you to scroll vertically and horizontally, so you can see
       all the processes running on the system, along with their full command lines, as  well  as
       viewing  them  as  a  process tree, selecting multiple processes and acting on them all at
       once.

       Tasks related to processes (killing, renicing) can be done without entering their PIDs.

#### **COMMAND-LINE** **OPTIONS**

       Mandatory arguments to long options are mandatory for short options too.

       **\-d** **\--delay=DELAY**
              Delay between updates, in tenths of seconds

       **\-C** **\--no-color** **\--no-colour**
              Start htop in monochrome mode

       **\-h** **\--help**
              Display a help message and exit

       **\-p** **\--pid=PID,PID...**
              Show only the given PIDs

       **\-s** **\--sort-key** **COLUMN**
              Sort by this column (use --sort-key help for a column list)

       **\-u** **\--user=USERNAME**
              Show only the processes of a given user

       **\-v** **\--version**
              Output version information and exit

#### **INTERACTIVE** **COMMANDS**

       The following commands are supported while in htop:

       **Up,** **Alt-k**
            Select (highlight) the previous process in the  process  list.  Scroll  the  list  if
            necessary.

       **Down,** **Alt-j**
            Select  (highlight)  the  next  process  in  the  process  list.  Scroll  the list if
            necessary.

       **Left,** **Alt-h**
            Scroll the process list left.

       **Right,** **Alt-l**
            Scroll the process list right.

       **PgUp,** **PgDn**
            Scroll the process list up or down one window.

       **Home** Scroll to the top of the process list and select the first process.

       **End**  Scroll to the bottom of the process list and select the last process.

       **Ctrl-A,** **^**
            Scroll left to the beginning of the process entry (i.e. beginning of line).

       **Ctrl-E,** **$**
            Scroll right to the end of the process entry (i.e. end of line).

       **Space**
            Tag or untag a process. Commands that can operate on multiple processes, like "kill",
            will  then  apply  over  the  list  of  tagged  processes,  instead  of the currently
            highlighted one.

       **U**    Untag all processes (remove all tags added with the Space key).

       **s**    Trace process system calls: if [strace](../man1/strace.1.html)(1) is installed, pressing this key will  attach
            it to the currently selected process, presenting a live update of system calls issued
            by the process.

       **l**    Display open files for a process: if [lsof](../man1/lsof.1.html)(1) is installed,  pressing  this  key  will
            display the list of file descriptors opened by the process.

       **F1,** **h,** **?**
            Go to the help screen

       **F2,** **S**
            Go  to  the  setup screen, where you can configure the meters displayed at the top of
            the screen, set various display options, choose among color schemes, and select which
            columns are displayed, in which order.

       **F3,** **/**
            Incrementally  search the command lines of all the displayed processes. The currently
            selected (highlighted) command will  update  as  you  type.  While  in  search  mode,
            pressing F3 will cycle through matching occurrences.

       **F4,** **\\**
            Incremental  process  filtering:  type  in  part  of  a process command line and only
            processes whose names match will be shown. To  cancel  filtering,  enter  the  Filter
            option again and press Esc.

       **F5,** **t**
            Tree view: organize processes by parenthood, and layout the relations between them as
            a tree. Toggling the key will switch between tree and your previously  selected  sort
            view. Selecting a sort view will exit tree view.

       **F6**   On  sorted  view,  select  a field for sorting, also accessible through < and >.  The
            current sort field is indicated by a highlight in the header.  On tree  view,  expand
            or  collapse  the current subtree. A "+" indicator in the tree node indicates that it
            is collapsed.

       **F7,** **\]**
            Increase the selected process's priority (subtract from 'nice' value).  This can only
            be done by the superuser.

       **F8,** **\[**
            Decrease the selected process's priority (add to 'nice' value)

       **F9,** **k**
            "Kill"  process:  sends  a  signal  which is selected in a menu, to one or a group of
            processes. If processes were tagged, sends the signal to all  tagged  processes.   If
            none is tagged, sends to the currently selected process.

       **F10,** **q**
            Quit

       **I**    Invert  the  sort order: if sort order is increasing, switch to decreasing, and vice-
            versa.

       **+,** **\-** When in tree view mode, expand or collapse subtree. When a subtree is collapsed a "+"
            sign shows to the left of the process name.

       **a** **(on** **multiprocessor** **machines)**
            Set CPU affinity: mark which CPUs a process is allowed to use.

       **u**    Show only processes owned by a specified user.

       **M**    Sort by memory usage (top compatibility key).

       **P**    Sort by processor usage (top compatibility key).

       **T**    Sort by time (top compatibility key).

       **F**    "Follow"  process: if the sort order causes the currently selected process to move in
            the list, make the selection bar follow it. This is useful for monitoring a  process:
            this  way,  you  can  keep a process always visible on screen. When a movement key is
            used, "follow" loses effect.

       **K**    Hide kernel threads: prevent the threads belonging the kernel to be displayed in  the
            process list. (This is a toggle key.)

       **H**    Hide user threads: on systems that represent them differently than ordinary processes
            (such as recent NPTL-based systems), this can hide threads from  userspace  processes
            in the process list. (This is a toggle key.)

       **p**    Show full paths to running programs, where applicable. (This is a toggle key.)

       **Ctrl-L**
            Refresh: redraw screen and recalculate values.

       **Numbers**
            PID search: type in process ID and the selection highlight will be moved to it.

#### **COLUMNS**

       The  following columns can display data about each process. A value of '-' in all the rows
       indicates that a column is unsupported on your system, or currently unimplemented in htop.
       The  names below are the ones used in the "Available Columns" section of the setup screen.
       If a different name is shown in htop's main screen, it is shown below in parenthesis.

       **Command**
            The full command line of the process (i.e. program name and arguments).

       **PID**  The process ID.

       **STATE** **(S)**
            The state of the process:
               **S** for sleeping (idle)
               **R** for running
               **D** for disk sleep (uninterruptible)
               **Z** for zombie (waiting for parent to read its exit status)
               **T** for traced or suspended (e.g by SIGTSTP)
               **W** for paging

       **PPID** The parent process ID.

       **PGRP** The process's group ID.

       **SESSION** **(SID)**
            The process's session ID.

       **TTY\_NR** **(TTY)**
            The controlling terminal of the process.

       **TPGID**
            The process ID of the foreground process group of the controlling terminal.

       **MINFLT**
            The number of page faults happening in the main memory.

       **CMINFLT**
            The number of minor faults for the process's waited-for children (see MINFLT above).

       **MAJFLT**
            The number of page faults happening out of the main memory.

       **CMAJFLT**
            The number of major faults for the process's waited-for children (see MAJFLT above).

       **UTIME** **(UTIME+)**
            The user CPU time, which is the amount of time the process has spent executing on the
            CPU in user mode (i.e. everything but system calls), measured in clock ticks.

       **STIME** **(STIME+)**
            The  system  CPU  time,  which  is  the amount of time the kernel has spent executing
            system calls on behalf of the process, measured in clock ticks.

       **CUTIME** **(CUTIME+)**
            The children's user CPU time, which is the amount of time  the  process's  waited-for
            children have spent executing in user mode (see UTIME above).

       **CSTIME** **(CSTIME+)**
            The  children's  system  CPU  time,  which is the amount of time the kernel has spent
            executing system calls on behalf of all the process's waited-for children (see  STIME
            above).

       **PRIORITY** **(PRI)**
            The  kernel's  internal  priority  for  the process, usually just its nice value plus
            twenty. Different for real-time processes.

       **NICE** **(NI)**
            The nice value of a process, from 19 (low priority) to -20 (high  priority).  A  high
            value  means  the  process  is  being  nice,  letting  others  have a higher relative
            priority. The usual OS permission restrictions for adjusting priority apply.

       **STARTTIME** **(START)**
            The time the process was started.

       **PROCESSOR** **(CPU)**
            The ID of the CPU the process last executed on.

       **M\_SIZE** **(VIRT)**
            The size of the virtual memory of the process.

       **M\_RESIDENT** **(RES)**
            The resident set size (text + data + stack) of the process  (i.e.  the  size  of  the
            process's used physical memory).

       **M\_SHARE** **(SHR)**
            The size of the process's shared pages.

       **M\_TRS** **(CODE)**
            The  text resident set size of the process (i.e. the size of the process's executable
            instructions).

       **M\_DRS** **(DATA)**
            The data resident set size (data + stack) of the process (i.e. the size  of  anything
            except the process's executable instructions).

       **M\_LRS** **(LIB)**
            The library size of the process.

       **M\_DT** **(DIRTY)**
            The size of the dirty pages of the process.

       **ST\_UID** **(UID)**
            The user ID of the process owner.

       **PERCENT\_CPU** **(CPU%)**
            The percentage of the CPU time that the process is currently using.

       **PERCENT\_MEM** **(MEM%)**
            The  percentage  of  memory  the  process  is currently using (based on the process's
            resident memory size, see M\_RESIDENT above).

       **USER** The username of the process owner, or the user ID if the name can't be determined.

       **TIME** **(TIME+)**
            The time, measured in clock ticks that the process has spent in user and system  time
            (see UTIME, STIME above).

       **NLWP** The number of threads in the process.

       **TGID** The thread group ID.

       **CTID** OpenVZ container ID, a.k.a virtual environment ID.

       **VPID** OpenVZ process ID.

       **VXID** VServer process ID.

       **RCHAR** **(RD\_CHAR)**
            The number of bytes the process has read.

       **WCHAR** **(WR\_CHAR)**
            The number of bytes the process has written.

       **SYSCR** **(RD\_SYSC)**
            The number of [read](../man2/read.2.html)(2) syscalls for the process.

       **SYSCW** **(WR\_SYSC)**
            The number of [write](../man2/write.2.html)(2) syscalls for the process.

       **RBYTES** **(IO\_RBYTES)**
            Bytes of [read](../man2/read.2.html)(2) I/O for the process.

       **WBYTES** **(IO\_WBYTES)**
            Bytes of [write](../man2/write.2.html)(2) I/O for the process.

       **CNCLWB** **(IO\_CANCEL)**
            Bytes of cancelled [write](../man2/write.2.html)(2) I/O.

       **IO\_READ\_RATE** **(DISK** **READ)**
            The I/O rate of [read](../man2/read.2.html)(2) in bytes per second, for the process.

       **IO\_WRITE\_RATE** **(DISK** **WRITE)**
            The I/O rate of [write](../man2/write.2.html)(2) in bytes per second, for the process.

       **IO\_RATE** **(DISK** **R/W)**
            The I/O rate, IO\_READ\_RATE + IO\_WRITE\_RATE (see above).

       **CGROUP**
            Which cgroup the process is in.

       **OOM**  OOM killer score.

       **IO\_PRIORITY** **(IO)**
            The I/O scheduling class followed by the priority if the class supports it:
               **R** for Realtime
               **B** for Best-effort
               **id** for Idle

       **PERCENT\_CPU\_DELAY** **(CPUD%)**
            The   percentage  of  time  spent  waiting  for  a  CPU  (while  runnable).  Requires
            CAP\_NET\_ADMIN.

       **PERCENT\_IO\_DELAY** **(IOD%)**
            The percentage of time spent waiting for the completion  of  synchronous  block  I/O.
            Requires CAP\_NET\_ADMIN.

       **PERCENT\_SWAP\_DELAY** **(SWAPD%)**
            The percentage of time spent swapping in pages. Requires CAP\_NET\_ADMIN.

       **All** **other** **flags**
            Currently unsupported (always displays '-').

#### **CONFIG** **FILE**

       By  default htop reads its configuration from the XDG-compliant path [~/.config/htop/htoprc](file:~/.config/htop/htoprc)
       -- the configuration file is overwritten by htop's in-program Setup configuration,  so  it
       should  not be hand-edited. If no user configuration exists htop tries to read the system-
       wide configuration from /etc/htoprc and as a last resort, falls back  to  its  hard  coded
       defaults.

       You  may  override  the  location  of the configuration file using the $HTOPRC environment
       variable (so you can have multiple configurations for different machines  that  share  the
       same home directory, for example).

#### **MEMORY** **SIZES**

       Memory  sizes  in htop are displayed as they are in tools from the GNU Coreutils (when ran
       with the --human-readable option). This means that sizes are printed in  powers  of  1024.
       (e.g., 1023M = 1072693248 Bytes)

       The  decision  to  use this convention was made in order to conserve screen space and make
       memory size representations consistent throughout htop.
