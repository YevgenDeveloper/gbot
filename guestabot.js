const Discord = require('discord.js');
const Risibank = require('risibank');
const jsdom = require("jsdom");
const DBL = require("dblapi.js");
const config = require("./config.json");
var rb = new Risibank.RisiBank();
const client = new Discord.Client();
const dbl = new DBL(config.dblapi_apikey, client);
const {JSDOM} = jsdom;
var prefix = config.prefix;
var prefixSize = prefix.length;
var admin_role_name = config.admin_role_name;
var risibank_show_tags = config.show_risitags;
var risibank_celestin = config.celestin;
var bot_presence = config.bot_presence;
var bot_presence_luck = config.bot_presence_luck;
var risicount = config.bot_presence_luck;
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
        if (bot_presence != "off") {
            var rng = getRandomInt(0, 100);
            if (bot_presence == "on") {
                msg.reply(troll_answers[Math.floor(Math.random() * troll_answers.length)]);
            } else {
                if (rng >= (100 - bot_presence_luck)) {
                    msg.reply(troll_answers[Math.floor(Math.random() * troll_answers.length)]);
                }
            }
        }
    }
    if (msg.content.indexOf(config.prefix) !== 0) return;
    if (config.debug && msg.author.id != config.root_user) {
        return;
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if (command) {
        if (command.startsWith('ping')) {
            msg.reply('Pong!');
        }
        if (command.startsWith('risibank') || command.startsWith('risitas')) {
            if(!forceVote(msg)) {
                return;
            }
            risicount++;
            let params = args.join(' ');
            removeCaller(msg, 'risibank');
            let search = rb.searchStickers(params);
            search.then(function (data) {
                if(args.length > 5) {
                    msg.reply("Je te conseil de pas envoyer plus de 5 mots clés :wink:");
                }
                if (data[Object.keys(data)[0]] == undefined) {
                    msg.reply("J'ai pas trouvé de de sticker correspondant à " + params, {
                        file: 'http:
                    });
                } else {
                    if (risibank_celestin) {
                        msg.reply('demande a afficher ' + params + ' ... #BalanceTonCelestin', {
                            file: data[getRandomInt(0, data.length)].risibank_link
                        });
                    } else {
                        if (!risibank_show_tags) {
                            params = '';
                        }
                        msg.channel.send('' + params, {
                            file: data[getRandomInt(0, data.length)].risibank_link
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
            if (args.length < 1) {
                msg.reply(`La présence du bot est réglée sur ${bot_presence} <${bot_presence_luck}>`);
                return;
            }
            let options = ["on", "off"];
            if (options.indexOf(args[0]) !== -1 || args[0] === 'rng') {
                if (args[0] === 'rng') {
                    bot_presence = 'rng';
                    bot_presence_luck = +args[1];
                    msg.reply(`La CHANCE du bot est à présent réglée sur ${bot_presence} <${bot_presence_luck}>`);
                } else if (args[0] === 'on') {
                    bot_presence = args[0];
                    msg.reply(`La présence du bot est à présent réglée sur ${bot_presence}`);
                } else {
                    msg.reply(`Wesh, t'es con ou quoi ? Y'a 3 options, ON, OFF et RNG. \`${args[0]}\` n'en fait pas parti ...`);
                }
            } else {
                msg.reply(`Wesh, t'es con ou quoi ? Y'a 3 options, ON, OFF et RNG. \`${args[0]}\` n'en fait pas parti ...`);
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
            prefix = args[0];
            prefixSize = prefix.length;
            msg.reply('Le nouveau préfixe est ' + prefix);
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
        if(command.startsWith('SAVECONFIG') && has_root_access(msg)) {
            removeCaller(msg, 'SAVECONFIG');
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
function has_root_access(msg) {
    return msg.author.id === config.root_user;
}
function removeCaller(msg, caller = '', timer = 300) {
    caller_log = caller.length ? ' [' + caller + '] ' : '';
    msg.delete(timer);
}
function forceVote(msg) {
    if(dbl.hasVoted(msg.author.id)) {
        return true;
    } else {
        msg.reply(`Merci de nous aider en allant [voter ici](https:
    }
}
