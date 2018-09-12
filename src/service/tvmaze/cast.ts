import axios from 'axios'
import {URL} from 'url'
import config from '../../config'
import Logger from '../../logger'
const logger = Logger(module)


export async function get( show:number , baseUrl: string = config.TVMAZE.URL, onError = rateErrorHandler ){

    const url = getUrl(show, baseUrl)    
    try{
        const data = ( await axios.request( { url}) ).data
        logger.info( `get ${ url} - ok` )
        return data
    } catch( err ){
        return await onError( err, url )
    }
}

export function getUrl(show:number , baseUrl: string = config.TVMAZE.URL  ): string{
    const url = new URL(baseUrl)
    url.searchParams.set('cast', show.toString() )
    return url.href
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


    