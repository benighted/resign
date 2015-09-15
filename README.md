# resign
Safely drop elevated (root) permissions for system security. This allows you to do things like bind to privileged ports (<1024), use the `ping` command, etc., and then release the permissions so that an attacker will not be able to compromise the entire server.

## Quick Start

Simply require the `resign` module and call it like any other function.  The exported function (`resign(user, group)` in this case) takes 2 (optional) parameters: user and group names or numeric IDs to assume the role of.  If omitted, the function will attempt to grab a sudo user and group ID from the environment. 

**Sample script (sample.js):**
```javascript
var resign = require("resign"),
    report = function () {
        console.log("UID:  %d, GID:  %d", process.getuid(),  process.getgid());
        console.log("EUID: %d, EGID: %d", process.geteuid(), process.getegid());
    };

if (process.getuid() == 0) {
    console.log("I am root.");
    report();
}

resign();

if (process.getuid() != 0) {
    console.log("My root privileges have been dropped.");
    report();
}
```

**Output:**
```bash
$ sudo node sample.js
I am root.
UID:  0, GID:  0
EUID: 0, EGID: 0
My root privileges have been dropped.
UID:  1000, GID:  1000
EUID: 1000, EGID: 1000
```

