exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
}
exports.help = {
    name: "ping",
    category: "Miscelaneous",
    description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
    usage: "ping"
};
