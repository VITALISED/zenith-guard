import { Message, Role } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import { Moderation } from '../../util/Moderation'

export default class Unmute extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'unmute',
            group: 'moderation',
            memberName: 'unmute',
            description: 'Unmute a muted user (someone who has the muted role).',
            details: 'Unmuting a user takes either an @mention or user id.',
            args: [
                {
                    key: 'user',
                    prompt: 'Who would you like to unmute?',
                    type: 'string'
                }
            ],
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ['MANAGE_MESSAGES']
        })
    }

    public async run(message: CommandoMessage, args: { user: string }): Promise<Message | Message[] | null> {
        const target = Moderation.getMember(args, message.guild)
        if (typeof target === 'string') return message.channel.send(target)

        if (!message.guild.roles.cache.some(r => r.name === 'Muted')) return message.channel.send('Muted role doesn\'t exist.')

        const mutedRole: Role = message.guild.roles.cache.find(r => r.name === 'Muted') as Role

        if(!target.roles.cache.has(mutedRole.id)) {
            return message.channel.send('Target isn\'t muted.')
        } else {
            target.roles.remove(mutedRole)
            return message.channel.send(`Unmuted user: ${target}`)
        }
    }
}