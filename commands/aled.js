exports.run = (client, message, args) => {
    message.delete();
    const embed = {
        "title": "**ALEEEED**",
        "color": 16762368,
        "footer": {
            "icon_url": "http:
            "text": "N'OUBLIE PAS, tu peux m'aider en allant voter"
        },
        "thumbnail": {
            "url": "http:
        },
        "fields": [
            {
                "name": `Actuellement, le préfix est ${client.config.prefix}, faut le savoir hein.`,
                "value": "\u200b"
            },
            {
                "name": "risibank `mot clé`",
                "value": "Recherche dans la risibank et retourne **le premier** résultat parmis les `mot clés` indiqués !"
            },
            {
                "name": "risitas `mot clé`",
                "value": "Recherche dans la risibank et retourne **n'importe quel** résultat parmis les `mot clés` indiqués !"
            },
            {
                "name": "stats",
                "value": "Indique les statistiques d'utilisation et d'installation de Gilbot"
            },
            {
                "name": "invite",
                "value": "Permet d'inviter Gilbot sur votre propre discord, la CHANCE !"
            },
            {
                "name": "vote",
                "value": "Permet d'obtenir l'adresse de vote pour le bot :muscle: !"
            },
            {
                "name": "support",
                "value": "Si tu as un besoin d'aide, viens faire un tour :smile:"
            },
            {
                "name": "don",
                "value": "Si tu as trop d'argent avec ton RSA et que tu souhaites contribuer aux frais du bot :smile:"
            },
            {
                "name": "credits",
                "value": "A ton avis du con :beers::beers::beers:"
            },
            {
                "name": "\u200b​",
                "value": "[**Voter**](https:
            }
        ]
    };
    message.channel.send({embed});
}
exports.help = {
    name: "help",
    category: "Miscelaneous",
    description: "Permet d'obtenir de l'aide pour utiliser le bot",
    usage: "aled"
};
