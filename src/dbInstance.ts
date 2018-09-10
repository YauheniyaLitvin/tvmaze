import * as storage from './storage/mongo/db'

let client : any, db :  any 

( async function(){

    client = await storage.connect()
    db = storage.db( client )

})()

export async function get(){
    if (db) return db
    return connectdb()
}

async function connectdb(){
    client = await storage.connect()
    db = storage.db( client )
    return db
}
export function close(){
    storage.close( client )
}