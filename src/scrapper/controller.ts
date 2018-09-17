import * as cp from 'child_process'
import path from 'path'
import config from '../config'
import Logger from '../logger'
const logger = Logger(module)
const program = path.resolve('./dist/scrapper/index.js')
let child : cp.ChildProcess 

export function start( page = config.FIRSTPAGE) : boolean {

    if ( child ) return false
   
    const options = {
        silent: true, detached :  true
    }
    const args:any = [ 'start', `--page=${page}`] 

    child = cp.fork( program, args, options)
    child.on('close', (msg:any) => { 
        logger.info('scrapper-start stopped')
        child = null
    })                                                                                                                                                                                                                                                                
    child.on( 'message', (msg:any ) =>{})    
    return true
}

export function resume():boolean{

    if ( child ) stop()
    const options = {
        silent: true, detached :  true
    }
    child = cp.fork( program , [ 'resume' ] ,options)
    child.on('close', (msg:any) => {
        logger.info('scrapper-resume stopped')
    })                                                                                                                                                                                                                                                                
    child.on( 'message',(msg:any ) =>{})
    
    return true

}

export function stop():boolean{

    if ( !child ) return true
    child.kill()
    const killed = child.killed
    if (killed) child = null
    return killed

}