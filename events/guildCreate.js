module.exports = (client, guild) => {
    client.user.setActivity(`http:
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
    client.channels.get(client.config.log_discord_channel).send({embed});
    client.settings.ensure(guild.id, client.defaultSettings);
}
