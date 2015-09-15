var resign = require("./index.js"),
    report = function () {
        console.log("UID:  %d, GID:  %d", process.getuid(),  process.getgid());
        console.log("EUID: %d, EGID: %d", process.geteuid(), process.getegid());
    };

if (process.getuid() == 0) {
    console.log("I am root.");
}
report();

resign();

if (process.getuid() != 0) {
    console.log("My root privileges have been dropped.");
}
report();
