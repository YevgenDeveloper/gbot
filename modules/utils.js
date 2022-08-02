module.exports.has_perm = (message, permission, warn = false) => {
    if(warn && !message.channel.permissionsFor(message.member).has(permission, false)) {
        message.reply(`You don't have the required \`${permission}\` to achieve that command.`);
    }
    return message.channel.permissionsFor(message.member).has(permission, false);
}
module.exports.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
