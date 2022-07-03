module.exports = (client, message) => {
    if (message.author.bot) return;
    const guildConf = client.settings.ensure(message.guild.id, client.defaultSettings);
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
    const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    client.guildConf = guildConf;
    const cmd = client.commands.get(command);
    if (!cmd) return;
    cmd.run(client, message, args);
};
