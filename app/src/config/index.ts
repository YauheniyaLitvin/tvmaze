import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import nconf from 'nconf'
import Logger from '../logger'
const logger = Logger(module)


const prod = process.env.NODE_ENV === 'production'
const envfile = path.join(__dirname, '../../.env')

logger.info(envfile)
if (prod && fs.existsSync(envfile)) {
    dotenv.config({ path: envfile })
}
logger.info(`${fs.existsSync(envfile)}`)
nconf.argv()
     .env()
     .file({ file: path.join(__dirname, '../../defaults.json')})

export default nconf