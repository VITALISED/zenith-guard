import { Message } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Moderation } from '../../util/Moderation'

export default class Mute extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            description: 'Kick a user from the server.',
            memberName: 'kick',
            aliases: ['boot', 'k'],
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
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS']
        })
    }

    public async run(message: CommandoMessage, args: { user: string, reason: string }): Promise<Message | Message[] | null> {
        const target = Moderation.getMember(args, message.guild)
        if (typeof target === 'string') return message.channel.send(target)
        
        if (!target.kickable) return message.channel.send(`Unable to kick ${target}, missing permissions.`)

        if(target.id === client.user?.id) return message.channel.send('I can\'t exactly do that to myself.')

        target.kick(args.reason)

        return message.channel.send(`Kicked user: ${target}, for reason: ${args.reason}`)
    }
}