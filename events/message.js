module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const guildConf = client.settings.ensure(message.guild.id, client.defaultSettings);
    client.guildConf = guildConf;
    if(!client.guildConf.hasOwnProperty('score')) {
        client.guildConf.score = true;
    }
    if(!client.guildConf.hasOwnProperty('nsfwOnly')) {
        client.guildConf.nsfwOnly = true;
    }
    if(!client.guildConf.hasOwnProperty('history')) {
        client.guildConf.history = 4;
    }
    if(!client.guildConf.hasOwnProperty('sticker404')) {
        client.guildConf.sticker404 = "http:
    }
    if(!client.guildConf.hasOwnProperty('disable_vote')) {
        client.guildConf.disable_vote = false;
    }
    if (message.content.indexOf(guildConf.prefix) !== 0) return;
    const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    const scored_actions = ['risitas', 'risibank', 'waifu'];
    if ((client.guildConf.score && scored_actions.indexOf(command) !== -1)) {
        const key = `${message.guild.id}-${message.author.id}`;
        client.points.ensure(`${message.guild.id}-${message.author.id}`, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1
        });
        client.points.inc(key, "points");
        client.risistory.ensure(message.guild.id, {tags: []});
        client.risistory.push(message.guild.id, args.join(' '), 'tags', true);
        const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
        if (client.points.get(key, "level") < curLevel) {
            message.reply(`A force de stickers, tu passe au niveau **${curLevel}**! `);
            client.points.set(key, curLevel, "level");
        }
    }
    const cmd = client.commands.get(command);
    if (!cmd) return;
    cmd.run(client, message, args);
};
