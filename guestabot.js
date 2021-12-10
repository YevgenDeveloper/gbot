const Discord = require('discord.js');
const client = new Discord.Client();
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const config = require("./config.json");
const loki = require("lokijs");
var db = new loki('risibank.db', {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});
var guestabank = db.addCollection('guestabank');
var prefix = config.prefix;
var admin_role_name = config.admin_role_name
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
    if(msg.content.indexOf("bot") !== 0) {
        msg.reply("Hmm ? Ça parle de moi ?");
    }
    if (msg.content.indexOf(config.prefix) !== 0) return;
    if (config.debug && msg.author.id != config.root_user) {
        return;
    }
    if (command = isCommand(msg.content)) {
        if (command.startsWith('ping')) {
            msg.reply('Pong!');
        }
        if (command.startsWith('bank')) {
            subcommand = command.slice(5);
            if (subcommand.startsWith('add')) {
                var params = subcommand.slice(4);
                var pic_url_idx = params.indexOf(' ');
                var url = params.substr(0, pic_url_idx);
                var keywords = params.substr(pic_url_idx + 1);
                if (config.debug) {
                    msg.reply('1 : ' + url + ' - 2 : ' + keywords);
                }
                removeCaller(msg, 'bank add');
                var db_results = guestabank.find({'url': {'$contains': url}});
                if (db_results.length == 0) {
                    guestabank.insert({
                        url: url,
                        keywords: keywords
                    });
                    var records = guestabank.data.length;
                    msg.reply(`tu sais, je pratique la MMA depuis 6 ans et possède pas loins de ${records} images !`)
                } else {
                    msg.reply("Bien tenté batard, mais un autré clé l'a posté avant toi. Ghostfag va :ghost: ")
                }
            } else {
                var db_results = guestabank.find({'keywords': {'$contains': subcommand}});
                removeCaller(msg, 'bank remove');
                if (!config.debug) {
                    subcommand = '';
                }
                if (db_results.length == 0) {
                    msg.reply("Hmm, aucun résultat. C'est vraiment pas de CHANCE ¯\\_(ツ)_/¯");
                } else {
                    msg.channel.send(subcommand, {
                        file: db_results[0].url
                    });
                }
            }
        }
        if (command.startsWith('risibank')) {
            params = command.slice(9);
            risibankUrl = getRisibankRelated(params);
            removeCaller(msg, 'risibank');
            msg.channel.send('', {
                file: risibankUrl
            });
        }
        if (command.startsWith('prefix')) {
            msg.reply('Current prefix is *' + prefix + '*. To change it, please type `' + prefix + 'setprefix X` where X is the prefix');
        }
        if (command.startsWith('setprefix')) {
            params = command.slice(10);
            prefix = params;
            msg.reply('New prefix setted. Is now ' + prefix);
            console.log('prefix updated');
        }
        if (command.startsWith('help') || command.startsWith('aled')) {
            msg.reply("For now, some commands are available : help, aled, prefix, setprefix, risibank");
            msg.reply("The used prefix is " + prefix);
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
            msg.channel.send("Purifié par le GANGE :ok_hand: :grin:");
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
function getRisibankRelated(search) {
    if (search === 'random' || search === 'rng') {
        rng = getRandomInt(201, 297);
        return 'https:
    }
    (async (url) => {
        code = await getScript(url);
        dom = new JSDOM(code);
        imageUrl = dom.window.document.querySelector(".risicard:first-child img").dataset.src;
        return imageUrl;
    })('https:
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
const getScript = (url) => {
    return new Promise((resolve, reject) => {
        const http = require('http'),
            https = require('https');
        let client = http;
        if (url.toString().indexOf("https") === 0) {
            client = https;
        }
        client.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve(data);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
};
function databaseInitialize() {
    var guestabank = db.getCollection("guestabank");
    if (guestabank === null) {
        guestabank = db.addCollection("guestabank");
    }
}
function removeCaller(msg, caller = '') {
    caller_log = caller.length ? ' [' + caller + '] ' : '';
    msg.delete(300).then(msg => console.log(`${caller} Auto-deleted message from ${msg.author.username}`));
}
