import { ClientUser, Message, MessageEmbed } from 'discord.js'
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando'

export default class Help extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'help',
            group: 'core',
            memberName: 'help',
            description: 'You\'re using this one right now!',
            args: [{
                key: 'command',
                prompt: 'Which command would you like help for?',
                type: 'string',
                default: ''
            }]
        })
    }

    public async run(message: CommandoMessage, args: { command: string }): Promise<Message | Message[] | null> {
        const groups = global.client.registry.groups
        const showAll = args.command && args.command.toLowerCase() === 'all'
        const commands = global.client.registry.findCommands(args.command, false, message)

        if (args.command && !showAll) {
            const aliases: string[] | 'None' = commands[0].aliases.length ? commands[0].aliases : 'None'

            const embed = new MessageEmbed()
                .setColor(process.env.EMBED_COLOR)
                .setTitle(`Help for: ${commands[0].name}`)
                .setDescription(commands[0].description)
                .addField('Usage', commands[0].examples ? commands[0].examples : 'None', true)
                .addField('Aliases', aliases, true)
                .addField('Extended', commands[0].details ? commands[0].details : 'None')

            return message.channel.send(embed)
        } else {
            const values: { name: string; value: string[] }[] = []

            groups.forEach(grp => {
                values.push({
                    name: grp.name,
                    value: grp.commands.filter(cmd => !cmd.hidden && (showAll || cmd.isUsable(message.message)))
                        .map(cmd => `**${cmd.name}** - ${cmd.description}`)
                })
            })

            const embed = new MessageEmbed()
                .setColor(process.env.EMBED_COLOR)
                .setTitle('Help')
                .setDescription(`__To get help about a specific command do:__\n${Command.usage('ping', message.guild ? message.guild.commandPrefix : undefined, global.client.user as ClientUser)}`)
                .addFields(values)

            return message.channel.send(embed)
        }
    }
}