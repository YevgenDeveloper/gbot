exports.run = (client, message, args) => {
    message.delete();
    let amount = '';
    if(args[0] != undefined && +args[0] > 0) {
        amount = args[0];
    }
    message.author.sendMessage(`Je te remercie de participer aux frais de Gilbot. Tu peux passer par mon paypal si tu veux > http:
}
exports.help = {
    name: "don",
    category: "Miscelaneous",
    description: "Contribuer au bot sans connaissances : faites un don !",
    usage: "don 20"
};
