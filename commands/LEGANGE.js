exports.run = async (client, message) => {
    message.delete();
    if(!client.utils.has_perm(message, 'ADMINISTRATOR', true))
        return;
    var n = 0;
    while (n < client.config.gange_lines) {
        const fetched = await message.channel.fetchMessages({limit: 100});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        n++;
    }
    message.channel.send(":ok_hand: :grin:", {
            file: "http:
        }
    );
}
