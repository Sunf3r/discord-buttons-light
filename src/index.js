const { Structures, Client } = require("discord.js-light");

var version = require('discord.js-light').version.split('');
version = parseInt(version[0] + version[1]);

module.exports = (client) => {

    const { Events } = require('discord.js-light').Constants;

    Events.CLICK_BUTTON = 'clickButton';

    if (!client || !client instanceof Client) throw new Error("INVALID_CLIENT_PROVIDED: The discord.js-light client is not provided or is invalid...")

    const TextChannel = require('discord-buttons/src/v3/Classes/TextChannel');
    const DMChannel = require('discord-buttons/src/v3/Classes/DMChannel');
    const NewsChannel = require('discord-buttons/src/v3/Classes/NewsChannel');

    Structures.extend('TextChannel', () => TextChannel);
    Structures.extend('DMChannel', () => DMChannel);
    Structures.extend('NewsChannel', () => NewsChannel);

    if (version === 3) {
        const Message = require('discord-buttons/src/v3/Classes/Message');
        Structures.extend('Message', () => Message);
    }

    client.ws.on('INTERACTION_CREATE', (data) => {

        if (!data.message) return;

        if (data.data.component_type) {
            const MessageComponent = require('discord-buttons/src/v3/Classes/clickButton');
            const button = new MessageComponent(client, data);

            client.emit('clickButton', button);
        }
    });

    return;
}

module.exports.MessageButton = require(`./v${version}/Classes/MessageButton`);
module.exports.MessageActionRow = require('discord-buttons/src/v3/Classes/MessageActionRow');
module.exports.ButtonInteraction = require('discord-buttons/src/v3/Classes/clickButton');
module.exports.Message = require(`./v${version}/Classes/Message`);
module.exports.ButtonCollector = require(`./v${version}/Classes/ButtonCollector`);
module.exports.APIMessage = require('discord-buttons/src/v3/Classes/APIMessage').APIMessage;
module.exports.sendAPICallback = require('discord-buttons/src/v3/Classes/APIMessage').sendAPICallback;
module.exports.DMChannel = require('discord-buttons/src/v3/Classes/DMChannel');
module.exports.NewsChannel = require('discord-buttons/src/v3/Classes/NewsChannel');
module.exports.TextChannel = require('discord-buttons/src/v3/Classes/TextChannel');
module.exports.WebhookClient = require('discord-buttons/src/v3/Classes/WebhookClient');
module.exports.Util = require('discord-buttons/src/v3/Util');
module.exports.Constants = require('discord-buttons/src/v3/Constants');
version === 13 ? module.exports.CommandInteraction = require('./v13/Classes/CommandInteraction') : null
