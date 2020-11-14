import { ClientEvents, ErrorEvent } from 'discord.js'
import chalk from 'chalk'
import { EventModel } from '../typings/Event'

export default class Error implements EventModel.Base {
    public readonly name: keyof ClientEvents

    constructor() {
        this.name = 'error'
    }

    public async run(error: ErrorEvent): Promise<void> {
        console.error(chalk.redBright('[ERROR]'), error)
    }
}