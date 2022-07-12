exports.run = (client, message, args) => {
    const key = `${message.guild.id}-${message.author.id}`;
    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
    });
    return message.channel.send(`Vous avez actuellement ${client.points.get(key, "points")} points et êtes au niveau ${client.points.get(key, "level")}! Continue à utiliser des Stickers !`);
}
