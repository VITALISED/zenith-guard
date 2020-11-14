import { ClientEvents } from 'discord.js'

declare namespace EventModel {
    export interface Base {
        public readonly name: keyof ClientEvents
    }
}