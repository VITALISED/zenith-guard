import { Message } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Moderation } from '../../util/Moderation'

export default class Softban extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'softban',
            group: 'moderation',
            memberName: 'softban',
            description: 'Ban a user and immediately unban them',
            details: 'Kicking a user inputs either an @mention or user id.',
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
        message.guild.members.unban(target.id)

        return message.channel.send(`Softbanned user: ${target}, for reason: ${args.reason}`)
    }
}