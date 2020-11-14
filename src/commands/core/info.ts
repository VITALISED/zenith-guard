import { Message, MessageEmbed } from 'discord.js'
import * as moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'
momentDurationFormatSetup(moment)

export default class Info extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'info',
            group: 'core',
            memberName: 'info',
            description: 'Get info about the bot.'
        })
    }
    
    public async run(message: CommandoMessage): Promise<Message | Message[] | null> {
        const duration = moment.duration(client.uptime).format(' D [days], H [hours], m [minutes], s [seconds]')

        const embed = new MessageEmbed()
            .setAuthor(client.user?.username, `${client.user?.avatarURL()}`)
            .setTitle('Invite')
            .setURL(`${client.meta.get('invite')}`)
            .setThumbnail(`${client.user?.avatarURL()}`)
            .setDescription('Discord bot inspired by Into the Breach.')
            .addField('Serving', `${client.users.cache.size} online users, in ${client.guilds.cache.size} guilds.`, true)
            .addField('Uptime', duration, true)
            .setFooter('Part of the VITALISED Bot Family')

        return message.channel.send(embed)
    }
}