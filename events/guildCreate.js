module.exports = (client, guild) => {
    client.user.setActivity(`${client.config.prefix} - Propage la bonne parole sur ${client.guilds.size} serveurs`);
    const embed = {
        "title": `NOUVEAU SERVEUR (${guild.name})`,
        "color": 4886754,
        "fields": [
            {
                "name": "Nom",
                "value": guild.name
            },
            {
                "name": "ID",
                "value": guild.id
            },
            {
                "name": "Utilisateurs",
                "value": guild.memberCount
            }
        ]
    };
    client.users.get(client.config.root_user).send({embed});
}
