import {connect, db as getDb, close as disconnect }  from "../storage/mongo/db"
import { noCast, setCast }  from '../storage/mongo/show'
import { get as serviceGet }  from '../service/tvmaze/cast'
import Logger from './../logger'
const logger = Logger(module)



export async function run( getCastAndSet = etl ){
    
    const client = await connect()
    const db = getDb( client )
    const cursor = noCast( db )

    const setShowCast = async ( show: any, cast: any  ) => {
        await setCast( db, show, cast )
    }

    while ( await cursor.hasNext() ){
        let show = await cursor.next()
        await getCastAndSet( show, setShowCast )
    }
    disconnect(client)
}

async function etl( show: any, setCast : any, getCast = serviceGet){
    try {
        const extCast : any[] = await getCast( show.id ) //extract
        const cast = extCast.map( transform ).sort( byBirthdayDesc ) //transform
        await setCast( show, cast ) // persist
    } catch ( e ){
        logger.error( `import cast error: ${show}, ${e}` )
    }
}



export function byBirthdayDesc(c1 : any, c2 : any){
    const dob1 = new Date(c1.birthday) //odbc, '1979-07-17'
    const dob2 =  new Date(c2.birthday)
    if (dob1 > dob2) return -1
    if (dob1 < dob2) return 1
    return 0
}

function transform( cast: any ) : any {
    const { person, character, self, voice } = cast
    person.character = character
    person.self = self
    person.voice = voice
    return person
} 

