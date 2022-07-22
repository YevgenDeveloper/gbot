exports.run = (client, message, args) => {
    const Risibank = require('risibank');
    const rb = new Risibank.RisiBank();
    let params = args.join(' ');
    const fs = require("fs")
    client.risicount.count++;
    fs.writeFile("./risicount.json", JSON.stringify(client.risicount), (err) => console.error);
    message.delete();
    if(!message.channel.nsfw && client.guildConf.nsfwOnly === "on") {
        message.author.send(`Le salon \`#${message.channel.name}\` du serveur \`${message.guild.name}\` bloque les stickers dans les salons "non NSFW"`);
        return;
    }
    let search = rb.searchStickers(params);
    search.then(function (data) {
        if (args.length > 5) {
            message.author.sendMessage("Je te conseil de pas envoyer plus de 5 mots clés :wink:")
        }
        let index = client.utils.getRandomInt(0, data.length);
        if (data[Object.keys(data)[index]] == undefined) {
            let search = rb.searchStickers(params);
            search.then(function (data) {
                let index = client.utils.getRandomInt(0, data.length);
                if (data[Object.keys(data)[index]] == undefined) {
                    let search = rb.searchStickers(params);
                    search.then(function (data) {
                        let index = client.utils.getRandomInt(0, data.length);
                        if (data[Object.keys(data)[index]] == undefined) {
                            let search = rb.searchStickers(args[0]);
                            search.then(function (data) {
                                if (data[Object.keys(data)[0]] == undefined) {
                                    message.channel.send('',
                                        {file: client.guildConf.sticker404}
                                    );
                                    return;
                                } else {
                                    message.channel.send('', {
                                        file: data[Object.keys(data)[0]].risibank_link
                                    });
                                }
                            })
                        } else {
                            if (!client.guildConf.show_risitags) {
                                params = '';
                            }
                            message.channel.send('' + params, {
                                file: data[index].risibank_link
                            });
                        }
                    })
                } else {
                    if (!client.guildConf.show_risitags) {
                        params = '';
                    }
                    message.channel.send('' + params, {
                        file: data[index].risibank_link
                    });
                }
            })
        } else {
            if (!client.guildConf.show_risitags) {
                params = '';
            }
            message.channel.send('' + params, {
                file: data[index].risibank_link
            });
        }
    })
}
