# Vim

```
vimdiff file file
cntl+n (for Nerdtree in Vim)
```

#### Configuration
[https://github.com/windhamdavid/dotfiles/blob/master/macs.local/.vimrc](https://github.com/windhamdavid/dotfiles/blob/master/macs.local/.vimrc)  
[https://github.com/VundleVim/Vundle.vim](https://github.com/VundleVim/Vundle.vim)  
[https://github.com/scrooloose/nerdtree](https://github.com/scrooloose/nerdtree)
[https://github.com/Xuyuanp/nerdtree-git-plugin](https://github.com/Xuyuanp/nerdtree-git-plugin)

#### vi cheatsheets

[![vi-2](/img/vim2.png)](/img/vim2.png)
[![vi-1](/img/vim-1.png)](/img/vim-1.png)



## Vim Cheatsheet


#### Global
```bash
:help keyword # open help for keyword
:o file       # open file
:saveas file  # save file as
:close        # close current pane
```

#### Cursor movement
```bash
h        # move cursor left
j        # move cursor down
k        # move cursor up
l        # move cursor right
H        # move to top of screen
M        # move to middle of screen
L        # move to bottom of screen
w        # jump forwards to the start of a word
W        # jump forwards to the start of a word (words can contain punctuation)
e        # jump forwards to the end of a word
E        # jump forwards to the end of a word (words can contain punctuation)
b        # jump backwards to the start of a word
B        # jump backwards to the start of a word (words can contain punctuation)
0        # jump to the start of the line
^        # jump to the first non-blank character of the line
$        # jump to the end of the line
g_       # jump to the last non-blank character of the line
gg       # go to the first line of the document
G        # go to the last line of the document
5G       # go to line 5
fx       # jump to next occurrence of character x
tx       # jump to before next occurrence of character x
}        # jump to next paragraph (or function/block, when editing code)
{        # jump to previous paragraph (or function/block, when editing code)
zz       # center cursor on screen
Ctrl + b # move back one full screen
Ctrl + f # move forward one full screen
Ctrl + d # move forward 1/2 a screen
Ctrl + u # move back 1/2 a screen
```

#### Insert mode - inserting/appending text
```bash
i        # insert before the cursor
I        # insert at the beginning of the line
a        # insert (append) after the cursor
A        # insert (append) at the end of the line
o        # append (open) a new line below the current line
O        # append (open) a new line above the current line
ea       # insert (append) at the end of the word
Esc      # exit insert mode
```

#### Editing
```bash
r        # replace a single character
J        # join line below to the current one
cc       # change (replace) entire line
cw       # change (replace) to the end of the word
c$       # change (replace) to the end of the line
s        # delete character and substitute text
S        # delete line and substitute text (same as cc)
xp       # transpose two letters (delete and paste)
.        # repeat last command
u        # undo
Ctrl + r # redo
```

#### Marking text (visual mode)
```bash
v        # start visual mode, mark lines, then do a command (like y-yank)
V        # start linewise visual mode
o        # move to other end of marked area
O        # move to other corner of block
aw       # mark a word
ab       # a block with ()
aB       # a block with {}
ib       # inner block with ()
iB       # inner block with {}
Esc      # exit visual mode
Ctrl + v # start visual block mode
```

#### Visual commands
```bash
>       # shift text right
<       # shift text left
y       # yank (copy) marked text
d       # delete marked text
~       # switch case
```

#### Cut and paste
```bash
yy       # yank (copy) a line
2yy      # yank (copy) 2 lines
yw       # yank (copy) the characters of the word from the cursor position to the start of the next word
y$       # yank (copy) to end of line
p        # put (paste) the clipboard after cursor
P        # put (paste) before cursor
dd       # delete (cut) a line
2dd      # delete (cut) 2 lines
dw       # delete (cut) the characters of the word from the cursor position to the start of the next word
D        # delete (cut) to the end of the line
d$       # delete (cut) to the end of the line
x        # delete (cut) character
```

#### Search and replace
```bash
/pattern       # search for pattern
?pattern       # search backward for pattern
\vpattern      # 'very magic' pattern: non-alphanumeric characters are interpreted as special regex symbols (no escaping needed)
n              # repeat search in same direction
N              # repeat search in opposite direction
:%s/old/new/g  # replace all old with new throughout file
:%s/old/new/gc # replace all old with new throughout file with confirmations
:noh           # remove highlighting of search matches
```

#### Search in multiple files
```bash
:vimgrep /pattern/ {file} # search for pattern in multiple files
:cn                       # jump to the next match
:cp                       # jump to the previous match
:copen                    # open a window containing the list of matches
```

#### Exiting
```bash
:w              # write (save) the file, but don't exit
:w !sudo tee %  # write out the current file using sudo
:wq or :x or ZZ # write (save) and quit
:q              # quit (fails if there are unsaved changes)
:q! or ZQ       # quit and throw away unsaved changes
```

#### Working with multiple files
```bash
:e file       # edit a file in a new buffer
:bnext or :bn # go to the next buffer
:bprev or :bp # go to the previous buffer
:bd           # delete a buffer (close a file)
:ls           # list all open buffers
:sp file      # open a file in a new buffer and split window
:vsp file     # open a file in a new buffer and vertically split window
Ctrl + ws     # split window
Ctrl + ww     # switch windows
Ctrl + wq     # quit a window
Ctrl + wv     # split window vertically
Ctrl + wh     # move cursor to the left window (vertical split)
Ctrl + wl     # move cursor to the right window (vertical split)
Ctrl + wj     # move cursor to the window below (horizontal split)
Ctrl + wk     # move cursor to the window above (horizontal split)
```

#### Tabs
```bash
:tabnew or :tabnew file # open a file in a new tab
Ctrl + wT               # move the current split window into its own tab
gt or :tabnext or :tabn # move to the next tab
gT or :tabprev or :tabp # move to the previous tab
<number>gt              # move to tab <number>
:tabmove <number>       # move current tab to the <number>th position (indexed from 0)
:tabclose or :tabc      # close the current tab and all its windows
:tabonly or :tabo       # close all tabs except for the current one
:tabdo command          # run the command on all tabs (e.g. :tabdo q - closes all opened tabs)
```

#### NERDTree

```
    o.......Open files, directories and bookmarks....................|NERDTree-o|
    go......Open selected file, but leave cursor in the NERDTree.....|NERDTree-go|
    t.......Open selected node/bookmark in a new tab.................|NERDTree-t|
    T.......Same as 't' but keep the focus on the current tab........|NERDTree-T|
    i.......Open selected file in a split window.....................|NERDTree-i|
    gi......Same as i, but leave the cursor on the NERDTree..........|NERDTree-gi|
    s.......Open selected file in a new vsplit.......................|NERDTree-s|
    gs......Same as s, but leave the cursor on the NERDTree..........|NERDTree-gs|
    O.......Recursively open the selected directory..................|NERDTree-O|
    x.......Close the current nodes parent...........................|NERDTree-x|
    X.......Recursively close all children of the current node.......|NERDTree-X|
    e.......Edit the current dif.....................................|NERDTree-e|

    <CR>...............same as |NERDTree-o|.
    double-click.......same as the |NERDTree-o| map.
    middle-click.......same as |NERDTree-i| for files, same as
                      |NERDTree-e| for dirs.

    D.......Delete the current bookmark .............................|NERDTree-D|

    P.......Jump to the root node....................................|NERDTree-P|
    p.......Jump to current nodes parent.............................|NERDTree-p|
    K.......Jump up inside directories at the current tree depth.....|NERDTree-K|
    J.......Jump down inside directories at the current tree depth...|NERDTree-J|
    <C-J>...Jump down to the next sibling of the current directory...|NERDTree-C-J|
    <C-K>...Jump up to the previous sibling of the current directory.|NERDTree-C-K|

    C.......Change the tree root to the selected dir.................|NERDTree-C|
    u.......Move the tree root up one directory......................|NERDTree-u|
    U.......Same as 'u' except the old root node is left open........|NERDTree-U|
    r.......Recursively refresh the current directory................|NERDTree-r|
    R.......Recursively refresh the current root.....................|NERDTree-R|
    m.......Display the NERD tree menu...............................|NERDTree-m|
    cd......Change the CWD to the dir of the selected node...........|NERDTree-cd|

    I.......Toggle whether hidden files displayed....................|NERDTree-I|
    f.......Toggle whether the file filters are used.................|NERDTree-f|
    F.......Toggle whether files are displayed.......................|NERDTree-F|
    B.......Toggle whether the bookmark table is displayed...........|NERDTree-B|

    q.......Close the NERDTree window................................|NERDTree-q|
    A.......Zoom (maximize/minimize) the NERDTree window.............|NERDTree-A|
    ?.......Toggle the display of the quick help.....................|NERDTree-?|
``` 
	 
	 
### vimdiff cheet sheet

#### git mergetool

```
git config --global merge.tool=vimdiff
```

#### vimdiff key mappings

```
map <Leader>1 :diffget LOCAL<CR>
map <Leader>2 :diffget BASE<CR>
map <Leader>3 :diffget REMOTE<CR>
```

#### vimdiff commands

```
]c :            next difference
[c :            previous difference
do              diff obtain
dp              diff put
zo              open folded text
zc              close folded text
:diffupdate     re-scan the files for differences
```

#### moving between windows

```
CTRL-W h        move to the window on the left
CTRL-W j        move to the window below
CTRL-W k        move to the window above
CTRL-W l        move to the window on the right
CTRL-W t        move to the TOP window
CTRL-W b        move to the BOTTOM window
CTRL-W CTRL-W   move to the next window
```

#### moving windows

```
CTRL-W K        move window to the upper
CTRL-W H        move window to the far left
CTRL-W J        move window to the bottom
CTRL-W L        move window to the far right


