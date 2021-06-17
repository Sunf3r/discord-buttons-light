const { MessageComponentTypes } = require('discord-buttons/src/v3/Constants');
const { resolveType } = require('discord-buttons/src/v3/Util');

class BaseMessageComponent {
    constructor(data) {
        this.type = 'type' in data ? resolveType(data.type) : null;
    }

    static create(data) {
        let component;

        if (typeof (data.type) === 'string') {
            type = MessageComponentTypes[type];
        }

        switch (data.type) {
            case MessageComponentTypes.ACTION_ROW: {
                const MessageActionRow = require('discord-buttons/src/v3/Classes/MessageActionRow');
                component = new MessageActionRow(data);
                break;
            }
            case MessageComponentTypes.BUTTON: {
                const MessageButton = require('discord-buttons/src/v3/Classes/MessageButton');
                component = new MessageButton(data);
                break;
            }
            default:
                throw new SyntaxError('INVALID_TYPE: Invalid MessageComponentType');
        }
        return component;
    }
}

module.exports = BaseMessageComponent;