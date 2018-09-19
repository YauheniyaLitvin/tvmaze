
import { URL } from 'url'
import { get } from './service/tvmaze/get'
import {connect, db as getDb, close as disconnect } from './storage/mongo/db'
import {paste as savePage , createIndexes, updatePageState , getPageState, noCast, dropCollection} from './storage/mongo/show'
import {importCasts} from './cast'
import config from './config'
import Logger from './logger'
const logger = Logger(module)
const FIRSTPAGE = config.get('FIRSTPAGE')


export async function start(conn = connect,getdatabase = getDb, getPage = getPageState,
             impPages = importPages, getNoCast  = noCast, ipmCast = importCasts,disconn =  disconnect):Promise<any>{
    try {
        const client = await conn()
        const db = getdatabase(client)
        let pageState = await getPage(db)
        let lastPage = (pageState)?pageState.page:null
        if (!lastPage) return await impPages(FIRSTPAGE, db)

        let noCastShows =  await getNoCast(db)
        ipmCast(noCastShows.map((show:any)=> show.id), db)
        await impPages(lastPage , db)
        disconn(client)
    }catch(err){
        logger.error(err)
    }
}

export async function importPages(from:number = FIRSTPAGE , db:any, updPageState = updatePageState, iPage = importPage):Promise<any>{
    let num = from
    while (await iPage(db, num)){
        updPageState(db, num)
        logger.info(`loaded page ${num}`)
        num ++
    }
}

async function importPage(db:any, num:number, load = loadPage, save = savePage, impCasts = importCasts):Promise<boolean>{
    try {
        const shows:any = await load(num)
        if (!shows.length) return false
        await save(db, shows.map((s:any) => Object.assign({}, s)))
        impCasts(shows.map((s:any) => s.id) , db)
        return true
    } catch (err){
        return false
    }
}

async function loadPage(num:number, load = loadPage, getdata = get, getUrl = pageUrl, conf = config):Promise<any>{
    try {
        return await getdata(getUrl(num))
    } catch (err){
        logger.error(`load page error: ${num}, ${err}`)
        if (err.response && err.response.status == conf.get('RATELIMITERR')){
            return await load(num)
        }
    }
    return []
}

export async function restart(from:number=FIRSTPAGE, conn = connect,getdatabase = getDb, dropColl = dropCollection, createInds = createIndexes,
            impPages = importPages, disconn = disconnect):Promise<any>{
    try {
        const client = await conn()
        const db = getdatabase(client)
        await dropColl(db)
        await createInds(db)
        await impPages(from , db)
        disconn(client)
    }catch(err){
        logger.error(err)
    }
}

export function pageUrl(page:number , baseUrl: string = config.get('TVMAZE_URL')):string{
    const url = new URL(baseUrl)
    url.searchParams.set('page', page.toString())
    return url.href
}