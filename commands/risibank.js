exports.run = (client, message, args) => {
    const Risibank = require('risibank');
    const rb = new Risibank.RisiBank();
    const fs = require("fs")
    client.risicount.count++;
    fs.writeFile("./risicount.json", JSON.stringify(client.risicount), (err) => console.error);
    let params = args.join(' ');
    message.delete();
    let search = rb.searchStickers(params);
    search.then(function (data) {
        if (args.length > 5) {
            message.author.sendMessage("Je te conseil de pas envoyer plus de 5 mots clés :wink:")
        }
        if (data[Object.keys(data)[0]] == undefined) {
            message.reply("J'ai pas trouvé de de sticker correspondant à " + params, {
                file: client.guildConf.sticker404
            });
        } else {
            if (!client.guildConf.show_risitags) {
                params = '';
            }
            message.channel.send('' + params, {
                file: data[Object.keys(data)[0]].risibank_link
            });
        }
    })
}
