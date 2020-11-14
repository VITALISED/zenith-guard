import chalk from 'chalk'
import { Message, Role } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
import * as moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import { Moderation } from '../../util/Moderation'

momentDurationFormatSetup(moment)

export default class Mute extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'Mute someone for a set period of time',
            details: `Muting a user takes either an @mention or user id. For an example on formatting time: ${process.env.PREFIX}mute @bad-guy 50m, where 50m is 50 minutes.`,
            args: [
                {
                    key: 'user',
                    prompt: 'Who would you like to mute?',
                    type: 'string'
                },
                {
                    key: 'time',
                    prompt: 'How long do you want to mute this user? E.g 50m, 20s, 30y.',
                    type: 'string'
                }
            ],
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ['MANAGE_MESSAGES']
        })
    }

    public async run(message: CommandoMessage, args: { user: string, time: string} ): Promise<Message | Message[] | null> {
        const target = Moderation.getMember(args, message.guild)
        if (typeof target === 'string') return message.channel.send(target)

        //Role code.
        try {
            target.roles.add(message.guild.roles.cache.find(r => r.name === 'Muted') as Role)
            return message.channel.send(`Muted user: ${target}, for ${args.time}`)
        } catch (error) {
            message.guild.roles.create({
                data:{
                    name: 'Muted',
                    color: 'GRAY',
                    permissions: []
                }
            })
                .then(c => {
                    const mutedRole = message.guild.roles.cache.get(c.id) as Role
                    console.log(chalk.blueBright('[INFO]'), `Created new role ${c.name} in ${message.guild}`)
                    message.guild.channels.cache.forEach(async channel => {
                        await channel.overwritePermissions([{
                            id: mutedRole,
                            deny: ['SEND_MESSAGES', 'SPEAK', 'STREAM', 'MENTION_EVERYONE', 'ADD_REACTIONS']
                        }])
                    })
                    target.roles.add(mutedRole)
                    return message.channel.send(`Muted user: ${target}, for ${args.time} **and created Muted role**`)
                })
                .catch(c => { 
                    console.error(chalk.redBright('[ERROR]'), `Something went wrong with creating new role: ${c}`)
                    return message.channel.send('I couldn\'t mute this user as I either do not have permissions to create a muted role, or apply it\'s permissions to the text channels.')
                })
        }
        return null
    }
}