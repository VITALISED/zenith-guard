import { ClientEvents } from 'discord.js'
import chalk from 'chalk'
import { BorderStyle, default as boxen } from 'boxen'
import { EventModel } from '../typings/Event'

export default class Ready implements EventModel.Base {
    public readonly name: keyof ClientEvents;

    constructor() {
        this.name = 'ready'
    }

    public async run(): Promise<void> {
        console.log(boxen(`${chalk.cyanBright('Zenith Guard')}\n2020, VITALISED`, {padding: 1, borderStyle: BorderStyle.Round}))
        console.log(chalk.blueBright('[INFO]'), `Logged in with account: ${client.user?.tag}`)

        client.meta.set('invite', `https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=537168960&scope=bot`)
        console.log(chalk.blueBright('[INFO]'), `Invite link: ${client.meta.get('invite')}`)
    }
}