
import { URL } from 'url'
import { get } from './service/tvmaze/get'
import {connect, db as getDb, close as disconnect } from './storage/mongo/db'
import {paste as savePage , createIndexes, updatePageState , getPageState, noCast, dropCollection} from './storage/mongo/show'
import {importCasts} from './cast'
import config from './config'
import Logger from './logger'
const logger = Logger(module)
const FIRSTPAGE = config.get('FIRSTPAGE')

export async function start(){
    const client = await connect()
    const db = getDb(client)
    let pageState = await getPageState(db)
    let lastPage = (pageState)?pageState.page:null
    if (!lastPage) return await importPages(FIRSTPAGE, db)

    let noCastShows =  await noCast(db)
    importCasts(noCastShows.map((show:any)=> show.id), db)
    await importPages(lastPage , db)
    //disconnect(client)
}

export async function restart(from:number=FIRSTPAGE){
    const client = await connect()
    const db = getDb(client)
    await dropCollection(db)
    await createIndexes(db)
    await importPages(from , db)
    disconnect(client)
}

export async function importPages(from:number=FIRSTPAGE , db:any){
    let num = from
    while (await importPage(db, num)){
        updatePageState(db, num)
        logger.info(`loaded page ${ num}`)
        num ++
    }
}

async function importPage(db: any, num: number):Promise<boolean>{
    try {
        const shows:any = await loadPage(num)
        if (!shows.length) return false
        await savePage(db, shows.map((s:any) => Object.assign({}, s)))
        importCasts(shows.map((s:any) => s.id) , db)
        return true
    } catch (err){
        return false
    }
}

async function loadPage(num: number):Promise<any>{
    try {
        return await get(pageUrl(num))
    } catch (err){
        logger.error(`load page error: ${num}, ${err}`)
        if (err.response && err.response.status == config.get('RATELIMITERR')){
            return await loadPage(num)
        }
    }
    return []
}


export function pageUrl(page:number , baseUrl: string = config.get('TVMAZE_URL')):string{
    const url = new URL(baseUrl)
    url.searchParams.set('page', page.toString())
    return url.href
}