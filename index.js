module.exports = function (user, group) {
    // attempt to get sudo user's id from environment
    if (arguments.length === 0 && process.env.SUDO_UID) {
        group = parseInt(process.env.SUDO_GID, 10);
        user = parseInt(process.env.SUDO_UID, 10);
    }

    if (!group) {
        throw new Error("No valid group credentials were found.");
    }

    if (!user) {
        throw new Error("No valid user credentials were found.");
    }

    process.setgid(group); // set group first
    process.setuid(user); // ..then set user
};
