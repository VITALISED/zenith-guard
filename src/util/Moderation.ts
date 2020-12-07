/* eslint-disable @typescript-eslint/no-namespace */
import { Guild, GuildMember, User } from 'discord.js'
import chalk from 'chalk'

/**
 * # Moderation
 * @namespace Moderation
 * 
 * A module for handling moderation functions.
 */
export namespace Moderation {
    /**
     * Gets a user and either returns a GuildMember or string exception.
     * @param args  Command Arguments
     * @returns {GuildMember | string} GuildMember object or string exception which can be handled.
     * @memberof Moderation
     */
    export const getMember = (args: { user: string}, guild: Guild): GuildMember | string => {
        const user = getUser(args)
    
        if (user === undefined) return 'User could not be found. (Make sure it\'s an @mention or user id!)'

        try {
            if (!guild.members.cache.has(user.id)) return 'User exists in my cache, however is not in this guild. (nice try)'

            return guild.member(user) as GuildMember
        } catch (error) {
            console.error(chalk.redBright('[ERROR]'), error)
            return 'Something went wrong getting this member. (Probably a bug not ironed out.)'
        }
    }

    /**
     * Gets a user and either returns a User object or returns string exception
     * @param args  Command Arguments
     * @returns {User | undefined} User object or undefined
     * @memberof Moderation
     */
    export const getUser = (args: { user: string }): User | undefined => {
        const mention = args.user.match(/^<@!?(\d+)>$/)

        if(mention !== undefined) {
            try {
                return global.client.users.cache.find(u => u.id == mention?.[1]) as User
            } catch (error) { return undefined }
        } 
        
        else if(global.client.users.cache.some(u => u.id === args.user)) {
            return global.client.users.cache.find(u => u.id === args.user) as User
        }
    }
}