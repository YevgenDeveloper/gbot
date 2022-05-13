exports.run = async (client, message) => {
    message.delete();
    if(!client.utils.has_perm(message, 'ADMINISTRATOR', true))
        return;
    const fs = require("fs")
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
}
