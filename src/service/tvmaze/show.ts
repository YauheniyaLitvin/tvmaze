import axios from 'axios'
import config from '../../config'
import Logger from '../../logger'
const logger = Logger(module)
import { URL}  from 'url'

export async function page( num : number, baseUrl: string = config.TVMAZE.URL ){

    const url  = getUrl(num , baseUrl)
    const resp = await axios.request( { url } )  
    logger.info( `get ${ url } - ok` )
    return resp.data

}

export function getUrl(page:number , baseUrl: string = config.TVMAZE.URL  ): string{
    const url = new URL(baseUrl)
    url.searchParams.set('page', page.toString() )
    return url.href
}