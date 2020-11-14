import { ClientEvents } from 'discord.js'
import chalk from 'chalk'
import { EventModel } from '../typings/Event'


export default class Warn implements EventModel.Base {
    public readonly name: keyof ClientEvents

    constructor() {
        this.name = 'error'
    }

    public async run(warn: string): Promise<void> {
        console.log(chalk.redBright('[WARN]'), warn)
    }
}