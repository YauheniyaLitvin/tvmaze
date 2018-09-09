import axios from 'axios'
import config from "../../config"
import Logger from '../../logger'
const logger = Logger(module)

export async function page( num : number, url: string = config.tvmaze.url ){      
    const resp = await axios.request( { url:`${url}?page=${num}`})
    logger.info( `get ${url} - ok` )
    return resp.data
}