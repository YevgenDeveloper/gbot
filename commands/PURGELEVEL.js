exports.run = async (client, message, args) => {
    message.delete();
    if (!client.utils.has_perm(message, 'ADMINISTRATOR', true))
        return;
    const filtered = client.points.filter( p => p.guild === message.guild.id );
    const rightNow = new Date();
    const toRemove = filtered.filter(data => {
        return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
    });
    if(args[0] === "all") {
        filtered.forEach(data => {
            client.points.set(`${message.guild.id}-${data.user}`,0, "points");
            client.points.set(`${message.guild.id}-${data.user}`,1, "level");
        });
        message.channel.send(`Les points de ${filtered.size} comptes sont a présent retirés.`);
    } else {
        toRemove.forEach(data => {
            client.points.set(`${message.guild.id}-${data.user}`,0, "points");
            client.points.set(`${message.guild.id}-${data.user}`,1, "level");
        });
        message.channel.send(`Les points de ${toRemove.size} comptes inactifs sont a présent retirés.`);
    }
}
