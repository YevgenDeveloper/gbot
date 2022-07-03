exports.run = (client, message, args) => {
    if (client.guildConf.adminRole != "") {
        const adminPerm = client.utils.has_perm(message, 'ADMINISTRATOR', false);
        ;
        if (!adminPerm) {
            return message.reply("Désolé khey, t'es pas admin!");
        }
    }
    if (args.length === 0) {
        let configProps = Object.keys(client.guildConf).map(prop => {
            return `${prop} = ${client.guildConf[prop]}`;
        });
        message.channel.send(`Configuration actuelle du serveur:
        \`\`\`${configProps.join("\n")}\`\`\``);
    } else {
        const [prop, ...value] = args;
        if (!client.settings.has(message.guild.id, prop)) {
            return message.reply("This key is not in the configuration.");
        }
        client.settings.set(message.guild.id, value.join(" "), prop);
        message.channel.send(`Nouvelle configuration pour \`${prop}\` :\n\`${value.join(" ")}\``);
    }
}
