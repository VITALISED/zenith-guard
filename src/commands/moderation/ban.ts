import { Message } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Moderation } from '../../util/Moderation'

export default class Ban extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Ban a user.',
            details: 'Banning a user inputs either an @mention or user id.',
            args: [
                {
                    key: 'user',
                    prompt: 'Who would you like to kick?',
                    type: 'string'
                },
                {
                    key: 'reason',
                    prompt: 'What is your reason?',
                    type: 'string'
                }
            ],
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ['BAN_MEMBERS']
        })
    }

    public async run(message: CommandoMessage, args: { user: string, reason: string }): Promise<Message | Message[] | null> {
        const target = Moderation.getMember(args, message.guild)
        if (typeof target === 'string') return message.channel.send(target)

        if(!target.bannable) return message.channel.send(`Unable to softban ${target}, missing permissions`)

        if(target.id === global.client.user?.id) return message.channel.send('I can\'t exactly do that to myself.')

        target.ban({days: 0, reason: args.reason})

        return message.channel.send(`Banned user: ${target}, for reason: ${args.reason}`)
    }
}