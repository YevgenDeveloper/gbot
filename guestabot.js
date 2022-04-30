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
var risicount = config.risicount;
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
client.on('guildMemberAdd', member => {
  const role = member.guild.channels.roles.find("name", "Membre");
  member.addRole(role).catch(console.error);
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
    if (msg.channel.name === config.welcome_chan) {
        removeCaller(msg, 100);
        let call = msg.content.toLowerCase();
        if (call.startsWith("ok") || call.startsWith("accept")) {
            console.log(msg.member.name + " accepted");
            msg.member.addRole(msg.guild.roles.find("name", "Membre")).catch(console.error);
            msg.member.removeRole(msg.guild.roles.find("name", "nouveau")).catch(console.error);
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
        if (command.startsWith('support')) {
            msg.reply(`Toute demande d'aide ou problème passe par un ticket sur le site https:
                {"file": "http:
        }
        if (command.startsWith('vote')) {
            msg.reply(`Merci de participer mon Kheyou, tu peux voter là https:
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
                        "name": "risibank `mot clé` (requiert de voter)",
                        "value": "Recherche dans la risibank et retourne un résultat parmis les `mot clés` indiqués !"
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
            msg.channel.send({embed});
        }
        if (command.startsWith("credits")) {
            msg.channel.send("Merci à la risibank (https:
            msg.channel.send("Dev par Benftwc/poneygenial avec les encouragements de Ourx");
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
        if (command.startsWith('WELCOMECHAN') && no_access(msg)) {
            config.welcome_chan = args[0];
            msg.channel.send(`Nouveau channel d'accueil : ${config.welcome_chan}`);
        }
        if (command.startsWith('VOTE') && no_access(msg)) {
            let mode = '';
            if (config.vote) {
                config.vote = false;
                mode = 'off';
            } else {
                config.vote = true;
                mode = 'on';
            }
            msg.channel.send(`Les votes sont a présent : ${mode}`);
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
function removeCaller(msg, timer = 300) {
    msg.delete(timer);
}
