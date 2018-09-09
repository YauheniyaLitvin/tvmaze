import * as storage from './storage/mongo/db'

let client : any, db :  any 

( async function(){

    client = await storage.connect()
    db = storage.db( client )

})()

export function get(){
    return db
}

export function close(){
    storage.close( client )
}