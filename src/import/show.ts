import { Db } from 'mongodb'
import {connect, db as getDb, close as disconnect }  from '../storage/mongo/db'
import {paste , createIndexes}  from '../storage/mongo/show'
import {page}  from '../service/tvmaze/show'
import Logger from './../logger'
const logger = Logger(module)

export async function run( getPage = page /* savePage = defSave()*/ ) : Promise<void> {

  let num = 0
  let ok = true
  const client = await connect()
  const db = getDb( client )
  await createIndexes(db)
    
  do {
    ok = await etl( num, db, getPage )
    if (ok) num ++
  } while( ok )
  logger.info( `last imported page: ${num-1}`)
  disconnect(client)
}

// extract transform load
// get and save
export async function etl( num : number, db : Db, getPage = page, pastPage = paste ) : Promise<boolean> {
   
  try {
    const shows = await getPage( num )    
    await pastPage( db, shows.map( (s:any) => Object.assign({}, s )) )
  } catch( err ){
    logger.error( `etl ${num}: ${err}`)
    return false
  }
  return true

}

