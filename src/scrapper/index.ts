import minimist from 'minimist'
import {isNotInteger} from '../utils'
import { start , resume } from './show'
import Logger from '../logger'
const logger = Logger(module)

process.on('message',  message => {});



(async function(){

   
    
    let opts = minimist(process.argv.slice(2))
    let command = opts._[0]
    if (!command) process.exit() 
    
    logger.info(`started scrapper precess: ${command}`)
    
    if ( (command=='start') &&(!isNotInteger(opts.page)))  {
       await start( opts.page)      
    }
    if (command == 'resume'){
        await resume()
    }  
    process.exit()    
    
})()


