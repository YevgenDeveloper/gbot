module.exports = (client) => {
    client.user.setActivity(`${client.config.prefix} - Propage la bonne parole sur ${client.guilds.size} serveurs - http:
    const embed = {
        "title": "BOT READY",
        "color": 8311585,
        "fields": [
            {
                "name": "Nombre de serveurs",
                "value": client.guilds.size
            },
            {
                "name": "Utilisateurs total",
                "value": client.users.size
            },
            {
                "name": "Channels total",
                "value": client.channels.size
            }
        ]
    };
    client.users.get(client.config.root_user).send({embed});
}
