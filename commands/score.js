exports.run = (client, message, args) => {
  const key = `${message.guild.id}-${message.author.id}`;
  client.points.ensure(`${message.guild.id}-${message.author.id}`, {
    user: message.author.id,
    guild: message.guild.id,
    points: 0,
    level: 1,
    xp: 0
  });
  return message.channel.send(`Vous êtes au niveau ${client.points.get(key, "level") || 1} avec ${client.points.get(key, "xp") || 0} EXP ! Continue de Sticker !`);
}
