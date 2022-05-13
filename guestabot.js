var admin_role_name = config.admin_role_name;
var risibank_show_tags = config.show_risitags;
var risibank_celestin = config.celestin;
var bot_presence = config.bot_presence;
var bot_presence_luck = config.bot_presence_luck;
var risicount = config.risicount;
client.on('ready', () => {
    console.log(`${client.user.tag} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`${prefix} - Propage la bonne parole sur ${client.guilds.size} serveurs`);
});
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`${prefix} - Propage la bonne parole sur ${client.guilds.size} serveurs`);
}); 
client.on('message', async msg => {
    if (command) {
        if (command.startsWith('vote')) {
        }
        if (command.startsWith('don')) {
            removeCaller(msg, 1);
            let amount = '';
            if(args[0] != undefined && +args[0] > 0) {
                amount = args[0];
            }
            msg.author.sendMessage(`Je te remercie de participer aux frais de Gilbot. Tu peux passer par mon paypal si tu veux > http:
        }
        if (command.startsWith('risibank') || command.startsWith('risitas')) {
            if (config.vote) {
                dbl.hasVoted(msg.author.id).then(data => {
                    if (data === false) {
                        msg.author.sendMessage(`Merci de nous aider en allant voter mon khey (https:
                            {"file": "http:
                        );
                        return;
                    }
                })
            }
            risicount++;
            let params = args.join(' ');
            removeCaller(msg);
            let search = rb.searchStickers(params);
            search.then(function (data) {
                if (args.length > 5) {
                    msg.author.sendMessage("Je te conseil de pas envoyer plus de 5 mots clés :wink:")
                }
                if (data[Object.keys(data)[0]] == undefined) {
                    msg.reply("J'ai pas trouvé de de sticker correspondant à " + params, {
                        file: 'http:
                    });
                } else {
                    if (risibank_celestin) {
                        msg.reply('', {
                            file: data[getRandomInt(0, data.length)].risibank_link
                        });
                    } else {
                        if (!risibank_show_tags) {
                            params = '';
                        }
                        if (command.startsWith('risitas')) {
                            msg.channel.send('' + params, {
                                file: data[getRandomInt(0, data.length)].risibank_link
                            });
                        } else {
                            msg.channel.send('' + params, {
                                file: data[Object.keys(data)[0]].risibank_link
                            });
                        }
                    }
                }
            })
        }
        if (command.startsWith('invite')) {
            removeCaller(msg);
            msg.author.sendMessage(`tu peux ajouter Gilbot chez toi en cliquant sur https:
        }
        if (command.startsWith('help') || command.startsWith('aled')) {
        }
        if (command.startsWith('ALED') && no_access(msg)) {
            const embed = {
                "title": "**ALEEEED ADMIN VERSOIN**",
                "color": 16711680,
                "footer": {
                    "icon_url": "http:
                    "text": "N'OUBLIE PAS, tu peux m'aider en allant voter"
                },
                "thumbnail": {
                    "url": "http:
                },
                "fields": [
                    {
                        "name": "__:gear: SETPREFIX__",
                        "value": "Permet de modifier le prefix du serveur (actuellement XX)"
                    },
                    {
                        "name": "__:recycle: LEGANGE__",
                        "value": "Supprime les 100 derniers messages datant de moins de 15 jours du salon"
                    },
                    {
                        "name": "__:joy: RISITAGS__",
                        "value": "Indique les mots clés utilisés pour chaque recherche dans la risibank"
                    },
                    {
                        "name": "__:joy: CELESTIN__",
                        "value": "Active ou désactive la citation de l'utilisateur du risibank"
                    },
                    {
                        "name": "__:ghost: PRESENCE__",
                        "value": "Permet de gérer les réponses automatiques du bot. PRESENCE prend 3 paramètres :"
                    },
                    {
                        "name": "__:thinking: VOTE__",
                        "value": "Active ou désactive le vote obligatoire pour les risibank"
                    },
                    {
                        "name": "__:smirk: SAVECONFIG__",
                        "value": "Enregistre les configs/stats du bot en prévision d'un reboot"
                    },
                    {
                        "name": "on/off",
                        "value": "Active ou désactive les réponses automatiques au mot bot",
                        "inline": true
                    },
                    {
                        "name": "rng",
                        "value": "suivit d'un nombre comprit entre 0 et 100 correspondant à la CHANCE qu'a le bot pour répondre",
                        "inline": true
                    }
                ]
            };
            msg.channel.send({embed});
        }
        if (command.startsWith('STATS') && no_access(msg)) {
            if(args[0] != undefined) {
                let guild = client.guilds.find("name", args[0]);
            }
        }
        if (command.startsWith('SETPREFIX') && no_access(msg)) {
            prefix = args[0];
            prefixSize = prefix.length;
            msg.reply('Le nouveau préfixe est ' + prefix);
        }
        if (command.startsWith('LEGANGE') && no_access(msg)) {
            removeCaller(msg);
            var n = 0;
            while (n < config.gange_lines) {
                const fetched = await msg.channel.fetchMessages({limit: 100});
                msg.channel.bulkDelete(fetched)
                    .catch(error => msg.reply(`Couldn't delete messages because of: ${error}`));
                n++;
            }
            msg.channel.send(":ok_hand: :grin:", {
                    file: "http:
                }
            );
        }
        if (command.startsWith('SAVECONFIG') && has_root_access(msg)) {
            removeCaller(msg);
            config.prefix = prefix;
            prefix.length = prefixSize;
            config.admin_role_name = admin_role_name;
            config.show_risitags = risibank_show_tags;
            config.celestin = risibank_celestin;
            config.bot_presence = bot_presence;
            config.bot_presence_luck = bot_presence_luck;
            config.risicount = risicount;
            const fs = require("fs")
            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        }
    }
});
client.login(config.token);
