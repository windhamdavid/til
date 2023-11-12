# Python

* [https://www.python.org/doc/](https://www.python.org/doc/)
* [https://devguide.python.org/](https://devguide.python.org/)
* [Python cheatsheet](https://github.com/gto76/python-cheatsheet)

## PyEnv

https://github.com/pyenv/pyenv

```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

```bash
david@ovid🏛 :~ » pyenv global 3.10 
david@ovid🏛 :~ »  pyenv version    
3.10.10 (set by /Users/david/.pyenv/version)
david@ovid🏛 :~ » python --version
Python 3.10.10
```

## PIP

https://pypi.org/project/pip/

```bash
david@ovid🏛 :~/sites/gpt(main○) » python3 --version                                          127 ↵
Python 3.11.2
david@ovid🏛 :~/sites/gpt(main○) » python3 -m pip install --upgrade setuptools
Requirement already satisfied: setuptools in /opt/homebrew/lib/python3.11/site-packages (65.6.3)
Collecting setuptools
  Downloading setuptools-67.7.2-py3-none-any.whl (1.1 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.1/1.1 MB 9.5 MB/s eta 0:00:00
Installing collected packages: setuptools
  Attempting uninstall: setuptools
    Found existing installation: setuptools 65.6.3
    Uninstalling setuptools-65.6.3:
      Successfully uninstalled setuptools-65.6.3
Successfully installed setuptools-67.7.2

[notice] A new release of pip available: 22.3.1 -> 23.1.2
[notice] To update, run: python3.11 -m pip install --upgrade pip
david@ovid🏛 :~/sites/gpt(main○) » python3.11 -m pip install --upgrade pip
Requirement already satisfied: pip in /opt/homebrew/lib/python3.11/site-packages (22.3.1)
Collecting pip
  Downloading pip-23.1.2-py3-none-any.whl (2.1 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2.1/2.1 MB 13.6 MB/s eta 0:00:00
Installing collected packages: pip
  Attempting uninstall: pip
    Found existing installation: pip 22.3.1
    Uninstalling pip-22.3.1:
      Successfully uninstalled pip-22.3.1
Successfully installed pip-23.1.2
```

## Poetry
https://pypi.org/project/poetry/
https://github.com/python-poetry

```bash
david@ovid🏛 :~/sites/gpt(main○) » pip3 install poetry                                        127 ↵
Collecting poetry
  Downloading poetry-1.4.2-py3-none-any.whl (222 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 222.7/222.7 kB 3.9 MB/s eta 0:00:00
Collecting build<0.11.0,>=0.10.0 (from poetry)
  Downloading build-0.10.0-py3-none-any.whl (17 kB)
Collecting cachecontrol[filecache]<0.13.0,>=0.12.9 (from poetry)
  Downloading CacheControl-0.12.11-py2.py3-none-any.whl (21 kB)
Collecting cleo<3.0.0,>=2.0.0 (from poetry)
  Downloading cleo-2.0.1-py3-none-any.whl (77 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 77.3/77.3 kB 10.8 MB/s eta 0:00:00
Collecting crashtest<0.5.0,>=0.4.1 (from poetry)
  Downloading crashtest-0.4.1-py3-none-any.whl (7.6 kB)
Collecting dulwich<0.22.0,>=0.21.2 (from poetry)
  Downloading dulwich-0.21.3-cp311-cp311-macosx_11_0_arm64.whl (467 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 467.1/467.1 kB 7.8 MB/s eta 0:00:00
Collecting filelock<4.0.0,>=3.8.0 (from poetry)
  Downloading filelock-3.12.0-py3-none-any.whl (10 kB)
Collecting html5lib<2.0,>=1.0 (from poetry)
  Downloading html5lib-1.1-py2.py3-none-any.whl (112 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 112.2/112.2 kB 7.6 MB/s eta 0:00:00
Collecting installer<0.8.0,>=0.7.0 (from poetry)
  Downloading installer-0.7.0-py3-none-any.whl (453 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 453.8/453.8 kB 7.8 MB/s eta 0:00:00
Collecting jsonschema<5.0.0,>=4.10.0 (from poetry)
  Downloading jsonschema-4.17.3-py3-none-any.whl (90 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 90.4/90.4 kB 6.2 MB/s eta 0:00:00
Collecting keyring<24.0.0,>=23.9.0 (from poetry)
  Downloading keyring-23.13.1-py3-none-any.whl (37 kB)
Collecting lockfile<0.13.0,>=0.12.2 (from poetry)
  Downloading lockfile-0.12.2-py2.py3-none-any.whl (13 kB)
Collecting packaging>=20.4 (from poetry)
  Downloading packaging-23.1-py3-none-any.whl (48 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 48.9/48.9 kB 4.3 MB/s eta 0:00:00
Collecting pexpect<5.0.0,>=4.7.0 (from poetry)
  Downloading pexpect-4.8.0-py2.py3-none-any.whl (59 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 59.0/59.0 kB 6.0 MB/s eta 0:00:00
Collecting pkginfo<2.0.0,>=1.9.4 (from poetry)
  Downloading pkginfo-1.9.6-py3-none-any.whl (30 kB)
Collecting platformdirs<3.0.0,>=2.5.2 (from poetry)
  Downloading platformdirs-2.6.2-py3-none-any.whl (14 kB)
Collecting poetry-core==1.5.2 (from poetry)
  Downloading poetry_core-1.5.2-py3-none-any.whl (465 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 465.2/465.2 kB 7.7 MB/s eta 0:00:00
Collecting poetry-plugin-export<2.0.0,>=1.3.0 (from poetry)
  Downloading poetry_plugin_export-1.3.1-py3-none-any.whl (10 kB)
Collecting pyproject-hooks<2.0.0,>=1.0.0 (from poetry)
  Downloading pyproject_hooks-1.0.0-py3-none-any.whl (9.3 kB)
Collecting requests<3.0,>=2.18 (from poetry)
  Downloading requests-2.29.0-py3-none-any.whl (62 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 62.5/62.5 kB 6.0 MB/s eta 0:00:00
Collecting requests-toolbelt<0.11.0,>=0.9.1 (from poetry)
  Downloading requests_toolbelt-0.10.1-py2.py3-none-any.whl (54 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 54.5/54.5 kB 5.5 MB/s eta 0:00:00
Collecting shellingham<2.0,>=1.5 (from poetry)
  Downloading shellingham-1.5.0.post1-py2.py3-none-any.whl (9.4 kB)
Collecting tomlkit!=0.11.2,!=0.11.3,<1.0.0,>=0.11.1 (from poetry)
  Downloading tomlkit-0.11.8-py3-none-any.whl (35 kB)
Collecting trove-classifiers>=2022.5.19 (from poetry)
  Downloading trove_classifiers-2023.5.2-py3-none-any.whl (13 kB)
Collecting urllib3<2.0.0,>=1.26.0 (from poetry)
  Downloading urllib3-1.26.15-py2.py3-none-any.whl (140 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 140.9/140.9 kB 8.7 MB/s eta 0:00:00
Collecting virtualenv!=20.4.5,!=20.4.6,<21.0.0,>=20.4.3 (from poetry)
  Downloading virtualenv-20.23.0-py3-none-any.whl (3.3 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.3/3.3 MB 3.4 MB/s eta 0:00:00
Collecting xattr<0.11.0,>=0.10.0 (from poetry)
  Downloading xattr-0.10.1-cp311-cp311-macosx_11_0_arm64.whl (15 kB)
Collecting msgpack>=0.5.2 (from cachecontrol[filecache]<0.13.0,>=0.12.9->poetry)
  Downloading msgpack-1.0.5-cp311-cp311-macosx_11_0_arm64.whl (69 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 69.0/69.0 kB 1.5 MB/s eta 0:00:00
Collecting rapidfuzz<3.0.0,>=2.2.0 (from cleo<3.0.0,>=2.0.0->poetry)
  Downloading rapidfuzz-2.15.1-cp311-cp311-macosx_11_0_arm64.whl (1.1 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.1/1.1 MB 975.2 kB/s eta 0:00:00
Collecting six>=1.9 (from html5lib<2.0,>=1.0->poetry)
  Downloading six-1.16.0-py2.py3-none-any.whl (11 kB)
Collecting webencodings (from html5lib<2.0,>=1.0->poetry)
  Downloading webencodings-0.5.1-py2.py3-none-any.whl (11 kB)
Collecting attrs>=17.4.0 (from jsonschema<5.0.0,>=4.10.0->poetry)
  Downloading attrs-23.1.0-py3-none-any.whl (61 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 61.2/61.2 kB 1.1 MB/s eta 0:00:00
Collecting pyrsistent!=0.17.0,!=0.17.1,!=0.17.2,>=0.14.0 (from jsonschema<5.0.0,>=4.10.0->poetry)
  Downloading pyrsistent-0.19.3-cp311-cp311-macosx_10_9_universal2.whl (82 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 82.6/82.6 kB 1.2 MB/s eta 0:00:00
Collecting jaraco.classes (from keyring<24.0.0,>=23.9.0->poetry)
  Downloading jaraco.classes-3.2.3-py3-none-any.whl (6.0 kB)
Collecting importlib-metadata>=4.11.4 (from keyring<24.0.0,>=23.9.0->poetry)
  Downloading importlib_metadata-6.6.0-py3-none-any.whl (22 kB)
Collecting ptyprocess>=0.5 (from pexpect<5.0.0,>=4.7.0->poetry)
  Downloading ptyprocess-0.7.0-py2.py3-none-any.whl (13 kB)
Collecting charset-normalizer<4,>=2 (from requests<3.0,>=2.18->poetry)
  Downloading charset_normalizer-3.1.0-cp311-cp311-macosx_11_0_arm64.whl (121 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 121.7/121.7 kB 1.1 MB/s eta 0:00:00
Collecting idna<4,>=2.5 (from requests<3.0,>=2.18->poetry)
  Downloading idna-3.4-py3-none-any.whl (61 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 61.5/61.5 kB 1.1 MB/s eta 0:00:00
Collecting certifi>=2017.4.17 (from requests<3.0,>=2.18->poetry)
  Downloading certifi-2022.12.7-py3-none-any.whl (155 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 155.3/155.3 kB 1.2 MB/s eta 0:00:00
Collecting distlib<1,>=0.3.6 (from virtualenv!=20.4.5,!=20.4.6,<21.0.0,>=20.4.3->poetry)
  Downloading distlib-0.3.6-py2.py3-none-any.whl (468 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 468.5/468.5 kB 1.6 MB/s eta 0:00:00
INFO: pip is looking at multiple versions of virtualenv to determine which version is compatible with other requirements. This could take a while.
Collecting virtualenv!=20.4.5,!=20.4.6,<21.0.0,>=20.4.3 (from poetry)
  Downloading virtualenv-20.22.0-py3-none-any.whl (3.2 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.2/3.2 MB 1.5 MB/s eta 0:00:00
  Downloading virtualenv-20.21.1-py3-none-any.whl (8.7 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 8.7/8.7 MB 1.7 MB/s eta 0:00:00
Collecting cffi>=1.0 (from xattr<0.11.0,>=0.10.0->poetry)
  Downloading cffi-1.15.1-cp311-cp311-macosx_11_0_arm64.whl (174 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 174.2/174.2 kB 1.9 MB/s eta 0:00:00
Collecting pycparser (from cffi>=1.0->xattr<0.11.0,>=0.10.0->poetry)
  Downloading pycparser-2.21-py2.py3-none-any.whl (118 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 118.7/118.7 kB 2.1 MB/s eta 0:00:00
Collecting zipp>=0.5 (from importlib-metadata>=4.11.4->keyring<24.0.0,>=23.9.0->poetry)
  Downloading zipp-3.15.0-py3-none-any.whl (6.8 kB)
Collecting more-itertools (from jaraco.classes->keyring<24.0.0,>=23.9.0->poetry)
  Downloading more_itertools-9.1.0-py3-none-any.whl (54 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 54.2/54.2 kB 1.8 MB/s eta 0:00:00
Installing collected packages: webencodings, trove-classifiers, ptyprocess, msgpack, lockfile, distlib, zipp, urllib3, tomlkit, six, shellingham, rapidfuzz, pyrsistent, pyproject-hooks, pycparser, poetry-core, platformdirs, pkginfo, pexpect, packaging, more-itertools, installer, idna, filelock, crashtest, charset-normalizer, certifi, attrs, virtualenv, requests, jsonschema, jaraco.classes, importlib-metadata, html5lib, dulwich, cleo, cffi, build, xattr, requests-toolbelt, keyring, cachecontrol, poetry-plugin-export, poetry
Successfully installed attrs-23.1.0 build-0.10.0 cachecontrol-0.12.11 certifi-2022.12.7 cffi-1.15.1 charset-normalizer-3.1.0 cleo-2.0.1 crashtest-0.4.1 distlib-0.3.6 dulwich-0.21.3 filelock-3.12.0 html5lib-1.1 idna-3.4 importlib-metadata-6.6.0 installer-0.7.0 jaraco.classes-3.2.3 jsonschema-4.17.3 keyring-23.13.1 lockfile-0.12.2 more-itertools-9.1.0 msgpack-1.0.5 packaging-23.1 pexpect-4.8.0 pkginfo-1.9.6 platformdirs-2.6.2 poetry-1.4.2 poetry-core-1.5.2 poetry-plugin-export-1.3.1 ptyprocess-0.7.0 pycparser-2.21 pyproject-hooks-1.0.0 pyrsistent-0.19.3 rapidfuzz-2.15.1 requests-2.29.0 requests-toolbelt-0.10.1 shellingham-1.5.0.post1 six-1.16.0 tomlkit-0.11.8 trove-classifiers-2023.5.2 urllib3-1.26.15 virtualenv-20.21.1 webencodings-0.5.1 xattr-0.10.1 zipp-3.15.0
david@ovid🏛 :~/sites/gpt(main○) »
```

