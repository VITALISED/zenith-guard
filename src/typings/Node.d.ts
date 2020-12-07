import Zenith from '../Client'

declare global {
    namespace NodeJS {
        interface Global {
            client: Zenith
        }

        interface ProcessEnv {
            PREFIX: string
            DISCORD_TOKEN: string
            ADMIN: string
            EMBED_COLOR: string
        }
    }
}