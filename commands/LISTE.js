exports.run = async (client, message) => {
    message.delete();
    let cleanData = (str, blank) => {
        str = ""+str;
        let siz = str.length;
        if(siz > blank) {
            str = "" + str.substr(0, blank - 1) + "\u2026";
        } else {
            let bor = blank - siz;
            str = "" + str + ' '.repeat(bor);
        }
        return "" + str;
    }
    let guildsTable =
        "+--------------------+--------------------------------+--------+--------+----------+-------+------+------+\n" +
        "| ID                 | Nom                            | #Chans | #Roles | #Membres | Score | Vote | nsfw |\n";
    let guilds = client.guilds;
    guilds.map(guild => {
        const curGuildCfg = client.settings.ensure(guild.id, client.defaultSettings);
        guildsTable +=
            "+--------------------+--------------------------------+--------+--------+----------+-------+------+------+\n" +
            "| " + guild.id + " | " + cleanData(guild.name, 30) + " | " + cleanData(guild.channels.size, 6) + " | " + cleanData(guild.roles.size, 6) + " | " + cleanData(guild.members.size, 8) + " | " + cleanData(curGuildCfg.score, 5) +" | " + cleanData(curGuildCfg.disable_vote, 4) + " | " + cleanData(curGuildCfg.nsfwOnly, 4) +" |\n";
    });
    guildsTable += "+--------------------+--------------------------------+--------+--------+----------+-------+------+------+\n";
    console.log(guildsTable);
}
