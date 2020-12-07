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
        const duration = moment.duration(global.client.uptime).format(' D [days], H [hours], m [minutes], s [seconds]')

        const embed = new MessageEmbed()
            .setAuthor(global.client.user?.username, `${global.client.user?.avatarURL()}`)
            .setTitle('Invite')
            .setURL(`${global.client.meta.get('invite')}`)
            .setThumbnail(`${global.client.user?.avatarURL()}`)
            .setDescription('Discord bot inspired by Into the Breach.')
            .addField('Serving', `${global.client.users.cache.size} online users, in ${global.client.guilds.cache.size} guilds.`, true)
            .addField('Uptime', duration, true)
            .setFooter('Part of the VITALISED Bot Family')

        return message.channel.send(embed)
    }
}