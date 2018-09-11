import axios from 'axios'

import config from '../../config'
import Logger from '../../logger'
const logger = Logger(module)

export async function get( show:number , baseUrl: string = config.tvmaze.url, onError = rateErrorHandler ){
    const url = `${baseUrl}/${show}/cast`
    try{
        logger.info( `get ${url} ` )
        return ( await axios.request( { url }) ).data
    } catch( err ){
        return await onError( err, url )
    }
}

export const RATELIMITERR = 429;
export const RATELIMIT = 1000;  //ms

export async function rateErrorHandler( err: any, url : string ){
    
    if (!err.response || !err.response.status || ( err.response.status!== RATELIMITERR ) ) {
        throw new Error( err )
    }
    
    const repeat = async() => {
        try {
            return ( await axios.request({ url }) ).data
        } catch( err ) {
            return await rateErrorHandler( err, url )
        }
    }
   
    return new Promise((resolve, reject)=>{
        setTimeout( async ()=>{
            let data = await repeat()
            resolve(data)
        }, RATELIMIT  )
    })
}


    