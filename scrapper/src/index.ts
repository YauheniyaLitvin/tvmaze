import minimist from 'minimist'
import { start , restart } from './show'
import Logger from './logger'
const logger = Logger(module);

(async function(){

    let opts = minimist(process.argv.slice(2))
    let command = opts._[0]
    if (!command) process.exit()

    logger.info(`started scrapper process: ${command}`)
    if (command === 'start')  {
       await start()
    }
    if (command === 'restart'){
        await restart()
    }
    process.exit()

})()


