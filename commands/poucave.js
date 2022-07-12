exports.run = (client, message, args) => {
    if (!client.guildConf.disable_vote) {
        const DBL = require("dblapi.js");
        const dbl = new DBL(client.config.dblapi_apikey, client);
        dbl.hasVoted(message.author.id).then(data => {
            if (data === false) {
                message.author.sendMessage(`Merci de nous aider en allant voter mon khey (https:
                    {"file": "http:
                );
                return;
            }
        })
    }
    client.risistory.ensure(`${message.guild.id}`, {tags: []});
    let tags = client.risistory.fetch(message.guild.id);
    let last10 = tags.tags.reverse().slice(0, client.guildConf.history);
    return message.channel.send(`Liste des ${client.guildConf.history} derniers tags utilisés : \`\`\`${last10.join("\n")}\`\`\``);
}
