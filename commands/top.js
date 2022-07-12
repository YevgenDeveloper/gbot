exports.run = (client, message, args) => {
    const filtered = client.points.filter( p => p.guild === message.guild.id ).array();
    const sorted = filtered.sort((a, b) => b.points - a.points);
    const top10 = sorted.splice(0, 10);
    let embedFields = top10.map(data => {
        return {"name": client.users.get(data.user).tag, "value": `${data.points} points (niveau ${data.level})`};
    });
    const embed = {
        "title": `LEADERBOARD (${message.guild.name})`,
        "color": 4886754,
        "fields": embedFields
    };
    console.log(embedFields);
    return message.channel.send({embed});
}
