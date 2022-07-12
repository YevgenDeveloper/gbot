exports.run = async (client, message, args) => {
    message.delete();
    if (!client.utils.has_perm(message, 'ADMINISTRATOR', true))
        return;
    client.risistory.set(message.guild.id, {tags: []});
}
