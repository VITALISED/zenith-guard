/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-var */
import VITALISED from './Client'
import { join } from 'path'
import chalk from 'chalk'

// Workaround for environment variables 'not working'.
declare global {     
    var client: VITALISED
    
    namespace NodeJS {
        interface ProcessEnv {
            // Declare env var types here.
            PREFIX: string
            DISCORD_TOKEN: string
            ADMIN: string
            OUT: string
            EMBED_COLOR: string
        }
    }
}

const client = global.client = new VITALISED({
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