module.exports = (client, guild) => {
    client.user.setActivity(`${client.config.prefix} - Propage la bonne parole sur ${client.guilds.size} serveurs - http:
    const embed = {
        "title": `SERVEUR SUPPRIMÉ (${guild.name})`,
        "color": 13632027,
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
