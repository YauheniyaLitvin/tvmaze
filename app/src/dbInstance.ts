import * as storage from './storage/mongo/db'

let client:any, db:any

export async function get(){
    if (db) return db
    return connectdb()
}

async function connectdb(){
    try{
        client = await storage.connect()
        db = storage.db(client)
        return db
    }catch(err){
        throw new Error('db connection error')
    }
}
export function close(){
    storage.close(client)
}