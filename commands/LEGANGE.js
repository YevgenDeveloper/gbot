exports.run = async (client, message) => {
    message.delete();
    if (!client.utils.has_perm(message, 'ADMINISTRATOR', true))
        return;
    const fetched = await message.channel.fetchMessages({limit: 100});
    message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    message.channel.send(":ok_hand: :grin:", {
            file: "http:
        }
    );
}
