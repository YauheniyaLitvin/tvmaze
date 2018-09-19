import {URL} from 'url'
import path from 'path'
import { setCast }  from './storage/mongo/show'
import { get }  from './service/tvmaze/get'
import config from './config'
import Logger from './logger'
const logger = Logger(module)

export async function importCasts(shows: any , db:any){

    shows.map(async(show :any) => {
        let result : ImportCastResult
        do {
            result = await importCast(show, db)
            if (!result.err) {
                logger.info(`loaded show ${show}`)
            }
        } while (result.repeat)
    })
}

export type ImportCastResult = {
    err?: any,
    repeat?: boolean
}

export async function importCast(show: any , db:any):Promise<ImportCastResult> {
    try {
        const extCast : any = await get(getUrl(show))
        const cast = extCast.map(transform).sort(byBirthdayDesc)
        await setCast(db,  show, cast)
        return {}
    } catch (err){
        logger.error(`import cast error: ${show}, ${err}`)
        if (err.response && err.response.status == config.get('RATELIMITERR')){
           return { err, repeat:true }
        }
        return {err }
    }
}

export function getUrl(show:number , baseUrl: string = config.get('TVMAZE_URL')):string{
    let urlpath = path.join('shows', show.toString(),'cast')
    let url = new URL(urlpath , baseUrl)
    return url.href
}


export function byBirthdayDesc(c1 : any, c2 : any){
    const dob1 = new Date(c1.birthday)
    const dob2 =  new Date(c2.birthday)
    if (dob1 > dob2) return -1
    if (dob1 < dob2) return 1
    return 0
}

export function transform(cast: any) : any {
    const { person, character, self, voice } = cast
    person.character = character
    person.self = self
    person.voice = voice
    return person
}

