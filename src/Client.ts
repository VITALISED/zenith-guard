import * as fs from 'fs'
import { CommandoClient as Client } from 'discord.js-commando'
import { CommandoClientOptions } from 'discord.js-commando'
import { ClientEvents, Collection } from 'discord.js'
import chalk from 'chalk'

export default class Zenith extends Client {
    public meta: Collection<string, string>

    constructor(config: CommandoClientOptions) {
        super(config)

        this.meta = new Collection
    }

    /**
     * Starts the client
     * @returns {CommandoClient} CommandoClient
     */
    public async start(): Promise<this> {
        console.log(chalk.blueBright('[INFO]'), 'Starting Client...')

        this.login(process.env.DISCORD_TOKEN)

        // Reconnecting does not exist on ClientEvents so we call it here instead.
        this.on('reconnecting', () => console.log(chalk.blueBright('[INFO]'), 'Client is reconnecting'))
        // I'm only calling disconnect here since it coexists with reconnecting.
        this.on('disconnect', () => console.log(chalk.redBright('[ERROR]'), 'Client disconnected.'))
        
        // Load events
        const eventFiles = fs.readdirSync(`${process.cwd()}\\dist\\events`).filter(file => file.endsWith('.js'))
        
        for(const file of eventFiles) {
            const eventImport = await import(`${process.cwd()}\\dist\\events\\${file}`)
            
            const eventFunction = new eventImport.default
            const emitter = (typeof eventFunction.emitter === 'string' ? null : eventFunction.emitter) || global.client
            const once = eventFunction.once 

            try {
                emitter[once ? 'once' : 'on'](eventFunction.name, (...args: ClientEvents[]) => eventFunction.run(...args))
            } catch (error) { console.log(error) }
        }

        return this
    }
}
