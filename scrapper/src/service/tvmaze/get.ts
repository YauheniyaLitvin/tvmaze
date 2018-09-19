import axios from 'axios'
import { limit } from '../../limiter'
import Logger from '../../logger'
const logger = Logger(module)


export function get(url:string) {

    return new Promise((resolve, reject)=>{
        const fn = async() => {
            try{
                let response =  await axios.get(url)
                resolve(response.data)
            }catch(error){
                logger.error(`get ${ url} - ${error}`)
                reject(error)
            }
        }
        limit(fn)
   })

}