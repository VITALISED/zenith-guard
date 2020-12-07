import Zenith from './Client'
import { join } from 'path'
import chalk from 'chalk'

const client = global.client = new Zenith({
    // Default Client Options
    disableMentions: 'everyone',

    // Commando Client Options
    commandPrefix: process.env.PREFIX,
    owner: process.env.ADMIN
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['core', 'Core'],
        ['moderation', 'Moderation']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        prefix: false,
        unknownCommand: false,
        ping: false,
        eval: true,
        commandState: true
    })
    .registerCommandsIn(join(__dirname, 'commands'))

client.start()

process.on('unhandledRejection', error => {
    console.error(chalk.redBright('[ERROR]'), `Unhandled Promise Rejection: ${error}`)
})