exports.run = (client, message, args) => {
    const key = `${message.guild.id}-${message.author.id}`;
    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
    });
    return message.channel.send(`Vous êtes au niveau ${client.points.get(key, "level")} avec ${client.points.get(key, "xp")} EXP ! Continue de Sticker !`);
}
