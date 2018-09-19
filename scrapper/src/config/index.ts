import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import nconf from 'nconf'

const prod = process.env.NODE_ENV === 'production'

if (prod && fs.existsSync('../.env')) {
    dotenv.config({ path: '../.env' })
}

nconf.argv()
     .env()
     .file({ file: path.join(__dirname, '../../defaults.json')})

export default nconf