const Discord = require('discord.js');
const Risibank = require('risibank');
const jsdom = require("jsdom");
const config = require("./config.json");
var rb = new Risibank.RisiBank();
const client = new Discord.Client();
const {JSDOM} = jsdom;
var prefix = config.prefix;
var prefixSize = prefix.length;
var admin_role_name = config.admin_role_name
var risibank_show_tags = config.show_risitags;
var risibank_celestin = config.celestin;
var bot_presence = config.bot_presence;
var bot_presence_luck = config.bot_presence_luck
var risicount = 0;
client.on('ready', () => {
    console.log(`${client.user.tag} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`${prefix} - Propage la bonne parole sur ${client.guilds.size} serveurs`);
});
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`${prefix} - Propage la bonne parole sur ${client.guilds.size} serveurs`);
});
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`${prefix} - Propage la bonne parole sur ${client.guilds.size} serveurs`);
});
client.on('message', async msg => {
    if (msg.author.bot) return;
    var troll_bot_idx = msg.content.indexOf("bot");
    var troll_answers = ["Hmm ? Ça parle de moi ?", "T'as un soucis a parler de moi ? Tu veux que j'appelle Shlomo ?", "Trouve toi un pote frère, arrête de me citer comme ça..."];
    if (troll_bot_idx > 0) {
        console.log('troll');
        if (bot_presence != "off") {
            var rng = getRandomInt(0, 100);
            if (bot_presence == "on") {
                msg.reply(troll_answers[Math.floor(Math.random() * troll_answers.length)]);
            } else {
                if (rng >= (100 - bot_presence_luck)) {
                    console.log('sent');
                    msg.reply(troll_answers[Math.floor(Math.random() * troll_answers.length)]);
                }
            }
        }
    }
    if (msg.content.indexOf(config.prefix) !== 0) return;
    if (config.debug && msg.author.id != config.root_user) {
        return;
    }
    let command = isCommand(msg.content);
    if (command) {
        if (command.startsWith('ping')) {
            msg.reply('Pong!');
        }
        if (command.startsWith('risibank') || command.startsWith('risitas')) {
            risicount++;
            let params = command.slice(prefixSize + 8);
            if (command.startsWith('risitas')) {
                params = command.slice(prefixSize + 7);
            }
            removeCaller(msg, 'risibank');
            let search = rb.searchStickers(params);
            search.then(function (data) {
                if (data[Object.keys(data)[0]] == undefined) {
                    msg.reply("J'ai pas trouvé de de sticker correspondant à " + params, {
                        file: 'http:
                    });
                } else {
                    if (risibank_celestin) {
                        msg.reply('demande a afficher ' + params + ' ... #BalanceTonCelestin', {
                            file: data[Object.keys(data)[0]].risibank_link
                        });
                    } else {
                        if (!risibank_show_tags) {
                            params = '';
                        }
                        msg.channel.send('' + params, {
                            file: data[Object.keys(data)[0]].risibank_link
                        });
                    }
                }
            })
        }
        if(command.startsWith('invite')) {
            msg.reply(`tu peux ajouter Gilbot chez toi en cliquant sur http:
                {file: "http:
            );
        }
        if (command.startsWith('help') || command.startsWith('aled')) {
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
                        "name": `Actuellement, le préfix est ${prefix}, faut le savoir hein.`,
                        "value": "\u200b"
                    },
                    {
                        "name": "risibank <mot clé>",
                        "value": "Recherche dans la risibank et retourne un résultat parmis les <mot clés> indiqués !"
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
                        "name": "credits",
                        "value": "A ton avis du con :beers::beers::beers:"
                    },
                    {
                        "name": "\u200b​",
                        "value": "[**Voter**](https:
                    }
                ]
            };
            msg.channel.send({ embed });
        }
        if (command.startsWith("credits")) {
            msg.channel.send("Merci à la risibank (https:
            msg.channel.send("Dev par poneygenial avec les encouragements de Ourx");
        }
        if (command.startsWith('stats')) {
            msg.reply(`Depuis mon reboot, j'ai déjà envoyé ${risicount} stickers :joy:`);
            msg.reply(`J'offre actuellement du bonheur à ${client.users.size} personnes a travers ${client.channels.size} channels de ${client.guilds.size} serveurs. Ouf hein ?! Merci !!`,
                    {file: "http:
                );
        }
        if (command.startsWith('RISITAGS') && no_access(msg)) {
            if (risibank_show_tags) {
                risibank_show_tags = false;
                msg.channel.send("Ok, j'arrête de t'afficher avec les tags chelous sur la risibank :ok_hand: :grin:");
            } else {
                risibank_show_tags = true;
                msg.channel.send("Ok, si t'assumes d'afficher tout tes tags chelous sur la risibank :ok_hand: :grin:");
            }
        }
        if (command.startsWith('PRESENCE') && no_access(msg)) {
            let param = command.slice(prefixSize + 8).toLowerCase();
            if (param.length < 1) {
                msg.reply(`La présence du bot est réglée sur ${bot_presence} <${bot_presence_luck}>`);
                return;
            }
            let options = ["on", "off"];
            if (options.indexOf(param) !== -1 || param.startsWith("rng")) {
                if (param.startsWith("rng")) {
                    bot_presence = 'rng';
                    let subparam = +param.slice(4);
                    bot_presence_luck = subparam;
                    msg.reply(`La CHANCE du bot est à présent réglée sur ${bot_presence} <${bot_presence_luck}>`);
                } else if (param === 'on') {
                    bot_presence = param;
                    msg.reply(`La présence du bot est à présent réglée sur ${param}`);
                } else {
                    msg.reply(`Wesh, t'es con ou quoi ? Y'a 3 options, ON, OFF et RNG. \`${param}\` n'en fait pas parti ...`);
                }
            } else {
                msg.reply(`Wesh, t'es con ou quoi ? Y'a 3 options, ON, OFF et RNG. \`${param}\` n'en fait pas parti ...`);
            }
        }
        if (command.startsWith('CELESTIN') && no_access(msg)) {
            if (risibank_celestin) {
                risibank_celestin = false;
                msg.channel.send("Ok, j'arrête d'afficher les Celestins :ok_hand: :grin:");
            } else {
                risibank_celestin = true;
                msg.channel.send("Ok, c'est parti pour afficher les Celestins :ok_hand: :grin:");
            }
        }
        if(command.startsWith('SETSTATS') && no_access(msg)) {
            if(risicount == 0)
            var param = +command.slice(prefixSize + 8);
            risicount = param;
            msg.reply("Ok :ok_hand: :grin:");
        }
        if(command.startsWith('ALED') && no_access(msg)) {
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
                        "name": "__:thinking: SETSTATS__",
                        "value": "Permet d'initialiser le compteur de risibank"
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
            msg.channel.send({ embed });
        }
        if (command.startsWith('SETPREFIX') && no_access(msg)) {
            params = command.slice(prefixSize + 9);
            prefix = params;
            prefixSize = prefix.length;
            msg.reply('New prefix setted. Is now ' + prefix);
            console.log('prefix updated');
        }
        if (command.startsWith('LEGANGE') && no_access(msg)) {
            removeCaller(msg, 'LEGANGE');
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
    }
});
client.login(config.token);
function isCommand(msg) {
    prefixSize = prefix.length;
    candidat = msg.substr(0, prefixSize);
    if (candidat === prefix) {
        command = msg.slice(prefixSize);
        return command;
    }
    return false;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function no_access(msg) {
    if (!msg.member.roles.some(r => [admin_role_name].includes(r.name))) {
        msg.reply(":410: commande suicidée ! - Recommence et je te pète les jambes petit fdp.");
        return false;
    }
    return true;
}
function removeCaller(msg, caller = '') {
    caller_log = caller.length ? ' [' + caller + '] ' : '';
    msg.delete(300).then(msg => console.log(`${caller} Auto-deleted message from ${msg.author.username}`));
}
