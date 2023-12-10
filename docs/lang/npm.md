# npm

- [https://www.npmjs.com/~windhamdavid](https://www.npmjs.com/~windhamdavid)
- [https://www.npmjs.com/](https://www.npmjs.com/)
- [https://docs.npmjs.com/](https://docs.npmjs.com/)


##### update



```
//update to latest
npm install npm@latest -g

//Listing globally installed NPM packages and version
npm list -g --depth=0

//find outdated packages
npm outdated

//use npm-check
npm-check

```

January 2020:
```sh
david@macs:~/sites/til(master⚡) » npm list -g
/Users/david/.nvm/versions/node/v10.16.3/lib
├─┬ gitbook-cli@2.3.2
│ ├── bash-color@0.0.4
│ ├── commander@2.11.0
│ ├─┬ fs-extra@3.0.1
│ │ ├── graceful-fs@4.2.3
│ │ ├─┬ jsonfile@3.0.1
│ │ │ └── graceful-fs@4.2.3 deduped
│ │ └── universalify@0.1.2
│ ├── lodash@4.17.4
│ ├─┬ npm@5.1.0
│ │ ├── abbrev@1.1.0
│ │ ├── ansi-regex@3.0.0
│ │ ├── ansicolors@0.3.2
│ │ ├── ansistyles@0.1.3
│ │ ├── aproba@1.1.2
│ │ ├── archy@1.0.0
│ │ ├── bluebird@3.5.0
│ │ ├─┬ cacache@9.2.9
│ │ │ ├── bluebird@3.5.0 deduped
│ │ │ ├── chownr@1.0.1 deduped
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├─┬ lru-cache@4.1.1
│ │ │ │ ├── pseudomap@1.0.2
│ │ │ │ └── yallist@2.1.2
│ │ │ ├── mississippi@1.3.0 deduped
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ ├── move-concurrently@1.0.1 deduped
│ │ │ ├── promise-inflight@1.0.1 deduped
│ │ │ ├── rimraf@2.6.1 deduped
│ │ │ ├── ssri@4.1.6 deduped
│ │ │ ├── unique-filename@1.1.0 deduped
│ │ │ └── y18n@3.2.1
│ │ ├── call-limit@1.1.0
│ │ ├── chownr@1.0.1
│ │ ├─┬ cmd-shim@2.0.2
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ └── mkdirp@0.5.1 deduped
│ │ ├─┬ columnify@1.5.4
│ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ └── ansi-regex@2.1.1
│ │ │ └─┬ wcwidth@1.0.1
│ │ │   └─┬ defaults@1.0.3
│ │ │     └── clone@1.0.2
│ │ ├─┬ config-chain@1.1.11
│ │ │ ├── ini@1.3.4 deduped
│ │ │ └── proto-list@1.2.4
│ │ ├── debuglog@1.0.1
│ │ ├── detect-indent@5.0.0
│ │ ├─┬ dezalgo@1.0.3
│ │ │ ├── asap@2.0.5
│ │ │ └── wrappy@1.0.2 deduped
│ │ ├── editor@1.0.0
│ │ ├─┬ fs-vacuum@1.2.10
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── path-is-inside@1.0.2 deduped
│ │ │ └── rimraf@2.6.1 deduped
│ │ ├─┬ fs-write-stream-atomic@1.0.10
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── iferr@0.1.5 deduped
│ │ │ ├── imurmurhash@0.1.4 deduped
│ │ │ └── readable-stream@2.3.2 deduped
│ │ ├─┬ fstream@1.0.11
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── inherits@2.0.3 deduped
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ └── rimraf@2.6.1 deduped
│ │ ├─┬ fstream-npm@1.2.1
│ │ │ ├─┬ fstream-ignore@1.0.5
│ │ │ │ ├── fstream@1.0.11 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └─┬ minimatch@3.0.4
│ │ │ │   └─┬ brace-expansion@1.1.8
│ │ │ │     ├── balanced-match@1.0.0
│ │ │ │     └── concat-map@0.0.1
│ │ │ └── inherits@2.0.3 deduped
│ │ ├─┬ glob@7.1.2
│ │ │ ├── fs.realpath@1.0.0
│ │ │ ├── inflight@1.0.6 deduped
│ │ │ ├── inherits@2.0.3 deduped
│ │ │ ├─┬ minimatch@3.0.4
│ │ │ │ └─┬ brace-expansion@1.1.8
│ │ │ │   ├── balanced-match@1.0.0
│ │ │ │   └── concat-map@0.0.1
│ │ │ ├── once@1.4.0 deduped
│ │ │ └── path-is-absolute@1.0.1
│ │ ├── graceful-fs@4.1.11
│ │ ├── has-unicode@2.0.1
│ │ ├── hosted-git-info@2.5.0
│ │ ├── iferr@0.1.5
│ │ ├── imurmurhash@0.1.4
│ │ ├─┬ inflight@1.0.6
│ │ │ ├── once@1.4.0 deduped
│ │ │ └── wrappy@1.0.2 deduped
│ │ ├── inherits@2.0.3
│ │ ├── ini@1.3.4
│ │ ├─┬ init-package-json@1.10.1
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── npm-package-arg@5.1.2 deduped
│ │ │ ├─┬ promzard@0.3.0
│ │ │ │ └── read@1.0.7 deduped
│ │ │ ├── read@1.0.7 deduped
│ │ │ ├── read-package-json@2.0.9 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── validate-npm-package-license@3.0.1 deduped
│ │ │ └── validate-npm-package-name@3.0.0 deduped
│ │ ├─┬ JSONStream@1.3.1
│ │ │ ├── jsonparse@1.3.1
│ │ │ └── through@2.3.8
│ │ ├── lazy-property@1.0.0
│ │ ├── lockfile@1.0.3
│ │ ├── lodash._baseindexof@3.1.0
│ │ ├─┬ lodash._baseuniq@4.6.0
│ │ │ ├── lodash._createset@4.0.3
│ │ │ └── lodash._root@3.0.1
│ │ ├── lodash._bindcallback@3.0.1
│ │ ├── lodash._cacheindexof@3.0.2
│ │ ├─┬ lodash._createcache@3.1.2
│ │ │ └── lodash._getnative@3.9.1 deduped
│ │ ├── lodash._getnative@3.9.1
│ │ ├── lodash.clonedeep@4.5.0
│ │ ├── lodash.restparam@3.6.1
│ │ ├── lodash.union@4.6.0
│ │ ├── lodash.uniq@4.5.0
│ │ ├── lodash.without@4.4.0
│ │ ├─┬ lru-cache@4.1.1
│ │ │ ├── pseudomap@1.0.2
│ │ │ └── yallist@2.1.2
│ │ ├─┬ mississippi@1.3.0
│ │ │ ├─┬ concat-stream@1.6.0
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── readable-stream@2.3.2 deduped
│ │ │ │ └── typedarray@0.0.6
│ │ │ ├─┬ duplexify@3.5.0
│ │ │ │ ├─┬ end-of-stream@1.0.0
│ │ │ │ │ └─┬ once@1.3.3
│ │ │ │ │   └── wrappy@1.0.2 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── readable-stream@2.3.2 deduped
│ │ │ │ └── stream-shift@1.0.0
│ │ │ ├─┬ end-of-stream@1.4.0
│ │ │ │ └── once@1.4.0 deduped
│ │ │ ├─┬ flush-write-stream@1.0.2
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ ├─┬ from2@2.3.0
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ ├─┬ parallel-transform@1.1.0
│ │ │ │ ├── cyclist@0.2.2
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ ├─┬ pump@1.0.2
│ │ │ │ ├── end-of-stream@1.4.0 deduped
│ │ │ │ └── once@1.4.0 deduped
│ │ │ ├─┬ pumpify@1.3.5
│ │ │ │ ├── duplexify@3.5.0 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └── pump@1.0.2 deduped
│ │ │ ├─┬ stream-each@1.2.0
│ │ │ │ ├── end-of-stream@1.4.0 deduped
│ │ │ │ └── stream-shift@1.0.0
│ │ │ └─┬ through2@2.0.3
│ │ │   ├── readable-stream@2.3.2 deduped
│ │ │   └── xtend@4.0.1
│ │ ├─┬ mkdirp@0.5.1
│ │ │ └── minimist@0.0.8
│ │ ├─┬ move-concurrently@1.0.1
│ │ │ ├── aproba@1.1.2 deduped
│ │ │ ├─┬ copy-concurrently@1.0.3
│ │ │ │ ├── aproba@1.1.2 deduped
│ │ │ │ ├── fs-write-stream-atomic@1.0.10 deduped
│ │ │ │ ├── iferr@0.1.5 deduped
│ │ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ │ ├── rimraf@2.6.1 deduped
│ │ │ │ └── run-queue@1.0.3 deduped
│ │ │ ├── fs-write-stream-atomic@1.0.10 deduped
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ ├── rimraf@2.6.1 deduped
│ │ │ └─┬ run-queue@1.0.3
│ │ │   └── aproba@1.1.2 deduped
│ │ ├─┬ node-gyp@3.6.2
│ │ │ ├── fstream@1.0.11 deduped
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├─┬ minimatch@3.0.4
│ │ │ │ └─┬ brace-expansion@1.1.8
│ │ │ │   ├── balanced-match@1.0.0
│ │ │ │   └── concat-map@0.0.1
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ ├─┬ nopt@3.0.6
│ │ │ │ └── abbrev@1.1.0 deduped
│ │ │ ├── npmlog@4.1.2 deduped
│ │ │ ├── osenv@0.1.4 deduped
│ │ │ ├── request@2.81.0 deduped
│ │ │ ├── rimraf@2.6.1 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── tar@2.2.1 deduped
│ │ │ └── which@1.2.14 deduped
│ │ ├─┬ nopt@4.0.1
│ │ │ ├── abbrev@1.1.0 deduped
│ │ │ └── osenv@0.1.4 deduped
│ │ ├─┬ normalize-package-data@2.4.0
│ │ │ ├── hosted-git-info@2.5.0 deduped
│ │ │ ├─┬ is-builtin-module@1.0.0
│ │ │ │ └── builtin-modules@1.1.1
│ │ │ ├── semver@5.3.0 deduped
│ │ │ └── validate-npm-package-license@3.0.1 deduped
│ │ ├── npm-cache-filename@1.0.2
│ │ ├─┬ npm-install-checks@3.0.0
│ │ │ └── semver@5.3.0 deduped
│ │ ├─┬ npm-package-arg@5.1.2
│ │ │ ├── hosted-git-info@2.5.0 deduped
│ │ │ ├── osenv@0.1.4 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ └── validate-npm-package-name@3.0.0 deduped
│ │ ├─┬ npm-registry-client@8.4.0
│ │ │ ├─┬ concat-stream@1.6.0
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── readable-stream@2.3.2 deduped
│ │ │ │ └── typedarray@0.0.6
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── normalize-package-data@2.4.0 deduped
│ │ │ ├── npm-package-arg@5.1.2 deduped
│ │ │ ├── npmlog@4.1.2 deduped
│ │ │ ├── once@1.4.0 deduped
│ │ │ ├── request@2.81.0 deduped
│ │ │ ├── retry@0.10.1 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── slide@1.1.6 deduped
│ │ │ └── ssri@4.1.6 deduped
│ │ ├── npm-user-validate@1.0.0
│ │ ├─┬ npmlog@4.1.2
│ │ │ ├─┬ are-we-there-yet@1.1.4
│ │ │ │ ├── delegates@1.0.0
│ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ ├── console-control-strings@1.1.0
│ │ │ ├─┬ gauge@2.7.4
│ │ │ │ ├── aproba@1.1.2 deduped
│ │ │ │ ├── console-control-strings@1.1.0 deduped
│ │ │ │ ├── has-unicode@2.0.1 deduped
│ │ │ │ ├── object-assign@4.1.1
│ │ │ │ ├── signal-exit@3.0.2
│ │ │ │ ├─┬ string-width@1.0.2
│ │ │ │ │ ├── code-point-at@1.1.0
│ │ │ │ │ ├─┬ is-fullwidth-code-point@1.0.0
│ │ │ │ │ │ └── number-is-nan@1.0.1
│ │ │ │ │ └── strip-ansi@3.0.1 deduped
│ │ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ │ └── ansi-regex@2.1.1
│ │ │ │ └─┬ wide-align@1.1.2
│ │ │ │   └── string-width@1.0.2 deduped
│ │ │ └── set-blocking@2.0.0
│ │ ├─┬ once@1.4.0
│ │ │ └── wrappy@1.0.2 deduped
│ │ ├── opener@1.4.3
│ │ ├─┬ osenv@0.1.4
│ │ │ ├── os-homedir@1.0.2
│ │ │ └── os-tmpdir@1.0.2
│ │ ├─┬ pacote@2.7.38
│ │ │ ├── bluebird@3.5.0 deduped
│ │ │ ├── cacache@9.2.9 deduped
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── lru-cache@4.1.1 deduped
│ │ │ ├─┬ make-fetch-happen@2.4.13
│ │ │ │ ├─┬ agentkeepalive@3.3.0
│ │ │ │ │ └─┬ humanize-ms@1.2.1
│ │ │ │ │   └── ms@2.0.0
│ │ │ │ ├── cacache@9.2.9 deduped
│ │ │ │ ├── http-cache-semantics@3.7.3
│ │ │ │ ├─┬ http-proxy-agent@2.0.0
│ │ │ │ │ ├─┬ agent-base@4.1.0
│ │ │ │ │ │ └─┬ es6-promisify@5.0.0
│ │ │ │ │ │   └── es6-promise@4.1.1
│ │ │ │ │ └─┬ debug@2.6.8
│ │ │ │ │   └── ms@2.0.0
│ │ │ │ ├─┬ https-proxy-agent@2.0.0
│ │ │ │ │ ├─┬ agent-base@4.1.0
│ │ │ │ │ │ └─┬ es6-promisify@5.0.0
│ │ │ │ │ │   └── es6-promise@4.1.1
│ │ │ │ │ └─┬ debug@2.6.8
│ │ │ │ │   └── ms@2.0.0
│ │ │ │ ├── lru-cache@4.1.1 deduped
│ │ │ │ ├── mississippi@1.3.0 deduped
│ │ │ │ ├─┬ node-fetch-npm@2.0.1
│ │ │ │ │ ├─┬ encoding@0.1.12
│ │ │ │ │ │ └── iconv-lite@0.4.18
│ │ │ │ │ ├─┬ json-parse-helpfulerror@1.0.3
│ │ │ │ │ │ └── jju@1.3.0
│ │ │ │ │ └── safe-buffer@5.1.1 deduped
│ │ │ │ ├── promise-retry@1.1.1 deduped
│ │ │ │ ├─┬ socks-proxy-agent@3.0.0
│ │ │ │ │ ├─┬ agent-base@4.1.0
│ │ │ │ │ │ └─┬ es6-promisify@5.0.0
│ │ │ │ │ │   └── es6-promise@4.1.1
│ │ │ │ │ └─┬ socks@1.1.10
│ │ │ │ │   ├── ip@1.1.5
│ │ │ │ │   └── smart-buffer@1.1.15
│ │ │ │ └── ssri@4.1.6 deduped
│ │ │ ├─┬ minimatch@3.0.4
│ │ │ │ └─┬ brace-expansion@1.1.8
│ │ │ │   ├── balanced-match@1.0.0
│ │ │ │   └── concat-map@0.0.1
│ │ │ ├── mississippi@1.3.0 deduped
│ │ │ ├── normalize-package-data@2.4.0 deduped
│ │ │ ├── npm-package-arg@5.1.2 deduped
│ │ │ ├─┬ npm-pick-manifest@1.0.4
│ │ │ │ ├── npm-package-arg@5.1.2 deduped
│ │ │ │ └── semver@5.3.0 deduped
│ │ │ ├── osenv@0.1.4 deduped
│ │ │ ├── promise-inflight@1.0.1 deduped
│ │ │ ├─┬ promise-retry@1.1.1
│ │ │ │ ├── err-code@1.1.2
│ │ │ │ └── retry@0.10.1 deduped
│ │ │ ├─┬ protoduck@4.0.0
│ │ │ │ └── genfun@4.0.1
│ │ │ ├── safe-buffer@5.1.1 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── ssri@4.1.6 deduped
│ │ │ ├─┬ tar-fs@1.15.3
│ │ │ │ ├── chownr@1.0.1 deduped
│ │ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ │ ├─┬ pump@1.0.2
│ │ │ │ │ ├─┬ end-of-stream@1.4.0
│ │ │ │ │ │ └── once@1.4.0 deduped
│ │ │ │ │ └── once@1.4.0 deduped
│ │ │ │ └── tar-stream@1.5.4 deduped
│ │ │ ├─┬ tar-stream@1.5.4
│ │ │ │ ├─┬ bl@1.2.1
│ │ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ │ ├─┬ end-of-stream@1.4.0
│ │ │ │ │ └── once@1.4.0 deduped
│ │ │ │ ├── readable-stream@2.3.2 deduped
│ │ │ │ └── xtend@4.0.1
│ │ │ ├── unique-filename@1.1.0 deduped
│ │ │ └── which@1.2.14 deduped
│ │ ├── path-is-inside@1.0.2
│ │ ├── promise-inflight@1.0.1
│ │ ├─┬ read@1.0.7
│ │ │ └── mute-stream@0.0.7
│ │ ├─┬ read-cmd-shim@1.0.1
│ │ │ └── graceful-fs@4.1.11 deduped
│ │ ├─┬ read-installed@4.0.3
│ │ │ ├── debuglog@1.0.1 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── read-package-json@2.0.9 deduped
│ │ │ ├── readdir-scoped-modules@1.0.2 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── slide@1.1.6 deduped
│ │ │ └── util-extend@1.0.3
│ │ ├─┬ read-package-json@2.0.9
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├─┬ json-parse-helpfulerror@1.0.3
│ │ │ │ └── jju@1.3.0
│ │ │ └── normalize-package-data@2.4.0 deduped
│ │ ├─┬ read-package-tree@5.1.6
│ │ │ ├── debuglog@1.0.1 deduped
│ │ │ ├── dezalgo@1.0.3 deduped
│ │ │ ├── once@1.4.0 deduped
│ │ │ ├── read-package-json@2.0.9 deduped
│ │ │ └── readdir-scoped-modules@1.0.2 deduped
│ │ ├─┬ readable-stream@2.3.2
│ │ │ ├── core-util-is@1.0.2
│ │ │ ├── inherits@2.0.3 deduped
│ │ │ ├── isarray@1.0.0
│ │ │ ├── process-nextick-args@1.0.7
│ │ │ ├── safe-buffer@5.1.1 deduped
│ │ │ ├─┬ string_decoder@1.0.3
│ │ │ │ └── safe-buffer@5.1.1 deduped
│ │ │ └── util-deprecate@1.0.2
│ │ ├─┬ readdir-scoped-modules@1.0.2
│ │ │ ├── debuglog@1.0.1 deduped
│ │ │ ├── dezalgo@1.0.3 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ └── once@1.4.0 deduped
│ │ ├─┬ request@2.81.0
│ │ │ ├── aws-sign2@0.6.0
│ │ │ ├── aws4@1.6.0
│ │ │ ├── caseless@0.12.0
│ │ │ ├─┬ combined-stream@1.0.5
│ │ │ │ └── delayed-stream@1.0.0
│ │ │ ├── extend@3.0.1
│ │ │ ├── forever-agent@0.6.1
│ │ │ ├─┬ form-data@2.1.4
│ │ │ │ ├── asynckit@0.4.0
│ │ │ │ ├── combined-stream@1.0.5 deduped
│ │ │ │ └── mime-types@2.1.15 deduped
│ │ │ ├─┬ har-validator@4.2.1
│ │ │ │ ├─┬ ajv@4.11.8
│ │ │ │ │ ├── co@4.6.0
│ │ │ │ │ └─┬ json-stable-stringify@1.0.1
│ │ │ │ │   └── jsonify@0.0.0
│ │ │ │ └── har-schema@1.0.5
│ │ │ ├─┬ hawk@3.1.3
│ │ │ │ ├─┬ boom@2.10.1
│ │ │ │ │ └── hoek@2.16.3 deduped
│ │ │ │ ├─┬ cryptiles@2.0.5
│ │ │ │ │ └── boom@2.10.1 deduped
│ │ │ │ ├── hoek@2.16.3
│ │ │ │ └─┬ sntp@1.0.9
│ │ │ │   └── hoek@2.16.3 deduped
│ │ │ ├─┬ http-signature@1.1.1
│ │ │ │ ├── assert-plus@0.2.0
│ │ │ │ ├─┬ jsprim@1.4.0
│ │ │ │ │ ├── assert-plus@1.0.0
│ │ │ │ │ ├── extsprintf@1.0.2
│ │ │ │ │ ├── json-schema@0.2.3
│ │ │ │ │ └─┬ verror@1.3.6
│ │ │ │ │   └── extsprintf@1.0.2 deduped
│ │ │ │ └─┬ sshpk@1.13.1
│ │ │ │   ├── asn1@0.2.3
│ │ │ │   ├── assert-plus@1.0.0
│ │ │ │   ├─┬ bcrypt-pbkdf@1.0.1
│ │ │ │   │ └── tweetnacl@0.14.5 deduped
│ │ │ │   ├─┬ dashdash@1.14.1
│ │ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │ │   ├─┬ ecc-jsbn@0.1.1
│ │ │ │   │ └── jsbn@0.1.1 deduped
│ │ │ │   ├─┬ getpass@0.1.7
│ │ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │ │   ├── jsbn@0.1.1
│ │ │ │   └── tweetnacl@0.14.5
│ │ │ ├── is-typedarray@1.0.0
│ │ │ ├── isstream@0.1.2
│ │ │ ├── json-stringify-safe@5.0.1
│ │ │ ├─┬ mime-types@2.1.15
│ │ │ │ └── mime-db@1.27.0
│ │ │ ├── oauth-sign@0.8.2
│ │ │ ├── performance-now@0.2.0
│ │ │ ├── qs@6.4.0
│ │ │ ├── safe-buffer@5.1.1 deduped
│ │ │ ├── stringstream@0.0.5
│ │ │ ├─┬ tough-cookie@2.3.2
│ │ │ │ └── punycode@1.4.1
│ │ │ ├─┬ tunnel-agent@0.6.0
│ │ │ │ └── safe-buffer@5.1.1 deduped
│ │ │ └── uuid@3.1.0 deduped
│ │ ├── retry@0.10.1
│ │ ├─┬ rimraf@2.6.1
│ │ │ └── glob@7.1.2 deduped
│ │ ├── safe-buffer@5.1.1
│ │ ├── semver@5.3.0
│ │ ├─┬ sha@2.0.1
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ └── readable-stream@2.3.2 deduped
│ │ ├── slide@1.1.6
│ │ ├── sorted-object@2.0.1
│ │ ├─┬ sorted-union-stream@2.1.3
│ │ │ ├─┬ from2@1.3.0
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └─┬ readable-stream@1.1.14
│ │ │ │   ├── core-util-is@1.0.2
│ │ │ │   ├── inherits@2.0.3 deduped
│ │ │ │   ├── isarray@0.0.1
│ │ │ │   └── string_decoder@0.10.31
│ │ │ └─┬ stream-iterate@1.2.0
│ │ │   ├── readable-stream@2.3.2 deduped
│ │ │   └── stream-shift@1.0.0
│ │ ├─┬ ssri@4.1.6
│ │ │ └── safe-buffer@5.1.1 deduped
│ │ ├─┬ strip-ansi@4.0.0
│ │ │ └── ansi-regex@3.0.0
│ │ ├─┬ tar@2.2.1
│ │ │ ├─┬ block-stream@0.0.9
│ │ │ │ └── inherits@2.0.3 deduped
│ │ │ ├── fstream@1.0.11 deduped
│ │ │ └── inherits@2.0.3 deduped
│ │ ├── text-table@0.2.0
│ │ ├── uid-number@0.0.6
│ │ ├── umask@1.1.0
│ │ ├─┬ unique-filename@1.1.0
│ │ │ └─┬ unique-slug@2.0.0
│ │ │   └── imurmurhash@0.1.4 deduped
│ │ ├── unpipe@1.0.0
│ │ ├─┬ update-notifier@2.2.0
│ │ │ ├─┬ boxen@1.1.0
│ │ │ │ ├─┬ ansi-align@2.0.0
│ │ │ │ │ └── string-width@2.1.0 deduped
│ │ │ │ ├── camelcase@4.1.0
│ │ │ │ ├── chalk@1.1.3 deduped
│ │ │ │ ├── cli-boxes@1.0.0
│ │ │ │ ├─┬ string-width@2.1.0
│ │ │ │ │ ├── is-fullwidth-code-point@2.0.0
│ │ │ │ │ └─┬ strip-ansi@4.0.0
│ │ │ │ │   └── ansi-regex@3.0.0 deduped
│ │ │ │ ├─┬ term-size@0.1.1
│ │ │ │ │ └─┬ execa@0.4.0
│ │ │ │ │   ├─┬ cross-spawn-async@2.2.5
│ │ │ │ │   │ ├── lru-cache@4.1.1 deduped
│ │ │ │ │   │ └── which@1.2.14 deduped
│ │ │ │ │   ├── is-stream@1.1.0
│ │ │ │ │   ├─┬ npm-run-path@1.0.0
│ │ │ │ │   │ └── path-key@1.0.0 deduped
│ │ │ │ │   ├── object-assign@4.1.1
│ │ │ │ │   ├── path-key@1.0.0
│ │ │ │ │   └── strip-eof@1.0.0
│ │ │ │ └─┬ widest-line@1.0.0
│ │ │ │   └─┬ string-width@1.0.2
│ │ │ │     ├── code-point-at@1.1.0
│ │ │ │     ├─┬ is-fullwidth-code-point@1.0.0
│ │ │ │     │ └── number-is-nan@1.0.1
│ │ │ │     └─┬ strip-ansi@3.0.1
│ │ │ │       └── ansi-regex@2.1.1
│ │ │ ├─┬ chalk@1.1.3
│ │ │ │ ├── ansi-styles@2.2.1
│ │ │ │ ├── escape-string-regexp@1.0.5
│ │ │ │ ├─┬ has-ansi@2.0.0
│ │ │ │ │ └── ansi-regex@2.1.1
│ │ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ │ └── ansi-regex@2.1.1
│ │ │ │ └── supports-color@2.0.0
│ │ │ ├─┬ configstore@3.1.0
│ │ │ │ ├─┬ dot-prop@4.1.1
│ │ │ │ │ └── is-obj@1.0.1
│ │ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ │ ├─┬ make-dir@1.0.0
│ │ │ │ │ └── pify@2.3.0
│ │ │ │ ├─┬ unique-string@1.0.0
│ │ │ │ │ └── crypto-random-string@1.0.0
│ │ │ │ ├── write-file-atomic@2.1.0 deduped
│ │ │ │ └── xdg-basedir@3.0.0 deduped
│ │ │ ├── import-lazy@2.1.0
│ │ │ ├── is-npm@1.0.0
│ │ │ ├─┬ latest-version@3.1.0
│ │ │ │ └─┬ package-json@4.0.1
│ │ │ │   ├─┬ got@6.7.1
│ │ │ │   │ ├─┬ create-error-class@3.0.2
│ │ │ │   │ │ └── capture-stack-trace@1.0.0
│ │ │ │   │ ├── duplexer3@0.1.4
│ │ │ │   │ ├── get-stream@3.0.0
│ │ │ │   │ ├── is-redirect@1.0.0
│ │ │ │   │ ├── is-retry-allowed@1.1.0
│ │ │ │   │ ├── is-stream@1.1.0
│ │ │ │   │ ├── lowercase-keys@1.0.0
│ │ │ │   │ ├── safe-buffer@5.1.1 deduped
│ │ │ │   │ ├── timed-out@4.0.1
│ │ │ │   │ ├── unzip-response@2.0.1
│ │ │ │   │ └─┬ url-parse-lax@1.0.0
│ │ │ │   │   └── prepend-http@1.0.4
│ │ │ │   ├─┬ registry-auth-token@3.3.1
│ │ │ │   │ ├─┬ rc@1.2.1
│ │ │ │   │ │ ├── deep-extend@0.4.2
│ │ │ │   │ │ ├── ini@1.3.4 deduped
│ │ │ │   │ │ ├── minimist@1.2.0
│ │ │ │   │ │ └── strip-json-comments@2.0.1
│ │ │ │   │ └── safe-buffer@5.1.1 deduped
│ │ │ │   ├─┬ registry-url@3.1.0
│ │ │ │   │ └─┬ rc@1.2.1
│ │ │ │   │   ├── deep-extend@0.4.2
│ │ │ │   │   ├── ini@1.3.4 deduped
│ │ │ │   │   ├── minimist@1.2.0
│ │ │ │   │   └── strip-json-comments@2.0.1
│ │ │ │   └── semver@5.3.0 deduped
│ │ │ ├─┬ semver-diff@2.1.0
│ │ │ │ └── semver@5.3.0 deduped
│ │ │ └── xdg-basedir@3.0.0
│ │ ├── uuid@3.1.0
│ │ ├─┬ validate-npm-package-license@3.0.1
│ │ │ ├─┬ spdx-correct@1.0.2
│ │ │ │ └── spdx-license-ids@1.2.2
│ │ │ └── spdx-expression-parse@1.0.4
│ │ ├─┬ validate-npm-package-name@3.0.0
│ │ │ └── builtins@1.0.3
│ │ ├─┬ which@1.2.14
│ │ │ └── isexe@2.0.0
│ │ ├─┬ worker-farm@1.3.1
│ │ │ ├─┬ errno@0.1.4
│ │ │ │ └── prr@0.0.0
│ │ │ └── xtend@4.0.1
│ │ ├── wrappy@1.0.2
│ │ └─┬ write-file-atomic@2.1.0
│ │   ├── graceful-fs@4.1.11 deduped
│ │   ├── imurmurhash@0.1.4 deduped
│ │   └── slide@1.1.6 deduped
│ ├─┬ npmi@1.0.1
│ │ ├─┬ npm@2.15.12
│ │ │ ├── abbrev@1.0.9
│ │ │ ├── ansi@0.3.1
│ │ │ ├── ansi-regex@2.0.0
│ │ │ ├── ansicolors@0.3.2
│ │ │ ├── ansistyles@0.1.3
│ │ │ ├── archy@1.0.0
│ │ │ ├─┬ async-some@1.0.2
│ │ │ │ └── dezalgo@1.0.3 deduped
│ │ │ ├─┬ block-stream@0.0.9
│ │ │ │ └── inherits@2.0.3 deduped
│ │ │ ├── char-spinner@1.0.1
│ │ │ ├── chmodr@1.0.2
│ │ │ ├── chownr@1.0.1
│ │ │ ├─┬ cmd-shim@2.0.2
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ └── mkdirp@0.5.1 deduped
│ │ │ ├─┬ columnify@1.5.4
│ │ │ │ ├── strip-ansi@3.0.1 deduped
│ │ │ │ └─┬ wcwidth@1.0.0
│ │ │ │   └─┬ defaults@1.0.3
│ │ │ │     └── clone@1.0.2
│ │ │ ├─┬ config-chain@1.1.10
│ │ │ │ ├── ini@1.3.4 deduped
│ │ │ │ └── proto-list@1.2.4
│ │ │ ├─┬ dezalgo@1.0.3
│ │ │ │ ├── asap@2.0.3
│ │ │ │ └── wrappy@1.0.2 deduped
│ │ │ ├── editor@1.0.0
│ │ │ ├─┬ fs-vacuum@1.2.9
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── path-is-inside@1.0.1 deduped
│ │ │ │ └── rimraf@2.5.4 deduped
│ │ │ ├─┬ fs-write-stream-atomic@1.0.8
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── iferr@0.1.5
│ │ │ │ ├── imurmurhash@0.1.4 deduped
│ │ │ │ └── readable-stream@2.1.5 deduped
│ │ │ ├─┬ fstream@1.0.10
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ │ └── rimraf@2.5.4 deduped
│ │ │ ├─┬ fstream-npm@1.1.1
│ │ │ │ ├─┬ fstream-ignore@1.0.5
│ │ │ │ │ ├── fstream@1.0.10 deduped
│ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ └── minimatch@3.0.3 deduped
│ │ │ │ └── inherits@2.0.3 deduped
│ │ │ ├── github-url-from-git@1.4.0
│ │ │ ├── github-url-from-username-repo@1.0.2
│ │ │ ├─┬ glob@7.0.6
│ │ │ │ ├── fs.realpath@1.0.0
│ │ │ │ ├── inflight@1.0.5 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── minimatch@3.0.3 deduped
│ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ └── path-is-absolute@1.0.0
│ │ │ ├── graceful-fs@4.1.6
│ │ │ ├── hosted-git-info@2.1.5
│ │ │ ├── imurmurhash@0.1.4
│ │ │ ├─┬ inflight@1.0.5
│ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ └── wrappy@1.0.2 deduped
│ │ │ ├── inherits@2.0.3
│ │ │ ├── ini@1.3.4
│ │ │ ├─┬ init-package-json@1.9.4
│ │ │ │ ├─┬ glob@6.0.4
│ │ │ │ │ ├── inflight@1.0.5 deduped
│ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ ├── minimatch@3.0.3 deduped
│ │ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ │ └── path-is-absolute@1.0.0
│ │ │ │ ├── npm-package-arg@4.1.0 deduped
│ │ │ │ ├─┬ promzard@0.3.0
│ │ │ │ │ └── read@1.0.7 deduped
│ │ │ │ ├── read@1.0.7 deduped
│ │ │ │ ├── read-package-json@2.0.4 deduped
│ │ │ │ ├── semver@5.1.0 deduped
│ │ │ │ ├── validate-npm-package-license@3.0.1 deduped
│ │ │ │ └── validate-npm-package-name@2.2.2 deduped
│ │ │ ├── lockfile@1.0.1
│ │ │ ├─┬ lru-cache@4.0.1
│ │ │ │ ├── pseudomap@1.0.2
│ │ │ │ └── yallist@2.0.0
│ │ │ ├─┬ minimatch@3.0.3
│ │ │ │ └─┬ brace-expansion@1.1.6
│ │ │ │   ├── balanced-match@0.4.2
│ │ │ │   └── concat-map@0.0.1
│ │ │ ├─┬ mkdirp@0.5.1
│ │ │ │ └── minimist@0.0.8
│ │ │ ├─┬ node-gyp@3.6.0
│ │ │ │ ├── fstream@1.0.10 deduped
│ │ │ │ ├── glob@7.0.6 deduped
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── minimatch@3.0.3 deduped
│ │ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ │ ├── nopt@3.0.6 deduped
│ │ │ │ ├── npmlog@2.0.4 deduped
│ │ │ │ ├── osenv@0.1.3 deduped
│ │ │ │ ├── request@2.74.0 deduped
│ │ │ │ ├── rimraf@2.5.4 deduped
│ │ │ │ ├── semver@5.3.0
│ │ │ │ ├── tar@2.2.1 deduped
│ │ │ │ └── which@1.2.11 deduped
│ │ │ ├─┬ nopt@3.0.6
│ │ │ │ └── abbrev@1.0.9 deduped
│ │ │ ├── normalize-git-url@3.0.2
│ │ │ ├─┬ normalize-package-data@2.3.5
│ │ │ │ ├── hosted-git-info@2.1.5 deduped
│ │ │ │ ├─┬ is-builtin-module@1.0.0
│ │ │ │ │ └── builtin-modules@1.1.0
│ │ │ │ ├── semver@5.1.0 deduped
│ │ │ │ └── validate-npm-package-license@3.0.1 deduped
│ │ │ ├── npm-cache-filename@1.0.2
│ │ │ ├─┬ npm-install-checks@1.0.7
│ │ │ │ ├── npmlog@2.0.4 deduped
│ │ │ │ └── semver@5.1.0 deduped
│ │ │ ├─┬ npm-package-arg@4.1.0
│ │ │ │ ├── hosted-git-info@2.1.5 deduped
│ │ │ │ └── semver@5.1.0 deduped
│ │ │ ├─┬ npm-registry-client@7.2.1
│ │ │ │ ├─┬ concat-stream@1.5.2
│ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ ├─┬ readable-stream@2.0.6
│ │ │ │ │ │ ├── core-util-is@1.0.2
│ │ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ │ ├── isarray@1.0.0
│ │ │ │ │ │ ├── process-nextick-args@1.0.7
│ │ │ │ │ │ ├── string_decoder@0.10.31
│ │ │ │ │ │ └── util-deprecate@1.0.2
│ │ │ │ │ └── typedarray@0.0.6
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── normalize-package-data@2.3.5 deduped
│ │ │ │ ├── npm-package-arg@4.1.0 deduped
│ │ │ │ ├── npmlog@2.0.4 deduped
│ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ ├── request@2.74.0 deduped
│ │ │ │ ├── retry@0.10.0
│ │ │ │ ├── semver@5.1.0 deduped
│ │ │ │ └── slide@1.1.6 deduped
│ │ │ ├── npm-user-validate@0.1.5
│ │ │ ├─┬ npmlog@2.0.4
│ │ │ │ ├── ansi@0.3.1 deduped
│ │ │ │ ├─┬ are-we-there-yet@1.1.2
│ │ │ │ │ ├── delegates@1.0.0
│ │ │ │ │ └── readable-stream@2.1.5 deduped
│ │ │ │ └─┬ gauge@1.2.7
│ │ │ │   ├── ansi@0.3.1 deduped
│ │ │ │   ├── has-unicode@2.0.0
│ │ │ │   ├─┬ lodash.pad@4.4.0
│ │ │ │   │ ├── lodash._baseslice@4.0.0
│ │ │ │   │ ├── lodash._basetostring@4.12.0
│ │ │ │   │ └── lodash.tostring@4.1.4
│ │ │ │   ├─┬ lodash.padend@4.5.0
│ │ │ │   │ ├── lodash._baseslice@4.0.0 deduped
│ │ │ │   │ ├── lodash._basetostring@4.12.0 deduped
│ │ │ │   │ └── lodash.tostring@4.1.4 deduped
│ │ │ │   └─┬ lodash.padstart@4.5.0
│ │ │ │     ├── lodash._baseslice@4.0.0 deduped
│ │ │ │     ├── lodash._basetostring@4.12.0 deduped
│ │ │ │     └── lodash.tostring@4.1.4 deduped
│ │ │ ├─┬ once@1.4.0
│ │ │ │ └── wrappy@1.0.2 deduped
│ │ │ ├── opener@1.4.1
│ │ │ ├─┬ osenv@0.1.3
│ │ │ │ ├── os-homedir@1.0.0
│ │ │ │ └── os-tmpdir@1.0.1
│ │ │ ├── path-is-inside@1.0.1
│ │ │ ├─┬ read@1.0.7
│ │ │ │ └── mute-stream@0.0.5
│ │ │ ├─┬ read-installed@4.0.3
│ │ │ │ ├── debuglog@1.0.1
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── read-package-json@2.0.4 deduped
│ │ │ │ ├─┬ readdir-scoped-modules@1.0.2
│ │ │ │ │ ├── debuglog@1.0.1 deduped
│ │ │ │ │ ├── dezalgo@1.0.3 deduped
│ │ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ │ └── once@1.4.0 deduped
│ │ │ │ ├── semver@5.1.0 deduped
│ │ │ │ ├── slide@1.1.6 deduped
│ │ │ │ └── util-extend@1.0.1
│ │ │ ├─┬ read-package-json@2.0.4
│ │ │ │ ├─┬ glob@6.0.4
│ │ │ │ │ ├── inflight@1.0.5 deduped
│ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ ├── minimatch@3.0.3 deduped
│ │ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ │ └── path-is-absolute@1.0.0
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├─┬ json-parse-helpfulerror@1.0.3
│ │ │ │ │ └── jju@1.3.0
│ │ │ │ └── normalize-package-data@2.3.5 deduped
│ │ │ ├─┬ readable-stream@2.1.5
│ │ │ │ ├── buffer-shims@1.0.0
│ │ │ │ ├── core-util-is@1.0.2
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── isarray@1.0.0
│ │ │ │ ├── process-nextick-args@1.0.7
│ │ │ │ ├── string_decoder@0.10.31
│ │ │ │ └── util-deprecate@1.0.2
│ │ │ ├─┬ realize-package-specifier@3.0.1
│ │ │ │ ├── dezalgo@1.0.3 deduped
│ │ │ │ └── npm-package-arg@4.1.0 deduped
│ │ │ ├─┬ request@2.74.0
│ │ │ │ ├── aws-sign2@0.6.0
│ │ │ │ ├── aws4@1.4.1
│ │ │ │ ├─┬ bl@1.1.2
│ │ │ │ │ └─┬ readable-stream@2.0.6
│ │ │ │ │   ├── core-util-is@1.0.2
│ │ │ │ │   ├── inherits@2.0.3 deduped
│ │ │ │ │   ├── isarray@1.0.0
│ │ │ │ │   ├── process-nextick-args@1.0.7
│ │ │ │ │   ├── string_decoder@0.10.31
│ │ │ │ │   └── util-deprecate@1.0.2
│ │ │ │ ├── caseless@0.11.0
│ │ │ │ ├─┬ combined-stream@1.0.5
│ │ │ │ │ └── delayed-stream@1.0.0
│ │ │ │ ├── extend@3.0.0
│ │ │ │ ├── forever-agent@0.6.1
│ │ │ │ ├─┬ form-data@1.0.0-rc4
│ │ │ │ │ ├── async@1.5.2
│ │ │ │ │ ├── combined-stream@1.0.5 deduped
│ │ │ │ │ └── mime-types@2.1.11 deduped
│ │ │ │ ├─┬ har-validator@2.0.6
│ │ │ │ │ ├─┬ chalk@1.1.3
│ │ │ │ │ │ ├── ansi-styles@2.2.1
│ │ │ │ │ │ ├── escape-string-regexp@1.0.5
│ │ │ │ │ │ ├─┬ has-ansi@2.0.0
│ │ │ │ │ │ │ └── ansi-regex@2.0.0 deduped
│ │ │ │ │ │ ├── strip-ansi@3.0.1 deduped
│ │ │ │ │ │ └── supports-color@2.0.0
│ │ │ │ │ ├─┬ commander@2.9.0
│ │ │ │ │ │ └── graceful-readlink@1.0.1
│ │ │ │ │ ├─┬ is-my-json-valid@2.13.1
│ │ │ │ │ │ ├── generate-function@2.0.0
│ │ │ │ │ │ ├─┬ generate-object-property@1.2.0
│ │ │ │ │ │ │ └── is-property@1.0.2
│ │ │ │ │ │ ├── jsonpointer@2.0.0
│ │ │ │ │ │ └── xtend@4.0.1
│ │ │ │ │ └─┬ pinkie-promise@2.0.1
│ │ │ │ │   └── pinkie@2.0.4
│ │ │ │ ├─┬ hawk@3.1.3
│ │ │ │ │ ├─┬ boom@2.10.1
│ │ │ │ │ │ └── hoek@2.16.3 deduped
│ │ │ │ │ ├─┬ cryptiles@2.0.5
│ │ │ │ │ │ └── boom@2.10.1 deduped
│ │ │ │ │ ├── hoek@2.16.3
│ │ │ │ │ └─┬ sntp@1.0.9
│ │ │ │ │   └── hoek@2.16.3 deduped
│ │ │ │ ├─┬ http-signature@1.1.1
│ │ │ │ │ ├── assert-plus@0.2.0
│ │ │ │ │ ├─┬ jsprim@1.3.0
│ │ │ │ │ │ ├── extsprintf@1.0.2
│ │ │ │ │ │ ├── json-schema@0.2.2
│ │ │ │ │ │ └─┬ verror@1.3.6
│ │ │ │ │ │   └── extsprintf@1.0.2 deduped
│ │ │ │ │ └─┬ sshpk@1.9.2
│ │ │ │ │   ├── asn1@0.2.3
│ │ │ │ │   ├── assert-plus@1.0.0
│ │ │ │ │   ├─┬ dashdash@1.14.0
│ │ │ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │ │ │   ├─┬ ecc-jsbn@0.1.1
│ │ │ │ │   │ └── jsbn@0.1.0 deduped
│ │ │ │ │   ├─┬ getpass@0.1.6
│ │ │ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │ │ │   ├─┬ jodid25519@1.0.2
│ │ │ │ │   │ └── jsbn@0.1.0 deduped
│ │ │ │ │   ├── jsbn@0.1.0
│ │ │ │ │   └── tweetnacl@0.13.3
│ │ │ │ ├── is-typedarray@1.0.0
│ │ │ │ ├── isstream@0.1.2
│ │ │ │ ├── json-stringify-safe@5.0.1
│ │ │ │ ├─┬ mime-types@2.1.11
│ │ │ │ │ └── mime-db@1.23.0
│ │ │ │ ├── node-uuid@1.4.7
│ │ │ │ ├── oauth-sign@0.8.2
│ │ │ │ ├── qs@6.2.1
│ │ │ │ ├── stringstream@0.0.5
│ │ │ │ ├── tough-cookie@2.3.1
│ │ │ │ └── tunnel-agent@0.4.3
│ │ │ ├── retry@0.10.0
│ │ │ ├─┬ rimraf@2.5.4
│ │ │ │ └── glob@7.0.6 deduped
│ │ │ ├── semver@5.1.0
│ │ │ ├─┬ sha@2.0.1
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ └─┬ readable-stream@2.0.2
│ │ │ │   ├── core-util-is@1.0.1
│ │ │ │   ├── inherits@2.0.3 deduped
│ │ │ │   ├── isarray@0.0.1
│ │ │ │   ├── process-nextick-args@1.0.3
│ │ │ │   ├── string_decoder@0.10.31
│ │ │ │   └── util-deprecate@1.0.1
│ │ │ ├── slide@1.1.6
│ │ │ ├── sorted-object@2.0.0
│ │ │ ├── spdx-license-ids@1.2.2
│ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ └── ansi-regex@2.0.0 deduped
│ │ │ ├─┬ tar@2.2.1
│ │ │ │ ├── block-stream@0.0.9 deduped
│ │ │ │ ├── fstream@1.0.10 deduped
│ │ │ │ └── inherits@2.0.3 deduped
│ │ │ ├── text-table@0.2.0
│ │ │ ├── uid-number@0.0.6
│ │ │ ├── umask@1.1.0
│ │ │ ├─┬ validate-npm-package-license@3.0.1
│ │ │ │ ├─┬ spdx-correct@1.0.2
│ │ │ │ │ └── spdx-license-ids@1.2.2 deduped
│ │ │ │ └─┬ spdx-expression-parse@1.0.2
│ │ │ │   ├── spdx-exceptions@1.0.4
│ │ │ │   └── spdx-license-ids@1.2.2 deduped
│ │ │ ├─┬ validate-npm-package-name@2.2.2
│ │ │ │ └── builtins@0.0.7
│ │ │ ├─┬ which@1.2.11
│ │ │ │ └── isexe@1.1.2
│ │ │ ├── wrappy@1.0.2
│ │ │ └─┬ write-file-atomic@1.1.4
│ │ │   ├── graceful-fs@4.1.6 deduped
│ │ │   ├── imurmurhash@0.1.4 deduped
│ │ │   └── slide@1.1.6 deduped
│ │ └── semver@4.3.6
│ ├─┬ optimist@0.6.1
│ │ ├── minimist@0.0.10
│ │ └── wordwrap@0.0.3
│ ├── q@1.5.0
│ ├── semver@5.3.0
│ ├─┬ tmp@0.0.31
│ │ └── os-tmpdir@1.0.2
│ └─┬ user-home@2.0.0
│   └── os-homedir@1.0.2
├─┬ npm@6.13.7
│ ├── abbrev@1.1.1
│ ├── ansicolors@0.3.2
│ ├── ansistyles@0.1.3
│ ├── aproba@2.0.0
│ ├── archy@1.0.0
│ ├─┬ bin-links@1.1.7
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── cmd-shim@3.0.3 deduped
│ │ ├── gentle-fs@2.3.0 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── npm-normalize-package-bin@1.0.1
│ │ └── write-file-atomic@2.4.3 deduped
│ ├── bluebird@3.5.5
│ ├── byte-size@5.0.1
│ ├─┬ cacache@12.0.3
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── chownr@1.1.3 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── glob@7.1.4 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── infer-owner@1.0.4 deduped
│ │ ├── lru-cache@5.1.1 deduped
│ │ ├── mississippi@3.0.0 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── move-concurrently@1.0.1 deduped
│ │ ├── promise-inflight@1.0.1 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ ├── ssri@6.0.1 deduped
│ │ ├── unique-filename@1.1.1 deduped
│ │ └── y18n@4.0.0
│ ├── call-limit@1.1.1
│ ├── chownr@1.1.3
│ ├── ci-info@2.0.0
│ ├─┬ cli-columns@3.1.2
│ │ ├─┬ string-width@2.1.1
│ │ │ ├── is-fullwidth-code-point@2.0.0
│ │ │ └─┬ strip-ansi@4.0.0
│ │ │   └── ansi-regex@3.0.0
│ │ └─┬ strip-ansi@3.0.1
│ │   └── ansi-regex@2.1.1
│ ├─┬ cli-table3@0.5.1
│ │ ├── colors@1.3.3
│ │ ├── object-assign@4.1.1
│ │ └── string-width@2.1.1 deduped
│ ├─┬ cmd-shim@3.0.3
│ │ ├── graceful-fs@4.2.3 deduped
│ │ └── mkdirp@0.5.1 deduped
│ ├─┬ columnify@1.5.4
│ │ ├── strip-ansi@3.0.1 deduped
│ │ └─┬ wcwidth@1.0.1
│ │   └─┬ defaults@1.0.3
│ │     └── clone@1.0.4
│ ├─┬ config-chain@1.1.12
│ │ ├── ini@1.3.5 deduped
│ │ └── proto-list@1.2.4
│ ├── debuglog@1.0.1
│ ├── detect-indent@5.0.0
│ ├── detect-newline@2.1.0
│ ├─┬ dezalgo@1.0.3
│ │ ├── asap@2.0.6
│ │ └── wrappy@1.0.2
│ ├── editor@1.0.0
│ ├── figgy-pudding@3.5.1
│ ├── find-npm-prefix@1.0.2
│ ├─┬ fs-vacuum@1.2.10
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── path-is-inside@1.0.2 deduped
│ │ └── rimraf@2.6.3 deduped
│ ├─┬ fs-write-stream-atomic@1.0.10
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── iferr@0.1.5
│ │ ├── imurmurhash@0.1.4 deduped
│ │ └─┬ readable-stream@2.3.6
│ │   ├── core-util-is@1.0.2
│ │   ├── inherits@2.0.4 deduped
│ │   ├── isarray@1.0.0
│ │   ├── process-nextick-args@2.0.0
│ │   ├── safe-buffer@5.1.2 deduped
│ │   ├─┬ string_decoder@1.1.1
│ │   │ └── safe-buffer@5.1.2 deduped
│ │   └── util-deprecate@1.0.2 deduped
│ ├─┬ gentle-fs@2.3.0
│ │ ├── aproba@1.2.0
│ │ ├── chownr@1.1.3 deduped
│ │ ├── cmd-shim@3.0.3 deduped
│ │ ├── fs-vacuum@1.2.10 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── iferr@0.1.5
│ │ ├── infer-owner@1.0.4 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── path-is-inside@1.0.2 deduped
│ │ ├── read-cmd-shim@1.0.5 deduped
│ │ └── slide@1.1.6 deduped
│ ├─┬ glob@7.1.4
│ │ ├── fs.realpath@1.0.0
│ │ ├── inflight@1.0.6 deduped
│ │ ├── inherits@2.0.4 deduped
│ │ ├─┬ minimatch@3.0.4
│ │ │ └─┬ brace-expansion@1.1.11
│ │ │   ├── balanced-match@1.0.0
│ │ │   └── concat-map@0.0.1
│ │ ├── once@1.4.0 deduped
│ │ └── path-is-absolute@1.0.1
│ ├── graceful-fs@4.2.3
│ ├── has-unicode@2.0.1
│ ├── hosted-git-info@2.8.5
│ ├── iferr@1.0.2
│ ├── imurmurhash@0.1.4
│ ├── infer-owner@1.0.4
│ ├─┬ inflight@1.0.6
│ │ ├── once@1.4.0 deduped
│ │ └── wrappy@1.0.2 deduped
│ ├── inherits@2.0.4
│ ├── ini@1.3.5
│ ├─┬ init-package-json@1.10.3
│ │ ├── glob@7.1.4 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├─┬ promzard@0.3.0
│ │ │ └── read@1.0.7 deduped
│ │ ├── read@1.0.7 deduped
│ │ ├── read-package-json@2.1.1 deduped
│ │ ├── semver@5.7.1 deduped
│ │ ├── validate-npm-package-license@3.0.4 deduped
│ │ └── validate-npm-package-name@3.0.0 deduped
│ ├─┬ is-cidr@3.0.0
│ │ └─┬ cidr-regex@2.0.10
│ │   └── ip-regex@2.1.0
│ ├── json-parse-better-errors@1.0.2
│ ├─┬ JSONStream@1.3.5
│ │ ├── jsonparse@1.3.1
│ │ └── through@2.3.8
│ ├── lazy-property@1.0.0
│ ├─┬ libcipm@4.0.7
│ │ ├── bin-links@1.1.7 deduped
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── find-npm-prefix@1.0.2 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── ini@1.3.5 deduped
│ │ ├── lock-verify@2.1.0 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── npm-lifecycle@3.1.4 deduped
│ │ ├── npm-logical-tree@1.2.1
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├── pacote@9.5.12 deduped
│ │ ├── read-package-json@2.1.1 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ └── worker-farm@1.7.0 deduped
│ ├─┬ libnpm@3.0.1
│ │ ├── bin-links@1.1.7 deduped
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── find-npm-prefix@1.0.2 deduped
│ │ ├── libnpmaccess@3.0.2 deduped
│ │ ├─┬ libnpmconfig@1.2.1
│ │ │ ├── figgy-pudding@3.5.1 deduped
│ │ │ ├─┬ find-up@3.0.0
│ │ │ │ └─┬ locate-path@3.0.0
│ │ │ │   ├─┬ p-locate@3.0.0
│ │ │ │   │ └─┬ p-limit@2.2.0
│ │ │ │   │   └── p-try@2.2.0
│ │ │ │   └── path-exists@3.0.0
│ │ │ └── ini@1.3.5 deduped
│ │ ├── libnpmhook@5.0.3 deduped
│ │ ├── libnpmorg@1.0.1 deduped
│ │ ├─┬ libnpmpublish@1.1.2
│ │ │ ├── aproba@2.0.0 deduped
│ │ │ ├── figgy-pudding@3.5.1 deduped
│ │ │ ├── get-stream@4.1.0 deduped
│ │ │ ├── lodash.clonedeep@4.5.0 deduped
│ │ │ ├── normalize-package-data@2.5.0 deduped
│ │ │ ├── npm-package-arg@6.1.1 deduped
│ │ │ ├── npm-registry-fetch@4.0.2 deduped
│ │ │ ├── semver@5.7.1 deduped
│ │ │ └── ssri@6.0.1 deduped
│ │ ├── libnpmsearch@2.0.2 deduped
│ │ ├── libnpmteam@1.0.2 deduped
│ │ ├── lock-verify@2.1.0 deduped
│ │ ├── npm-lifecycle@3.1.4 deduped
│ │ ├── npm-logical-tree@1.2.1 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├── npm-profile@4.0.2 deduped
│ │ ├── npm-registry-fetch@4.0.2 deduped
│ │ ├── npmlog@4.1.2 deduped
│ │ ├── pacote@9.5.12 deduped
│ │ ├── read-package-json@2.1.1 deduped
│ │ └── stringify-package@1.0.1 deduped
│ ├─┬ libnpmaccess@3.0.2
│ │ ├── aproba@2.0.0 deduped
│ │ ├─┬ get-stream@4.1.0
│ │ │ └── pump@3.0.0 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpmhook@5.0.3
│ │ ├── aproba@2.0.0 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpmorg@1.0.1
│ │ ├── aproba@2.0.0 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpmsearch@2.0.2
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpmteam@1.0.2
│ │ ├── aproba@2.0.0 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpx@10.2.2
│ │ ├── dotenv@5.0.1
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ ├── safe-buffer@5.1.2 deduped
│ │ ├── update-notifier@2.5.0 deduped
│ │ ├── which@1.3.1 deduped
│ │ ├── y18n@4.0.0 deduped
│ │ └─┬ yargs@11.1.1
│ │   ├─┬ cliui@4.1.0
│ │   │ ├── string-width@2.1.1 deduped
│ │   │ ├─┬ strip-ansi@4.0.0
│ │   │ │ └── ansi-regex@3.0.0
│ │   │ └─┬ wrap-ansi@2.1.0
│ │   │   ├─┬ string-width@1.0.2
│ │   │   │ ├── code-point-at@1.1.0 deduped
│ │   │   │ ├── is-fullwidth-code-point@1.0.0 deduped
│ │   │   │ └── strip-ansi@3.0.1 deduped
│ │   │   └── strip-ansi@3.0.1 deduped
│ │   ├── decamelize@1.2.0
│ │   ├─┬ find-up@2.1.0
│ │   │ └─┬ locate-path@2.0.0
│ │   │   ├─┬ p-locate@2.0.0
│ │   │   │ └─┬ p-limit@1.2.0
│ │   │   │   └── p-try@1.0.0
│ │   │   └── path-exists@3.0.0 deduped
│ │   ├── get-caller-file@1.0.3
│ │   ├─┬ os-locale@3.1.0
│ │   │ ├─┬ execa@1.0.0
│ │   │ │ ├─┬ cross-spawn@6.0.5
│ │   │ │ │ ├── nice-try@1.0.5
│ │   │ │ │ ├── path-key@2.0.1 deduped
│ │   │ │ │ ├── semver@5.7.1 deduped
│ │   │ │ │ ├─┬ shebang-command@1.2.0
│ │   │ │ │ │ └── shebang-regex@1.0.0
│ │   │ │ │ └── which@1.3.1 deduped
│ │   │ │ ├── get-stream@4.1.0 deduped
│ │   │ │ ├── is-stream@1.1.0
│ │   │ │ ├─┬ npm-run-path@2.0.2
│ │   │ │ │ └── path-key@2.0.1
│ │   │ │ ├── p-finally@1.0.0
│ │   │ │ ├── signal-exit@3.0.2 deduped
│ │   │ │ └── strip-eof@1.0.0
│ │   │ ├─┬ lcid@2.0.0
│ │   │ │ └── invert-kv@2.0.0
│ │   │ └─┬ mem@4.3.0
│ │   │   ├─┬ map-age-cleaner@0.1.3
│ │   │   │ └── p-defer@1.0.0
│ │   │   ├── mimic-fn@2.1.0
│ │   │   └── p-is-promise@2.1.0
│ │   ├── require-directory@2.1.1
│ │   ├── require-main-filename@1.0.1
│ │   ├── set-blocking@2.0.0 deduped
│ │   ├── string-width@2.1.1 deduped
│ │   ├── which-module@2.0.0
│ │   ├── y18n@3.2.1
│ │   └─┬ yargs-parser@9.0.2
│ │     └── camelcase@4.1.0 deduped
│ ├─┬ lock-verify@2.1.0
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ └── semver@5.7.1 deduped
│ ├─┬ lockfile@1.0.4
│ │ └── signal-exit@3.0.2
│ ├── lodash._baseindexof@3.1.0
│ ├─┬ lodash._baseuniq@4.6.0
│ │ ├── lodash._createset@4.0.3
│ │ └── lodash._root@3.0.1
│ ├── lodash._bindcallback@3.0.1
│ ├── lodash._cacheindexof@3.0.2
│ ├─┬ lodash._createcache@3.1.2
│ │ └── lodash._getnative@3.9.1 deduped
│ ├── lodash._getnative@3.9.1
│ ├── lodash.clonedeep@4.5.0
│ ├── lodash.restparam@3.6.1
│ ├── lodash.union@4.6.0
│ ├── lodash.uniq@4.5.0
│ ├── lodash.without@4.4.0
│ ├─┬ lru-cache@5.1.1
│ │ └── yallist@3.0.3
│ ├── meant@1.0.1
│ ├─┬ mississippi@3.0.0
│ │ ├─┬ concat-stream@1.6.2
│ │ │ ├── buffer-from@1.0.0
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ ├─┬ readable-stream@2.3.6
│ │ │ │ ├── core-util-is@1.0.2 deduped
│ │ │ │ ├── inherits@2.0.4 deduped
│ │ │ │ ├── isarray@1.0.0 deduped
│ │ │ │ ├── process-nextick-args@2.0.0 deduped
│ │ │ │ ├── safe-buffer@5.1.2 deduped
│ │ │ │ ├─┬ string_decoder@1.1.1
│ │ │ │ │ └── safe-buffer@5.1.2 deduped
│ │ │ │ └── util-deprecate@1.0.2 deduped
│ │ │ └── typedarray@0.0.6
│ │ ├─┬ duplexify@3.6.0
│ │ │ ├── end-of-stream@1.4.1 deduped
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ ├─┬ readable-stream@2.3.6
│ │ │ │ ├── core-util-is@1.0.2 deduped
│ │ │ │ ├── inherits@2.0.4 deduped
│ │ │ │ ├── isarray@1.0.0 deduped
│ │ │ │ ├── process-nextick-args@2.0.0 deduped
│ │ │ │ ├── safe-buffer@5.1.2 deduped
│ │ │ │ ├─┬ string_decoder@1.1.1
│ │ │ │ │ └── safe-buffer@5.1.2 deduped
│ │ │ │ └── util-deprecate@1.0.2 deduped
│ │ │ └── stream-shift@1.0.0
│ │ ├─┬ end-of-stream@1.4.1
│ │ │ └── once@1.4.0 deduped
│ │ ├─┬ flush-write-stream@1.0.3
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ readable-stream@2.3.6
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@1.0.0 deduped
│ │ │   ├── process-nextick-args@2.0.0 deduped
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ string_decoder@1.1.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   └── util-deprecate@1.0.2 deduped
│ │ ├─┬ from2@2.3.0
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ readable-stream@2.3.6
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@1.0.0 deduped
│ │ │   ├── process-nextick-args@2.0.0 deduped
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ string_decoder@1.1.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   └── util-deprecate@1.0.2 deduped
│ │ ├─┬ parallel-transform@1.1.0
│ │ │ ├── cyclist@0.2.2
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ readable-stream@2.3.6
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@1.0.0 deduped
│ │ │   ├── process-nextick-args@2.0.0 deduped
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ string_decoder@1.1.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   └── util-deprecate@1.0.2 deduped
│ │ ├─┬ pump@3.0.0
│ │ │ ├── end-of-stream@1.4.1 deduped
│ │ │ └── once@1.4.0 deduped
│ │ ├─┬ pumpify@1.5.1
│ │ │ ├── duplexify@3.6.0 deduped
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ pump@2.0.1
│ │ │   ├── end-of-stream@1.4.1 deduped
│ │ │   └── once@1.4.0 deduped
│ │ ├─┬ stream-each@1.2.2
│ │ │ ├── end-of-stream@1.4.1 deduped
│ │ │ └── stream-shift@1.0.0 deduped
│ │ └─┬ through2@2.0.3
│ │   ├─┬ readable-stream@2.3.6
│ │   │ ├── core-util-is@1.0.2 deduped
│ │   │ ├── inherits@2.0.4 deduped
│ │   │ ├── isarray@1.0.0 deduped
│ │   │ ├── process-nextick-args@2.0.0 deduped
│ │   │ ├── safe-buffer@5.1.2 deduped
│ │   │ ├─┬ string_decoder@1.1.1
│ │   │ │ └── safe-buffer@5.1.2 deduped
│ │   │ └── util-deprecate@1.0.2 deduped
│ │   └── xtend@4.0.1
│ ├─┬ mkdirp@0.5.1
│ │ └── minimist@0.0.8
│ ├─┬ move-concurrently@1.0.1
│ │ ├── aproba@1.2.0
│ │ ├─┬ copy-concurrently@1.0.5
│ │ │ ├── aproba@1.2.0
│ │ │ ├── fs-write-stream-atomic@1.0.10 deduped
│ │ │ ├── iferr@0.1.5
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ ├── rimraf@2.6.3 deduped
│ │ │ └── run-queue@1.0.3 deduped
│ │ ├── fs-write-stream-atomic@1.0.10 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ └─┬ run-queue@1.0.3
│ │   └── aproba@1.2.0
│ ├─┬ node-gyp@5.0.7
│ │ ├── env-paths@2.2.0
│ │ ├── glob@7.1.4 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── nopt@4.0.1 deduped
│ │ ├── npmlog@4.1.2 deduped
│ │ ├── request@2.88.0 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ ├── semver@5.7.1 deduped
│ │ ├── tar@4.4.13 deduped
│ │ └── which@1.3.1 deduped
│ ├─┬ nopt@4.0.1
│ │ ├── abbrev@1.1.1 deduped
│ │ └── osenv@0.1.5 deduped
│ ├─┬ normalize-package-data@2.5.0
│ │ ├── hosted-git-info@2.8.5 deduped
│ │ ├─┬ resolve@1.10.0
│ │ │ └── path-parse@1.0.6
│ │ ├── semver@5.7.1 deduped
│ │ └── validate-npm-package-license@3.0.4 deduped
│ ├─┬ npm-audit-report@1.3.2
│ │ ├── cli-table3@0.5.1 deduped
│ │ └── console-control-strings@1.1.0
│ ├── npm-cache-filename@1.0.2
│ ├─┬ npm-install-checks@3.0.2
│ │ └── semver@5.7.1 deduped
│ ├─┬ npm-lifecycle@3.1.4
│ │ ├── byline@5.0.0
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── node-gyp@5.0.7 deduped
│ │ ├── resolve-from@4.0.0
│ │ ├── slide@1.1.6 deduped
│ │ ├── uid-number@0.0.6 deduped
│ │ ├── umask@1.1.0 deduped
│ │ └── which@1.3.1 deduped
│ ├─┬ npm-package-arg@6.1.1
│ │ ├── hosted-git-info@2.8.5 deduped
│ │ ├── osenv@0.1.5 deduped
│ │ ├── semver@5.7.1 deduped
│ │ └── validate-npm-package-name@3.0.0 deduped
│ ├─┬ npm-packlist@1.4.7
│ │ ├─┬ ignore-walk@3.0.3
│ │ │ └── minimatch@3.0.4 deduped
│ │ └─┬ npm-bundled@1.1.1
│ │   └── npm-normalize-package-bin@1.0.1 deduped
│ ├─┬ npm-pick-manifest@3.0.2
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ └── semver@5.7.1 deduped
│ ├─┬ npm-profile@4.0.2
│ │ ├── aproba@2.0.0 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ npm-registry-fetch@4.0.2
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── JSONStream@1.3.5 deduped
│ │ ├── lru-cache@5.1.1 deduped
│ │ ├─┬ make-fetch-happen@5.0.2
│ │ │ ├─┬ agentkeepalive@3.5.2
│ │ │ │ └─┬ humanize-ms@1.2.1
│ │ │ │   └── ms@2.1.1
│ │ │ ├── cacache@12.0.3 deduped
│ │ │ ├── http-cache-semantics@3.8.1
│ │ │ ├─┬ http-proxy-agent@2.1.0
│ │ │ │ ├─┬ agent-base@4.3.0
│ │ │ │ │ └─┬ es6-promisify@5.0.0
│ │ │ │ │   └── es6-promise@4.2.8
│ │ │ │ └─┬ debug@3.1.0
│ │ │ │   └── ms@2.0.0
│ │ │ ├─┬ https-proxy-agent@2.2.4
│ │ │ │ ├── agent-base@4.3.0 deduped
│ │ │ │ └── debug@3.1.0 deduped
│ │ │ ├── lru-cache@5.1.1 deduped
│ │ │ ├── mississippi@3.0.0 deduped
│ │ │ ├─┬ node-fetch-npm@2.0.2
│ │ │ │ ├─┬ encoding@0.1.12
│ │ │ │ │ └─┬ iconv-lite@0.4.23
│ │ │ │ │   └── safer-buffer@2.1.2 deduped
│ │ │ │ ├── json-parse-better-errors@1.0.2 deduped
│ │ │ │ └── safe-buffer@5.1.2 deduped
│ │ │ ├── promise-retry@1.1.1 deduped
│ │ │ ├─┬ socks-proxy-agent@4.0.2
│ │ │ │ ├─┬ agent-base@4.2.1
│ │ │ │ │ └── es6-promisify@5.0.0 deduped
│ │ │ │ └─┬ socks@2.3.3
│ │ │ │   ├── ip@1.1.5
│ │ │ │   └── smart-buffer@4.1.0
│ │ │ └── ssri@6.0.1 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ └── safe-buffer@5.2.0
│ ├── npm-user-validate@1.0.0
│ ├─┬ npmlog@4.1.2
│ │ ├─┬ are-we-there-yet@1.1.4
│ │ │ ├── delegates@1.0.0
│ │ │ └─┬ readable-stream@2.3.6
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@1.0.0 deduped
│ │ │   ├── process-nextick-args@2.0.0 deduped
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ string_decoder@1.1.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   └── util-deprecate@1.0.2 deduped
│ │ ├── console-control-strings@1.1.0 deduped
│ │ ├─┬ gauge@2.7.4
│ │ │ ├── aproba@1.2.0
│ │ │ ├── console-control-strings@1.1.0 deduped
│ │ │ ├── has-unicode@2.0.1 deduped
│ │ │ ├── object-assign@4.1.1 deduped
│ │ │ ├── signal-exit@3.0.2 deduped
│ │ │ ├─┬ string-width@1.0.2
│ │ │ │ ├── code-point-at@1.1.0
│ │ │ │ ├─┬ is-fullwidth-code-point@1.0.0
│ │ │ │ │ └── number-is-nan@1.0.1
│ │ │ │ └── strip-ansi@3.0.1 deduped
│ │ │ ├── strip-ansi@3.0.1 deduped
│ │ │ └─┬ wide-align@1.1.2
│ │ │   └─┬ string-width@1.0.2
│ │ │     ├── code-point-at@1.1.0 deduped
│ │ │     ├── is-fullwidth-code-point@1.0.0 deduped
│ │ │     └── strip-ansi@3.0.1 deduped
│ │ └── set-blocking@2.0.0
│ ├─┬ once@1.4.0
│ │ └── wrappy@1.0.2 deduped
│ ├── opener@1.5.1
│ ├─┬ osenv@0.1.5
│ │ ├── os-homedir@1.0.2
│ │ └── os-tmpdir@1.0.2
│ ├─┬ pacote@9.5.12
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── cacache@12.0.3 deduped
│ │ ├── chownr@1.1.3 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ ├── glob@7.1.4 deduped
│ │ ├── infer-owner@1.0.4 deduped
│ │ ├── lru-cache@5.1.1 deduped
│ │ ├── make-fetch-happen@5.0.2 deduped
│ │ ├── minimatch@3.0.4 deduped
│ │ ├─┬ minipass@2.9.0
│ │ │ ├── safe-buffer@5.1.2 deduped
│ │ │ └── yallist@3.0.3 deduped
│ │ ├── mississippi@3.0.0 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── normalize-package-data@2.5.0 deduped
│ │ ├── npm-normalize-package-bin@1.0.1 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├── npm-packlist@1.4.7 deduped
│ │ ├── npm-pick-manifest@3.0.2 deduped
│ │ ├── npm-registry-fetch@4.0.2 deduped
│ │ ├── osenv@0.1.5 deduped
│ │ ├── promise-inflight@1.0.1 deduped
│ │ ├─┬ promise-retry@1.1.1
│ │ │ ├── err-code@1.1.2
│ │ │ └── retry@0.10.1
│ │ ├─┬ protoduck@5.0.1
│ │ │ └── genfun@5.0.0
│ │ ├── rimraf@2.6.3 deduped
│ │ ├── safe-buffer@5.1.2 deduped
│ │ ├── semver@5.7.1 deduped
│ │ ├── ssri@6.0.1 deduped
│ │ ├── tar@4.4.13 deduped
│ │ ├── unique-filename@1.1.1 deduped
│ │ └── which@1.3.1 deduped
│ ├── path-is-inside@1.0.2
│ ├── promise-inflight@1.0.1
│ ├── qrcode-terminal@0.12.0
│ ├─┬ query-string@6.8.2
│ │ ├── decode-uri-component@0.2.0
│ │ ├── split-on-first@1.1.0
│ │ └── strict-uri-encode@2.0.0
│ ├── qw@1.0.1
│ ├─┬ read@1.0.7
│ │ └── mute-stream@0.0.7
│ ├─┬ read-cmd-shim@1.0.5
│ │ └── graceful-fs@4.2.3 deduped
│ ├─┬ read-installed@4.0.3
│ │ ├── debuglog@1.0.1 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── read-package-json@2.1.1 deduped
│ │ ├── readdir-scoped-modules@1.1.0 deduped
│ │ ├── semver@5.7.1 deduped
│ │ ├── slide@1.1.6 deduped
│ │ └── util-extend@1.0.3
│ ├─┬ read-package-json@2.1.1
│ │ ├── glob@7.1.4 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── json-parse-better-errors@1.0.2 deduped
│ │ ├── normalize-package-data@2.5.0 deduped
│ │ └── npm-normalize-package-bin@1.0.1 deduped
│ ├─┬ read-package-tree@5.3.1
│ │ ├── read-package-json@2.1.1 deduped
│ │ ├── readdir-scoped-modules@1.1.0 deduped
│ │ └─┬ util-promisify@2.1.0
│ │   └─┬ object.getownpropertydescriptors@2.0.3
│ │     ├─┬ define-properties@1.1.3
│ │     │ └── object-keys@1.0.12
│ │     └─┬ es-abstract@1.12.0
│ │       ├─┬ es-to-primitive@1.2.0
│ │       │ ├── is-callable@1.1.4 deduped
│ │       │ ├── is-date-object@1.0.1
│ │       │ └─┬ is-symbol@1.0.2
│ │       │   └── has-symbols@1.0.0
│ │       ├── function-bind@1.1.1
│ │       ├─┬ has@1.0.3
│ │       │ └── function-bind@1.1.1 deduped
│ │       ├── is-callable@1.1.4
│ │       └─┬ is-regex@1.0.4
│ │         └── has@1.0.3 deduped
│ ├─┬ readable-stream@3.4.0
│ │ ├── inherits@2.0.4 deduped
│ │ ├─┬ string_decoder@1.2.0
│ │ │ └── safe-buffer@5.1.2 deduped
│ │ └── util-deprecate@1.0.2
│ ├─┬ readdir-scoped-modules@1.1.0
│ │ ├── debuglog@1.0.1 deduped
│ │ ├── dezalgo@1.0.3 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ └── once@1.4.0 deduped
│ ├─┬ request@2.88.0
│ │ ├── aws-sign2@0.7.0
│ │ ├── aws4@1.8.0
│ │ ├── caseless@0.12.0
│ │ ├─┬ combined-stream@1.0.6
│ │ │ └── delayed-stream@1.0.0
│ │ ├── extend@3.0.2
│ │ ├── forever-agent@0.6.1
│ │ ├─┬ form-data@2.3.2
│ │ │ ├── asynckit@0.4.0
│ │ │ ├── combined-stream@1.0.6 deduped
│ │ │ └── mime-types@2.1.19 deduped
│ │ ├─┬ har-validator@5.1.0
│ │ │ ├─┬ ajv@5.5.2
│ │ │ │ ├── co@4.6.0
│ │ │ │ ├── fast-deep-equal@1.1.0
│ │ │ │ ├── fast-json-stable-stringify@2.0.0
│ │ │ │ └── json-schema-traverse@0.3.1
│ │ │ └── har-schema@2.0.0
│ │ ├─┬ http-signature@1.2.0
│ │ │ ├── assert-plus@1.0.0
│ │ │ ├─┬ jsprim@1.4.1
│ │ │ │ ├── assert-plus@1.0.0 deduped
│ │ │ │ ├── extsprintf@1.3.0
│ │ │ │ ├── json-schema@0.2.3
│ │ │ │ └─┬ verror@1.10.0
│ │ │ │   ├── assert-plus@1.0.0 deduped
│ │ │ │   ├── core-util-is@1.0.2 deduped
│ │ │ │   └── extsprintf@1.3.0 deduped
│ │ │ └─┬ sshpk@1.14.2
│ │ │   ├─┬ asn1@0.2.4
│ │ │   │ └── safer-buffer@2.1.2 deduped
│ │ │   ├── assert-plus@1.0.0 deduped
│ │ │   ├─┬ bcrypt-pbkdf@1.0.2
│ │ │   │ └── tweetnacl@0.14.5 deduped
│ │ │   ├─┬ dashdash@1.14.1
│ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │   ├─┬ ecc-jsbn@0.1.2
│ │ │   │ ├── jsbn@0.1.1 deduped
│ │ │   │ └── safer-buffer@2.1.2 deduped
│ │ │   ├─┬ getpass@0.1.7
│ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │   ├── jsbn@0.1.1
│ │ │   ├── safer-buffer@2.1.2
│ │ │   └── tweetnacl@0.14.5
│ │ ├── is-typedarray@1.0.0
│ │ ├── isstream@0.1.2
│ │ ├── json-stringify-safe@5.0.1
│ │ ├─┬ mime-types@2.1.19
│ │ │ └── mime-db@1.35.0
│ │ ├── oauth-sign@0.9.0
│ │ ├── performance-now@2.1.0
│ │ ├── qs@6.5.2
│ │ ├── safe-buffer@5.1.2 deduped
│ │ ├─┬ tough-cookie@2.4.3
│ │ │ ├── psl@1.1.29
│ │ │ └── punycode@1.4.1
│ │ ├─┬ tunnel-agent@0.6.0
│ │ │ └── safe-buffer@5.1.2 deduped
│ │ └── uuid@3.3.3 deduped
│ ├── retry@0.12.0
│ ├─┬ rimraf@2.6.3
│ │ └── glob@7.1.4 deduped
│ ├── safe-buffer@5.1.2
│ ├── semver@5.7.1
│ ├─┬ sha@3.0.0
│ │ └── graceful-fs@4.2.3 deduped
│ ├── slide@1.1.6
│ ├── sorted-object@2.0.1
│ ├─┬ sorted-union-stream@2.1.3
│ │ ├─┬ from2@1.3.0
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ readable-stream@1.1.14
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@0.0.1
│ │ │   └── string_decoder@0.10.31
│ │ └─┬ stream-iterate@1.2.0
│ │   ├─┬ readable-stream@2.3.6
│ │   │ ├── core-util-is@1.0.2 deduped
│ │   │ ├── inherits@2.0.4 deduped
│ │   │ ├── isarray@1.0.0 deduped
│ │   │ ├── process-nextick-args@2.0.0 deduped
│ │   │ ├── safe-buffer@5.1.2 deduped
│ │   │ ├─┬ string_decoder@1.1.1
│ │   │ │ └── safe-buffer@5.1.2 deduped
│ │   │ └── util-deprecate@1.0.2 deduped
│ │   └── stream-shift@1.0.0 deduped
│ ├─┬ ssri@6.0.1
│ │ └── figgy-pudding@3.5.1 deduped
│ ├── stringify-package@1.0.1
│ ├─┬ tar@4.4.13
│ │ ├── chownr@1.1.3 deduped
│ │ ├─┬ fs-minipass@1.2.7
│ │ │ └─┬ minipass@2.9.0
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   └── yallist@3.0.3 deduped
│ │ ├─┬ minipass@2.9.0
│ │ │ ├── safe-buffer@5.1.2 deduped
│ │ │ └── yallist@3.0.3 deduped
│ │ ├─┬ minizlib@1.3.3
│ │ │ └─┬ minipass@2.9.0
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   └── yallist@3.0.3 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── safe-buffer@5.1.2 deduped
│ │ └── yallist@3.0.3 deduped
│ ├── text-table@0.2.0
│ ├── tiny-relative-date@1.3.0
│ ├── uid-number@0.0.6
│ ├── umask@1.1.0
│ ├─┬ unique-filename@1.1.1
│ │ └─┬ unique-slug@2.0.0
│ │   └── imurmurhash@0.1.4 deduped
│ ├── unpipe@1.0.0
│ ├─┬ update-notifier@2.5.0
│ │ ├─┬ boxen@1.3.0
│ │ │ ├─┬ ansi-align@2.0.0
│ │ │ │ └── string-width@2.1.1 deduped
│ │ │ ├── camelcase@4.1.0
│ │ │ ├── chalk@2.4.1 deduped
│ │ │ ├── cli-boxes@1.0.0
│ │ │ ├── string-width@2.1.1 deduped
│ │ │ ├─┬ term-size@1.2.0
│ │ │ │ └─┬ execa@0.7.0
│ │ │ │   ├─┬ cross-spawn@5.1.0
│ │ │ │   │ ├─┬ lru-cache@4.1.5
│ │ │ │   │ │ ├── pseudomap@1.0.2
│ │ │ │   │ │ └── yallist@2.1.2
│ │ │ │   │ ├── shebang-command@1.2.0 deduped
│ │ │ │   │ └── which@1.3.1 deduped
│ │ │ │   ├── get-stream@3.0.0
│ │ │ │   ├── is-stream@1.1.0 deduped
│ │ │ │   ├── npm-run-path@2.0.2 deduped
│ │ │ │   ├── p-finally@1.0.0 deduped
│ │ │ │   ├── signal-exit@3.0.2 deduped
│ │ │ │   └── strip-eof@1.0.0 deduped
│ │ │ └─┬ widest-line@2.0.0
│ │ │   └── string-width@2.1.1 deduped
│ │ ├─┬ chalk@2.4.1
│ │ │ ├─┬ ansi-styles@3.2.1
│ │ │ │ └─┬ color-convert@1.9.1
│ │ │ │   └── color-name@1.1.3
│ │ │ ├── escape-string-regexp@1.0.5
│ │ │ └─┬ supports-color@5.4.0
│ │ │   └── has-flag@3.0.0
│ │ ├─┬ configstore@3.1.2
│ │ │ ├─┬ dot-prop@4.2.0
│ │ │ │ └── is-obj@1.0.1
│ │ │ ├── graceful-fs@4.2.3 deduped
│ │ │ ├─┬ make-dir@1.3.0
│ │ │ │ └── pify@3.0.0
│ │ │ ├─┬ unique-string@1.0.0
│ │ │ │ └── crypto-random-string@1.0.0
│ │ │ ├── write-file-atomic@2.4.3 deduped
│ │ │ └── xdg-basedir@3.0.0 deduped
│ │ ├── import-lazy@2.1.0
│ │ ├─┬ is-ci@1.1.0
│ │ │ └── ci-info@1.6.0
│ │ ├─┬ is-installed-globally@0.1.0
│ │ │ ├─┬ global-dirs@0.1.1
│ │ │ │ └── ini@1.3.5 deduped
│ │ │ └─┬ is-path-inside@1.0.1
│ │ │   └── path-is-inside@1.0.2 deduped
│ │ ├── is-npm@1.0.0
│ │ ├─┬ latest-version@3.1.0
│ │ │ └─┬ package-json@4.0.1
│ │ │   ├─┬ got@6.7.1
│ │ │   │ ├─┬ create-error-class@3.0.2
│ │ │   │ │ └── capture-stack-trace@1.0.0
│ │ │   │ ├── duplexer3@0.1.4
│ │ │   │ ├── get-stream@3.0.0
│ │ │   │ ├── is-redirect@1.0.0
│ │ │   │ ├── is-retry-allowed@1.1.0
│ │ │   │ ├── is-stream@1.1.0 deduped
│ │ │   │ ├── lowercase-keys@1.0.1
│ │ │   │ ├── safe-buffer@5.1.2 deduped
│ │ │   │ ├── timed-out@4.0.1
│ │ │   │ ├── unzip-response@2.0.1
│ │ │   │ └─┬ url-parse-lax@1.0.0
│ │ │   │   └── prepend-http@1.0.4
│ │ │   ├─┬ registry-auth-token@3.3.2
│ │ │   │ ├─┬ rc@1.2.7
│ │ │   │ │ ├── deep-extend@0.5.1
│ │ │   │ │ ├── ini@1.3.5 deduped
│ │ │   │ │ ├── minimist@1.2.0
│ │ │   │ │ └── strip-json-comments@2.0.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ registry-url@3.1.0
│ │ │   │ └── rc@1.2.7 deduped
│ │ │   └── semver@5.7.1 deduped
│ │ ├─┬ semver-diff@2.1.0
│ │ │ └── semver@5.7.1 deduped
│ │ └── xdg-basedir@3.0.0
│ ├── uuid@3.3.3
│ ├─┬ validate-npm-package-license@3.0.4
│ │ ├─┬ spdx-correct@3.0.0
│ │ │ ├── spdx-expression-parse@3.0.0 deduped
│ │ │ └── spdx-license-ids@3.0.3
│ │ └─┬ spdx-expression-parse@3.0.0
│ │   ├── spdx-exceptions@2.1.0
│ │   └── spdx-license-ids@3.0.3 deduped
│ ├─┬ validate-npm-package-name@3.0.0
│ │ └── builtins@1.0.3
│ ├─┬ which@1.3.1
│ │ └── isexe@2.0.0
│ ├─┬ worker-farm@1.7.0
│ │ └─┬ errno@0.1.7
│ │   └── prr@1.0.1
│ └─┬ write-file-atomic@2.4.3
│   ├── graceful-fs@4.2.3 deduped
│   ├── imurmurhash@0.1.4 deduped
│   └── signal-exit@3.0.2 deduped
└── yarn@1.22.0

david@macs:~/sites/til(master⚡) » npm update -g
david@macs:~/sites/til(master⚡) » npm list -g
/Users/david/.nvm/versions/node/v10.16.3/lib
├─┬ gitbook-cli@2.3.2
│ ├── bash-color@0.0.4
│ ├── commander@2.11.0
│ ├─┬ fs-extra@3.0.1
│ │ ├── graceful-fs@4.2.3
│ │ ├─┬ jsonfile@3.0.1
│ │ │ └── graceful-fs@4.2.3 deduped
│ │ └── universalify@0.1.2
│ ├── lodash@4.17.4
│ ├─┬ npm@5.1.0
│ │ ├── abbrev@1.1.0
│ │ ├── ansi-regex@3.0.0
│ │ ├── ansicolors@0.3.2
│ │ ├── ansistyles@0.1.3
│ │ ├── aproba@1.1.2
│ │ ├── archy@1.0.0
│ │ ├── bluebird@3.5.0
│ │ ├─┬ cacache@9.2.9
│ │ │ ├── bluebird@3.5.0 deduped
│ │ │ ├── chownr@1.0.1 deduped
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├─┬ lru-cache@4.1.1
│ │ │ │ ├── pseudomap@1.0.2
│ │ │ │ └── yallist@2.1.2
│ │ │ ├── mississippi@1.3.0 deduped
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ ├── move-concurrently@1.0.1 deduped
│ │ │ ├── promise-inflight@1.0.1 deduped
│ │ │ ├── rimraf@2.6.1 deduped
│ │ │ ├── ssri@4.1.6 deduped
│ │ │ ├── unique-filename@1.1.0 deduped
│ │ │ └── y18n@3.2.1
│ │ ├── call-limit@1.1.0
│ │ ├── chownr@1.0.1
│ │ ├─┬ cmd-shim@2.0.2
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ └── mkdirp@0.5.1 deduped
│ │ ├─┬ columnify@1.5.4
│ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ └── ansi-regex@2.1.1
│ │ │ └─┬ wcwidth@1.0.1
│ │ │   └─┬ defaults@1.0.3
│ │ │     └── clone@1.0.2
│ │ ├─┬ config-chain@1.1.11
│ │ │ ├── ini@1.3.4 deduped
│ │ │ └── proto-list@1.2.4
│ │ ├── debuglog@1.0.1
│ │ ├── detect-indent@5.0.0
│ │ ├─┬ dezalgo@1.0.3
│ │ │ ├── asap@2.0.5
│ │ │ └── wrappy@1.0.2 deduped
│ │ ├── editor@1.0.0
│ │ ├─┬ fs-vacuum@1.2.10
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── path-is-inside@1.0.2 deduped
│ │ │ └── rimraf@2.6.1 deduped
│ │ ├─┬ fs-write-stream-atomic@1.0.10
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── iferr@0.1.5 deduped
│ │ │ ├── imurmurhash@0.1.4 deduped
│ │ │ └── readable-stream@2.3.2 deduped
│ │ ├─┬ fstream@1.0.11
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── inherits@2.0.3 deduped
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ └── rimraf@2.6.1 deduped
│ │ ├─┬ fstream-npm@1.2.1
│ │ │ ├─┬ fstream-ignore@1.0.5
│ │ │ │ ├── fstream@1.0.11 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └─┬ minimatch@3.0.4
│ │ │ │   └─┬ brace-expansion@1.1.8
│ │ │ │     ├── balanced-match@1.0.0
│ │ │ │     └── concat-map@0.0.1
│ │ │ └── inherits@2.0.3 deduped
│ │ ├─┬ glob@7.1.2
│ │ │ ├── fs.realpath@1.0.0
│ │ │ ├── inflight@1.0.6 deduped
│ │ │ ├── inherits@2.0.3 deduped
│ │ │ ├─┬ minimatch@3.0.4
│ │ │ │ └─┬ brace-expansion@1.1.8
│ │ │ │   ├── balanced-match@1.0.0
│ │ │ │   └── concat-map@0.0.1
│ │ │ ├── once@1.4.0 deduped
│ │ │ └── path-is-absolute@1.0.1
│ │ ├── graceful-fs@4.1.11
│ │ ├── has-unicode@2.0.1
│ │ ├── hosted-git-info@2.5.0
│ │ ├── iferr@0.1.5
│ │ ├── imurmurhash@0.1.4
│ │ ├─┬ inflight@1.0.6
│ │ │ ├── once@1.4.0 deduped
│ │ │ └── wrappy@1.0.2 deduped
│ │ ├── inherits@2.0.3
│ │ ├── ini@1.3.4
│ │ ├─┬ init-package-json@1.10.1
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── npm-package-arg@5.1.2 deduped
│ │ │ ├─┬ promzard@0.3.0
│ │ │ │ └── read@1.0.7 deduped
│ │ │ ├── read@1.0.7 deduped
│ │ │ ├── read-package-json@2.0.9 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── validate-npm-package-license@3.0.1 deduped
│ │ │ └── validate-npm-package-name@3.0.0 deduped
│ │ ├─┬ JSONStream@1.3.1
│ │ │ ├── jsonparse@1.3.1
│ │ │ └── through@2.3.8
│ │ ├── lazy-property@1.0.0
│ │ ├── lockfile@1.0.3
│ │ ├── lodash._baseindexof@3.1.0
│ │ ├─┬ lodash._baseuniq@4.6.0
│ │ │ ├── lodash._createset@4.0.3
│ │ │ └── lodash._root@3.0.1
│ │ ├── lodash._bindcallback@3.0.1
│ │ ├── lodash._cacheindexof@3.0.2
│ │ ├─┬ lodash._createcache@3.1.2
│ │ │ └── lodash._getnative@3.9.1 deduped
│ │ ├── lodash._getnative@3.9.1
│ │ ├── lodash.clonedeep@4.5.0
│ │ ├── lodash.restparam@3.6.1
│ │ ├── lodash.union@4.6.0
│ │ ├── lodash.uniq@4.5.0
│ │ ├── lodash.without@4.4.0
│ │ ├─┬ lru-cache@4.1.1
│ │ │ ├── pseudomap@1.0.2
│ │ │ └── yallist@2.1.2
│ │ ├─┬ mississippi@1.3.0
│ │ │ ├─┬ concat-stream@1.6.0
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── readable-stream@2.3.2 deduped
│ │ │ │ └── typedarray@0.0.6
│ │ │ ├─┬ duplexify@3.5.0
│ │ │ │ ├─┬ end-of-stream@1.0.0
│ │ │ │ │ └─┬ once@1.3.3
│ │ │ │ │   └── wrappy@1.0.2 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── readable-stream@2.3.2 deduped
│ │ │ │ └── stream-shift@1.0.0
│ │ │ ├─┬ end-of-stream@1.4.0
│ │ │ │ └── once@1.4.0 deduped
│ │ │ ├─┬ flush-write-stream@1.0.2
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ ├─┬ from2@2.3.0
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ ├─┬ parallel-transform@1.1.0
│ │ │ │ ├── cyclist@0.2.2
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ ├─┬ pump@1.0.2
│ │ │ │ ├── end-of-stream@1.4.0 deduped
│ │ │ │ └── once@1.4.0 deduped
│ │ │ ├─┬ pumpify@1.3.5
│ │ │ │ ├── duplexify@3.5.0 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └── pump@1.0.2 deduped
│ │ │ ├─┬ stream-each@1.2.0
│ │ │ │ ├── end-of-stream@1.4.0 deduped
│ │ │ │ └── stream-shift@1.0.0
│ │ │ └─┬ through2@2.0.3
│ │ │   ├── readable-stream@2.3.2 deduped
│ │ │   └── xtend@4.0.1
│ │ ├─┬ mkdirp@0.5.1
│ │ │ └── minimist@0.0.8
│ │ ├─┬ move-concurrently@1.0.1
│ │ │ ├── aproba@1.1.2 deduped
│ │ │ ├─┬ copy-concurrently@1.0.3
│ │ │ │ ├── aproba@1.1.2 deduped
│ │ │ │ ├── fs-write-stream-atomic@1.0.10 deduped
│ │ │ │ ├── iferr@0.1.5 deduped
│ │ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ │ ├── rimraf@2.6.1 deduped
│ │ │ │ └── run-queue@1.0.3 deduped
│ │ │ ├── fs-write-stream-atomic@1.0.10 deduped
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ ├── rimraf@2.6.1 deduped
│ │ │ └─┬ run-queue@1.0.3
│ │ │   └── aproba@1.1.2 deduped
│ │ ├─┬ node-gyp@3.6.2
│ │ │ ├── fstream@1.0.11 deduped
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├─┬ minimatch@3.0.4
│ │ │ │ └─┬ brace-expansion@1.1.8
│ │ │ │   ├── balanced-match@1.0.0
│ │ │ │   └── concat-map@0.0.1
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ ├─┬ nopt@3.0.6
│ │ │ │ └── abbrev@1.1.0 deduped
│ │ │ ├── npmlog@4.1.2 deduped
│ │ │ ├── osenv@0.1.4 deduped
│ │ │ ├── request@2.81.0 deduped
│ │ │ ├── rimraf@2.6.1 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── tar@2.2.1 deduped
│ │ │ └── which@1.2.14 deduped
│ │ ├─┬ nopt@4.0.1
│ │ │ ├── abbrev@1.1.0 deduped
│ │ │ └── osenv@0.1.4 deduped
│ │ ├─┬ normalize-package-data@2.4.0
│ │ │ ├── hosted-git-info@2.5.0 deduped
│ │ │ ├─┬ is-builtin-module@1.0.0
│ │ │ │ └── builtin-modules@1.1.1
│ │ │ ├── semver@5.3.0 deduped
│ │ │ └── validate-npm-package-license@3.0.1 deduped
│ │ ├── npm-cache-filename@1.0.2
│ │ ├─┬ npm-install-checks@3.0.0
│ │ │ └── semver@5.3.0 deduped
│ │ ├─┬ npm-package-arg@5.1.2
│ │ │ ├── hosted-git-info@2.5.0 deduped
│ │ │ ├── osenv@0.1.4 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ └── validate-npm-package-name@3.0.0 deduped
│ │ ├─┬ npm-registry-client@8.4.0
│ │ │ ├─┬ concat-stream@1.6.0
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── readable-stream@2.3.2 deduped
│ │ │ │ └── typedarray@0.0.6
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── normalize-package-data@2.4.0 deduped
│ │ │ ├── npm-package-arg@5.1.2 deduped
│ │ │ ├── npmlog@4.1.2 deduped
│ │ │ ├── once@1.4.0 deduped
│ │ │ ├── request@2.81.0 deduped
│ │ │ ├── retry@0.10.1 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── slide@1.1.6 deduped
│ │ │ └── ssri@4.1.6 deduped
│ │ ├── npm-user-validate@1.0.0
│ │ ├─┬ npmlog@4.1.2
│ │ │ ├─┬ are-we-there-yet@1.1.4
│ │ │ │ ├── delegates@1.0.0
│ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ ├── console-control-strings@1.1.0
│ │ │ ├─┬ gauge@2.7.4
│ │ │ │ ├── aproba@1.1.2 deduped
│ │ │ │ ├── console-control-strings@1.1.0 deduped
│ │ │ │ ├── has-unicode@2.0.1 deduped
│ │ │ │ ├── object-assign@4.1.1
│ │ │ │ ├── signal-exit@3.0.2
│ │ │ │ ├─┬ string-width@1.0.2
│ │ │ │ │ ├── code-point-at@1.1.0
│ │ │ │ │ ├─┬ is-fullwidth-code-point@1.0.0
│ │ │ │ │ │ └── number-is-nan@1.0.1
│ │ │ │ │ └── strip-ansi@3.0.1 deduped
│ │ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ │ └── ansi-regex@2.1.1
│ │ │ │ └─┬ wide-align@1.1.2
│ │ │ │   └── string-width@1.0.2 deduped
│ │ │ └── set-blocking@2.0.0
│ │ ├─┬ once@1.4.0
│ │ │ └── wrappy@1.0.2 deduped
│ │ ├── opener@1.4.3
│ │ ├─┬ osenv@0.1.4
│ │ │ ├── os-homedir@1.0.2
│ │ │ └── os-tmpdir@1.0.2
│ │ ├─┬ pacote@2.7.38
│ │ │ ├── bluebird@3.5.0 deduped
│ │ │ ├── cacache@9.2.9 deduped
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── lru-cache@4.1.1 deduped
│ │ │ ├─┬ make-fetch-happen@2.4.13
│ │ │ │ ├─┬ agentkeepalive@3.3.0
│ │ │ │ │ └─┬ humanize-ms@1.2.1
│ │ │ │ │   └── ms@2.0.0
│ │ │ │ ├── cacache@9.2.9 deduped
│ │ │ │ ├── http-cache-semantics@3.7.3
│ │ │ │ ├─┬ http-proxy-agent@2.0.0
│ │ │ │ │ ├─┬ agent-base@4.1.0
│ │ │ │ │ │ └─┬ es6-promisify@5.0.0
│ │ │ │ │ │   └── es6-promise@4.1.1
│ │ │ │ │ └─┬ debug@2.6.8
│ │ │ │ │   └── ms@2.0.0
│ │ │ │ ├─┬ https-proxy-agent@2.0.0
│ │ │ │ │ ├─┬ agent-base@4.1.0
│ │ │ │ │ │ └─┬ es6-promisify@5.0.0
│ │ │ │ │ │   └── es6-promise@4.1.1
│ │ │ │ │ └─┬ debug@2.6.8
│ │ │ │ │   └── ms@2.0.0
│ │ │ │ ├── lru-cache@4.1.1 deduped
│ │ │ │ ├── mississippi@1.3.0 deduped
│ │ │ │ ├─┬ node-fetch-npm@2.0.1
│ │ │ │ │ ├─┬ encoding@0.1.12
│ │ │ │ │ │ └── iconv-lite@0.4.18
│ │ │ │ │ ├─┬ json-parse-helpfulerror@1.0.3
│ │ │ │ │ │ └── jju@1.3.0
│ │ │ │ │ └── safe-buffer@5.1.1 deduped
│ │ │ │ ├── promise-retry@1.1.1 deduped
│ │ │ │ ├─┬ socks-proxy-agent@3.0.0
│ │ │ │ │ ├─┬ agent-base@4.1.0
│ │ │ │ │ │ └─┬ es6-promisify@5.0.0
│ │ │ │ │ │   └── es6-promise@4.1.1
│ │ │ │ │ └─┬ socks@1.1.10
│ │ │ │ │   ├── ip@1.1.5
│ │ │ │ │   └── smart-buffer@1.1.15
│ │ │ │ └── ssri@4.1.6 deduped
│ │ │ ├─┬ minimatch@3.0.4
│ │ │ │ └─┬ brace-expansion@1.1.8
│ │ │ │   ├── balanced-match@1.0.0
│ │ │ │   └── concat-map@0.0.1
│ │ │ ├── mississippi@1.3.0 deduped
│ │ │ ├── normalize-package-data@2.4.0 deduped
│ │ │ ├── npm-package-arg@5.1.2 deduped
│ │ │ ├─┬ npm-pick-manifest@1.0.4
│ │ │ │ ├── npm-package-arg@5.1.2 deduped
│ │ │ │ └── semver@5.3.0 deduped
│ │ │ ├── osenv@0.1.4 deduped
│ │ │ ├── promise-inflight@1.0.1 deduped
│ │ │ ├─┬ promise-retry@1.1.1
│ │ │ │ ├── err-code@1.1.2
│ │ │ │ └── retry@0.10.1 deduped
│ │ │ ├─┬ protoduck@4.0.0
│ │ │ │ └── genfun@4.0.1
│ │ │ ├── safe-buffer@5.1.1 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── ssri@4.1.6 deduped
│ │ │ ├─┬ tar-fs@1.15.3
│ │ │ │ ├── chownr@1.0.1 deduped
│ │ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ │ ├─┬ pump@1.0.2
│ │ │ │ │ ├─┬ end-of-stream@1.4.0
│ │ │ │ │ │ └── once@1.4.0 deduped
│ │ │ │ │ └── once@1.4.0 deduped
│ │ │ │ └── tar-stream@1.5.4 deduped
│ │ │ ├─┬ tar-stream@1.5.4
│ │ │ │ ├─┬ bl@1.2.1
│ │ │ │ │ └── readable-stream@2.3.2 deduped
│ │ │ │ ├─┬ end-of-stream@1.4.0
│ │ │ │ │ └── once@1.4.0 deduped
│ │ │ │ ├── readable-stream@2.3.2 deduped
│ │ │ │ └── xtend@4.0.1
│ │ │ ├── unique-filename@1.1.0 deduped
│ │ │ └── which@1.2.14 deduped
│ │ ├── path-is-inside@1.0.2
│ │ ├── promise-inflight@1.0.1
│ │ ├─┬ read@1.0.7
│ │ │ └── mute-stream@0.0.7
│ │ ├─┬ read-cmd-shim@1.0.1
│ │ │ └── graceful-fs@4.1.11 deduped
│ │ ├─┬ read-installed@4.0.3
│ │ │ ├── debuglog@1.0.1 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├── read-package-json@2.0.9 deduped
│ │ │ ├── readdir-scoped-modules@1.0.2 deduped
│ │ │ ├── semver@5.3.0 deduped
│ │ │ ├── slide@1.1.6 deduped
│ │ │ └── util-extend@1.0.3
│ │ ├─┬ read-package-json@2.0.9
│ │ │ ├── glob@7.1.2 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ ├─┬ json-parse-helpfulerror@1.0.3
│ │ │ │ └── jju@1.3.0
│ │ │ └── normalize-package-data@2.4.0 deduped
│ │ ├─┬ read-package-tree@5.1.6
│ │ │ ├── debuglog@1.0.1 deduped
│ │ │ ├── dezalgo@1.0.3 deduped
│ │ │ ├── once@1.4.0 deduped
│ │ │ ├── read-package-json@2.0.9 deduped
│ │ │ └── readdir-scoped-modules@1.0.2 deduped
│ │ ├─┬ readable-stream@2.3.2
│ │ │ ├── core-util-is@1.0.2
│ │ │ ├── inherits@2.0.3 deduped
│ │ │ ├── isarray@1.0.0
│ │ │ ├── process-nextick-args@1.0.7
│ │ │ ├── safe-buffer@5.1.1 deduped
│ │ │ ├─┬ string_decoder@1.0.3
│ │ │ │ └── safe-buffer@5.1.1 deduped
│ │ │ └── util-deprecate@1.0.2
│ │ ├─┬ readdir-scoped-modules@1.0.2
│ │ │ ├── debuglog@1.0.1 deduped
│ │ │ ├── dezalgo@1.0.3 deduped
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ └── once@1.4.0 deduped
│ │ ├─┬ request@2.81.0
│ │ │ ├── aws-sign2@0.6.0
│ │ │ ├── aws4@1.6.0
│ │ │ ├── caseless@0.12.0
│ │ │ ├─┬ combined-stream@1.0.5
│ │ │ │ └── delayed-stream@1.0.0
│ │ │ ├── extend@3.0.1
│ │ │ ├── forever-agent@0.6.1
│ │ │ ├─┬ form-data@2.1.4
│ │ │ │ ├── asynckit@0.4.0
│ │ │ │ ├── combined-stream@1.0.5 deduped
│ │ │ │ └── mime-types@2.1.15 deduped
│ │ │ ├─┬ har-validator@4.2.1
│ │ │ │ ├─┬ ajv@4.11.8
│ │ │ │ │ ├── co@4.6.0
│ │ │ │ │ └─┬ json-stable-stringify@1.0.1
│ │ │ │ │   └── jsonify@0.0.0
│ │ │ │ └── har-schema@1.0.5
│ │ │ ├─┬ hawk@3.1.3
│ │ │ │ ├─┬ boom@2.10.1
│ │ │ │ │ └── hoek@2.16.3 deduped
│ │ │ │ ├─┬ cryptiles@2.0.5
│ │ │ │ │ └── boom@2.10.1 deduped
│ │ │ │ ├── hoek@2.16.3
│ │ │ │ └─┬ sntp@1.0.9
│ │ │ │   └── hoek@2.16.3 deduped
│ │ │ ├─┬ http-signature@1.1.1
│ │ │ │ ├── assert-plus@0.2.0
│ │ │ │ ├─┬ jsprim@1.4.0
│ │ │ │ │ ├── assert-plus@1.0.0
│ │ │ │ │ ├── extsprintf@1.0.2
│ │ │ │ │ ├── json-schema@0.2.3
│ │ │ │ │ └─┬ verror@1.3.6
│ │ │ │ │   └── extsprintf@1.0.2 deduped
│ │ │ │ └─┬ sshpk@1.13.1
│ │ │ │   ├── asn1@0.2.3
│ │ │ │   ├── assert-plus@1.0.0
│ │ │ │   ├─┬ bcrypt-pbkdf@1.0.1
│ │ │ │   │ └── tweetnacl@0.14.5 deduped
│ │ │ │   ├─┬ dashdash@1.14.1
│ │ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │ │   ├─┬ ecc-jsbn@0.1.1
│ │ │ │   │ └── jsbn@0.1.1 deduped
│ │ │ │   ├─┬ getpass@0.1.7
│ │ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │ │   ├── jsbn@0.1.1
│ │ │ │   └── tweetnacl@0.14.5
│ │ │ ├── is-typedarray@1.0.0
│ │ │ ├── isstream@0.1.2
│ │ │ ├── json-stringify-safe@5.0.1
│ │ │ ├─┬ mime-types@2.1.15
│ │ │ │ └── mime-db@1.27.0
│ │ │ ├── oauth-sign@0.8.2
│ │ │ ├── performance-now@0.2.0
│ │ │ ├── qs@6.4.0
│ │ │ ├── safe-buffer@5.1.1 deduped
│ │ │ ├── stringstream@0.0.5
│ │ │ ├─┬ tough-cookie@2.3.2
│ │ │ │ └── punycode@1.4.1
│ │ │ ├─┬ tunnel-agent@0.6.0
│ │ │ │ └── safe-buffer@5.1.1 deduped
│ │ │ └── uuid@3.1.0 deduped
│ │ ├── retry@0.10.1
│ │ ├─┬ rimraf@2.6.1
│ │ │ └── glob@7.1.2 deduped
│ │ ├── safe-buffer@5.1.1
│ │ ├── semver@5.3.0
│ │ ├─┬ sha@2.0.1
│ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ └── readable-stream@2.3.2 deduped
│ │ ├── slide@1.1.6
│ │ ├── sorted-object@2.0.1
│ │ ├─┬ sorted-union-stream@2.1.3
│ │ │ ├─┬ from2@1.3.0
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ └─┬ readable-stream@1.1.14
│ │ │ │   ├── core-util-is@1.0.2
│ │ │ │   ├── inherits@2.0.3 deduped
│ │ │ │   ├── isarray@0.0.1
│ │ │ │   └── string_decoder@0.10.31
│ │ │ └─┬ stream-iterate@1.2.0
│ │ │   ├── readable-stream@2.3.2 deduped
│ │ │   └── stream-shift@1.0.0
│ │ ├─┬ ssri@4.1.6
│ │ │ └── safe-buffer@5.1.1 deduped
│ │ ├─┬ strip-ansi@4.0.0
│ │ │ └── ansi-regex@3.0.0
│ │ ├─┬ tar@2.2.1
│ │ │ ├─┬ block-stream@0.0.9
│ │ │ │ └── inherits@2.0.3 deduped
│ │ │ ├── fstream@1.0.11 deduped
│ │ │ └── inherits@2.0.3 deduped
│ │ ├── text-table@0.2.0
│ │ ├── uid-number@0.0.6
│ │ ├── umask@1.1.0
│ │ ├─┬ unique-filename@1.1.0
│ │ │ └─┬ unique-slug@2.0.0
│ │ │   └── imurmurhash@0.1.4 deduped
│ │ ├── unpipe@1.0.0
│ │ ├─┬ update-notifier@2.2.0
│ │ │ ├─┬ boxen@1.1.0
│ │ │ │ ├─┬ ansi-align@2.0.0
│ │ │ │ │ └── string-width@2.1.0 deduped
│ │ │ │ ├── camelcase@4.1.0
│ │ │ │ ├── chalk@1.1.3 deduped
│ │ │ │ ├── cli-boxes@1.0.0
│ │ │ │ ├─┬ string-width@2.1.0
│ │ │ │ │ ├── is-fullwidth-code-point@2.0.0
│ │ │ │ │ └─┬ strip-ansi@4.0.0
│ │ │ │ │   └── ansi-regex@3.0.0 deduped
│ │ │ │ ├─┬ term-size@0.1.1
│ │ │ │ │ └─┬ execa@0.4.0
│ │ │ │ │   ├─┬ cross-spawn-async@2.2.5
│ │ │ │ │   │ ├── lru-cache@4.1.1 deduped
│ │ │ │ │   │ └── which@1.2.14 deduped
│ │ │ │ │   ├── is-stream@1.1.0
│ │ │ │ │   ├─┬ npm-run-path@1.0.0
│ │ │ │ │   │ └── path-key@1.0.0 deduped
│ │ │ │ │   ├── object-assign@4.1.1
│ │ │ │ │   ├── path-key@1.0.0
│ │ │ │ │   └── strip-eof@1.0.0
│ │ │ │ └─┬ widest-line@1.0.0
│ │ │ │   └─┬ string-width@1.0.2
│ │ │ │     ├── code-point-at@1.1.0
│ │ │ │     ├─┬ is-fullwidth-code-point@1.0.0
│ │ │ │     │ └── number-is-nan@1.0.1
│ │ │ │     └─┬ strip-ansi@3.0.1
│ │ │ │       └── ansi-regex@2.1.1
│ │ │ ├─┬ chalk@1.1.3
│ │ │ │ ├── ansi-styles@2.2.1
│ │ │ │ ├── escape-string-regexp@1.0.5
│ │ │ │ ├─┬ has-ansi@2.0.0
│ │ │ │ │ └── ansi-regex@2.1.1
│ │ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ │ └── ansi-regex@2.1.1
│ │ │ │ └── supports-color@2.0.0
│ │ │ ├─┬ configstore@3.1.0
│ │ │ │ ├─┬ dot-prop@4.1.1
│ │ │ │ │ └── is-obj@1.0.1
│ │ │ │ ├── graceful-fs@4.1.11 deduped
│ │ │ │ ├─┬ make-dir@1.0.0
│ │ │ │ │ └── pify@2.3.0
│ │ │ │ ├─┬ unique-string@1.0.0
│ │ │ │ │ └── crypto-random-string@1.0.0
│ │ │ │ ├── write-file-atomic@2.1.0 deduped
│ │ │ │ └── xdg-basedir@3.0.0 deduped
│ │ │ ├── import-lazy@2.1.0
│ │ │ ├── is-npm@1.0.0
│ │ │ ├─┬ latest-version@3.1.0
│ │ │ │ └─┬ package-json@4.0.1
│ │ │ │   ├─┬ got@6.7.1
│ │ │ │   │ ├─┬ create-error-class@3.0.2
│ │ │ │   │ │ └── capture-stack-trace@1.0.0
│ │ │ │   │ ├── duplexer3@0.1.4
│ │ │ │   │ ├── get-stream@3.0.0
│ │ │ │   │ ├── is-redirect@1.0.0
│ │ │ │   │ ├── is-retry-allowed@1.1.0
│ │ │ │   │ ├── is-stream@1.1.0
│ │ │ │   │ ├── lowercase-keys@1.0.0
│ │ │ │   │ ├── safe-buffer@5.1.1 deduped
│ │ │ │   │ ├── timed-out@4.0.1
│ │ │ │   │ ├── unzip-response@2.0.1
│ │ │ │   │ └─┬ url-parse-lax@1.0.0
│ │ │ │   │   └── prepend-http@1.0.4
│ │ │ │   ├─┬ registry-auth-token@3.3.1
│ │ │ │   │ ├─┬ rc@1.2.1
│ │ │ │   │ │ ├── deep-extend@0.4.2
│ │ │ │   │ │ ├── ini@1.3.4 deduped
│ │ │ │   │ │ ├── minimist@1.2.0
│ │ │ │   │ │ └── strip-json-comments@2.0.1
│ │ │ │   │ └── safe-buffer@5.1.1 deduped
│ │ │ │   ├─┬ registry-url@3.1.0
│ │ │ │   │ └─┬ rc@1.2.1
│ │ │ │   │   ├── deep-extend@0.4.2
│ │ │ │   │   ├── ini@1.3.4 deduped
│ │ │ │   │   ├── minimist@1.2.0
│ │ │ │   │   └── strip-json-comments@2.0.1
│ │ │ │   └── semver@5.3.0 deduped
│ │ │ ├─┬ semver-diff@2.1.0
│ │ │ │ └── semver@5.3.0 deduped
│ │ │ └── xdg-basedir@3.0.0
│ │ ├── uuid@3.1.0
│ │ ├─┬ validate-npm-package-license@3.0.1
│ │ │ ├─┬ spdx-correct@1.0.2
│ │ │ │ └── spdx-license-ids@1.2.2
│ │ │ └── spdx-expression-parse@1.0.4
│ │ ├─┬ validate-npm-package-name@3.0.0
│ │ │ └── builtins@1.0.3
│ │ ├─┬ which@1.2.14
│ │ │ └── isexe@2.0.0
│ │ ├─┬ worker-farm@1.3.1
│ │ │ ├─┬ errno@0.1.4
│ │ │ │ └── prr@0.0.0
│ │ │ └── xtend@4.0.1
│ │ ├── wrappy@1.0.2
│ │ └─┬ write-file-atomic@2.1.0
│ │   ├── graceful-fs@4.1.11 deduped
│ │   ├── imurmurhash@0.1.4 deduped
│ │   └── slide@1.1.6 deduped
│ ├─┬ npmi@1.0.1
│ │ ├─┬ npm@2.15.12
│ │ │ ├── abbrev@1.0.9
│ │ │ ├── ansi@0.3.1
│ │ │ ├── ansi-regex@2.0.0
│ │ │ ├── ansicolors@0.3.2
│ │ │ ├── ansistyles@0.1.3
│ │ │ ├── archy@1.0.0
│ │ │ ├─┬ async-some@1.0.2
│ │ │ │ └── dezalgo@1.0.3 deduped
│ │ │ ├─┬ block-stream@0.0.9
│ │ │ │ └── inherits@2.0.3 deduped
│ │ │ ├── char-spinner@1.0.1
│ │ │ ├── chmodr@1.0.2
│ │ │ ├── chownr@1.0.1
│ │ │ ├─┬ cmd-shim@2.0.2
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ └── mkdirp@0.5.1 deduped
│ │ │ ├─┬ columnify@1.5.4
│ │ │ │ ├── strip-ansi@3.0.1 deduped
│ │ │ │ └─┬ wcwidth@1.0.0
│ │ │ │   └─┬ defaults@1.0.3
│ │ │ │     └── clone@1.0.2
│ │ │ ├─┬ config-chain@1.1.10
│ │ │ │ ├── ini@1.3.4 deduped
│ │ │ │ └── proto-list@1.2.4
│ │ │ ├─┬ dezalgo@1.0.3
│ │ │ │ ├── asap@2.0.3
│ │ │ │ └── wrappy@1.0.2 deduped
│ │ │ ├── editor@1.0.0
│ │ │ ├─┬ fs-vacuum@1.2.9
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── path-is-inside@1.0.1 deduped
│ │ │ │ └── rimraf@2.5.4 deduped
│ │ │ ├─┬ fs-write-stream-atomic@1.0.8
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── iferr@0.1.5
│ │ │ │ ├── imurmurhash@0.1.4 deduped
│ │ │ │ └── readable-stream@2.1.5 deduped
│ │ │ ├─┬ fstream@1.0.10
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ │ └── rimraf@2.5.4 deduped
│ │ │ ├─┬ fstream-npm@1.1.1
│ │ │ │ ├─┬ fstream-ignore@1.0.5
│ │ │ │ │ ├── fstream@1.0.10 deduped
│ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ └── minimatch@3.0.3 deduped
│ │ │ │ └── inherits@2.0.3 deduped
│ │ │ ├── github-url-from-git@1.4.0
│ │ │ ├── github-url-from-username-repo@1.0.2
│ │ │ ├─┬ glob@7.0.6
│ │ │ │ ├── fs.realpath@1.0.0
│ │ │ │ ├── inflight@1.0.5 deduped
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── minimatch@3.0.3 deduped
│ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ └── path-is-absolute@1.0.0
│ │ │ ├── graceful-fs@4.1.6
│ │ │ ├── hosted-git-info@2.1.5
│ │ │ ├── imurmurhash@0.1.4
│ │ │ ├─┬ inflight@1.0.5
│ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ └── wrappy@1.0.2 deduped
│ │ │ ├── inherits@2.0.3
│ │ │ ├── ini@1.3.4
│ │ │ ├─┬ init-package-json@1.9.4
│ │ │ │ ├─┬ glob@6.0.4
│ │ │ │ │ ├── inflight@1.0.5 deduped
│ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ ├── minimatch@3.0.3 deduped
│ │ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ │ └── path-is-absolute@1.0.0
│ │ │ │ ├── npm-package-arg@4.1.0 deduped
│ │ │ │ ├─┬ promzard@0.3.0
│ │ │ │ │ └── read@1.0.7 deduped
│ │ │ │ ├── read@1.0.7 deduped
│ │ │ │ ├── read-package-json@2.0.4 deduped
│ │ │ │ ├── semver@5.1.0 deduped
│ │ │ │ ├── validate-npm-package-license@3.0.1 deduped
│ │ │ │ └── validate-npm-package-name@2.2.2 deduped
│ │ │ ├── lockfile@1.0.1
│ │ │ ├─┬ lru-cache@4.0.1
│ │ │ │ ├── pseudomap@1.0.2
│ │ │ │ └── yallist@2.0.0
│ │ │ ├─┬ minimatch@3.0.3
│ │ │ │ └─┬ brace-expansion@1.1.6
│ │ │ │   ├── balanced-match@0.4.2
│ │ │ │   └── concat-map@0.0.1
│ │ │ ├─┬ mkdirp@0.5.1
│ │ │ │ └── minimist@0.0.8
│ │ │ ├─┬ node-gyp@3.6.0
│ │ │ │ ├── fstream@1.0.10 deduped
│ │ │ │ ├── glob@7.0.6 deduped
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── minimatch@3.0.3 deduped
│ │ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ │ ├── nopt@3.0.6 deduped
│ │ │ │ ├── npmlog@2.0.4 deduped
│ │ │ │ ├── osenv@0.1.3 deduped
│ │ │ │ ├── request@2.74.0 deduped
│ │ │ │ ├── rimraf@2.5.4 deduped
│ │ │ │ ├── semver@5.3.0
│ │ │ │ ├── tar@2.2.1 deduped
│ │ │ │ └── which@1.2.11 deduped
│ │ │ ├─┬ nopt@3.0.6
│ │ │ │ └── abbrev@1.0.9 deduped
│ │ │ ├── normalize-git-url@3.0.2
│ │ │ ├─┬ normalize-package-data@2.3.5
│ │ │ │ ├── hosted-git-info@2.1.5 deduped
│ │ │ │ ├─┬ is-builtin-module@1.0.0
│ │ │ │ │ └── builtin-modules@1.1.0
│ │ │ │ ├── semver@5.1.0 deduped
│ │ │ │ └── validate-npm-package-license@3.0.1 deduped
│ │ │ ├── npm-cache-filename@1.0.2
│ │ │ ├─┬ npm-install-checks@1.0.7
│ │ │ │ ├── npmlog@2.0.4 deduped
│ │ │ │ └── semver@5.1.0 deduped
│ │ │ ├─┬ npm-package-arg@4.1.0
│ │ │ │ ├── hosted-git-info@2.1.5 deduped
│ │ │ │ └── semver@5.1.0 deduped
│ │ │ ├─┬ npm-registry-client@7.2.1
│ │ │ │ ├─┬ concat-stream@1.5.2
│ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ ├─┬ readable-stream@2.0.6
│ │ │ │ │ │ ├── core-util-is@1.0.2
│ │ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ │ ├── isarray@1.0.0
│ │ │ │ │ │ ├── process-nextick-args@1.0.7
│ │ │ │ │ │ ├── string_decoder@0.10.31
│ │ │ │ │ │ └── util-deprecate@1.0.2
│ │ │ │ │ └── typedarray@0.0.6
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── normalize-package-data@2.3.5 deduped
│ │ │ │ ├── npm-package-arg@4.1.0 deduped
│ │ │ │ ├── npmlog@2.0.4 deduped
│ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ ├── request@2.74.0 deduped
│ │ │ │ ├── retry@0.10.0
│ │ │ │ ├── semver@5.1.0 deduped
│ │ │ │ └── slide@1.1.6 deduped
│ │ │ ├── npm-user-validate@0.1.5
│ │ │ ├─┬ npmlog@2.0.4
│ │ │ │ ├── ansi@0.3.1 deduped
│ │ │ │ ├─┬ are-we-there-yet@1.1.2
│ │ │ │ │ ├── delegates@1.0.0
│ │ │ │ │ └── readable-stream@2.1.5 deduped
│ │ │ │ └─┬ gauge@1.2.7
│ │ │ │   ├── ansi@0.3.1 deduped
│ │ │ │   ├── has-unicode@2.0.0
│ │ │ │   ├─┬ lodash.pad@4.4.0
│ │ │ │   │ ├── lodash._baseslice@4.0.0
│ │ │ │   │ ├── lodash._basetostring@4.12.0
│ │ │ │   │ └── lodash.tostring@4.1.4
│ │ │ │   ├─┬ lodash.padend@4.5.0
│ │ │ │   │ ├── lodash._baseslice@4.0.0 deduped
│ │ │ │   │ ├── lodash._basetostring@4.12.0 deduped
│ │ │ │   │ └── lodash.tostring@4.1.4 deduped
│ │ │ │   └─┬ lodash.padstart@4.5.0
│ │ │ │     ├── lodash._baseslice@4.0.0 deduped
│ │ │ │     ├── lodash._basetostring@4.12.0 deduped
│ │ │ │     └── lodash.tostring@4.1.4 deduped
│ │ │ ├─┬ once@1.4.0
│ │ │ │ └── wrappy@1.0.2 deduped
│ │ │ ├── opener@1.4.1
│ │ │ ├─┬ osenv@0.1.3
│ │ │ │ ├── os-homedir@1.0.0
│ │ │ │ └── os-tmpdir@1.0.1
│ │ │ ├── path-is-inside@1.0.1
│ │ │ ├─┬ read@1.0.7
│ │ │ │ └── mute-stream@0.0.5
│ │ │ ├─┬ read-installed@4.0.3
│ │ │ │ ├── debuglog@1.0.1
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├── read-package-json@2.0.4 deduped
│ │ │ │ ├─┬ readdir-scoped-modules@1.0.2
│ │ │ │ │ ├── debuglog@1.0.1 deduped
│ │ │ │ │ ├── dezalgo@1.0.3 deduped
│ │ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ │ └── once@1.4.0 deduped
│ │ │ │ ├── semver@5.1.0 deduped
│ │ │ │ ├── slide@1.1.6 deduped
│ │ │ │ └── util-extend@1.0.1
│ │ │ ├─┬ read-package-json@2.0.4
│ │ │ │ ├─┬ glob@6.0.4
│ │ │ │ │ ├── inflight@1.0.5 deduped
│ │ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ │ ├── minimatch@3.0.3 deduped
│ │ │ │ │ ├── once@1.4.0 deduped
│ │ │ │ │ └── path-is-absolute@1.0.0
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ ├─┬ json-parse-helpfulerror@1.0.3
│ │ │ │ │ └── jju@1.3.0
│ │ │ │ └── normalize-package-data@2.3.5 deduped
│ │ │ ├─┬ readable-stream@2.1.5
│ │ │ │ ├── buffer-shims@1.0.0
│ │ │ │ ├── core-util-is@1.0.2
│ │ │ │ ├── inherits@2.0.3 deduped
│ │ │ │ ├── isarray@1.0.0
│ │ │ │ ├── process-nextick-args@1.0.7
│ │ │ │ ├── string_decoder@0.10.31
│ │ │ │ └── util-deprecate@1.0.2
│ │ │ ├─┬ realize-package-specifier@3.0.1
│ │ │ │ ├── dezalgo@1.0.3 deduped
│ │ │ │ └── npm-package-arg@4.1.0 deduped
│ │ │ ├─┬ request@2.74.0
│ │ │ │ ├── aws-sign2@0.6.0
│ │ │ │ ├── aws4@1.4.1
│ │ │ │ ├─┬ bl@1.1.2
│ │ │ │ │ └─┬ readable-stream@2.0.6
│ │ │ │ │   ├── core-util-is@1.0.2
│ │ │ │ │   ├── inherits@2.0.3 deduped
│ │ │ │ │   ├── isarray@1.0.0
│ │ │ │ │   ├── process-nextick-args@1.0.7
│ │ │ │ │   ├── string_decoder@0.10.31
│ │ │ │ │   └── util-deprecate@1.0.2
│ │ │ │ ├── caseless@0.11.0
│ │ │ │ ├─┬ combined-stream@1.0.5
│ │ │ │ │ └── delayed-stream@1.0.0
│ │ │ │ ├── extend@3.0.0
│ │ │ │ ├── forever-agent@0.6.1
│ │ │ │ ├─┬ form-data@1.0.0-rc4
│ │ │ │ │ ├── async@1.5.2
│ │ │ │ │ ├── combined-stream@1.0.5 deduped
│ │ │ │ │ └── mime-types@2.1.11 deduped
│ │ │ │ ├─┬ har-validator@2.0.6
│ │ │ │ │ ├─┬ chalk@1.1.3
│ │ │ │ │ │ ├── ansi-styles@2.2.1
│ │ │ │ │ │ ├── escape-string-regexp@1.0.5
│ │ │ │ │ │ ├─┬ has-ansi@2.0.0
│ │ │ │ │ │ │ └── ansi-regex@2.0.0 deduped
│ │ │ │ │ │ ├── strip-ansi@3.0.1 deduped
│ │ │ │ │ │ └── supports-color@2.0.0
│ │ │ │ │ ├─┬ commander@2.9.0
│ │ │ │ │ │ └── graceful-readlink@1.0.1
│ │ │ │ │ ├─┬ is-my-json-valid@2.13.1
│ │ │ │ │ │ ├── generate-function@2.0.0
│ │ │ │ │ │ ├─┬ generate-object-property@1.2.0
│ │ │ │ │ │ │ └── is-property@1.0.2
│ │ │ │ │ │ ├── jsonpointer@2.0.0
│ │ │ │ │ │ └── xtend@4.0.1
│ │ │ │ │ └─┬ pinkie-promise@2.0.1
│ │ │ │ │   └── pinkie@2.0.4
│ │ │ │ ├─┬ hawk@3.1.3
│ │ │ │ │ ├─┬ boom@2.10.1
│ │ │ │ │ │ └── hoek@2.16.3 deduped
│ │ │ │ │ ├─┬ cryptiles@2.0.5
│ │ │ │ │ │ └── boom@2.10.1 deduped
│ │ │ │ │ ├── hoek@2.16.3
│ │ │ │ │ └─┬ sntp@1.0.9
│ │ │ │ │   └── hoek@2.16.3 deduped
│ │ │ │ ├─┬ http-signature@1.1.1
│ │ │ │ │ ├── assert-plus@0.2.0
│ │ │ │ │ ├─┬ jsprim@1.3.0
│ │ │ │ │ │ ├── extsprintf@1.0.2
│ │ │ │ │ │ ├── json-schema@0.2.2
│ │ │ │ │ │ └─┬ verror@1.3.6
│ │ │ │ │ │   └── extsprintf@1.0.2 deduped
│ │ │ │ │ └─┬ sshpk@1.9.2
│ │ │ │ │   ├── asn1@0.2.3
│ │ │ │ │   ├── assert-plus@1.0.0
│ │ │ │ │   ├─┬ dashdash@1.14.0
│ │ │ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │ │ │   ├─┬ ecc-jsbn@0.1.1
│ │ │ │ │   │ └── jsbn@0.1.0 deduped
│ │ │ │ │   ├─┬ getpass@0.1.6
│ │ │ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │ │ │   ├─┬ jodid25519@1.0.2
│ │ │ │ │   │ └── jsbn@0.1.0 deduped
│ │ │ │ │   ├── jsbn@0.1.0
│ │ │ │ │   └── tweetnacl@0.13.3
│ │ │ │ ├── is-typedarray@1.0.0
│ │ │ │ ├── isstream@0.1.2
│ │ │ │ ├── json-stringify-safe@5.0.1
│ │ │ │ ├─┬ mime-types@2.1.11
│ │ │ │ │ └── mime-db@1.23.0
│ │ │ │ ├── node-uuid@1.4.7
│ │ │ │ ├── oauth-sign@0.8.2
│ │ │ │ ├── qs@6.2.1
│ │ │ │ ├── stringstream@0.0.5
│ │ │ │ ├── tough-cookie@2.3.1
│ │ │ │ └── tunnel-agent@0.4.3
│ │ │ ├── retry@0.10.0
│ │ │ ├─┬ rimraf@2.5.4
│ │ │ │ └── glob@7.0.6 deduped
│ │ │ ├── semver@5.1.0
│ │ │ ├─┬ sha@2.0.1
│ │ │ │ ├── graceful-fs@4.1.6 deduped
│ │ │ │ └─┬ readable-stream@2.0.2
│ │ │ │   ├── core-util-is@1.0.1
│ │ │ │   ├── inherits@2.0.3 deduped
│ │ │ │   ├── isarray@0.0.1
│ │ │ │   ├── process-nextick-args@1.0.3
│ │ │ │   ├── string_decoder@0.10.31
│ │ │ │   └── util-deprecate@1.0.1
│ │ │ ├── slide@1.1.6
│ │ │ ├── sorted-object@2.0.0
│ │ │ ├── spdx-license-ids@1.2.2
│ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ └── ansi-regex@2.0.0 deduped
│ │ │ ├─┬ tar@2.2.1
│ │ │ │ ├── block-stream@0.0.9 deduped
│ │ │ │ ├── fstream@1.0.10 deduped
│ │ │ │ └── inherits@2.0.3 deduped
│ │ │ ├── text-table@0.2.0
│ │ │ ├── uid-number@0.0.6
│ │ │ ├── umask@1.1.0
│ │ │ ├─┬ validate-npm-package-license@3.0.1
│ │ │ │ ├─┬ spdx-correct@1.0.2
│ │ │ │ │ └── spdx-license-ids@1.2.2 deduped
│ │ │ │ └─┬ spdx-expression-parse@1.0.2
│ │ │ │   ├── spdx-exceptions@1.0.4
│ │ │ │   └── spdx-license-ids@1.2.2 deduped
│ │ │ ├─┬ validate-npm-package-name@2.2.2
│ │ │ │ └── builtins@0.0.7
│ │ │ ├─┬ which@1.2.11
│ │ │ │ └── isexe@1.1.2
│ │ │ ├── wrappy@1.0.2
│ │ │ └─┬ write-file-atomic@1.1.4
│ │ │   ├── graceful-fs@4.1.6 deduped
│ │ │   ├── imurmurhash@0.1.4 deduped
│ │ │   └── slide@1.1.6 deduped
│ │ └── semver@4.3.6
│ ├─┬ optimist@0.6.1
│ │ ├── minimist@0.0.10
│ │ └── wordwrap@0.0.3
│ ├── q@1.5.0
│ ├── semver@5.3.0
│ ├─┬ tmp@0.0.31
│ │ └── os-tmpdir@1.0.2
│ └─┬ user-home@2.0.0
│   └── os-homedir@1.0.2
├─┬ npm@6.13.7
│ ├── abbrev@1.1.1
│ ├── ansicolors@0.3.2
│ ├── ansistyles@0.1.3
│ ├── aproba@2.0.0
│ ├── archy@1.0.0
│ ├─┬ bin-links@1.1.7
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── cmd-shim@3.0.3 deduped
│ │ ├── gentle-fs@2.3.0 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── npm-normalize-package-bin@1.0.1
│ │ └── write-file-atomic@2.4.3 deduped
│ ├── bluebird@3.5.5
│ ├── byte-size@5.0.1
│ ├─┬ cacache@12.0.3
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── chownr@1.1.3 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── glob@7.1.4 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── infer-owner@1.0.4 deduped
│ │ ├── lru-cache@5.1.1 deduped
│ │ ├── mississippi@3.0.0 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── move-concurrently@1.0.1 deduped
│ │ ├── promise-inflight@1.0.1 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ ├── ssri@6.0.1 deduped
│ │ ├── unique-filename@1.1.1 deduped
│ │ └── y18n@4.0.0
│ ├── call-limit@1.1.1
│ ├── chownr@1.1.3
│ ├── ci-info@2.0.0
│ ├─┬ cli-columns@3.1.2
│ │ ├─┬ string-width@2.1.1
│ │ │ ├── is-fullwidth-code-point@2.0.0
│ │ │ └─┬ strip-ansi@4.0.0
│ │ │   └── ansi-regex@3.0.0
│ │ └─┬ strip-ansi@3.0.1
│ │   └── ansi-regex@2.1.1
│ ├─┬ cli-table3@0.5.1
│ │ ├── colors@1.3.3
│ │ ├── object-assign@4.1.1
│ │ └── string-width@2.1.1 deduped
│ ├─┬ cmd-shim@3.0.3
│ │ ├── graceful-fs@4.2.3 deduped
│ │ └── mkdirp@0.5.1 deduped
│ ├─┬ columnify@1.5.4
│ │ ├── strip-ansi@3.0.1 deduped
│ │ └─┬ wcwidth@1.0.1
│ │   └─┬ defaults@1.0.3
│ │     └── clone@1.0.4
│ ├─┬ config-chain@1.1.12
│ │ ├── ini@1.3.5 deduped
│ │ └── proto-list@1.2.4
│ ├── debuglog@1.0.1
│ ├── detect-indent@5.0.0
│ ├── detect-newline@2.1.0
│ ├─┬ dezalgo@1.0.3
│ │ ├── asap@2.0.6
│ │ └── wrappy@1.0.2
│ ├── editor@1.0.0
│ ├── figgy-pudding@3.5.1
│ ├── find-npm-prefix@1.0.2
│ ├─┬ fs-vacuum@1.2.10
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── path-is-inside@1.0.2 deduped
│ │ └── rimraf@2.6.3 deduped
│ ├─┬ fs-write-stream-atomic@1.0.10
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── iferr@0.1.5
│ │ ├── imurmurhash@0.1.4 deduped
│ │ └─┬ readable-stream@2.3.6
│ │   ├── core-util-is@1.0.2
│ │   ├── inherits@2.0.4 deduped
│ │   ├── isarray@1.0.0
│ │   ├── process-nextick-args@2.0.0
│ │   ├── safe-buffer@5.1.2 deduped
│ │   ├─┬ string_decoder@1.1.1
│ │   │ └── safe-buffer@5.1.2 deduped
│ │   └── util-deprecate@1.0.2 deduped
│ ├─┬ gentle-fs@2.3.0
│ │ ├── aproba@1.2.0
│ │ ├── chownr@1.1.3 deduped
│ │ ├── cmd-shim@3.0.3 deduped
│ │ ├── fs-vacuum@1.2.10 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── iferr@0.1.5
│ │ ├── infer-owner@1.0.4 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── path-is-inside@1.0.2 deduped
│ │ ├── read-cmd-shim@1.0.5 deduped
│ │ └── slide@1.1.6 deduped
│ ├─┬ glob@7.1.4
│ │ ├── fs.realpath@1.0.0
│ │ ├── inflight@1.0.6 deduped
│ │ ├── inherits@2.0.4 deduped
│ │ ├─┬ minimatch@3.0.4
│ │ │ └─┬ brace-expansion@1.1.11
│ │ │   ├── balanced-match@1.0.0
│ │ │   └── concat-map@0.0.1
│ │ ├── once@1.4.0 deduped
│ │ └── path-is-absolute@1.0.1
│ ├── graceful-fs@4.2.3
│ ├── has-unicode@2.0.1
│ ├── hosted-git-info@2.8.5
│ ├── iferr@1.0.2
│ ├── imurmurhash@0.1.4
│ ├── infer-owner@1.0.4
│ ├─┬ inflight@1.0.6
│ │ ├── once@1.4.0 deduped
│ │ └── wrappy@1.0.2 deduped
│ ├── inherits@2.0.4
│ ├── ini@1.3.5
│ ├─┬ init-package-json@1.10.3
│ │ ├── glob@7.1.4 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├─┬ promzard@0.3.0
│ │ │ └── read@1.0.7 deduped
│ │ ├── read@1.0.7 deduped
│ │ ├── read-package-json@2.1.1 deduped
│ │ ├── semver@5.7.1 deduped
│ │ ├── validate-npm-package-license@3.0.4 deduped
│ │ └── validate-npm-package-name@3.0.0 deduped
│ ├─┬ is-cidr@3.0.0
│ │ └─┬ cidr-regex@2.0.10
│ │   └── ip-regex@2.1.0
│ ├── json-parse-better-errors@1.0.2
│ ├─┬ JSONStream@1.3.5
│ │ ├── jsonparse@1.3.1
│ │ └── through@2.3.8
│ ├── lazy-property@1.0.0
│ ├─┬ libcipm@4.0.7
│ │ ├── bin-links@1.1.7 deduped
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── find-npm-prefix@1.0.2 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── ini@1.3.5 deduped
│ │ ├── lock-verify@2.1.0 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── npm-lifecycle@3.1.4 deduped
│ │ ├── npm-logical-tree@1.2.1
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├── pacote@9.5.12 deduped
│ │ ├── read-package-json@2.1.1 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ └── worker-farm@1.7.0 deduped
│ ├─┬ libnpm@3.0.1
│ │ ├── bin-links@1.1.7 deduped
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── find-npm-prefix@1.0.2 deduped
│ │ ├── libnpmaccess@3.0.2 deduped
│ │ ├─┬ libnpmconfig@1.2.1
│ │ │ ├── figgy-pudding@3.5.1 deduped
│ │ │ ├─┬ find-up@3.0.0
│ │ │ │ └─┬ locate-path@3.0.0
│ │ │ │   ├─┬ p-locate@3.0.0
│ │ │ │   │ └─┬ p-limit@2.2.0
│ │ │ │   │   └── p-try@2.2.0
│ │ │ │   └── path-exists@3.0.0
│ │ │ └── ini@1.3.5 deduped
│ │ ├── libnpmhook@5.0.3 deduped
│ │ ├── libnpmorg@1.0.1 deduped
│ │ ├─┬ libnpmpublish@1.1.2
│ │ │ ├── aproba@2.0.0 deduped
│ │ │ ├── figgy-pudding@3.5.1 deduped
│ │ │ ├── get-stream@4.1.0 deduped
│ │ │ ├── lodash.clonedeep@4.5.0 deduped
│ │ │ ├── normalize-package-data@2.5.0 deduped
│ │ │ ├── npm-package-arg@6.1.1 deduped
│ │ │ ├── npm-registry-fetch@4.0.2 deduped
│ │ │ ├── semver@5.7.1 deduped
│ │ │ └── ssri@6.0.1 deduped
│ │ ├── libnpmsearch@2.0.2 deduped
│ │ ├── libnpmteam@1.0.2 deduped
│ │ ├── lock-verify@2.1.0 deduped
│ │ ├── npm-lifecycle@3.1.4 deduped
│ │ ├── npm-logical-tree@1.2.1 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├── npm-profile@4.0.2 deduped
│ │ ├── npm-registry-fetch@4.0.2 deduped
│ │ ├── npmlog@4.1.2 deduped
│ │ ├── pacote@9.5.12 deduped
│ │ ├── read-package-json@2.1.1 deduped
│ │ └── stringify-package@1.0.1 deduped
│ ├─┬ libnpmaccess@3.0.2
│ │ ├── aproba@2.0.0 deduped
│ │ ├─┬ get-stream@4.1.0
│ │ │ └── pump@3.0.0 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpmhook@5.0.3
│ │ ├── aproba@2.0.0 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpmorg@1.0.1
│ │ ├── aproba@2.0.0 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpmsearch@2.0.2
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpmteam@1.0.2
│ │ ├── aproba@2.0.0 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ libnpx@10.2.2
│ │ ├── dotenv@5.0.1
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ ├── safe-buffer@5.1.2 deduped
│ │ ├── update-notifier@2.5.0 deduped
│ │ ├── which@1.3.1 deduped
│ │ ├── y18n@4.0.0 deduped
│ │ └─┬ yargs@11.1.1
│ │   ├─┬ cliui@4.1.0
│ │   │ ├── string-width@2.1.1 deduped
│ │   │ ├─┬ strip-ansi@4.0.0
│ │   │ │ └── ansi-regex@3.0.0
│ │   │ └─┬ wrap-ansi@2.1.0
│ │   │   ├─┬ string-width@1.0.2
│ │   │   │ ├── code-point-at@1.1.0 deduped
│ │   │   │ ├── is-fullwidth-code-point@1.0.0 deduped
│ │   │   │ └── strip-ansi@3.0.1 deduped
│ │   │   └── strip-ansi@3.0.1 deduped
│ │   ├── decamelize@1.2.0
│ │   ├─┬ find-up@2.1.0
│ │   │ └─┬ locate-path@2.0.0
│ │   │   ├─┬ p-locate@2.0.0
│ │   │   │ └─┬ p-limit@1.2.0
│ │   │   │   └── p-try@1.0.0
│ │   │   └── path-exists@3.0.0 deduped
│ │   ├── get-caller-file@1.0.3
│ │   ├─┬ os-locale@3.1.0
│ │   │ ├─┬ execa@1.0.0
│ │   │ │ ├─┬ cross-spawn@6.0.5
│ │   │ │ │ ├── nice-try@1.0.5
│ │   │ │ │ ├── path-key@2.0.1 deduped
│ │   │ │ │ ├── semver@5.7.1 deduped
│ │   │ │ │ ├─┬ shebang-command@1.2.0
│ │   │ │ │ │ └── shebang-regex@1.0.0
│ │   │ │ │ └── which@1.3.1 deduped
│ │   │ │ ├── get-stream@4.1.0 deduped
│ │   │ │ ├── is-stream@1.1.0
│ │   │ │ ├─┬ npm-run-path@2.0.2
│ │   │ │ │ └── path-key@2.0.1
│ │   │ │ ├── p-finally@1.0.0
│ │   │ │ ├── signal-exit@3.0.2 deduped
│ │   │ │ └── strip-eof@1.0.0
│ │   │ ├─┬ lcid@2.0.0
│ │   │ │ └── invert-kv@2.0.0
│ │   │ └─┬ mem@4.3.0
│ │   │   ├─┬ map-age-cleaner@0.1.3
│ │   │   │ └── p-defer@1.0.0
│ │   │   ├── mimic-fn@2.1.0
│ │   │   └── p-is-promise@2.1.0
│ │   ├── require-directory@2.1.1
│ │   ├── require-main-filename@1.0.1
│ │   ├── set-blocking@2.0.0 deduped
│ │   ├── string-width@2.1.1 deduped
│ │   ├── which-module@2.0.0
│ │   ├── y18n@3.2.1
│ │   └─┬ yargs-parser@9.0.2
│ │     └── camelcase@4.1.0 deduped
│ ├─┬ lock-verify@2.1.0
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ └── semver@5.7.1 deduped
│ ├─┬ lockfile@1.0.4
│ │ └── signal-exit@3.0.2
│ ├── lodash._baseindexof@3.1.0
│ ├─┬ lodash._baseuniq@4.6.0
│ │ ├── lodash._createset@4.0.3
│ │ └── lodash._root@3.0.1
│ ├── lodash._bindcallback@3.0.1
│ ├── lodash._cacheindexof@3.0.2
│ ├─┬ lodash._createcache@3.1.2
│ │ └── lodash._getnative@3.9.1 deduped
│ ├── lodash._getnative@3.9.1
│ ├── lodash.clonedeep@4.5.0
│ ├── lodash.restparam@3.6.1
│ ├── lodash.union@4.6.0
│ ├── lodash.uniq@4.5.0
│ ├── lodash.without@4.4.0
│ ├─┬ lru-cache@5.1.1
│ │ └── yallist@3.0.3
│ ├── meant@1.0.1
│ ├─┬ mississippi@3.0.0
│ │ ├─┬ concat-stream@1.6.2
│ │ │ ├── buffer-from@1.0.0
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ ├─┬ readable-stream@2.3.6
│ │ │ │ ├── core-util-is@1.0.2 deduped
│ │ │ │ ├── inherits@2.0.4 deduped
│ │ │ │ ├── isarray@1.0.0 deduped
│ │ │ │ ├── process-nextick-args@2.0.0 deduped
│ │ │ │ ├── safe-buffer@5.1.2 deduped
│ │ │ │ ├─┬ string_decoder@1.1.1
│ │ │ │ │ └── safe-buffer@5.1.2 deduped
│ │ │ │ └── util-deprecate@1.0.2 deduped
│ │ │ └── typedarray@0.0.6
│ │ ├─┬ duplexify@3.6.0
│ │ │ ├── end-of-stream@1.4.1 deduped
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ ├─┬ readable-stream@2.3.6
│ │ │ │ ├── core-util-is@1.0.2 deduped
│ │ │ │ ├── inherits@2.0.4 deduped
│ │ │ │ ├── isarray@1.0.0 deduped
│ │ │ │ ├── process-nextick-args@2.0.0 deduped
│ │ │ │ ├── safe-buffer@5.1.2 deduped
│ │ │ │ ├─┬ string_decoder@1.1.1
│ │ │ │ │ └── safe-buffer@5.1.2 deduped
│ │ │ │ └── util-deprecate@1.0.2 deduped
│ │ │ └── stream-shift@1.0.0
│ │ ├─┬ end-of-stream@1.4.1
│ │ │ └── once@1.4.0 deduped
│ │ ├─┬ flush-write-stream@1.0.3
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ readable-stream@2.3.6
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@1.0.0 deduped
│ │ │   ├── process-nextick-args@2.0.0 deduped
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ string_decoder@1.1.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   └── util-deprecate@1.0.2 deduped
│ │ ├─┬ from2@2.3.0
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ readable-stream@2.3.6
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@1.0.0 deduped
│ │ │   ├── process-nextick-args@2.0.0 deduped
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ string_decoder@1.1.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   └── util-deprecate@1.0.2 deduped
│ │ ├─┬ parallel-transform@1.1.0
│ │ │ ├── cyclist@0.2.2
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ readable-stream@2.3.6
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@1.0.0 deduped
│ │ │   ├── process-nextick-args@2.0.0 deduped
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ string_decoder@1.1.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   └── util-deprecate@1.0.2 deduped
│ │ ├─┬ pump@3.0.0
│ │ │ ├── end-of-stream@1.4.1 deduped
│ │ │ └── once@1.4.0 deduped
│ │ ├─┬ pumpify@1.5.1
│ │ │ ├── duplexify@3.6.0 deduped
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ pump@2.0.1
│ │ │   ├── end-of-stream@1.4.1 deduped
│ │ │   └── once@1.4.0 deduped
│ │ ├─┬ stream-each@1.2.2
│ │ │ ├── end-of-stream@1.4.1 deduped
│ │ │ └── stream-shift@1.0.0 deduped
│ │ └─┬ through2@2.0.3
│ │   ├─┬ readable-stream@2.3.6
│ │   │ ├── core-util-is@1.0.2 deduped
│ │   │ ├── inherits@2.0.4 deduped
│ │   │ ├── isarray@1.0.0 deduped
│ │   │ ├── process-nextick-args@2.0.0 deduped
│ │   │ ├── safe-buffer@5.1.2 deduped
│ │   │ ├─┬ string_decoder@1.1.1
│ │   │ │ └── safe-buffer@5.1.2 deduped
│ │   │ └── util-deprecate@1.0.2 deduped
│ │   └── xtend@4.0.1
│ ├─┬ mkdirp@0.5.1
│ │ └── minimist@0.0.8
│ ├─┬ move-concurrently@1.0.1
│ │ ├── aproba@1.2.0
│ │ ├─┬ copy-concurrently@1.0.5
│ │ │ ├── aproba@1.2.0
│ │ │ ├── fs-write-stream-atomic@1.0.10 deduped
│ │ │ ├── iferr@0.1.5
│ │ │ ├── mkdirp@0.5.1 deduped
│ │ │ ├── rimraf@2.6.3 deduped
│ │ │ └── run-queue@1.0.3 deduped
│ │ ├── fs-write-stream-atomic@1.0.10 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ └─┬ run-queue@1.0.3
│ │   └── aproba@1.2.0
│ ├─┬ node-gyp@5.0.7
│ │ ├── env-paths@2.2.0
│ │ ├── glob@7.1.4 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── nopt@4.0.1 deduped
│ │ ├── npmlog@4.1.2 deduped
│ │ ├── request@2.88.0 deduped
│ │ ├── rimraf@2.6.3 deduped
│ │ ├── semver@5.7.1 deduped
│ │ ├── tar@4.4.13 deduped
│ │ └── which@1.3.1 deduped
│ ├─┬ nopt@4.0.1
│ │ ├── abbrev@1.1.1 deduped
│ │ └── osenv@0.1.5 deduped
│ ├─┬ normalize-package-data@2.5.0
│ │ ├── hosted-git-info@2.8.5 deduped
│ │ ├─┬ resolve@1.10.0
│ │ │ └── path-parse@1.0.6
│ │ ├── semver@5.7.1 deduped
│ │ └── validate-npm-package-license@3.0.4 deduped
│ ├─┬ npm-audit-report@1.3.2
│ │ ├── cli-table3@0.5.1 deduped
│ │ └── console-control-strings@1.1.0
│ ├── npm-cache-filename@1.0.2
│ ├─┬ npm-install-checks@3.0.2
│ │ └── semver@5.7.1 deduped
│ ├─┬ npm-lifecycle@3.1.4
│ │ ├── byline@5.0.0
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── node-gyp@5.0.7 deduped
│ │ ├── resolve-from@4.0.0
│ │ ├── slide@1.1.6 deduped
│ │ ├── uid-number@0.0.6 deduped
│ │ ├── umask@1.1.0 deduped
│ │ └── which@1.3.1 deduped
│ ├─┬ npm-package-arg@6.1.1
│ │ ├── hosted-git-info@2.8.5 deduped
│ │ ├── osenv@0.1.5 deduped
│ │ ├── semver@5.7.1 deduped
│ │ └── validate-npm-package-name@3.0.0 deduped
│ ├─┬ npm-packlist@1.4.7
│ │ ├─┬ ignore-walk@3.0.3
│ │ │ └── minimatch@3.0.4 deduped
│ │ └─┬ npm-bundled@1.1.1
│ │   └── npm-normalize-package-bin@1.0.1 deduped
│ ├─┬ npm-pick-manifest@3.0.2
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ └── semver@5.7.1 deduped
│ ├─┬ npm-profile@4.0.2
│ │ ├── aproba@2.0.0 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ └── npm-registry-fetch@4.0.2 deduped
│ ├─┬ npm-registry-fetch@4.0.2
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── JSONStream@1.3.5 deduped
│ │ ├── lru-cache@5.1.1 deduped
│ │ ├─┬ make-fetch-happen@5.0.2
│ │ │ ├─┬ agentkeepalive@3.5.2
│ │ │ │ └─┬ humanize-ms@1.2.1
│ │ │ │   └── ms@2.1.1
│ │ │ ├── cacache@12.0.3 deduped
│ │ │ ├── http-cache-semantics@3.8.1
│ │ │ ├─┬ http-proxy-agent@2.1.0
│ │ │ │ ├─┬ agent-base@4.3.0
│ │ │ │ │ └─┬ es6-promisify@5.0.0
│ │ │ │ │   └── es6-promise@4.2.8
│ │ │ │ └─┬ debug@3.1.0
│ │ │ │   └── ms@2.0.0
│ │ │ ├─┬ https-proxy-agent@2.2.4
│ │ │ │ ├── agent-base@4.3.0 deduped
│ │ │ │ └── debug@3.1.0 deduped
│ │ │ ├── lru-cache@5.1.1 deduped
│ │ │ ├── mississippi@3.0.0 deduped
│ │ │ ├─┬ node-fetch-npm@2.0.2
│ │ │ │ ├─┬ encoding@0.1.12
│ │ │ │ │ └─┬ iconv-lite@0.4.23
│ │ │ │ │   └── safer-buffer@2.1.2 deduped
│ │ │ │ ├── json-parse-better-errors@1.0.2 deduped
│ │ │ │ └── safe-buffer@5.1.2 deduped
│ │ │ ├── promise-retry@1.1.1 deduped
│ │ │ ├─┬ socks-proxy-agent@4.0.2
│ │ │ │ ├─┬ agent-base@4.2.1
│ │ │ │ │ └── es6-promisify@5.0.0 deduped
│ │ │ │ └─┬ socks@2.3.3
│ │ │ │   ├── ip@1.1.5
│ │ │ │   └── smart-buffer@4.1.0
│ │ │ └── ssri@6.0.1 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ └── safe-buffer@5.2.0
│ ├── npm-user-validate@1.0.0
│ ├─┬ npmlog@4.1.2
│ │ ├─┬ are-we-there-yet@1.1.4
│ │ │ ├── delegates@1.0.0
│ │ │ └─┬ readable-stream@2.3.6
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@1.0.0 deduped
│ │ │   ├── process-nextick-args@2.0.0 deduped
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ string_decoder@1.1.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   └── util-deprecate@1.0.2 deduped
│ │ ├── console-control-strings@1.1.0 deduped
│ │ ├─┬ gauge@2.7.4
│ │ │ ├── aproba@1.2.0
│ │ │ ├── console-control-strings@1.1.0 deduped
│ │ │ ├── has-unicode@2.0.1 deduped
│ │ │ ├── object-assign@4.1.1 deduped
│ │ │ ├── signal-exit@3.0.2 deduped
│ │ │ ├─┬ string-width@1.0.2
│ │ │ │ ├── code-point-at@1.1.0
│ │ │ │ ├─┬ is-fullwidth-code-point@1.0.0
│ │ │ │ │ └── number-is-nan@1.0.1
│ │ │ │ └── strip-ansi@3.0.1 deduped
│ │ │ ├── strip-ansi@3.0.1 deduped
│ │ │ └─┬ wide-align@1.1.2
│ │ │   └─┬ string-width@1.0.2
│ │ │     ├── code-point-at@1.1.0 deduped
│ │ │     ├── is-fullwidth-code-point@1.0.0 deduped
│ │ │     └── strip-ansi@3.0.1 deduped
│ │ └── set-blocking@2.0.0
│ ├─┬ once@1.4.0
│ │ └── wrappy@1.0.2 deduped
│ ├── opener@1.5.1
│ ├─┬ osenv@0.1.5
│ │ ├── os-homedir@1.0.2
│ │ └── os-tmpdir@1.0.2
│ ├─┬ pacote@9.5.12
│ │ ├── bluebird@3.5.5 deduped
│ │ ├── cacache@12.0.3 deduped
│ │ ├── chownr@1.1.3 deduped
│ │ ├── figgy-pudding@3.5.1 deduped
│ │ ├── get-stream@4.1.0 deduped
│ │ ├── glob@7.1.4 deduped
│ │ ├── infer-owner@1.0.4 deduped
│ │ ├── lru-cache@5.1.1 deduped
│ │ ├── make-fetch-happen@5.0.2 deduped
│ │ ├── minimatch@3.0.4 deduped
│ │ ├─┬ minipass@2.9.0
│ │ │ ├── safe-buffer@5.1.2 deduped
│ │ │ └── yallist@3.0.3 deduped
│ │ ├── mississippi@3.0.0 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── normalize-package-data@2.5.0 deduped
│ │ ├── npm-normalize-package-bin@1.0.1 deduped
│ │ ├── npm-package-arg@6.1.1 deduped
│ │ ├── npm-packlist@1.4.7 deduped
│ │ ├── npm-pick-manifest@3.0.2 deduped
│ │ ├── npm-registry-fetch@4.0.2 deduped
│ │ ├── osenv@0.1.5 deduped
│ │ ├── promise-inflight@1.0.1 deduped
│ │ ├─┬ promise-retry@1.1.1
│ │ │ ├── err-code@1.1.2
│ │ │ └── retry@0.10.1
│ │ ├─┬ protoduck@5.0.1
│ │ │ └── genfun@5.0.0
│ │ ├── rimraf@2.6.3 deduped
│ │ ├── safe-buffer@5.1.2 deduped
│ │ ├── semver@5.7.1 deduped
│ │ ├── ssri@6.0.1 deduped
│ │ ├── tar@4.4.13 deduped
│ │ ├── unique-filename@1.1.1 deduped
│ │ └── which@1.3.1 deduped
│ ├── path-is-inside@1.0.2
│ ├── promise-inflight@1.0.1
│ ├── qrcode-terminal@0.12.0
│ ├─┬ query-string@6.8.2
│ │ ├── decode-uri-component@0.2.0
│ │ ├── split-on-first@1.1.0
│ │ └── strict-uri-encode@2.0.0
│ ├── qw@1.0.1
│ ├─┬ read@1.0.7
│ │ └── mute-stream@0.0.7
│ ├─┬ read-cmd-shim@1.0.5
│ │ └── graceful-fs@4.2.3 deduped
│ ├─┬ read-installed@4.0.3
│ │ ├── debuglog@1.0.1 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── read-package-json@2.1.1 deduped
│ │ ├── readdir-scoped-modules@1.1.0 deduped
│ │ ├── semver@5.7.1 deduped
│ │ ├── slide@1.1.6 deduped
│ │ └── util-extend@1.0.3
│ ├─┬ read-package-json@2.1.1
│ │ ├── glob@7.1.4 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ ├── json-parse-better-errors@1.0.2 deduped
│ │ ├── normalize-package-data@2.5.0 deduped
│ │ └── npm-normalize-package-bin@1.0.1 deduped
│ ├─┬ read-package-tree@5.3.1
│ │ ├── read-package-json@2.1.1 deduped
│ │ ├── readdir-scoped-modules@1.1.0 deduped
│ │ └─┬ util-promisify@2.1.0
│ │   └─┬ object.getownpropertydescriptors@2.0.3
│ │     ├─┬ define-properties@1.1.3
│ │     │ └── object-keys@1.0.12
│ │     └─┬ es-abstract@1.12.0
│ │       ├─┬ es-to-primitive@1.2.0
│ │       │ ├── is-callable@1.1.4 deduped
│ │       │ ├── is-date-object@1.0.1
│ │       │ └─┬ is-symbol@1.0.2
│ │       │   └── has-symbols@1.0.0
│ │       ├── function-bind@1.1.1
│ │       ├─┬ has@1.0.3
│ │       │ └── function-bind@1.1.1 deduped
│ │       ├── is-callable@1.1.4
│ │       └─┬ is-regex@1.0.4
│ │         └── has@1.0.3 deduped
│ ├─┬ readable-stream@3.4.0
│ │ ├── inherits@2.0.4 deduped
│ │ ├─┬ string_decoder@1.2.0
│ │ │ └── safe-buffer@5.1.2 deduped
│ │ └── util-deprecate@1.0.2
│ ├─┬ readdir-scoped-modules@1.1.0
│ │ ├── debuglog@1.0.1 deduped
│ │ ├── dezalgo@1.0.3 deduped
│ │ ├── graceful-fs@4.2.3 deduped
│ │ └── once@1.4.0 deduped
│ ├─┬ request@2.88.0
│ │ ├── aws-sign2@0.7.0
│ │ ├── aws4@1.8.0
│ │ ├── caseless@0.12.0
│ │ ├─┬ combined-stream@1.0.6
│ │ │ └── delayed-stream@1.0.0
│ │ ├── extend@3.0.2
│ │ ├── forever-agent@0.6.1
│ │ ├─┬ form-data@2.3.2
│ │ │ ├── asynckit@0.4.0
│ │ │ ├── combined-stream@1.0.6 deduped
│ │ │ └── mime-types@2.1.19 deduped
│ │ ├─┬ har-validator@5.1.0
│ │ │ ├─┬ ajv@5.5.2
│ │ │ │ ├── co@4.6.0
│ │ │ │ ├── fast-deep-equal@1.1.0
│ │ │ │ ├── fast-json-stable-stringify@2.0.0
│ │ │ │ └── json-schema-traverse@0.3.1
│ │ │ └── har-schema@2.0.0
│ │ ├─┬ http-signature@1.2.0
│ │ │ ├── assert-plus@1.0.0
│ │ │ ├─┬ jsprim@1.4.1
│ │ │ │ ├── assert-plus@1.0.0 deduped
│ │ │ │ ├── extsprintf@1.3.0
│ │ │ │ ├── json-schema@0.2.3
│ │ │ │ └─┬ verror@1.10.0
│ │ │ │   ├── assert-plus@1.0.0 deduped
│ │ │ │   ├── core-util-is@1.0.2 deduped
│ │ │ │   └── extsprintf@1.3.0 deduped
│ │ │ └─┬ sshpk@1.14.2
│ │ │   ├─┬ asn1@0.2.4
│ │ │   │ └── safer-buffer@2.1.2 deduped
│ │ │   ├── assert-plus@1.0.0 deduped
│ │ │   ├─┬ bcrypt-pbkdf@1.0.2
│ │ │   │ └── tweetnacl@0.14.5 deduped
│ │ │   ├─┬ dashdash@1.14.1
│ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │   ├─┬ ecc-jsbn@0.1.2
│ │ │   │ ├── jsbn@0.1.1 deduped
│ │ │   │ └── safer-buffer@2.1.2 deduped
│ │ │   ├─┬ getpass@0.1.7
│ │ │   │ └── assert-plus@1.0.0 deduped
│ │ │   ├── jsbn@0.1.1
│ │ │   ├── safer-buffer@2.1.2
│ │ │   └── tweetnacl@0.14.5
│ │ ├── is-typedarray@1.0.0
│ │ ├── isstream@0.1.2
│ │ ├── json-stringify-safe@5.0.1
│ │ ├─┬ mime-types@2.1.19
│ │ │ └── mime-db@1.35.0
│ │ ├── oauth-sign@0.9.0
│ │ ├── performance-now@2.1.0
│ │ ├── qs@6.5.2
│ │ ├── safe-buffer@5.1.2 deduped
│ │ ├─┬ tough-cookie@2.4.3
│ │ │ ├── psl@1.1.29
│ │ │ └── punycode@1.4.1
│ │ ├─┬ tunnel-agent@0.6.0
│ │ │ └── safe-buffer@5.1.2 deduped
│ │ └── uuid@3.3.3 deduped
│ ├── retry@0.12.0
│ ├─┬ rimraf@2.6.3
│ │ └── glob@7.1.4 deduped
│ ├── safe-buffer@5.1.2
│ ├── semver@5.7.1
│ ├─┬ sha@3.0.0
│ │ └── graceful-fs@4.2.3 deduped
│ ├── slide@1.1.6
│ ├── sorted-object@2.0.1
│ ├─┬ sorted-union-stream@2.1.3
│ │ ├─┬ from2@1.3.0
│ │ │ ├── inherits@2.0.4 deduped
│ │ │ └─┬ readable-stream@1.1.14
│ │ │   ├── core-util-is@1.0.2 deduped
│ │ │   ├── inherits@2.0.4 deduped
│ │ │   ├── isarray@0.0.1
│ │ │   └── string_decoder@0.10.31
│ │ └─┬ stream-iterate@1.2.0
│ │   ├─┬ readable-stream@2.3.6
│ │   │ ├── core-util-is@1.0.2 deduped
│ │   │ ├── inherits@2.0.4 deduped
│ │   │ ├── isarray@1.0.0 deduped
│ │   │ ├── process-nextick-args@2.0.0 deduped
│ │   │ ├── safe-buffer@5.1.2 deduped
│ │   │ ├─┬ string_decoder@1.1.1
│ │   │ │ └── safe-buffer@5.1.2 deduped
│ │   │ └── util-deprecate@1.0.2 deduped
│ │   └── stream-shift@1.0.0 deduped
│ ├─┬ ssri@6.0.1
│ │ └── figgy-pudding@3.5.1 deduped
│ ├── stringify-package@1.0.1
│ ├─┬ tar@4.4.13
│ │ ├── chownr@1.1.3 deduped
│ │ ├─┬ fs-minipass@1.2.7
│ │ │ └─┬ minipass@2.9.0
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   └── yallist@3.0.3 deduped
│ │ ├─┬ minipass@2.9.0
│ │ │ ├── safe-buffer@5.1.2 deduped
│ │ │ └── yallist@3.0.3 deduped
│ │ ├─┬ minizlib@1.3.3
│ │ │ └─┬ minipass@2.9.0
│ │ │   ├── safe-buffer@5.1.2 deduped
│ │ │   └── yallist@3.0.3 deduped
│ │ ├── mkdirp@0.5.1 deduped
│ │ ├── safe-buffer@5.1.2 deduped
│ │ └── yallist@3.0.3 deduped
│ ├── text-table@0.2.0
│ ├── tiny-relative-date@1.3.0
│ ├── uid-number@0.0.6
│ ├── umask@1.1.0
│ ├─┬ unique-filename@1.1.1
│ │ └─┬ unique-slug@2.0.0
│ │   └── imurmurhash@0.1.4 deduped
│ ├── unpipe@1.0.0
│ ├─┬ update-notifier@2.5.0
│ │ ├─┬ boxen@1.3.0
│ │ │ ├─┬ ansi-align@2.0.0
│ │ │ │ └── string-width@2.1.1 deduped
│ │ │ ├── camelcase@4.1.0
│ │ │ ├── chalk@2.4.1 deduped
│ │ │ ├── cli-boxes@1.0.0
│ │ │ ├── string-width@2.1.1 deduped
│ │ │ ├─┬ term-size@1.2.0
│ │ │ │ └─┬ execa@0.7.0
│ │ │ │   ├─┬ cross-spawn@5.1.0
│ │ │ │   │ ├─┬ lru-cache@4.1.5
│ │ │ │   │ │ ├── pseudomap@1.0.2
│ │ │ │   │ │ └── yallist@2.1.2
│ │ │ │   │ ├── shebang-command@1.2.0 deduped
│ │ │ │   │ └── which@1.3.1 deduped
│ │ │ │   ├── get-stream@3.0.0
│ │ │ │   ├── is-stream@1.1.0 deduped
│ │ │ │   ├── npm-run-path@2.0.2 deduped
│ │ │ │   ├── p-finally@1.0.0 deduped
│ │ │ │   ├── signal-exit@3.0.2 deduped
│ │ │ │   └── strip-eof@1.0.0 deduped
│ │ │ └─┬ widest-line@2.0.0
│ │ │   └── string-width@2.1.1 deduped
│ │ ├─┬ chalk@2.4.1
│ │ │ ├─┬ ansi-styles@3.2.1
│ │ │ │ └─┬ color-convert@1.9.1
│ │ │ │   └── color-name@1.1.3
│ │ │ ├── escape-string-regexp@1.0.5
│ │ │ └─┬ supports-color@5.4.0
│ │ │   └── has-flag@3.0.0
│ │ ├─┬ configstore@3.1.2
│ │ │ ├─┬ dot-prop@4.2.0
│ │ │ │ └── is-obj@1.0.1
│ │ │ ├── graceful-fs@4.2.3 deduped
│ │ │ ├─┬ make-dir@1.3.0
│ │ │ │ └── pify@3.0.0
│ │ │ ├─┬ unique-string@1.0.0
│ │ │ │ └── crypto-random-string@1.0.0
│ │ │ ├── write-file-atomic@2.4.3 deduped
│ │ │ └── xdg-basedir@3.0.0 deduped
│ │ ├── import-lazy@2.1.0
│ │ ├─┬ is-ci@1.1.0
│ │ │ └── ci-info@1.6.0
│ │ ├─┬ is-installed-globally@0.1.0
│ │ │ ├─┬ global-dirs@0.1.1
│ │ │ │ └── ini@1.3.5 deduped
│ │ │ └─┬ is-path-inside@1.0.1
│ │ │   └── path-is-inside@1.0.2 deduped
│ │ ├── is-npm@1.0.0
│ │ ├─┬ latest-version@3.1.0
│ │ │ └─┬ package-json@4.0.1
│ │ │   ├─┬ got@6.7.1
│ │ │   │ ├─┬ create-error-class@3.0.2
│ │ │   │ │ └── capture-stack-trace@1.0.0
│ │ │   │ ├── duplexer3@0.1.4
│ │ │   │ ├── get-stream@3.0.0
│ │ │   │ ├── is-redirect@1.0.0
│ │ │   │ ├── is-retry-allowed@1.1.0
│ │ │   │ ├── is-stream@1.1.0 deduped
│ │ │   │ ├── lowercase-keys@1.0.1
│ │ │   │ ├── safe-buffer@5.1.2 deduped
│ │ │   │ ├── timed-out@4.0.1
│ │ │   │ ├── unzip-response@2.0.1
│ │ │   │ └─┬ url-parse-lax@1.0.0
│ │ │   │   └── prepend-http@1.0.4
│ │ │   ├─┬ registry-auth-token@3.3.2
│ │ │   │ ├─┬ rc@1.2.7
│ │ │   │ │ ├── deep-extend@0.5.1
│ │ │   │ │ ├── ini@1.3.5 deduped
│ │ │   │ │ ├── minimist@1.2.0
│ │ │   │ │ └── strip-json-comments@2.0.1
│ │ │   │ └── safe-buffer@5.1.2 deduped
│ │ │   ├─┬ registry-url@3.1.0
│ │ │   │ └── rc@1.2.7 deduped
│ │ │   └── semver@5.7.1 deduped
│ │ ├─┬ semver-diff@2.1.0
│ │ │ └── semver@5.7.1 deduped
│ │ └── xdg-basedir@3.0.0
│ ├── uuid@3.3.3
│ ├─┬ validate-npm-package-license@3.0.4
│ │ ├─┬ spdx-correct@3.0.0
│ │ │ ├── spdx-expression-parse@3.0.0 deduped
│ │ │ └── spdx-license-ids@3.0.3
│ │ └─┬ spdx-expression-parse@3.0.0
│ │   ├── spdx-exceptions@2.1.0
│ │   └── spdx-license-ids@3.0.3 deduped
│ ├─┬ validate-npm-package-name@3.0.0
│ │ └── builtins@1.0.3
│ ├─┬ which@1.3.1
│ │ └── isexe@2.0.0
│ ├─┬ worker-farm@1.7.0
│ │ └─┬ errno@0.1.7
│ │   └── prr@1.0.1
│ └─┬ write-file-atomic@2.4.3
│   ├── graceful-fs@4.2.3 deduped
│   ├── imurmurhash@0.1.4 deduped
│   └── signal-exit@3.0.2 deduped
└── yarn@1.22.0

david@macs:~/sites/til(master⚡) » 
```
