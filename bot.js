const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});
const defaultSettings = {
    prefix: "+",
    show_risitags: false,
    disable_vote: false,
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    score: true,
    sticker404: "http:
};
client.risistory = new Enmap({name: "risistory",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'});
client.points = new Enmap({name: "points"});
client.defaultSettings = defaultSettings;
const risicount = require('./risicount.json');
client.risicount = risicount;
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Attempting to load event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});
const utils = require('./modules/utils.js');
client.utils = utils;
client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
client.login(config.token);
