import dotenv from 'dotenv'
import fs from 'fs'
import Logger from './logger'
const logger = Logger(module)


if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' })
} 

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production'

const MONGODB_URI = prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL']

if (!MONGODB_URI) {
    logger.error('No mongo connection string. Set MONGODB_URI environment variable.')
    process.exit(1);
}


export default {
    port:3000, 

    tvmaze:{
        url:'http://api.tvmaze.com/shows',        
    },
    db:{
        url:MONGODB_URI
    }

}


