import { Message } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

export default class Ping extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'ping',
            group: 'core',
            memberName: 'ping',
            description: 'Ping the bot.'
        })  
    }
    
    public async run(message: CommandoMessage): Promise<Message | Message[] | null> {
        const msg = await message.channel.send('Pinging...')
        return msg.edit(`**Pong**: Roundtrip ${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms. Heartbeat ${global.client.ws.ping}ms`)
    }  
}